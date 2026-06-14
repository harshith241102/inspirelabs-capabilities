import { useState } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, Shot, EvidenceTag, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { useApp } from '../state/store';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { categoryOptions, type Category } from '../content/setup';
import { ASSETS } from '../lib/assets';

const categoryAsset: Partial<Record<Category, string>> = {
  fashion_beauty: ASSETS.grabonCatFashion,
  electronics_devices: ASSETS.catElectronics,
  travel_mobility: ASSETS.catTravel,
  entertainment_ott: ASSETS.catEntertainment,
  commerce_marketplace: ASSETS.grabonCategory,
};

const metricGroups = ['Traffic', 'Clicks', 'Coupon reveals', 'Leads', 'Orders', 'Sales', 'ROAS', 'Creator-wise', 'Partner-wise'];

export default function Screen34() {
  const c = copy[34];
  const drawer = useDrawer();
  const { setup, setupComplete } = useApp();
  const [selected, setSelected] = useState<Category>(setup.category);
  const selectedLabel = categoryOptions.find((o) => o.value === selected)?.label ?? 'Other';
  const asset = categoryAsset[selected];

  return (
    <Screen index={34} tone="light" id="prove-category" label="Prove by category">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="split">
          <div className="split__text" style={{ flexBasis: 420 }}>
            <span className="mini-cap" style={{ margin: 0 }}>
              {setupComplete ? 'Your category is highlighted from setup' : 'Select a category'}
            </span>
            <div className="metric-strip" style={{ marginTop: 10 }}>
              {categoryOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={`ecotag${o.value === selected ? ' is-active' : ''}`}
                  style={
                    o.value === selected
                      ? { borderColor: 'var(--orange)', color: 'var(--orange-text)' }
                      : undefined
                  }
                  onClick={() => setSelected(o.value)}
                >
                  {o.value === selected && <Icon name="check" size={13} />}
                  {o.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn--ghost"
              style={{ alignSelf: 'flex-start', marginTop: 4 }}
              onClick={() =>
                drawer.open({
                  id: `category-${selected}`,
                  kind: 'proof',
                  eyebrow: 'Category proof',
                  title: selectedLabel,
                  sections: [
                    { heading: 'Relevant surfaces', body: 'Commerce-intent surfaces, owned distribution, activation surfaces, and AudienceSeed where they fit the category.' },
                    { heading: 'Acceptable metric groups', items: metricGroups },
                    { heading: 'Available proof', body: 'Category visuals where captured. Final case proof is pending validation.' },
                    { heading: 'Missing proof', body: 'Case-study numbers, logos, and claims must be approved before client-facing use.' },
                  ],
                  evidence: [
                    { label: 'Category visual', status: asset ? 'approved' : 'unavailable' },
                    { label: 'Case proof', status: 'pending' },
                  ],
                })
              }
            >
              <Icon name="eye" size={16} />
              Relevant surfaces and metrics
            </button>
          </div>

          <div className="split__fig">
            <Reveal from="left" style={{ width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 18, color: 'var(--ink)' }}>{selectedLabel}</h3>
                  <EvidenceTag status="pending">Case proof pending</EvidenceTag>
                </div>
                {asset ? (
                  <div style={{ position: 'relative' }}>
                    <MockTag>Category surface · case proof pending</MockTag>
                    <Shot src={asset} alt={`${selectedLabel} category surface on GrabOn`} url="grabon.com" style={{ height: 'clamp(220px, 34vh, 320px)' }} />
                  </div>
                ) : (
                  <div
                    style={{
                      height: 'clamp(220px, 34vh, 320px)',
                      border: '1.5px dashed var(--c5)',
                      borderRadius: 14,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      background: 'var(--net)',
                      color: 'var(--grey)',
                    }}
                  >
                    <Icon name="grid" size={26} />
                    <span className="mono" style={{ fontSize: 11 }}>Category visual asset pending for {selectedLabel}</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <footer className="s-footer-row">
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={35} />
        </div>
      </footer>
    </Screen>
  );
}
