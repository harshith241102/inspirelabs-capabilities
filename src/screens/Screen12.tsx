import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox, Shot } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';

export default function Screen12() {
  const c = copy[12];
  const drawer = useDrawer();

  const panels = [
    {
      name: 'GrabCash',
      tagline: 'Community and share-led',
      src: ASSETS.grabcashDeals,
      url: 'grabcash',
      roles: ['Everyday sharers', 'Deal communities', 'Cashback-led converters'],
      actions: ['Clicks', 'Leads', 'Orders', 'Sales', 'User-wise performance'],
    },
    {
      name: 'GrabShare',
      tagline: 'Creator and storefront-led',
      src: ASSETS.grabshareHome,
      url: 'grabshare',
      roles: ['Creators', 'Influencers', 'Recommendation-led buyers'],
      actions: ['Reach', 'Engagement', 'Clicks', 'Orders', 'Creator-wise conversions'],
    },
  ];

  return (
    <Screen index={12} tone="light" id="owned-distribution" label="Owned distribution overview">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: '100%' }} className="two-up">
          {panels.map((p, i) => (
            <Reveal i={i} from={i === 0 ? 'right' : 'left'} key={p.name}>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 19, color: 'var(--ink)' }}>{p.name}</h3>
                    <span className="mono" style={{ fontSize: 10.5, color: 'var(--orange-text)', letterSpacing: '0.04em' }}>{p.tagline}</span>
                  </div>
                </div>
                <Shot src={p.src} alt={`${p.name} product scene`} url={p.url} style={{ height: 'clamp(180px, 26vh, 250px)' }} />
                <button
                  type="button"
                  className="opentile__more"
                  style={{ background: 'none', border: 0, cursor: 'pointer' }}
                  onClick={() =>
                    drawer.open({
                      id: `owned-${p.name}`,
                      kind: 'surface',
                      eyebrow: 'Owned distribution',
                      title: p.name,
                      sections: [
                        { heading: 'What this is', body: c.drawer },
                        { heading: 'Who moves the offer', items: p.roles },
                        { heading: 'Measurable actions, where tracking is available', items: p.actions },
                        { heading: 'What not to assume', body: 'Performance fields are shown without invented numbers until reporting is confirmed.' },
                      ],
                    })
                  }
                >
                  Roles, actions and metrics
                  <Icon name="arrow" size={12} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={13} />
        </div>
      </footer>
    </Screen>
  );
}
