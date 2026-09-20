import type {
  CorrectionTicket,
  HandoffRecord,
  PatientWorkspace,
  ReviewRecord,
  Role,
  RoomMessage,
  WorkItem,
} from "../types";

export const roles: Role[] = [
  { id: "coordinator", name: "A. Rao", title: "Research coordinator", initials: "AR" },
  { id: "oncologist", name: "Dr M. Shah", title: "Treating oncologist", initials: "MS" },
  { id: "site", name: "Site steward", title: "Authorised trial-side role", initials: "SS" },
  { id: "auditor", name: "Auditor", title: "Read-only reviewer", initials: "AU" },
];

export const initialPatients: PatientWorkspace[] = [
  {
    id: "SYN-2047",
    label: "Synthetic Cedar workspace",
    context: "NSCLC · Stage IV · clinician-led review",
    owner: "Dr M. Shah",
    institution: "Western Oncology Unit",
    lastActivity: "2026-09-19T13:42:00Z",
    reviewTrialIds: ["NCT06345729"],
    facts: [
      {
        id: "fact-diagnosis",
        label: "Diagnosis",
        value: "Non-small cell lung cancer",
        sourceType: "Clinician confirmed",
        sourceLabel: "Synthetic pathology summary PATH-SYN-2047",
        recordedAt: "2026-09-18",
      },
      {
        id: "fact-stage",
        label: "Stage",
        value: "Stage IV",
        sourceType: "Clinician confirmed",
        sourceLabel: "Synthetic treating-team note NOTE-SYN-2047",
        recordedAt: "2026-09-18",
      },
      {
        id: "fact-pdl1",
        label: "PD-L1 TPS",
        value: "60%",
        sourceType: "Synthetic document",
        sourceLabel: "Synthetic biomarker report BIO-SYN-2047",
        recordedAt: "2026-09-17",
      },
      {
        id: "fact-kras",
        label: "KRAS G12C",
        value: "Unknown — source retrieval required",
        sourceType: "Clinician confirmed",
        sourceLabel: "Explicitly marked unknown by Dr M. Shah",
        recordedAt: "2026-09-19",
      },
    ],
  },
  {
    id: "SYN-3112",
    label: "Synthetic Lotus workspace",
    context: "Breast cancer · source collation",
    owner: "A. Rao",
    institution: "Central Research Desk",
    lastActivity: "2026-09-19T09:15:00Z",
    reviewTrialIds: [],
    facts: [
      {
        id: "fact-diagnosis",
        label: "Diagnosis context",
        value: "Breast cancer",
        sourceType: "Synthetic document",
        sourceLabel: "Synthetic referral brief REF-SYN-3112",
        recordedAt: "2026-09-16",
      },
      {
        id: "fact-receptor",
        label: "Receptor details",
        value: "Not supplied",
        sourceType: "Manual synthetic entry",
        sourceLabel: "Synthetic intake demonstration",
        recordedAt: "2026-09-19",
      },
    ],
  },
  {
    id: "SYN-4820",
    label: "Synthetic Monsoon workspace",
    context: "Colorectal cancer · missing records",
    owner: "A. Rao",
    institution: "Eastern Oncology Unit",
    lastActivity: "2026-09-18T15:30:00Z",
    reviewTrialIds: [],
    facts: [
      {
        id: "fact-diagnosis",
        label: "Diagnosis context",
        value: "Colorectal cancer",
        sourceType: "Clinician confirmed",
        sourceLabel: "Synthetic clinician note NOTE-SYN-4820",
        recordedAt: "2026-09-18",
      },
      {
        id: "fact-molecular",
        label: "Molecular report",
        value: "Not available",
        sourceType: "Manual synthetic entry",
        sourceLabel: "Synthetic coordinator intake",
        recordedAt: "2026-09-18",
      },
    ],
  },
];

export const initialWorkItems: WorkItem[] = [
  {
    id: "TASK-2047-KRAS",
    kind: "task",
    title: "Retrieve KRAS G12C source result",
    summary: "Human-created missing-information task for Synthetic Cedar workspace.",
    sourceLabel: "Patient–Trial Review · NCT06345729",
    owner: "A. Rao",
    occurredAt: "2026-09-19T13:42:00Z",
    status: "open",
    route: "/patients/SYN-2047/reviews/NCT06345729",
    roleIds: ["coordinator", "oncologist"],
  },
  {
    id: "MSG-NCT06345729-2",
    kind: "message",
    title: "Site response needs treating-team review",
    summary: "An authorised site role clarified which source record controls the operational answer.",
    sourceLabel: "Trial Room · NCT06345729",
    owner: "Dr M. Shah",
    occurredAt: "2026-09-19T12:05:00Z",
    status: "unread",
    route: "/trials/NCT06345729/room",
    roleIds: ["oncologist"],
  },
  {
    id: "UPDATE-NCT06345729",
    kind: "update",
    title: "Registry record updated",
    summary: "ClinicalTrials.gov posted an update on 8 Sep 2026. Site availability remains separately unconfirmed.",
    sourceLabel: "ClinicalTrials.gov · NCT06345729",
    owner: "A. Rao",
    occurredAt: "2026-09-19T10:15:00Z",
    status: "unread",
    route: "/trials/NCT06345729",
    roleIds: ["coordinator", "oncologist", "auditor"],
  },
  {
    id: "HANDOFF-SYN-2047",
    kind: "handoff",
    title: "Simulated handoff draft needs approval",
    summary: "Nothing has been transmitted. Review the synthetic manifest and owner before simulation.",
    sourceLabel: "Synthetic Cedar workspace",
    owner: "A. Rao",
    occurredAt: "2026-09-18T16:20:00Z",
    status: "waiting",
    route: "/patients/SYN-2047?section=handoffs",
    roleIds: ["coordinator"],
  },
  {
    id: "TASK-SYN-4820",
    kind: "task",
    title: "Confirm synthetic molecular-report availability",
    summary: "Created by A. Rao during the synthetic intake demonstration.",
    sourceLabel: "Synthetic Monsoon workspace",
    owner: "A. Rao",
    occurredAt: "2026-09-18T15:30:00Z",
    status: "open",
    route: "/patients/SYN-4820?section=tasks",
    roleIds: ["coordinator"],
  },
];

export const initialRoomMessages: RoomMessage[] = [
  {
    id: "ROOM-1",
    trialId: "NCT06345729",
    author: "A. Rao",
    role: "Research coordinator",
    body: "Which listed Mumbai site should receive an operational availability question? Registry recruitment is not being treated as site confirmation.",
    sentAt: "2026-09-19T10:30:00Z",
    authority: "General discussion",
    sourceUrl: "https://clinicaltrials.gov/study/NCT06345729",
  },
  {
    id: "ROOM-2",
    trialId: "NCT06345729",
    author: "Site steward",
    role: "Authorised trial-side role",
    body: "Use the current source record for authorised contact details. This demonstration does not confirm that any listed site can enrol today.",
    sentAt: "2026-09-19T12:05:00Z",
    authority: "Authorised site response",
    sourceUrl: "https://clinicaltrials.gov/study/NCT06345729",
    replyToId: "ROOM-1",
  },
  {
    id: "ROOM-3",
    trialId: "NCT06345729",
    author: "Dr M. Shah",
    role: "Treating oncologist",
    body: "KRAS G12C remains unknown in the synthetic workspace. Create source-retrieval work; do not infer the value from the trial criteria.",
    sentAt: "2026-09-19T13:40:00Z",
    authority: "General discussion",
    replyToId: "ROOM-2",
  },
];

export const initialReviews: ReviewRecord[] = [
  {
    patientId: "SYN-2047",
    trialId: "NCT06345729",
    criteria: {
      "criterion-1": {
        state: "Confirmed from source",
        reviewer: "Dr M. Shah",
        reviewedAt: "2026-09-19",
        evidence: "Synthetic pathology summary PATH-SYN-2047",
        note: "Diagnosis text confirmed in the synthetic source.",
      },
      "criterion-2": {
        state: "Needs clarification",
        reviewer: "Dr M. Shah",
        reviewedAt: "2026-09-19",
        evidence: "No KRAS result present in current synthetic sources",
        note: "Human-created retrieval task TASK-2047-KRAS.",
      },
    },
  },
];

export const initialCorrections: CorrectionTicket[] = [];

export const initialHandoffs: HandoffRecord[] = [
  {
    id: "HANDOFF-SYN-2047",
    patientId: "SYN-2047",
    trialId: "NCT06345729",
    owner: "A. Rao",
    state: "Draft",
    updatedAt: "2026-09-18T16:20:00Z",
  },
];
