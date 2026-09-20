# Work report — P5 C3 evidence-led Trial Relay integration

## Problem

The owner-supplied review authorised twenty clarity, structural-workflow, and demo-safe changes but explicitly left seven future product hypotheses and five direct-validation/product-lock activities governed. The four implementation slices needed one clean production-build run proving that their routes, state, authority boundaries, responsive behavior, accessibility, source failure, reduced-presentation, print, deterministic checks, and privacy controls composed end to end. Without integrated evidence, independently passing slices could still hide cross-route regressions or silently promote unvalidated scope.

## Decision

Treat pull requests `#21`–`#24` as the implementation chain and close it with one evidence/reconciliation pull request. Run the built static output, not only source modules. Exercise trial-first, Trial Room, patient-first, exact criterion, attention Inbox, and simulated-handoff paths from a clean browser session. Verify source failure/retry, desktop and mobile geometry, keyboard focus, console health, reduced motion, reduced transparency, and opaque source-complete print. Record all twenty authorised items as implemented, every future hypothesis as DEFERRED or BLOCKED, and all direct observation/product-lock work as BLOCKED pending its named owner gate. Keep `P5` current.

## Evidence

- Merge chain — `#21` introduced the typed hash-routed React/TypeScript/Vite foundation; `#22` delivered the evidence-led trial workflow; `#23` delivered synthetic Patient Workspaces and complete criterion review; `#24` delivered role attention and explicitly unsent handoff simulation. Pull request `#25` contains this integrated evidence and reconciliation.
- Strict build — `npm run build && npm run typecheck` passed. Vite transformed 40 modules. Static output contained a 0.60 kB document, separately emitted 1,958.93 kB registry JSON, 36.44 kB CSS, and 386.12 kB application JavaScript before gzip / 116.73 kB after gzip.
- Production source failure — against `vite preview`, blocking the hashed registry asset produced `Registry source unavailable`, zero trial rows, and `Retry source`. Removing the block and activating Retry restored 12 visible rows and `285 matching trials · of 285 retained · snapshot 16 Sept 2026`.
- Clean desktop Home — loaded 285 public records, 16 Sept 2026 source date, two primary journeys, and 4 coordinator attention items.
- Trial-first path — direct filtered preview returned one `NCT06345729` row, `Recruiting` registry state, and `Unknown` site-confirmation state. Full detail retained four India sites, 3,166 characters of exact eligibility text, and separate `Recruiting` / `Not confirmed` authority states.
- Trial Room — exact `ROOM-2` routing and focus passed; the room retained three chronological fixture messages and one authorised-site-response label. An evidence-linked correction created `COR-001` without changing registry or site state.
- Patient-first path — controlled creation produced `SYN-DEMO-004 · Synthetic Saffron workspace` with `Manual synthetic entry` provenance and no identity/upload input. `SYN-2047 × NCT06345729` showed 3 of 23 retained criteria reviewed and 20 Not reviewed; exact `criterion-3` task creation reused `TASK-SYN-2047-criterion-3`.
- Attention/handoff path — Inbox exact-context routing focused `ROOM-2`. The bounded handoff progressed Draft → Ready for simulation → Simulated acknowledgement, continued to say `nothing transmitted`, exposed no further action, and resolved its attention item.
- Desktop health — the integrated dynamic sequence ended with zero page-level horizontal overflow, zero console warnings, zero console errors, and zero page errors.
- Mobile matrix — Home, Trial Library with preview, Trial Detail, Trial Room exact message, Patient list, Patient Sources, Patient–Trial Review exact criterion, and Inbox each reported `scrollWidth === innerWidth === 390` at 390×844. Every route's smallest visible leaf text measured 13px. Preview focused `trial-preview-heading`; Room focused `ROOM-2`; review focused `criterion-3`.
- Keyboard — route navigation restores focus to the destination `H1`; the next Tab reaches the first primary journey with a 3px solid focus outline. Preview, library return, exact message, and exact criterion restoration use explicit focus targets without hover dependency.
- Reduced motion — emulated `prefers-reduced-motion: reduce` matched; transition and animation duration became `0.00001s`, and document scroll behavior became `auto`.
- Reduced transparency — raw CDP emulation matched `prefers-reduced-transparency: reduce`; Trial preview shadow became `none`, sidebar became opaque `rgb(251, 252, 251)`, and preview/library geometry remained exactly 392.859375px / 1105.625px before and after.
- Print — print media hid sidebar and topbar, expanded the closed complete-criteria disclosure to 3,166 characters, retained `NCT06345729` and the source date, rendered primary surfaces as opaque white, and removed box shadows.
- Deterministic checks — research ledger passed 70 records; ClinicalTrials.gov snapshot validator passed 285 records; `git diff --check` passed; Serena memory references passed; Serena indexed 4 Python and 20 TypeScript files and its health check passed; `npm audit --omit=dev` found 0 vulnerabilities.
- Privacy — intended files were enumerated. `chatroom_notes.md`, `Oncologist Pain Points_v2.docx`, and `.private/chatroom.txt` remained ignored. Secret and email-pattern scans found no matches in the implementation, plan, governance, memory, or 2026-09-20 reports.
- Governance — `IMPLEMENTATION_PLAN.md` now maps all twenty implementation items to pull requests `#21`–`#25` and individually records seven future hypotheses plus five direct-validation/product-lock tasks as DEFERRED or BLOCKED with their required gates.

## Risks and gaps

**OPEN:** no qualifying direct oncology-user session exists. The rebuilt surface demonstrates a coherent and safer hypothesis, not frequency, burden, workflow fit, institutional acceptance, buyer, KPI, or product lock. Role identity, site authority, patient workspaces, messages, tasks, corrections, and handoffs remain synthetic browser-memory fixtures. There is no backend, authentication, authorization, persistence, external delivery, EMR integration, real patient data, patient matching/ranking, eligibility conclusion, treatment recommendation, accurate access-planning map, evidence feed, AI assistant, real Trial Room, or secure referral handoff. Display taxonomy and registry-criteria segmentation still require direct clinical comprehension testing.

Seven hypotheses remain governed: transparent unranked assisted discovery; cohort-based library filtering; trial-specific evidence feed; AI Trial Room assistant; real Trial Room communication; secure referral handoff; and Map as an access-planning lens. Five activities remain owner-gated: treating-oncologist sessions, coordinator sessions, trial-side sessions, comparative workflow interview, and product-lock decision.

## Next

Use the frozen Phase 6 protocol with synthetic data only after the repository owner sets a sufficient participant threshold and explicitly authorises each recruitment/contact action. Observe treating-oncologist trial-first, coordinator patient-first, and trial-side authority scenarios; retain only aggregate-safe fields. Stop and rework immediately if any participant infers current site availability, patient eligibility, treatment recommendation, automatic referral release, durable transmission, or a system-authored clinical decision. The owner then decides retain, simplify, remove, or stop per capability.

## Sign-off needed

No separate owner review is required to merge pull request `#25` under the autonomous implementation-merge decision. Owner sign-off remains required for participant threshold, every external recruitment/contact action, interpretation of Phase 6 evidence, `P5` closure, product lock, production architecture/security/deployment, real patient or participant data, identity/authorization, persistence, integrations, accurate geospatial sources, assisted discovery or cohort functionality, AI, real communication/handoff, and any clinical capability.
