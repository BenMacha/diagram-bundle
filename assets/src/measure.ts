import type { Measure } from './layout';

const FONTS = {
  title: '650 13.5px',
  row: '400 12px',
  type: '400 11px',
} as const;

/** Text width measurement with a canvas, falling back to an estimate (tests, SSR). */
export function createMeasure(fontFamily: string, monoFamily: string): Measure {
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = document.createElement('canvas').getContext('2d');
  } catch {
    ctx = null;
  }
  const cache = new Map<string, number>();

  return (text, font) => {
    const key = `${font}|${text}`;
    const hit = cache.get(key);
    if (hit !== undefined) return hit;
    let width: number;
    if (ctx) {
      ctx.font = `${FONTS[font]} ${font === 'type' ? monoFamily : fontFamily}`;
      width = ctx.measureText(text).width;
    } else {
      width = text.length * (font === 'title' ? 8 : 7);
    }
    cache.set(key, width);
    return width;
  };
}
