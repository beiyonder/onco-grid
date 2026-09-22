import type { DeterministicAbstract } from "../data/evidence";
import { Icon } from "./Icon";
import { InfoTip } from "./Primitives";

export function SourceAbstract({ value, compact = false }: { value: DeterministicAbstract; compact?: boolean }) {
  return (
    <div className={`evidence-abstract${compact ? " compact" : ""}`}>
      <p className="evidence-abstract-summary">{value.sourceSummary}</p>
      <dl className="evidence-abstract-grid">
        <div><dt>Study design</dt><dd>{value.studyDesign}</dd></div>
        <div><dt>Registry population</dt><dd>{value.population}</dd></div>
        <div><dt>Exact interventions</dt><dd>{value.interventions}</dd></div>
        <div><dt>Geography</dt><dd>{value.geography}</dd></div>
        <div><dt>Source state</dt><dd>{value.sourceStatus}</dd></div>
      </dl>
      <div className="evidence-abstract-tools"><InfoTip label="How this abstract is built"><p>Registry fields are placed in a fixed reading order. No outcomes are interpreted, treatments compared, or people assessed.</p></InfoTip></div>
      {value.sourceNotes.map((note) => <p className="source-notes" key={note}><Icon name="warning" />{note}</p>)}
      {value.missingFields.length > 0 ? <p className="missing-fields"><strong>Not reported:</strong> {value.missingFields.join(", ")}</p> : null}
    </div>
  );
}
