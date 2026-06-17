import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { ASSETS } from '../lib/assets';
import { copy } from '../content/copy';
import './s08-decision-moments.css';

/* Inserted screen (display position 8, copy key 38) - platform audiences map.
   Sits directly after Screen 07 (commerce-intent lanes). ONE operating map:
   each owned surface, the audience and intent it reaches, and the brand value,
   read against a Before / During / After decision spectrum. No invented metrics.
   Single orange focal = the "During decision" band, the conversion moment. */

interface SurfaceRow {
  name: string;
  logo?: string;
  icon?: IconName;
  phase: string;
  audience: string;
  intent: string;
  value: string;
}

const surfaces: SurfaceRow[] = [
  {
    name: 'GrabOn',
    logo: ASSETS.grabonLogo,
    phase: 'During',
    audience: 'Deal seekers, coupon users, purchase-ready shoppers',
    intent: 'Savings intent, merchant search, coupon discovery, category browsing',
    value: 'Reaches shoppers close to the purchase decision',
  },
  {
    name: 'GrabCash',
    logo: ASSETS.grabcashLogo,
    phase: 'After',
    audience: 'Reward-led shoppers, repeat savers, community sharers',
    intent: 'Cashback motivation, repeat purchase behaviour, share-led traffic',
    value: 'Creates repeat engagement and payout-controlled distribution',
  },
  {
    name: 'GrabShare',
    logo: ASSETS.grabshareLogo,
    phase: 'Before',
    audience: 'Creators, micro-affiliates, social shoppers, product curators',
    intent: 'Creator-led recommendation, storefront browsing, peer-led discovery',
    value: 'Extends demand through creator and social commerce',
  },
  {
    name: 'Alternatives.co',
    logo: ASSETS.alternativesLogo,
    phase: 'Before',
    audience: 'B2B software evaluators, SaaS buyers, tool researchers',
    intent: 'Software evaluation, alternatives research, business-tool discovery',
    value: 'Reaches business buyers before vendor shortlisting',
  },
  {
    name: 'Strategic partner surfaces',
    icon: 'partners',
    phase: 'Before',
    audience: 'Partner-ecosystem users across BFSI, telecom, OTT, commerce, travel',
    intent: 'Contextual partner-surface demand',
    value: 'Extends campaigns into partner-owned audiences',
  },
];

const phases: { cap: string; icon: IconName; moments: string; focal?: boolean }[] = [
  {
    cap: 'Before decision',
    icon: 'search',
    moments: 'Search, category browsing, software alternatives research, creator discovery, partner-surface discovery',
  },
  {
    cap: 'During decision',
    icon: 'cursor',
    moments: 'Coupon reveal, offer comparison, merchant clickout, cashback motivation, retargeting readiness',
    focal: true,
  },
  {
    cap: 'After decision',
    icon: 'cycle',
    moments: 'Cashback, repeat engagement, retargeting, offer intelligence, creator sharing, partner re-entry',
  },
];

export default function Screen08DecisionMoments() {
  const c = copy[38];

  return (
    <Screen index={8} tone="light" id="platform-audiences" label="Platform audiences and decision moments">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s08dm-body">
        {/* Decision spectrum band: the moments each surface plays into. */}
        <Reveal from="up" distance={14} className="s08dm-band" role="list" aria-label="Decision-moment spectrum">
          {phases.map((p, i) => (
            <div key={p.cap} className="s08dm-band__cell" role="listitem">
              <div className={`s08dm-phase mk-hover${p.focal ? ' is-focal mk-breathe' : ''}`}>
                <span className="s08dm-phase__cap mono">
                  <Icon name={p.icon} size={14} />
                  {p.cap}
                </span>
                <span className="s08dm-phase__moments">{p.moments}</span>
              </div>
              {i < phases.length - 1 && (
                <span className="s08dm-band__arrow" aria-hidden="true">
                  <Icon name="arrow" size={15} />
                </span>
              )}
            </div>
          ))}
        </Reveal>

        {/* Operating routes: each surface is a station whose route runs through the
            mindset and intent it reaches into the brand value it creates. The route
            line and the phase tag are colour-encoded to the decision moment - the
            During route carries the single orange focal; Before/After stay neutral.
            No table columns, no cell dividers: a drawn route, not a row. */}
        <div className="s08dm-lanes" aria-label="Each surface, the mindset it reaches, and the brand value it creates">
          {surfaces.map((s, i) => {
            const isFocal = s.phase === 'During';
            return (
              <Reveal
                key={s.name}
                i={i}
                step={0.06}
                from="up"
                distance={12}
                className={`s08dm-lane mk-hover${isFocal ? ' is-focal' : ''}`}
              >
                {/* Station: surface origin + its decision-phase tag. */}
                <div className="s08dm-lane__station">
                  {s.logo ? (
                    <img className="s08dm-logo" src={s.logo} alt={s.name} loading="lazy" />
                  ) : (
                    <span className="s08dm-lane__label">
                      <span className="s08dm-lane__ico">
                        <Icon name={s.icon ?? 'partners'} size={18} />
                      </span>
                      {s.name}
                    </span>
                  )}
                  <span className="s08dm-lane__phase mono">
                    <span className="s08dm-lane__node" aria-hidden="true" />
                    {s.phase}
                  </span>
                </div>

                {/* Route: mindset + intent ride the line that runs into the value. */}
                <div className="s08dm-lane__route">
                  <div className="s08dm-lane__reach">
                    <span className="s08dm-lane__mindset">{s.audience}</span>
                    <span className="s08dm-lane__intent mono">{s.intent}</span>
                  </div>

                  <span className="s08dm-lane__path" aria-hidden="true">
                    {/* the continuous route line: draws in from the intent side
                        (left) toward the value via mk-bar (kit-guarded). */}
                    <span
                      className="s08dm-route-line mk-bar"
                      style={{ ['--mk-i']: i } as CSSProperties}
                    />
                    {/* arrowhead landing the route into the brand value. Fixed
                        aspect (not stretched) so it stays a crisp arrow. */}
                    <svg className="s08dm-route-head" viewBox="0 0 10 14" fill="none">
                      <path d="M1 1 L8 7 L1 13" />
                    </svg>
                    {/* live route dot: intent converting into brand value, travelling
                        the full visible line into the arrowhead. Subtle, hidden at
                        rest, slide-active only; travel distance is the line length. */}
                    <span
                      className="s08dm-lane__spark mk-spark"
                      style={{ ['--mk-i']: i, ['--mk-dx']: 'var(--s08dm-route-len)' } as CSSProperties}
                    />
                  </span>
                </div>

                {/* Destination: the brand value the route lands in. */}
                <div className="s08dm-lane__value">{s.value}</div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <footer className="s08dm-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
