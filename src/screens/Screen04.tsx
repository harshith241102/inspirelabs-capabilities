import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { FlowRail } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

export default function Screen04() {
  const c = copy[4];
  const drawer = useDrawer();

  return (
    <Screen index={4} tone="light" id="why-system" label="Why brands need a growth system">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Reveal>
            <span className="mini-cap">The customer decision journey, before the brand sees a clean visit</span>
          </Reveal>
          <FlowRail
            nodes={[
              { icon: 'search', label: 'Search', caption: 'Looking for options' },
              { icon: 'tag', label: 'Offers', caption: 'Comparing deals' },
              { icon: 'creator', label: 'Creators', caption: 'Recommendations' },
              { icon: 'community', label: 'Communities', caption: 'Peer signals' },
              { icon: 'partners', label: 'Partners', caption: 'Partner surfaces' },
              { icon: 'store', label: 'Brand visit', caption: 'Where your funnel begins', state: 'endpoint' },
            ]}
            onNode={(i) =>
              drawer.open({
                id: `journey-${i}`,
                kind: 'info',
                eyebrow: 'Pre-brand moment',
                title: ['Search', 'Offers', 'Creators', 'Communities', 'Partners', 'Brand visit'][i],
                sections: [
                  { heading: 'What this is', body: 'A moment in the customer decision before they reach a brand-owned surface.' },
                  { heading: 'Why it matters', body: c.drawer },
                ],
              })
            }
          />
          <Reveal i={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span className="journey-note">
              <Icon name="eye" size={13} />
              Brand-owned tracking usually begins here
            </span>
          </Reveal>
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={5} />
        </div>
      </footer>
    </Screen>
  );
}
