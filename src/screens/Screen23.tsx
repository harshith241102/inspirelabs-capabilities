import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, MockTag, EvidenceTag, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s23.css';

/* Screen 23 - Offer Lab (dashboard-mock).
   Dominant visual: ONE commercial offer-response decision dashboard. Offer
   formats sit in a response table gated by a sample-size check, a GrabOn
   category surface gives offer-response context, and a single recommended-action
   panel is the orange focal. All response data is honestly pending, never an
   invented number. Reads as decision support, not analytics. */

/* Offer formats from copy[23].cards. `bar` is an illustrative relative pattern
   for the response track only, never a measured value. `lead` marks the format
   currently drawing the strongest pattern (still pending validation). */
const formats: { label: string; icon: IconName; note: string; bar: number; lead?: boolean }[] = [
  { label: 'Percentage discount', icon: 'tag', note: 'A percentage off the order value.', bar: 86, lead: true },
  { label: 'Flat discount', icon: 'coupon', note: 'A fixed amount off the order.', bar: 70 },
  { label: 'Free delivery', icon: 'send', note: 'Delivery cost removed at checkout.', bar: 58 },
  { label: 'Minimum basket', icon: 'store', note: 'An offer unlocked above a basket value.', bar: 46 },
  { label: 'Combo offer', icon: 'layers', note: 'A bundle across products or services.', bar: 38 },
  { label: 'Payment or bank offer', icon: 'shield', note: 'A card, wallet, or bank-led offer.', bar: 30 },
];

export default function Screen23() {
  const c = copy[23];
  const drawer = useDrawer();

  const openFormat = (label: string, note: string, lead?: boolean) =>
    drawer.open({
      id: `offer-${label}`,
      kind: 'metric',
      eyebrow: 'Offer format',
      title: label,
      sections: [
        { heading: 'What this is', body: note },
        {
          heading: 'What the dashboard reads',
          body: 'How strongly shoppers respond to this format before larger budgets are committed.',
        },
        { heading: 'Required to read it', items: ['Sufficient sample size', 'Observed response', 'Recommended next action'] },
        {
          heading: 'What not to assume',
          body: lead
            ? 'A stronger pattern is not a guaranteed winner. Response guides the next action, it does not promise the outcome.'
            : 'No invented winner and no invented uplift. Response guides the next action, it does not guarantee the outcome.',
        },
      ],
      evidence: [{ label: 'Observed response', status: 'pending' }],
    });

  return (
    <Screen index={23} tone="light" id="offer-lab" label="Offer Lab">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s23-body">
        <Reveal from="up" distance={20} className="s23-dashwrap">
          <div className="s23-dash">
            {/* dashboard chrome bar */}
            <div className="s23-dash__bar">
              <span className="s23-dash__dot" />
              <div className="s23-dash__titles">
                <span className="s23-dash__title">Offer Lab response board</span>
                <span className="s23-dash__sub">Offer format · observed response · recommended action</span>
              </div>
              <span className="s23-dash__gate">
                <Icon name="shield" size={14} />
                Sample-size gate active
              </span>
              <span className="s23-dash__tag">
                <MockTag>Illustrative mockup, response pending</MockTag>
              </span>
            </div>

            <div className="s23-dash__body">
              {/* LEFT: offer-format response table (the decision object) */}
              <div className="s23-table">
                <div className="s23-table__head">
                  <span className="s23-table__h s23-table__h--name">Offer format</span>
                  <span className="s23-table__h s23-table__h--resp">Response pattern</span>
                  <span className="s23-table__h s23-table__h--status">Status</span>
                </div>
                <div className="s23-table__rows" role="list" aria-label="Offer format response">
                  {formats.map((f, i) => (
                    <button
                      key={f.label}
                      type="button"
                      role="listitem"
                      className={`s23-row mk-hover${f.lead ? ' is-lead' : ''}`}
                      onClick={() => openFormat(f.label, f.note, f.lead)}
                    >
                      <span className="s23-row__name">
                        <span className={`s23-row__ico${f.lead ? ' is-lead' : ''}`}>
                          <Icon name={f.icon} size={16} />
                        </span>
                        <span className="s23-row__label">{f.label}</span>
                        {f.lead && <span className="s23-row__flag">Strongest pattern</span>}
                      </span>
                      <span className="s23-row__track" aria-hidden="true">
                        <span
                          className={`s23-row__bar mk-bar${f.lead ? ' is-lead' : ''}`}
                          style={{ width: `${f.bar}%`, ['--mk-i']: i } as CSSProperties}
                        />
                      </span>
                      <span className="s23-row__status mono">Pending</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT: context surface + sample gate + recommended action */}
              <aside className="s23-side">
                <figure className="s23-context">
                  <div className="s23-context__bar">
                    <i />
                    <i />
                    <i />
                    <span className="s23-context__url">grabon.com/category</span>
                  </div>
                  <div className="s23-context__view">
                    <img
                      src={ASSETS.grabonCategory}
                      alt="GrabOn category page where shoppers respond to live offer formats"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="s23-context__cap">
                    Offer-response context observed on live GrabOn offer surfaces.
                  </figcaption>
                </figure>

                <div className="s23-gate">
                  <span className="s23-gate__ico">
                    <Icon name="check" size={15} />
                  </span>
                  <div className="s23-gate__txt">
                    <span className="s23-gate__label">Sample-size gate</span>
                    <span className="s23-gate__sub">No format is read until enough response is observed.</span>
                  </div>
                  <EvidenceTag status="pending" />
                </div>

                <div className="s23-action">
                  <span className="s23-action__pulse" aria-hidden="true" />
                  <span className="s23-action__kicker mono">Recommended next action</span>
                  <p className="s23-action__body">
                    Test the strongest-responding format before committing larger media spend.
                  </p>
                  <span className="s23-action__chip">
                    <Icon name="check" size={13} />
                    Human reviewed before action
                  </span>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="s23-foot">
        <NetBox>{c.support}</NetBox>
      </div>
    </Screen>
  );
}
