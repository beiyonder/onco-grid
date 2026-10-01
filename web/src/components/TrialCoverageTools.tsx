import { type ChangeEvent, type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  approvedResearchFactLabels,
  parseApprovedResearchRecord,
} from "../data/researchImport";
import { useAppState } from "../state/AppState";
import { useWorkflow } from "../state/WorkflowState";
import type { PatientWorkspace, TrialRecord } from "../types";
import { Icon } from "./Icon";
import { StatusChip } from "./Primitives";

type Panel = "patient" | "cohort";
type FilterOperator = "equals" | "contains" | "present" | "missing";
type FilterLabel = (typeof approvedResearchFactLabels)[number];

interface CohortFilter {
  id: number;
  label: FilterLabel;
  operator: FilterOperator;
  value: string;
}

const approvedTemplate = {
  schemaVersion: 1,
  approvalReference: "APPROVAL-REFERENCE",
  context: "NSCLC · source coverage review",
  owner: "Dr M. Shah",
  facts: [
    { label: "Diagnosis context", value: "Non-small cell lung cancer" },
    { label: "Stage context", value: "Stage IV" },
    { label: "PD-L1 TPS", value: "60%" },
    { label: "KRAS G12C", value: "Unknown" },
  ],
};

const factLabelAliases: Record<FilterLabel, string[]> = {
  "Diagnosis context": ["Diagnosis context", "Diagnosis"],
  "Stage context": ["Stage context", "Stage"],
  "PD-L1 TPS": ["PD-L1 TPS"],
  "KRAS G12C": ["KRAS G12C"],
  "ECOG performance status": ["ECOG performance status", "ECOG"],
  "Age band": ["Age band"],
  Sex: ["Sex"],
  "Prior treatment context": ["Prior treatment context"],
  "Molecular result context": ["Molecular result context", "Molecular report"],
};

function workspaceMeetsFilters(workspace: PatientWorkspace, filters: CohortFilter[]): boolean {
  return filters.every((filter) => {
    const fact = workspace.facts.find((candidate) => factLabelAliases[filter.label].includes(candidate.label));
    if (filter.operator === "present") return Boolean(fact?.value.trim());
    if (filter.operator === "missing") return !fact?.value.trim();
    if (!fact) return false;
    const factValue = fact.value.trim().toLocaleLowerCase();
    const filterValue = filter.value.trim().toLocaleLowerCase();
    return filter.operator === "equals"
      ? factValue === filterValue
      : factValue.includes(filterValue);
  });
}

export function TrialCoverageTools({ trial }: { trial: TrialRecord }) {
  const navigate = useNavigate();
  const {state:workflow}=useWorkflow();
  const syntheticPatients=workflow.patients;
  const {
    importApprovedResearchWorkspace,
    patients,
    startPatientTrialReview,
  } = useAppState();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [patientQuery, setPatientQuery] = useState("");
  const [attested, setAttested] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [filterLabel, setFilterLabel] = useState<FilterLabel>("Diagnosis context");
  const [filterOperator, setFilterOperator] = useState<FilterOperator>("contains");
  const [filterValue, setFilterValue] = useState("");
  const [filters, setFilters] = useState<CohortFilter[]>([]);
  const filterSequence = useRef(0);

  useEffect(() => {
    if (!panel) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    const timeout = window.setTimeout(() => document.getElementById("coverage-dialog-heading")?.focus(), 0);
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      previousFocus?.focus();
    };
  }, [panel]);
  const filteredPatients = useMemo(() => {
    const query = patientQuery.trim().toLocaleLowerCase();
    if (!query) return patients;
    return patients.filter((patient) => [
      patient.id,
      patient.label,
      patient.context,
      patient.owner,
      patient.dataBoundary,
    ].join(" ").toLocaleLowerCase().includes(query));
  }, [patientQuery, patients]);

  const cohort = useMemo(
    () => patients.filter((patient) => workspaceMeetsFilters(patient, filters)),
    [filters, patients],
  );

  const openReview = (patientId: string) => {
    startPatientTrialReview(patientId, trial.id);
    setPanel(null);
    navigate(`/research/${patientId}/reviews/${trial.id}`);
  };

  const importResearchRecord = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setImportError(null);
    if (!attested) {
      setImportError("Confirm the de-identified research-data boundary before selecting a file.");
      return;
    }
    if (file.size > 131_072) {
      setImportError("The JSON file must be 128 KB or smaller.");
      return;
    }

    try {
      const record = parseApprovedResearchRecord(await file.text());
      const patientId = importApprovedResearchWorkspace(record);
      startPatientTrialReview(patientId, trial.id);
      setPanel(null);
      navigate(`/research/${patientId}/reviews/${trial.id}`);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "The research record could not be imported.");
    }
  };

  const addFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((filterOperator === "equals" || filterOperator === "contains") && !filterValue.trim()) return;
    filterSequence.current += 1;
    setFilters((current) => [...current, {
      id: filterSequence.current,
      label: filterLabel,
      operator: filterOperator,
      value: filterOperator === "present" || filterOperator === "missing" ? "" : filterValue.trim(),
    }]);
    setFilterValue("");
  };
  const close = () => {
    setPanel(null);
    setImportError(null);
  };

  return <>
    <button className="button primary" type="button" onClick={() => setPanel("patient")}><Icon name="patients" /> Review with patient</button>
    <button className="button secondary" type="button" onClick={() => setPanel("cohort")}><Icon name="filter" /> Approved research cohort filters</button>
    <Link className="button secondary" to={`/studies?trial=${trial.id}`}>Open synthetic PI candidate queue</Link>
    {panel ? createPortal(
      <div className="coverage-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
        <section className="coverage-dialog" role="dialog" aria-modal="true" aria-labelledby="coverage-dialog-heading">
          <header>
            <div><p className="eyebrow">{trial.id} · clinician initiated</p><h2 id="coverage-dialog-heading" tabIndex={-1}>{panel === "patient" ? "Review this trial with a patient" : "Review explicit approved-research cohort coverage"}</h2><p>Synthetic pre-screening is separate from approved research, which remains manual and unscored. Neither establishes eligibility.</p></div>
            <button className="preview-close" type="button" onClick={close} aria-label="Close review tools"><Icon name="close" /></button>
          </header>

          {panel === "patient" ? <div className="coverage-dialog-body">
            <div className="coverage-boundary" role="note"><Icon name="shield" /><span><strong>Choose the record boundary.</strong>Synthetic examples open contextual pre-screening for this trial. Institutionally approved research opens manual source review only. Facts remain in browser memory and are never sent to the AI assistant.</span></div>
            <label className="search-field" htmlFor="coverage-patient-search"><span>Find a patient workspace</span><span className="input-with-icon"><Icon name="search" /><input id="coverage-patient-search" type="search" value={patientQuery} onChange={(event) => setPatientQuery(event.target.value)} placeholder="Synthetic ID, workspace, context, or owner" /></span></label>
            <div className="coverage-patient-list">
              {syntheticPatients.filter(p=>`${p.id} ${p.label} ${p.context} ${p.scenario}`.toLowerCase().includes(patientQuery.toLowerCase())).map(patient=><article key={patient.id}><div><code>{patient.id}</code><h3>{patient.label}</h3><p>{patient.context} · {patient.scenario}</p><StatusChip tone="human">Synthetic only</StatusChip></div><button className="button secondary" type="button" onClick={()=>{setPanel(null);navigate(`/patients/${patient.id}?section=matches&trial=${trial.id}&scope=selected`);}}>Review selected trial</button></article>)}
              {filteredPatients.map((patient) => <article key={patient.id}>
                <div><code>{patient.id}</code><h3>{patient.label}</h3><p>{patient.context}</p><span><StatusChip tone={patient.dataBoundary === "Synthetic demo" ? "human" : "source"}>{patient.dataBoundary}</StatusChip> · {patient.facts.length} sourced facts · owner {patient.owner}</span></div>
                <button className="button secondary" type="button" onClick={() => openReview(patient.id)}>Open criterion review</button>
              </article>)}
            </div>
            <section className="research-import" aria-labelledby="research-import-heading">
              <div><p className="eyebrow">Approved research import</p><h3 id="research-import-heading">Import structured de-identified facts</h3><p>JSON is validated and read only in this browser session. Identity fields, contact data, full dates, long identifiers, extra keys, and files over 128 KB are rejected.</p></div>
              <label className="check-control"><input type="checkbox" checked={attested} onChange={(event) => setAttested(event.target.checked)} /> I confirm this record is institutionally approved, de-identified research data and contains no direct or quasi-identifiers.</label>
              <div className="research-import-actions">
                <a className="button quiet" href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(approvedTemplate, null, 2))}`} download="trial-relay-approved-research-template.json">Download JSON template</a>
                <label className={`button secondary${attested ? "" : " disabled"}`}>Choose approved JSON<input className="sr-only" type="file" accept="application/json,.json" disabled={!attested} onChange={importResearchRecord} /></label>
              </div>
              {importError ? <p className="form-error" role="alert"><Icon name="warning" />{importError}</p> : null}
            </section>
          </div> : <div className="coverage-dialog-body">
            <div className="coverage-boundary" role="note"><Icon name="filter" /><span><strong>Transparent filters, unranked results.</strong>The count means only that a workspace meets every filter shown below. It does not mean trial fit, eligibility, or clinical similarity.</span></div>
            <form className="cohort-filter-builder" onSubmit={addFilter}>
              <label><span>Fact field</span><select value={filterLabel} onChange={(event) => setFilterLabel(event.target.value as FilterLabel)}>{approvedResearchFactLabels.map((label) => <option key={label}>{label}</option>)}</select></label>
              <label><span>Operator</span><select value={filterOperator} onChange={(event) => setFilterOperator(event.target.value as FilterOperator)}><option value="contains">Contains</option><option value="equals">Equals exactly</option><option value="present">Is present</option><option value="missing">Is missing</option></select></label>
              {filterOperator === "contains" || filterOperator === "equals" ? <label><span>Explicit value</span><input value={filterValue} onChange={(event) => setFilterValue(event.target.value)} placeholder="Enter the exact transparent filter" /></label> : null}
              <button className="button secondary" type="submit">Add filter</button>
            </form>
            <div className="active-cohort-filters" aria-label="Active cohort filters">
              {filters.length === 0 ? <span>No filters active · every workspace remains visible</span> : filters.map((filter) => <button type="button" key={filter.id} onClick={() => setFilters((current) => current.filter((candidate) => candidate.id !== filter.id))}>{filter.label} · {filter.operator}{filter.value ? ` · ${filter.value}` : ""}<Icon name="close" /></button>)}
            </div>
            <div className="cohort-result-summary"><strong>{cohort.length} of {patients.length} workspaces meet the explicit filters</strong><span>Unranked · browser-memory workspaces only · clinician review still required</span></div>
            <div className="coverage-patient-list cohort">
              {cohort.map((patient) => <article key={patient.id}><div><code>{patient.id}</code><h3>{patient.label}</h3><p>{patient.context}</p><span>{patient.dataBoundary} · {patient.owner}</span></div><button className="button secondary" type="button" onClick={() => openReview(patient.id)}>Open manual review</button></article>)}
            </div>
          </div>}
        </section>
      </div>,
      document.body,
    ) : null}
  </>;
}
