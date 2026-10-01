import {
  ENGINE_VERSION,
  POLICY_VERSION,
  type Assessment,
  type Assertion,
  type CriterionModel,
  type Predicate,
  type SyntheticPatient,
  type Trace,
  type Truth,
} from "./model";
import { pairKey } from "./identity";

const day = 86_400_000;
function dateValue(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return null;
  const parsed = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(parsed) &&
    new Date(parsed).toISOString().slice(0, 10) === value
    ? parsed
    : null;
}
function unknown(
  reason: Trace["reasons"][number],
  explanation: string,
  assertionIds: string[] = [],
): Trace {
  return { truth: "unknown", reasons: [reason], explanation, assertionIds };
}
function evidence(
  patient: SyntheticPatient,
  concept: string,
): { assertion?: Assertion; trace?: Trace } {
  const candidates = patient.assertions.filter(
    (a) => a.concept === concept && a.authority !== "rejected",
  );
  if (!candidates.length)
    return { trace: unknown("missing", `No recorded ${concept}.`) };
  const ids = candidates.map((a) => a.id);
  if (
    new Set(candidates.map((a) => JSON.stringify([a.value, a.unit ?? ""])))
      .size > 1
  )
    return {
      trace: unknown("conflict", `Unreconciled ${concept} assertions.`, ids),
    };
  const confirmed = candidates.filter((a) => a.authority === "confirmed");
  if (!confirmed.length)
    return {
      trace: unknown(
        "unreviewed",
        `${concept} has not been confirmed by the demo reviewer.`,
        ids,
      ),
    };
  if (
    confirmed.some((a) => !patient.artifacts.some((s) => s.id === a.artifactId))
  )
    return {
      trace: unknown(
        "missing",
        `Original source for ${concept} is unavailable.`,
        ids,
      ),
    };
  return {
    assertion: confirmed.reduce((a, b) =>
      a.observedAt >= b.observedAt ? a : b,
    ),
  };
}
export function evaluatePredicate(
  predicate: Predicate,
  patient: SyntheticPatient,
  evaluatedAt: string,
): Trace {
  if (predicate.op === "unsupported")
    return unknown("unsupported", predicate.reason);
  if (predicate.op === "and" || predicate.op === "or") {
    if (!predicate.children.length)
      return unknown("unsupported", "Empty logical expression.");
    const children = predicate.children.map((p) =>
      evaluatePredicate(p, patient, evaluatedAt),
    );
    const decisive = predicate.op === "and" ? "false" : "true";
    const truth: Truth = children.some((c) => c.truth === decisive)
      ? decisive
      : children.some((c) => c.truth === "unknown")
        ? "unknown"
        : predicate.op === "and"
          ? "true"
          : "false";
    return {
      truth,
      children,
      reasons: [...new Set(children.flatMap((c) => c.reasons))],
      assertionIds: [...new Set(children.flatMap((c) => c.assertionIds))],
      explanation: `${predicate.op.toUpperCase()}: ${children.map((c) => c.truth).join(", ")}.`,
    };
  }
  if (predicate.op === "not") {
    const child = evaluatePredicate(predicate.child, patient, evaluatedAt);
    return {
      ...child,
      truth:
        child.truth === "unknown"
          ? "unknown"
          : child.truth === "true"
            ? "false"
            : "true",
      explanation: `NOT (${child.explanation})`,
      children: [child],
    };
  }
  if (predicate.op === "sequence") {
    if (predicate.concepts.length < 2)
      return unknown("unsupported", "Sequence requires two recorded events.");
    const entries = predicate.concepts.map((c) => evidence(patient, c));
    const uncertain = entries.find((e) => e.trace);
    if (uncertain?.trace) return uncertain.trace;
    const now = dateValue(evaluatedAt);
    if (
      now === null ||
      entries.some((e) => {
        const observed = dateValue(e.assertion!.observedAt);
        return observed === null || observed > now;
      })
    )
      return unknown(
        "ambiguous",
        "Sequence observation/evaluation dates must be valid and not in the future.",
        entries.map((e) => e.assertion!.id),
      );
    const dates = entries.map((e) => dateValue(e.assertion!.value));
    if (dates.some((d) => d === null))
      return unknown("ambiguous", "Sequence dates must have day precision.");
    return {
      truth: dates.every((d, i) => i === 0 || d! > dates[i - 1]!)
        ? "true"
        : "false",
      reasons: [],
      assertionIds: entries.map((e) => e.assertion!.id),
      explanation:
        "Compared recorded event dates in the specified strict order.",
    };
  }
  const selected = evidence(patient, predicate.concept);
  if (selected.trace) return selected.trace;
  const assertion = selected.assertion!;
  const assertionIds = [assertion.id];
  const now = dateValue(evaluatedAt);
  const observed = dateValue(assertion.observedAt);
  if (now === null || observed === null || observed > now)
    return unknown(
      "ambiguous",
      "Observation/evaluation date is partial, invalid or in the future.",
      assertionIds,
    );
  if (
    "maxAgeDays" in predicate &&
    predicate.maxAgeDays !== undefined &&
    (now - observed) / day > predicate.maxAgeDays
  )
    return unknown(
      "stale",
      `${predicate.concept} is older than ${predicate.maxAgeDays} days.`,
      assertionIds,
    );
  let result: boolean;
  let explanation: string;
  if (predicate.op === "eq" || predicate.op === "in") {
    result = predicate.values.some((v) => v === assertion.value);
    explanation = `${String(assertion.value)} compared with exact declared values: ${predicate.values.join(", ")}.`;
  } else if (predicate.op === "range") {
    if (
      typeof assertion.value !== "number" ||
      !Number.isFinite(assertion.value)
    )
      return unknown(
        "ambiguous",
        "A finite numeric value is required.",
        assertionIds,
      );
    if ((assertion.unit ?? "") !== (predicate.unit ?? ""))
      return unknown(
        "unsupported",
        `Unit ${assertion.unit ?? "(none)"} cannot be substituted for ${predicate.unit ?? "(none)"} without a reviewed conversion.`,
        assertionIds,
      );
    result =
      (predicate.min === undefined ||
        (predicate.minInclusive
          ? assertion.value >= predicate.min
          : assertion.value > predicate.min)) &&
      (predicate.max === undefined ||
        (predicate.maxInclusive
          ? assertion.value <= predicate.max
          : assertion.value < predicate.max));
    explanation = `${assertion.value} ${assertion.unit ?? ""}; lower ${predicate.min ?? "unbounded"} (${predicate.minInclusive ? "inclusive" : "exclusive"}), upper ${predicate.max ?? "unbounded"} (${predicate.maxInclusive ? "inclusive" : "exclusive"}).`;
  } else {
    const anchor =
      predicate.anchor === "evaluation-date"
        ? undefined
        : evidence(patient, predicate.anchor);
    if (anchor?.trace) return anchor.trace;
    if (anchor) {
      const observedAnchor = dateValue(anchor.assertion!.observedAt);
      if (observedAnchor === null || observedAnchor > now)
        return unknown(
          "ambiguous",
          "Anchor observation date is invalid or in the future.",
          [...assertionIds, anchor.assertion!.id],
        );
    }
    const anchorDate = anchor ? dateValue(anchor.assertion!.value) : now;
    const eventDate = dateValue(assertion.value);
    if (anchorDate === null || eventDate === null)
      return unknown(
        "ambiguous",
        "Interval needs complete day-precision dates.",
        assertionIds,
      );
    if (anchor) assertionIds.push(anchor.assertion!.id);
    const elapsed = (anchorDate - eventDate) / day;
    result =
      elapsed >= predicate.minDays &&
      (predicate.maxDays === undefined || elapsed <= predicate.maxDays);
    explanation = `${elapsed} days; inclusive permitted interval ${predicate.minDays}–${predicate.maxDays ?? "unbounded"}.`;
  }
  return {
    truth: result ? "true" : "false",
    reasons: [],
    assertionIds,
    explanation,
  };
}
export function assessPair(
  patient: SyntheticPatient,
  model: CriterionModel,
  evaluatedAt: string,
  id: string,
): Assessment {
  const findings = model.criteria.map((criterion) => {
    const applicability = criterion.applicability
      ? evaluatePredicate(criterion.applicability, patient, evaluatedAt)
      : undefined;
    if (applicability?.truth === "false")
      return {
        criterionId: criterion.id,
        state: "not-applicable" as const,
        trace: applicability,
      };
    const trace =
      applicability?.truth === "unknown"
        ? applicability
        : evaluatePredicate(criterion.predicate, patient, evaluatedAt);
    const state =
      trace.truth === "unknown"
        ? ("unresolved" as const)
        : (trace.truth === "true") === (criterion.section === "inclusion")
          ? ("supported" as const)
          : ("violated" as const);
    return { criterionId: criterion.id, state, trace };
  });
  const supported = findings.filter((f) => f.state === "supported").length;
  const violated = findings.filter((f) => f.state === "violated").length;
  const unresolved = findings.filter((f) => f.state === "unresolved").length;
  const denominator = supported + violated + unresolved;
  const limitation = !patient.synthetic
    ? "Only synthetic records may be assessed."
    : model.status !== "published" || !model.complete
      ? "A complete published demonstration model is required."
      : !denominator
        ? "No applicable requirements."
        : undefined;
  return {
    id,
    pairKey: pairKey(patient.id, model.trialId, model.cohort),
    patientId: patient.id,
    patientVersion: patient.version,
    trialId: model.trialId,
    cohort: model.cohort,
    modelId: model.id,
    modelVersion: model.version,
    sourceVersion: model.sourceVersion,
    modelSnapshot: model,
    assertionSnapshot: patient.assertions,
    evaluatedAt,
    engineVersion: ENGINE_VERSION,
    policyVersion: POLICY_VERSION,
    findings,
    supported,
    violated,
    unresolved,
    denominator,
    notApplicable: findings.length - denominator,
    score: limitation ? null : supported / denominator,
    assessability: limitation ? null : (supported + violated) / denominator,
    limitation,
  };
}
export function compareAssessments(a: Assessment, b: Assessment): number {
  return (
    Number(a.score === null) - Number(b.score === null) ||
    Number(a.violated > 0) - Number(b.violated > 0) ||
    (b.score ?? 0) - (a.score ?? 0) ||
    a.unresolved - b.unresolved ||
    a.pairKey.localeCompare(b.pairKey)
  );
}
