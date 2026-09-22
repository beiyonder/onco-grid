import type { GlobalEvidenceQuery } from "./policy.js";

const GLOBAL_PAGE_SIZE = 20;
const GLOBAL_FIELDS = [
  "NCTId",
  "BriefTitle",
  "OfficialTitle",
  "OverallStatus",
  "StatusVerifiedDate",
  "StartDate",
  "PrimaryCompletionDate",
  "CompletionDate",
  "LastUpdatePostDate",
  "BriefSummary",
  "Condition",
  "InterventionName",
  "InterventionType",
  "Phase",
  "EnrollmentCount",
  "EnrollmentType",
  "Sex",
  "MinimumAge",
  "MaximumAge",
  "HealthyVolunteers",
  "LocationCountry",
  "LeadSponsorName",
].join("|");

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
      startDateStruct?: { date?: string };
      primaryCompletionDateStruct?: { date?: string };
      completionDateStruct?: { date?: string };
      lastUpdatePostDateStruct?: { date?: string };
    };
    sponsorCollaboratorsModule?: {
      leadSponsor?: { name?: string };
    };
    descriptionModule?: { briefSummary?: string };
    conditionsModule?: { conditions?: string[] };
    designModule?: {
      phases?: string[];
      enrollmentInfo?: { count?: number; type?: string };
    };
    armsInterventionsModule?: {
      interventions?: Array<{ type?: string; name?: string }>;
    };
    eligibilityModule?: {
      healthyVolunteers?: boolean;
      sex?: string;
      minimumAge?: string;
      maximumAge?: string;
    };
    contactsLocationsModule?: {
      locations?: Array<{
        country?: string;
        facility?: string;
        contacts?: unknown[];
      }>;
      centralContacts?: unknown[];
    };
  };
}

interface ClinicalTrialsSearchResponse {
  studies?: ClinicalTrialsStudy[];
  totalCount?: number;
  nextPageToken?: string;
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
  query: { mode: GlobalEvidenceQuery["mode"]; term: string; pageSize: number };
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

function sourceText(value: string | undefined, fallback = "Not reported", maxLength = 1_600): string {
  const compact = value?.replace(/\s+/g, " ").trim();
  if (!compact) return fallback;
  return compact.length > maxLength ? `${compact.slice(0, maxLength - 1).trimEnd()}…` : compact;
}

function sourceArray(values: string[] | undefined): string[] {
  return Array.from(new Set((values ?? []).map((value) => sourceText(value, "", 240)).filter(Boolean)));
}

function statusLabel(value: string | undefined): string {
  return sourceText(value, "Unknown", 80)
    .toLocaleLowerCase()
    .replace(/_/g, " ")
    .replace(/(^|\s)\S/g, (character) => character.toLocaleUpperCase());
}

export async function fetchGlobalTrialEvidence(query: GlobalEvidenceQuery): Promise<GlobalTrialSearchResult> {
  const params = new URLSearchParams({
    format: "json",
    pageSize: String(GLOBAL_PAGE_SIZE),
    countTotal: "true",
    fields: GLOBAL_FIELDS,
    [query.mode === "condition" ? "query.cond" : "query.intr"]: query.term,
  });
  if (query.pageToken) params.set("pageToken", query.pageToken);

  const apiUrl = `https://clinicaltrials.gov/api/v2/studies?${params.toString()}`;
  const upstream = await fetch(apiUrl, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!upstream.ok) throw new Error(`ClinicalTrials.gov returned ${upstream.status}.`);

  const payload = await upstream.json() as ClinicalTrialsSearchResponse;
  const trials = (payload.studies ?? []).flatMap<GlobalTrialEvidence>((study) => {
    const protocol = study.protocolSection;
    const identification = protocol?.identificationModule;
    const id = identification?.nctId;
    if (!id || !/^NCT\d{8}$/.test(id)) return [];
    const status = protocol?.statusModule;
    const design = protocol?.designModule;
    const eligibility = protocol?.eligibilityModule;
    const countries = Array.from(new Set(
      (protocol?.contactsLocationsModule?.locations ?? [])
        .map((location) => sourceText(location.country, "", 120))
        .filter(Boolean),
    )).sort((left, right) => left.localeCompare(right));
    const interventions = (protocol?.armsInterventionsModule?.interventions ?? [])
      .map((intervention) => ({
        type: sourceText(intervention.type, "Other", 80),
        name: sourceText(intervention.name, "", 240),
      }))
      .filter((intervention) => intervention.name);
    const rawBriefSummary = protocol?.descriptionModule?.briefSummary?.replace(/\s+/g, " ").trim() ?? "";

    return [{
      id,
      briefTitle: sourceText(identification.briefTitle, "Title not reported", 600),
      officialTitle: sourceText(identification.officialTitle, "", 900),
      overallStatus: sourceText(status?.overallStatus, "UNKNOWN", 80),
      statusLabel: statusLabel(status?.overallStatus),
      statusVerifiedDate: sourceText(status?.statusVerifiedDate, "", 40),
      startDate: sourceText(status?.startDateStruct?.date, "", 40),
      primaryCompletionDate: sourceText(status?.primaryCompletionDateStruct?.date, "", 40),
      completionDate: sourceText(status?.completionDateStruct?.date, "", 40),
      lastUpdatePostedDate: sourceText(status?.lastUpdatePostDateStruct?.date, "", 40),
      briefSummary: sourceText(rawBriefSummary || undefined),
      briefSummaryTruncated: rawBriefSummary.length > 1_600,
      conditions: sourceArray(protocol?.conditionsModule?.conditions),
      interventions,
      phases: sourceArray(design?.phases),
      enrollment: {
        count: typeof design?.enrollmentInfo?.count === "number" ? design.enrollmentInfo.count : null,
        type: sourceText(design?.enrollmentInfo?.type, "UNKNOWN", 80),
      },
      population: {
        sex: sourceText(eligibility?.sex, "UNKNOWN", 80),
        minimumAge: sourceText(eligibility?.minimumAge, "", 80),
        maximumAge: sourceText(eligibility?.maximumAge, "", 80),
        healthyVolunteers: typeof eligibility?.healthyVolunteers === "boolean"
          ? eligibility.healthyVolunteers
          : null,
      },
      countries,
      leadSponsor: sourceText(protocol?.sponsorCollaboratorsModule?.leadSponsor?.name, "Not reported", 240),
      sourceUrl: `https://clinicaltrials.gov/study/${id}`,
    }];
  });

  return {
    query: { mode: query.mode, term: query.term, pageSize: GLOBAL_PAGE_SIZE },
    totalCount: typeof payload.totalCount === "number" ? payload.totalCount : null,
    trials,
    ...(payload.nextPageToken ? { nextPageToken: payload.nextPageToken } : {}),
    source: {
      name: "ClinicalTrials.gov",
      apiVersion: "v2",
      fetchedAt: new Date().toISOString(),
      queryUrl: apiUrl,
    },
  };
}

interface PubMedSearchResponse {
  esearchresult?: {
    count?: string;
    idlist?: string[];
    querytranslation?: string;
  };
}

interface PubMedSummaryEntry {
  uid?: string;
  pubdate?: string;
  epubdate?: string;
  source?: string;
  authors?: Array<{ name?: string }>;
  title?: string;
  pubtype?: string[];
  recordstatus?: string;
  articleids?: Array<{ idtype?: string; value?: string }>;
  fulljournalname?: string;
}

interface PubMedSummaryResponse {
  result?: Record<string, PubMedSummaryEntry | string[]> & { uids?: string[] };
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

function plainText(value: string | undefined, fallback = "Not reported", maxLength = 1_000): string {
  return sourceText(value?.replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'"), fallback, maxLength);
}

export async function fetchPublicationMetadata(trialIds: string[]): Promise<PublicationSearchResult> {
  const term = trialIds.map((id) => `"${id}"[All Fields]`).join(" OR ");
  const searchParams = new URLSearchParams({
    db: "pubmed",
    retmode: "json",
    retmax: "30",
    sort: "pub date",
    term,
    tool: "trial_relay_validation",
  });
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${searchParams.toString()}`;
  const searchResponse = await fetch(searchUrl, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8_000),
  });
  if (!searchResponse.ok) throw new Error(`PubMed search returned ${searchResponse.status}.`);
  const search = await searchResponse.json() as PubMedSearchResponse;
  const pmids = (search.esearchresult?.idlist ?? []).filter((id) => /^\d+$/.test(id)).slice(0, 30);

  let publications: PublicationMetadata[] = [];
  if (pmids.length > 0) {
    const summaryParams = new URLSearchParams({
      db: "pubmed",
      retmode: "json",
      version: "2.0",
      id: pmids.join(","),
      tool: "trial_relay_validation",
    });
    const summaryResponse = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?${summaryParams.toString()}`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!summaryResponse.ok) throw new Error(`PubMed summary returned ${summaryResponse.status}.`);
    const summary = await summaryResponse.json() as PubMedSummaryResponse;
    publications = pmids.flatMap<PublicationMetadata>((pmid) => {
      const entry = summary.result?.[pmid];
      if (!entry || Array.isArray(entry)) return [];
      const doi = entry.articleids?.find((identifier) => identifier.idtype === "doi")?.value ?? "";
      return [{
        pmid,
        title: plainText(entry.title),
        authors: (entry.authors ?? []).map((author) => plainText(author.name, "", 120)).filter(Boolean).slice(0, 12),
        journal: plainText(entry.fulljournalname || entry.source),
        publicationDate: plainText(entry.epubdate || entry.pubdate, "Date not reported", 80),
        publicationTypes: sourceArray(entry.pubtype),
        recordStatus: plainText(entry.recordstatus, "Status not reported", 160),
        doi: plainText(doi, "", 240),
        sourceUrl: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        matchBasis: "PubMed record matched the combined selected-NCT query",
      }];
    });
  }

  return {
    queryTrialIds: trialIds,
    totalCount: Number(search.esearchresult?.count ?? publications.length) || publications.length,
    loadedCount: publications.length,
    queryTranslation: sourceText(search.esearchresult?.querytranslation, term, 1_000),
    publications,
    source: {
      name: "PubMed",
      fetchedAt: new Date().toISOString(),
      searchUrl,
    },
  };
}
