import { useEffect } from 'react';
import { CANVAS_W, CANVAS_H } from './deckMode';

/**
 * Drives the logical-canvas scale.
 *
 * Desktop: `--deck-scale = min(vw / 1920, vh / 1080)` so the full 1920x1080
 * frame is letterboxed and centred (a true deck slide, never a cropped or
 * stretched web stage).
 *
 * Mobile: `--m-scale = vw / 1920` so the same frame is scaled to device width
 * and stacked as a readable companion (no per-screen step controls, no
 * blank header-only states).
 *
 * CSS cannot divide a length by a length to produce a unitless scale, so the
 * values are computed here in JS and exposed as CSS custom properties.
 */
export function useDeckScale() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const apply = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const deck = Math.min(w / CANVAS_W, h / CANVAS_H);
      const m = w / CANVAS_W;
      const round = (n: number) => Math.round(n * 10000) / 10000;
      root.style.setProperty('--deck-scale', String(round(deck)));
      root.style.setProperty('--m-scale', String(round(m)));
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);
}
