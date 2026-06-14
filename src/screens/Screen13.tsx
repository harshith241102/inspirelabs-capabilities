import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, Shot, Chip } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { FlowRail } from '../primitives/blocks';
import { SupportChip } from '../components/SupportChip';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';

export default function Screen13() {
  const c = copy[13];
  return (
    <Screen index={13} tone="light" id="grabcash" label="GrabCash">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="split" style={{ alignItems: 'stretch' }}>
          <div className="split__text" style={{ flexBasis: 430 }}>
            <p className="s-support">{c.support}</p>

            <span className="mini-cap">How an offer moves through GrabCash</span>
            <FlowRail
              nodes={[
                { icon: 'share', label: 'Share deal link', caption: 'Sharer posts a tracked offer' },
                { icon: 'cursor', label: 'Tracked action', caption: 'Click, lead, order, or sale' },
                { icon: 'tag', label: 'Payout-led', caption: 'Reward motivates sharing' },
              ]}
            />

            <div className="metric-strip">
              {c.cards!.map((card) => (
                <Chip key={card}>{card}</Chip>
              ))}
            </div>

            <div className="cta-stack">
              <div className="cta-row">
                <AdvanceCta label={c.cta} to={14} />
              </div>
              {c.aiChip && <SupportChip context={c.aiChip} />}
            </div>
          </div>
          <div className="split__fig">
            <Reveal from="left" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Shot
                src={ASSETS.grabcashDeals}
                alt="GrabCash deals screen, where shareable offers and tracked actions live"
                url="grabcash"
                style={{ height: 'clamp(280px, 46vh, 460px)', width: '100%', maxWidth: 560 }}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </Screen>
  );
}
