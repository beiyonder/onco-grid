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
| `P5` | Tumour-board workflow validation | Agent; owner signs product lock | Candidate B selected at `P4` | Evidence-backed problem contract for one exact post-board operational step | Named actor; current system and handoff; exact documentation/communication/ownership/completion failure; non-sensitive aggregate baseline; safe output; human boundary; contradiction update; `C4` gate report | `CURRENT` | Ask the internal clinical analyst to clarify V2 provenance, whether questionnaires produced answers, and whether direct clinician conversations identify the post-board actor or a more pressing workflow. Keep external outreach paused. |

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

## Gap register

| Gap | Status | Evidence | Owner | Next action |
|---|---|---|---|---|
| `GAP-SERENA-LANGUAGE` | Closed | `research/validate_ledger.py` became the first real source file; Python was configured, one file indexed, and Serena health-check passed | Agent | Re-index after future source-language changes. |
| `GAP-SETUP` | Closed for research phase | `python3 research/validate_ledger.py` is the canonical deterministic research check; no application surface exists | Owner and agent | Define product setup, test, build, and smoke commands only after owner-approved stack selection. |
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

## References

- `AGENTS.md`
- `CONTEXT.md`
- `FOUNDATION.md`
- `HEALTHATHON_OFFICIAL.md`
- `ONCOLOGIST_INTERVIEW_FIELD_GUIDE.md`
- `Oncologist Pain Points.md`
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
