# Work report — P2

## Problem

The first evidence slice had to cover all supplied themes and outside problems without treating repeated pages as independent confirmation, importing non-Indian measurements, or promoting clinically prohibited needs. It also needed enough exact operational evidence to test the initial consultation-readiness direction against alternatives.

## Decision

Collected a bounded, source-verified slice centred on Indian public infrastructure, peer-reviewed Indian workflow and access studies, specialty requirements, tumour-board operations, information needs, and international time-motion evidence used only as transferable measurement design. Kept vendor capabilities separate, added explicit contradictions, and preserved missing local measurements rather than estimating them.

## Evidence

- `research/evidence.jsonl` → 35 atomic records from 28 independent source groups.
- Coverage by theme → Synthesise 8, Connect 6, Find 3, Contextualise 3, Act 3, Outside 12.
- Evidence quality → 26 records are official or peer reviewed; 26 are directly India-relevant.
- `python3 research/validate_ledger.py` → `PASS: 35 records valid; 35 retained; IDs and contradiction references consistent`.
- Indian NCG implementation study → 81/101 responding member organisations prioritised EMRs; requirements and adoption work cover a network of more than 360 centres; documentation/retrieval/interoperability problems are explicit (`EV-0015`).
- KCDO UX research → reports offline/online duplication, fragmented computers, referral-history upload/access gaps, manual entry, redundant records, slow systems, and local workarounds (`EV-0016`).
- Tata Memorial Onco-Insight → manual versus integrated registry abstraction 29.14 versus 16.72 minutes, a 12.42-minute paired reduction; diagnostic retrieval 43.22%, complete TMC treatment linked 52%, and follow-up still manual (`EV-0017`, `EV-0018`).
- NCRP tumour-board survey → 172 hospital responses; 137 boards; among boards, 63.5% physical documentation, 48.2% no follow-up system, 16.8% EMR-note communication, and 5.1% always cross-hospital discussion (`EV-0019`).
- AIIMS Rishikesh default study → 172 defaulters; social-support, finance, commute, and illness barriers plus mean travel of 143 km; no total denominator, so no prevalence claim (`EV-0025`).
- Tata Memorial SMS feasibility study → 73.68% reply rate but 20.18% of prompt occasions lacked clinician follow-up; response is not completion (`EV-0026`).
- Information-needs evidence → 495-person German survey retained with geography warning; 74-response Indian molecular-report survey retained as weak specialised evidence (`EV-0022`, `EV-0023`).
- CTRI landscape → 1,988 historical cancer trials, geographic disparity, and explicit registry-data quality limits (`EV-0024`).
- International burden evidence → 15,653-physician US EHR metadata study and 97-consultation Netherlands time-motion study retained only for task measurement and contradiction, not India effect transfer (`EV-0028`, `EV-0029`).

## Risks and gaps

- No retained study measures the complete Indian consultation-preparation workflow, primary preparer, person-minutes, or source-verification burden.
- Find has weak India-specific time/frequency evidence; general source access is crowded.
- Contextualise remains a design constraint with no independent workload measure.
- Patient-specific Act is both prohibited and covered by existing NCG/commercial systems.
- Indian tumour-board case-preparation time is unknown despite strong documentation/follow-up evidence.
- Follow-up barriers are multifactorial; reminder automation cannot solve finance, transport, social support, illness, or service distribution.
- Public remote publication remains blocked pending sanitisation approval.

## Next

Integrate the evidence into workflow maps, theme judgments, existing-solution comparisons, and a contradiction audit. Then compare three bounded candidates: outside-record consultation readiness, tumour-board case readiness/follow-through, and barrier-aware care-team follow-up. Preserve the unresolved local actor and baseline gaps.

## Sign-off needed

No owner decision is needed to complete local P2 synthesis. Owner review is required before publication, before changing research thresholds, and before promoting any candidate into a selected product.
