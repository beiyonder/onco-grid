import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { useAppState } from "../state/AppState";

export function PatientsPage() {
  const { patients } = useAppState();
  const [query, setQuery] = useState("");
  const filteredPatients = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return patients;
    return patients.filter((patient) => [patient.id, patient.label, patient.context, patient.owner, patient.institution].join(" ").toLocaleLowerCase().includes(term));
  }, [patients, query]);

  return (
    <div className="page">
      <PageHeader eyebrow="Synthetic workspace index" title="Patient Workspaces" description="Find and open source-labelled synthetic cases. No real patient data, matching, ranking, or durable storage is supported." />
      <SafetyNote><p><strong>Synthetic demonstration only.</strong> Use these workspaces to validate navigation, provenance, criterion review, and owned tasks—not clinical decisions.</p></SafetyNote>
      <section className="surface patient-index" aria-labelledby="workspace-count">
        <div className="library-toolbar">
          <label className="search-field"><span>Search synthetic workspaces</span><span className="input-with-icon"><Icon name="search" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Workspace label, context, or owner" /></span></label>
          <div className="result-count"><strong id="workspace-count">{filteredPatients.length} workspaces</strong><span>Browser-memory validation data</span></div>
        </div>
        <div className="patient-list">
          {filteredPatients.map((patient) => (
            <Link className="patient-row" to={`/patients/${patient.id}`} key={patient.id}>
              <span className="patient-monogram" aria-hidden="true">{patient.label.split(" ")[1]?.slice(0, 2).toUpperCase() ?? "SY"}</span>
              <span className="patient-row-main"><small>{patient.id}</small><strong>{patient.label}</strong><span>{patient.context}</span></span>
              <span className="patient-row-meta"><span><small>Owner</small><strong>{patient.owner}</strong></span><span><small>Trials under review</small><strong>{patient.reviewTrialIds.length}</strong></span></span>
              <StatusChip tone="human">Synthetic only</StatusChip>
              <Icon name="arrow" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
