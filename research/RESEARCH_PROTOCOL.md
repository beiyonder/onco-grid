# Oncology desk-research protocol

## Decision being supported

Select one frequent, important, non-clinical Doctor/Care Team Facing oncology workflow problem with a named user, attributable operational burden, a safe human-reviewed output, light integration, a credible existing-solution gap, and an operational KPI measurable within 60–90 days.

The five supplied themes—Find, Contextualise, Synthesise, Act, and Connect—start as clinician-derived claims. They do not constrain the outside-theme scan and do not count as prevalence evidence by themselves.

## Hard boundary

Research may describe clinical needs, but product candidates must not perform diagnosis, treatment recommendation, clinical decision support, clinical risk scoring, medical-data interpretation, or autonomous clinical advice.

No identifiable patient or participant data may enter the ledger, notes, prompts, memory, reports, commits, or demos. Supporting extracts must be short and necessary; prefer measured results and paraphrases over copied text.

## Research questions

1. Which oncology workflow jobs recur often enough to create material operational burden?
2. Which role actually performs each job?
3. Which artifacts, systems, handoffs, and verification steps are involved?
4. What is measured about time, delay, rework, completion, access, or workload?
5. Which findings are directly supported in India and which are only transferable?
6. What workarounds and existing products already address the job?
7. Why does the problem remain despite those alternatives?
8. Which needs can be supported operationally without clinical interpretation?
9. What evidence contradicts each leading hypothesis?
10. Which candidate has a credible 60–90-day operational evaluation path?

## Research lanes

### Existing themes

- **Find:** trusted guidelines, publications, monographs, trials, staging references, institutional protocols, and research material.
- **Contextualise:** distinguish record organisation from patient-specific clinical interpretation.
- **Synthesise:** reconstruct source-linked longitudinal history from fragmented records and systems.
- **Act:** capture practical point-of-work needs, then classify clinical interpretation, CDS, and treatment recommendation as out of product scope.
- **Connect:** human peer discussion, referral, multidisciplinary preparation, discussion documentation, and follow-up.

### Outside-theme scan

- follow-up and continuity;
- missed appointments and loss to follow-up;
- referral and transfer coordination;
- documentation and repeated data entry;
- clinic and treatment-day operations;
- investigation/report tracking;
- cross-department handoffs;
- patient/caregiver communication and language;
- financial or administrative navigation;
- registry, reporting, and research-data burden;
- survivorship, supportive-care, and palliative handoffs;
- workforce, access, and dependence on informal workarounds.

## Source hierarchy

1. Official programme, Indian government, NCG/KCDO, NHA/ABDM, and standards sources.
2. Peer-reviewed primary research and systematic reviews.
3. Recognised professional organisations and cancer centres.
4. Named clinician talks, panels, and articles.
5. Vendor documentation, used only for product-capability claims.
6. Public discussions, used only for hypothesis generation.

A source can support more than one atomic claim, but syndicated copies share one `independent_source_group` and cannot count as independent confirmation.

## Search method

For each lane:

1. Search India-specific official and peer-reviewed material.
2. Search broader oncology workflow and human-factors evidence.
3. Search existing products and standards.
4. Search for contrary evidence or evidence that current systems already solve the job.
5. Follow citations to the original source rather than citing summaries where possible.
6. Record failed or inconclusive searches in the synthesis, not as positive evidence.

Representative query components:

```text
oncology OR cancer
workflow OR documentation OR information retrieval OR handoff OR coordination
India OR Indian hospital OR cancer centre
fragmented records OR interoperability OR EHR burden
multidisciplinary tumor board OR case preparation
loss to follow-up OR navigation OR referral delay
clinical trial search OR guideline information need
```

Queries are discovery aids, not evidence. The ledger contains the underlying source claim.

## Atomic evidence rule

One record represents one bounded claim from one underlying source. Split unrelated findings. Do not split one statistic into several pseudo-independent confirmations.

Every retained record must include:

- stable ID and status;
- theme and subproblem;
- actor, specialty, setting, geography, and workflow moment;
- bounded claim and claim type;
- source title, publisher, date, exact locator, and independent source group;
- short supporting extract or measured result;
- method/sample and limitations;
- strength and India relevance;
- frequency and burden evidence, including `not reported` when absent;
- current workaround and existing solution, including `not reported` when absent;
- contradiction and linked contradictory IDs where present;
- scope class;
- project implication and unknowns;
- tags and provenance notes.

`not reported` is valid. Missing fields are not.

## Evidence-strength rubric

- **Strong:** authoritative rule/standard for the stated jurisdiction, or well-designed direct evidence with a clear method and directly relevant population/setting.
- **Moderate:** credible direct or synthesised evidence with some transfer, sample, recency, or method limitation.
- **Weak:** small or poorly described sample, indirect measure, non-Indian transfer, or incomplete method.
- **Hypothesis only:** anecdote, vendor framing, public discussion, or team inference without independent support.

Strength does not equal importance. A strong standard may say nothing about prevalence; a weak account may expose a valuable question.

## India-relevance rubric

- **Direct:** data, workflow, rule, or product evidence from India.
- **Transferable:** non-Indian evidence about a workflow mechanism likely to exist elsewhere, with local validation still required.
- **Uncertain:** setting differences may materially change the claim.
- **Low:** mainly jurisdiction-specific and not safely transferable.

## Scope classification

- **Operational assistance:** organising, routing, locating, recording, scheduling, or auditing without medical interpretation.
- **General knowledge:** non-patient-specific access to authentic professional information.
- **Clinical interpretation:** deriving diagnosis, stage, response, toxicity, prognosis, urgency, or meaning from medical data.
- **Clinical decision support:** patient-specific ranking, warning, matching, or suggested clinical action.
- **Treatment recommendation:** treatment choice, dose, modification, sequence, continuation, or discontinuation.
- **Mixed or unclear:** requires deliberate boundary review before promotion.

Clinical interpretation, CDS, and treatment recommendation remain research findings but cannot be promoted as this hackathon product.

## Triangulation and contradiction

A theme is not promoted because many pages repeat it. Promotion requires:

- at least one direct India-relevant source for India-specific claims;
- more than one independent underlying source for a repeated-problem claim;
- a named actor and workflow moment;
- frequency or burden evidence, or an explicit gap where measurement is unavailable;
- review of existing alternatives;
- an explicit contrary search and retained contradiction where found;
- a safe product boundary.

The final synthesis reports both evidence and absence. It must not calculate a cross-study average from incompatible settings.

## Opportunity comparison

Candidates are compared on:

- repeated evidence;
- India relevance;
- frequency;
- operational burden;
- clear primary user;
- safe boundary;
- light integration;
- measurable pilot outcome;
- existing-alternative gap;
- differentiation;
- strongest contradiction;
- dependence on unavailable local workflow validation.

No aggregate score overrides a safety, privacy, feasibility, or evidence failure.

## Deterministic validation

Canonical protocol check:

```text
python3 research/validate_ledger.py
```

The validator checks JSON syntax, required fields, allowed values, stable unique IDs, HTTPS or repository locators, duplicate independent claims, short extracts, and obvious email/phone leakage. Passing the validator establishes structural integrity only; it does not prove that a claim is true.

## Phase outputs

- `research/CLAIMS.md` — falsifiable claims derived from supplied pain points and outside scan.
- `research/evidence.schema.json` — machine-readable record contract.
- `research/evidence.jsonl` — atomic evidence ledger.
- `research/validate_ledger.py` — dependency-free structural and leakage check.
- `research/INDIAN_WORKFLOW_MAPS.md` — source-grounded workflow maps.
- `research/THEME_BRIEFS.md` — theme and outside-scan synthesis.
- `research/SOLUTION_LANDSCAPE.md` — existing capabilities and remaining gaps.
- `research/CONTRADICTIONS.md` — evidence against leading claims and bias audit.
- `research/OPPORTUNITY_MATRIX.md` — candidate comparison.
- `RESEARCH_SYNTHESIS.md` — decision packet and exact remaining uncertainty.

## Completion boundary

Desk research may advance a candidate to owner review. It cannot certify local workflow prevalence, product usability, or institutional adoption. Those claims remain open until direct observation, a host pilot, or equivalent evidence becomes available.
