import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, EvidenceTag } from '../primitives/ui';
import { ProductLogo } from '../primitives/deck';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s14.css';

/* The three GrabShare surfaces that carry the story, kept as the dominant
   phone gallery. Real captures (no MockTag), labelled with an evidence tag. */
const shots: { src: string; alt: string; cap: string; width: number; lift: number }[] = [
  {
    src: ASSETS.grabshareCreator,
    alt: 'GrabShare creator storefront on mobile, curated products a creator stands behind',
    cap: 'Creator storefront',
    width: 250,
    lift: 0,
  },
  {
    src: ASSETS.grabshareMain,
    alt: 'GrabShare social commerce flow on mobile, recommendations shared across social surfaces',
    cap: 'Social commerce flow',
    width: 226,
    lift: 34,
  },
  {
    src: ASSETS.grabshareHome,
    alt: 'GrabShare home feed on mobile, recommendation-led buyers browsing creator picks',
    cap: 'Recommendation feed',
    width: 226,
    lift: 68,
  },
];

/* Left list demoted to a compact creator-commerce rail: numbered callouts with
   small hotspot affordances opening the existing definition drawers. */
const rail: { label: string; icon: IconName; note: string; accent?: boolean }[] = [
  { label: 'Creator storefronts', icon: 'store', note: 'Curated storefronts that turn recommendations into commerce.' },
  { label: 'Product curation', icon: 'grid', note: 'Creators curate the products they stand behind.' },
  { label: 'Social sharing', icon: 'share', note: 'Storefronts shared across social surfaces.' },
  { label: 'Creator-wise tracking', icon: 'chart', note: 'Performance tracked creator by creator where available.', accent: true },
];

export default function Screen14() {
  const c = copy[14];
  const drawer = useDrawer();

  const openRow = (label: string, note: string) =>
    drawer.open({
      id: `grabshare-${label}`,
      kind: 'surface',
      eyebrow: 'GrabShare',
      title: label,
      sections: [
        { heading: 'What this is', body: note },
        { heading: 'Measurement, where available', items: ['Reach', 'Engagement', 'Clicks', 'Orders', 'Creator-wise conversions', 'CPA', 'ROAS'] },
        { heading: 'What not to assume', body: 'Creator examples and figures need permission and approval before client-facing use.' },
      ],
    });

  return (
    <Screen index={14} tone="light" id="grabshare" label="GrabShare">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s14-body">
        {/* Dominant visual: GrabShare phone gallery */}
        <Reveal from="left" className="s14-gallery">
          <div className="s14-gallery__logo">
            <ProductLogo src={ASSETS.grabshareLogo} alt="GrabShare" height={24} />
          </div>
          <div className="s14-phones">
            {shots.map((s, i) => (
              <Reveal key={s.cap} i={i} from="up" distance={18} className="s14-phone" style={{ marginTop: s.lift }}>
                <div className="phone" style={{ width: s.width }}>
                  <img src={s.src} alt={s.alt} loading="lazy" />
                </div>
                <span className="s14-phone__cap mono">{s.cap}</span>
              </Reveal>
            ))}
          </div>
          <div className="s14-gallery__tag">
            <EvidenceTag status="pending">Creator surfaces, approval pending</EvidenceTag>
          </div>
        </Reveal>

        {/* Support rail: numbered creator-commerce callouts + measurement focal */}
        <aside className="s14-side">
          <p className="s14-lead">{c.support}</p>
          <div className="s14-rail" role="list">
            {rail.map((r, i) => (
              <button
                key={r.label}
                type="button"
                className={`s14-row${r.accent ? ' s14-row--accent' : ''}`}
                onClick={() => openRow(r.label, r.note)}
              >
                <span className="s14-row__n">{i + 1}</span>
                <span className="s14-row__ico">
                  <Icon name={r.icon} size={17} />
                </span>
                <span className="s14-row__label">{r.label}</span>
                <Icon name="arrow" size={14} className="s14-row__more" />
              </button>
            ))}
          </div>
          <div className="s14-measure">
            <span className="s14-measure__head">
              <Icon name="chart" size={16} />
              Creator-wise performance, where available
            </span>
            <div className="s14-measure__metrics">
              {['Reach', 'Engagement', 'Clicks', 'Orders', 'Conversions', 'CPA', 'ROAS'].map((m) => (
                <span key={m} className="s14-metric">{m}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="s14-foot">
        <AdvanceCta label={c.cta} to={15} />
        {c.aiChip && (
          <div className="s14-foot__chip">
            <SupportChip context={c.aiChip} />
          </div>
        )}
      </div>
    </Screen>
  );
}
