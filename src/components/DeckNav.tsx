import { useApp } from '../state/store';
import { Icon } from '../primitives/icons';
import { copy } from '../content/copy';
import { JUMP_UNLOCK_INDEX, ROADMAP_INDEX } from '../content/sections';
import { IS_EXPORT } from '../lib/deckMode';
import './decknav.css';

/**
 * Quiet deck controls: prev / next arrows + secondary "Jump to roadmap".
 * The only next/previous navigation in the deck (slides carry no embedded
 * advance buttons). The current slide's contextual next label lives here on
 * the next control's accessible name, not inside the slide. Hidden on cover +
 * setup so entry stays cinematic, and fully hidden in export mode so
 * screenshots carry no navigation chrome.
 */
export function DeckNav() {
  const { currentIndex, total, next, prev, goTo } = useApp();
  if (IS_EXPORT || currentIndex <= 1) return null;

  const showJump = currentIndex > JUMP_UNLOCK_INDEX && currentIndex < ROADMAP_INDEX;
  const showBackToRoadmap = currentIndex > ROADMAP_INDEX;
  const nextCta = currentIndex < total - 1 ? copy[currentIndex]?.cta : undefined;

  return (
    <div className="decknav" role="group" aria-label="Deck navigation">
      {showJump && (
        <button type="button" className="decknav__jump chrome-glass" onClick={() => goTo(ROADMAP_INDEX)}>
          Jump to roadmap
        </button>
      )}
      {showBackToRoadmap && (
        <button type="button" className="decknav__jump chrome-glass" onClick={() => goTo(ROADMAP_INDEX)}>
          Back to roadmap
        </button>
      )}
      <div className="decknav__cluster chrome-glass">
        <button
          type="button"
          className="decknav__arrow"
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label="Previous screen"
        >
          <Icon name="arrow" size={18} style={{ transform: 'rotate(180deg)' }} />
        </button>
        {nextCta && (
          <span className="decknav__hint" aria-hidden="true">
            <span className="decknav__hint-eyebrow">Next</span>
            <span className="decknav__hint-cta">{nextCta}</span>
          </span>
        )}
        <button
          type="button"
          className="decknav__arrow decknav__arrow--next"
          onClick={next}
          disabled={currentIndex === total - 1}
          aria-label={nextCta ? `Next: ${nextCta}` : 'Next screen'}
        >
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </div>
  );
}
