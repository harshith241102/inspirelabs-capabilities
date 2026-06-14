import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, Phone, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';

const cards: { label: string; icon: IconName; note: string }[] = [
  { label: 'Creator storefronts', icon: 'store', note: 'Curated storefronts that turn recommendations into commerce.' },
  { label: 'Product curation', icon: 'grid', note: 'Creators curate the products they stand behind.' },
  { label: 'Social sharing', icon: 'share', note: 'Storefronts shared across social surfaces.' },
  { label: 'Trusted recommendations', icon: 'creator', note: 'Recommendation-led buyers act on creator trust.' },
  { label: 'Creator-wise tracking', icon: 'chart', note: 'Performance tracked creator by creator where available.' },
];

export default function Screen14() {
  const c = copy[14];
  const drawer = useDrawer();
  return (
    <Screen index={14} tone="light" id="grabshare" label="GrabShare">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="split">
          <div className="split__text" style={{ flexBasis: 440 }}>
            <p className="s-support">{c.support}</p>
            <div className="surface-list">
              {cards.map((cd) => (
                <button
                  key={cd.label}
                  type="button"
                  className="surface-list__item"
                  onClick={() =>
                    drawer.open({
                      id: `grabshare-${cd.label}`,
                      kind: 'surface',
                      eyebrow: 'GrabShare',
                      title: cd.label,
                      sections: [
                        { heading: 'What this is', body: cd.note },
                        { heading: 'Measurement, where available', items: ['Reach', 'Engagement', 'Clicks', 'Orders', 'Creator-wise conversions', 'CPA', 'ROAS'] },
                        { heading: 'What not to assume', body: 'Creator examples and figures need permission and approval before client-facing use.' },
                      ],
                    })
                  }
                >
                  <span className="surface-list__ico">
                    <Icon name={cd.icon} size={16} />
                  </span>
                  <span className="surface-list__label">{cd.label}</span>
                  <Icon name="arrow" size={14} className="surface-list__more" />
                </button>
              ))}
            </div>
            <div className="cta-stack">
              <div className="cta-row">
                <AdvanceCta label={c.cta} to={15} />
              </div>
              {c.aiChip && <SupportChip context={c.aiChip} />}
            </div>
          </div>
          <div className="split__fig">
            <Reveal from="left" style={{ display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 6, left: 6, zIndex: 5 }}>
                <MockTag>Creator storefront</MockTag>
              </div>
              <Phone src={ASSETS.grabshareCreator} alt="GrabShare creator storefront on mobile" width={258} />
              <Phone src={ASSETS.grabshareMain} alt="GrabShare social commerce flow on mobile" width={228} style={{ marginTop: 30 }} />
            </Reveal>
          </div>
        </div>
      </div>
    </Screen>
  );
}
