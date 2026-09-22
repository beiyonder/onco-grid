import type { TrialRecord } from "../types";
import { displayConditions, displayStates, formatDate, normalizeCondition } from "./trials";

export interface ConditionCoverageRow {
  condition: string;
  rawTerms: string[];
  trialCount: number;
  share: number;
  indiaSiteCount: number;
  exactInterventionCount: number;
  trialIds: string[];
}

export interface InterventionIndexEntry {
  kind: "Drug" | "Biological";
  name: string;
  exactLabel: string;
  trialCount: number;
  trialIds: string[];
  conditions: string[];
  phases: string[];
  statuses: string[];
}

export interface DeterministicAbstract {
  sourceSummary: string;
  studyDesign: string;
  population: string;
  interventions: string;
  geography: string;
  sourceStatus: string;
  sourceNotes: string[];
  missingFields: string[];
}

export interface GlobalTrialEvidence {
  id: string;
  briefTitle: string;
  officialTitle: string;
  overallStatus: string;
  statusLabel: string;
  statusVerifiedDate: string;
  startDate: string;
  primaryCompletionDate: string;
  completionDate: string;
  lastUpdatePostedDate: string;
  briefSummary: string;
  briefSummaryTruncated: boolean;
  conditions: string[];
  interventions: Array<{ type: string; name: string }>;
  phases: string[];
  enrollment: { count: number | null; type: string };
  population: {
    sex: string;
    minimumAge: string;
    maximumAge: string;
    healthyVolunteers: boolean | null;
  };
  countries: string[];
  leadSponsor: string;
  sourceUrl: string;
}

export interface GlobalTrialSearchResult {
  query: { mode: "condition" | "intervention"; term: string; pageSize: number };
  totalCount: number | null;
  trials: GlobalTrialEvidence[];
  nextPageToken?: string;
  source: {
    name: "ClinicalTrials.gov";
    apiVersion: "v2";
    fetchedAt: string;
    queryUrl: string;
  };
}

export interface PublicationMetadata {
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  publicationDate: string;
  publicationTypes: string[];
  recordStatus: string;
  doi: string;
  sourceUrl: string;
  matchBasis: "PubMed record matched the combined selected-NCT query";
}

export interface PublicationSearchResult {
  queryTrialIds: string[];
  totalCount: number;
  loadedCount: number;
  queryTranslation: string;
  publications: PublicationMetadata[];
  source: {
    name: "PubMed";
    fetchedAt: string;
    searchUrl: string;
  };
}

export interface CrossTrialEvidenceRow {
  trialId: string;
  title: string;
  population: string;
  studyPeriod: string;
  phaseAndStatus: string;
  geography: string;
  sourceUrl: string;
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function displayEnum(value: string): string {
  return value
    .toLocaleLowerCase()
    .replace(/_/g, " ")
    .replace(/(^|\s)\S/g, (character) => character.toLocaleUpperCase());
}

function valueOrMissing(value: string, missingLabel: string, missing: string[]): string {
  if (value.trim()) return value;
  missing.push(missingLabel);
  return "Not reported";
}

export function buildConditionCoverage(trials: TrialRecord[]): ConditionCoverageRow[] {
  const coverage = new Map<string, {
    trialIds: Set<string>;
    sites: number;
    interventions: Set<string>;
    rawTerms: Set<string>;
  }>();

  trials.forEach((trial) => {
    trial.conditions.forEach((rawCondition) => {
      const condition = normalizeCondition(rawCondition);
      const entry = coverage.get(condition) ?? {
        trialIds: new Set<string>(),
        sites: 0,
        interventions: new Set<string>(),
        rawTerms: new Set<string>(),
      };
      if (!entry.trialIds.has(trial.id)) entry.sites += trial.indiaLocations.length;
      entry.trialIds.add(trial.id);
      entry.rawTerms.add(rawCondition);
      trial.interventions.forEach((intervention) => entry.interventions.add(intervention));
      coverage.set(condition, entry);
    });
  });

  return Array.from(coverage, ([condition, entry]) => ({
    condition,
    rawTerms: Array.from(entry.rawTerms).sort(),
    trialCount: entry.trialIds.size,
    share: trials.length ? entry.trialIds.size / trials.length : 0,
    indiaSiteCount: entry.sites,
    exactInterventionCount: entry.interventions.size,
    trialIds: Array.from(entry.trialIds).sort(),
  })).sort((left, right) => right.trialCount - left.trialCount || left.condition.localeCompare(right.condition));
}

export function parseExactIntervention(value: string): Pick<InterventionIndexEntry, "kind" | "name" | "exactLabel"> | null {
  const match = value.match(/^([^:]+):\s*(.+)$/);
  if (!match) return null;
  const rawKind = match[1]?.trim().toLocaleLowerCase();
  const kind = rawKind === "drug" ? "Drug" : rawKind === "biological" ? "Biological" : null;
  const name = match[2]?.trim() ?? "";
  if (!kind || !name) return null;
  return { kind, name, exactLabel: `${kind}: ${name}` };
}

export function buildInterventionIndex(trials: TrialRecord[]): InterventionIndexEntry[] {
  const index = new Map<string, {
    kind: InterventionIndexEntry["kind"];
    name: string;
    exactLabel: string;
    trialIds: Set<string>;
    conditions: Set<string>;
    phases: Set<string>;
    statuses: Set<string>;
  }>();

  trials.forEach((trial) => {
    trial.interventions.forEach((raw) => {
      const parsed = parseExactIntervention(raw);
      if (!parsed) return;
      const key = parsed.exactLabel.toLocaleLowerCase();
      const entry = index.get(key) ?? {
        ...parsed,
        trialIds: new Set<string>(),
        conditions: new Set<string>(),
        phases: new Set<string>(),
        statuses: new Set<string>(),
      };
      entry.trialIds.add(trial.id);
      displayConditions(trial).forEach((condition) => entry.conditions.add(condition));
      trial.phases.forEach((phase) => entry.phases.add(phase));
      entry.statuses.add(trial.statusLabel);
      index.set(key, entry);
    });
  });

  return Array.from(index.values(), (entry) => ({
    kind: entry.kind,
    name: entry.name,
    exactLabel: entry.exactLabel,
    trialCount: entry.trialIds.size,
    trialIds: Array.from(entry.trialIds).sort(),
    conditions: Array.from(entry.conditions).sort(),
    phases: Array.from(entry.phases).sort(),
    statuses: Array.from(entry.statuses).sort(),
  })).sort((left, right) => right.trialCount - left.trialCount || left.exactLabel.localeCompare(right.exactLabel));
}

export function deterministicTrialAbstract(trial: TrialRecord): DeterministicAbstract {
  const missing: string[] = [];
  const conditions = displayConditions(trial);
  const populationAges = [trial.minimumAge, trial.maximumAge].filter(Boolean).join(" to ");
  const enrollment = trial.enrollment > 0
    ? `${trial.enrollment.toLocaleString("en-IN")} ${displayEnum(trial.enrollmentType || "not reported").toLocaleLowerCase()}`
    : "Enrollment not reported";
  if (!trial.briefSummary.trim()) missing.push("brief summary");
  if (!conditions.length) missing.push("conditions");
  if (!trial.interventions.length) missing.push("interventions");
  if (!populationAges) missing.push("age range");
  if (!trial.phases.length) missing.push("phase");

  return {
    sourceSummary: valueOrMissing(trial.briefSummary, "brief summary", missing),
    studyDesign: [
      trial.phases.length ? trial.phases.join(", ") : "Phase not reported",
      valueOrMissing(trial.studyType, "study type", missing),
      valueOrMissing(trial.primaryPurpose, "primary purpose", missing),
      enrollment,
      `Sponsor: ${valueOrMissing(trial.leadSponsor, "lead sponsor", missing)}`,
    ].join(" · "),
    population: [
      `Sex: ${valueOrMissing(trial.sex, "sex", missing)}`,
      `Age: ${populationAges || "Not reported"}`,
      `Healthy volunteers: ${trial.healthyVolunteers ? "Accepted" : "Not accepted"}`,
    ].join(" · "),
    interventions: trial.interventions.join(" · ") || "Not reported",
    geography: `${trial.indiaLocations.length} registry-listed India ${trial.indiaLocations.length === 1 ? "site" : "sites"}${displayStates(trial).length ? ` · ${displayStates(trial).join(", ")}` : ""}`,
    sourceStatus: `Registry: ${trial.statusLabel} · verified ${trial.statusVerifiedDate || "date not reported"} · updated ${trial.lastUpdatePostedDate ? formatDate(trial.lastUpdatePostedDate) : "date not reported"}`,
    sourceNotes: trial.briefSummaryTruncated ? ["The dated India snapshot retains a source excerpt rather than the complete registry brief summary."] : [],
    missingFields: unique(missing),
  };
}

export function deterministicGlobalTrialAbstract(trial: GlobalTrialEvidence): DeterministicAbstract {
  const missing: string[] = [];
  const populationAges = [trial.population.minimumAge, trial.population.maximumAge].filter(Boolean).join(" to ");
  if (!trial.briefSummary || trial.briefSummary === "Not reported") missing.push("brief summary");
  if (!trial.conditions.length) missing.push("conditions");
  if (!trial.interventions.length) missing.push("interventions");
  if (!populationAges) missing.push("age range");
  if (!trial.phases.length) missing.push("phase");
  if (!trial.startDate) missing.push("start date");
  if (!trial.completionDate) missing.push("completion date");

  return {
    sourceSummary: trial.briefSummary || "Not reported",
    studyDesign: [
      trial.phases.length ? trial.phases.map(displayEnum).join(", ") : "Phase not reported",
      trial.enrollment.count === null
        ? "Enrollment not reported"
        : `${trial.enrollment.count.toLocaleString("en-IN")} ${displayEnum(trial.enrollment.type).toLocaleLowerCase()}`,
      `Sponsor: ${trial.leadSponsor}`,
    ].join(" · "),
    population: [
      `Sex: ${displayEnum(trial.population.sex)}`,
      `Age: ${populationAges || "Not reported"}`,
      `Healthy volunteers: ${trial.population.healthyVolunteers === null ? "Not reported" : trial.population.healthyVolunteers ? "Accepted" : "Not accepted"}`,
    ].join(" · "),
    interventions: trial.interventions.map((intervention) => `${displayEnum(intervention.type)}: ${intervention.name}`).join(" · ") || "Not reported",
    geography: trial.countries.length ? `${trial.countries.length} registry-listed ${trial.countries.length === 1 ? "country" : "countries"} · ${trial.countries.join(", ")}` : "Countries not reported",
    sourceStatus: `Registry: ${trial.statusLabel} · verified ${trial.statusVerifiedDate || "date not reported"} · updated ${trial.lastUpdatePostedDate || "date not reported"}`,
    sourceNotes: trial.briefSummaryTruncated ? ["The bounded global API response truncates the registry brief summary after 1,600 characters; open the source for complete text."] : [],
    missingFields: unique(missing),
  };
}

export function buildCrossTrialEvidenceRows(trials: GlobalTrialEvidence[]): CrossTrialEvidenceRow[] {
  return trials.map((trial) => ({
    trialId: trial.id,
    title: trial.briefTitle,
    population: [
      displayEnum(trial.population.sex),
      [trial.population.minimumAge, trial.population.maximumAge].filter(Boolean).join(" to ") || "Age not reported",
      trial.enrollment.count === null ? "Enrollment not reported" : `n=${trial.enrollment.count.toLocaleString("en-IN")}`,
    ].join(" · "),
    studyPeriod: `${trial.startDate || "Start not reported"} → ${trial.completionDate || trial.primaryCompletionDate || "Completion not reported"}`,
    phaseAndStatus: `${trial.phases.length ? trial.phases.map(displayEnum).join(", ") : "Phase not reported"} · ${trial.statusLabel}`,
    geography: trial.countries.join(", ") || "Countries not reported",
    sourceUrl: trial.sourceUrl,
  }));
}
