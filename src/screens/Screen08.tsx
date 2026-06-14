import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, Shot } from '../primitives/ui';
import { SplitScene } from '../primitives/blocks';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { Icon, type IconName } from '../primitives/icons';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';

const surfaces: { label: string; icon: IconName; what: string }[] = [
  { label: 'Store pages', icon: 'store', what: 'Brand store pages where offers and coupons are listed.' },
  { label: 'Coupon pages', icon: 'coupon', what: 'Coupon and code pages reached by deal-seeking shoppers.' },
  { label: 'Brand pages', icon: 'tag', what: 'Dedicated brand surfaces inside the commerce-intent environment.' },
  { label: 'Category pages', icon: 'grid', what: 'Category surfaces explored by savings-first buyers.' },
  { label: 'Deal modules', icon: 'bolt', what: 'Offer modules surfaced to offer-ready shoppers.' },
  { label: 'Featured placements', icon: 'flag', what: 'Higher-visibility placements within the surface.' },
];

const measurement = ['Visits', 'Clicks', 'Coupon reveals', 'Outbound clicks', 'Orders', 'Sales'];

export default function Screen08() {
  const c = copy[8];
  const drawer = useDrawer();

  const openSurface = (label: string, what: string) =>
    drawer.open({
      id: `grabon-${label}`,
      kind: 'surface',
      title: label,
      sections: [
        { heading: 'What this is', body: what },
        { heading: 'What it enables', body: 'A place for the brand to show up while the shopper is moving toward a purchase decision.' },
        { heading: 'Measurement, where tracking is available', items: measurement },
        { heading: 'What not to assume', body: 'Availability and tracking depend on the surface and the campaign setup. Outcomes are not guaranteed.' },
      ],
    });

  return (
    <Screen index={8} tone="light" id="grabon-flagship" label="GrabOn flagship commerce-intent surface">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <SplitScene
          reverse
          textWidth={420}
          figure={
            <Shot
              src={ASSETS.grabonMerchant}
              alt="GrabOn brand store page with coupons and offers, a commerce-intent surface"
              url="grabon.com/stores"
              objectPosition="top center"
              style={{ height: 'clamp(280px, 44vh, 460px)', width: '100%' }}
            />
          }
          text={
            <>
              <p className="s-support">{c.support}</p>
              <div className="surface-list">
                {surfaces.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="surface-list__item"
                    onClick={() => openSurface(s.label, s.what)}
                  >
                    <span className="surface-list__ico">
                      <Icon name={s.icon} size={16} />
                    </span>
                    <span className="surface-list__label">{s.label}</span>
                    <Icon name="arrow" size={14} className="surface-list__more" />
                  </button>
                ))}
              </div>
              <div className="cta-stack">
                <div className="cta-row">
                  <AdvanceCta label={c.cta} to={9} />
                </div>
                {c.aiChip && <SupportChip context={c.aiChip} />}
              </div>
            </>
          }
        />
      </div>
    </Screen>
  );
}
