import { Screen } from '../primitives/Screen';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { AdvanceCta, NetBox, Shot } from '../primitives/ui';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import { openingTailoring } from '../content/setup';
import { ASSETS } from '../lib/assets';
import './hero.css';

const moduleTiles: { label: string; icon: IconName }[] = [
  { label: 'Commerce intent', icon: 'store' },
  { label: 'Distribution', icon: 'share' },
  { label: 'Shopper signals', icon: 'signal' },
  { label: 'AI Growth Studio', icon: 'spark' },
  { label: 'Measurable commitments', icon: 'target' },
];

export default function Screen02() {
  const c = copy[2];
  const { setup, setupComplete } = useApp();
  const tailored = openingTailoring[setup.familiarity];
  const headline = setupComplete ? tailored.headline : c.fallback!;
  const sub = setupComplete ? tailored.support : c.support!;

  return (
    <Screen index={2} tone="light" id="tailored-hero" label="Tailored hero">
      <header className="s-header">
        <Reveal from="up" distance={12}>
          <span className="eyebrow">{c.eyebrow}</span>
        </Reveal>
        <Reveal i={1} key={headline}>
          <h1 className="s-title s-title--wide">{headline}</h1>
        </Reveal>
        <Reveal i={2} key={sub}>
          <p className="s-sub">{sub}</p>
        </Reveal>
        <Reveal i={3}>
          <div className="s-rule" />
        </Reveal>
      </header>

      <div className="s-body">
        <div className="hero2">
          <Reveal className="hero2__surface" from="right">
            <span className="hero2__cap mono">Flagship commerce-intent surface</span>
            <Shot src={ASSETS.grabonHome} alt="GrabOn home, the flagship commerce-intent surface" url="grabon.com" />
          </Reveal>

          <div className="hero2__arrow" aria-hidden="true">
            <span className="hero2__arrow-label mono">expands into</span>
            <Icon name="arrow" size={26} />
          </div>

          <div className="hero2__modules">
            <span className="hero2__cap mono">The broader Inspirelabs growth system</span>
            {moduleTiles.map((m, i) => (
              <Reveal i={i} step={0.08} key={m.label} className="hero2__tile">
                <span className="hero2__tile-ico">
                  <Icon name={m.icon} size={18} />
                </span>
                <span className="hero2__tile-label">{m.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="hero2__fixed mono">
          <Icon name="layers" size={14} />
          The journey ahead is the same for every reader. Only the opening and roadmap adapt to your setup.
        </div>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={3} />
        </div>
      </footer>
    </Screen>
  );
}
