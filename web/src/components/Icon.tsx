import type { SVGProps } from "react";

export type IconName =
  | "home"
  | "trials"
  | "patients"
  | "inbox"
  | "search"
  | "arrow"
  | "source"
  | "shield"
  | "clock"
  | "message"
  | "task"
  | "update"
  | "handoff"
  | "filter"
  | "close"
  | "external"
  | "check"
  | "warning"
  | "plus";

const paths: Record<IconName, React.ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
  trials: <><circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5 5-2Z"/></>,
  patients: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  inbox: <><path d="M4 5h16v14H4z"/><path d="m4 13 5 1 2 3h2l2-3 5-1"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  source: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  message: <><path d="M4 4h16v12H8l-4 4Z"/><path d="M8 8h8M8 12h5"/></>,
  task: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 12 2 2 5-5M8 17h8"/></>,
  update: <><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></>,
  handoff: <><path d="M3 8h11M10 4l4 4-4 4M21 16H10M14 12l-4 4 4 4"/></>,
  filter: <><path d="M4 5h16M7 12h10M10 19h4"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v7H4V6h7"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  warning: <><path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v5M12 18h.01"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" {...props}>
      {paths[name]}
    </svg>
  );
}
