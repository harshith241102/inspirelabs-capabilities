import { Screen } from '../primitives/Screen';
import { AdvanceCta, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import './s36.css';

type StageState = 'active' | 'locked';

/* Fixed stage-gated partnership roadmap. Identical for every reader: setup
   answers do NOT change the roadmap. Stage 1 is the single orange focal (in
   motion); every later stage stays locked behind a proof gate. No invented
   dates, budgets, numbers, or category/priority personalisation. */
const stages: {
  no: string;
  icon: IconName;
  label: string;
  when: string;
  owner: { head: string; lines: string[] };
  gate: string;
  state: StageState;
}[] = [
  {
    no: '01',
    icon: 'rocket',
    label: 'First activation path',
    when: 'Where the partnership starts',
    owner: {
      head: 'Capability owners',
      lines: ['Capture commerce intent', 'Owned distribution', 'Growth commitments'],
    },
    gate: 'Objective and tracking agreed',
    state: 'active',
  },
  {
    no: '02',
    icon: 'signal',
    label: 'Prove the path',
    when: 'Unlocks once tracking is live',
    owner: {
      head: 'Surfaces in play',
      lines: ['Commerce surfaces', 'Owned distribution', 'Activation surfaces'],
    },
    gate: 'First measurable signal observed',
    state: 'locked',
  },
  {
    no: '03',
    icon: 'target',
    label: 'Review decision',
    when: 'Unlocks once a signal is observed',
    owner: {
      head: 'Measured against',
      lines: ['Agreed KPIs', 'Tracked actions', 'Reporting cadence'],
    },
    gate: 'Evidence reviewed together',
    state: 'locked',
  },
  {
    no: '04',
    icon: 'network',
    label: 'Expand the partnership',
    when: 'Unlocks on approved evidence',
    owner: {
      head: 'Proof still needed',
      lines: ['Category proof', 'Validated case study', 'Approved metrics and logos'],
    },
    gate: 'Expansion path approved',
    state: 'locked',
  },
];

export default function Screen36() {
  const c = copy[36];
  const { markRoadmapClicked, goTo } = useApp();

  return (
    <Screen index={36} tone="light" id="roadmap" label="Partnership roadmap">
      <header className="s-header s36-header">
        <Reveal from="up" distance={12}>
          <span className="eyebrow">{c.eyebrow}</span>
        </Reveal>
        <Reveal i={1}>
          <h1 className="s-title s-title--wide s36-title">{c.headline}</h1>
        </Reveal>
        <Reveal i={2}>
          <p className="s-sub s36-sub">{c.subheadline}</p>
        </Reveal>
      </header>

      <div className="s36-body">
        <div className="s36-board" role="list" aria-label="Stage-gated partnership roadmap">
          {stages.map((s, i) => (
            <div className="s36-cell" key={s.no} role="listitem">
              <Reveal i={i} from="up" distance={16} className="s36-stage-wrap">
                <article
                  className={`s36-stage is-${s.state}`}
                  aria-label={`${s.label}, ${s.state === 'active' ? 'in motion' : 'locked'}`}
                >
                  <div className="s36-stage__top">
                    <span className="s36-stage__no mono">{s.no}</span>
                    <span className="s36-stage__state mono">
                      {s.state === 'active' ? (
                        <>
                          <span className="s36-dot" aria-hidden="true" />
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

                  <span className="s36-stage__ico">
                    <Icon name={s.icon} size={23} />
                  </span>
                  <h3 className="s36-stage__label">{s.label}</h3>
                  <p className="s36-stage__when">{s.when}</p>

                  <div className="s36-owner">
                    <span className="s36-owner__head mono">{s.owner.head}</span>
                    <ul className="s36-owner__list">
                      {s.owner.lines.map((line) => (
                        <li key={line}>
                          <Icon name="check" size={13} aria-hidden="true" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="s36-stage__gate">
                    <span className="s36-stage__gatelabel mono">Gate to advance</span>
                    <span className="s36-stage__gatetext">{s.gate}</span>
                  </div>
                </article>
              </Reveal>

              {i < stages.length - 1 && (
                <div
                  className={`s36-link ${s.state === 'active' ? 'is-live' : 'is-locked'}`}
                  aria-hidden="true"
                >
                  <span className="s36-link__bar" />
                  <span className="s36-link__node">
                    <Icon name={s.state === 'active' ? 'arrow' : 'shield'} size={13} />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="s36-legend">
          <EvidenceTag status="pending">Evidence-gated</EvidenceTag>
          <span className="s36-legend__text">
            Each stage stays locked until its proof is in. The same partnership roadmap applies to
            every brand. This is a partnership roadmap, not a short-term activation menu.
          </span>
        </div>
      </div>

      <footer className="s36-foot">
        <div className="s36-cta">
          <AdvanceCta label={c.cta} to={37} onClick={markRoadmapClicked} />
          <button type="button" className="s36-restart" onClick={() => goTo(0)}>
            <Icon name="refresh" size={13} />
            Start over
          </button>
        </div>
      </footer>
    </Screen>
  );
}
