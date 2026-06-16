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

const modules: { label: string; sub: string; icon: IconName }[] = [
  { label: 'Reach ready buyers', sub: 'Show up where buying starts', icon: 'target' },
  { label: 'Distribution', sub: 'Spread reach across your channels', icon: 'share' },
  { label: 'AudienceSeed', sub: 'Read buying signals before the visit', icon: 'signal' },
  { label: 'AI Growth Studio', sub: 'AI agents that scale execution', icon: 'spark' },
  { label: 'Growth commitments', sub: 'Measurable goals and reviews', icon: 'shield' },
];

const surfaces: { name: string; sub: string; logo: string; lg?: boolean }[] = [
  { name: 'GrabOn', sub: 'India · US · UAE · Canada', logo: ASSETS.grabonLogo, lg: true },
  { name: 'GrabCash', sub: 'endorser-led', logo: ASSETS.grabcashLogo },
  { name: 'GrabShare', sub: 'creator-led', logo: ASSETS.grabshareLogo },
  { name: 'Alternatives', sub: 'software buyers', logo: ASSETS.alternativesLogo },
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
                <span className="cover__card-eyebrow mono">Where your customers already are</span>
                <span className="cover__card-title">All of it runs on one system</span>
              </div>
              <div className="cover__system">
                <div className="cover__surfaces">
                  {surfaces.map((s) => (
                    <div className="cover__surface" key={s.name}>
                      <img
                        className={`cover__surface-logo${s.lg ? ' cover__surface-logo--lg' : ''}`}
                        src={s.logo}
                        alt={s.name}
                        loading="eager"
                      />
                      <span className="cover__surface-sub">{s.sub}</span>
                    </div>
                  ))}
                </div>

                <span className="cover__system-link mono">
                  <Icon name="arrowDown" size={13} />
                  all run on
                </span>

                <div className="cover__platform">
                  <span className="cover__platform-mark" aria-hidden="true">
                    <img src={ASSETS.symbolInkCrop} alt="" />
                  </span>
                  <div className="cover__platform-id">
                    <span className="cover__platform-name">Inspirelabs</span>
                    <span className="cover__platform-sub">One growth system behind every surface</span>
                  </div>
                  <span className="cover__platform-out mono">
                    <Icon name="arrow" size={15} />
                    your brand, growing
                  </span>
                </div>
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
            <div className="cover__chip" key={m.label}>
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
