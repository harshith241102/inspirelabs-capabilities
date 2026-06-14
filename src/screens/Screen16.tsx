import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, EvidenceTag, AssetImg, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';

const ecosystems: { label: string; icon: IconName }[] = [
  { label: 'Fintech', icon: 'bolt' },
  { label: 'BFSI', icon: 'shield' },
  { label: 'Payments', icon: 'tag' },
  { label: 'Telecom', icon: 'bell' },
  { label: 'Commerce', icon: 'store' },
  { label: 'Entertainment', icon: 'play' },
  { label: 'Loyalty', icon: 'target' },
  { label: 'Engagement', icon: 'community' },
];

export default function Screen16() {
  const c = copy[16];
  const drawer = useDrawer();

  return (
    <Screen index={16} tone="light" id="strategic-partnerships" label="Strategic partnerships">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="split">
          <div className="split__text" style={{ flexBasis: 430 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="proofstat">
                <span className="proofstat__num">145+</span>
                <span className="proofstat__label">Strategic partnerships</span>
                <EvidenceTag status="approved">Approved proof</EvidenceTag>
              </div>
              <div className="proofstat">
                <span className="proofstat__num">200M+</span>
                <span className="proofstat__label">Potential reachable audience through partner ecosystems</span>
                <EvidenceTag status="potential">Potential reach, not guaranteed</EvidenceTag>
              </div>
            </div>

            <span className="mini-cap">Ecosystem categories · tap to preview a surface</span>
            <div className="metric-strip">
              {ecosystems.map((e) => (
                <button
                  key={e.label}
                  type="button"
                  className="ecotag"
                  onClick={() =>
                    drawer.open({
                      id: `eco-${e.label}`,
                      kind: 'surface',
                      eyebrow: 'Partner ecosystem',
                      title: e.label,
                      sections: [
                        { heading: 'Surface example', body: `Offers and engagement moments placed inside ${e.label.toLowerCase()} partner surfaces.` },
                        { heading: 'Offer moment', body: 'A relevant offer or engagement moment where the user already is.' },
                        { heading: 'Tracked action and reporting input', items: ['Clicks', 'Leads', 'Signups', 'Orders', 'Partner-wise contribution'] },
                        { heading: 'What not to assume', body: 'Partner logos and reach figures need provenance and approval. 200M+ is potential reach only.' },
                      ],
                    })
                  }
                >
                  <Icon name={e.icon} size={14} />
                  {e.label}
                </button>
              ))}
            </div>

            <div className="cta-stack">
              <div className="cta-row">
                <AdvanceCta label={c.cta} to={17} />
              </div>
              {c.aiChip && <SupportChip context={c.aiChip} />}
            </div>
          </div>

          <div className="split__fig">
            <Reveal from="left" style={{ position: 'relative', display: 'flex', gap: 14, justifyContent: 'center', width: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
                <MockTag>Partner surfaces · validation pending</MockTag>
              </div>
              {[ASSETS.partner1, ASSETS.partner2, ASSETS.partner3].map((src, i) => (
                <div
                  key={src}
                  className="phone"
                  style={{ width: 'clamp(150px, 14vw, 190px)', marginTop: i === 1 ? 0 : 26 }}
                >
                  <AssetImg src={src} alt={`Partner ecosystem surface example ${i + 1}`} />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </Screen>
  );
}
