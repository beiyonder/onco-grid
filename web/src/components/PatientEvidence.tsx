import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
import { demoFields } from "../domain/patients";
import type { SyntheticPatient } from "../domain/model";
export function PatientEvidence({
  patient,
  concept,
  gapId,
}: {
  patient: SyntheticPatient;
  concept?: string;
  gapId?: string;
}) {
  const { command } = useWorkflow();
  const { roleId } = useAppState();
  const [field, setField] = useState(concept ?? "egfr");
  const [value, setValue] = useState(0);
  const [reason, setReason] = useState("");
  const definition =
    demoFields.find((f) => f.concept === (concept ?? field)) ?? demoFields[0]!;
  return (
    <div className="evidence-entry">
      <h3>Provide supplied synthetic evidence</h3>
      <p>
        A manual entry remains unreviewed. No test result is inferred and no
        test is ordered.
      </p>
      <label>
        Concept
        <select
          value={definition.concept}
          disabled={!!concept}
          onChange={(e) => {
            setField(e.target.value);
            setValue(0);
          }}
        >
          {demoFields.map((f) => (
            <option key={f.concept} value={f.concept}>
              {f.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Supplied value
        <select
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        >
          {definition.values.map((v, i) => (
            <option key={i} value={i}>
              {String(v)} {definition.unit}
            </option>
          ))}
        </select>
      </label>
      <button
        className="button secondary"
        disabled={roleId === "auditor"}
        onClick={() =>
          command({
            type: "provide",
            patientId: patient.id,
            concept: definition.concept,
            value: definition.values[value]!,
            gapId,
          })
        }
      >
        Attach synthetic evidence
      </button>
      <h3>Reviewer confirmation and reconciliation</h3>
      <label>
        Reason
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={240}
          placeholder="Synthetic review rationale only"
        />
      </label>
      {patient.assertions
        .filter(
          (a) => a.concept === definition.concept && a.authority !== "rejected",
        )
        .map((a) => (
          <article className="assertion-review" key={a.id}>
            <strong>
              {String(a.value)} {a.unit}
            </strong>
            <span>
              {a.observedAt} · {a.artifactId} · {a.authority}
            </span>
            <button
              className="button secondary"
              disabled={roleId !== "oncologist" || !reason.trim()}
              onClick={() =>
                command({
                  type: "confirm",
                  patientId: patient.id,
                  assertionId: a.id,
                  reason,
                })
              }
            >
              Confirm this assertion; supersede alternatives
            </button>
          </article>
        ))}
      {roleId !== "oncologist" && (
        <p>
          Switch to the demo oncologist to confirm assertions. Attachment is not
          confirmation.
        </p>
      )}
    </div>
  );
}
export function SourceInventory({ patient }: { patient: SyntheticPatient }) {
  const [params, setParams] = useSearchParams();
  const artifact = patient.artifacts.find((a) => a.id === params.get("source"));
  const locator = params.get("locator");
  const {state}=useWorkflow();
  const returnAssessment=state.runs.flatMap(r=>r.assessments).find(a=>a.id===params.get("returnAssessment")&&a.patientId===patient.id);
  const returnParams=new URLSearchParams();
  if(returnAssessment)returnParams.set("assessment",returnAssessment.id);
  if(params.has("returnCriterion"))returnParams.set("criterion",params.get("returnCriterion")!);
  for(const key of ["from","run","matchFilter","scope","trial"])if(params.has(key))returnParams.set(key,params.get(key)!);
  useEffect(()=>{
    if(!artifact||!locator?.match(/^line:\d+$/))return;
    const line=document.getElementById(`source-line-${locator.slice(5)}`);
    line?.scrollIntoView({block:"center"});line?.focus({preventScroll:true});
  },[artifact?.id,locator]);
  return (
    <div className="source-workbench">
      <aside>
        <h2>Original sources</h2>
        {returnAssessment&&<Link className="button secondary" to={`/patients/${patient.id}/reviews/${returnAssessment.trialId}?${returnParams}`}>Return to exact criterion review</Link>}
        <p>Immutable supplied documents, not reconstructed fact cards.</p>
        {patient.artifacts.map((a) => (
          <button
            className={`source-document ${artifact?.id === a.id ? "active" : ""}`}
            key={a.id}
            onClick={() => {
              const next = new URLSearchParams(params);
              next.set("source", a.id);
              next.delete("locator");
              setParams(next);
            }}
          >
            <strong>{a.title}</strong>
            <small>
              {a.origin} · {a.authoredAt} · v{a.version}
            </small>
          </button>
        ))}
      </aside>
      <div>
        {artifact ? (
          <article className="original-viewer">
            <button
              className="button quiet"
              onClick={() => {
                const next = new URLSearchParams(params);
                next.delete("source");
                next.delete("locator");
                setParams(next);
              }}
            >
              Back to sources
            </button>
            <h2>{artifact.title}</h2>
            <p>
              <strong>Synthetic original</strong> · {artifact.origin} · authored{" "}
              {artifact.authoredAt} · imported {artifact.importedAt} · content v
              {artifact.version}
            </p>
            <pre>
              {artifact.content.split("\n").map((line, index) => (
                <span
                  className={
                    locator === `line:${index + 1}` ? "source-highlight" : ""
                  }
                  id={`source-line-${index + 1}`}
                  tabIndex={-1}
                  key={index}
                >
                  {index + 1} {line}
                  {"\n"}
                </span>
              ))}
            </pre>
            <button
              className="button secondary"
              onClick={() => {
                const url = URL.createObjectURL(
                  new Blob([artifact.content], { type: artifact.mediaType }),
                );
                const a = document.createElement("a");
                a.href = url;
                a.download = `${artifact.id}.txt`;
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
              }}
            >
              Download synthetic original
            </button>
            <h3>Linked assertions</h3>
            {patient.assertions
              .filter((a) => a.artifactId === artifact.id)
              .map((a) => (
                <p key={a.id}>
                  {a.raw} · {a.authority} · {a.locator}
                </p>
              ))}
          </article>
        ) : (
          <div className="original-viewer">
            <h2>Select an original</h2>
            <p>
              Choose a document to inspect its exact supplied content. Source
              origin does not imply clinician confirmation.
            </p>
          </div>
        )}
        <PatientEvidence patient={patient} />
      </div>
    </div>
  );
}
