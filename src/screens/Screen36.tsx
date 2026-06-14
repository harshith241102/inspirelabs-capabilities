import { Screen } from '../primitives/Screen';
import { AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import {
  categoryOptions,
  priorityOptions,
  roadmapPersonalisation,
  capabilityMixByPriority,
  labelFor,
} from '../content/setup';

export default function Screen36() {
  const c = copy[36];
  const { setup, setupComplete, setSetupValue, markRoadmapClicked, goTo } = useApp();
  const catLabel = labelFor.category(setup.category);
  const pers = roadmapPersonalisation[setup.growth_priority];
  const mix = capabilityMixByPriority[setup.growth_priority];
  const surfaces = pers.emphasis.split(', ').map((s) => s.charAt(0).toUpperCase() + s.slice(1));
  const headline = setupComplete && setup.category !== 'other'
    ? `Build a dedicated growth partnership for ${catLabel}.`
    : c.fallback!;

  const panels = [
    { head: 'Capability mix', icon: 'layers' as const, items: mix, accent: true },
    { head: 'Relevant surfaces', icon: 'share' as const, items: surfaces },
    { head: 'Measurable commitments', icon: 'target' as const, items: pers.commitments },
    {
      head: 'Proof needed',
      icon: 'shield' as const,
      items: [`${catLabel} category proof, pending`, 'Validated case study, pending', 'Approved metrics and logos'],
    },
    {
      head: 'Discussion areas',
      icon: 'compass' as const,
      items: ['First activation path', 'Tracking and reporting setup', 'Review cadence'],
    },
  ];

  return (
    <Screen index={36} tone="light" id="roadmap" label="Tailored growth partnership roadmap">
      <header className="s-header">
        <Reveal from="up" distance={12}>
          <span className="eyebrow">{c.eyebrow}</span>
        </Reveal>
        <Reveal i={1} key={headline}>
          <h1 className="s-title s-title--wide">{headline}</h1>
        </Reveal>
        <Reveal i={2}>
          <p className="s-sub">{c.subheadline}</p>
        </Reveal>
        <Reveal i={3}>
          <div className="s-rule" />
        </Reveal>
      </header>

      <div className="s-body">
        <div className="roadmap">
          <Reveal className="roadmap__controls">
            <div className="roadmap__select">
              <label htmlFor="rm-cat">Selected category</label>
              <select id="rm-cat" value={setup.category} onChange={(e) => setSetupValue('category', e.target.value as never)}>
                {categoryOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="roadmap__select">
              <label htmlFor="rm-pri">Growth priority</label>
              <select id="rm-pri" value={setup.growth_priority} onChange={(e) => setSetupValue('growth_priority', e.target.value as never)}>
                {priorityOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <span className="hero2__fixed mono" style={{ marginLeft: 'auto' }}>
              <Icon name="refresh" size={14} />
              Edit to refresh the roadmap emphasis
            </span>
          </Reveal>

          <div className="roadmap__grid">
            {panels.map((p, i) => (
              <Reveal i={i} step={0.06} key={p.head} className={`roadmap__panel${p.accent ? ' roadmap__panel--accent' : ''}`}>
                <span className="roadmap__panel-head">
                  <Icon name={p.icon} size={14} />
                  {p.head}
                </span>
                <ul className="roadmap__list">
                  {p.items.map((it) => (
                    <li key={it}>
                      <Icon name="check" size={14} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={37} onClick={markRoadmapClicked} />
          <button type="button" className="btn btn--ghost" onClick={() => goTo(0)}>
            <Icon name="refresh" size={16} />
            Start over
          </button>
        </div>
      </footer>
    </Screen>
  );
}
