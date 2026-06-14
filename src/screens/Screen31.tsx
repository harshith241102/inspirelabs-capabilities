import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { FlowRail } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const useCases: { label: string; icon: IconName; task: string }[] = [
  { label: 'Report automation', icon: 'doc', task: 'Recurring report preparation' },
  { label: 'Offer variants', icon: 'flask', task: 'Offer variant generation' },
  { label: 'Category briefs', icon: 'layers', task: 'Category content briefing' },
  { label: 'Creator briefs', icon: 'creator', task: 'Creator brief generation' },
  { label: 'Competitive visibility', icon: 'eye', task: 'Competitive visibility tracking' },
  { label: 'Performance summaries', icon: 'chart', task: 'Campaign performance summarisation' },
];

export default function Screen31() {
  const c = copy[31];
  const drawer = useDrawer();

  const intake = () =>
    drawer.open({
      id: 'custom-agent-intake',
      kind: 'ai',
      eyebrow: 'Custom growth agent',
      title: 'Request a custom agent exploration',
      sections: [
        {
          heading: 'Tell us',
          items: ['The recurring task', 'The input source', 'The output format', 'The frequency', 'The approval owner'],
        },
        { heading: 'What this is not', body: 'Not an unlimited customisation promise and not an immediate delivery claim.' },
      ],
      requiredInput: 'A clear recurring problem and the data it needs.',
      humanReview: 'Custom agents are scoped around recurring problems and keep a human review step.',
    });

  return (
    <Screen index={31} tone="light" id="custom-agents" label="Custom growth agents">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Reveal>
            <span className="mini-cap">Recurring problems custom agents can be shaped around</span>
          </Reveal>
          <div className="outcards">
            {useCases.map((u, i) => (
              <Reveal i={i} step={0.04} key={u.label}>
                <button
                  type="button"
                  className="outcard"
                  style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
                  onClick={() =>
                    drawer.open({
                      id: `usecase-${u.label}`,
                      kind: 'ai',
                      eyebrow: 'Custom agent example',
                      title: u.label,
                      sections: [
                        { heading: 'Recurring task', body: u.task },
                        { heading: 'How it is shaped', items: ['Recurring task', 'Input source', 'Output format', 'Frequency', 'Approval owner'] },
                      ],
                      requiredInput: 'The data this task depends on.',
                      humanReview: 'A person reviews the output before it is used.',
                    })
                  }
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span className="cluster__ico">
                      <Icon name={u.icon} size={16} />
                    </span>
                    <span className="outcard__label">{u.label}</span>
                  </span>
                  <span className="outcard__note">{u.task}</span>
                </button>
              </Reveal>
            ))}
          </div>
          <FlowRail
            nodes={[
              { icon: 'bolt', label: 'Recurring task' },
              { icon: 'doc', label: 'Required inputs' },
              { icon: 'shield', label: 'Review owner', state: 'review' },
              { icon: 'check', label: 'Measurable output', state: 'complete' },
            ]}
          />
        </div>
      </div>
      <footer className="s-footer-row">
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={32} />
          <button type="button" className="btn btn--ghost" onClick={intake}>
            <Icon name="spark" size={16} />
            Request custom agent exploration
          </button>
        </div>
      </footer>
    </Screen>
  );
}
