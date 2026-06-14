import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, EvidenceTag, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { ProofCard } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import type { EvidenceStatus } from '../primitives/ui';

const fields: { label: string; icon: IconName; placeholder: string; status: EvidenceStatus }[] = [
  { label: 'Brand or category', icon: 'tag', placeholder: 'Named brand or category', status: 'pending' },
  { label: 'Growth problem', icon: 'target', placeholder: 'The growth problem being solved', status: 'pending' },
  { label: 'Capabilities activated', icon: 'layers', placeholder: 'Surfaces, signals, agents, commitments', status: 'pending' },
  { label: 'Engagement period', icon: 'calendar', placeholder: 'Length of the engagement', status: 'pending' },
  { label: 'Metrics moved', icon: 'chart', placeholder: 'Validated metrics only', status: 'unavailable' },
  { label: 'Why it matters', icon: 'compass', placeholder: 'Relevance for similar brands', status: 'pending' },
];

export default function Screen35() {
  const c = copy[35];
  const drawer = useDrawer();

  return (
    <Screen index={35} tone="light" id="case-format" label="Case study format">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Reveal style={{ width: '100%', maxWidth: 980, margin: '0 auto' }}>
          <ProofCard>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: '1px solid var(--card-bd)',
                background: '#fbfbfc',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon name="shield" size={18} style={{ color: 'var(--orange)' }} />
                <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>
                  Case study template
                </span>
              </span>
              <button
                type="button"
                className="opentile__more"
                style={{ background: 'none', border: 0, cursor: 'pointer' }}
                onClick={() =>
                  drawer.open({
                    id: 'evidence-status',
                    kind: 'proof',
                    eyebrow: 'Evidence status',
                    title: 'What evidence status means',
                    sections: [
                      { heading: 'Known', body: 'Approved, source-backed, ready for client-facing use.' },
                      { heading: 'Pending validation', body: 'Exists but needs confirmation before use.' },
                      { heading: 'Unavailable', body: 'Not yet available. Shown as a placeholder, never as a fact.' },
                    ],
                  })
                }
              >
                What evidence status means
                <Icon name="arrow" size={12} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--card-bd)' }} className="case-grid">
              {fields.map((f) => (
                <div key={f.label} style={{ background: '#fff', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--grey)' }}>
                    <Icon name={f.icon} size={14} style={{ color: 'var(--orange)' }} />
                    {f.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted-text)' }}>{f.placeholder}</span>
                  <EvidenceTag status={f.status} />
                </div>
              ))}
            </div>
          </ProofCard>
        </Reveal>
      </div>
      <footer className="s-footer-row">
        <NetBox>Missing evidence stays visible until it is approved.</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={36} />
        </div>
      </footer>
    </Screen>
  );
}
