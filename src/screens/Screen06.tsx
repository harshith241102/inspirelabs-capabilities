import { Screen } from '../primitives/Screen';
import { DeckHeader, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import './s06.css';

/* Screen 6 - System operating map (operating-board archetype).
   ONE dominant visual: a left-to-right system spine from intent to accountable
   growth, wrapped by a proof-evidence frame. Built map, no invented metrics.
   Section-jump is preserved but demoted to a quiet hotspot per node. */

interface Stage {
  step: string;
  label: string;
  role: string;
  icon: IconName;
  to: number;
}

const stages: Stage[] = [
  { step: '01', label: 'Capture commerce intent', role: 'Meet demand where decisions form', icon: 'store', to: 7 },
  { step: '02', label: 'Distribute demand', role: 'Move it across owned and activation surfaces', icon: 'share', to: 12 },
  { step: '03', label: 'AudienceSeed shopper signals', role: 'Read intent before the brand visit', icon: 'signal', to: 21 },
  { step: '04', label: 'AI Growth Studio', role: 'Scale execution with human-reviewed agents', icon: 'spark', to: 27 },
  { step: '05', label: 'Growth commitments', role: 'Run to measurable, accountable goals', icon: 'target', to: 33 },
];

/* The Growth Engine framework: the demand funnel the system runs on. Names and
   one-line roles are visible; levers, tools, and outputs surface on hover so the
   layer stays a compact operating band, not four heavy cards. */
interface EngineStage {
  name: string;
  role: string;
  levers: string;
  tools: string;
  outputs: string;
}

const growthEngine: EngineStage[] = [
  {
    name: 'Awareness',
    role: 'Build visibility and recall',
    levers: 'Influencer marketing, social campaigns, media amplification, partner promotions',
    tools: 'GrabShare, strategic partnerships, channel amplification, AI Growth Studio',
    outputs: 'Reach, impressions, engagement, creator output',
  },
  {
    name: 'Discovery',
    role: 'Be findable during active search or comparison',
    levers: 'SEO, ASO, SGE, GEO, content, intent-led surfaces',
    tools: 'GrabOn, Alternatives.co, RankDrive, WriteGenius',
    outputs: 'Search visibility, category discovery, comparison traffic',
  },
  {
    name: 'User Engagement',
    role: 'Build repeat interaction and offer-led re-entry',
    levers: 'Email, Telegram, WhatsApp, offer drops, cashback, retargeting inputs',
    tools: 'GrabCash, AudienceSeed, strategic partnerships, promotional surfaces',
    outputs: 'Repeat visits, offer response, audience readiness',
  },
  {
    name: 'User Acquisition',
    role: 'Convert interest into measurable action',
    levers: 'Affiliate marketing, creator commerce, performance campaigns, retargeting',
    tools: 'GrabOn, GrabCash, GrabShare, AudienceSeed, affiliate platforms, AI Growth Studio',
    outputs: 'Leads, signups, installs, registrations, orders, sales',
  },
];

export default function Screen06() {
  const c = copy[6];
  const { goTo } = useApp();

  return (
    <Screen index={6} tone="light" id="overview" label="Growth system overview">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s06-body">
        {/* Dominant visual: the proof-wrapped system map */}
        <Reveal from="up" distance={16} className="s06-map">
          <div className="s06-map__proof" aria-hidden="true" />
          <span className="s06-prooflabel">
            <Icon name="shield" size={15} />
            Category proof surrounds the system as evidence, not a separate delivery capability
          </span>

          <div className="s06-flow">
            <span className="s06-enter mono">
              <Icon name="cursor" size={14} />
              Audience intent
            </span>

            <div className="s06-track">
              <span className="s06-spine" aria-hidden="true" />
              {stages.map((s, i) => (
                <Reveal key={s.label} i={i} step={0.08} from="up" distance={14} className="s06-node-wrap">
                  <div className={`s06-node${i === stages.length - 1 ? ' is-goal' : ''}`}>
                    <span className="s06-node__step mono">{s.step}</span>
                    <span className="s06-node__ico">
                      <Icon name={s.icon} size={22} />
                    </span>
                    <span className="s06-node__label">{s.label}</span>
                    <span className="s06-node__role">{s.role}</span>
                    <button
                      type="button"
                      className="s06-node__jump"
                      onClick={() => goTo(s.to)}
                      aria-label={`Open ${s.label}`}
                    >
                      <Icon name="arrow" size={13} />
                    </button>
                  </div>
                  {i < stages.length - 1 && (
                    <span className="s06-node__link" aria-hidden="true">
                      <Icon name="arrow" size={16} />
                    </span>
                  )}
                </Reveal>
              ))}
            </div>

            <span className="s06-exit">
              <Icon name="check" size={15} />
              Accountable growth
            </span>
          </div>
        </Reveal>

        {/* Growth Engine framework: the demand funnel the system runs on. */}
        <Reveal from="up" distance={14} className="s06-engine">
          <span className="s06-engine__label mono">
            <Icon name="cycle" size={14} />
            Growth Engine
          </span>
          <div className="s06-engine__rail">
            {growthEngine.map((g, i) => (
              <div className="s06-eng-wrap" key={g.name}>
                <div
                  className="s06-eng"
                  title={`Levers: ${g.levers}. Tools: ${g.tools}. Outputs: ${g.outputs}.`}
                >
                  <span className="s06-eng__step mono">{`0${i + 1}`}</span>
                  <span className="s06-eng__name">{g.name}</span>
                  <span className="s06-eng__role">{g.role}</span>
                </div>
                {i < growthEngine.length - 1 && (
                  <span className="s06-eng__link" aria-hidden="true">
                    <Icon name="arrow" size={14} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="s06-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
