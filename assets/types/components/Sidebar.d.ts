import type { Messages } from '../i18n';
import type { Entity } from '../types';
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
export declare function Sidebar({ entities, hidden, selectedId, colors, t, onToggle, onSetAll, onFocus, searchRef }: SidebarProps): import("react").JSX.Element;
export {};
