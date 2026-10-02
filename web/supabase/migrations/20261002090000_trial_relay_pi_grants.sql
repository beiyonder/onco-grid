begin;

-- PI authority is explicitly provisioned by an administrator, never inferred from a demo persona or site role.
create table public.pilot_pi_grants (
  user_id uuid not null references public.pilot_profiles(user_id) on delete cascade,
  trial_id text not null check (trial_id ~ '^NCT[0-9]{8}$'),
  granted_at timestamptz not null default now(),
  primary key (user_id, trial_id)
);
alter table public.pilot_pi_grants enable row level security;
revoke all on public.pilot_pi_grants from anon, authenticated;
grant select on public.pilot_pi_grants to authenticated;
grant all on public.pilot_pi_grants to service_role;
create policy pi_grants_read_own on public.pilot_pi_grants
  for select to authenticated using (user_id = (select auth.uid()));

commit;
