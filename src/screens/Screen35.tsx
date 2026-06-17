import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, MockTag, EvidenceTag, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useApp } from '../state/store';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { labelFor } from '../content/setup';
import type { EvidenceStatus } from '../primitives/ui';
import './s35.css';

/* Screen 35 - Case study format (dashboard-mock).
   ONE dominant object: a single client-ready case proof card that reads like a
   real proof document, not a generic field grid. It carries the six elements a
   case must earn trust with: brand or category, growth problem, capabilities
   activated, engagement period, metrics moved, and why it matters for similar
   brands. No invented case numbers; every value carries an honest evidence tag.
   The single orange focal is the similar-brand implication panel. */

/* Capabilities activated in the case (illustrative, label-only, no metric). */
const activated = ['Commerce-intent surfaces', 'AudienceSeed signals', 'AI Growth Studio'];

/* Metric groups the case can move. Each opens its definition/source/status
   drawer; values stay pending or proof-pending, never invented. */
const metrics: { label: string; group: string; status: EvidenceStatus; icon: IconName }[] = [
  { label: 'Reach and visibility', group: 'Visits, surface coverage, share of discovery', status: 'pending', icon: 'eye' },
  { label: 'Engagement and intent', group: 'Coupon reveals, outbound clicks, comparison traffic', status: 'pending', icon: 'signal' },
  { label: 'Acquisition', group: 'Orders, sales, CPA, ROAS where tracking is live', status: 'unavailable', icon: 'target' },
];

export default function Screen35() {
  const c = copy[35];
  const drawer = useDrawer();
  // Allowed proof-area personalisation: setup category + priority only FRAME the
  // case-study placeholder (the lens). No invented metrics, logos, or results.
  const { setup, setupComplete } = useApp();
  const catLabel = labelFor.category(setup.category);
  const priLabel = labelFor.priority(setup.growth_priority);
  const framed = setupComplete && setup.category !== 'other';
  const identityName = framed ? `A ${catLabel} brand` : 'Named brand or category';

  const openMetric = (label: string, group: string, status: EvidenceStatus) =>
    drawer.open({
      id: `case-metric-${label}`,
      kind: 'metric',
      eyebrow: 'Metric group',
      title: label,
      sections: [
        { heading: 'What it covers', body: group },
        { heading: 'How it is shown', body: 'Validated metrics only. Where tracking is not yet live, the group stays a labelled placeholder, never a stated result.' },
      ],
      evidence: [{ label: 'Value status', status }],
    });

  const openEvidence = () =>
    drawer.open({
      id: 'evidence-status',
      kind: 'proof',
      eyebrow: 'Evidence status',
      title: 'What evidence status means',
      sections: [
        { heading: 'Known', body: 'Approved, source-backed, ready for client-facing use.' },
        { heading: 'Pending validation', body: 'Exists but needs confirmation before use.' },
        { heading: 'Unavailable', body: 'Not yet available. Shown as a placeholder, never as a fact.' },
      ],
    });

  return (
    <Screen index={35} tone="light" id="case-format" label="Case study format">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s35-body">
        <Reveal from="up" distance={20} className="s35-cardwrap">
          {/* The one dominant object: a client-ready case proof card. */}
          <article className="s35-card">
            {/* File bar: reads as a proof document, with a quiet evidence-status hotspot. */}
            <div className="s35-card__bar">
              <span className="s35-card__filemark">
                <Icon name="shield" size={16} />
              </span>
              <div className="s35-card__titles">
                <span className="s35-card__title">Case proof card</span>
                <span className="s35-card__sub">Client-ready proof module, one brand or category per card</span>
              </div>
              <button type="button" className="s35-evbtn mono" onClick={openEvidence}>
                What evidence status means
                <Icon name="arrow" size={12} />
              </button>
              <span className="s35-card__tag">
                <MockTag>Illustrative template, not final data</MockTag>
              </span>
            </div>

            <div className="s35-card__body">
              {/* Identity row: brand or category + the growth problem it solves. */}
              <div className="s35-top">
                <div className="s35-id">
                  <span className="s35-field-k mono">Brand or category</span>
                  <span className="s35-id__name">{identityName}</span>
                  {framed ? (
                    <span className="s35-id__lens mono">
                      Framed to your {catLabel} category, {priLabel.toLowerCase()}
                    </span>
                  ) : (
                    <EvidenceTag status="pending" />
                  )}
                </div>
                <div className="s35-problem">
                  <span className="s35-field-k mono">Growth problem</span>
                  <p className="s35-problem__text">
                    The specific growth problem this brand needed solved, stated in one line a similar brand would recognise.
                  </p>
                </div>
              </div>

              {/* Metadata strip: capabilities activated + engagement period. */}
              <div className="s35-meta">
                <div className="s35-meta__block">
                  <span className="s35-field-k mono">Capabilities activated</span>
                  <div className="s35-chips">
                    {activated.map((a) => (
                      <span key={a} className="s35-chip mk-hover">{a}</span>
                    ))}
                  </div>
                </div>
                <div className="s35-meta__period">
                  <span className="s35-field-k mono">Engagement period</span>
                  <span className="s35-meta__val">
                    <Icon name="calendar" size={16} />
                    Length of the engagement
                  </span>
                  <EvidenceTag status="pending" />
                </div>
              </div>

              {/* Lower grid: metric groups moved + the similar-brand implication. */}
              <div className="s35-grid">
                <div className="s35-metrics">
                  <div className="s35-metrics__head">
                    <span className="s35-metrics__title">Metrics moved</span>
                    <span className="s35-metrics__hint mono">Validated groups only, select for source</span>
                  </div>
                  <div className="s35-metric-list">
                    {metrics.map((m, i) => (
                      <button
                        key={m.label}
                        type="button"
                        className="s35-metric mk-hover"
                        style={{ ['--mk-i']: i } as CSSProperties}
                        onClick={() => openMetric(m.label, m.group, m.status)}
                      >
                        <span className="s35-metric__ico">
                          <Icon name={m.icon} size={16} />
                          <span className="s35-metric__scan" aria-hidden="true" />
                        </span>
                        <span className="s35-metric__txt">
                          <span className="s35-metric__label">{m.label}</span>
                          <span className="s35-metric__group">{m.group}</span>
                        </span>
                        <EvidenceTag status={m.status} />
                        <Icon name="arrow" size={13} className="s35-metric__more" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Single orange focal: why it matters for similar brands. */}
                <aside className="s35-why">
                  <span className="s35-why__halo" aria-hidden="true" />
                  <span className="s35-why__kicker mono">Why it matters</span>
                  <p className="s35-why__lead">
                    What a similar brand can expect to learn from this case, framed as relevance, not a promised result.
                  </p>
                  <div className="s35-why__foot">
                    <span className="s35-field-k mono">Similar brands</span>
                    <span className="s35-why__note">
                      The same system applies. Proof changes by category, so each card stands on its own evidence.
                    </span>
                  </div>
                </aside>
              </div>
            </div>
          </article>
        </Reveal>
      </div>

      <footer className="s35-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
