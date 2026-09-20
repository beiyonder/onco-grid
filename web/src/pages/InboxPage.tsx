import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { useAppState } from "../state/AppState";
import type { WorkItemKind } from "../types";

const filters: Array<{ id: "all" | WorkItemKind; label: string }> = [
  { id: "all", label: "All attention" },
  { id: "message", label: "Messages" },
  { id: "task", label: "Tasks" },
  { id: "update", label: "Updates" },
  { id: "handoff", label: "Handoffs" },
];

export function InboxPage() {
  const { resolveWorkItem, role, roleId, workItems } = useAppState();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visibleItems = useMemo(() => workItems
    .filter((item) => item.roleIds.includes(roleId))
    .filter((item) => filter === "all" || item.kind === filter)
    .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt)), [filter, roleId, workItems]);
  const openCount = visibleItems.filter((item) => item.status !== "resolved").length;

  return (
    <div className="page inbox-page">
      <PageHeader eyebrow={`${role.title} queue`} title="Inbox" description="Only unread, owned, or explicitly accepted work appears here. Unknown registry and site states stay source states until a person creates work." />
      <SafetyNote><p><strong>No system-wide unknowns masquerade as tasks.</strong> This browser-memory queue contains five deliberate synthetic examples with a source, owner, state, and exact return position.</p></SafetyNote>
      <section className="surface inbox-surface" aria-labelledby="inbox-heading">
        <div className="inbox-toolbar"><div><p className="eyebrow">Attention queue</p><h2 id="inbox-heading">{openCount} items need attention</h2></div><div className="segmented-control" aria-label="Inbox type filter">{filters.map((candidate) => <button type="button" key={candidate.id} className={filter === candidate.id ? "active" : ""} aria-pressed={filter === candidate.id} onClick={() => setFilter(candidate.id)}>{candidate.label}</button>)}</div></div>
        {visibleItems.length ? <div className="inbox-list">{visibleItems.map((item) => (
          <article className={`inbox-row ${item.status === "resolved" ? "resolved" : ""}`} key={item.id}>
            <span className={`work-icon ${item.kind}`}><Icon name={item.kind} /></span>
            <div className="inbox-copy"><div><StatusChip tone={item.status === "resolved" ? "good" : item.kind === "message" ? "human" : "attention"}>{item.status}</StatusChip><code>{item.id}</code></div><h3>{item.title}</h3><p>{item.summary}</p><small>{item.sourceLabel} · owner {item.owner} · {new Date(item.occurredAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</small></div>
            <div className="inbox-actions"><Link className="button secondary" to={item.route}>Open context</Link>{item.status !== "resolved" ? <button className="button quiet" type="button" onClick={() => resolveWorkItem(item.id)}><Icon name="check" /> Mark resolved</button> : null}</div>
          </article>
        ))}</div> : <EmptyState icon="check" title="No attention items in this view">Change the type filter or switch prototype roles. Resolved work remains visible under its applicable filter.</EmptyState>}
      </section>
    </div>
  );
}
