import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, EvidenceTag, AssetImg, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s16.css';

/* Grouped ecosystem labels (reduced from eight chips to a readable band).
   Each opens a surface-preview drawer that keeps the partnership guardrails. */
const ecosystems: { label: string; icon: IconName }[] = [
  { label: 'Fintech', icon: 'bolt' },
  { label: 'BFSI', icon: 'shield' },
  { label: 'Payments', icon: 'tag' },
  { label: 'Telecom', icon: 'bell' },
  { label: 'Commerce', icon: 'store' },
];

/* The three real partner surfaces, read left to right as a storyboard.
   The centre surface is the featured (orange) focal. */
const surfaces: { src: string; title: string; sub: string; lead?: boolean }[] = [
  { src: ASSETS.partner1, title: 'Offer placement', sub: 'A brand offer inside a partner-owned surface' },
  { src: ASSETS.partner2, title: 'Engagement moment', sub: 'A relevant moment where the user already is', lead: true },
  { src: ASSETS.partner3, title: 'Tracked acquisition', sub: 'Clicks, leads, signups and orders, where measurable' },
];

export default function Screen16() {
  const c = copy[16];
  const drawer = useDrawer();

  const openEcosystem = (label: string) =>
    drawer.open({
      id: `eco-${label}`,
      kind: 'surface',
      eyebrow: 'Partner ecosystem',
      title: label,
      sections: [
        { heading: 'Surface example', body: `Offers and engagement moments placed inside ${label.toLowerCase()} partner surfaces.` },
        { heading: 'Offer moment', body: 'A relevant offer or engagement moment where the user already is.' },
        { heading: 'Tracked action and reporting input', items: ['Clicks', 'Leads', 'Signups', 'Orders', 'Partner-wise contribution'] },
        { heading: 'What not to assume', body: 'Partner logos and reach figures need provenance and approval. 200M+ is potential reach only, not guaranteed.' },
      ],
    });

  return (
    <Screen index={16} tone="light" id="strategic-partnerships" label="Strategic partnerships">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s16-body">
        {/* Proof strip: approved 145+, potential 200M+, grouped ecosystem band */}
        <Reveal from="up" distance={12} className="s16-proof">
          <div className="s16-stat s16-stat--approved">
            <span className="s16-stat__num">145+</span>
            <span className="s16-stat__label">Strategic partnerships</span>
            <span className="s16-stat__ev">
              <EvidenceTag status="approved">Approved proof</EvidenceTag>
            </span>
          </div>
          <div className="s16-stat">
            <span className="s16-stat__num">200M+</span>
            <span className="s16-stat__label">Potential reachable audience through partner ecosystems</span>
            <span className="s16-stat__ev">
              <EvidenceTag status="potential">Potential reach, not guaranteed</EvidenceTag>
            </span>
          </div>
          <div className="s16-eco">
            <span className="s16-eco__cap">Ecosystem categories · select to preview a surface</span>
            <div className="s16-eco__tags">
              {ecosystems.map((e) => (
                <button key={e.label} type="button" className="s16-tag" onClick={() => openEcosystem(e.label)}>
                  <Icon name={e.icon} size={14} />
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Dominant visual: three enlarged partner surfaces as a storyboard */}
        <div className="s16-stage">
          <div className="s16-stage__tag">
            <MockTag>Partner surfaces · validation pending</MockTag>
          </div>
          {surfaces.map((s, i) => (
            <Reveal
              key={s.src}
              i={i}
              from="up"
              distance={18}
              className={`s16-frame${s.lead ? ' s16-frame--lead' : ' s16-frame--side'}`}
            >
              <div className="phone s16-phone">
                <AssetImg src={s.src} alt={`Partner ecosystem surface example: ${s.title}`} />
              </div>
              <div className="s16-step">
                <span className="s16-step__n">{i + 1}</span>
                <span className="s16-step__txt">
                  <span className="s16-step__title">{s.title}</span>
                  <span className="s16-step__sub">{s.sub}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="s16-foot">
        <div className="s16-foot__cta">
          <AdvanceCta label={c.cta} to={17} />
        </div>
        <span className="s16-foot__note">Surfaces shown as examples. Partner logos and reach require provenance and approval.</span>
      </div>
    </Screen>
  );
}
