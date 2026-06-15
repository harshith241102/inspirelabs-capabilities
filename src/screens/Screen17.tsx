import { Screen } from '../primitives/Screen';
import { DeckHeader, EvidenceTag, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import './s17.css';

/* Source-to-outcome lane: publisher source -> tracked click -> order or lead
   -> CPA/CPS/ROAS report. The report is the hero; the lane feeds it. */
const lane: { label: string; sub: string; icon: IconName }[] = [
  { label: 'Publisher source', sub: 'Affiliate, coupon, deal, performance', icon: 'network' },
  { label: 'Tracked click', sub: 'Agreed tracking per campaign', icon: 'cursor' },
  { label: 'Order or lead', sub: 'Attributed to the source', icon: 'check' },
  { label: 'Performance report', sub: 'CPA, CPS, ROAS', icon: 'chart' },
];

/* Publisher sources inside the report. Each opens its metric drawer.
   bar = relative share for the illustrative chart, not an invented metric. */
const sources: { label: string; icon: IconName; note: string; bar: number }[] = [
  { label: 'Affiliate publishers', icon: 'network', note: 'Performance-led publishers running tracked campaigns.', bar: 88 },
  { label: 'Coupon partners', icon: 'coupon', note: 'Coupon sources that drive offer-led traffic.', bar: 64 },
  { label: 'Deal publishers', icon: 'tag', note: 'Deal sites that surface offers to ready buyers.', bar: 52 },
  { label: 'Performance traffic', icon: 'target', note: 'Performance-led sources measured on outcomes.', bar: 40 },
];

const kpis = ['CPA', 'CPS', 'ROAS'];

export default function Screen17() {
  const c = copy[17];
  const drawer = useDrawer();

  const openSource = (label: string, note: string) =>
    drawer.open({
      id: `affiliate-${label}`,
      kind: 'metric',
      eyebrow: 'Affiliate platform',
      title: label,
      sections: [
        { heading: 'What this is', body: note },
        { heading: 'Campaign setup and tracking', body: 'Tracked links and agreed tracking method per campaign.' },
        { heading: 'Commercial metrics', items: ['Clicks', 'Leads', 'Orders', 'Sales', 'CPA', 'CPS', 'ROAS'] },
        { heading: 'Reporting owner', body: 'Confirmed before launch. Platform names shared only where approved.' },
      ],
    });

  return (
    <Screen index={17} tone="light" id="affiliate-platforms" label="Affiliate marketing platforms">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s17-body">
        <Reveal from="up" distance={20} className="s17-dashwrap">
          <div className="s17-dash">
            <div className="s17-dash__bar">
              <span className="s17-dash__dot" />
              <div className="s17-dash__titles">
                <span className="s17-dash__title">Tracked campaign report</span>
                <span className="s17-dash__sub">{c.support}</span>
              </div>
              <span className="s17-dash__tag">
                <MockTag>Built mock, fields pending validation</MockTag>
              </span>
            </div>

            <div className="s17-dash__body">
              {/* Source-to-outcome lane: the report sits at the end of it. */}
              <div className="s17-lane" role="list" aria-label="Publisher source to performance report">
                {lane.map((step, i) => (
                  <div className="s17-lane__step" role="listitem" key={step.label}>
                    <span className={`s17-lane__ico${i === lane.length - 1 ? ' is-accent' : ''}`}>
                      <Icon name={step.icon} size={18} />
                    </span>
                    <span className="s17-lane__txt">
                      <span className="s17-lane__label">{step.label}</span>
                      <span className="s17-lane__sub">{step.sub}</span>
                    </span>
                    {i < lane.length - 1 && <Icon name="arrow" size={16} className="s17-lane__arrow" />}
                  </div>
                ))}
              </div>

              <div className="s17-grid">
                {/* Left: source breakdown with an illustrative volume chart. */}
                <div className="s17-panel">
                  <div className="s17-panel__head">
                    <span className="s17-panel__title">By publisher source</span>
                    <span className="s17-panel__hint mono">Select a source for setup and metrics</span>
                  </div>
                  <div className="s17-sources">
                    {sources.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        className="s17-src"
                        onClick={() => openSource(s.label, s.note)}
                      >
                        <span className="s17-src__ico">
                          <Icon name={s.icon} size={15} />
                        </span>
                        <span className="s17-src__label">{s.label}</span>
                        <span className="s17-src__track" aria-hidden="true">
                          <span className="s17-src__bar" style={{ width: `${s.bar}%` }} />
                        </span>
                        <Icon name="arrow" size={13} className="s17-src__more" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: the performance report. CPA/CPS/ROAS as the focal KPIs. */}
                <div className="s17-report">
                  <div className="s17-panel__head">
                    <span className="s17-panel__title">Performance, where tracking is available</span>
                    <EvidenceTag status="pending">Pending validation</EvidenceTag>
                  </div>
                  <div className="s17-kpis">
                    {kpis.map((k, i) => (
                      <div key={k} className={`s17-kpi${i === 2 ? ' is-accent' : ''}`}>
                        <span className="s17-kpi__label mono">{k}</span>
                        <span className="s17-kpi__value">Pending</span>
                        <span className="s17-kpi__unit mono">per campaign</span>
                      </div>
                    ))}
                  </div>
                  <div className="s17-metricrow">
                    {['Clicks', 'Leads', 'Orders', 'Sales'].map((m) => (
                      <span key={m} className="s17-metric">
                        <span className="s17-metric__k mono">{m}</span>
                        <span className="s17-metric__v">Tracked</span>
                      </span>
                    ))}
                  </div>
                  <p className="s17-note">
                    Separate from strategic partnerships and creator-led distribution. Reporting owner and
                    platform names are confirmed before launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Screen>
  );
}
