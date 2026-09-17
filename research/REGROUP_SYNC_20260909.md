# Regroup sync — 2026-09-09: disconnects, options, knockout plan

## Session bootstrap note

- `FACT`: `PROJECT_GOVERNANCE.md` `CURRENT` = `P5` tumour-board workflow validation. Candidate B (post-board human-decision handoff) selected at `P4`, not product lock.
- `OBSERVED`: Serena MCP not invoked from this session; read `.serena/memories/core.md` + `project_context.md` directly. Record `GAP-SERENA` equivalent: direct-read fallback, no memory write.
- `FACT`: Owner sign-off required for scope/product/publish changes. This doc is proposal/evidence only.
- Privacy: `.private/chatroom.txt` (28 lines, 2026-09-09) and `ner-2.0.pdf` read locally. `.private/` is gitignored. No raw chat, names beyond roles, phone numbers, or patient data reproduced here. `chatroom_notes.md` + `Oncologist Pain Points_v2.docx` remain ignored per `AGENTS.md`.

## 1. What we actually have (regroup)

### 1a. Repo evidence state

- `FACT`: 48 validated ledger records, 36 source groups, 36 India-relevant (`RESEARCH_SYNTHESIS.md`). Validator: `python3 research/validate_ledger.py`.
- `FACT`: Three ranked discovery lanes: B (tumour-board handoff, score 18/22) > C (barrier-aware follow-up, 15) > A (outside-record consultation readiness, 14). See `research/OPPORTUNITY_MATRIX.md`.
- `FACT`: `P5` narrowed B to: after clinicians author final decision → make available to authorised treating unit → record acknowledgement → assign explicit non-clinical items → visible pending/completed/unresolved. Must never generate/rank/interpret clinical content.
- `OPEN` (blocking B): exact owning role at one current site; current artifact/system; acknowledgement path; meaning of "follow-up system"; aggregate denominator + baseline person-time; duplication risk; privacy/escalation rules. `research/P5_TUMOUR_BOARD_VALIDATION.md` lists falsifiers.
- `FACT`: Internal-first next action per governance: clarify V2 provenance + whether questionnaires produced answers + whether clinician conversations identify P5 actor or a more pressing workflow. External outreach paused.

### 1b. What the chatroom actually says (de-identified)

- `OBSERVED`: Team is pressing for use-case vote by EOD/tomorrow + 15-30 min sync tonight. Solution focus agreed: Doctor/care-team facing.
- `OBSERVED`: One member proposes "portal for inter-departmental challenges", personas: onco JRs, lab pathologists, radiology, to mitigate delays/errors + "agentic solution to identify root causes".
- `OBSERVED`: Another member counters: solution already exists in "NCG-TMC", points to `ner-2.0.pdf` as demands list screen-shared last call. Asks to explore KCDO website. Asks whether audience is doctor+patient or doctor-only.
- `INFERENCE`: Disconnect = repo is validating a narrow post-board handoff; chat is drifting to (a) broad inter-departmental portal and (b) possible clinical-trials pivot. Neither has actor/burden/baseline yet.

### 1c. What `ner-2.0.pdf` actually is (disconnect resolved)

- `FACT`: OCR (pdftoppm @200dpi + tesseract, 39 pages, ~45k chars extracted) identifies it as **KCDO–NCG EMR Requirement (NER) for Oncology v2.0, March 2023**, Foreword by Dr. C.S. Pramesh, NCG ~300 member hospitals at that date.
- `FACT`: Structure: Part A oncology-specific (chemo A18-A27, radio A28-A32, path A33-A34, imaging A35-A40, tumour board A41-A48, outreach A49-A52...), Part B oncology enhancements (registration, second-opinion with consent B-8, follow-up alerts B-21...), Part C general EMR, Part D non-functional (audit, consent, PACS/LIS/ABDM integration, HL7/FHIR).
- `INFERENCE`: When chat says "demands listed there", it means EMR requirements, not a greenfield product spec. Building "the NER" = building an EMR. That directly collides with governance non-goal: "Building a generic oncology EMR, dashboard, knowledge assistant, or tumour-board platform" is out.
- `FACT`: Relevant NER excerpts for Shaleen's idea: A33 order histopath sample; A34 view report/update diagnosis-staging; A35 search/order diagnostics; A36 view report+image vs order; A37 abnormal-result alerts; A38 cumulative results; A40 upload report/image link to patient ID; A41 select patient/assign board ID/schedule; A44 record agreed plan in structured template; A48 audit-trailed decision summary + outcome tracking; B-19 alert when result available; C25 upload docs inside/outside facility; C26-C27 intra/inter-hospital referral.

## 2. Why the two drifts are dangerous (and what is salvageable)

### Clinical-trials pivot

- `SOURCE CLAIM`: `Oncologist Pain Points.md` #5 wants trials searchable by cancer/biomarker/geography (India), biomarker discovery specifically.
- `FACT`: Hackathon out-of-scope: treatment recommendations, CDS, clinical risk scoring, medical-data interpretation, autonomous advice (`HEALTHATHON_OFFICIAL.md`).
- `FACT`: Retained evidence `EV-0024` + CTRI landscape study (1,988 cancer trials 2007-2021, PMC11096683): problem is not absence of registry; it is geographic disparity + incomplete/inconsistent fields + registry status ≠ live availability.
- `CONTRADICTION`: Roche navify already markets multi-registry search + patient-specific matching; CTRI public search exists. A re-display of CTRI has weak differentiation (`research/SOLUTION_LANDSCAPE.md`).
- `INFERENCE`: Patient-specific eligibility matching is prohibited AND crowded. Only safe remnant: general (non-patient-specific) trial-awareness workflow (e.g., coordinator sees which disease-site trials list this centre as recruiting, with freshness flag + referral contact + consent step). That still needs freshness/reconciliation evidence + named owner + baseline. Do not pitch "AI matches patient to trial" — instant disqualification risk.

### Inter-departmental challenge portal

- `FACT`: NCG already defines MDT module, VTB (submission/template/review/notification/sharing), iECHO presenter/review/approve/reject/PII-check workflow (`EV-0014, EV-0036–EV-0040`). Draft NABH annexure expects electronic board IDs, scheduling, central list, integrated review, attendance, standardised recommendation + follow-up documentation (`EV-0042`).
- `FACT`: Single-centre proof that process beats software: Eastern India audit (800 discussions/12mo, Excel + patient-care-coordinator, EV-0043); Chennai QI 2023-25 (SOP + colour-coded paper form, 0→92% documentation, EV-0044).
- `CONTRADICTION`: "Portal for all inter-departmental delays + agentic root-cause" = scope explosion (lab + radio + path + pharmacy + scheduling + admin). Violates workflow-first/light-integration, no measurable 60-90d KPI, and originality (NCG/KCDO + 6 enlisted vendors + Flatiron + navify already claim this).
- `INFERENCE`: Salvageable only if narrowed to ONE handoff with ONE owner, ONE artifact, ONE KPI. Examples that stay legal: (i) P5 post-board acknowledgement; (ii) pathology/imaging report-available → treating-unit-seen acknowledgement + pending/overdue visibility (uses A37/B-19/C22/C50 alert requirements but adds the missing ack/owner/status layer NER does not specify).

## 3. Regrouped option set for knockout (5 max)

Keep language hackathon-safe (operational, human-authored, audited):

- **O1 — P5 post-board ack (incumbent)**: Clinician-authored decision → treating-unit available/acknowledged + explicit non-clinical owner/status. KPI: % decisions acknowledged within agreed interval. Evidence strongest (48.2% no follow-up system, 137 boards, 47.4% weekly; PMC13161587).
- **O2 — Report-ready ack (Shaleen narrowed)**: Histopath/imaging result available → treating JR/consultant seen + overdue/escalation visible. No interpretation. KPI: median available→acknowledged hours; % overdue >24/48h. Maps to NER A37/B-19 gap (alert exists, ack/ownership does not).
- **O3 — Outside-record packet (fallback A)**: Heterogeneous outside docs → source-linked packet with missing/duplicate/conflict flags + clinician confirm/correct/reject. KPI: person-minutes prepare+review; clarification loops. Supported by KCDO UX gaps + Onco-Insight manual-outside-care limit (12.42 min/case saved for registry, PMC13286784 — different job, do not transfer as effect size).
- **O4 — Barrier-aware follow-up worklist (fallback C)**: Due/missed milestone → owned worklist + staff-entered barrier + attempt/response + completion. KPI: % due with owner; completed follow-up on explicit denominator. Supported by AIIMS Rishikesh defaulters (n=172, 26.2% social, 20.3% financial, 16.3% commute, 143km mean; PMC11583348) + SMS 73.68% reply but 20.18% no clinician exam (PMC5763626). Many barriers non-software-solvable — needs controllable subset.
- **O5 — General trial-awareness board (trials, safe version only)**: Centre-level recruiting-trial list with freshness + contact + referral-step tracking. No patient matching. KPI: time to locate centre-recruiting trial info; referral-step completion. Weakest evidence; keep only if Neha/Rakshita bring a coordinator owner + baseline.

Explicitly benched: generic EMR/dashboard, AI dosing/toxicity/staging/interaction, patient-specific trial matcher, autonomous triage/risk scoring.

## 4. Knockout series design (win-aware, not just truth-aware)

Round 1 — Safety chop (pass/fail, tonight): Does it generate/rank/interpret clinical content or give patient-specific advice? If yes → out. Owner: repo rules + `HEALTHATHON_OFFICIAL.md`.

Round 2 — Evidence chop (score 0-2): India-specific frequency/burden? Named role? Existing workaround named? O1 leads; O5 likely out unless new attributable baseline arrives from Neha/Rakshita.

Round 3 — Differentiation chop: Would NCG/VTB/NABH/vendor/spreadsheet/SOP already solve it? Require one transition NER does NOT specify (acknowledgement, owner, status, escalation). Broad portal dies here; narrowed O1/O2 survive.

Round 4 — Hackathon-fit chop (weighted 2x): 60-90d pilot measurable with synthetic data? Light integration (upload/export/WhatsApp/Excel/PDF, no HIS rewrite)? Demoable in 5 min by a doctor? Human override + audit visible? Multilingual/caregiver only where needed? This is where O2 often beats O1 (daily volume vs weekly board).

Round 5 — Team-truth chop: Do we have the doctor partner + site access for that workflow? Can Vikas/Neha/Rakshita name the owner this week? No owner = no build.

Tie-breakers (unspoken hackathon tricks, used explicitly):
- Judges fund a story they can retell: one user, one trigger, one before/after number. Broad platforms lose to narrow handoffs.
- Live acknowledgement + overdue list demos better than AI summaries (no hallucination risk on stage).
- Synthetic data from day one; never promise de-identified real data later.
- Quote NCG/KCDO as complement ("plugs into NER A37/A48"), not competitor. NCG alignment = credibility with doctor judges.
- Pick KPI judges already list: recall completion, time-to-note, handoff lag, no-show rate. Map ours 1:1.
- Round 1 (12-25 Sep, editable till 25 Sep 23:59) rewards relevance+feasibility+originality + evidence outline, not code. Save code claims for Build Sprint (5 Oct-8 Nov).
- One primary use-case label (doctor-facing 01/02/04) + mention of secondary overlap is fine; claiming doctor+patient both as primary splits the story.

## 5. Documentation + opencode/orca plan

- Ledger-first: every new claim → `research/evidence.jsonl` via schema; `python3 research/validate_ledger.py` must PASS before any PR.
- This regroup note lives at `research/REGROUP_SYNC_20260909.md` (non-sensitive, committable). Raw chat/PDF stay in `.private/` (ignored). No push to `main` direct; review branch + PR only.
- Orca use: tonight's sync in one Orca terminal (record de-identified decision only); KCDO site check via Orca embedded browser (not computer-use); if parallel probes needed, spawn one worktree per option (O1/O2/O3) with `orca-cli`, each returns actor/artifact/baseline only.
- Opencode use: `/mcp list` + `/mcp test serena` after restart from root; `serena project health-check .`; keep Serena memories for stable facts only, not narration.

## 6. Questions to close tonight (for Neha / Rakshita / Shaleen / Vikas)

1. Neha/Rakshita: which V2 sections are completed conversations vs proposals? Were questionnaires administered — do de-identified answers exist? Did any clinician name a post-board or report-handoff owner?
2. Shaleen/Vikas: for inter-dept delays, name ONE delay (e.g., histopath report → onco JR) with weekly volume + current workaround (Excel/WhatsApp/phone) + who chases? Would ack+owner+overdue list remove work or duplicate it?
3. All: which single KPI can we baseline in 60-90d with synthetic data + one site contact? Who is the doctor partner for that workflow?
4. Poll: vote O1-O5 with rationality note (frequency × burden × evidence × demoability), consensus by EOD tomorrow max.

## 7. Proposal

Run Rounds 1-3 async before tonight's call using this file + ledger; decide ONE lane on call; document decision as `C5` owner-decision addendum. Do not start architecture until P5 (or its successor) gate passes with named actor + baseline plan.
