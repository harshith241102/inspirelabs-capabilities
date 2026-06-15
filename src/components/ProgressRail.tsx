import { useApp } from '../state/store';
import { sections, sectionForIndex } from '../content/sections';
import { IS_EXPORT } from '../lib/deckMode';
import './progress.css';

/**
 * Subtle section progress rail (desktop). No slide numbers.
 * Clicking a section jumps to its first screen.
 */
export function ProgressRail() {
  const { currentIndex, goTo } = useApp();
  const active = sectionForIndex(currentIndex);
  // Hide on cover + setup for a cleaner entry, and in export mode.
  if (IS_EXPORT || currentIndex <= 1) return null;

  return (
    <nav className="rail" aria-label="Deck sections">
      <ul>
        {sections.map((s) => {
          const isActive = s.label === active.label;
          const isPast = currentIndex > s.end;
          return (
            <li key={s.label}>
              <button
                type="button"
                className={`rail__dot${isActive ? ' is-active' : ''}${isPast ? ' is-past' : ''}`}
                onClick={() => goTo(s.start)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Go to ${s.label}`}
              >
                <span className="rail__tick" />
                <span className="rail__label">{s.short}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
