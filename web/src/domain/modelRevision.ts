import type { CriterionModel, Predicate } from "./model";
import { demoFields } from "./patients";
function validate(value: unknown, depth = 0): asserts value is Predicate {
  if (!value || typeof value !== "object" || depth > 16)
    throw new Error(
      "A predicate must be an object with at most 16 nested levels.",
    );
  const p = value as Record<string, unknown>;
  const concept = (v: unknown) =>
    typeof v === "string" && demoFields.some((f) => f.concept === v);
  const finite = (v: unknown) => typeof v === "number" && Number.isFinite(v);
  if (p.op === "and" || p.op === "or") {
    if (!Array.isArray(p.children) || !p.children.length)
      throw new Error("Logical groups require children.");
    p.children.forEach((c) => validate(c, depth + 1));
    return;
  }
  if (p.op === "not") {
    validate(p.child, depth + 1);
    return;
  }
  if (p.op === "unsupported") {
    if (typeof p.reason !== "string" || !p.reason.trim())
      throw new Error("Unsupported logic requires a reason.");
    return;
  }
  if (p.op === "sequence") {
    if (
      !Array.isArray(p.concepts) ||
      p.concepts.length < 2 ||
      !p.concepts.every(concept)
    )
      throw new Error("Sequence requires at least two known concepts.");
    return;
  }
  if (!concept(p.concept))
    throw new Error(
      "Use a supplied synthetic concept; unknown clinical interpretation must remain unsupported.",
    );
  if (
    p.maxAgeDays !== undefined &&
    (!finite(p.maxAgeDays) || (p.maxAgeDays as number) < 0)
  )
    throw new Error("Maximum age must be nonnegative days.");
  if (p.op === "eq" || p.op === "in") {
    if (
      !Array.isArray(p.values) ||
      !p.values.length ||
      !p.values.every(
        (v) => typeof v === "string" || typeof v === "boolean" || finite(v),
      )
    )
      throw new Error("Equality requires typed scalar values.");
    return;
  }
  if (p.op === "range") {
    if (
      (p.min === undefined && p.max === undefined) ||
      (p.min !== undefined && !finite(p.min)) ||
      (p.max !== undefined && !finite(p.max)) ||
      (finite(p.min) &&
        finite(p.max) &&
        (p.min as number) > (p.max as number)) ||
      typeof p.minInclusive !== "boolean" ||
      typeof p.maxInclusive !== "boolean" ||
      (p.unit !== undefined && typeof p.unit !== "string")
    )
      throw new Error(
        "Range requires ordered finite bounds, explicit inclusivity and an optional exact unit.",
      );
    return;
  }
  if (p.op === "interval") {
    if (
      (p.anchor !== "evaluation-date" && !concept(p.anchor)) ||
      !finite(p.minDays) ||
      (p.maxDays !== undefined &&
        (!finite(p.maxDays) || (p.maxDays as number) < (p.minDays as number)))
    )
      throw new Error(
        "Interval requires a known anchor and ordered day bounds.",
      );
    return;
  }
  throw new Error("Unknown operator; use unsupported with a reason.");
}
export function reviseModel(
  model: CriterionModel,
  json: string,
): CriterionModel {
  const rows: unknown = JSON.parse(json);
  if (!Array.isArray(rows) || rows.length !== model.criteria.length)
    throw new Error("Every source criterion must remain present exactly once.");
  const ids = new Set<string>();
  const criteria = rows.map((row) => {
    if (!row || typeof row !== "object")
      throw new Error("Invalid criterion revision.");
    const original = model.criteria.find((c) => c.id === row.id);
    if (!original || ids.has(row.id))
      throw new Error(
        "Criterion IDs must match the source model exactly once.",
      );
    ids.add(row.id);
    validate(row.predicate);
    if (row.applicability !== undefined) validate(row.applicability);
    return {
      ...original,
      predicate: row.predicate,
      applicability: row.applicability,
    };
  });
  return { ...model, criteria };
}
