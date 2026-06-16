import { Screen } from '../primitives/Screen';
import { AdvanceCta } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { ASSETS } from '../lib/assets';
import { copy } from '../content/copy';
import './cover.css';

const proof = [
  { v: '$4.8B', l: 'GMV influenced', accent: true },
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
                <span className="cover__card-title">Growth that compounds, not resets</span>
              </div>
              <div className="cover__chartwrap">
                <svg
                  className="cover__chart"
                  viewBox="0 0 540 184"
                  role="img"
                  aria-label="Inspirelabs growth rises and compounds while rented agencies stay flat"
                >
                  {/* Rented agencies: a flat line that stays low */}
                  <path
                    d="M40,150 C160,148 300,147 486,144"
                    fill="none"
                    stroke="#aab0bb"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                    strokeLinecap="round"
                  />
                  <circle cx="486" cy="144" r="4.5" fill="#aab0bb" />

                  {/* Inspirelabs: a line that rises and pulls away */}
                  <path
                    d="M40,150 C190,144 330,108 492,32"
                    fill="none"
                    stroke="#ff7a45"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                  <circle cx="492" cy="32" r="6.5" fill="#ff7a45" />
                  <path d="M492,32 l-9,2 M492,32 l-2,9" stroke="#ff7a45" strokeWidth="3" fill="none" strokeLinecap="round" />

                  <text x="486" y="22" textAnchor="end" className="cover__chart-lblO">Inspirelabs</text>
                  <text x="478" y="168" textAnchor="end" className="cover__chart-lblG">Rented agencies</text>
                </svg>
              </div>
              <div className="cover__proof">
                {proof.map((p) => (
                  <div className={`cover__stat${p.accent ? ' is-accent' : ''}`} key={p.l}>
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
