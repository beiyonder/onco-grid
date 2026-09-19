# Work report — P5

## Problem

Candidate B was selected from desk research, but it still combined pre-board case readiness, decision documentation, communication, and follow-through. Public evidence had not established which step is actually missing, who owns it, or whether NCG/iECHO already provides it.

## Decision

Narrow Candidate B to one hypothesis: the handoff from an existing clinician-authored tumour-board decision to authorised treating-unit acknowledgement and non-clinical operational disposition. Defer pre-board case readiness because public NCG and iECHO artifacts already cover a standard presentation template, presenter assignment, content review, privacy review, approve/reject states, correction notifications, re-upload, and controlled sharing. Do not lock a product: the actual local post-board owner, system, burden, and baseline remain unverified.

## Evidence

- Direct review of the current [NCG Virtual Tumor Board page](https://www.ncgindia.org/key-initiatives/virtual-tumor-board) found a host-and-centre model, deadline-based submission, recurring sessions, videoconferencing, and a downloadable case template, but no public post-meeting handoff description (`EV-0036`).
- Direct extraction of the public [blank NCG VTB presentation template](https://www.ncgindia.org/assets/ncg-key-initiatives/virtual-tumor-board/vtb-template.pptx) found six slides ending with questions for the board; no visible final-decision, recipient, owner, due-date, acknowledgement, or completion fields (`EV-0037`).
- Browser review of current [iECHO participant guidance](https://help.iecho.org/submitcase) found invitation-based session upload, programme-team review, approval/rejection, a rejection reason, notification, and re-upload (`EV-0038`).
- Browser review of current [iECHO hub guidance](https://help.iecho.org/How-to-add-a-Case-presenter-cf2d6d13daea4599ade15de0f630dff6) found organisation-team presenter assignment, `Under Review` status, PII/PHI checking, approve/reject, notification, correction, and sharing of approved content (`EV-0039`).
- Direct review of the 2022 NCG VTB programme account found an ECHO-appointed coordinator, NCG expert and disease-management-group review, invited presentation, and a reported move to iECHO for scheduling and programme metrics (`EV-0040`).
- Direct review of the NCG/KCDO MDT v2 requirements confirmed Part B final-decision fields and Part C later review of whether the first decision was followed (`EV-0014`).
- The 2026 NCRP survey remains the direct Indian burden signal: 63.5% physical documentation, 16.8% EMR-note communication, 48.2% no follow-up system, and a designated secretariat at 52.5% of reported boards (`EV-0019`).
- Transfer evidence from a formal NHS regional guideline assigns an MDT coordinator responsibility for minutes, distribution, action plans, reviews, milestones, and escalation, but cannot establish the Indian role (`EV-0041`).
- `research/P5_TUMOUR_BOARD_VALIDATION.md` records the integrated workflow, actor map, selected handoff, safe output, KPI, falsifiers, and minimum remaining evidence.
- `python3 research/validate_ledger.py` after adding `EV-0036`–`EV-0041` → `PASS: 41 records valid; 41 retained; IDs and contradiction references consistent`.

## Risks and gaps

- The current NCG page describes email and Zoom while a 2022 NCG account says VTB moved to iECHO; exact current configuration is unverified.
- Public omission is not proof that an internal post-board workflow is absent.
- NCG already specifies final-decision and subsequent-review fields, so the gap may be adoption or staffing rather than software.
- The public sources identify pre-board programme roles but do not name the post-board accountable role.
- The survey's “follow-up system” may concern treatment/outcome monitoring rather than the narrower acknowledgement and operational-disposition handoff.
- No local denominator, timing, person-minute burden, duplicate-entry count, or baseline has been found.
- `GAP-TUMOUR-BOARD-LOCAL-WORKFLOW` remains open; product lock would be an unsupported inference.

## Next

Request one process-only walkthrough from a designated secretariat member, HBCR principal investigator, nodal tumour-board operations person, programme administrator, or registry staff member. Ask for the blank decision/minutes/follow-up artifact and aggregate counts only. Determine the signed decision location, authorised recipient, acknowledgement method, operational owner/status, duplication, and local meaning of follow-up. If no actor or material gap is established, return to Candidate A instead of building from absence of public documentation.

## Sign-off needed

No owner decision is required to continue non-sensitive P5 validation. Owner sign-off remains required before product lock, architecture, dependencies, privacy/security changes, use of any sensitive data, or merge of the public pull request.
