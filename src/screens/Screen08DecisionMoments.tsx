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
              <div className={`s08dm-phase${p.focal ? ' is-focal' : ''}`}>
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

        {/* Operating routes: each surface flows from the mindset it reaches to the
            brand value it creates, tagged with the decision moment it plays into. */}
        <div className="s08dm-lanes" aria-label="Each surface, the mindset it reaches, and the brand value it creates">
          {surfaces.map((s, i) => (
            <Reveal key={s.name} i={i} step={0.06} from="up" distance={12} className="s08dm-lane">
              <div className="s08dm-lane__surface">
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
                  <span className="s08dm-lane__dot" aria-hidden="true" />
                  {s.phase}
                </span>
              </div>

              <div className="s08dm-lane__reach">
                <span className="s08dm-lane__mindset">{s.audience}</span>
                <span className="s08dm-lane__intent mono">{s.intent}</span>
              </div>

              <span className="s08dm-lane__to" aria-hidden="true">
                <Icon name="arrow" size={16} />
              </span>

              <div className="s08dm-lane__value">{s.value}</div>
            </Reveal>
          ))}
        </div>
      </div>

      <footer className="s08dm-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
