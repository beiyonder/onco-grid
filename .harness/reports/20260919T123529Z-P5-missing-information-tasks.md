# Work report — P5 C2 Missing-information tasks

## Problem

The clinician-led criterion review could identify Needs clarification and name the next action, but it could not create owned work. Missing source retrieval, site method questions, human clarification, and tumour-board routing therefore lacked a named owner, due date, exact criterion/source provenance, Inbox representation, or explicit unable-to-obtain outcome.

## Decision

Deliver Phase 3 slice 3 on `feat/missing-information-tasks`. Show Create missing-information task only for a criterion in Needs clarification. Preserve the exact registry excerpt, clinician-linked EMR source, human review state/reviewer, selected task type, named owner, due date, expected operational outcome, creator, and a mandatory no-guessing confirmation. Normalize each open task into the existing Inbox exactly once. Allow users to return to the exact patient criterion, mark the task complete, or record unable to obtain. Neither closure changes the criterion state or supplies a missing answer; a follow-up task remains available while the clinician still records Needs clarification.

## Evidence

- Creation context — after Dr M. Shah set criterion 2 to Needs clarification, A. Rao opened a task dialog labelled `Synthetic case SYN-2047 · NCT06764875 · criterion 2`. Provenance retained the exact `PD-L1 combined positive score (CPS) ≥ 1.` wording, Molecular report source, and `Needs clarification · Dr M. Shah` state.
- Bounded task form — four task types were available: request missing source record, ask site whether a method is accepted, request human clarification, and route question to tumour board. The form required one named owner, due date, expected operational outcome, and confirmation that it neither guesses clinical information nor leaves the synthetic workspace boundary.
- Owned task creation — `MISS-001` recorded type `Ask site whether a method is accepted`, owner Site steward, due 21 Sept 2026, Molecular report provenance, exact criterion, creator A. Rao, and a note that explicitly prohibited inferring or entering a missing patient result. Criterion state remained Needs clarification.
- Patient and Inbox continuity — the criterion displayed `MISS-001`, owner, due date, and Open in Inbox. Recent work displayed the same task. Inbox Tasks increased from 286 to 287 and rendered one canonical row with context `SYN-2047 · NCT06764875 · criterion 2`, Site steward owner, due date, and Molecular report source authority.
- Inspector boundary — the Inbox inspector stated `Open · answer remains unknown`, named criterion/source/creator, and offered only Mark task complete, Unable to obtain, and Go to full context.
- Context return — Go to full context returned to Patient workspace, focused exact criterion `NCT06764875:1`, and preserved its Needs clarification state and task summary.
- Completion — Mark task complete removed the task from active Inbox Tasks, reduced count to 286, retained criterion Needs clarification, and displayed the task as complete in criterion and Recent work. It did not invent or record a criterion answer.
- Unable path — a fresh task ended `unable to obtain`, left active Tasks, kept criterion Needs clarification, preserved the outcome in the criterion summary, and exposed Create follow-up task.
- Desktop at `1440×1000` — provenance, ownership, and safety confirmation remained visible in a compact modal. Narrow mobile at `390×844` — dialog and page had equal scroll/client widths at 390, provenance flattened to one column, and no page-level overflow occurred.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final clean reload produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

Tasks are browser-memory workflow demonstrations; they do not send a request, retrieve a source, authorize access, or verify an answer. The deterministic Inbox classification is not a persisted task service. A completed task intentionally leaves the criterion unchanged until the treating oncologist records a new human review state. All patient, source, task, role, and trial-review data remain synthetic except the clearly separated public registry trial. Phase 3 is functionally complete for the validation surface; P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then begin Phase 4 slice 1: refine the referral packet around explicit source manifest, purpose, recipient, owner, version, expiry, and human approval before any release.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any actual data retrieval or external request, real patient data, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
