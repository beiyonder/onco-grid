import { useEffect } from "react";
import { Glass } from "@samasante/liquid-glass";
import { ThinkingOrb } from "thinking-orbs";
import type { OrbState } from "thinking-orbs";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { formatSourceDate } from "../data/trials";
import { roles } from "../data/demo";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";
import type { RoleId } from "../types";
import { ExperienceSound } from "./ExperienceSound";
import { Icon } from "./Icon";
import { PilotIdentity } from "./PilotIdentity";

const navigation: Array<{ to: string; label: string; orb: OrbState }> = [
  { to: "/", label: "Home", orb: "breathing" },
  { to: "/trials", label: "Trials", orb: "searching" },
  { to: "/patients", label: "Patients", orb: "connecting" },
  { to: "/inbox", label: "Inbox", orb: "weaving" },
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
        <Glass className="nav-glass" optics={{ strength: 0.22, depth: 0.82, curvature: 0.3, dispersion: 0.08, frost: 7, glow: 0.34 }}>
          <nav className="primary-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                {({ isActive }) => <>
                  <span className="nav-orb" aria-hidden="true"><ThinkingOrb state={item.orb} size={20} theme="light" paused={!isActive} /></span>
                  <span>{item.label}</span>
                  {item.label === "Inbox" && attentionCount > 0 ? <span className="nav-count">{attentionCount}</span> : null}
                </>}
              </NavLink>
            ))}
          </nav>
        </Glass>
        <div className="sidebar-boundary">
          <Icon name="shield" />
          <p><strong>Validation workspace</strong>Public trial data, browser-only synthetic/approved research facts, and optional authenticated no-PHI pilot services.</p>
        </div>
      </aside>

      <div className="workspace-shell">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark">TR</span><strong>Trial Relay</strong></div>
          <Glass className="source-glass" optics={{ strength: 0.18, depth: 0.74, curvature: 0.22, dispersion: 0.06, frost: 6 }}>
            <div className="source-stamp">
              <Icon name="source" />
              <span><strong>{snapshot ? `${snapshot.retainedCount} public records` : status === "error" ? "Source unavailable" : "Loading public records"}</strong><small>{sourceDate ? `Snapshot ${sourceDate}` : "ClinicalTrials.gov snapshot"}</small></span>
            </div>
          </Glass>
          <ExperienceSound />
          <PilotIdentity />
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
          <p>Trial records are public ClinicalTrials.gov data{sourceDate ? ` dated ${sourceDate}` : ""}. Patient facts stay synthetic or approved de-identified and browser-only. Authenticated pilot communication carries no PHI.</p>
        </details>
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
