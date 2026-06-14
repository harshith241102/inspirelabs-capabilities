import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { CardGrid } from '../primitives/blocks';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const checkpoints: { label: string; icon: IconName; what: string; owner: string }[] = [
  { label: 'Objective', icon: 'target', what: 'The growth objective the partnership is accountable to.', owner: 'Brand and Inspirelabs' },
  { label: 'Scope', icon: 'layers', what: 'The activation scope agreed for the cycle.', owner: 'Inspirelabs' },
  { label: 'KPI', icon: 'chart', what: 'The KPIs that define success.', owner: 'Brand and Inspirelabs' },
  { label: 'Tracking', icon: 'cursor', what: 'The tracking setup behind each KPI.', owner: 'Inspirelabs with brand access' },
  { label: 'Reporting', icon: 'doc', what: 'The reporting cadence and format.', owner: 'Inspirelabs' },
  { label: 'Review', icon: 'eye', what: 'The performance review rhythm.', owner: 'Brand and Inspirelabs' },
  { label: 'Improvement', icon: 'refresh', what: 'The improvement cycle between reviews.', owner: 'Inspirelabs' },
  { label: 'Roadmap', icon: 'compass', what: 'The partnership roadmap ahead.', owner: 'Brand and Inspirelabs' },
];

export default function Screen32() {
  const c = copy[32];
  const drawer = useDrawer();

  return (
    <Screen index={32} tone="light" id="commitments" label="Measurable growth commitments">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <CardGrid min={150} gap={11}>
          {checkpoints.map((cp, i) => (
            <Reveal i={i} step={0.04} key={cp.label}>
              <button
                type="button"
                className="opentile"
                style={{ width: '100%', height: '100%' }}
                onClick={() =>
                  drawer.open({
                    id: `commit-${cp.label}`,
                    kind: 'info',
                    eyebrow: `Checkpoint ${i + 1} of 8`,
                    title: cp.label,
                    sections: [
                      { heading: 'What this is', body: cp.what },
                      { heading: 'Owner', body: cp.owner },
                      { heading: 'Evidence source', body: 'Confirmed during setup. No invented dates or budgets.' },
                    ],
                  })
                }
              >
                <span className="opentile__head">
                  <span className="callout__n" style={{ width: 26, height: 26 }}>{i + 1}</span>
                  <span className="opentile__title">{cp.label}</span>
                </span>
                <span className="opentile__body" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Icon name={cp.icon} size={15} style={{ color: 'var(--orange)' }} />
                  {cp.what}
                </span>
              </button>
            </Reveal>
          ))}
        </CardGrid>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-stack">
          <div className="cta-row">
            <AdvanceCta label={c.cta} to={33} />
          </div>
          {c.aiChip && <SupportChip context={c.aiChip} />}
        </div>
      </footer>
    </Screen>
  );
}
