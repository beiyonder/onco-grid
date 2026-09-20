import { type FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { useAppState } from "../state/AppState";

const syntheticContexts = [
  "NSCLC · source collation",
  "Breast cancer · source collation",
  "Colorectal cancer · missing records",
  "General oncology · workflow demonstration",
];

export function PatientsPage() {
  const navigate = useNavigate();
  const { createSyntheticWorkspace, patients, role } = useAppState();
  const [query, setQuery] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [creating, setCreating] = useState(false);
  const [context, setContext] = useState(syntheticContexts[0]!);
  const [owner, setOwner] = useState(role.id === "oncologist" ? role.name : "A. Rao");

  const owners = useMemo(() => Array.from(new Set(patients.map((patient) => patient.owner))).sort(), [patients]);
  const filteredPatients = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return patients
      .filter((patient) => ownerFilter === "all" || patient.owner === ownerFilter)
      .filter((patient) => !term || [patient.id, patient.label, patient.context, patient.owner, patient.institution].join(" ").toLocaleLowerCase().includes(term))
      .sort((left, right) => {
        if (sort === "label") return left.label.localeCompare(right.label);
        if (sort === "owner") return left.owner.localeCompare(right.owner) || left.label.localeCompare(right.label);
        return right.lastActivity.localeCompare(left.lastActivity);
      });
  }, [ownerFilter, patients, query, sort]);

  const createWorkspace = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = createSyntheticWorkspace(context, owner);
    navigate(`/patients/${id}`);
  };

  return (
    <div className="page">
      <PageHeader
        eyebrow="Browser-only workspace index"
        title="Patient Workspaces"
        description="Find, sort, and open source-labelled synthetic or institutionally approved de-identified research workspaces. No matching, ranking, or durable storage is supported."
        actions={<button className="button primary" type="button" onClick={() => setCreating(true)}><Icon name="plus" /> Create synthetic workspace</button>}
      />
      <SafetyNote><p><strong>No identifiable patient data.</strong> Synthetic creation stays controlled. Approved de-identified research records can enter only through the strict JSON import on a selected Trial Detail and remain in browser memory; identity fields and files are rejected.</p></SafetyNote>

      {creating ? <section className="surface create-workspace" role="dialog" aria-modal="false" aria-labelledby="create-workspace-heading">
        <div className="section-heading"><div><p className="eyebrow">Controlled demonstration</p><h2 id="create-workspace-heading">Create a synthetic workspace</h2><p>Choose only predefined synthetic context. There is no free-text patient identity or file upload.</p></div><button className="preview-close" type="button" onClick={() => setCreating(false)} aria-label="Close synthetic workspace creation"><Icon name="close" /></button></div>
        <form onSubmit={createWorkspace}>
          <label><span>Synthetic oncology context</span><select value={context} onChange={(event) => setContext(event.target.value)}>{syntheticContexts.map((candidate) => <option key={candidate}>{candidate}</option>)}</select></label>
          <label><span>Demonstration owner</span><select value={owner} onChange={(event) => setOwner(event.target.value)}>{["A. Rao", "Dr M. Shah"].map((candidate) => <option key={candidate}>{candidate}</option>)}</select></label>
          <div className="creation-boundary"><Icon name="shield" /><span><strong>Browser-memory only</strong>No person is created, no record is uploaded, and nothing persists after reload.</span></div>
          <button className="button primary" type="submit">Create synthetic fixture</button>
        </form>
      </section> : null}

      <section className="surface patient-index" aria-labelledby="workspace-count">
        <div className="patient-index-toolbar">
          <div className="search-field"><label htmlFor="patient-search">Search browser workspaces</label><span className="input-with-icon"><Icon name="search" /><input id="patient-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Workspace label, context, owner, or local ID" /></span></div>
          <label><span>Owner</span><select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)}><option value="all">All owners</option>{owners.map((candidate) => <option key={candidate}>{candidate}</option>)}</select></label>
          <label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recent">Recent activity</option><option value="label">Workspace label</option><option value="owner">Owner</option></select></label>
        </div>
        <div className="result-count patient-count"><strong id="workspace-count">{filteredPatients.length} of {patients.length} workspaces</strong><span>Synthetic or approved de-identified research · browser session only</span></div>
        {filteredPatients.length ? <div className="patient-list">
          {filteredPatients.map((patient) => (
            <Link className="patient-row" to={`/patients/${patient.id}`} key={patient.id}>
              <span className="patient-monogram" aria-hidden="true">{patient.label.split(" ")[1]?.slice(0, 2).toUpperCase() ?? "SY"}</span>
              <span className="patient-row-main"><small>{patient.id}</small><strong>{patient.label}</strong><span>{patient.context}</span></span>
              <span className="patient-row-meta"><span><small>Owner</small><strong>{patient.owner}</strong></span><span><small>Trials under review</small><strong>{patient.reviewTrialIds.length}</strong></span></span>
              <StatusChip tone={patient.dataBoundary === "Synthetic demo" ? "human" : "source"}>{patient.dataBoundary}</StatusChip>
              <Icon name="arrow" />
            </Link>
          ))}
        </div> : <EmptyState icon="search" title="No workspaces match">Reset the search or owner filter. No broader patient search runs automatically.</EmptyState>}
      </section>
    </div>
  );
}
