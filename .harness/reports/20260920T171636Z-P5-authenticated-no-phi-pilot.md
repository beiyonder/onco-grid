# Work report — P5 C2 authenticated no-PHI pilot

## Problem

The owner authorised real staff Trial Room communication and a secure referral handoff through Supabase, but explicitly prohibited PHI, patient facts, attachments, and production clinical exchange. The repository had no backend, identity, RLS, realtime data, recipient membership, or immutable audit model. A browser-only role switch could not establish real authority, and a generic database insert would allow privilege escalation or accidental patient payloads.

## Decision

Add a fail-closed Supabase pilot with magic-link staff identity, profiles, room membership, RLS-protected realtime messages, administrator-granted official site-response authority, and source-linked general messages. Add a separate no-PHI handoff model containing only a random relay reference, NCT ID, bounded purpose, staff owners/participants, recipient organization, state, and immutable audit events. All writes use narrow table grants or security-definer RPCs; direct handoff mutation is unavailable. Keep the existing synthetic browser flows visibly separate whenever pilot configuration or identity is absent.

## Evidence

- Configuration boundary — browser client exists only when both `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are present. Server auth uses separate unprefixed variables. No service-role credential appears in browser or repository contracts.
- Identity — Supabase magic-link auth creates a profile without copying email into the profile table. Topbar distinguishes authenticated pilot identity from the existing synthetic prototype-role switch.
- Profiles — authenticated staff directory exposes bounded display name, pilot role, and organization. Authenticated users may update only their own display name and organization; role and official-response authority are not user-editable.
- Trial Rooms — `ensure_trial_room` creates or joins one room per valid NCT ID. Membership reads and messages are RLS-protected. Room coordinators/oncologists can add authenticated members, but site official-response authority always defaults false and requires an administrative grant.
- Message safety — body length is bounded, patient-name/MRN/DOB/contact/address/long-identifier patterns are rejected, source URLs are limited to ClinicalTrials.gov, replies must target the same room, direct update/delete is not granted, and resolution uses a membership-checked RPC.
- Official authority — a message can use `authorized_site_response` only when the author is a site room member with `can_author_official_response = true`; the user cannot self-assign that flag.
- Realtime — room messages subscribe to Supabase Postgres Changes and reload from the RLS-scoped table after insert/update events.
- No-PHI handoff — `create_no_phi_handoff` accepts only a valid NCT ID, authenticated recipient, recipient organization, and one of three operational purposes. It stores no patient/workspace identifier, clinical facts, source files, packet manifest, contact details, or free-text message.
- Handoff transitions — creator advances Draft → Ready; authenticated recipient alone advances Ready → Acknowledged; creator closes Acknowledged → Closed. Every transition creates an append-only audit event.
- Least privilege — all pilot tables revoke default anonymous/authenticated privileges before narrow grants. Anon receives no room or handoff access. Security-definer functions revoke default public execution and grant only the required authenticated calls.
- Client behavior — authenticated mode replaces the synthetic channel with verified-identity realtime UI, member invite controls, authority-gated official response, replies, resolution, and source-only assistant token. Handoff UI uses directory recipients and controlled purpose values, never patient data.
- Fail-closed browser state — with no Supabase configuration, topbar showed `Pilot services off · Fail-closed configuration`; Trial Room retained its clearly synthetic channel; Handoffs showed the configuration blocker separately from the existing browser simulation. No anonymous live controls appeared.
- Responsive health — Home, Trial Room, and Patient Handoffs had zero horizontal overflow and 13px minimum visible text at 390×844. The unconfigured desktop/mobile paths produced zero console warnings, console errors, or page errors.
- Build/dependencies — `npm run build` passed browser and API typechecks; Vite transformed 93 modules and emitted 436.18kB application JavaScript before gzip / 130.32kB after gzip. `npm audit` found 0 vulnerabilities.

## Risks and gaps

No Supabase project URL/publishable key or local Supabase/Docker runtime is available, so the migration has not been applied and live magic-link, RLS, realtime, invitation, official-authority, two-user message, recipient acknowledgement, and audit persistence are not observed. SQL and client contracts are implemented and typechecked, but live acceptance remains blocked by project configuration. The no-PHI text check catches common identifier shapes, not every possible disclosure; staff training, moderation, monitoring, incident response, retention, backups, and institutional security review remain mandatory before any pilot.

## Next

Merge this slice. Build the approximate Three.js India registry diorama. Then configure an approved Supabase project outside chat, apply the migration, inject only public browser variables and approved server variables, create at least two test staff identities, grant one site role official authority administratively, and execute the live room/handoff qualification matrix. Do not add patient payloads to make the handoff appear more complete.

## Sign-off needed

No separate owner review is required to merge the authorised no-PHI pilot code. Owner/institutional sign-off remains required before configuring or deploying Supabase, inviting real staff, granting official-response authority, setting retention/backups/monitoring, or conducting live communication. Any PHI, patient linkage, file exchange, production referral, or clinical use requires a new security/privacy/legal/clinical authorization and is not covered here.
