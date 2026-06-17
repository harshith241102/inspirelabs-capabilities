import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, MockTag, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s21.css';

/* The pre-pixel GrabOn event path. Four events happen on GrabOn before the
   shopper ever reaches the brand site, where the brand's own pixel begins.
   AudienceSeed by Inspirelabs observes the approved pre-site signals. */
interface EventNode {
  label: string;
  icon: IconName;
  surface: string;
  def: string;
}

const events: EventNode[] = [
  {
    label: 'Discovery',
    icon: 'eye',
    surface: 'GrabOn surface',
    def: 'A shopper discovers a brand or an offer on the GrabOn commerce-intent surface.',
  },
  {
    label: 'Offer comparison',
    icon: 'layers',
    surface: 'GrabOn surface',
    def: 'They compare offers and options while the purchase decision is forming.',
  },
  {
    label: 'Coupon reveal',
    icon: 'coupon',
    surface: 'GrabOn surface',
    def: 'They reveal a coupon, a stronger signal of purchase intent.',
  },
  {
    label: 'Outbound click',
    icon: 'cursor',
    surface: 'GrabOn surface',
    def: 'They click out toward the brand, an action signal recorded before arrival.',
  },
];

const arrival: EventNode = {
  label: 'Brand arrival',
  icon: 'store',
  surface: 'Brand site or app',
  def: "They reach the brand site or app, where the brand's own pixel and tracking begin.",
};

export default function Screen21() {
  const c = copy[21];
  const drawer = useDrawer();

  const openEvent = (e: EventNode, kind: 'pre' | 'pixel') =>
    drawer.open({
      id: `blindspot-${e.label}`,
      kind: 'info',
      eyebrow: kind === 'pre' ? 'Pre-site event' : 'Brand-owned event',
      title: e.label,
      sections: [
        { heading: 'What this is', body: e.def },
        { heading: 'Where it happens', body: e.surface },
        { heading: 'Data source required', body: c.drawer ?? '' },
      ],
    });

  return (
    <Screen index={21} tone="light" id="blind-spot" label="The pre-pixel blind spot">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s21-body">
        {/* ---- coverage rail: who sees what, across the whole path ---- */}
        <div className="s21-coverage" aria-hidden="true">
          <span className="s21-cov s21-cov--as">
            <Icon name="signal" size={13} />
            AudienceSeed by Inspirelabs sees the decision forming here
          </span>
          <span className="s21-cov s21-cov--pixel">
            <Icon name="eye" size={13} />
            Your pixel only sees the visit
          </span>
        </div>

        {/* ---- the GrabOn event path (the dominant visual) ---- */}
        <div className="s21-path">
          {/* pre-pixel zone: real GrabOn surface backing four events */}
          <div className="s21-zone s21-zone--pre">
            <div className="s21-zone__top">
              <span className="s21-zone__tag">
                <Icon name="signal" size={14} />
                Before the pixel, on GrabOn
              </span>
              <MockTag>Illustrative event path</MockTag>
            </div>

            <div className="s21-surfaces">
              <Reveal from="up" distance={14} className="s21-surf">
                <img
                  src={ASSETS.grabonHome}
                  alt="GrabOn home, where a shopper discovers offers, a commerce-intent surface"
                  loading="lazy"
                />
              </Reveal>
              <Reveal from="up" distance={14} i={1} className="s21-surf">
                <img
                  src={ASSETS.grabonMerchant}
                  alt="GrabOn brand store page, where a shopper reveals a coupon and clicks out"
                  loading="lazy"
                  style={{ objectPosition: 'top center' }}
                />
              </Reveal>
            </div>

            <div className="s21-events">
              {events.map((e, i) => (
                <Reveal key={e.label} from="up" distance={12} i={i} className="s21-evwrap">
                  <button
                    type="button"
                    className="s21-event"
                    onClick={() => openEvent(e, 'pre')}
                  >
                    <span className="s21-event__n">{i + 1}</span>
                    <span className="s21-event__ico">
                      <Icon name={e.icon} size={18} />
                    </span>
                    <span className="s21-event__label">{e.label}</span>
                  </button>
                  {i < events.length - 1 && (
                    <span className="s21-link" aria-hidden="true">
                      <span className="s21-link__spark" style={{ ['--mk-i']: i } as CSSProperties} />
                    </span>
                  )}
                </Reveal>
              ))}
            </div>
          </div>

          {/* the single orange focal: the pixel boundary */}
          <div className="s21-boundary">
            <span className="s21-boundary__line" aria-hidden="true" />
            <span className="s21-boundary__badge mk-breathe">
              <Icon name="eye" size={15} />
              Pixel starts here
            </span>
            <span className="s21-boundary__sub mono">Brand-owned tracking begins</span>
          </div>

          {/* post-pixel zone: brand arrival, where the pixel finally fires */}
          <div className="s21-zone s21-zone--post">
            <div className="s21-zone__top">
              <span className="s21-zone__tag s21-zone__tag--pixel">
                <Icon name="eye" size={14} />
                What the pixel sees
              </span>
            </div>
            <button
              type="button"
              className="s21-arrival"
              onClick={() => openEvent(arrival, 'pixel')}
            >
              <span className="s21-arrival__ico">
                <Icon name={arrival.icon} size={24} />
              </span>
              <span className="s21-arrival__label">{arrival.label}</span>
              <span className="s21-arrival__sub">{arrival.surface}</span>
              <span className="s21-arrival__note">First touch the brand can measure on its own</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="s21-foot">
        <div className="s21-net">
          <EvidenceTag status="pending">Approved signals only</EvidenceTag>
          <p className="s21-net__text">{c.support}</p>
        </div>
      </footer>
    </Screen>
  );
}
