import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, MockTag, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s26.css';

/* Control-room archetype: AI Growth Studio shown as ONE running system.
   Inputs -> agents running -> human-review queue (orange focal) -> output queue.
   Built mock, MockTag labelled; rankdriveDash grounds it as a real agent surface.
   Guardrails sit in a side strip, not as a CTA-row button. */

type TaskState = 'active' | 'review' | 'complete';

const stateMeta: Record<TaskState, { label: string; icon: IconName }> = {
  active: { label: 'Running', icon: 'cycle' },
  review: { label: 'In review', icon: 'shield' },
  complete: { label: 'Review-ready', icon: 'check' },
};

/* Column 1 - inputs feeding the studio */
const inputs: { label: string; icon: IconName }[] = [
  { label: 'Brand or category brief', icon: 'doc' },
  { label: 'Target offers and keywords', icon: 'tag' },
  { label: 'Approved claims and assets', icon: 'layers' },
];

/* Column 2 - agents running now */
const tasks: { label: string; agent: string; state: TaskState }[] = [
  { label: 'Search and content scan', agent: 'RankDrive agent', state: 'active' },
  { label: 'Comparison content drafts', agent: 'WriteGenius agent', state: 'active' },
  { label: 'Channel copy variants', agent: 'Channel agent', state: 'active' },
];

/* Column 3 - the human-review queue (orange focal) */
const reviewQueue: { label: string; owner: string }[] = [
  { label: 'Content briefs', owner: 'Growth lead' },
  { label: 'Ad and offer variants', owner: 'Brand owner' },
];

/* Column 4 - outputs, review-ready not auto-launched */
const outputs: { label: string; icon: IconName }[] = [
  { label: 'SEO and comparison content', icon: 'doc' },
  { label: 'Offer and ad variants', icon: 'bolt' },
  { label: 'Reporting summaries', icon: 'chart' },
];

/* Guardrail rail (side strip, not a CTA button) */
const guards = [
  'Built in-house, productised systems',
  'Custom agents per brand need',
  'Faster execution on recurring work',
];

export default function Screen26() {
  const c = copy[26];
  const drawer = useDrawer();

  const openGuardrails = () =>
    drawer.open({
      id: 'ai-guardrail',
      kind: 'ai',
      eyebrow: 'AI Growth Studio guardrail',
      title: 'What AI Growth Studio does and does not do',
      sections: [
        {
          heading: 'What it is',
          body: 'Human-reviewed execution support from the in-house AI Lab at Inspirelabs.',
        },
        {
          heading: 'What it does not do',
          items: ['Replace client teams', 'Guarantee ROI', 'Launch work without review'],
        },
      ],
      requiredInput: 'Brand inputs and the review owner for each output type.',
      humanReview: 'Every output is reviewed by a person before it is used.',
    });

  return (
    <Screen index={26} tone="light" id="ai-intro" label="AI Growth Studio intro">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s26-body">
        {/* THE dominant visual: a running AI Growth Studio control room */}
        <Reveal from="up" distance={16} className="s26-room">
          <div className="s26-room__bar">
            <span className="s26-room__dot" aria-hidden="true" />
            <span className="s26-room__name">AI Growth Studio control room</span>
            <span className="s26-room__live">
              <span className="s26-room__pulse" aria-hidden="true" />
              Agents running
            </span>
            <span className="s26-room__tag">
              <MockTag>Illustrative control room</MockTag>
            </span>
          </div>

          <div className="s26-room__grid">
            {/* Column 1 - inputs */}
            <section className="s26-col">
              <header className="s26-col__head">
                <span className="s26-col__ico">
                  <Icon name="doc" size={17} />
                </span>
                <span className="s26-col__title">Inputs</span>
              </header>
              <ul className="s26-list" role="list">
                {inputs.map((it) => (
                  <li key={it.label} className="s26-item">
                    <span className="s26-item__ico">
                      <Icon name={it.icon} size={15} />
                    </span>
                    <span className="s26-item__label">{it.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            <span className="s26-flow" aria-hidden="true">
              <Icon name="arrow" size={16} />
            </span>

            {/* Column 2 - active tasks */}
            <section className="s26-col">
              <header className="s26-col__head">
                <span className="s26-col__ico">
                  <Icon name="spark" size={17} />
                </span>
                <span className="s26-col__title">Active tasks</span>
              </header>
              <ul className="s26-tasks" role="list">
                {tasks.map((t) => (
                  <li key={t.label} className="s26-task">
                    <span className="s26-task__top">
                      <span className="s26-task__label">{t.label}</span>
                      <span className={`s26-state s26-state--${t.state}`}>
                        <Icon name={stateMeta[t.state].icon} size={12} />
                        {stateMeta[t.state].label}
                      </span>
                    </span>
                    <span className="s26-task__agent">{t.agent}</span>
                  </li>
                ))}
              </ul>
            </section>

            <span className="s26-flow" aria-hidden="true">
              <Icon name="arrow" size={16} />
            </span>

            {/* Column 3 - human-review queue (orange focal) */}
            <section className="s26-col s26-col--review">
              <header className="s26-col__head">
                <span className="s26-col__ico s26-col__ico--review">
                  <Icon name="shield" size={17} />
                </span>
                <span className="s26-col__title">Human-review queue</span>
                <span className="s26-col__count">2</span>
              </header>
              <ul className="s26-list" role="list">
                {reviewQueue.map((r) => (
                  <li key={r.label} className="s26-review">
                    <span className="s26-review__label">{r.label}</span>
                    <span className="s26-review__owner">
                      <Icon name="users" size={13} />
                      {r.owner}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="s26-review__gate">
                <Icon name="check" size={13} />
                A person checks every output before it is used.
              </p>
            </section>

            <span className="s26-flow" aria-hidden="true">
              <Icon name="arrow" size={16} />
            </span>

            {/* Column 4 - output queue */}
            <section className="s26-col">
              <header className="s26-col__head">
                <span className="s26-col__ico">
                  <Icon name="send" size={17} />
                </span>
                <span className="s26-col__title">Output queue</span>
              </header>
              <ul className="s26-list" role="list">
                {outputs.map((o) => (
                  <li key={o.label} className="s26-item">
                    <span className="s26-item__ico">
                      <Icon name={o.icon} size={15} />
                    </span>
                    <span className="s26-item__label">{o.label}</span>
                  </li>
                ))}
              </ul>
              <span className="s26-out__tag">Review-ready, not auto-launched</span>
            </section>
          </div>

          {/* Real agent surface grounding the room + guardrail rail */}
          <div className="s26-room__foot">
            <figure className="s26-surface">
              <img
                src={ASSETS.rankdriveDash}
                alt="RankDrive search-visibility dashboard, a live AI Growth Studio agent surface"
                loading="lazy"
              />
              <figcaption className="s26-surface__cap">
                <span className="s26-surface__name">RankDrive, a live agent surface</span>
                <EvidenceTag status="pending">Capture pending validation</EvidenceTag>
              </figcaption>
            </figure>

            <div className="s26-guard">
              <span className="s26-guard__head">
                <Icon name="flask" size={15} />
                In-house AI Lab
              </span>
              <ul className="s26-guard__list" role="list">
                {guards.map((g) => (
                  <li key={g}>
                    <Icon name="check" size={13} />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="s26-foot">
        <div className="s26-foot__cta">
          <AdvanceCta label={c.cta} to={27} />
          <button type="button" className="s26-guardlink" onClick={openGuardrails}>
            <Icon name="shield" size={15} />
            See the guardrails
          </button>
        </div>
        <p className="s26-foot__note">
          <Icon name="check" size={14} />
          Human-reviewed control. It does not replace teams, guarantee ROI, or launch work without review.
        </p>
      </footer>
    </Screen>
  );
}
