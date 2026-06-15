import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, EvidenceTag } from '../primitives/ui';
import { AnnotatedShot } from '../primitives/deck';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { Icon, type IconName } from '../primitives/icons';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s08.css';

const surfaces: { label: string; icon: IconName; what: string }[] = [
  { label: 'Store pages', icon: 'store', what: 'Brand store pages where offers and coupons are listed.' },
  { label: 'Coupon pages', icon: 'coupon', what: 'Coupon and code pages reached by deal-seeking shoppers.' },
  { label: 'Brand pages', icon: 'tag', what: 'Dedicated brand surfaces inside the commerce-intent environment.' },
  { label: 'Category pages', icon: 'grid', what: 'Category surfaces explored by savings-first buyers.' },
  { label: 'Deal modules', icon: 'bolt', what: 'Offer modules surfaced to offer-ready shoppers.' },
  { label: 'Featured placements', icon: 'flag', what: 'Higher-visibility placements within the surface.' },
];

const measurement = ['Visits', 'Clicks', 'Coupon reveals', 'Outbound clicks', 'Orders', 'Sales'];

// On-image annotation pins (point at the live merchant surface).
const pins = [
  { n: 1, label: 'Store page', x: 26, y: 20, side: 'right' as const },
  { n: 2, label: 'Coupon and code modules', x: 40, y: 52, side: 'right' as const },
  { n: 5, label: 'Featured deal placements', x: 64, y: 78, side: 'left' as const },
];

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

      <div className="s08-body">
        <AnnotatedShot
          src={ASSETS.grabonMerchant}
          alt="GrabOn brand store page with coupons and offers, a commerce-intent surface"
          url="grabon.com/stores"
          logo={{ src: ASSETS.grabonLogo, alt: 'GrabOn' }}
          objectPosition="top center"
          pins={pins}
          style={{ flex: '1 1 0' }}
        />

        <aside className="s08-side">
          <p className="s08-lead">{c.support}</p>
          <div className="s08-list" role="list">
            {surfaces.map((s, i) => (
              <button
                key={s.label}
                type="button"
                className="s08-row"
                onClick={() => openSurface(s.label, s.what)}
              >
                <span className="s08-row__n">{i + 1}</span>
                <span className="s08-row__ico">
                  <Icon name={s.icon} size={17} />
                </span>
                <span className="s08-row__label">{s.label}</span>
                <Icon name="arrow" size={15} className="s08-row__more" />
              </button>
            ))}
          </div>
          <div className="s08-measure">
            <EvidenceTag status="pending">Measurement, where available</EvidenceTag>
            <span className="s08-measure__text">
              Visits, clicks, coupon reveals, outbound clicks, orders, and sales.
            </span>
          </div>
        </aside>
      </div>

      <div className="s08-foot">
        <AdvanceCta label={c.cta} to={9} />
        {c.aiChip && <SupportChip context={c.aiChip} />}
      </div>
    </Screen>
  );
}
