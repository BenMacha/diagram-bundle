import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { fetchSchema } from '../api';
import { download, exportPng, exportSvg } from '../export';
import { messages } from '../i18n';
import { toJdl } from '../jdl';
import { bounds, buildRows, computeEdges, computeLayout, measureBox } from '../layout';
import type { Box, Measure, Point } from '../layout';
import { createMeasure } from '../measure';
import { ensureStyles } from '../styles';
import { namespaceColor } from '../svgStyle';
import type { Detail, DiagramOptions, Direction, Entity, ManagerInfo, Schema } from '../types';
import { Canvas, clampZoom, Minimap } from './Canvas';
import type { Viewport } from './Canvas';
import { IconCode, IconDatabase, IconDiagram, IconDownload, IconFit, IconLayout, IconMinus, IconMoon, IconPlus, IconSidebar, IconSun } from './icons';
import { Inspector } from './Inspector';
import { JdlPanel } from './JdlPanel';
import { Sidebar } from './Sidebar';

interface Prefs {
  hidden: string[];
  positions: Record<string, Point>;
  direction: Direction;
  detail: Detail;
}

const DEFAULT_PREFS: Prefs = { hidden: [], positions: {}, direction: 'TB', detail: 'all' };

function readPrefs(key: string | null, entityCount: number): Prefs {
  // Large schemas start with keys only, so the whole graph stays readable.
  const defaults: Prefs = { ...DEFAULT_PREFS, detail: entityCount > 40 ? 'keys' : 'all' };
  if (!key) return defaults;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

function writePrefs(key: string | null, prefs: Prefs): void {
  if (!key) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(prefs));
  } catch {
    /* storage unavailable */
  }
}

function useSystemDark(): boolean {
  const query = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const [dark, setDark] = useState(query ? query.matches : false);
  useEffect(() => {
    if (!query) return undefined;
    const listener = (e: MediaQueryListEvent) => setDark(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, [query]);
  return dark;
}

function managerLabel(m: ManagerInfo): string {
  const db = [m.database, m.driver ? `(${m.driver})` : null].filter(Boolean).join(' ');
  return db ? `${m.name} — ${db}` : m.name;
}

export function DiagramStudio(props: DiagramOptions) {
  const t = useMemo(() => messages(props.locale), [props.locale]);
  const optionsRef = useRef(props);
  optionsRef.current = props;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ----------------------------------------------------------- theme / styles
  const systemDark = useSystemDark();
  const [themeOverride, setThemeOverride] = useState<'light' | 'dark' | null>(null);
  const theme = themeOverride || (props.theme === 'light' || props.theme === 'dark' ? props.theme : systemDark ? 'dark' : 'light');

  const [measure, setMeasure] = useState<Measure | null>(null);
  useLayoutEffect(() => {
    if (props.injectStyles !== false) ensureStyles(rootRef.current);
    const cs = rootRef.current ? getComputedStyle(rootRef.current) : null;
    const font = (cs && cs.fontFamily) || 'sans-serif';
    const mono = (cs && cs.getPropertyValue('--_mono').trim()) || 'monospace';
    setMeasure(() => createMeasure(font, mono));
  }, [props.injectStyles]);

  // ------------------------------------------------------------------ data
  const [manager, setManager] = useState<string | undefined>(props.manager);
  const [dbSchema, setDbSchema] = useState<Schema | null>(props.schema || null);
  const [jdlSchema, setJdlSchema] = useState<Schema | null>(null);
  const [loading, setLoading] = useState(!props.schema);
  const [error, setError] = useState<string | null>(null);
  const schema = jdlSchema || dbSchema;

  const load = useCallback(async (name?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSchema(optionsRef.current, name);
      setDbSchema(data);
      setJdlSchema(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (props.schema) {
      setDbSchema(props.schema);
      setLoading(false);
      return;
    }
    load(manager);
  }, [props.schema, props.apiUrl, manager, load]);

  useEffect(() => {
    if (props.manager !== undefined) setManager(props.manager);
  }, [props.manager]);

  // ----------------------------------------------------------------- prefs
  const storageKey = useMemo(() => {
    if (props.storageKey === false || !schema) return null;
    const base = props.storageKey || `doctrine-diagram:${props.apiUrl || 'static'}`;
    return `${base}:${jdlSchema ? 'jdl' : schema.manager}`;
  }, [props.storageKey, props.apiUrl, schema, jdlSchema]);

  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const entityCount = schema ? schema.entities.length : 0;
  useEffect(() => setPrefs(readPrefs(storageKey, entityCount)), [storageKey, entityCount]);
  const updatePrefs = useCallback(
    (patch: Partial<Prefs>) => {
      setPrefs((prev) => {
        const next = { ...prev, ...patch };
        writePrefs(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  // ------------------------------------------------------------- UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [jdlOpen, setJdlOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, k: 1 });
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [dragging, setDragging] = useState<Record<string, Point>>({});

  useEffect(() => {
    setSelectedId(null);
    setFocusId(null);
  }, [schema]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) => setStageSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    ro.observe(stage);
    return () => ro.disconnect();
  }, [schema, loading]);

  // --------------------------------------------------------------- derived
  const entities = schema ? schema.entities : [];
  const relations = schema ? schema.relations : [];
  const hidden = useMemo(() => new Set(prefs.hidden), [prefs.hidden]);

  const names = useMemo(() => {
    const counts = new Map<string, number>();
    entities.forEach((e) => counts.set(e.name, (counts.get(e.name) || 0) + 1));
    return new Map(entities.map((e) => [e.id, counts.get(e.name) === 1 ? e.name : e.id]));
  }, [entities]);

  const colors = useMemo(() => {
    const map = new Map<string, string>();
    entities.forEach((e) => {
      if (!map.has(e.namespace)) map.set(e.namespace, namespaceColor(e.namespace));
    });
    return map;
  }, [entities]);

  const visibleEntities = useMemo(() => {
    let list = entities.filter((e) => !hidden.has(e.id));
    if (focusId) {
      const keep = new Set([focusId]);
      relations.forEach((r) => {
        if (r.source === focusId) keep.add(r.target);
        if (r.target === focusId) keep.add(r.source);
      });
      const focused = entities.find((e) => e.id === focusId);
      if (focused && focused.parent) keep.add(focused.parent);
      list = entities.filter((e) => keep.has(e.id));
    }
    return list;
  }, [entities, relations, hidden, focusId]);

  const visibleRelations = useMemo(() => {
    const ids = new Set(visibleEntities.map((e) => e.id));
    return relations.filter((r) => ids.has(r.source) && ids.has(r.target));
  }, [visibleEntities, relations]);

  const sized = useMemo(() => {
    if (!measure) return [];
    return visibleEntities.map((entity) => {
      const rows = buildRows(entity, visibleRelations, names, prefs.detail);
      const { width, height } = measureBox(entity, rows, measure);
      return { id: entity.id, entity, rows, width, height };
    });
  }, [visibleEntities, visibleRelations, names, prefs.detail, measure]);

  const auto = useMemo(() => computeLayout(sized, visibleRelations, prefs.direction), [sized, visibleRelations, prefs.direction]);

  const boxes: Box[] = useMemo(
    () =>
      sized.map((b) => {
        const p = dragging[b.id] || (!focusId && prefs.positions[b.id]) || auto.get(b.id) || { x: 0, y: 0 };
        return { ...b, x: p.x, y: p.y };
      }),
    [sized, auto, prefs.positions, dragging, focusId],
  );

  const boxMap = useMemo(() => new Map(boxes.map((b) => [b.id, b])), [boxes]);
  const edges = useMemo(() => computeEdges(boxMap, visibleRelations), [boxMap, visibleRelations]);

  // -------------------------------------------------------------- viewport
  const fit = useCallback(
    (list: Box[] = boxes) => {
      const stage = stageRef.current;
      if (!stage || !list.length) return;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const b = bounds(list);
      const k = clampZoom(Math.min((w - 80) / Math.max(1, b.width), (h - 80) / Math.max(1, b.height), 1.1));
      setViewport({ k, x: (w - b.width * k) / 2 - b.x * k, y: (h - b.height * k) / 2 - b.y * k });
    },
    [boxes],
  );

  const fitKey = `${schema ? schema.manager : ''}|${jdlSchema ? 'jdl' : 'db'}|${prefs.direction}|${prefs.detail}|${focusId || ''}|${boxes.length > 0}`;
  const lastFit = useRef('');
  useLayoutEffect(() => {
    if (!boxes.length || lastFit.current === fitKey) return;
    lastFit.current = fitKey;
    fit(boxes);
  }, [fitKey, boxes, fit]);

  const zoomBy = (factor: number) => {
    const stage = stageRef.current;
    const w = stage ? stage.clientWidth : 800;
    const h = stage ? stage.clientHeight : 600;
    setViewport((v) => {
      const k = clampZoom(v.k * factor);
      const wx = (w / 2 - v.x) / v.k;
      const wy = (h / 2 - v.y) / v.k;
      return { k, x: w / 2 - wx * k, y: h / 2 - wy * k };
    });
  };

  const centerOn = (p: Point, k?: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    setViewport((v) => {
      const zoom = k || v.k;
      return { k: zoom, x: stage.clientWidth / 2 - p.x * zoom, y: stage.clientHeight / 2 - p.y * zoom };
    });
  };

  const select = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      if (optionsRef.current.onEntitySelect) {
        const entity = id ? entities.find((e) => e.id === id) || null : null;
        optionsRef.current.onEntitySelect(entity);
      }
    },
    [entities],
  );

  const reveal = (id: string) => {
    if (hidden.has(id)) updatePrefs({ hidden: prefs.hidden.filter((h) => h !== id) });
    select(id);
    const box = boxMap.get(id);
    if (box) centerOn({ x: box.x + box.width / 2, y: box.y + box.height / 2 }, Math.max(viewport.k, 0.8));
  };

  // Recentre once a revealed (previously hidden) entity has been laid out.
  useEffect(() => {
    if (!selectedId) return;
    const box = boxMap.get(selectedId);
    const stage = stageRef.current;
    if (!box || !stage) return;
    const sx = box.x * viewport.k + viewport.x;
    const sy = box.y * viewport.k + viewport.y;
    if (sx > stage.clientWidth || sy > stage.clientHeight || sx + box.width * viewport.k < 0 || sy + box.height * viewport.k < 0) {
      centerOn({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, boxMap]);

  // ----------------------------------------------------------------- actions
  const changeManager = (name: string) => {
    setManager(name);
    if (optionsRef.current.onManagerChange) optionsRef.current.onManagerChange(name);
  };

  const fileBase = schema ? (jdlSchema ? 'diagram' : schema.manager) : 'diagram';

  const doExport = async (kind: 'svg' | 'png' | 'jdl' | 'json') => {
    setExportOpen(false);
    if (!schema) return;
    try {
      if (kind === 'json') download(JSON.stringify(schema, null, 2), `${fileBase}.json`, 'application/json');
      if (kind === 'jdl') download(toJdl(schema), `${fileBase}.jdl`);
      if (kind === 'svg' && svgRef.current && rootRef.current) exportSvg(svgRef.current, boxes, rootRef.current, `${fileBase}.svg`);
      if (kind === 'png' && svgRef.current && rootRef.current) await exportPng(svgRef.current, boxes, rootRef.current, `${fileBase}.png`);
    } catch (e) {
      setToast(e instanceof Error ? e.message : String(e));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      if (e.key === 'Escape') (e.target as HTMLElement).blur();
      return;
    }
    if (e.key === '/') {
      e.preventDefault();
      setSidebarOpen(true);
      setTimeout(() => searchRef.current && searchRef.current.focus(), 0);
    } else if (e.key === 'f') fit();
    else if (e.key === '+' || e.key === '=') zoomBy(1.2);
    else if (e.key === '-') zoomBy(1 / 1.2);
    else if (e.key === 'Escape') {
      setExportOpen(false);
      select(null);
    }
  };

  const selected = selectedId ? entities.find((e) => e.id === selectedId) || null : null;
  const managers = dbSchema ? dbSchema.managers : [];
  const currentManager = managers.find((m) => m.name === (dbSchema && dbSchema.manager));
  const title = props.title || (schema && schema.title) || 'Doctrine Diagram';

  const subtitle = schema
    ? jdlSchema
      ? `${t.jdlSource} · ${entities.length} ${t.entities.toLowerCase()}`
      : `${entities.length} ${t.entities.toLowerCase()} · ${relations.length} ${t.relations.toLowerCase()}`
    : '';

  const kindLabels: Record<string, string> = { mapped_superclass: 'mapped', embeddable: 'embeddable', enum: 'enum' };

  return (
    <div
      ref={rootRef}
      className={`bmd${props.className ? ` ${props.className}` : ''}`}
      data-theme={theme}
      style={{ height: props.height === undefined ? '100%' : props.height }}
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <header className="bmd-toolbar">
        <button type="button" className="bmd-btn bmd-btn--icon" aria-pressed={sidebarOpen} onClick={() => setSidebarOpen((v) => !v)} title={t.toggleSidebar} aria-label={t.toggleSidebar}>
          <IconSidebar />
        </button>
        <div className="bmd-brand">
          <span className="bmd-logo">
            <IconDiagram className="bmd-icon" />
          </span>
          <div style={{ minWidth: 0 }}>
            <div className="bmd-title">{title}</div>
            <div className="bmd-subtitle">{subtitle}</div>
          </div>
        </div>

        {managers.length ? (
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }} title={t.manager}>
            <IconDatabase className="bmd-icon" style={{ color: 'var(--_muted)' }} />
            <select name="manager" className="bmd-select" value={dbSchema ? dbSchema.manager : ''} onChange={(e) => changeManager(e.target.value)} aria-label={t.manager} disabled={!!props.schema}>
              {managers.map((m) => (
                <option key={m.name} value={m.name}>
                  {managerLabel(m)}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        {jdlSchema ? (
          <button type="button" className="bmd-btn bmd-btn--outline" onClick={() => setJdlSchema(null)} title={currentManager ? managerLabel(currentManager) : ''}>
            <IconDatabase />
            {t.reset}
          </button>
        ) : null}

        <span className="bmd-sep bmd-hide-sm" />

        <div className="bmd-group bmd-hide-sm" role="group" aria-label={t.detail}>
          {(['all', 'keys', 'none'] as Detail[]).map((d) => (
            <button key={d} type="button" className="bmd-btn" aria-pressed={prefs.detail === d} onClick={() => updatePrefs({ detail: d })}>
              {d === 'all' ? t.detailAll : d === 'keys' ? t.detailKeys : t.detailNone}
            </button>
          ))}
        </div>

        <div className="bmd-group bmd-hide-sm" role="group" aria-label={t.direction}>
          <button type="button" className="bmd-btn" aria-pressed={prefs.direction === 'LR'} onClick={() => updatePrefs({ direction: 'LR', positions: {} })} title={t.horizontal}>
            <IconLayout style={{ transform: 'rotate(-90deg)' }} />
          </button>
          <button type="button" className="bmd-btn" aria-pressed={prefs.direction === 'TB'} onClick={() => updatePrefs({ direction: 'TB', positions: {} })} title={t.vertical}>
            <IconLayout />
          </button>
        </div>

        <div className="bmd-group" role="group">
          <button type="button" className="bmd-btn" onClick={() => zoomBy(1 / 1.25)} title={t.zoomOut} aria-label={t.zoomOut}>
            <IconMinus />
          </button>
          <span className="bmd-zoom">{Math.round(viewport.k * 100)}%</span>
          <button type="button" className="bmd-btn" onClick={() => zoomBy(1.25)} title={t.zoomIn} aria-label={t.zoomIn}>
            <IconPlus />
          </button>
          <button type="button" className="bmd-btn" onClick={() => fit()} title={t.fit} aria-label={t.fit}>
            <IconFit />
          </button>
        </div>

        <button
          type="button"
          className="bmd-btn bmd-btn--outline bmd-hide-sm"
          onClick={() => {
            updatePrefs({ positions: {} });
            lastFit.current = '';
          }}
          title={t.relayout}
        >
          {t.relayout}
        </button>

        <button type="button" className="bmd-btn bmd-btn--outline" aria-pressed={jdlOpen} onClick={() => setJdlOpen((v) => !v)} title={t.jdlTitle}>
          <IconCode />
          {t.jdl}
        </button>

        <div className="bmd-menu">
          <button type="button" className="bmd-btn bmd-btn--primary" aria-haspopup="menu" aria-expanded={exportOpen} onClick={() => setExportOpen((v) => !v)} disabled={!schema}>
            <IconDownload />
            <span className="bmd-hide-sm">{t.export}</span>
          </button>
          {exportOpen ? (
            <div className="bmd-menu-list" role="menu">
              <button type="button" role="menuitem" className="bmd-menu-item" onClick={() => doExport('svg')}>
                {t.exportSvg}
              </button>
              <button type="button" role="menuitem" className="bmd-menu-item" onClick={() => doExport('png')}>
                {t.exportPng}
              </button>
              <button type="button" role="menuitem" className="bmd-menu-item" onClick={() => doExport('json')}>
                {t.exportJson}
              </button>
              <button type="button" role="menuitem" className="bmd-menu-item" onClick={() => doExport('jdl')}>
                {t.exportJdl}
              </button>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="bmd-btn bmd-btn--icon"
          onClick={() => setThemeOverride(theme === 'dark' ? 'light' : 'dark')}
          title={t.theme}
          aria-label={t.theme}
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>
      </header>

      <div className="bmd-body" onPointerDown={() => exportOpen && setExportOpen(false)}>
        {sidebarOpen && schema ? (
          <Sidebar
            entities={entities}
            hidden={hidden}
            selectedId={selectedId}
            colors={colors}
            t={t}
            searchRef={searchRef}
            onToggle={(id) => updatePrefs({ hidden: hidden.has(id) ? prefs.hidden.filter((h) => h !== id) : [...prefs.hidden, id] })}
            onSetAll={(visible, ids) => {
              const set = new Set(prefs.hidden);
              ids.forEach((id) => (visible ? set.delete(id) : set.add(id)));
              updatePrefs({ hidden: Array.from(set) });
            }}
            onFocus={reveal}
          />
        ) : null}

        <Canvas
          boxes={boxes}
          edges={edges}
          viewport={viewport}
          onViewport={setViewport}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onHover={setHoveredId}
          onSelect={select}
          onMove={(id, x, y) => setDragging((d) => ({ ...d, [id]: { x, y } }))}
          onMoveEnd={() => {
            if (!focusId) updatePrefs({ positions: { ...prefs.positions, ...dragging } });
            setDragging({});
          }}
          colors={colors}
          kindLabels={kindLabels}
          svgRef={svgRef}
          stageRef={stageRef}
          hint={t.shortcuts}
        >
          {loading ? (
            <div className="bmd-state">
              <div className="bmd-state-box">
                <div className="bmd-spinner" />
                {t.loading}
              </div>
            </div>
          ) : null}
          {!loading && error ? (
            <div className="bmd-state">
              <div className="bmd-state-box">
                <strong>{t.error}</strong>
                <span>{error}</span>
                <button type="button" className="bmd-btn bmd-btn--primary" onClick={() => load(manager)}>
                  {t.retry}
                </button>
              </div>
            </div>
          ) : null}
          {!loading && !error && schema && !entities.length ? (
            <div className="bmd-state">
              <div className="bmd-state-box">{t.empty}</div>
            </div>
          ) : null}
          {boxes.length > 1 ? <Minimap boxes={boxes} viewport={viewport} stageSize={stageSize} colors={colors} onCenter={(p) => centerOn(p)} /> : null}
          {toast ? <div className="bmd-toast">{toast}</div> : null}
        </Canvas>

        {selected && !jdlOpen ? (
          <Inspector
            entity={selected}
            relations={relations}
            names={names}
            focused={focusId === selected.id}
            t={t}
            onClose={() => select(null)}
            onSelect={reveal}
            onFocusToggle={() => setFocusId((f) => (f === selected.id ? null : selected.id))}
          />
        ) : null}

        {jdlOpen ? (
          <JdlPanel
            initial={dbSchema ? toJdl(dbSchema) : ''}
            t={t}
            canReset={!!dbSchema}
            onApply={setJdlSchema}
            onReset={() => setJdlSchema(null)}
            onDownload={(text) => download(text, `${fileBase}.jdl`)}
            onClose={() => setJdlOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
}

export type { Entity };
