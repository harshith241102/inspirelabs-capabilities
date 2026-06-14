import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { CardGrid } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import type { EvidenceStatus } from '../primitives/ui';
import { copy } from '../content/copy';

const placements: {
  label: string;
  icon: IconName;
  purpose: string;
  actions: string[];
  availability: EvidenceStatus;
}[] = [
  { label: 'Sidekick banners', icon: 'flag', purpose: 'High-visibility banner placement beside commerce content.', actions: ['Impressions', 'Clicks', 'CTR'], availability: 'approved' },
  { label: 'Cross-promotions', icon: 'share', purpose: 'Promote a brand within related brand and category contexts.', actions: ['Impressions', 'Clicks', 'Visits'], availability: 'approved' },
  { label: 'Coupon ID promotions', icon: 'coupon', purpose: 'Offer promotion on coupon and code pages.', actions: ['Coupon reveals', 'Outbound clicks', 'Orders'], availability: 'approved' },
  { label: 'Video placements', icon: 'play', purpose: 'Video creative slots within the surface.', actions: ['Impressions', 'Clicks', 'CTR'], availability: 'pending' },
  { label: 'Featured campaigns', icon: 'megaphone', purpose: 'Featured campaign slots for a focused offer moment.', actions: ['Impressions', 'Clicks', 'Conversion rate'], availability: 'pending' },
  { label: 'Deal modules', icon: 'bolt', purpose: 'Offer modules surfaced to offer-ready shoppers.', actions: ['Coupon reveals', 'Clicks', 'Sales'], availability: 'approved' },
  { label: 'Category takeovers', icon: 'grid', purpose: 'Category-level high-visibility presence.', actions: ['Impressions', 'CTR', 'Visits'], availability: 'pending' },
  { label: 'High-visibility placements', icon: 'eye', purpose: 'Homepage or high-visibility placement where available.', actions: ['Impressions', 'Clicks', 'Orders'], availability: 'pending' },
];

export default function Screen09() {
  const c = copy[9];
  const drawer = useDrawer();

  return (
    <Screen index={9} tone="light" id="grabon-promotional" label="GrabOn promotional surfaces">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Reveal>
          <span className="mini-cap">Promotional surface inventory · real placements, shown separately</span>
        </Reveal>
        <CardGrid min={200} gap={12}>
          {placements.map((pl, i) => (
            <Reveal i={i} step={0.05} key={pl.label}>
              <button
                type="button"
                className="opentile"
                style={{ width: '100%', height: '100%' }}
                onClick={() =>
                  drawer.open({
                    id: `placement-${pl.label}`,
                    kind: 'surface',
                    eyebrow: 'Promotional surface',
                    title: pl.label,
                    sections: [
                      { heading: 'What this is', body: pl.purpose },
                      { heading: 'What it enables', body: 'Offer-led visibility and action inside the commerce-intent surface.' },
                      { heading: 'Measurable actions, where tracking is available', items: pl.actions },
                      { heading: 'What not to assume', body: 'Only approved and available placements should be used. Availability and tracking depend on the campaign.' },
                    ],
                    evidence: [{ label: 'Availability', status: pl.availability }],
                  })
                }
              >
                <span className="opentile__head">
                  <span className="opentile__ico">
                    <Icon name={pl.icon} size={18} />
                  </span>
                  <span className="opentile__title">{pl.label}</span>
                </span>
                <span className="opentile__body">{pl.purpose}</span>
                <span className="opentile__more">
                  View placement
                  <Icon name="arrow" size={12} />
                </span>
              </button>
            </Reveal>
          ))}
        </CardGrid>
      </div>
      <footer className="s-footer-row">
        <NetBox>These are real promotional surfaces, shown as inventory a brand can actually use.</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={10} />
        </div>
      </footer>
    </Screen>
  );
}
