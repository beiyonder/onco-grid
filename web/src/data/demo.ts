import type {
  CorrectionTicket,
  PatientWorkspace,
  ReviewRecord,
  Role,
  RoomMessage,
  WorkItem,
} from "../types";

export const roles: Role[] = [
  { id: "coordinator", name: "A. Rao", title: "Research coordinator", initials: "AR" },
  { id: "oncologist", name: "Dr M. Shah", title: "Treating oncologist", initials: "MS" },
  { id: "site", name: "Demo PI", title: "Principal investigator / trial-side reviewer", initials: "PI" },
  { id: "auditor", name: "Auditor", title: "Read-only reviewer", initials: "AU" },
];

export const initialPatients: PatientWorkspace[] = [];

export const initialWorkItems: WorkItem[] = [
  {
    id: "MSG-NCT06345729-2",
    kind: "message",
    title: "Site response needs treating-team review",
    summary: "An authorised site role clarified which source record controls the operational answer.",
    sourceLabel: "Trial Room · NCT06345729",
    owner: "Dr M. Shah",
    occurredAt: "2026-09-19T12:05:00Z",
    status: "unread",
    route: "/trials/NCT06345729/room?message=ROOM-2",
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

export const initialReviews: ReviewRecord[] = [];

export const initialCorrections: CorrectionTicket[] = [];
