import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { useAppState } from "../state/AppState";
import type { WorkItemKind } from "../types";
import { GapTasks } from "../components/GapTasks";

const typeFilters: Array<{ id: "all" | WorkItemKind; label: string }> = [
  { id: "all", label: "All types" },
  { id: "message", label: "Messages" },
  { id: "task", label: "Tasks" },
  { id: "update", label: "Updates" },
  { id: "handoff", label: "Handoffs" },
];

type StateFilter = "attention" | "resolved" | "all";

export function InboxPage() {
  const { resolveWorkItem, role, roleId, workItems } = useAppState();
  const [typeFilter, setTypeFilter] = useState<(typeof typeFilters)[number]["id"]>("all");
  const [stateFilter, setStateFilter] = useState<StateFilter>("attention");
  const roleItems = useMemo(() => workItems.filter((item) => item.roleIds.includes(roleId)), [roleId, workItems]);
  const visibleItems = useMemo(() => roleItems
    .filter((item) => typeFilter === "all" || item.kind === typeFilter)
    .filter((item) => stateFilter === "all" || (stateFilter === "resolved" ? item.status === "resolved" : item.status !== "resolved"))
    .sort((left, right) => right.occurredAt.localeCompare(left.occurredAt)), [roleItems, stateFilter, typeFilter]);
  const attentionCount = roleItems.filter((item) => item.status !== "resolved").length;

  return (
    <div className="page inbox-page">
      <PageHeader eyebrow={`${role.title} queue`} title="Inbox" description="Only unread, owned, or explicitly accepted work for the selected prototype role appears here. Unknown registry and site states stay source states until a person creates work." />
      <SafetyNote><p><strong>Only accepted information work becomes a task.</strong> Evidence-bearing gaps use explicit evidence and review transitions, never a generic resolution checkbox.</p></SafetyNote>
      <section className="surface reading-surface"><GapTasks /></section>
      <section className="surface inbox-surface" aria-labelledby="inbox-heading">
        <div className="inbox-toolbar">
          <div><p className="eyebrow">Accepted attention</p><h2 id="inbox-heading">{attentionCount} items need attention from {role.name}</h2><p>{roleItems.length} total items are visible to this role, including resolved work.</p></div>
          <div className="inbox-filters"><div className="segmented-control" aria-label="Inbox type filter">{typeFilters.map((candidate) => <button type="button" key={candidate.id} className={typeFilter === candidate.id ? "active" : ""} aria-pressed={typeFilter === candidate.id} onClick={() => setTypeFilter(candidate.id)}>{candidate.label}</button>)}</div><label><span>Work state</span><select value={stateFilter} onChange={(event) => setStateFilter(event.target.value as StateFilter)}><option value="attention">Needs attention</option><option value="resolved">Resolved</option><option value="all">All states</option></select></label></div>
        </div>
        {visibleItems.length ? <div className="inbox-list">{visibleItems.map((item) => (
          <article className={`inbox-row ${item.status === "resolved" ? "resolved" : ""}`} id={`work-${item.id}`} key={item.id}>
            <span className={`work-icon ${item.kind}`}><Icon name={item.kind} /></span>
            <div className="inbox-copy"><div><StatusChip tone={item.status === "resolved" ? "good" : item.kind === "message" ? "human" : "attention"}>{item.status}</StatusChip><code>{item.id}</code></div><h3>{item.title}</h3><p>{item.summary}</p><small>{item.sourceLabel} · owner {item.owner} · {new Date(item.occurredAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</small></div>
            <div className="inbox-actions"><Link className="button secondary" to={item.route}>Open exact context</Link>{item.status !== "resolved" ? <button className="button quiet" type="button" onClick={() => resolveWorkItem(item.id)}><Icon name="check" /> Mark resolved</button> : null}</div>
          </article>
        ))}</div> : <EmptyState icon="check" title="No items match this attention view">Change the type or state filter, or switch prototype roles. Unknown source states never appear here unless a person creates or accepts work.</EmptyState>}
      </section>
    </div>
  );
}
