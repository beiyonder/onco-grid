# Work report — P5 C2 Geographic Trial view

## Problem

The accepted Trial library exposed a disabled Map control. Users could not explore the same filtered registry dataset geographically or retain selection across List and Map. The snapshot contains city/state text but no approved coordinate or administrative-boundary source, so a literal detailed map would risk fabricated precision, unapproved external data, and implied site availability or travel feasibility.

## Decision

Deliver Phase 5 slice 1 on `feat/geographic-trial-view` as an explicit approximate coordinate lens, not an administrative-boundary map. Use the India longitude/latitude extent, a small curated table of approximate common-city centroids, and labelled state-centroid fallback when a city is not curated. Leave sites unplaced when neither placement exists and report exact unplaced coverage. Cluster all registry-listed locations for the same filtered trial set; marker size reflects matching-trial count only. Make clusters keyboard-selectable, attach source/status trial rows, preserve selected trial and filters across List/Map, and retain List as the complete canonical representation.

## Evidence

- Initial continuity — List loaded 285 real registry trials with Map enabled. Switching to Map preserved selected `NCT06764875`, filters, source date, and result count semantics.
- Complete filtered-set lens — 285 trials produced 64 placed clusters. Map context explicitly reported 106 unplaced registry-listed sites across 60 trials; those records remained available in List.
- Approximate placement — the selected Delhi/New Delhi cluster stated `Approximate city centroid`, 147 matching trials, 247 registry-listed sites, and 86 named facilities. A fallback Kerala marker stated `Approximate state centroid · city not geocoded` in visible context and its accessible label.
- No implied availability — map header, amber boundary note, selected-cluster warning, and marker labels stated that markers are sites, not patients, and do not represent travel feasibility, capacity, independent site confirmation, or current enrolment availability.
- Filter continuity — searching Mumbai in Map retained `161 registry trials · all filtered registry locations`; the same filter returned `161 registry trials · showing first 60` in List. Search text remained `Mumbai` throughout.
- Selection continuity — choosing `NCT06764875` in selected cluster returned to List, preserved exact NCT selection, selected-card state, source-first profile, search text, and focus on `trial-profile-title`.
- Keyboard interaction — cluster buttons exposed trial/site counts and placement precision through accessible labels. Selecting a fallback cluster retained focus on the re-rendered marker.
- Empty state — an impossible search yielded zero markers and `No placeable locations` while staying in Map; Reset restored 285 trials and 64 clusters without changing mode.
- Desktop at `1440×1000` — coordinate field, 64 source-derived clusters, warnings, and selected-cluster trial rail fit without horizontal overflow. Narrow mobile at `390×844` — Map and context flattened to one column, the coordinate field used a 420 px height, only the selected marker label remained visible, and page `scrollWidth = clientWidth = 390`.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final map reload produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

City/state centroids are deliberately approximate internal presentation metadata, not a new authoritative geographic source. The view makes no state-boundary or facility-coordinate claim and cannot support distance, routing, travel, or access decisions. Text search filters trials; Map displays all retained India sites for those matching trials. Unplaced coverage remains material and visible. User validation must determine whether geographic exploration is useful. P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then implement Phase 5 slice 2: restrained source/entity/context lenses and relationship paths that visibly anchor trial, registry, site status, Trial room, packet, and handoff without decorative or misleading connectors.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any authoritative map/boundary/geocoder source, precise coordinates, route or travel feature, real patient location, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
