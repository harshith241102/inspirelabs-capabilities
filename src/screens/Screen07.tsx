import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Lanes } from '../primitives/blocks';
import { copy } from '../content/copy';

export default function Screen07() {
  const c = copy[7];
  return (
    <Screen index={7} tone="light" id="capture-intro" label="Capture commerce intent intro">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Lanes
          items={[
            {
              icon: 'tag',
              label: 'Offer-led intent',
              caption: 'Shoppers actively looking for a deal, coupon, or saving before they buy.',
              level: 64,
            },
            {
              icon: 'store',
              label: 'Commerce intent',
              caption: 'Shoppers already moving toward a purchase decision on a commerce surface.',
              level: 82,
              accent: true,
            },
            {
              icon: 'compass',
              label: 'Comparison-led intent',
              caption: 'Shoppers weighing options and alternatives before the final choice.',
              level: 72,
            },
          ]}
        />
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={8} />
        </div>
      </footer>
    </Screen>
  );
}
