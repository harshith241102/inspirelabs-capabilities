import { useApp } from '../state/store';
import { sections, sectionForIndex } from '../content/sections';
import { IS_EXPORT } from '../lib/deckMode';
import './progress.css';

/**
 * Side section navigation (desktop). A framed list of the deck's sections with
 * the current one highlighted and always legible. The frame is frosted and
 * quiet at rest (so it sits lightly over the slide) and becomes opaque on
 * hover. Clicking a section jumps to its first screen.
 */
export function ProgressRail() {
  const { currentIndex, goTo } = useApp();
  const active = sectionForIndex(currentIndex);
  // Hide on cover + setup for a cleaner entry, and in export mode.
  if (IS_EXPORT || currentIndex <= 1) return null;

  return (
    <nav className="rail" aria-label="Deck sections">
      <div className="rail__frame chrome-glass">
        <ul>
          {sections.map((s) => {
            const isActive = s.label === active.label;
            const isPast = currentIndex > s.end;
            return (
              <li key={s.label}>
                <button
                  type="button"
                  className={`rail__row${isActive ? ' is-active' : ''}${isPast ? ' is-past' : ''}`}
                  onClick={() => goTo(s.start)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Go to ${s.label}`}
                >
                  <span className="rail__marker" aria-hidden="true" />
                  <span className="rail__name">{s.short}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
