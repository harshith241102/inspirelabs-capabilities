import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const offers: { label: string; icon: IconName }[] = [
  { label: 'Percentage discount', icon: 'tag' },
  { label: 'Flat discount', icon: 'coupon' },
  { label: 'Free delivery', icon: 'send' },
  { label: 'Minimum basket', icon: 'store' },
  { label: 'Combo offer', icon: 'layers' },
  { label: 'Payment or bank offer', icon: 'shield' },
];

export default function Screen23() {
  const c = copy[23];
  const drawer = useDrawer();

  return (
    <Screen index={23} tone="light" id="offer-lab" label="Offer Lab">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Reveal>
          <span className="mini-cap">Offer response board · responses shown as pending, never invented</span>
        </Reveal>
        <div className="offer-board">
          {offers.map((offer, i) => (
            <Reveal i={i} step={0.05} key={offer.label}>
              <button
                type="button"
                className={`offer-card${i === 0 ? ' offer-card--accent' : ''}`}
                style={{ width: '100%' }}
                onClick={() =>
                  drawer.open({
                    id: `offer-${offer.label}`,
                    kind: 'metric',
                    eyebrow: 'Offer format',
                    title: offer.label,
                    sections: [
                      { heading: 'What this measures', body: 'How strongly shoppers respond to this offer format before larger budgets are committed.' },
                      { heading: 'Required to read it', items: ['Sufficient sample size', 'Observed response', 'Recommended next action'] },
                      { heading: 'What not to assume', body: 'No invented winner and no invented uplift. Response guides the next action, it does not guarantee the outcome.' },
                    ],
                    evidence: [{ label: 'Observed response', status: 'pending' }],
                  })
                }
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span className="fcard__ico" style={{ width: 32, height: 32 }}>
                    <Icon name={offer.icon} size={16} />
                  </span>
                  <span className="offer-card__label">{offer.label}</span>
                  {i === 0 && <span className="chip chip--accent" style={{ marginLeft: 'auto' }}>Example</span>}
                </span>
                <span className="offer-card__track" />
                <span className="offer-card__resp">Response pending validation</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={24} />
        </div>
      </footer>
    </Screen>
  );
}
