import css from './styles.css?inline';

export const stylesheet: string = css;

const done = new WeakSet<Document | ShadowRoot>();

/**
 * Adds the stylesheet once per document / shadow root. Uses constructable
 * stylesheets when available (no inline <style>, CSP friendly).
 */
export function ensureStyles(node: Node | null | undefined): void {
  if (typeof document === 'undefined') return;
  const root = node && typeof ShadowRoot !== 'undefined' && node.getRootNode() instanceof ShadowRoot ? (node.getRootNode() as ShadowRoot) : document;
  if (done.has(root)) return;
  done.add(root);

  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  } catch {
    const style = document.createElement('style');
    style.setAttribute('data-doctrine-diagram', '');
    style.textContent = css;
    (root instanceof Document ? root.head : root).appendChild(style);
  }
}
