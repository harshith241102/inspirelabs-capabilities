import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const moments: { label: string; icon: IconName; note: string; confirm: string[] }[] = [
  { label: 'Launch moment', icon: 'rocket', note: 'A focused push around a product or feature launch.', confirm: ['Launch date window', 'Surfaces and assets', 'Tracking setup'] },
  { label: 'Seasonal push', icon: 'calendar', note: 'A seasonal or festive demand moment.', confirm: ['Season and category fit', 'Offer and creative', 'Channel mix'] },
  { label: 'Co-branded offer', icon: 'partners', note: 'A joint offer with a partner brand.', confirm: ['Partner agreement', 'Offer mechanics', 'Reporting split'] },
  { label: 'Partner-specific promotion', icon: 'network', note: 'A promotion built for one partner surface.', confirm: ['Partner surface', 'Offer moment', 'Tracked action'] },
  { label: 'ATL or BTL support', icon: 'megaphone', note: 'Above or below the line support where available.', confirm: ['Format availability', 'Budget scope', 'Measurement plan'] },
  { label: 'Media or event extension', icon: 'flag', note: 'A media or event-led extension where available.', confirm: ['Media or event partner', 'Deliverables', 'What can be measured'] },
];

export default function Screen19() {
  const c = copy[19];
  const drawer = useDrawer();

  return (
    <Screen index={19} tone="light" id="integrated-promotions" label="Integrated campaign promotions">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Reveal>
          <span className="mini-cap">Campaign moment board · example modules, not a date plan</span>
        </Reveal>
        <div className="moments">
          {moments.map((m, i) => (
            <Reveal i={i} step={0.05} key={m.label}>
              <button
                type="button"
                className="moment"
                style={{ width: '100%' }}
                onClick={() =>
                  drawer.open({
                    id: `moment-${m.label}`,
                    kind: 'surface',
                    eyebrow: 'Integrated campaign promotion',
                    title: m.label,
                    sections: [
                      { heading: 'What this is', body: m.note },
                      { heading: 'What must be confirmed before scoping', items: m.confirm },
                      { heading: 'What not to assume', body: 'Use "extension available where scoped" for unconfirmed promotion types. No invented partnerships or media packages.' },
                    ],
                  })
                }
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span className="fcard__ico" style={{ width: 32, height: 32 }}>
                    <Icon name={m.icon} size={16} />
                  </span>
                  <span className="moment__label">{m.label}</span>
                </span>
                <span className="moment__note">{m.note}</span>
                <span className="opentile__more" style={{ marginTop: 2 }}>
                  What to confirm
                  <Icon name="arrow" size={12} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={20} />
        </div>
      </footer>
    </Screen>
  );
}
