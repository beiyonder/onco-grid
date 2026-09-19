# Trial Relay — Product Experience Blueprint

## Status

- **Artifact type:** target-state product experience proposal.
- **Companion artifact:** [`TRIAL_RELAY_VISUAL_DESIGN_LANGUAGE.md`](./TRIAL_RELAY_VISUAL_DESIGN_LANGUAGE.md).
- **Audience:** product, design, clinical, research-operations, and engineering teams.
- **Example users and patient records:** synthetic.
- **Purpose:** agree on the user journey and product language before redesigning screens or deciding which features survive.
- **Not product lock:** the internal review may remove, rename, or resequence any proposed capability.
- **Claim class:** **INFERENCE**. Every target-state description below is a design proposal, not an observed workflow fact or validated user need.
- **OPEN:** persona priorities, terminology, workflow ownership, and feature value require direct oncology-team validation.

## What this activity is called

The clearest name is:

> **End-to-end product experience blueprint**

It combines four related UX activities:

1. **User journey mapping** — what the user is trying to accomplish from beginning to end.
2. **Information architecture** — which parts of the product exist and how they are named and grouped.
3. **Service blueprinting** — which people and systems work behind each visible step.
4. **Experience narrative or UX storyboard** — a written story that makes the future product easy to imagine before screens are redesigned.

The immediate exercise is therefore not “design more screens.” It is:

> Define the simplest coherent story of how an oncology professional enters Trial Relay, finds or reviews a trial, collaborates with other people, works with a patient when authorised, completes a referral, and stays informed afterward.

---

## Product in one sentence

> Trial Relay helps oncology teams find India-relevant clinical trials, clarify missing trial and site information with the right people, review source evidence for a patient through a human-led process, and complete the referral handoff without losing ownership or status.

The product is not another EMR and not only a prettier trial registry. Its proposed value is the connected workflow between:

`discovery → clarification → human review → referral → trial-team screening → acknowledgement → follow-up`

---

# 1. Users and roles

## Primary persona — treating oncologist

### Synthetic example

**Dr Meera Shah**

- Role: medical oncologist.
- Focus: thoracic and breast oncology.
- Institution: Metro Cancer Centre, Mumbai.
- Typical need: identify relevant trials, understand whether the listed India site is really reachable, discuss uncertainties, and hand the case to a coordinator or trial team.
- Main constraint: limited time during or between consultations.
- Product expectation: trustworthy sources, clear status, minimal data entry, and a fast path to the next human action.

### Fully populated demo profile

| Field | Synthetic demo value |
|---|---|
| Name | Dr Meera Shah |
| Professional role | Treating medical oncologist |
| Primary speciality | Medical oncology |
| Disease focus | Thoracic and breast oncology |
| Institution | Metro Cancer Centre |
| Location | Mumbai, Maharashtra, India |
| Care team | Western Oncology Unit |
| Assigned research coordinator | Rohan Iyer |
| Languages | English, Hindi, Marathi |
| Preferred trial regions | Mumbai and Pune by default; all India when expanded |
| Time zone | Asia/Kolkata |
| Notification preference | Immediate in-app notification for official responses and referral changes; daily digest for followed-trial updates |
| Trial-room identity | Verified clinician — synthetic demo status |
| Patient access | Synthetic patients assigned to the Western Oncology Unit |
| EMR connection | Synthetic connected-demo environment |

Do not display or fabricate a real medical-registration number for the demo user. A clearly marked synthetic verification state is sufficient.

The primary persona should be described as a **treating oncologist**, not only “doctor” or “onco.” Depending on the institution, this may be a medical, surgical, radiation, paediatric, or haematological oncologist.

## Operational co-primary persona — clinical research coordinator or trial navigator

This person is likely to use Trial Relay more frequently than the oncologist for operational work.

They:

- verify trial and site status;
- contact trial offices, investigators, or sponsors;
- collect missing documents;
- prepare and route referral packets;
- monitor acknowledgement and overdue tasks;
- maintain status and audit history.

The product should therefore be **oncologist-led but coordinator-operable**.

## Trial-side contributor — PI or site trial coordinator

This person represents the receiving clinical-trial side.

They can:

- answer protocol and site-operation questions;
- confirm whether the site is currently accepting screening enquiries;
- identify missing information;
- report that formal screening has started;
- return the authorised trial-team eligibility outcome.

They should not need access to unrelated patients, institutions, or internal oncology-team work.

## Supporting roles

- Tumour-board presenter or coordinator.
- Pathologist or molecular pathologist.
- Hospital research-office administrator.
- Data or integration administrator.
- Read-only auditor.

Each role should see only the work it is authorised to perform.

---

# 2. Fast onboarding

## First sign-in

The first session should feel closer to accepting an invitation than filling out a long registration form.

If Trial Relay is launched from the hospital EMR, the institution, signed-in identity, and role should already be known. If it is opened independently, the user signs in through a verified professional or institutional account.

Only collect what is required to make the first session useful:

1. Name.
2. Professional role.
3. Oncology speciality or disease focus.
4. Institution or hospital.
5. City and state.

Optional profile information belongs in **Settings**, not onboarding:

- additional disease interests;
- languages;
- preferred trial regions;
- notification channels;
- default coordinator or care team;
- professional biography;
- saved views and display preferences.

## First-use orientation

After onboarding, show a short orientation with two clear starting points:

- **Find or follow a trial**
- **Work with a patient**

Do not begin with a dense dashboard of every feature.

A secondary section shows:

- unread updates;
- tasks requiring the user's action;
- followed trials;
- recent patients or referral work.

The user can skip the walkthrough and return to it from Help.

---

# 3. Product structure

The draft calls these “two grains.” A clearer term is **two primary workspaces** or **two starting journeys**:

1. **Trial workspace** — start with a clinical trial.
2. **Patient workspace** — start with a patient.

These are not two separate products. They meet at the same human review and referral workflow.

## Recommended primary navigation

Keep global navigation to four destinations:

1. **Home**
2. **Trials**
3. **Patients**
4. **Inbox**

The user profile and Settings remain in the account menu.

Everything else should become contextual instead of another global tab:

- site verification lives inside a trial;
- criterion review lives inside a patient–trial review;
- discussion lives inside a trial room;
- tumour-board routing is an action on a patient–trial review;
- audit history appears in the relevant trial, patient, referral, or task;
- data-source and integration health belongs in administrator settings;
- analytics belongs in an authorised operations view.

This removes the current feeling of navigating separate tools.

## Recommended product language

| Current or draft term | Recommended term | Why |
|---|---|---|
| Explore trials | **Trials** or **Trial library** | Direct and familiar. |
| Case review | **Patient workspace** | Immediately identifies the subject of the work. |
| Candidate review | **Trial review for this patient** | Describes the action; avoids ambiguous “candidate.” |
| Matching | **Find trials to review** | Does not imply eligibility or recommendation. |
| Top matches | **Trials to review** | Avoids false ranking and clinical certainty. |
| Site assertion | **Site-confirmed status** | Easier to understand in the UI. |
| Registry-declared status | **Registry status** with source/date | Plain language while preserving provenance. |
| Inquiry handoff | **Site enquiry** or **Referral** | Matches the real-world action. |
| Operational disposition | **Next step and owner** | Clearer for users. |
| Trial discussion forum | **Trial room** | Short, contextual, and collaborative. |

---

# 4. The complete experience story

## Scene 1 — Dr Meera opens Trial Relay

Dr Meera launches Trial Relay from the oncology EMR. The app recognises her institution and role. A narrow header confirms the current hospital and, if she opened Trial Relay from a patient chart, that she is in a synthetic patient context.

The home screen asks a simple question:

> What do you want to do?

Two primary actions appear:

- **Find or follow a trial**
- **Work with a patient**

Below them, a quiet work summary shows:

- two trial updates;
- one site verification due;
- one referral acknowledged;
- recent patient work.

The home screen does not expose verification queues, audit logs, integrations, analytics, and every other feature at once.

---

# 5. Journey A — start with a clinical trial

## A1. Open the Trial library

Dr Meera selects **Trials**.

The default view is a searchable list. At the top she can search by:

- cancer or condition;
- trial title or identifier;
- phase;
- intervention;
- city or state;
- registry status;
- independently site-confirmed status.

The result count states that the data are registry-declared and shows the data date. Every result identifies its source.

Each result card answers only the questions needed to decide whether to open it:

- title;
- cancer or condition;
- phase;
- India locations;
- registry status and date;
- whether any site status was separately confirmed;
- whether the user is following the trial.

Do not show a patient-match percentage.

## A2. Switch between list and map

A view control at the top switches between:

- **List**
- **Map**

Filters, search terms, and the selected trial stay unchanged when the view changes.

The list remains the default because it is faster for precise clinical work. The map is an exploration and geographic-access view.

## A3. Open a trial

Dr Meera selects a trial. The trial profile opens without replacing the search results, so she can return to the list easily.

The page begins with a clear status block:

- registry status, source, and date;
- separate site-confirmed status and date;
- warning when the two disagree;
- last verification attempt when no authoritative response exists.

The trial profile uses three sections, not many top-level tabs:

### Overview

- official title and identifiers;
- plain summary;
- phase and sponsor;
- cancer conditions;
- interventions;
- registry eligibility text;
- source and retrieval date.

### Sites and status

- India sites grouped by city and state;
- registry-declared site state;
- separately confirmed operational state;
- when and how it was confirmed;
- current authorised contact route through the source record;
- verification history and unresolved discrepancies.

### Trial room

- pinned registry facts and source links;
- site and sponsor updates;
- questions and responses;
- participants and their verified roles;
- related referral activity visible only to authorised participants.

Secondary material such as audit history and raw change history can appear in drawers or expandable sections.

## A4. Follow the trial

Dr Meera selects **Follow trial**.

She can choose which changes matter:

- registry status changed;
- site-confirmed status changed;
- verification is due or expired;
- registry and site disagree;
- a question received an official response;
- a referral or trial-team screening state changed.

The default recipients are the follower and the assigned coordinator. Other roles are added only when relevant.

Alerts appear in **Inbox** and, if approved, the EMR inbox or Task list. External email contains only a minimal operational message and a secure link—never patient or clinical details.

## A5. Ask a question in the Trial room

The registry may not answer the practical question Dr Meera has. She opens the **Trial room**.

The room is inspired by Discord, but it should not reproduce Discord's complexity. Use one contextual conversation space with thread categories:

- Site status
- Protocol clarification
- Documents and missing information
- Referral process
- General discussion

Dr Meera writes:

> The registry lists the Mumbai site as recruiting. Is the site currently accepting new screening enquiries, and which route should our coordinator use?

The question is addressed to the verified site coordinator. Until an authorised person responds, the status remains **Awaiting confirmation**.

When a PI or site coordinator answers, their response carries an **Official site response** label. The system records the source role, date, and related site. Other oncologists may comment, but their messages do not become official status.

No patient-identifying information belongs in a shared Trial room. Patient-specific discussion stays in the private Patient workspace or authorised referral packet.

## A6. Convert the answer into work

An official response can create a proposed next step:

> Contact the Mumbai trial office through the current registry route.

A person approves it and assigns:

- owner;
- due date;
- linked trial and site;
- expected outcome.

The enquiry then moves through:

`Draft → Approved → Sent → Acknowledged → Closed`

`Unable to contact` and `No authoritative response` remain explicit outcomes. Silence never becomes “not recruiting.”

---

# 6. Journey B — start with a patient

## B1. Open Patients

Dr Meera selects **Patients**.

She sees only patients she is authorised to access. In the prototype, every patient is synthetic.

She can:

- open a patient from the EMR;
- manually create a patient workspace where institution policy permits it;
- resume an existing trial review or referral.

Manual creation should collect only the minimum information required for the authorised workflow. The EMR remains the clinical system of record.

## B2. Open the Patient workspace

The patient header shows:

- identity and encounter context;
- treating team;
- source-record availability;
- active trial reviews and referrals.

The page has three sections:

1. **Summary and records**
2. **Trials under review**
3. **Activity and next steps**

### Summary and records

Show original source records such as pathology, molecular reports, treatment administration, procedures, and laboratory reports.

Separate:

- information explicitly present in a source;
- facts confirmed by a clinician;
- missing information;
- conflicting source assertions.

Trial Relay must not infer diagnosis, stage, response, progression, or risk.

## B3. Start a trial review

The button should say:

> **Find trials to review**

Do not say “Find the best trial” or “Match this patient.”

### Current safe workflow

The clinician chooses the search criteria and opens the general Trial library. The patient context does not silently rank or filter the global list.

After the clinician selects a trial, they choose **Review this trial for the patient**.

Trial Relay places the trial and relevant EMR sources side by side.

### Future governed assisted-discovery concept

A future, separately governed clinical product could use clinician-confirmed facts to generate an unranked review set. That would require dedicated regulatory, clinical-safety, data-quality, and prospective-evaluation work.

It must not be smuggled into the current product as a “loose” or “basic” match. Even a rough ranked list can influence treatment and referral decisions.

## B4. Review trial criteria

The clinician reviews each criterion individually.

For every criterion, the screen shows:

- exact protocol wording;
- linked EMR source selected by the clinician;
- human-entered state:
  - Not reviewed
  - Confirmed by clinician
  - Not met — human decision
  - Needs clarification
- reviewer and date.

Trial Relay does not calculate an overall eligibility score or label the patient qualified.

The page may show progress such as **6 of 10 criteria reviewed**, but never a percentage match.

## B5. Resolve missing information

If information is missing, the clinician or coordinator can create a task:

- request the missing source;
- ask the site whether a method is accepted;
- request human clarification;
- send the question to the tumour board.

The product identifies the missing record or unanswered question. It does not guess the answer.

## B6. Prepare a referral packet

The coordinator selects the exact EMR records to include by reference. The packet defines:

- purpose;
- trial and site;
- authorised recipient;
- selected source records;
- clinician review state;
- owner;
- expiry;
- approval state.

Changing the packet after approval invalidates the approval.

## B7. Trial-team screening

After human approval, the packet is sent through the authorised route. The trial team performs formal screening.

The referral states are:

`Packet draft → Approved → Sent → Acknowledged → Trial-team screening → Trial-team outcome → Closed`

The receiving trial team may return:

- Eligible — trial-team decision
- Ineligible — trial-team decision
- More information required
- Screening deferred
- Unable to contact

Trial Relay may display this outcome because it comes from the authorised trial team. It must preserve source, date, and responsible role.

---

# 7. Unified Inbox

Alerts, questions, and assigned work belong in one **Inbox**, not separate global tabs.

The Inbox contains three views:

- **Updates** — something changed.
- **Messages** — someone responded in a Trial room or referral.
- **Tasks** — the user owns a next step.

Each item answers:

1. What changed?
2. Which trial, site, patient workspace, or referral does it concern?
3. Who needs to act?
4. By when?
5. What is the source?

Examples:

- Trial registry status changed.
- Site confirmation expires tomorrow.
- Registry and site status disagree.
- PI answered a protocol question.
- Referral was acknowledged.
- Trial team requested another source record.
- Trial team returned a formal eligibility outcome.
- EMR write-back failed and needs reconciliation.

The system groups duplicate changes and stops alerts when the user stops following the trial, loses access, or the task closes.

---

# 8. The Trial room

## Purpose

The Trial room solves the back-and-forth problem around incomplete or uncertain trial information.

It should feel like a focused professional workspace, not a public social network.

## Structure

### Pinned facts

- registry title and ID;
- source link;
- registry status and date;
- India sites;
- latest site-confirmed status;
- unresolved discrepancy or missing-information flags.

Pinned facts cannot be changed by ordinary discussion messages.

### Conversation

Messages are threaded and assigned a category. Users can mention people or roles, but only verified participants can publish official site or sponsor responses.

### Participants

Show role and institution:

- treating oncologist;
- research coordinator;
- PI;
- site coordinator;
- sponsor or trial-office representative;
- invited specialist.

### Resolution

A thread can end as:

- answered officially;
- answered informally;
- action created;
- source record corrected;
- unresolved;
- closed as outdated.

If the underlying registry record changes, responses that depend on old information are visibly marked for review.

---

# 9. Geographic Trial view

## Role in the product

The map is a secondary view of the Trial library, not a separate navigation destination.

The user switches between **List** and **Map** while preserving all filters and search terms.

## Visual direction

> A soft 2.5D India trial-access diorama: geographically accurate state and city placement, shallow terrain extrusion, restrained low-poly landmarks, floating labels, soft shadows, and warm glass-like information panels.

The strategy-game quality should provide spatial clarity, not gamify cancer care or trial scarcity.

Use the visual style only inside Map view. The rest of the clinical product should remain quiet, dense, and conventional.

## Default map state

- India shown at a useful full-country scale.
- States remain geographically accurate and recognisable.
- Only locations matching the current trial filters appear.
- City markers represent sites, not patients.
- Marker size reflects the number of matching trials or sites.
- Colour represents one declared operational dimension at a time—for example registry status or verification freshness.
- A legend explains the active encoding.

## Interaction

### Hover or keyboard focus

A city label rises slightly and shows:

- city and state;
- matching trial count;
- site count;
- how many trials are registry-declared recruiting;
- how many have a recent independent site confirmation.

### Select a city

A warm glass panel opens without losing the map:

- matching trials;
- selected filters;
- latest data timestamp;
- source and verification distinction;
- action to open the filtered list.

### Select a trial

The trial and its India sites become highlighted. Other locations fade but remain visible for context.

### Zoom

At country level, show city clusters. At a closer level, separate sites where location data supports it. Do not fabricate precise coordinates when only a city or postal code is known.

## Visual style details

- Shallow extrusion, never dramatic mountains or decorative terrain that obscures state borders.
- Sparse landmarks associated with major cities, used as orientation aids at low visual weight.
- Neutral terrain colours with trial-status colours reserved for data.
- Soft ambient shadow and subtle parallax only after user interaction.
- No constant animation.
- Respect reduced-motion preferences.
- Keep text horizontal and readable.
- Avoid glass panels over dense data without sufficient contrast.

## Accuracy and accessibility

- Mark approximate or geocoded locations as approximate.
- Do not imply that marker proximity means travel feasibility.
- Provide the same information in the List view.
- Make cities and clusters keyboard selectable.
- Provide visible focus and screen-reader labels.
- On small screens, use a simplified flat map with a bottom-sheet list—or default to List view.

---

# 10. Service blueprint

| Journey step | User sees and does | People behind the step | System responsibility | Output |
|---|---|---|---|---|
| Sign in | Confirms role and institution | Hospital admin / identity owner | Authenticate and scope access | Authorised session |
| Search trials | Uses list or map | None initially | Retrieve and display source-linked registry facts | Trial selected by human |
| Check site | Compares registry and site-confirmed status | Research coordinator / site coordinator | Preserve two sources and verification history | Current operational answer or explicit unknown |
| Ask question | Posts in Trial room | PI / site coordinator / other oncologists | Route thread, mark official responses | Answer, task, or unresolved state |
| Follow trial | Selects useful updates | Coordinator / notification owner | Deduplicate, route, deliver, stop | Factual alert |
| Open patient | Reviews EMR sources | Treating team | Read source references and preserve provenance | Patient workspace |
| Review criteria | Enters per-criterion decision | Treating clinician | Store human state and source link | Human review record |
| Build packet | Selects records and recipient | Coordinator / approver | Version manifest, approval, expiry | Approved packet |
| Board review | Reviews packet and authors decision | Multidisciplinary board | Schedule, route, record decision reference | Signed human decision + next task |
| Site screening | Waits for trial-team response | Trial coordinator / investigator | Track acknowledgement and returned status | Trial-team eligibility outcome |
| Close loop | Reviews outcome and next step | Treating team / coordinator | Write task/status back to EMR and audit | Visible completion or unresolved work |

---

# 11. Design principles

1. **Two primary journeys, not many product modules.**
2. **Context before controls.** Show the trial or patient first; show operations inside it.
3. **Human authority is always named.** Every important status has an owner, source, and date.
4. **Unknown is a valid state.** Never convert missing information or silence into a clinical conclusion.
5. **The registry and site can disagree.** Show both rather than inventing one truth.
6. **Discussion must create resolution.** Threads should become answers, tasks, corrections, or explicit unresolved states.
7. **Alerts should lead to action, not anxiety.** Route only useful changes to named recipients.
8. **The list is for precision; the map is for spatial understanding.**
9. **Clinical content remains source-linked.** The EMR and diagnostic providers remain authoritative.
10. **No hidden matching.** Patient context must never silently change trial ordering.

---

# 12. Questions for the internal review call

## Persona and ownership

- Is the treating oncologist truly the daily primary user, or is the coordinator the operational primary user?
- Which oncology specialties need different default views?
- Who is allowed to issue an official site response?

## Trial journey

- Which missing trial details generate the most back-and-forth?
- Would oncologists join Trial rooms, or would coordinators carry most conversations?
- Which discussion categories are essential?
- What makes a site status trusted?

## Patient journey

- Should the current validation include patient-started trial review at all?
- Is a clinician-selected trial review useful without automated discovery?
- Which exact fields must be reviewed before a site enquiry?
- Who approves the referral packet?

## Alerts

- Which changes deserve an immediate alert?
- Which should appear only in a digest?
- Which roles should receive each trigger?
- What stops or expires an alert rule?

## Geographic view

- Do users search by city, state, travel radius, or network?
- Is geographic exploration useful in routine work or mainly for demonstrations?
- Which status should colour the map?
- How should approximate locations be explained?

## Scope decision

- What is the smallest journey that still tests the core value?
- Which current prototype screens should disappear from global navigation?
- Which features belong in the first oncologist session versus later concept testing?
- Does the team accept that automated patient matching is a separate clinical and regulatory product track?

---

# 13. Recommended target story for the next redesign

The next redesign should make this story immediately visible:

> Dr Meera signs in and either opens Trials or a Patient. In Trials, she can search a trustworthy source-linked library in List or Map view, follow a trial, ask the trial community or site team a question, and turn an answer into an owned enquiry. In a Patient workspace, she can review original EMR records, manually choose a trial, record criterion-level human judgements, prepare an authorised packet, involve the tumour board when needed, and hand the case to the trial team for formal screening. Trial Relay keeps the people, evidence, questions, tasks, alerts, and outcomes connected without making a clinical decision itself.

That is the product experience the screens should now be designed around.
