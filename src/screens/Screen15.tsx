import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { CardGrid } from '../primitives/blocks';
import { useApp } from '../state/store';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const families: { label: string; icon: IconName; preview: string; to: number; runs: string; measures: string[] }[] = [
  {
    label: 'Strategic Partnerships',
    icon: 'partners',
    preview: 'Offers and engagement moments inside partner-owned ecosystems.',
    to: 16,
    runs: 'Fintech, BFSI, payments, telecom, commerce, entertainment, loyalty, and engagement surfaces.',
    measures: ['Potential reachable audience', 'Leads', 'Orders', 'Partner-wise contribution'],
  },
  {
    label: 'Affiliate Marketing Platforms',
    icon: 'network',
    preview: 'Performance-led traffic through tracked publisher and deal sources.',
    to: 17,
    runs: 'Affiliate publishers, coupon partners, and deal publishers on tracked campaigns.',
    measures: ['Clicks', 'Leads', 'Orders', 'Sales', 'CPA', 'CPS', 'ROAS'],
  },
  {
    label: 'Channel Amplification',
    icon: 'megaphone',
    preview: 'More places for a brand moment to travel and convert.',
    to: 18,
    runs: 'Social, email, newsletter, push, video, and community channels where relevant.',
    measures: ['Reach', 'Impressions', 'Clicks', 'CTR', 'Channel-wise performance'],
  },
  {
    label: 'Integrated Campaign Promotions',
    icon: 'calendar',
    preview: 'Launch, seasonal, co-branded, and partner-specific promotion moments.',
    to: 19,
    runs: 'Campaign-specific and seasonal extensions where available.',
    measures: ['Reach', 'Clicks', 'Orders', 'Conversion rate'],
  },
];

export default function Screen15() {
  const c = copy[15];
  const drawer = useDrawer();
  const { goTo } = useApp();

  return (
    <Screen index={15} tone="light" id="activation-overview" label="Activation surfaces overview">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Reveal>
          <span className="mini-cap">Four families, shown separately · each has its own screen ahead</span>
        </Reveal>
        <CardGrid min={240} gap={14}>
          {families.map((f, i) => (
            <Reveal i={i} step={0.07} key={f.label}>
              <div className="opentile" style={{ height: '100%' }}>
                <span className="opentile__head">
                  <span className="opentile__ico opentile__ico--accent">
                    <Icon name={f.icon} size={19} />
                  </span>
                  <span className="opentile__title">{f.label}</span>
                </span>
                <span className="opentile__body">{f.preview}</span>
                <div style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingTop: 4 }}>
                  <button
                    type="button"
                    className="opentile__more"
                    style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--grey)' }}
                    onClick={() =>
                      drawer.open({
                        id: `family-${f.label}`,
                        kind: 'surface',
                        eyebrow: 'Activation family',
                        title: f.label,
                        sections: [
                          { heading: 'What this is', body: f.preview },
                          { heading: 'Where it runs', body: f.runs },
                          { heading: 'What can be measured', items: f.measures },
                        ],
                      })
                    }
                  >
                    Preview
                    <Icon name="eye" size={12} />
                  </button>
                  <button
                    type="button"
                    className="opentile__more"
                    style={{ background: 'none', border: 0, cursor: 'pointer' }}
                    onClick={() => goTo(f.to)}
                  >
                    Open screen
                    <Icon name="arrow" size={12} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </CardGrid>
      </div>
      <footer className="s-footer-row">
        <NetBox>Each surface family is shown on its own, so the breadth stays clear.</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={16} />
        </div>
      </footer>
    </Screen>
  );
}
