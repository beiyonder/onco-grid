# Work report — P5

## Problem

Public P5 research narrowed Candidate B to a possible handoff after a clinician-authored tumour-board decision, but still lacked a current Indian operational owner, local system, acknowledgement path, person-time burden, and aggregate baseline. Building from the absence of public documentation would be an unsupported product decision.

## Decision

Extended public research only far enough to test the actor and existing-solution hypotheses, then prepared a process-only operator validation kit. Retained a draft NABH oncology HIS/EMR standard and one Eastern India single-centre audit as new evidence. The candidate remains in `P5`; no product lock, outreach, patient-data collection, or architecture work occurred.

## Evidence

- `EV-0042`: the public draft NABH oncology HIS/EMR annexure already expects patient selection, board IDs, scheduling, notifications, a central case list, integrated review, attendance, and documentation of multidisciplinary recommendations and follow-ups. It does not specify acknowledgement, non-clinical action ownership, due dates, or intermediate status; it is a draft requirement, not implementation evidence.
- `EV-0043`: a 12-month Eastern India audit recorded 800 tumour-board discussions, including 227 repeat discussions. The hospital used preformed Excel case lists, entered the board decision after each meeting, and used a patient care coordinator to collect later treatment/follow-up data and complete a master chart.
- The same audit reports more than 20% missing or unknown data in several measures, but no treating-unit acknowledgement rate, coordinator person-time, or product-effect estimate.
- `research/P5_OPERATOR_VALIDATION_KIT.md` now contains a participant screen, unsent outreach draft, consent/privacy opening, 20-minute process walkthrough, blank-artifact request, aggregate baseline worksheet, process map, scope classifier, success criteria, falsifiers, and debrief template.
- `research/P5_TUMOUR_BOARD_VALIDATION.md`, `INDIAN_WORKFLOW_MAPS.md`, `THEME_BRIEFS.md`, `SOLUTION_LANDSCAPE.md`, `CONTRADICTIONS.md`, `OPPORTUNITY_MATRIX.md`, and `RESEARCH_SYNTHESIS.md` now incorporate the new evidence and explicit transfer limits.
- `python3 research/validate_ledger.py` → `PASS: 43 records valid; 43 retained; IDs and contradiction references consistent`.

## Risks and gaps

- The patient care coordinator is evidenced for one private hospital's 2020–2021 audit workflow, not established as the current or general Indian owner.
- The Eastern India source does not say who entered the decision or whether the treating unit acknowledged it.
- The NABH annexure is a public draft and does not prove implementation.
- A coordinator plus spreadsheet may already solve the job adequately; missing data may arise from patient access, staffing, or governance rather than software.
- The meaning of “follow-up system” remains ambiguous between operational disposition and later clinical-outcome collection.
- No outreach has been sent. External communication requires approval of the exact recipient, channel, and message.
- `GAP-TUMOUR-BOARD-LOCAL-WORKFLOW` remains open; product architecture is still blocked.

## Next

Use the operator kit with one current tumour-board secretariat member, patient care coordinator, nodal operator, programme administrator, registry investigator/operator, records officer, or quality officer. Request only a process walkthrough, aggregate counts, and an institution-approved blank field list or template. Select one broken step only if evidence shows material burden without duplicate documentation; otherwise return to Candidate A.

## Sign-off needed

The repository owner must approve the exact external outreach target and message before it is sent, and later approve or reject the P5 problem contract. Separate approval remains required for product architecture, dependencies, privacy/security changes, and merge of the public pull request.
