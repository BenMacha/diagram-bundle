export declare const stylesheet: string;
/**
 * Adds the stylesheet once per document / shadow root. Uses constructable
 * stylesheets when available (no inline <style>, CSP friendly).
 */
export declare function ensureStyles(node: Node | null | undefined): void;
