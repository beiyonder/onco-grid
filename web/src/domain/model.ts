// Browser-only synthetic demonstration contracts. No clinical validation is implied.
export type Truth = "true" | "false" | "unknown";
export type Uncertainty =
  | "missing"
  | "stale"
  | "conflict"
  | "unsupported"
  | "unreviewed"
  | "ambiguous";
export type Value = string | number | boolean;
export interface SourceArtifact {
  id: string;
  patientId: string;
  title: string;
  kind: string;
  origin: "Simulated EMR" | "Synthetic document" | "Manual synthetic entry";
  authoredAt: string;
  importedAt: string;
  version: number;
  content: string;
  mediaType: "text/plain" | "application/json";
}
export interface Assertion {
  id: string;
  concept: string;
  value: Value;
  unit?: string;
  observedAt: string;
  artifactId: string;
  locator: string;
  raw: string;
  authority: "unreviewed" | "confirmed" | "rejected";
  reviewer?: string;
  reason?: string;
}
export interface SyntheticPatient {
  id: string;
  label: string;
  context: string;
  condition: string;
  owner: string;
  version: number;
  assertions: Assertion[];
  artifacts: SourceArtifact[];
  scenario: string;
  synthetic: true;
}
export type Predicate =
  | { op: "and"; children: Predicate[] }
  | { op: "or"; children: Predicate[] }
  | { op: "not"; child: Predicate }
  | { op: "unsupported"; reason: string }
  | { op: "eq"; concept: string; values: Value[]; maxAgeDays?: number }
  | { op: "in"; concept: string; values: Value[]; maxAgeDays?: number }
  | {
      op: "range";
      concept: string;
      min?: number;
      max?: number;
      minInclusive: boolean;
      maxInclusive: boolean;
      unit?: string;
      maxAgeDays?: number;
    }
  | {
      op: "interval";
      concept: string;
      anchor: string;
      minDays: number;
      maxDays?: number;
    }
  | { op: "sequence"; concepts: string[] };
export interface Criterion {
  id: string;
  section: "inclusion" | "exclusion";
  wording: string;
  sourceStart: number;
  sourceEnd: number;
  predicate: Predicate;
  applicability?: Predicate;
}
export interface CriterionModel {
  id: string;
  trialId: string;
  cohort: string;
  version: number;
  sourceVersion: string;
  sourceText: string;
  sourceUrl: string;
  criteria: Criterion[];
  complete: boolean;
  status: "draft" | "published";
  qualification: "Synthetic demonstration interpretation — not clinically validated";
  publishedBy?: string;
  publishedAt?: string;
  changeReason?: string;
}
export interface Trace {
  truth: Truth;
  reasons: Uncertainty[];
  explanation: string;
  assertionIds: string[];
  children?: Trace[];
}
export interface Finding {
  criterionId: string;
  state: "supported" | "violated" | "unresolved" | "not-applicable";
  trace: Trace;
}
export interface Assessment {
  id: string;
  pairKey: string;
  patientId: string;
  patientVersion: number;
  trialId: string;
  cohort: string;
  modelId: string;
  modelVersion: number;
  sourceVersion: string;
  evaluatedAt: string;
  engineVersion: string;
  policyVersion: string;
  modelSnapshot: CriterionModel;
  assertionSnapshot: Assertion[];
  findings: Finding[];
  supported: number;
  violated: number;
  unresolved: number;
  notApplicable: number;
  denominator: number;
  score: number | null;
  assessability: number | null;
  limitation?: string;
}
export interface MatchRun {
  id: string;
  direction: "patient-first" | "trial-first";
  scope: string;
  startedAt: string;
  status: "running" | "complete" | "cancelled";
  assessments: Assessment[];
  retrieved: number;
  excluded: number;
  unmodeled: string[];
}
export interface HumanReview {
  assessmentId: string;
  criterionId: string;
  decision: "accept" | "override" | "defer";
  author: string;
  role: string;
  reason: string;
  evidence: string;
  recordedAt: string;
}
export interface GapTask {
  id: string;
  patientId: string;
  informationNeed: string;
  timeWindow: string;
  links: {
    trialId: string;
    cohort: string;
    criterionId: string;
    assessmentId: string;
  }[];
  owner: string;
  state:
    | "accepted"
    | "evidence-received"
    | "reviewed"
    | "reassessed"
    | "unable-to-obtain"
    | "cancelled";
  reason: string;
  assertionIds: string[];
  createdAt: string;
}
export interface ScreeningDisposition {
  assessmentId: string;
  site: string;
  assignedTo: string;
  author: string;
  role: string;
  state:
    | "Assigned"
    | "In review"
    | "Needs information"
    | "Ready for site screening"
    | "Deferred"
    | "Not proceeding"
    | "Eligible"
    | "Ineligible";
  reason: string;
  evidence: string;
  recordedAt: string;
}
export interface SyntheticPacket {
  id: string;
  assessmentId: string;
  author: string;
  createdAt: string;
  state: "Draft" | "Ready for simulation" | "Simulated acknowledgement";
}
export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
  reason: string;
}
export const SCENARIO_DATE = "2026-09-20";
export const ENGINE_VERSION = "demo-predicates-1";
export const POLICY_VERSION = "unweighted-roots-blockers-first-1";
