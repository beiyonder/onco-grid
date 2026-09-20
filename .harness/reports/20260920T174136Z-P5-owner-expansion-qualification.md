# Work report — P5 C3 owner-authorized expansion qualification

## Problem

The owner authorised seven previously gated capabilities plus trial-level patient/cohort review, approved de-identified research import, and readable registry criteria. These capabilities span clinical-risk language, file ingestion, external official sources, generative AI, authenticated realtime communication, audited handoff state, and geospatial visualization. An integrated qualification was required to prove that the implementation remained explicit, source-led, no-ranking, no-PHI, fail-closed, responsive, accessible, and honest about unconfigured live services.

## Decision

Qualify the complete expansion chain from pull requests `#27`–`#32` while preserving the narrower owner choices: criterion/source coverage only; strict browser-only approved research import; deterministic unranked cohort and trial filters; official-source evidence; pinned cheapest source-only AI with citations and no patient context; Supabase authenticated no-PHI communication/handoff; and an approximate Three.js registry geography lens. Do not use the exposed OpenAI credential. Treat live Supabase/OpenAI acceptance as blocked—not passed or mocked—until approved project configuration and a rotated server secret are supplied outside chat.

## Evidence

- Registry criteria — `NCT05732805` renders 10 Inclusion and 28 Exclusion rows with 12 nested bullets; `NCT06345729` renders 7 Inclusion and 16 Exclusion rows. Exact text, order, source numbers, keyboard disclosure, responsive layout, and print expansion remain intact.
- Patient/trial action — Trial Detail exposes existing-workspace review and strict approved research import. Both routes enter manual criterion review; no system criterion state, score, ranking, recommendation, close-match label, or eligibility conclusion is produced.
- Import rejection — extra identity key `patientName` was rejected. Approved test JSON created `RID-001` with three `Approved de-identified research data` facts; reload removed the workspace and approval reference.
- Cohort filtering — explicit `Diagnosis context · contains · lung` returned 2 of 4 browser workspaces after approved import (Synthetic Cedar plus Approved research workspace 1). Results were unranked and did not use close-match language.
- Assisted discovery — Phase 3 remained visible in the exact input trace, returned 187 of 285 public trials, and drove both List and Map without patient-conditioned order.
- Official evidence — live `NCT06345729` comparison returned Recruiting, 8 Sept 2026, and four India locations, each unchanged from the dated snapshot. No contact, email, or phone appeared. Blocking the official API produced a labelled failure; Retry recovered all three evidence cards.
- AI safety contract — endpoint requires Supabase bearer identity, pinned `gpt-5-nano-2025-08-07`, sanitized official source, bounded room context, citations, no storage, and generated/not-official authority. It rejects patient, matching, eligibility, recommendation, contact, identifier, extra-field, and non-official citation input. With no identity/config, UI failed before any model request.
- API tests — 8/8 passed: model pin, valid source-only question, patient/identifier rejection, extra/source rejection, NCT validation, evidence sanitization, malformed ID rejection, and missing-Supabase fail-closed behavior.
- Supabase security contract — migration defines auth profile trigger/backfill, staff directory, room membership, RLS message reads/inserts, same-room replies, admin-only official authority, narrow grants, revoked anon/default function access, realtime publications, random no-PHI relay references, participant RLS, creator/recipient transition authority, and append-only audit events.
- Supabase client boundary — absent configuration showed `Pilot services off · Fail-closed configuration`; synthetic Trial Room and handoff simulation remained visibly separate; anonymous live controls did not render. No service-role key exists in browser or repository configuration.
- Live-service blocker — no Supabase project/credentials or local Docker/CLI exist, so live magic-link, migration application, RLS, realtime two-user messaging, official-role grant, recipient acknowledgement, and live OpenAI output remain unobserved and explicitly blocked.
- Spatial lens — unfiltered map rendered a geographically shaped Natural Earth India diorama with 69 approximate clusters, 1,715 placed sites, 102 unplaced sites, and 56 trials with unplaced sites. Phase 3 drove 66 clusters / 1,297 placed / 79 unplaced / 47 affected trials.
- Spatial accessibility — all 69 clusters are keyboard-accessible. Selecting Mumbai updated context and exposed eight source-linked trial actions. Opening `NCT05732805` and returning preserved `?view=map`, active view state, filters, and canvas.
- Spatial precision — visible source and legend distinguish city/state centroids and unplaced sites; copy denies patients, routes, travel time/cost, service capacity, current availability, and enrolment access. Boundary generation was checksum-reproducible.
- Desktop integrated flow — Home → Phase 3 spatial lens → official evidence → approved research import → criterion review → Trial Room assistant fail-closed → Patient Handoff fail-closed completed with zero console warnings, console errors, or page errors.
- Mobile matrix — Home, List, Spatial lens, Trial Detail, Trial Room, Patient list, and Handoff each had zero horizontal overflow and 13px minimum visible text at 390×844. Coverage dialog measured 390px and focused its heading.
- Reduced/print — reduced motion retained a static rendered map; reduced transparency removed glass/shadows; print hid WebGL and exposed all 69 accessible clusters, coverage counts, boundary source, and unplaced totals.
- Build — browser/API typechecks, 8 API tests, map generation, Vite build, and `npm audit` passed. Vite split application (497.68kB / 155.30kB gzip), Supabase (214.54kB / 55.04kB), and Three.js (588.92kB / 147.40kB) chunks without a size warning.
- Repository checks — research ledger passed 70 records; trial snapshot passed 285; whitespace and Serena memory checks passed; Serena indexed 4 Python and 43 TypeScript files and health check passed; secret/key/email scans found no matches; known sensitive inputs remained ignored.

## Risks and gaps

The largest gap is live service qualification. SQL and typed clients are not evidence that RLS, realtime, email delivery, role administration, multi-user authority, audit retention, or model output work in an actual project. The exposed OpenAI key must be revoked; it was not used. Approved de-identification remains an institutional responsibility that client validation cannot prove. AI output remains non-deterministic and unevaluated for factuality, omission, citations, authority confusion, abuse, and cost. Approximate centroids and Natural Earth geometry cannot support travel/access decisions. Three.js adds material transfer cost. Direct oncology-user workflow fit and product lock remain unproven.

## Next

The repository owner must configure an approved Supabase project and rotated server-side `OPENAI_API_KEY` through secret stores, apply the migration, create two or more test staff accounts, administratively grant one site member official-response authority, and run the documented live auth/realtime/handoff/AI matrix. Separately authorize participant recruitment before Phase 6 workflow sessions. Stop or simplify any capability that causes eligibility, recommendation, current site availability, PHI transmission, or AI authority confusion.

## Sign-off needed

No separate owner review is required to merge the integrated qualification report under the autonomous implementation-merge decision. Owner/institutional sign-off remains required for secret injection, Supabase project/deployment, migration application, staff invitation, role grants, retention/backups/monitoring/incident response, live OpenAI use, any real dataset, any PHI, external clinical handoff, precise geospatial/access data, participant recruitment/contact, interpretation of Phase 6 evidence, `P5` closure, and product lock.
