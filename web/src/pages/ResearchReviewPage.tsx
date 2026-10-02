import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";
import { criterionExcerpts } from "../data/trials";
import { PageHeader } from "../components/Primitives";
import type { ReviewState } from "../types";
export function ResearchReviewPage() {
  const { patientId, trialId } = useParams();
  const { patients, reviews, updateCriterion, roleId } = useAppState();
  const { findTrial } = useTrialData();
  const patient = patients.find(
    (p) =>
      p.id === patientId &&
      p.dataBoundary === "Approved de-identified research",
  );
  const trial = findTrial(trialId);
  const [selected, setSelected] = useState("");
  const [decision, setDecision] = useState<ReviewState>("Not reviewed");
  const [evidence, setEvidence] = useState("");
  const [note, setNote] = useState("");
  if (!patient || !trial)
    return (
      <div className="page">
        <p>Approved research context unavailable in this session.</p>
        <Link to="/patients">Open patients</Link>
      </div>
    );
  const criteria = criterionExcerpts(trial);
  const criterion = criteria.find((c) => c.id === selected) ?? criteria[0];
  const review = reviews.find(
    (r) => r.patientId === patient.id && r.trialId === trial.id,
  );
  return (
    <div className="page">
      <Link to={`/patients/${patient.id}`}>
        Back to approved research workspace
      </Link>
      <PageHeader
        title="Manual research source review"
        eyebrow={`${patient.id} × ${trial.id}`}
        description="Approved de-identified research is excluded from synthetic matching and scoring. Human source observations only."
      />
      <div className="criterion-workbench">
        <nav aria-label="Research criteria">
          {criteria.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelected(c.id);
                setDecision(review?.criteria[c.id]?.state ?? "Not reviewed");
                setEvidence(review?.criteria[c.id]?.evidence ?? "");
                setNote(review?.criteria[c.id]?.note ?? "");
              }}
            >
              {c.id} · {review?.criteria[c.id]?.state ?? "Not reviewed"}
            </button>
          ))}
        </nav>
        {criterion && (
          <article className="criterion-inspector">
            <blockquote>{criterion.text}</blockquote>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateCriterion({
                  patientId: patient.id,
                  trialId: trial.id,
                  criterionId: criterion.id,
                  state: decision,
                  evidence,
                  note,
                });
              }}
            >
              <label>
                Human source observation
                <select
                  value={decision}
                  onChange={(e) => setDecision(e.target.value as ReviewState)}
                >
                  {[
                    "Not reviewed",
                    "Confirmed from source",
                    "Needs clarification",
                    "Does not appear met",
                  ].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <label>
                Source reference
                <input
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  maxLength={240}
                />
              </label>
              <label>
                Non-identifying note
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={500}
                />
              </label>
              <button disabled={roleId !== "oncologist" && roleId !== "site"}>
                Save manual observation
              </button>
            </form>
            {patient.facts.map((f) => (
              <p key={f.id}>
                <strong>{f.label}:</strong> {f.value} · {f.sourceLabel}
              </p>
            ))}
          </article>
        )}
      </div>
    </div>
  );
}
