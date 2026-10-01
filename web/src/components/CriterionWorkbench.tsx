import { useState } from "react";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
import type { CriterionModel } from "../domain/model";
import { reviseModel } from "../domain/modelRevision";
export function CriterionWorkbench({ model }: { model: CriterionModel }) {
  const { command } = useWorkflow();
  const { roleId } = useAppState();
  const [json, setJson] = useState(() =>
    JSON.stringify(
      model.criteria.map(({ id, predicate, applicability }) => ({
        id,
        predicate,
        applicability,
      })),
      null,
      2,
    ),
  );
  const [reason, setReason] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [error, setError] = useState("");
  return (
    <details>
      <summary>
        Criteria workbench — inspect, revise and publish a demonstration model
      </summary>
      <p>
        Source wording and cohort identity cannot be edited here. Every
        requirement must remain present. Unsupported rules abstain. No revision
        is clinical qualification.
      </p>
      <pre>{model.sourceText}</pre>
      {model.criteria.map((c) => (
        <article className="criterion-model-row" key={c.id}>
          <h3>
            {c.id} · {c.section}
          </h3>
          <blockquote>{c.wording}</blockquote>
          <small>
            Exact source characters {c.sourceStart}–{c.sourceEnd}
          </small>
        </article>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            const revision = reviseModel(model, json);
            if (command({ type: "publish", model: revision, reason })) {
              setReviewed(false);
              setReason("");
              setError("");
            }
          } catch (e) {
            setError(e instanceof Error ? e.message : "Invalid revision");
          }
        }}
      >
        <label>
          Demonstration predicate interpretation (JSON)
          <textarea
            className="predicate-editor"
            rows={16}
            value={json}
            onChange={(e) => {
              setJson(e.target.value);
              setReviewed(false);
            }}
            disabled={roleId !== "site" && roleId !== "oncologist"}
            spellCheck={false}
          />
        </label>
        <label className="check-control">
          <input
            type="checkbox"
            checked={reviewed}
            onChange={(e) => setReviewed(e.target.checked)}
          />
          I inspected every source requirement and the proposed interpretation;
          unsupported logic remains unresolved.
        </label>
        <label>
          Publication or revision reason
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={240}
          />
        </label>
        {error && <p role="alert">{error}</p>}
        <button
          className="button primary"
          disabled={
            !reviewed ||
            !reason.trim() ||
            !["oncologist", "site"].includes(roleId)
          }
        >
          Publish demonstration revision
        </button>
      </form>
      <p>
        Publication increments the model version and invalidates affected
        assessments. Historical runs retain their original interpretation and
        evidence snapshots.
      </p>
    </details>
  );
}
