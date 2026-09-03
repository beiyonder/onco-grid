# Oncology desk-research synthesis and decision packet

## Status

- Research access date: 2026-09-03.
- Current output: evidence-backed discovery priorities, not a final product selection.
- Evidence ledger: 48 validated records from 36 independent source groups.
- Direct India relevance: 36 records.
- Official or peer-reviewed evidence: 35 records.
- Public repository: the empty `main` base and PR branch exist; `chatroom_notes.md` and the raw expanded DOCX remain ignored, and all project changes require PR review.
- Owner decision: Candidate B—tumour-board human-decision documentation and operational follow-through—was selected on 2026-09-03 as the next discovery lane, not as product lock.
- P5 public validation narrowed Candidate B to the handoff from an existing clinician-authored decision to authorised treating-unit acknowledgement and operational disposition. Public examples show that ownership varies and that role clarity, an SOP, and one shared form may solve a handoff without software. The actual target-site owner and baseline remain unverified.
- Expanded-source review: four weak de-identified participant-account records were added from one private three-account source group. They change validation order and hypotheses, not the current candidate ranking.

## Hard boundary

No candidate may perform diagnosis, treatment recommendations, clinical decision support, clinical risk scoring, interpretation of medical data, or autonomous clinical advice. Clinical needs may remain in the evidence base, but only non-clinical operational assistance with named human review can be promoted.


## Executive conclusion

The original five themes are not equally suitable:

- **Find:** real information need, weak India-specific workload evidence, crowded solution space.
- **Contextualise:** necessary design principle, unsafe as patient-specific clinical interpretation.
- **Synthesise:** strongest match to supplied oncologist notes and official consultation-readiness use case; India evidence proves fragmentation and that structured retrieval can save registry time, but the exact consultation-preparation job remains unmeasured.
- **Act:** real clinician need but mostly prohibited and already covered by existing national/commercial systems.
- **Connect:** strong Indian evidence for tumour-board documentation, follow-up, and cross-hospital gaps; broad expert connection already exists through NCG.

The open scan found a serious additional direction:

- **Follow-up and continuity:** strong direct Indian evidence of social, financial, travel, illness, counselling, and coordination barriers. A reminder-only product is insufficient.
- **Caregiver/family psychosocial-support coordination:** repeated in two of three selected private-source accounts, but currently only a weak hypothesis with no named role, prevalence, baseline, or proven software need.

Three bounded candidates survive:

1. tumour-board case readiness and operational follow-through;
2. source-linked outside-record consultation readiness;
3. barrier-aware care-team follow-up coordination.

### Recommended discovery priority

Prioritise **tumour-board operations**, because it has the strongest direct India evidence for a recurring institutional workflow and a clearly documented gap:

- 137 of 172 responding NCRP-affiliated hospitals reported a tumour board;
- among those boards, 47.4% met weekly;
- 63.5% used physical documentation;
- 16.8% communicated through EMR notes;
- 48.2% lacked a recommendation follow-up system;
- 5.1% always conducted cross-hospital discussions.

This is not permission to build a broad tumour-board platform. NCG already has a detailed MDT module and a Virtual Tumor Board. The next narrowing decision is whether the unmet job is:

- **pre-board case readiness**, where local burden remains unmeasured; or
- **post-board human decision documentation and operational follow-through**, where the survey shows a direct gap.

The stronger currently evidenced starting point remains **post-board documentation and operational follow-through**. The expanded source makes outside-record consultation readiness a more credible fallback by weakening the rare-switching assumption, but it adds no actor or time baseline. External P5 outreach is paused while the internal analyst clarifies source provenance and any completed clinician answers.

## Decision that would change this recommendation

Move Candidate A—outside-record consultation readiness—to first place when either:

- a named Indian care-team role is shown to perform the job frequently with measurable person-time or clarification burden; or
- current NCG/local boards are shown to have reliable electronic decision documentation and owned follow-through.

Move Candidate C—barrier-aware follow-up—to first place when one care-team role, patient cohort, actionable barrier set, and baseline completion measure are identified.

## What was researched

### Starting material

- hackathon rules and official use cases;
- `Oncologist Pain Points.md`;
- informal team notes, used only for hypotheses;
- project foundation and controlled vocabulary.
- de-identified structural analysis of the expanded private pain-point source; raw caregiver narratives remain excluded;

### Indian primary and peer-reviewed sources

- [NCG/KCDO Oncology EMR initiative](https://www.kcdo.in/oncologyemr)
- [National Cancer Grid initiative for electronic medical records, India](https://pmc.ncbi.nlm.nih.gov/articles/PMC12057217/)
- NCG/KCDO medical, surgical, radiation, and MDT requirements
- [KCDO UI/UX Guidelines for EMR & Clinical Systems](https://www.kcdo.in/src/docx/EMR-UI-UX-Guidelines.pdf)
- [ABDM FHIR Implementation Guide v7 draft](https://www.nrces.in/preview/ndhm/fhir/r4/index.html)
- [Onco-Insight registry evaluation at Tata Memorial Centre](https://pmc.ncbi.nlm.nih.gov/articles/PMC13286784/)
- [NCRP-affiliated hospital tumour-board survey](https://pmc.ncbi.nlm.nih.gov/articles/PMC13161587/)
- [NCG Virtual Tumor Board](https://www.ncgindia.org/key-initiatives/virtual-tumor-board)
- [Cancer default/follow-up study at AIIMS Rishikesh](https://pmc.ncbi.nlm.nih.gov/articles/PMC11583348/)
- [Tata Memorial oral-cancer SMS feasibility study](https://pmc.ncbi.nlm.nih.gov/articles/PMC5763626/)
- [Tata Medical Center cancer-care journey study](https://pmc.ncbi.nlm.nih.gov/articles/PMC8831108/)
- [India CTRI cancer-trial landscape](https://pmc.ncbi.nlm.nih.gov/articles/PMC11096683/)
- [Indian molecular-report oncologist survey](https://ijmio.com/survey-for-molecular-reports-in-practicing-oncologists-in-india/)

### Transfer and solution evidence

- [Oncology professional information-needs survey](https://pubmed.ncbi.nlm.nih.gov/27550233/)
- [US oncology EHR and inbox burden](https://pmc.ncbi.nlm.nih.gov/articles/PMC12145914/)
- [Head-and-neck oncology time-motion study](https://pmc.ncbi.nlm.nih.gov/articles/PMC9474268/)
- [Digital tumour-board preparation pilot](https://pmc.ncbi.nlm.nih.gov/articles/PMC6106126/)
- [HL7 mCODE 4.0](https://hl7.org/fhir/us/mcode/)
- [Flatiron OncoEMR](https://flatiron.com/oncology/oncology-ehr)
- [Roche navify Clinical Hub for Tumor Boards](https://navify.roche.com/marketplace/products/navify-clinical-hub-for-tumor-boards)

International effect sizes were not transferred to India. Vendor claims were not used as prevalence or effectiveness evidence.

## Strongest established facts

### 1. Indian oncology digital infrastructure is not a blank slate

The 2025 NCG implementation report describes more than 360 member centres, more than 200 prioritised requirements, six enlisted vendor products, specialty modules, interoperability work, and adoption support for more than 20 centres. In its 2022 member survey, 81 of 101 responding organisations prioritised EMRs.

Consequence: a generic oncology EMR, dashboard, longitudinal record, or standards layer is not differentiated.

### 2. Indian field research reports concrete usability and fragmentation problems

KCDO's published UX audit reports:

- systems that are slow or unreliable;
- workflows that do not match users' mental models;
- unnecessary manual input;
- duplicate offline and online maintenance;
- fragmented information across computers;
- unavailable referral history and report-upload functions;
- redundant patient records;
- use of mobile devices and WhatsApp as workarounds.

The document does not report sample size or oncology-only prevalence, so it is strong problem discovery but not a population estimate.

### 3. Structured integration can save measurable operational time

At Tata Memorial Centre, the Onco-Insight registry platform reduced mean abstraction time from 29.14 to 16.72 minutes per case—a paired mean reduction of 12.42 minutes.

The result came from structured EMR retrieval, deterministic validation, and trained human review, not generative interpretation.

Limits matter:

- demographic retrieval: 97.59%;
- diagnostic retrieval: 43.22%;
- complete TMC treatment linked: 52%;
- outside and cross-centre care: manual review remained;
- follow-up: fully manual.

Consequence: integration and validation can work, while unstructured, outside, and longitudinal data remain difficult. This does not yet prove consultation-summary value.

### 4. Indian tumour-board workflow has measurable documentation and follow-up gaps

The 2026 survey covered 172 of 229 NCRP-affiliated hospitals. It found broad board availability but large variation, physical documentation, limited regular cross-hospital discussion, and missing follow-up systems.

Consequence: a narrow operational board workflow has direct India evidence. The gap is not simply access to experts.

### 5. NCG already operates the broad Connect solution

NCG's Virtual Tumor Board provides a host-centre network, regular sessions, case submission, an expert group, a template, and videoconferencing.

Consequence: do not build another generic network. Complement the existing path if a specific readiness, documentation, or follow-through failure is confirmed.

### 6. Continuity barriers are diverse and structural

Among 172 AIIMS Rishikesh patients who defaulted, reported reasons included:

- lack of social support: 26.2%;
- financial constraints: 20.3%;
- commuting difficulty: 16.3%;
- too ill to attend: 13.4%;
- multiple reasons: 16.9%;
- mean journey to the facility: 143 km.

The study sampled defaulters and provides no total denominator; it does not estimate prevalence.

A separate Tata Memorial feasibility study produced a 73.68% SMS reply rate but still had 20.18% of prompt occasions without a clinician follow-up examination.

Consequence: messages sent, opened, or answered are not continuity. A useful workflow must record ownership, barrier, action, and completion.

### 7. Trial discovery has genuine India-specific data and geography problems

The CTRI landscape study analysed 1,988 cancer trials registered from 2007–2021 and found cancer-type and geographic disparities plus incomplete and inconsistent registry fields.

Consequence: the problem is not absence of a registry. A safe product would need evidence for freshness, reconciliation, or referral workflow. Patient-specific eligibility matching is out of scope.

### 8. Oncology EHR burden is measurable but task-specific

International studies show substantial oncology EHR work:

- US: 15,653 oncology physicians, 43.2 million visits, mean 465.2 active EHR minutes per week and 211.8 outside scheduled hours in 2022.
- Netherlands head-and-neck centre: 44.0% of initial and 30.7% of follow-up consultation time on EHR tasks.

These cannot be used as Indian effect sizes. The time-motion study also found information input—not chart review—was the largest initial-consultation EHR component.

Consequence: measure the actual task. Do not assume that summarisation attacks the largest burden.

## Theme decisions

| Theme | Decision | Reason |
|---|---|---|
| Find | Defer as supporting capability | Real need; weak India-specific time/frequency evidence; strong incumbent sources; CDS leakage |
| Contextualise | Retain as design invariant | Record context is essential; clinical contextualisation is prohibited |
| Synthesise | Keep as serious candidate | Strong India fragmentation/mechanism evidence; exact consultation job still unmeasured |
| Act | Reject patient-specific lane | Prohibited and already covered by NCG/commercial systems |
| Connect | Narrow to operational board workflow | Direct India documentation/follow-up evidence; generic network already exists |
| Follow-up/continuity | Keep as serious candidate | Strong direct India barrier evidence; reminder-only model contradicted |
| Documentation/re-entry | Use as cross-cutting measure | Real burden but not one job; source-system improvement may be better |
| Registry/reporting | Use as proof pattern | Measured value; existing TMC solution weakens novelty |
| Clinic flow | Open, insufficient evidence | Official fit but no retained India oncology baseline |
| Research/presentations | Defer | One weak supplied signal and many general alternatives |
| Caregiver/family support | New research hypothesis | Two of three selected accounts report counselling/support gaps, but one weak source group cannot establish prevalence, role, safe intervention, or product fit |

## Candidate comparison

### Candidate 1 — Tumour-board documentation and operational follow-through

**Provisional actor:** a locally named operational or downstream-service owner; Indian examples include a patient care coordinator and a split treating-oncologist/palliative-care handoff, not one universal role.

**Trigger:** a human board discusses a submitted case.

**Job:** ensure the human-authored decision is recorded, communicated to the authorised care team, assigned for operational follow-through, and visibly completed or unresolved.

**Safe output:** signed human decision record, named owner, due/complete state, communication record, and audit trail.

**Not allowed:** system-generated recommendation, treatment ranking, report interpretation, or clinical urgency.

**Best KPI:** percentage of discussed cases with a signed decision, assigned owner, and recorded operational disposition within an agreed period.

**Evidence:** direct Indian survey evidence shows 48.2% lacked a follow-up system and only 16.8% used EMR notes for recommendation communication. One historical site used a patient care coordinator and spreadsheets (`EV-0043`); one recent post-MDT workflow assigned treating and downstream teams and improved documentation with an SOP and paper form (`EV-0044`).

**Main contradiction:** NCG MDT, VTB, iECHO, and draft NABH capabilities already cover much of the workflow; a local process/form intervention may be sufficient; current target-site follow-through, actor burden, and acknowledgement remain unknown.

**Integration:** begin with an existing board template/decision export, not a new expert network or EMR.

### Candidate 2 — Source-linked outside-record consultation readiness

**Provisional actor:** unknown—records staff, coordinator, nurse, resident, or oncologist.

**Trigger:** a patient arrives with outside or heterogeneous records for a bounded oncology consultation/referral.

**Job:** preserve, classify, source-link, and prepare literal assertions for clinician review.

**Safe output:** bounded source packet with exact evidence, date/source uncertainty, unreadable/duplicate/literal-conflict status, and review history.

**Best KPI:** total person-minutes to prepare and review the packet, plus unsupported-assertion and correction rates.

**Evidence:** strong fragmentation, referral-upload, outside-care manual review, and structured-retrieval evidence, plus weak selected-account examples of cross-city referral, additional opinions, multiple providers, and caregiver record handling (`EV-0046`, `EV-0047`).

**Main contradiction:** no direct Indian consultation-preparation measurement; NCG/ABDM target the same space; verification may erase time savings.

**Integration:** finite synthetic upload or one export adapter.

### Candidate 3 — Barrier-aware care-team follow-up

**Provisional actor:** oncology nurse, navigator, coordinator, social worker, or operations staff.

**Trigger:** an authorised follow-up or treatment milestone is upcoming, missed, or incomplete.

**Job:** maintain an owned worklist, record staff-identified barriers, perform approved contact, and track operational completion.

**Safe output:** consent/contact state, barrier, attempt, response, owner, action, and completion status.

**Best KPI:** completed follow-up among an explicit eligible denominator, plus time to completed contact and actionable-barrier resolution.

**Evidence:** strong Indian barrier and travel evidence plus reminder-only contradiction.

**Main contradiction:** many barriers are structural and not software-solvable; primary owner and baseline prevalence are unknown.

**Integration:** one appointment/follow-up export and approved communication channel.

## Current P5 problem contract

This contract remains provisional:

> When an oncology tumour board completes and clinicians author the final decision, a locally named operational or downstream-service owner may need to place or reference that decision in the authorised treating workflow and keep its operational disposition visible. A 2026 Indian hospital survey reports heterogeneous physical and electronic documentation and that 48.2% of reported boards lacked a follow-up system. NCG, iECHO, and draft NABH standards already cover substantial board selection, scheduling, review, attendance, decision, and follow-up documentation. One 2020–2021 Eastern India audit used Excel lists and a patient care coordinator for later data collection, while a 2023–2025 Chennai workflow divided ownership between treating oncologists and palliative care and improved documentation from 0% to 92% through an SOP and shared paper form. Neither source reports treating-unit acknowledgement or staff time for a general board workflow. The remaining hypothesis is narrower: a material non-clinical gap in acknowledgement, ownership, status, or escalation that existing roles, process, and artifacts do not already solve.

### Unresolved before product lock

- exact owning role in one current target setting;
- whether the initial broken step is decision entry, treating-unit acknowledgement, operational assignment, status, or later data collection;
- current NCG/local decision record, spreadsheet, EMR, or other system;
- local meaning of “follow-up system”;
- aggregate denominator, completion baseline, and staff person-time;
- institutional authorisation, access, retention, and escalation rules;
- whether a narrow reference/export removes rather than duplicates documentation;
- whether current NABH-aligned or local systems already solve the step;
- whether Candidate A is more valuable after total verification time is measured.

## Minimum next evidence

The expanded source changes the validation order. Before product build:

1. ask the internal analyst which V2 sections came from completed conversations, how participants were selected, and whether the proposed questionnaires were administered;
2. request any existing de-identified answer set or direct workflow summary, not raw narratives;
3. determine whether earlier clinician conversations identify a post-board owner, current system, or handoff;
4. test the new caregiver-support, multi-provider portability, resident/junior, and clinic-flow signals;
5. if internal evidence cannot close P5, resume the separately approved external operator route using `research/P5_OPERATOR_VALIDATION_KIT.md`;
6. obtain only a completely blank approved artifact and aggregate process measures;
7. if no actor or material gap is established, return to Candidate A rather than building from missing documentation.

## Owner decision

The repository owner selected **tumour-board human-decision documentation and operational follow-through** as the next bounded discovery lane.

The choice retains the documented constraints:

- confirm the exact coordinator, secretariat, presenting-team, or other owning role;
- choose one initial broken step from documentation, authorised communication, operational ownership, or completion tracking;
- record but never generate or interpret the clinical decision;
- compare against current NCG/local tooling and preserve contrary evidence;
- obtain a non-sensitive aggregate baseline or explicit measurement plan;
- require a separate owner problem-lock decision before architecture, dependencies, interface design, or implementation.

Decision evidence: `.harness/reports/20260903T102128Z-P4-owner-decision.md`.

Public-workflow validation: `research/P5_TUMOUR_BOARD_VALIDATION.md`.

## Repository artifacts

- `research/RESEARCH_PROTOCOL.md`
- `research/PAIN_POINTS_V2_ANALYSIS.md`
- `research/CLAIMS.md`
- `research/evidence.schema.json`
- `research/evidence.jsonl`
- `research/validate_ledger.py`
- `research/INDIAN_WORKFLOW_MAPS.md`
- `research/THEME_BRIEFS.md`
- `research/SOLUTION_LANDSCAPE.md`
- `research/CONTRADICTIONS.md`
- `research/OPPORTUNITY_MATRIX.md`
- `research/P5_TUMOUR_BOARD_VALIDATION.md`
- `research/P5_OPERATOR_VALIDATION_KIT.md`
- `.harness/reports/20260903T110322Z-P5-public-workflow-validation.md`
- `.harness/reports/20260903T102128Z-P4-owner-decision.md`
- `.harness/reports/20260903T094928Z-P1-research-protocol.md`
- `.harness/reports/20260903T100755Z-P2-first-evidence-slice.md`
- `.harness/reports/20260903T100845Z-P2-evidence-integration.md`
- `.harness/reports/20260903T112712Z-P5-operator-validation-ready.md`
- `.harness/reports/20260903T114127Z-P5-outreach-authority.md`

## Verification

- `python3 research/validate_ledger.py`
- all evidence references in workflow, theme, solution, contradiction, matrix, and synthesis artifacts must resolve to ledger IDs;
- every external measurement remains attached to its original setting and method;
- every candidate states its strongest contradictory evidence;
- no candidate crosses the explicit clinical boundary;
- `chatroom_notes.md`, the raw expanded DOCX, and private/local material remain ignored; publication occurs only through pull requests.
