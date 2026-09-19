# Work report — P3

## Problem

The evidence collection produced several important problems but no safe basis for automatically selecting one product. Synthesis had to compare the original themes and outside findings, account for existing NCG/commercial infrastructure, retain contradictions, and distinguish a discovery priority from an owner-approved product decision.

## Decision

Compared three bounded candidates and ranked tumour-board operations first for further discovery. Direct Indian evidence shows recurring boards plus large documentation and follow-up gaps, while the NCG MDT model makes the workflow concrete. The recommendation is narrower than a tumour-board platform: first determine whether post-board human decision documentation and operational follow-through is the unmet job. Source-linked outside-record consultation readiness ranks second; barrier-aware care-team follow-up ranks third. Patient-specific Act, generic oncology EMR/dashboard, generic expert network, and universal summary directions were rejected.

## Evidence

- `research/OPPORTUNITY_MATRIX.md` → all three candidates compared across evidence, India relevance, frequency, burden, actor clarity, safety, integration, KPI, alternatives, differentiation, contradictions, and local-validation dependency.
- Candidate matrix totals used only as aids: tumour-board operations 18/22, barrier-aware follow-up 15/22, outside-record readiness 14/22; safety/evidence failures override scores.
- `RESEARCH_SYNTHESIS.md` → final decision packet, hard boundary, source set, strongest established facts, theme decisions, detailed candidate contracts, proposed problem contract, remaining unknowns, minimum next evidence, and explicit owner options.
- Evidence-reference integrity → every `EV-####` reference in workflow maps, theme briefs, solution landscape, contradiction report, matrix, and synthesis resolves to the validated ledger.
- Hard-boundary check → synthesis explicitly contains all six exclusions: diagnosis, treatment recommendations, clinical decision support, clinical risk scoring, interpretation of medical data, and autonomous clinical advice.
- Candidate completeness check → matrix contains actor, trigger, job, current process, burden, workaround, alternatives, safe output, human review, integration, KPI, contrary evidence, and required next evidence for each candidate.
- `python3 research/validate_ledger.py` → final collection passed with 35 retained records and consistent IDs/references.
- Validator failure-path scenario → an injected phone number initially exposed a boundary bug caused by stripping spaces before matching; the source was corrected, then the same scenario detected the phone leakage and the valid 35-record ledger still passed.
- Final `serena project health-check .` → all Serena symbol tools passed; `serena memories check .` → no referential-integrity issues.
- Recommended change condition → outside-record consultation readiness becomes first if board follow-through is already reliable or if consultation preparation gains a named frequent owner and measurable end-to-end burden.

## Risks and gaps

- No candidate is a locally validated workflow or owner-approved product.
- Tumour-board case-preparation time and exact owning role are not measured in India.
- NCG already operates the broad board/network infrastructure; duplication is the leading novelty risk.
- Post-board follow-through may include clinically consequential actions; the candidate may record human decisions and operational status but cannot generate or interpret them.
- The outside-record candidate lacks direct Indian consultation-preparation timing and verification-cost evidence.
- The continuity candidate faces structural barriers that software cannot solve.
- Public publication and current-session MCP activation remain open gaps.

## Next

Move to owner-controlled `P4`. Choose whether to pursue tumour-board decision documentation/follow-through, outside-record consultation readiness, barrier-aware follow-up, or one more non-sensitive artifact/operator-validation step. If the recommended lane is approved, obtain a blank current board template and public process details, identify the actual record/follow-through owner, and freeze one operational KPI before architecture or product implementation.

## Sign-off needed

Owner decision required: approve Candidate B as the next bounded discovery lane, select Candidate A or C instead, or keep all three open pending one additional non-sensitive workflow artifact or operator walkthrough. No local file has been approved for the first public push.
