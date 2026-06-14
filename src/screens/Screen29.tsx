import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { FlowRail, type NodeState } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const nodes: { icon: Parameters<typeof FlowRail>[0]['nodes'][number]['icon']; label: string; state: NodeState }[] = [
  { icon: 'target', label: 'Objective', state: 'complete' },
  { icon: 'flask', label: 'Offer angles', state: 'active' },
  { icon: 'grid', label: 'Ad variants', state: 'active' },
  { icon: 'megaphone', label: 'Channel copy', state: 'queued' },
  { icon: 'creator', label: 'Creator brief', state: 'queued' },
  { icon: 'shield', label: 'Review', state: 'review' },
];

const outputs = [
  { label: 'Google Ads variants', note: 'Search and display copy for review.' },
  { label: 'Meta Ads variants', note: 'Ad creative angles for review.' },
  { label: 'Bing copy', note: 'Search copy variants for review.' },
  { label: 'Creator briefs', note: 'Briefs and angles for creators.' },
  { label: 'Telegram post variants', note: 'Channel post variants for review.' },
  { label: 'Social copy', note: 'Social variants for review.' },
];

export default function Screen29() {
  const c = copy[29];
  const drawer = useDrawer();

  return (
    <Screen index={29} tone="light" id="ai-creative-creator" label="Creative, channel and creator agents flow">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <FlowRail nodes={nodes} />
          <Reveal>
            <span className="mini-cap">Review-ready outputs · approved by a person before launch</span>
          </Reveal>
          <div className="outcards">
            {outputs.map((o, i) => (
              <Reveal i={i} step={0.04} key={o.label}>
                <button
                  type="button"
                  className="outcard"
                  style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
                  onClick={() =>
                    drawer.open({
                      id: `out-${o.label}`,
                      kind: 'ai',
                      eyebrow: 'Output type',
                      title: o.label,
                      sections: [
                        { heading: 'What this is', body: o.note },
                        { heading: 'Asset status', body: 'Review-ready, not launch-approved.' },
                      ],
                      requiredInput: 'Brand inputs, platform constraints, and the review owner.',
                      humanReview: 'No autonomous media buying and no final-creative bypass. A person approves first.',
                    })
                  }
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="outcard__label">{o.label}</span>
                    <span className="status status--complete">Review-ready</span>
                  </span>
                  <span className="outcard__note">{o.note}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <footer className="s-footer-row">
        <div className="s-net">
          <p className="s-net__text">{c.support}</p>
        </div>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={30} />
        </div>
      </footer>
    </Screen>
  );
}
