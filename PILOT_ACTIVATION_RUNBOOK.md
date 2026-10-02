# Trial Loop production and pilot activation runbook

## Production target

- Vercel account: `beiyonder`
- Vercel team: `sids-projects-d248cdf7`
- Vercel project: `onco-grid-trial-loop-validation`
- Production alias: <https://onco-grid-trial-loop-validation.vercel.app>
- Project root for deploy commands: `web/`

The core application, explicit coverage workflows, ClinicalTrials.gov evidence feed, formatted criteria, and approximate Three.js spatial lens work without Supabase or OpenAI configuration. Authenticated Trial Room communication, no-PHI handoff, and generated assistant output fail closed until the pilot services below are configured.

## Critical first action: rotate the exposed OpenAI key

An OpenAI key was pasted into conversation. Treat it as compromised.

1. Revoke that key in the OpenAI project immediately.
2. Create a replacement key with the narrowest available project permissions and spend limits.
3. Never paste the replacement into chat, commit it, put it in a `VITE_` variable, or store it in repository files.
4. Configure it only as server-side `OPENAI_API_KEY` in the approved deployment secret store.

The application pins `gpt-5-nano-2025-08-07`, the owner-required lowest-cost model. Changing the model requires a new owner decision and updated cost evidence.

## Deploy the public application

From the repository root:

```bash
cd web
npx --yes vercel@latest link --yes --project onco-grid-trial-loop-validation
npx --yes vercel@latest --prod --yes
```

Before promotion, run:

```bash
npm ci
npm run generate:map
npm run test:api
npm run build
npm audit
cd ..
python3 research/validate_ledger.py
python3 scripts/fetch_india_oncology_trials.py --validate-only
```

After promotion, verify the production alias, Home, Trial Library List/Spatial lens, Trial Detail, official evidence refresh, Patient Workspaces, Trial Room fail-closed state, and narrow mobile layout.

## Supabase pilot setup

### Preconditions

- Institutionally approved Supabase project and region/data-residency decision.
- No PHI or patient facts in Supabase.
- Approved staff email domain and magic-link policy.
- Named security/operations owner for logs, retention, backups, monitoring, incident response, and access review.

### Apply the migration

Migration:

`web/supabase/migrations/20260920171000_trial_relay_pilot.sql`

Using the Supabase CLI:

```bash
cd web
supabase login
supabase link --project-ref <approved-project-ref>
supabase db push
```

Review the migration before applying it. It creates staff profiles, RLS-protected Trial Rooms, realtime messages, membership, administrator-granted official-response authority, no-PHI handoff metadata, participant authorization, role-gated transitions, and immutable audit events.

### Configure Supabase Auth

In Supabase Auth URL configuration:

- Site URL: `https://onco-grid-trial-loop-validation.vercel.app`
- Add the same production origin to allowed redirect URLs.
- Add preview URLs only when separately approved.
- Restrict sign-in to approved staff accounts/domains where supported.

### Configure environment variables

Browser-safe Vercel variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Server-only Vercel variables:

```text
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
OPENAI_API_KEY
```

Set them for the intended Vercel environments with `vercel env add`. Never use a Supabase service-role key in browser variables. Never prefix `OPENAI_API_KEY` with `VITE_`.

The template variable names are also recorded in `web/.env.example`; that file intentionally contains no values.

## Staff and official-response setup

1. Sign in at least two approved test staff accounts through the production magic-link control.
2. Confirm profile rows contain only bounded display name, role, and organization—not email or patient data.
3. Create or join a Trial Room through the UI.
4. Add the second account as a room member.
5. Official site-response authority defaults to false and cannot be self-assigned.
6. An administrator may grant it only to a verified site member after institutional authorization:

```sql
update public.trial_room_members
set can_author_official_response = true
where room_id = '<approved-room-uuid>'
  and user_id = '<approved-site-user-uuid>'
  and room_role = 'site';
```

Record the grant through the institution's access-review process. Revoke it when the role ends.

## Live qualification checklist

### Authentication and authorization

- Magic link reaches only an approved staff inbox.
- Anonymous users cannot read room, message, handoff, participant, or audit tables.
- A non-member cannot read or write a Trial Room.
- A member cannot author an official response without the administrative site-authority grant.
- Browser developer tools expose only the Supabase publishable key, never server secrets.

### Realtime Trial Room

- Two authenticated members see a general message appear in realtime.
- Reply context stays within the same room.
- Human resolution writes the verified actor.
- ClinicalTrials.gov source links remain intact.
- Patient/identifier-like content is rejected.
- Removing room membership removes access.

### Source-only assistant

- A signed-out request returns authentication required without calling OpenAI.
- A safe operational question returns a concise answer with ClinicalTrials.gov citations.
- Patient, matching, eligibility, recommendation, contact, and identifier questions are rejected.
- Output is labelled generated and never official.
- Model reported by the response is `gpt-5-nano-2025-08-07`.
- Review factuality, omissions, source use, authority confusion, abuse behavior, latency, token usage, and cost before inviting pilot users.

### No-PHI handoff

- Sender creates a handoff containing only relay reference, NCT ID, controlled purpose, staff ownership, recipient organization, state, and audit timestamps.
- No patient/workspace ID, facts, file, packet, contact details, or free text enters Supabase.
- Sender can move Draft → Ready.
- Recipient alone can move Ready → Acknowledged.
- Sender can move Acknowledged → Closed.
- Invalid or unauthorized transitions fail.
- Audit events are visible to participants and cannot be directly edited or deleted.

### Privacy and operations

- Inspect Supabase, Vercel, and OpenAI logs for accidental content capture.
- Confirm retention, backup, restore, monitoring, alerting, access review, and incident response.
- Rotate keys and remove test accounts after qualification.
- Record observed evidence in a new `.harness/reports/` entry and update `PROJECT_GOVERNANCE.md`.

## Current open governance items

These remain open after code deployment:

1. Live Supabase/Auth/RLS/realtime/two-user qualification.
2. Live OpenAI output and citation evaluation with a rotated server-side key.
3. Institutional approval for every de-identified research dataset; client validation cannot establish de-identification.
4. Direct treating-oncologist, coordinator, and trial-side workflow sessions.
5. Owner-set participant threshold and exact recruitment/contact authorization.
6. Workflow-fit evidence, buyer, burden baseline, and operational KPI.
7. Precise facility/access data if the Map is ever expanded beyond approximate registry orientation.
8. `P5` closure and product-lock decision.

Do not treat deployment, a successful API call, or synthetic demonstrations as evidence that these gates passed.

## Rollback and emergency disablement

- Promote the prior known-good Vercel production deployment if the new build regresses.
- Remove `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, then redeploy, to disable authenticated pilot UI fail-closed.
- Revoke/rotate `OPENAI_API_KEY` to disable generated output immediately.
- Disable affected Supabase users and official-response grants during an access incident.
- Do not drop pilot tables or audit events as an emergency shortcut. Use a separately reviewed migration and retention decision.

## 2026-10-01 synthetic renovation pickup

**FACT:** The local renovation adds twelve numbered synthetic cases, exact original-source viewing, six source-linked demonstration criterion models, deterministic bidirectional pre-screening, human review overlays, accepted evidence tasks, PI dispositions, and simulated packets. Approved research stays manual and unscored. The existing remote deployment is not updated merely by running these local checks.

### Local execution and checks

From `web/`, run `npm run dev` for the app and its narrow public-source development API bridge. Run `npm run build` and `npm test` for strict compilation and the behavioral suite. `npm run preview` serves the built static artifact; it is not a substitute for the Vercel Functions runtime. `npm run generate:world` regenerates the bundled Natural Earth geometry from the existing `world-atlas` dependency.

1. Open Patients: confirm Patient 1–12, original artifacts, missing/conflicting assertions, and the synthetic/reload boundary. Create a thin-intake example only from the supplied controls.
2. Choose a worked case in Patients. Supplied reference models run immediately; publication is not a prerequisite. “Run reference case” evaluates the dated synthetic benchmark. “Check live registry & match” fetches public registry detail and refuses a current support score if eligibility changed, detail is unavailable, or the source response is stale.
3. Inspect the outcome first, expand “Why this outcome,” then open criterion review for exact predicate traces. Support and registry recruitment status are separate: a fully supported record may correspond to a non-recruiting study. Five worked cases cover complete lung/breast records, a criterion conflict, missing evidence and conflicting evidence.
4. Accept an unresolved information task. Attach a supplied value as coordinator; observe evidence-received, not confirmation. Confirm/reconcile as demo oncologist with a reason, then rerun affected studies. Unable-to-obtain closes effort, not the fact gap.
5. Review each criterion or explicitly select supported findings to acknowledge together. Prepare referral directly from the progress row; neither a shortlist nor an earlier PI disposition is required. Confirm the synthetic-only packet and queue it locally.
6. Revise an input or publish a new model version. Old assessments/referrals must become stale and reject queueing or screening readiness. Conversation and withdrawal remain available. Review a new assessment, then attach it to a draft or information-requested referral. Reload resets the browser-only demonstration.
7. Search a public intervention/topic in the evidence workspace. Inspect complete global detail, append results, switch to the country map, select countries/unplaced studies, and return to the same query. Counts describe the loaded set, not exhaustive site coverage or access.

**OBSERVED:** The implementation report and synthetic-only screenshots are in [the C5 acceptance report](.harness/reports/20261001T151302Z-P5-workflow-renovation-implementation.md). It records 28 passing tests, zero dependency-audit vulnerabilities, a zero-finding scoped native security scan, source/privacy checks and exercised browser journeys.

**OPEN:** Do not represent this as clinically qualified matching, real-patient support, or live referral delivery. The existing live-service configuration/rotation requirements above remain in force. Production publication still requires the repository review-branch/PR and privacy process.

### 2026-10-02 PI access and live matching

**FACT:** My studies is hidden for anonymous users and users without qualifying PI grants. Direct routes, model changes, trial-first runs and trial-side dispositions use the same permission boundary. Choosing a prototype role cannot unlock them. Patient-first evaluation remains available without PI sign-in.

1. Through the approved Supabase migration process, apply `web/supabase/migrations/20261002090000_trial_relay_pi_grants.sql` after the existing pilot schema. It creates administrator-provisioned `(user_id, trial_id)` grants; authenticated users can read only their own rows and cannot grant themselves access.
2. An administrator assigns the approved staff account explicit study IDs. The existing profile must have an `oncologist` or `site` role. Do not equate every site account with a PI, or add a grant from the browser.
3. Sign in through Staff sign in. Confirm My studies appears only for the granted studies. Inspect/publish a demonstration model with a reason; run the candidate queue and record the separate disposition. A publication action is not independent clinical qualification.
4. Qualify two real accounts against RLS: an approved PI and an ungranted account; attempt foreign-study access and self-grant insertion, then sign out and confirm route closure. These live-service checks remain **OPEN**; isolated synthetic-auth browser responses prove UI behavior only.

**FACT:** Matching sends public study IDs, not patient assertions, to the existing public registry endpoint. Synthetic facts and evaluation stay in browser memory. Registry checks expire after 15 minutes; changed eligibility requires model reconciliation, not an automatic reinterpretation. Whitespace is normalized only because the retained snapshot collapses it; non-whitespace changes remain significant.

**DECISION:** No Trial Opportunity Index is presented. The proposed mixture of education, biomarker testing, pre-screening, referral and site activation has no approved target outcome, weighting or clinical benchmark. Current support fractions do not measure clinical opportunity or recommend patient action. The owner selected live-registry computation with synthetic patients, not clinical prioritisation.

### 2026-10-02 review-to-referral demonstration

**FACT:** Patient Referrals, Inbox and the granted study's referral queue open one shared-in-session thread. Referrals are synthetic browser-memory records, not cross-user delivery. They reset on reload; the existing no-PHI pilot service does not transport these packets.

1. From a worked case, open Review evidence. All criteria are initially visible. If the coordinator persona is selected, use the explicit oncologist-role action; this controls the local demo review and grants no PI access.
2. Save review & continue advances to the next unreviewed criterion. Optional notes, original source, registry interpretation and review history remain available without dominating the decision.
3. Finish all criterion reviews, choose Prepare referral, inspect the attached findings/decisions, write the referring message, confirm the synthetic-only boundary and queue locally.
4. With an approved authenticated grant for that study, open My studies → Referrals from oncologists. Acknowledge, assign the next team owner, or request information with a reason. Prototype role selection alone cannot unlock this view.
5. Open the referring-side thread from the patient's Referrals tab. Answer the request and return the referral. If the assessment changed, rerun and review first, then attach the updated reviewed assessment before returning.
6. The team can record Ready for site screening or close with a reason. Screening readiness is operational, never eligibility or confirmation of recruitment capacity. The referring side may withdraw with a reason.

**OBSERVED:** The [review/referral acceptance report](.harness/reports/20261002T182420Z-P5-review-referral-workflow.md) records the two-way synthetic-auth UI journey, final built-artifact queue with zero network requests, anonymous team-route denial, mobile evidence and 34 passing tests. Genuine authenticated cross-user/RLS qualification remains **OPEN**; isolated response fixtures are not live-service proof.
