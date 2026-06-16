import { Screen } from '../primitives/Screen';
import { AdvanceCta } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { ASSETS } from '../lib/assets';
import { copy } from '../content/copy';
import './cover.css';

const proof = [
  { v: '$4.8B', l: 'GMV influenced', accent: true },
  { v: '76M+', l: 'users' },
  { v: '3,800+', l: 'brands' },
  { v: '12+', l: 'years' },
];

export default function Screen00() {
  const c = copy[0];

  return (
    <Screen index={0} tone="light" id="cover" label="Cover">
      <div className="cover">
        <div className="cover__top">
          <img
            className="cover__lockup"
            src={ASSETS.lockupInk}
            alt="Inspirelabs"
            loading="eager"
            fetchPriority="high"
          />
          <span className="cover__kicker mono">Client capabilities</span>
        </div>

        <div className="cover__main">
          <div className="cover__copy">
            <Reveal from="up" distance={14}>
              <span className="eyebrow">The growth system behind GrabOn</span>
            </Reveal>
            <Reveal i={1}>
              <h1 className="cover__title">{c.headline}</h1>
            </Reveal>
            <Reveal i={2}>
              <p className="cover__sub">{c.subheadline}</p>
            </Reveal>
            <Reveal i={3}>
              <p className="cover__support">{c.support}</p>
            </Reveal>
            <Reveal i={4}>
              <div className="cta-row" style={{ marginTop: 8 }}>
                <AdvanceCta label={c.cta} to={1} />
                <span className="cover__hint mono">3 quick questions, 5 minute read</span>
              </div>
            </Reveal>
          </div>

          <Reveal from="right" distance={28} className="cover__hero">
            <div className="cover__card">
              <div className="cover__card-head">
                <span className="cover__card-title">Growth that compounds, not resets</span>
              </div>
              <div className="cover__chartwrap">
                <svg
                  className="cover__chart"
                  viewBox="0 0 560 270"
                  role="img"
                  aria-label="Inspirelabs growth compounds while rented agencies reset each quarter"
                >
                  <line x1="42" y1="18" x2="42" y2="238" stroke="#e6e6ea" strokeWidth="1" />
                  <line x1="42" y1="238" x2="544" y2="238" stroke="#e6e6ea" strokeWidth="1" />
                  <text
                    x="26"
                    y="128"
                    className="cover__chart-axis"
                    textAnchor="middle"
                    transform="rotate(-90 26 128)"
                  >
                    Growth
                  </text>

                  <polyline
                    points="46,224 112,192 126,222 192,192 206,222 272,191 286,221 352,191 366,221 432,192 446,221 512,194"
                    fill="none"
                    stroke="#aab0bb"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <circle cx="512" cy="194" r="4" fill="#aab0bb" />

                  <path
                    d="M46,224 C198,218 356,164 522,44"
                    fill="none"
                    stroke="#ff7a45"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                  />
                  <circle cx="522" cy="44" r="6" fill="#ff7a45" />
                  <path d="M522,44 l-8,2 M522,44 l-2,8" stroke="#ff7a45" strokeWidth="3" fill="none" strokeLinecap="round" />

                  <text x="300" y="78" className="cover__chart-lblO">
                    Inspirelabs · compounds
                  </text>
                  <text x="150" y="258" className="cover__chart-lblG">
                    Rented agencies · resets each quarter
                  </text>
                </svg>
              </div>
              <div className="cover__proof">
                {proof.map((p) => (
                  <div className={`cover__stat${p.accent ? ' is-accent' : ''}`} key={p.l}>
                    <span className="cover__stat-v">{p.v}</span>
                    <span className="cover__stat-l">{p.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Screen>
  );
}
