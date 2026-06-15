import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, EvidenceTag } from '../primitives/ui';
import { AnnotatedShot, FlowStrip, type FlowState } from '../primitives/deck';
import { useDrawer } from '../components/Drawer';
import { Icon } from '../primitives/icons';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s28.css';

/* Thin status strip above the dual screenshots: input -> scan -> opportunities
   -> briefs -> output -> human review. The two ends of the flow (Scan and
   Output) are the two real product surfaces shown below. */
const flow: { label: string; state: FlowState; sub: string; detail: string; outputs?: string[] }[] = [
  { label: 'Input', state: 'complete', sub: 'Brief', detail: 'A brand or category brief is provided as the starting input.' },
  { label: 'Scan', state: 'active', sub: 'RankDrive', detail: 'RankDrive runs the keyword and competitor visibility scan.', outputs: ['Keyword set', 'Competitor cues', 'Visibility gaps'] },
  { label: 'Opportunities', state: 'active', sub: 'Surfaced', detail: 'Content opportunities are surfaced from the scan.' },
  { label: 'Briefs', state: 'queued', sub: 'Prepared', detail: 'Briefs are prepared for each approved opportunity.' },
  { label: 'Output', state: 'queued', sub: 'WriteGenius', detail: 'WriteGenius drafts content from the approved briefs.', outputs: ['SEO content', 'Comparison content', 'Category content', 'Product explainers'] },
  { label: 'Human review', state: 'review', sub: 'Before publish', detail: 'A person reviews briefs and drafts before anything is published. No ranking outcome is claimed.' },
];

export default function Screen28() {
  const c = copy[28];
  const drawer = useDrawer();

  const openStep = (i: number) =>
    drawer.open({
      id: `s28-${i}`,
      kind: 'ai',
      eyebrow: `Step ${i + 1} of ${flow.length}`,
      title: flow[i].label,
      sections: [
        { heading: 'What happens', body: flow[i].detail },
        flow[i].outputs
          ? { heading: 'Useful outputs', items: flow[i].outputs as string[] }
          : { heading: 'Useful outputs', items: ['SEO content', 'Comparison content', 'Category content', 'Product explainers'] },
      ],
      requiredInput: 'Brand or category input and any keyword focus.',
      humanReview: 'Briefs and drafts are reviewed before publishing. No ranking outcome is claimed.',
    });

  return (
    <Screen index={28} tone="light" id="ai-search-content" label="Search and content agents flow">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s28-body">
        {/* Thin orientation strip: the flow runs from a real scan to a real output, gated by review */}
        <FlowStrip steps={flow.map((s) => ({ label: s.label, state: s.state, sub: s.sub }))} style={{ flexShrink: 0 }} />

        {/* Dominant dual-screenshot proof: RankDrive scan -> WriteGenius output */}
        <div className="s28-split">
          <AnnotatedShot
            src={ASSETS.rankdriveDash}
            alt="RankDrive search visibility dashboard scanning keywords and competitor coverage"
            url="rankdrive"
            logo={{ src: ASSETS.rankdriveLogo, alt: 'RankDrive' }}
            objectPosition="top center"
            tag={
              <button type="button" className="s28-stage" onClick={() => openStep(1)}>
                <span className="s28-stage__n">2</span>
                Scan, search visibility
              </button>
            }
            style={{ flex: '1 1 0' }}
          />

          <div className="s28-arrow" aria-hidden="true">
            <Icon name="arrow" size={26} />
          </div>

          <AnnotatedShot
            src={ASSETS.writegeniusDash}
            alt="WriteGenius content workspace drafting briefs into review-ready content"
            url="writegenius"
            logo={{ src: ASSETS.writegeniusLogo, alt: 'WriteGenius' }}
            objectPosition="top center"
            tag={
              <button type="button" className="s28-stage" onClick={() => openStep(4)}>
                <span className="s28-stage__n">5</span>
                Output, content drafts
              </button>
            }
            style={{ flex: '1 1 0' }}
          />
        </div>

        {/* Slim honest caption: real surfaces, human-reviewed, no ranking claim */}
        <div className="s28-support">
          <Icon name="shield" size={17} className="s28-support__ico" />
          <p className="s28-support__text">{c.support}</p>
          <button type="button" className="s28-support__review" onClick={() => openStep(5)}>
            <EvidenceTag status="pending">Human review before publish</EvidenceTag>
          </button>
        </div>
      </div>

      <div className="s28-foot">
        <AdvanceCta label={c.cta} to={29} />
      </div>
    </Screen>
  );
}
