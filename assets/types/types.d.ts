export interface Field {
    name: string;
    column: string;
    type: string;
    nullable: boolean;
    unique: boolean;
    id: boolean;
    length: number | null;
}
export type EntityKind = 'entity' | 'mapped_superclass' | 'embeddable' | 'enum';
export interface Entity {
    /** Fully qualified class name (or the JDL name for imported diagrams). */
    id: string;
    name: string;
    namespace: string;
    table: string | null;
    kind: EntityKind;
    parent: string | null;
    fields: Field[];
}
export type RelationType = 'OneToOne' | 'ManyToOne' | 'OneToMany' | 'ManyToMany';
export interface Relation {
    id: string;
    type: RelationType;
    source: string;
    target: string;
    field: string;
    inverseField: string | null;
    joinColumns: string[];
    joinTable: string | null;
    nullable: boolean;
}
/** A Doctrine entity manager and the database it is connected to. */
export interface ManagerInfo {
    name: string;
    connection: string | null;
    database: string | null;
    /** MySQL, PostgreSQL, SQL Server, SQLite… */
    driver: string | null;
    default: boolean;
}
export interface Schema {
    manager: string;
    managers: ManagerInfo[];
    entities: Entity[];
    relations: Relation[];
    title?: string;
}
export type Theme = 'light' | 'dark' | 'auto';
export type Locale = 'en' | 'fr';
export type Direction = 'LR' | 'TB';
export type Detail = 'all' | 'keys' | 'none';
export type HeadersInit = Record<string, string>;
export interface DiagramOptions {
    /** Base URL of the bundle routes, e.g. "/diagram" or "https://api.example.com/diagram". */
    apiUrl?: string;
    /** Entity manager to display first (defaults to the Doctrine default one). */
    manager?: string;
    /** Static schema: skips the API entirely. */
    schema?: Schema;
    /** Extra headers for every API call (e.g. Authorization). A function is called before each request. */
    headers?: HeadersInit | (() => HeadersInit | Promise<HeadersInit>);
    /** fetch credentials mode (default "same-origin"). */
    credentials?: RequestCredentials;
    /** Custom fetch implementation (axios adapters, interceptors…). */
    fetch?: typeof fetch;
    theme?: Theme;
    locale?: Locale;
    title?: string;
    /** CSS height of the component (default "100%"). */
    height?: string | number;
    className?: string;
    /** Key prefix used to remember layout/visibility in localStorage, false to disable. */
    storageKey?: string | false;
    /** Inject the stylesheet automatically (default true). */
    injectStyles?: boolean;
    onEntitySelect?: (entity: Entity | null) => void;
    onManagerChange?: (manager: string) => void;
}
