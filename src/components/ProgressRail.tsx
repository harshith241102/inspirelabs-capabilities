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

  // Fraction (0-1) used to fill the connecting spine from the first tick centre
  // down to the active tick centre, so the rail quietly shows deck progress.
  const activeOrdinal = sections.findIndex((s) => s.label === active.label);
  const progress =
    sections.length > 1 ? Math.max(0, activeOrdinal) / (sections.length - 1) : 0;

  return (
    <nav
      className="rail"
      aria-label="Deck sections"
      style={{ ['--rail-progress' as string]: progress }}
    >
      <span className="rail__spine" aria-hidden="true">
        <span className="rail__spine-fill" />
      </span>
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
