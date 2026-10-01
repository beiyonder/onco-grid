import type { TrialRecord } from "../types";
import { contentVersion } from "./identity";
export interface RegistryStudy extends TrialRecord {
  sourceVersion: string;
  detailState: "summary" | "complete" | "missing";
  countries: string[];
  locations: Array<{
    facility: string;
    city: string;
    state: string;
    country: string;
    status: string;
  }>;
  fetchedAt: string;
}
export function projectSnapshotTrial(
  trial: TrialRecord,
  fetchedAt: string,
): RegistryStudy {
  return {
    ...trial,
    sourceVersion: contentVersion(JSON.stringify(trial)),
    detailState: trial.eligibilityCriteriaTruncated
      ? "summary"
      : trial.eligibilityCriteria
        ? "complete"
        : "missing",
    countries: ["India"],
    locations: trial.indiaLocations.map((location) => ({
      facility: location.facility,
      city: location.city,
      state: location.state,
      country: "India",
      status: location.status,
    })),
    fetchedAt,
  };
}
export async function fetchRegistryStudy(
  id: string,
  signal?: AbortSignal,
): Promise<RegistryStudy> {
  if (!/^NCT\d{8}$/.test(id))
    throw new Error("A valid NCT identifier is required.");
  const response = await fetch(
    `/api/trial-evidence?id=${encodeURIComponent(id)}`,
    { signal },
  );
  if (!response.ok)
    throw new Error(`Full registry detail unavailable (${response.status}).`);
  const { evidence: e } = await response.json();
  if (e?.trialId !== id || !Array.isArray(e.locations))
    throw new Error(
      "Registry detail did not match the requested study contract.",
    );
  const study: TrialRecord = {
    id,
    source: "ClinicalTrials.gov",
    sourceUrl: e.sourceUrl,
    briefTitle: e.briefTitle,
    officialTitle: e.officialTitle,
    conditions: e.conditions,
    keywords: [],
    overallStatus: e.overallStatus,
    statusLabel: e.overallStatus.replaceAll("_", " "),
    statusVerifiedDate: e.statusVerifiedDate,
    lastUpdatePostedDate: e.lastUpdatePostedDate,
    studyType: e.studyType,
    phases: e.phases,
    primaryPurpose: e.primaryPurpose,
    enrollment: e.enrollment.count ?? 0,
    enrollmentType: e.enrollment.type,
    leadSponsor: e.leadSponsor,
    sponsorClass: "",
    briefSummary: e.briefSummary,
    briefSummaryTruncated: false,
    eligibilityCriteria: e.eligibility.criteria,
    eligibilityCriteriaTruncated: false,
    minimumAge: e.eligibility.minimumAge,
    maximumAge: e.eligibility.maximumAge,
    sex: e.eligibility.sex,
    healthyVolunteers: e.eligibility.healthyVolunteers === true,
    interventions: e.interventions.map(
      (i: { type: string; name: string }) => `${i.type}: ${i.name}`,
    ),
    indiaLocations: e.locations
      .filter((l: { country: string }) => l.country === "India")
      .map(
        (l: {
          facility: string;
          city: string;
          state: string;
          status: string;
        }) => ({ ...l, postalCode: "", contactAvailable: false }),
      ),
  };
  return {
    ...study,
    sourceVersion: contentVersion(JSON.stringify([study, e.locations])),
    detailState: study.eligibilityCriteria ? "complete" : "missing",
    countries: [
      ...new Set<string>(
        e.locations.map((l: { country: string }) => l.country),
      ),
    ],
    locations: e.locations,
    fetchedAt: e.fetchedAt,
  };
}
