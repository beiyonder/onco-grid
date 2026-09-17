# Knockout update + sim — 2026-09-09 (Rakshita constraint)

## 0. Team constraint (verbatim intent, de-identified)

- `OBSERVED`: Teammate states: will not work on broader system-level management/admin/operational problems; wants depth on ONE lane: Knowledge Companion + clinical-trials; cites KCDO direction; wants lock now, go deep on workflow/pain/stakeholders/gaps/solution.
- `INFERENCE`: Forcing an ops-only lane (O1/O2) risks team split → hackathon loss even if evidence score higher. Depth + motivation are win factors. Sim must weight team alignment explicitly.
- `FACT`: Changing `CURRENT` (P5 tumour-board) to a trials lane requires owner (`beiyonder`) sign-off per `PROJECT_GOVERNANCE.md`. This doc is proposal only.

## 1. KCDO direction check (fresh web, 2026-09-09)

- `FACT`: KCDO = NCG + Tata Memorial + Koita Foundation, 300+ hospitals; focus: EMR adoption (6 empanelled, LEAP funds 40-50%, ~30 MoUs), interoperability/ABDM, structured pathology/radiology templates (IRIA/ICRI endorsed), chemo platform (iF 2026), CATCH AI grants, Oncology AI advisory with IIT Bombay/KCDH, MeitY/IndiaAI MOU. Sources: kcdo.in, ncgindia.org/key-initiatives/koita-centre-for-digital-oncology, koitafoundation.org/KCDO.
- `FACT`: TMC job post (Ref TMC/AD/26/2026, 09.02.2026) lists KCDO VP-Technology scope including "research, clinical trial automation, patient matching, real-world evidence, AI/ML" as areas to engage companies on. This is the only official-adjacent signal aligning KCDO with trial automation — it is a hiring scope line, not a product spec or prevalence evidence.
- `INFERENCE`: "KCDO direction = trials" is overstated as a product mandate. Supportable phrasing: KCDO signals interest in trial automation/RWE as ecosystem gaps; no KCDO trial-companion product to complement/duplicate is evidenced. Do not claim endorsement.

## 2. Trials evidence refresh (credible citations)

- `FACT` (CTRI landscape, PMC11096683, 2007-2021, n=1,988 cancer trials): geographic disparity stark (8+ states/UTs zero trials 2007-21; Delhi >2000/100k patients, Maharashtra/AP >800); head-neck burden vs trial gap; phase-1 scarcity; registry-status ≠ live availability; CTRI fields incomplete/inconsistent/non-standard, free-text limits precision.
- `FACT` (Chakraborty et al., ecancer 2021, 181 open trials 2012-20): median SSY 1.55/1000 incident cases; 35% states/UTs zero; even best state only 29.7% incident cases have a slot; <10% newly diagnosed have same-state therapeutic slot (JCO GO 2024 review concurs).
- `FACT` (Pillamarapu et al., Trials 2019): CTRI data-quality defects — unclear study-type taxonomy, internal inconsistencies, missing PI/sponsor/state, city free-text errors rising to ~5%, cross-registry mismatch (ClinicalTrials.gov lists India, CTRI misses).
- `SOURCE CLAIM` (repo pain #5): oncologists want trials by cancer/biomarker/geography, India-specific, biomarker-based.
- `CONTRADICTION`: CTRI public search + ClinicalTrials.gov + navify multi-registry search already exist. Re-display = no differentiation. Patient-specific eligibility = prohibited (treatment rec/CDS/interpretation).
- `OPEN`: India-specific frequency/time burden of trial inquiry by oncologists; who asks (oncologist vs JR vs coordinator); referral completion baseline; site-contact freshness burden. No ledger record yet — must be closed by Neha/clinician or downgraded.

## 3. Safe vs unsafe trials split (non-negotiable)

- **O6-UNSAFE (REJECTED)**: Input patient features → output ranked/recommended trials or eligibility verdict for that patient. `FACT`: Violates Health-a-thon out-of-scope (treatment recommendations, CDS, interpretation, risk scoring). Instant DQ risk. Never demo.
- **O6-SAFE (KNOCKOUT CANDIDATE)**: **Site-verified trial knowledge + referral-task companion.**
  - Trigger: oncologist/JR asks a general trial question (disease-site + phase + geography, no patient identifiers).
  - Job: return general trial list with provenance (CTRI ID + last-verified timestamp + recruiting-status confidence + site contact + distance/state), plus human-approved referral next-step draft and owned task (pending/contacted/referred/closed) with audit.
  - System never ingests patient features, never ranks by suitability, never interprets eligibility. Every answer cites registry record + verification state; unknown = unknown.
  - Integration: CTRI (+ ClinicalTrials.gov cross-check) read-only + site-contact sheet; export referral draft; no EMR rewrite.
  - KPI (operational, 60-90d): median time-to-located recruiting site contact; % inquiries with verified contact + owned next step within 48h; referral-step completion on explicit denominator.

## 4. Updated knockout set

- O1 post-board ack, O2 report-ready ack, O3 outside-record packet, O4 barrier worklist, O5 general trial board (merged into O6-safe), **O6-safe trial knowledge + referral-task companion** (new, Rakshita lane).
- Bench: O6-unsafe, generic EMR/dashboard, dosing/toxicity/staging/interaction, autonomous triage.

## 5. Sim — 5 rounds, win-weighted

Scoring 0=weak 1=mixed 2=strong. Hackathon-fit + team-alignment weighted 2x (win reality: motivated team + demoable story beats pure evidence).

| Criterion (weight) | O1 board-ack | O2 report-ack | O3 packet | O4 follow-up | O6-safe trials |
|---|---|---|---|---|---|
| Safety (1x, fail=out) | 2 pass | 2 pass | 2 pass | 2 pass | 2 pass (only safe ver.) |
| India frequency evidence (1x) | 2 (47.4% weekly) | 2 (daily reports) | 1 (fragmentation, no prep-time) | 1 (defaulter sample, no denom) | 0 (no inquiry rate; low slot availability <10%) |
| Burden measurability (1x) | 1 (no ack-time baseline) | 2 (avail→ack hrs) | 1 (verify erases saving) | 2 (travel/barrier concrete) | 1 (search-time measurable, referral denom small) |
| Actor clarity (1x) | 1 (varies) | 2 (JR/consultant) | 0 (unknown preparer) | 0 (owner open) | 1 (oncologist/JR inquirer; site contact owner needed) |
| Light integration (1x) | 2 (export ref) | 2 (alert+ack layer) | 2 (upload/adapter) | 1 (needs comms channel) | 2 (read-only registries + sheet) |
| 60-90d KPI + demo (2x) | 2 (ack% demo good, weekly cadence slow) →4 | 2 (overdue list demos great, daily) →4 | 2 (packet demo good) →4 | 1 (needs cohort access) →2 | 2 (search+verify+task demo great, synthetic-ready) →4 |
| Differentiation vs NCG/vendors (1x) | 1 (NCG MDT/VTB/NABH cover much) | 1 (NER alerts exist; ack missing = thin wedge) | 1 (NCG/ABDM target same) | 1 (many trackers) | 2 (CTRI dirt + geo gap + freshness recon = real wedge; no NCG trial companion evidenced) |
| Team alignment (2x) | 0 (Rakshita refuses ops) →0 | 0 →0 | 1 (neutral, synthesis-adjacent) →2 | 0 →0 | 2 (explicit demand, depth-ready) →4 |
| **Total /14 raw, weighted** | **11** | **13** | **9** | **7** | **13** |

Round results:
- R1 safety: all pass except O6-unsafe (out).
- R2 evidence: O6-safe weakest on frequency (low slot availability cuts against "frequent problem").
- R3 differentiation: O6-safe strongest (dirty-registry + verification gap is unserved; O1/O2 thin vs NCG/SOP).
- R4 hackathon-fit: O2 and O6-safe tie (both demoable, synthetic-ready, light).
- R5 team-truth: O1/O2/O4 lose on Rakshita veto; O6-safe wins outright. O3 neutral fallback.

## 6. Final answer (sim winner, conditional)

**Lock O6-safe as the single deep lane for Round 1, with O2 as the only fallback.**

Exact problem sentence for submission:
> When an oncologist considers clinical-trial options during/after a consultation, they lack a fast, India-specific, site-verified view of which trials list a nearby centre as recruiting with a current contact — CTRI entries are stale/inconsistent and cross-registry status disagrees — so inquiry stalls or repeats. A knowledge companion answers general (non-patient-specific) trial questions with cited registry records, freshness/verification state, site contact + distance, and creates a human-approved referral next-step task with owner/status/audit. It never ingests patient features or judges eligibility.

Why this wins (and where it is fragile):
- Satisfies Rakshita depth + KCDO narrative without claiming endorsement; single use-case 05 (Doctor Productivity & Knowledge Assistant), no multi-use sprawl.
- Demoable in 5 min on synthetic CTRI slice: ask → cited list → freshness flag → contact → task. Human override + audit visible. No hallucination risk if built extractive.
- Fragility openly stated: frequency evidence is the weakest link (few slots exist). Compensate in Round 1 with operational KPI (time-to-verified-contact, % with owned next step) + 60-90d pilot at ONE academic/high-trial-volume site where inquiry IS frequent. If Neha cannot name that site/role + weekly inquiry volume by EOD tomorrow, auto-fallback to O2 (report-ready ack) which has daily frequency + same ack/task pattern, preserving 80% of the build.

## 7. What changes in repo

- Requires owner sign-off to move `CURRENT` from P5 → trials lane (or open P6 discovery). Until then, P5 stays `CURRENT`; this sim is proposal.
- Next ledger adds (if owner approves): CTRI landscape (PMC11096683), Chakraborty 2021 disparity, Pillamarapu 2019 data-quality, TMC VP-Tech scope line (as ecosystem signal, not prevalence), KCDO focus pages (as positioning, not evidence).
- Validator must stay PASS before any PR. No raw chat/PDF in commits (`.private/` ignored).

## 8. Go-deep plan for O6-safe (Rakshita knowledge base)

1. Corpus: CTRI slice (synthetic mirror) + ClinicalTrials.gov cross-check fields; record: CTRI ID, title, phase, sites, status, last-verified, contact, distance/state, discrepancy flag.
2. Workflow map: inquirer → question → retrieval → verification → contact → referral-task (owner/due/status) → close. Interview probe: last trial inquiry, who asked, what filters, how long to find contact, what stalled, who owns referral.
3. Safety tests: patient-eligibility prompts must refuse + redirect to general search + human; stale-contact must show low-confidence, never invent phone/email.
4. Pilot: one high-volume site, one disease-site (e.g., breast), baseline: median inquiry→contact hrs + % with owned step. Target move in 60-90d.
5. Tonight poll: binary — O6-safe deep vs O2 fallback. If O6-safe, kill O1/O3/O4 for Round 1; assign Rakshita corpus+workflow owner, Shaleen ack/task pattern contributor, Vikas site-contact verification path.
