/* Deck runtime mode.
   Export mode (`?export=1` or `?export`) strips all navigation chrome,
   disables smooth scroll + reveal animation, and renders every screen
   statically so a screenshot tool can capture clean 1920x1080 frames. */

export const IS_EXPORT =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).has('export');

/** Logical deck canvas. Every desktop screen is composed inside this frame
    and uniformly transform-scaled to fit the viewport. */
export const CANVAS_W = 1920;
export const CANVAS_H = 1080;
