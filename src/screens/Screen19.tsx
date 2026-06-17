import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, NetBox, EvidenceTag, MockTag } from '../primitives/ui';
import { FlowStrip } from '../primitives/deck';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s19.css';

/* Campaign-moment columns (the board header). The first column is the
   single orange focal: a worked launch example. The rest are queued moment
   types, scoped only when category, assets, partner and tracking are ready. */
const moments: { label: string; icon: IconName; tag: string; focal?: boolean }[] = [
  { label: 'Launch moment', icon: 'rocket', tag: 'Worked example', focal: true },
  { label: 'Seasonal push', icon: 'calendar', tag: 'Scope on demand' },
  { label: 'Co-branded offer', icon: 'partners', tag: 'Scope on demand' },
  { label: 'Partner-specific', icon: 'network', tag: 'Scope on demand' },
  { label: 'ATL or BTL support', icon: 'megaphone', tag: 'Where available' },
  { label: 'Media or event', icon: 'flag', tag: 'Where available' },
];

/* Swimlane rows. Each row header opens the scoping drawer (a small hotspot,
   not a grid of buttons). Cells carry honest placeholders, never invented
   dates, budgets or media packages. The focal-column cell carries the lead. */
const lanes: {
  key: string;
  label: string;
  icon: IconName;
  focalCell: string;
  cell: string;
  asset?: { src: string; alt: string; caption: string };
  confirm: string[];
}[] = [
  {
    key: 'objective',
    label: 'Objective',
    icon: 'target',
    focalCell: 'New product visibility and first-order pull',
    cell: 'Defined per moment',
    confirm: ['Primary growth objective', 'Category and audience fit', 'Success definition'],
  },
  {
    key: 'offer',
    label: 'Offer',
    icon: 'coupon',
    focalCell: 'Launch coupon and intro pricing',
    cell: 'Offer mechanics agreed',
    confirm: ['Offer format and value', 'Eligibility and limits', 'Approval owner'],
  },
  {
    key: 'surfaces',
    label: 'Surfaces',
    icon: 'layers',
    focalCell: 'Commerce surface plus channel amplification',
    cell: 'Surface mix by readiness',
    asset: { src: ASSETS.telegramAd, alt: 'Telegram campaign ad creative, an example channel artefact', caption: 'Channel artefact' },
    confirm: ['Surface availability', 'Assets and creative', 'Placement scope'],
  },
  {
    key: 'partner',
    label: 'Partner moment',
    icon: 'partners',
    focalCell: 'Optional co-branded partner placement',
    cell: 'Where a partner is scoped',
    asset: { src: ASSETS.partner1, alt: 'Partner surface placement, an example co-branded moment', caption: 'Partner surface' },
    confirm: ['Partner agreement', 'Offer split and reporting', 'Surface and timing'],
  },
  {
    key: 'gate',
    label: 'Proof gate',
    icon: 'shield',
    focalCell: 'Tracking live before spend scales',
    cell: 'Measurement confirmed',
    confirm: ['Tracking setup', 'Attribution method', 'Sample-size threshold'],
  },
  {
    key: 'reporting',
    label: 'Reporting',
    icon: 'chart',
    focalCell: 'Clicks, orders and sales where tracked',
    cell: 'Reporting fields agreed',
    confirm: ['Reporting cadence', 'Owner and source', 'What can be measured'],
  },
];

/* Scoping-gate sequence (thin status strip, not the hero). */
const gates: { label: string; sub: string }[] = [
  { label: 'Brief', sub: 'objective + category' },
  { label: 'Scope', sub: 'offer + surfaces' },
  { label: 'Confirm', sub: 'partner + tracking' },
  { label: 'Run', sub: 'launch + report' },
];

export default function Screen19() {
  const c = copy[19];
  const drawer = useDrawer();

  const openLane = (lane: (typeof lanes)[number]) =>
    drawer.open({
      id: `campaign-lane-${lane.key}`,
      kind: 'surface',
      eyebrow: 'Integrated campaign promotion',
      title: `${lane.label} · what to confirm`,
      sections: [
        {
          heading: 'What this lane sets',
          body: 'One row of the campaign board. Each moment fills this lane only once it is scoped, never assumed.',
        },
        { heading: 'What must be confirmed before scoping', items: lane.confirm },
        {
          heading: 'What not to assume',
          body: 'Use "extension available where scoped" for unconfirmed promotion types. No invented partnerships, media packages, budgets or dates.',
        },
      ],
    });

  return (
    <Screen index={19} tone="light" id="integrated-promotions" label="Integrated campaign promotions">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s19-body">
        <Reveal className="s19-board">
          {/* Board header: campaign-moment columns */}
          <div className="s19-board__head">
            <div className="s19-board__corner">
              <span className="s19-corner-title">Campaign board</span>
              <span className="s19-corner-sub mono">Moments, not a date plan</span>
            </div>
            {moments.map((m) => (
              <div key={m.label} className={`s19-col mk-hover${m.focal ? ' is-focal' : ''}`}>
                <span className="s19-col__ico">
                  <Icon name={m.icon} size={17} />
                </span>
                <span className="s19-col__label">{m.label}</span>
                <span className={`s19-col__tag mono${m.focal ? ' is-focal' : ''}`}>{m.tag}</span>
              </div>
            ))}
            <div className="s19-board__mocktag">
              <MockTag>Illustrative board</MockTag>
            </div>
          </div>

          {/* Swimlane rows */}
          {lanes.map((lane, i) => (
            <Reveal i={i} step={0.04} key={lane.key} className="s19-row">
              <button type="button" className="s19-row__head" onClick={() => openLane(lane)}>
                <span className="s19-row__ico">
                  <Icon name={lane.icon} size={16} />
                </span>
                <span className="s19-row__label">{lane.label}</span>
                <span className="s19-row__more mono">
                  Confirm
                  <Icon name="arrow" size={11} />
                </span>
              </button>

              {/* Focal column cell - the worked launch example. A live flow
                  pulse cascades down this lane (top to bottom) while the slide
                  is open, reading the launch progressing through every row. */}
              <div className="s19-cell s19-cell--focal mk-hover" style={{ ['--mk-i']: i } as CSSProperties}>
                <span className="s19-cell__flow" aria-hidden="true" />
                {lane.asset ? (
                  <span className="s19-cell__art">
                    <img src={lane.asset.src} alt={lane.asset.alt} loading="lazy" />
                  </span>
                ) : (
                  <span className="s19-cell__dot" aria-hidden="true" />
                )}
                <span className="s19-cell__txt">{lane.focalCell}</span>
              </div>

              {/* Remaining moment cells (placeholders) */}
              {moments.slice(1).map((m) => (
                <div className="s19-cell mk-hover" key={m.label}>
                  <span className="s19-cell__ph mono">{lane.cell}</span>
                </div>
              ))}
            </Reveal>
          ))}
        </Reveal>

        <div className="s19-gates">
          <div className="s19-gates__lead">
            <span className="s19-gates__head">
              <Icon name="cycle" size={15} />
              Scoping gates
            </span>
            <EvidenceTag status="pending">Scoping placeholders, not a date plan</EvidenceTag>
          </div>
          <FlowStrip
            style={{ flex: 1 }}
            steps={gates.map((g, i) => ({
              label: g.label,
              sub: g.sub,
              state: i === 0 ? 'active' : 'neutral',
            }))}
          />
        </div>
      </div>

      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
