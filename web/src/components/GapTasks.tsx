import { useState } from "react";
import { Link } from "react-router-dom";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
import { PatientEvidence } from "./PatientEvidence";
import { demoFields } from "../domain/patients";
export function GapTasks({ patientId }: { patientId?: string }) {
  const { state, command, runMatching } = useWorkflow();
  const { roleId } = useAppState();
  const [open, setOpen] = useState("");
  const [reason, setReason] = useState("");
  const tasks = state.gaps.filter(
    (g) => !patientId || g.patientId === patientId,
  );
  return (
    <div className="gap-tasks">
      <h2>Information tasks</h2>
      <p>
        Evidence received ≠ confirmed fact ≠ satisfied criterion. Closing effort
        cannot manufacture evidence.
      </p>
      {!tasks.length && (
        <p>
          No accepted information tasks. Open a pair assessment to inspect and
          accept a gap.
        </p>
      )}
      {tasks.map((g) => {
        const patient = state.patients.find((p) => p.id === g.patientId)!;
        return (
          <article className="gap-card" key={g.id}>
            <h3>
              {patient.label} ·{" "}
              {demoFields.find((f) => f.concept === g.informationNeed)?.label ??
                g.informationNeed}
            </h3>
            <p>
              {g.state} · owner {g.owner} · window {g.timeWindow}
            </p>
            <p>{g.reason}</p>
            {g.links.map((l) => (
              <p key={`${l.assessmentId}:${l.criterionId}`}>
                <Link
                  to={`/patients/${g.patientId}/reviews/${l.trialId}?assessment=${encodeURIComponent(l.assessmentId)}&criterion=${encodeURIComponent(l.criterionId)}`}
                >
                  {l.trialId} · {l.cohort} · {l.criterionId}
                </Link>
              </p>
            ))}
            <button
              className="button secondary"
              onClick={() => setOpen(open === g.id ? "" : g.id)}
            >
              Open and resolve
            </button>
            {open === g.id && (
              <div>
                {["accepted", "evidence-received"].includes(g.state) && (
                  <PatientEvidence
                    patient={patient}
                    concept={g.informationNeed}
                    gapId={g.id}
                  />
                )}
                <label>
                  Operational closure reason
                  <input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    maxLength={240}
                  />
                </label>
                <button
                  className="button secondary"
                  disabled={roleId === "auditor" || !reason.trim()}
                  onClick={() =>
                    command({
                      type: "close-gap",
                      id: g.id,
                      state: "unable-to-obtain",
                      reason,
                    })
                  }
                >
                  Unable to obtain
                </button>
                <button
                  className="button quiet"
                  disabled={roleId === "auditor" || !reason.trim()}
                  onClick={() =>
                    command({
                      type: "close-gap",
                      id: g.id,
                      state: "cancelled",
                      reason,
                    })
                  }
                >
                  Cancel task
                </button>
                {g.state === "reviewed" && (
                  <button
                    className="button primary"
                    disabled={roleId === "auditor"}
                    onClick={() =>
                      void runMatching("patient-first", g.patientId, [
                        ...new Set(g.links.map((l) => l.trialId)),
                      ])
                    }
                  >
                    Rerun affected studies
                  </button>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
