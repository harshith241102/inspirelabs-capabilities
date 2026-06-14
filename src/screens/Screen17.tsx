import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, MockTag, MetricField } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const publishers: { label: string; icon: IconName; note: string }[] = [
  { label: 'Affiliate publishers', icon: 'network', note: 'Performance-led publishers running tracked campaigns.' },
  { label: 'Coupon partners', icon: 'coupon', note: 'Coupon sources that drive offer-led traffic.' },
  { label: 'Deal publishers', icon: 'tag', note: 'Deal sites that surface offers to ready buyers.' },
  { label: 'Performance traffic', icon: 'chart', note: 'Performance-led sources measured on outcomes.' },
  { label: 'Tracked campaigns', icon: 'target', note: 'Campaigns with clear tracking and commercial metrics.' },
];

export default function Screen17() {
  const c = copy[17];
  const drawer = useDrawer();

  return (
    <Screen index={17} tone="light" id="affiliate-platforms" label="Affiliate marketing platforms">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="split">
          <div className="split__text" style={{ flexBasis: 420 }}>
            <p className="s-support">{c.support}</p>
            <div className="surface-list">
              {publishers.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className="surface-list__item"
                  onClick={() =>
                    drawer.open({
                      id: `affiliate-${p.label}`,
                      kind: 'metric',
                      eyebrow: 'Affiliate platform',
                      title: p.label,
                      sections: [
                        { heading: 'What this is', body: p.note },
                        { heading: 'Campaign setup and tracking', body: 'Tracked links and agreed tracking method per campaign.' },
                        { heading: 'Commercial metrics', items: ['Clicks', 'Leads', 'Orders', 'Sales', 'CPA', 'CPS', 'ROAS'] },
                        { heading: 'Reporting owner', body: 'Confirmed before launch. Platform names shared only where approved.' },
                      ],
                    })
                  }
                >
                  <span className="surface-list__ico">
                    <Icon name={p.icon} size={16} />
                  </span>
                  <span className="surface-list__label">{p.label}</span>
                  <Icon name="arrow" size={14} className="surface-list__more" />
                </button>
              ))}
            </div>
            <div className="cta-row">
              <AdvanceCta label={c.cta} to={18} />
            </div>
          </div>

          <div className="split__fig">
            <Reveal from="left" style={{ width: '100%' }}>
              <div className="mock">
                <MockTag>Tracked campaign report · fields pending validation</MockTag>
                <div className="mock__bar">
                  <Icon name="chart" size={16} style={{ color: 'var(--orange)' }} />
                  <span className="mock__title">Tracked campaign report</span>
                </div>
                <div className="mock__pad">
                  <div className="rpt">
                    <div className="rpt__kpis" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                      <MetricField label="CPA" />
                      <MetricField label="CPS" />
                      <MetricField label="ROAS" />
                    </div>
                    {['Affiliate publishers', 'Coupon partners', 'Deal publishers'].map((r) => (
                      <div className="rpt__row" key={r}>
                        <span className="rpt__row-label">{r}</span>
                        <span className="mono" style={{ fontSize: 11, color: 'var(--muted-text)' }}>
                          Clicks · Orders · Sales pending
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Screen>
  );
}
