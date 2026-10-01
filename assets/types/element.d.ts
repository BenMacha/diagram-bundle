import { mount } from './mount';
import type { DiagramInstance } from './mount';
import type { DiagramOptions } from './types';
export declare const TAG_NAME = "doctrine-diagram";
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
export declare class DoctrineDiagramElement extends HTMLElement {
    static get observedAttributes(): string[];
    private instance;
    private extra;
    get options(): Partial<DiagramOptions>;
    set options(value: Partial<DiagramOptions>);
    connectedCallback(): void;
    private pending;
    disconnectedCallback(): void;
    attributeChangedCallback(): void;
    private collect;
    private render;
}
export declare function defineElement(name?: string): void;
export { mount };
export type { DiagramInstance, DiagramOptions };
