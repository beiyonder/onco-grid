# Work report — P5 C2 Trial Relay source split

## Problem

The accepted Home slice left `web/index.html` at 2,265 lines with 1,004 lines of inline CSS and 746 lines of inline JavaScript. That single-file boundary made independent review and subsequent trial, Inbox, patient, and handoff work unnecessarily collision-prone. The owner also needed the repository to record autonomous implementation-PR merge authority and the conditional authority to adopt a more sustainable frontend stack when evidence makes that necessary.

## Decision

Fast-forward local `main` to merged pull request `#2` at `78c70f9`. Complete Phase 0 with a behavior-preserving static source split: keep the browser-native zero-dependency runtime, move CSS to `web/styles.css`, move JavaScript to `web/app.js`, and retain the HTML document in `web/index.html`. Do not introduce a framework or build step because the source split resolves the immediate maintainability and edit-boundary problem without dependency or migration cost. Reassess a typed component stack only when a named slice demonstrates state, routing, testability, or component-reuse limits that native modules cannot address cleanly.

## Evidence

- Pull request `#2` is merged; local `main` fast-forwarded from `cfee4f7` to `78c70f9` before branching `refactor/split-web-source`.
- `web/index.html`, `web/styles.css`, and `web/app.js` — document, style, and behavior now have stable independent file boundaries while preserving the existing relative snapshot path and no-build serve path.
- Mechanical equivalence check — reinserting the extracted stylesheet and script into the split document reproduced the accepted 2,265-line monolith byte-for-byte.
- Browser smoke at `1440×1000` — `styles.css` and `app.js` loaded as external assets; Home loaded 285 records; Home → Trials reached Trial library with `285 trials · showing first 60`; no horizontal overflow (`scrollWidth = clientWidth = 1440`).
- Browser smoke at `390×844` — Home retained a one-column journey layout with no horizontal overflow (`scrollWidth = clientWidth = 390`).
- Reload and interaction smoke — zero console warnings, console errors, or page errors.
- `python3 research/validate_ledger.py` — `PASS: 70 records valid; 70 retained; IDs and contradiction references consistent`.
- `python3 scripts/fetch_india_oncology_trials.py --validate-only` — `PASS: 285 normalized India oncology trials valid`.
- `serena project health-check .` — passed and activated the repository; `serena memories check .` reported no referential-integrity issues.
- `git diff --check` — passed.
- Privacy check — `chatroom_notes.md`, `Oncologist Pain Points_v2.docx`, and `.private/` remain ignored; secret-pattern and email-pattern scans over the intended changed files returned no matches.

## Risks and gaps

The application remains a browser-native prototype with shared global state in one JavaScript file; the split creates safe boundaries but does not yet create domain modules or automated browser tests. A framework migration now would add cost without solving a demonstrated user-facing constraint, but later workflows may trigger the documented reassessment. P5 validation, persona ownership, buyer, local burden, operational KPI, and product lock remain open. No backend, authentication, persistence, data source, trial data, patient data, matching logic, clinical capability, or deployment behavior changes in this slice.

## Next

Merge this source-split pull request under the owner's autonomous-merge authority after the published checks pass. Then branch from updated `main` and implement the Phase 1 Trial library as the next user-observable slice: precise list hierarchy, compact filters, persistent result count and snapshot date, List/Map placeholder, explicit source/status traces, and stable loading, empty, and error states.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any backend, data-source, production identity/persistence, deployment-topology, privacy/security-boundary, or clinical-capability change.
