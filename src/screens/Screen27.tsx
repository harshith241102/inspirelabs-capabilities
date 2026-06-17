import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, MockTag, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s27.css';

/* Screen 27 - AI Growth Studio agent map (control-room archetype).
   Dominant visual: ONE running AI studio. Three operating columns read as a
   single control room, not nine cards: agents grouped by workstream (RankDrive
   and WriteGenius shown with their real product captures and logos), a visible
   human-review queue, and a review-ready output queue. Human review is the
   centre column, never optional. The single orange focal is the live studio
   pulse. All task labels are illustrative, never invented metrics. */

type Workstream = {
  name: string;
  icon: IconName;
  state: 'running' | 'review' | 'queued';
  task: string;
  inputs: string;
  asset?: { src: string; logo: string; alt: string };
};

/* Nine agent clusters from copy[27].cards, folded into the workstreams column.
   RankDrive and WriteGenius carry their real captures so product reality is
   unambiguous. The rest are the in-studio agents. */
const workstreams: Workstream[] = [
  {
    name: 'Search and discovery',
    icon: 'search',
    state: 'running',
    task: 'Keyword and competitor scans',
    inputs: 'Category and competitor set',
    asset: { src: ASSETS.rankdriveDash, logo: ASSETS.rankdriveLogo, alt: 'RankDrive search-visibility scan running in the studio' },
  },
  {
    name: 'Content',
    icon: 'doc',
    state: 'review',
    task: 'Drafts from approved briefs',
    inputs: 'Approved brief and tone',
    asset: { src: ASSETS.writegeniusDash, logo: ASSETS.writegeniusLogo, alt: 'WriteGenius draft awaiting human review in the studio' },
  },
  { name: 'Creative', icon: 'spark', state: 'running', task: 'Offer angles and ad variants', inputs: 'Objective and brand claims' },
  { name: 'Channel', icon: 'megaphone', state: 'queued', task: 'Channel copy and notes', inputs: 'Channels and assets' },
  { name: 'Creator', icon: 'creator', state: 'queued', task: 'Creator briefs and angles', inputs: 'Products and creator context' },
  { name: 'Monitoring', icon: 'chart', state: 'running', task: 'Performance reads and flags', inputs: 'Connected reporting sources' },
  { name: 'Custom growth', icon: 'bolt', state: 'queued', task: 'Agents for recurring problems', inputs: 'Recurring task and owner' },
];

/* The human-review queue: the guardrail made literal. A person owns each item. */
const reviewQueue: { label: string; owner: string; from: string; state: 'in-review' | 'cleared' | 'waiting' }[] = [
  { label: 'RankDrive scan summary', owner: 'Growth lead', from: 'Search and discovery', state: 'in-review' },
  { label: 'WriteGenius comparison draft', owner: 'Content lead', from: 'Content', state: 'in-review' },
  { label: 'Offer angle set', owner: 'Brand owner', from: 'Creative', state: 'waiting' },
];

/* The output queue: only review-cleared work leaves the studio. */
const outputQueue: { label: string; note: string; cleared: boolean }[] = [
  { label: 'SEO and comparison content', note: 'Review-ready', cleared: true },
  { label: 'Category explainer brief', note: 'Review-ready', cleared: true },
  { label: 'Ad variant pack', note: 'In review', cleared: false },
];

const stateLabel: Record<Workstream['state'], string> = {
  running: 'Running',
  review: 'In review',
  queued: 'Queued',
};

export default function Screen27() {
  const c = copy[27];
  const drawer = useDrawer();

  const openWorkstream = (w: Workstream) =>
    drawer.open({
      id: `studio-${w.name}`,
      kind: 'ai',
      eyebrow: 'Studio workstream',
      title: w.name,
      sections: [
        { heading: 'What runs here', body: w.task },
        { heading: 'Sample output', body: 'Review-ready drafts, scans, or summaries for this workstream.' },
      ],
      requiredInput: w.inputs,
      humanReview: 'Outputs from this workstream are reviewed by a named owner before they are used.',
    });

  return (
    <Screen index={27} tone="light" id="agent-map" label="AI Growth Studio agent map">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s27-body">
        <Reveal from="up" distance={20} className="s27-roomwrap">
          <div className="s27-room">
            {/* studio status bar */}
            <div className="s27-room__bar">
              <span className="s27-room__live">
                <span className="s27-room__pulse" aria-hidden="true" />
                Studio running
              </span>
              <div className="s27-room__titles">
                <span className="s27-room__title">AI Growth Studio control room</span>
                <span className="s27-room__sub">Agents by workstream, human-review queue, review-ready outputs</span>
              </div>
              <span className="s27-room__tag">
                <MockTag>Illustrative studio view</MockTag>
              </span>
            </div>

            <div className="s27-room__grid">
              {/* live handoff flow: work moves agents -> review -> output while the
                  studio is open. Two staggered sparks ride the column dividers;
                  opacity 0 at rest so the export frame stays clean. */}
              <div className="s27-flow" aria-hidden="true">
                <span className="s27-flow__spark s27-flow__spark--a mk-spark" style={{ ['--mk-dx']: '188px' } as CSSProperties} />
                <span className="s27-flow__spark s27-flow__spark--b mk-spark" style={{ ['--mk-dx']: '150px', ['--mk-i']: 1 } as CSSProperties} />
              </div>

              {/* COLUMN 1 - agents by workstream */}
              <section className="s27-col s27-col--agents" aria-label="Agents by workstream">
                <header className="s27-col__head">
                  <span className="s27-col__ico"><Icon name="spark" size={16} /></span>
                  <span className="s27-col__label">Agents by workstream</span>
                  <span className="s27-col__count mono">7 active</span>
                </header>
                <div className="s27-streams" role="list">
                  {workstreams.map((w, i) => (
                    <Reveal i={i} step={0.03} key={w.name}>
                      <button
                        type="button"
                        role="listitem"
                        className={`s27-stream mk-hover is-${w.state}${w.asset ? ' has-asset' : ''}`}
                        onClick={() => openWorkstream(w)}
                      >
                        {w.asset ? (
                          <span className="s27-stream__thumb">
                            <img src={w.asset.src} alt={w.asset.alt} loading="lazy" />
                            <img className="s27-stream__plogo" src={w.asset.logo} alt="" aria-hidden="true" />
                          </span>
                        ) : (
                          <span className="s27-stream__ico"><Icon name={w.icon} size={17} /></span>
                        )}
                        <span className="s27-stream__main">
                          <span className="s27-stream__name">{w.name}</span>
                          <span className="s27-stream__task">{w.task}</span>
                        </span>
                        <span className={`s27-dot s27-dot--${w.state}`} aria-hidden="true" />
                        <span className="s27-stream__state mono">{stateLabel[w.state]}</span>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* COLUMN 2 - human review queue (the orange focal) */}
              <section className="s27-col s27-col--review" aria-label="Human review queue">
                <header className="s27-col__head">
                  <span className="s27-col__ico s27-col__ico--accent"><Icon name="shield" size={16} /></span>
                  <span className="s27-col__label">Human review queue</span>
                  <span className="s27-col__count s27-col__count--accent mono">Owner required</span>
                </header>
                <div className="s27-review">
                  {reviewQueue.map((r) => (
                    <div key={r.label} className={`s27-rev mk-hover is-${r.state}`}>
                      <span className="s27-rev__top">
                        <span className="s27-rev__label">{r.label}</span>
                        <span className={`s27-rev__state s27-rev__state--${r.state} mono`}>
                          {r.state === 'in-review' ? 'In review' : r.state === 'cleared' ? 'Cleared' : 'Waiting'}
                        </span>
                      </span>
                      <span className="s27-rev__meta mono">
                        <Icon name="users" size={12} />
                        {r.owner}
                        <span className="s27-rev__from">from {r.from}</span>
                      </span>
                    </div>
                  ))}
                  <p className="s27-review__rule">
                    <Icon name="check" size={13} />
                    No agent output leaves the studio without a named reviewer.
                  </p>
                </div>
              </section>

              {/* COLUMN 3 - review-ready output queue */}
              <section className="s27-col s27-col--out" aria-label="Review-ready outputs">
                <header className="s27-col__head">
                  <span className="s27-col__ico"><Icon name="send" size={16} /></span>
                  <span className="s27-col__label">Output queue</span>
                  <span className="s27-col__count mono">Review-gated</span>
                </header>
                <div className="s27-out">
                  {outputQueue.map((o) => (
                    <div key={o.label} className={`s27-outrow mk-hover${o.cleared ? ' is-cleared' : ''}`}>
                      <span className="s27-outrow__ico">
                        <Icon name={o.cleared ? 'check' : 'shield'} size={14} />
                      </span>
                      <span className="s27-outrow__label">{o.label}</span>
                      <span className={`s27-outrow__note mono${o.cleared ? ' is-cleared' : ''}`}>{o.note}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="s27-foot">
        <NetBox>{c.support}</NetBox>
      </div>
    </Screen>
  );
}
