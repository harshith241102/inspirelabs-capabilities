import { Screen } from '../primitives/Screen';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { AdvanceCta } from '../primitives/ui';
import { AnnotatedShot } from '../primitives/deck';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import { openingTailoring, labelFor, type GrowthPriority } from '../content/setup';
import { ASSETS } from '../lib/assets';
import './s02.css';

/* The broader Inspirelabs system that GrabOn expands into. The setup growth
   priority only sets which module is emphasised (the single orange focal);
   no module is ever suppressed. */
type ModuleKey = 'commerce' | 'distribution' | 'signals' | 'studio' | 'commitments';

const moduleTiles: { key: ModuleKey; label: string; sub: string; icon: IconName }[] = [
  { key: 'commerce', label: 'Commerce intent', sub: 'Reach shoppers as decisions form', icon: 'store' },
  { key: 'distribution', label: 'Distribution', sub: 'Owned and activation surfaces', icon: 'share' },
  { key: 'signals', label: 'Shopper signals', sub: 'AudienceSeed by Inspirelabs', icon: 'signal' },
  { key: 'studio', label: 'AI Growth Studio', sub: 'Human-reviewed agents', icon: 'spark' },
  { key: 'commitments', label: 'Measurable commitments', sub: 'Accountable growth partnership', icon: 'target' },
];

/* Which expansion module the reader's growth priority leans on first. */
const emphasisByPriority: Record<GrowthPriority, ModuleKey> = {
  sales_orders: 'commerce',
  leads_signups: 'distribution',
  app_installs_registrations: 'distribution',
  offer_led_acquisition: 'signals',
  organic_visibility: 'studio',
  creator_influencer_growth: 'distribution',
  partner_ecosystem_expansion: 'distribution',
  reduce_execution_overhead: 'studio',
  not_sure: 'commerce',
};

export default function Screen02() {
  const c = copy[2];
  const { setup, setupComplete } = useApp();
  const tailored = openingTailoring[setup.familiarity];
  const headline = setupComplete ? tailored.headline : c.fallback!;
  const sub = setupComplete ? tailored.support : c.support!;

  const focus = emphasisByPriority[setup.growth_priority];
  const tailorLine = setupComplete
    ? `Tailored to ${labelFor.category(setup.category)}, focused on ${labelFor.priority(setup.growth_priority).toLowerCase()}.`
    : 'Set up your brand context and the opening adapts to you.';

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
            <span className="s02-tailor" key={tailorLine}>
              <Icon name="target" size={13} />
              {tailorLine}
            </span>
          </div>

          <div className="s02-mods">
            {moduleTiles.map((m, i) => {
              const on = m.key === focus;
              return (
                <Reveal
                  key={m.key}
                  i={i}
                  step={0.06}
                  from="right"
                  distance={14}
                  className={`s02-mod${on ? ' s02-mod--on' : ''}`}
                >
                  <span className="s02-mod__ico">
                    <Icon name={m.icon} size={19} />
                  </span>
                  <span className="s02-mod__txt">
                    <span className="s02-mod__label">{m.label}</span>
                    <span className="s02-mod__sub">{m.sub}</span>
                  </span>
                  {on && <span className="s02-mod__flag mono">For your priority</span>}
                </Reveal>
              );
            })}
          </div>
        </aside>
      </div>

      <footer className="s02-foot">
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={3} />
        </div>
        <p className="s02-fixed mono">
          <Icon name="layers" size={14} />
          The journey ahead is the same for every reader. Only the opening and roadmap adapt to your setup.
        </p>
      </footer>
    </Screen>
  );
}
