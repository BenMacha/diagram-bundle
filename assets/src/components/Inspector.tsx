import { useState } from 'react';
import type { Messages } from '../i18n';
import type { Entity, Relation } from '../types';
import { IconArrowRight, IconCopy, IconFocus, IconX } from './icons';

interface InspectorProps {
  entity: Entity;
  relations: Relation[];
  names: Map<string, string>;
  focused: boolean;
  t: Messages;
  onClose: () => void;
  onSelect: (id: string) => void;
  onFocusToggle: () => void;
}

const SHORT: Record<string, string> = { OneToOne: '1 : 1', ManyToOne: 'N : 1', OneToMany: '1 : N', ManyToMany: 'N : N' };
const REVERSE: Record<string, string> = { OneToOne: '1 : 1', ManyToOne: '1 : N', OneToMany: 'N : 1', ManyToMany: 'N : N' };

export function Inspector({ entity, relations, names, focused, t, onClose, onSelect, onFocusToggle }: InspectorProps) {
  const [copied, setCopied] = useState(false);
  const outgoing = relations.filter((r) => r.source === entity.id);
  const incoming = relations.filter((r) => r.target === entity.id && r.source !== entity.id);

  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(entity.id).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        },
        () => undefined,
      );
    }
  };

  return (
    <aside className="bmd-panel" aria-label={entity.name}>
      <div className="bmd-panel-head">
        <div className="bmd-panel-title">
          <h3>{entity.name}</h3>
          <p>{entity.id}</p>
        </div>
        <button type="button" className="bmd-btn bmd-btn--icon" onClick={onClose} aria-label={t.close} title={t.close}>
          <IconX />
        </button>
      </div>
      <div className="bmd-panel-body">
        <div className="bmd-actions">
          <button type="button" className="bmd-btn bmd-btn--outline" onClick={onFocusToggle} aria-pressed={focused}>
            <IconFocus />
            {focused ? t.unfocus : t.focus}
          </button>
          <button type="button" className="bmd-btn bmd-btn--outline" onClick={copy}>
            <IconCopy />
            {copied ? t.copied : t.copy}
          </button>
        </div>

        <dl className="bmd-kv">
          {entity.table ? (
            <>
              <dt>{t.table}</dt>
              <dd>{entity.table}</dd>
            </>
          ) : null}
          <dt>{t.kind}</dt>
          <dd>{entity.kind}</dd>
          {entity.parent ? (
            <>
              <dt>{t.parent}</dt>
              <dd>
                <button type="button" className="bmd-link" onClick={() => onSelect(entity.parent!)}>
                  {names.get(entity.parent) || entity.parent}
                </button>
              </dd>
            </>
          ) : null}
        </dl>

        <div className="bmd-section">
          {t.fields} · {entity.fields.length}
        </div>
        <table className="bmd-fields">
          <tbody>
            {entity.fields.map((f) => (
              <tr key={f.name}>
                <td>
                  <span style={{ fontWeight: f.id ? 650 : 400 }}>{f.name}</span>
                  <span className="bmd-badges">
                    {f.id ? <span className="bmd-badge bmd-badge--accent" title={t.primary}>PK</span> : null}
                    {f.unique && !f.id ? <span className="bmd-badge">{t.unique}</span> : null}
                    {f.nullable ? <span className="bmd-badge">{t.nullable}</span> : null}
                  </span>
                  {f.column && f.column !== f.name ? <small>{f.column}</small> : null}
                </td>
                <td className="bmd-col-type">
                  {f.type}
                  {f.length ? `(${f.length})` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {outgoing.length ? (
          <>
            <div className="bmd-section">
              {t.outgoing} · {outgoing.length}
            </div>
            {outgoing.map((r) => (
              <button type="button" key={r.id} className="bmd-rel" onClick={() => onSelect(r.target)} title={r.joinTable || r.joinColumns.join(', ')}>
                <span className="bmd-rel-type">{SHORT[r.type]}</span>
                <span className="bmd-rel-name">
                  {r.field} → <b>{names.get(r.target) || r.target}</b>
                </span>
                <IconArrowRight className="bmd-icon" />
              </button>
            ))}
          </>
        ) : null}

        {incoming.length ? (
          <>
            <div className="bmd-section">
              {t.incoming} · {incoming.length}
            </div>
            {incoming.map((r) => (
              <button type="button" key={r.id} className="bmd-rel" onClick={() => onSelect(r.source)}>
                <span className="bmd-rel-type">{REVERSE[r.type]}</span>
                <span className="bmd-rel-name">
                  <b>{names.get(r.source) || r.source}</b>.{r.field}
                  {r.inverseField ? ` (${r.inverseField})` : ''}
                </span>
                <IconArrowRight className="bmd-icon" />
              </button>
            ))}
          </>
        ) : null}
      </div>
    </aside>
  );
}
