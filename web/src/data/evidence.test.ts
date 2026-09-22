/// <reference types="node" />

import assert from "node:assert/strict";
import test from "node:test";
import type { TrialRecord } from "../types.js";
import {
  buildConditionCoverage,
  buildCrossTrialEvidenceRows,
  buildInterventionIndex,
  deterministicTrialAbstract,
  parseExactIntervention,
  type GlobalTrialEvidence,
} from "./evidence.js";

function trial(overrides: Partial<TrialRecord> = {}): TrialRecord {
  return {
    id: "NCT00000001",
    source: "ClinicalTrials.gov",
    sourceUrl: "https://clinicaltrials.gov/study/NCT00000001",
    briefTitle: "Source title",
    officialTitle: "Official source title",
    conditions: ["Breast Carcinoma", "Breast cancer"],
    keywords: [],
    overallStatus: "RECRUITING",
    statusLabel: "Recruiting",
    statusVerifiedDate: "2026-09",
    lastUpdatePostedDate: "2026-09-01",
    studyType: "INTERVENTIONAL",
    phases: ["Phase 2"],
    primaryPurpose: "TREATMENT",
    enrollment: 120,
    enrollmentType: "ESTIMATED",
    leadSponsor: "Public sponsor",
    sponsorClass: "INDUSTRY",
    briefSummary: "Registry-authored brief summary.",
    briefSummaryTruncated: false,
    eligibilityCriteria: "Source criteria",
    eligibilityCriteriaTruncated: false,
    minimumAge: "18 Years",
    maximumAge: "75 Years",
    sex: "ALL",
    healthyVolunteers: false,
    interventions: ["Drug: Pembrolizumab", "Procedure: Biopsy"],
    indiaLocations: [{
      facility: "Public site",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "",
      status: "RECRUITING",
      contactAvailable: false,
    }],
    ...overrides,
  };
}

test("builds normalized condition coverage without double-counting a trial", () => {
  const rows = buildConditionCoverage([
    trial(),
    trial({ id: "NCT00000002", conditions: ["Breast Neoplasms"], indiaLocations: [] }),
  ]);
  assert.deepEqual(rows[0], {
    condition: "Breast cancer",
    rawTerms: ["Breast Carcinoma", "Breast Neoplasms", "Breast cancer"],
    trialCount: 2,
    share: 1,
    indiaSiteCount: 1,
    exactInterventionCount: 2,
    trialIds: ["NCT00000001", "NCT00000002"],
  });
});

test("keeps exact drug and biological terms without inventing aliases", () => {
  assert.deepEqual(parseExactIntervention("Drug: Pembrolizumab (KEYTRUDA®)"), {
    kind: "Drug",
    name: "Pembrolizumab (KEYTRUDA®)",
    exactLabel: "Drug: Pembrolizumab (KEYTRUDA®)",
  });
  assert.equal(parseExactIntervention("Procedure: Biopsy"), null);
  const index = buildInterventionIndex([
    trial(),
    trial({ id: "NCT00000002", interventions: ["Drug: Pembrolizumab", "Biological: BCD-217"] }),
  ]);
  assert.equal(index.find((entry) => entry.exactLabel === "Drug: Pembrolizumab")?.trialCount, 2);
  assert.equal(index.some((entry) => entry.exactLabel.includes("Biopsy")), false);
});

test("builds a deterministic source-only abstract", () => {
  const abstract = deterministicTrialAbstract(trial());
  assert.equal(abstract.sourceSummary, "Registry-authored brief summary.");
  assert.match(abstract.studyDesign, /Phase 2/);
  assert.match(abstract.population, /18 Years to 75 Years/);
  assert.equal(abstract.interventions, "Drug: Pembrolizumab · Procedure: Biopsy");
  assert.deepEqual(abstract.missingFields, []);
  assert.deepEqual(abstract.sourceNotes, []);
  assert.match(deterministicTrialAbstract(trial({ briefSummaryTruncated: true })).sourceNotes[0] ?? "", /source excerpt/);
  assert.equal(JSON.stringify(abstract).includes("eligible"), false);
  assert.equal(JSON.stringify(abstract).includes("recommended"), false);
});

test("maps global evidence into a descriptive population and time row", () => {
  const globalTrial: GlobalTrialEvidence = {
    id: "NCT03625323",
    briefTitle: "Global trial",
    officialTitle: "",
    overallStatus: "COMPLETED",
    statusLabel: "Completed",
    statusVerifiedDate: "2026-03",
    startDate: "2019-02-21",
    primaryCompletionDate: "2022-06-02",
    completionDate: "2024-11-25",
    lastUpdatePostedDate: "2026-04-22",
    briefSummary: "Source summary",
    briefSummaryTruncated: false,
    conditions: ["NSCLC"],
    interventions: [{ type: "DRUG", name: "pembrolizumab" }],
    phases: ["PHASE2"],
    enrollment: { count: 187, type: "ACTUAL" },
    population: { sex: "ALL", minimumAge: "18 Years", maximumAge: "", healthyVolunteers: false },
    countries: ["Australia", "United States"],
    leadSponsor: "Public sponsor",
    sourceUrl: "https://clinicaltrials.gov/study/NCT03625323",
  };
  assert.deepEqual(buildCrossTrialEvidenceRows([globalTrial])[0], {
    trialId: "NCT03625323",
    title: "Global trial",
    population: "All · 18 Years · n=187",
    studyPeriod: "2019-02-21 → 2024-11-25",
    phaseAndStatus: "Phase2 · Completed",
    geography: "Australia, United States",
    sourceUrl: "https://clinicaltrials.gov/study/NCT03625323",
  });
});
