import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const isList: { label: string; icon: IconName; body: string }[] = [
  { label: 'Shopper intent signals', icon: 'signal', body: 'Real intent behaviour from offer-ready shoppers.' },
  { label: 'Retargeting input', icon: 'refresh', body: 'Better inputs into the retargeting stack you already run.' },
  { label: 'Offer intelligence', icon: 'flask', body: 'Which offer formats draw stronger shopper intent.' },
  { label: 'Audience quality', icon: 'target', body: 'Improve audience quality before media spend scales.' },
];

export default function Screen20() {
  const c = copy[20];
  const drawer = useDrawer();

  return (
    <Screen index={20} tone="light" id="audienceseed-intro" label="AudienceSeed intro">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <div className="as-def">
            {isList.map((it, i) => (
              <Reveal i={i} step={0.06} key={it.label}>
                <div className="as-card">
                  <span className="as-card__ico">
                    <Icon name={it.icon} size={19} />
                  </span>
                  <span className="as-card__title">{it.label}</span>
                  <span className="as-card__body">{it.body}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal i={4} className="as-guard">
            <Icon name="shield" size={18} />
            <span>
              Activation uses approved, policy-compliant signals only. No raw PII transfer, no unauthorised
              tracking, and no automatic media activation.
            </span>
          </Reveal>
        </div>
      </div>
      <footer className="s-footer-row">
        <div className="cta-stack">
          <div className="cta-row">
            <AdvanceCta label={c.cta} to={21} />
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() =>
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
                })
              }
            >
              <Icon name="shield" size={16} />
              What AudienceSeed is not
            </button>
          </div>
          <span className="hero2__fixed mono">
            <Icon name="signal" size={14} />
            {c.support}
          </span>
        </div>
      </footer>
    </Screen>
  );
}
