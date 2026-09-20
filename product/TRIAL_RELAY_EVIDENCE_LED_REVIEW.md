# Onco Grid Trial Relay — evidence-led product review

## Review basis

Reviewed:

- `PROJECT_GOVERNANCE.md`
- `IMPLEMENTATION_PLAN.md`
- `product/TRIAL_RELAY_EXPERIENCE_BLUEPRINT.md`
- `product/TRIAL_RELAY_VISUAL_DESIGN_LANGUAGE.md`
- `.harness/reports/20260919T143549Z-P5-implementation-readiness.md`
- current product at `1440 × 1000`
- current product at `390 × 844`
- Home, Trials/List/Map, trial profile, Trial Room, Patients, criterion review, missing-information tasks, referral lifecycle, Inbox, relationship view, responsive, focus, reduced-motion, and print behavior

No repository files were changed.

Labels:

- **FACT** — established by repository authority or deterministic project evidence.
- **OBSERVED** — directly seen while exercising the current interface.
- **INFERENCE** — design or product conclusion drawn from evidence.
- **OPEN** — requires direct user, operational, governance, or technical validation.
- **CONTRADICTION** — current elements conflict with each other or with the stated product boundary.

---

# 1. Executive verdict

## Overall direction

**Recommendation: retain the Trial Relay direction, but do not retain the current screen composition.**

The strongest product idea is not a trial database, patient-matching engine, social network, or referral-management platform in isolation. It is the connected, human-owned workflow:

> Find a trial → inspect source and site uncertainty → clarify questions → conduct a clinician-led review → assign missing work → hand off with explicit ownership → receive acknowledgement or an authorized outcome.

That connected model is worth validating.

The current application proves that these concepts can coexist safely in one interface. It does **not** yet prove that users need all of them, understand them without coaching, or want them combined at the current level of detail.

## Strongest parts to protect

1. **The language and four-destination information architecture**
   - Home
   - Trials / Trial Library
   - Patients / Patient Workspaces
   - Inbox
   - Trial Rooms as contextual collaboration rather than another global module

2. **Registry status and independently confirmed site status remain visibly separate.**
   This is the most resolved and defensible product behavior.

3. **Human authority is explicit.**
   Criteria, packets, referrals, board references, site responses, and outcomes name actors and do not masquerade as autonomous conclusions.

4. **Criterion-by-criterion human review avoids an aggregate eligibility score.**

5. **Unknowns can become owned work rather than false conclusions.**

6. **Provenance is treated as part of the workflow, not buried in legal copy.**

7. **The browser-native demo has meaningful responsive and presentation safeguards.**
   No page-level horizontal overflow was observed at `390px`; visible focus, reduced-motion behavior, and print fallbacks exist.

## Most serious problems

1. **The experience is structurally overloaded.**
   The product frequently presents source material, entity summary, status, relationships, controls, audit context, tabs, and next actions at equal visual weight.

2. **Text is materially too small.**
   This is not merely subjective: widespread labels and supporting text render around `7–11px`. On the Patient view, 175 of 186 inspected leaf text nodes were below `12px`.

3. **Trials do not have a proper detail destination.**
   A long trial list and a dense embedded profile compete in one view. The user never fully transitions from “scan results” to “understand this trial.”

4. **Patients is not yet a patient-workspace system.**
   It opens one prepopulated case directly. There is no patient list, search, sorting, ownership view, cohort selection, manual synthetic creation, or source-oriented intake.

5. **Trial Room does not behave like a familiar conversation space.**
   It reads as a collection of cards, fields, and operational controls inside the trial profile.

6. **Inbox has become a system-state warehouse.**
   It showed 286 tasks because broad absence of independent verification was converted into work. A state being unknown does not mean someone has accepted a task to resolve it.

7. **Referral and outcome machinery is more resolved than the core discovery and review experience.**
   It is rigorous, but likely overbuilt before user demand and workflow fit have been established.

8. **A serious synthetic-content contradiction undermines trust.**
   The observed synthetic patient is presented with NSCLC, Stage IV, and PD-L1 TPS 60%, while the default clinician-selected trial concerns HER2-positive gastric cancer. Even with disclaimers, this pairing resembles broken or unexplained matching logic.

## Highest-risk assumptions

- **OPEN:** treating oncologists are the frequent primary users rather than occasional decision-makers supported by coordinators.
- **OPEN:** Trial Rooms improve clarification rather than duplicating email, phone, WhatsApp, or site-specific portals.
- **OPEN:** users want referral lifecycle management inside the same product.
- **OPEN:** a global Inbox is preferable to contextual work queues.
- **OPEN:** the Map supports a real operational decision with approximate site locations.
- **OPEN:** patient-to-trial review can be made useful without crossing into regulated clinical decision support.
- **OPEN:** trial-specific evidence adds value without expanding into an undifferentiated knowledge product.
- **OPEN:** participating sites and institutions would accept the required identity, authorization, consent, retention, and moderation model.

## Single most important next move

**Restructure the validation prototype around three coherent objects before further feature expansion:**

1. **Trial Library → dedicated Trial Detail**
2. **Patient List → Patient Workspace → Patient–Trial Review**
3. **Trial Detail → recognizable Trial Room**

Then run role-specific, synthetic-data Phase 6 sessions. Stop and rework immediately if users infer site availability, eligibility, treatment recommendation, automatic referral release, or system-authored clinical decisions.

---

# 2. Keep / Improve / Redesign / Remove / Defer

| Capability | Classification | Rationale |
|---|---|---|
| Home | **Improve** | Keep the two starting journeys and four-nav shell. Replace generic counts and launcher cards with user-specific operational activity. |
| Trial Library | **Redesign** | Correct destination, but rows expose too much information and raw taxonomy. Make it a scan-and-compare surface with persistent state. |
| Trial preview | **Redesign** | A preview is useful, but the current profile is too complete to function as one. Limit it to summary, status, sites, provenance, and primary actions. |
| Full trial page | **Redesign / create as distinct route** | Complete trial understanding needs its own page with stable URL, hierarchy, evidence, room, tasks, and activity. |
| Trial Room | **Redesign** | Preserve roles, source links, official-response distinction, and unresolved work. Replace card/form composition with a chronological channel. |
| Patient list | **Redesign / create** | It is the missing entry point for any credible Patient Workspaces system. |
| Patient Workspace | **Redesign** | Preserve synthetic boundary and provenance; move trial review, referral, and board details into contextual subviews rather than one long canvas. |
| Criterion review | **Improve substantially** | Strong safety model. Needs complete criteria, clearer reviewer/date/source visibility, better sequence, and a dedicated patient–trial review context. |
| Missing-information tasks | **Keep and improve** | One of the clearest non-clinical outputs. Tasks must arise from an explicit human action—not automatically from every unknown state. |
| Referral packet and lifecycle | **Defer broad investment; retain bounded prototype** | Safe and rigorous, but downstream of unvalidated discovery/review value. Keep enough to test owner, approval, acknowledgement, and correction. |
| Inbox | **Redesign** | Retain one operational queue, source context, owner, and return position. Remove system-wide unknowns masquerading as assigned tasks and secondary configuration clutter. |
| Map | **Defer as secondary lens** | Safe disclaimers are strong; approximate clusters and 106 unplaced sites limit operational utility. Do not make it a primary discovery mode yet. |
| Relationship view | **Remove as persistent primary surface; keep contextual authority view** | It teaches authority well but duplicates navigation and uses extremely small labels. Use a compact source/authority panel where needed. |
| Trial-specific knowledge and evidence | **Constrained future capability** | Potentially supports review and contradiction resolution. Keep trial-bound and source-led; do not expand into generic oncology news or social content. |
| Notification-rule builder | **Defer / simplify** | Premature without identity, delivery channels, persistence, scheduling, and proven notification demand. |
| Tumour-board workflow | **Defer broadening** | Preserve a signed human reference and next operational action. Do not build a tumour-board platform. |
| Trial-team outcome | **Keep as a bounded handoff state** | It closes the loop safely when explicitly recorded by an authorized trial-side role. Avoid richer clinical interpretation. |
| Cohort review | **Explore, not implement as matching** | Useful if it means selecting several patient workspaces and applying explicit search filters. High safety risk if it becomes hidden patient ranking. |
| Assisted trial discovery | **Future governed hypothesis** | May support recall, but only with transparent inputs, source traces, no eligibility conclusion, and separate clinical-governance approval. |

---

# 3. Evidence-backed findings matrix

| Area | Label | Evidence | User impact | Severity | Recommendation | Confidence | Validation required |
|---|---|---|---|---|---|---|---|
| Governance | **FACT** | `P5` remains `CURRENT`; Phase 6 has no qualifying user-session evidence. | Product value and workflow fit remain unproven. | Critical | Treat all redesign proposals as validation hypotheses. | High | Direct role-specific sessions and owner decision |
| Data boundary | **FACT** | 285 dated India-located ClinicalTrials.gov records; patient, EMR, message, site, packet, board, role, task, and outcome data are synthetic. | Users may otherwise overestimate currency or operational reality. | Critical | Keep source date and synthetic labels at point of use. | High | Comprehension testing |
| Runtime | **FACT** | Browser-memory only; no backend, identity, authorization, persistence, EMR integration, external messaging, or matching engine. | Current interactions can look more operationally real than they are. | High | Label demo actions and avoid wording that implies transmission or durable assignment. | High | Observe participants’ mental model |
| Global IA | **OBSERVED** | Home, Trials, Patients, and Inbox are the only global destinations. | Clearer orientation than a module-heavy dashboard. | Positive | Protect this structure. | High | Five-second navigation test |
| Home | **OBSERVED** | Two clear starting journeys, but much of the remaining content is generic counts and links. | Product value is not evident from current activity. | Medium | Show active rooms, updates, unresolved owned work, handoffs, and followed trials. | High | Determine which activity matters by role |
| Typography | **OBSERVED** | Widespread `7–11px` roles; 175/186 inspected Patient leaf text nodes below `12px`. | Requires zoom, slows scanning, and weakens provenance. | Critical | Redefine type roles and remove content before increasing text size. | High | Test at default browser zoom |
| Density | **OBSERVED** | Many nested cards, labels, chips, metadata blocks, relationship diagrams, and parallel controls. | Users cannot distinguish action from explanation. | High | One dominant entity and one contextual region per view. | High | Time-to-locate tests |
| Trial Library | **OBSERVED** | Rows expose status, metadata, location, source context, actions, and long text; 60 of 285 records are displayed. | Comparison becomes slow; users may not understand why records are absent. | High | Use concise rows, explicit pagination/result limit, preview, and full detail route. | High | Trial-finding task |
| Trial taxonomy | **OBSERVED** | Raw conditions and state names include duplicate or misspelled values. | Reduces credibility and filter quality. | High | Normalize display taxonomy while preserving raw source value in provenance. | High | Clinical terminology review |
| Trial selection | **OBSERVED** | Full profile appears beside a list whose document height reached roughly 14,302px. | The selected trial lacks a stable conceptual destination; list context dominates. | High | Preview beside list; full trial on dedicated route; preserve return state. | High | Back-navigation and comparison task |
| Status authority | **OBSERVED** | Registry recruitment and independent site-verification state are clearly separated and repeatedly labelled. | Reduces false assumption that registry status means enrolment is available. | Positive / Critical safeguard | Preserve wording and source/date adjacency. | High | Unprompted comprehension test |
| Full profile | **OBSERVED** | Summary, dual status, relationships, seven actions, tabs, criteria, and provenance compete. | Important next action is visually subordinate. | High | Re-sequence as overview, India sites, criteria, evidence, activity, room. | High | First-action observation |
| Trial Room | **OBSERVED** | Composer, cards, forms, pinned/context sidebar; not a familiar chronological conversation. | Participation and unresolved-question tracking require learning. | High | Use channel timeline, message composer, replies, official-response styling, tickets, and pinned context. | High | Ask-and-resolve scenario |
| Trial Room authority | **OBSERVED** | Sender role and official-response authority are explicitly represented. | Strong foundation for safe collaboration. | Positive | Preserve verified identity and authority labels at message level. | High | Role-confusion test |
| Patient entry | **OBSERVED** | Patients opens directly into `SYN-2047`; no list/search/create/cohort step. | Product feels like a scripted case, not a reusable workspace system. | Critical | Add a patient-workspace list as the Patients landing page. | High | Locate/open/create synthetic workspace |
| Patient naming | **OBSERVED** | Technical identifier is the dominant patient label. | Hard to scan and recall; emphasizes system artifact over workspace. | Medium | Use memorable synthetic labels plus persistent “Synthetic demo data”; retain ID secondarily. | High | Name recognition test |
| Patient source model | **OBSERVED** | Source references and synthetic status exist but are dispersed across a long page. | Users may miss which facts are manual, uploaded, or future EMR-derived. | High | Add source badges per fact/section and a compact source manifest. | High | Source-identification task |
| Synthetic pairing | **CONTRADICTION** | NSCLC/Stage IV/PD-L1 60% synthetic patient is paired by default with a HER2-positive gastric trial. | Appears like unsafe or broken matching; undermines trust in the entire review workflow. | Critical | Replace with a deliberately coherent synthetic pairing or explicitly frame as an intentional “reject this trial” scenario. | High | Clinical content review before sessions |
| Criterion review | **OBSERVED** | Exact excerpts, source links, human states, next actions, and no aggregate score. | Safe and potentially useful decision-recording model. | Positive | Retain criterion-level structure. | High | Test whether it fits actual review practice |
| Criterion completeness | **OBSERVED** | Only four excerpts are represented; reviewer/date/evidence are not consistently prominent in the scan path. | Users could mistake a partial demonstration for a complete review. | Critical | Show completeness state, complete criteria source, reviewer/date/evidence beside every state, and “not reviewed” by default. | High | Participant identifies incomplete review |
| Match language | **OPEN** | Owner permits exploring “strong match” indication, but governance prohibits ranking/recommendation and current evidence does not validate it. | A “strength” signal can function as an eligibility recommendation even without a score. | Critical | Do not use strong/weak match language in the next validation prototype. Test filtered recall separately. | High | Clinical-governance decision |
| Missing tasks | **OBSERVED** | Dialog captures owner, due date, and provenance. | Converts uncertainty into accountable non-clinical work. | Positive | Keep; add task scope, completion evidence, and explicit human creator. | High | Coordinator workflow fit |
| Inbox | **OBSERVED** | Rows provide source, owner, due state, and contextual inspection. | Useful basis for operational ownership. | Positive | Preserve these row-level semantics and return position. | High | Inbox resolution task |
| Inbox volume | **OBSERVED** | 286 tasks appeared because broad site-unverified states became work. | Real work is buried in system-generated noise. | Critical | Unknown state remains a state until a human creates or accepts a task. | High | Signal-to-noise evaluation |
| Inbox side rail | **OBSERVED** | Configuration and guidance compete with queue work. | Reduces space and prioritization. | Medium | Move rules/settings out of the main queue; use contextual help sparingly. | High | Queue completion test |
| Map | **OBSERVED** | 64 approximate clusters; 106 unplaced sites across 60 trials; limitations disclosed. | Visual volume exceeds precision and may invite access/travel inference. | High | Keep as optional geographic overview; default to list. | High | Test whether it changes a real decision |
| Relationship view | **OBSERVED** | Clearly distinguishes sources and authorities, but labels can be around `7px`. | Conceptually useful; practically hard to read and redundant. | Medium | Replace with compact, accessible source-and-authority panel. | High | Authority comprehension |
| Referral lifecycle | **OBSERVED** | Versioning, manifest, approval, acknowledgement, correction, and role boundaries are rigorous. | Demonstrates safe workflow control but adds substantial complexity. | Medium / High product risk | Retain only the smallest closed-loop handoff for Phase 6. | High | Test current-workflow duplication |
| Home activity | **INFERENCE** | Existing objects already produce followed trials, room messages, registry updates, tasks, and referrals. | Showing them could communicate value better than generic counts. | Medium | Build a role-filtered activity feed after core restructuring. | Medium | Determine preferred activity by role |
| Mobile layout | **OBSERVED** | No horizontal overflow at `390px`, but persistent chrome consumes about 279px before main content; Patient page is roughly 4,698px tall. | Main work starts late and requires excessive scrolling. | High | Collapse orientation material, use sticky compact context, and move subflows to separate views. | High | Mobile task completion |
| Accessibility | **OBSERVED** | Visible focus, reduced-motion, reduced-transparency, and print fallbacks exist. Hover is not required for current access. | Good implementation foundation. | Positive | Preserve and add semantic page landmarks, focus restoration, and non-hover previews. | High | Keyboard and screen-reader testing |
| Product breadth | **INFERENCE** | Trial discovery, room, Inbox, patient review, referral, board, map, relationships, alerts, and outcomes all coexist before direct validation. | Broad feature surface obscures the smallest differentiated job. | High | Validate discovery → clarification → human review → owned handoff; defer adjacent systems. | High | Keep/simplify/remove evidence per capability |

---

# 4. Current-state flow assessment

## Flow 1: Home → Trial Library → preview/profile → Trial Room → Inbox

### Entry point and goal

- Entry: Home, “Find or follow a trial”
- Goal: find an India-located oncology trial, inspect authority and provenance, ask an operational question, and retain the resulting work

### Current experience

1. Home presents two clear journeys.
2. Trials opens a dense result list.
3. Selecting a trial opens a large profile beside the list.
4. The profile contains summary, registry status, site-verification status, sources, actions, relationships, criteria, and tabs.
5. Trial Room is another tab in the profile.
6. A question can be created and found in Inbox.

### What succeeds

- **OBSERVED:** entry point is clear.
- **OBSERVED:** source date and registry provenance are visible.
- **OBSERVED:** registry status and independent site status are distinguishable.
- **OBSERVED:** a question remains unresolved rather than becoming a false negative.
- **OBSERVED:** contextual Inbox items identify their source.

### Where it breaks

- The library is not optimized for rapid comparison.
- The “preview” contains too much to be a preview.
- The full profile lacks a dedicated navigational state.
- Trial Room feels like an operational form rather than a conversation.
- The transition into Inbox loses some sense of the discussion timeline.
- Returning to the trial works mechanically, but the conceptual location remains ambiguous because everything lives inside the same composite view.

### Target flow

`Home activity or Trials → scan concise rows → select accessible preview → Open full trial → inspect status/sites/source → enter Trial Room → ask or convert to ticket → Inbox receives only owned/unread work → resolve → return to exact room message or task`

---

## Flow 2: Home → Patient list → workspace → trial → criterion review → task

### Current experience

There is no patient list. Patients opens one synthetic workspace directly. Trial selection and criterion review are contained in the same long view.

### What succeeds

- Synthetic status is disclosed.
- Criterion excerpts are source-linked.
- Human state and next action exist.
- Missing information can become an owned task.
- No aggregate eligibility score is produced.

### Where it breaks

- No list, search, sorting, filtering, ownership, recent activity, or creation.
- Technical ID is the main identity.
- Source type is not consistently visible per patient fact.
- The default patient/trial pairing is clinically incoherent.
- Review completeness is unclear.
- The page is extremely long on mobile.
- Trial review, source manifest, tasks, referrals, and board workflow compete in one space.

### Target flow

`Patients → searchable workspace list → open synthetic workspace → choose “Find trials to review” → select a trial manually from the general library → dedicated Patient–Trial Review → criterion states → missing item becomes task → return to review with task state`

For multiple patients:

`Patient list → select explicit cohort → apply transparent, non-clinical library filters → show unranked trials and which filter inputs were used → clinician opens individual patient–trial reviews`

No cohort eligibility conclusion, aggregate match score, or “best trial.”

---

## Flow 3: Patient workspace → packet → approval → handoff → acknowledgement → trial-team outcome → treating-team review

### Current experience

The product supports a detailed lifecycle with source manifest, versioning, approval, send state, acknowledgement, screening, outcome, treating-team review, and closure.

### What succeeds

- Approval is human and version-bound.
- Packet correction invalidates approval.
- Outcomes must be recorded by an authorized role.
- A missing response remains unresolved.
- Treating-team review precedes closure.
- Audit concepts are strong.

### Where it breaks

- The depth of lifecycle control exceeds current proof that the workflow belongs in Trial Relay.
- “Send” and external handoff can feel real despite no external messaging, identity, persistence, or authorization.
- Packet composition is reached from an already overloaded patient screen.
- The workflow risks duplicating hospital documents, email, coordinators, and site systems.
- The user value before the handoff is not yet resolved enough to justify this depth.

### Target flow for the next prototype

`Patient–Trial Review → Prepare handoff summary → inspect source manifest → name owner/recipient/purpose → explicit clinician approval → mark as ready for external handoff`

Represent subsequent states as a bounded lifecycle demonstration:

`Approved → handed off externally → acknowledged / unresolved → authorized trial-team disposition → treating-team review`

Do not imply actual transmission until secure delivery exists.

---

## Flow 4: Inbox item → source context → resolution → return

### Current experience

Inbox rows can expose source, owner, due state, and contextual detail. Focus and return behavior were implemented.

### What succeeds

- Source context is generally available.
- Owner and due state are visible.
- Inline inspection can avoid unnecessary navigation.
- Exact return behavior is a strong interaction pattern.

### Where it breaks

- 286 tasks destroys prioritization.
- Unknown site state is conflated with accepted work.
- Messages, updates, and tasks need stronger behavioral distinction.
- Configuration and explanatory content consume queue space.
- Resolution often opens another dense composite surface.

### Target flow

`Inbox → My work / Messages / Updates → open item in drawer → see why it exists, source, owner, due state, and exact entity → resolve or navigate → return to same filtered position`

Defaults should show:

- explicitly assigned tasks;
- unread or mentioned messages;
- official responses;
- followed-trial changes;
- overdue acknowledgements.

Unknown system states belong in the related trial unless a user creates a task.

---

## Flow 5: Trial page → evidence → discussion → task or correction

### Current experience

Source material, discussion, relationships, and actions exist, but are fragmented across profile sections and tabs.

### Problems

- “Evidence” is not yet a coherent trial-bound library.
- Source hierarchy is visually mixed with operational actions.
- Discussion does not anchor replies or corrections naturally to evidence items.
- The relationship view can explain authority, but it is too visually compressed.

### Target flow

`Trial Detail → Evidence & updates → open source item → discuss or flag contradiction → create linked question/correction/task → status reflected on source item and in Room`

Each evidence item should expose:

- title;
- source/publisher;
- publication date;
- evidence type;
- relationship to this trial;
- retrieved/observed date;
- correction or contradiction status.

---

## Flow 6: Mobile trial-first and patient-first journeys

### Current experience

- No page-level horizontal overflow was observed at `390 × 844`.
- Focus remains visible.
- Main content begins after about 279px of persistent chrome.
- The Patient page reaches roughly 4,698px.
- Dense side-by-side desktop concepts become long serial stacks.

### Impact

The responsive implementation technically fits, but it does not yet create a strong mobile workflow. Mobile users must traverse too much context before acting and cannot maintain orientation across long composite pages.

### Target mobile model

- Compact top bar with route, current entity, and one primary action.
- Bottom or overflow navigation for four global destinations.
- Library rows as single-column summaries.
- Preview becomes a bottom sheet or intermediate page.
- Full detail remains a dedicated route.
- Patient workspace uses section navigation, not one continuous document.
- Criterion review is one criterion per focused block.
- Trial Room becomes the most conventional mobile surface: message timeline plus composer.
- Context panels become drawers, sheets, or separate pages—not nested cards.

---

# 5. Target information architecture

## Global navigation

1. **Home**
2. **Trials**
3. **Patients**
4. **Inbox**

Account, preferences, notification settings, integrations, and administrative controls remain outside primary navigation.

## Proposed hierarchy

```text
Home
├─ My work
├─ Active Trial Rooms
├─ Recently updated followed trials
├─ Unresolved questions
└─ Recent patients and handoffs

Trials
├─ Trial Library
│  ├─ Filters and saved views
│  ├─ List
│  ├─ Optional Map
│  └─ Accessible preview
└─ Trial Detail
   ├─ Overview
   ├─ India sites
   ├─ Eligibility criteria
   ├─ Evidence & updates
   ├─ Trial Room
   ├─ Tasks
   └─ Activity / provenance

Patients
├─ Patient Workspace List
│  ├─ Search, filter, sort
│  ├─ My patients / team patients
│  ├─ Cohort selection
│  └─ Create synthetic demo workspace
└─ Patient Workspace
   ├─ Overview
   ├─ Sources and missing information
   ├─ Trial reviews
   │  └─ Patient–Trial Review
   │     ├─ Criterion review
   │     ├─ Evidence links
   │     ├─ Missing-information tasks
   │     └─ Review history
   ├─ Tasks and handoffs
   └─ Activity
      └─ Referral / handoff detail, when present

Inbox
├─ My work
├─ Messages
├─ Updates
└─ Resolved
```

## Page responsibility

### Home

Shows personally relevant activity and next work. It does not reproduce the Trial Library, Patients list, or Inbox.

### Trial Library

Supports scanning, filtering, comparing, and selecting. It does not show complete criteria, full provenance history, relationship diagrams, or every action.

### Trial preview

Answers:

- What is this trial?
- Where in India is it listed?
- What does the registry say?
- Has any site status been independently confirmed?
- When was the source captured?
- Should I open, follow, or ask a general question?

### Trial Detail

Owns complete registry information, sites, exact criteria, trial-bound evidence, provenance, activity, room, and tasks.

### Trial Room

Owns conversation and question resolution. It references trial facts but does not duplicate the full trial page.

### Patient list

Owns discovery and management of workspaces, treating team, current owner, active reviews, recent work, and missing-information burden.

### Patient Workspace

Owns one synthetic patient context, sources, incomplete facts, reviews, and handoffs. It does not show the entire trial profile inline.

### Patient–Trial Review

Owns criterion-level human recording for exactly one patient and one trial. This is where review authority and completeness must be clearest.

### Inbox

Owns attention management—not all system state.

### Trial-specific evidence

Lives under Trial Detail. Discussion can link to it. It does not become another global content product.

---

# 6. Page-level redesign recommendations

## Home

### Primary user and job

Treating oncologist or coordinator answering: “What requires my attention, and what changed since I last worked?”

### Dominant entity

The signed-in user’s current work, not Trial Relay itself.

### Above the fold

- concise greeting and role;
- `Resume work` item;
- 3–5 owned or unread items;
- active Trial Rooms;
- recently updated followed trials;
- persistent dataset/synthetic boundary.

### Actions

- Primary: resume highest-priority owned item.
- Secondary: find a trial; open patient workspace.
- Tertiary: view all Inbox items.

### Progressive disclosure

Show activity summary first. Exact source and history open in a contextual panel.

### States

- Empty: “No assigned work” plus the two starting journeys.
- Loading: stable row skeletons.
- Error: retain last known content only if clearly dated; otherwise explicit unavailable state.
- Mobile: one chronological activity stream.
- Focus: predictable activity-row order.
- Hover: supplemental only.

### Do not show

- decorative performance metrics;
- popularity;
- ambiguous “hot trials”;
- counts without user relevance;
- activity interpreted as clinical importance.

### Alternatives

| Option | Benefit | Cost/risk |
|---|---|---|
| A. Launcher home | Simplest; low build cost | Fails to communicate continuing value |
| B. Role-specific activity home | Connects product to daily work | Requires reliable identity and ownership data |
| C. Trial-news home | Visually engaging | Dilutes workflow and risks implying importance |

**Recommendation:** B, using synthetic role state in the demo.  
**Decision-changing assumption:** if users visit only for occasional trial lookup, choose A and treat Home as a lightweight start page.

---

## Trial Library

### Primary user and job

Oncologist or coordinator scanning and comparing trials without implying patient suitability.

### Dominant entity

The result set.

### List row

Show only:

- title;
- `NCT` identifier;
- phase;
- recruitment status labelled as registry-declared;
- cancer/disease terms;
- India city/site count;
- sponsor;
- source snapshot date or “updated since followed” marker;
- independent site-status summary: confirmed / unresolved / not checked.

### Preview panel

Show:

- concise plain-language summary;
- study design;
- key inclusion/exclusion headings—not full criteria;
- India locations;
- registry/source/date;
- site-confirmation state;
- actions: Open full trial, Follow, Open Trial Room.

### Full detail

Complete registry fields, all sites, complete criteria, evidence, room, tasks, activity, corrections, and provenance.

### Secondary expandable sections

- raw registry taxonomy;
- complete sponsor/collaborator details;
- full update history;
- technical source payload/reference;
- historical site assertions.

### States

- Empty: explain which filters produced zero results.
- Loading: retain filter layout and result count region.
- Error: source/date and retry; never silently replace real data with synthetic records.
- Disabled: explain unavailable map or site confirmation.
- Mobile: rows → intermediate preview page → full detail.
- Keyboard: selection, preview, open, and back restore exact focus and scroll.
- Hover: optional preview trigger only; focus/click/touch equivalents mandatory.

### What not to show in every row

- full summaries;
- complete criteria;
- source paragraphs;
- relationship graphs;
- all actions;
- every metadata field;
- unnormalized raw taxonomies as primary labels.

### Alternatives

| Option | Benefit | Cost/risk |
|---|---|---|
| A. Dense table | Fast expert comparison | Poor mobile behavior; long clinical titles make columns unstable |
| B. Structured list + preview | Balances scanning and context | Requires disciplined field selection |
| C. Card grid | Visually approachable | Wastes space and weakens comparison |

**Recommendation:** B.  
**Decision-changing assumption:** if validation shows coordinators compare fixed numeric fields across many trials, add an optional table view rather than replacing the list.

---

## Full Trial Detail

### Primary user and job

Understand one trial’s registry record, India-site uncertainty, evidence, and active coordination.

### Dominant entity

One trial.

### Above the fold

- title and identifier;
- registry-declared status;
- independent site-verification summary beside—but never merged with—it;
- phase, condition, sponsor, study type;
- India location summary;
- source and snapshot date;
- primary action: Follow or Open Trial Room;
- secondary action: add to a patient review.

### Progressive disclosure

1. Overview
2. India sites
3. Exact eligibility criteria
4. Evidence and updates
5. Room and unresolved questions
6. Tasks/activity
7. Full provenance and raw registry details

### States

- Missing sites: explicit no India site information in source.
- Conflicting status: both assertions visible with dates.
- Stale registry record: visible age indicator.
- Mobile: section navigation and sticky concise trial header.
- Print: source/date, status distinctions, and criteria remain legible; interactive controls removed.

### Do not show

- relationship diagrams by default;
- seven equal-priority actions;
- “match” language;
- activity counts implying trial importance;
- site availability conclusions from registry status.

---

## Trial Room

### Primary user and job

Authorized clinicians, coordinators, and trial-side contributors clarify general operational or protocol questions and record resulting work.

### Dominant entity

Chronological conversation for one trial, optionally scoped to a site.

### Above the fold

- room name and trial;
- room scope: general trial or specific site;
- participant roles and authority;
- registry/status context;
- unresolved-question count;
- latest messages.

### Conversation model

Message types:

1. General discussion
2. Verified official site response
3. Source citation
4. Question
5. Ticket/task
6. Decision or correction
7. System event, such as status updated

Official site responses need:

- verified sender;
- authorized role;
- represented site;
- timestamp;
- scope;
- explicit “official site response” treatment.

An unanswered question remains unanswered.

### Roles

**Recommended initial institutional room:**

- treating clinicians;
- treating-team coordinators;
- authorized trial-site coordinators;
- principal investigator or delegated trial-side authority;
- read-only auditor where required.

Patients and caregivers should **not** join the same room model by default. They need separate:

- consent;
- identity proofing;
- moderation;
- information-release rules;
- patient-accessible language;
- complaint/escalation handling;
- retention policy.

Researchers without an operational role should use a separate evidence-discussion model.

### AI assistant boundary

Permitted future functions:

- summarize a chosen date range;
- list unanswered general questions;
- retrieve and cite registry or approved evidence;
- draft non-clinical action items;
- organize outcomes;
- highlight direct source contradictions.

Required presentation:

- generated summary label;
- citations;
- source dates;
- editable draft;
- never an official response;
- never silently posted;
- unresolved statements remain unresolved.

Prohibited:

- patient-data interpretation;
- eligibility conclusion;
- treatment/trial recommendation;
- inference from silence;
- impersonation;
- auto-resolution of tickets;
- synthesis presented as site authority.

### States

- Empty: who may ask what; sample safe prompt.
- Loading: timeline placeholders.
- Failure: unsent draft retained locally and visibly marked.
- Inactive: history readable; composer disabled with reason.
- Unauthorized: no message content leakage.
- Mobile: conventional message timeline and fixed composer.
- Focus: messages, reply controls, source links, and composer in logical order.

### Alternatives

| Option | Benefit | Cost/risk |
|---|---|---|
| A. One room per trial | Simple discovery | Site-specific authority can become ambiguous |
| B. Trial room with site-scoped threads | Shared context plus bounded authority | Requires strong thread and role labels |
| C. Separate room per site | Clear authority | Fragmented discussion and duplicate questions |

**Recommendation:** B.  
**Decision-changing assumption:** if site coordinators cannot safely see cross-site discussion, use C for official exchanges while keeping a read-only general trial discussion.

---

## Patient list

### Primary user and job

Treating clinician or coordinator finds a workspace and understands ownership and current work.

### Dominant entity

The list of authorized patient workspaces.

### Row content

- memorable synthetic demo name;
- persistent `Synthetic demo data` badge;
- technical identifier secondarily;
- treating team;
- current owner;
- active trial reviews;
- missing-information count;
- most recent work;
- next owned action.

Demo names can use clearly fictional character-style labels, but should avoid using a real person’s full identity. The badge must remain visible in list, workspace header, dialogs, and exports.

### Actions

- Open workspace
- Create synthetic workspace
- Assign or change owner
- Select several workspaces for an explicit treating cohort
- Archive demo workspace

### Search/filter/sort

- search synthetic name or ID;
- filter by owner/team;
- active review state;
- unresolved tasks;
- recent activity;
- sort by last activity, next due task, or synthetic name.

### Manual creation for the demo

Synthetic-only flow:

1. choose fictional label;
2. add non-identifying synthetic demographics;
3. select treating team/owner;
4. enter synthetic structured facts;
5. attach synthetic source references or generated demo documents;
6. confirm “synthetic demo workspace.”

No real file ingestion.

### States

- Empty: explain synthetic-only creation.
- Unauthorized: no record-count leakage.
- Loading: list skeleton.
- Error: no stale ownership state presented as current.
- Mobile: search, compact filters, one row per workspace.

### Do not show

- opaque ID as dominant identity;
- diagnoses or biomarker details in the list unless validated as necessary;
- inferred trial suitability;
- real upload language.

---

## Patient Workspace

### Primary user and job

Treating team reviews known synthetic information, provenance, gaps, trial-review work, and handoffs for one patient.

### Dominant entity

One synthetic patient workspace.

### Above the fold

- fictional demo label and synthetic badge;
- technical ID;
- treating team and current owner;
- concise synthetic clinical context;
- source completeness summary;
- active trial reviews;
- next action.

### Information organization

- **Overview:** concise patient context.
- **Sources:** manual, synthetic upload, or future EMR source labels.
- **Missing information:** unresolved facts, not inferred values.
- **Trial reviews:** cards linking to dedicated reviews.
- **Tasks and handoffs:** operational work.
- **Activity:** human actions and source changes.

### Source labels

Each displayed fact should support:

- source type;
- source artifact/reference;
- recorded/imported by;
- date;
- verification state;
- correction history.

### States

- No trials under review
- Missing source
- Conflicting sources
- Unverified manual value
- No owner
- Archived workspace
- Mobile section navigation
- Disabled real upload with explanation that the validation demo accepts synthetic data only

### Do not show

- all criteria;
- full trial profiles;
- packet builder;
- board controls;
- outcome workflow;
- every audit event above the fold.

---

## Patient–Trial Review / Criterion review

### Primary user and job

Treating clinician records a review of exact trial criteria against authorized source material.

### Dominant entity

One patient–trial review—not the patient or trial separately.

### Above the fold

- patient synthetic label;
- trial title and source;
- reviewer;
- review completeness;
- explicit statement: no eligibility determination;
- last review date;
- unresolved/missing count.

### Criterion structure

For every criterion:

- exact registry text;
- criterion type;
- source link and registry date;
- human-recorded state:
  - Met
  - Not met
  - Needs clarification
  - Not reviewed
- reviewer;
- timestamp;
- supporting patient source;
- rationale or note;
- next action;
- correction/history.

Avoid “pass/fail” styling and avoid a final aggregate status.

### Assisted discovery

#### Safe near-term model

Inputs:

- explicit clinician-selected non-patient filters such as condition, phase, geography, status, study type;
- optionally explicit patient facts that the clinician selects and confirms for this search.

Output:

- preferably **unranked** filtered candidates;
- if ordering is needed, order by non-clinical factors such as latest source update or geographic filter—not inferred fit;
- display every input and which registry field it matched;
- never infer unstated diagnosis, biomarker, stage, treatment history, or availability.

Human confirmation:

- before including a patient fact;
- before opening a Patient–Trial Review;
- for every criterion state;
- before any referral or external handoff.

Validation needed:

- recall and omission testing against clinician-created candidate sets;
- false-association review;
- comprehension testing for why each trial appeared;
- bias and missing-data review;
- clinical-safety/governance approval;
- source-version testing;
- stop criteria for misleading output.

#### Ranked “strong match” indication

**Recommendation: do not use in the next validation round.**

Even without the word “eligible,” ranking trials by patient-specific clinical facts would influence a clinical choice and could constitute clinical decision support. A “strong match” badge is functionally close to a recommendation unless it is limited to transparent, non-clinical query overlap—and that weaker meaning is unlikely to justify the label.

If explored later, it requires a separately governed clinical capability, evidence of intended use, formal risk analysis, validated inputs, performance evaluation, human-factors testing, and explicit owner/clinical/security approval.

### Alternatives

| Option | Benefit | Risk |
|---|---|---|
| A. Manual trial selection only | Safest and transparent | High search burden |
| B. Transparent unranked filter assistance | Improves recall while preserving inspectability | Users may still mistake filtering for matching |
| C. Ranked candidate list | Faster prioritization | High CDS/recommendation and automation-bias risk |

**Recommendation:** B as a future governed experiment; A for the immediate prototype.  
**Decision-changing assumption:** if direct observation shows manual search is acceptably fast and trusted, retain A and avoid automation complexity.

---

## Missing-information tasks

### Primary user and job

Coordinator or clinician assigns a non-clinical retrieval or clarification action.

### Required fields

- exact missing item;
- linked criterion or question;
- source expected;
- owner;
- due state;
- creator;
- creation date;
- completion evidence;
- current status;
- escalation path.

### Guardrail

No task should be created merely because data is unknown. A human must create or accept it.

### Do not show

- clinical urgency inferred by the system;
- auto-completed status;
- negative conclusion from overdue or unanswered work.

---

## Referral and handoff

### Primary user and job

Treating clinician and coordinator prepare a bounded, approved transfer of reviewed information.

### Immediate scope

- versioned summary;
- source manifest;
- intended recipient;
- purpose;
- owner;
- expiry;
- explicit human approval;
- acknowledgement state;
- correction/revocation path.

### Conceptual states, not real transmission

Until backend, identity, authorization, secure delivery, retention, and audit controls exist:

- use “Mark ready for handoff,” not “Send,” or clearly label the action as simulated;
- show “No external transmission occurs in this demo” at the action;
- do not accept real documents.

### Do not show

- autonomous packet generation as complete;
- actual delivery claims;
- inferred screening status;
- final eligibility conclusions;
- outcome text authored by Trial Relay.

---

## Inbox

### Primary user and job

Find and resolve work that specifically requires the signed-in user’s attention.

### Default categories

- **My work**
- **Messages**
- **Updates**
- **Resolved**

### Row content

- action or update;
- entity;
- why it appears;
- owner;
- due or timestamp;
- source/authority;
- unread/unresolved state.

### Progressive disclosure

Drawer or panel for exact source context, history, and actions. Full entity navigation only when needed.

### States

- empty per category;
- stale/offline state;
- inaccessible linked entity;
- reassigned task;
- resolved elsewhere;
- mobile full-page detail with exact return position.

### Do not show

- every unknown site as a task;
- rules builder in the default queue;
- duplicated work from patient, trial, and referral queues;
- engagement-based prioritization.

---

## Map

### Recommended role

Optional secondary lens under the Trial Library.

### Above the fold

- explicit approximate-location warning;
- placed versus unplaced coverage;
- same active filters as list;
- selected trial/site context.

### Guardrails

- no travel feasibility;
- no “near me” clinical implication;
- no site availability;
- no fabricated coordinate precision;
- list remains complete when map is incomplete.

### Recommendation

Keep technically available but defer visual investment until users demonstrate a geography-specific job that the list cannot satisfy.

---

## Trial-specific knowledge and evidence

### Recommended scope

A source-led section attached to a trial, supporting:

- registry updates;
- independent site updates;
- published results;
- protocol or sponsor references;
- correction notices;
- source-linked questions;
- contradictions relevant to current review or coordination.

### Required metadata

- source/publisher;
- author where available;
- publication date;
- retrieval date;
- evidence type;
- relationship to trial;
- trial phase or result context;
- current/corrected/superseded status.

### Explicitly defer

- generic oncology news;
- popularity feeds;
- open social posting;
- broad research discovery;
- algorithmic importance scoring;
- patient-specific synthesis;
- generated clinical interpretation.

### Product judgment

This capability supports the core job only when an item helps users understand the specific trial, resolve a contradiction, or complete coordination. Otherwise it dilutes Trial Relay into an unsupported knowledge platform.

---

# 7. Readability and visual-system proposal

## Principle

Do not “make everything bigger.” Reduce simultaneous content, define stable semantic roles, and give essential information sufficient space.

## Typography

Recommended browser-default targets:

| Role | Size | Line height | Use |
|---|---:|---:|---|
| Page title | `28–32px` desktop; `24–28px` mobile | `1.15–1.25` | Current entity or destination |
| Section heading | `20–24px` | `1.25–1.35` | Major page regions |
| Subheading / row title | `16–18px` | `1.3–1.4` | Trial, patient, task, message titles |
| Body | `15–16px` | `1.5–1.65` | Explanations, summaries, criteria |
| Operational compact body | `14px` | `1.4–1.5` | Dense lists and controls |
| Metadata | `12–13px` | `1.35–1.5` | Source dates, IDs, secondary labels |
| Exceptional micro-label | `11px` minimum | `1.35` | Short uppercase category only; never essential content |

Rules:

- No operationally essential text below `12px`.
- IDs, source dates, and authority labels must remain readable at default zoom.
- Criteria and conversation content use body size, not metadata size.
- Avoid all-caps paragraphs and excessive letter spacing.
- Use tabular numerals only where comparison benefits.

## Line length

- Narrative and evidence text: `55–75ch`.
- Criterion text: `65–85ch`, with source context adjacent.
- List rows: constrain titles to two or three lines, never tiny one-line compression.
- Chat messages: approximately `45–70ch` where viewport permits.

## Spacing

Use a restrained scale such as:

`4, 8, 12, 16, 24, 32, 48`

- `4–8px`: icon/label relationships.
- `12–16px`: internal row spacing.
- `24px`: separation between semantic groups.
- `32–48px`: major sections.

Do not use extra borders to compensate for insufficient spacing.

## Card and panel usage

A card is justified only when it has:

- its own entity identity;
- its own action/state;
- or a clear contextual boundary.

Avoid cards inside cards for ordinary labels and metadata.

Maximum recommended composition:

1. main entity region;
2. contextual detail or activity region;
3. transient action surface when required.

No more than **three simultaneous information regions**. On mobile: one primary region plus a drawer/sheet.

## List density

Offer two densities only if validated:

- Comfortable: `56–72px` row baseline.
- Compact: `44–56px`, with body text never below `14px`.

Do not compress by shrinking typography. Remove secondary fields or move them to preview.

## Hierarchy

Every page should answer in this visual order:

1. Where am I?
2. What entity or work item am I viewing?
3. What is its current state and authority?
4. What do I need to do?
5. What evidence supports this?
6. What history or technical detail is available if needed?

The current application often presents levels 3–6 simultaneously.

## Progressive-disclosure rules

Keep immediately visible:

- current entity;
- current state;
- state authority;
- source/date;
- unresolved issue;
- primary action.

Collapse or move:

- full raw registry text;
- complete history;
- relationship diagrams;
- audit internals;
- notification rules;
- all criteria when not under active review;
- full source manifests outside a handoff;
- secondary activity.

Do not hide:

- registry/site distinction;
- synthetic-data status;
- missing or conflicting information;
- incomplete-review state;
- source/date;
- who made a consequential decision.

## Color and status

Preserve the current semantic direction, but:

- color supplements text and icon;
- green means a specific human-confirmed state—not suitability;
- amber distinguishes unknown, stale, or conflicting states;
- blue indicates registry/source information;
- plum may indicate discussion or human deliberation;
- red is reserved for blocking failure or unsafe action.

Do not use engagement colors or heatmaps to imply importance.

## Responsive behavior

### Desktop

- Library plus preview may coexist.
- Full Trial Detail gets a full page.
- Patient workspace uses a primary canvas and one contextual sidebar.
- Room uses timeline plus compact context sidebar.

### Tablet

- Preview becomes overlay/drawer.
- Section navigation remains visible.
- Sidebars collapse.

### Narrow/mobile

- One task per screen.
- Compact sticky entity context.
- Preview becomes a page or bottom sheet.
- Patient workspace becomes sectioned routes.
- Full-width controls; touch targets at least approximately `44 × 44px`.
- Avoid persistent introductory copy above every route.

## Accessibility

Required:

- keyboard access for all selection and preview behavior;
- focus restoration after preview, dialog, and route return;
- focus not hidden beneath sticky chrome;
- status distinctions independent of color;
- semantic headings and landmarks;
- messages expose sender, role, time, and official-response state to assistive technology;
- tables have a responsive list equivalent where necessary;
- reduced motion and reduced transparency remain supported;
- print preserves provenance and status wording;
- hover never reveals unique content;
- live regions used sparingly for task creation or message state;
- contrast testing for muted metadata, disabled controls, and source planes.

---

# 8. Safety and scope assessment

## Currently authorized for the synthetic validation demo

- Dated public ClinicalTrials.gov trial records.
- General trial search and filtering.
- Registry source and snapshot date.
- Separate registry and independent site-verification states.
- Following a trial in browser memory.
- General operational questions.
- Synthetic Trial Room messages and roles.
- Synthetic patient workspaces.
- Manual clinician-selected trial review.
- Human-recorded criterion states.
- Synthetic source references.
- Missing-information tasks.
- Simulated packet, referral, board, handoff, acknowledgement, and outcome workflows.
- Browser-memory interactions.
- Approximate map with explicit limitations.

## May be represented conceptually, but not implemented with real data

- Manual patient workspace creation.
- Synthetic record upload.
- Future EMR-sourced fields.
- Treating-team ownership.
- Real site communication.
- Secure packet delivery.
- Real trial-team acknowledgement.
- Persistent assignment and audit.
- Real professional identity and verified role.
- Cohort workflow.
- Trial-specific evidence aggregation.

These should be visibly labelled as concept demonstrations.

## Requires owner plus privacy/security/architecture approval

- Real patient information.
- File ingestion or record storage.
- Retrospective de-identification workflows.
- Production persistence.
- Identity provider and institutional federation.
- Role-based access control.
- Consent and patient-access models.
- Secure external messaging.
- Notification delivery.
- Audit retention.
- Data residency and deletion policy.
- EMR integration.
- Real packet transmission.
- Trial-site onboarding and verification.
- Production backend or dependencies.
- New registry/data sources.
- CTRI or WHO data use.
- Precise location/geocoding sources.
- AI assistant operating on non-public or patient information.

## Requires clinical-governance approval

- Any patient-specific automated filtering beyond explicitly selected fields.
- Trial ranking.
- “Strong match” or suitability signals.
- Eligibility assessment.
- Criteria extraction presented as complete.
- Interpretation of patient records.
- Suggested criterion states.
- Clinical summaries.
- Treatment or trial recommendations.
- Automated screening outcome.
- Board-decision generation.

## Must remain prohibited

- Diagnosis.
- Treatment recommendation.
- Autonomous clinical advice.
- Eligibility conclusion.
- Patient-specific trial ranking.
- Aggregate eligibility score.
- Silent inference of patient facts.
- Inferring site availability from registry status.
- Converting unanswered questions into negative conclusions.
- Representing generated text as an official site response.
- Autonomous referral release.
- System-generated tumour-board or trial-team decisions.
- Identifiable patient or participant information in the repository, prompts, screenshots, analytics, or demo.

---

# 9. Prioritized roadmap

Effort: S / M / L. Risk: Low / Medium / High. Reversibility: High means easy to undo.

## 1. Immediate clarity and readability improvements

| Item | User value | Evidence | Effort | Risk | Reversibility | Dependencies | Validation |
|---|---|---|---:|---|---|---|---|
| Correct the incoherent synthetic patient/trial pairing | Restores basic trust | **CONTRADICTION:** NSCLC patient paired with HER2-positive gastric trial | S | Low | High | Clinical review of synthetic content | Ask participant to explain why the trial is present |
| Establish readable type roles | Removes need to zoom | **OBSERVED:** widespread 7–11px text | M | Low | High | Token/style audit | Complete core tasks at 100% zoom |
| Reduce Trial Library row content | Faster scanning | **OBSERVED:** too many fields per row | M | Low | High | Decide summary fields | Time to identify two plausible records |
| Normalize displayed taxonomy | Improves credibility and filtering | **OBSERVED:** duplicate/misspelled terms | M | Medium | High | Display mapping preserving raw source | Clinical terminology review |
| Make result limit/pagination explicit | Prevents confusion over 60/285 display | **OBSERVED** | S | Low | High | None | Participant explains result count |
| Remove auto-created unverified-site tasks | Restores Inbox signal | **OBSERVED:** 286 tasks | M | Low | High | Task-creation rule | Users find three owned items quickly |
| Collapse persistent mobile chrome | More usable viewport | **OBSERVED:** ~279px before main | M | Low | High | Mobile header design | First action visible without excessive scroll |
| Make review completeness prominent | Prevents partial review appearing complete | **OBSERVED:** four excerpts | M | High if omitted | High | Criterion model | Participant states whether review is complete |

## 2. Structural workflow and navigation redesign

| Item | User value | Evidence | Effort | Risk | Reversibility | Dependencies | Validation |
|---|---|---|---:|---|---|---|---|
| Split preview from dedicated Trial Detail | Clear scan-to-understand transition | Embedded profile competes with 14kpx list | L | Low | Medium | Routing/state preservation | Open/return without losing filters, focus, position |
| Add Patient Workspace list | Makes Patients a real system | Patients opens one static case | L | Medium | High | Synthetic dataset of several workspaces | Find, filter, open, and identify owner |
| Create dedicated Patient–Trial Review | Clarifies authority and completeness | Current patient page is overloaded | L | High safety value | Medium | Trial Detail and patient source model | Record one criterion and identify unresolved state |
| Rebuild Trial Room as channel UI | Familiar interaction and better chronology | Current room is cards/forms | L | Medium | Medium | Message/ticket information model | Ask, reply, cite, assign, and resolve |
| Redesign Inbox around attention | Improves operational value | Queue noise and side-rail clutter | M | Low | High | Explicit task/message/update semantics | Resolve item and return to exact position |
| Convert Patient Workspace to sectioned pages | Reduces 4,698px mobile canvas | **OBSERVED** | L | Low | Medium | IA decision | Complete patient-first flow on mobile |

## 3. Additional demo-safe capabilities

| Item | User value | Evidence | Effort | Risk | Reversibility | Dependencies | Validation |
|---|---|---|---:|---|---|---|---|
| Create several synthetic patient workspaces | Enables list and ownership testing | Current single case is restrictive | M | Low | High | Coherent synthetic content | Search/filter/sort usability |
| Synthetic-only manual creation | Tests intake mental model | User hypothesis | M | Medium | High | Explicit no-real-data controls | Participant creates workspace without assuming persistence |
| Source-type badges per patient fact | Improves provenance comprehension | Current sources are dispersed | M | Low | High | Fact/source model | Identify manual vs synthetic document vs future EMR |
| Role-specific Home activity | Demonstrates continuing value | Home is mostly launcher | M | Low | High | Synthetic identity/activity | Participant identifies next work within 10 seconds |
| Evidence-linked corrections | Connects evidence, discussion, and tasks | Current pieces exist but are fragmented | M | Medium | High | Trial Detail and Room | Raise contradiction and create correction |
| Explicit simulated-handoff language | Prevents transmission misunderstanding | No backend/external messaging | S | High safety value | High | None | Participant correctly states nothing was sent |

## 4. Future governed product hypotheses

| Hypothesis | Potential value | Evidence status | Effort | Risk | Reversibility | Dependencies | Validation |
|---|---|---|---:|---|---|---|---|
| Transparent unranked assisted discovery | Reduce search burden | **OPEN** | L | High | Medium | Clinical governance, source quality, input provenance | Compare recall and misunderstanding against manual search |
| Cohort-based library filtering | Support treating-team workload | **OPEN** | L | High | Medium | Authorization, patient selection, no-ranking model | Coordinator task study |
| Trial-specific evidence feed | Resolve updates and contradictions | **OPEN** | L | Medium | Medium | Data licences, editorial/source policy | Determine whether it changes trial-review work |
| AI room assistant | Reduce conversation burden | **OPEN** | L | High | Medium | Identity, citations, data boundary, evaluation | Factuality, omission, authority-confusion tests |
| Real Trial Room communication | Close clarification loop | **OPEN** | XL | High | Low | Site participation, identity, consent, moderation, retention | Real operational pilot after approval |
| Secure referral handoff | Close ownership loop | **OPEN** | XL | High | Low | Backend, RBAC, encryption, audit, legal/privacy | Controlled institutional pilot |
| Map as access-planning lens | Geographic understanding | Weak current evidence | L | High | Medium | Accurate site/geospatial data | Observe actual geography decision |

## 5. Direct oncology-user validation

| Item | User value | Evidence | Effort | Risk | Reversibility | Dependencies | Validation |
|---|---|---|---:|---|---|---|---|
| Treating-oncologist trial-first sessions | Tests source/status comprehension | Required by Phase 6 | M | Low with synthetic data | High | Restructured core prototype | Completion, time, errors, trusted fields |
| Coordinator patient-first sessions | Tests frequent operational work | Persona frequency is **OPEN** | M | Low | High | Patient list/review prototype | Ownership, duplication, task usefulness |
| Trial-side role sessions | Tests official-response and authority model | Trial Room assumptions **OPEN** | M | Medium | High | Role-specific prototype | Scope and access comprehension |
| Comparative workflow interview | Identifies duplication | Governance requires current workflow evidence | M | Low | High | Approved recruitment | Current tools, handoffs, burden |
| Product-lock decision | Prevents sunk-cost expansion | Phase 6 open | S decision work | High if skipped | Low after architecture investment | Sufficient evidence threshold set by owner | Retain/simplify/remove per capability |

---

# 10. Phase 6 validation plan

## Protocol rules

- Synthetic patient data only.
- Dated public trial records only.
- No participant or patient identifiers in notes.
- Observe before explaining.
- Separate treating-oncologist and coordinator sessions.
- Record aggregate-safe evidence only.
- Do not claim validation from successful task completion alone.
- Stop and rework if any participant infers:
  - current site availability;
  - eligibility;
  - treatment recommendation;
  - automatic packet transmission;
  - generated board/trial-team decision.

## Task matrix

| Task | Participant role | Success signal | Failure signal | Measure | Misunderstanding to watch | Stop/rework condition | Aggregate-safe evidence |
|---|---|---|---|---|---|---|---|
| 1. Explain the Home screen and choose where to start | Oncologist; coordinator | Identifies Trials, Patients, Inbox, and synthetic/registry boundary without prompting | Describes Home as analytics, matching, or clinical prioritization | Time to choose; first click | Activity implies trial importance | User interprets engagement as clinical quality | Role type; first destination; misunderstood labels |
| 2. Find an India-located trial for a participant-chosen condition/location | Oncologist; coordinator | Applies filters, scans results, opens plausible trial | Cannot understand result count, raw terms, or why a record appears | Completion time; filter changes; backtracks | Search results are “recommended” | User calls result a patient match without patient context | Time; fields used; trusted/missing fields |
| 3. Distinguish registry status from site-confirmed status | Both | Correctly explains both states and their sources | Says a recruiting registry record means the India site is enrolling | Accuracy; confidence explanation | Registry status equals site availability | Any site-availability inference | Correct/incorrect distinction; exact wording used |
| 4. Inspect provenance and source date | Both | Finds source, snapshot date, and external record | Trusts UI without checking source or cannot find date | Source-link use; elapsed time | Currentness assumed from polished UI | Participant believes snapshot is live | Source-link usage; fields trusted/distrusted |
| 5. Preview and open full trial, then return | Both | Understands difference between preview and detail; filters/position/focus preserved | Treats preview as complete or loses result context | Steps; return errors | Criteria or provenance assumed complete in preview | Participant makes a completeness claim from preview | Navigation path; lost-context events |
| 6. Ask a general operational question in Trial Room | Oncologist; coordinator | Posts a question, identifies room scope and participant roles | Uses room for patient-specific advice or cannot distinguish official response | Time; message type chosen | Any answer appears site-authoritative | Generated/general response treated as official | Question category; authority errors |
| 7. Convert an unresolved question into a ticket | Coordinator; oncologist | Names owner, due state, source, and unresolved status | Assumes unanswered means unavailable/not eligible | Task completion; owner accuracy | Silence becomes a negative conclusion | Any negative clinical/site conclusion from silence | Ownership accuracy; inferred conclusions |
| 8. Find the resulting work in Inbox and return | Coordinator; oncologist | Finds item, explains why it exists, resolves/navigates, returns to prior position | Cannot separate task/message/update or is overwhelmed by queue | Time; wrong opens; return success | Every unknown is assigned work | Queue volume prevents identifying owned item | Item category accuracy; navigation errors |
| 9. Find a synthetic patient workspace | Coordinator; oncologist | Uses list/search/filter and identifies treating team/current owner | Looks for technical ID only or misses synthetic badge | Completion time | Demo workspace is a real patient record | Any assumption that real data is stored | Search method; badge comprehension |
| 10. Create a synthetic workspace manually | Coordinator | Enters only synthetic data and understands no persistence/real upload | Attempts to use a real patient or expects durable storage | Time; assistance count | “Upload” means real records supported | Participant prepares identifiable data | Field difficulties; persistence understanding |
| 11. Explain source provenance for patient facts | Both | Distinguishes manual, synthetic document, and conceptual future EMR sources | Assumes every displayed field came from EMR | Accuracy per field | UI-normalized fact equals clinician-confirmed fact | Source type repeatedly misunderstood | Correct source classifications |
| 12. Select a trial manually for review | Oncologist | Understands selection is clinician initiated and not a system recommendation | Believes Trial Relay chose a suitable trial | Explanation accuracy | Selection order implies ranking | Trial appearance described as recommendation | Exact mental-model phrase |
| 13. Review one criterion | Oncologist | Reads exact criterion, opens source, records one state with reviewer/date/evidence | Treats the state as system-generated or concludes overall eligibility | Time; source use; completion | One criterion state equals eligibility | Any aggregate eligibility conclusion | State chosen; source used; authority comprehension |
| 14. Identify review completeness | Oncologist | Correctly states remaining criteria are not reviewed | Assumes four displayed excerpts are the complete protocol | Accuracy | Partial review presented as complete | Participant believes review is complete | Completeness answer |
| 15. Create a missing-information task | Oncologist; coordinator | Links task to criterion, names owner/source/due state | Creates vague task or assumes system will retrieve/interpret data | Time; task quality | Task completion will determine eligibility automatically | Automated clinical inference expected | Task fields completed; unclear terms |
| 16. Select multiple synthetic workspaces for a cohort | Coordinator; oncologist | Understands cohort selection as work organization or transparent filtering | Expects automated patient ranking or batch eligibility | Explanation; selected count | Cohort means matching engine | Any batch eligibility or ranking expectation | Intended cohort use; requested filters |
| 17. Prepare a handoff summary without transmitting | Coordinator; oncologist | Identifies manifest, owner, recipient, approval, version, and next action; states nothing was sent | Believes button transmitted data or approval was automatic | Time; state explanation | Simulated lifecycle appears real | Any external-send belief | State comprehension; missing fields |
| 18. Handle a packet correction | Coordinator | Understands correction invalidates prior approval/version | Assumes old approval remains valid | Accuracy; steps | Audit history equals current authorization | Proceeds with invalid approval | Version/approval comprehension |
| 19. Interpret an acknowledged or unresolved handoff | Both | Distinguishes acknowledgement, screening, and authorized outcome | Treats acknowledgement as acceptance or eligibility | Accuracy | Operational state implies clinical result | Any eligibility inference | State definitions in participant’s words |
| 20. Review trial-specific evidence and raise a contradiction | Oncologist; coordinator | Identifies source type/date, links discussion, creates correction/task | Treats news/discussion as equivalent to registry or official response | Source classification accuracy | Engagement or publication equals authority | Unsupported content changes trial/site conclusion | Sources used; contradiction handling |

## Recommended session composition

Run separate sessions rather than mixed-role workshops initially:

1. **Treating oncologists**
   - discovery;
   - trial detail;
   - authority distinction;
   - patient–trial criterion review;
   - handoff approval mental model.

2. **Clinical research coordinators / trial navigators**
   - verification;
   - Trial Room;
   - missing-information tasks;
   - Inbox;
   - packet preparation and acknowledgement;
   - current-workflow duplication.

3. **Trial-site coordinators or delegated trial-side authorities**
   - room access;
   - official response scope;
   - site-confirmation wording;
   - acknowledgement and outcome boundaries.

Mixed-role sessions can follow once each role’s private and shared work is understood.

## Cross-task success signals

- Registry versus site-confirmed status is distinguished without coaching.
- No participant interprets discovery as recommendation.
- Review completeness is understood.
- Every criterion state is recognized as human-recorded.
- Participants can identify owner, unresolved state, and next action.
- Room roles and official responses are understood.
- Inbox improves attention rather than duplicating current work.
- Handoff state is not mistaken for actual transmission.
- The core flow can be completed at default zoom.
- Participants can name what they would stop using in favor of Trial Relay.

## Cross-task failure signals

- Repeated zooming or reading aloud because text is too small.
- Users treat preview information as complete.
- Trial ordering is interpreted as patient suitability.
- Unknown site state becomes “not enrolling.”
- Unanswered question becomes “no.”
- Partial criterion review becomes an eligibility conclusion.
- Participants cannot tell who authored a status.
- Coordinator and oncologist both expect the other to own the task.
- Inbox appears as another place to check rather than a replacement for existing work.
- Referral machinery duplicates current workflow without reducing ambiguity or delay.

## Aggregate-safe evidence to retain

- participant role category;
- broad care setting;
- scenario completed or not;
- elapsed time;
- number of prompts;
- navigation errors;
- source-link use;
- registry/site distinction accuracy;
- owner/due/unresolved-state accuracy;
- terms or controls misunderstood;
- trusted, distrusted, or missing fields;
- current tools duplicated;
- requested missing capability;
- keep / simplify / remove / investigate recommendation;
- whether a stop condition occurred.

Do not retain:

- names;
- institution-identifying anecdotes unless separately authorized and de-identified;
- real patient details;
- screenshots containing participant or patient information;
- raw recordings without separate approval;
- identifiable quotes.

---

## Final recommendation

Protect the conceptual spine:

> source-led trial discovery → explicit uncertainty → human review → owned clarification → bounded handoff.

Simplify almost everything around it.

The next validation prototype should contain:

- a readable Trial Library;
- an accessible preview;
- a dedicated Trial Detail;
- a real Trial Room interaction model;
- a Patient Workspace list;
- a source-oriented Patient Workspace;
- a dedicated criterion-review flow;
- a restrained Inbox;
- the smallest credible handoff lifecycle.

Map, relationship visualization, notification rules, broad referral automation, cohort assistance, AI, and trial-specific knowledge expansion should remain secondary until Phase 6 demonstrates a user and workflow pull for them.

**Current status remains OPEN:** promising direction, strong safety foundations, unresolved product fit, and no product lock.