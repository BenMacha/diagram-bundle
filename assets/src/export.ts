import { bounds } from './layout';
import type { Box } from './layout';
import { resolveTokens, svgCss } from './svgStyle';

export function download(content: Blob | string, filename: string, type = 'text/plain'): void {
  const blob = typeof content === 'string' ? new Blob([content], { type: `${type};charset=utf-8` }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Standalone SVG of the whole diagram (not only the visible viewport), with
 * the colours of the current theme inlined.
 */
export function buildSvg(svg: SVGSVGElement, boxes: Box[], themeRoot: Element): { markup: string; width: number; height: number } {
  const tokens = resolveTokens(themeRoot);
  const pad = 40;
  const b = bounds(boxes);
  const width = Math.ceil(b.width + pad * 2);
  const height = Math.ceil(b.height + pad * 2);

  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  clone.setAttribute('viewBox', `0 0 ${width} ${height}`);
  clone.removeAttribute('class');

  const style = clone.querySelector('style');
  if (style) style.textContent = svgCss(tokens);
  clone.querySelectorAll('.bmd-grid-bg, defs, .bmd-hit').forEach((el) => el.remove());
  clone.querySelectorAll('.is-dim, .is-active, .is-selected').forEach((el) => el.classList.remove('is-dim', 'is-active', 'is-selected'));
  clone.querySelectorAll('[fill="var(--_accent)"]').forEach((el) => el.setAttribute('fill', tokens.accent));

  const viewport = clone.querySelector('.bmd-viewport');
  if (viewport) viewport.setAttribute('transform', `translate(${pad - b.x} ${pad - b.y})`);

  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '100%');
  bg.setAttribute('height', '100%');
  bg.setAttribute('fill', tokens.canvas);
  clone.insertBefore(bg, viewport);

  return { markup: `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`, width, height };
}

export function exportSvg(svg: SVGSVGElement, boxes: Box[], themeRoot: Element, filename: string): void {
  download(buildSvg(svg, boxes, themeRoot).markup, filename, 'image/svg+xml');
}

export function exportPng(svg: SVGSVGElement, boxes: Box[], themeRoot: Element, filename: string): Promise<void> {
  const { markup, width, height } = buildSvg(svg, boxes, themeRoot);
  // Browsers cap canvas size: keep the bitmap under ~16k px per side.
  const scale = Math.max(0.5, Math.min(2, 16000 / Math.max(width, height)));

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          download(blob, filename);
          resolve();
        } else {
          reject(new Error('PNG export failed'));
        }
      }, 'image/png');
    };
    img.onerror = () => reject(new Error('PNG export failed'));
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
  });
}
