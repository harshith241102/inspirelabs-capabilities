import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useApp } from '../state/store';
import { useScreenPos } from '../state/screenPos';
import { copy } from '../content/copy';
import './s06.css';

/* Screen 6 - Growth system overview. Fixed deck frame (DeckHeader, Net box,
   gridmark) preserved. Body is a reader-facing FUNNEL of elevated, tonally
   graded plates that narrow on a central spine from Awareness to Acquisition.

   Motion (CSS-driven, see s06.css):
   - On-open choreography re-fires each time the slide becomes active (the
     `is-active` class is toggled from the deck's currentIndex). Plates rise
     top-to-bottom, entries draw in, surfaces pop, the growth output lands.
   - A live "flow" loop runs only while the slide is open: intake sparks travel
     each entry arrow into the funnel, a soft activation wash sweeps stage to
     stage, the spout streams into the output, and the growth box breathes.
   - Hover lifts the hovered stage and lights up its entry + surfaces.
   All motion is disabled under ?export=1 and prefers-reduced-motion (final
   static state), so the PDF/screenshot path and overflow gate stay clean. */

interface Stage {
  name: string;
  benefit: string;
  icon: IconName;
  enters: string;
  surfaces: string[];
  width: number;
  tone: string;
}

const stages: Stage[] = [
  { name: 'Awareness', benefit: 'Get discovered by new audiences', icon: 'megaphone', enters: 'New audiences', surfaces: ['GrabShare', 'Partnerships'], width: 772, tone: '#ffffff' },
  { name: 'Discovery', benefit: 'Be found when they search', icon: 'search', enters: 'People searching', surfaces: ['GrabOn', 'Alternatives.co', 'RankDrive'], width: 628, tone: '#f6f8fa' },
  { name: 'Engagement', benefit: 'Bring shoppers back', icon: 'cycle', enters: 'Returning shoppers', surfaces: ['GrabCash', 'AudienceSeed', 'Telegram'], width: 484, tone: '#eef2f6' },
  { name: 'Acquisition', benefit: 'Turn interest into sales', icon: 'target', enters: 'Ready to buy', surfaces: ['GrabOn', 'GrabCash', 'Affiliates'], width: 340, tone: '#e6ebf1' },
];

const CX = 880;
const PLATE_H = 112;
const STEP = 128;
const TOP = 14;
const ICON = 52;
const GAPC = 18;
const NAME_CW = 13.4; // approx advance, Hanken 800 @ 24px
const BEN_CW = 7.2;   // approx advance, Lato @ 14.5px
const ARROW_START = 380;
const plateY = (i: number) => TOP + i * STEP;

export default function Screen06() {
  const c = copy[6];
  const pos = useScreenPos();
  const { currentIndex } = useApp();
  const active = (pos ?? 6) === currentIndex;
  const lastBottom = plateY(stages.length - 1) + PLATE_H; // 510

  return (
    <Screen index={6} tone="light" id="overview" label="Growth system overview">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s06-body">
        <Reveal from="up" distance={16} className="s06-funnel">
          <svg className={`s06-svg${active ? ' is-active' : ''}`} viewBox="0 0 1760 644" role="img" aria-label="A funnel of narrowing plates from Awareness to Acquisition into measurable growth, audiences entering on the left and surfaces on the right">
            <defs>
              <filter id="s06plate" x="-14%" y="-40%" width="128%" height="200%">
                <feDropShadow dx="0" dy="9" stdDeviation="18" floodColor="#0e0f0a" floodOpacity="0.10" />
              </filter>
              <filter id="s06glow" x="-30%" y="-60%" width="160%" height="240%">
                <feDropShadow dx="0" dy="12" stdDeviation="22" floodColor="#ff7a45" floodOpacity="0.36" />
              </filter>
            </defs>

            {stages.map((s, i) => {
              const y = plateY(i);
              const cy = y + PLATE_H / 2;
              const px = CX - s.width / 2;
              const pr = CX + s.width / 2;

              // Centre the icon + label lockup on the spine.
              const textW = Math.max(s.name.length * NAME_CW, s.benefit.length * BEN_CW);
              const groupW = ICON + GAPC + textW;
              const gx = CX - groupW / 2;
              const tx = gx + ICON + GAPC;
              const dx = px - ARROW_START; // spark travels the full arrow into the entry node

              const vars = { ['--i']: i, ['--dx']: `${dx}px` } as CSSProperties;
              let chipX = pr + 24;
              return (
                <g key={s.name} className="s06-stage" style={vars}>
                  {/* plate + content (this layer lifts on hover) */}
                  <g className="s06-stage__plate">
                    <rect className="s06-plate" x={px} y={y} width={s.width} height={PLATE_H} rx={18} fill={s.tone} stroke="#e4e6eb" filter="url(#s06plate)" />
                    {/* activation wash - soft orange sweep, stage to stage, while open */}
                    <rect className="s06-pulse" x={px} y={y} width={s.width} height={PLATE_H} rx={18} fill="#ff7a45" />

                    <g className="s06-tile" transform={`translate(${gx}, ${cy - ICON / 2})`}>
                      <rect width={ICON} height={ICON} rx="14" fill="#fff" stroke="#e3e5ea" />
                      <g className="s06-ficon" transform="translate(13, 13)">
                        <Icon name={s.icon} size={26} />
                      </g>
                    </g>
                    <text x={tx} y={cy - 3} className="s06-fname">{s.name}</text>
                    <text x={tx} y={cy + 20} className="s06-fben">{s.benefit}</text>
                  </g>

                  {/* entry point hugs the funnel on the left */}
                  <g className="s06-entry">
                    <text x={362} y={cy - 4} textAnchor="end" className="s06-fenter">{s.enters}</text>
                    <text x={362} y={cy + 15} textAnchor="end" className="s06-fentercap">ENTERS HERE</text>
                    <path className="s06-arrow" pathLength={100} d={`M${ARROW_START} ${cy} H${px - 16} m-9 -6 l9 6 l-9 6`} fill="none" stroke="#ff7a45" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    {/* arrival ripple sits behind the entry node */}
                    <circle className="s06-noderipple" cx={px} cy={cy} r="5.5" fill="none" stroke="#ff7a45" strokeWidth="2" />
                    <circle className="s06-node" cx={px} cy={cy} r="5.5" fill="#ff7a45" stroke="#fff" strokeWidth="2" />
                    {/* live intake spark travelling the arrow into the node */}
                    <circle className="s06-spark" cx={ARROW_START} cy={cy} r="4.5" fill="#ff7a45" />
                  </g>

                  {/* surfaces hug the funnel on the right */}
                  <g className="s06-surf">
                    <circle cx={pr} cy={cy} r="4" fill="#c4c8d0" />
                    <line x1={pr + 4} y1={cy} x2={pr + 22} y2={cy} stroke="#d7dae1" strokeWidth="1.5" strokeDasharray="2 4" />
                    {s.surfaces.map((surf) => {
                      const w = surf.length * 7.7 + 26;
                      const el = (
                        <g key={surf} className="s06-chip">
                          <rect x={chipX} y={cy - 15} width={w} height={30} rx={9} fill="#fff" stroke="#e6e7ec" />
                          <text x={chipX + w / 2} y={cy + 5} textAnchor="middle" className="s06-fchip">{surf}</text>
                        </g>
                      );
                      chipX += w + 9;
                      return el;
                    })}
                  </g>
                </g>
              );
            })}

            {/* Spout from the narrow tip streaming into the lit growth output */}
            <path className="s06-spout" d={`M${CX} ${lastBottom} V${lastBottom + 24}`} fill="none" stroke="#ff7a45" strokeWidth="2.4" strokeDasharray="3 5" />
            <g className="s06-grow">
              <rect className="s06-grow-halo" x="684" y={lastBottom + 28} width="392" height="86" rx="18" fill="#ff7a45" />
              <rect x="684" y={lastBottom + 28} width="392" height="86" rx="18" fill="#ff7a45" filter="url(#s06glow)" />
              <circle cx="742" cy={lastBottom + 71} r="23" fill="rgba(255,255,255,0.22)" />
              <path d={`M731 ${lastBottom + 71} l8 9 l14 -16`} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="782" y={lastBottom + 64} className="s06-fgoal">Measurable growth</text>
              <text x="782" y={lastBottom + 89} className="s06-fgoalsub">Tracked to a repeat sale</text>
            </g>
          </svg>
        </Reveal>
      </div>

      <footer className="s06-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
