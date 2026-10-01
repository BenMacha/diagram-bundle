import type { Messages } from '../i18n';
import type { Schema } from '../types';
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
export declare function JdlPanel({ initial, t, canReset, onApply, onReset, onDownload, onClose }: JdlPanelProps): import("react").JSX.Element;
export {};
