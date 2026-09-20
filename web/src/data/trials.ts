import snapshotUrl from "../../data/india-oncology-trials.json?url";
import type { TrialRecord } from "../types";

export const trialSnapshotUrl = snapshotUrl;

const conditionDisplayMap: Record<string, string> = {
  "breast carcinoma": "Breast cancer",
  "breast neoplasms": "Breast cancer",
  breastcancer: "Breast cancer",
  "carcinoma of the lung": "Lung cancer",
  "carcinoma, non-small-cell lung": "Non-small cell lung cancer",
  "carcinoma, non-small-cell lung (nsclc)": "Non-small cell lung cancer",
  "colonic neoplasms": "Colon cancer",
  "colorectal carcinoma": "Colorectal cancer",
  "non small cell lung cancer": "Non-small cell lung cancer",
  "non-small-cell lung cancer": "Non-small cell lung cancer",
  neoplasm: "Cancer",
};

const stateDisplayMap: Record<string, string> = {
  "national capital territory of delhi": "Delhi",
  "orissa": "Odisha",
  "pondicherry": "Puducherry",
  "tamilnadu": "Tamil Nadu",
  "west bengal": "West Bengal",
};

const acronymDisplayMap: Record<string, string> = {
  aml: "AML",
  cll: "CLL",
  cml: "CML",
  dlbcl: "DLBCL",
  ecog: "ECOG",
  egfr: "EGFR",
  er: "ER",
  hcc: "HCC",
  her2: "HER2",
  hpv: "HPV",
  kras: "KRAS",
  mds: "MDS",
  nsclc: "NSCLC",
  "pd-1": "PD-1",
  "pd-l1": "PD-L1",
  sclc: "SCLC",
  sll: "SLL",
};

function normalizedDisplayCase(value: string): string {
  if (!value) return value;
  const sentence = value.toLocaleLowerCase().replace(/^[a-z]/, (character) => character.toLocaleUpperCase());
  return Object.entries(acronymDisplayMap).reduce((result, [raw, display]) => (
    result.replace(new RegExp(`\\b${raw}\\b`, "gi"), display)
  ), sentence).replace(/\bStage (i{1,3}|iv)\b/gi, (_match, numeral: string) => `Stage ${numeral.toLocaleUpperCase()}`);
}

export function normalizeCondition(raw: string): string {
  const compact = raw.trim().replace(/\s+/g, " ");
  return conditionDisplayMap[compact.toLowerCase()] ?? normalizedDisplayCase(compact);
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
  return stateDisplayMap[compact.toLowerCase()] ?? normalizedDisplayCase(compact);
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
    .replace(/\s+(?=(?:Inclusion|Exclusion) Criteria:)/g, "\n")
    .trim();

  const sourceLines = normalized
    .split(/\n+/)
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
  const hasSectionLabels = sourceLines.some((line) => /^(?:Inclusion|Exclusion) Criteria:/i.test(line));

  let section: CriterionExcerpt["section"] = "Protocol";
  const excerpts: CriterionExcerpt[] = [];

  sourceLines.forEach((line) => {
    if (section === "Protocol" && hasSectionLabels && /criteria include but are not limited to the following:?$/i.test(line)) return;
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
