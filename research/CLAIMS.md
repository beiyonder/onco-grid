# Testable oncology workflow claims

## How to use this file

Each claim is narrow enough to be supported, contradicted, or left unresolved. The source pain-point notes establish that a clinician raised a concern; they do not establish prevalence, severity, India-wide applicability, or product fit.

For every claim promoted into the final synthesis, the ledger must show the actor, workflow moment, evidence source, method or sample, India relevance, burden or explicit measurement gap, existing alternative, contradiction search, and scope class.

## Find

### Source point 1 — Finding the right information quickly

- `CL-F01`: Oncology professionals perform repeated searches across more than one professional information source during routine work.
- `CL-F02`: Locating the required authoritative passage creates measurable time or interruption burden.
- `CL-F03`: Toxicity-reference navigation is a distinct high-friction search task rather than only a general preference for convenience.
- `CL-F04`: Existing search products fail because of access, indexing, source fragmentation, freshness, local relevance, or workflow fit—not merely lack of awareness or training.
- `CL-F05`: A non-patient-specific authentic-source retrieval workflow can provide value without becoming clinical decision support.

### Source point 5 — Clinical-trial discovery

- `CL-F06`: Oncology professionals or research staff repeatedly search for trials by disease, biomarker, geography, and recruitment status.
- `CL-F07`: India-specific trial discovery has an information-quality or workflow gap beyond the existing national and international registries.
- `CL-F08`: Trial-status freshness and site/contact accuracy create material rework.
- `CL-F09`: General trial discovery can be separated from patient-specific eligibility interpretation and matching.

### Source point 7 — India-specific oncology information

- `CL-F10`: Indian oncologists need information that differs materially from international guidance because of availability, approvals, cost, population, infrastructure, or local evidence.
- `CL-F11`: Relevant NCG guidance, Indian real-world evidence, drug availability, and Indian trials are fragmented across sources.
- `CL-F12`: Current professional tools do not make India-specific provenance and freshness sufficiently visible.

### Source point 8 — Comparing guidelines

- `CL-F13`: Oncology professionals repeatedly compare multiple guideline families for the same general topic.
- `CL-F14`: The comparison task creates measurable search or synthesis burden.
- `CL-F15`: Licensing, versioning, and context differences make a reliable comparison product difficult.
- `CL-F16`: Patient-specific ranking of competing guidelines would cross into clinical decision support even if general source comparison is useful.

### Source point 9 — Staging information access

- `CL-F17`: Clinicians repeatedly need to locate cancer-specific staging references during routine documentation or knowledge work.
- `CL-F18`: Existing staging references create access or navigation burden.
- `CL-F19`: Reference retrieval can be separated from prohibited patient-specific stage calculation or inference.

### Source point 15 — Access to clinical tools

- `CL-F20`: Clinical calculators and reference tools are fragmented enough to create repeated navigation burden.
- `CL-F21`: Better categorisation alone would materially improve the task.
- `CL-F22`: Many patient-specific calculators fall outside the hackathon boundary even when discovery of the authentic tool is general knowledge work.

## Contextualise

### Source point 2 — Context-specific information

- `CL-CX01`: Generic oncology information is insufficient for common professional information tasks.
- `CL-CX02`: Disease, stage, biomarker, line of therapy, previous treatment, comorbidities, specialty, and institution are recurring context dimensions.
- `CL-CX03`: The necessary context is already recorded but distributed across artifacts or systems.
- `CL-CX04`: Organising explicitly documented context can reduce work without deriving new clinical meaning.
- `CL-CX05`: Using patient context to rank guidelines, trials, or treatment information would become clinical decision support.
- `CL-CX06`: Different oncology specialties require materially different record views rather than one universal summary.

## Synthesise

### Source point 3 — Fragmented patient information

- `CL-S01`: Oncology patient information is commonly distributed across multiple systems, institutions, or document formats.
- `CL-S02`: A named care-team role manually reconstructs patient chronology for a recurring consultation, referral, transfer, or discussion.
- `CL-S03`: Reconstruction creates measurable preparation time, clarification loops, repeated entry, or delayed workflow.
- `CL-S04`: Patient or caregiver retelling and patient-carried records are material inputs in the target Indian setting.
- `CL-S05`: Missing, unreadable, duplicate, corrected, or literally inconsistent records create distinct operational work.
- `CL-S06`: Existing EMR/HIS functionality does not adequately solve last-mile reconstruction in the target workflow.
- `CL-S07`: Every extracted assertion must retain exact provenance for clinicians to verify it efficiently.
- `CL-S08`: Reviewing an automatically prepared view can take less time than reconstructing the record manually.
- `CL-S09`: The same verified record packet can support consultation and later human multidisciplinary discussion without duplicating preparation.
- `CL-S10`: A source-linked consultation-ready view can remain operational if it never infers diagnosis, stage, response, risk, urgency, or treatment.
- `CL-S11`: A universal “complete patient summary” is unsafe or unusable unless bounded by purpose, specialty, time, source set, and review state.

## Act

### Source point 4 — Dosing and dose modification

- `CL-A01`: Locating authentic dosing and dose-modification references creates repeated point-of-work burden.
- `CL-A02`: Existing institutional protocols or oncology EMRs already cover much of this task in mature settings.
- `CL-A03`: Patient-specific dose calculation or modification is clinical decision support or treatment recommendation and is not promotable in this hackathon.
- `CL-A04`: A safe surrounding workflow may exist in locating the approved source or recording the clinician's decision without generating it.

### Source point 10 — Toxicity assessment

- `CL-A05`: Locating toxicity criteria creates repeated reference-navigation burden.
- `CL-A06`: Grading a patient's toxicity requires clinical interpretation and is outside product scope.
- `CL-A07`: A safe surrounding workflow may exist in authentic-source retrieval or clinician-entered documentation.

### Source point 11 — Drug interaction checking

- `CL-A08`: Oncology professionals encounter meaningful workflow burden when reviewing multiple medicines.
- `CL-A09`: Existing interaction tools are insufficient because of oncology coverage, local availability, workflow integration, or information quality.
- `CL-A10`: Patient-specific interaction assessment is clinical decision support and is outside product scope.

## Specialty-specific needs

### Source point 12 — Medical, surgical, and radiation differences

- `CL-SP01`: Medical, surgical, and radiation oncology have materially different artifacts, systems, handoffs, and completion states.
- `CL-SP02`: A shared provenance and chronology layer is possible without forcing one specialty's clinical structure onto another.
- `CL-SP03`: Radiation planning and dosimetry needs require specialised systems and cannot be reduced to a generic record dashboard.
- `CL-SP04`: Cross-specialty handoffs create a distinct operational problem even when each department has adequate internal software.

## Connect

### Source points 13 and 16 — Knowledge sharing and case discussion

- `CL-CO01`: Oncologists have recurring cases or professional questions that require human peer or multidisciplinary discussion.
- `CL-CO02`: The main burden is one or more of expert discovery, case preparation, permissioned sharing, scheduling, discussion, decision documentation, or follow-up.
- `CL-CO03`: Existing tumour-board and professional-network workflows leave a measurable last-mile gap.
- `CL-CO04`: Smaller or non-metro settings face a different access or coordination burden from large cancer centres.
- `CL-CO05`: A reviewed, purpose-bounded case packet can reduce preparation duplication.
- `CL-CO06`: Identity, consent, access control, confidentiality, moderation, and institutional policy are prerequisite product constraints.
- `CL-CO07`: The system can support human discussion without presenting generated text as clinical advice.

### Source point 14 — Research and presentation preparation

- `CL-CO08`: Oncology professionals spend material time preparing research, presentations, referrals, protocols, or educational content.
- `CL-CO09`: Authentic-source retrieval, provenance, and institutional knowledge organisation are stronger needs than generic text generation.
- `CL-CO10`: Existing general-purpose and medical knowledge tools do not adequately fit this workflow.

## Outside-theme claims

### Follow-up and continuity

- `CL-O01`: Oncology services experience operationally significant missed follow-up, delayed milestones, or loss to follow-up.
- `CL-O02`: A named care-team role manually identifies and contacts patients needing follow-up.
- `CL-O03`: Data fragmentation or unclear ownership prevents reliable follow-up lists.
- `CL-O04`: A measurable operational KPI such as follow-up completion, no-show rate, or outreach turnaround can move within 60–90 days.

### Referral and access

- `CL-O05`: Referral and cross-institution transfer create repeated information and coordination gaps.
- `CL-O06`: Patients outside major centres face specialist-access, travel, or navigation burdens that change care-team workflow.
- `CL-O07`: A safe coordination product can improve referral readiness without triage, diagnosis, or treatment advice.

### Documentation and repeated entry

- `CL-O08`: Oncology professionals or staff re-enter the same information across multiple systems or artifacts.
- `CL-O09`: Documentation burden consumes material time or contributes to delayed completion and work after hours.
- `CL-O10`: Existing templates or automation fail because they do not match specialty workflow, provenance, or local systems.

### Clinic and treatment operations

- `CL-O11`: Appointment, investigation, treatment-day, and department coordination create measurable operational bottlenecks.
- `CL-O12`: The safe value is queue, status, ownership, and communication visibility—not clinical urgency scoring.

### Patient/caregiver communication

- `CL-O13`: Language, health literacy, and caregiver coordination create repeated clinician or staff work.
- `CL-O14`: General or clinician-approved communication can remain assistive, while patient-specific clinical advice is excluded.

### Registry, reporting, and research operations

- `CL-O15`: Oncology registry, quality-reporting, and research-data preparation require repeated extraction or reconciliation.
- `CL-O16`: Existing NCG/KCDO reporting requirements and EMR capabilities reduce the novelty of a generic dashboard.
- `CL-O17`: A remaining gap may exist in source provenance, data quality review, or cross-system preparation rather than dashboard display.

### Caregiver, psychosocial support, portability, and role assumptions

- `CL-O18`: In some oncology journeys, a caregiver performs material operational work across records, appointments, navigation, communication, and travel.
- `CL-O19`: Families or caregivers experience a repeated service-access or coordination gap around counselling and psychosocial support.
- `CL-O20`: Existing digital booking, reminders, or stored records can coexist with queues, missing support, or incomplete end-to-end workflow.
- `CL-O21`: Referral, additional-opinion, cross-city, or multi-provider journeys create a recurring record-portability and reconciliation job.
- `CL-O22`: A resident or junior fellow performs recurring chart assembly in the target setting and is a better primary user than the oncologist or coordinator.
- `CL-O23`: A safe caregiver-support workflow can coordinate access to human services or clinician-approved general information without assessing psychological state or generating clinical advice.

## Cross-cutting falsifiers

Any candidate is weakened or rejected when evidence shows:

- the job is rare or low burden;
- no named actor owns it;
- the existing EMR or process is adequate when used as designed;
- automation adds more verification time than it saves;
- the output depends on prohibited medical interpretation;
- the workflow requires identifiable data that cannot be governed safely;
- a light integration cannot reach the necessary inputs;
- no operational baseline or pilot host can measure change;
- the proposed gap is generic and already served by established products;
- evidence is mostly vendor marketing, duplicated sources, or non-Indian transfer.
