import type { GlassOptics } from "@samasante/liquid-glass";

export const panelGlassOptics: Partial<GlassOptics> = {
  strength: 0.28,
  depth: 0.95,
  curvature: 0.5,
  dispersion: 0.11,
  bend: 0.72,
  bendWidth: 0.13,
  frost: 7,
  saturate: 1.26,
  brightness: 0.055,
  specular: 1.24,
  sheen: 0.8,
  sheenWidth: 13,
  sheenFalloff: 1.62,
  sheenAngle: -34,
  sheenDark: false,
  glow: 0.58,
  glowSpread: 0.28,
  glowFalloff: 1.74,
  splay: 0.14,
  clipToShape: true,
  softEdge: true,
  restEdgeShadow: "0 12px 30px rgba(24, 38, 48, 0.18)",
  restEdgeInsetShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
};

export const compactGlassOptics: Partial<GlassOptics> = {
  ...panelGlassOptics,
  strength: 0.2,
  depth: 0.88,
  curvature: 0.4,
  dispersion: 0.07,
  bend: 0.6,
  frost: 5,
  specular: 1.14,
  sheen: 0.68,
  sheenWidth: 9,
  glow: 0.44,
  splay: 0.08,
  restEdgeShadow: "0 8px 22px rgba(24, 38, 48, 0.16)",
};

