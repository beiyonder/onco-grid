import { ReferralList } from "./ReferralPage";
import { PilotHandoffPanel } from "../components/PilotHandoffPanel";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { PageHeader, SafetyNote, EmptyState } from "../components/Primitives";
import { SourceInventory } from "../components/PatientEvidence";
import { MatchingResults } from "../components/MatchingResults";
import { GapTasks } from "../components/GapTasks";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
import { demoFields } from "../domain/patients";
import { isAssessmentCurrent } from "../domain/workflow";
const sections = ["Overview", "Sources", "Trial matches", "Tasks", "Referrals"];
const sectionIds = ["overview", "sources", "matches", "tasks", "handoffs"];
export function PatientWorkspacePage() {
  const { patientId } = useParams();
  const [params, setParams] = useSearchParams();
  const { state, error } = useWorkflow();
  const { patients: researchPatients } = useAppState();
  const patient = state.patients.find((p) => p.id === patientId);
  const research = researchPatients.find(
    (p) =>
      p.id === patientId &&
      p.dataBoundary === "Approved de-identified research",
  );
  const section = params.get("section") ?? "overview";
  if (research)
    return (
      <div className="page">
        <Link to="/patients">Back to patients</Link>
        <PageHeader
          title={research.label}
          eyebrow="Approved research · not eligible for synthetic matching"
          description={`Approval reference: ${research.approvalReference}`}
        />
        <div className="fact-grid">
          {research.facts.map((f) => (
            <article className="fact-card" key={f.id}>
              <strong>{f.label}</strong>
              <span>{f.value}</span>
              <small>{f.sourceLabel}</small>
            </article>
          ))}
        </div>
        <p>
          Original source artifacts were not supplied with this approved
          structured import.
        </p>
        <Link to={`/trials?reviewFor=${research.id}`}>
          Open general library for manual source review
        </Link>
      </div>
    );
  if (!patient)
    return (
      <div className="page">
        <EmptyState icon="warning" title="Patient not in this session">
          Created demo records reset on reload.{" "}
          <Link to="/patients">Open patients</Link>
        </EmptyState>
      </div>
    );
  const assessments = state.runs
    .flatMap((r) => r.assessments)
    .filter((a) => a.patientId === patient.id);
  return (
    <div className="page patient-page">
      <Link className="back-link" to="/patients">
        Back to Patients
      </Link>
      <PageHeader
        eyebrow={`${patient.id} · Synthetic demo · record v${patient.version}`}
        title={patient.label}
        description={`${patient.context} · ${patient.scenario} · ${patient.owner}`}
        actions={
          <Link
            className="button primary"
            to={`/patients/${patient.id}?section=matches`}
          >
            Find matching trials
          </Link>
        }
      />
      <SafetyNote>
        <p>
          <strong>Synthetic demonstration.</strong> Facts, machine findings,
          human review and trial-side disposition remain separate. No autonomous
          eligibility or treatment recommendation. Changes reset on reload.
        </p>
      </SafetyNote>
      {error && <p role="alert">{error}</p>}
      <div className="section-tabs-glass">
        <nav className="section-tabs" aria-label="Patient workspace sections">
          {sections.map((label, i) => (
            <button
              className={section === sectionIds[i] ? "active" : ""}
              key={label}
              onClick={() => setParams({ section: sectionIds[i]! })}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <section className="workspace-section">
        {section === "overview" && (
          <>
            <h2>Recorded patient context</h2>
            <p>
              Full record grouped by source domain. Missing, conflicting and
              unreviewed inputs stay explicit.
            </p>
            {[
              "Clinic",
              "Pathology",
              "Molecular",
              "Laboratory",
              "Treatment",
            ].map((group) => (
              <section key={group}>
                <h3>{group}</h3>
                <div className="fact-grid">
                  {demoFields
                    .filter((f) => f.group === group)
                    .map((field) => {
                      const assertions = patient.assertions.filter(
                        (a) =>
                          a.concept === field.concept &&
                          a.authority !== "rejected",
                      );
                      const conflict =
                        new Set(
                          assertions.map((a) =>
                            JSON.stringify([a.value, a.unit]),
                          ),
                        ).size > 1;
                      return (
                        <article className="fact-card" key={field.concept}>
                          <span>{field.label}</span>
                          {!assertions.length ? (
                            <strong>Not recorded</strong>
                          ) : (
                            assertions.map((a) => {
                              const source = patient.artifacts.find(
                                (s) => s.id === a.artifactId,
                              );
                              return (
                                <div key={a.id}>
                                  <strong>
                                    {String(a.value)} {a.unit}
                                  </strong>
                                  <small className="block">
                                    {conflict ? "Conflicting evidence · " : ""}
                                    {a.authority} · observed {a.observedAt}
                                  </small>
                                  <small className="block">
                                    {source?.origin ?? "Original unavailable"} ·{" "}
                                    {source?.title} ·{" "}
                                    {a.reviewer ?? "Not yet checked"}
                                  </small>
                                  <Link
                                    to={`/patients/${patient.id}?section=sources&source=${encodeURIComponent(a.artifactId)}&locator=${encodeURIComponent(a.locator)}`}
                                  >
                                    View original at {a.locator}
                                  </Link>
                                </div>
                              );
                            })
                          )}
                        </article>
                      );
                    })}
                </div>
              </section>
            ))}
          </>
        )}
        {section === "sources" && <SourceInventory patient={patient} />}
        {section === "matches" && (
          <MatchingResults direction="patient-first" id={patient.id} />
        )}
        {section === "tasks" && <GapTasks patientId={patient.id} />}
        {section === "handoffs" && (
          <>
            <ReferralList patientId={patient.id} />
            <details className="separate-pilot-handoff">
              <summary>Separate authenticated staff coordination (no patient link)</summary>
              <PilotHandoffPanel trialIds={[...new Set(assessments.filter(a => (state.shortlist.includes(a.id) || state.referrals.some(r => r.assessmentId === a.id)) && isAssessmentCurrent(state, a)).map(a => a.trialId))]} />
            </details>
          </>
        )}
      </section>
    </div>
  );
}
