# Contradictions and bias review

## Purpose

This file records evidence that weakens attractive ideas. It is not a list of reasons to stop; it prevents one-sided synthesis.

## Consultation-readiness and record synthesis

### Evidence for

- Official programme use case explicitly describes fragmented inputs and limited consultation time (`EV-0002`).
- Supplied clinician-derived notes identify fragmented patient information (`EV-0005`).
- Indian KCDO field research reports fragmented computers, referral-history access/upload problems, offline/online duplication, and manual entry (`EV-0016`).
- Tata Memorial's Onco-Insight study demonstrates a 12.42-minute reduction in registry abstraction through structured retrieval and validation (`EV-0017`).

### Contradictions

1. **The measured task is not consultation preparation.** Onco-Insight measures trained registry abstractors, not oncologists or clinic coordinators.
2. **Structured integration produced the demonstrated gain.** The study did not use generative summarisation; this weakens any claim that AI is necessary.
3. **Automation remained incomplete.** Diagnostic retrieval was 43.22%; outside care and follow-up remained manual (`EV-0018`).
4. **Existing national work is substantial.** NCG requirements, vendor products, adoption support, and ABDM interoperability weaken generic novelty (`EV-0009`, `EV-0015`).
5. **The largest burden may be data entry.** In a non-Indian head-and-neck time-motion study, input—not chart review—was the largest EHR component of initial consultations (`EV-0029`).
6. **A second tool may increase duplication.** KCDO reports that hybrid/offline systems already force duplicate maintenance (`EV-0016`).
7. **Verification cost is unknown.** No retained Indian study shows that verifying extracted assertions is faster than reviewing sources.
8. **“Complete summary” is unsafe.** Completeness depends on purpose, specialty, source set, and clinical judgement.

### Required falsification experiment later

Using synthetic artifacts, compare total person-minutes and missed-source assertions for current manual preparation versus source-linked extraction plus clinician review. Include correction time; do not evaluate model output alone.

## Find and knowledge assistant

### Evidence for

- Supplied notes contain repeated information-access requests (`EV-0003`).
- A 495-questionnaire German survey reports demand for rapid, transparent information and constraints from time/data (`EV-0022`).
- CTRI data quality and geographic disparity create real India-specific trial-information issues (`EV-0024`).

### Contradictions

1. No retained Indian study measures oncologist guideline-search frequency or time.
2. Oncologists in the German survey reported confidence using scientific databases.
3. NCG, professional guidelines, PubMed, CTRI, commercial medical tools, and navify already provide source access.
4. Licensing and versioning may prevent a complete comparison product.
5. Patient-context ranking becomes CDS.
6. Trial registry gaps do not prove that another search interface improves access.

### Decision

Do not promote Find as a primary product. Keep authentic-source retrieval as a possible supporting capability after a workflow is selected.

## Contextualisation

### Evidence for

- Supplied notes and Indian specialty modules show many context dimensions and different workflows (`EV-0004`, `EV-0011`–`EV-0014`).
- The molecular-report survey shows specialised trust and collaboration context (`EV-0023`).

### Contradictions

1. “Contextualise” hides two different jobs: record organisation and clinical interpretation.
2. No independent workload measure exists for contextualisation as a job.
3. ABDM, NCG, and mCODE already offer extensive modelling concepts.
4. One universal context model risks flattening specialty differences.

### Decision

Treat record context as a design invariant; reject system-generated clinical contextualisation.

## Act

### Evidence for

The supplied notes contain clear requests for dosing, toxicity, interactions, staging, and trial tools (`EV-0006`).

### Contradictions

1. Most patient-specific functions are explicitly prohibited (`EV-0001`).
2. NCG medical-oncology requirements already specify them (`EV-0034`).
3. Commercial oncology EHRs already market them (`EV-0035`).
4. Product value would depend on medical accuracy, current evidence, licensing, and institutional policy beyond the hackathon's operational boundary.

### Decision

Reject patient-specific Act. Do not disguise it as “information assistance.”

## Connect and tumour boards

### Evidence for

- Supplied doctor preference supports human discussion (`EV-0007`).
- Indian NCRP survey shows physical documentation, weak follow-up, and little regular cross-hospital discussion (`EV-0019`).
- NCG defines a detailed MDT case packet (`EV-0014`).

### Contradictions

1. NCG already runs a Virtual Tumor Board with a network, schedule, template, and conferencing (`EV-0020`).
2. NCG already specifies an MDT module.
3. navify already covers broad digital tumour-board workflow (`EV-0031`).
4. Indian case-preparation person-time is not measured.
5. The transferable NAVIFY pilot had eight clinicians, one breast board, fixed method order, and Roche funding; pathology/radiology time and task count did not improve (`EV-0021`).
6. Identity, institutional authorisation, patient consent, source disclosure, moderation, and clinical responsibility create high adoption cost.

### Decision

Reject generic expert connection. Retain only bounded case readiness, documentation, or follow-through as candidates.

## Follow-up and continuity

### Evidence for

- Direct Indian default and travel-barrier evidence (`EV-0025`).
- Direct evidence that SMS replies do not ensure completed follow-up (`EV-0026`).
- Patient/caregiver journey evidence shows referral, travel, finance, and communication disruption (`EV-0027`).
- Nearly half of surveyed Indian tumour boards lacked recommendation follow-up (`EV-0019`).

### Contradictions

1. The 172-person default study has no total patient denominator and cannot estimate prevalence.
2. Many causes—finance, transport, social support, illness, service distribution—cannot be fixed by a software reminder.
3. Reminder engagement is not attendance or completed care.
4. Patient-specific urgency or next-step advice would cross the clinical boundary.
5. Contact data quality, consent, staff capacity, and available support services can be the real limiting factors.

### Decision

A barrier-aware owned worklist is plausible. A reminder bot is not.

## Documentation and AI productivity

### Evidence for

- India field research reports duplicate and excessive entry (`EV-0016`).
- International oncology studies quantify consultation and after-hours EHR work (`EV-0028`, `EV-0029`).

### Contradictions

1. The largest international measurements come from US/European workflows and cannot be assigned to India.
2. EHR time aggregates inbox, orders, documentation, chart review, and other work.
3. Some EHR work is necessary clinical verification rather than waste.
4. Early AI reply drafting cited in the US study did not substantially reduce physician inbox time (`EV-0033`).
5. Staffing, protected time, policy, form simplification, or source-system fixes may outperform AI.

### Decision

Measure one job end-to-end. Never claim productivity from generation speed alone.

## Evidence-base biases

### Availability bias

The initial direction comes from available notes rather than a representative clinician sample.

Control: retain the outside-theme scan and opposing evidence.

### Confirmation bias

Search terms can overproduce sources about fragmentation and digital tools.

Control: require a contrary search and existing-solution review for each candidate.

### Publication bias

Successful digital interventions are more likely to be published than failed implementations.

Control: record neutral/failed interventions, implementation limits, funding, and conflict of interest.

### Vendor evidence bias

Commercial sources bundle many features and favourable case studies.

Control: classify vendor claims separately; never use them as prevalence or effectiveness evidence.

### Geography transfer bias

US and European EHR burden is easy to find and precisely measured.

Control: mark it uncertain for India and never import effect sizes.

### Institution bias

Tata Memorial, AIIMS, and NCG centres are high-capability referral settings and may not represent smaller hospitals.

Control: separate tertiary-centre evidence from smaller or low-digital-maturity settings.

### Role bias

Most evidence speaks about oncologists, patients, or registrars; hidden work by nurses, coordinators, records staff, and administrators is poorly measured.

Control: do not name a primary user without direct role evidence.

### Recency bias

Current product pages may be recent but are still marketing; older workflow studies may not reflect 2026 systems.

Control: record publication and access date, and distinguish stable mechanism from current market fact.

### Scope laundering

Terms such as “context,” “insight,” “important change,” “matching,” or “assistant” can hide clinical interpretation.

Control: classify every capability under the explicit scope taxonomy before promotion.

## Remaining critical unknowns

1. Exact primary actor for outside-record preparation.
2. Consultation-preparation frequency and person-minutes in India.
3. Source verification and correction time.
4. Which NCG-aligned EMR capabilities are actually deployed in the target setting.
5. Current NCG VTB case-preparation, incompleteness, postponement, and follow-up workflow.
6. Which continuity barriers a care team can act on with existing resources.
7. Whether any candidate removes work rather than adding another interface.
8. Which institution could provide a synthetic or fully anonymised workflow pilot and baseline.

These unknowns prevent a final product lock. They do not prevent ranking candidates for owner review.
