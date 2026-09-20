# Work report — P5 C2 evidence-led attention workflow

## Problem

The evidence-led review observed that Home mostly communicated generic counts, Inbox had become a system-state warehouse with 286 tasks, unknown site verification had been mistaken for accepted work, and downstream handoff controls looked more operationally real than the browser-only prototype. Users could not quickly distinguish role-relevant attention from source uncertainty or tell whether a handoff had actually transmitted anything.

## Decision

Make Home copy and current activity specific to the selected coordinator, oncologist, authorised trial-side, or auditor role. Keep one Inbox, default it to unresolved attention, filter first by role and then by work type/state, and include only unread, owned, or explicitly accepted synthetic items. Unknown registry/site state never creates work by itself. Preserve exact context routes for a message, criterion, trial, workspace task, or handoff. Retain only a minimal handoff state demonstration and label every stage `Not sent · simulated`, `nothing transmitted`, browser-memory only, and reset on reload.

## Evidence

- Role-specific Home — coordinator saw `Keep source work and handoffs moving` with 4 open items; oncologist saw `Review evidence and human responses` with 3; site role saw `Answer within the trial-side authority boundary` with 0 plus an explicit no-accepted-work state; auditor saw `Inspect provenance and human ownership` with 1.
- Attention source — Home activity is derived from work items whose role list includes the selected role and whose state is not resolved. It no longer presents generic patient or source counts as work.
- Bounded Inbox — the clean demonstration contains exactly five deliberate starting work items across every role, not one task per 285 trial records or unknown site. Coordinator Inbox defaulted to 4 accepted attention items and explicitly stated `five deliberate starting items—not 285 site gaps`; `286` did not appear.
- Queue model — Inbox defaults to Needs attention and provides type plus attention/resolved/all-state controls. Rows retain kind, status, stable ID, source, owner, timestamp, exact context, and explicit resolution. No configuration side rail or notification-rule builder competes with queue work.
- Exact return — switching to Dr M. Shah and opening `MSG-NCT06345729-2` navigated to `#/trials/NCT06345729/room?message=ROOM-2`; focus landed on `ROOM-2` and its authorised source-response text.
- Human-created patient work — `TASK-SYN-2047-criterion-3` returns to the exact criterion. Broad site non-confirmation remains a source state and creates no Inbox row.
- Simulated handoff wording — the workspace states: `Nothing is sent from this prototype`, `They do not contact a site, transmit records, or persist after reload`, `Not sent · simulated`, and `nothing transmitted`.
- Simulated state path — explicit human actions advanced `HANDOFF-SYN-2047` from Draft → Ready for simulation → Simulated acknowledgement. No action remained after simulated acknowledgement, and its coordinator Inbox item moved to resolved rather than implying an external acknowledgement.
- Responsive evidence — role Home, Inbox, and simulated handoff each reported `scrollWidth === innerWidth === 390` at 390×844; every visible leaf text node measured at least 13px.
- Browser health — role switching, both simulated handoff transitions, and the resulting Inbox update produced zero console warnings, console errors, or page errors.
- Build — `npm run build` passed strict TypeScript validation and Vite output: 40 modules transformed; application JavaScript 386.12 kB before gzip and 116.73 kB after gzip.

## Risks and gaps

**OPEN:** the role switch is synthetic and provides no authentication, authorization, institution boundary, or verified identity. Five fixtures demonstrate semantics, not realistic workload volume, prioritization, due-date pressure, or signal-to-noise. The simulated handoff does not send, persist, schedule, acknowledge, retry, audit, or encrypt anything, and must not be treated as evidence that a site or institution would accept the workflow. Direct sessions still need to determine whether a global Inbox is preferable to contextual queues and whether Trial Relay duplicates existing email, phone, WhatsApp, coordinator sheets, or site portals.

## Next

Merge this slice, update `main`, then run the final integrated evidence pass across the complete review-remediated journey: build/typecheck, desktop/mobile, keyboard/focus, source failure, reduced motion/transparency, opaque source-complete print, console, research ledger, trial snapshot, privacy scans, plan/governance reconciliation, and explicit deferral of all seven future hypotheses plus five direct-validation/product-lock tasks.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the autonomous implementation-merge decision. Owner sign-off remains required for real identity/authorization, persistence, notification channels, scheduler, external handoff, site participation, security/privacy posture, production deployment, direct participant recruitment/contact, Phase 6 evidence interpretation, `P5` closure, product lock, and any clinical capability.
