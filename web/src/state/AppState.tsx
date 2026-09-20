import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  initialCorrections,
  initialHandoffs,
  initialPatients,
  initialReviews,
  initialRoomMessages,
  initialWorkItems,
  roles,
} from "../data/demo";
import type {
  CorrectionTicket,
  HandoffRecord,
  PatientWorkspace,
  ReviewRecord,
  ReviewState,
  Role,
  RoleId,
  RoomMessage,
  WorkItem,
} from "../types";

interface CriterionUpdate {
  patientId: string;
  trialId: string;
  criterionId: string;
  state: ReviewState;
  evidence: string;
  note: string;
}

interface AppStateValue {
  role: Role;
  roleId: RoleId;
  setRoleId: (roleId: RoleId) => void;
  patients: PatientWorkspace[];
  createSyntheticWorkspace: (context: string, owner: string) => string;
  startPatientTrialReview: (patientId: string, trialId: string) => void;
  followedTrialIds: string[];
  toggleFollowTrial: (trialId: string) => void;
  workItems: WorkItem[];
  resolveWorkItem: (workItemId: string) => void;
  addMissingInformationTask: (patientId: string, trialId: string, criterionId: string) => string;
  roomMessages: RoomMessage[];
  postRoomMessage: (trialId: string, body: string, sourceUrl?: string, replyToId?: string) => void;
  resolveRoomMessage: (messageId: string) => void;
  reviews: ReviewRecord[];
  updateCriterion: (update: CriterionUpdate) => void;
  corrections: CorrectionTicket[];
  createCorrection: (trialId: string, title: string, evidenceLabel: string, evidenceUrl: string) => string;
  handoffs: HandoffRecord[];
  advanceSimulatedHandoff: (handoffId: string) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

const syntheticCodenames = ["Cobalt", "Marigold", "Rain", "Saffron", "Willow"];

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [roleId, setRoleId] = useState<RoleId>("coordinator");
  const [patients, setPatients] = useState(initialPatients);
  const [followedTrialIds, setFollowedTrialIds] = useState<string[]>(["NCT06345729"]);
  const [workItems, setWorkItems] = useState(initialWorkItems);
  const [roomMessages, setRoomMessages] = useState(initialRoomMessages);
  const [reviews, setReviews] = useState(initialReviews);
  const [corrections, setCorrections] = useState(initialCorrections);
  const [handoffs, setHandoffs] = useState(initialHandoffs);

  const role = roles.find((candidate) => candidate.id === roleId) ?? roles[0]!;

  const value = useMemo<AppStateValue>(() => ({
    role,
    roleId,
    setRoleId,
    patients,
    createSyntheticWorkspace(context, owner) {
      const sequence = patients.length + 1;
      const id = `SYN-DEMO-${String(sequence).padStart(3, "0")}`;
      const codename = syntheticCodenames[(sequence - 1) % syntheticCodenames.length];
      const workspace: PatientWorkspace = {
        id,
        label: `Synthetic ${codename} workspace`,
        context,
        owner,
        institution: "Validation workspace",
        lastActivity: new Date().toISOString(),
        reviewTrialIds: [],
        facts: [
          {
            id: "fact-context",
            label: "Synthetic context",
            value: context,
            sourceType: "Manual synthetic entry",
            sourceLabel: `Created in browser session by ${role.name}`,
            recordedAt: new Date().toISOString().slice(0, 10),
          },
        ],
      };
      setPatients((current) => [...current, workspace]);
      return id;
    },
    startPatientTrialReview(patientId, trialId) {
      setPatients((current) => current.map((patient) => patient.id === patientId && !patient.reviewTrialIds.includes(trialId)
        ? { ...patient, reviewTrialIds: [...patient.reviewTrialIds, trialId], lastActivity: new Date().toISOString() }
        : patient));
    },
    followedTrialIds,
    toggleFollowTrial(trialId) {
      setFollowedTrialIds((current) => current.includes(trialId)
        ? current.filter((candidate) => candidate !== trialId)
        : [...current, trialId]);
    },
    workItems,
    resolveWorkItem(workItemId) {
      setWorkItems((current) => current.map((item) => item.id === workItemId
        ? { ...item, status: "resolved" }
        : item));
    },
    addMissingInformationTask(patientId, trialId, criterionId) {
      const existing = workItems.find((item) => item.route.includes(patientId) && item.id.includes(criterionId));
      if (existing) return existing.id;
      const id = `TASK-${patientId}-${criterionId}`;
      const item: WorkItem = {
        id,
        kind: "task",
        title: "Retrieve source information for criterion",
        summary: "Explicitly created from a human-reviewed unknown. No value was inferred.",
        sourceLabel: `${patientId} · ${trialId}`,
        owner: role.name,
        occurredAt: new Date().toISOString(),
        status: "open",
        route: `/patients/${patientId}/reviews/${trialId}?criterion=${criterionId}`,
        roleIds: ["coordinator", "oncologist"],
      };
      setWorkItems((current) => [item, ...current]);
      return id;
    },
    roomMessages,
    postRoomMessage(trialId, body, sourceUrl, replyToId) {
      const message: RoomMessage = {
        id: `ROOM-${roomMessages.length + 1}`,
        trialId,
        author: role.name,
        role: role.title,
        body,
        sentAt: new Date().toISOString(),
        authority: role.id === "site" ? "Authorised site response" : "General discussion",
        sourceUrl,
        replyToId,
      };
      setRoomMessages((current) => [...current, message]);
    },
    resolveRoomMessage(messageId) {
      setRoomMessages((current) => current.map((message) => message.id === messageId ? { ...message, resolved: true } : message));
      setWorkItems((current) => current.map((item) => item.route.includes(`message=${messageId}`) ? { ...item, status: "resolved" } : item));
    },
    reviews,
    updateCriterion(update) {
      setReviews((current) => {
        const existing = current.find((review) => review.patientId === update.patientId && review.trialId === update.trialId);
        const nextCriterion = {
          state: update.state,
          reviewer: role.name,
          reviewedAt: new Date().toISOString().slice(0, 10),
          evidence: update.evidence || undefined,
          note: update.note || undefined,
        };
        if (!existing) {
          return [...current, {
            patientId: update.patientId,
            trialId: update.trialId,
            criteria: { [update.criterionId]: nextCriterion },
          }];
        }
        return current.map((review) => review === existing
          ? { ...review, criteria: { ...review.criteria, [update.criterionId]: nextCriterion } }
          : review);
      });
    },
    corrections,
    createCorrection(trialId, title, evidenceLabel, evidenceUrl) {
      const id = `COR-${String(corrections.length + 1).padStart(3, "0")}`;
      const ticket: CorrectionTicket = {
        id,
        trialId,
        title,
        evidenceLabel,
        evidenceUrl,
        createdBy: role.name,
        createdAt: new Date().toISOString(),
        status: "Open",
      };
      setCorrections((current) => [ticket, ...current]);
      setWorkItems((current) => [{
        id,
        kind: "task",
        title: `Correction: ${title}`,
        summary: `Evidence linked: ${evidenceLabel}`,
        sourceLabel: `Trial source · ${trialId}`,
        owner: role.name,
        occurredAt: ticket.createdAt,
        status: "open",
        route: `/trials/${trialId}/room`,
        roleIds: ["coordinator", "oncologist", "site", "auditor"],
      }, ...current]);
      return id;
    },
    handoffs,
    advanceSimulatedHandoff(handoffId) {
      setHandoffs((current) => current.map((handoff) => {
        if (handoff.id !== handoffId) return handoff;
        const state: HandoffRecord["state"] = handoff.state === "Draft"
          ? "Ready for simulation"
          : "Simulated acknowledgement";
        return { ...handoff, state, updatedAt: new Date().toISOString() };
      }));
    },
  }), [
    corrections,
    followedTrialIds,
    handoffs,
    patients,
    reviews,
    role,
    roleId,
    roomMessages,
    workItems,
  ]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}

export function preventFormNavigation(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}
