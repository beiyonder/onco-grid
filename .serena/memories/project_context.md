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
- Governance and phase authority: `PROJECT_GOVERNANCE.md`.
- P5 narrowed Candidate B to the handoff from an existing clinician-authored decision to authorised treating-unit acknowledgement and non-clinical operational disposition.
- Public evidence shows materially different ownership: a historical patient care coordinator, and a recent split treating-oncologist/downstream-palliative-team workflow that improved documentation with an SOP and shared paper form. No universal current owner or software need is established.
- Next work requires owner confirmation immediately before sending the prepared process-only request through the current official NCG VTB support route.

## Hard constraints and supported environments

- Doctor / Care Team Facing oncology scope.
- Workflow-first, low operational risk, light phase-one integration, human override, and auditable important actions.
- Out of scope: diagnosis, treatment recommendation, clinical decision support, clinical risk scoring, medical-data interpretation, and autonomous clinical advice.
- No identifiable patient or participant data in research, code, memory, prompts, logs, fixtures, screenshots, reports, commits, or demos.
- Public GitHub repository: `https://github.com/beiyonder/onco-grid`. The owner authorised publication of the reviewed non-sensitive set by pull request; `chatroom_notes.md` and other private/local material remain ignored.
- Current local environment: macOS arm64; OMP 18.0.4; Serena 1.5.3; Orca 1.4.194 observed at bootstrap.
- Orca repository registration exists. Machine-local Orca IDs belong only in the bootstrap report, never committed configuration or memory.
- Serena indexes the dependency-free Python ledger validator; project index and health-check pass.

## Explicit non-goals

- Do not select a product architecture or implementation stack before the owner closes `P5`.
- Do not assume a generic oncology dashboard, EMR, knowledge assistant, or peer network is novel.
- Do not convert clinical needs into prohibited patient-specific advice.
- Do not treat internet research as equivalent to direct local workflow observation.
- Do not build a workflow engine, evaluator fleet, autonomous governance system, or parallel worktree mechanism as part of the harness.
- Do not publish raw chat notes or other personal/health-related material.

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
- `GAP-PUBLICATION-SANITIZATION` is mitigated for the approved PR by `.gitignore` and pre-push scanning, but remains open for any raw-source publication. All project changes must reach the default branch through pull requests.
- `GAP-DIRECT-WORKFLOW-OBSERVATION`: desk research cannot prove local workflow prevalence; this is an accepted limitation, not a hidden assumption.
- `GAP-TUMOUR-BOARD-LOCAL-WORKFLOW` is externally blocked: Indian examples identify different owners and process artifacts, but no current target-site non-clinical owner, acknowledgement path, person-time, or baseline.
- `GAP-OUTREACH-AUTHORITY`: all non-contact public research is complete; the exact NCG VTB support recipient, email channel, and prepared message require point-of-risk owner confirmation before sending.
- `RESEARCH_SYNTHESIS.md` ranked tumour-board documentation and operational follow-through first; the repository owner selected it as the `P5` discovery lane. Outside-record consultation readiness and barrier-aware care-team follow-up remain alternatives if the local workflow evidence contradicts Candidate B.

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
- `research/P5_TUMOUR_BOARD_VALIDATION.md`
- `research/P5_OPERATOR_VALIDATION_KIT.md`
- `RESEARCH_SYNTHESIS.md`
- `research/evidence.jsonl`
- `research/OPPORTUNITY_MATRIX.md`
