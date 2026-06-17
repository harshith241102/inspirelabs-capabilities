import { Screen } from '../primitives/Screen';
import { DeckHeader, EvidenceTag, MockTag, NetBox } from '../primitives/ui';
import { ProductLogo } from '../primitives/deck';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import type { EvidenceStatus } from '../primitives/ui';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s09.css';

interface Placement {
  n: number;
  label: string;
  icon: IconName;
  purpose: string;
  actions: string[];
  availability: EvidenceStatus;
}

/* The placement inventory. Numbers map to the overlay markers drawn on the
   real GrabOn surface so the rail and the board read as one object. */
const placements: Placement[] = [
  { n: 1, label: 'Sidekick banners', icon: 'flag', purpose: 'High-visibility banner placement beside commerce content.', actions: ['Impressions', 'Clicks', 'CTR'], availability: 'approved' },
  { n: 2, label: 'Featured campaigns', icon: 'megaphone', purpose: 'Featured campaign slots for a focused offer moment.', actions: ['Impressions', 'Clicks', 'Conversion rate'], availability: 'approved' },
  { n: 3, label: 'Deal modules', icon: 'bolt', purpose: 'Offer modules surfaced to offer-ready shoppers.', actions: ['Coupon reveals', 'Clicks', 'Sales'], availability: 'approved' },
  { n: 4, label: 'Coupon ID promotions', icon: 'coupon', purpose: 'Offer promotion on coupon and code pages.', actions: ['Coupon reveals', 'Outbound clicks', 'Orders'], availability: 'approved' },
  { n: 5, label: 'Category takeovers', icon: 'grid', purpose: 'Category-level high-visibility presence.', actions: ['Impressions', 'CTR', 'Visits'], availability: 'pending' },
  { n: 6, label: 'Cross-promotions', icon: 'share', purpose: 'Promote a brand within related brand and category contexts.', actions: ['Impressions', 'Clicks', 'Visits'], availability: 'approved' },
  { n: 7, label: 'Video placements', icon: 'play', purpose: 'Video creative slots within the surface.', actions: ['Impressions', 'Clicks', 'CTR'], availability: 'pending' },
  { n: 8, label: 'High-visibility placements', icon: 'eye', purpose: 'Homepage or high-visibility placement where available.', actions: ['Impressions', 'Clicks', 'Orders'], availability: 'pending' },
];

/* The four overlays drawn directly onto the surface = the dominant visual.
   x/y/w/h are percentages inside the surface viewport. The featured campaign
   is the single orange focal. */
const overlays: { n: number; cls: string; label: string; sub: string; icon: IconName; x: number; y: number; w: number; h: number }[] = [
  { n: 1, cls: 's09-ov--banner', label: 'Sidekick banner', sub: 'Brand offer beside commerce content', icon: 'flag', x: 4, y: 5, w: 58, h: 13 },
  { n: 2, cls: 's09-ov--featured', label: 'Featured campaign', sub: 'Focused offer moment', icon: 'megaphone', x: 66, y: 5, w: 30, h: 31 },
  { n: 3, cls: 's09-ov--deal', label: 'Deal module', sub: 'Surfaced to offer-ready shoppers', icon: 'bolt', x: 4, y: 26, w: 58, h: 20 },
  { n: 4, cls: 's09-ov--coupon', label: 'Coupon ID promotion', sub: 'On coupon and code pages', icon: 'coupon', x: 4, y: 54, w: 92, h: 14 },
];

export default function Screen09() {
  const c = copy[9];
  const drawer = useDrawer();

  const openPlacement = (pl: Placement) =>
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
    });

  return (
    <Screen index={9} tone="light" id="grabon-promotional" label="GrabOn promotional surfaces">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s09-body">
        {/* DOMINANT VISUAL: real GrabOn surface as the placement canvas, with
            illustrative promotional placements drawn directly onto it. */}
        <Reveal from="up" distance={16} className="s09-board">
          <div className="s09-frame">
            <div className="s09-frame__bar">
              <i />
              <i />
              <i />
              <span className="s09-frame__url">grabon.com</span>
              <span className="s09-frame__logo">
                <ProductLogo src={ASSETS.grabonLogo} alt="GrabOn" height={22} />
              </span>
            </div>
            <div className="s09-view">
              <img
                src={ASSETS.grabonHome}
                alt="GrabOn home surface used as the canvas for promotional placement inventory"
                loading="lazy"
              />
              <span className="s09-view__dim" aria-hidden="true" />

              {overlays.map((ov, i) => (
                <Reveal
                  key={ov.n}
                  i={i}
                  step={0.08}
                  from="up"
                  distance={10}
                  className={`s09-ov ${ov.cls}`}
                  style={{ left: `${ov.x}%`, top: `${ov.y}%`, width: `${ov.w}%`, height: `${ov.h}%` }}
                >
                  <span className="s09-ov__n">{ov.n}</span>
                  <span className="s09-ov__ico">
                    <Icon name={ov.icon} size={18} />
                  </span>
                  <span className="s09-ov__txt">
                    <span className="s09-ov__label">{ov.label}</span>
                    <span className="s09-ov__sub">{ov.sub}</span>
                  </span>
                </Reveal>
              ))}

              <div className="s09-view__tag">
                <MockTag tone="dark">Illustrative placements over a real GrabOn surface</MockTag>
              </div>
            </div>
          </div>

          {/* SUPPORT RAIL: the full inventory as a compact list, availability
              tags as supporting labels (not a card grid). */}
          <aside className="s09-rail">
            <div className="s09-rail__head">
              <span className="s09-rail__title">Placement inventory</span>
              <span className="s09-rail__cap mono">On the live GrabOn surface</span>
            </div>
            <div className="s09-rail__list" role="list">
              {placements.map((pl) => (
                <button
                  key={pl.label}
                  type="button"
                  className="s09-item"
                  onClick={() => openPlacement(pl)}
                >
                  <span className="s09-item__n">{pl.n}</span>
                  <span className="s09-item__ico">
                    <Icon name={pl.icon} size={16} />
                  </span>
                  <span className="s09-item__label">{pl.label}</span>
                  <span className={`s09-item__dot s09-item__dot--${pl.availability}`} aria-hidden="true" />
                  <span className="s09-item__avail">
                    {pl.availability === 'approved' ? 'Approved' : 'Pending'}
                  </span>
                </button>
              ))}
            </div>
            <div className="s09-rail__foot">
              <EvidenceTag status="pending">Availability per campaign</EvidenceTag>
              <span className="s09-rail__note">
                Only approved, available placements should be used. Tap any placement for purpose and measurable actions.
              </span>
            </div>
          </aside>
        </Reveal>
      </div>

      <div className="s09-foot">
        <NetBox>{c.support}</NetBox>
      </div>
    </Screen>
  );
}
