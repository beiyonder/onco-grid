import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { PatientFactSource } from "../types";
import { Icon, type IconName } from "./Icon";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div className="page-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1 tabIndex={-1}>{title}</h1>
        <p>{description}</p>
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </header>
  );
}

export function SafetyNote({ children }: { children: ReactNode }) {
  return <div className="safety-note" role="note"><Icon name="shield" />{children}</div>;
}

export function InfoTip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="info-tip">
      <summary aria-label={label} title={label}><span aria-hidden="true">i</span></summary>
      <div className="info-tip-panel" role="note">
        <strong>{label}</strong>
        <div>{children}</div>
      </div>
    </details>
  );
}

export function StatusChip({ tone = "neutral", children }: { tone?: "neutral" | "source" | "good" | "attention" | "danger" | "human"; children: ReactNode }) {
  return <span className={`status-chip ${tone}`}>{children}</span>;
}

const sourceTone: Record<PatientFactSource, "neutral" | "source" | "good" | "human"> = {
  "Clinician confirmed": "good",
  "Synthetic document": "source",
  "Manual synthetic entry": "neutral",
  "Approved de-identified research data": "source",
  "Conceptual future EMR": "human",
};

export function SourceBadge({ source }: { source: PatientFactSource }) {
  return <StatusChip tone={sourceTone[source]}>{source}</StatusChip>;
}

export function EmptyState({ icon, title, children, action }: { icon: IconName; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><Icon name={icon} /></span>
      <h2>{title}</h2>
      <p>{children}</p>
      {action ? <div className="empty-action">{action}</div> : null}
    </div>
  );
}

export function InlineLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="inline-link" to={to}>{children}<Icon name="arrow" /></Link>;
}
