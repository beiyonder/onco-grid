import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchRegistryStudy, type RegistryStudy } from "../domain/registry";
import { PageHeader } from "../components/Primitives";
export function GlobalTrialPage() {
  const { trialId } = useParams();
  const [trial, setTrial] = useState<RegistryStudy | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setTrial(null);
    setError("");
    if (trialId)
      void fetchRegistryStudy(trialId, controller.signal)
        .then((result) => {
          if (!controller.signal.aborted) setTrial(result);
        })
        .catch((e) => {
          if (!controller.signal.aborted)
            setError(e instanceof Error ? e.message : "Source unavailable.");
        });
    return () => controller.abort();
  }, [trialId, attempt]);
  return (
    <div className="page detail-page">
      <Link to="/trials/evidence">Back to global discovery</Link>
      <PageHeader
        eyebrow={`${trialId} · global registry detail`}
        title={trial?.briefTitle ?? "Full registry source"}
        description="Public registry data only. Geographic presence does not establish site availability or patient eligibility."
      />
      {error ? (
        <div role="alert">
          <p>{error}</p>
          <button onClick={() => setAttempt((a) => a + 1)}>
            Retry complete source
          </button>
        </div>
      ) : !trial ? (
        <p role="status">Retrieving complete source…</p>
      ) : (
        <>
          <section className="surface reading-surface">
            <p>
              {trial.statusLabel} · source updated {trial.lastUpdatePostedDate}{" "}
              · fetched {trial.fetchedAt}
            </p>
            <p>
              {trial.sourceVersion} · {trial.detailState}
            </p>
            <p>{trial.conditions.join(" · ")}</p>
            <p>{trial.interventions.join(" · ")}</p>
            <p>{trial.briefSummary}</p>
            <a href={trial.sourceUrl} target="_blank" rel="noreferrer">
              Open official registry
            </a>
          </section>
          <section className="surface reading-surface">
            <h2>Complete retained eligibility source</h2>
            {trial.eligibilityCriteria ? (
              <pre>{trial.eligibilityCriteria}</pre>
            ) : (
              <p>
                No eligibility text supplied. This study cannot be assessed.
              </p>
            )}
            <p>
              No published criterion model: automatic assessment unavailable. No
              score or eligibility label is generated.
            </p>
          </section>
          <section className="surface reading-surface">
            <h2>Global registry-listed sites</h2>
            <p>
              {trial.locations.length} locations · {trial.countries.length}{" "}
              countries. Contact names and contact details are not retained.
            </p>
            {trial.locations.map((l, i) => (
              <p key={i}>
                <strong>{l.facility}</strong> · {l.city} · {l.state} ·{" "}
                {l.country} · registry status {l.status} · independent
                availability unknown
              </p>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
