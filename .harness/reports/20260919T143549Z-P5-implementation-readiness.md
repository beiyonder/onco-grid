# Work report — P5 C3 Trial Relay implementation readiness

## Problem

The blueprint implementation had reached Phase 5 across many small merged slices, but the plan still named the last UI slice as current and did not distinguish implemented product behavior from still-missing direct oncology-user evidence. A final integrated run was needed to prove that independently reviewed slices composed into one workflow and that privacy, source, human-authority, responsive, reduced-presentation, and repository checks still passed together.

## Decision

Reconcile `IMPLEMENTATION_PLAN.md` with the merged state. Mark Phase 0–5 implementation as factual and Phase 6 as open evidence work. Freeze two synthetic, de-identified Phase 6 observation scenarios and the aggregate-safe fields to retain. Keep `P5` current; do not claim validation, product lock, production readiness, or deployment readiness. Run a clean integrated browser smoke plus the critical dynamic path through Trial room, clinician criterion review, missing-information task, versioned packet, approval/lifecycle, authorised trial-team outcome, treating-team review, closure, packet-bound tumour-board reference, and synthetic EMR task.

## Evidence

- Merge history — pull requests `#2`–`#19` merged Phase 0–5 in coherent review slices: shell/source split; Trial library/profile/room; Inbox/context/rules; patient/criteria/missing tasks; packet/lifecycle/board/outcome; Map/relationships/responsive presentation.
- Clean Home/Trial entry — Home loaded 285 registry records and 16 Sept 2026 source date, showed the two intended journeys and only Home/Trials/Patients/Inbox. Home → Trials loaded 285 records, selected `NCT06764875`, exact ClinicalTrials.gov source plane, and five real relationship nodes.
- List/Map integration — clean Map rendered 64 clusters and explicit 106-site/60-trial unplaced coverage. Returning to List preserved selection, filters, source-first profile, and focus.
- Trial room — a general question became Unresolved; independent site state remained `Not independently site-verified`; Inbox Messages increased without a negative-site inference.
- Patient review — synthetic `SYN-2047` retained source authority. Dr M. Shah recorded criterion 2 Needs clarification; A. Rao created `MISS-001`; criterion, reviewer, task, due state, Recent work, and Inbox remained linked.
- Referral integration — `REF-2201 v1.0` retained the exact three-source manifest and one clinician-reviewed criterion. Human actions advanced it through Approved, Sent, Acknowledged, and Trial-team screening.
- Trial-team outcome — verified Site steward recorded `OUT-001 · Screening deferred`; `OUT-TASK-001` returned to Treating oncology unit. Dr M. Shah reviewed the task; only then did Close handoff appear, producing stage 7 Closed without a Trial Relay recommendation.
- Tumour-board integration — a separately versioned `REF-2202 v2.0` board-purpose packet routed to the human board. The build retained signed reference `MDT-DEMO-20260919-2202`, assigned A. Rao/Treating oncology unit/due date, previewed `Clinical decision copied: No`, and wrote synthetic `TASK-2070` with acknowledgement pending.
- Failure and authority paths across the merged app — failed registry load retained labelled synthetic fallback and retry; coordinator official Trial-room response was blocked; coordinator criterion changes were blocked; empty packet manifest was blocked; packet Send required version-bound approval; packet correction invalidated approval; site role could not complete treating-team outcome review; packet closure waited for that review; Add to board required a bounded board-purpose packet.
- Desktop integration — after the dynamic path, primary workflows remained usable at `1440×1000`. A clean cross-view smoke produced no page-level horizontal overflow.
- Narrow integration — Home, Trials, Patients, and Inbox each reported `scrollWidth = clientWidth = 390` at `390×844`.
- Browser health — final cross-view smoke produced zero console warnings, console errors, or page errors. Slice-level evidence additionally verifies loading/empty/error states, keyboard focus, exact return positions, reduced motion, raw-CDP reduced transparency, and opaque print fallback.
- Deterministic checks — `node --check web/app.js` passed; `python3 research/validate_ledger.py` passed 70 records; `python3 scripts/fetch_india_oncology_trials.py --validate-only` passed 285 records; `git diff --check` passed; `serena memories check .` reported no referential-integrity issues; `serena project health-check .` passed.
- Privacy boundary — intended publish set was enumerated; `chatroom_notes.md`, `Oncologist Pain Points_v2.docx`, and `.private/` remained ignored; final secret/email-pattern scan returned no matches.

## Risks and gaps

**OPEN:** no direct oncology-user session has qualified these workflows. Persona ownership, terminology, buyer, local burden, operational KPI, value of Trial room/Map/Inbox, workflow duplication, and product lock remain unresolved. The app uses public dated ClinicalTrials.gov records plus synthetic patient, EMR, site-confirmation, message, packet, board, task, role, and outcome state. Browser memory resets on reload. No backend, production identity, authorization, persistence, scheduler, external message, packet transmission, EMR integration, real screening, or precise geographic source exists. The curated approximate Map cannot support access or travel decisions.

## Next

Run the two Phase 6 scenarios in `IMPLEMENTATION_PLAN.md` with authorised oncology users using synthetic data only. Retain only de-identified aggregate observations. Stop and rework immediately if a participant infers site availability, patient eligibility, treatment recommendation, autonomous release, or a system-generated board/trial-team decision. The owner then decides participant threshold and whether to retain, simplify, supplement, replace, or stop the concept.

## Sign-off needed

No separate owner review is required to merge this reconciliation under the 2026-09-19 autonomous implementation-merge decision. Repository-owner sign-off remains required for participant threshold, external recruitment/contact, interpretation of validation evidence, `P5` closure, product lock, production architecture/dependencies, deployment, security/privacy posture, real patient data, identity/authorization, persistence, external integrations, precise geographic sources, and any clinical capability.
