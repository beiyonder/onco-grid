# Trial Relay implementation plan

## Status and authority

- **OWNER DECISION — 2026-09-19:** begin implementation from [`product/TRIAL_RELAY_EXPERIENCE_BLUEPRINT.md`](product/TRIAL_RELAY_EXPERIENCE_BLUEPRINT.md) and [`product/TRIAL_RELAY_VISUAL_DESIGN_LANGUAGE.md`](product/TRIAL_RELAY_VISUAL_DESIGN_LANGUAGE.md).
- **OWNER DECISION — 2026-09-19:** the agent may push and merge implementation pull requests without separate owner review after the required evidence, privacy, and safety checks pass; direct pushes to `main` remain prohibited.
- **OWNER DECISION — 2026-09-19:** the implementation may leave the monolithic HTML architecture and adopt a more sustainable frontend stack when a named slice demonstrates a material maintainability or delivery need. This is conditional frontend authority, not approval for a backend, new data source, production identity or persistence boundary, deployment-topology change, or clinical capability.
- **FACT:** the current runnable surface is the dependency-free static validation app in `web/`; it loads the dated ClinicalTrials.gov snapshot in `web/data/india-oncology-trials.json`.
- **DECISION:** evolve that surface in small, reversible, user-observable slices before selecting a production runtime, backend, identity provider, database, or deployment topology.
- **INFERENCE:** the blueprints are the target experience for implementation, not evidence that the workflow or product value has been validated.
- **OPEN:** `P5` validation, persona ownership, buyer, local burden, and the operational KPI remain unresolved. Implementation does not close those gates.

## Current frontend architecture decision

- **FACT:** the accepted Home slice left `web/index.html` at 2,265 lines, including 1,004 lines of CSS and 746 lines of JavaScript.
- **DECISION:** complete Phase 0 by separating the document, stylesheet, and application script into `web/index.html`, `web/styles.css`, and `web/app.js`. Keep the existing browser-native runtime and zero-dependency local serve path for now.
- **RATIONALE:** stable file boundaries remove the immediate edit-collision and review problem without introducing a build system, framework lifecycle, dependency maintenance, or migration risk before those costs solve a demonstrated user-facing need.
- **REASSESSMENT TRIGGER:** adopt a component framework and typed build only when a named slice demonstrates repeated component/state duplication, routing or testability limits, or delivery friction that browser-native modules cannot address cleanly.

## Product boundary

The implementation may support general trial discovery, source and status comparison, human-authored questions, owned operational tasks, synthetic patient workspaces, explicit human review, and closed-loop referral tracking.

It must not:

- ingest identifiable patient or participant data;
- infer patient facts from records;
- match or rank trials for a patient;
- determine eligibility;
- recommend treatment;
- replace the EMR, registry, tumour board, treating clinician, or trial team as the authoritative source;
- add CTRI or WHO ICTRP product ingestion without approved access and reuse terms;
- imply that registry recruitment status proves that an India site can enrol today.

Real registry trial data and synthetic patient, EMR, board, referral, and workflow examples must remain visibly distinct.

## Delivery principles

1. **One coherent job per pull request.** A review should demonstrate one complete user-observable outcome, not a collection of unrelated components.
2. **One active UI pull request while `web/index.html` remains monolithic.** This prevents overlapping edits and unclear ownership. Parallel UI work begins only after a reviewed source split creates stable file boundaries.
3. **No speculative platform work.** Add a backend, authentication system, persistence layer, deployment change, or data source only with a named requirement and separate owner authority. Frontend structure, tooling, and dependencies may change under the owner's conditional authorisation when a review slice records the maintainability or delivery need and preserves the privacy, security, and no-build-or-equivalent local-run boundary.
4. **Context before controls.** Each detailed view has one dominant trial, patient, thread, or handoff. Supporting operations remain attached to that entity.
5. **Authority is visible.** Important state always names its source or human authority and date. Unknown and conflicting states remain explicit.
6. **No hidden clinical logic.** Patient context never changes the trial list ordering or creates an overall eligibility score.
7. **Accessible reading order first.** Spatial overlap, motion, and translucency enhance a conventional DOM order; they never replace it.
8. **Evidence-gated continuation.** Failed usability or safety evidence causes simplification or rework before another dependent slice starts.

## Pull-request cadence

- Target **one merge candidate every one to two working days** during active implementation; this is a review-size guardrail, not a delivery quota.
- Keep **one non-draft implementation PR open at a time** while changes share the monolithic static app.
- Branch each slice from updated `main`; never push directly to `main`.
- Use a focused `feat/...` branch, a concise outcome-based PR title, and a body containing scope, non-goals, screenshots or observed states, verification, privacy checks, and remaining risk.
- Prefer one to three meaningful commits during review and squash feature PRs at merge. Preserve separate commits only when they are independently useful review checkpoints.
- If a slice cannot be reviewed in about 30 minutes or crosses more than one primary user job, split it before review.
- Merge only after the observable acceptance scenario passes on desktop and mobile, keyboard focus remains usable, the browser console is clean, deterministic repository checks pass, and the intended file set/privacy boundary is reviewed.
- Do not stack a dependent PR on an unmerged UI PR. Independent research or documentation may proceed separately when it does not touch the same files or change the current product contract.

## Required checks for every implementation PR

1. Enumerate the intended changed files.
2. Confirm ignored sensitive inputs remain ignored and untracked.
3. Run `python3 research/validate_ledger.py`.
4. Run `python3 scripts/fetch_india_oncology_trials.py --validate-only` when trial data or its presentation contract changes.
5. Serve and exercise the actual `web/` surface.
6. Verify the changed journey at one desktop viewport and one narrow mobile viewport.
7. Verify keyboard navigation, visible focus, no page-level horizontal overflow, and reduced-motion behavior for changed interactions.
8. Observe the browser console for errors and warnings.
9. Record the exact scenario, observed result, remaining risk, and evidence report when the slice forms a governance checkpoint.

## Phased delivery

### Phase 0 — structural shell and delivery controls

**Goal:** make the two starting journeys and four-destination information architecture immediately visible without changing clinical or data behavior.

Planned review slices:

1. **Home and primary navigation** — add Home; reduce global navigation to Home, Trials, Patients, and Inbox; provide the two dominant entry actions and a contextual recent-work rail; keep existing operational tools reachable from relevant context.
2. **Static source split** — after the shell is accepted, extract stable CSS and JavaScript from `web/index.html` without behavior changes. Preserve a no-build local run path.

Acceptance:

- a first-time user can identify the two starting journeys within five seconds;
- only Home, Trials, Patients, and Inbox appear in global navigation;
- no existing validation workflow becomes unreachable;
- the real-registry/synthetic-workflow boundary remains visible;
- desktop and mobile reading order remain coherent.

### Phase 1 — trial-first workspace

**Goal:** complete the general trial discovery and source-verification story before expanding patient workflow.

Planned review slices:

1. **Trial library** — precise result list, compact filters, persistent result count and snapshot date, List/Map control placeholder, semantic source traces, and stable empty/loading/error states.
2. **Trial profile** — one dominant trial entity with registry source plane, India sites, separate registry and site-confirmed status, source/date provenance, and explicit unknown/conflict states.
3. **Follow and question** — follow a trial, open its Trial room, post a general operational question, and resolve the thread into an answer, task, correction, or unresolved state.

Acceptance:

- the user can distinguish registry status, site-confirmed status, and unknown state without relying on colour;
- selecting and closing a trial profile preserves search position and focus;
- no patient context affects result ranking;
- source links and snapshot dates remain available at the point of use.

### Phase 2 — unified Inbox and operational ownership

**Goal:** consolidate updates, messages, and assigned work without creating a dashboard of disconnected metrics.

Planned review slices:

1. **Inbox stream** — one flowing list grouped by Updates, Messages, and Tasks; each row names source, owner, and due state.
2. **Contextual resolution** — open an item in place, return focus to its origin, and move to the attached trial, thread, verification, or referral.
3. **Notification rules** — configure factual operational alerts with named recipients, delivery channel, repeat control, and stop condition.

Acceptance:

- users can identify who owns the next action and why the item exists;
- alert styling never implies clinical recommendation or eligibility;
- the same work item is not duplicated across global queues.

### Phase 3 — patient-first workspace

**Goal:** support a clinician-led, source-linked review using synthetic patient data only.

Planned review slices:

1. **Patient workspace** — synthetic identity header, original EMR source references, recent work, and clear authority boundaries.
2. **Manual trial selection and criterion review** — the clinician chooses a trial, records a per-criterion human state, links evidence, and records unknowns without an aggregate score.
3. **Missing-information tasks** — assign source retrieval or clarification work to a named person with due state and provenance.

Acceptance:

- every patient and record is visibly synthetic;
- the app does not infer facts, rank trials, or state eligibility;
- the sequence remains `Criterion → Source record → Human review state → Next action` on narrow screens.

### Phase 4 — referral, tumour-board, and trial-team handoff

**Goal:** preserve ownership and acknowledgement from human review through formal trial-team screening.

Planned review slices:

1. **Referral packet** — explicit source manifest, purpose, recipient, owner, version, expiry, and human approval before release.
2. **Referral lifecycle** — Draft → Approved → Sent → Acknowledged → Screening → Closed, including unable-to-contact and correction paths.
3. **Tumour-board context** — route a bounded packet, record only a signed human decision reference, assign the next operational step, and preserve audit history.
4. **Trial-team outcome** — record the authorised trial-team screening result neutrally and return the next task to the treating team.

Acceptance:

- no packet releases autonomously;
- every transition has an actor, timestamp, source, and permissible next state;
- a missing response remains unresolved and never becomes a negative clinical conclusion.

### Phase 5 — geographic and spatial refinement

**Goal:** add the blueprint’s spatial language only after the information architecture and authority model are stable.

Planned review slices:

1. **List/Map continuity** — an accurate India view over the same trial dataset; approximate locations labelled as approximate; selection persists across views.
2. **Context lenses and relationship paths** — anchored trial, source, thread, and handoff surfaces with restrained depth and no decorative connectors.
3. **Responsive and reduced-presentation modes** — mobile flattening, reduced motion, reduced transparency, opaque print output, and preserved source/date labels.

Acceptance:

- the map does not imply travel feasibility, site availability, or fabricated coordinate precision;
- every connector represents a real relationship;
- the workflow remains complete without animation, translucency, or desktop positioning.

### Phase 6 — validation and product-lock evidence

**Goal:** determine whether the implemented journey deserves continued investment.

Observe oncology users attempting the smallest end-to-end scenario without instruction. Record only de-identified aggregate evidence for:

- time to find a plausible trial;
- fields trusted, distrusted, or missing;
- ability to distinguish registry and site-confirmed status;
- source-link use;
- ability to identify the next owner and unresolved state;
- value of follow, Trial room, Inbox, and referral acknowledgement;
- steps that duplicate existing hospital or coordinator work.

The owner decides whether to retain, simplify, supplement, or stop each major capability. No implementation artifact alone closes `P5` or establishes product lock.

## Current slice

**Branch:** `feat/trial-library`

**Pull request outcome:** deliver Phase 1 slice 1 — a source-first Trial library with precise result hierarchy, compact labelled filters, persistent result and snapshot context, an explicit List/Map roadmap control, separate registry and site-confirmation traces, stable loading/empty/error states, and keyboard focus preserved when selecting a result.

**Acceptance scenario:** load the 285-record ClinicalTrials.gov snapshot; identify the source date and separate registry/site states; search `Mumbai`; clear to restore all records; select a result by keyboard without losing focus; observe deterministic loading, empty, and source-failure recovery states; retain zero horizontal overflow on desktop and narrow mobile.

**Explicit non-goals for this slice:** no working map, trial-profile restructuring, Trial room, persistence, authentication, backend, new data source, patient-context filter, patient-specific ranking, matching logic, or deployment change.
