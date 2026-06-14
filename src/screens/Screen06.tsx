import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useApp } from '../state/store';
import { copy } from '../content/copy';

const blocks: { step: string; label: string; icon: IconName; to: number }[] = [
  { step: '01', label: 'Capture Commerce Intent', icon: 'store', to: 7 },
  { step: '02', label: 'Distribute Demand', icon: 'share', to: 11 },
  { step: '03', label: 'AudienceSeed Shopper Signals', icon: 'signal', to: 20 },
  { step: '04', label: 'AI Growth Studio', icon: 'spark', to: 26 },
  { step: '05', label: 'Growth Commitments', icon: 'target', to: 32 },
];

export default function Screen06() {
  const c = copy[6];
  const { goTo } = useApp();

  return (
    <Screen index={6} tone="light" id="overview" label="Growth system overview">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="overview">
          <div className="overview__rail">
            {blocks.map((b, i) => (
              <div className="overview__block" key={b.label}>
                <Reveal i={i} step={0.08} from="right" style={{ flex: 1, minWidth: 0, display: 'flex' }}>
                  <button type="button" className="overview__card" onClick={() => goTo(b.to)}>
                    <span className="overview__step mono">{b.step}</span>
                    <span className="overview__ico">
                      <Icon name={b.icon} size={20} />
                    </span>
                    <span className="overview__title">{b.label}</span>
                  </button>
                </Reveal>
                {i < blocks.length - 1 && (
                  <span className="overview__link" aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <Reveal i={5}>
            <button
              type="button"
              className="overview__proof"
              onClick={() => goTo(34)}
              style={{ width: '100%' }}
            >
              <Icon name="shield" size={18} style={{ color: 'var(--orange)' }} />
              <span className="overview__proof-label">Category Proof</span>
              <span className="overview__proof-sub">
                sits around the system as evidence, not as a separate delivery capability
              </span>
            </button>
          </Reveal>
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={7} />
        </div>
      </footer>
    </Screen>
  );
}
