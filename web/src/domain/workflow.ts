import type { RoleId } from "../types";
import { requireDemoAuthority } from "./authority";
import { informationNeedKey } from "./identity";
import {
  SCENARIO_DATE,
  type Assessment,
  type AuditEvent,
  type CriterionModel,
  type GapTask,
  type HumanReview,
  type MatchRun,
  type ScreeningDisposition,
  type SyntheticPacket,
  type SyntheticPatient,
  type Value,
} from "./model";
import {
  initialSyntheticPatients,
  createDemoPatient,
  syntheticEvidence,
} from "./patients";
import { reviseModel } from "./modelRevision";
import { criterionInformationNeeds } from "./informationNeeds";
export interface WorkflowState {
  patients: SyntheticPatient[];
  models: CriterionModel[];
  runs: MatchRun[];
  reviews: HumanReview[];
  gaps: GapTask[];
  dispositions: ScreeningDisposition[];
  packets: SyntheticPacket[];
  shortlist: string[];
  audit: AuditEvent[];
}
export const initialWorkflow: WorkflowState = {
  patients: initialSyntheticPatients,
  models: [],
  runs: [],
  reviews: [],
  gaps: [],
  dispositions: [],
  packets: [],
  shortlist: [],
  audit: [],
};
export type WorkflowCommand =
  | { type: "initialize"; models: CriterionModel[] }
  | { type: "create-patient"; scenario: number }
  | {
      type: "provide";
      patientId: string;
      concept: string;
      value: Value;
      gapId?: string;
    }
  | { type: "confirm"; patientId: string; assertionId: string; reason: string }
  | { type: "publish"; model: CriterionModel; reason: string }
  | { type: "start-run"; run: MatchRun }
  | { type: "complete-run"; run: MatchRun }
  | { type: "cancel-run"; id: string }
  | {
      type: "review";
      review: Omit<HumanReview, "author" | "role" | "recordedAt">;
    }
  | { type: "bulk-accept"; assessmentId: string; criterionIds: string[] }
  | {
      type: "accept-gap";
      assessmentId: string;
      criterionId: string;
      concept: string;
      timeWindow: string;
      owner: string;
    }
  | {
      type: "close-gap";
      id: string;
      state: "unable-to-obtain" | "cancelled";
      reason: string;
    }
  | {
      type: "disposition";
      value: Omit<ScreeningDisposition, "author" | "role" | "recordedAt">;
    }
  | { type: "shortlist"; assessmentId: string }
  | { type: "packet"; assessmentId: string }
  | { type: "advance-packet"; id: string };
export function isAssessmentCurrent(
  state: WorkflowState,
  assessment: Assessment,
): boolean {
  const patient = state.patients.find((p) => p.id === assessment.patientId);
  const model = state.models.find((m) => m.id === assessment.modelId);
  return (
    patient?.version === assessment.patientVersion &&
    model?.version === assessment.modelVersion &&
    model.sourceVersion === assessment.sourceVersion
  );
}
function currentAssessment(state: WorkflowState, id: string): Assessment {
  const assessment = state.runs
    .flatMap((r) => r.assessments)
    .find((a) => a.id === id);
  if (!assessment || !isAssessmentCurrent(state, assessment))
    throw new Error(
      "Assessment is missing or stale. Run again before recording a decision.",
    );
  return assessment;
}
export function transitionWorkflow(
  state: WorkflowState,
  command: WorkflowCommand,
  role: RoleId,
  actor: string,
  at: string,
  eventId: string,
): WorkflowState {
  if (command.type === "initialize")
    return state.models.length ? state : { ...state, models: command.models };
  if (role === "auditor") throw new Error("The auditor persona is read-only.");
  let next = state;
  let reason = "reason" in command ? command.reason : "";
  switch (command.type) {
    case "create-patient":
      requireDemoAuthority(role, "attach-evidence");
      next = {
        ...state,
        patients: [
          ...state.patients,
          createDemoPatient(state.patients.length + 1, command.scenario),
        ],
      };
      break;
    case "provide": {
      requireDemoAuthority(role, "attach-evidence");
      const patient = state.patients.find((p) => p.id === command.patientId);
      if (!patient) throw new Error("Patient not found.");
      const supplied = syntheticEvidence(
        patient,
        command.concept,
        command.value,
        state.audit.length + 1,
      );
      const gap = command.gapId
        ? state.gaps.find((g) => g.id === command.gapId)
        : undefined;
      if (
        command.gapId &&
        (!gap ||
          gap.patientId !== patient.id ||
          gap.informationNeed !== command.concept ||
          !["accepted", "evidence-received"].includes(gap.state))
      )
        throw new Error("This task is not open for the supplied evidence.");
      next = {
        ...state,
        patients: state.patients.map((p) =>
          p.id !== patient.id
            ? p
            : {
                ...p,
                version: p.version + 1,
                assertions: [...p.assertions, supplied.assertion],
                artifacts: [...p.artifacts, supplied.artifact],
              },
        ),
        gaps: state.gaps.map((g) =>
          g.id !== gap?.id
            ? g
            : {
                ...g,
                state: "evidence-received",
                assertionIds: [...g.assertionIds, supplied.assertion.id],
              },
        ),
      };
      break;
    }
    case "confirm": {
      requireDemoAuthority(role, "confirm-assertion");
      if (!command.reason.trim())
        throw new Error("Confirmation or reconciliation requires a reason.");
      const patient = state.patients.find((p) => p.id === command.patientId);
      const assertion = patient?.assertions.find(
        (a) => a.id === command.assertionId,
      );
      if (!patient || !assertion) throw new Error("Assertion not found.");
      next = {
        ...state,
        patients: state.patients.map((p) =>
          p.id !== patient.id
            ? p
            : {
                ...p,
                version: p.version + 1,
                assertions: p.assertions.map((a) =>
                  a.concept !== assertion.concept
                    ? a
                    : {
                        ...a,
                        authority:
                          a.id === assertion.id ? "confirmed" : "rejected",
                        reviewer: actor,
                        reason: command.reason,
                      },
                ),
              },
        ),
        gaps: state.gaps.map((g) =>
          g.patientId === patient.id &&
          g.assertionIds.includes(assertion.id) &&
          g.state === "evidence-received"
            ? { ...g, state: "reviewed" }
            : g,
        ),
      };
      break;
    }
    case "publish": {
      requireDemoAuthority(role, "publish-model");
      const old = state.models.find((m) => m.id === command.model.id);
      if (
        !old ||
        command.model.version !== old.version ||
        !command.reason.trim()
      )
        throw new Error(
          "Publish requires the current model and a change reason.",
        );
      if (
        !command.model.complete ||
        command.model.criteria.some(
          (c) =>
            c.sourceStart < 0 ||
            command.model.sourceText.slice(c.sourceStart, c.sourceEnd) !==
              c.wording,
        )
      )
        throw new Error(
          "Every requirement must retain an exact source span before publication.",
        );
      const revision = reviseModel(old, JSON.stringify(command.model.criteria));
      next = {
        ...state,
        models: state.models.map((m) =>
          m.id !== old.id
            ? m
            : {
                ...revision,
                version: old.version + 1,
                status: "published",
                publishedBy: actor,
                publishedAt: at,
                changeReason: command.reason,
              },
        ),
      };
      break;
    }
    case "start-run":
      next = { ...state, runs: [...state.runs, command.run] };
      break;
    case "cancel-run":
      next = {
        ...state,
        runs: state.runs.map((r) =>
          r.id === command.id && r.status === "running"
            ? { ...r, status: "cancelled" }
            : r,
        ),
      };
      break;
    case "complete-run": {
      const running = state.runs.find((r) => r.id === command.run.id);
      if (!running || running.status !== "running") return state;
      if (command.run.assessments.some((a) => !isAssessmentCurrent(state, a)))
        return {
          ...state,
          runs: state.runs.map((r) =>
            r.id === running.id ? { ...r, status: "cancelled" } : r,
          ),
        };
      const runs = state.runs.map((r) =>
        r.id === running.id ? command.run : r,
      );
      next = {
        ...state,
        runs,
        gaps: state.gaps.map((g) =>
          g.state === "reviewed" &&
          g.links.every((l) =>
            runs.some(
              (r) =>
                r.status === "complete" &&
                r.assessments.some(
                  (a) =>
                    a.patientId === g.patientId &&
                    l.trialId === a.trialId &&
                    l.cohort === a.cohort &&
                    a.findings.some((f) => f.criterionId === l.criterionId) &&
                    isAssessmentCurrent(state, a),
                ),
            ),
          )
            ? { ...g, state: "reassessed" }
            : g,
        ),
      };
      break;
    }
    case "review": {
      requireDemoAuthority(role, "review-criterion");
      const assessment = currentAssessment(state, command.review.assessmentId);
      if (
        !assessment.findings.some(
          (f) => f.criterionId === command.review.criterionId,
        )
      )
        throw new Error("Criterion does not belong to this assessment.");
      if (
        command.review.decision === "override" &&
        (!command.review.reason.trim() || !command.review.evidence.trim())
      )
        throw new Error("An override requires reason and evidence.");
      next = {
        ...state,
        reviews: [
          ...state.reviews,
          { ...command.review, author: actor, role, recordedAt: at },
        ],
      };
      break;
    }
    case "bulk-accept": {
      requireDemoAuthority(role, "review-criterion");
      const assessment = currentAssessment(state, command.assessmentId);
      const ids = [...new Set(command.criterionIds)];
      if (
        !ids.length ||
        ids.some(
          (id) =>
            assessment.findings.find((f) => f.criterionId === id)?.state !==
            "supported",
        )
      )
        throw new Error(
          "Bulk acceptance is restricted to explicitly selected supported findings.",
        );
      next = {
        ...state,
        reviews: [
          ...state.reviews,
          ...ids.map((criterionId) => ({
            assessmentId: assessment.id,
            criterionId,
            decision: "accept" as const,
            author: actor,
            role,
            recordedAt: at,
            reason: "Explicitly selected supported findings reviewed together.",
            evidence: "",
          })),
        ],
      };
      break;
    }
    case "accept-gap": {
      requireDemoAuthority(role, "assign");
      const assessment = currentAssessment(state, command.assessmentId);
      const finding = assessment.findings.find(
        (f) => f.criterionId === command.criterionId,
      );
      if (!finding || finding.state !== "unresolved")
        throw new Error(
          "Only unresolved requirements can create information tasks.",
        );
      const criterion = assessment.modelSnapshot.criteria.find(
        (c) => c.id === command.criterionId,
      );
      const patient = state.patients.find(
        (p) => p.id === assessment.patientId,
      )!;
      if (
        !criterion ||
        !command.owner.trim() ||
        !criterionInformationNeeds(
          criterion,
          patient,
          assessment.evaluatedAt,
        ).some(
          (n) =>
            n.concept === command.concept &&
            n.timeWindow === command.timeWindow,
        )
      )
        throw new Error(
          "Accept a named unresolved information need with its exact time window and owner.",
        );
      const id = informationNeedKey(
        assessment.patientId,
        command.concept,
        command.timeWindow,
      );
      const existing = state.gaps.find(
        (g) =>
          informationNeedKey(g.patientId, g.informationNeed, g.timeWindow) ===
            id &&
          !["cancelled", "unable-to-obtain", "reassessed"].includes(g.state),
      );
      const link = {
        trialId: assessment.trialId,
        cohort: assessment.cohort,
        criterionId: command.criterionId,
        assessmentId: assessment.id,
      };
      if (existing)
        next = {
          ...state,
          gaps: state.gaps.map((g) =>
            g !== existing
              ? g
              : {
                  ...g,
                  links: g.links.some(
                    (l) =>
                      l.assessmentId === link.assessmentId &&
                      l.criterionId === link.criterionId,
                  )
                    ? g.links
                    : [...g.links, link],
                },
          ),
        };
      else
        next = {
          ...state,
          gaps: [
            ...state.gaps,
            {
              id: `${id}:${state.audit.length}`,
              patientId: assessment.patientId,
              informationNeed: command.concept,
              timeWindow: command.timeWindow,
              links: [link],
              owner: command.owner,
              state: "accepted",
              reason: "",
              assertionIds: [],
              createdAt: at,
            },
          ],
        };
      break;
    }
    case "close-gap":
      requireDemoAuthority(role, "assign");
      if (!command.reason.trim())
        throw new Error(
          "Record why this information cannot be obtained or is cancelled.",
        );
      next = {
        ...state,
        gaps: state.gaps.map((g) =>
          g.id === command.id
            ? { ...g, state: command.state, reason: command.reason }
            : g,
        ),
      };
      break;
    case "disposition":
      requireDemoAuthority(role, "screening-disposition");
      currentAssessment(state, command.value.assessmentId);
      if (
        !command.value.site.trim() ||
        !command.value.assignedTo.trim() ||
        !command.value.reason.trim() ||
        !command.value.evidence.trim()
      )
        throw new Error(
          "A human disposition requires site, assigned owner, reason and evidence.",
        );
      next = {
        ...state,
        dispositions: [
          ...state.dispositions,
          { ...command.value, author: actor, role, recordedAt: at },
        ],
      };
      break;
    case "shortlist":
      requireDemoAuthority(role, "review-criterion");
      currentAssessment(state, command.assessmentId);
      next = {
        ...state,
        shortlist: state.shortlist.includes(command.assessmentId)
          ? state.shortlist.filter((id) => id !== command.assessmentId)
          : [...state.shortlist, command.assessmentId],
      };
      break;
    case "packet": {
      requireDemoAuthority(role, "simulate-handoff");
      const assessment = currentAssessment(state, command.assessmentId);
      if (!state.shortlist.includes(assessment.id))
        throw new Error("Shortlist this assessment before preparing a packet.");
      if (
        assessment.findings.some(
          (f) =>
            !state.reviews.some(
              (r) =>
                r.assessmentId === assessment.id &&
                r.criterionId === f.criterionId,
            ),
        )
      )
        throw new Error(
          "Record every criterion review before preparing a packet.",
        );
      if (!state.dispositions.some((d) => d.assessmentId === assessment.id))
        throw new Error("A trial-side human disposition is required.");
      next = {
        ...state,
        packets: [
          ...state.packets,
          {
            id: eventId,
            assessmentId: assessment.id,
            author: actor,
            createdAt: at,
            state: "Draft",
          },
        ],
      };
      break;
    }
    case "advance-packet": {
      requireDemoAuthority(role, "simulate-handoff");
      const packet = state.packets.find((p) => p.id === command.id);
      if (!packet) throw new Error("Packet not found.");
      currentAssessment(state, packet.assessmentId);
      next = {
        ...state,
        packets: state.packets.map((p) =>
          p !== packet
            ? p
            : {
                ...p,
                state:
                  p.state === "Draft"
                    ? "Ready for simulation"
                    : "Simulated acknowledgement",
              },
        ),
      };
      break;
    }
  }
  reason =
    reason ||
    `Synthetic demonstration at ${SCENARIO_DATE}; no external transmission.`;
  return {
    ...next,
    audit: [
      ...next.audit,
      {
        id: eventId,
        at,
        actor,
        action: command.type,
        target:
          "patientId" in command ? command.patientId :
          "assessmentId" in command ? command.assessmentId :
          "id" in command ? command.id :
          command.type === "review" ? command.review.assessmentId :
          command.type === "disposition" ? command.value.assessmentId :
          command.type === "publish" ? command.model.id :
          "run" in command ? command.run.id : command.type,
        reason,
      },
    ],
  };
}
