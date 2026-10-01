import { useEffect, useState } from "react";
import { Link, useBlocker, useParams, useSearchParams } from "react-router-dom";
import { PageHeader, EmptyState } from "../components/Primitives";
import { AssessmentVector } from "../components/MatchingResults";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";
import { isAssessmentCurrent } from "../domain/workflow";
import { demoFields } from "../domain/patients";
import type { HumanReview } from "../domain/model";
import { SupportedReview } from "../components/SupportedReview";
import { criterionInformationNeeds } from "../domain/informationNeeds";
export function PatientTrialReviewPage() {
  const { patientId, trialId } = useParams();
  const [params, setParams] = useSearchParams();
  const { state, command, error } = useWorkflow();
  const { roleId } = useAppState();
  const { findTrial } = useTrialData();
  const patient = state.patients.find((p) => p.id === patientId);
  const trial = findTrial(trialId);
  const assessment = state.runs
    .flatMap((r) => r.assessments)
    .find((a) => a.id === params.get("assessment"));
  const model = assessment?.modelSnapshot;
  const [filter, setFilter] = useState("attention");
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState("");
  const [decision, setDecision] = useState<HumanReview["decision"]>("accept");
  const [dirty, setDirty] = useState(false);
  const blocker = useBlocker(dirty);
  useEffect(() => {
    if (!dirty) return;
    const guard = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);
  const findings =
    assessment?.findings.filter(
      (f) =>
        filter === "all" ||
        (filter === "attention" && f.state !== "supported") ||
        (filter === "supported" && f.state === "supported") ||
        (filter === "inclusion" &&
          model?.criteria.find((c) => c.id === f.criterionId)?.section ===
            "inclusion") ||
        (filter === "exclusion" &&
          model?.criteria.find((c) => c.id === f.criterionId)?.section ===
            "exclusion"),
    ) ?? [];
  const selected =
    assessment?.findings.find(
      (f) => f.criterionId === params.get("criterion"),
    ) ??
    findings[0] ??
    assessment?.findings[0];
  const criterion = model?.criteria.find((c) => c.id === selected?.criterionId);
  useEffect(() => {
    if (criterion)
      document.getElementById("selected-criterion-heading")?.focus();
  }, [criterion?.id]);
  if (
    !patient ||
    !trial ||
    !assessment ||
    assessment.patientId !== patient.id ||
    assessment.trialId !== trial.id ||
    !model
  )
    return (
      <div className="page">
        <EmptyState icon="warning" title="Assessment not available">
          Run contextual pre-screening first. Historical browser-memory
          assessments reset on reload.{" "}
          <Link to={`/patients/${patientId}?section=matches`}>
            Return to patient matching
          </Link>
        </EmptyState>
      </div>
    );
  const current = isAssessmentCurrent(state, assessment);
  const editable = current && (roleId === "oncologist" || roleId === "site");
  const returnParams=new URLSearchParams();
  for(const key of ["run","matchFilter","scope","trial"])if(params.has(key))returnParams.set(key,params.get(key)!);
  const returnQuery=returnParams.toString();
  const reviewed = new Set(
    state.reviews
      .filter((r) => r.assessmentId === assessment.id)
      .map((r) => r.criterionId),
  );
  return (
    <div className="page review-page">
      <Link
        className="back-link"
        to={
          params.get("from") === "studies"
            ? `/studies?trial=${trial.id}&${returnQuery}`
            : `/patients/${patient.id}?section=matches&${returnQuery}`
        }
      >
        Back to{" "}
        {params.get("from") === "studies"
          ? "PI candidates"
          : `${patient.label} matches`}
      </Link>
      <PageHeader
        eyebrow={`${patient.label} × ${trial.id} · ${assessment.cohort}`}
        title="Criterion review"
        description={`Record v${assessment.patientVersion} · model v${assessment.modelVersion} · evaluation ${assessment.evaluatedAt}. Machine findings are immutable; human decisions are separate.`}
      />
      <AssessmentVector assessment={assessment} />
      {!current && (
        <p className="stale-label">
          Stale inputs. This historical assessment cannot receive new decisions.
        </p>
      )}
      <p>
        {reviewed.size}/{assessment.findings.length} criteria reviewed ·{" "}
        {dirty ? "Unsaved decision" : "No unsaved changes"}
      </p>
      {error && <p role="alert">{error}</p>}
      {blocker.state === "blocked" && (
        <div
          className="surface reading-surface"
          role="alertdialog"
          aria-label="Unsaved review"
        >
          <p>Leave and discard the unsaved decision?</p>
          <button
            onClick={() => {
              setDirty(false);
              blocker.proceed();
            }}
          >
            Discard and leave
          </button>
          <button onClick={() => blocker.reset()}>Keep editing</button>
        </div>
      )}
      <label>
        Criterion filter
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="attention">Needs attention</option>
          <option value="all">All criteria</option>
          <option value="supported">Supported</option>
          <option value="inclusion">Inclusion</option>
          <option value="exclusion">Exclusion</option>
        </select>
      </label>
      <SupportedReview
        key={assessment.id}
        assessment={assessment}
        disabled={!editable || dirty}
      />
      <div className="criterion-workbench">
        <nav aria-label="Assessment criteria">
          {findings.map((f) => (
            <button
              key={f.criterionId}
              className={
                selected?.criterionId === f.criterionId ? "active" : ""
              }
              disabled={dirty}
              onClick={() => {
                const next = new URLSearchParams(params);
                next.set("criterion", f.criterionId);
                setParams(next);
                setReason("");
                setEvidence("");
              }}
            >
              <strong>
                {f.criterionId} · {f.state}
              </strong>
              <small>
                {reviewed.has(f.criterionId) ? "Reviewed" : "Not reviewed"}
              </small>
            </button>
          ))}
          {!findings.length && (
            <p>No criteria in this filter. Select All criteria.</p>
          )}
        </nav>
        {selected && criterion && (
          <article className="criterion-inspector">
            <h2 id="selected-criterion-heading" tabIndex={-1}>
              {criterion.id} · {selected.state}
            </h2>
            <blockquote>{criterion.wording}</blockquote>
            <a href={model.sourceUrl} target="_blank" rel="noreferrer">
              Open official registry source
            </a>
            <p>
              Exact source characters {criterion.sourceStart}–
              {criterion.sourceEnd} · {assessment.sourceVersion}
            </p>
            <details>
              <summary>
                Structured demonstration interpretation and predicate trace
              </summary>
              <pre>
                {JSON.stringify(
                  { predicate: criterion.predicate, trace: selected.trace },
                  null,
                  2,
                )}
              </pre>
            </details>
            <p>{selected.trace.explanation}</p>
            <h3>Evidence used</h3>
            {selected.trace.assertionIds.map((id) => {
              const a = assessment.assertionSnapshot.find((x) => x.id === id);
              return a ? (
                <p key={id}>
                  <strong>{a.raw}</strong> · {a.authority} at evaluation ·{" "}
                  {a.observedAt}{" "}
                  <Link
                    to={`/patients/${patient.id}?section=sources&source=${encodeURIComponent(a.artifactId)}&locator=${encodeURIComponent(a.locator)}&returnAssessment=${encodeURIComponent(assessment.id)}&returnCriterion=${encodeURIComponent(criterion.id)}&from=${params.get("from")??"patient"}&${returnQuery}`}
                  >
                    View original
                  </Link>
                </p>
              ) : (
                <p key={id}>
                  Historical assertion {id} unavailable in this record.
                </p>
              );
            })}
            {selected.state === "unresolved" && (
              <div>
                <h3>Accept information work</h3>
                {criterionInformationNeeds(
                  criterion,
                  patient,
                  assessment.evaluatedAt,
                )
                  .filter((need) =>
                    demoFields.some((f) => f.concept === need.concept),
                  )
                  .map(({ concept, timeWindow }, index) => (
                    <button
                      className="button secondary"
                      key={`${concept}:${index}`}
                      disabled={!current || roleId === "auditor"}
                      onClick={() =>
                        command({
                          type: "accept-gap",
                          assessmentId: assessment.id,
                          criterionId: criterion.id,
                          concept,
                          timeWindow,
                          owner: "A. Rao",
                        })
                      }
                    >
                      Retrieve or clarify{" "}
                      {demoFields.find((f) => f.concept === concept)?.label} ·{" "}
                      {timeWindow}
                    </button>
                  ))}
                <Link to={`/patients/${patient.id}?section=tasks`}>
                  Open accepted tasks
                </Link>
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  command({
                    type: "review",
                    review: {
                      assessmentId: assessment.id,
                      criterionId: criterion.id,
                      decision,
                      reason,
                      evidence,
                    },
                  })
                )
                  setDirty(false);
              }}
            >
              <h3>Human review overlay</h3>
              <label>
                Decision
                <select
                  disabled={!editable}
                  value={decision}
                  onChange={(e) => {
                    setDecision(e.target.value as HumanReview["decision"]);
                    setDirty(true);
                  }}
                >
                  <option value="accept">Accept machine finding</option>
                  <option value="override">Record differing human view</option>
                  <option value="defer">Defer for clarification</option>
                </select>
              </label>
              <label>
                Reason
                <textarea
                  disabled={!editable}
                  value={reason}
                  maxLength={500}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setDirty(true);
                  }}
                />
              </label>
              <label>
                Evidence reference
                <input
                  disabled={!editable}
                  value={evidence}
                  maxLength={240}
                  onChange={(e) => {
                    setEvidence(e.target.value);
                    setDirty(true);
                  }}
                />
              </label>
              <button className="button primary" disabled={!editable}>
                Save criterion review
              </button>
              {dirty && (
                <button
                  type="button"
                  className="button quiet"
                  onClick={() => {
                    setDirty(false);
                    setReason("");
                    setEvidence("");
                  }}
                >
                  Discard unsaved decision
                </button>
              )}
            </form>
            <details>
              <summary>Recorded review history</summary>
              {state.reviews
                .filter(
                  (r) =>
                    r.assessmentId === assessment.id &&
                    r.criterionId === criterion.id,
                )
                .map((r, i) => (
                  <p key={i}>
                    {r.decision} · {r.author} · {r.recordedAt} · {r.reason} ·{" "}
                    {r.evidence}
                  </p>
                ))}
            </details>
          </article>
        )}
      </div>
      <section className="surface reading-surface">
        <h2>Shortlist and handoff</h2>
        <button
          className="button secondary"
          disabled={!editable || dirty}
          onClick={() =>
            command({ type: "shortlist", assessmentId: assessment.id })
          }
        >
          {state.shortlist.includes(assessment.id)
            ? "Remove from shortlist"
            : "Add to human shortlist"}
        </button>
        <Link
          className="button secondary"
          to={`/studies?trial=${trial.id}&assessment=${encodeURIComponent(assessment.id)}`}
        >
          Record trial-side disposition
        </Link>
        <button
          className="button primary"
          disabled={!current || roleId === "auditor" || dirty}
          onClick={() =>
            command({ type: "packet", assessmentId: assessment.id })
          }
        >
          Prepare reviewed synthetic packet
        </button>
        <Link to={`/patients/${patient.id}?section=handoffs`}>
          Open simulated handoffs
        </Link>
      </section>
    </div>
  );
}
