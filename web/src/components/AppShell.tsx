import { useEffect, useRef } from "react";
import { Glass } from "@samasante/liquid-glass";
import { ThinkingOrb } from "thinking-orbs";
import type { OrbState } from "thinking-orbs";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { compactGlassOptics, panelGlassOptics } from "../design/glass";
import { formatSourceDate } from "../data/trials";
import { roles } from "../data/demo";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";
import type { RoleId } from "../types";
import { Icon } from "./Icon";
import { PilotIdentity } from "./PilotIdentity";
import { usePiAccess } from "../state/usePiAccess";
import { useWorkflow } from "../state/WorkflowState";

const navigation: Array<{ to: string; label: string; orb: OrbState }> = [
  { to: "/", label: "Home", orb: "breathing" },
  { to: "/trials", label: "Trials", orb: "searching" },
  { to: "/patients", label: "Patients", orb: "connecting" },
  { to: "/studies", label: "My studies", orb: "solving" },
  { to: "/inbox", label: "Inbox", orb: "weaving" },
];

export function AppShell() {
  const location = useLocation();
  const { role, roleId, setRoleId, workItems } = useAppState();
  const { snapshot, status } = useTrialData();
  const pi = usePiAccess();
  const { state: workflow } = useWorkflow();
  const previousPath = useRef(location.pathname);
  const visibleNavigation = navigation.filter((item) => item.to !== "/studies" || pi.canAccess());
  useEffect(() => {
    if (roleId === "site" && !pi.canAccess()) setRoleId("oncologist");
  }, [roleId, pi, setRoleId]);
  const sourceDate = snapshot ? formatSourceDate(snapshot.source.dataTimestamp) : null;
  const attentionCount = workItems.filter((item) => item.status !== "resolved" && item.roleIds.includes(roleId)).length +
    workflow.referrals.filter((referral) => (pi.canAccess(referral.trialId) && referral.state === "Awaiting team") || (roleId !== "auditor" && ["Draft", "Needs information"].includes(referral.state))).length;

  useEffect(() => {
    const pathChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    const navigationState = location.state as { libraryFocusId?: string } | null;
    if (location.search.includes("source=") || (!pathChanged && (location.search.includes("run=") || location.search.includes("matchFilter=") || location.search.includes("preview=") || (location.pathname === "/trials" && navigationState?.libraryFocusId) || location.search.includes("message=") || location.search.includes("criterion=")))) return;
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
        <Link className="brand" to="/" aria-label="Trial Loop home">
          <span className="brand-mark" aria-hidden="true">TL</span>
          <span><strong>Trial Loop</strong><small>OncoGrid validation</small></span>
        </Link>
        <Glass
          className="nav-glass"
          optics={panelGlassOptics}
          filterResolution={2}
          refract={<div className="glass-refract-field glass-refract-field-nav" aria-hidden="true" />}
          behind="#dfe9e5"
        >
          <nav className={`primary-nav${pi.canAccess() ? " has-pi" : ""}`}>
            {visibleNavigation.map((item) => (
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
          <div className="mobile-brand"><span className="brand-mark">TL</span><strong>Trial Loop</strong></div>
          <Glass
            className="source-glass"
            optics={compactGlassOptics}
            filterResolution={2}
            refract={<div className="glass-refract-field glass-refract-field-source" aria-hidden="true" />}
            behind="#e8efec"
          >
            <div className="source-stamp">
              <Icon name="source" />
              <span><strong>{snapshot ? `${snapshot.retainedCount} public records` : status === "error" ? "Source unavailable" : "Loading public records"}</strong><small>{sourceDate ? `Snapshot ${sourceDate}` : "ClinicalTrials.gov snapshot"}</small></span>
            </div>
          </Glass>
          <PilotIdentity />
          <label className="role-switcher">
            <span className="role-avatar" aria-hidden="true">{role.initials}</span>
            <span className="role-copy"><small>Prototype role</small>
              <select value={roleId} onChange={(event) => setRoleId(event.target.value as RoleId)} aria-label="Prototype role">
                {roles.filter((candidate) => candidate.id !== "site" || pi.canAccess()).map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name} · {candidate.title}</option>)}
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
