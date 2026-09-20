import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { formatSourceDate } from "../data/trials";
import { roles } from "../data/demo";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";
import type { RoleId } from "../types";
import { Icon, type IconName } from "./Icon";

const navigation: Array<{ to: string; label: string; icon: IconName }> = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/trials", label: "Trials", icon: "trials" },
  { to: "/patients", label: "Patients", icon: "patients" },
  { to: "/inbox", label: "Inbox", icon: "inbox" },
];

export function AppShell() {
  const location = useLocation();
  const { role, roleId, setRoleId, workItems } = useAppState();
  const { snapshot, status } = useTrialData();
  const sourceDate = snapshot ? formatSourceDate(snapshot.source.dataTimestamp) : null;
  const attentionCount = workItems.filter((item) => item.status !== "resolved" && item.roleIds.includes(roleId)).length;

  useEffect(() => {
    const navigationState = location.state as { libraryFocusId?: string } | null;
    if ((location.pathname === "/trials" && navigationState?.libraryFocusId) || location.search.includes("message=") || location.search.includes("criterion=")) return;
    const timeout = window.setTimeout(() => {
      document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.search, location.state]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className="sidebar" aria-label="Primary navigation">
        <Link className="brand" to="/" aria-label="Trial Relay home">
          <span className="brand-mark" aria-hidden="true">TR</span>
          <span><strong>Trial Relay</strong><small>OncoGrid validation</small></span>
        </Link>
        <nav className="primary-nav">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.label === "Inbox" && attentionCount > 0 ? <span className="nav-count">{attentionCount}</span> : null}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-boundary">
          <Icon name="shield" />
          <p><strong>Validation workspace</strong>Real public trial records. All patient and workflow examples are synthetic and reset on reload.</p>
        </div>
      </aside>

      <div className="workspace-shell">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark">TR</span><strong>Trial Relay</strong></div>
          <div className="source-stamp">
            <Icon name="source" />
            <span><strong>{snapshot ? `${snapshot.retainedCount} public records` : status === "error" ? "Source unavailable" : "Loading public records"}</strong><small>{sourceDate ? `Snapshot ${sourceDate}` : "ClinicalTrials.gov snapshot"}</small></span>
          </div>
          <label className="role-switcher">
            <span className="role-avatar" aria-hidden="true">{role.initials}</span>
            <span className="role-copy"><small>Prototype role</small>
              <select value={roleId} onChange={(event) => setRoleId(event.target.value as RoleId)} aria-label="Prototype role">
                {roles.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name} · {candidate.title}</option>)}
              </select>
            </span>
          </label>
        </header>
        <details className="mobile-boundary">
          <summary>Validation boundaries and source date</summary>
          <p>Trial records are real public ClinicalTrials.gov data{sourceDate ? ` dated ${sourceDate}` : ""}. Patient, role, message, task, and handoff content is synthetic. Browser-memory state resets on reload.</p>
        </details>
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
