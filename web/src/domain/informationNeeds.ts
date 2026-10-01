import type { Criterion, Predicate, SyntheticPatient } from "./model";
import { evaluatePredicate } from "./evaluate";
export function informationNeeds(
  predicate: Predicate,
  patient: SyntheticPatient,
  at: string,
): { concept: string; timeWindow: string }[] {
  if (evaluatePredicate(predicate, patient, at).truth !== "unknown") return [];
  if (predicate.op === "and" || predicate.op === "or")
    return predicate.children.flatMap((p) => informationNeeds(p, patient, at));
  if (predicate.op === "not")
    return informationNeeds(predicate.child, patient, at);
  if (predicate.op === "unsupported") return [];
  const concepts =
    predicate.op === "sequence"
      ? predicate.concepts
      : predicate.op === "interval" && predicate.anchor !== "evaluation-date"
        ? [predicate.concept, predicate.anchor]
        : [predicate.concept];
  const timeWindow =
    predicate.op === "interval"
      ? `${at}; ${predicate.minDays}–${predicate.maxDays ?? "unbounded"} days before ${predicate.anchor}`
      : predicate.op === "sequence"
        ? `${at}; sequence ${predicate.concepts.join(" → ")}`
        : `${at}; ${predicate.maxAgeDays === undefined ? "no source age limit" : `source within ${predicate.maxAgeDays} days`}`;
  return concepts.map((concept) => ({ concept, timeWindow }));
}

export function criterionInformationNeeds(criterion:Criterion,patient:SyntheticPatient,at:string) {
  const applicability=criterion.applicability&&evaluatePredicate(criterion.applicability,patient,at);
  if(applicability?.truth==="false")return [];
  return informationNeeds(applicability?.truth==="unknown"?criterion.applicability!:criterion.predicate,patient,at);
}
