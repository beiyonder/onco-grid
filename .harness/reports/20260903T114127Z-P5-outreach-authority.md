# Work report — P5

## Problem

The P5 public-evidence slice identified several Indian tumour-board and post-MDT workflow patterns but did not establish one current target-site owner, generic treating-unit acknowledgement path, staff burden, or baseline. The owner requested completion of the full todo list, so every remaining non-contact research path was exhausted before external outreach.

## Decision

Retain Candidate B only as a validation hypothesis. Add the recent Chennai post-MDT quality-improvement workflow as direct India evidence and treat it primarily as a contradiction: ownership can sit with downstream clinical teams, and role clarity, an SOP, education, and one shared paper artifact may solve a handoff without new software. Use the official current NCG VTB support/inquiry route as the first outreach route, but do not send until the owner confirms the exact recipient, email channel, and final message at the point of external side effect.

## Evidence

- `EV-0044` records the 2023–2025 Cancer Institute (WIA), Chennai NCG EQuIP-India project: eligible cases were identified during MDT meetings; treating oncologists initiated/referral; the palliative-care team completed/documented the workflow; a combined colour-coded form and SOP replaced unreliable verbal handoff; target-cohort documentation moved from 0% to 92% (24 of 26).
- The complete source is [Initiating and Documenting Goals of Care Discussion in Patients with Advanced Pancreatic and Colorectal Cancers](https://pmc.ncbi.nlm.nih.gov/articles/PMC12670709/), published 2025-11-04 and followed through March 2025.
- The source explicitly reports separate-building and telephone-reachability problems, repeated resident education, a paper-chart form and patient-handbook marker, and an unimplemented future EMR version.
- The evidence is not a generic board-handoff study. Eligibility, prognosis, discussion, and downstream care are clinical and outside the product boundary. No author contact detail or clinical form content was retained.
- The current [NCG Virtual Tumor Board page](https://www.ncgindia.org/key-initiatives/virtual-tumor-board) publishes a current support/inquiry route and lists recurring host-centre sessions. The repository stores the page link, not personal contact details.
- `research/P5_OPERATOR_VALIDATION_KIT.md` now names that official route and contains the unsent message, consent boundary, process questions, blank-artifact request, aggregate baseline worksheet, scope classifier, success conditions, and falsifiers.
- `python3 research/validate_ledger.py` → `PASS: 44 records valid; 44 retained; IDs and contradiction references consistent`.

## Risks and gaps

- The recent Chennai workflow concerns goals of care and palliative-care referral; its clinical content must not become product scope.
- Its measured documentation result does not establish a generic tumour-board decision-acknowledgement problem.
- No public source establishes one universal board operator; Indian examples vary among patient care coordinator, treating team, downstream service, secretariat, and nodal/programme roles.
- A process, staffing, training, or shared-form intervention may be sufficient and cheaper than software.
- The current NCG support contact may route inquiries but may not own the post-board workflow.
- Sending outreach is an external communication and requires owner confirmation of the exact recipient, channel, and message. No outreach was sent.

## Next

After point-of-risk confirmation, send the approved process-only message to the current NCG VTB support contact published on the official page and ask for routing to the person who handles post-session records or operations. Request only role/process descriptions, aggregate counts, and an approved blank artifact. If no current non-clinical actor and measurable gap is established, reject Candidate B or return to Candidate A; do not infer a product from missing public documentation.

## Sign-off needed

Owner confirmation is required immediately before sending the prepared message to the exact current NCG VTB support recipient by email. Product lock, architecture, dependencies, clinical/privacy boundary changes, and PR merge remain separately owner-controlled.
