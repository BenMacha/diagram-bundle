import type { Box } from './layout';
export declare function download(content: Blob | string, filename: string, type?: string): void;
/**
 * Standalone SVG of the whole diagram (not only the visible viewport), with
 * the colours of the current theme inlined.
 */
export declare function buildSvg(svg: SVGSVGElement, boxes: Box[], themeRoot: Element): {
    markup: string;
    width: number;
    height: number;
};
export declare function exportSvg(svg: SVGSVGElement, boxes: Box[], themeRoot: Element, filename: string): void;
export declare function exportPng(svg: SVGSVGElement, boxes: Box[], themeRoot: Element, filename: string): Promise<void>;
