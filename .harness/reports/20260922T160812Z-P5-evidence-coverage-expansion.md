# Work report — P5 C2 Evidence coverage expansion

## Problem

**SOURCE CLAIM:** One de-identified oncologist found the 285-record India snapshot too narrow, perceived missing cancer coverage, requested broader global trials, clearer abstracts, drug-centred discovery, publication links, specialist-centre connections, and a same-drug report spanning populations and time. The owner then authorised the recommended implementation order and required institution connections to remain explicit WIP proxies that explain their intended service.

The implementation had to increase evidence breadth without making global records look locally actionable, treating PubMed indexing as proof of peer review or primary-publication linkage, implying that a proxy institution participates, or turning cross-trial facts into clinical interpretation, patient matching, eligibility, ranking, or treatment recommendation.

## Decision

Keep `/trials` as the dated India-actionable source layer and add `/trials/evidence` as a distinct evidence workspace. Implement five bounded capabilities:

1. A transparent India cancer-coverage matrix that retains normalized display labels beside exact raw condition variants.
2. An exact Drug/Biological index that preserves registry spelling, codes, brands, and combinations without inferred aliases or equivalence.
3. A deterministic trial abstract used in Trial Library preview, Trial Detail, and the evidence workspace; it only reformats retained registry fields and identifies missing fields.
4. Public, read-only serverless routes for paginated global ClinicalTrials.gov API v2 search and metadata-only PubMed ESearch/ESummary lookup. Inputs are bounded, patient/matching/recommendation/contact content is rejected, upstream URLs are fixed, calls time out, outputs omit trial contacts and outcomes, and responses are cached.
5. A descriptive same-intervention population/time table plus JSON/print export. No endpoint harmonisation, pooled effect, treatment comparison, conclusion, or patient-specific input exists.

Represent TMH, ACTREC, and Cytecare only as `WIP · not connected` planning proxies. Each card states that a future connection is intended to establish an authorised owner, current site verification, controlled referral/acknowledgement, freshness, audit, and correction. It explicitly disclaims live site state, capacity, referral acceptance, and institutional endorsement.

## Evidence

- The India snapshot produces 322 normalized displayed cancer labels from 334 exact raw condition terms and 351 exact Drug/Biological terms from 509 raw intervention terms across 285 retained trials.
- Coverage rows expose trial count, snapshot share, India site-listing count, exact intervention count, raw source variants, and a direct source-abstract path.
- Deterministic abstracts expose source summary, study design, registry population, exact interventions, geography, source state, and missing fields. Trial Library preview and Trial Detail both rendered the same five-field contract and the explicit non-interpretation boundary.
- Four retained India records carry `briefSummaryTruncated=true`; selecting one displayed an explicit source-excerpt warning. The bounded global API contract also returns `briefSummaryTruncated` whenever its 1,600-character response cap applies.
- `GET /api/global-trials?mode=intervention&q=pembrolizumab` returned 2,957 upstream matches, 20 bounded records, a next-page token, source timestamp/query URL, and no contacts or outcomes. Loading the next page produced 40 unique records and 40 population/time rows.
- The global UI keeps loaded count and upstream total separate, labels the layer `Not an India availability list`, exposes the exact upstream query, and supports condition or intervention-field search without patient facts or semantic ranking.
- `GET /api/publications` accepts at most ten exact NCT identifiers. A live first-ten-record query returned five PubMed metadata records; each result states that it matched the combined selected-NCT query and that the specific relationship still requires human source review.
- `EV-0079` records the official PubMed E-utilities capability and the limits of publication count, indexing, peer-review inference, and trial linkage.
- The descriptive evidence map rendered 20 loaded same-term rows with source title, registry population, study period, phase/status, countries, and direct ClinicalTrials.gov links. It contains no outcomes or calculated comparison.
- JSON export produced the source boundary, 285-record India scope, all 322 coverage rows, all 351 exact Drug/Biological entries, selected global evidence, PubMed metadata, and all three institution proxies tagged `WIP proxy — not connected`. Print mode hid controls/navigation and preserved source tables.
- Desktop at 1467×929 rendered two global-result columns with no horizontal overflow. Mobile at 390×844 flattened evidence and publication cards, kept wide tables inside explicit horizontal scrollers, retained the 64px navigation lens, and had zero page-level overflow.
- Full-stack browser flows covered evidence entry, global search, pagination, PubMed lookup, Trial Library preview, Trial Detail abstract, JSON export, print mode, and API method/cache/header boundaries with zero console warnings, console errors, or page errors.
- `npm test` passed 16/16 policy, source-contract, and deterministic-model tests. `npm run build` passed TypeScript and Vite across 106 modules.
- `python3 research/validate_ledger.py` passed 79 retained records; the unchanged trial snapshot passed 285 records; `npm audit --omit=dev` found 0 vulnerabilities; `web/vercel.json` parsed successfully.
- Serena re-indexed 56 source files (`python=4`, `typescript=52`); project health and memory-reference checks passed. `git diff --check` passed.
- The intended publication set contained no secret-shaped values or email addresses; private raw notes, the expanded DOCX, and `.private/` remained ignored.
- Pull request `#42` passed Vercel preview checks and merged the evidence workspace to `main` as `ed683a6`. Production deployment `dpl_2XUyvsp8tR6EbNXtA8Bipg3u34rN` reached `Ready` with both new serverless functions.
- Live production at `https://onco-grid-trial-relay-validation.vercel.app/#/trials/evidence` rendered 285 India records, 322 normalized cancer labels, 351 exact Drug/Biological terms, 20/2,957 loaded pembrolizumab records, 20 population/time rows, five PubMed metadata records, and three WIP institution proxies with zero desktop overflow, console warnings/errors, or page errors. Loaded mobile state retained one-column cards, scroll-contained tables, a 64px navigation lens, and zero page-level overflow.
- Pull request `#43` then rejected unsupported query parameters to prevent silent cache-key fragmentation. It merged as `c648281`; production deployment `dpl_qtmDZhmfMoXPyydWXcVoem36RhUH` reached `Ready`. Live valid queries return `200`, repeated bounded queries use the Vercel cache, and extra parameters on either evidence route return `400`.

## Risks and gaps

ClinicalTrials.gov global search is broader evidence, not complete world coverage, cross-registry deduplication, India access, or current site capacity. Exact local intervention terms are passed transparently to the upstream intervention field, but upstream matching semantics are not claimed to be exact. PubMed combined-NCT search can return primary reports, secondary analyses, reviews, or other records mentioning any selected identifier; every relationship needs human verification. Publication bias, indexing lag, corrections, retractions, access rights, and full-text licensing remain unresolved.

The institution cards are not integrations. No organisation has been contacted and no authority, participation, data flow, SLA, capacity, or referral acceptance exists. The evidence map is descriptive only and cannot support patient-specific decisions or comparative efficacy/safety conclusions. `P5`, direct workflow burden evidence, product lock, and live pilot-service configuration remain open.

## Next

Run the structured clinician follow-up with concrete failed searches and measure useful-result rate, source-opening rate, trust, and time. Test whether the deterministic abstract and exact intervention index reduce source-navigation burden. Seek separate point-of-risk authorisation before contacting any institution. Before adding full text or outcome comparison, define source rights, correction/retraction handling, curation authority, and a clinically reviewed non-interpretation contract.

## Sign-off needed

The owner explicitly authorised this evidence expansion and WIP institution proxies. Separate owner confirmation remains required before external institutional contact, accepting new restricted data/reuse terms, ingesting or redistributing publication full text, adding patient facts, or promoting any cross-trial output that interprets outcomes or influences care.
