import { useState } from "react";
import type { Assessment } from "../domain/model";
import { useWorkflow } from "../state/WorkflowState";
export function SupportedReview({
  assessment,
  disabled,
}: {
  assessment: Assessment;
  disabled: boolean;
}) {
  const { command } = useWorkflow();
  const [selected, setSelected] = useState<string[]>([]);
  const supported = assessment.findings.filter((f) => f.state === "supported");
  return (
    <details className="surface reading-surface">
      <summary>Review selected supported findings together</summary>
      <p>
        Only supported findings can be selected. Unresolved, violated and
        non-applicable criteria require individual review. This records human
        acknowledgement, never eligibility.
      </p>
      {supported.map((f) => (
        <label className="check-control" key={f.criterionId}>
          <input
            type="checkbox"
            checked={selected.includes(f.criterionId)}
            disabled={disabled}
            onChange={(e) =>
              setSelected(
                e.target.checked
                  ? [...selected, f.criterionId]
                  : selected.filter((id) => id !== f.criterionId),
              )
            }
          />
          {f.criterionId} ·{" "}
          {
            assessment.modelSnapshot.criteria.find(
              (c) => c.id === f.criterionId,
            )?.wording
          }
        </label>
      ))}
      <button
        className="button secondary"
        disabled={disabled || !selected.length}
        onClick={() => {
          if (
            command({
              type: "bulk-accept",
              assessmentId: assessment.id,
              criterionIds: selected,
            })
          )
            setSelected([]);
        }}
      >
        Accept {selected.length} explicitly selected supported findings
      </button>
    </details>
  );
}
