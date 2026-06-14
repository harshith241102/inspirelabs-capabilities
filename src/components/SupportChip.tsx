import { Icon } from '../primitives/icons';
import { aiChipLabel, aiDrawers, type AiContext } from '../content/aiDrawers';
import { useDrawer } from './Drawer';

/**
 * Contextual AI Growth Studio support chip.
 * SECONDARY by design on non-AI capability screens: quiet styling, opens a
 * drawer (never a separate journey), never replaces the primary narrative CTA.
 */
export function SupportChip({ context }: { context: AiContext }) {
  const drawer = useDrawer();
  return (
    <button
      type="button"
      className="ai-chip"
      onClick={() => drawer.open(aiDrawers[context])}
      aria-label={aiChipLabel[context]}
    >
      <Icon name="spark" size={15} className="ai-chip__spark" />
      <span>{aiChipLabel[context]}</span>
    </button>
  );
}
