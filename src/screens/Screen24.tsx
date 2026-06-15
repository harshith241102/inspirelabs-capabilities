import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox, EvidenceTag, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import './s24.css';

/* ------------------------------------------------------------------
   Screen 24 - AudienceSeed activation pipeline (operating-board).
   ONE dominant object: a five-stage pipeline that reads as a single
   system, flowing from GrabOn events through approved signals and
   audience build into the brand's own ad workflow and a signal report.
   - Single orange focal = the "Audience build" stage (the AudienceSeed
     core where better-quality audiences are created).
   - Blue --as is the AudienceSeed signal accent (allowed on 20-25).
   - The brand's ad workflow stays clearly "owned by the brand"; no
     automatic media activation, no raw PII. Compliance is a pinned strip.
   - AI Action Agents chip lives quietly inside the report stage, away
     from the primary CTA.
   ------------------------------------------------------------------ */

type StageKind = 'source' | 'signal' | 'focal' | 'brand' | 'report';

interface Stage {
  key: string;
  n: number;
  icon: IconName;
  kind: StageKind;
  label: string;
  line: string;
  chips: string[];
  def: string;
  need: string;
}

const stages: Stage[] = [
  {
    key: 'event',
    n: 1,
    icon: 'eye',
    kind: 'source',
    label: 'GrabOn events',
    line: 'A shopper moves across the live GrabOn surface.',
    chips: ['Discovery', 'Offer view', 'Outbound click'],
    def: 'A shopper visits the GrabOn surface. No brand input is required and the surface is already live.',
    need: 'No brand input. The surface is already live and operated by Inspirelabs.',
  },
  {
    key: 'signal',
    n: 2,
    icon: 'signal',
    kind: 'signal',
    label: 'Approved signals',
    line: 'A policy-compliant intent signal is captured.',
    chips: ['Approved scope', 'Consent', 'No raw PII'],
    def: 'An approved, policy-compliant intent signal is captured from that behaviour.',
    need: 'Approved signal scope and consent. No raw PII leaves the surface.',
  },
  {
    key: 'audience',
    n: 3,
    icon: 'users',
    kind: 'focal',
    label: 'Audience build',
    line: 'A better-quality audience is built inside the brand workflow.',
    chips: ['Higher intent', 'Offer intelligence', 'Retargeting input'],
    def: 'A better-quality audience is built inside the brand workflow, improving inputs before media spend scales.',
    need: 'Audience definitions agreed with the brand. This is the AudienceSeed core.',
  },
  {
    key: 'brand',
    n: 4,
    icon: 'refresh',
    kind: 'brand',
    label: 'Brand ad workflow',
    line: 'The brand retargets inside its own Meta or Google account.',
    chips: ['Meta', 'Google', 'Brand-owned'],
    def: 'The brand retargets using its own ad account, budget and creative inside existing Meta or Google workflows.',
    need: 'These are existing brand workflows subject to platform policy, consent and integration approval. Inspirelabs does not manage the ad account unless explicitly scoped.',
  },
  {
    key: 'report',
    n: 5,
    icon: 'chart',
    kind: 'report',
    label: 'Signal report',
    line: 'AudienceSeed reports signal quality and offer intelligence.',
    chips: ['Signal quality', 'Offer response', 'Next action'],
    def: 'AudienceSeed reports signal quality and offer intelligence back to the brand.',
    need: 'Reporting fields and sources confirmed with the brand.',
  },
];

export default function Screen24() {
  const c = copy[24];
  const drawer = useDrawer();

  const openStage = (s: Stage, i: number) =>
    drawer.open({
      id: `as-pipeline-${s.key}`,
      kind: 'info',
      eyebrow: `Stage ${s.n} of ${stages.length}`,
      title: s.label,
      sections: [
        { heading: 'What happens', body: s.def },
        { heading: 'What approvals or inputs are needed', body: s.need },
      ],
      ...(i === stages.length - 1
        ? {
            humanReview:
              'AI Action Agents can summarise signal quality and draft recommended next actions, but every recommendation stays human-reviewed before it becomes action.',
          }
        : {}),
    });

  return (
    <Screen index={24} tone="light" id="audienceseed-workflow" label="AudienceSeed activation workflow">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s24-body">
        {/* ---------- THE PIPELINE (dominant visual) ---------- */}
        <Reveal className="s24-pipe" from="up" distance={16}>
          <div className="s24-pipe__bar">
            <span className="s24-pipe__chan s24-pipe__chan--signal">
              <span className="s24-dot" aria-hidden="true" />
              Approved shopper-intent signal flow
            </span>
            <span className="s24-pipe__chan s24-pipe__chan--own">
              <Icon name="shield" size={14} />
              Brand keeps its own ad account
            </span>
            <span className="s24-pipe__mock">
              <MockTag>Illustrative pipeline</MockTag>
            </span>
          </div>

          <div className="s24-track">
            {stages.map((s, i) => (
              <div className="s24-node-wrap" key={s.key}>
                <Reveal i={i} step={0.05} from="up" distance={14}>
                  <button
                    type="button"
                    className={`s24-node s24-node--${s.kind}`}
                    onClick={() => openStage(s, i)}
                  >
                    <span className="s24-node__top">
                      <span className="s24-node__ico">
                        <Icon name={s.icon} size={19} />
                      </span>
                      <span className="s24-node__n mono">{`0${s.n}`}</span>
                    </span>
                    <span className="s24-node__label">{s.label}</span>
                    <span className="s24-node__line">{s.line}</span>
                    <span className="s24-node__chips">
                      {s.chips.map((ch) => (
                        <span className="s24-chip" key={ch}>
                          {ch}
                        </span>
                      ))}
                    </span>

                    {s.kind === 'focal' && (
                      <span className="s24-node__badge mono">AudienceSeed core</span>
                    )}
                    {s.kind === 'report' && (
                      <span className="s24-node__ai" aria-hidden="true">
                        <Icon name="spark" size={12} />
                        AI Action Agents, human-reviewed
                      </span>
                    )}
                    <span className="s24-node__more mono">
                      Detail
                      <Icon name="arrow" size={11} />
                    </span>
                  </button>
                </Reveal>
                {i < stages.length - 1 && (
                  <span className={`s24-link s24-link--${s.kind}`} aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------- Pinned compliance guardrail ---------- */}
        <Reveal i={2} className="s24-guard">
          <span className="s24-guard__head">
            <Icon name="shield" size={16} />
            Pinned guardrail
          </span>
          <span className="s24-guard__text">
            Meta and Google stay brand-owned workflows, subject to platform policy, consent and
            integration approval. No platform migration, no new ad account, no raw PII.
          </span>
          <EvidenceTag status="pending">Where integration is scoped and approved</EvidenceTag>
        </Reveal>
      </div>

      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-stack">
          <div className="cta-row">
            <AdvanceCta label={c.cta} to={25} />
          </div>
          {c.aiChip && <SupportChip context={c.aiChip} />}
        </div>
      </footer>
    </Screen>
  );
}
