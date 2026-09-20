import type { TrialRecord } from "../types";

interface OfficialStudyPayload {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string };
    statusModule?: {
      overallStatus?: string;
      statusVerifiedDate?: string;
      lastUpdatePostDateStruct?: { date?: string };
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
  derivedSection?: { miscInfoModule?: { versionHolder?: string } };
}

export interface LiveTrialEvidence {
  trialId: string;
  briefTitle: string;
  overallStatus: string;
  statusVerifiedDate: string;
  lastUpdatePostedDate: string;
  versionDate: string;
  indiaLocations: Array<{
    facility: string;
    status: string;
    city: string;
    state: string;
  }>;
  sourceUrl: string;
  checkedAt: string;
}

export interface EvidenceComparison {
  titleChanged: boolean;
  statusChanged: boolean;
  indiaLocationCountChanged: boolean;
}

export async function fetchLiveTrialEvidence(trialId: string): Promise<LiveTrialEvidence> {
  if (!/^NCT\d{8}$/.test(trialId)) throw new Error("A valid NCT identifier is required.");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(`https://clinicaltrials.gov/api/v2/studies/${trialId}`, {
      headers: { accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`ClinicalTrials.gov returned ${response.status}.`);
    const payload = await response.json() as OfficialStudyPayload;
    const protocol = payload.protocolSection;
    const identification = protocol?.identificationModule;
    if (identification?.nctId !== trialId) throw new Error("Official source did not match the requested trial.");
    const status = protocol?.statusModule;
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
      overallStatus: status?.overallStatus ?? "UNKNOWN",
      statusVerifiedDate: status?.statusVerifiedDate ?? "",
      lastUpdatePostedDate: status?.lastUpdatePostDateStruct?.date ?? "",
      versionDate: payload.derivedSection?.miscInfoModule?.versionHolder ?? "",
      indiaLocations,
      sourceUrl: `https://clinicaltrials.gov/study/${trialId}`,
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("ClinicalTrials.gov did not respond within 8 seconds.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function compareEvidence(snapshot: TrialRecord, live: LiveTrialEvidence): EvidenceComparison {
  return {
    titleChanged: snapshot.briefTitle !== live.briefTitle,
    statusChanged: snapshot.overallStatus !== live.overallStatus,
    indiaLocationCountChanged: snapshot.indiaLocations.length !== live.indiaLocations.length,
  };
}
