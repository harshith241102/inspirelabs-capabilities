import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, MockTag, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s29.css';

/* Screen 29 - Creative, channel and creator agents flow.
   Archetype: operating-board (campaign production board). One dominant board
   reads as a single production line: objective brief -> offer angles ->
   ad variants -> channel copy -> creator brief, all gated by one human
   approval before anything ships. Real Telegram artefacts ground the
   channel-copy and creator stages. Human review is the orange focal. */

type StageState = 'done' | 'running' | 'queued';

interface Stage {
  id: string;
  n: number;
  icon: IconName;
  label: string;
  kind: string;
  state: StageState;
  artefacts: string[];
  detail: string;
  outputs: string[];
}

const stages: Stage[] = [
  {
    id: 'objective',
    n: 1,
    icon: 'target',
    label: 'Campaign objective',
    kind: 'Brief in',
    state: 'done',
    artefacts: ['Goal', 'Audience', 'Constraints'],
    detail: 'The brand brief, target audience, and approved claims set the boundaries before anything is generated.',
    outputs: ['Objective brief', 'Audience definition', 'Claim guardrails'],
  },
  {
    id: 'angles',
    n: 2,
    icon: 'flask',
    label: 'Offer angles',
    kind: 'Generate',
    state: 'done',
    artefacts: ['Percentage', 'Bundle', 'First-order'],
    detail: 'Offer angles are drafted from the brief so the team can compare hooks before committing to creative.',
    outputs: ['Angle shortlist', 'Hook variants', 'Positioning notes'],
  },
  {
    id: 'variants',
    n: 3,
    icon: 'grid',
    label: 'Ad creative variants',
    kind: 'Generate',
    state: 'running',
    artefacts: ['Search', 'Display', 'Social'],
    detail: 'Ad variants are produced per platform format. These are review-ready drafts, not live media.',
    outputs: ['Search copy', 'Display sets', 'Social variants'],
  },
  {
    id: 'channel',
    n: 4,
    icon: 'megaphone',
    label: 'Channel copy',
    kind: 'Generate',
    state: 'running',
    artefacts: ['Telegram', 'Email', 'Push'],
    detail: 'Channel copy is adapted per surface, including Telegram posts and ads, with tracking fields prepared.',
    outputs: ['Telegram post and ad copy', 'Email and push variants', 'Reporting fields'],
  },
  {
    id: 'creator',
    n: 5,
    icon: 'creator',
    label: 'Creator brief',
    kind: 'Generate',
    state: 'queued',
    artefacts: ['Angle', 'Do and dont', 'Tracking'],
    detail: 'Creator briefs package the angle, allowed claims, and tracked links for influencer-led activation.',
    outputs: ['Creator brief', 'Allowed-claims list', 'Tracked-link checklist'],
  },
];

export default function Screen29() {
  const c = copy[29];
  const drawer = useDrawer();

  const openStage = (s: Stage) =>
    drawer.open({
      id: `s29-${s.id}`,
      kind: 'ai',
      eyebrow: `Stage ${s.n} of 5 · before approval`,
      title: s.label,
      sections: [
        { heading: 'What happens here', body: s.detail },
        { heading: 'Review-ready outputs', items: s.outputs },
      ],
      requiredInput: 'Brand inputs, platform constraints, and the review owner for this stage.',
      humanReview:
        'No autonomous media buying and no final-creative bypass. A person approves before anything is launched.',
    });

  return (
    <Screen index={29} tone="light" id="ai-creative-creator" label="Creative, channel and creator agents flow">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s29-body">
        {/* Dominant visual: the campaign production board */}
        <div className="s29-board" role="group" aria-label="Campaign production board">
          <div className="s29-board__head">
            <span className="s29-board__title">
              <Icon name="spark" size={16} className="s29-board__spark" />
              Campaign production line
            </span>
            <span className="s29-board__tag">
              <MockTag>Illustrative production board</MockTag>
            </span>
          </div>

          <div className="s29-line">
            {stages.map((s, i) => (
              <Reveal key={s.id} i={i} from="up" distance={16} className="s29-stagewrap">
                <button
                  type="button"
                  className={`s29-stage is-${s.state}`}
                  onClick={() => openStage(s)}
                  aria-label={`${s.label}, stage ${s.n} of 5`}
                >
                  <span className="s29-stage__top">
                    <span className="s29-stage__n">{s.n}</span>
                    <span className="s29-stage__ico">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <span className={`s29-state s29-state--${s.state}`}>
                      <span className="s29-state__dot" />
                      {s.state === 'done' ? 'Drafted' : s.state === 'running' ? 'Generating' : 'Queued'}
                    </span>
                  </span>
                  <span className="s29-stage__kind">{s.kind}</span>
                  <span className="s29-stage__label">{s.label}</span>
                  <span className="s29-stage__chips">
                    {s.artefacts.map((a) => (
                      <span key={a} className="s29-artefact">
                        {a}
                      </span>
                    ))}
                  </span>
                </button>
                {i < stages.length - 1 && (
                  <span className="s29-conn" aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                )}
              </Reveal>
            ))}
          </div>

          {/* Real artefact strip: grounds the channel + creator stages */}
          <div className="s29-artrow">
            <Reveal className="s29-art">
              <span className="s29-art__frame s29-art__frame--wide">
                <img src={ASSETS.telegramAd} alt="Telegram ad creative produced as channel copy" loading="lazy" />
              </span>
              <span className="s29-art__cap">
                Channel copy artefact
                <EvidenceTag status="pending">Sample, pending validation</EvidenceTag>
              </span>
            </Reveal>
            <Reveal i={1} className="s29-art">
              <span className="s29-art__frame s29-art__frame--tall">
                <img src={ASSETS.telegramPost} alt="Telegram channel post produced for creator-led sharing" loading="lazy" />
              </span>
              <span className="s29-art__cap">
                Creator and channel post
                <EvidenceTag status="pending">Sample, pending validation</EvidenceTag>
              </span>
            </Reveal>

            {/* Human approval gate: the single orange focal */}
            <Reveal i={2} className="s29-gate">
              <span className="s29-gate__head">
                <Icon name="shield" size={20} />
                Human approval
              </span>
              <span className="s29-gate__big">6</span>
              <span className="s29-gate__sub">
                Brand fit, claims, approvals, and tracking readiness are checked before any asset goes live.
              </span>
              <span className="s29-gate__pill">
                <Icon name="check" size={13} />
                Nothing launches autonomously
              </span>
            </Reveal>
          </div>
        </div>
      </div>

      <footer className="s29-foot">
        <div className="s29-net">
          <p className="s29-net__text">{c.support}</p>
        </div>
        <div className="s29-cta">
          <AdvanceCta label={c.cta} to={30} />
        </div>
      </footer>
    </Screen>
  );
}
