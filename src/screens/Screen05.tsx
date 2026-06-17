import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, EvidenceTag, MockTag, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import type { EvidenceStatus } from '../primitives/ui';
import './s05.css';

interface AssetTile {
  label: string;
  sublabel?: string;
  icon: IconName;
  enables: string;
  /** Real product capture, when one exists for this advantage. */
  shot?: string;
  shotAlt?: string;
  logo?: { src: string; alt: string };
  /** Built mini-visual for advantages with no real capture (honest, labelled). */
  built?: 'signals' | 'measure';
  proof: string;
  proofStatus: EvidenceStatus;
  metricStatus: EvidenceStatus;
  evidence: { label: string; status: EvidenceStatus }[];
  accent?: boolean;
}

// Tiles match copy[5].cards: Owned surfaces, Distribution depth, Shopper signals,
// In-house AI Lab, Measurement discipline. Real captures are used only where one
// exists; the two without a capture (shopper signals, measurement) use honest,
// MockTag-labelled built mini-visuals rather than a borrowed product screenshot.
const tiles: AssetTile[] = [
  {
    label: 'Owned surfaces',
    icon: 'store',
    enables: 'Commerce-intent surfaces where offer-ready shoppers already are.',
    shot: ASSETS.grabonHome,
    shotAlt: 'GrabOn home, a live commerce-intent surface',
    logo: { src: ASSETS.grabonLogo, alt: 'GrabOn' },
    proof: 'GrabOn live surface',
    proofStatus: 'approved',
    metricStatus: 'pending',
    evidence: [
      { label: 'GrabOn surface examples', status: 'approved' },
      { label: 'Surface-wise tracking', status: 'pending' },
    ],
    accent: true,
  },
  {
    label: 'Distribution depth',
    icon: 'share',
    enables: 'Owned surfaces, GrabCash and GrabShare, that move demand beyond one platform.',
    shot: ASSETS.grabcashDeals,
    shotAlt: 'GrabCash community deal sharing surface',
    logo: { src: ASSETS.grabcashLogo, alt: 'GrabCash' },
    proof: 'GrabCash and GrabShare',
    proofStatus: 'approved',
    metricStatus: 'pending',
    evidence: [
      { label: 'GrabCash and GrabShare surfaces', status: 'approved' },
      { label: 'Partner-wise contribution', status: 'pending' },
    ],
  },
  {
    label: 'Shopper signals',
    sublabel: 'AudienceSeed by Inspirelabs',
    icon: 'signal',
    enables: 'Approved shopper-intent signals read from commerce surfaces, for retargeting and offer intelligence.',
    built: 'signals',
    proof: 'AudienceSeed by Inspirelabs',
    proofStatus: 'approved',
    metricStatus: 'pending',
    evidence: [
      { label: 'Approved, policy-compliant signals', status: 'approved' },
      { label: 'Signal-quality reporting', status: 'pending' },
    ],
  },
  {
    label: 'In-house AI Lab',
    icon: 'flask',
    enables: 'Productised agents that speed recurring growth work with human review.',
    shot: ASSETS.rankdriveDash,
    shotAlt: 'RankDrive search-visibility dashboard, an in-house AI product',
    logo: { src: ASSETS.rankdriveLogo, alt: 'RankDrive' },
    proof: 'RankDrive and WriteGenius',
    proofStatus: 'approved',
    metricStatus: 'pending',
    evidence: [
      { label: 'RankDrive and WriteGenius', status: 'approved' },
      { label: 'Output throughput', status: 'pending' },
    ],
  },
  {
    label: 'Measurement discipline',
    icon: 'target',
    enables: 'Defined goals, tracking, and review cycles that keep the system accountable.',
    built: 'measure',
    proof: 'Commitment framework',
    proofStatus: 'approved',
    metricStatus: 'pending',
    evidence: [
      { label: 'Commitment framework', status: 'approved' },
      { label: 'Client KPI sources', status: 'pending' },
    ],
  },
];

function BuiltVisual({ kind }: { kind: 'signals' | 'measure' }) {
  if (kind === 'signals') {
    const bars = [38, 56, 72, 90, 64];
    return (
      <span className="s05-built s05-built--signals">
        <span className="s05-built__bars" aria-hidden="true">
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }}>
              <span className="s05-built__fill" style={{ ['--mk-i']: i } as CSSProperties} />
            </span>
          ))}
        </span>
        <span className="s05-built__tag">
          <MockTag>AudienceSeed by Inspirelabs</MockTag>
        </span>
      </span>
    );
  }
  return (
    <span className="s05-built s05-built--measure">
      <span className="s05-built__rings" aria-hidden="true">
        <Icon name="target" size={48} />
      </span>
      <span className="s05-built__tag">
        <MockTag>Built capability</MockTag>
      </span>
    </span>
  );
}

export default function Screen05() {
  const c = copy[5];
  const drawer = useDrawer();

  const openTile = (t: AssetTile) =>
    drawer.open({
      id: `advantage-${t.label}`,
      kind: 'proof',
      eyebrow: 'Operating advantage',
      title: t.label,
      sections: [
        { heading: 'What it enables', body: t.enables },
        { heading: 'What proof or input is required', body: c.drawer },
      ],
      evidence: t.evidence,
    });

  return (
    <Screen index={5} tone="light" id="operating-advantage" label="Inspirelabs operating advantage">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s05-board">
        <div className="s05-rail" aria-hidden="true">
          <span className="s05-rail__cap mono">Assets already in motion</span>
          <span className="s05-rail__line">
            <span className="s05-rail__spark" />
          </span>
        </div>

        <div className="s05-grid" role="list">
          {tiles.map((t, i) => (
            <Reveal i={i} step={0.06} key={t.label} className="s05-cell" role="listitem">
              <button
                type="button"
                className={`s05-tile${t.accent ? ' is-accent' : ''}`}
                onClick={() => openTile(t)}
              >
                <span className="s05-tile__shot">
                  {t.shot ? (
                    <img src={t.shot} alt={t.shotAlt ?? ''} loading="lazy" />
                  ) : (
                    <BuiltVisual kind={t.built ?? 'measure'} />
                  )}
                  {t.logo && (
                    <span className="s05-tile__logo">
                      <img src={t.logo.src} alt={t.logo.alt} />
                    </span>
                  )}
                  <span className={`s05-tile__num mono${t.accent ? ' mk-breathe' : ''}`}>{i + 1}</span>
                </span>

                <span className="s05-tile__body">
                  <span className="s05-tile__head">
                    <span className="s05-tile__ico">
                      <Icon name={t.icon} size={17} />
                    </span>
                    <span className="s05-tile__label">{t.label}</span>
                  </span>
                  <span className="s05-tile__enables">{t.enables}</span>
                  <span className="s05-tile__strip">
                    <span className="s05-tile__proof">{t.proof}</span>
                    <span className="s05-tile__tags">
                      <EvidenceTag status={t.proofStatus}>Asset live</EvidenceTag>
                      <EvidenceTag status={t.metricStatus}>Metrics pending</EvidenceTag>
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <footer className="s05-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
