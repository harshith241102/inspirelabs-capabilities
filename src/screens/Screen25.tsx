import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, MockTag, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import './s25.css';

/* Screen 25 - AudienceSeed reporting (dashboard-mock).
   ONE dominant object: a commercial decision report that reads as decision
   support, not a generic analytics dashboard. Three readiness summary tiles
   sit above a signal-and-offer reading panel; the single orange focal is the
   human-reviewed recommended action. Values stay pending/illustrative. */

/* The three decision summaries the report is built around. */
const summaries: { label: string; read: string; icon: IconName }[] = [
  { label: 'Signal quality', read: 'How clean and recent the observed intent is', icon: 'signal' },
  { label: 'Offer response', read: 'Which offer format is drawing the strongest pull', icon: 'tag' },
  { label: 'Audience readiness', read: 'Whether the audience is ready for the next action', icon: 'target' },
];

/* Reporting fields, each opens its definition/source/status drawer.
   bar = illustrative relative pull for the reduced offer-response chart,
   never an observed number. */
const reads: { label: string; def: string; source: string; bar: number }[] = [
  { label: 'Audience observed', def: 'The audience seen on the surface for this brand or category.', source: 'GrabOn surface signals', bar: 70 },
  { label: 'Top offer format', def: 'The offer format drawing the strongest response.', source: 'Offer Lab observation', bar: 88 },
  { label: 'Coupon reveals', def: 'Volume of coupon reveals, an intent signal.', source: 'Surface events', bar: 56 },
  { label: 'Outbound clicks', def: 'Volume of outbound clicks toward the brand, an action signal.', source: 'Surface events', bar: 48 },
  { label: 'Engagement quality', def: 'How deep the engagement runs before the click.', source: 'Engagement depth signals', bar: 62 },
  { label: 'Signal freshness', def: 'How recent the signals are.', source: 'Signal timestamps', bar: 76 },
];

export default function Screen25() {
  const c = copy[25];
  const drawer = useDrawer();

  const openField = (label: string, def: string, source: string) =>
    drawer.open({
      id: `report-${label}`,
      kind: 'metric',
      eyebrow: 'Reporting field',
      title: label,
      sections: [
        { heading: 'Definition', body: def },
        { heading: 'Source', body: source },
        { heading: 'What this is for', body: 'Commercial decision support, not a generic analytics dashboard. Values stay pending until approved.' },
      ],
      evidence: [{ label: 'Value status', status: 'pending' }],
    });

  return (
    <Screen index={25} tone="light" id="audienceseed-reporting" label="AudienceSeed reporting">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s25-body">
        <Reveal from="up" distance={20} className="s25-dashwrap">
          <div className="s25-dash">
            {/* Report bar: titled as a decision report, not analytics. */}
            <div className="s25-dash__bar">
              <span className="s25-dash__dot" />
              <div className="s25-dash__titles">
                <span className="s25-dash__title">AudienceSeed decision report</span>
                <span className="s25-dash__sub">AudienceSeed by Inspirelabs · signal quality, offer response, audience readiness</span>
              </div>
              <span className="s25-dash__tag">
                <MockTag>Illustrative mockup, not final data</MockTag>
              </span>
            </div>

            <div className="s25-dash__body">
              {/* Top row: the three decision summaries the report answers. */}
              <div className="s25-summary" role="list" aria-label="Decision summaries">
                {summaries.map((s) => (
                  <div className="s25-sum" role="listitem" key={s.label}>
                    <span className="s25-sum__ico">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <div className="s25-sum__txt">
                      <span className="s25-sum__label">{s.label}</span>
                      <span className="s25-sum__read">{s.read}</span>
                    </div>
                    <EvidenceTag status="pending">Pending validation</EvidenceTag>
                  </div>
                ))}
              </div>

              <div className="s25-grid">
                {/* Left: the signal and offer reading. Reduced chart decoration -
                    a single quiet pull track per field, the report itself is the story. */}
                <div className="s25-panel">
                  <div className="s25-panel__head">
                    <span className="s25-panel__title">Signal and offer reading</span>
                    <span className="s25-panel__hint mono">Select a field for definition and source</span>
                  </div>
                  <div className="s25-reads">
                    {reads.map((r) => (
                      <button
                        key={r.label}
                        type="button"
                        className="s25-read"
                        onClick={() => openField(r.label, r.def, r.source)}
                      >
                        <span className="s25-read__label">{r.label}</span>
                        <span className="s25-read__track" aria-hidden="true">
                          <span className="s25-read__bar" style={{ width: `${r.bar}%` }} />
                        </span>
                        <span className="s25-read__status mono">Pending</span>
                        <Icon name="arrow" size={13} className="s25-read__more" />
                      </button>
                    ))}
                  </div>
                  <p className="s25-panel__note mono">Illustrative pull, not measured volume</p>
                </div>

                {/* Right: the recommended action. The single orange focal of the
                    screen, carrying the human-reviewed guarantee. */}
                <div className="s25-action">
                  <span className="s25-action__kicker mono">Recommended action</span>
                  <p className="s25-action__lead">
                    Move budget toward the strongest offer format and the freshest signals before scaling spend.
                  </p>
                  <div className="s25-action__chips">
                    <span className="chip chip--accent">Human reviewed</span>
                    <EvidenceTag status="pending">Awaiting approval</EvidenceTag>
                  </div>
                  <div className="s25-action__why">
                    <span className="s25-action__why-head mono">Why this, not a number</span>
                    <span className="s25-action__why-body">
                      AI Action Agents draft the read. A person approves it before it becomes a decision.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="s25-foot">
        <AdvanceCta label={c.cta} to={26} />
      </footer>
    </Screen>
  );
}
