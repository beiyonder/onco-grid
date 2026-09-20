begin;

create extension if not exists pgcrypto;

create or replace function public.trial_relay_no_phi_text(value text)
returns boolean
language sql
immutable
set search_path = public
as $$
  select value is not null
    and length(btrim(value)) between 1 and 1200
    and value !~* '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}'
    and value !~ '(\+?[0-9][0-9 ()-]{7,}[0-9])'
    and value !~ '[0-9]{8,}'
    and value !~* '\m(patient name|medical record|mrn|date of birth|dob|home address|phone number|email address|aadhaar|passport)\M';
$$;

create table public.pilot_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Pilot staff' check (length(display_name) between 1 and 80 and public.trial_relay_no_phi_text(display_name)),
  role text not null default 'coordinator' check (role in ('coordinator', 'oncologist', 'site', 'auditor')),
  organization text not null default 'Pilot organization' check (length(organization) between 1 and 120 and public.trial_relay_no_phi_text(organization)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.trial_rooms (
  id uuid primary key default gen_random_uuid(),
  trial_id text not null unique check (trial_id ~ '^NCT[0-9]{8}$'),
  created_by uuid not null references public.pilot_profiles(user_id),
  created_at timestamptz not null default now()
);

create table public.trial_room_members (
  room_id uuid not null references public.trial_rooms(id) on delete cascade,
  user_id uuid not null references public.pilot_profiles(user_id) on delete cascade,
  room_role text not null check (room_role in ('coordinator', 'oncologist', 'site', 'auditor')),
  can_author_official_response boolean not null default false,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table public.trial_room_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.trial_rooms(id) on delete cascade,
  author_id uuid not null references public.pilot_profiles(user_id),
  body text not null check (public.trial_relay_no_phi_text(body)),
  authority text not null default 'general' check (authority in ('general', 'authorized_site_response')),
  source_url text check (source_url is null or source_url ~ '^https://clinicaltrials\.gov/'),
  reply_to_id uuid references public.trial_room_messages(id),
  resolved_at timestamptz,
  resolved_by uuid references public.pilot_profiles(user_id),
  created_at timestamptz not null default now()
);

create table public.referral_handoffs (
  id uuid primary key default gen_random_uuid(),
  relay_reference text not null unique default ('TRR-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))),
  trial_id text not null check (trial_id ~ '^NCT[0-9]{8}$'),
  created_by uuid not null references public.pilot_profiles(user_id),
  owner_id uuid not null references public.pilot_profiles(user_id),
  recipient_organization text not null check (length(recipient_organization) between 1 and 120 and public.trial_relay_no_phi_text(recipient_organization)),
  purpose text not null check (purpose in ('operational_screening_request', 'source_clarification', 'site_contact_coordination')),
  state text not null default 'draft' check (state in ('draft', 'ready', 'acknowledged', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.referral_handoff_participants (
  handoff_id uuid not null references public.referral_handoffs(id) on delete cascade,
  user_id uuid not null references public.pilot_profiles(user_id) on delete cascade,
  participant_role text not null check (participant_role in ('sender', 'recipient', 'observer')),
  joined_at timestamptz not null default now(),
  primary key (handoff_id, user_id)
);

create table public.referral_handoff_events (
  id bigint generated always as identity primary key,
  handoff_id uuid not null references public.referral_handoffs(id) on delete cascade,
  actor_id uuid not null references public.pilot_profiles(user_id),
  event_type text not null check (event_type in ('created', 'participant_added', 'ready', 'acknowledged', 'closed')),
  from_state text check (from_state is null or from_state in ('draft', 'ready', 'acknowledged', 'closed')),
  to_state text not null check (to_state in ('draft', 'ready', 'acknowledged', 'closed')),
  created_at timestamptz not null default now()
);

create or replace function public.trial_relay_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.pilot_profiles (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger trial_relay_auth_user_created
after insert on auth.users
for each row execute function public.trial_relay_handle_new_user();

insert into public.pilot_profiles (user_id)
select id from auth.users
on conflict (user_id) do nothing;

create or replace function public.trial_relay_is_room_member(room uuid, member uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.trial_room_members where room_id = room and user_id = member);
$$;

create or replace function public.trial_relay_can_author_official(room uuid, member uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.trial_room_members
    where room_id = room and user_id = member and room_role = 'site' and can_author_official_response
  );
$$;

create or replace function public.trial_relay_is_handoff_participant(handoff uuid, participant uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.referral_handoff_participants where handoff_id = handoff and user_id = participant);
$$;

create or replace function public.ensure_trial_room(requested_trial_id text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  room_id uuid;
  current_role text;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if requested_trial_id !~ '^NCT[0-9]{8}$' then raise exception 'invalid trial id'; end if;
  select role into current_role from public.pilot_profiles where user_id = auth.uid();
  insert into public.trial_rooms (trial_id, created_by)
  values (requested_trial_id, auth.uid())
  on conflict (trial_id) do update set trial_id = excluded.trial_id
  returning id into room_id;
  insert into public.trial_room_members (room_id, user_id, room_role)
  values (room_id, auth.uid(), coalesce(current_role, 'coordinator'))
  on conflict (room_id, user_id) do nothing;
  return room_id;
end;
$$;

create or replace function public.add_trial_room_member(room uuid, new_member uuid, requested_role text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists(
    select 1 from public.trial_room_members
    where room_id = room and user_id = auth.uid() and room_role in ('coordinator', 'oncologist')
  ) then raise exception 'room coordinator permission required'; end if;
  if requested_role not in ('coordinator', 'oncologist', 'site', 'auditor') then raise exception 'invalid room role'; end if;
  insert into public.trial_room_members (room_id, user_id, room_role, can_author_official_response)
  values (room, new_member, requested_role, false)
  on conflict (room_id, user_id) do update set room_role = excluded.room_role;
end;
$$;

create or replace function public.trial_relay_validate_reply_room()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.reply_to_id is not null and not exists(
    select 1 from public.trial_room_messages where id = new.reply_to_id and room_id = new.room_id
  ) then raise exception 'reply must reference a message in the same room'; end if;
  return new;
end;
$$;

create trigger trial_relay_message_reply_room
before insert on public.trial_room_messages
for each row execute function public.trial_relay_validate_reply_room();

create or replace function public.resolve_trial_room_message(message uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_room uuid;
begin
  select room_id into target_room from public.trial_room_messages where id = message;
  if target_room is null or not public.trial_relay_is_room_member(target_room) then raise exception 'room membership required'; end if;
  update public.trial_room_messages set resolved_at = now(), resolved_by = auth.uid() where id = message and resolved_at is null;
end;
$$;

create or replace function public.create_no_phi_handoff(
  requested_trial_id text,
  recipient_user uuid,
  recipient_org text,
  requested_purpose text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  handoff_id uuid;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if requested_trial_id !~ '^NCT[0-9]{8}$' then raise exception 'invalid trial id'; end if;
  if not public.trial_relay_no_phi_text(recipient_org) then raise exception 'invalid recipient organization'; end if;
  if requested_purpose not in ('operational_screening_request', 'source_clarification', 'site_contact_coordination') then raise exception 'invalid purpose'; end if;
  if not exists(select 1 from public.pilot_profiles where user_id = recipient_user) then raise exception 'recipient not found'; end if;

  insert into public.referral_handoffs (trial_id, created_by, owner_id, recipient_organization, purpose)
  values (requested_trial_id, auth.uid(), auth.uid(), recipient_org, requested_purpose)
  returning id into handoff_id;
  insert into public.referral_handoff_participants (handoff_id, user_id, participant_role)
  values (handoff_id, auth.uid(), 'sender'), (handoff_id, recipient_user, 'recipient')
  on conflict (handoff_id, user_id) do nothing;
  insert into public.referral_handoff_events (handoff_id, actor_id, event_type, to_state)
  values (handoff_id, auth.uid(), 'created', 'draft');
  return handoff_id;
end;
$$;

create or replace function public.advance_no_phi_handoff(handoff uuid, requested_state text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_state text;
  creator uuid;
  participant_role text;
begin
  select state, created_by into current_state, creator from public.referral_handoffs where id = handoff;
  select rhp.participant_role into participant_role from public.referral_handoff_participants rhp
  where rhp.handoff_id = handoff and rhp.user_id = auth.uid();
  if current_state is null or participant_role is null then raise exception 'handoff participation required'; end if;
  if not (
    (current_state = 'draft' and requested_state = 'ready' and auth.uid() = creator)
    or (current_state = 'ready' and requested_state = 'acknowledged' and participant_role = 'recipient')
    or (current_state = 'acknowledged' and requested_state = 'closed' and auth.uid() = creator)
  ) then raise exception 'invalid or unauthorized transition'; end if;

  update public.referral_handoffs set state = requested_state, updated_at = now() where id = handoff;
  insert into public.referral_handoff_events (handoff_id, actor_id, event_type, from_state, to_state)
  values (handoff, auth.uid(), requested_state, current_state, requested_state);
end;
$$;

alter table public.pilot_profiles enable row level security;
alter table public.trial_rooms enable row level security;
alter table public.trial_room_members enable row level security;
alter table public.trial_room_messages enable row level security;
alter table public.referral_handoffs enable row level security;
alter table public.referral_handoff_participants enable row level security;
alter table public.referral_handoff_events enable row level security;

create policy "authenticated staff can read pilot directory" on public.pilot_profiles for select to authenticated using (true);
create policy "staff can update own profile" on public.pilot_profiles for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "members can read rooms" on public.trial_rooms for select to authenticated using (public.trial_relay_is_room_member(id));
create policy "members can read room membership" on public.trial_room_members for select to authenticated using (public.trial_relay_is_room_member(room_id));
create policy "members can read messages" on public.trial_room_messages for select to authenticated using (public.trial_relay_is_room_member(room_id));
create policy "members can create bounded messages" on public.trial_room_messages for insert to authenticated with check (
  author_id = auth.uid()
  and public.trial_relay_is_room_member(room_id)
  and (authority = 'general' or (authority = 'authorized_site_response' and public.trial_relay_can_author_official(room_id)))
);

create policy "participants can read handoffs" on public.referral_handoffs for select to authenticated using (public.trial_relay_is_handoff_participant(id));
create policy "participants can read handoff membership" on public.referral_handoff_participants for select to authenticated using (public.trial_relay_is_handoff_participant(handoff_id));
create policy "participants can read handoff events" on public.referral_handoff_events for select to authenticated using (public.trial_relay_is_handoff_participant(handoff_id));

revoke all on public.pilot_profiles from anon, authenticated;
revoke all on public.trial_rooms, public.trial_room_members, public.trial_room_messages from anon, authenticated;
revoke all on public.referral_handoffs, public.referral_handoff_participants, public.referral_handoff_events from anon, authenticated;
revoke all on function public.trial_relay_is_room_member(uuid, uuid) from public, anon, authenticated;
revoke all on function public.trial_relay_can_author_official(uuid, uuid) from public, anon, authenticated;
revoke all on function public.trial_relay_is_handoff_participant(uuid, uuid) from public, anon, authenticated;
revoke all on function public.ensure_trial_room(text) from public, anon, authenticated;
revoke all on function public.add_trial_room_member(uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.resolve_trial_room_message(uuid) from public, anon, authenticated;
revoke all on function public.create_no_phi_handoff(text, uuid, text, text) from public, anon, authenticated;
revoke all on function public.advance_no_phi_handoff(uuid, text) from public, anon, authenticated;

grant select on public.pilot_profiles to authenticated;
grant update (display_name, organization) on public.pilot_profiles to authenticated;
grant select on public.trial_rooms, public.trial_room_members, public.trial_room_messages to authenticated;
grant insert (room_id, author_id, body, authority, source_url, reply_to_id) on public.trial_room_messages to authenticated;
grant select on public.referral_handoffs, public.referral_handoff_participants, public.referral_handoff_events to authenticated;
grant execute on function public.trial_relay_is_room_member(uuid, uuid) to authenticated;
grant execute on function public.trial_relay_can_author_official(uuid, uuid) to authenticated;
grant execute on function public.trial_relay_is_handoff_participant(uuid, uuid) to authenticated;
grant execute on function public.ensure_trial_room(text) to authenticated;
grant execute on function public.add_trial_room_member(uuid, uuid, text) to authenticated;
grant execute on function public.resolve_trial_room_message(uuid) to authenticated;
grant execute on function public.create_no_phi_handoff(text, uuid, text, text) to authenticated;
grant execute on function public.advance_no_phi_handoff(uuid, text) to authenticated;

alter publication supabase_realtime add table public.trial_room_messages;
alter publication supabase_realtime add table public.referral_handoffs;
alter publication supabase_realtime add table public.referral_handoff_events;

commit;
