import { validateTrialId } from "./policy.js";

interface ClinicalTrialsStudy {
  protocolSection?: {
    identificationModule?: {
      nctId?: string;
      briefTitle?: string;
      officialTitle?: string;
    };
    statusModule?: {
      overallStatus?: string;
      statusVerifiedDate?: string;
      lastUpdatePostDateStruct?: { date?: string };
    };
    descriptionModule?: { briefSummary?: string };
    conditionsModule?: { conditions?: string[] };
    designModule?: {
      studyType?: string;
      designInfo?: { primaryPurpose?: string };
      phases?: string[];
      enrollmentInfo?: { count?: number; type?: string };
    };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string } };
    armsInterventionsModule?: { interventions?: Array<{ type?: string; name?: string }> };
    eligibilityModule?: {
      eligibilityCriteria?: string;
      healthyVolunteers?: boolean;
      sex?: string;
      minimumAge?: string;
      maximumAge?: string;
    };
    contactsLocationsModule?: {
      locations?: Array<{
        facility?: string;
        status?: string;
        city?: string;
        state?: string;
        country?: string;
      }>;
    };
  };
  derivedSection?: {
    miscInfoModule?: { versionHolder?: string };
  };
}

export interface OfficialTrialEvidence {
  trialId: string;
  briefTitle: string;
  officialTitle: string;
  overallStatus: string;
  statusVerifiedDate: string;
  lastUpdatePostedDate: string;
  versionDate: string;
  briefSummary: string;
  conditions: string[];
  phases: string[];
  enrollment: { count: number | null; type: string };
  studyType: string;
  primaryPurpose: string;
  leadSponsor: string;
  interventions: Array<{ type: string; name: string }>;
  locations: Array<{ facility: string; status: string; city: string; state: string; country: string }>;
  eligibility: {
    criteria: string;
    healthyVolunteers: boolean | null;
    sex: string;
    minimumAge: string;
    maximumAge: string;
  };
  indiaLocations: Array<{
    facility: string;
    status: string;
    city: string;
    state: string;
  }>;
  sourceUrl: string;
  apiUrl: string;
  fetchedAt: string;
}

export async function fetchOfficialTrialEvidence(trialIdInput: unknown): Promise<OfficialTrialEvidence> {
  const trialId = validateTrialId(trialIdInput);
  const apiUrl = `https://clinicaltrials.gov/api/v2/studies/${trialId}`;
  const response = await fetch(apiUrl, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) {
    throw new Error(response.status === 404
      ? "The official registry record was not found."
      : `The official registry returned ${response.status}.`);
  }

  const study = await response.json() as ClinicalTrialsStudy;
  const protocol = study.protocolSection;
  const identification = protocol?.identificationModule;
  if (identification?.nctId !== trialId) throw new Error("The official registry response did not match the requested trial.");
  const status = protocol?.statusModule;
  const design = protocol?.designModule;
  const eligibility = protocol?.eligibilityModule;
  const indiaLocations = (protocol?.contactsLocationsModule?.locations ?? [])
    .filter((location) => location.country === "India")
    .map((location) => ({
      facility: location.facility ?? "Facility not reported",
      status: location.status ?? "UNKNOWN",
      city: location.city ?? "City not reported",
      state: location.state ?? "State not reported",
    }));

  return {
    trialId,
    briefTitle: identification.briefTitle ?? "Title not reported",
    officialTitle: identification.officialTitle ?? "",
    overallStatus: status?.overallStatus ?? "UNKNOWN",
    statusVerifiedDate: status?.statusVerifiedDate ?? "",
    lastUpdatePostedDate: status?.lastUpdatePostDateStruct?.date ?? "",
    versionDate: study.derivedSection?.miscInfoModule?.versionHolder ?? "",
    briefSummary: protocol?.descriptionModule?.briefSummary ?? "",
    conditions: protocol?.conditionsModule?.conditions ?? [],
    phases: design?.phases ?? [],
    studyType: design?.studyType ?? "",
    primaryPurpose: design?.designInfo?.primaryPurpose ?? "",
    leadSponsor: protocol?.sponsorCollaboratorsModule?.leadSponsor?.name ?? "",
    interventions: (protocol?.armsInterventionsModule?.interventions ?? []).map(item => ({ type: item.type ?? "", name: item.name ?? "" })),
    locations: (protocol?.contactsLocationsModule?.locations ?? []).map(location => ({
      facility: location.facility ?? "Facility not reported",
      status: location.status ?? "UNKNOWN",
      city: location.city ?? "",
      state: location.state ?? "",
      country: location.country ?? "",
    })),
    enrollment: {
      count: design?.enrollmentInfo?.count ?? null,
      type: design?.enrollmentInfo?.type ?? "UNKNOWN",
    },
    eligibility: {
      criteria: eligibility?.eligibilityCriteria ?? "",
      healthyVolunteers: eligibility?.healthyVolunteers ?? null,
      sex: eligibility?.sex ?? "UNKNOWN",
      minimumAge: eligibility?.minimumAge ?? "",
      maximumAge: eligibility?.maximumAge ?? "",
    },
    indiaLocations,
    sourceUrl: `https://clinicaltrials.gov/study/${trialId}`,
    apiUrl,
    fetchedAt: new Date().toISOString(),
  };
}
