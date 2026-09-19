# Trial Relay — Visual Design Language and Aesthetic Guide

## Status

- **Artifact type:** target-state visual-design proposal.
- **Companion artifact:** [`TRIAL_RELAY_EXPERIENCE_BLUEPRINT.md`](./TRIAL_RELAY_EXPERIENCE_BLUEPRINT.md).
- **Audience:** product, design, frontend, clinical-safety, and research-operations teams.
- **Claim class:** **INFERENCE**. This direction has not yet been validated with oncology users or implemented in the current prototype.
- **Purpose:** establish a coherent visual grammar before the next interface redesign.
- **Boundary:** visual confidence must never imply clinical certainty, site availability, or patient eligibility.

---

# 1. Name of the design language

## Soft Spatial Systems

> A calm, layered interface in which trials, sites, people, sources, questions, and tasks feel like parts of one connected system rather than unrelated cards in a dashboard.

The aesthetic should feel:

**soft spatial · layered · tactile · intelligent · clinical but not sterile · premium enterprise · information-rich but breathable · subtly dimensional · contextual · ambient · editorial · diagrammatic · exploratory**

The design uses depth without becoming literal 3D. It borrows the spatial clarity of an architectural diagram, the operational precision of a professional work tool, and the reading comfort of an editorial document.

It should never feel like:

- a generic admin template;
- a wall of bordered panels;
- a game interface;
- a glossy consumer-health app;
- a Figma clone;
- a literal network graph everywhere;
- a futuristic “AI command centre”;
- a decorative layer placed over unclear information architecture.

---

# 2. The conceptual change

Move from:

> Here are many panels containing information.

To:

> Here is the clinical-trial system. These surfaces are different lenses into it.

The user should perceive a stable world of connected entities:

- a trial;
- its registry source;
- its India sites;
- separate site-confirmed status;
- oncology professionals and trial-side participants;
- questions and official responses;
- patient workspaces;
- human criterion reviews;
- referrals, tasks, and outcomes.

A card is not automatically a freestanding module. It may be:

- attached to a trial;
- emerging from a selected site;
- floating above an underlying source layer;
- bridging two conflicting assertions;
- showing the next action on a workflow path;
- acting as a temporary lens into one part of a larger system.

That relationship should be visible before the user reads every label.

---

# 3. Design references and what to borrow

The intended design language sits between several familiar approaches without copying any of them.

## Notion-like information architecture

Borrow:

- clear document hierarchy;
- readable content rhythm;
- calm editing and inspection surfaces;
- progressive disclosure.

Do not borrow:

- excessive page nesting;
- undifferentiated grey blocks;
- the feeling that every object is a document.

## Linear-like operational density

Borrow:

- concise status information;
- strong keyboard and focus behaviour;
- quick transitions from information to action;
- dense lists that remain readable.

Do not borrow:

- developer-tool language;
- tiny interaction targets;
- status colour used without clinical provenance.

## Figma-like spatial relationships

Borrow:

- persistent context while inspecting a selected object;
- contextual panels anchored to the current selection;
- visible relationships among objects;
- the sense that the user is navigating a shared spatial model.

Do not borrow:

- infinite canvas as the primary navigation model;
- floating controls without a stable reading order;
- graph complexity that requires training to understand.

## Modern healthcare software

Borrow:

- strong provenance;
- legible clinical content;
- explicit unknown and conflict states;
- careful permissions and role visibility;
- familiar, predictable controls at consequential steps.

Avoid:

- sterile white-and-blue sameness;
- decorative medical imagery;
- confidence-signalling colours without evidence;
- hidden clinical logic.

## Trial Relay architecture diagrams

The current C4 and runtime diagrams are the strongest internal foundation for the new direction. They already depict:

- Trial Relay as a system surrounded by registries, sites, oncologists, coordinators, boards, and research administration;
- separate sources of authority;
- connections and handoffs;
- state transitions;
- trust boundaries;
- unresolved conflicts.

The application should inherit that visual intelligence while becoming more tactile and approachable.

---

# 4. Foundational visual principles

## 4.1 Space communicates relationship

Use position, overlap, attachment, and connector lines to explain why information is present.

A site-status card should appear attached to its site, not as an unrelated panel several sections away. A registry source should read as an underlying source layer. A discrepancy should visibly bridge the two statements that conflict.

## 4.2 Depth communicates context, not importance alone

A higher surface means the user is inspecting or acting on something in context. It does not automatically mean the information is more true.

Truth and authority must still be stated through source, role, date, and label.

## 4.3 Colour is an ambient semantic signal

Use colour as a quiet field, edge, trace, relationship, or source layer before reaching for another pill.

A verified site status may have a soft green edge and low-opacity halo. A stale assertion may recede while retaining an amber age trace. A registry fact may sit on a pale blue source plane. A human-board decision may carry a plum relationship marker.

Colour never replaces text or icons.

## 4.4 One dominant entity per view

Every detailed screen should have an obvious spatial centre:

- one trial;
- one patient workspace;
- one referral;
- one conversation thread;
- one selected city or site.

Contextual information orbits that entity. Avoid six equally weighted panels competing for attention.

## 4.5 Information-rich but breathable

Density belongs inside the selected lens. Negative space belongs around important entities and transitions.

Use quiet space to separate meaning, not to make every card oversized. Operational lists can remain compact; decision, conflict, and handoff moments receive more room.

## 4.6 Asymmetry creates orientation

Prefer a stable dominant canvas plus a smaller contextual surface over a uniform grid of equal cards.

Examples:

- wide trial list with an anchored detail lens;
- trial profile centred on the trial, with source and site layers offset behind it;
- patient review with the selected criterion in the main plane and source evidence floating beside it;
- map with a contextual city panel overlapping the map edge.

## 4.7 Progressive disclosure preserves calm

Start with the entity, current state, source, and next action. Reveal raw registry text, complete history, audit data, and technical metadata when requested.

Nothing clinically or operationally important should be hidden solely for aesthetic minimalism.

---

# 5. Spatial grammar

## The five surface levels

### Level 0 — environmental canvas

The page background establishes atmosphere and orientation.

Use:

- soft mineral grey-green;
- faint topology, coordinate, or systems-grid pattern at very low contrast;
- occasional oversized geometry that suggests a system boundary;
- large quiet areas around the dominant entity.

Do not place essential information in background decoration.

### Level 1 — source layer

A source layer represents where information came from.

Examples:

- registry record;
- EMR source artifact;
- official site response;
- tumour-board decision;
- trial-team screening result.

Source layers sit visually behind the interpreted or operational surface. They use quiet tints, compact provenance labels, and visible dates.

### Level 2 — entity surface

The entity surface is the stable object the user is working with:

- trial;
- site;
- patient workspace;
- referral;
- task;
- discussion thread.

It should have the clearest edges, strongest typography, and most predictable interaction.

### Level 3 — contextual lens

A contextual lens opens because the user selected something.

Examples:

- trial detail beside results;
- city details over the map;
- criterion evidence beside a patient review;
- official response attached to a Trial-room thread.

Lenses may float or overlap, but must remain visibly anchored to their originating object.

### Level 4 — transient action surface

Use for:

- confirmation;
- recipient selection;
- approval;
- secure packet release;
- destructive or irreversible operations.

Consequential actions remain visually conventional and unambiguous. Do not make safety confirmations artistic puzzles.

---

# 6. Relationship grammar

## Connectors

Connecting lines should explain a real relationship, not decorate empty space.

Recommended connector types:

- solid: current direct relationship;
- dotted: proposed, approximate, or pending relationship;
- fading: historical or expired relationship;
- double-ended amber: explicit conflict between two statements;
- directional arrow: handoff or state transition.

Every non-decorative connector needs a label, legend, or accessible text equivalent.

## Nodes

Use nodes for entities that participate in a relationship:

- site;
- source;
- person or role;
- task;
- review state;
- referral step.

Nodes should remain simple. Avoid using a graph when a short list or timeline is easier to understand.

## Anchoring

A contextual panel should visually belong to its origin through at least one of:

- shared edge colour;
- short connector line;
- aligned geometry;
- matching source marker;
- overlap from the selected object;
- repeated identifier.

Floating without anchoring creates ambiguity.

## Contextual overlap

Overlap should communicate “this is inspecting that,” not merely create visual novelty.

Limit a composition to one strong overlap at a time. Nested floating cards quickly recreate clutter in three dimensions.

---

# 7. Colour system

The current palette should remain recognisable. Preserve the existing semantic family while moving colour away from constant pills and borders into ambient fields, source planes, traces, and relationship markers.

## Foundation palette

| Role | Existing direction | Recommended use |
|---|---:|---|
| Canvas | `#EDF1EF` | Environmental background |
| Primary surface | `#FBFCFB` | Main entity and reading surfaces |
| Secondary surface | `#F4F7F5` | Nested regions and quiet controls |
| Primary ink | `#182630` | Headings and essential content |
| Secondary ink | `#33434C` | Body and operational content |
| Muted ink | `#68777E` | Supporting metadata |
| Rule | `#D3DCD8` | Quiet separators and boundaries |
| Navy | `#173D5B` | Structure, selection, primary action |
| Blue | `#245D86` / `#E4EFF7` | Registry and source layers |
| Green | `#176B50` / `#E2F1EA` | Verified human state and completion |
| Amber | `#9B5B13` / `#FFF1D9` | Age, conflict, unknown, attention |
| Red | `#A33D47` / `#FAE8E9` | Blocking failure or unsafe action |
| Plum | `#685277` / `#EEE9F2` | Human deliberation, board, collaboration |

These values are the starting palette, not a guarantee that every pair meets contrast in every usage. Foreground/background pairs must be contrast-tested during implementation.

## Semantic use

### Navy — structure and focus

Use for:

- active navigation;
- current selection;
- primary action;
- system boundary;
- strong structural labels.

Navy should not mean “clinically recommended.”

### Blue — source and registry

Use for:

- registry-derived information;
- source layers;
- external reference records;
- provenance paths.

A registry source can appear as a pale blue plane extending slightly behind the trial surface.

### Green — human-verified current state

Use for:

- current site-confirmed status;
- completed authorised handoff;
- verified response;
- reconciled state.

Use a subtle green halo, edge light, or relationship marker before using a large green fill.

Green means “verified or complete under the named authority,” not “clinically good” and not “eligible.”

If an authorised response confirms that a site is closed or not accepting enquiries, restrict green to the provenance marker. Present the operational status itself in neutral text so “verified” is not confused with “available.”

### Amber — age, discrepancy, unknown, action needed

Use for:

- expiring or stale verification;
- registry/site disagreement;
- unresolved question;
- missing information;
- required review.

An expired assertion can recede in opacity while leaving a narrow amber trace and explicit text.

Amber should not become a generic decoration colour.

### Red — blocked or unsafe

Reserve red for:

- failed delivery;
- revoked access;
- invalid approval;
- unsafe or irreversible action warning;
- a system state that prevents continuation.

Do not use red automatically for a trial-team ineligibility decision. That decision should be presented neutrally with source and authority rather than moralised as an error.

### Plum — human deliberation and collaboration

Use for:

- tumour-board activity;
- human-authored decision surfaces;
- Trial-room conversation;
- role relationships;
- collaborative review.

## Colour application hierarchy

Use semantic colour in this order:

1. small relationship marker or icon;
2. edge or underline;
3. low-opacity ambient field;
4. soft halo;
5. full fill only when sustained attention is required.

Avoid combining all five on one object.

---

# 8. Depth, light, and material

## Surface material

Surfaces should feel like softly lit paper and translucent instrumentation, not glossy glass.

Recommended qualities:

- warm off-white rather than pure white;
- one-pixel low-contrast boundaries;
- controlled corner radii;
- directional shadows with broad, low-opacity falloff;
- translucency reserved for contextual lenses;
- restrained backdrop blur where contrast remains sufficient.

## Shadow hierarchy

Use a small, consistent depth scale:

- **Resting surface:** nearly flat; boundary carries most of the separation.
- **Selected entity:** short soft shadow and a structural edge.
- **Contextual lens:** larger directional shadow, clearly anchored.
- **Transient action:** strongest shadow, short-lived.

Avoid a separate shadow recipe for every component.

## Gradients

Use gradients only for:

- very quiet environmental light;
- fading a relationship into history;
- soft semantic halos;
- differentiating spatial layers.

Do not use gradients as button decoration, branding gloss, or substitutes for hierarchy.

## Translucency

Use high-opacity translucent panels, approximately 92–97% visual solidity. The user should sense the underlying context without struggling to read foreground text.

Translucency must fall back to an opaque surface when:

- contrast is insufficient;
- reduced transparency is requested;
- the device performs poorly;
- the panel contains dense clinical content.

## Background geometry

Occasional oversized circles, arcs, region boundaries, or topology lines may establish spatial atmosphere.

Rules:

- stay below normal content contrast;
- never resemble actionable controls;
- never imply data that are not present;
- disappear in print;
- simplify or disappear on mobile.

---

# 9. Typography

Preserve the useful hierarchy already present in the prototype.

## Interface type

Use the existing humanist sans direction:

`Avenir Next → Avenir → Segoe UI → Helvetica → Arial → sans-serif`

Use it for:

- navigation;
- controls;
- operational lists;
- status and metadata;
- messages and tasks.

## Editorial type

Use the existing reading serif direction:

`Charter → Iowan Old Style → Georgia → serif`

Use it selectively for:

- major entity titles;
- section openings;
- patient or trial narrative summaries;
- empty-state or orientation language.

Do not set dense tables or control labels in the serif face.

## Data type

Use the existing monospace direction:

`SFMono-Regular → Consolas → Liberation Mono → monospace`

Use it for:

- trial identifiers;
- timestamps where alignment matters;
- version references;
- machine or source states;
- compact audit metadata.

## Hierarchy principles

- One major editorial heading per view.
- Use sentence case for navigation and controls.
- Use uppercase only for small provenance or state labels.
- Keep body text compact but not compressed.
- Give source text and protocol wording enough line height for careful reading.
- Prefer weight and spacing to repeated boxes.

---

# 10. Core component patterns

## Entity field

The stable spatial region representing a trial, patient workspace, site, referral, or thread.

It includes:

- identity;
- current state;
- source and date;
- primary next action;
- visible relationships.

## Source plane

A tinted layer behind an entity that exposes provenance.

Examples:

- blue registry layer;
- neutral EMR source layer;
- green official site-response layer;
- plum board-decision layer.

The source plane always carries source name, role, and date.

## Context lens

An inspectable panel attached to a selection.

Examples:

- trial details from a result;
- site status from a map marker;
- evidence for one criterion;
- participant details from a Trial-room message.

It should close cleanly and return focus to its origin.

## Status trace

A narrow edge, halo, or line showing state without occupying another row of pills.

The trace is always paired with readable state text.

## Conflict bridge

Two source surfaces remain visible, joined by an amber relationship line and a concise discrepancy statement.

Example:

```text
Registry: Recruiting — dated 16 Sep
          ⇄ status not reconciled
Site: Awaiting confirmation — checked 18 Sep
```

Do not collapse these into one synthetic answer.

## Handoff path

A small spatial sequence showing ownership and state:

`Draft → Approved → Sent → Acknowledged → Screening → Outcome`

The current step is spatially dominant. Completed steps recede; blocked steps expose the owner and reason.

## Provenance marker

A compact source/date/role marker that can expand into the source plane. It replaces repeated long provenance text without hiding it.

## Relationship chip

A small control for jumping to a connected object—for example, “3 India sites,” “2 open questions,” or “Referral #R-021.”

It differs from a status pill: it navigates to a relationship.

---

# 11. Page-level composition recipes

## Home

Use a quiet field with two dominant entry entities:

- Find or follow a trial
- Work with a patient

Place recent work and Inbox items in one contextual rail rather than a grid of metrics.

A faint systems path can connect recent trials, questions, and referrals, but the page must remain immediately understandable without it.

## Trial library

Default to a precise list with strong reading rhythm. The selected trial opens in an anchored context lens.

Use:

- compact search and filters;
- persistent result count and source date;
- List/Map view control;
- ambient source/status traces on results;
- negative space around the selected detail.

Avoid enclosing every metadata value in a pill.

## Trial profile

Make the trial the dominant entity. Arrange source, site, discussion, and referral surfaces around it as connected lenses.

Possible composition:

- trial title and current registry layer at centre;
- site-status plane offset to the right;
- Trial-room activity attached below;
- provenance path behind;
- next action in a focused contextual rail.

Preserve a conventional reading order for accessibility.

## Patient workspace

The patient workspace remains calm and private. The source record, human review, and trial-team outcome must look like distinct authority layers.

Use side-by-side spatial comparison only where it improves criterion review. On smaller screens, flatten it into an explicit sequence:

`Criterion → Source record → Human review state → Next action`

Do not visualise the patient as a node in a public or collaborative trial graph.

## Trial room

Use an editorial conversation timeline attached to the trial entity.

Official responses can extend into a green source plane. Informal discussion remains plum-accented. Actions derived from a thread appear as connected task nodes rather than unrelated queue entries.

## Inbox

Use a flowing operational list, not tiles.

Group by:

- Updates
- Messages
- Tasks

Each row gets one quiet semantic trace, source, owner, and due state. Opening an item reveals a contextual lens without losing Inbox position.

## Geographic view

Use the soft 2.5D India diorama defined in the experience blueprint. The map is a spatial lens over the same Trial-library data, not a separate product world.

Keep map panels, markers, and semantic colours consistent with the rest of the system.

---

# 12. Motion and interaction

Motion should explain spatial continuity.

## Appropriate motion

- a contextual lens emerging from its selected object;
- a source plane sliding slightly into view;
- a relationship line drawing once when a discrepancy is revealed;
- a list-to-map selection retaining its spatial identity;
- a completed handoff step settling into the path.

## Timing

- direct control response: approximately 100–150 ms;
- contextual lens transition: approximately 160–220 ms;
- larger view transition: approximately 220–300 ms.

These are implementation starting points, not mandatory tokens.

## Avoid

- constant floating or pulsing;
- decorative parallax during routine clinical work;
- animated semantic halos;
- spring motion on serious state changes;
- long staged entrances;
- motion that delays reading or action.

Respect `prefers-reduced-motion`. The reduced-motion experience must preserve all state and relationship information.

---

# 13. Responsive behaviour

## Large desktop

Use the full spatial grammar:

- dominant entity plane;
- one contextual lens;
- relationship lines;
- asymmetric composition;
- generous environmental canvas.

## Standard laptop and tablet

Reduce empty perimeter space, shorten connectors, and keep at most two visible planes. Do not shrink text to preserve a desktop composition.

## Mobile

Flatten the spatial model into a clear reading and action sequence.

- Contextual lenses become bottom sheets or inline expansions.
- Relationship lines become labelled rows or a compact timeline.
- The map becomes flat and simplified or defaults to List view.
- Oversized background geometry disappears.
- Primary actions remain reachable without covering source or state information.

Responsive design should preserve relationships semantically rather than reproducing desktop coordinates.

---

# 14. Accessibility and safety

## Non-negotiable requirements

- Meet WCAG 2.2 AA contrast for all operational text and controls.
- Visible keyboard focus; retain the strong amber focus-ring direction.
- No state communicated by colour, blur, position, or depth alone.
- Complete keyboard access to contextual lenses, map markers, threads, and relationship controls.
- Logical DOM and screen-reader order independent of visual overlap.
- Focus returned to the originating object when a lens closes.
- Meet WCAG 2.2 AA target-size requirements; primary touch actions should aim for at least 44 × 44 CSS pixels.
- Reduced-motion and reduced-transparency behaviour.
- Opaque print styles with source and date preserved.

## Safety language

Visual styling must preserve distinctions among:

- registry-declared fact;
- site-confirmed operational state;
- clinician-confirmed fact;
- human judgement;
- trial-team eligibility outcome;
- unknown or unresolved state.

A green glow must never transform an uncertain or unauthorised assertion into apparent truth.

---

# 15. Content and microcopy

The visual language should be matched by calm, direct writing.

Prefer:

- Registry status
- Site-confirmed status
- Awaiting confirmation
- Source updated 16 Sep 2026
- Official site response
- Needs human review
- Next step: contact trial coordinator

Avoid:

- Smart match
- Best option
- AI verified
- Qualified
- Optimal trial
- Patient score
- Success probability

Headings should orient the user. Labels should identify authority and state. Help text should explain consequences rather than repeat the field name.

---

# 16. Do and do not

## Do

- establish one dominant entity;
- connect panels only when a real relationship exists;
- use the existing semantic palette as ambient state;
- preserve source, authority, and date;
- create quiet space around important decisions;
- let detail appear in context;
- show conflicts side by side;
- preserve a conventional reading order beneath the spatial composition;
- allow operational lists to remain compact.

## Do not

- place every fact inside a bordered card;
- create dashboards from equal-size widgets;
- use pills as the only status language;
- stack multiple floating layers;
- draw decorative connectors;
- use translucency behind dense protocol text;
- turn every relationship into a graph;
- use green to imply eligibility or clinical recommendation;
- use red to moralise an adverse or ineligible clinical outcome;
- make safety-critical actions unconventional;
- let visual ambition hide provenance or unknown states.

---

# 17. Implementation sequence

## Stage 1 — structural redesign

Before adding depth:

1. Reduce global navigation to Home, Trials, Patients, and Inbox.
2. Establish one dominant entity per view.
3. Remove equal-weight panel grids.
4. Put contextual features inside trial and patient workspaces.
5. Preserve responsive reading order.

## Stage 2 — semantic visual system

1. Apply exact source and authority layers.
2. Replace repeated pills with status traces where appropriate.
3. Add conflict bridges and handoff paths.
4. Standardise provenance markers.
5. Contrast-test the retained palette.

## Stage 3 — spatial refinement

1. Add anchored contextual lenses.
2. Introduce restrained overlap and directional shadows.
3. Add faint topology and background geometry.
4. Apply motion that preserves origin and destination.
5. Build the List/Map continuity.

## Stage 4 — validation

Test with oncology users whether they can answer, without instruction:

- What is the main object on this screen?
- Which information came from the registry?
- Which status was independently confirmed?
- What is unknown or in conflict?
- Who owns the next action?
- How do I return to where I was?

If the spatial treatment makes any answer less clear, simplify it.

---

# 18. Design-review checklist

A screen is ready for review only if:

- [ ] The dominant entity is obvious within five seconds.
- [ ] Primary navigation is unchanged and predictable.
- [ ] Contextual panels are visibly anchored.
- [ ] Every connector represents a real relationship.
- [ ] Registry, site, clinician, board, and trial-team authority remain distinct.
- [ ] Semantic colour has a text or icon equivalent.
- [ ] Unknown, stale, conflict, and blocked states are visually distinct.
- [ ] The design works without animation or transparency.
- [ ] Keyboard and screen-reader order remain coherent.
- [ ] The mobile version preserves the workflow rather than the coordinates.
- [ ] Dense content remains readable.
- [ ] The screen avoids equal-weight card-grid composition.
- [ ] No aesthetic signal implies patient eligibility or treatment recommendation.

---

# 19. North-star description

> Trial Relay should feel like opening a calm, living systems diagram. The current trial or patient workspace occupies the centre. Registry records, site confirmations, human discussions, source evidence, and next actions appear as connected layers around it. Colour behaves like ambient evidence: blue reveals source, green shows current authorised confirmation, amber exposes age or conflict, plum indicates human deliberation, and red is reserved for blocked or unsafe system states. Contextual panels overlap only when they belong to the selected entity. The interface remains precise enough for operational work, spacious enough to think, and conventional wherever safety or irreversible action demands it.

This is the aesthetic foundation for the next web-application redesign.
