import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, Shot, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { FlowRail, type NodeState } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';

const nodes: { icon: Parameters<typeof FlowRail>[0]['nodes'][number]['icon']; label: string; state: NodeState; detail: string }[] = [
  { icon: 'doc', label: 'Input', state: 'complete', detail: 'Brand or category brief is provided.' },
  { icon: 'search', label: 'Scan', state: 'active', detail: 'Keyword and competitor scan runs.' },
  { icon: 'compass', label: 'Opportunities', state: 'active', detail: 'Content opportunities are surfaced.' },
  { icon: 'layers', label: 'Briefs', state: 'queued', detail: 'Briefs are prepared for each opportunity.' },
  { icon: 'doc', label: 'WriteGenius output', state: 'queued', detail: 'Drafts are generated from approved briefs.' },
  { icon: 'shield', label: 'Human review', state: 'review', detail: 'A person reviews before anything is published.' },
];

export default function Screen28() {
  const c = copy[28];
  const drawer = useDrawer();

  return (
    <Screen index={28} tone="light" id="ai-search-content" label="Search and content agents flow">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <FlowRail
            nodes={nodes.map((n) => ({ icon: n.icon, label: n.label, state: n.state }))}
            onNode={(i) =>
              drawer.open({
                id: `s28-${i}`,
                kind: 'ai',
                eyebrow: `Step ${i + 1} of ${nodes.length}`,
                title: nodes[i].label,
                sections: [
                  { heading: 'What happens', body: nodes[i].detail },
                  { heading: 'Useful outputs', items: ['SEO content', 'Comparison content', 'Category content', 'Product explainers'] },
                ],
                requiredInput: 'Brand or category input and any keyword focus.',
                humanReview: 'Briefs and drafts are reviewed before publishing. No ranking outcome is claimed.',
              })
            }
          />
          <div className="split" style={{ gap: 18 }}>
            <Reveal className="grow" style={{ position: 'relative' }}>
              <MockTag>Scan · RankDrive</MockTag>
              <Shot src={ASSETS.rankdriveDash} alt="RankDrive search visibility dashboard" url="rankdrive" style={{ height: 'clamp(160px, 24vh, 230px)' }} />
            </Reveal>
            <Reveal i={1} className="grow" style={{ position: 'relative' }}>
              <MockTag>Output · WriteGenius</MockTag>
              <Shot src={ASSETS.writegeniusDash} alt="WriteGenius content workspace" url="writegenius" style={{ height: 'clamp(160px, 24vh, 230px)' }} />
            </Reveal>
          </div>
        </div>
      </div>
      <footer className="s-footer-row">
        <div className="s-net">
          <p className="s-net__text">{c.support}</p>
        </div>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={29} />
        </div>
      </footer>
    </Screen>
  );
}
