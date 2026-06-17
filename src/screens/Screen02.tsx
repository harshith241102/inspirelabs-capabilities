import { Screen } from '../primitives/Screen';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { AnnotatedShot } from '../primitives/deck';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import { openingTailoring } from '../content/setup';
import { ASSETS } from '../lib/assets';
import './s02.css';

/* The broader Inspirelabs system that GrabOn expands into. This expansion is
   FIXED for every reader; only the intro headline + support copy adapt (by
   familiarity). Commerce intent is the fixed anchor focal because GrabOn is the
   commerce-intent surface the system expands from. */
type ModuleKey = 'commerce' | 'distribution' | 'signals' | 'studio' | 'commitments';

const moduleTiles: { key: ModuleKey; label: string; sub: string; icon: IconName }[] = [
  { key: 'commerce', label: 'Commerce intent', sub: 'Reach shoppers as decisions form', icon: 'store' },
  { key: 'distribution', label: 'Distribution', sub: 'Owned and activation surfaces', icon: 'share' },
  { key: 'signals', label: 'Shopper signals', sub: 'AudienceSeed by Inspirelabs', icon: 'signal' },
  { key: 'studio', label: 'AI Growth Studio', sub: 'Human-reviewed agents', icon: 'spark' },
  { key: 'commitments', label: 'Measurable commitments', sub: 'Accountable growth partnership', icon: 'target' },
];

export default function Screen02() {
  const c = copy[2];
  const { setup, setupComplete } = useApp();
  const tailored = openingTailoring[setup.familiarity];
  // Only the intro headline + support adapt, and only by familiarity.
  const headline = setupComplete ? tailored.headline : c.fallback!;
  const sub = setupComplete ? tailored.support : c.support!;

  return (
    <Screen index={2} tone="light" id="tailored-hero" label="Tailored hero">
      <header className="s-header s02-head">
        <Reveal from="up" distance={12}>
          <span className="eyebrow">{c.eyebrow}</span>
        </Reveal>
        <Reveal i={1} key={headline}>
          <h1 className="s02-title">{headline}</h1>
        </Reveal>
        <Reveal i={2} key={sub}>
          <p className="s02-sub">{sub}</p>
        </Reveal>
      </header>

      <div className="s02-body">
        {/* Dominant visual: the flagship GrabOn surface, promoted to a large proof object */}
        <Reveal className="s02-hero" from="up" distance={18}>
          <AnnotatedShot
            src={ASSETS.grabonHome}
            alt="GrabOn home, the flagship commerce-intent surface where shopper decisions form"
            url="grabon.com"
            logo={{ src: ASSETS.grabonLogo, alt: 'GrabOn' }}
            objectPosition="top center"
            style={{ height: '100%' }}
          />
          <span className="s02-hero__cap mono">
            <Icon name="store" size={14} />
            Flagship commerce-intent surface and signal source
          </span>
        </Reveal>

        {/* Expansion: the broader Inspirelabs growth system GrabOn extends into */}
        <aside className="s02-expand">
          <div className="s02-expand__lead">
            <span className="s02-expand__kicker mono">Expands into the Inspirelabs system</span>
            <span className="s02-expand__note">
              The same five-part system for every reader.
            </span>
          </div>

          <div className="s02-mods">
            {/* In-slide flow: an expansion pulse travels down the spine from the
                commerce anchor (GrabOn) into the rest of the system. Decorative
                only; base-hidden + export/reduced-motion guarded in s02.css. */}
            <span className="s02-mods__rail" aria-hidden="true">
              <span className="s02-mods__pulse" />
            </span>
            {moduleTiles.map((m, i) => {
              // Fixed anchor focal for every reader: commerce intent (GrabOn).
              const anchor = m.key === 'commerce';
              return (
                <Reveal
                  key={m.key}
                  i={i}
                  step={0.06}
                  from="right"
                  distance={14}
                  className={`s02-mod mk-hover${anchor ? ' s02-mod--on' : ''}`}
                >
                  <span className={`s02-mod__ico${anchor ? ' mk-breathe' : ''}`}>
                    <Icon name={m.icon} size={19} />
                  </span>
                  <span className="s02-mod__txt">
                    <span className="s02-mod__label">{m.label}</span>
                    <span className="s02-mod__sub">{m.sub}</span>
                  </span>
                </Reveal>
              );
            })}
          </div>
        </aside>
      </div>

      <footer className="s02-foot">
        <p className="s02-fixed mono">
          <Icon name="layers" size={14} />
          The walkthrough is the same for every reader. Only this intro and the proof-by-category slides adapt to your setup.
        </p>
      </footer>
    </Screen>
  );
}
