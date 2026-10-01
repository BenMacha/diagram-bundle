/**
 * Stylesheet of the diagram SVG. Rendered with CSS variables on screen and with
 * resolved colours for exported SVG / PNG files (which have no stylesheet).
 */
export interface SvgTokens {
    font: string;
    mono: string;
    surface: string;
    surface2: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
    edge: string;
    grid: string;
    canvas: string;
}
export declare const liveTokens: SvgTokens;
export declare function resolveTokens(el: Element): SvgTokens;
export declare function svgCss(t: SvgTokens): string;
/** Stable colour per namespace, used to tell domains apart. */
export declare function namespaceColor(namespace: string): string;
