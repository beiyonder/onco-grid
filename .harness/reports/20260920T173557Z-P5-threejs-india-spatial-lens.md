# Work report — P5 C2 Three.js India spatial lens

## Problem

The owner authorised a soft, playful 2.5D India map for geographic exploration, but the available trial snapshot contains registry-listed city/state text rather than a complete authoritative geospatial, route, capacity, or site-availability source. A conventional access-planning map could therefore overstate precision and imply travel feasibility or current enrolment access. The prior static lens also did not satisfy the requested diorama-like spatial experience.

## Decision

Build a Three.js diorama over the same filtered Trial Library dataset. Generate and commit a reproducible India national outline from Natural Earth via `world-atlas` countries-50m; render shallow terrain extrusion, warm base, low-poly vertical site markers, floating city labels, soft lighting/shadows, and restrained orbit controls. Place registry sites only through the previously approved curated city centroids or labelled state-centroid fallback. Expose all coverage counts and unplaced records, provide a keyboard-accessible cluster list and trial links, preserve List/Map filter and return continuity, and repeatedly state that the lens does not provide routes, travel time, access, capacity, or site availability.

## Evidence

- Reproducible boundary — `npm run generate:map` produced the same `india-boundary.json` SHA-256 before and after regeneration: `7681721f06d3322c0d9b8885232f39c8c26cdcca29b0720f0100a95d58e18937`.
- Boundary provenance — UI names `Natural Earth via world-atlas countries-50m` and labels it a small-scale national outline rather than an administrative or routing boundary.
- Complete snapshot coverage — the unfiltered 285-trial lens rendered 69 approximate clusters, 1,715 placed India site records, 102 unplaced site records, and 56 trials with at least one unplaced site; total filtered India sites were 1,817.
- Precision visibility — city-centroid markers are blue, state-centroid fallbacks amber, and unplaced coverage is separately counted. No patient coordinates exist.
- Spatial interaction — desktop WebGL rendered the extruded India outline, raised markers, 14 floating high-volume labels, soft shadows, warm glass legend/context panels, tilt/zoom controls, and selectable markers.
- Accessible parity — the accessible list contained all 69 clusters. Keyboard selection changed New Delhi to Mumbai; the context updated and exposed eight source-linked trial buttons without relying on canvas pointer input.
- Route continuity — opening `NCT05732805` from the Mumbai cluster kept Trials as the parent navigation; Back restored `#/trials?view=map`, the active Spatial lens button, and a live canvas.
- Filter continuity — `Phase: Phase 3` remained visible in the assisted-discovery trace, reduced the library to 187 trials, and drove the same map to 66 clusters, 1,297 placed sites, 79 unplaced sites, and 47 trials with an unplaced site.
- Safety copy — the visible boundary states approximate placement only and explicitly denies patients, routes, travel time, service capacity, current site availability, and enrolment access.
- Responsive — at 390×844, the canvas measured 318.8px, spatial and context grids flattened to one column, coverage remained a readable two-column summary, all 69 accessible clusters remained available, minimum visible text was 13px, and page overflow was zero.
- Reduced presentation — with reduced motion/transparency emulated, the canvas rendered without an animation loop, glass surfaces became opaque, shadows disappeared, and page overflow remained zero. Print hides the canvas and expands the accessible cluster list and coverage.
- Browser health — desktop and mobile Map runs produced zero console warnings, console errors, or page errors.
- Build — Vite transformed 99 modules and split explicit `three-spatial` (588.92kB / 147.40kB gzip), `supabase-pilot` (214.54kB / 55.04kB gzip), and application (497.68kB / 155.30kB gzip) chunks without a large-chunk warning. `npm audit` found 0 vulnerabilities.

## Risks and gaps

The geometry is a small-scale national outline and the marker centroids are curated approximations. Facility coordinates, roads, travel modes/times, cost, service capacity, accessibility, referral restrictions, and current enrolment availability are absent. Dense clusters intentionally aggregate many sites/trials and can obscure local variation. The Three.js runtime increases transferred JavaScript despite vendor chunk separation. This lens may support geographic orientation only; direct observation must establish whether that changes a real workflow decision.

## Next

Merge this slice and run integrated qualification across coverage/import, evidence feed, assistant policy, Supabase fail-closed behavior, RLS/handoff contracts, spatial List/Map continuity, responsive/accessibility/reduced/print states, dependency audits, and privacy scans. Live Supabase and OpenAI behavior remains separately blocked until approved configuration and rotated secrets exist.

## Sign-off needed

No separate owner review is required for this authorised approximate spatial lens. Owner/institutional sign-off plus authoritative geospatial/service data is required before adding real facility coordinates, directions, travel time/cost, capacity, access claims, or availability. The map must not be used for patient-specific decisions or represented as access planning beyond approximate registry orientation.
