# Work report — P5 C2 evidence-led patient workflow

## Problem

The evidence-led review found that Patients opened one scripted case directly, had no searchable workspace index or controlled synthetic creation, dispersed source provenance across one overloaded mobile canvas, paired an NSCLC/Stage IV/PD-L1 60% fixture with an unrelated HER2-positive gastric trial, and represented only four criterion excerpts without making partial-review completeness sufficiently prominent. The experience resembled unsafe matching and could cause a participant to mistake a partial demonstration for a complete review.

## Decision

Make Patients a reusable synthetic-workspace system: a searchable, sortable, owner-filtered index; several coherent fixtures; and controlled creation using predefined synthetic contexts only, with no free-text identity or upload field. Keep each workspace sectioned into Overview, Sources, Reviews, Tasks, and Handoffs. Badge every fact with its authority type and exact synthetic source label. Let a clinician manually select a trial from the unchanged, unranked general library. Use `NCT06345729` for the coherent NSCLC/Stage IV/PD-L1 demonstration and keep KRAS G12C explicitly unknown. Segment every retained registry criterion bullet, default the rest to Not reviewed, name reviewer/date/evidence for every recorded state, and create missing-information work only after an explicit human action.

## Evidence

- Workspace index — Patients opened three named synthetic workspaces with synthetic IDs, context, owner, review count, search, owner filter, and Recent activity / Workspace label / Owner sort controls.
- Controlled creation — activating Create synthetic workspace exposed four predefined oncology contexts and two demonstration owners. The creation surface contained zero text inputs, textareas, identity fields, upload controls, names, MRNs, dates of birth, or contact fields. Submitting produced `SYN-DEMO-004 · Synthetic Saffron workspace` in browser memory with a `Manual synthetic entry` source badge and reset-on-reload boundary.
- Several coherent fixtures — Synthetic Cedar is NSCLC/Stage IV/PD-L1 60% with KRAS G12C explicitly unknown; Synthetic Lotus is a breast-cancer source-collation fixture; Synthetic Monsoon is a colorectal missing-record fixture. The latter two have no system-selected trial.
- Sectioned workspace — `SYN-2047` exposed focused Overview, Sources, Reviews, Tasks, and Handoffs destinations instead of one long composite canvas. Overview and Sources showed all four facts with Clinician confirmed or Synthetic document badges plus exact source labels.
- Manual trial selection — `reviewFor=SYN-2047` added an explicit manual-selection banner without changing Trial Library ordering. Filtering to `NCT06345729`, previewing it, and selecting Start human review opened the dedicated review and recorded only that explicit selection.
- Correct pairing — `NCT06345729` is a real retained registry record for advanced/metastatic NSCLC with PD-L1 ≥50%. The workspace states NSCLC, Stage IV, and PD-L1 60%; KRAS G12C remains unknown source-retrieval work and is never inferred.
- Complete review source — the parser removed the registry preamble and segmented all 23 retained bullet criteria into Inclusion and Exclusion excerpts. The first excerpt is the NSCLC diagnosis criterion; criterion 3 is the tissue/KRAS/PD-L1 source criterion.
- Completeness — the review prominently stated `3 of 23 retained registry criteria reviewed`, `20 remain Not reviewed`, and `Incomplete review`. The first three states were Confirmed from source, Confirmed from source, and Needs clarification; every other state defaulted to Not reviewed.
- Authority and evidence — every recorded criterion state displayed its human reviewer, date, and named synthetic evidence. Unsaved changes are labelled; non-default states require a selected source or explicit `No source available in current synthetic workspace` evidence.
- Human-created work — navigating to `?criterion=criterion-3` focused the exact criterion. Activating Create missing-information task reused `TASK-SYN-2047-criterion-3`; broad unknown site states produced no task and no duplicate was created.
- Responsive evidence — Patient list, workspace overview, source section, and exact criterion review each reported `scrollWidth === innerWidth === 390` at 390×844; every visible leaf text node measured at least 13px.
- Browser health — controlled creation and exact-criterion task interaction produced zero console warnings, console errors, or page errors.
- Build — `npm run build` passed strict TypeScript validation and Vite output: 40 modules transformed; application JavaScript 383.98 kB before gzip and 116.20 kB after gzip.

## Risks and gaps

**OPEN:** these are deliberately scripted synthetic fixtures, not proof that real intake, ownership, source models, or criterion review fit oncology work. Controlled creation tests the information architecture only and intentionally cannot model real identifiers, documents, consent, authorization, retention, deletion, or EMR provenance. Registry criteria segmentation preserves text but has not received clinical terminology review. A clinician still needs to determine whether the 23 excerpts represent a useful review sequence. No patient-specific search, matching, ranking, aggregate score, eligibility conclusion, or recommendation exists.

## Next

Merge this slice, update `main`, and implement the role/attention slice: role-specific Home activity, a minimal attention Inbox containing only unread/owned/accepted work, no automatic unverified-site tasks, exact return positions, and simulated-handoff language that cannot be mistaken for transmission or persistence.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the autonomous implementation-merge decision. Owner sign-off remains required for real patient data, intake/upload, EMR integration, identity/authorization, retention, cohort functionality, matching/ranking, clinical interpretation, external handoff, direct participant recruitment/contact, Phase 6 evidence interpretation, `P5` closure, and product lock.
