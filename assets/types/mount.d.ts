import type { DiagramOptions } from './types';
export interface DiagramInstance {
    /** Merge new options (re-renders the studio). */
    update(options: Partial<DiagramOptions>): void;
    unmount(): void;
}
/**
 * Framework-agnostic entry point: renders the studio inside `element`.
 *
 *   const diagram = mount(document.getElementById('diagram'), { apiUrl: '/diagram' });
 *   diagram.update({ theme: 'dark' });
 *   diagram.unmount();
 */
export declare function mount(element: Element, options: DiagramOptions): DiagramInstance;
