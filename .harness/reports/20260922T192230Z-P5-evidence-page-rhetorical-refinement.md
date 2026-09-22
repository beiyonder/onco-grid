# Work report — P5 C2 Evidence-page rhetorical refinement

## Problem

**OBSERVED:** Owner review identified three related failures on `/trials/evidence`: text sat too close to surface borders, alignment and overflow felt unfinished, and the page repeatedly explained what each section was and was not before the user could act. The result was rhetorically defensive rather than useful: orientation, methodology, and safety language competed with the actual evidence tools.

The source cause was concrete. Base `.surface` styling supplies border, radius, background, and shadow but no padding; `.evidence-section` previously added only bottom margin. Section headings, filters, and tables therefore aligned directly against the surface boundary. The copy hierarchy also repeated qualifications in the page header, safety banner, seven section headings, every publication card, every institution card, and every deterministic abstract.

## Decision

Reframe the page around one sequence: **orient → show coverage → let the user act → disclose method on demand**.

Keep only three kinds of information permanently visible:

1. the page purpose in one sentence;
2. one short invariant safety line;
3. high-consequence states such as `Not India availability` and `WIP · not connected`.

Move methodology, provenance qualifications, and “what this is not” copy into section-level information disclosures. Four patterns were considered:

- keep all caveats visible — rejected because it caused the reported clutter;
- hover-only tooltips — rejected because they fail touch and keyboard users;
- modal or side-drawer help — rejected as too heavy for short local explanations;
- native `<details>` information tips — selected because the same small `i` control supports hover on precise-pointer devices and click, tap, and keyboard activation everywhere.

Use one information tip per section rather than repeating caveats per result. Remove repeated publication-match and institution-boundary paragraphs from every card. Keep the institution cards’ intended services as concise operational labels. Replace verbose stat descriptions with short source facts. Add consistent internal section padding, a heading divider, larger table-cell insets, minimum-width and overflow-wrap constraints, and mobile-specific layout rules.

## Evidence

- All seven evidence sections now use consistent internal padding: 25px desktop and 17px at 390px mobile. Heading and table left/right insets matched exactly within the tested surfaces.
- Desktop and mobile checks found zero overflowing headings, paragraphs, labels, list items, or definition values and zero page-level horizontal overflow. Wide evidence tables remain inside deliberate horizontal scrollers.
- The page header is one sentence. The persistent safety banner is one compact line with an information control. Stat cards now use short source facts rather than explanatory paragraphs.
- Seven section-heading explanation paragraphs were removed. The initial page exposes nine small information controls: the page boundary, seven section methods, and the selected abstract method. Global result abstracts remain collapsed until requested.
- The information control opens on mouse hover without changing state, toggles persistently on click/tap, and opens from keyboard `Enter`. Its accessible label matched the section question. Desktop popovers stay anchored to the control; mobile popovers become a fixed 16px-inset panel above the 64px bottom navigation.
- Publication cards no longer repeat the combined-query caveat. Institution cards no longer repeat non-endorsement prose; each keeps a `WIP proxy` badge and the concise intended jobs: authorised owner, verification, acknowledgement/routing, and freshness/correction audit.
- Loaded desktop flow rendered 20 global trials and five publication cards with zero repeated legacy caveat elements, zero horizontal overflow, zero console warnings/errors, and zero page errors.
- Loaded mobile flow flattened global and publication cards to one column, preserved the table scrollers and 64px navigation, and produced zero text or page overflow.
- `npm test` passed 16/16 policy, source-contract, and deterministic-model tests. `npm run build` passed TypeScript and Vite across 106 modules.
- `python3 research/validate_ledger.py` passed 79 retained records; the trial snapshot passed 285 records; `npm audit --omit=dev` found 0 vulnerabilities.
- Serena re-indexed 56 source files (`python=4`, `typescript=52`); project health and memory-reference checks passed. `git diff --check` passed.
- The intended publication set contained no secret-shaped values or email addresses; private raw notes, the expanded DOCX, and `.private/` remained ignored.
- Pull request `#45` passed Vercel preview checks and merged the rhetorical/spacing refinement to `main` as `04cba84`; production deployment `dpl_FiuLA1GDRNjef9KKTAMnx6QqwX24` reached `Ready`.
- Final live review found the coverage-table action still wrapped awkwardly at the viewport edge. Pull request `#46` shortened it to `View abstract`, enforced one-line rendering, and merged as `087fbca`; production deployment `dpl_CxS8Qz3pTkcFNMhw6FA2ZPX7g2hj` reached `Ready`.
- Final production verification retained 25px insets across all seven desktop sections, nine initial information controls, a one-line table action, zero overflowing text, and zero page-level overflow.

## Risks and gaps

Progressive disclosure makes detailed qualifications one interaction away. The short persistent boundary, source/status chips, and WIP state remain visible so the interaction never hides a consequential claim. Hover is enhancement only; touch and keyboard activation use the native disclosure state. Popovers intentionally overlay nearby content while open instead of expanding and shifting the page.

This refinement improves readability and information flow but does not validate clinician comprehension, evidence usefulness, or task completion. `P5`, structured clinician workflow observation, product lock, institution authority, and live pilot-service configuration remain open.

## Next

In the next clinician session, observe whether users discover the information controls when needed, whether the persistent safety line is sufficient, and whether users reach coverage, drug, global-search, and publication actions without reading methods first.

## Sign-off needed

No separate owner sign-off is required under the authorised evidence-workspace implementation and autonomous merge/deployment decisions. Owner confirmation remains required for external institution contact, new restricted sources or terms, publication full-text use, patient facts, or clinically interpretive cross-trial output.
