# Oncology opportunity comparison

## Decision boundary

This matrix ranks **discovery priorities**, not final products. Desk research cannot close the local actor, workflow, adoption, and baseline gaps. The repository owner controls the P4 selection gate.

Scores are 0 = weak, 1 = mixed, 2 = strong. Hard safety or evidence failures override totals.

## Candidate summary

| Candidate | Evidence | India relevance | Frequency | Burden | Actor clarity | Safe scope | Light integration | Pilot KPI | Existing-gap clarity | Differentiation | Local validation dependency | Total / 22 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A. Outside-record consultation readiness | 2 | 2 | 1 | 1 | 0 | 2 | 2 | 2 | 1 | 1 | 0 | 14 |
| B. Tumour-board case readiness and follow-through | 2 | 2 | 2 | 1 | 1 | 2 | 2 | 2 | 2 | 1 | 1 | 18 |
| C. Barrier-aware care-team follow-up | 2 | 2 | 1 | 2 | 0 | 2 | 1 | 2 | 1 | 1 | 1 | 15 |

The totals aid comparison; they do not prove a decision.

## Recommended discovery priority

**B. Tumour-board case readiness and follow-through** is the strongest desk-research priority.

Why:

- direct 2026 India hospital evidence reports physical documentation, weak recommendation follow-up, little regular cross-hospital discussion, and variable secretariat support (`EV-0019`);
- 47.4% of reported boards met weekly, giving a recurring workflow signal;
- NCG already defines the required case packet (`EV-0014`), which makes the workflow concrete;
- the safe output can be bounded to readiness, source provenance, human decision documentation, and operational follow-through;
- measurable endpoints exist without measuring clinical correctness;
- the NCG VTB and MDT module create a credible integration target rather than requiring a new expert network.

The same existing NCG infrastructure is also the main novelty risk. The candidate must complement a board, not create another one.

### Condition that changes the recommendation

If current NCG/local boards already have reliable case-readiness, electronic decision documentation, and owned follow-up—or if no named coordinator/secretariat role can own the workflow—Candidate B should fall behind Candidate A. Candidate A becomes first when direct evidence identifies a recurring preparer and shows that source-linked outside-record review saves total person-minutes after verification.

## Candidate A — Outside-record consultation readiness

### Primary user

**Open.** Likely records/intake staff, nurse, coordinator, resident, or oncologist. The evidence does not justify choosing one.

### Trigger

A new, referred, transferred, or returning oncology patient arrives with records from other systems or institutions that must be reviewed for a bounded consultation.

### Job

Prepare a source-linked, clinician-reviewable view of the supplied history without inventing missing information or interpreting clinical meaning.

### Current process

Reported components include:

- patient-carried files, PDFs, scans, and outside reports;
- referral details that may not be viewable/uploadable;
- fragmented data across computers/modules;
- manual review of outside and cross-centre treatment;
- duplicate offline/online documentation;
- clinician verification.

Evidence: `EV-0002`, `EV-0005`, `EV-0008`, `EV-0016`, `EV-0018`.

### Evidence of burden

- KCDO field research reports time constraints and duplicate/manual entry, but no oncology-specific duration.
- Onco-Insight reduced registry abstraction by 12.42 minutes per case, but this is a different role and job (`EV-0017`).
- Exact consultation-preparation frequency and person-minutes remain unknown.

### Current workaround

Manual sorting, patient narration, scanning/upload, broad notes, duplicate entry, and direct source review.

### Existing alternatives

NCG-aligned EMRs, ABDM exchange, local HIS/EMR/PACS/LIS, Onco-Insight-style structured retrieval, commercial oncology EHRs, and manual files.

### Safe output

A purpose-bounded packet containing:

- original artifacts;
- literal source assertions with exact evidence locations;
- source/date uncertainty;
- unreadable or duplicate material;
- literal metadata discrepancies;
- clinician review status and correction history.

### Human-review boundary

An authorised clinician confirms, corrects, rejects, or defers extracted assertions. The system never confirms diagnosis, stage, response, progression, toxicity, urgency, prognosis, or treatment.

### Light integration boundary

Initial synthetic file upload or a single export adapter. No HIS/EMR replacement and no production ABDM claim.

### Candidate KPI

- median person-minutes to prepare and review a bounded case;
- time to locate a requested source statement;
- percentage of packets ready before consultation;
- clarification loops per packet;
- correction and unsupported-assertion rate.

### Main evidence against

- no direct India consultation-preparation measurement;
- NCG/ABDM already target interoperability and longitudinal oncology records;
- verification may erase automation savings;
- the primary burden may be data entry rather than chart review;
- another tool may increase duplication.

### Required next evidence

A synthetic time-and-task comparison with representative artifact sets plus at least one workflow owner who confirms the trigger, responsibility, and current baseline.

## Candidate B — Tumour-board case readiness and follow-through

### Primary user

Provisional: tumour-board secretariat, coordinator, or presenting clinical team. Only 52.5% of surveyed boards reported a designated secretariat, so ownership must remain configurable and verified.

### Trigger

A case is selected for a local or NCG virtual multidisciplinary discussion.

### Job

Prepare a permissioned, source-linked case packet; show operational readiness and missing artifacts; capture the final human decision; route and track authorised follow-through.

### Current process

- board-specific case selection;
- history and prior-treatment assembly;
- pathology and imaging collection;
- question formulation;
- physical, hybrid, or electronic documentation;
- written or direct recommendation communication;
- inconsistent follow-up;
- cross-hospital submission through NCG VTB.

Evidence: `EV-0014`, `EV-0019`, `EV-0020`.

### Evidence of frequency and burden

- 137 of 172 responding NCRP-affiliated hospitals reported a board;
- 47.4% of those boards met weekly;
- 63.5% used physical documentation;
- 48.2% had no recommendation follow-up system;
- 16.8% used EMR notes for recommendation communication;
- 5.1% always conducted cross-hospital discussion.

Person-minutes per case were not measured in India. A small Spanish pilot supports the measurement method but not an Indian effect size (`EV-0021`).

### Current workaround

Paper records, written summaries, direct communication, email/template submission, videoconferencing, local EMR notes, and manual follow-up.

### Existing alternatives

NCG/KCDO MDT module, NCG VTB, local boards, hospital EMRs, videoconference tools, presentation templates, and commercial navify-class platforms.

### Safe output

- a stated human-authored board question;
- source-linked packet and completeness status;
- operational missing-item list;
- named reviewers and readiness state;
- meeting metadata;
- clinician-authored/signed decision record;
- non-clinical follow-through assignment and status;
- audit trail.

### Human-review boundary

Clinicians select the case, define the question, decide which evidence is adequate, make the decision, and authorise follow-through. The system does not rank treatment, interpret reports, or generate the board recommendation.

### Light integration boundary

Start with the NCG/local case template plus synthetic files and exportable decision/follow-up record. Later adapters may link existing EMR artifacts; no new expert network.

### Candidate KPI

- percentage of cases ready at agenda lock;
- active preparation person-minutes by role;
- cases postponed for missing information;
- time from case submission to discussion;
- percentage with signed decision recorded within the agreed period;
- percentage with an assigned and completed operational follow-through item.

### Main evidence against

- existing NCG MDT and VTB capabilities;
- existing commercial end-to-end platforms;
- no Indian preparation-time baseline;
- confidentiality and institutional access complexity;
- board workflows vary substantially;
- a digital packet may shift work to a coordinator;
- clinical decision quality is outside the product evaluation.

### Required next evidence

Confirm one current NCG/local case-submission path, identify the preparer, and determine whether the direct gap is readiness, documentation, communication, or follow-through. Only one should be the initial job.

## Candidate C — Barrier-aware care-team follow-up

### Primary user

**Open.** Likely oncology nurse, patient navigator, coordinator, social worker, or clinic operations staff—not necessarily the oncologist.

### Trigger

A patient has an upcoming, missed, or incomplete authorised follow-up or treatment milestone.

### Job

Maintain an actionable worklist, record staff-identified barriers, assign ownership, support approved two-way communication, and track operational completion.

### Current process

- scheduled visits and repeated milestones;
- patient/caregiver travel and social constraints;
- possible telephone or SMS contact;
- manual barrier handling;
- variable counselling and navigation;
- completion may not be visible across systems.

Evidence: `EV-0025`, `EV-0026`, `EV-0027`, plus official use case 01.

### Evidence of burden

Among 172 people who defaulted at AIIMS Rishikesh:

- 26.2% reported lack of social support;
- 20.3% financial constraints;
- 16.3% commuting difficulty;
- 13.4% being too ill to attend;
- mean travel was 143 km.

This does not estimate prevalence because the total patient denominator was not reported. In a 206-patient oral-cancer feasibility study, SMS generated 73.68% replies but 20.18% of prompt occasions lacked clinician follow-up (`EV-0026`).

### Current workaround

Calls, SMS, counselling, family support, manual lists, local navigation, and hub-and-spoke referral.

### Existing alternatives

Appointment systems, messaging, care coordinators, navigation programmes, local trackers, EMR reminders, and patient-engagement platforms.

### Safe output

- authorised pending-work list;
- contact and consent state;
- staff-entered non-clinical barrier category;
- outreach attempt and response;
- named owner;
- approved communication;
- completion or unresolved status;
- audit trail.

### Human-review boundary

Care-team staff determine clinical urgency, appropriate contact, advice, and escalation. The system does not interpret symptoms, predict default risk, or advise treatment.

### Light integration boundary

Single appointment/follow-up export plus staff workflow and approved communication channel. The initial candidate must not require a full longitudinal clinical record.

### Candidate KPI

- percentage of due items with named ownership;
- time from missed milestone to first completed contact;
- percentage of contacted patients with a barrier documented;
- percentage of actionable barriers resolved;
- completed follow-up rate, with an explicit eligible denominator;
- unresolved cases visible at handoff.

### Main evidence against

- reminder response does not ensure attendance;
- many barriers require money, transport, social support, or clinical services;
- contact data and staff capacity may be limiting;
- risk scoring and clinical urgency are prohibited;
- primary owner and baseline prevalence are unknown.

### Required next evidence

Identify one institution-level follow-up list, staff owner, reachable patient cohort, actionable barrier catalogue, and baseline completion measure.

## Rejected or deferred directions

| Direction | Decision | Reason |
|---|---|---|
| Patient-specific dosing, toxicity, interaction, staging, or trial matching | Reject | Prohibited clinical interpretation/CDS/treatment recommendation and already served by NCG/commercial systems |
| Generic oncology EMR or dashboard | Reject | Existing NCG requirements, vendors, dashboards, commercial EHRs, and interoperability work |
| Generic oncologist network | Reject | NCG VTB and other networks already exist; identity/governance burden high |
| General oncology search assistant | Defer | Weak India-specific workload evidence, crowded sources, licensing/freshness concerns, CDS leakage |
| Universal patient summary | Reject | Unsafe completeness claim, specialty variation, interpretation risk, and existing category |
| Registry abstraction tool for mature centres | Defer | Strong measured value but Onco-Insight already demonstrates an institution-specific solution |
| Research/presentation generator | Defer | Single weak clinician signal and strong general-tool alternatives; burden unmeasured |
| Clinic flow optimisation | Keep open | Official fit but insufficient India oncology baseline in this evidence slice |

## Owner decision

The repository owner selected **Candidate B** as the next bounded discovery lane.

This does not authorise product implementation. `P5` must first confirm the exact owning role and choose one broken step from human-decision documentation, authorised communication, operational ownership, or completion tracking.

Candidates A and C remain explicit fallbacks if current NCG/local boards already handle the selected step reliably or no role owns it.

Decision evidence: `.harness/reports/20260903T102128Z-P4-owner-decision.md`.
