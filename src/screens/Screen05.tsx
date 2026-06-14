import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { CardGrid } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import type { EvidenceStatus } from '../primitives/ui';

const advantages: {
  label: string;
  icon: IconName;
  enables: string;
  evidence: { label: string; status: EvidenceStatus }[];
}[] = [
  {
    label: 'Owned surfaces',
    icon: 'store',
    enables: 'Commerce-intent surfaces where offer-ready shoppers already are.',
    evidence: [
      { label: 'GrabOn surface examples', status: 'approved' },
      { label: 'Surface-wise tracking', status: 'pending' },
    ],
  },
  {
    label: 'Distribution depth',
    icon: 'share',
    enables: 'Owned and activation surfaces that move demand beyond one platform.',
    evidence: [
      { label: 'GrabCash and GrabShare surfaces', status: 'approved' },
      { label: 'Partner-wise contribution', status: 'pending' },
    ],
  },
  {
    label: 'Shopper signals',
    icon: 'signal',
    enables: 'AudienceSeed intent signals that improve audience quality before spend scales.',
    evidence: [
      { label: 'Signal taxonomy', status: 'approved' },
      { label: 'Signal volume by category', status: 'pending' },
    ],
  },
  {
    label: 'In-house AI Lab',
    icon: 'spark',
    enables: 'Productised agents that speed recurring growth work with human review.',
    evidence: [
      { label: 'RankDrive and WriteGenius', status: 'approved' },
      { label: 'Output throughput', status: 'pending' },
    ],
  },
  {
    label: 'Measurement discipline',
    icon: 'target',
    enables: 'Defined goals, tracking, and review cycles that keep the system accountable.',
    evidence: [
      { label: 'Commitment framework', status: 'approved' },
      { label: 'Client KPI sources', status: 'pending' },
    ],
  },
];

export default function Screen05() {
  const c = copy[5];
  const drawer = useDrawer();

  return (
    <Screen index={5} tone="light" id="operating-advantage" label="Inspirelabs operating advantage">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <CardGrid min={210} gap={12}>
          {advantages.map((adv, i) => (
            <Reveal i={i} step={0.07} key={adv.label}>
              <button
                type="button"
                className="opentile"
                style={{ width: '100%', height: '100%' }}
                onClick={() =>
                  drawer.open({
                    id: `advantage-${adv.label}`,
                    kind: 'proof',
                    eyebrow: 'Operating advantage',
                    title: adv.label,
                    sections: [
                      { heading: 'What it enables', body: adv.enables },
                      { heading: 'What proof or input is required', body: c.drawer },
                    ],
                    evidence: adv.evidence,
                  })
                }
              >
                <span className="opentile__head">
                  <span className={`opentile__ico${i === 0 ? ' opentile__ico--accent' : ''}`}>
                    <Icon name={adv.icon} size={19} />
                  </span>
                  <span className="opentile__title">{adv.label}</span>
                </span>
                <span className="opentile__body">{adv.enables}</span>
                <span className="opentile__more">
                  View proof status
                  <Icon name="arrow" size={12} />
                </span>
              </button>
            </Reveal>
          ))}
        </CardGrid>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={6} />
        </div>
      </footer>
    </Screen>
  );
}
