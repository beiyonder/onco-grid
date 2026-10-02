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
  type SyntheticReferral,
  type SyntheticPatient,
  type Value,
  type RegistryCheck,
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
  referrals: SyntheticReferral[];
  shortlist: string[];
  audit: AuditEvent[];
  registryChecks: Record<string, RegistryCheck>;
}
export const initialWorkflow: WorkflowState = {
  patients: initialSyntheticPatients,
  models: [],
  runs: [],
  reviews: [],
  gaps: [],
  dispositions: [],
  referrals: [],
  shortlist: [],
  audit: [],
  registryChecks: {},
};
export type WorkflowCommand =
  | { type: "initialize"; models: CriterionModel[] }
  | { type: "registry-checks"; checks: RegistryCheck[] }
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
  | { type: "create-referral"; assessmentId: string }
  | { type: "refresh-referral"; id: string; assessmentId: string }
  | { type: "referral-message"; id: string; side: "referrer" | "team"; body: string }
  | { type: "referral-action"; id: string; action: "queue" | "acknowledge" | "request-information" | "ready" | "close" | "withdraw" | "assign"; body: string; owner?: SyntheticReferral["teamOwner"]; confirmed?: boolean };
export function isAssessmentCurrent(
  state: WorkflowState,
  assessment: Assessment,
): boolean {
  const patient = state.patients.find((p) => p.id === assessment.patientId);
  const model = state.models.find((m) => m.id === assessment.modelId);
  const check = assessment.registryCheck;
  const latest = state.registryChecks[assessment.trialId];
  if (check && (
    check.state !== "verified" || latest?.state !== "verified" ||
    check.registryVersion !== latest.registryVersion ||
    !check.fetchedAt || Date.now() - Date.parse(check.fetchedAt) > 15 * 60_000
  )) return false;
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
export function latestAssessmentReviews(state: WorkflowState, assessment: Assessment): HumanReview[] {
  const latest = new Map(state.reviews.filter((r) => r.assessmentId === assessment.id).map((r) => [r.criterionId, r]));
  if (assessment.findings.some((f) => !latest.has(f.criterionId)))
    throw new Error("Record every criterion review before preparing a referral.");
  return assessment.findings.map((f) => latest.get(f.criterionId)!);
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
  if (command.type === "registry-checks") {
    const registryChecks = { ...state.registryChecks };
    for (const check of command.checks) registryChecks[check.trialId] = check;
    return { ...state, registryChecks };
  }
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
      if (command.run.assessments.some((a) => {
        const patient = state.patients.find((p) => p.id === a.patientId);
        const model = state.models.find((m) => m.id === a.modelId);
        return patient?.version !== a.patientVersion || model?.version !== a.modelVersion || model.sourceVersion !== a.sourceVersion;
      }))
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
    case "create-referral": {
      requireDemoAuthority(role, "review-criterion");
      const assessment = currentAssessment(state, command.assessmentId);
      const reviews = latestAssessmentReviews(state, assessment);
      if (state.referrals.some((r) => r.patientId === assessment.patientId && r.trialId === assessment.trialId && !["Closed", "Withdrawn"].includes(r.state)))
        throw new Error("Continue the existing referral for this patient and study.");
      next = { ...state, referrals: [...state.referrals, {
        id: eventId, patientId: assessment.patientId, trialId: assessment.trialId,
        assessmentId: assessment.id, reviews, author: actor, createdAt: at, updatedAt: at,
        state: "Draft", teamOwner: "Study coordinator", events: [],
      }] };
      break;
    }
    case "refresh-referral":
    case "referral-message":
    case "referral-action": {
      const referral = state.referrals.find((r) => r.id === command.id);
      if (!referral) throw new Error("Referral not found.");
      if (["Closed", "Withdrawn"].includes(referral.state)) throw new Error("This referral is closed.");
      const team = command.type === "referral-message" ? command.side === "team"
        : command.type === "referral-action" && !["queue", "withdraw"].includes(command.action);
      requireDemoAuthority(role, team ? "screening-disposition" : "simulate-handoff");
      let updated = { ...referral, updatedAt: at };
      let body = "body" in command ? command.body.trim() : "";
      let kind: string = command.type;
      if (command.type === "refresh-referral") {
        if (!["Draft", "Needs information"].includes(referral.state)) throw new Error("Attach an updated assessment while drafting or answering an information request.");
        const assessment = currentAssessment(state, command.assessmentId);
        if (assessment.patientId !== referral.patientId || assessment.trialId !== referral.trialId) throw new Error("The assessment must belong to the same patient and study.");
        updated = { ...updated, assessmentId: assessment.id, reviews: latestAssessmentReviews(state, assessment) };
        kind = "Packet updated";
        body = `Attached reviewed record v${assessment.patientVersion}, model v${assessment.modelVersion}.`;
      } else {
        if (!body || body.length > 1000) throw new Error("Enter a synthetic message or reason of 1–1000 characters.");
        if (command.type === "referral-message") {
          if (referral.state === "Draft") throw new Error("Queue the referral before starting the conversation.");
          kind = "Message";
        } else {
          const action = command.action;
          kind = action;
          if (action === "queue") {
            if (!["Draft", "Needs information"].includes(referral.state)) throw new Error("This referral is already with the team.");
            if (!command.confirmed) throw new Error("Confirm the local-only referral packet before queueing.");
            const assessment = currentAssessment(state, referral.assessmentId);
            updated.reviews = latestAssessmentReviews(state, assessment);
            updated.state = "Awaiting team";
            kind = referral.state === "Draft" ? "Referral queued locally" : "Information returned";
          } else if (action === "withdraw") {
            updated.state = "Withdrawn";
            kind = "Referral withdrawn";
          } else {
            if (referral.state === "Draft") throw new Error("The referring team has not queued this referral.");
            if (action === "acknowledge") {
              if (referral.state !== "Awaiting team") throw new Error("Only an awaiting referral can be acknowledged.");
              updated.state = "In review";
              kind = "Team acknowledged";
            } else if (action === "request-information") {
              if (!["In review", "Ready for site screening"].includes(referral.state)) throw new Error("Acknowledge the referral before requesting information.");
              updated.state = "Needs information";
              kind = "Information requested";
            } else if (action === "ready") {
              if (referral.state !== "In review") throw new Error("Review the referral before recording readiness.");
              currentAssessment(state, referral.assessmentId);
              updated.state = "Ready for site screening";
              kind = "Ready for site screening — not eligibility";
            } else if (action === "close") {
              updated.state = "Closed";
              kind = "Referral closed";
            } else if (action === "assign") {
              if (!command.owner || !["Study coordinator", "Principal investigator"].includes(command.owner)) throw new Error("Choose a study-team owner.");
              updated.teamOwner = command.owner;
              kind = `Assigned to ${command.owner}`;
            }
          }
        }
      }
      updated.events = [...referral.events, { id: eventId, at, author: actor, side: team ? "team" : "referrer", kind, body }];
      next = { ...state, referrals: state.referrals.map((r) => r.id === referral.id ? updated : r) };
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
