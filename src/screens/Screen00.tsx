import { Screen } from '../primitives/Screen';
import { AdvanceCta } from '../primitives/ui';
import { AnnotatedShot } from '../primitives/deck';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { ASSETS } from '../lib/assets';
import { copy } from '../content/copy';
import './cover.css';

const modules: { label: string; sub: string; icon: IconName; hub?: boolean }[] = [
  { label: 'GrabOn', sub: 'Commerce-intent surface', icon: 'store', hub: true },
  { label: 'Distribution', sub: 'Owned and activation', icon: 'share' },
  { label: 'AudienceSeed', sub: 'Shopper intent signals', icon: 'signal' },
  { label: 'AI Growth Studio', sub: 'Human-reviewed agents', icon: 'spark' },
  { label: 'Growth commitments', sub: 'Measurable, accountable', icon: 'target' },
];

export default function Screen00() {
  const c = copy[0];

  return (
    <Screen index={0} tone="dark" id="cover" label="Cover">
      <div className="cover">
        <div className="cover__top">
          <img className="cover__lockup" src={ASSETS.wordmarkDark} alt="Inspirelabs" loading="eager" fetchPriority="high" />
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
              <div className="cta-row" style={{ marginTop: 12 }}>
                <AdvanceCta label={c.cta} to={1} />
                <span className="cover__hint mono">3 quick questions, 5 minute read</span>
              </div>
            </Reveal>
          </div>

          <Reveal from="right" distance={28} className="cover__hero">
            <AnnotatedShot
              src={ASSETS.grabonHome}
              alt="GrabOn home, a flagship commerce-intent surface where shopper decisions form"
              url="grabon.com"
              logo={{ src: ASSETS.grabonLogo, alt: 'GrabOn' }}
              objectPosition="top center"
              style={{ height: '100%' }}
            />
            <span className="cover__herocap mono">GrabOn, the flagship commerce-intent surface and signal source</span>
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
