import { useEffect, useState } from "react";
import type { Assessment } from "../domain/model";
import { useWorkflow } from "../state/WorkflowState";
export function SupportedReview({
  assessment,
  disabled,
}: {
  assessment: Assessment;
  disabled: boolean;
}) {
  const { state, command } = useWorkflow();
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => setSelected([]), [state.reviews, assessment.id]);
  const reviewed = new Set(state.reviews.filter((r) => r.assessmentId === assessment.id).map((r) => r.criterionId));
  const supported = assessment.findings.filter((f) => f.state === "supported" && !reviewed.has(f.criterionId));
  if (!supported.length) return null;
  return (
    <details className="supported-review">
      <summary>Review {supported.length} supported findings together</summary>
      <p>
        Only supported findings can be selected. Unresolved, violated and
        non-applicable criteria require individual review. This records human
        acknowledgement, never eligibility.
      </p>
      <label className="check-control"><input type="checkbox" disabled={disabled} checked={selected.length === supported.length} onChange={(event) => setSelected(event.target.checked ? supported.map((f) => f.criterionId) : [])} />Select all listed supported findings</label>
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
        Acknowledge {selected.length} selected findings
      </button>
    </details>
  );
}
