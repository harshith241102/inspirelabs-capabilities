import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, NetBox, MockTag } from '../primitives/ui';
import { Icon, type IconName } from '../primitives/icons';
import { useApp } from '../state/store';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s15.css';

/* Activation-family operating map. One board: brand demand fans out of owned
   distribution into four external activation families, each carrying a single
   real (or honestly-labelled illustrative) visual cue, and every family resolves
   to a measurable-action baseline. Not a card menu: the drawer preview and the
   per-family screen route are demoted to small hotspots on each lane. */

interface Family {
  label: string;
  icon: IconName;
  preview: string;
  to: number;
  runs: string;
  measures: string[];
  cue: 'image' | 'mock';
  cueSrc?: string;
  cueAlt?: string;
  cueObjectPos?: string;
  cueCaption: string;
  accent?: boolean;
}

const families: Family[] = [
  {
    label: 'Strategic Partnerships',
    icon: 'partners',
    preview: 'Offers and engagement moments inside partner-owned ecosystems.',
    to: 17,
    runs: 'Fintech, BFSI, payments, telecom, commerce, entertainment, loyalty, and engagement surfaces.',
    measures: ['Potential reachable audience', 'Leads', 'Orders', 'Partner-wise contribution'],
    cue: 'image',
    cueSrc: ASSETS.partner1,
    cueAlt: 'Offer placement inside a partner-owned ecosystem surface',
    cueObjectPos: 'top center',
    cueCaption: 'Partner-owned surface',
    accent: true,
  },
  {
    label: 'Affiliate Marketing Platforms',
    icon: 'network',
    preview: 'Performance-led traffic through tracked publisher and deal sources.',
    to: 18,
    runs: 'Affiliate publishers, coupon partners, and deal publishers on tracked campaigns.',
    measures: ['Clicks', 'Leads', 'Orders', 'Sales', 'CPA', 'CPS', 'ROAS'],
    cue: 'mock',
    cueCaption: 'Tracked publisher source',
  },
  {
    label: 'Channel Amplification',
    icon: 'megaphone',
    preview: 'More places for a brand moment to travel and convert.',
    to: 19,
    runs: 'Social, email, newsletter, push, video, and community channels where relevant.',
    measures: ['Reach', 'Impressions', 'Clicks', 'CTR', 'Channel-wise performance'],
    cue: 'image',
    cueSrc: ASSETS.telegramPost,
    cueAlt: 'A brand moment travelling across a content channel',
    cueObjectPos: 'top center',
    cueCaption: 'Content channel post',
  },
  {
    label: 'Integrated Campaign Promotions',
    icon: 'calendar',
    preview: 'Launch, seasonal, co-branded, and partner-specific promotion moments.',
    to: 20,
    runs: 'Campaign-specific and seasonal extensions where available.',
    measures: ['Reach', 'Clicks', 'Orders', 'Conversion rate'],
    cue: 'image',
    cueSrc: ASSETS.telegramAd,
    cueAlt: 'A campaign promotion creative for a launch moment',
    cueObjectPos: 'top center',
    cueCaption: 'Campaign promotion creative',
  },
];

export default function Screen15() {
  const c = copy[15];
  const drawer = useDrawer();
  const { goTo } = useApp();

  const openFamily = (f: Family) =>
    drawer.open({
      id: `family-${f.label}`,
      kind: 'surface',
      eyebrow: 'Activation family',
      title: f.label,
      sections: [
        { heading: 'What this is', body: f.preview },
        { heading: 'Where it runs', body: f.runs },
        { heading: 'What can be measured', items: f.measures },
      ],
    });

  return (
    <Screen index={15} tone="light" id="activation-overview" label="Activation surfaces overview">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s15-board">
        <div className="s15-map">
        {/* Origin spine: demand fans out of owned distribution (single orange focal) */}
        <div className="s15-origin">
          <span className="s15-origin__kicker">Demand enters from</span>
          <span className="s15-origin__title">Owned distribution</span>
          <span className="s15-origin__node mk-breathe">
            <Icon name="share" size={22} />
          </span>
          <span className="s15-origin__fan" aria-hidden="true">
            <i style={{ ['--mk-i']: 0 } as CSSProperties} />
            <i style={{ ['--mk-i']: 1 } as CSSProperties} />
            <i style={{ ['--mk-i']: 2 } as CSSProperties} />
            <i style={{ ['--mk-i']: 3 } as CSSProperties} />
          </span>
          <span className="s15-origin__note">Four activation families</span>
        </div>

        {/* Four activation lanes reading as one map */}
        <div className="s15-lanes">
          {families.map((f, i) => (
            <article key={f.label} className={`s15-lane mk-hover${f.accent ? ' is-accent' : ''}`}>
              <header className="s15-lane__head">
                <span className="s15-lane__ico">
                  <Icon name={f.icon} size={19} />
                </span>
                <span className="s15-lane__no">{`0${i + 1}`}</span>
                <h2 className="s15-lane__title">{f.label}</h2>
              </header>

              <div className="s15-lane__cue">
                {f.cue === 'image' ? (
                  <img src={f.cueSrc} alt={f.cueAlt ?? ''} loading="lazy" style={{ objectPosition: f.cueObjectPos }} />
                ) : (
                  <div className="s15-mockcue" aria-hidden="true">
                    <span className="s15-mockcue__bar" />
                    <span className="s15-mockcue__rowA" />
                    <span className="s15-mockcue__rowB" />
                    <span className="s15-mockcue__pill">
                      <Icon name="network" size={13} /> tracked link
                    </span>
                  </div>
                )}
                <span className="s15-lane__cap">{f.cueCaption}</span>
                {f.cue === 'mock' && (
                  <span className="s15-lane__mocktag">
                    <MockTag>Illustrative</MockTag>
                  </span>
                )}

                {/* Demoted hotspot affordances: preview drawer + open screen */}
                <button
                  type="button"
                  className="s15-hot s15-hot--preview"
                  onClick={() => openFamily(f)}
                  aria-label={`Preview ${f.label}`}
                >
                  <Icon name="eye" size={14} />
                </button>
                <button
                  type="button"
                  className="s15-hot s15-hot--open"
                  onClick={() => goTo(f.to)}
                  aria-label={`Open ${f.label} screen`}
                >
                  <Icon name="arrow" size={14} />
                </button>
              </div>

              <p className="s15-lane__body">{f.preview}</p>
            </article>
          ))}
        </div>
        </div>

        {/* Shared measurable-action baseline */}
        <div className="s15-base">
          <span className="s15-base__label">
            <Icon name="target" size={15} /> Every family resolves to measurable action
          </span>
          <span className="s15-base__tags">
            <span>Reach</span>
            <span>Clicks</span>
            <span>Leads</span>
            <span>Orders</span>
            <span>Sales</span>
          </span>
        </div>
      </div>

      <div className="s15-foot">
        <NetBox>{c.support}</NetBox>
      </div>
    </Screen>
  );
}
