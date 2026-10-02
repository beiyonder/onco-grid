import type { MatchOutcome } from "./liveMatching";

export const matchingExamples: Array<{ patientId: string; trialId: string; title: string; expected: MatchOutcome; detail: string }> = [
  { patientId: "SYN-001", trialId: "NCT06348199", title: "Complete lung record", expected: "supported", detail: "Patient 1 · six encoded requirements supported" },
  { patientId: "SYN-004", trialId: "NCT02161900", title: "Complete breast record", expected: "supported", detail: "Patient 4 · six encoded requirements supported" },
  { patientId: "SYN-006", trialId: "NCT02161900", title: "Documented exclusion", expected: "conflict", detail: "Patient 6 · prior cancer conflicts with one exclusion" },
  { patientId: "SYN-011", trialId: "NCT06348199", title: "Incomplete intake", expected: "gaps", detail: "Patient 11 · unreviewed and missing assertions" },
  { patientId: "SYN-003", trialId: "NCT03390686", title: "Conflicting molecular evidence", expected: "gaps", detail: "Patient 3 · opposing EGFR reports stay unresolved" },
];
