import { useEffect, useMemo, useRef, useState } from 'react';
import type { Messages } from '../i18n';
import { JdlError, parseJdl } from '../jdl';
import type { Schema } from '../types';
import { IconDownload, IconRefresh, IconUpload, IconX } from './icons';

interface JdlPanelProps {
  initial: string;
  t: Messages;
  canReset: boolean;
  onApply: (schema: Schema) => void;
  onReset: () => void;
  onDownload: (text: string) => void;
  onClose: () => void;
}

/** JDL editor: live parsing, import of .jdl/.jh files, back to the database schema. */
export function JdlPanel({ initial, t, canReset, onApply, onReset, onDownload, onClose }: JdlPanelProps) {
  const [text, setText] = useState(initial);
  const [error, setError] = useState<{ message: string; line: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const dirty = useRef(false);

  useEffect(() => {
    if (!dirty.current) setText(initial);
  }, [initial]);

  // Live update, debounced.
  useEffect(() => {
    if (!dirty.current) return undefined;
    const timer = setTimeout(() => {
      try {
        onApply(parseJdl(text));
        setError(null);
      } catch (e) {
        if (e instanceof JdlError) setError({ message: e.message, line: e.line });
        else setError({ message: String(e), line: 0 });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [text, onApply]);

  const lines = useMemo(() => text.split('\n').length, [text]);

  const importFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      dirty.current = true;
      setText(String(reader.result || ''));
    };
    reader.readAsText(file);
  };

  return (
    <aside className="bmd-panel bmd-panel--wide" aria-label={t.jdlTitle}>
      <div className="bmd-panel-head">
        <div className="bmd-panel-title">
          <h3>{t.jdlTitle}</h3>
        </div>
        <button type="button" className="bmd-btn bmd-btn--icon" onClick={onClose} aria-label={t.close} title={t.close}>
          <IconX />
        </button>
      </div>
      <div className="bmd-jdl">
        <p className="bmd-jdl-hint">{t.jdlHint}</p>
        <div className="bmd-editor">
          <div className="bmd-gutter" ref={gutterRef}>
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className={error && error.line === i + 1 ? 'is-error' : undefined}>
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            name="jdl"
            className="bmd-textarea"
            spellCheck={false}
            value={text}
            wrap="off"
            onScroll={(e) => {
              if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
            }}
            onChange={(e) => {
              dirty.current = true;
              setText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                const el = e.currentTarget;
                const start = el.selectionStart;
                const value = `${text.slice(0, start)}  ${text.slice(el.selectionEnd)}`;
                dirty.current = true;
                setText(value);
                requestAnimationFrame(() => el.setSelectionRange(start + 2, start + 2));
              }
            }}
          />
        </div>
        <div className="bmd-jdl-foot">
          {error ? (
            <div className="bmd-error-msg">
              {error.line ? `${t.parseError} ${error.line} — ` : ''}
              {error.message}
            </div>
          ) : null}
          <input
            ref={fileRef}
            type="file"
            accept=".jdl,.jh,.txt"
            hidden
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) importFile(file);
              e.target.value = '';
            }}
          />
          <button type="button" className="bmd-btn bmd-btn--outline" onClick={() => fileRef.current && fileRef.current.click()}>
            <IconUpload />
            {t.import}
          </button>
          <button type="button" className="bmd-btn bmd-btn--outline" onClick={() => onDownload(text)}>
            <IconDownload />
            {t.download}
          </button>
          {canReset ? (
            <button
              type="button"
              className="bmd-btn bmd-btn--outline"
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                dirty.current = false;
                setError(null);
                onReset();
              }}
            >
              <IconRefresh />
              {t.reset}
            </button>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
