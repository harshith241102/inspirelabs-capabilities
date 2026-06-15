import { useApp } from '../state/store';
import { useDrawer } from './Drawer';
import { copy } from '../content/copy';
import { aiDrawers } from '../content/aiDrawers';
import { IS_EXPORT } from '../lib/deckMode';
import { Icon } from '../primitives/icons';
import './ailauncher.css';

/**
 * AI Growth Studio: ONE global floating launcher (bottom-right, support-widget
 * style). It replaces the scattered in-slide AI chips. It opens the read-only
 * contextual drawer for the capability slide the reader is currently on, so the
 * drawer content always reflects the current slide. It appears only where the
 * current slide actually has an AI reference, and fades while the drawer is open
 * (the next-nav fades too) so the three overlay systems never compete.
 */
export function AiStudioLauncher() {
  const { currentIndex } = useApp();
  const drawer = useDrawer();

  if (IS_EXPORT || currentIndex <= 1) return null;
  const context = copy[currentIndex]?.aiChip;
  if (!context) return null;

  return (
    <button
      type="button"
      className="ai-launch chrome-glass"
      onClick={() => drawer.open(aiDrawers[context])}
      aria-label="Open AI Growth Studio contextual reference for this slide"
    >
      <span className="ai-launch__spark">
        <Icon name="spark" size={18} />
        <span className="ai-launch__dot" aria-hidden="true" />
      </span>
      <span className="ai-launch__label">
        <span className="ai-launch__eyebrow">This slide</span>
        <span className="ai-launch__text">AI Growth Studio</span>
      </span>
    </button>
  );
}
