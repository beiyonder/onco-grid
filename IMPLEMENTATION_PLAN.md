# Trial Relay implementation plan

## 2026-10-01 renovation proposal

**FACT:** The owner requested a complete workflow/UI audit and implementation plan for richer synthetic patients, original-source viewing and gap completion, automated patient-to-trial and trial-to-patient matching, PI workflows, progressive review, trial presentation fixes, and global drug/topic/spatial discovery.

The complete proposed implementation plan is [`architecture/trial-relay-renovation-plan.html`](architecture/trial-relay-renovation-plan.html). It contains the source-backed audit, target journeys, matching semantics, role/data/state contracts, eleven dependency-ordered slices, and fifteen acceptance scenarios.

**OWNER IMPLEMENTATION DIRECTION — 2026-10-01:** implement the renovation end to end with GPT-5.6 Sol/Luna orchestration. The dated governance decision now permits the bounded synthetic-demo implementation. Clinical qualification, real-patient use, treatment recommendations, autonomous final eligibility, and product lock remain excluded or gated; demonstration models must not be represented as clinically validated.

**FACT — revised execution direction:** the owner subsequently requested direct implementation without parallel orchestration; no worker sign-in is required for that execution method.

**OBSERVED — local implementation complete:** the bounded synthetic renovation is implemented and exercised end to end. The [implementation acceptance report](.harness/reports/20261001T151302Z-P5-workflow-renovation-implementation.md) records R01–R15, 28 passing tests, production-build smoke, scoped security scan, source/privacy checks, and retained visual evidence. This does not claim production deployment, clinical qualification, or closure of `P5`.

**Planning evidence:** [P5 C5 workflow-renovation report](.harness/reports/20261001T123356Z-P5-workflow-renovation-plan.md). The HTML was exercised at desktop/mobile widths, with keyboard navigation, JavaScript disabled and print media; these checks validate the planning artifact, not the proposed product.

## Status and authority

- **OWNER DECISION — 2026-09-19:** begin implementation from [`product/TRIAL_RELAY_EXPERIENCE_BLUEPRINT.md`](product/TRIAL_RELAY_EXPERIENCE_BLUEPRINT.md) and [`product/TRIAL_RELAY_VISUAL_DESIGN_LANGUAGE.md`](product/TRIAL_RELAY_VISUAL_DESIGN_LANGUAGE.md).
- **OWNER DECISION — 2026-09-19:** the agent may push and merge implementation pull requests without separate owner review after the required evidence, privacy, and safety checks pass; direct pushes to `main` remain prohibited.
- **OWNER DECISION — 2026-09-19:** the implementation may leave the monolithic HTML architecture and adopt a more sustainable frontend stack when a named slice demonstrates a material maintainability or delivery need. This is conditional frontend authority, not approval for a backend, new data source, production identity or persistence boundary, deployment-topology change, or clinical capability.
- **OWNER DECISION — 2026-09-20:** authorize the previously gated expansion only within these boundaries: explicit criterion/source coverage without match score, ranking, “best trial,” close-match label, or eligibility conclusion; institutionally approved de-identified research records with no identifiers; Supabase-authenticated staff communication and audited referral-state handoff with no PHI; an official-source-only OpenAI assistant with citations and no patient facts; and an approximate Three.js registry map with no travel, route, access, or site-availability claim.
- **OWNER COST DECISION — 2026-09-20:** the assistant must use the cheapest available OpenAI model without exception. Official OpenAI documentation identifies pinned `gpt-5-nano-2025-08-07` as the cheapest GPT-5 model at the decision date.
- **SECRET BOUNDARY:** an API credential was exposed in conversation and is treated as compromised. It must be revoked and rotated. The repository, reports, logs, prompts, browser bundle, and memories must never contain or use it; a replacement may exist only as server-side `OPENAI_API_KEY`.
- **FACT:** the current runnable surface is the React/TypeScript/Vite validation app in `web/`; it loads the dated ClinicalTrials.gov snapshot in `web/data/india-oncology-trials.json`.
- **DECISION:** deliver the authorised expansion in dependent, reversible slices. Supabase and Vercel Functions are pilot infrastructure, not product lock or approval for PHI.
- **INFERENCE:** the blueprints are the target experience for implementation, not evidence that the workflow or product value has been validated.
- **OPEN:** `P5` validation, persona ownership, buyer, local burden, and the operational KPI remain unresolved. Implementation does not close those gates.

## Current frontend architecture decision

- **FACT — 2026-09-20 review:** [`product/TRIAL_RELAY_EVIDENCE_LED_REVIEW.md`](product/TRIAL_RELAY_EVIDENCE_LED_REVIEW.md) found a 4,433-line browser-native frontend with duplicated global state and render logic, no stable routes, and poor testability. It also observed materially unreadable typography, composite views, and delivery friction across the core journeys.
- **DECISION:** the documented typed-component-stack trigger is met. Use React, TypeScript, and Vite with static-host-safe hash routes. Retain the dated `web/data/india-oncology-trials.json` artifact, five destinations including My studies, source/site authority separation, browser-memory patient facts, and fail-closed optional pilot services. Approved research remains manual/unscored and separate from synthetic assessment.
- **RATIONALE:** routing, typed domain models, component boundaries, explicit loading/error states, and independently reviewable pages solve demonstrated product and maintenance failures. The owner has now separately approved a named Supabase/Vercel pilot boundary for authenticated no-PHI communication, official-source APIs, and a source-only assistant; all other backend, identity, data, and clinical uses remain prohibited.
- **RUNTIME CONTRACT:** `npm run dev` serves the validation surface; `npm run build` performs strict TypeScript validation and produces static output. The registry snapshot is emitted as a separate static asset rather than copied into the application bundle.
- **REASSESSMENT TRIGGER:** revisit this stack only if direct Phase 6 evidence or an approved production boundary introduces a requirement it cannot meet. Dependency novelty alone is not a reason to migrate again.

## Product boundary

The implementation may support general trial discovery, source and status comparison, human-authored questions, owned operational tasks, synthetic patient workspaces, institutionally approved de-identified browser-only research workspaces, explicit human criterion review, deterministic unranked cohort filters, official-source evidence, authenticated no-PHI collaboration, audited no-PHI referral-state handoff, and approximate registry geography.

**Dated synthetic-only exception:** the 2026-10-01 authority permits deterministic demonstration pre-screening and transparent criteria-support review ordering for supplied synthetic records. The prohibitions below continue to apply to real patients and approved research; no close-match policy, autonomous eligibility, treatment recommendation, or clinically validated model is authorised by this exception.

It must not:

- ingest identifiable patient or participant data;
- infer patient facts from records;
- match or rank trials for a patient;
- determine eligibility;
- recommend treatment;
- replace the EMR, registry, tumour board, treating clinician, or trial team as the authoritative source;
- add CTRI or WHO ICTRP product ingestion without approved access and reuse terms;
- imply that registry recruitment status proves that an India site can enrol today.
- send patient facts, uploaded research facts, identifiers, or PHI to OpenAI, Supabase communication, evidence APIs, analytics, logs, or map providers;
- describe deterministic source coverage or explicit cohort filters as a match, close match, recommendation, ranking, or eligibility result;
- accept free-form files or schema fields containing identity, contact, full-date, or long-identifier data;
- represent source-only AI output as an official site response or clinical conclusion;
- represent approximate map placement as route, travel feasibility, access, capacity, or current site availability.

Real registry trial data, approved de-identified research facts, synthetic workflow data, human-authored state, and generated source summaries must remain visibly distinct.

## Delivery principles

1. **One coherent job per pull request.** A review should demonstrate one complete user-observable outcome, not a collection of unrelated components.
2. **One dependent UI pull request at a time.** Branch every slice from newly updated `main`; do not stack routes, state, or shared-design work on an unmerged predecessor.
3. **No speculative platform work.** Add a backend, authentication system, persistence layer, deployment change, or data source only with a named requirement and separate owner authority. Frontend structure, tooling, and dependencies may change under the owner's conditional authorisation when a review slice records the maintainability or delivery need and preserves the privacy, security, and no-build-or-equivalent local-run boundary.
4. **Context before controls.** Each detailed view has one dominant trial, patient, thread, or handoff. Supporting operations remain attached to that entity.
5. **Authority is visible.** Important state always names its source or human authority and date. Unknown and conflicting states remain explicit.
6. **No hidden clinical logic.** Patient context never changes the trial list ordering or creates an overall eligibility score.
7. **Accessible reading order first.** Spatial overlap, motion, and translucency enhance a conventional DOM order; they never replace it.
8. **Evidence-gated continuation.** Failed usability or safety evidence causes simplification or rework before another dependent slice starts.

## Pull-request cadence

- Target **one merge candidate every one to two working days** during active implementation; this is a review-size guardrail, not a delivery quota.
- Keep **one dependent implementation PR open at a time** and merge only after its observable scenario and repository checks pass.
- Branch each slice from updated `main`; never push directly to `main`.
- Use a focused `feat/...` branch, a concise outcome-based PR title, and a body containing scope, non-goals, screenshots or observed states, verification, privacy checks, and remaining risk.
- Prefer one to three meaningful commits during review and squash feature PRs at merge. Preserve separate commits only when they are independently useful review checkpoints.
- If a slice cannot be reviewed in about 30 minutes or crosses more than one primary user job, split it before review.
- Merge only after the observable acceptance scenario passes on desktop and mobile, keyboard focus remains usable, the browser console is clean, deterministic repository checks pass, and the intended file set/privacy boundary is reviewed.
- Do not stack a dependent PR on an unmerged UI PR. Independent research or documentation may proceed separately when it does not touch the same files or change the current product contract.

## Required checks for every implementation PR

1. Enumerate the intended changed files.
2. Confirm ignored sensitive inputs remain ignored and untracked.
3. Run `python3 research/validate_ledger.py`.
4. Run `npm run build` from `web/` for strict TypeScript validation and production output.
5. Run `python3 scripts/fetch_india_oncology_trials.py --validate-only` when trial data or its presentation contract changes.
6. Serve and exercise the actual `web/` surface.
7. Verify the changed journey at one desktop viewport and one narrow mobile viewport.
8. Verify keyboard navigation, visible focus, no page-level horizontal overflow, and reduced-motion behavior for changed interactions.
9. Observe the browser console for errors and warnings.
10. Record the exact scenario, observed result, remaining risk, and evidence report when the slice forms a governance checkpoint.
11. For the authorised expansion, verify fail-closed configuration, no identifiers or PHI, no patient facts outside browser memory, no patient data in AI prompts, no rank/score/eligibility language, explicit source citations, RLS/audit contracts, and approximate-map precision disclosures.

## Evidence-led remediation sequence

The 2026-09-20 owner review authorises twenty reversible implementation items. Deliver them as five dependent merge candidates:

1. **Typed routed foundation** — React/TypeScript/Vite shell, hash routes, readable tokens, collapsed mobile chrome, separate registry asset, and the review artifact.
2. **Trial workflow** — concise/paginated library, normalized display taxonomy with raw provenance, accessible preview, dedicated Trial Detail, chronological Trial Room, and evidence-linked corrections.
3. **Patient workflow** — several coherent synthetic workspaces, synthetic-only creation, fact-level source badges, dedicated sectioned workspace and Patient–Trial Review, complete retained criterion excerpts, explicit completeness, and human-created missing-information tasks.
4. **Role and attention workflow** — role-specific Home activity, one attention-focused Inbox with no automatic unverified-site tasks, and minimal simulated handoff wording that cannot imply transmission.
5. **Integrated evidence** — responsive, keyboard, focus, console, reduced-presentation, print, deterministic, privacy, plan, governance, and Phase 6 protocol reconciliation.

The seven future product hypotheses and five direct oncology-user/product-lock tasks in the review remain explicitly governance-gated. They are not implementation backlog and cannot be silently promoted by completing this redesign.

## Phased delivery

### Phase 0 — structural shell and delivery controls

**Goal:** make the two starting journeys and four-destination information architecture immediately visible without changing clinical or data behavior.

Planned review slices:

1. **Home and primary navigation** — add Home; reduce global navigation to Home, Trials, Patients, and Inbox; provide the two dominant entry actions and a contextual recent-work rail; keep existing operational tools reachable from relevant context.
2. **Static source split** — after the shell is accepted, extract stable CSS and JavaScript from `web/index.html` without behavior changes. Preserve a no-build local run path.

Acceptance:

- a first-time user can identify the two starting journeys within five seconds;
- only Home, Trials, Patients, and Inbox appear in global navigation;
- no existing validation workflow becomes unreachable;
- the real-registry/synthetic-workflow boundary remains visible;
- desktop and mobile reading order remain coherent.

### Phase 1 — trial-first workspace

**Goal:** complete the general trial discovery and source-verification story before expanding patient workflow.

Planned review slices:

1. **Trial library** — precise result list, compact filters, persistent result count and snapshot date, List/Map control placeholder, semantic source traces, and stable empty/loading/error states.
2. **Trial profile** — one dominant trial entity with registry source plane, India sites, separate registry and site-confirmed status, source/date provenance, and explicit unknown/conflict states.
3. **Follow and question** — follow a trial, open its Trial room, post a general operational question, and resolve the thread into an answer, task, correction, or unresolved state.

Acceptance:

- the user can distinguish registry status, site-confirmed status, and unknown state without relying on colour;
- selecting and closing a trial profile preserves search position and focus;
- no patient context affects result ranking;
- source links and snapshot dates remain available at the point of use.

### Phase 2 — unified Inbox and operational ownership

**Goal:** consolidate updates, messages, and assigned work without creating a dashboard of disconnected metrics.

Planned review slices:

1. **Inbox stream** — one flowing list grouped by Updates, Messages, and Tasks; each row names source, owner, and due state.
2. **Contextual resolution** — open an item in place, return focus to its origin, and move to the attached trial, thread, verification, or referral.
3. **Notification rules** — configure factual operational alerts with named recipients, delivery channel, repeat control, and stop condition.

Acceptance:

- users can identify who owns the next action and why the item exists;
- alert styling never implies clinical recommendation or eligibility;
- the same work item is not duplicated across global queues.

### Phase 3 — patient-first workspace

**Goal:** support a clinician-led, source-linked review using synthetic patient data only.

Planned review slices:

1. **Patient workspace** — synthetic identity header, original EMR source references, recent work, and clear authority boundaries.
2. **Manual trial selection and criterion review** — the clinician chooses a trial, records a per-criterion human state, links evidence, and records unknowns without an aggregate score.
3. **Missing-information tasks** — assign source retrieval or clarification work to a named person with due state and provenance.

Acceptance:

- every patient and record is visibly synthetic;
- the app does not infer facts, rank trials, or state eligibility;
- the sequence remains `Criterion → Source record → Human review state → Next action` on narrow screens.

### Phase 4 — referral, tumour-board, and trial-team handoff

**Goal:** preserve ownership and acknowledgement from human review through formal trial-team screening.

Planned review slices:

1. **Referral packet** — explicit source manifest, purpose, recipient, owner, version, expiry, and human approval before release.
2. **Referral lifecycle** — Draft → Approved → Sent → Acknowledged → Screening → Closed, including unable-to-contact and correction paths.
3. **Tumour-board context** — route a bounded packet, record only a signed human decision reference, assign the next operational step, and preserve audit history.
4. **Trial-team outcome** — record the authorised trial-team screening result neutrally and return the next task to the treating team.

Acceptance:

- no packet releases autonomously;
- every transition has an actor, timestamp, source, and permissible next state;
- a missing response remains unresolved and never becomes a negative clinical conclusion.

### Phase 5 — geographic and spatial refinement

**Goal:** add the blueprint’s spatial language only after the information architecture and authority model are stable.

Planned review slices:

1. **List/Map continuity** — an accurate India view over the same trial dataset; approximate locations labelled as approximate; selection persists across views.
2. **Context lenses and relationship paths** — anchored trial, source, thread, and handoff surfaces with restrained depth and no decorative connectors.
3. **Responsive and reduced-presentation modes** — mobile flattening, reduced motion, reduced transparency, opaque print output, and preserved source/date labels.

Acceptance:

- the map does not imply travel feasibility, site availability, or fabricated coordinate precision;
- every connector represents a real relationship;
- the workflow remains complete without animation, translucency, or desktop positioning.

### Phase 6 — validation and product-lock evidence

**Goal:** determine whether the implemented journey deserves continued investment.

Observe oncology users attempting the smallest end-to-end scenario without instruction. Record only de-identified aggregate evidence for:

- time to find a plausible trial;
- fields trusted, distrusted, or missing;
- ability to distinguish registry and site-confirmed status;
- source-link use;
- ability to identify the next owner and unresolved state;
- value of follow, Trial room, Inbox, and referral acknowledgement;
- steps that duplicate existing hospital or coordinator work.

The owner decides whether to retain, simplify, supplement, or stop each major capability. No implementation artifact alone closes `P5` or establishes product lock.

## Implementation status

| Phase | Implemented slices | Merge evidence | State |
|---|---|---|---|
| Phase 0 | Home/navigation; static source split | Pull requests `#2`–`#3` | **FACT — implemented** |
| Phase 1 | Trial library; source-first profile; follow and Trial room | Pull requests `#4`–`#6` | **FACT — implemented** |
| Phase 2 | Unified Inbox; contextual resolution; safe notification rules | Pull requests `#7`–`#9` | **FACT — implemented** |
| Phase 3 | Synthetic patient workspace; clinician criterion review; missing-information tasks | Pull requests `#10`–`#12` | **FACT — implemented** |
| Phase 4 | Versioned packet; lifecycle; tumour-board reference; authorised trial-team outcome | Pull requests `#13`–`#16` | **FACT — implemented** |
| Phase 5 | Geographic lens; relationship paths; responsive/reduced/print modes | Pull requests `#17`–`#19` | **FACT — implemented** |
| Phase 6 | Direct oncology-user observation and product-lock decision | No qualifying user-session evidence yet | **OPEN — evidence required** |

Implementation completion does not close `P5`. The validation app remains a private comparative-discovery instrument, and every patient, EMR, board, packet, message, role, task, and outcome example remains synthetic.

## Phase 6 validation-ready protocol

Use only supplied synthetic cases `SYN-001`–`SYN-012` (or subsequent controlled demo intake) and the dated public ClinicalTrials.gov snapshot. Do not enter, paste, photograph, record, or retain identifiable patient or participant information.

Run two unprompted scenarios with treating oncologists and operational coordinators or trial navigators:

1. **Trial-first:** find an India-located oncology trial for a condition/location chosen by the participant; distinguish registry status from independent site confirmation; inspect the exact source/date; follow the trial; ask one general operational question; find the resulting state in Inbox.
2. **Patient-to-handoff:** inspect a supplied synthetic patient's original evidence; have the demo reviewer inspect and publish a source-linked demonstration model; run contextual pre-screening; inspect exact criterion traces; accept and resolve an information task without inferring facts; record human criterion review and a separate PI disposition; prepare a version-bound packet and explicitly simulate its lifecycle. Nothing is sent. Publication is not clinical qualification.

For each de-identified session, retain only:

- participant role and care setting at aggregate-safe granularity;
- scenario completion and elapsed time;
- fields trusted, distrusted, or missing;
- whether registry and site-confirmed states were distinguished correctly;
- source-link use;
- whether the participant identified the current owner, due state, and unresolved state;
- terms or controls misunderstood;
- steps duplicating the current hospital/coordinator workflow;
- keep, simplify, remove, or investigate recommendation with rationale.

Stop and rework before further sessions if the interface causes a participant to infer current site availability, patient eligibility, treatment recommendation, autonomous packet release, or a system-generated board/trial-team decision. The owner still decides the participant threshold and closes or redirects `P5`.

## Evidence-led remediation status

| Delivery slice | Review items closed | Merge evidence | State |
|---|---|---|---|
| Typed routed foundation | Sustainable stack; readable type roles; collapsed mobile chrome | Pull request `#21` | **FACT — implemented** |
| Trial workflow | Concise rows; normalized display taxonomy with raw provenance; explicit result limits/pagination; preview versus dedicated detail; chronological Trial Room; evidence-linked corrections | Pull request `#22` | **FACT — implemented** |
| Patient workflow | Coherent pairing; searchable workspace list; dedicated review; sectioned workspace; several fixtures; synthetic-only creation; per-fact source badges; prominent completeness | Pull request `#23` | **FACT — implemented** |
| Role and attention workflow | No automatic unverified-site tasks; attention Inbox; role-specific Home activity; explicitly unsent simulated handoff | Pull request `#24` | **FACT — implemented** |
| Integrated evidence and reconciliation | Strict build; production failure/retry; desktop/mobile; keyboard/focus; console; reduced presentation; print; deterministic/privacy checks; governed deferrals | Pull request `#25` | **FACT — implemented** |

All twenty implementation-authorized roadmap items in the 2026-09-20 evidence-led review are represented in the validation surface. This is implementation evidence, not direct oncology-user validation or product lock.

## Owner-authorized expansion sequence

1. **Explicit coverage and discovery** — Trial Detail patient launcher, strict approved de-identified JSON import, manual criterion review, deterministic cohort-filter counts, and transparent unranked public-registry discovery.
2. **Official evidence and source-only assistant** — current ClinicalTrials.gov evidence API/feed and authenticated `gpt-5-nano-2025-08-07` Trial Room assistant with citations, no patient context, and no official-response authority.
3. **Authenticated communication and no-PHI handoff** — Supabase Auth, RLS, realtime room messages, membership/authority controls, referral-state metadata, and immutable audit events; no patient payload or attachment.
4. **Approximate spatial lens** — Three.js/React Three Fiber India diorama using a Natural Earth boundary and the approved curated city/state centroid table, with visible unplaced coverage and no route/travel/access claim.
5. **Integrated qualification** — dependency audit, API and RLS contracts, desktop/mobile/keyboard/console/reduced/print, source failure, privacy scans, and live-service blockers.

Missing Supabase project configuration and a rotated server-side OpenAI key block live external-service acceptance; they do not permit a mock or browser-exposed fallback.

## Expansion delivery status

| Slice | Merge evidence | State |
|---|---|---|
| Explicit coverage and discovery | Pull request `#28` | **FACT — implemented** |
| Official evidence and source-only assistant | Pull request `#29` | **FACT — implemented; live assistant acceptance BLOCKED by service configuration** |
| Authenticated communication and no-PHI handoff | Pull request `#30` | **FACT — schema/client implemented; live auth/realtime acceptance BLOCKED by Supabase configuration** |
| Approximate Three.js spatial lens | Pull request `#31` | **FACT — implemented** |
| Integrated qualification | Pull request `#32` | **FACT — reachable implementation verified; live Supabase/OpenAI acceptance BLOCKED by configuration** |

## Expansion authorization state

| Review item | State | Authorised implementation boundary |
|---|---|---|
| Transparent unranked assisted discovery | **FACT — implemented** | Deterministic visible registry filters and input trace; patient-neutral order |
| Cohort-based library filtering | **FACT — implemented** | Clinician-selected explicit fact filters, unranked workspace count, manual review only |
| Trial-specific evidence feed | **FACT — implemented** | Official trial source with provenance and current-source comparison |
| AI Trial Room assistant | **FACT — implemented; LIVE BLOCKED** | Server-side pinned cheapest model; official sources and room context only; citations; no patient facts or official-response authority |
| Real Trial Room communication | **FACT — implemented; LIVE BLOCKED** | Supabase authenticated staff, membership/RLS/realtime/audit, no PHI |
| Secure referral handoff | **FACT — implemented; LIVE BLOCKED** | Audited ownership/state metadata only; no patient payload, file, or external clinical exchange |
| Map as an access-planning lens | **FACT — implemented as approximate lens** | Three.js India boundary plus curated approximate registry centroids; no route/travel/access/capacity claim |
| Treating-oncologist trial-first sessions | **BLOCKED** | Owner-set participant threshold plus exact recruitment/contact authorization |
| Coordinator patient-first sessions | **BLOCKED** | Owner-set participant threshold plus exact recruitment/contact authorization |
| Trial-side role sessions | **BLOCKED** | Owner-set participant threshold, trial-side access, and exact recruitment/contact authorization |
| Comparative workflow interview | **BLOCKED** | Approved recruitment/contact and aggregate-safe evidence protocol |
| Product-lock decision | **BLOCKED** | Sufficient direct Phase 6 evidence and explicit repository-owner decision |

## Current governed work

The owner-authorized expansion is implemented through pull requests `#28`–`#32` and deployed at <https://onco-grid-trial-relay-validation.vercel.app>. Reachable production browser/API behavior passes. Live Supabase auth/RLS/realtime/two-user handoff and live OpenAI output remain blocked until approved configuration and a rotated server-side key exist. `P5` and Phase 6 remain open: deployment does not establish workflow fit, clinical effectiveness, institutional acceptance, or product lock. Direct sessions still require owner-set thresholds and exact recruitment/contact authorization.

Operational pickup instructions for service configuration, migration, live qualification, open gates, and rollback are maintained in [`PILOT_ACTIVATION_RUNBOOK.md`](PILOT_ACTIVATION_RUNBOOK.md).
