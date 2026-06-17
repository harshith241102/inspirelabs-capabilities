import { useEffect, useState } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, EvidenceTag, MockTag, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { useApp } from '../state/store';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { categoryOptions, type Category } from '../content/setup';
import { ASSETS } from '../lib/assets';
import './s34.css';

/* Every category resolves to a real surface visual. Categories without their own
   capture map to the closest available GrabOn surface and carry an explicit gap
   note, so the proof board never shows a blank asset-pending panel. */
interface CategoryProof {
  src: string;
  url: string;
  /** When set, the shown visual is the closest available proof, not an exact one. */
  gap?: string;
  metrics: string[];
}

const proofByCategory: Record<Category, CategoryProof> = {
  fashion_beauty: {
    src: ASSETS.grabonCatFashion,
    url: 'grabon.com/fashion',
    metrics: ['Visits', 'Coupon reveals', 'Outbound clicks', 'Orders', 'Sales'],
  },
  commerce_marketplace: {
    src: ASSETS.grabonCategory,
    url: 'grabon.com/stores',
    metrics: ['Visits', 'Clicks', 'Coupon reveals', 'Orders', 'Sales', 'ROAS'],
  },
  electronics_devices: {
    src: ASSETS.catElectronics,
    url: 'grabon.com/electronics',
    metrics: ['Visits', 'Clicks', 'Coupon reveals', 'Orders', 'Sales'],
  },
  travel_mobility: {
    src: ASSETS.catTravel,
    url: 'grabon.com/travel',
    metrics: ['Visits', 'Clicks', 'Leads', 'Bookings', 'Sales'],
  },
  entertainment_ott: {
    src: ASSETS.catEntertainment,
    url: 'grabon.com/entertainment',
    metrics: ['Visits', 'Clicks', 'Coupon reveals', 'Signups', 'Sales'],
  },
  bfsi_fintech: {
    src: ASSETS.grabonCategory,
    url: 'grabon.com/stores',
    gap: 'Closest available surface shown. A BFSI and Fintech proof capture is pending validation.',
    metrics: ['Visits', 'Clicks', 'Leads', 'Signups', 'CPA'],
  },
  gaming_rummy: {
    src: ASSETS.catEntertainment,
    url: 'grabon.com/entertainment',
    gap: 'Closest available surface shown. A Gaming and Rummy proof capture is pending validation.',
    metrics: ['Visits', 'Clicks', 'Signups', 'Registrations', 'CPA'],
  },
  kids_family: {
    src: ASSETS.grabonCatFashion,
    url: 'grabon.com/fashion',
    gap: 'Closest available surface shown. A Kids and Family proof capture is pending validation.',
    metrics: ['Visits', 'Coupon reveals', 'Outbound clicks', 'Orders', 'Sales'],
  },
  other: {
    src: ASSETS.grabonCategory,
    url: 'grabon.com/stores',
    gap: 'Closest available surface shown. A category-specific proof capture is pending validation.',
    metrics: ['Visits', 'Clicks', 'Coupon reveals', 'Orders', 'Sales'],
  },
};

const allMetricGroups = ['Traffic', 'Clicks', 'Coupon reveals', 'Leads', 'Orders', 'Sales', 'ROAS', 'Creator-wise', 'Partner-wise'];

/* Default to the setup category only when it has its own visual; otherwise open
   on the nearest category that does, so the hero is always a real surface. */
function resolveInitial(category: Category): Category {
  return proofByCategory[category].gap ? 'commerce_marketplace' : category;
}

export default function Screen34() {
  const c = copy[34];
  const drawer = useDrawer();
  const { setup, setupComplete } = useApp();
  const [selected, setSelected] = useState<Category>(
    setupComplete ? resolveInitial(setup.category) : 'commerce_marketplace',
  );

  // All screens mount at page load, before setup is completed, so sync the
  // proof lens to the setup category once setup is done (or changed). A later
  // manual category pick is preserved (this only runs when setup changes).
  useEffect(() => {
    if (setupComplete) setSelected(resolveInitial(setup.category));
  }, [setupComplete, setup.category]);

  const selectedLabel = categoryOptions.find((o) => o.value === selected)?.label ?? 'Other';
  const proof = proofByCategory[selected];
  const isSetupCategory = setupComplete && setup.category === selected;

  const openProof = () =>
    drawer.open({
      id: `category-${selected}`,
      kind: 'proof',
      eyebrow: 'Category proof',
      title: selectedLabel,
      sections: [
        { heading: 'Relevant surfaces', body: 'Commerce-intent surfaces, owned distribution, activation surfaces, and AudienceSeed where they fit the category.' },
        { heading: 'Acceptable metric groups', items: allMetricGroups },
        { heading: 'Available proof', body: proof.gap ? proof.gap : 'A category surface visual is available. Final case proof is pending validation.' },
        { heading: 'Missing proof', body: 'Case-study numbers, logos, and claims must be approved before client-facing use.' },
      ],
      evidence: [
        { label: 'Category visual', status: proof.gap ? 'pending' : 'approved' },
        { label: 'Case proof', status: 'pending' },
      ],
    });

  return (
    <Screen index={34} tone="light" id="prove-category" label="Prove by category">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s34-body">
        {/* Dominant visual: the selected-category surface in a browser frame */}
        <Reveal from="left" className="s34-stage">
          <div className="s34-shot">
            <div className="s34-shot__bar">
              <i />
              <i />
              <i />
              <span className="s34-shot__url">{proof.url}</span>
              <span className="s34-shot__logo">
                <img src={ASSETS.grabonLogo} alt="GrabOn" />
              </span>
            </div>
            <div className="s34-shot__view">
              <img
                key={selected}
                src={proof.src}
                alt={`${selectedLabel} category surface on GrabOn`}
                loading="lazy"
              />
              <div className="s34-shot__tag">
                <MockTag>Category surface · case proof pending</MockTag>
              </div>
              <div className="s34-shot__plate">
                <span className="s34-shot__plate-scan" aria-hidden="true" />
                <span className="s34-shot__plate-cat">{selectedLabel}</span>
                <span className="s34-shot__plate-sys">Same system. Category-specific proof.</span>
              </div>
            </div>
          </div>
          {proof.gap && (
            <div className="s34-gap">
              <Icon name="signal" size={16} />
              <span>{proof.gap}</span>
            </div>
          )}
        </Reveal>

        {/* Proof-control rail: pick category, read available/missing proof + metrics */}
        <aside className="s34-rail">
          <div className="s34-rail__top">
            <span className="s34-rail__cap">
              {setupComplete ? 'Selected category' : 'Select a category'}
            </span>
            <div className="s34-cats" role="list">
              {categoryOptions.map((o) => {
                const active = o.value === selected;
                const isYours = setupComplete && setup.category === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="listitem"
                    className={`s34-cat mk-hover${active ? ' is-active' : ''}`}
                    aria-pressed={active}
                    onClick={() => setSelected(o.value)}
                  >
                    {active && <Icon name="check" size={13} className="s34-cat__check" />}
                    <span>{o.label}</span>
                    {isYours && !active && <span className="s34-cat__you">You</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="s34-status">
            <div className="s34-status__row">
              <span className="s34-status__label">
                <Icon name="check" size={15} />
                Category visual
              </span>
              <EvidenceTag status={proof.gap ? 'pending' : 'approved'} />
            </div>
            <div className="s34-status__row">
              <span className="s34-status__label">
                <Icon name="shield" size={15} />
                Case proof
              </span>
              <EvidenceTag status="pending" />
            </div>
          </div>

          <div className="s34-metrics">
            <span className="s34-metrics__head">
              Acceptable metric groups
              {isSetupCategory && <span className="s34-metrics__tail">for {selectedLabel}</span>}
            </span>
            <div className="s34-metrics__chips">
              {proof.metrics.map((m) => (
                <span key={m} className="s34-metric mk-hover">{m}</span>
              ))}
            </div>
          </div>

          <button type="button" className="s34-more" onClick={openProof}>
            <Icon name="eye" size={16} />
            <span>Relevant surfaces and metrics</span>
            <Icon name="arrow" size={15} className="s34-more__arrow" />
          </button>
        </aside>
      </div>

      <footer className="s34-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
