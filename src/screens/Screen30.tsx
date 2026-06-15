import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox, MockTag, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s30.css';

/* Screen 30 - Monitoring and optimisation flow (dashboard-mock).
   ONE dominant object: a live monitoring cockpit for AI Growth Studio. Four
   read panels (performance, anomaly, channel summary, recommendation) sit over
   a grounding strip: a real channel-reporting capture as the monitoring source
   beside the human-reviewed next action. Single orange focal: the review gate.
   Values stay illustrative / pending. Status colour is always paired with a
   text label and an icon. */

type Cell = 'steady' | 'flag' | 'review';

/* The four live read panels the cockpit is built around. */
const panels: {
  label: string;
  read: string;
  icon: IconName;
  cell: Cell;
  cellLabel: string;
  source: string;
  threshold: string;
  action: string;
}[] = [
  {
    label: 'Performance read',
    read: 'Cycle performance summarised for a faster read',
    icon: 'chart',
    cell: 'steady',
    cellLabel: 'Tracking on',
    source: 'Connected reporting sources',
    threshold: 'Agreed KPIs for the cycle',
    action: 'Shared for review',
  },
  {
    label: 'Anomaly flags',
    read: 'Unexpected movement raised against thresholds',
    icon: 'bell',
    cell: 'flag',
    cellLabel: 'Flag raised',
    source: 'Threshold rules on connected metrics',
    threshold: 'Movement beyond the agreed band',
    action: 'Investigate the flagged metric',
  },
  {
    label: 'Channel summary',
    read: 'Channel-wise notes prepared from live reporting',
    icon: 'megaphone',
    cell: 'steady',
    cellLabel: 'Up to date',
    source: 'Channel reporting feeds',
    threshold: 'Per-channel reporting fields',
    action: 'Review channel notes',
  },
  {
    label: 'Recommendation',
    read: 'Optimisation suggestion drafted for the next cycle',
    icon: 'spark',
    cell: 'review',
    cellLabel: 'In human review',
    source: 'Monitoring agent draft',
    threshold: 'Reviewed against the agreed cadence',
    action: 'Approve before it becomes action',
  },
];

const cellMeta: Record<Cell, { icon: IconName; text: string }> = {
  steady: { icon: 'check', text: 'Steady' },
  flag: { icon: 'bell', text: 'Attention' },
  review: { icon: 'eye', text: 'Review' },
};

export default function Screen30() {
  const c = copy[30];
  const drawer = useDrawer();

  const openPanel = (p: (typeof panels)[number]) =>
    drawer.open({
      id: `monitor-${p.label}`,
      kind: 'ai',
      eyebrow: 'Monitoring read',
      title: p.label,
      sections: [
        { heading: 'What this is', body: p.read },
        { heading: 'Recommended action', body: p.action },
      ],
      requiredInput: `Data source: ${p.source}. Threshold: ${p.threshold}.`,
      humanReview:
        'Recommendations stay human-reviewed before they become action. No black-box decisions.',
    });

  return (
    <Screen index={30} tone="light" id="ai-monitoring" label="Monitoring and optimisation agents flow">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s30-body">
        <Reveal from="up" distance={20} className="s30-cockwrap">
          <div className="s30-cockpit">
            {/* Cockpit bar: live monitoring, honestly labelled. */}
            <div className="s30-bar">
              <span className="s30-bar__live" aria-hidden="true" />
              <div className="s30-bar__titles">
                <span className="s30-bar__title">AI Growth Studio · Live monitoring</span>
                <span className="s30-bar__sub">Campaign live · tracking on · reads and next actions</span>
              </div>
              <span className="s30-bar__tag">
                <MockTag>Illustrative cockpit, not final data</MockTag>
              </span>
            </div>

            <div className="s30-grid">
              {/* Left: the four live read panels. */}
              <div className="s30-reads" role="list" aria-label="Live monitoring reads">
                {panels.map((p, i) => {
                  const m = cellMeta[p.cell];
                  return (
                    <Reveal i={i} step={0.05} key={p.label} role="listitem">
                      <button type="button" className="s30-read" onClick={() => openPanel(p)}>
                        <span className="s30-read__ico">
                          <Icon name={p.icon} size={18} />
                        </span>
                        <span className="s30-read__main">
                          <span className="s30-read__label">{p.label}</span>
                          <span className="s30-read__sub">{p.read}</span>
                        </span>
                        <span className={`s30-cell s30-cell--${p.cell}`}>
                          <Icon name={m.icon} size={12} />
                          {p.cellLabel}
                        </span>
                        <Icon name="arrow" size={14} className="s30-read__more" />
                      </button>
                    </Reveal>
                  );
                })}
              </div>

              {/* Right: the recommended next action. Single orange focal. */}
              <Reveal i={2} from="up" distance={16} className="s30-action">
                <span className="s30-action__kicker mono">Next action</span>
                <p className="s30-action__lead">
                  Hold the next cycle change until the flagged read and the recommendation pass human review.
                </p>
                <div className="s30-action__status">
                  <span className="s30-action__pill">
                    <Icon name="eye" size={13} />
                    Human reviewed
                  </span>
                  <EvidenceTag status="pending">Awaiting approval</EvidenceTag>
                </div>
                <div className="s30-action__why">
                  <span className="s30-action__why-head mono">Review status</span>
                  <span className="s30-action__why-body">
                    AI Monitoring Agents draft the read each cycle. A person approves it before it becomes action.
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Grounding strip: real channel reporting feeds the cockpit. */}
            <div className="s30-ground">
              <div className="s30-source">
                <div className="s30-source__shot">
                  <img
                    src={ASSETS.telegramReport}
                    alt="Connected channel reporting dashboard with clicks, device and browser breakdown"
                    loading="lazy"
                  />
                </div>
                <div className="s30-source__cap">
                  <span className="s30-source__label mono">Connected channel reporting source</span>
                  <EvidenceTag status="pending">Pending validation</EvidenceTag>
                </div>
              </div>
              <div className="s30-readout">
                <span className="s30-readout__head mono">Cockpit reads from connected sources</span>
                <div className="s30-readout__items">
                  <span className="s30-readout__item">
                    <Icon name="signal" size={14} />
                    Live reporting feeds
                  </span>
                  <span className="s30-readout__item">
                    <Icon name="bell" size={14} />
                    Threshold based flags
                  </span>
                  <span className="s30-readout__item">
                    <Icon name="cycle" size={14} />
                    Next-cycle suggestion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="s30-foot">
        <NetBox>{c.support}</NetBox>
        <div className="s30-foot__cta">
          <AdvanceCta label={c.cta} to={31} />
        </div>
      </footer>
    </Screen>
  );
}
