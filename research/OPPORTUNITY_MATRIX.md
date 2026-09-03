# Oncology opportunity comparison

## Decision boundary

This matrix ranks **discovery priorities**, not final products. Desk research cannot close the local actor, workflow, adoption, and baseline gaps. The repository owner controls product lock after `P5`.

Scores are 0 = weak, 1 = mixed, 2 = strong. Hard safety or evidence failures override totals.

## Candidate summary

| Candidate | Evidence | India relevance | Frequency | Burden | Actor clarity | Safe scope | Light integration | Pilot KPI | Existing-gap clarity | Differentiation | Local validation dependency | Total / 22 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A. Outside-record consultation readiness | 2 | 2 | 1 | 1 | 0 | 2 | 2 | 2 | 1 | 1 | 0 | 14 |
| B. Tumour-board case readiness and follow-through | 2 | 2 | 2 | 1 | 1 | 2 | 2 | 2 | 2 | 1 | 1 | 18 |
| C. Barrier-aware care-team follow-up | 2 | 2 | 1 | 2 | 0 | 2 | 1 | 2 | 1 | 1 | 1 | 15 |

The totals aid comparison; they do not prove a decision.

The expanded private pain-point source adds four weak records from one three-account source group (`EV-0045`–`EV-0048`). It strengthens questions about multi-provider portability and caregiver work but does not change a score: no actor, frequency, person-time, or independent confirmation was added.

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

If current NCG/local boards already have reliable decision handoff and owned follow-through—or if no named operational role can own the workflow—Candidate B should fall behind Candidate A. Candidate A becomes first when direct evidence identifies a recurring preparer and shows that source-linked outside-record review saves total person-minutes after verification. External P5 outreach is paused until the internal analyst clarifies the expanded source.

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
- selected caregiver accounts involving cross-city referral, additional opinions, multiple providers, and caregiver record handling, treated as weak evidence from one source group.

Evidence: `EV-0002`, `EV-0005`, `EV-0008`, `EV-0016`, `EV-0018`, `EV-0046`, `EV-0047`.

### Evidence of burden

- KCDO field research reports time constraints and duplicate/manual entry, but no oncology-specific duration.
- Onco-Insight reduced registry abstraction by 12.42 minutes per case, but this is a different role and job (`EV-0017`).
- Exact consultation-preparation frequency and person-minutes remain unknown; the expanded source adds journeys but no measurement.

### Current workaround

Manual sorting, patient or caregiver record carrying and narration, scanning/upload, broad notes, duplicate entry, and direct source review.

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

First ask the internal analyst whether the expanded-source questionnaires produced direct workflow answers and whether a resident, coordinator, caregiver, or records role was actually observed. Candidate A still requires a synthetic time-and-task comparison plus one workflow owner who confirms the trigger, responsibility, verification cost, and baseline.

## Candidate B — Post-board decision handoff and operational disposition

### Primary user

Provisional: a locally named operational or downstream-service owner. A designated secretariat exists in some surveyed hospitals; one historical Eastern India audit used a patient care coordinator, while one recent Chennai post-MDT workflow split responsibility between treating oncologists and palliative care. The actual target-site role remains unconfirmed.

### Trigger

Clinicians complete the board discussion and author or finalise the human decision.

### Job

Make or reference the signed human decision in the authorised treating workflow, record receipt or review, assign any explicitly stated non-clinical coordination item, and keep completion or unresolved status visible.

### Current process

Public evidence shows several patterns:

- physical, hybrid, and electronic decision documentation;
- EMR notes, written summaries, direct communication, and other routes;
- NCG/KCDO final-decision fields and later yes/no follow-up review;
- NCG/iECHO submission, review, approval, notification, and sharing before the board;
- draft NABH requirements for electronic board IDs, scheduling, integrated review, attendance, recommendations, and follow-ups;
- at one Eastern India hospital, preformed Excel case lists, post-meeting decision entry, and patient-care-coordinator collection of later treatment and follow-up data.
- in one 2023–2025 Chennai QI workflow, MDT identification triggered oncologist initiation/referral and downstream palliative-team documentation; an SOP and shared paper form replaced unreliable verbal handoff.

Evidence: `EV-0014`, `EV-0019`, `EV-0020`, `EV-0036`–`EV-0044`.

### Evidence of frequency and burden

- 137 of 172 responding NCRP-affiliated hospitals reported a board;
- 47.4% of those boards met weekly;
- 63.5% used physical documentation;
- 48.2% had no recommendation follow-up system;
- 16.8% used EMR notes for recommendation communication;
- the Eastern India audit recorded 800 discussions in 12 months, including 227 repeat discussions, and retained more than 20% missing or unknown data in several measures.
- the Chennai target cohort improved documentation from 0% to 92% using role clarity, an SOP, education, and one colour-coded form, but the clinical workflow is outside this product scope.

No Indian source measures generic treating-unit acknowledgement, decision-to-disposition time, duplicate-entry count, or coordinator person-minutes.

### Current workaround

Paper or written summaries, EMR notes, direct communication, preformed Excel case lists and master charts, programme coordination, patient-care-coordinator tracing, role-specific SOPs and shared forms, and later board review.

### Existing alternatives

NCG/KCDO MDT requirements, NCG VTB, iECHO workflow, NABH draft oncology HIS/EMR requirements, local boards and EMRs, spreadsheets, patient care coordinators, and commercial tumour-board platforms.

### Safe output

- reference to an existing clinician-authored/signed decision;
- authorised recipient role or treating unit;
- available/sent and acknowledgement timestamps;
- non-clinical coordination item copied from the authorised human record;
- operational owner and human-assigned due date;
- status: pending, completed, deferred, rejected, or unresolved;
- human-entered reason and authorised escalation;
- audit trail.

### Human-review boundary

Clinicians author and sign the decision and determine every clinical action. The system may track the operational handoff but must not rewrite the decision, rank treatment, interpret reports, decide urgency, or determine whether treatment was clinically followed correctly.

### Light integration boundary

Use a reference or export from the existing decision record plus authorised recipient, owner, status, and audit metadata. Do not create another clinical source of truth, board network, or pre-board upload system.

### Candidate KPI

- percentage of discussed cases whose existing human decision is available to and acknowledged by the authorised treating unit within a locally agreed interval;
- time from board close to decision availability;
- percentage of explicitly assigned non-clinical items with a named owner;
- percentage with visible completed or unresolved status;
- duplicate entries and clarification contacts per case;
- coordinator person-minutes per case.

### Main evidence against

- NCG/KCDO and draft NABH requirements already cover broad electronic board workflow;
- iECHO already covers substantial pre-board governance;
- one Indian hospital already used a coordinator and spreadsheet for post-board data collection;
- a recent Indian post-MDT workflow improved documentation through role clarity, training, an SOP, and a shared paper artifact rather than new software;
- absence of public acknowledgement fields does not prove operational absence;
- “follow-up system” may mean later clinical outcome capture rather than this handoff;
- another layer may duplicate the EMR or shift work to a coordinator;
- the target actor, baseline, and material burden remain unknown.

### Required next evidence

Use `research/P5_OPERATOR_VALIDATION_KIT.md` with one current operational or downstream-service owner. Obtain a process map and aggregate baseline, determine what “follow-up” means locally, compare software against a simpler role/SOP/form intervention, and review only an approved blank artifact or field list. Return to Candidate A if the existing process is adequate or no material non-clinical gap exists.

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
| Caregiver/family psychosocial-support coordination | Research hypothesis | Two of three selected caregiver accounts report a support gap, but one weak source group cannot establish role, prevalence, safe intervention, or Doctor/Care Team fit |

## Owner decision

The repository owner selected **Candidate B** as the next bounded discovery lane.

This does not authorise product implementation. `P5` must first confirm the exact owning role and choose one broken step from human-decision documentation, authorised communication, operational ownership, or completion tracking.

Candidates A and C remain explicit fallbacks if current NCG/local boards already handle the selected step reliably or no role owns it.

Decision evidence: `.harness/reports/20260903T102128Z-P4-owner-decision.md`.

### P5 public validation update

Public NCG and iECHO artifacts show that presenter assignment, case-template preparation, content review, correction, notification, and controlled pre-session sharing already exist. The NCG/KCDO MDT model also defines a human-entered final decision and a later yes/no review of whether it was followed.

Candidate B is therefore narrowed to **the handoff from the existing clinician-authored decision to authorised treating-unit acknowledgement and operational disposition**. It must not recreate the board, pre-board upload, clinical recommendation, or later clinical adherence assessment.

The primary user remains a role hypothesis: the local tumour-board operational owner, such as a designated secretariat or nodal operations person. Public evidence does not identify the actual local owner, current system, or baseline.

Detailed evidence and falsifiers: `research/P5_TUMOUR_BOARD_VALIDATION.md`.

### Expanded-source reassessment

The private V2 source contains no answered tumour-board workflow and does not overturn Candidate B. It adds caregiver/family support as a hypothesis and makes Candidate A a more credible fallback by weakening the blanket rare-switching assumption. External NCG outreach is paused; the internal analyst should first clarify provenance, whether the proposed questionnaires were administered, and whether direct clinician answers exist.
