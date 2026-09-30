import { memo, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { endGlyph, FOOT_H, HEADER_H, optionalCircle, ROW_H } from '../layout';
import type { Box, EdgeGeometry, Point } from '../layout';
import { liveTokens, svgCss } from '../svgStyle';
import type { Relation } from '../types';

export interface Viewport {
  x: number;
  y: number;
  k: number;
}

export const MIN_ZOOM = 0.08;
export const MAX_ZOOM = 2.5;

export function clampZoom(k: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, k));
}

type Cardinality = 'one' | 'many';

export function cardinality(r: Relation): { start: Cardinality; startOptional: boolean; end: Cardinality; endOptional: boolean } {
  switch (r.type) {
    case 'ManyToOne':
      return { start: 'many', startOptional: true, end: 'one', endOptional: r.nullable };
    case 'OneToOne':
      return { start: 'one', startOptional: true, end: 'one', endOptional: r.nullable };
    case 'OneToMany':
      return { start: 'one', startOptional: true, end: 'many', endOptional: true };
    default:
      return { start: 'many', startOptional: true, end: 'many', endOptional: true };
  }
}

const RowIcon = ({ kind }: { kind: string }) => {
  if (kind === 'pk') {
    return (
      <g className="bmd-row-icon is-pk" transform="translate(12 6)">
        <circle cx="3.5" cy="6" r="2.8" />
        <path d="M6.3 6H12M10.2 6v2.4M12 6v2" />
      </g>
    );
  }
  if (kind === 'fk') {
    return (
      <g className="bmd-row-icon is-ref" transform="translate(12 6)">
        <path d="M1 6h9M7 3l3 3-3 3" />
      </g>
    );
  }
  if (kind === 'collection') {
    return (
      <g className="bmd-row-icon is-ref" transform="translate(12 6)">
        <path d="M1 3h3M1 6h3M1 9h3M6 3h5M6 6h5M6 9h5" />
      </g>
    );
  }
  return (
    <g className="bmd-row-icon" transform="translate(12 6)">
      <circle cx="5" cy="6" r="1.6" />
    </g>
  );
};

interface NodeProps {
  box: Box;
  color: string;
  selected: boolean;
  dim: boolean;
  kindLabel: string | null;
}

const Node = memo(function Node({ box, color, selected, dim, kindLabel }: NodeProps) {
  const { entity, rows, width, height } = box;
  const r = 10;
  const headPath = `M0,${r} a${r},${r} 0 0 1 ${r},-${r} h${width - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${HEADER_H - r} h-${width} z`;

  return (
    <g className={`bmd-node${selected ? ' is-selected' : ''}${dim ? ' is-dim' : ''}`} transform={`translate(${box.x} ${box.y})`} data-node={box.id}>
      <rect className="bmd-node-shadow" x={1} y={3} width={width} height={height} rx={r} />
      <rect className="bmd-node-bg" width={width} height={height} rx={r} />
      <path className="bmd-node-head" d={headPath} />
      <rect className="bmd-node-strip" x={0} y={0} width={width} height={3} rx={1.5} fill={color} />
      <text className="bmd-node-title" x={14} y={22}>
        {entity.name}
      </text>
      <text className="bmd-node-sub" x={14} y={37}>
        {entity.table || entity.namespace || ' '}
      </text>
      {kindLabel ? (
        <text className="bmd-node-kind" x={width - 12} y={22} textAnchor="end">
          {kindLabel}
        </text>
      ) : null}
      {rows.length ? <line className="bmd-node-sep" x1={0} x2={width} y1={HEADER_H} y2={HEADER_H} /> : null}
      {rows.map((row, i) => (
        <g key={row.key} transform={`translate(0 ${HEADER_H + i * ROW_H})`}>
          <RowIcon kind={row.kind} />
          <text className={`bmd-row-name${row.kind === 'pk' ? ' is-pk' : ''}${row.nullable && row.kind === 'field' ? ' is-nullable' : ''}`} x={32} y={16}>
            {row.label}
            {row.nullable && row.kind === 'field' ? '?' : ''}
          </text>
          <text className={`bmd-row-type${row.kind === 'fk' || row.kind === 'collection' ? ' is-ref' : ''}`} x={width - 12} y={16} textAnchor="end">
            {row.type}
          </text>
        </g>
      ))}
      {rows.length ? <rect width={width} height={FOOT_H} y={height - FOOT_H} fill="transparent" /> : null}
    </g>
  );
});

interface LinkProps {
  edge: EdgeGeometry;
  active: boolean;
  dim: boolean;
}

const Link = memo(function Link({ edge, active, dim }: LinkProps) {
  const className = `bmd-link${active ? ' is-active' : ''}${dim ? ' is-dim' : ''}`;

  if (edge.inheritance) {
    const p = edge.end;
    const d = edge.endDir;
    const nx = -d.y;
    const ny = d.x;
    const tip = p;
    const a: Point = { x: p.x + d.x * 12 + nx * 7, y: p.y + d.y * 12 + ny * 7 };
    const b: Point = { x: p.x + d.x * 12 - nx * 7, y: p.y + d.y * 12 - ny * 7 };
    return (
      <g className={className}>
        <path className="bmd-edge is-inheritance" d={edge.d} />
        <path className="bmd-edge-arrow" d={`M${tip.x},${tip.y} L${a.x},${a.y} L${b.x},${b.y} Z`} />
      </g>
    );
  }

  const c = cardinality(edge.relation!);
  const startCircle = c.startOptional ? optionalCircle(edge.start, edge.startDir, c.start) : null;
  const endCircle = c.endOptional ? optionalCircle(edge.end, edge.endDir, c.end) : null;
  const label = edge.relation!.field + (edge.relation!.inverseField ? ` ⇄ ${edge.relation!.inverseField}` : '');
  const labelWidth = label.length * 6.4 + 16;

  return (
    <g className={className} data-edge={edge.id}>
      <path className="bmd-hit" d={edge.d} />
      <path className="bmd-edge" d={edge.d} />
      <path className="bmd-edge-glyph" d={endGlyph(edge.start, edge.startDir, c.start, c.startOptional)} />
      <path className="bmd-edge-glyph" d={endGlyph(edge.end, edge.endDir, c.end, c.endOptional)} />
      {startCircle ? <circle className="bmd-edge-circle" cx={startCircle.x} cy={startCircle.y} r={3.6} /> : null}
      {endCircle ? <circle className="bmd-edge-circle" cx={endCircle.x} cy={endCircle.y} r={3.6} /> : null}
      {active ? (
        <g transform={`translate(${edge.mid.x} ${edge.mid.y})`}>
          <rect className="bmd-edge-label-bg" x={-labelWidth / 2} y={-11} width={labelWidth} height={22} rx={11} />
          <text className="bmd-edge-label" textAnchor="middle" y={4}>
            {label}
          </text>
        </g>
      ) : null}
    </g>
  );
});

export interface CanvasProps {
  boxes: Box[];
  edges: EdgeGeometry[];
  viewport: Viewport;
  onViewport: (v: Viewport) => void;
  selectedId: string | null;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
  onMove: (id: string, x: number, y: number) => void;
  onMoveEnd: () => void;
  colors: Map<string, string>;
  kindLabels: Record<string, string>;
  svgRef: MutableRefObject<SVGSVGElement | null>;
  stageRef: MutableRefObject<HTMLDivElement | null>;
  hint: string;
  children?: React.ReactNode;
}

type Gesture =
  | { type: 'pan'; pointer: number; sx: number; sy: number; vx: number; vy: number; moved: boolean }
  | { type: 'drag'; pointer: number; id: string; sx: number; sy: number; bx: number; by: number; moved: boolean };

export function Canvas(props: CanvasProps) {
  const { boxes, edges, viewport, onViewport, selectedId, hoveredId, onHover, onSelect, onMove, onMoveEnd, colors, kindLabels, svgRef, stageRef, hint } = props;
  const gesture = useRef<Gesture | null>(null);
  const [panning, setPanning] = useState(false);
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;

  const focusId = hoveredId || selectedId;
  const neighbours = useMemo(() => {
    if (!focusId) return null;
    const set = new Set<string>([focusId]);
    for (const e of edges) {
      if (e.source === focusId) set.add(e.target);
      if (e.target === focusId) set.add(e.source);
    }
    return set;
  }, [focusId, edges]);

  const boxById = useMemo(() => new Map(boxes.map((b) => [b.id, b])), [boxes]);

  // Wheel zoom (non-passive listener to prevent page scroll).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const v = viewportRef.current;
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0016));
      const k = clampZoom(v.k * factor);
      const wx = (sx - v.x) / v.k;
      const wy = (sy - v.y) / v.k;
      onViewport({ k, x: sx - wx * k, y: sy - wy * k });
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [stageRef, onViewport]);

  const nodeFromEvent = (target: EventTarget | null): string | null => {
    let el = target as Element | null;
    while (el && el !== stageRef.current) {
      const id = el.getAttribute && el.getAttribute('data-node');
      if (id) return id;
      el = el.parentNode as Element | null;
    }
    return null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const id = nodeFromEvent(e.target);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    if (id) {
      const box = boxById.get(id);
      if (!box) return;
      gesture.current = { type: 'drag', pointer: e.pointerId, id, sx: e.clientX, sy: e.clientY, bx: box.x, by: box.y, moved: false };
    } else {
      gesture.current = { type: 'pan', pointer: e.pointerId, sx: e.clientX, sy: e.clientY, vx: viewport.x, vy: viewport.y, moved: false };
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g) {
      const id = nodeFromEvent(e.target);
      if (id !== hoveredId) onHover(id);
      return;
    }
    const dx = e.clientX - g.sx;
    const dy = e.clientY - g.sy;
    if (!g.moved && Math.hypot(dx, dy) < 4) return;
    g.moved = true;
    if (g.type === 'pan') {
      setPanning(true);
      onViewport({ ...viewport, x: g.vx + dx, y: g.vy + dy });
    } else {
      onMove(g.id, g.bx + dx / viewport.k, g.by + dy / viewport.k);
    }
  };

  const onPointerUp = () => {
    const g = gesture.current;
    gesture.current = null;
    setPanning(false);
    if (!g) return;
    if (g.type === 'drag') {
      if (g.moved) onMoveEnd();
      else onSelect(g.id);
    } else if (!g.moved) {
      onSelect(null);
    }
  };

  const gridSize = 22 * viewport.k;

  return (
    <div
      ref={stageRef}
      className={`bmd-stage${panning ? ' is-panning' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => !gesture.current && onHover(null)}
    >
      <svg ref={svgRef} className="bmd-svg" xmlns="http://www.w3.org/2000/svg">
        <style>{svgCss(liveTokens)}</style>
        <defs>
          <pattern id="bmd-grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse" x={viewport.x % gridSize} y={viewport.y % gridSize}>
            <circle cx={1} cy={1} r={Math.max(0.6, Math.min(1.2, viewport.k))} fill="var(--_grid)" />
          </pattern>
        </defs>
        <rect className="bmd-grid-bg" width="100%" height="100%" fill={viewport.k > 0.25 ? 'url(#bmd-grid)' : 'none'} />
        <g className="bmd-viewport" transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.k})`}>
          <g className="bmd-links">
            {edges.map((edge) => {
              const active = !!focusId && (edge.source === focusId || edge.target === focusId);
              return <Link key={edge.id} edge={edge} active={active} dim={!!neighbours && !active} />;
            })}
          </g>
          <g className="bmd-nodes">
            {boxes.map((box) => (
              <Node
                key={box.id}
                box={box}
                color={colors.get(box.entity.namespace) || 'var(--_accent)'}
                selected={box.id === selectedId}
                dim={!!neighbours && !neighbours.has(box.id)}
                kindLabel={kindLabels[box.entity.kind] || null}
              />
            ))}
          </g>
        </g>
      </svg>
      <div className="bmd-hint bmd-hide-sm">{hint}</div>
      {props.children}
    </div>
  );
}

interface MinimapProps {
  boxes: Box[];
  viewport: Viewport;
  stageSize: { width: number; height: number };
  colors: Map<string, string>;
  onCenter: (p: Point) => void;
}

export function Minimap({ boxes, viewport, stageSize, colors, onCenter }: MinimapProps) {
  const W = 190;
  const H = 128;
  const pad = 8;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const b of boxes) {
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.width);
    maxY = Math.max(maxY, b.y + b.height);
  }
  if (!boxes.length) return null;
  const scale = Math.min((W - pad * 2) / Math.max(1, maxX - minX), (H - pad * 2) / Math.max(1, maxY - minY));
  const ox = pad - minX * scale + (W - pad * 2 - (maxX - minX) * scale) / 2;
  const oy = pad - minY * scale + (H - pad * 2 - (maxY - minY) * scale) / 2;

  const view = {
    x: (-viewport.x / viewport.k) * scale + ox,
    y: (-viewport.y / viewport.k) * scale + oy,
    w: (stageSize.width / viewport.k) * scale,
    h: (stageSize.height / viewport.k) * scale,
  };

  const centerAt = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * W;
    const my = ((e.clientY - rect.top) / rect.height) * H;
    onCenter({ x: (mx - ox) / scale, y: (my - oy) / scale });
  };

  return (
    <div
      className="bmd-minimap"
      onPointerDown={(e) => {
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        centerAt(e);
      }}
      onPointerMove={(e) => {
        e.stopPropagation();
        if (e.buttons === 1) centerAt(e);
      }}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {boxes.map((b) => (
          <rect
            key={b.id}
            x={b.x * scale + ox}
            y={b.y * scale + oy}
            width={Math.max(1.5, b.width * scale)}
            height={Math.max(1.5, b.height * scale)}
            rx={1.5}
            fill={colors.get(b.entity.namespace) || 'var(--_accent)'}
            opacity={0.55}
          />
        ))}
        <rect x={view.x} y={view.y} width={view.w} height={view.h} fill="var(--_accent-soft)" stroke="var(--_accent)" strokeWidth={1.2} rx={2} />
      </svg>
    </div>
  );
}
