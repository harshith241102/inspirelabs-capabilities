import { Screen } from '../primitives/Screen';
import { DeckHeader, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import './s33.css';

type StageState = 'active' | 'locked';

interface Stage {
  no: string;
  icon: IconName;
  label: string;
  unlock: string;
  proof: string;
  gate: string;
  state: StageState;
  detail: string;
}

/* Stage-gated expansion board. Stage 1 is in motion (the single orange focal);
   the rest stay locked until the gate before them clears. Copy labels come from
   copy[33].cards; gates from copy[33].drawer guidance. No invented dates or budgets. */
const stages: Stage[] = [
  {
    no: '01',
    icon: 'target',
    label: 'Define objective',
    unlock: 'Starts the partnership',
    proof: 'Objective, scope, and KPIs agreed',
    gate: 'Objective agreed',
    state: 'active',
    detail: 'Agree the objective, the activation scope, and how success is measured before anything goes live.',
  },
  {
    no: '02',
    icon: 'rocket',
    label: 'Launch first activation path',
    unlock: 'Unlocks once the objective is agreed',
    proof: 'Tracking live on a focused first path',
    gate: 'Tracking live',
    state: 'locked',
    detail: 'Start focused with one clear activation path and confirm tracking is in place before reading results.',
  },
  {
    no: '03',
    icon: 'refresh',
    label: 'Review and improve',
    unlock: 'Unlocks once tracking is live',
    proof: 'First measurable signal observed',
    gate: 'First signal observed',
    state: 'locked',
    detail: 'Review measurable traction against the agreed KPIs and improve the activation before widening scope.',
  },
  {
    no: '04',
    icon: 'network',
    label: 'Expand the system',
    unlock: 'Unlocks once a signal is observed',
    proof: 'Expansion path approved on evidence',
    gate: 'Expansion path approved',
    state: 'locked',
    detail: 'Add surfaces, agents, and commitments only after the evidence supports the next tranche.',
  },
];

export default function Screen33() {
  const c = copy[33];
  const drawer = useDrawer();

  const openStage = (s: Stage, i: number) =>
    drawer.open({
      id: `stage-${i}`,
      kind: 'roadmap',
      eyebrow: `Stage ${i + 1} of 4`,
      title: s.label,
      sections: [
        { heading: 'What happens', body: s.detail },
        { heading: 'Gate to move forward', body: s.gate },
        {
          heading: 'What not to assume',
          body: 'No fixed calendar commitments and no fixed budget figures. Expansion is decided on evidence.',
        },
      ],
    });

  return (
    <Screen index={33} tone="light" id="partnership-runs" label="How a long-term partnership runs">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s33-body">
        <div className="s33-board" role="list" aria-label="Stage-gated expansion path">
          {stages.map((s, i) => (
            <div className="s33-cell" key={s.no} role="listitem">
              <Reveal i={i} from="up" distance={16}>
                <button
                  type="button"
                  className={`s33-stage mk-hover is-${s.state}`}
                  onClick={() => openStage(s, i)}
                  aria-label={`${s.label}, ${s.state === 'active' ? 'in motion' : 'locked'}. Open detail.`}
                >
                  <div className="s33-stage__top">
                    <span className="s33-stage__no">{s.no}</span>
                    <span className="s33-stage__state">
                      {s.state === 'active' ? (
                        <>
                          <span className="s33-dot" aria-hidden="true" />
                          In motion
                        </>
                      ) : (
                        <>
                          <Icon name="shield" size={12} aria-hidden="true" />
                          Locked
                        </>
                      )}
                    </span>
                  </div>

                  <span className="s33-stage__ico">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="s33-stage__label">{s.label}</h3>
                  <p className="s33-stage__unlock">{s.unlock}</p>

                  <div className="s33-stage__proof">
                    <span className="s33-stage__prooflabel">Proof to clear the gate</span>
                    <span className="s33-stage__prooftext">{s.proof}</span>
                  </div>
                </button>
              </Reveal>

              {i < stages.length - 1 && (
                <div className={`s33-gate ${s.state === 'active' ? 'is-live' : 'is-locked'}`} aria-hidden="true">
                  <span className="s33-gate__bar" />
                  {s.state === 'active' && <span className="s33-gate__spark" />}
                  <span className="s33-gate__chip">
                    <Icon name={s.state === 'active' ? 'check' : 'shield'} size={12} />
                    {s.gate}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="s33-legend">
          <EvidenceTag status="pending">Review gate</EvidenceTag>
          <span className="s33-legend__text">
            Each gate is a review decision. The next stage stays locked until its evidence is in.
          </span>
        </div>
      </div>

      <footer className="s33-foot">
        <div className="s33-net">
          <p className="s33-net__text">{c.support}</p>
        </div>
      </footer>
    </Screen>
  );
}
