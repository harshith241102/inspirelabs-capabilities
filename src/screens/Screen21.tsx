import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { FlowRail } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const steps = [
  { label: 'Discovery', def: 'A shopper discovers an offer on the GrabOn surface.' },
  { label: 'Comparison', def: 'They compare offers and options.' },
  { label: 'Coupon reveal', def: 'They reveal a coupon, a stronger intent signal.' },
  { label: 'Outbound click', def: 'They click out toward the brand, an action signal.' },
  { label: 'Brand arrival', def: 'They arrive on the brand site or app, where the pixel starts.' },
];

export default function Screen21() {
  const c = copy[21];
  const drawer = useDrawer();

  return (
    <Screen index={21} tone="light" id="blind-spot" label="The blind spot">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="blindspot">
          <Reveal>
            <span className="mini-cap">From GrabOn discovery to brand arrival</span>
          </Reveal>
          <FlowRail
            nodes={[
              { icon: 'eye', label: 'Discovery' },
              { icon: 'layers', label: 'Comparison' },
              { icon: 'coupon', label: 'Coupon reveal' },
              { icon: 'cursor', label: 'Outbound click' },
              { icon: 'store', label: 'Brand arrival', state: 'endpoint' },
            ]}
            onNode={(i) =>
              drawer.open({
                id: `blindspot-${i}`,
                kind: 'info',
                eyebrow: 'Pre-site event',
                title: steps[i].label,
                sections: [
                  { heading: 'What this is', body: steps[i].def },
                  { heading: 'Data source required', body: c.drawer },
                ],
              })
            }
          />
          <div className="blindspot__bracket">
            <Reveal from="right" className="blindspot__seg blindspot__seg--as">
              <Icon name="signal" size={13} />
              AudienceSeed sees the decision forming here
            </Reveal>
            <Reveal from="left" i={1} className="blindspot__seg blindspot__seg--pixel">
              <Icon name="eye" size={13} />
              Your pixel starts here
            </Reveal>
          </div>
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={22} />
        </div>
      </footer>
    </Screen>
  );
}
