/**
 * Stylesheet of the diagram SVG. Rendered with CSS variables on screen and with
 * resolved colours for exported SVG / PNG files (which have no stylesheet).
 */
export interface SvgTokens {
  font: string;
  mono: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  edge: string;
  grid: string;
  canvas: string;
}

export const liveTokens: SvgTokens = {
  font: 'var(--_font)',
  mono: 'var(--_mono)',
  surface: 'var(--_surface)',
  surface2: 'var(--_surface-2)',
  border: 'var(--_border)',
  text: 'var(--_text)',
  muted: 'var(--_muted)',
  accent: 'var(--_accent)',
  edge: 'var(--_edge)',
  grid: 'var(--_grid)',
  canvas: 'var(--_canvas)',
};

export function resolveTokens(el: Element): SvgTokens {
  const cs = getComputedStyle(el);
  const read = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  return {
    font: read('--_font', 'Arial, sans-serif'),
    mono: read('--_mono', 'monospace'),
    surface: read('--_surface', '#fff'),
    surface2: read('--_surface-2', '#f1f3f6'),
    border: read('--_border', '#e3e6eb'),
    text: read('--_text', '#161a22'),
    muted: read('--_muted', '#687083'),
    accent: read('--_accent', '#4f5bd5'),
    edge: read('--_edge', '#9aa3b5'),
    grid: read('--_grid', '#d7dbe2'),
    canvas: read('--_canvas', '#f3f4f7'),
  };
}

export function svgCss(t: SvgTokens): string {
  return `
.bmd-node { cursor: pointer; }
.bmd-node-bg { fill: ${t.surface}; stroke: ${t.border}; stroke-width: 1; }
.bmd-node-shadow { fill: #000; opacity: .05; }
.bmd-node-head { fill: ${t.surface2}; }
.bmd-node-strip { stroke: none; }
.bmd-node-title { font: 650 13.5px ${t.font}; fill: ${t.text}; }
.bmd-node-sub { font: 400 11px ${t.mono}; fill: ${t.muted}; }
.bmd-node-kind { font: 600 9.5px ${t.font}; fill: ${t.muted}; letter-spacing: .06em; text-transform: uppercase; }
.bmd-node-sep { stroke: ${t.border}; stroke-width: 1; }
.bmd-row-name { font: 400 12px ${t.font}; fill: ${t.text}; }
.bmd-row-name.is-pk { font-weight: 650; }
.bmd-row-name.is-nullable { fill: ${t.muted}; }
.bmd-row-type { font: 400 11px ${t.mono}; fill: ${t.muted}; }
.bmd-row-type.is-ref { fill: ${t.accent}; }
.bmd-row-hover { fill: transparent; }
.bmd-row-icon { fill: none; stroke: ${t.muted}; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.bmd-row-icon.is-pk { stroke: #d39b1a; }
.bmd-row-icon.is-ref { stroke: ${t.accent}; }
.bmd-node.is-selected .bmd-node-bg { stroke: ${t.accent}; stroke-width: 2; }
.bmd-node.is-dim { opacity: .28; }
.bmd-node:hover .bmd-node-bg { stroke: ${t.accent}; }
.bmd-edge { fill: none; stroke: ${t.edge}; stroke-width: 1.4; }
.bmd-edge-glyph { fill: none; stroke: ${t.edge}; stroke-width: 1.4; stroke-linecap: round; }
.bmd-edge-circle { fill: ${t.canvas}; stroke: ${t.edge}; stroke-width: 1.4; }
.bmd-edge.is-inheritance { stroke-dasharray: 5 4; }
.bmd-edge-arrow { fill: ${t.canvas}; stroke: ${t.edge}; stroke-width: 1.4; stroke-linejoin: round; }
.bmd-link.is-active .bmd-edge, .bmd-link.is-active .bmd-edge-glyph { stroke: ${t.accent}; stroke-width: 2; }
.bmd-link.is-active .bmd-edge-circle, .bmd-link.is-active .bmd-edge-arrow { stroke: ${t.accent}; }
.bmd-link.is-dim { opacity: .15; }
.bmd-edge-label { font: 500 11px ${t.font}; fill: ${t.text}; }
.bmd-edge-label-bg { fill: ${t.surface}; stroke: ${t.border}; }
.bmd-hit { fill: none; stroke: transparent; stroke-width: 12; cursor: pointer; }
`;
}

/** Stable colour per namespace, used to tell domains apart. */
export function namespaceColor(namespace: string): string {
  let hash = 0;
  for (let i = 0; i < namespace.length; i++) hash = (hash * 31 + namespace.charCodeAt(i)) | 0;
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 62% 52%)`;
}
