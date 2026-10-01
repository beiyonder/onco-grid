import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmptyState,
  PageHeader,
  SafetyNote,
  StatusChip,
} from "../components/Primitives";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
export function PatientsPage() {
  const { state, command, error } = useWorkflow();
  const { roleId, patients: researchPatients } = useAppState();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [scenario, setScenario] = useState(10);
  const [sort, setSort] = useState("number");
  const patients = state.patients
    .filter((p) =>
      `${p.label} ${p.id} ${p.condition} ${p.scenario} ${p.owner}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "condition"
        ? a.condition.localeCompare(b.condition)
        : a.label.localeCompare(b.label, undefined, { numeric: true }),
    );
  return (
    <div className="page">
      <PageHeader
        eyebrow="Synthetic patient repository"
        title="Patients"
        description="Recorded facts, original sources and reviewable pre-screening. Every example is synthetic; changes reset on reload."
      />
      <SafetyNote>
        <p>
          <strong>Demonstration only.</strong> No real patient input or clinical
          validation. Fixture date: 20 September 2026. Ingestion origin and
          reviewer authority are separate.
        </p>
      </SafetyNote>
      {error && <p role="alert">{error}</p>}
      <section className="surface patient-index">
        <div className="patient-index-toolbar">
          <label>
            Search patients
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Patient number, diagnosis, scenario or owner"
            />
          </label>
          <label>
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="number">Patient number</option>
              <option value="condition">Diagnosis context</option>
            </select>
          </label>
        </div>
        <details className="create-workspace">
          <summary>New demo patient</summary>
          <label>
            Supplied scenario
            <select
              value={scenario}
              onChange={(e) => setScenario(Number(e.target.value))}
            >
              {state.patients.slice(0, 12).map((p, i) => (
                <option key={p.id} value={i}>
                  {p.scenario}
                </option>
              ))}
            </select>
          </label>
          <button
            className="button primary"
            disabled={roleId === "auditor"}
            onClick={() => {
              const id = `SYN-${String(state.patients.length + 1).padStart(3, "0")}`;
              if (command({ type: "create-patient", scenario }))
                navigate(`/patients/${id}`);
            }}
          >
            Create demo patient
          </button>
        </details>
        <p>
          {patients.length} of {state.patients.length} synthetic patients ·
          browser session only
        </p>
        <div className="patient-list">
          {patients.map((p) => (
            <Link className="patient-row" to={`/patients/${p.id}`} key={p.id}>
              <span className="patient-monogram">{p.label.split(" ")[1]}</span>
              <span className="patient-row-main">
                <small>
                  {p.id} · record v{p.version}
                </small>
                <strong>{p.label}</strong>
                <span>{p.context}</span>
              </span>
              <span>
                <strong>{p.scenario}</strong>
                <small className="block">
                  {p.artifacts.length} originals · {p.assertions.length}{" "}
                  assertions · {p.owner}
                </small>
              </span>
              <StatusChip tone="human">Synthetic</StatusChip>
            </Link>
          ))}
        </div>
        {!patients.length && (
          <EmptyState icon="search" title="No matching patients">
            Change the search. No external patient search is performed.
          </EmptyState>
        )}
      </section>
      {researchPatients.some(
        (p) => p.dataBoundary === "Approved de-identified research",
      ) && (
        <section className="surface reading-surface">
          <h2>Approved research workspaces</h2>
          <p>Separate source review only; excluded from synthetic matching.</p>
          {researchPatients
            .filter((p) => p.dataBoundary === "Approved de-identified research")
            .map((p) => (
              <p key={p.id}>
                <Link to={`/patients/${p.id}`}>{p.label}</Link>
              </p>
            ))}
        </section>
      )}
    </div>
  );
}
