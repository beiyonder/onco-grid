# Project Governance

## Project authority

- **Purpose:** Identify and validate one evidence-backed, non-clinical oncology workflow problem suitable for a focused product concept and a measurable 60–90-day pilot.
- **Owner and final sign-off:** Repository owner (`beiyonder`).
- **Last updated:** 2026-09-03.
- **Repository classification:** Research repository. No application, library, service, or runtime has been selected.
- **Public remote:** `https://github.com/beiyonder/onco-grid`.

## Measurable outcome

The research phase succeeds when one bounded problem contract names:

1. a primary oncology user and setting;
2. a recurring trigger and job to be done;
3. the current actors, artifacts, systems, handoffs, and workaround;
4. attributable evidence of frequency or operational burden;
5. the reason existing workflows or products remain insufficient;
6. a safe non-clinical output and named human-review boundary;
7. a light integration boundary;
8. one operational KPI that a 60–90-day pilot can measure;
9. the strongest contrary evidence and unresolved risk;
10. explicit owner approval to enter product design and implementation.

## Hard constraints

- Doctor / Care Team Facing oncology stream.
- Workflow-first and light phase-one integration.
- Human control and auditability for important automated actions.
- No diagnosis, treatment recommendation, clinical decision support, clinical risk scoring, medical-data interpretation, or autonomous clinical advice.
- No identifiable patient or participant data in research, repository artifacts, memory, prompts, logs, fixtures, screenshots, reports, or demos.
- Research claims retain source, context, method, limitation, and evidence strength.
- Internet research does not silently substitute for local workflow observation; transfer limits remain visible.
- Existing project conventions, evidence, and owner decisions outrank agent proposals.

## Explicit non-goals for the current research phase

- Selecting an application architecture or production stack.
- Building a generic oncology EMR, dashboard, knowledge assistant, or tumour-board platform.
- Designing patient-specific clinical recommendations or interpretations.
- Claiming market novelty before the existing-solution comparison is complete.
- Creating an evaluator fleet, workflow engine, autonomous governance system, or parallel worktree system.
- Publishing raw notes that contain personal or health-related information.

## Status vocabulary

- `UNKNOWN` — not yet investigated or evidence is absent.
- `CURRENT` — the single coordinate receiving active work.
- `READY` — prerequisites exist; work has not started.
- `BLOCKED` — cannot proceed without named evidence or owner decision.
- `READY-FOR-SIGNOFF` — objective evidence passes; owner closure is pending.
- `DONE` — named evidence passed and the authorised gate owner closed the phase.
- `REWORK` — evidence failed or the accepted result was invalidated.

Exactly one coordinate must be `CURRENT`.

## Phase coordinates

| Coordinate | Phase | Owner | Dependency | Deliverable | Acceptance evidence | Status | Next action |
|---|---|---|---|---|---|---|---|
| `P0` | Orientation and harness | Agent; owner signs off | Existing research files and Git repository | Public empty remote, Orca registration, Serena project memory, OMP MCP wiring, mandatory rules, governance, and `C0` report | Exact tool versions/status, repository registration, Serena checks, JSON validation, gap register, and report path | `READY-FOR-SIGNOFF` | Owner reviews the bootstrap and sensitive-file publication boundary. |
| `P1` | Research protocol | Agent; owner owns scope | `P0` artifacts available | Testable claims, research taxonomy, source policy, and atomic evidence-ledger schema | Every supplied pain point maps to testable claims; schema rejects missing source/context/scope fields; `C1` freezes goal, non-goals, and acceptance evidence | `READY-FOR-SIGNOFF` | Owner reviews `.harness/reports/20260903T094928Z-P1-research-protocol.md`. |
| `P2` | Evidence collection | Agent | `P1` protocol and schema frozen | Indian workflow maps, theme research, open problem scan, solution landscape, operational measurements, contradiction review | Every retained data point passes the frozen schema; claims retain provenance and transfer limits; each leading theme includes disconfirming evidence | `READY-FOR-SIGNOFF` | Owner reviews the `C2` and `C3` evidence reports. |
| `P3` | Synthesis | Agent | Evidence-collection threshold is met | Cross-theme evidence matrix and approximately three serious opportunity candidates | Each candidate names actor, trigger, job, burden, workaround, alternative, safety boundary, KPI, uncertainty, and contrary evidence | `READY-FOR-SIGNOFF` | Owner reviews `.harness/reports/20260903T101252Z-P3-synthesis-gate.md`. |
| `P4` | Problem selection and build readiness | Repository owner | `P3` candidate evidence | One selected discovery lane or a documented decision to continue discovery | Owner accepts the lane, safe boundary, contrary evidence, and remaining local-validation risk | `DONE` | Candidate B selected on 2026-09-03; decision recorded in `.harness/reports/20260903T102128Z-P4-owner-decision.md`. |
| `P5` | Tumour-board workflow validation | Agent; owner signs product lock | Candidate B selected at `P4` | Evidence-backed problem contract for one exact post-board operational step | Named actor; current system and handoff; exact documentation/communication/ownership/completion failure; non-sensitive aggregate baseline; safe output; human boundary; contradiction update; `C4` gate report | `CURRENT` | Run structured oncologist sessions with the owner-authorised Trial Relay validation deployment as a comparative discovery instrument. Measure the trial-search/status/referral job and use the results to decide whether to retain, supplement, or replace Candidate B; the original P5 gate remains open. |

## Current-coordinate acceptance contract

`P5` is complete only when:

- the owner of the current post-board workflow is named by role;
- one initial job is selected from human-decision documentation, authorised communication, operational ownership, or completion tracking;
- the current artifact, system, handoff, and workaround are documented;
- at least one attributable aggregate baseline or an explicit measurement plan exists;
- the proposed output records a human decision and never generates, ranks, or interprets clinical recommendations;
- confidentiality, access, retention, and audit boundaries are explicit;
- existing NCG/local capabilities and strongest contrary evidence are updated;
- the expanded private-source provenance and any completed questionnaire answers are classified before external outreach resumes;
- the owner accepts the resulting problem contract before product architecture begins.

## Checkpoint and report policy

Reports live in `.harness/reports/` and use `<UTC timestamp>-<coordinate>-<slug>.md`.

- `C0` — bootstrap complete.
- `C1` — research scope, schema, and acceptance evidence frozen.
- `C2` — first complete evidence slice or later first runnable product slice.
- `C3` — cross-source integration plus relevant failure or contradiction path observed.
- `C4` — phase-gate candidate.
- `C5` — blocker, authority boundary, or owner decision.
- `C6` — phase transition.

Every complete report contains exactly:

1. `Problem`
2. `Decision`
3. `Evidence`
4. `Risks and gaps`
5. `Next`
6. `Sign-off needed`

A coordinate can become `DONE` only when its row and report name the artifact or behaviour, exact command or scenario, observed result, remaining risk, and evidence report. Missing evidence creates a visible gap; silence never means success.

## Authority matrix

| Action | Agent authority | Owner sign-off required |
|---|---:|---:|
| Inspect, research, plan, and make reversible repository-local changes in authorised scope | Yes | No |
| Add or update research artifacts, checks, governance, reports, and project memory | Yes | No |
| Run non-destructive local checks and reproducible experiments | Yes | No |
| Create local branches and commits containing reviewed, non-sensitive material | Yes | No |
| Mark a task complete when predeclared objective evidence passes | Yes | No |
| Change project goal, scope, non-goals, acceptance threshold, or gate owner | No | Yes |
| Add or upgrade a production dependency or choose deployment/runtime topology | No | Yes |
| Change authentication, authorisation, secrets, permissions, privacy, retention, or security posture | No | Yes |
| Use patient, participant-identifying, customer, production, regulated, or sensitive data | No | Yes, plus applicable governance; hackathon rules may still prohibit it |
| Publish files, push commits, open or merge reviews, release, or deploy | No | Yes |
| Accept known failed evidence or waive a critical gap | No | Yes |

On 2026-09-03 the owner authorised the first non-sensitive publication with `chatroom_notes.md` and other sensitive/local material ignored, and required all project changes to reach the public default branch through pull requests. The one-time direct push of the existing empty `main` commit is permitted only to establish a PR base; it publishes no project file.

On 2026-09-17 the owner made the GitHub repository private and authorised a private, owner-controlled live oncologist validation build using real public India-located oncology trial records from the documented ClinicalTrials.gov API. The owner also authorised a Vercel validation deployment and required every remote code change to be pushed through the existing review branch and pull request—never directly to `main`. This is a validation instrument, not product lock: patient and EMR demonstrations remain synthetic; no identifiable patient data, automated patient matching, eligibility recommendation, treatment recommendation, or unapproved CTRI/WHO data use is authorised.

On 2026-09-19 the owner authorised implementation of the Trial Relay experience and visual-language blueprints through small review pull requests. This authorisation covers reversible changes to the existing static validation app; it does not close `P5`, select a production stack, approve new dependencies or data sources, or constitute product lock. The existing clinical, privacy, and human-authority boundaries remain unchanged.

On 2026-09-19 the owner authorised the agent to push and merge future implementation pull requests without separate owner review when the repository's observable acceptance, privacy, and safety checks pass. Every change must still use a review branch and pull request; direct pushes to `main` remain prohibited. The owner also authorised replacing the monolithic HTML architecture and selecting a more sustainable frontend stack when a named implementation slice demonstrates that the change is necessary for maintainability or delivery efficiency. This conditional authority does not approve a backend, new data source, production identity or persistence boundary, deployment-topology change, or any clinical capability.

On 2026-09-20 the owner supplied [`product/TRIAL_RELAY_EVIDENCE_LED_REVIEW.md`](product/TRIAL_RELAY_EVIDENCE_LED_REVIEW.md) and directed end-to-end remediation. The review establishes twenty reversible implementation items and identifies routing, duplicated state/render logic, testability, and delivery friction that satisfy the typed-component-stack trigger. React, TypeScript, and Vite are authorised for the static validation surface under the existing 2026-09-19 conditional frontend authority. The seven future product hypotheses and five direct-validation/product-lock items in the review remain governance-gated; this instruction does not authorise outreach, real data, external communication, persistence, production identity, patient ranking/matching, clinical capability, or `P5` closure.

The evidence-led remediation was delivered through pull requests `#21`–`#25`. All twenty implementation-authorized items are represented in the validation surface and passed the integrated C3 evidence report. This completion does not close `P5`: seven future product hypotheses remain `DEFERRED` or `BLOCKED`, five direct-validation/product-lock tasks remain `BLOCKED`, and the owner still controls participant threshold, recruitment/contact, evidence interpretation, product lock, and every production or clinical boundary.

On 2026-09-20 the owner explicitly authorised the seven previously gated product hypotheses under a narrower pilot contract: deterministic unranked assisted discovery; explicit cohort-filter counts; official-source evidence; a server-side citation-bound OpenAI assistant that excludes all patient facts and can never author an official response; Supabase-authenticated staff communication and audited referral-state handoff with no PHI; and an approximate Three.js registry map with no route, travel, access, capacity, or availability claim. Patient/trial work is explicit human criterion/source coverage only—never a score, ranking, close-match label, recommendation, or eligibility conclusion. Approved de-identified research JSON may exist only in browser memory after strict identifier rejection. The owner selected the cheapest pinned OpenAI model. A credential exposed in conversation is treated as compromised and must be revoked; it is not authorised for use, storage, logging, commit, prompt, or memory.

The owner-authorized expansion was delivered through pull requests `#28`–`#32`. Reachable browser, official-source, API-policy, security-contract, spatial, responsive, accessibility, dependency, and privacy evidence passes. This does not waive `GAP-PILOT-SERVICE-CONFIG`: live Supabase/Auth/RLS/realtime/two-user handoff and live OpenAI output remain unvalidated until approved service configuration and a rotated server-side credential exist. `P5`, direct workflow evidence, and product lock remain open.

On 2026-09-20 the owner authorised production deployment. The merged React/Vite build was first deployed to `https://onco-grid-trial-relay-validation.vercel.app` through prebuilt production deployment `dpl_4hNh6qcJyarCzx8roVA2nW2EqaDy`; live Home, List/Spatial lens, Trial Detail, official evidence, patient review entry, Trial Room fail-closed state, Handoff fail-closed state, mobile layout, APIs, headers, and browser health passed. The Vercel project now uses Root Directory `web`, Framework Vite, `npm ci`, `npm run build`, and `dist`. The next merged main commit automatically produced `dpl_GaryB2hJHg2CvHAauca96KUPRKbQ`, built both serverless functions, retained the production alias, and passed a fresh live spatial-lens check, confirming GitHub auto-deploy now uses the correct root. Deployment does not close `GAP-PILOT-SERVICE-CONFIG`, `P5`, or product lock.

## Gap register

| Gap | Status | Evidence | Owner | Next action |
|---|---|---|---|---|
| `GAP-SERENA-LANGUAGE` | Closed | `research/validate_ledger.py` became the first real source file; Python was configured, one file indexed, and Serena health-check passed | Agent | Re-index after future source-language changes. |
| `GAP-SETUP` | Closed for the validation surface | `web/package.json` defines the React/TypeScript/Vite development, strict typecheck, static build, and preview commands; the research ledger remains the canonical research check | Agent | Keep runtime and validation commands current when the frontend stack changes. |
| `GAP-PILOT-SERVICE-CONFIG` | Open | Supabase pilot was authorised but no project URL/publishable key is configured; the exposed OpenAI credential is rejected and a rotated server-side secret is not configured | Repository owner | Configure an approved Supabase project and rotated `OPENAI_API_KEY` through deployment/local secret stores; never send values in chat or commit them. Live auth/realtime/AI acceptance remains blocked until then. |
| `GAP-MCP-ACTIVATION` | Open | `.omp/mcp.json` is present, but OMP loads project MCP at session startup | Owner or next session | Launch OMP from the repository root, then run `/mcp list` and `/mcp test serena`. |
| `GAP-PUBLICATION-SANITIZATION` | Mitigated for the approved PR; open for raw-source publication | Root `.gitignore` excludes `chatroom_notes.md`, `Oncologist Pain Points_v2.docx`, private research inputs/recordings, local secrets, credentials, and key material; pre-push scanning is required | Repository owner | Publish only de-identified analysis by PR. Never publish the raw expanded DOCX or chat source without a separately approved sanitized replacement. |
| `GAP-DIRECT-WORKFLOW-OBSERVATION` | Accepted research limitation | Direct oncologist access has proven difficult; current phase uses independent research and internal analyst clarification | Repository owner | Keep transfer limits visible and do not claim desk research or selected accounts prove local workflow prevalence. |
| `GAP-TUMOUR-BOARD-LOCAL-WORKFLOW` | Narrowed, internally routed | V2 contains no answered tumour-board workflow; existing Indian examples still do not establish a current general target-site owner, acknowledgement, person-time, or baseline | Agent and repository owner | Ask the internal analyst first. Resume a separately approved external operator request only if internal evidence remains insufficient. |
| `GAP-OUTREACH-AUTHORITY` | Paused by owner | An external email was prepared but not sent; the owner redirected validation to the internal analyst after providing the expanded source | Repository owner | Do not send externally. Require fresh point-of-risk confirmation for the exact recipient, channel, and message if external outreach later resumes. |
| `GAP-V2-PROVENANCE` | Open | The expanded source mixes duplicate synthesis, proposed questionnaires, author assumptions, three sensitive caregiver accounts, and an uncited primer | Internal analyst and repository owner | Clarify authorship, sample, method, whether questionnaires were administered, and whether de-identified answer notes exist. |
| `GAP-CTRI-BULK-ACCESS` | Open; research mirror measured | Direct CTRI search is CAPTCHA/CSRF gated with no documented bulk API or open/commercial reuse terms found; the permitted WHO mirror was 4,611 primary records behind the CTRI homepage count and prohibits commercial/marketing/promotional use | Repository owner and source authority | Obtain written CTRI access/reuse terms and a supported current bulk/API path before any product or demo dependency; preserve the private WHO snapshot only for approved non-commercial research. |

## Report index

| Checkpoint | Coordinate | Report | Status |
|---|---|---|---|
| `C0` | `P0` | `.harness/reports/20260903T093943Z-P0-bootstrap.md` | Complete; owner sign-off pending |
| `C1` | `P1` | `.harness/reports/20260903T094928Z-P1-research-protocol.md` | Complete; owner sign-off pending |
| `C2` | `P2` | `.harness/reports/20260903T100755Z-P2-first-evidence-slice.md` | Complete; owner sign-off pending |
| `C3` | `P2` | `.harness/reports/20260903T100845Z-P2-evidence-integration.md` | Complete; owner sign-off pending |
| `C4` | `P3` | `.harness/reports/20260903T101252Z-P3-synthesis-gate.md` | Complete; owner decision pending |
| `C5` | `P4` | `.harness/reports/20260903T102128Z-P4-owner-decision.md` | Complete; Candidate B selected |
| `C5` | `P5` | `.harness/reports/20260903T110322Z-P5-public-workflow-validation.md` | Complete; local actor and baseline gap remains open |
| `C5` | `P5` | `.harness/reports/20260903T112712Z-P5-operator-validation-ready.md` | Complete; operator kit ready, external process account still required |
| `C5` | `P5` | `.harness/reports/20260903T114127Z-P5-outreach-authority.md` | Complete; all non-contact work exhausted, outreach approval required |
| `C5` | `P5` | `.harness/reports/20260903T123318Z-P5-v2-source-reassessment.md` | Complete; internal provenance clarification now precedes external outreach |
| `C5` | `P5` | `.harness/reports/20260913T134521Z-P5-ctri-data-access-quality.md` | Complete; dated non-commercial WHO mirror only, no product-data-source approval |
| `C5` | `P5` | `.harness/reports/20260917T133754Z-P5-live-validation-deployment.md` | Complete; real ClinicalTrials.gov snapshot deployed for owner-authorised oncologist validation |
| `C2` | `P5` | `.harness/reports/20260919T102253Z-P5-trial-relay-home.md` | Complete; merged through pull request `#2` |
| `C2` | `P5` | `.harness/reports/20260919T104204Z-P5-trial-relay-source-split.md` | Complete; merged through pull request `#3` |
| `C2` | `P5` | `.harness/reports/20260919T105058Z-P5-trial-library.md` | Complete; merged through pull request `#4` |
| `C2` | `P5` | `.harness/reports/20260919T110551Z-P5-trial-profile.md` | Complete; merged through pull request `#5` |
| `C2` | `P5` | `.harness/reports/20260919T112052Z-P5-trial-room.md` | Complete; merged through pull request `#6` |
| `C2` | `P5` | `.harness/reports/20260919T113355Z-P5-unified-inbox.md` | Complete; merged through pull request `#7` |
| `C2` | `P5` | `.harness/reports/20260919T114432Z-P5-inbox-context-resolution.md` | Complete; merged through pull request `#8` |
| `C2` | `P5` | `.harness/reports/20260919T115701Z-P5-notification-rules.md` | Complete; merged through pull request `#9` |
| `C2` | `P5` | `.harness/reports/20260919T120627Z-P5-patient-workspace.md` | Complete; merged through pull request `#10` |
| `C2` | `P5` | `.harness/reports/20260919T121825Z-P5-criterion-review.md` | Complete; merged through pull request `#11` |
| `C2` | `P5` | `.harness/reports/20260919T123529Z-P5-missing-information-tasks.md` | Complete; merged through pull request `#12` |
| `C2` | `P5` | `.harness/reports/20260919T124743Z-P5-referral-packet.md` | Complete; merged through pull request `#13` |
| `C2` | `P5` | `.harness/reports/20260919T130148Z-P5-referral-lifecycle.md` | Complete; merged through pull request `#14` |
| `C2` | `P5` | `.harness/reports/20260919T131652Z-P5-tumour-board-context.md` | Complete; merged through pull request `#15` |
| `C2` | `P5` | `.harness/reports/20260919T134104Z-P5-trial-team-outcome.md` | Complete; merged through pull request `#16` |
| `C2` | `P5` | `.harness/reports/20260919T135650Z-P5-geographic-trial-view.md` | Complete; merged through pull request `#17` |
| `C2` | `P5` | `.harness/reports/20260919T141239Z-P5-relationship-lenses.md` | Complete; merged through pull request `#18` |
| `C2` | `P5` | `.harness/reports/20260919T142331Z-P5-responsive-presentation.md` | Complete; merged through pull request `#19` |
| `C3` | `P5` | `.harness/reports/20260919T143549Z-P5-implementation-readiness.md` | Complete; Phase 0–5 integrated, Phase 6 oncology-user evidence remains open |
| `C2` | `P5` | `.harness/reports/20260920T144329Z-P5-typed-routed-foundation.md` | Complete; merged through pull request `#21` |
| `C2` | `P5` | `.harness/reports/20260920T150108Z-P5-evidence-led-trial-workflow.md` | Complete; merged through pull request `#22` |
| `C2` | `P5` | `.harness/reports/20260920T151051Z-P5-evidence-led-patient-workflow.md` | Complete; merged through pull request `#23` |
| `C2` | `P5` | `.harness/reports/20260920T151911Z-P5-evidence-led-attention-workflow.md` | Complete; merged through pull request `#24` |
| `C3` | `P5` | `.harness/reports/20260920T152948Z-P5-evidence-led-integration.md` | Complete; integrated through pull request `#25`; Phase 6 remains open |
| `C2` | `P5` | `.harness/reports/20260920T155218Z-P5-trial-site-spacing.md` | Complete; merged through pull request `#26` |
| `C2` | `P5` | `.harness/reports/20260920T160905Z-P5-registry-criteria-formatting.md` | Complete; merged through pull request `#27` |
| `C2` | `P5` | `.harness/reports/20260920T164029Z-P5-explicit-coverage-discovery.md` | Complete; merged through pull request `#28` |
| `C2` | `P5` | `.harness/reports/20260920T165548Z-P5-source-evidence-assistant.md` | Complete; merged through pull request `#29`; live AI acceptance blocked by service configuration |
| `C2` | `P5` | `.harness/reports/20260920T171636Z-P5-authenticated-no-phi-pilot.md` | Complete; merged through pull request `#30`; live Supabase acceptance blocked by project configuration |
| `C2` | `P5` | `.harness/reports/20260920T173557Z-P5-threejs-india-spatial-lens.md` | Complete; merged through pull request `#31` |
| `C3` | `P5` | `.harness/reports/20260920T174136Z-P5-owner-expansion-qualification.md` | Complete; integrated through pull request `#32`; live pilot acceptance remains blocked |
| `C3` | `P5` | `.harness/reports/20260920T180806Z-P5-production-deployment.md` | Complete; deployed to production and verified through pull request `#35`; live pilot services remain blocked |
| `C2` | `P5` | `.harness/reports/20260922T134644Z-P5-home-journey-alignment.md` | Complete; merged and deployed through pull request `#37` |
| `C2` | `P5` | `.harness/reports/20260922T144344Z-P5-liquid-glass-material.md` | Complete; stronger responsive glass material verified, review merge and deployment pending |

## References

- `AGENTS.md`
- `PILOT_ACTIVATION_RUNBOOK.md`
- `CONTEXT.md`
- `FOUNDATION.md`
- `HEALTHATHON_OFFICIAL.md`
- `ONCOLOGIST_INTERVIEW_FIELD_GUIDE.md`
- `Oncologist Pain Points.md`
- `product/TRIAL_RELAY_EVIDENCE_LED_REVIEW.md`
- `research/P5_TUMOUR_BOARD_VALIDATION.md`
- `research/P5_OPERATOR_VALIDATION_KIT.md`
- `research/PAIN_POINTS_V2_ANALYSIS.md`
- `.serena/memories/core.md`
- `.serena/memories/project_context.md`
- `.harness/reports/20260903T093943Z-P0-bootstrap.md`
- `.harness/reports/20260903T094928Z-P1-research-protocol.md`
- `.harness/reports/20260903T100755Z-P2-first-evidence-slice.md`
- `.harness/reports/20260903T100845Z-P2-evidence-integration.md`
- `.harness/reports/20260903T101252Z-P3-synthesis-gate.md`
- `.harness/reports/20260903T102128Z-P4-owner-decision.md`
- `.harness/reports/20260903T110322Z-P5-public-workflow-validation.md`
- `.harness/reports/20260903T112712Z-P5-operator-validation-ready.md`
- `.harness/reports/20260903T114127Z-P5-outreach-authority.md`
- `.harness/reports/20260903T123318Z-P5-v2-source-reassessment.md`
- `.harness/reports/20260913T134521Z-P5-ctri-data-access-quality.md`
- `.harness/reports/20260917T133754Z-P5-live-validation-deployment.md`
- `.harness/reports/20260919T102253Z-P5-trial-relay-home.md`
- `.harness/reports/20260919T104204Z-P5-trial-relay-source-split.md`
- `.harness/reports/20260919T105058Z-P5-trial-library.md`
- `.harness/reports/20260919T110551Z-P5-trial-profile.md`
- `.harness/reports/20260919T112052Z-P5-trial-room.md`
- `.harness/reports/20260919T113355Z-P5-unified-inbox.md`
- `.harness/reports/20260919T114432Z-P5-inbox-context-resolution.md`
- `.harness/reports/20260919T115701Z-P5-notification-rules.md`
- `.harness/reports/20260919T120627Z-P5-patient-workspace.md`
- `.harness/reports/20260919T121825Z-P5-criterion-review.md`
- `.harness/reports/20260919T123529Z-P5-missing-information-tasks.md`
- `.harness/reports/20260919T124743Z-P5-referral-packet.md`
- `.harness/reports/20260919T130148Z-P5-referral-lifecycle.md`
- `.harness/reports/20260919T131652Z-P5-tumour-board-context.md`
- `.harness/reports/20260919T134104Z-P5-trial-team-outcome.md`
- `.harness/reports/20260919T135650Z-P5-geographic-trial-view.md`
- `.harness/reports/20260919T141239Z-P5-relationship-lenses.md`
- `.harness/reports/20260919T142331Z-P5-responsive-presentation.md`
- `.harness/reports/20260919T143549Z-P5-implementation-readiness.md`
- `.harness/reports/20260920T144329Z-P5-typed-routed-foundation.md`
- `.harness/reports/20260920T150108Z-P5-evidence-led-trial-workflow.md`
- `.harness/reports/20260920T151051Z-P5-evidence-led-patient-workflow.md`
- `.harness/reports/20260920T151911Z-P5-evidence-led-attention-workflow.md`
- `.harness/reports/20260920T152948Z-P5-evidence-led-integration.md`
- `.harness/reports/20260920T155218Z-P5-trial-site-spacing.md`
- `.harness/reports/20260920T160905Z-P5-registry-criteria-formatting.md`
- `.harness/reports/20260920T164029Z-P5-explicit-coverage-discovery.md`
- `.harness/reports/20260920T165548Z-P5-source-evidence-assistant.md`
- `.harness/reports/20260920T171636Z-P5-authenticated-no-phi-pilot.md`
- `.harness/reports/20260920T173557Z-P5-threejs-india-spatial-lens.md`
- `.harness/reports/20260920T174136Z-P5-owner-expansion-qualification.md`
- `.harness/reports/20260920T180806Z-P5-production-deployment.md`
- `.harness/reports/20260922T134644Z-P5-home-journey-alignment.md`
- `.harness/reports/20260922T144344Z-P5-liquid-glass-material.md`
