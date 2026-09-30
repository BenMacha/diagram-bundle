import { useMemo, useState } from 'react';
import type { Messages } from '../i18n';
import type { Entity } from '../types';
import { IconChevron, IconEye, IconEyeOff, IconSearch } from './icons';

interface SidebarProps {
  entities: Entity[];
  hidden: Set<string>;
  selectedId: string | null;
  colors: Map<string, string>;
  t: Messages;
  onToggle: (id: string) => void;
  onSetAll: (visible: boolean, ids: string[]) => void;
  onFocus: (id: string) => void;
  searchRef: React.RefObject<HTMLInputElement>;
}

export function Sidebar({ entities, hidden, selectedId, colors, t, onToggle, onSetAll, onFocus, searchRef }: SidebarProps) {
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entities;
    return entities.filter((e) => e.id.toLowerCase().includes(q) || (e.table || '').toLowerCase().includes(q));
  }, [entities, query]);

  const groups = useMemo(() => {
    const map = new Map<string, Entity[]>();
    for (const e of filtered) {
      const list = map.get(e.namespace) || [];
      list.push(e);
      map.set(e.namespace, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const visibleCount = entities.filter((e) => !hidden.has(e.id)).length;
  const ids = filtered.map((e) => e.id);

  return (
    <aside className="bmd-sidebar" aria-label={t.entities}>
      <div className="bmd-sidebar-head">
        <label className="bmd-search">
          <IconSearch />
          <input ref={searchRef} name="search" className="bmd-input" type="search" placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="bmd-sidebar-meta">
          <span>
            {visibleCount} / {entities.length} {t.visible}
          </span>
          <span style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="bmd-link" onClick={() => onSetAll(true, ids)}>
              {t.showAll}
            </button>
            <button type="button" className="bmd-link" onClick={() => onSetAll(false, ids)}>
              {t.hideAll}
            </button>
          </span>
        </div>
      </div>
      <div className="bmd-tree">
        {groups.length === 0 ? <div className="bmd-empty-list">{t.noResult}</div> : null}
        {groups.map(([ns, list]) => {
          const isCollapsed = collapsed.has(ns) && !query;
          return (
            <div className="bmd-ns" key={ns || '_'}>
              <button
                type="button"
                className="bmd-ns-head"
                aria-expanded={!isCollapsed}
                onClick={() =>
                  setCollapsed((prev) => {
                    const next = new Set(prev);
                    if (next.has(ns)) next.delete(ns);
                    else next.add(ns);
                    return next;
                  })
                }
                title={ns}
              >
                <IconChevron />
                <span className="bmd-dot" style={{ background: colors.get(ns) }} />
                <span className="bmd-ns-name">{ns || '\\'}</span>
                <span className="bmd-count">{list.length}</span>
              </button>
              {!isCollapsed &&
                list.map((e) => {
                  const isHidden = hidden.has(e.id);
                  return (
                    <div key={e.id} className={`bmd-item${isHidden ? ' is-hidden' : ''}${selectedId === e.id ? ' is-selected' : ''}`}>
                      <button type="button" className="bmd-eye" onClick={() => onToggle(e.id)} aria-label={isHidden ? t.showAll : t.hideAll} title={e.id}>
                        {isHidden ? <IconEyeOff /> : <IconEye />}
                      </button>
                      <button type="button" className="bmd-item-name" onClick={() => onFocus(e.id)} title={e.table ? `${e.id} (${e.table})` : e.id}>
                        {e.name}
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
