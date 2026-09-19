# Domain Glossary

## Assistive workspace

A doctor- or care-team-facing tool that reduces information and workflow burden while leaving every clinical judgement and consequential action with a human. It is not a diagnostic or clinical decision-support system.

## Source artifact

An original input item such as a consultation note, prescription, pathology report, imaging report, laboratory report, discharge summary, referral letter, scan, PDF, photograph, or structured record. A source artifact has provenance: origin, date where available, author or institution where available, ingestion time, and original content.

## Diagnostic report

A source artifact issued by a laboratory, radiology service, pathology service, or other diagnostic provider. Use this term instead of the ambiguous word “report” when referring to an input document.

## Source assertion

A statement explicitly present in a source artifact. Extraction creates source assertions, not verified clinical facts. Every displayed source assertion must remain linked to the exact source evidence from which it came.

## Clinician-confirmed fact

A source assertion that an authorised clinician has reviewed and accepted for the current workspace context. Confirmation records who reviewed it, when, and which source evidence was used. Confirmation does not make the system the clinical authority.

## Longitudinal care journey

The time-ordered record of encounters, source assertions, treatments already documented as given, investigations already documented as ordered or completed, and operational milestones across a person’s care. It describes recorded history; it does not infer disease state or recommend future care.

## Consultation-ready view

A clinician-reviewable representation of the longitudinal care journey prepared for a specific consultation. It separates source assertions, unresolved discrepancies, missing record categories, and clinician-confirmed facts. It is not an autonomous patient summary or medical interpretation.

## Case packet

A bounded, source-linked collection of information prepared for consultation, referral, second opinion, or peer discussion. Its purpose, audience, included sources, review status, and access scope are explicit.

## Information gap

A record-level absence needed to complete the intended workflow, such as a referenced document that was not supplied or a source with no readable date. It is not a clinical finding and must not imply what care should occur.

## Source discrepancy

Two or more source assertions that cannot be reconciled literally, such as different recorded dates or identifiers. The workspace surfaces the evidence for human resolution; it does not decide which clinical assertion is correct.

## Clinical interpretation

A conclusion about diagnosis, stage, disease status, treatment response, toxicity, risk, prognosis, or appropriate care derived from medical data. Clinical interpretation is outside the hackathon scope even when an inference seems obvious.

## Operational action

A non-clinical workflow step such as requesting a missing document, assigning case-packet review, scheduling an authorised discussion, or recording completion. Operational actions must allow human override and produce an audit event.

## Treatment recommendation

Any suggestion about treatment choice, dose, modification, sequencing, continuation, discontinuation, or suitability for a patient. It is outside scope. Do not use the shorter word “recommendation” without distinguishing treatment recommendations from operational suggestions.

## Record contextualisation

Organising source assertions by patient, time, encounter, institution, document type, and stated care context. This is distinct from clinical contextualisation, which applies medical knowledge to a patient-specific decision and may become prohibited clinical decision support.

## Case discussion

A human-to-human professional exchange about a case packet. The workspace may prepare, route, document, and audit the exchange but must not present the discussion as system-generated clinical advice.

## Human override

The ability of an authorised person to reject, correct, defer, or reverse an automated or AI-assisted operational result before it becomes authoritative or triggers an important action.

## Audit event

An immutable record of an important access, extraction, correction, confirmation, disclosure, or operational action, including actor, time, target, prior state where relevant, resulting state, and reason where required.

## Care team

The authorised clinicians, nurses, coordinators, and other healthcare professionals participating in a person’s care workflow. Membership and permissions are explicit; access is not implied merely by professional status.

## Core problem labels

The supplied research groups pain into five labels:

- **Find:** locate authentic information quickly.
- **Contextualise:** narrow information to a stated context without crossing into patient-specific clinical advice.
- **Synthesise:** reconstruct a coherent, source-linked record from fragmented artifacts.
- **Act:** obtain practical point-of-work information. Most patient-specific examples under this label carry a high clinical-decision-support risk.
- **Connect:** prepare and support human peer discussion and knowledge sharing.
