import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, MockTag, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const fields = [
  { label: 'Audience observed', def: 'The audience seen on the surface for this brand or category.', source: 'GrabOn surface signals' },
  { label: 'Top offer format', def: 'The offer format drawing the strongest response.', source: 'Offer Lab observation' },
  { label: 'Coupon reveals', def: 'Volume of coupon reveals, an intent signal.', source: 'Surface events' },
  { label: 'Outbound clicks', def: 'Volume of outbound clicks toward the brand, an action signal.', source: 'Surface events' },
  { label: 'Engagement quality', def: 'How deep the engagement is.', source: 'Engagement depth signals' },
  { label: 'Signal freshness', def: 'How recent the signals are.', source: 'Signal timestamps' },
  { label: 'Peak days', def: 'When intent tends to peak.', source: 'Time-of-signal patterns' },
  { label: 'Recommended action', def: 'The suggested next action for human review.', source: 'AI Action Agent draft, human reviewed' },
];

// Illustrative-only bar pattern (no numeric meaning)
const barPattern = [52, 78, 40, 88, 64, 34, 72];

export default function Screen25() {
  const c = copy[25];
  const drawer = useDrawer();

  const openField = (i: number) =>
    drawer.open({
      id: `report-${fields[i].label}`,
      kind: 'metric',
      eyebrow: 'Reporting field',
      title: fields[i].label,
      sections: [
        { heading: 'Definition', body: fields[i].def },
        { heading: 'Source', body: fields[i].source },
        { heading: 'What not to assume', body: 'This is commercial decision support, not a generic dashboard. Values stay pending until approved.' },
      ],
      evidence: [{ label: 'Value status', status: 'pending' }],
    });

  return (
    <Screen index={25} tone="light" id="audienceseed-reporting" label="AudienceSeed reporting">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Reveal style={{ width: '100%', maxWidth: 980, margin: '0 auto' }}>
          <div className="mock">
            <MockTag>Illustrative mockup, not final data</MockTag>
            <div className="mock__bar">
              <Icon name="signal" size={16} style={{ color: 'var(--as-deep)' }} />
              <span className="mock__title">AudienceSeed signal and offer report</span>
              <span className="mock__spacer" />
              <span className="mono" style={{ fontSize: 10, color: 'var(--grey)' }}>
                Signal quality · offer response · audience readiness
              </span>
            </div>
            <div className="mock__pad">
              <div className="rpt">
                <div className="rpt__kpis">
                  {fields.slice(0, 4).map((f, i) => (
                    <button key={f.label} type="button" className="rpt__kpi" style={{ cursor: 'pointer', textAlign: 'left' }} onClick={() => openField(i)}>
                      <span className="rpt__kpi-label">{f.label}</span>
                      <span className="rpt__kpi-value">Pending validation</span>
                    </button>
                  ))}
                </div>
                <span className="mono" style={{ fontSize: 9.5, color: 'var(--grey)', letterSpacing: '0.04em' }}>
                  SIGNAL PATTERN · ILLUSTRATIVE, NOT MEASURED VOLUME
                </span>
                <div className="rpt__bars" aria-hidden="true">
                  {barPattern.map((h, i) => (
                    <div className="rpt__bar" key={i}>
                      <span
                        className={`rpt__bar-fill${i === 3 ? ' rpt__bar-fill--accent' : ''}`}
                        style={{ height: `${h}%` }}
                      />
                      <span className="rpt__bar-label">Day {i + 1}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {fields.slice(4).map((f, idx) => (
                    <button key={f.label} type="button" className="rpt__row" style={{ cursor: 'pointer' }} onClick={() => openField(idx + 4)}>
                      <span className="rpt__row-label">{f.label}</span>
                      {f.label === 'Recommended action' ? (
                        <span className="chip chip--accent">Human reviewed</span>
                      ) : (
                        <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted-text)' }}>Pending</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <footer className="s-footer-row">
        <NetBox>AudienceSeed reporting is built for commercial decisions, not generic dashboards.</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={26} />
        </div>
      </footer>
    </Screen>
  );
}
