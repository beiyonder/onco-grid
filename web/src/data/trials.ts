import snapshotUrl from "../../data/india-oncology-trials.json?url";
import type { TrialRecord } from "../types";

export const trialSnapshotUrl = snapshotUrl;

const conditionDisplayMap: Record<string, string> = {
  "non small cell lung cancer": "Non-small cell lung cancer",
  "non-small-cell lung cancer": "Non-small cell lung cancer",
  "carcinoma of the lung": "Lung cancer",
  "breast carcinoma": "Breast cancer",
  "colorectal carcinoma": "Colorectal cancer",
  neoplasm: "Cancer",
};

const stateDisplayMap: Record<string, string> = {
  "national capital territory of delhi": "Delhi",
  "orissa": "Odisha",
  "pondicherry": "Puducherry",
  "tamilnadu": "Tamil Nadu",
  "west bengal": "West Bengal",
};

function sentenceCase(value: string): string {
  if (!value) return value;
  if (/^[A-Z0-9\-\s()/+]+$/.test(value) && value.length < 8) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function normalizeCondition(raw: string): string {
  const compact = raw.trim().replace(/\s+/g, " ");
  return conditionDisplayMap[compact.toLowerCase()] ?? sentenceCase(compact);
}

export function displayConditions(trial: TrialRecord): string[] {
  const seen = new Set<string>();
  return trial.conditions.reduce<string[]>((result, raw) => {
    const display = normalizeCondition(raw);
    const key = display.toLocaleLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(display);
    }
    return result;
  }, []);
}

export function normalizeState(raw: string): string {
  const compact = raw.trim().replace(/\s+/g, " ");
  return stateDisplayMap[compact.toLowerCase()] ?? sentenceCase(compact);
}

export function displayStates(trial: TrialRecord): string[] {
  return Array.from(
    new Set(trial.indiaLocations.map((location) => normalizeState(location.state))),
  ).sort((left, right) => left.localeCompare(right));
}


export function formatSourceDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export interface CriterionExcerpt {
  id: string;
  section: "Inclusion" | "Exclusion" | "Protocol";
  text: string;
}

export function criterionExcerpts(trial: TrialRecord): CriterionExcerpt[] {
  const normalized = trial.eligibilityCriteria
    .replace(/\r/g, "")
    .replace(/\s*\*\s*/g, "\n")
    .replace(/\s+(?=(?:Inclusion|Exclusion) Criteria:?)/gi, "\n")
    .trim();

  const sourceLines = normalized
    .split(/\n+/)
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);

  let section: CriterionExcerpt["section"] = "Protocol";
  const excerpts: CriterionExcerpt[] = [];

  sourceLines.forEach((line) => {
    const inclusionMatch = line.match(/^Inclusion Criteria:?\s*(.*)$/i);
    const exclusionMatch = line.match(/^Exclusion Criteria:?\s*(.*)$/i);
    if (inclusionMatch) {
      section = "Inclusion";
      const remainder = inclusionMatch[1]?.trim();
      if (remainder) excerpts.push({ id: `criterion-${excerpts.length + 1}`, section, text: remainder });
      return;
    }
    if (exclusionMatch) {
      section = "Exclusion";
      const remainder = exclusionMatch[1]?.trim();
      if (remainder) excerpts.push({ id: `criterion-${excerpts.length + 1}`, section, text: remainder });
      return;
    }
    excerpts.push({ id: `criterion-${excerpts.length + 1}`, section, text: line });
  });

  if (excerpts.length > 1) return excerpts;

  const fallback = trial.eligibilityCriteria
    .split(/(?<=\.)\s+(?=[A-Z0-9])/)
    .map((line) => line.trim())
    .filter(Boolean);

  return fallback.map((text, index) => ({
    id: `criterion-${index + 1}`,
    section: "Protocol",
    text,
  }));
}
