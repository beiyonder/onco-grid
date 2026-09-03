# Project Foundation

## Status

This document establishes the current evidence base, vocabulary, problem boundaries, and next decision gates. It deliberately does **not** initialise a software repository, choose an architecture, or lock a product concept. Those actions come after the problem and user workflow are validated.

Evidence labels used here:

- **[FACT]** Directly stated by an authoritative programme or standards source.
- **[SOURCE CLAIM]** Stated in supplied notes or by a vendor/initiative; useful but not independently validated here.
- **[INFERENCE]** A conclusion derived from multiple facts or claims.
- **[OPEN]** A question that must be answered before scope is locked.

## Executive conclusion

The strongest current discovery lane is:

> A doctor-facing oncology consultation-readiness workflow that reconstructs a longitudinal care journey from fragmented records into a source-linked, clinician-reviewable view, and can prepare the same verified context for human peer discussion.

This is a **discovery lane, not a final product definition**.

Why it is the best-supported lane:

1. **[FACT]** It directly matches the selected Doctor / Care Team Facing stream and official use case 02, Consultation Readiness & Patient Journey Review.
2. **[SOURCE CLAIM]** Fragmented patient history is one of the clearest problems in `Oncologist Pain Points.md` and the chat notes.
3. **[FACT]** It can remain assistive if it extracts, organises, cites, and requests human review without inferring diagnosis, stage, response, risk, or treatment.
4. **[INFERENCE]** It creates reusable foundations for Find and Connect without committing to a sprawling all-in-one workspace.
5. **[FACT]** India already has an NCG oncology-EMR initiative, oncology-specific requirements, dashboards, UI guidance, vendor implementations, and an interoperability programme. “An oncology dashboard” or “an oncology EMR” is therefore neither a blank market nor a sufficiently original problem statement.

The differentiating hypothesis must be narrower: **last-mile consultation preparation from messy, patient-carried or cross-system records; explicit provenance; clinician verification; and light integration in heterogeneous Indian care settings.** This hypothesis still requires interviews and workflow observation.

## What the three supplied files contain

### `hackathon_constraints_general_info.md`

High-authority programme constraints copied from the official site:

- Selected stream: Doctor / Care Team Facing.
- Seven candidate use cases.
- Workflow-first and light-integration expectations.
- Human control, auditability, multilingual/caregiver considerations.
- Measurable 60–90-day operational impact.
- Explicit exclusions: diagnosis, treatment recommendations, clinical decision support, clinical risk scoring, medical-data interpretation, and autonomous clinical advice.
- Submission is judged on relevance, feasibility, originality, and supporting evidence, not the idea alone.

The requested official-site scrape is preserved in `HEALTHATHON_OFFICIAL.md`, including the complete use-case set, programme timeline, data rule, and relevant FAQ answers.

### `Oncologist Pain Points.md`

A compact research synthesis, apparently based on doctor feedback, with five umbrella problems:

1. Find authentic oncology information quickly.
2. Contextualise information to a cancer and patient situation.
3. Synthesise fragmented patient records.
4. Act using practical point-of-care information.
5. Connect with peers for case discussion and knowledge sharing.

The strongest quoted strategic insight is that experienced oncologists may reject AI treatment recommendations and value authentic sources, knowledge sharing, doubt clearing, clinical discussion, and academic work instead.

Evidence limitations:

- The number and type of interviewees are not recorded.
- Interview questions, settings, frequency data, and severity data are absent.
- “Doctor X” is unidentified.
- The list numbering skips item 6; this appears editorial rather than semantic.
- Several listed requests are clinical decision-support functions and conflict with the hackathon boundary.

### `chatroom_notes.md`

Anecdotal and exploratory discussion that adds useful hypotheses:

- Patients may carry years of MRIs, EEGs, prescriptions, and other records and retell history from memory.
- Cancer histories may benefit from standardised presentation.
- Different hospitals use different systems, including institutions in the same larger network.
- Patient-data compliance is expected to be material.
- Cancer care is highly segmented by haematological/paediatric/solid disease, organ, stage, biomarker, line of treatment, and drugs.
- Changing oncologists may be uncommon because care is specialised and continuity matters.
- Scarcity of oncologists may require travel between cities.
- Medical and surgical oncologists may disagree, suggesting a role for structured multidisciplinary discussion.
- More oncologist interviews were proposed to add granularity.

Evidence limitations:

- These are personal examples and informal assertions, not prevalence evidence.
- One copied message is duplicated and truncated in the source file.
- “Doctors do not trust reports” is materially ambiguous.
- The discussion mixes record synthesis, second opinions, peer discussion, and clinical decisions; those are different workflows.
- No real patient data from the chat should be moved into future fixtures, memories, demos, or prompts.

## Source hierarchy

Use this precedence when sources disagree:

1. Live hackathon rules and FAQ.
2. Official Indian legal, NHA/ABDM, NRCeS, NCG, and KCDO materials.
3. Directly observed clinician workflow evidence and anonymised research notes.
4. Published independent research.
5. Vendor documentation, treated as product capability claims rather than independent evidence.
6. Team hypotheses and informal chat anecdotes.

The strictest safety statement wins. In particular, the official consultation-readiness use case mentions supporting interpretation of structured and unstructured information, while the global programme rules prohibit interpretation of medical data. The safe reading is: **ingest and organise those sources, but do not derive clinical meaning from them.**

## Programme constraints that shape the solution

### Fixed

- **[FACT]** Doctor / Care Team Facing stream.
- **[FACT]** Cancer Care domain.
- **[FACT]** Assistive operational workflow, not diagnostic or prescriptive.
- **[FACT]** Human override on AI-assisted steps and auditability for important actions.
- **[FACT]** Minimal phase-one system integration.
- **[FACT]** A measurable operational KPI and a credible 60–90-day pilot path.
- **[FACT]** Only fake or fully anonymised data in submissions, mentoring, prototypes, and demos.
- **[FACT]** Round 1 submission window: 12–25 September 2026; last saved version by 23:59 on 25 September is evaluated.
- **[FACT]** Build Sprint: 5 October–8 November 2026; Top 30 by 14 November; finale 28 November.

### Consequences

- A full HIS/EHR replacement is the wrong scope.
- Clinical outcomes are poor first KPIs for a short operational pilot; workflow time, completion, handoff, and correction measures are more defensible.
- A model cannot safely “fill in” missing clinical history.
- A generated summary without line-level provenance and clinician review conflicts with the trust signal in the supplied research.
- The prototype dataset must be synthetic from the beginning. Retrofitting de-identification later is not acceptable.

## Problem map

| Core problem | Evidence in supplied material | Official-use-case fit | Safety / scope risk | Current disposition |
|---|---|---|---|---|
| Find | Guidelines, trials, drug monographs, toxicity, staging, and publications are fragmented. | Use case 05, Doctor Productivity & Knowledge Assistant. | Low for general source search; high when ranking information for a specific patient or decision. | Supporting capability, not the initial wedge. |
| Contextualise | Generic answers are insufficient; oncology has deep segmentation. | Use cases 02 and 05. | High ambiguity. Record contextualisation is safe; patient-specific clinical contextualisation may be CDS. | Split the term; only record contextualisation is currently in scope. |
| Synthesise | Patient reports and history are fragmented; retelling loses details. | Direct match to use case 02; also supports 01, 03, and patient use case 06. | Manageable if extractive, source-linked, and clinician-reviewed. | Strongest primary discovery lane. |
| Act | Dosing, modifications, toxicity grading, interactions, indications, trial availability, staging. | Some overlap with use case 05, but not with the hard boundary. | Very high. Many examples are treatment recommendation, medical interpretation, or CDS. | Exclude from prototype scope. |
| Connect | Peer discussion, doubts, research, presentations, multidisciplinary disagreement. | Flexible innovation and productivity theme; NCG already defines tumour-board workflows. | Moderate-to-high due identity, consent, data disclosure, moderation, and risk of system-generated advice. | Secondary workflow after a verified case packet exists. |

## The current workflow hypothesis

### Primary workflow: consultation preparation

1. A patient or institution supplies records in several formats.
2. A doctor or staff member locates the relevant material.
3. Someone reconstructs chronology, prior encounters, documented investigations, and documented treatment history.
4. The doctor checks what changed since the last visit, what source material is missing, and what requires discussion.
5. The doctor verifies the prepared context and conducts the consultation.
6. Corrections and important actions are recorded.

### Current failure modes suggested by the sources

- Information is spread across systems, paper, scans, PDFs, photographs, and patient-carried documents.
- The chronology must be rebuilt repeatedly.
- Verbal retelling is incomplete.
- Origin, authenticity, or currentness of a document may be unclear.
- Different institutions structure oncology information differently.
- Specialist-specific views differ across medical, surgical, and radiation oncology.
- Generic summaries may hide the segmentation oncologists use.
- A busy OPD gives little time for reconciliation.

These are hypotheses until observed in real workflows.

### Secondary workflow: peer or multidisciplinary discussion

A clinician selects a bounded, reviewed case packet; identifies the human audience and purpose; shares it under explicit authorisation; conducts the discussion; and records discussion metadata and operational follow-up. The system does not generate the clinical opinion.

## Central tensions to resolve

### Standardisation versus uniqueness

A common longitudinal structure is useful, but oncology varies by specialty, disease family, organ, stage, biomarker, line, and institution. A safe foundation is a common provenance and chronology layer with later specialty-specific views, not one universal summary that claims completeness.

### Synthesis versus trust

The proposed value comes from synthesis, while the notes signal distrust. The product must make verification faster than rereading the whole chart. Source evidence, uncertainty, discrepancy handling, review state, and correction history are core product behavior, not explanatory UI added at the end.

### Portability versus continuity

The chat suggests patients rarely change oncologists, weakening a pitch based only on doctor switching or second opinions. Consultation preparation within the same long-running relationship, cross-department handoffs, and tumour-board review may be more frequent. This must be measured.

### Interoperability versus hackathon feasibility

ABDM and NCG establish the long-term interoperability direction. The hackathon asks for light integration. The prototype should model compatible records and interfaces but prove the workflow using synthetic files and a narrow adapter boundary, not claim production integration.

### Broad workspace versus credible wedge

Find, Contextualise, Synthesise, Act, and Connect describe a platform vision, not a buildable first product. Combining them before validating one job would produce shallow functionality and create clinical-safety leakage.

### Official use-case language versus hard exclusions

“Identify meaningful clinical changes” and “interpret structured and unstructured information” appear in use case 02, but interpretation and CDS are explicitly out of scope. The prototype may display explicitly documented changes and record discrepancies; it must not infer clinical significance.

## Existing landscape and novelty constraint

### India: NCG/KCDO oncology EMR ecosystem

The [NCG/KCDO Oncology EMR initiative](https://www.kcdo.in/oncologyemr) already provides:

- NCG EMR Requirements as a digital public good.
- Medical, surgical, and radiation oncology modules.
- Multidisciplinary tumour-board, palliative, pain, preventive, and related modules.
- Standardised clinical, operational, and financial KPI/dashboard guidance.
- UI/UX guidance for Indian EMR and clinical systems.
- An EMR adoption programme and empanelled vendors.
- An ABDM-based interoperability blueprint under pilot testing for structured and unstructured oncology data.

Its UI/UX research reports fragmented information, duplicate offline/online work, inability to view or upload prior referral details, slow systems, poor alignment with users’ mental models, and a preference for mobile devices in some settings. These findings independently reinforce the supplied notes, but they also show that the problem is recognised and actively addressed.

**Implication:** Do not pitch “the first standard oncology dashboard,” “the first oncology EMR,” or generic longitudinal records. Validate a workflow gap that existing EMRs and NCG specifications do not solve well in the target setting.

### India: ABDM interoperability

The [FHIR Implementation Guide for ABDM v7.0.0](https://www.nrces.in/preview/ndhm/fhir/r4/index.html) is a draft dated 15 July 2026. It defines R4-based exchange profiles and actors such as Health Information Provider and Health Information User, including document bundles, diagnostic reports, discharge summaries, health documents, outpatient consultations, prescriptions, appointments, encounters, observations, medications, procedures, and service requests.

**Implication:** Use ABDM concepts and FHIR R4 as interoperability references, but do not freeze a production contract against a draft guide during the idea phase.

### Oncology data standard: mCODE

[HL7 mCODE 4.0.0](https://hl7.org/fhir/us/mcode/) supplies oncology-specific FHIR profiles across patient information, disease characterisation, health assessment, genomics, cancer treatments, and outcomes.

**Constraint:** mCODE is a US Realm Standard for Trial Use and depends on US Core. It is a useful vocabulary and modelling reference, not an India-ready implementation contract.

### Existing commercial categories

- [Flatiron OncoEMR](https://flatiron.com/oncology/oncology-ehr) markets oncology-specific EHR workflows, integrations, reporting, patient access, staging, order templates, and clinical decision support.
- [Roche navify Clinical Hub for Tumor Boards](https://navify.roche.com/marketplace/products/navify-clinical-hub-for-tumor-boards) markets case preparation, rich patient summaries, meeting coordination, uploaded reports/images, discussion documentation, guidelines, literature, trial search, and analytics.

Vendor claims do not prove fit in Indian clinics, but they prove that generic oncology EHR, summary, knowledge, and tumour-board categories already exist.

## Safe product boundary

### Clearly in scope

- Ingest synthetic or fully anonymised source artifacts.
- OCR and transcribe content while preserving the original.
- Classify document type without making a clinical conclusion.
- Extract explicitly stated source assertions.
- Link every displayed assertion to exact source evidence.
- Order explicitly dated events chronologically and show date uncertainty.
- Detect duplicate files and literal metadata conflicts.
- Surface record-level gaps, such as an unavailable referenced artifact or unreadable date.
- Let clinicians confirm, correct, reject, or defer extracted content.
- Prepare a bounded consultation or case-discussion packet.
- Search authentic reference sources for general, non-patient-specific knowledge work.
- Record access, review, corrections, disclosures, and operational actions.

### Requires a deliberate safety review

- Highlighting “important” information.
- Describing what “changed” when the source does not state the change explicitly.
- Comparing values over time.
- Using patient context to rank guidelines, literature, or trials.
- Translating clinical language where a mistranslation could alter meaning.
- Detecting contradictions that require medical knowledge to resolve.
- Sending reminders tied to treatment or symptom interpretation.

### Outside scope

- Inferring or confirming a diagnosis, cancer type, stage, grade, progression, recurrence, response, toxicity, prognosis, or risk.
- Recommending treatment, dose, modification, sequence, continuation, or discontinuation.
- Drug-interaction assessment for a specific patient.
- Patient-specific trial matching.
- Clinical urgency or triage scoring.
- Replacing tumour-board or expert judgement.
- Generating autonomous patient advice.

## Provisional domain model

Canonical terms are defined in `CONTEXT.md`. The essential conceptual objects are:

- **Source artifact:** original record and provenance.
- **Source assertion:** literal content extracted from an artifact.
- **Clinician-confirmed fact:** reviewed assertion with actor and time.
- **Encounter:** documented care interaction.
- **Recorded care event:** explicitly documented investigation, treatment, or milestone.
- **Longitudinal care journey:** time-ordered view of recorded material.
- **Information gap:** missing record-level material needed for the stated workflow.
- **Source discrepancy:** literal conflict requiring human resolution.
- **Consultation-ready view:** reviewed representation for one consultation.
- **Case packet:** bounded disclosure for consultation, referral, or discussion.
- **Review decision:** confirm, correct, reject, or defer.
- **Operational action:** non-clinical follow-up step.
- **Audit event:** immutable record of important activity.

The model intentionally separates an assertion from a fact and a fact from a clinical interpretation.

## Candidate directions

| Direction | Evidence fit | Hackathon fit | Novelty challenge | Main risk | Decision |
|---|---:|---:|---:|---:|---|
| Consultation-ready longitudinal reconstruction | High | High | Medium | Trust and accidental interpretation | Primary discovery lane |
| Peer / multidisciplinary case discussion | Medium | Medium | High | Identity, consent, disclosure, clinical-advice boundary | Secondary lane |
| General oncology knowledge assistant | High | High | High | Source licensing, stale evidence, patient-specific CDS | Defer |
| Follow-up / patient registry | Medium in supplied notes | High | Medium | Requires reliable operational data and ownership | Revisit after interviews |
| Full oncology EMR | Existing ecosystem | Poor phase-one fit | Very high | Integration and scope explosion | Reject |
| Dosing, toxicity, interaction, staging, trial matching | Requested in notes | Conflicts with hard boundary | High | Clinical interpretation/CDS | Reject |

## Validation plan before product lock

“As many oncologists as possible” is less useful than purposive coverage. Recruit until the workflow patterns stabilise within the chosen segment.

### Minimum sampling dimensions

- Medical, surgical, and radiation oncology.
- Academic cancer centre, multispecialty hospital, smaller private practice, and referral setting.
- Metro and non-metro care pathways.
- High and low digital maturity.
- Oncologists, oncology nurses/care coordinators, and staff who actually prepare charts.
- Where relevant, tumour-board coordinators and caregivers.

### Interview method

Ask for recent concrete episodes, not feature opinions:

1. Walk through the last follow-up consultation that required history reconstruction.
2. Who prepared the chart, from which artifacts, using which tools, and how long did it take?
3. Which information was difficult to find, and what happened because of that difficulty?
4. Which documents are trusted, distrusted, or rechecked? What exactly does “do not trust reports” mean?
5. What is copied into notes, spreadsheets, WhatsApp, paper, or another system?
6. How often do outside records, referrals, second opinions, or multidisciplinary reviews occur?
7. Which cancer segments require materially different views?
8. Who can correct the reconstructed record, and how is disagreement handled?
9. What data may leave the institution, and under what consent and access process?
10. Which measurable step would improve in 60–90 days?
11. What current product or workaround comes closest, and why is it insufficient?

Do not collect identifiable records. Use researcher-created synthetic artifacts for walkthroughs.

### Evidence to capture

- Frequency and duration of the job.
- Roles and handoffs.
- Source-artifact inventory.
- Current workarounds and switching costs.
- Error and rework modes.
- Trust and provenance requirements.
- Institution and specialty variation.
- Current baseline for one operational KPI.
- Explicit disconfirming evidence.

## Evaluation contract for a future prototype

### Workflow outcome

Select one primary operational KPI after baseline observation. Likely candidates:

- Median consultation-preparation time.
- Time to locate a requested source statement.
- Percentage of case packets ready before the consultation.
- Number of clarification loops needed to complete a case packet.

### Trust and traceability

- Every displayed source assertion has source-artifact and evidence-location links.
- Generated wording never upgrades an assertion into a clinician-confirmed fact.
- Review status and correction history are visible.
- Unreadable, ambiguous, conflicting, and missing material remains explicit.
- The system fails closed rather than inventing dates, values, events, or conclusions.

### Safety

- Synthetic test cases cover diagnosis, staging, prognosis, treatment, dose, toxicity, interaction, trial matching, urgency, and patient-advice prompts.
- The system refuses prohibited clinical outputs and redirects to source review or human judgement.
- Important operational actions require an authorised human and create audit events.
- No real patient data enters development, evaluation, logs, prompts, analytics, screenshots, or demos.

### Robustness fixtures

Create synthetic cases with:

- Scans, photographs, PDFs, and structured records.
- Missing pages and unreadable text.
- Ambiguous and conflicting dates.
- Duplicate artifacts.
- Multiple institutions and patient identifiers.
- Corrected reports and later addenda.
- Mixed English and one validated target Indian language.
- Specialty-specific documents.
- Adversarial text embedded in uploaded artifacts.

Acceptance thresholds should be set from baseline tasks and a labelled synthetic corpus, not invented before the data exists.

## Highest-priority unknowns

1. **[OPEN] Primary job:** same-doctor follow-up preparation, cross-institution referral, second opinion, tumour board, or another workflow?
2. **[OPEN] Primary user:** oncologist, nurse, care coordinator, records team, or patient/caregiver?
3. **[OPEN] Initial oncology segment:** medical, surgical, radiation, paediatric, haematological, or one solid-tumour pathway?
4. **[OPEN] Trust statement:** what exactly is distrusted—patient-carried documents, reports from other institutions, AI-generated summaries, or verbal history?
5. **[OPEN] Frequency:** how often is longitudinal reconstruction performed and how much time/rework does it consume?
6. **[OPEN] Current tools:** which EMR/HIS, paper, spreadsheets, messaging, portals, or NCG-aligned systems are already used?
7. **[OPEN] Data ownership:** who may upload, see, correct, approve, and disclose the record?
8. **[OPEN] Input boundary:** which document types and languages matter in the first workflow?
9. **[OPEN] Integration boundary:** file upload only, export from an existing system, or one standards-based interface?
10. **[OPEN] Pilot KPI and host:** which institution can provide a synthetic/anonymised workflow pilot and baseline?
11. **[OPEN] Connect scope:** is peer discussion central value or a later consumer of a verified case packet?
12. **[OPEN] Differentiation:** what does the target setting need that NCG-aligned EMRs and existing products do not deliver?

## Decision gates

Do not proceed to the next gate without explicit evidence.

### Gate 1 — workflow

Choose one frequent job with a named actor, trigger, inputs, steps, output, and baseline burden.

### Gate 2 — safe boundary

Classify every proposed capability as operational assistance, clinical interpretation, or treatment recommendation. Remove the latter two.

### Gate 3 — segment and data

Choose one oncology segment and a finite synthetic artifact set. Define who reviews each assertion.

### Gate 4 — measurable outcome

Select one operational KPI and measurement method that can move within 60–90 days.

### Gate 5 — product concept

Compare the validated job against NCG/KCDO resources and existing products. State the non-obvious gap and why a light-integration prototype can prove it.

### Gate 6 — repository and build plan

Only then initialise the repository, architecture, eval corpus, implementation plan, and agent harness.

## Repository and agent-harness blueprint for the next phase

Do not create this structure until Gate 5 is passed. The smallest durable structure should separate facts, rules, decisions, plans, and executable evaluation.

```text
/
├── AGENTS.md                  # Mandatory project/safety rules and commands
├── CONTEXT.md                 # Domain glossary only
├── README.md                  # Product contract and local run path
├── docs/
│   ├── foundation.md          # This evidence synthesis
│   ├── research/              # Interview protocol, anonymised findings, source ledger
│   └── adr/                   # Only hard-to-reverse decisions with real trade-offs
├── plans/
│   ├── active.md              # Current bounded plan, acceptance criteria, drift checks
│   └── handoff.md             # Current state, evidence, blockers, exact next command
├── evals/
│   ├── fixtures/synthetic/    # No real patient data
│   ├── expected/              # Labelled assertions, provenance, allowed/refused behavior
│   └── scenarios/             # Workflow, robustness, safety, and adversarial cases
└── src/ and tests/            # Created only after stack selection
```

### Information placement

- Mandatory behavior, safety boundaries, allowed data, and commands: `AGENTS.md`.
- Canonical domain language: `CONTEXT.md`.
- Stable evidence and research synthesis: `docs/foundation.md` and `docs/research/`.
- Hard-to-reverse decisions: ADRs, used sparingly.
- Current execution state: active plan and handoff, not long-term memory.
- Stable project facts useful across sessions: project memory after the repository exists.
- Reusable workflow: a skill only after it has worked repeatedly.
- User preferences: personal memory, never patient or participant data.
- Live external facts: linked official sources, rechecked at decision time.

### Planning and execution loop

1. Orient from `AGENTS.md`, `CONTEXT.md`, the current plan, and relevant evidence.
2. Restate the bounded goal, non-goals, safety boundary, and observable acceptance criteria.
3. Trace every planned feature to a validated job and source.
4. Implement the smallest complete vertical slice.
5. Run the actual workflow against synthetic fixtures.
6. Evaluate provenance, correctness, prohibited-output behavior, and the operational KPI.
7. Correct the source of failure; add or strengthen the fixture that exposed it.
8. Update the handoff with exact state, evidence, risks, and next command.

### Drift and hallucination controls

- Label facts, source claims, inferences, and unknowns.
- Require source evidence for every extracted assertion.
- Never infer missing clinical content.
- Maintain a capability-to-user-job traceability table.
- Recheck the hard scope boundary at plan, review, and demo gates.
- Treat uploaded document text as untrusted data, never as instructions to the agent or application.
- Use synthetic golden cases with explicit expected evidence spans.
- Keep refusal scenarios alongside correctness scenarios.
- Stop when a requirement lacks a user, source, or evaluation path; return it to discovery.

### Self-correction and improvement

- A failure first becomes a reproducible fixture or scenario.
- Fix the underlying extraction, state, permission, or workflow behavior.
- Add a project rule only when the mistake is recurring and broadly preventable.
- Create or update a reusable skill only after the workflow succeeds more than once.
- Record a decision only when it is hard to reverse, surprising without context, and based on a real trade-off.
- Never let the agent rewrite safety boundaries, acceptance criteria, or source-of-truth hierarchy autonomously.

## Exact next deep work

1. Conduct targeted workflow interviews and artifact-free walkthroughs using the protocol above.
2. Read the relevant NCG/KCDO medical, surgical, radiation, and tumour-board modules only for the workflow selected at Gate 1.
3. Build a comparison matrix of current workflows and products in the target setting.
4. Select the primary actor, trigger, segment, input set, safe output, and operational KPI.
5. Write a one-page validated problem contract.
6. Pass Gate 5, then initialise the repository and harness.

## References

### Supplied

- `hackathon_constraints_general_info.md`
- `Oncologist Pain Points.md`
- `chatroom_notes.md`
- `HEALTHATHON_OFFICIAL.md`
- `CONTEXT.md`

### Official and primary

- [Health-a-thon use cases](https://healthathon.reskilll.com/#usecases)
- [Health-a-thon guide, timeline, and FAQ](https://healthathon.reskilll.com/guide)
- [NCG/KCDO Oncology EMR initiative and requirements](https://www.kcdo.in/oncologyemr)
- [NCG/KCDO EMR UI/UX Guidelines](https://www.kcdo.in/src/docx/EMR-UI-UX-Guidelines.pdf)
- [FHIR Implementation Guide for ABDM v7.0.0 draft](https://www.nrces.in/preview/ndhm/fhir/r4/index.html)
- [ABDM Health Data Management Policy](https://abdm.gov.in/static/media/health_management_policy_bac9429a79.80f74bc3e039c00acd4f.pdf)
- [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf)
- [Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?hl=en-US)
- [HL7 mCODE 4.0.0](https://hl7.org/fhir/us/mcode/)
- [Flatiron OncoEMR](https://flatiron.com/oncology/oncology-ehr)
- [Roche navify Clinical Hub for Tumor Boards](https://navify.roche.com/marketplace/products/navify-clinical-hub-for-tumor-boards)

This foundation is not legal or clinical advice. Recheck legal commencement, institutional policy, source licensing, and current programme rules before implementation or submission.
