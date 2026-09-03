# Indian oncology workflow maps

## Reading rule

These maps combine published Indian requirements and research. They are not a claim that every hospital follows one process.

- **Required/intended:** NCG/KCDO module or standard describes the target workflow.
- **Observed/reported:** a study or field-research source reports actual behaviour.
- **Open:** the specific target-setting process is unknown.

Clinical decisions appear only to explain where operational information moves. The proposed product must not make those decisions.

## Shared longitudinal record layer

Across specialties, a common operational layer can preserve:

1. original source artifact;
2. origin and date or explicit date uncertainty;
3. literal source assertion;
4. encounter or workflow context;
5. review state and reviewer;
6. corrections, addenda, and superseded versions;
7. disclosure and audit history.

It must not turn source text into inferred diagnosis, stage, response, toxicity, prognosis, urgency, or treatment.

Sources: [ABDM FHIR v7 draft](https://www.nrces.in/preview/ndhm/fhir/r4/index.html), [NCG/KCDO Oncology EMR](https://www.kcdo.in/oncologyemr), and ledger records `EV-0009`–`EV-0014`.

## Medical oncology

### Intended workflow from NCG/KCDO requirements

```text
Prior record and consultation
  → doctor review and treatment documentation
  → protocol/order preparation
  → nurse verification and administration record
  → monitoring and documented adverse events
  → on-treatment summary
  → completion summary and follow-up
```

### Main roles

- medical oncologist or prescribing clinician;
- oncology nurse and treatment/day-care staff;
- pharmacist where part of local workflow;
- laboratory and other diagnostic services;
- patient/caregiver and coordinator;
- tumour board when a case is referred.

### Important artifact distinctions

- intended protocol is not proof of administration;
- order is not administration record;
- planned date is not completed treatment;
- source-reported adverse event is not a system-assigned toxicity grade;
- on-treatment summary differs from final completion summary;
- outside treatment requires separate provenance and verification.

### Published operational evidence

The NCG module defines connected doctor, nurse, monitoring, and summary records (`EV-0011`, `EV-0034`). The 2026 Tata Memorial registry evaluation reports that outside treatment, cross-centre referral, later treatment, and follow-up still needed manual review even inside a mature integrated environment (`EV-0017`, `EV-0018`).

### Open workflow questions

- Who prepares the longitudinal history before the medical-oncology review?
- How are medicines actually administered elsewhere distinguished from plans or prescriptions?
- Which outside records can be verified without contacting another institution?
- Is preparation done before, during, or after the consultation?
- Which repeated entry is documentation burden rather than clinically necessary verification?

## Surgical oncology

### Intended workflow from NCG/KCDO requirements

```text
Clinic and prior diagnostic record
  → pre-operative assessment and required inputs
  → operation-theatre booking/worklist
  → safety and anaesthesia checks
  → operation and anaesthesia documentation
  → postoperative events and ward handoff
  → pathology and discharge records
  → follow-up
```

### Main roles

- surgical oncologist and surgical team;
- anaesthesia team;
- operating-theatre scheduling and nursing staff;
- ward team;
- pathologist;
- radiology team;
- coordinator and records staff.

### High-risk handoffs

- clinic to theatre scheduling;
- outside imaging/pathology to internal review;
- operation to postoperative ward;
- specimen to pathology and later addenda;
- discharge/completion record to medical or radiation oncology;
- surgery at one institution followed by oncology care elsewhere.

### Published evidence and limit

The NCG module establishes deep specialty-specific requirements (`EV-0012`). It does not quantify actual missing inputs or handoff burden. The KCDO UX audit reports referral-history access and upload failures in Indian systems, but is healthcare-general and does not isolate surgical oncology (`EV-0016`).

### Open workflow questions

- Which missing source blocks booking versus merely slows review?
- Who chases pathology addenda, outside images, or clearances?
- Which post-operative record is needed by the next specialty?
- How is a corrected diagnosis or procedure record propagated without overwriting provenance?

## Radiation oncology

### Intended workflow from NCG/KCDO requirements

```text
Referral and prior oncology evidence
  → radiation consultation
  → simulation and specialised planning inputs
  → plan and quality workflow
  → scheduled delivery over sessions
  → interruption and monitoring records
  → completion summary
  → follow-up and cross-specialty handoff
```

### Main roles and systems

- radiation oncologist;
- medical physicist and dosimetry role;
- radiation technologist;
- nursing and scheduling staff;
- treatment-planning system and oncology information system;
- PACS/RIS and source EMR/HIS;
- referring medical or surgical oncology service.

### Boundary

Planning, dose, comparison, toxicity, and treatment changes are clinical or specialised technical work. A general product may support source readiness, status, authorised handoff, and reviewed completion records; it must not design or interpret the plan.

### Published evidence and limit

The NCG module establishes a materially different specialty workflow (`EV-0013`). No retained Indian study yet quantifies the time spent locating prior records or moving completion information across radiation and other departments.

### Open workflow questions

- Which prior source artifacts must be present before simulation or planning?
- How are prior radiation records from another institution handled?
- What minimum reviewed completion record must return to the referring team?
- Which scheduling or interruption status is safely operational rather than clinical triage?

## Multidisciplinary tumour board

### Intended NCG/KCDO case lifecycle

```text
Case selected
  → presenter assigned
  → NCG template completed with history, investigations, imaging, and board question
  → programme/organisation team reviews content and PII/PHI
  → approved content shared for the session
  → human multidisciplinary discussion
  → human decision recorded in the local/MDT workflow
  → [publicly undocumented intermediate handoff]
  → subsequent MDT may record whether the earlier decision was followed
```

### National operating context

The NCG already operates a Virtual Tumor Board using scheduled host-and-centre sessions, a case template, and videoconferencing (`EV-0020`). Therefore, “connect oncologists” is not a sufficiently differentiated product statement.

Public P5 validation adds that NCG already publishes a six-slide presentation template, while iECHO supports presenter assignment, upload, review state, approval/rejection, correction notification, re-upload, and controlled sharing (`EV-0036`–`EV-0040`). The NCG/KCDO MDT module already contains final-decision fields and a later follow-up review (`EV-0014`).

The current NCG page describes email and Zoom, while an NCG 2022 account says VTB moved to iECHO. Treat the exact current platform configuration as unverified.

The draft NABH oncology HIS/EMR annexure independently expects patient selection, tumour-board IDs, scheduling, clinician notifications, a central case list, integrated evidence review, attendance, and standardised documentation of multidisciplinary inputs, recommendations, and follow-ups (`EV-0042`). It is a draft requirement, not evidence that a hospital has implemented the workflow.

### Single-centre audited workflow

One Eastern India hospital audit provides a concrete but non-generalisable workflow (`EV-0043`):

```text
Case details entered into preformed Excel list
  → weekly tumour-board discussion
  → board management decision entered after meeting
  → patient care coordinator collects treatment and follow-up data
  → coordinator traces patients and updates master chart
  → missing, unknown, and lost-follow-up data remain
```

The audit recorded 800 discussions in 12 months, including 227 repeat discussions. It identifies a patient care coordinator as a post-board data-collection role, but does not identify who entered the decision, whether the treating unit acknowledged it, or the person-time burden.

### Observed Indian gaps

The 2026 NCRP hospital survey (`EV-0019`) found among 137 reported boards:

- 63.5% used physical documentation;
- 24.8% used both physical and electronic documentation;
- 16.8% communicated recommendations through EMR notes;
- 48.2% had no follow-up system for recommendations;
- 5.1% always conducted cross-hospital case discussion;
- only 52.5% had a designated secretariat;
- 47.4% met weekly.

This directly supports heterogeneous documentation and follow-up mechanisms. It does not measure case-preparation time, identify the post-board owner, or prove that public documentation reflects the local workflow.

### Transfer evidence

A small Roche-funded Spanish pilot found integrated preparation reduced clinical-course and other preparation time for some roles, but not pathology or radiology review and not the total number of tasks (`EV-0021`). It is a measurement model, not an India effect estimate.

### Open workflow questions

- Who finalises or signs the existing human-authored decision?
- Which authorised treating unit receives it, and how is receipt acknowledged?
- Is a designated secretariat or nodal operations person responsible after the session?
- Which non-clinical actions have owners, due states, completion, or escalation?
- Does the local EMR already cover the handoff?
- What does “follow-up system” mean in the surveyed institutions?
- Would a new status layer remove work or create duplicate documentation?

## Cross-institution referral and patient-carried records

### Reported journey

```text
Local provider or diagnostic service
  → one or more referrals/providers
  → specialist cancer centre
  → medical, surgical, radiation, or multidisciplinary care
  → return, follow-up, or care at another institution
```

The 2022 Tata Medical Center qualitative study reports multi-provider journeys, uneven access, referral confusion, communication gaps, travel, and financial disruption across 100 patients and 48 caregivers (`EV-0027`). The Tata Memorial registry study reports manual work for outside treatment and referrals between TMC centres (`EV-0018`). The KCDO UX audit reports inability to view or upload prior referral details in the audited systems (`EV-0016`).

### Operational artifact path to investigate

```text
Patient-carried/outside artifact
  → intake and identity/source check
  → scan/upload or manual entry
  → classification and routing
  → clinician verification
  → incorporation into a bounded current-workflow view
  → correction/addendum handling
```

### Evidence limit

No retained India study measures consultation-preparation person-minutes for this complete path. The evidence supports fragmentation and manual handling but not yet the value of a particular summary product.

## Follow-up and continuity

### Reported barrier path

```text
Follow-up or treatment milestone scheduled
  → patient faces social, financial, travel, health, understanding, or service barrier
  → visit delayed or missed
  → care team may attempt contact
  → barrier may remain unresolved
  → completion or return is inconsistently tracked
```

The AIIMS Rishikesh study of 172 defaulters (`EV-0025`) measured reasons among people who defaulted, not prevalence among all patients. Social support, finance, commuting, illness, and counselling all mattered. A Tata Memorial oral-cancer study (`EV-0026`) found a high SMS reply rate but persistent missing clinical follow-up, showing that message delivery is not continuity.

### Safe operational boundary

A tool may:

- maintain authorised pending-work lists;
- record outreach attempts and barrier categories entered by staff;
- assign operational ownership;
- support approved multilingual communication;
- track completion and escalation to a human.

It must not infer clinical urgency, symptoms, risk, or appropriate treatment.

### Open workflow questions

- Who generates the follow-up list?
- Is contact information usable and consented?
- Which barriers can the care team actually address?
- What happens after a failed contact?
- What denominator defines completion?
- Can a 60–90-day pilot measure completed follow-up rather than messages sent?

## Registry and reporting

### Observed workflow

```text
Multiple structured EMR modules plus manual sources
  → trained abstractor retrieves variables
  → deterministic checks and manual validation
  → unified registry entry
  → follow-up data remains manual where source structure is absent
```

The Onco-Insight study (`EV-0017`, `EV-0018`) is the strongest retained India-specific operational measurement:

- manual abstraction mean: 29.14 minutes per case;
- integrated mean: 16.72 minutes per case;
- mean reduction: 12.42 minutes;
- demographic retrieval: 97.59%;
- diagnostic retrieval: 43.22%;
- complete TMC treatment linked: 52%;
- follow-up: fully manual.

### Implication

A registry-abstraction product has measurable evidence, but TMC already built one. The transferable lesson is narrower: structured source retrieval plus validation can reduce operational time, while outside, unstructured, and follow-up data remain hard. Novelty would require a different underserved user and workflow.

## Cross-cutting handoff matrix

| Transition | Typical artifacts | Existing system direction | Evidence-backed failure or limit | Safe research opportunity |
|---|---|---|---|---|
| Outside provider → cancer centre | Referral, pathology, imaging, prior notes, treatment records | ABDM/FHIR, EMR upload, patient-carried file | Referral detail/upload gaps; outside treatment needs manual review | Provenance-preserving intake and review |
| Medical oncology → nursing/day care | Protocol/order, labs, administration instructions | NCG medical module | Existing deep requirements; no local burden measure | Status/verification only after workflow evidence |
| Surgery → pathology/next specialty | Operative note, specimen, pathology/addendum, discharge | NCG surgical module | Cross-specialty burden unmeasured | Correct version and handoff completeness |
| Radiation → referring team | consultation, plan status, delivery/completion summary | NCG radiation module and specialised systems | Cross-system burden unmeasured | Reviewed completion handoff |
| Human board decision → treating unit | Existing decision record, authorised recipient, acknowledgement, assigned operational item, status | NCG MDT decision and later review; local EMR/registry | Heterogeneous communication; 48.2% report no follow-up system; intermediate owner/status unverified | Reference the human decision and validate acknowledgement plus operational disposition |
| Encounter → registry/reporting | structured modules plus manual abstraction | Onco-Insight and NCG dashboards | Diagnostic/outside/follow-up data remain manual | Source retrieval and validation for a different underserved workflow |
| Scheduled milestone → completed follow-up | appointment, contact, barrier, outcome | local trackers and messaging | Structural barriers; SMS reply does not ensure attendance | Owned barrier-aware coordination |

## Current workflow conclusion

Three operational wedges remain plausible:

1. **Tumour-board decision handoff and operational disposition** — owner-selected P5 lane, narrowed to the intermediate step after a human decision and before later clinical review; exact local actor, system, and baseline remain unverified.
2. **Outside-record intake and consultation readiness** — strongest fallback and fragmentation alignment, but the exact preparer, time burden, and incremental value over EMR/ABDM remain unmeasured.
3. **Barrier-aware follow-up coordination** — strong direct evidence of an important India problem, but many causes are not solvable by reminders or software and the primary user/workflow still needs confirmation.

No map justifies a generic oncology dashboard, autonomous summary, clinical interpretation, or treatment assistant.
