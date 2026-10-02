# P5 C5 — Review-to-referral workflow

## Problem and scope

- **OBSERVED:** The owner reported a disconnected referring-oncologist → PI-team workflow and a review page that displayed an empty attention list beside a selected criterion. Disabled review controls did not explain the required role; technical traces dominated the primary task.
- **FACT:** This change stays within the authorised browser-only synthetic demonstration. It does not deliver patient information, add production persistence, qualify eligibility, or close P5. The existing authenticated no-PHI pilot channel remains separate.
- **FACT:** `GAP-SERENA` applies to this session: Serena tools were unavailable; repository governance, core/project memories and preceding acceptance report were read directly. LSP status reported no configured language servers.

## Decision and implementation

- **FACT:** Review now uses a compact two-column desk: criterion checklist, evidence with original-source links, human decision, and Save review & continue. The default filter includes every criterion. Empty filtered lists no longer retain an unrelated inspector. Optional notes and registry/predicate/history detail use disclosure controls.
- **FACT:** A visible progress row carries the next action: Prepare referral, then Open referral conversation. Supported findings may be explicitly selected and acknowledged together; unresolved/conflicting findings retain individual review. Unsaved decisions and messages have navigation guards.
- **FACT:** Replaced the obsolete synthetic packet/advance-packet state and all consumers with version-bound referrals. A complete human review is required before preparation; a shortlist or prior PI disposition is not a prerequisite. Findings and reviews are attached to the referral rather than reconstructed from mutable current inputs.
- **FACT:** The referring side prepares and queues a local packet, responds to requests, attaches a newly reviewed assessment, or withdraws with a reason. The study side acknowledges, assigns Study coordinator / Principal investigator, requests information, records operational screening readiness, or closes with a reason. Messages and state events share one chronological thread and an explicit next-owner cue.
- **FACT:** Patient Referrals, Inbox and My studies link to the same thread. Referral → evidence review → matching retains the patient, selected study and assessment run. On narrow screens, active conversations precede the packet; draft preparation keeps the packet first.
- **FACT:** Authenticated, qualifying staff profiles with an explicit trial grant are required for study-team routes and commands. Choosing the demo PI persona does not confer access. Stale assessments block queueing and screening readiness, not clarification or withdrawal. Replacement assessments must belong to the same patient/study and have a complete current review.
- **FACT:** Main implementation surfaces: `web/src/pages/PatientTrialReviewPage.tsx`, `web/src/pages/ReferralPage.tsx`, `web/src/components/SupportedReview.tsx`, `web/src/domain/model.ts`, `web/src/domain/workflow.ts`, `web/src/state/WorkflowState.tsx`, and the existing route/navigation/queue consumers and stylesheet.

## Observable acceptance evidence

| Scenario | Observed result |
|---|---|
| Open Patient 1 / NCT06348199 review | **OBSERVED:** Six supported criteria populate the checklist; 0 of 6 reviewed; selected evidence and Save review & continue visible without the previous large trace block. Switching from coordinator to oncologist is explained with an actionable role control. |
| Save one criterion; inspect empty attention filter | **OBSERVED:** Progress becomes 1 of 6 and the next unreviewed criterion is selected. Zero-attention view has no inspector and offers Show all criteria. |
| Select supported findings; prepare and queue | **OBSERVED:** Explicit selection completes 6 of 6 reviews. Preparation no longer requires PI disposition. Confirmation plus a message queues the local referral; the study coordinator is next owner. |
| Study-team conversation | **OBSERVED:** Isolated synthetic-auth browser responses exercised acknowledgement, assignment to Principal investigator, information request, referrer reply/return, resumed review and Ready for site screening. The thread retained all events and reasons. This is UI evidence, not genuine authentication/RLS qualification. |
| Unsaved message | **OBSERVED:** Back navigation opened the unsent-message guard; Keep writing preserved the message. |
| Revised reviewed packet | **OBSERVED:** Re-entering review preserved selected study/run on return to matching. A new reference run was reviewed, attached through Updated reviewed assessment, recorded a Packet updated event and was returned to the team. |
| Mobile at 390px | **OBSERVED:** Review and referral document scroll width equalled the 390px viewport. Filters fit within 362.8125px. Active conversation appeared before the packet. |
| Final production bundle | **OBSERVED:** `http://127.0.0.1:4173` ran reference matching → review → explicit bulk acknowledgement → prepare → queue. The queue action produced zero browser network requests and zero browser errors. Opening the study-team route anonymously displayed Study-team access required. |

Synthetic-only retained images:

- [Desktop review](../evidence/20261002-referral/review-desktop.jpg)
- [Mobile review](../evidence/20261002-referral/review-mobile.jpg)
- [Mobile conversation](../evidence/20261002-referral/conversation-mobile.jpg)
- [Study-team thread](../evidence/20261002-referral/team-conversation.jpg)

## Deterministic checks

- **OBSERVED:** Final `cd web && npm run build && npm test && npm audit`: strict frontend/API TypeScript and Vite build passed; **34 tests passed**, zero failed; dependency audit reported **0 vulnerabilities**. Output: `artifact://286` in the implementation session.
- **OBSERVED:** Behavioral regression coverage exercises referral-before-disposition, complete review requirements, immutable packet contents, role-owned transitions, stale release refusal with continuing conversation, closure/withdrawal boundaries, and same-patient/study fresh replacement requirements.
- **OBSERVED:** `python3 research/validate_ledger.py`: **PASS: 79 records valid; 79 retained; IDs and contradiction references consistent**.

## Remaining risk and publication state

- **OPEN:** Referrals remain browser-memory synthetic records and reset on reload. Different browsers/accounts do not share these records. No real cross-user delivery, patient-data storage or verified site contact is claimed.
- **OPEN:** Genuine staff-account/RLS qualification and approved service configuration remain unverified. Real patient-linked communication requires a separately approved patient-data/persistence boundary; the existing no-PHI service is not silently repurposed.
- **OPEN:** Operational screening readiness is not eligibility, a recruiting slot, or clinical qualification. Independent clinical qualification and P5 workflow observation remain open.
- **FACT:** No new production dependency/service, public push, merge, deployment, external contact or patient transmission occurred. The isolated authentication fixture and managed verification tabs are closed after verification; normal development remains available.

## Next acceptance gate

- **OPEN:** Owner/clinician observation of the local synthetic journey, followed by the existing approved-service and data-handling gates before any real multi-user referral implementation or qualification.
