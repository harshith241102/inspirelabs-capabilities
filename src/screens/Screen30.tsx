import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

type St = 'active' | 'queued' | 'complete';
const rows: { title: string; sub: string; icon: IconName; status: St; source: string; action: string }[] = [
  { title: 'Campaign live', sub: 'Tracking is on and data is flowing', icon: 'play', status: 'active', source: 'Connected campaign', action: 'No action needed' },
  { title: 'Performance read', sub: 'Summarised performance for the cycle', icon: 'chart', status: 'complete', source: 'Reporting source', action: 'Shared for review' },
  { title: 'Anomaly flags', sub: 'Unexpected changes are flagged', icon: 'bell', status: 'active', source: 'Threshold rules', action: 'Investigate flagged metric' },
  { title: 'Channel summary', sub: 'Channel-wise notes prepared', icon: 'megaphone', status: 'queued', source: 'Channel reporting', action: 'Review channel notes' },
  { title: 'Recommendation', sub: 'Optimisation suggestion, human reviewed', icon: 'spark', status: 'queued', source: 'Monitoring agent draft', action: 'Approve before acting' },
  { title: 'Next action', sub: 'Next-cycle action proposed', icon: 'cycle', status: 'queued', source: 'Reviewed recommendation', action: 'Plan next cycle' },
];

export default function Screen30() {
  const c = copy[30];
  const drawer = useDrawer();

  return (
    <Screen index={30} tone="light" id="ai-monitoring" label="Monitoring and optimisation agents flow">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="monitor">
          {rows.map((r, i) => (
            <Reveal i={i} step={0.05} key={r.title}>
              <button
                type="button"
                className="monitor__row"
                style={{ width: '100%' }}
                onClick={() =>
                  drawer.open({
                    id: `monitor-${r.title}`,
                    kind: 'ai',
                    eyebrow: 'Monitoring step',
                    title: r.title,
                    sections: [
                      { heading: 'What this is', body: r.sub },
                      { heading: 'Recommended action', body: r.action },
                    ],
                    requiredInput: `Data source: ${r.source}. Confirmed thresholds.`,
                    humanReview: 'Recommendations stay human-reviewed before they become action. No black-box decisions.',
                  })
                }
              >
                <span className="monitor__ico">
                  <Icon name={r.icon} size={16} />
                </span>
                <span className="monitor__main">
                  <span className="monitor__title">{r.title}</span>
                  <span className="monitor__sub">{r.sub}</span>
                </span>
                <span className={`status status--${r.status}`}>{r.status}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={31} />
        </div>
      </footer>
    </Screen>
  );
}
