import type { Assessment, CriterionModel, RegistryCheck, SyntheticPatient } from "./model";
import type { RegistryStudy } from "./registry";
import { fetchRegistryStudy } from "./registry";
import { assessPair } from "./evaluate";
import { contentVersion } from "./identity";

// The retained snapshot collapses whitespace; preserve all other characters.
function eligibilityText(text: string): string {
  return text.replace(/\s+/gu, " ").trim();
}

export function checkRegistryModel(model: CriterionModel, study: RegistryStudy, checkedAt: string): RegistryCheck {
  const age = Date.parse(checkedAt) - Date.parse(study.fetchedAt);
  const base = {
    trialId: model.trialId, checkedAt, fetchedAt: study.fetchedAt,
    registryVersion: study.sourceVersion,
    eligibilityVersion: contentVersion(eligibilityText(study.eligibilityCriteria)),
    overallStatus: study.overallStatus, lastUpdatePostedDate: study.lastUpdatePostedDate,
    sourceUrl: study.sourceUrl, locations: study.locations,
  };
  if (study.id !== model.trialId || !Number.isFinite(age) || age < -60_000 || age > 15 * 60_000 || study.detailState !== "complete") {
    return { ...base, state: "unavailable", reason: "Complete, recent registry evidence could not be verified. Run again to refresh." };
  }
  // Compare the whole eligibility text, not just retained excerpts: added requirements must invalidate the model too.
  if (eligibilityText(study.eligibilityCriteria) !== eligibilityText(model.sourceText)) {
    return { ...base, state: "changed", reason: "Registry eligibility changed. Reconcile the complete criterion model before live assessment." };
  }
  return { ...base, state: "verified" };
}

export async function refreshMatchingSource(model: CriterionModel, signal: AbortSignal): Promise<RegistryCheck> {
  try {
    const study = await fetchRegistryStudy(model.trialId, signal);
    return checkRegistryModel(model, study, new Date().toISOString());
  } catch (error) {
    return {
      trialId: model.trialId, state: "unavailable", checkedAt: new Date().toISOString(),
      sourceUrl: model.sourceUrl,
      reason: error instanceof Error ? error.message : "Registry source unavailable. Run again to refresh.",
    };
  }
}

export function assessWithRegistry(patient: SyntheticPatient, model: CriterionModel, check: RegistryCheck, at: string, id: string): Assessment {
  const assessment = assessPair(patient, model, at, id);
  if (check.trialId !== model.trialId || check.state !== "verified" || check.eligibilityVersion !== model.sourceVersion) {
    return { ...assessment, registryCheck: check, score: null, assessability: null, limitation: check.reason ?? "Registry evidence does not match the criterion model." };
  }
  return { ...assessment, registryCheck: check };
}

export type MatchOutcome = "supported" | "gaps" | "conflict" | "unevaluated";
export function matchOutcome(assessment: Assessment): MatchOutcome {
  if (assessment.score === null) return "unevaluated";
  if (assessment.violated > 0) return "conflict";
  if (assessment.unresolved > 0) return "gaps";
  return "supported";
}
export const outcomeLabels: Record<MatchOutcome, string> = {
  supported: "Requirements supported", gaps: "Evidence needed",
  conflict: "Criterion conflict", unevaluated: "Not evaluated",
};
