import { mount } from './mount';
import type { DiagramInstance } from './mount';
import type { DiagramOptions, Entity, Locale, Theme } from './types';

export const TAG_NAME = 'doctrine-diagram';

const ATTRIBUTES = ['api', 'manager', 'theme', 'locale', 'heading', 'storage-key'] as const;

/**
 * <doctrine-diagram api="/diagram" theme="auto" locale="fr"></doctrine-diagram>
 *
 * Attributes: api, manager, theme (light|dark|auto), locale (en|fr), heading, storage-key.
 * Properties: `options` (any DiagramOptions, e.g. headers / fetch / schema).
 * Events:     `entity-select` (detail: entity|null), `manager-change` (detail: name).
 *
 * Rendered in a Shadow DOM: the host page CSS cannot leak in. Theme colours can
 * still be customised with the --bmd-* custom properties.
 */
export class DoctrineDiagramElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [...ATTRIBUTES];
  }

  private instance: DiagramInstance | null = null;
  private extra: Partial<DiagramOptions> = {};

  get options(): Partial<DiagramOptions> {
    return this.extra;
  }

  set options(value: Partial<DiagramOptions>) {
    this.extra = { ...value };
    if (!this.pending) this.render();
  }

  connectedCallback(): void {
    if (!this.shadowRoot) {
      const shadow = this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = ':host{display:block;position:relative;height:100%;min-height:480px}:host([hidden]){display:none}.bmd-host{height:100%}';
      const container = document.createElement('div');
      container.className = 'bmd-host';
      shadow.append(style, container);
    }
    // `options` assigned before the element was defined (script loaded after the markup)
    // is an own property shadowing the setter: re-apply it through the setter.
    if (Object.prototype.hasOwnProperty.call(this, 'options')) {
      const value = (this as unknown as { options: Partial<unknown> }).options;
      delete (this as unknown as { options?: unknown }).options;
      this.extra = { ...(value as object) };
    }
    // First render deferred to a microtask: frameworks set properties (headers…) right
    // after inserting the element, before any API call must be made.
    this.pending = true;
    Promise.resolve().then(() => {
      this.pending = false;
      if (this.isConnected) this.render();
    });
  }

  private pending = false;

  disconnectedCallback(): void {
    if (this.instance) {
      this.instance.unmount();
      this.instance = null;
    }
  }

  attributeChangedCallback(): void {
    if (this.isConnected && !this.pending) this.render();
  }

  private collect(): DiagramOptions {
    const attr = (name: string) => this.getAttribute(name) || undefined;
    const storage = this.getAttribute('storage-key');
    return {
      apiUrl: attr('api'),
      manager: attr('manager'),
      theme: attr('theme') as Theme | undefined,
      locale: attr('locale') as Locale | undefined,
      title: attr('heading'),
      storageKey: storage === 'false' ? false : storage || undefined,
      height: '100%',
      ...this.extra,
      onEntitySelect: (entity: Entity | null) => {
        this.dispatchEvent(new CustomEvent('entity-select', { detail: entity, bubbles: true, composed: true }));
        if (this.extra.onEntitySelect) this.extra.onEntitySelect(entity);
      },
      onManagerChange: (name: string) => {
        this.dispatchEvent(new CustomEvent('manager-change', { detail: name, bubbles: true, composed: true }));
        if (this.extra.onManagerChange) this.extra.onManagerChange(name);
      },
    };
  }

  private render(): void {
    const container = this.shadowRoot && this.shadowRoot.querySelector('.bmd-host');
    if (!container) return;
    if (this.instance) this.instance.update(this.collect());
    else this.instance = mount(container, this.collect());
  }
}

export function defineElement(name: string = TAG_NAME): void {
  if (typeof customElements !== 'undefined' && !customElements.get(name)) {
    customElements.define(name, class extends DoctrineDiagramElement {});
  }
}

defineElement();

export { mount };
export type { DiagramInstance, DiagramOptions };
