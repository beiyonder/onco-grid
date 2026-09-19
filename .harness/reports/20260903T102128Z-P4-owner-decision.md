# Work report — P4

## Problem

The completed desk-research pass produced three viable non-clinical oncology workflow directions, but project authority requires the repository owner—not an agent score—to select the next discovery lane before architecture or implementation.

## Decision

The repository owner selected Candidate B: tumour-board human-decision documentation and operational follow-through. This selects a bounded discovery lane, not a product implementation and not permission to generate or interpret clinical recommendations. The next phase must determine the exact owning role and choose one broken step from documentation, authorised communication, operational ownership, or completion tracking.

## Evidence

- `RESEARCH_SYNTHESIS.md` records 35 validated evidence records from 28 independent source groups, including 26 direct-India and 26 official or peer-reviewed records.
- `research/OPPORTUNITY_MATRIX.md` ranks Candidate B at 18/22, Candidate C at 15/22, and Candidate A at 14/22; scores are explicitly non-authoritative.
- Direct Indian survey evidence in `EV-0019` reports 137 tumour boards among 172 NCRP-affiliated hospital respondents; among reported boards, 47.4% met weekly, 63.5% used physical documentation, 16.8% communicated recommendations through EMR notes, 48.2% lacked a recommendation follow-up system, and 5.1% always conducted cross-hospital discussion.
- `EV-0014` and `EV-0020` establish that NCG already provides an MDT requirements model and Virtual Tumor Board, making a generic board or expert network non-differentiated.
- The owner selected “B — Tumour-board follow-through” from the explicit P4 options after being shown the safe output and main novelty/ownership risk.
- `python3 research/validate_ledger.py` → `PASS: 35 records valid; 35 retained; IDs and contradiction references consistent`.

## Risks and gaps

- The exact local actor, current system, handoff, and broken post-board step remain unknown.
- The cited survey measures board practices, not preparation person-time, recommendation quality, or product effectiveness.
- Existing NCG/local tools may already provide adequate electronic documentation or follow-through.
- A new workflow could duplicate documentation or shift work onto coordinators.
- Clinical decision quality, treatment choice, urgency, diagnosis, and report interpretation remain outside scope.
- `GAP-PUBLICATION-SANITIZATION`, `GAP-MCP-ACTIVATION`, and `GAP-TUMOUR-BOARD-LOCAL-WORKFLOW` remain open.

## Next

Make `P5` current. Inspect the public NCG VTB submission and post-meeting path, locate blank non-sensitive case/decision/follow-up artifacts, and seek a process account from a board coordinator, administrator, registry investigator, or care-team operator rather than requiring an oncologist. Capture aggregate counts only. Produce a bounded problem contract and contradiction update before any product architecture begins.

## Sign-off needed

The owner has closed candidate selection by choosing Candidate B. A separate owner sign-off is still required to lock the product problem after `P5`, approve any first public push after sanitisation, and authorise architecture, dependencies, privacy/security changes, or implementation.
