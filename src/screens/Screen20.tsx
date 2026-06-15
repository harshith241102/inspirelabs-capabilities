import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import './s20.css';

/* Shopper events captured on the GrabOn commerce-intent surface, before the
   brand's own pixel begins. These feed the approved signal layer. */
const events: { label: string; icon: IconName; strength: 'interest' | 'intent' | 'action' }[] = [
  { label: 'Offer discovery', icon: 'eye', strength: 'interest' },
  { label: 'Offer comparison', icon: 'layers', strength: 'interest' },
  { label: 'Coupon reveal', icon: 'coupon', strength: 'intent' },
  { label: 'Outbound click', icon: 'cursor', strength: 'action' },
];

const strengthLabel: Record<'interest' | 'intent' | 'action', string> = {
  interest: 'Interest',
  intent: 'Intent',
  action: 'Action',
};

/* Two activation outputs the approved signal layer feeds. */
const outputs: { label: string; icon: IconName; body: string }[] = [
  {
    label: 'Retargeting input',
    icon: 'refresh',
    body: 'Better inputs into the retargeting stack the brand already runs.',
  },
  {
    label: 'Offer intelligence',
    icon: 'flask',
    body: 'Which offer formats are drawing stronger shopper intent.',
  },
];

export default function Screen20() {
  const c = copy[20];
  const drawer = useDrawer();

  const openIsNot = () =>
    drawer.open({
      id: 'audienceseed-isnot',
      kind: 'proof',
      eyebrow: 'AudienceSeed guardrail',
      title: 'What AudienceSeed is not',
      sections: [
        {
          heading: 'AudienceSeed is not',
          items: [
            'A generic analytics dashboard',
            'An SEO product',
            'A content product',
            'An ad management product',
            'An influencer product',
            'A broad reporting tool',
          ],
        },
        { heading: 'What it is', body: c.support },
        { heading: 'Activation rule', body: c.drawer },
      ],
    });

  return (
    <Screen index={20} tone="light" id="audienceseed-intro" label="AudienceSeed intro">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s20-body">
        <div className="s20-board">
          {/* Stage 1: shopper event stream */}
          <Reveal from="up" distance={14} className="s20-stage s20-stage--stream">
            <header className="s20-stage__head">
              <span className="s20-stage__ico s20-stage__ico--as">
                <Icon name="signal" size={20} />
              </span>
              <div>
                <span className="s20-stage__kicker">Stage 1</span>
                <h2 className="s20-stage__title">Shopper event stream</h2>
              </div>
            </header>
            <p className="s20-stage__lede">
              High-intent behaviour on the GrabOn commerce-intent surface, before the brand{'’'}s own
              tracking begins.
            </p>
            <ul className="s20-events" role="list">
              {events.map((e) => (
                <li key={e.label} className="s20-event">
                  <span className="s20-event__ico">
                    <Icon name={e.icon} size={17} />
                  </span>
                  <span className="s20-event__label">{e.label}</span>
                  <span className={`s20-event__tag s20-event__tag--${e.strength}`}>
                    {strengthLabel[e.strength]}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Flow connector */}
          <div className="s20-link" aria-hidden="true">
            <Icon name="arrow" size={20} />
          </div>

          {/* Stage 2: approved signal layer (the orange focal) */}
          <Reveal i={1} from="up" distance={14} className="s20-stage s20-stage--gate">
            <span className="s20-gate__tag">
              <MockTag>AudienceSeed by Inspirelabs</MockTag>
            </span>
            <header className="s20-stage__head">
              <span className="s20-stage__ico s20-stage__ico--gate">
                <Icon name="shield" size={22} />
              </span>
              <div>
                <span className="s20-stage__kicker s20-stage__kicker--gate">Stage 2</span>
                <h2 className="s20-stage__title">Approved signal layer</h2>
              </div>
            </header>
            <p className="s20-gate__lede">
              Raw events become approved, policy-compliant shopper-intent signals. No raw PII transfer, no
              unauthorised tracking, no automatic media activation.
            </p>
            <div className="s20-gate__quality">
              <span className="s20-gate__quality-label">Audience quality before spend scales</span>
              <span className="s20-gate__meter" aria-hidden="true">
                <span className="s20-gate__meter-fill" />
              </span>
              <span className="s20-gate__quality-note">Improving with signal depth and freshness</span>
            </div>
          </Reveal>

          {/* Flow connector */}
          <div className="s20-link" aria-hidden="true">
            <Icon name="arrow" size={20} />
          </div>

          {/* Stage 3: activation outputs */}
          <Reveal i={2} from="up" distance={14} className="s20-stage s20-stage--out">
            <header className="s20-stage__head">
              <span className="s20-stage__ico s20-stage__ico--as">
                <Icon name="target" size={20} />
              </span>
              <div>
                <span className="s20-stage__kicker">Stage 3</span>
                <h2 className="s20-stage__title">Activation outputs</h2>
              </div>
            </header>
            <div className="s20-outputs">
              {outputs.map((o) => (
                <div key={o.label} className="s20-output">
                  <span className="s20-output__ico">
                    <Icon name={o.icon} size={18} />
                  </span>
                  <div className="s20-output__txt">
                    <span className="s20-output__label">{o.label}</span>
                    <span className="s20-output__body">{o.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="s20-foot">
        <div className="s20-foot__cta">
          <AdvanceCta label={c.cta} to={21} />
          <button type="button" className="s20-guardlink" onClick={openIsNot}>
            <Icon name="shield" size={15} />
            What AudienceSeed is not
          </button>
        </div>
        <p className="s20-foot__note">
          <Icon name="check" size={14} />
          Activation uses approved, policy-compliant signals only. It improves audience quality before media
          spend scales.
        </p>
      </footer>
    </Screen>
  );
}
