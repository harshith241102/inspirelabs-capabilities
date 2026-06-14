import { useEffect, useRef, type ReactNode } from 'react';
import { useApp } from '../state/store';

const isTypingTarget = (el: EventTarget | null) => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
};

const isDrawerOpen = () => !!document.querySelector('.drawer-scrim');

/**
 * Vertical scroll-snap deck container with keyboard navigation.
 * One screen per scroll stop on desktop; stacked narrative on mobile.
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
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
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

  return (
    <main className="deck" id="deck-main" ref={ref}>
      {children}
    </main>
  );
}
