export type RoleId = "coordinator" | "oncologist" | "site" | "auditor";

export interface Role {
  id: RoleId;
  name: string;
  title: string;
  initials: string;
}

export interface TrialLocation {
  facility: string;
  city: string;
  state: string;
  postalCode: string;
  status: string;
  contactAvailable: boolean;
}

export interface TrialRecord {
  id: string;
  source: string;
  sourceUrl: string;
  briefTitle: string;
  officialTitle: string;
  conditions: string[];
  keywords: string[];
  overallStatus: string;
  statusLabel: string;
  statusVerifiedDate: string;
  lastUpdatePostedDate: string;
  studyType: string;
  phases: string[];
  primaryPurpose: string;
  enrollment: number;
  enrollmentType: string;
  leadSponsor: string;
  sponsorClass: string;
  briefSummary: string;
  briefSummaryTruncated: boolean;
  eligibilityCriteria: string;
  eligibilityCriteriaTruncated: boolean;
  minimumAge: string;
  maximumAge: string;
  sex: string;
  healthyVolunteers: boolean;
  interventions: string[];
  indiaLocations: TrialLocation[];
}

export interface TrialSnapshot {
  schemaVersion: number;
  retrievedAt: string;
  source: {
    name: string;
    apiVersion: string;
    dataTimestamp: string;
    documentationUrl: string;
    queryUrl: string;
  };
  scope: {
    location: string;
    conditionQuery: string;
    overallStatuses: string[];
    studyType: string;
    importantNotice: string;
    privacy: string;
  };
  apiTotalCount: number;
  retainedCount: number;
  trials: TrialRecord[];
}

export type PatientFactSource =
  | "Clinician confirmed"
  | "Synthetic document"
  | "Manual synthetic entry"
  | "Approved de-identified research data"
  | "Conceptual future EMR";

export interface PatientFact {
  id: string;
  label: string;
  value: string;
  sourceType: PatientFactSource;
  sourceLabel: string;
  recordedAt: string;
}

export interface PatientWorkspace {
  id: string;
  label: string;
  context: string;
  owner: string;
  institution: string;
  dataBoundary: "Synthetic demo" | "Approved de-identified research";
  approvalReference?: string;
  lastActivity: string;
  facts: PatientFact[];
  reviewTrialIds: string[];
}

export type ReviewState =
  | "Not reviewed"
  | "Confirmed from source"
  | "Needs clarification"
  | "Does not appear met";

export interface CriterionReviewState {
  state: ReviewState;
  reviewer?: string;
  reviewedAt?: string;
  evidence?: string;
  note?: string;
}

export interface ReviewRecord {
  patientId: string;
  trialId: string;
  criteria: Record<string, CriterionReviewState>;
}

export type WorkItemKind = "message" | "task" | "update" | "handoff";
export type WorkItemStatus = "unread" | "open" | "resolved" | "waiting";

export interface WorkItem {
  id: string;
  kind: WorkItemKind;
  title: string;
  summary: string;
  sourceLabel: string;
  owner: string;
  occurredAt: string;
  status: WorkItemStatus;
  route: string;
  roleIds: RoleId[];
}

export type MessageAuthority = "General discussion" | "Authorised site response";

export interface RoomMessage {
  id: string;
  trialId: string;
  author: string;
  role: string;
  body: string;
  sentAt: string;
  authority: MessageAuthority;
  sourceUrl?: string;
  replyToId?: string;
  resolved?: boolean;
}

export interface CorrectionTicket {
  id: string;
  trialId: string;
  title: string;
  evidenceLabel: string;
  evidenceUrl: string;
  createdBy: string;
  createdAt: string;
  status: "Open" | "Resolved";
}
