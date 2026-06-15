import { Screen } from '../primitives/Screen';
import { DeckHeader, MockTag, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s22.css';

/* Screen 22 - Intent signal depth (operating-board: enriched signal ladder).
   ONE dominant object: a signal ladder that ascends from passive interest to
   active action, enriched with source context and per-rung event type,
   strength, freshness, and approved-use status. The orange focal is the rung
   the headline pivots on: a coupon reveal is intent. Cool --as blue carries
   the signal-strength data; orange stays the single dominant focal. */

type Strength = 'interest' | 'intent' | 'action';

interface Rung {
  label: string;
  type: string;
  icon: IconName;
  strength: Strength;
  fill: number; // strength meter fill, 0-100 (illustrative, relative)
  freshness: string;
  focal?: boolean;
  meaning: string;
  metric: string;
}

/* Ordered weakest -> strongest. Rendered bottom-up so the ladder ascends. */
const rungs: Rung[] = [
  {
    label: 'Page view',
    type: 'Passive interest',
    icon: 'eye',
    strength: 'interest',
    fill: 26,
    freshness: 'Decays fast',
    meaning: 'The shopper looked, but has not signalled intent yet. Passive interest.',
    metric: 'Page views',
  },
  {
    label: 'Offer view',
    type: 'Considering',
    icon: 'tag',
    strength: 'interest',
    fill: 40,
    freshness: 'Decays fast',
    meaning: 'The shopper is considering a specific offer.',
    metric: 'Offer views',
  },
  {
    label: 'Coupon reveal',
    type: 'Purchase intent',
    icon: 'coupon',
    strength: 'intent',
    fill: 70,
    freshness: 'Holds longer',
    focal: true,
    meaning: 'Revealing a coupon is a stronger purchase-intent signal.',
    metric: 'Coupon reveals',
  },
  {
    label: 'Outbound click',
    type: 'Action toward brand',
    icon: 'cursor',
    strength: 'action',
    fill: 86,
    freshness: 'Strong, recent',
    meaning: 'Clicking out toward the brand is an action signal.',
    metric: 'Outbound clicks',
  },
];

/* Three modifiers that also shape signal strength (from copy support line). */
const modifiers: { label: string; icon: IconName; note: string }[] = [
  { label: 'Engagement depth', icon: 'layers', note: 'Deeper engagement suggests stronger interest.' },
  { label: 'Repeat behaviour', icon: 'cycle', note: 'Repeat behaviour suggests sustained intent.' },
  { label: 'Signal freshness', icon: 'refresh', note: 'How recent the signal is shapes how useful it is.' },
];

const strengthLabel: Record<Strength, string> = {
  interest: 'Interest',
  intent: 'Intent',
  action: 'Action',
};

export default function Screen22() {
  const c = copy[22];
  const drawer = useDrawer();

  const openRung = (r: Rung, position: number) =>
    drawer.open({
      id: `rung-${r.label}`,
      kind: 'metric',
      eyebrow: `Signal ${position} of ${rungs.length}`,
      title: r.label,
      sections: [
        { heading: 'What this is', body: r.meaning },
        {
          heading: 'How it informs audience quality',
          body: 'Stronger and fresher signals point to higher-quality audiences for retargeting.',
        },
        { heading: 'Event type', body: r.type },
        { heading: 'Signal strength', body: strengthLabel[r.strength] },
        { heading: 'Freshness', body: r.freshness },
        {
          heading: 'What not to assume',
          body: 'This is not a score unless scoring logic is validated, and strength values are illustrative.',
        },
      ],
      evidence: [{ label: 'Approved-use status', status: 'approved' }],
      requiredInput: `Metric field: ${r.metric}. Used only as an approved, policy-compliant shopper-intent signal.`,
    });

  return (
    <Screen index={22} tone="light" id="signal-depth" label="Intent signal depth">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s22-body">
        <section className="s22-board" aria-label="Intent signal ladder">
          {/* ---- Source context rail ---- */}
          <Reveal from="up" distance={14} className="s22-source">
            <span className="s22-source__kicker">Signal source</span>
            <div className="s22-source__frame">
              <span className="s22-source__bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="s22-source__url">grabon.com</span>
              </span>
              <img
                src={ASSETS.grabonHome}
                alt="GrabOn commerce-intent surface, the source of shopper-intent signals"
                className="s22-source__img"
                loading="lazy"
              />
              <span className="s22-source__logo">
                <img src={ASSETS.grabonLogo} alt="GrabOn" />
              </span>
            </div>
            <p className="s22-source__note">
              Shopper behaviour on the GrabOn commerce-intent surface becomes approved AudienceSeed signals,
              read by depth, not by a single visit.
            </p>
            <div className="s22-source__legend" aria-hidden="true">
              <span className="s22-legend__item">
                <i className="s22-legend__sw s22-legend__sw--as" />
                Signal strength
              </span>
              <span className="s22-legend__item">
                <i className="s22-legend__sw s22-legend__sw--focal" />
                Intent pivot
              </span>
            </div>
          </Reveal>

          {/* ---- The ladder (ascends weak -> strong) ---- */}
          <Reveal i={1} from="up" distance={14} className="s22-ladder">
            <div className="s22-ladder__axis" aria-hidden="true">
              <span className="s22-ladder__axis-top">Action</span>
              <span className="s22-ladder__axis-line" />
              <span className="s22-ladder__axis-bot">Interest</span>
            </div>

            <ol className="s22-rungs" role="list">
              {[...rungs].reverse().map((r) => {
                const position = rungs.indexOf(r) + 1;
                return (
                  <li key={r.label} className={`s22-rung${r.focal ? ' is-focal' : ''}`}>
                    <button
                      type="button"
                      className="s22-rung__btn"
                      onClick={() => openRung(r, position)}
                      aria-label={`${r.label}, ${strengthLabel[r.strength]} signal. View detail.`}
                    >
                      <span className={`s22-rung__ico${r.focal ? ' is-focal' : ''}`}>
                        <Icon name={r.icon} size={19} />
                      </span>

                      <span className="s22-rung__id">
                        <span className="s22-rung__label">{r.label}</span>
                        <span className="s22-rung__type">{r.type}</span>
                      </span>

                      <span className="s22-rung__meter" aria-hidden="true">
                        <span
                          className={`s22-rung__meter-fill${r.focal ? ' is-focal' : ''}`}
                          style={{ width: `${r.fill}%` }}
                        />
                      </span>

                      <span className={`s22-rung__strength s22-rung__strength--${r.strength}`}>
                        {strengthLabel[r.strength]}
                      </span>

                      <span className="s22-rung__fresh">
                        <Icon name="refresh" size={13} />
                        {r.freshness}
                      </span>

                      <span className="s22-rung__use">
                        <Icon name="check" size={13} />
                        Approved use
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Strength modifiers (engagement depth, repeat, freshness) */}
            <div className="s22-mods">
              <span className="s22-mods__tag">
                <MockTag>AudienceSeed by Inspirelabs</MockTag>
              </span>
              <span className="s22-mods__head">Strength also depends on</span>
              <div className="s22-mods__row">
                {modifiers.map((m) => (
                  <span key={m.label} className="s22-mod" title={m.note}>
                    <Icon name={m.icon} size={15} />
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <footer className="s22-foot">
        <div className="s22-foot__net">
          <span className="s22-foot__net-ico" aria-hidden="true">
            <Icon name="signal" size={17} />
          </span>
          <p className="s22-foot__net-text">{c.support}</p>
        </div>
        <div className="s22-foot__cta">
          <EvidenceTag status="approved">Approved-use signals only</EvidenceTag>
        </div>
      </footer>
    </Screen>
  );
}
