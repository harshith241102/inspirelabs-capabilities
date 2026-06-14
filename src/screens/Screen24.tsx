import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { FlowRail } from '../primitives/blocks';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const steps = [
  { label: 'Surface visit', def: 'A shopper visits the GrabOn surface.', need: 'No brand input. The surface is already live.' },
  { label: 'Approved signal', def: 'An approved, policy-compliant intent signal is captured.', need: 'Approved signal scope and consent. No raw PII.' },
  { label: 'Audience build', def: 'A better-quality audience is built inside the brand workflow.', need: 'Audience definitions agreed with the brand.' },
  { label: 'Brand retargeting', def: 'The brand retargets using its own ad account, budget, and creative inside existing Meta or Google workflows.', need: 'These are existing brand workflows subject to platform policy, consent, and integration approval. Inspirelabs does not manage the ad account unless explicitly scoped.' },
  { label: 'Signal report', def: 'AudienceSeed reports signal quality and offer intelligence.', need: 'Reporting fields and sources confirmed.' },
];

export default function Screen24() {
  const c = copy[24];
  const drawer = useDrawer();

  return (
    <Screen index={24} tone="light" id="audienceseed-workflow" label="AudienceSeed activation workflow">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <Reveal>
            <span className="mini-cap">Better inputs into the retargeting stack you already use</span>
          </Reveal>
          <FlowRail
            nodes={[
              { icon: 'eye', label: 'Surface visit' },
              { icon: 'signal', label: 'Approved signal' },
              { icon: 'users', label: 'Audience build' },
              { icon: 'refresh', label: 'Brand retargeting', caption: 'Meta or Google', state: 'endpoint' },
              { icon: 'chart', label: 'Signal report' },
            ]}
            onNode={(i) =>
              drawer.open({
                id: `as-flow-${i}`,
                kind: 'info',
                eyebrow: `Step ${i + 1} of ${steps.length}`,
                title: steps[i].label,
                sections: [
                  { heading: 'What happens', body: steps[i].def },
                  { heading: 'What approvals or inputs are needed', body: steps[i].need },
                ],
              })
            }
          />
          <Reveal i={2} className="as-guard">
            <Icon name="shield" size={18} />
            <span>
              Meta and Google are existing brand workflows, subject to platform policy, consent, and integration
              approval. The brand keeps its own ad account, budget, and creative.
            </span>
          </Reveal>
        </div>
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
