import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, EvidenceTag, NetBox } from '../primitives/ui';
import { AnnotatedShot } from '../primitives/deck';
import { Icon, type IconName } from '../primitives/icons';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s13.css';

/* Three-step distribution motion that the GrabCash hero anchors.
   Numbers match the on-image hotspot pins so the visual reads in 5s. */
const steps: { n: number; icon: IconName; title: string; body: string }[] = [
  {
    n: 1,
    icon: 'share',
    title: 'Share a tracked deal link',
    body: 'Everyday sharers and deal communities pass the brand offer onward through their own networks.',
  },
  {
    n: 2,
    icon: 'cursor',
    title: 'The action is tracked',
    body: 'Clicks, leads, orders, and sales are attributed back, user by user, where tracking is available.',
  },
  {
    n: 3,
    icon: 'tag',
    title: 'Sharing earns a payout',
    body: 'A reward motivates the next share, so distribution keeps moving on performance, not promises.',
  },
];

/* On-image numbered pins point at the live GrabCash deals surface, mapping
   the three-step motion directly onto real inventory (single orange focal). */
const pins = [
  { n: 1, label: 'Shareable offers', x: 24, y: 26, side: 'right' as const },
  { n: 2, label: 'Tracked deal actions', x: 56, y: 54, side: 'right' as const },
  { n: 3, label: 'Reward-led sharing', x: 80, y: 80, side: 'left' as const },
];

export default function Screen13() {
  const c = copy[13];
  return (
    <Screen index={13} tone="light" id="grabcash" label="GrabCash owned distribution">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s13-body">
        <AnnotatedShot
          src={ASSETS.grabcashDeals}
          alt="GrabCash deals surface, where shareable brand offers and tracked actions live"
          url="grabon.com/grabcash"
          logo={{ src: ASSETS.grabcashLogo, alt: 'GrabCash' }}
          objectPosition="left top"
          pins={pins}
          style={{ flex: '1 1 0' }}
        />

        <aside className="s13-side">
          <ol className="s13-flow" aria-label="How an offer moves through GrabCash">
            {steps.map((s, i) => (
              <li key={s.n} className="s13-step mk-hover" style={{ ['--mk-i']: i } as CSSProperties}>
                <span className="s13-step__n">{s.n}</span>
                <span className="s13-step__ico">
                  <Icon name={s.icon} size={18} />
                </span>
                <div className="s13-step__txt">
                  <span className="s13-step__title">{s.title}</span>
                  <span className="s13-step__body">{s.body}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className="s13-step__link" aria-hidden="true">
                    <span className="s13-step__spark" style={{ ['--mk-i']: i } as CSSProperties} />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="s13-measure">
            <EvidenceTag status="pending">Measurement, where available</EvidenceTag>
            <span className="s13-measure__text">
              Clicks, leads, orders, sales, and user-wise performance. Payout terms are scoped per
              programme, not assumed.
            </span>
          </div>
        </aside>
      </div>

      <footer className="s13-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
