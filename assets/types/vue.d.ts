import type { PropType } from 'vue';
import { mount } from './mount';
import type { DiagramOptions, Entity, HeadersInit, Locale, Schema, Theme } from './types';
/**
 * Vue 3 wrapper (React is bundled, nothing else to install):
 *
 *   <DoctrineDiagram api-url="/diagram" theme="auto" @entity-select="onSelect" />
 */
export declare const DoctrineDiagram: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    apiUrl: {
        type: StringConstructor;
        default: undefined;
    };
    manager: {
        type: StringConstructor;
        default: undefined;
    };
    schema: {
        type: PropType<Schema>;
        default: undefined;
    };
    headers: {
        type: PropType<DiagramOptions["headers"]>;
        default: undefined;
    };
    credentials: {
        type: PropType<RequestCredentials>;
        default: undefined;
    };
    fetch: {
        type: PropType<typeof fetch>;
        default: undefined;
    };
    theme: {
        type: PropType<Theme>;
        default: undefined;
    };
    locale: {
        type: PropType<Locale>;
        default: undefined;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    storageKey: {
        type: PropType<string | false>;
        default: undefined;
    };
    injectStyles: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("entity-select" | "manager-change")[], "entity-select" | "manager-change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    apiUrl: {
        type: StringConstructor;
        default: undefined;
    };
    manager: {
        type: StringConstructor;
        default: undefined;
    };
    schema: {
        type: PropType<Schema>;
        default: undefined;
    };
    headers: {
        type: PropType<DiagramOptions["headers"]>;
        default: undefined;
    };
    credentials: {
        type: PropType<RequestCredentials>;
        default: undefined;
    };
    fetch: {
        type: PropType<typeof fetch>;
        default: undefined;
    };
    theme: {
        type: PropType<Theme>;
        default: undefined;
    };
    locale: {
        type: PropType<Locale>;
        default: undefined;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    storageKey: {
        type: PropType<string | false>;
        default: undefined;
    };
    injectStyles: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onEntity-select"?: ((...args: any[]) => any) | undefined;
    "onManager-change"?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    height: string | number;
    manager: string;
    apiUrl: string;
    schema: Schema;
    headers: HeadersInit | (() => HeadersInit | Promise<HeadersInit>) | undefined;
    credentials: RequestCredentials;
    fetch: typeof fetch;
    theme: Theme;
    locale: Locale;
    storageKey: string | false;
    injectStyles: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default DoctrineDiagram;
export { mount };
export type { DiagramOptions, Entity, Schema };
