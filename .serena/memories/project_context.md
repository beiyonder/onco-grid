# Project context

## Purpose and measurable outcome

Onco Grid is an evidence-led oncology workflow research project in the Doctor / Care Team Facing Health-a-thon stream. The immediate outcome is one bounded, evidence-backed, non-clinical problem contract with a named user, recurring trigger, current workflow and burden, safe human-reviewed output, existing-solution gap, light integration boundary, and measurable 60–90-day operational KPI.

Consultation readiness was the strongest starting hypothesis. The completed desk-research pass now ranks tumour-board human-decision documentation and operational follow-through first for further discovery; outside-record consultation readiness and barrier-aware follow-up remain alternatives. No product is selected.

## Current phase and coordinate

- Current coordinate: `P5` — Tumour-board workflow validation.
- The repository owner selected Candidate B: human-decision documentation and operational follow-through. This is a discovery-lane decision, not product lock.
- `P0` harness bootstrap evidence: `.harness/reports/20260903T093943Z-P0-bootstrap.md`.
- `P1` research protocol evidence: `.harness/reports/20260903T094928Z-P1-research-protocol.md`.
- `P2` evidence reports: `.harness/reports/20260903T100755Z-P2-first-evidence-slice.md` and `.harness/reports/20260903T100845Z-P2-evidence-integration.md`.
- `P3` synthesis gate: `.harness/reports/20260903T101252Z-P3-synthesis-gate.md`.
- `P4` owner decision: `.harness/reports/20260903T102128Z-P4-owner-decision.md`.
- `P5` public-workflow validation: `.harness/reports/20260903T110322Z-P5-public-workflow-validation.md`.
- `P5` operator-readiness evidence: `.harness/reports/20260903T112712Z-P5-operator-validation-ready.md`.
- `P5` outreach authority boundary: `.harness/reports/20260903T114127Z-P5-outreach-authority.md`.
- `P5` expanded-source reassessment: `.harness/reports/20260903T123318Z-P5-v2-source-reassessment.md`.
- Governance and phase authority: `PROJECT_GOVERNANCE.md`.
- P5 narrowed Candidate B to the handoff from an existing clinician-authored decision to authorised treating-unit acknowledgement and non-clinical operational disposition.
- Public evidence shows materially different ownership: a historical patient care coordinator, and a recent split treating-oncologist/downstream-palliative-team workflow that improved documentation with an SOP and shared paper form. No universal current owner or software need is established.
- Next work is internal-first: clarify the expanded private source's provenance, sample, whether its questionnaires were administered, and whether direct clinician answers identify the P5 actor or a more pressing workflow. External outreach is paused.

## Hard constraints and supported environments

- Doctor / Care Team Facing oncology scope.
- Workflow-first, low operational risk, light phase-one integration, human override, and auditable important actions.
- Out of scope: diagnosis, treatment recommendation, clinical decision support, clinical risk scoring, medical-data interpretation, and autonomous clinical advice.
- No identifiable patient or participant data in research, code, memory, prompts, logs, fixtures, screenshots, reports, commits, or demos.
- Public GitHub repository: `https://github.com/beiyonder/onco-grid`. The owner authorised publication of the reviewed non-sensitive set by pull request; `chatroom_notes.md`, `Oncologist Pain Points_v2.docx`, and other private/local material remain ignored.
- Current local environment: macOS arm64; OMP 18.0.4; Serena 1.5.3; Orca 1.4.194 observed at bootstrap.
- Orca repository registration exists. Machine-local Orca IDs belong only in the bootstrap report, never committed configuration or memory.
- Serena indexes the Python research checks and TypeScript validation frontend; project index and health-check pass after source-language changes.

## Explicit non-goals

- Do not treat the owner-authorised validation frontend stack as production architecture or product lock.
- Do not assume a generic oncology dashboard, EMR, knowledge assistant, or peer network is novel.
- Do not convert clinical needs into prohibited patient-specific advice.
- Do not treat internet research as equivalent to direct local workflow observation.
- Do not build a workflow engine, evaluator fleet, autonomous governance system, or parallel worktree mechanism as part of the harness.
- Do not publish raw chat notes, the expanded private DOCX, or other personal/health-related material.

## Canonical setup, check, test, build, and smoke commands

The repository contains a research surface and a static React/TypeScript/Vite validation frontend.

- Frontend install: `cd web && npm install`
- Frontend development: `cd web && npm run dev`
- Frontend strict build: `cd web && npm run build`
- Frontend typecheck only: `cd web && npm run typecheck`
- Serena project health: `serena project health-check .`
- Serena memory reference check: `serena memories check .`
- Serena re-index after source-language changes: `serena project index .`
- OMP MCP after restarting from repository root: `/mcp list`, then `/mcp test serena`
- Canonical research check: `python3 research/validate_ledger.py`
- Trial snapshot validation: `python3 scripts/fetch_india_oncology_trials.py --validate-only`

Never invent a passing command.

## Architecture and ownership facts

- Repository classification: research.
- Canonical domain vocabulary: `CONTEXT.md`.
- Evidence synthesis and decision gates: `FOUNDATION.md`.
- Official programme snapshot: `HEALTHATHON_OFFICIAL.md`.
- Interview preparation: `ONCOLOGIST_INTERVIEW_FIELD_GUIDE.md`.
- Supplied themes: `Oncologist Pain Points.md`.
- Expanded private-source delta: `research/PAIN_POINTS_V2_ANALYSIS.md`; raw narratives remain excluded.
- Stable authority and phase state: `PROJECT_GOVERNANCE.md`.
- Mandatory session rules: `AGENTS.md`.
- OMP-to-Serena project MCP configuration: `.omp/mcp.json`.
- Checkpoint evidence: `.harness/reports/`.
- Repository owner and final sign-off: `beiyonder`.

## Authority and sign-off boundary

Agents may inspect, research, plan, make reversible repository-local changes, run non-destructive checks, update research artifacts and memory, and write evidence reports within the current coordinate.

Owner sign-off is required for changes to goal, scope, non-goals, acceptance thresholds, security/privacy posture, production runtime/deployment topology, use of sensitive data, external recruitment/contact, product lock, or waiver of failed evidence. The 2026-09-19 owner decision permits agents to push and merge implementation pull requests after repository acceptance, privacy, and safety checks pass; direct pushes to `main` remain prohibited. Repository artifacts and executable evidence outrank agent self-report.

## Known risks, gaps, and open decisions

- `GAP-SERENA-LANGUAGE` is closed: the research validator is indexed as Python and Serena health-check passes.
- `GAP-SETUP` is closed for both research and the validation frontend: the ledger validator remains the research check; `web/package.json` defines install, development, typecheck, static build, and preview commands.
- `GAP-MCP-ACTIVATION`: project MCP must be tested after OMP starts from this repository.
- `GAP-PUBLICATION-SANITIZATION` is mitigated for the approved PR by `.gitignore` and pre-push scanning; both raw source files remain private. All project changes must reach the default branch through pull requests. `.private/` (chatroom, NER PDF) is gitignored and never committed.
- `GAP-DIRECT-WORKFLOW-OBSERVATION`: desk research and selected caregiver accounts cannot prove local workflow prevalence.
- `GAP-TUMOUR-BOARD-LOCAL-WORKFLOW` is internally routed: V2 contains no answered tumour-board workflow, and current actor, acknowledgement, person-time, and baseline remain open.
- `GAP-OUTREACH-AUTHORITY` is paused by the owner; do not send externally without fresh exact confirmation after internal clarification.
- `GAP-V2-PROVENANCE`: proposed questionnaires, selected accounts, author assumptions, and uncited primer material must be separated; ask the internal analyst whether completed answers exist.
- The expanded source adds weak caregiver/family psychosocial-support, caregiver-work, multi-provider portability, and digital-touchpoint signals. It does not change Candidate B's rank; Candidate A becomes a stronger fallback.
- 2026-09-09 session (proposal only, owner sign-off pending): `ner-2.0.pdf` identified via local OCR as KCDO-NCG EMR Requirement v2.0 (Mar 2023), Parts A-D. It is an EMR requirements catalogue, not a product spec; building it would violate the generic-EMR non-goal.
- 2026-09-09 session (proposal only): team knockout sim ranks O6-safe (site-verified general trial knowledge + referral-task companion, use-case 05, no patient-specific matching) tied with O2 (report-ready ack) on win-weighted score; team-alignment breaks tie to O6-safe with O2 as fallback. Unsafe patient-specific trial matching is rejected as prohibited CDS/treatment recommendation.
- 2026-09-09 stable external facts: CTRI 2007-2021 landscape (PMC11096683) shows geographic disparity + incomplete/inconsistent fields; Chakraborty 2021 (181 open trials) shows median ~1.55 slots/1000 cases with 35% states zero; Pillamarapu 2019 documents CTRI data-quality defects; ClinicalTrials.gov API v2 supports condition/location/status/phase search; CTRI offers no public API (web search + dataset download + WHO ICTRP mirror only).
- 2026-09-09 team inputs (pending owner): JS full-stack preferred for build sprint; general-cancer query scope with narrow finder-to-task workflow; commit to trials lane with no fallback; site access limited to async docs via clinical members rather than weekly access; frequency/baseline for trial inquiry remains `OPEN`.
- Session artifacts (non-sensitive, committable): `research/REGROUP_SYNC_20260909.md`, `research/KNOCKOUT_SIM_20260909.md`, `research/SHALEEN_BRIEF_20260909.md`. Ledger stays PASS 48. `CURRENT` remains `P5` until owner approves any lane change.
- 2026-09-13 stable extraction fact: with explicit non-commercial WHO terms acceptance, the complete dated `CTRI` WHO query was reconstructed as 114,052 unique trials (112,858 primary CTRI IDs) and 8,133 automated oncology candidates. This is 4,611 below CTRI's 117,469 homepage count; newest mirrored registration lag was 59 days; 79.367% of Recruiting oncology candidates had `Last Refreshed on` older than one year. Record data remain in ignored `.private/ctri-ictrp/2026-09-13/`; WHO terms prohibit commercial/marketing/promotional use; `.harness/reports/20260913T134521Z-P5-ctri-data-access-quality.md` is the aggregate report. This does not approve a product data source or change `CURRENT` from `P5`.
- 2026-09-17 owner decision: the GitHub repository is private; all remote code changes must go through the existing review branch and pull request, never directly to `main`. The owner authorised a private Vercel oncologist-validation deployment backed by real public India-located oncology trial records from ClinicalTrials.gov API v2. Patient/EMR/board examples remain synthetic; automated patient matching, eligibility recommendations, treatment recommendations, and unapproved CTRI/WHO product data use remain prohibited.
- 2026-09-17 live validation state: `web/` is an isolated static Vercel app using a dated ClinicalTrials.gov API v2 snapshot (`dataTimestamp` 2026-09-16T09:00:06). The fetcher retained 285 interventional records with at least one India location from 338 active-status oncology candidates and omitted contact names, email addresses, and phone numbers. Deployment: `https://onco-grid-trial-relay-validation.vercel.app`. Real registry trial data is clearly separated from synthetic patient/EMR/board workflows; status remains registry-declared until independently verified.
- 2026-09-19 owner decision: implementation may begin from `product/TRIAL_RELAY_EXPERIENCE_BLUEPRINT.md` and `product/TRIAL_RELAY_VISUAL_DESIGN_LANGUAGE.md` through small review pull requests. The first work remains a reversible redesign of the static validation app; `P5` stays current, product lock is not reached, and no new production stack, dependency, data source, or clinical capability is approved.
- 2026-09-19 owner decision: the agent may push and merge future implementation pull requests without separate owner review after the repository's acceptance, privacy, and safety checks pass; direct pushes to `main` remain prohibited. The owner conditionally authorises replacing the monolithic HTML structure and selecting sustainable frontend tooling or dependencies when a named slice records a material maintainability or delivery need. This does not authorise a backend, new data source, production identity/persistence boundary, deployment-topology change, or clinical capability.
- 2026-09-19 implementation state: pull request `#3` merged the dependency-free static source split into `main`; `web/index.html`, `web/styles.css`, and `web/app.js` are now stable document, style, and behavior boundaries. Phase 1 Trial library work makes result/source context, registry versus site-confirmation state, loading/empty/error recovery, and keyboard selection explicit without changing the ClinicalTrials.gov snapshot, runtime, or clinical boundary.
- 2026-09-19 implementation state: pull request `#4` merged the source-first Trial library into `main`. The next trial-profile slice keeps search context visible while separating registry and site assertions, showing all retained India sites, preserving focus/position on close, and correcting the over-escaped date normalizer that previously replaced valid registry dates with the current date.
- 2026-09-19 implementation state: pull request `#5` merged the source-first trial profile into `main`, including correct registry-date normalization. The Trial room slice adds browser-session following, source-pinned general operational threads, verified-role authority for official responses/corrections, and explicit answer/task/correction/unresolved outcomes without mutating registry or site-verification assertions.
- 2026-09-19 implementation state: pull request `#6` merged the contextual Trial room into `main`. The unified Inbox slice deterministically classifies alerts, Trial room responses, handoffs, and verification work into exactly one of Updates, Messages, or Tasks; every row exposes context, owner, due state, source, read state, and a linked source-context route.
- 2026-09-19 implementation state: pull request `#7` merged the unified Inbox into `main`. The contextual-resolution slice adds an inline inspector, exact origin-focus return, bounded handoff transitions, explicit unable-to-contact, authority-gated verification, and deterministic focus handling when an item reclassifies or leaves the queue.
- 2026-09-19 implementation state: pull request `#8` merged contextual Inbox resolution into `main`. The notification-rule slice replaces hard-coded demo IDs and implied external channels with real followed trials, named recipients, in-app-only delivery, repeat and stop controls, duplicate prevention, active/stopped state, and explicit follow-end behavior; no scheduler or external message exists.
- 2026-09-19 implementation state: pull request `#9` merged safe in-app notification rules into `main`. The patient workspace slice reframes the single synthetic case around identity/access context, treating team, source availability, explicit source-vs-clinician authority, three workspace sections, and dynamic recent work; no real patient data or clinical inference is introduced.
- 2026-09-19 implementation state: pull request `#10` merged the source-first synthetic patient workspace into `main`. The criterion-review slice keeps the general library patient-neutral, deterministically presents the first four exact numbered registry excerpts, requires treating-oncologist source linking and human state, names reviewer/date and next action, and exposes count progress without a score or eligibility conclusion.
- 2026-09-19 implementation state: pull request `#11` merged clinician-led exact-criterion review into `main`. The missing-information slice creates a named, due, source-linked task only from Needs clarification; it appears once in Inbox and can complete or end unable to obtain without guessing an answer or changing criterion state.
- 2026-09-19 implementation state: pull request `#12` merged source-linked missing-information tasks into `main`. The referral-packet slice adds version, selected trial/site, exact synthetic EMR manifest, purpose, recipient, owner, expiry, clinician-review state, approval state, creator/history, and a separate-human-approval-before-release boundary.
- 2026-09-19 implementation state: pull request `#13` merged versioned referral packet drafts into `main`. The lifecycle slice adds version-bound human approval, Sent, Acknowledged, Trial-team screening, Closed, actor/date/source history, canonical Inbox reclassification, unable-to-contact, and correction that invalidates approval and requires a new version.
- 2026-09-19 implementation state: pull request `#14` merged the version-bound referral lifecycle into `main`. The tumour-board slice requires a bounded board-purpose packet, records only a signed human EMR decision reference and authorised operational task, preserves packet/audit history, and previews/writes reference-only synthetic EMR metadata without generating or copying clinical content.
- 2026-09-19 implementation state: pull request `#15` merged packet-bound tumour-board context into `main`. The trial-team-outcome slice records only a verified site role's authorised outcome, adds an explicit lifecycle stage and treating-team review task, labels Eligible/Ineligible as trial-team decisions, and blocks closure until human treating-team review without making a Trial Relay recommendation.
- 2026-09-19 implementation state: pull request `#16` merged authorised trial-team outcomes into `main`. The geographic-view slice adds List/Map continuity over the same filtered registry data using explicitly approximate curated city/state centroids, accessible clusters, persistent selection, and visible unplaced coverage without an administrative-boundary, route, availability, or patient-location claim.
- 2026-09-19 implementation state: pull request `#17` merged approximate List/Map continuity into `main`. The relationship-lens slice adds only actual source→trial→site→room→patient/handoff nodes and labelled connectors, with each action opening an existing exact context and no inferred clinical graph.
- 2026-09-19 implementation state: pull request `#18` merged contextual relationship lenses into `main`. The responsive-presentation slice flattens those paths on narrow screens, adds reduced-transparency alongside reduced-motion behavior, and makes print fall back from Map to an opaque source-first profile with identifiers, dates, authority labels, and disclosures preserved.
- 2026-09-19 implementation state: pull request `#19` merged responsive, reduced-transparency, and opaque print modes into `main`. All planned Phase 0–5 implementation slices are integrated. Phase 6 remains open because no qualifying direct oncology-user observation or product-lock decision exists; implementation evidence alone does not close `P5`.
- 2026-09-20 owner review: `product/TRIAL_RELAY_EVIDENCE_LED_REVIEW.md` authorises twenty reversible clarity, workflow, and demo-safe remediation items. Seven future product hypotheses plus five direct-validation/product-lock tasks remain governance-gated.
- 2026-09-20 architecture decision: the review's routing, duplicated state/render logic, testability, and delivery-friction evidence met the typed-component-stack trigger. The static validation surface is migrating to React 19, TypeScript 7, React Router 7, and Vite 8 with hash routes, a separately emitted dated registry asset, browser-memory-only state, four global destinations, and unchanged clinical/privacy boundaries. Report: `.harness/reports/20260920T144329Z-P5-typed-routed-foundation.md`.
- 2026-09-20 evidence-led Trial workflow: the React surface now has concise/paginated normalized Trial Library rows, non-hover preview, stable full detail with raw provenance and complete criteria, preserved return state/focus, chronological Trial Room replies and exact-message focus, human resolution, and evidence-linked correction tickets. Report: `.harness/reports/20260920T150108Z-P5-evidence-led-trial-workflow.md`.
- 2026-09-20 evidence-led Patient workflow: Patients now has searchable/sortable owner-filtered synthetic workspace index, controlled no-identity/no-upload fixture creation, sectioned pages, per-fact source badges, explicit manual selection from the unranked library, coherent `SYN-2047` × `NCT06345729`, all 23 retained criterion excerpts, prominent 3/23 completeness, and explicitly human-created missing-information work. Report: `.harness/reports/20260920T151051Z-P5-evidence-led-patient-workflow.md`.
- 2026-09-20 evidence-led role/attention workflow: Home now changes copy and accepted activity by prototype role; Inbox defaults to unresolved role-owned/accepted work and starts with five deliberate items rather than auto-created site gaps; exact message/criterion routes retain focus; the only handoff control is an explicitly unsent browser-memory simulation whose acknowledgement resolves its queue item. Report: `.harness/reports/20260920T151911Z-P5-evidence-led-attention-workflow.md`.
- 2026-09-20 integrated evidence-led state: pull requests `#21`–`#25` implement all twenty owner-authorized review items. The built static React surface passed production source failure/retry, full desktop workflow, eight-route 390px mobile matrix, exact focus restoration, clean console, reduced motion/transparency, opaque source-complete print, ledger 70, snapshot 285, npm audit 0 vulnerabilities, and privacy checks. Seven future hypotheses plus five direct-validation/product-lock activities remain explicitly deferred or blocked. `P5` and Phase 6 remain open. Report: `.harness/reports/20260920T152948Z-P5-evidence-led-integration.md`.
- 2026-09-20 owner expansion decision: patient/trial functionality is explicit human criterion/source coverage only—never score, ranking, close-match, recommendation, or eligibility. Approved de-identified research records may be strictly imported to browser memory without identifiers. Supabase pilot communication/handoff is authenticated and no-PHI; OpenAI is source-only with citations and no patient facts, using pinned cheapest `gpt-5-nano-2025-08-07`; the Three.js map remains an approximate registry lens without travel/access/availability claims. The credential exposed in conversation is rejected and must be rotated into a server-side secret; never store it in repository, logs, prompts, or memory.
- 2026-09-20 explicit coverage/discovery state: Trial Detail launches existing-workspace or strict approved research import into manual criterion review; explicit clinician cohort filters return unranked counts; Trial Library shows deterministic phase/status/city filters and exact input traces. Imported records reject extra/identity-like fields and disappear on reload. Report: `.harness/reports/20260920T164029Z-P5-explicit-coverage-discovery.md`.
- 2026-09-20 source evidence/assistant state: Trial Detail compares the dated snapshot with current ClinicalTrials.gov status/date/India-location count and excludes contacts. Vercel APIs sanitize official evidence and gate a citation-bound source-only assistant behind Supabase bearer auth; policy rejects patient, match, eligibility, recommendation, contact, identifier, extra-field, and non-official-source input. Model is pinned to cheapest `gpt-5-nano-2025-08-07`; live output remains blocked until an approved Supabase project and rotated server-side `OPENAI_API_KEY` are configured. Report: `.harness/reports/20260920T165548Z-P5-source-evidence-assistant.md`.
- 2026-09-20 authenticated no-PHI pilot state: Supabase migration defines staff profiles, room membership, RLS/realtime messages, admin-granted official site-response authority, random-reference no-PHI handoffs, role-gated transitions, and immutable audit events. React client adds fail-closed magic-link identity, live Trial Room, member invite, handoff creation/transition, and separate synthetic fallbacks. No Supabase project is configured, so live auth/RLS/realtime/two-user acceptance remains blocked. Report: `.harness/reports/20260920T171636Z-P5-authenticated-no-phi-pilot.md`.
- 2026-09-20 Three.js spatial state: Trial Library List/Spatial lens continuity now renders a Natural Earth India 2.5D diorama over the same filtered registry dataset, using curated city and labelled state centroids, visible placed/unplaced counts, floating labels, pointer/orbit interaction, accessible cluster list, responsive/reduced/print fallbacks, and explicit no-route/travel/access/capacity/availability boundaries. Report: `.harness/reports/20260920T173557Z-P5-threejs-india-spatial-lens.md`.
- 2026-09-20 integrated owner-expansion state: pull requests `#28`–`#32` implement explicit patient/source coverage, strict ephemeral approved research import, unranked cohort filters, transparent assisted discovery, official evidence, pinned cheapest source-only AI policy, Supabase no-PHI communication/handoff contracts, and an approximate Three.js India spatial lens. Reachable build/browser/API-policy/map/privacy evidence passes. Live Supabase and OpenAI acceptance remains blocked by missing approved configuration and rotated server-side key; `P5`, direct workflow evidence, and product lock remain open. Report: `.harness/reports/20260920T174136Z-P5-owner-expansion-qualification.md`.
- Production release, Supabase migration/configuration, rotated OpenAI secret injection, live qualification, open governance gates, and rollback instructions are maintained in `PILOT_ACTIVATION_RUNBOOK.md`. Never place secret values in chat or repository files.
- 2026-09-20 production state: the React/Vite build is live at `https://onco-grid-trial-relay-validation.vercel.app`. Prebuilt deployment `dpl_4hNh6qcJyarCzx8roVA2nW2EqaDy` established the release; Vercel settings now use repository root `web`, Framework Vite, `npm ci`, `npm run build`, and `dist`. The next merged main commit automatically produced `dpl_GaryB2hJHg2CvHAauca96KUPRKbQ`, built both serverless functions, retained the alias, and passed a fresh live spatial check, proving GitHub auto-deploy now uses the correct root. Core UI, spatial lens, official evidence/API, mobile states, security headers, and fail-closed pilot blockers pass. Supabase and OpenAI production variables remain absent. Report: `.harness/reports/20260920T180806Z-P5-production-deployment.md`.
- 2026-09-22 visual state: the owner-reviewed spatial interface added liquid-glass navigation, Thinking Orb state cues, darker Three.js materials, and glass section controls. It initially included optional trusted-interaction sound, which was later removed after direct clinician feedback. Home journey cards share identical desktop grid geometry and footer baselines with no asymmetric idle rotation/translation; responsive checks preserve zero overflow and 13px minimum visible text. Report: `.harness/reports/20260922T134644Z-P5-home-journey-alignment.md`.
- 2026-09-22 liquid-glass refinement state: pull request `#38` merged shared stronger optics and copied ambient refraction beneath crisp navigation, source context, Trial Library view controls, and patient section tabs. Narrow navigation is clamped to 64px and reduced transparency remains opaque. Automatic production deployment `dpl_DMgm7mYCATLcBCcY4c5aCnCEaPu5` is live at `https://onco-grid-trial-relay-validation.vercel.app`; desktop/mobile, interaction, browser health, build, API policy, dependency, ledger, snapshot, Serena, and privacy checks pass. Report: `.harness/reports/20260922T144344Z-P5-liquid-glass-material.md`.
- 2026-09-22 first direct clinician portal review: the owner relayed one de-identified oncologist's unstructured feedback. The reviewer rejected interface sound; judged the 285 India-located snapshot too narrow; requested broader/global coverage, specialist-centre connections, concise trial abstracts, drug-centred navigation, publications, and a multi-trial drug evidence report. These are eight weak source claims (`EV-0071`–`EV-0078`) in one independent source group, not prevalence or workflow-observation evidence. Pull request `#40` removed all sound UI/listeners/code and `uisfx`; production deployment `dpl_BSiAGRmD68x5rzR6V3qx43EtVo3a` is live and verified sound-free. New publication sources, institutional outreach, scope expansion, and clinically interpretive cross-trial output remain separately gated. Report: `.harness/reports/20260922T150041Z-P5-clinician-portal-feedback.md`.
- 2026-09-22 evidence-coverage expansion state: pull requests `#42` and `#43` deployed a separate `/trials/evidence` workspace. It exposes 322 normalized cancer labels with exact raw variants, 351 exact Drug/Biological terms, deterministic source abstracts, bounded paginated global ClinicalTrials.gov search, metadata-only PubMed lookup under `EV-0079`, a descriptive same-intervention population/time map, JSON/print export, and TMH/ACTREC/Cytecare planning cards labelled `WIP · not connected` with explicit intended services and non-endorsement boundaries. Production deployments `dpl_2XUyvsp8tR6EbNXtA8Bipg3u34rN` and `dpl_qtmDZhmfMoXPyydWXcVoem36RhUH` are live and verified; unsupported query parameters return `400`. No outcomes, pooled effects, patient facts, matching, eligibility, ranking, recommendation, external contact, or full-text redistribution is implemented. Report: `.harness/reports/20260922T160812Z-P5-evidence-coverage-expansion.md`.

## References

- `mem:core`
- `PILOT_ACTIVATION_RUNBOOK.md`
- `PROJECT_GOVERNANCE.md`
- `AGENTS.md`
- `FOUNDATION.md`
- `CONTEXT.md`
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
- `research/P5_TUMOUR_BOARD_VALIDATION.md`
- `research/P5_OPERATOR_VALIDATION_KIT.md`
- `research/PAIN_POINTS_V2_ANALYSIS.md`
- `RESEARCH_SYNTHESIS.md`
- `research/evidence.jsonl`
- `research/OPPORTUNITY_MATRIX.md`
- `research/REGROUP_SYNC_20260909.md`
- `research/KNOCKOUT_SIM_20260909.md`
- `research/SHALEEN_BRIEF_20260909.md`
- `product/TRIAL_RELAY_EVIDENCE_LED_REVIEW.md`
- `.harness/reports/20260920T144329Z-P5-typed-routed-foundation.md`
- `.harness/reports/20260920T150108Z-P5-evidence-led-trial-workflow.md`
- `.harness/reports/20260920T151051Z-P5-evidence-led-patient-workflow.md`
- `.harness/reports/20260920T151911Z-P5-evidence-led-attention-workflow.md`
- `.harness/reports/20260920T152948Z-P5-evidence-led-integration.md`
- `.harness/reports/20260920T164029Z-P5-explicit-coverage-discovery.md`
- `.harness/reports/20260920T165548Z-P5-source-evidence-assistant.md`
- `.harness/reports/20260920T171636Z-P5-authenticated-no-phi-pilot.md`
- `.harness/reports/20260920T173557Z-P5-threejs-india-spatial-lens.md`
- `.harness/reports/20260920T174136Z-P5-owner-expansion-qualification.md`
- `.harness/reports/20260920T180806Z-P5-production-deployment.md`
- `.harness/reports/20260922T134644Z-P5-home-journey-alignment.md`
- `.harness/reports/20260922T144344Z-P5-liquid-glass-material.md`
- `.harness/reports/20260922T150041Z-P5-clinician-portal-feedback.md`
- `.harness/reports/20260922T160812Z-P5-evidence-coverage-expansion.md`
