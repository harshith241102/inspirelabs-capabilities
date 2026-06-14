import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { SplitScene } from '../primitives/blocks';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './mock.css';

const personas: { label: string; icon: IconName; use: string; metrics: string[] }[] = [
  { label: 'Alternative seekers', icon: 'compass', use: 'Users actively looking for a substitute or a better option.', metrics: ['Visits', 'Clicks', 'Comparison-led traffic'] },
  { label: 'Product researchers', icon: 'search', use: 'Users researching products before a decision.', metrics: ['Visits', 'Category engagement', 'Leads where applicable'] },
  { label: 'Category explorers', icon: 'grid', use: 'Users browsing a category to shortlist options.', metrics: ['Visits', 'Clicks', 'Category engagement'] },
  { label: 'Comparison-led users', icon: 'layers', use: 'Users weighing options side by side before choosing.', metrics: ['Comparison-led traffic', 'Clicks', 'Leads where applicable'] },
];

export default function Screen10() {
  const c = copy[10];
  const drawer = useDrawer();

  return (
    <Screen index={10} tone="light" id="alternatives" label="Alternatives.co comparison-led discovery">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <SplitScene
          textWidth={400}
          text={
            <>
              <p className="s-support">{c.support}</p>
              <div className="surface-list">
                {personas.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className="surface-list__item"
                    onClick={() =>
                      drawer.open({
                        id: `alt-${p.label}`,
                        kind: 'metric',
                        eyebrow: 'Comparison-led persona',
                        title: p.label,
                        sections: [
                          { heading: 'What this is', body: p.use },
                          { heading: 'Measurement, where applicable', items: p.metrics },
                          { heading: 'What not to assume', body: 'Comparison visuals and traffic figures need approval before client-facing use.' },
                        ],
                      })
                    }
                  >
                    <span className="surface-list__ico">
                      <Icon name={p.icon} size={16} />
                    </span>
                    <span className="surface-list__label">{p.label}</span>
                    <Icon name="arrow" size={14} className="surface-list__more" />
                  </button>
                ))}
              </div>
              <div className="cta-stack">
                <div className="cta-row">
                  <AdvanceCta label={c.cta} to={11} />
                </div>
                {c.aiChip && <SupportChip context={c.aiChip} />}
              </div>
            </>
          }
          figure={
            <Reveal from="left" style={{ width: '100%' }}>
              <div className="mock">
                <MockTag>Illustrative mockup, not final data</MockTag>
                <div className="mock__bar">
                  <img src={ASSETS.alternativesLogo} alt="Alternatives.co" />
                  <span className="mock__spacer" />
                  <span className="mono" style={{ fontSize: 10, color: 'var(--grey)' }}>
                    Comparison shortlist
                  </span>
                </div>
                <div className="mock__pad">
                  <div className="cmp">
                    <div className="cmp__head">
                      <span>Option</span>
                      <span>Value</span>
                      <span>Offers</span>
                      <span>Support</span>
                      <span>Trust</span>
                    </div>
                    {[
                      { name: 'Your brand', tag: 'You', dots: [1, 1, 1, 1], you: true },
                      { name: 'Option A', tag: 'A', dots: [1, 0, 1, 1] },
                      { name: 'Option B', tag: 'B', dots: [1, 1, 0, 1] },
                      { name: 'Option C', tag: 'C', dots: [0, 1, 1, 0] },
                    ].map((row) => (
                      <div className={`cmp__row${row.you ? ' cmp__row--you' : ''}`} key={row.name}>
                        <span className="cmp__name">
                          <span className="cmp__avatar">{row.tag}</span>
                          {row.name}
                        </span>
                        {row.dots.map((d, j) => (
                          <span key={j} className={`cmp__dot${d ? ' cmp__dot--on' : ''}`} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          }
        />
      </div>
    </Screen>
  );
}
