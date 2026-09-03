# Work report — P2

## Problem

Atomic data points alone do not show where workflows differ, which problems remain after existing systems, or how contrary evidence changes the initial direction. The collection needed an integrated view without collapsing requirements, observations, patient accounts, international studies, and vendor claims into one evidence class.

## Decision

Produced separate workflow, theme, solution, and contradiction artifacts. The workflow map labels intended requirements versus observed/reported behaviour. Theme briefs state what is and is not supported. The solution landscape treats vendor material only as capability claims. The contradiction report actively tests each attractive direction and records the remaining critical unknowns.

## Evidence

- `research/INDIAN_WORKFLOW_MAPS.md` → medical, surgical, radiation, MDT, cross-institution referral, follow-up, and registry paths with roles, artifacts, system boundaries, evidence limits, and safe operational opportunities.
- `research/THEME_BRIEFS.md` → Find, Contextualise, Synthesise, Act, Connect, and outside-theme judgments plus attributable measurement table.
- `research/SOLUTION_LANDSCAPE.md` → NCG/KCDO, specialty modules, NCG VTB, ABDM/FHIR, CTRI, mCODE, Flatiron, navify, and local workaround comparison.
- `research/CONTRADICTIONS.md` → direction-by-direction counterevidence plus availability, confirmation, publication, vendor, geography, institution, role, recency, and scope-laundering bias controls.
- Reference-integrity scenario → all four integration artifacts were scanned for `EV-####` references; every reference resolves to one of the 35 validated ledger records.
- Lane coverage scenario → all five supplied themes and the outside follow-up lane are present in the theme brief.
- `python3 research/validate_ledger.py` → passed after the final 35-record collection.
- Integrated result → three directions survive comparison: source-linked outside-record intake, tumour-board case readiness/follow-through, and barrier-aware care-team follow-up.

## Risks and gaps

- The surviving directions are candidates, not validated local workflows.
- Consultation preparation has strong fragmentation evidence but no direct India person-time or named preparer measurement.
- Tumour-board operations have strong India documentation/follow-up evidence but no case-preparation time measurement and substantial existing NCG infrastructure.
- Continuity has strong India barrier evidence, but many barriers are not software-solvable and the care-team owner remains unspecified.
- No candidate may be presented as clinically complete, diagnostic, interpretive, or prescriptive.
- The empty public remote and MCP-activation gaps remain unchanged.

## Next

Enter P3 synthesis: compare the three candidates against evidence, safe scope, existing alternatives, integration, KPI, contradiction, and unresolved dependence on local observation. Produce a decision packet that recommends a discovery priority without falsely passing the owner product-selection gate.

## Sign-off needed

Owner sign-off is required before selecting a final product or changing the research acceptance threshold. The agent may rank candidates and propose the safest evidence-backed next move.
