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

export function StatusChip({ tone = "neutral", children }: { tone?: "neutral" | "source" | "good" | "attention" | "danger" | "human"; children: ReactNode }) {
  return <span className={`status-chip ${tone}`}>{children}</span>;
}

export function SourceBadge({ source }: { source: PatientFactSource }) {
  const tone = source === "Clinician confirmed"
    ? "good"
    : source === "Synthetic document"
      ? "source"
      : source === "Conceptual future EMR"
        ? "human"
        : "neutral";
  return <StatusChip tone={tone}>{source}</StatusChip>;
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
