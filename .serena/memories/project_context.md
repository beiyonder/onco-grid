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
- Serena indexes the dependency-free Python ledger validator; project index and health-check pass.

## Explicit non-goals

- Do not select a product architecture or implementation stack before the owner closes `P5`.
- Do not assume a generic oncology dashboard, EMR, knowledge assistant, or peer network is novel.
- Do not convert clinical needs into prohibited patient-specific advice.
- Do not treat internet research as equivalent to direct local workflow observation.
- Do not build a workflow engine, evaluator fleet, autonomous governance system, or parallel worktree mechanism as part of the harness.
- Do not publish raw chat notes, the expanded private DOCX, or other personal/health-related material.

## Canonical setup, check, test, build, and smoke commands

This is a research repository with no runnable product surface.

- Serena project health: `serena project health-check .`
- Serena memory reference check: `serena memories check .`
- Serena re-index after source-language changes: `serena project index .`
- OMP MCP after restarting from repository root: `/mcp list`, then `/mcp test serena`
- Canonical research check: `python3 research/validate_ledger.py`
- Product setup/build/smoke: unavailable until owner-approved product and stack selection.

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

Owner sign-off is required for changes to goal, scope, non-goals, acceptance thresholds, security/privacy posture, production dependencies, runtime/deployment topology, use of sensitive data, publication/push/release/deployment, or waiver of failed evidence. Repository artifacts and executable evidence outrank agent self-report.

## Known risks, gaps, and open decisions

- `GAP-SERENA-LANGUAGE` is closed: the research validator is indexed as Python and Serena health-check passes.
- `GAP-SETUP` is closed for the research phase through `python3 research/validate_ledger.py`; product setup/build/smoke commands remain a later owner-approved decision.
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

## References

- `mem:core`
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
