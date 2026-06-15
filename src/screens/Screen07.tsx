import { Screen } from '../primitives/Screen';
import { AdvanceCta, MockTag, EvidenceTag } from '../primitives/ui';
import { Icon, type IconName } from '../primitives/icons';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s07.css';

/* Screen 7 - Capture commerce intent intro.
   Operating-board archetype: three intent lanes read as ONE system, each lane
   illustrated by a real surface example (offer surface, commerce surface, B2B
   software-alternatives). Bar levels are illustrative reads, never measured.
   Single orange focal = the commerce-intent lane. */

interface Lane {
  num: string;
  icon: IconName;
  label: string;
  caption: string;
  level: number;
  accent?: boolean;
  /* surface frame */
  src?: string;
  alt?: string;
  url: string;
  logo?: { src: string; alt: string; tall?: boolean };
  objectPosition?: string;
  mock?: boolean;
}

const lanes: Lane[] = [
  {
    num: '01',
    icon: 'tag',
    label: 'Offer-led intent',
    caption: 'Shoppers actively looking for a deal, coupon, or saving before they buy.',
    level: 64,
    src: ASSETS.grabonHome,
    alt: 'GrabOn offer and coupon surface, an offer-led commerce-intent example',
    url: 'grabon.com',
    logo: { src: ASSETS.grabonLogo, alt: 'GrabOn' },
    objectPosition: 'top center',
  },
  {
    num: '02',
    icon: 'store',
    label: 'Commerce intent',
    caption: 'Shoppers already moving toward a purchase decision on a commerce surface.',
    level: 82,
    accent: true,
    src: ASSETS.grabonCategory,
    alt: 'GrabOn category surface where shoppers move toward a purchase decision',
    url: 'grabon.com/category',
    logo: { src: ASSETS.grabonLogo, alt: 'GrabOn' },
    objectPosition: 'top center',
  },
  {
    num: '03',
    icon: 'compass',
    label: 'Comparison-led intent',
    caption: 'B2B software buyers evaluating SaaS alternatives before the final choice.',
    level: 72,
    url: 'alternatives.co',
    logo: { src: ASSETS.alternativesLogo, alt: 'Alternatives.co', tall: true },
    mock: true,
  },
];

export default function Screen07() {
  const c = copy[7];
  return (
    <Screen index={7} tone="light" id="capture-intro" label="Capture commerce intent intro">
      <header className="s07-head">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 className="s07-title">{c.headline}</h1>
        <p className="s07-sub">{c.subheadline}</p>
      </header>

      <div className="s07-board" role="list" aria-label="Three intent lanes, each with a real surface example">
        {lanes.map((l) => (
          <article
            key={l.num}
            role="listitem"
            className={`s07-lane${l.accent ? ' is-accent' : ''}`}
          >
            <div className="s07-frame">
              <div className="s07-frame__bar">
                <i />
                <i />
                <i />
                <span className="s07-frame__url">{l.url}</span>
                {l.logo && (
                  <span className={`s07-frame__logo${l.logo.tall ? ' is-tall' : ''}`}>
                    <img src={l.logo.src} alt={l.logo.alt} />
                  </span>
                )}
              </div>
              <div className="s07-frame__view">
                {l.mock ? (
                  <Mock />
                ) : (
                  <img
                    src={l.src}
                    alt={l.alt ?? ''}
                    loading="lazy"
                    style={{ objectPosition: l.objectPosition }}
                  />
                )}
                <span className="s07-frame__tag">
                  {l.mock ? (
                    <MockTag>B2B software evaluation</MockTag>
                  ) : (
                    <span className="s07-evtag">
                      <EvidenceTag status="approved">Real GrabOn surface</EvidenceTag>
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="s07-meta">
              <span className="s07-meta__ico">
                <Icon name={l.icon} size={20} />
              </span>
              <span className="s07-meta__num">{l.num}</span>
              <div className="s07-meta__txt">
                <div className="s07-meta__label">{l.label}</div>
                <div className="s07-meta__caption">{l.caption}</div>
              </div>
            </div>

            <div className="s07-strength" aria-hidden="true">
              <span className="s07-strength__cap">Intent signal, illustrative</span>
              <span className="s07-strength__track">
                <span className="s07-strength__fill" style={{ width: `${l.level}%` }} />
              </span>
            </div>
          </article>
        ))}
      </div>

      <footer className="s07-foot">
        <p className="s07-note">{c.support}</p>
        <AdvanceCta label={c.cta} to={8} />
      </footer>
    </Screen>
  );
}

/* Polished illustrative B2B software-alternatives surface for the comparison
   lane (Alternatives.co has no approved screenshot yet). Framed as SaaS
   evaluation, never consumer comparison. */
function Mock() {
  const rows = [
    { tool: 'Your CRM', fit: 'Best fit', accent: true },
    { tool: 'Alternative A', fit: 'Strong fit' },
    { tool: 'Alternative B', fit: 'Partial fit' },
  ];
  return (
    <div className="s07-mock">
      <div className="s07-mock__title">Best CRM alternatives</div>
      <div className="s07-mock__cols">
        <span>Tool</span>
        <span>Use case</span>
        <span>Fit</span>
      </div>
      {rows.map((r) => (
        <div key={r.tool} className={`s07-mock__row${r.accent ? ' is-accent' : ''}`}>
          <span className="s07-mock__tool">{r.tool}</span>
          <span className="s07-mock__bar" />
          <span className="s07-mock__fit">{r.fit}</span>
        </div>
      ))}
      <div className="s07-mock__foot">SaaS buyers, tool evaluators, category researchers</div>
    </div>
  );
}
