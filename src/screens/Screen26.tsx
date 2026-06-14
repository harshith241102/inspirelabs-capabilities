import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const stages: { title: string; sub: string; icon: IconName; variant?: string }[] = [
  { title: 'Inputs', sub: 'Brand or category brief', icon: 'doc' },
  { title: 'Agents running', sub: 'In-house AI Lab agents', icon: 'spark' },
  { title: 'Human review', sub: 'A person checks the work', icon: 'shield', variant: 'review' },
  { title: 'Launch-ready outputs', sub: 'Review-ready, not auto-launched', icon: 'check', variant: 'out' },
];

const guards: { label: string; icon: IconName }[] = [
  { label: 'Built in-house', icon: 'flask' },
  { label: 'Productised systems', icon: 'layers' },
  { label: 'Human review', icon: 'shield' },
  { label: 'Custom agents', icon: 'spark' },
  { label: 'Faster execution', icon: 'bolt' },
];

export default function Screen26() {
  const c = copy[26];
  const drawer = useDrawer();

  return (
    <Screen index={26} tone="light" id="ai-intro" label="AI Growth Studio intro">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <div className="control">
            {stages.map((st, i) => (
              <div className="control__stage" key={st.title}>
                <Reveal i={i} from="right" style={{ flex: 1, display: 'flex', minWidth: 0 }}>
                  <div className={`control__panel${st.variant ? ` control__panel--${st.variant}` : ''}`}>
                    <span className="control__ico">
                      <Icon name={st.icon} size={20} />
                    </span>
                    <span className="control__title">{st.title}</span>
                    <span className="control__sub">{st.sub}</span>
                    {st.variant === 'review' && <span className="status status--active">Review checkpoint</span>}
                  </div>
                </Reveal>
                {i < stages.length - 1 && (
                  <span className="control__link" aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="metric-strip">
            {guards.map((g) => (
              <span className="chip" key={g.label}>
                <Icon name={g.icon} size={13} style={{ color: 'var(--orange)' }} />
                {g.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={27} />
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() =>
              drawer.open({
                id: 'ai-guardrail',
                kind: 'ai',
                eyebrow: 'AI Growth Studio guardrail',
                title: 'What AI Growth Studio does and does not do',
                sections: [
                  { heading: 'What it is', body: 'Human-reviewed execution support from Inspirelabs’ in-house AI Lab.' },
                  { heading: 'What it does not do', items: ['Replace client teams', 'Guarantee ROI', 'Launch work without review'] },
                ],
                requiredInput: 'Brand inputs and the review owner for each output type.',
                humanReview: 'Every output is reviewed by a person before it is used.',
              })
            }
          >
            <Icon name="shield" size={16} />
            See the guardrails
          </button>
        </div>
      </footer>
    </Screen>
  );
}
