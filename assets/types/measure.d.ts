import type { Measure } from './layout';
/** Text width measurement with a canvas, falling back to an estimate (tests, SSR). */
export declare function createMeasure(fontFamily: string, monoFamily: string): Measure;
