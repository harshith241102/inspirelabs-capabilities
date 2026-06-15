import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s11.css';

/* Operating board / map: brand demand enters on the left, splits across
   two clearly separated bands (owned distribution + activation surfaces),
   and converges on one orange measurable-action output rail. Owned surfaces
   carry real GrabOn captures; activation surfaces carry one partner capture
   plus labelled families. One dominant visual, one orange focal. */

const owned: { label: string; sub: string; src: string; pos?: string }[] = [
  {
    label: 'GrabCash',
    sub: 'Community and share-led',
    src: ASSETS.grabcashDeals,
    pos: 'top center',
  },
  {
    label: 'GrabShare',
    sub: 'Creator and storefront-led',
    src: ASSETS.grabshareHome,
    pos: 'top center',
  },
];

const activation: { label: string; icon: IconName }[] = [
  { label: 'Strategic Partnerships', icon: 'partners' },
  { label: 'Affiliate Marketing Platforms', icon: 'network' },
  { label: 'Channel Amplification', icon: 'megaphone' },
  { label: 'Integrated Campaign Promotions', icon: 'calendar' },
];

const actions = ['Clicks', 'Leads', 'Orders', 'Sales', 'Tracked outcomes'];

export default function Screen11() {
  const c = copy[11];
  return (
    <Screen index={11} tone="light" id="distribute-intro" label="Distribute demand intro">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s11-body">
        <div className="s11-map">
          {/* Source: brand demand entering the system */}
          <Reveal from="up" distance={14} className="s11-source">
            <span className="s11-source__node">
              <Icon name="bolt" size={26} />
            </span>
            <span className="s11-source__label">Brand demand</span>
            <span className="s11-source__cap">One brand, many surfaces</span>
          </Reveal>

          {/* Two distribution bands */}
          <div className="s11-bands">
            {/* Owned distribution: real product surfaces */}
            <Reveal from="left" distance={16} className="s11-band">
              <div className="s11-band__head">
                <span className="s11-band__kicker s11-band__kicker--accent">
                  Owned distribution
                </span>
                <span className="s11-band__title">Surfaces Inspirelabs operates</span>
              </div>
              <div className="s11-owned">
                {owned.map((o) => (
                  <div key={o.label} className="s11-surf">
                    <div className="s11-surf__shot">
                      <img src={o.src} alt={`${o.label} surface`} loading="lazy" style={{ objectPosition: o.pos }} />
                    </div>
                    <div className="s11-surf__meta">
                      <span className="s11-surf__label">{o.label}</span>
                      <span className="s11-surf__sub">{o.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Activation surfaces: external ecosystems */}
            <Reveal from="right" distance={16} className="s11-band">
              <div className="s11-band__head">
                <span className="s11-band__kicker">Activation surfaces</span>
                <span className="s11-band__title">External ecosystems Inspirelabs activates</span>
              </div>
              <div className="s11-activate">
                <div className="s11-activate__cue" aria-hidden="true">
                  <img src={ASSETS.partner1} alt="" loading="lazy" />
                </div>
                <div className="s11-activate__families">
                  {activation.map((af) => (
                    <div key={af.label} className="s11-fam">
                      <span className="s11-fam__ico">
                        <Icon name={af.icon} size={17} />
                      </span>
                      <span className="s11-fam__label">{af.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* The single orange focal: measurable-action output rail */}
          <Reveal from="up" distance={14} className="s11-output">
            <div className="s11-output__head">
              <span className="s11-output__node">
                <Icon name="target" size={22} />
              </span>
              <div className="s11-output__titles">
                <span className="s11-output__title">Every surface routes to measurable action</span>
                <span className="s11-output__sub">
                  Owned and activation surfaces stay separate. Both report into the same outcomes.
                </span>
              </div>
              <EvidenceTag status="pending">Where tracking is available</EvidenceTag>
            </div>
            <div className="s11-output__chips">
              {actions.map((act) => (
                <span key={act} className="s11-action">
                  {act}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="s11-foot">
        <AdvanceCta label={c.cta} to={12} />
        <span className="s11-foot__note mono">Owned and activation surfaces stay separate</span>
      </div>
    </Screen>
  );
}
