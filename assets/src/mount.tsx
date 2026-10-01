import { createRoot } from 'react-dom/client';
import { DiagramStudio } from './components/DiagramStudio';
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
export function mount(element: Element, options: DiagramOptions): DiagramInstance {
  const root = createRoot(element);
  let current: DiagramOptions = { ...options };
  const render = () => root.render(<DiagramStudio {...current} />);
  render();

  return {
    update(next) {
      current = { ...current, ...next };
      render();
    },
    unmount() {
      root.unmount();
    },
  };
}
