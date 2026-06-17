import { useState, type CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, MockTag, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import './s31.css';

/* Screen 31 - Custom growth agents (control-room: intake / scoping canvas).
   Dominant visual: ONE custom-agent scope console. A brand picks a recurring
   problem on the left; the console on the right scopes that agent across the
   six fixed fields (recurring task, input source, output format, frequency,
   approval owner, measurable output). The approval-owner gate is the single
   orange focal, holding the product-reality guardrail: a human owns sign-off,
   never autonomous launch, never guaranteed ROI. All scope content is
   illustrative, never an invented metric or delivery promise. */

type Scope = {
  task: string;
  input: string;
  output: string;
  frequency: string;
  owner: string;
  measure: string;
};

type Problem = {
  label: string;
  icon: IconName;
  blurb: string;
  scope: Scope;
};

/* Six recurring problems from copy[31].cards, each pre-scoping the console. */
const problems: Problem[] = [
  {
    label: 'Report automation',
    icon: 'doc',
    blurb: 'Recurring report preparation',
    scope: {
      task: 'Prepare the recurring performance report',
      input: 'Connected reporting sources and the report template',
      output: 'Draft report in the agreed format',
      frequency: 'Weekly or monthly cycle',
      owner: 'Growth lead signs off before it is shared',
      measure: 'Hours saved and on-time report delivery',
    },
  },
  {
    label: 'Offer variants',
    icon: 'flask',
    blurb: 'Offer variant generation',
    scope: {
      task: 'Generate offer angle and format variants',
      input: 'Objective, approved claims, and offer rules',
      output: 'Review-ready offer variant set',
      frequency: 'Per campaign or seasonal push',
      owner: 'Brand owner approves claims and offers',
      measure: 'Variants tested per cycle',
    },
  },
  {
    label: 'Category briefs',
    icon: 'layers',
    blurb: 'Category content briefing',
    scope: {
      task: 'Turn category inputs into content briefs',
      input: 'Category, competitor set, and tone of voice',
      output: 'Briefs ready for the content workflow',
      frequency: 'Recurring content planning cadence',
      owner: 'Content lead reviews before briefing',
      measure: 'Briefs prepared per cycle',
    },
  },
  {
    label: 'Creator briefs',
    icon: 'creator',
    blurb: 'Creator brief generation',
    scope: {
      task: 'Draft creator briefs and product angles',
      input: 'Products, creator context, and brand guardrails',
      output: 'Approval-ready creator brief variants',
      frequency: 'Per creator push or campaign',
      owner: 'Brand owner approves framing and claims',
      measure: 'Briefs ready per creator cycle',
    },
  },
  {
    label: 'Competitive visibility',
    icon: 'eye',
    blurb: 'Competitive visibility tracking',
    scope: {
      task: 'Track competitive search and offer visibility',
      input: 'Competitor set and tracked keywords',
      output: 'Visibility read with flagged movements',
      frequency: 'Recurring monitoring window',
      owner: 'Growth lead reviews flags before action',
      measure: 'Visibility shifts surfaced per cycle',
    },
  },
  {
    label: 'Performance summaries',
    icon: 'chart',
    blurb: 'Campaign performance summarisation',
    scope: {
      task: 'Summarise live campaign performance',
      input: 'Connected campaign and channel reporting',
      output: 'Channel-wise summary with next actions',
      frequency: 'Each reporting cycle',
      owner: 'Growth lead approves before next action',
      measure: 'Faster reads and decisions per cycle',
    },
  },
];

/* The six fixed scope fields. The approval-owner row is the orange focal
   (carries the human-review guardrail) and the measurable-output row closes
   the loop without inventing a number. */
const fields: { key: keyof Scope; label: string; icon: IconName; gate?: boolean; close?: boolean }[] = [
  { key: 'task', label: 'Recurring task', icon: 'cycle' },
  { key: 'input', label: 'Input source', icon: 'doc' },
  { key: 'output', label: 'Output format', icon: 'layers' },
  { key: 'frequency', label: 'Frequency', icon: 'calendar' },
  { key: 'owner', label: 'Approval owner', icon: 'shield', gate: true },
  { key: 'measure', label: 'Measurable output', icon: 'target', close: true },
];

export default function Screen31() {
  const c = copy[31];
  const drawer = useDrawer();
  const [active, setActive] = useState(0);
  const p = problems[active];

  const explore = () =>
    drawer.open({
      id: 'custom-agent-intake',
      kind: 'ai',
      eyebrow: 'Custom growth agent',
      title: 'Scope a custom agent exploration',
      sections: [
        {
          heading: 'Tell us',
          items: ['The recurring task', 'The input source', 'The output format', 'The frequency', 'The approval owner'],
        },
        { heading: 'What this is not', body: 'Not an unlimited customisation promise and not an immediate delivery claim.' },
      ],
      requiredInput: 'A clear recurring problem and the data it needs.',
      humanReview: 'Custom agents are scoped around recurring problems and keep a human review step.',
    });

  return (
    <Screen index={31} tone="light" id="custom-agents" label="Custom growth agents">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s31-body">
        <Reveal from="up" distance={18} className="s31-consolewrap">
          <div className="s31-console">
            {/* console status bar */}
            <div className="s31-console__bar">
              <span className="s31-console__badge">
                <Icon name="bolt" size={14} />
                Custom agent scope
              </span>
              <div className="s31-console__titles">
                <span className="s31-console__title">Shape an agent around a recurring problem</span>
                <span className="s31-console__sub">Pick a starting point, then scope the task, inputs, output, cadence, owner, and measure</span>
              </div>
              <span className="s31-console__tag">
                <MockTag>Illustrative scope</MockTag>
              </span>
            </div>

            <div className="s31-console__grid">
              {/* LEFT - recurring problems (starting points that drive the scope) */}
              <aside className="s31-pick" aria-label="Recurring problems">
                <header className="s31-pick__head">
                  <span className="s31-pick__label">Recurring problems</span>
                  <span className="s31-pick__hint mono">Start here</span>
                </header>
                <div className="s31-pick__list" role="list">
                  {problems.map((it, i) => (
                    <Reveal i={i} step={0.03} key={it.label}>
                      <button
                        type="button"
                        role="listitem"
                        aria-pressed={i === active}
                        className={`s31-prob${i === active ? ' is-active' : ''}`}
                        onClick={() => setActive(i)}
                      >
                        <span className="s31-prob__ico">
                          <Icon name={it.icon} size={17} />
                        </span>
                        <span className="s31-prob__main">
                          <span className="s31-prob__name">{it.label}</span>
                          <span className="s31-prob__blurb">{it.blurb}</span>
                        </span>
                        <Icon name="arrow" size={15} className="s31-prob__cue" />
                      </button>
                    </Reveal>
                  ))}
                </div>
              </aside>

              {/* RIGHT - the scope worksheet (the one proof object) */}
              <section className="s31-scope" aria-label={`Scope for ${p.label}`}>
                <header className="s31-scope__head">
                  <span className="s31-scope__name">{p.label}</span>
                  <span className="s31-scope__route mono">Custom agent scope</span>
                </header>

                <div className="s31-fields">
                  {fields.map((f, i) => (
                    <div
                      key={f.key}
                      className={`s31-field mk-hover${f.gate ? ' is-gate' : ''}${f.close ? ' is-close' : ''}`}
                      style={{ ['--mk-i']: i } as CSSProperties}
                    >
                      <span className="s31-field__ico">
                        <Icon name={f.icon} size={16} />
                      </span>
                      <span className="s31-field__main">
                        <span className="s31-field__label mono">{f.label}</span>
                        <span className="s31-field__value">{p.scope[f.key]}</span>
                      </span>
                      {/* scope-fill sweep: each field lights left-to-right as the
                          agent is scoped, terminating on the orange gate row */}
                      <span className="s31-field__scan" aria-hidden="true" />
                      {f.gate && <span className="s31-field__flag mk-breathe mono">Human sign-off</span>}
                    </div>
                  ))}
                </div>

                <div className="s31-scope__foot">
                  <p className="s31-scope__rule">
                    <Icon name="shield" size={14} />
                    Custom agents are scoped around recurring problems and always keep a human approval owner. No autonomous launch, no guaranteed outcome.
                  </p>
                  <button type="button" className="s31-scope__explore" onClick={explore}>
                    <Icon name="spark" size={15} />
                    Scope a custom agent exploration
                  </button>
                </div>
              </section>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="s31-foot">
        <NetBox>{c.support}</NetBox>
      </div>
    </Screen>
  );
}
