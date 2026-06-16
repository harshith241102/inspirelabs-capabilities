import { Screen } from '../primitives/Screen';
import { AdvanceCta } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { ASSETS } from '../lib/assets';
import { copy } from '../content/copy';
import './cover.css';

const proof = [
  { v: '76M+', l: 'users' },
  { v: '3,800+', l: 'brands' },
  { v: '12+', l: 'years' },
];

const modules: { label: string; sub: string; icon: IconName; hub?: boolean }[] = [
  { label: 'GrabOn', sub: 'Where shoppers are ready to buy', icon: 'store', hub: true },
  { label: 'Distribution', sub: 'Your own channels and placements', icon: 'share' },
  { label: 'AudienceSeed', sub: 'Shopper buying signals', icon: 'signal' },
  { label: 'AI Growth Studio', sub: 'Human-reviewed agents', icon: 'spark' },
  { label: 'Growth commitments', sub: 'Measurable, accountable', icon: 'target' },
];

export default function Screen00() {
  const c = copy[0];

  return (
    <Screen index={0} tone="light" id="cover" label="Cover">
      <div className="cover">
        <div className="cover__top">
          <img
            className="cover__lockup"
            src={ASSETS.lockupInkTagline}
            alt="Inspirelabs, always building"
            loading="eager"
            fetchPriority="high"
          />
          <span className="cover__kicker mono">Client capabilities</span>
        </div>

        <div className="cover__main">
          <div className="cover__copy">
            <Reveal from="up" distance={14}>
              <span className="eyebrow">The growth system behind GrabOn</span>
            </Reveal>
            <Reveal i={1}>
              <h1 className="cover__title">{c.headline}</h1>
            </Reveal>
            <Reveal i={2}>
              <p className="cover__sub">{c.subheadline}</p>
            </Reveal>
            <Reveal i={3}>
              <p className="cover__support">{c.support}</p>
            </Reveal>
            <Reveal i={4}>
              <div className="cta-row" style={{ marginTop: 8 }}>
                <AdvanceCta label={c.cta} to={1} />
                <span className="cover__hint mono">3 quick questions, 5 minute read</span>
              </div>
            </Reveal>
          </div>

          <Reveal from="right" distance={28} className="cover__hero">
            <div className="cover__card">
              <div className="cover__card-head">
                <span className="cover__card-title">Proven at scale</span>
              </div>
              <div className="cover__proof-lead">
                <span className="cover__proof-num">$4.8B</span>
                <span className="cover__proof-cap">GMV influenced across the network, every year.</span>
              </div>
              <div className="cover__proof">
                {proof.map((p) => (
                  <div className="cover__stat" key={p.l}>
                    <span className="cover__stat-v">{p.v}</span>
                    <span className="cover__stat-l">{p.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal i={5} className="cover__strip">
          {modules.map((m) => (
            <div className={`cover__chip${m.hub ? ' cover__chip--hub' : ''}`} key={m.label}>
              <span className="cover__chip-ico">
                <Icon name={m.icon} size={18} />
              </span>
              <div>
                <span className="cover__chip-label">{m.label}</span>
                <span className="cover__chip-sub">{m.sub}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Screen>
  );
}
