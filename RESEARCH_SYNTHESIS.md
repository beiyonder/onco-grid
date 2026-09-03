# Oncology desk-research synthesis and decision packet

## Status

- Research access date: 2026-09-03.
- Current output: evidence-backed discovery priorities, not a final product selection.
- Evidence ledger: 41 validated records from 32 independent source groups.
- Direct India relevance: 29 records.
- Official or peer-reviewed evidence: 32 records.
- Public repository: the empty `main` base and PR branch exist; `chatroom_notes.md` remains ignored and all project changes require PR review.
- Owner decision: Candidate B—tumour-board human-decision documentation and operational follow-through—was selected on 2026-09-03 as the next discovery lane, not as product lock.
- P5 public validation narrowed Candidate B to the handoff from an existing clinician-authored decision to authorised treating-unit acknowledgement and operational disposition. The actual local owner and baseline remain unverified.

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

The stronger currently evidenced starting point is **post-board documentation and operational follow-through**. The original consultation-readiness direction remains the stronger alternative if evidence later shows that current boards already handle follow-through or lack an owning role.

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

## Candidate comparison

### Candidate 1 — Tumour-board documentation and operational follow-through

**Provisional actor:** board secretariat, coordinator, or presenting team.

**Trigger:** a human board discusses a submitted case.

**Job:** ensure the human-authored decision is recorded, communicated to the authorised care team, assigned for operational follow-through, and visibly completed or unresolved.

**Safe output:** signed human decision record, named owner, due/complete state, communication record, and audit trail.

**Not allowed:** system-generated recommendation, treatment ranking, report interpretation, or clinical urgency.

**Best KPI:** percentage of discussed cases with a signed decision, assigned owner, and recorded operational disposition within an agreed period.

**Evidence:** direct Indian survey shows 48.2% lacked a follow-up system and only 16.8% used EMR notes for recommendation communication.

**Main contradiction:** NCG MDT requirements and VTB already exist; current local follow-through tools and actor burden are unknown.

**Integration:** begin with an existing board template/decision export, not a new expert network or EMR.

### Candidate 2 — Source-linked outside-record consultation readiness

**Provisional actor:** unknown—records staff, coordinator, nurse, resident, or oncologist.

**Trigger:** a patient arrives with outside or heterogeneous records for a bounded oncology consultation/referral.

**Job:** preserve, classify, source-link, and prepare literal assertions for clinician review.

**Safe output:** bounded source packet with exact evidence, date/source uncertainty, unreadable/duplicate/literal-conflict status, and review history.

**Best KPI:** total person-minutes to prepare and review the packet, plus unsupported-assertion and correction rates.

**Evidence:** strong fragmentation, referral-upload, outside-care manual review, and structured-retrieval evidence.

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

## Proposed problem contract for owner review

This contract is a proposal, not yet validated or approved:

> When a multidisciplinary oncology board completes a case discussion, the board secretariat or presenting care team needs to preserve the human-authored decision, communicate it to authorised participants, assign non-clinical follow-through, and see whether it was completed. In the 2026 NCRP hospital survey, 48.2% of reported boards lacked a follow-up system and only 16.8% communicated recommendations through EMR notes, while physical documentation dominated. Existing NCG VTB and MDT infrastructure provide the board and case model but public evidence does not show a consistently owned electronic follow-through path. A safe first concept would record—not generate—the human decision, named owner, authorised communication, operational status, and audit history. It would not interpret records, recommend treatment, or score urgency. The primary pilot measure would be the percentage of discussed cases with a signed human decision, assigned owner, and recorded operational disposition within an agreed period.

### Unresolved before product lock

- exact owning role;
- whether the surveyed gap persists in the intended pilot site;
- current NCG/local decision-record and follow-up system;
- which follow-through states are operational rather than clinical;
- baseline number of eligible board cases;
- institutional authorisation, consent, retention, and disclosure rules;
- whether a narrow export/import avoids duplicate documentation;
- whether the workflow is more valuable than outside-record consultation preparation.

## Minimum next evidence

Direct oncologist interviews remain difficult. Before product build, use the cheapest non-sensitive evidence available:

1. obtain a blank current NCG or local tumour-board submission/decision template;
2. document the public NCG VTB submission and post-meeting path without patient data;
3. identify one board coordinator, administrator, registry principal investigator, or care-team operator rather than requiring an oncologist;
4. request only a process walkthrough and aggregate counts—never patient records;
5. determine who records the decision, where it is stored, who receives it, and what “follow-up system” means locally;
6. establish one aggregate baseline: eligible cases, signed decisions, assigned owners, or recorded disposition;
7. if this route fails, run a synthetic workflow comparison for Candidate A and keep the result labelled experimental rather than local validation.

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
- `.harness/reports/20260903T102128Z-P4-owner-decision.md`
- `.harness/reports/20260903T094928Z-P1-research-protocol.md`
- `.harness/reports/20260903T100755Z-P2-first-evidence-slice.md`
- `.harness/reports/20260903T100845Z-P2-evidence-integration.md`

## Verification

- `python3 research/validate_ledger.py`
- all evidence references in workflow, theme, solution, contradiction, matrix, and synthesis artifacts must resolve to ledger IDs;
- every external measurement remains attached to its original setting and method;
- every candidate states its strongest contradictory evidence;
- no candidate crosses the explicit clinical boundary;
- `chatroom_notes.md` and private/local material remain ignored; publication occurs only through pull requests.
