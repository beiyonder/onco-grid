# Work report — P1

## Problem

The supplied oncologist pain points were useful themes but not yet falsifiable claims, and broad internet research had no fixed taxonomy, atomic evidence contract, deduplication rule, scope classification, or deterministic quality check. Starting collection in that state would amplify confirmation bias and make later synthesis unreliable.

## Decision

Froze a research protocol covering Find, Contextualise, Synthesise, Act, Connect, and an explicit outside-theme scan. Converted every supplied point into narrow claims and cross-cutting falsifiers. Added a machine-readable JSONL evidence contract and a dependency-free validator that requires provenance, context, method/sample, limitations, India relevance, burden/frequency evidence or an explicit absence, alternatives, contradictions, scope class, and unknowns. Seeded the ledger only with supplied and primary official foundation evidence before broad collection.

## Evidence

- `research/RESEARCH_PROTOCOL.md` → source hierarchy, research questions, lanes, search method, atomic evidence rule, strength and India-transfer rubrics, scope classes, triangulation rules, opportunity comparison, deterministic check, and completion boundary.
- `research/CLAIMS.md` → 80 unique falsifiable claim IDs covering every supplied pain-point item, specialty differences, outside-theme problems, and candidate falsifiers.
- `research/evidence.schema.json` → closed record schema with 32 required fields, enumerated evidence/scope/strength classes, stable IDs, and bounded supporting extracts.
- `research/evidence.jsonl` → 14 structurally complete seed records from the programme rules, supplied notes, NCG/KCDO modules, the oncology EMR initiative, and the ABDM FHIR guide. Shared underlying sources use one `independent_source_group`.
- `research/validate_ledger.py` → standard-library validation for JSONL syntax, required and unexpected fields, types, enums, patterns, unique IDs, contradiction references, duplicate claims within one underlying source, line anchors for repository evidence, extract length, dates, and obvious email/phone leakage.
- `python3 research/validate_ledger.py` → `PASS: 14 records valid; 14 retained; IDs and contradiction references consistent`.
- `.serena/project.yml` → Python added only after the validator became a real repository source file.
- `serena project index .` → indexed one Python source file.
- `serena project health-check .` → `Health check passed - All tools working correctly`; symbol overview, symbol search, references, and pattern search exercised.
- `serena memories check .` → `No referential integrity issues found`.

## Risks and gaps

- Seed records prove source capture and structural discipline, not prevalence, severity, product value, or local hospital fit.
- Several supplied Act requests are prohibited patient-specific CDS or treatment recommendations; they remain visible research findings but cannot be promoted.
- NCG/KCDO documents describe requirements and intended workflows, not adoption or observed usability at every institution.
- Direct workflow observation remains unavailable; all transfer limits must remain explicit.
- The public remote remains empty pending sanitisation review and separate publication approval.
- OMP project MCP still requires `/mcp list` and `/mcp test serena` after session activation.

## Next

Enter `P2` evidence collection. Map Indian medical, surgical, radiation, and multidisciplinary workflows; collect independent India-specific and transferable evidence for every existing theme; run the outside-theme scan; map existing solutions; retain attributable measurements; and search deliberately for contradictions. Run the ledger validator after every collection batch and write `C2` after the first complete evidence slice.

## Sign-off needed

The owner should review the frozen research questions, evidence schema, clinical boundary, and completion thresholds before closing `P1`. Local `P2` research may proceed because it does not change project scope, publish data, or cross the owner authority boundary.
