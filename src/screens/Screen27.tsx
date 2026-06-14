import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

type St = 'active' | 'queued' | 'complete';
const clusters: { name: string; icon: IconName; status: St; sample: string; inputs: string }[] = [
  { name: 'Search and Discovery', icon: 'search', status: 'active', sample: 'Keyword and competitor scans', inputs: 'Category and competitor set' },
  { name: 'RankDrive', icon: 'compass', status: 'active', sample: 'Search visibility tracking', inputs: 'Target keywords and pages' },
  { name: 'WriteGenius', icon: 'doc', status: 'complete', sample: 'Drafted content from briefs', inputs: 'Approved brief and tone' },
  { name: 'Content', icon: 'layers', status: 'queued', sample: 'Comparison and category content', inputs: 'Content opportunities' },
  { name: 'Creative', icon: 'spark', status: 'active', sample: 'Offer angles and ad variants', inputs: 'Objective and brand claims' },
  { name: 'Channel', icon: 'megaphone', status: 'queued', sample: 'Channel copy and notes', inputs: 'Channels and assets' },
  { name: 'Creator', icon: 'creator', status: 'queued', sample: 'Creator briefs and angles', inputs: 'Products and creator context' },
  { name: 'Monitoring', icon: 'chart', status: 'active', sample: 'Performance reads and flags', inputs: 'Connected reporting sources' },
  { name: 'Custom Growth', icon: 'bolt', status: 'queued', sample: 'Agents for recurring problems', inputs: 'Recurring task and owner' },
];

export default function Screen27() {
  const c = copy[27];
  const drawer = useDrawer();

  return (
    <Screen index={27} tone="light" id="agent-map" label="AI Growth Studio agent map">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="clusters">
          {clusters.map((cl, i) => (
            <Reveal i={i} step={0.04} key={cl.name}>
              <button
                type="button"
                className="cluster"
                style={{ width: '100%', height: '100%' }}
                onClick={() =>
                  drawer.open({
                    id: `cluster-${cl.name}`,
                    kind: 'ai',
                    eyebrow: 'Agent cluster',
                    title: cl.name,
                    sections: [
                      { heading: 'Use cases', body: cl.sample },
                      { heading: 'Sample output', body: 'Review-ready drafts, scans, or summaries for this cluster.' },
                    ],
                    requiredInput: cl.inputs,
                    humanReview: 'Outputs from this cluster are reviewed before they are used.',
                  })
                }
              >
                <span className="cluster__top">
                  <span className="cluster__name">
                    <span className="cluster__ico">
                      <Icon name={cl.icon} size={16} />
                    </span>
                    {cl.name}
                  </span>
                  <span className={`status status--${cl.status}`}>{cl.status}</span>
                </span>
                <span className="cluster__sample">{cl.sample}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={28} />
        </div>
      </footer>
    </Screen>
  );
}
