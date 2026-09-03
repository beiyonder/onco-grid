# P5 — Tumour-board decision handoff validation

## Status

- Owner-selected discovery lane: tumour-board human-decision documentation and operational follow-through.
- Research date: 2026-09-03.
- Evidence boundary: public, non-sensitive artifacts only.
- Result: public evidence identifies one historical Eastern India patient-care-coordinator/Excel workflow and substantial NCG, iECHO, and draft NABH standards coverage, but does not establish the actual current target-site owner or acknowledgement baseline.
- Product lock: not reached.

## Research question

After an oncology tumour board completes a discussion, who ensures that the clinician-authored decision reaches the authorised treating team and that any non-clinical follow-through has a named owner and visible status?

This question deliberately excludes whether the clinical decision is correct, whether treatment should be changed, and whether a patient followed the clinical recommendation.

## Executive conclusion

Public evidence now supports a narrower candidate:

> **Post-board human-decision handoff and operational disposition:** after clinicians author the final tumour-board decision, a tumour-board operational owner needs to make the signed record available to the authorised treating unit, obtain or record acknowledgement, assign any explicitly stated non-clinical coordination step, and keep completion or unresolved status visible.

The proposed product is not a new tumour board, case-summary generator, or clinical recommendation system.

The strongest evidence for this narrower handoff is:

1. the 2026 Indian NCRP survey reports that 48.2% of 137 reported boards had no follow-up system and that recommendation communication was split among EMR notes, written summaries, direct communication, and other methods (`EV-0019`);
2. the NCG/KCDO MDT requirements explicitly contain a human-entered final decision and a later yes/no review of whether the earlier decision was followed (`EV-0014`);
3. the public NCG VTB page, its six-slide presentation template, and current iECHO help describe submission, review, presentation, scheduling, and content approval in detail but do not publicly describe the intermediate post-meeting acknowledgement, assignment, or completion path (`EV-0036`–`EV-0040`).

The strongest contradiction is equally important:

- NCG already defines final-decision and subsequent-review fields;
- iECHO already provides presenter assignment, content review, states, notifications, and controlled sharing before the session;
- many hospitals report implementing board recommendations most or all of the time;
- a dedicated coordinator role elsewhere can solve this as governance and staffing rather than new software (`EV-0041`);
- absence from public documentation does not prove absence from the actual workflow.

Therefore Candidate B remains a **workflow-validation lane**, not an approved product.

## Public workflow map

### 1. Case enters the board process

The current NCG VTB page says NCG member centres may submit cases for scheduled cross-centre discussion. It describes recurring host-centre sessions and deadline-based submission (`EV-0036`).

Known roles:

- presenting centre;
- case presenter;
- NCG/ECHO programme coordination;
- host centre;
- participating oncology experts.

Unknown:

- how a case is selected inside the presenting institution;
- who confirms institutional authorisation;
- which record is considered the official local case request.

### 2. Presenter prepares the public NCG template

The blank NCG VTB presentation template has six sections (`EV-0037`):

1. presenter, centre, diagnosis, and presentation date;
2. brief presenting complaints, examination, and treatment history;
3. relevant investigations and pathology;
4. imaging;
5. treatment fitness where relevant;
6. questions for the tumour board.

The template is an established pre-board artifact. It should be treated as a possible input, not recreated as a novel product.

The template has no visible field for:

- the final human decision;
- decision author or sign-off;
- authorised recipients;
- acknowledgement;
- operational owner;
- due date;
- completion or unresolved state.

This omission only describes the public presentation deck. Separate internal artifacts may exist.

### 3. Case content is submitted and reviewed

There is a source-freshness tension:

- the current NCG page describes email submission and Zoom;
- an NCG 2022 newsletter says VTBs moved to iECHO in October 2022;
- current generic iECHO help describes a session-specific case-content workflow.

Do not assume one public description exactly matches the present NCG configuration.

Current iECHO participant guidance (`EV-0038`) describes:

1. the hub sends an invitation;
2. the presenter opens the participant group and session;
3. the presenter uploads content;
4. the file goes to the programme team for review;
5. the programme team approves or rejects it;
6. rejected content can be corrected and re-uploaded after a stated reason.

Current iECHO hub guidance (`EV-0039`) further describes:

- organisation staff assigning one or more case presenters;
- an `Under Review` state;
- download and review;
- approve or reject;
- a recommendation that the organisation team check for PII and PHI;
- notification of rejection and re-upload;
- sharing approved content with participants.

Conclusion: presenter assignment, upload, review state, revision, notification, and controlled pre-session sharing already exist as generic platform capabilities.

### 4. Experts review and discuss

The NCG 2022 programme account says an ECHO-appointed coordinator worked with NCG experts, disease-management groups reviewed case presentations, and presenting centres were invited to present (`EV-0040`).

The current NCG page says experts join the scheduled session and contribute to discussion (`EV-0036`).

This project must not evaluate or automate the clinical discussion.

### 5. Human decision is documented

The NCG/KCDO MDT requirements provide a much richer local-EMR model than the public VTB slide deck (`EV-0014`).

Part B includes fields for:

- human-entered discussion summary;
- decision of the discussion;
- whether the decision follows NCG guidelines;
- comments from radiation, surgical, medical, radiology, and pathology participants;
- need for further tests;
- need for a subsequent MDT;
- final human decision;
- any recorded change after discussion.

This directly contradicts any claim that NCG lacks a decision-documentation model.

### 6. Later follow-up is reviewed

Part C of the NCG/KCDO MDT requirements asks at a subsequent MDT:

- whether the first decision was followed;
- if not, the reason;
- and links the review to previous MDT details.

This establishes a later review state. It does not publicly specify the intermediate operational handoff between the first decision and that later review.

### 7. The public evidence gap

Across the public artifacts reviewed, the following intermediate states are not specified consistently:

- who signs or finalises the human-authored decision;
- which authorised treating unit receives it;
- whether receipt is acknowledged;
- whether an explicitly stated operational action has a named owner;
- when that action is due;
- whether it is pending, completed, deferred, rejected, or unresolved;
- how an unresolved item is escalated before a subsequent board;
- whether the system duplicates an existing EMR note or registry record.

This is a public-evidence gap, not proof of an operational absence.

## Actor map

| Role | Supported responsibility | Evidence strength | Boundary |
|---|---|---:|---|
| Case presenter / presenting centre | Prepares and uploads case content; presents the case | Direct NCG/iECHO public evidence | Not established as post-board owner |
| Organisation or programme team | Assigns presenter; reviews content; checks PII/PHI; approves/rejects; shares approved content | Direct generic iECHO evidence | NCG-specific configuration not observed |
| ECHO/NCG coordinator | Receives or coordinates submissions and works with NCG experts | Direct but partly historical NCG evidence | Post-board accountability not described |
| Disease-management group / oncology experts | Reviews and discusses the clinical case | Direct NCG evidence | Clinical authority; not the operational product user by default |
| Treating doctor/unit | Identified in the NCG MDT model and receives/acts on clinical decisions | Official requirements | Exact communication and acknowledgement path unknown |
| Designated tumour-board secretariat | Present at 52.5% of boards in the Indian NCRP survey | Direct India survey evidence | Duties and software use not reported |
| Nodal person responsible for board operations | 28.5% of survey respondents held this role | Direct India survey-method evidence | Respondent status does not prove task ownership |
| MDT coordinator | Elsewhere, formal policy assigns meeting lists, evidence, minutes, distribution, action plans, milestones, and escalation | Transfer evidence only | Cannot be assumed for India |
| Patient care coordinator | In one Eastern India hospital audit, collected treatment and follow-up data after the board, traced patients, and completed the master chart | Direct single-centre India workflow evidence (`EV-0043`) | Historical 2020–2021 audit; decision entry and treating-unit acknowledgement ownership remain unknown |
| Treating oncologist and downstream palliative-care team | In one 2023–2025 Chennai QI project, MDT identification triggered oncologist initiation/referral and palliative-team discussion/documentation | Direct recent India single-centre evidence (`EV-0044`) | Sensitive goals-of-care workflow; not a general board owner or product scope |

## Primary user conclusion

The evidence does **not** justify naming “the oncologist,” a secretariat, or a patient care coordinator as the universal primary user.

Observed Indian ownership varies:

- one historical board audit used a patient care coordinator for later treatment/follow-up data collection (`EV-0043`);
- one recent post-MDT quality-improvement workflow divided ownership between the treating oncologist and a downstream palliative-care team (`EV-0044`);
- the national survey reports secretariats and nodal respondents but does not assign the post-board handoff (`EV-0019`).

The remaining interface-role hypothesis is a **locally named operational or downstream-service owner**. Product lock requires a current target workflow to identify that role and show material burden.

## Exact broken-step decision

The initial job should no longer combine case readiness and follow-through.

### Defer pre-board case readiness

Why:

- the NCG template already structures case presentation;
- NCG/ECHO coordination already receives and reviews cases;
- iECHO already supports presenter assignment, review states, approve/reject, re-upload, notification, and controlled sharing;
- no Indian preparation-time or rejection baseline has been found.

Recent Indian QI evidence further weakens a generic software proposal: one post-MDT referral/documentation gap improved from 0% to 92% documentation through role clarity, an SOP, resident education, and one colour-coded paper form (`EV-0044`). The content was a sensitive clinical goals-of-care workflow and is not this project's scope, but the operational lesson is direct: test a simpler process/form intervention before adding software.

### Select post-board operational disposition for validation

The selected step is:

> **From final clinician-authored decision to acknowledged operational disposition.**

The step starts only after clinicians finish and author the decision. It ends when:

1. the signed human decision record is available to the authorised treating unit;
2. receipt or review is recorded;
3. any explicitly stated non-clinical coordination item has a named owner and status;
4. unresolved items remain visible through an authorised escalation path.

The product must not determine whether the clinical recommendation was followed correctly. That remains a clinician and institution responsibility.

## Provisional bounded problem contract

> When an oncology tumour board completes a case discussion, the local tumour-board operational owner needs to make the clinician-authored decision available to the authorised treating unit and maintain a visible operational disposition. Public Indian evidence shows heterogeneous physical/electronic documentation and communication, with 48.2% of surveyed boards reporting no follow-up system. NCG already defines final-decision and later review fields, while public NCG/iECHO artifacts strongly cover the pre-board workflow. The remaining hypothesis is an intermediate handoff gap: acknowledgement, non-clinical ownership, status, and escalation between the signed decision and later clinical review. A safe concept would reference—not generate—the human decision and record authorised recipients, acknowledgement, explicitly assigned operational actions, owner, status, and audit history. It would never assess treatment adherence, clinical correctness, urgency, diagnosis, or patient outcome.

This contract is provisional because the local actor, current system, baseline, and duplication risk remain unknown.

## Safe output contract

Allowed fields:

- board/case reference using synthetic or authorised local identifiers;
- reference to the existing clinician-authored decision record;
- author/sign-off state supplied by the clinical workflow;
- authorised recipient role or unit;
- sent/available timestamp;
- acknowledgement timestamp and actor;
- non-clinical coordination action copied from the authorised human record;
- operational owner;
- due date where a human assigned one;
- status: pending, completed, deferred, rejected, or unresolved;
- human-entered reason;
- escalation recipient and timestamp;
- immutable audit events.

Not allowed:

- generating or rewriting the clinical decision;
- ranking treatments;
- determining whether a recommendation is clinically appropriate;
- interpreting reports, imaging, pathology, stage, response, progression, or risk;
- deciding clinical urgency;
- deciding that a treatment was or was not correctly followed;
- autonomous patient communication or advice.

## Minimal integration boundary

The first experiment should not create another clinical source of truth.

It should accept only:

1. a reference or export of an existing human-authored decision;
2. the authorised treating unit or recipient role;
3. explicitly human-assigned operational items;
4. status and audit events.

The output should be exportable or linkable back to the existing EMR, registry, or approved board record.

No patient record, real recommendation, or production integration is required for a synthetic workflow experiment.

## Measurement contract

### Primary operational KPI

> Percentage of discussed cases for which the existing human-authored decision is available to and acknowledged by the authorised treating unit within a locally agreed interval.

This measures handoff completion, not clinical agreement or treatment adherence.

### Secondary measures

- time from board close to decision availability;
- percentage of explicitly assigned non-clinical items with a named owner;
- percentage of operational items with visible completed or unresolved status;
- number of clarification contacts required to find the decision owner;
- duplicate entries required across board and EMR systems;
- coordinator person-minutes per case.

No baseline value should be invented. The current public evidence provides survey proportions across hospitals, not these local process measures.

## Falsifiers

Stop or return to Candidate A if any of the following is established:

1. the target site already creates a signed decision automatically in the treating team's normal record;
2. authorised recipients already receive and acknowledge it reliably;
3. explicitly assigned operational items already have clear ownership and status;
4. no separate operational owner exists and the treating clinician handles the step without material burden;
5. “follow-up system” in the Indian survey refers only to clinical-outcome research rather than an operational workflow;
6. the proposed layer would require duplicate entry rather than removing work;
7. the workflow cannot be evaluated without patient-specific clinical judgement;
8. the local baseline leaves no meaningful improvement to measure;
9. confidentiality or institutional policy prevents the minimum information flow;
10. the actual unmet burden is pre-board evidence preparation rather than post-board handoff.

## Minimum evidence still required

Public research cannot close these items:

1. exact owning role at one current target board; one 2020–2021 Eastern India audit identifies a patient care coordinator for later data collection but not the full handoff;
2. current decision artifact and system;
3. how the treating unit receives the decision;
4. whether receipt is acknowledged;
5. what the local “follow-up system” tracks;
6. one aggregate denominator and baseline;
7. coordinator or staff person-time;
8. current duplication and workaround;
9. local privacy, retention, and escalation policy.

## Cheapest non-sensitive validation

The next request does not require an oncologist or patient record.

Ask one board coordinator, secretariat member, HBCR principal investigator, nodal operations person, programme administrator, or registry staff member for a 20-minute process-only walkthrough:

1. What role receives the final board decision?
2. Where is the signed decision stored?
3. Who sends or makes it available to the treating unit?
4. How does the treating unit acknowledge it?
5. Are non-clinical next steps assigned to anyone?
6. What statuses are recorded between the meeting and the next review?
7. What is the denominator for a normal week or month?
8. Which step is repeated in paper, spreadsheet, message, or EMR?
9. May they share a completely blank decision/minutes/follow-up template?

Request aggregate counts and blank artifacts only. Do not request a filled case, screenshot, meeting recording, recommendation, patient identifier, or clinical outcome.

## Additional public validation

### Draft NABH oncology HIS/EMR standard

The public draft NABH cancer-care annexure (`EV-0042`) expects an electronic tumour-board workflow covering patient selection, a unique board ID, scheduling, clinician notification, a central case list, integrated record review, attendance, and standardised documentation of multidisciplinary inputs, recommendations, and follow-ups.

This further weakens any broad product claim. The draft does not specify acknowledgement by the treating unit, a non-clinical action owner, due dates, or intermediate status. It is a requirements document, not implementation or burden evidence, and its referenced sample summary remains an `XXX` placeholder.

### Eastern India single-centre audit

A one-year audit of 800 tumour-board discussions (`EV-0043`) describes a concrete Indian workflow:

1. case lists were prepared before weekly meetings on preformed Excel sheets;
2. the recommended management decision was entered after the meeting;
3. treatment and follow-up data were collected from hospital records;
4. a patient care coordinator attempted to trace patients and complete the master chart;
5. substantial missing, unknown, and lost-follow-up data remained.

This is the first retained direct Indian source to name a post-board operational role and tool. It does **not** show who entered the decision, whether the treating unit acknowledged it, how much staff time the work took, or whether the current workflow still operates this way.

The source changes the actor hypothesis from purely speculative to **supported in one site but not generalisable**. It also strengthens the contradiction: a coordinator plus spreadsheet may already perform the job, so software must remove a demonstrated burden rather than digitise an adequate manual process.

### Recent Chennai post-MDT quality-improvement workflow

A 2023–2025 NCG EQuIP-India project (`EV-0044`) identified eligible cases during MDT meetings, assigned the treating oncologist to initiate and refer, and assigned the downstream palliative-care team to complete and document a sensitive goals-of-care workflow. Unreliable verbal/telephone handoff was replaced by an SOP and one shared colour-coded paper form; target-cohort documentation rose from 0% to 92%.

This is not a product candidate because eligibility, prognosis, and the discussion are clinical. It supplies two operational lessons: the downstream service may own the handoff rather than a board secretariat, and role clarity plus one standard artifact may solve the problem without software.

## Decision

P5 has narrowed Candidate B from a broad tumour-board workflow to **post-board human-decision handoff and operational disposition** and completed the reachable public-evidence work.

Recent evidence shows that ownership can sit with a patient care coordinator or with the treating and downstream clinical teams, and that an SOP plus one shared form can outperform an unreliable verbal handoff. It does not establish a universal board operator or a current target-site baseline.

The product gate therefore remains open. Use the operator kit with the current NCG VTB support route or another explicitly approved target. If no current non-clinical actor and material gap can be established, return to Candidate A rather than building from absence of documentation.

## References

- `EV-0014` — NCG/KCDO MDT requirements.
- `EV-0019` — 2026 NCRP-affiliated hospital tumour-board survey.
- `EV-0020` — current NCG Virtual Tumor Board page.
- `EV-0036` — detailed current NCG VTB submission workflow.
- `EV-0037` — public blank NCG VTB presentation template.
- `EV-0038` — iECHO participant case-upload workflow.
- `EV-0039` — iECHO organisation-team case governance.
- `EV-0040` — NCG VTB coordinator and iECHO migration account.
- `EV-0041` — transferable formal MDT coordinator role.
- `EV-0042` — draft NABH oncology HIS/EMR tumour-board requirements.
- `EV-0043` — Eastern India single-centre Excel and patient-care-coordinator workflow.
- `EV-0044` — recent Indian post-MDT referral/documentation QI with split downstream ownership and a process/form intervention.
- [NCG Virtual Tumor Board](https://www.ncgindia.org/key-initiatives/virtual-tumor-board)
- [NCG VTB blank presentation template](https://www.ncgindia.org/assets/ncg-key-initiatives/virtual-tumor-board/vtb-template.pptx)
- [NCG/KCDO MDT Module v2.0](https://www.kcdo.in/src/docx/ner-multi-disciplinary-tumor-board-module-2.0.pdf)
- [NCRP-affiliated hospital tumour-board survey](https://pmc.ncbi.nlm.nih.gov/articles/PMC13161587/)
- [iECHO participant case submission](https://help.iecho.org/submitcase)
- [iECHO organisation-team presenter and review workflow](https://help.iecho.org/How-to-add-a-Case-presenter-cf2d6d13daea4599ade15de0f630dff6)
- [NCG 2022 VTB programme account](https://www.ncgindia.org/uploads/newsletter/pdf/file-3DE79E10-B469-47F9-9E9F-DEC4A5F29B6C.pdf)
- [Draft NABH Cancer Care and Management Annexure](https://portal.nabh.co/Announcement/Draft%20Cancer%20Care%20and%20Management%20Annexure.pdf)
- [Eastern India tumour-board audit](https://doi.org/10.31557/apjcc.2024.9.1.97-102)
- [Recent Indian post-MDT documentation quality-improvement project](https://pmc.ncbi.nlm.nih.gov/articles/PMC12670709/)
- [Transfer reference: formal MDT coordinator responsibilities](https://www.england.nhs.uk/mids-east/wp-content/uploads/sites/7/2018/08/investigation-diagnosis-mgmnt-mou-and-cup-v2.pdf)
