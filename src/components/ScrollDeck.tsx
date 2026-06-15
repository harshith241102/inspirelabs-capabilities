import { useEffect, useRef, type ReactNode } from 'react';
import { useApp } from '../state/store';

const isTypingTarget = (el: EventTarget | null) => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
};

const isDrawerOpen = () => !!document.querySelector('.drawer-scrim');

/**
 * Horizontal scroll-snap deck container (left to right = forward).
 * One screen per scroll stop. Keyboard: Right/Down/PageDown advance,
 * Left/Up/PageUp go back, Home/End jump to the ends. A wheel gesture
 * (vertical or horizontal) advances exactly one slide, so a plain mouse
 * wheel still navigates a horizontal deck.
 */
export function ScrollDeck({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { registerScroller, next, prev, goTo, total } = useApp();

  useEffect(() => {
    registerScroller(ref.current);
  }, [registerScroller]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) || isDrawerOpen()) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, total]);

  // Translate a wheel gesture into a discrete one-slide step. Native listener
  // with passive:false so we can preventDefault; a short idle timer releases the
  // lock once the gesture (incl. trackpad momentum) settles, so one gesture
  // moves exactly one slide.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let locked = false;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      if (isTypingTarget(e.target) || isDrawerOpen()) return;
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 6) return;
      e.preventDefault();
      clearTimeout(idle);
      idle = setTimeout(() => {
        locked = false;
      }, 140);
      if (locked) return;
      locked = true;
      if (delta > 0) next();
      else prev();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(idle);
    };
  }, [next, prev]);

  return (
    <main className="deck" id="deck-main" ref={ref}>
      {children}
    </main>
  );
}
