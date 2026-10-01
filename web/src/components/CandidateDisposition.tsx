import { useState } from "react";
import { Link } from "react-router-dom";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
import { isAssessmentCurrent } from "../domain/workflow";
import type { TrialRecord } from "../types";
import type { Assessment, ScreeningDisposition } from "../domain/model";
export function CandidateDisposition({
  trial,
  assessment,
}: {
  trial: TrialRecord;
  assessment?: Assessment;
}) {
  const { state, command } = useWorkflow();
  const { roleId } = useAppState();
  const [site, setSite] = useState("");
  const [owner, setOwner] = useState("Demo PI");
  const [outcome, setOutcome] =
    useState<ScreeningDisposition["state"]>("Needs information");
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState("");
  const history = state.dispositions.filter((d) =>
    state.runs.some((r) =>
      r.assessments.some(
        (a) => a.id === d.assessmentId && a.trialId === trial.id,
      ),
    ),
  );
  return (
    <section className="surface reading-surface">
      <h2>Human trial-side screening disposition</h2>
      <p>
        Candidate ownership, registry-listed site and human screening outcome
        are separate from the computed findings. No automated enrolment or site
        availability claim.
      </p>
      {assessment && assessment.trialId === trial.id ? (
        <>
          <p>
            {state.patients.find((p) => p.id === assessment.patientId)?.label} ·{" "}
            {assessment.cohort} ·{" "}
            {isAssessmentCurrent(state, assessment)
              ? "Current"
              : "Stale — rerun required"}
          </p>
          <Link
            to={`/patients/${assessment.patientId}/reviews/${trial.id}?assessment=${encodeURIComponent(assessment.id)}&from=studies`}
          >
            Return to candidate review
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              command({
                type: "disposition",
                value: {
                  assessmentId: assessment.id,
                  site,
                  assignedTo: owner,
                  state: outcome,
                  reason,
                  evidence,
                },
              });
            }}
          >
            <label>
              Registry-listed site
              <select value={site} onChange={(e) => setSite(e.target.value)}>
                <option value="">
                  Select site; availability remains unknown
                </option>
                {trial.indiaLocations.map((l, i) => (
                  <option key={i} value={`${l.facility} · ${l.city}`}>
                    {l.facility} · {l.city}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Assigned demonstration owner
              <select value={owner} onChange={(e) => setOwner(e.target.value)}>
                <option>Demo PI</option>
                <option>Demo trial coordinator</option>
              </select>
            </label>
            <label>
              Human disposition
              <select
                value={outcome}
                onChange={(e) =>
                  setOutcome(e.target.value as ScreeningDisposition["state"])
                }
              >
                {[
                  "Assigned",
                  "In review",
                  "Needs information",
                  "Ready for site screening",
                  "Deferred",
                  "Not proceeding",
                  "Eligible",
                  "Ineligible",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Reason
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={240}
              />
            </label>
            <label>
              Evidence / review reference
              <input
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                maxLength={240}
              />
            </label>
            <button
              className="button primary"
              disabled={
                roleId !== "site" || !isAssessmentCurrent(state, assessment)
              }
            >
              Record human trial-side disposition
            </button>
          </form>
        </>
      ) : (
        <p>
          No candidate selected. Use “Record trial-side disposition” from a pair
          review.
        </p>
      )}
      {history.map((d, i) => {
        const a = state.runs
          .flatMap((r) => r.assessments)
          .find((a) => a.id === d.assessmentId)!;
        return (
          <article key={i}>
            <strong>
              {state.patients.find((p) => p.id === a.patientId)?.label} ·{" "}
              {d.state} ·{" "}
              {isAssessmentCurrent(state, a) ? "current" : "historical / stale"}
            </strong>
            <p>
              Assigned to {d.assignedTo} · recorded by {d.author} · {d.site} ·{" "}
              {d.recordedAt}
            </p>
            <p>
              {d.reason} · {d.evidence}
            </p>
          </article>
        );
      })}
    </section>
  );
}
