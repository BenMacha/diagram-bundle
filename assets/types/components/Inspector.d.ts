import type { Messages } from '../i18n';
import type { Entity, Relation } from '../types';
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
export declare function Inspector({ entity, relations, names, focused, t, onClose, onSelect, onFocusToggle }: InspectorProps): import("react").JSX.Element;
export {};
