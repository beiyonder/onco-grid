# Work report — P5 C2 typed routed foundation

## Problem

The owner-supplied evidence-led review found that the accepted browser-native validation surface had become a 4,433-line frontend with duplicated global state and render logic, no stable destinations, poor testability, widespread 7–11px text, and composite pages that made the core trial and patient workflows hard to scan. Those observed constraints met the implementation plan's typed-component-stack trigger. Retaining the same architecture would make the review's structural changes slower, riskier, and harder to verify.

## Decision

Replace the browser-native global-render implementation with a static React 19, TypeScript 7, React Router 7, and Vite 8 surface. Use hash routes so every destination remains stable on static hosting. Keep the dated 285-record ClinicalTrials.gov JSON as the repository authority and emit it as a separate build asset; keep all patient and workflow state synthetic and browser-memory only. Preserve Home, Trials, Patients, and Inbox as the only global destinations, source/site authority separation, no ranking or eligibility conclusion, and the existing privacy and clinical prohibitions. Add TypeScript to Serena indexing. Do not add a backend, identity, persistence, external messaging, or new data source.

## Evidence

- Artifact — `web/index.html` is now a minimal application entry; typed source lives in `web/src/` with explicit registry, synthetic-patient, work-item, review, room-message, correction, and simulated-handoff models. Obsolete `web/app.js` and `web/styles.css` were removed.
- Routing — stable hash destinations exist for Home, Trial Library, Trial Detail, Trial Room, Patient Workspaces, sectioned Patient Workspace, Patient–Trial Review, and Inbox. Nested routes retain their global parent state and route changes restore focus to the page heading.
- Source loading — the dated `web/data/india-oncology-trials.json` remains unchanged and is emitted as a separate 1,958.93 kB build asset rather than embedded in application JavaScript. The application exposes loading, schema/error, and retry states.
- Build — `npm run build` completed strict TypeScript validation and a Vite production build: 40 modules transformed; application JavaScript 367.94 kB before gzip and 112.64 kB after gzip; no large-chunk warning.
- Desktop browser — at 1440×1000, Home loaded 285 public records; Trial Library rendered 12 of 285 with explicit page 1 of 24; navigation to `#/trials/NCT06345729` produced a dedicated source-first Trial Detail with registry status `Recruiting`, site status `Not confirmed`, four India sites, and zero page-level horizontal overflow.
- Mobile browser — at 390×844, Home reported `scrollWidth === innerWidth === 390`, the first primary journey began at 350px rather than after the previous approximately 279px persistent chrome plus content header, and the global navigation flattened to a fixed bottom bar. Every visible leaf text node measured at least 13px; none measured below 13px.
- Keyboard and focus — route entry focused the destination `H1`; the next Tab reached the first primary journey and displayed the configured 3px focus outline.
- Browser health — a clean reload followed by Home, Trials, Patients, Inbox, and `NCT06345729` Trial Detail navigation produced zero console warnings, console errors, or page errors.
- Deterministic checks — `python3 research/validate_ledger.py` passed 70 records; `python3 scripts/fetch_india_oncology_trials.py --validate-only` passed 285 records. Serena re-indexed the project with TypeScript enabled.

## Risks and gaps

**OPEN:** this is a governed architecture and readability correction, not oncology-user evidence. React, TypeScript, router, and Vite are new production-build dependencies whose maintenance now belongs to the validation surface. The snapshot is still approximately 1.96 MB before transfer compression and remains fetched client-side. The current slice establishes the final route and state boundaries, but the evidence-led Trial preview, complete Trial Room correction path, synthetic-only creation controls, and final integrated print/reduced-presentation evidence remain in dependent slices. No backend, production identity, authorization, persistence, external message, packet transmission, real patient data, patient ranking, eligibility conclusion, or clinical recommendation exists.

## Next

Merge this foundation through a review pull request, update `main`, and implement the Trial workflow slice: concise and paginated library, normalized display taxonomy with raw provenance, accessible preview, dedicated Trial Detail, chronological Trial Room, and evidence-linked correction work. Stop if any change collapses registry and site authority, uses patient context to rank trials, or turns an unknown into a negative conclusion or automatic task.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the 2026-09-19 autonomous merge decision and the 2026-09-20 end-to-end remediation instruction. Owner sign-off remains required for participant thresholds, recruitment/contact, interpretation of Phase 6 evidence, `P5` closure, product lock, production security/deployment, real data, identity, persistence, integrations, assisted discovery/ranking, and any clinical capability.
