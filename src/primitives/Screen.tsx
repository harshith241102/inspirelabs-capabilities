import { useEffect, useRef, type ReactNode } from 'react';
import { useApp } from '../state/store';
import { useScreenPos } from '../state/screenPos';
import { ASSETS } from '../lib/assets';

interface ScreenProps {
  index: number;
  tone?: 'light' | 'dark';
  id?: string;
  /** aria label for the section landmark */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Full-viewport snap section holding the scaled 1920x1080 logical canvas.
 * Registers itself for view tracking + progress, and makes itself `inert`
 * when it is not the active screen so off-screen controls are not globally
 * discoverable by assistive tech / focus. (The drawer separately makes the
 * whole deck inert while open.)
 */
export function Screen({ index, tone = 'light', id, label, children, className }: ScreenProps) {
  const ref = useRef<HTMLElement>(null);
  const { registerScreenView, currentIndex } = useApp();
  // Display position comes from the deck registry order (App provides it), so an
  // inserted screen shifts every later screen without renumbering files. Falls
  // back to the hardcoded prop if a screen is rendered outside the registry.
  const pos = useScreenPos();
  const idx = pos ?? index;
  // Translucent Inspirelabs gridmark, top-right of light content slides.
  const showGridmark = tone === 'light' && idx >= 2 && idx <= 37;
  const active = idx === currentIndex;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            registerScreenView(idx);
          }
        }
      },
      { threshold: [0.55] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [idx, registerScreenView]);

  // Active-screen state: only the current screen is exposed to AT / tab order.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.toggleAttribute('inert', !active);
  }, [active]);

  return (
    <section
      ref={ref}
      id={id}
      data-screen-index={idx}
      aria-label={`Screen ${idx}: ${label}`}
      className={`screen screen--${tone}${className ? ` ${className}` : ''}`}
    >
      <div className="screen__stage">
        {showGridmark && (
          <img src={ASSETS.symbolInk} alt="" aria-hidden="true" className="gridmark" loading="lazy" />
        )}
        {children}
      </div>
    </section>
  );
}
