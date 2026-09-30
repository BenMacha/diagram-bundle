import dagre from '@dagrejs/dagre';
import type { Detail, Direction, Entity, Relation } from './types';

export const HEADER_H = 46;
export const ROW_H = 24;
export const FOOT_H = 8;
const MIN_W = 190;
const MAX_W = 440;

export type RowKind = 'pk' | 'field' | 'fk' | 'collection';

export interface Row {
  key: string;
  label: string;
  type: string;
  kind: RowKind;
  nullable: boolean;
  unique: boolean;
  /** Relation id for fk / collection rows. */
  relation?: string;
}

export interface Box {
  id: string;
  entity: Entity;
  rows: Row[];
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface EdgeGeometry {
  id: string;
  relation: Relation | null;
  source: string;
  target: string;
  d: string;
  start: Point;
  end: Point;
  /** Unit vectors pointing out of the source / target box. */
  startDir: Point;
  endDir: Point;
  mid: Point;
  inheritance: boolean;
}

export type Measure = (text: string, font: 'title' | 'row' | 'type') => number;

const many = (r: Relation) => r.type === 'ManyToMany' || r.type === 'OneToMany';

export function buildRows(entity: Entity, relations: Relation[], names: Map<string, string>, detail: Detail): Row[] {
  if (detail === 'none') return [];
  const rows: Row[] = [];

  for (const f of entity.fields) {
    if (entity.kind === 'enum') {
      rows.push({ key: `v:${f.name}`, label: f.name, type: '', kind: 'field', nullable: false, unique: false });
      continue;
    }
    if (detail === 'keys' && !f.id && !f.unique) continue;
    rows.push({
      key: `f:${f.name}`,
      label: f.name,
      type: f.length ? `${f.type}(${f.length})` : f.type,
      kind: f.id ? 'pk' : 'field',
      nullable: f.nullable,
      unique: f.unique,
    });
  }

  for (const r of relations) {
    if (r.source === entity.id) {
      const target = names.get(r.target) || r.target;
      rows.push({
        key: `r:${r.id}`,
        label: r.field,
        type: many(r) ? `${target}[]` : target,
        kind: 'fk',
        nullable: r.nullable,
        unique: r.type === 'OneToOne',
        relation: r.id,
      });
    }
  }

  if (detail === 'all') {
    for (const r of relations) {
      if (r.target === entity.id && r.inverseField && r.source !== r.target) {
        const source = names.get(r.source) || r.source;
        rows.push({
          key: `i:${r.id}`,
          label: r.inverseField,
          type: r.type === 'OneToOne' ? source : `${source}[]`,
          kind: 'collection',
          nullable: true,
          unique: false,
          relation: r.id,
        });
      }
    }
  }

  return rows;
}

export function measureBox(entity: Entity, rows: Row[], measure: Measure): { width: number; height: number } {
  let width = Math.max(measure(entity.name, 'title') + 56, measure(entity.table || entity.kind, 'type') + 40);
  for (const row of rows) {
    width = Math.max(width, measure(row.label, 'row') + measure(row.type, 'type') + 70);
  }
  width = Math.min(MAX_W, Math.max(MIN_W, Math.ceil(width)));
  const height = HEADER_H + rows.length * ROW_H + (rows.length ? FOOT_H : 0);
  return { width, height };
}

/**
 * Connected entities are laid out by dagre; isolated ones are packed in a grid
 * under the graph so that a large schema stays readable.
 */
export function computeLayout(
  boxes: Omit<Box, 'x' | 'y'>[],
  relations: Relation[],
  direction: Direction,
): Map<string, Point> {
  const ids = new Set(boxes.map((b) => b.id));
  const linked = new Set<string>();
  const edges: [string, string][] = [];

  for (const r of relations) {
    if (r.source !== r.target && ids.has(r.source) && ids.has(r.target)) {
      // Referenced entities first: target → source.
      edges.push([r.target, r.source]);
      linked.add(r.source);
      linked.add(r.target);
    }
  }
  for (const b of boxes) {
    if (b.entity.parent && ids.has(b.entity.parent)) {
      edges.push([b.entity.parent, b.id]);
      linked.add(b.id);
      linked.add(b.entity.parent);
    }
  }

  const positions = new Map<string, Point>();
  let maxX = 0;
  let maxY = 0;

  if (linked.size) {
    const g = new dagre.graphlib.Graph({ multigraph: true });
    g.setGraph({ rankdir: direction, nodesep: 42, ranksep: 110, edgesep: 18, marginx: 0, marginy: 0 });
    g.setDefaultEdgeLabel(() => ({}));
    for (const b of boxes) {
      if (linked.has(b.id)) g.setNode(b.id, { width: b.width, height: b.height });
    }
    edges.forEach(([a, b], i) => g.setEdge(a, b, {}, `e${i}`));
    dagre.layout(g);
    for (const id of g.nodes()) {
      const n = g.node(id);
      const x = n.x - n.width / 2;
      const y = n.y - n.height / 2;
      positions.set(id, { x, y });
      maxX = Math.max(maxX, x + n.width);
      maxY = Math.max(maxY, y + n.height);
    }
  }

  const isolated = boxes.filter((b) => !linked.has(b.id));
  if (isolated.length) {
    const gap = 36;
    const startY = linked.size ? maxY + 120 : 0;
    const rowWidth = Math.max(maxX, 1400);
    let x = 0;
    let y = startY;
    let lineH = 0;
    for (const b of isolated) {
      if (x > 0 && x + b.width > rowWidth) {
        x = 0;
        y += lineH + gap;
        lineH = 0;
      }
      positions.set(b.id, { x, y });
      x += b.width + gap;
      lineH = Math.max(lineH, b.height);
    }
  }

  return positions;
}

function add(a: Point, b: Point, k = 1): Point {
  return { x: a.x + b.x * k, y: a.y + b.y * k };
}

function bezierPoint(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function rowY(box: Box, key: string | undefined): number | null {
  if (!key) return null;
  const index = box.rows.findIndex((r) => r.key === key);
  return index === -1 ? null : box.y + HEADER_H + index * ROW_H + ROW_H / 2;
}

/**
 * Bézier edges between box sides. Horizontal links leave from the foreign key
 * row and enter at the target header / inverse collection row; parallel links
 * between two boxes are spread along the side.
 */
export function computeEdges(boxes: Map<string, Box>, relations: Relation[]): EdgeGeometry[] {
  const result: EdgeGeometry[] = [];
  const pairCount = new Map<string, number>();
  const pairIndex = new Map<string, number>();
  const pairKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);

  const links: { id: string; relation: Relation | null; source: string; target: string; inheritance: boolean }[] = [];
  for (const r of relations) {
    if (boxes.has(r.source) && boxes.has(r.target)) links.push({ id: r.id, relation: r, source: r.source, target: r.target, inheritance: false });
  }
  boxes.forEach((b) => {
    if (b.entity.parent && boxes.has(b.entity.parent)) {
      links.push({ id: `extends:${b.id}`, relation: null, source: b.id, target: b.entity.parent, inheritance: true });
    }
  });
  for (const l of links) {
    const k = pairKey(l.source, l.target);
    pairCount.set(k, (pairCount.get(k) || 0) + 1);
  }

  for (const link of links) {
    const a = boxes.get(link.source)!;
    const b = boxes.get(link.target)!;
    const k = pairKey(link.source, link.target);
    const index = pairIndex.get(k) || 0;
    pairIndex.set(k, index + 1);
    const total = pairCount.get(k) || 1;
    const spread = (index - (total - 1) / 2) * 14;

    if (a === b) {
      const y0 = rowY(a, link.relation ? `r:${link.relation.id}` : undefined) ?? a.y + HEADER_H / 2;
      const start = { x: a.x + a.width, y: y0 };
      const end = { x: a.x + a.width, y: a.y + HEADER_H / 2 + 4 };
      const loop = 46 + index * 12;
      const c1 = { x: start.x + loop, y: start.y };
      const c2 = { x: end.x + loop, y: end.y - 10 };
      result.push({
        ...link,
        d: `M${start.x},${start.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`,
        start,
        end,
        startDir: { x: 1, y: 0 },
        endDir: { x: 1, y: 0 },
        mid: bezierPoint(start, c1, c2, end, 0.5),
      });
      continue;
    }

    let start: Point;
    let end: Point;
    let startDir: Point;
    let endDir: Point;

    const horizontal = b.x >= a.x + a.width + 24 || b.x + b.width + 24 <= a.x;
    if (horizontal) {
      const right = b.x >= a.x + a.width;
      const sy = rowY(a, link.relation ? `r:${link.relation.id}` : undefined);
      const ty = rowY(b, link.relation ? `i:${link.relation.id}` : undefined);
      start = { x: right ? a.x + a.width : a.x, y: sy ?? a.y + Math.min(a.height / 2, HEADER_H / 2 + spread + 6) };
      end = { x: right ? b.x : b.x + b.width, y: ty ?? b.y + HEADER_H / 2 + (sy === null ? spread : 0) };
      startDir = { x: right ? 1 : -1, y: 0 };
      endDir = { x: right ? -1 : 1, y: 0 };
    } else {
      const down = b.y + b.height / 2 > a.y + a.height / 2;
      const ax = a.x + a.width / 2 + spread;
      const bx = b.x + b.width / 2 + spread;
      start = { x: ax, y: down ? a.y + a.height : a.y };
      end = { x: bx, y: down ? b.y : b.y + b.height };
      startDir = { x: 0, y: down ? 1 : -1 };
      endDir = { x: 0, y: down ? -1 : 1 };
    }

    const dist = Math.hypot(end.x - start.x, end.y - start.y);
    const handle = Math.max(36, Math.min(160, dist * 0.45));
    const c1 = add(start, startDir, handle);
    const c2 = add(end, endDir, handle);

    result.push({
      ...link,
      d: `M${start.x},${start.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`,
      start,
      end,
      startDir,
      endDir,
      mid: bezierPoint(start, c1, c2, end, 0.5),
    });
  }

  return result;
}

export function bounds(boxes: Iterable<Box>): { x: number; y: number; width: number; height: number } {
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
  if (minX === Infinity) return { x: 0, y: 0, width: 0, height: 0 };
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

/** Crow's foot glyphs drawn at an edge end, `dir` points out of the box. */
export function endGlyph(p: Point, dir: Point, cardinality: 'one' | 'many', optional: boolean): string {
  const nx = -dir.y;
  const ny = dir.x;
  const at = (dist: number, side: number): Point => ({ x: p.x + dir.x * dist + nx * side, y: p.y + dir.y * dist + ny * side });
  const seg = (a: Point, b: Point) => `M${a.x},${a.y} L${b.x},${b.y}`;
  const parts: string[] = [];

  if (cardinality === 'many') {
    parts.push(seg(at(12, 0), at(0, -6)), seg(at(12, 0), at(0, 0)), seg(at(12, 0), at(0, 6)));
    parts.push(optional ? '' : seg(at(16, -6), at(16, 6)));
  } else {
    parts.push(seg(at(7, -6), at(7, 6)));
    if (!optional) parts.push(seg(at(12, -6), at(12, 6)));
  }

  return parts.filter(Boolean).join(' ');
}

export function optionalCircle(p: Point, dir: Point, cardinality: 'one' | 'many'): Point {
  const dist = cardinality === 'many' ? 20 : 17;
  return { x: p.x + dir.x * dist, y: p.y + dir.y * dist };
}
