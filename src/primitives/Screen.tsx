import { useEffect, useRef, type ReactNode } from 'react';
import { useApp } from '../state/store';
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
  // Translucent Inspirelabs gridmark, top-right of content slides (light, screens 2-36).
  const showGridmark = tone === 'light' && index >= 2 && index <= 36;
  const active = index === currentIndex;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            registerScreenView(index);
          }
        }
      },
      { threshold: [0.55] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, registerScreenView]);

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
      data-screen-index={index}
      aria-label={`Screen ${index}: ${label}`}
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
