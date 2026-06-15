import { Screen } from '../primitives/Screen';
import { DeckHeader, EvidenceTag, MockTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s10.css';

/* B2B software-discovery personas (NOT consumer shoppers). Each opens a drawer. */
const personas: { label: string; sub: string; icon: IconName; use: string; metrics: string[] }[] = [
  {
    label: 'SaaS buyers',
    sub: 'Software buyers shortlisting a tool',
    icon: 'search',
    use: 'Buyers comparing software tools before they commit to a vendor.',
    metrics: ['Visits', 'Clicks', 'Comparison-led traffic', 'Leads where applicable'],
  },
  {
    label: 'Tool evaluators',
    sub: 'Teams weighing options side by side',
    icon: 'layers',
    use: 'Evaluators weighing fit, deployment, pricing, and integrations across tools.',
    metrics: ['Comparison-led traffic', 'Clicks', 'Category engagement'],
  },
  {
    label: 'Alternative seekers',
    sub: 'Looking for a better-fit substitute',
    icon: 'compass',
    use: 'Users actively searching for an alternative to an incumbent software tool.',
    metrics: ['Visits', 'Clicks', 'Comparison-led traffic'],
  },
  {
    label: 'Category researchers',
    sub: 'Mapping a software category',
    icon: 'grid',
    use: 'Researchers mapping a software category to build an evaluation shortlist.',
    metrics: ['Visits', 'Category engagement', 'Leads where applicable'],
  },
];

/* Illustrative B2B SaaS-alternatives rows. No real vendor names, no invented
   metrics: fit is a relative shortlist signal, fields are software-buyer fields. */
type ToolRow = {
  name: string;
  mark: string;
  markBg: string;
  category: string;
  useCase: string;
  deployment: string;
  pricing: string;
  fit: number;
  stage: string;
  best?: boolean;
};

const tools: ToolRow[] = [
  {
    name: 'Your CRM',
    mark: 'Y',
    markBg: 'var(--orange)',
    category: 'Sales CRM',
    useCase: 'Pipeline and revenue ops',
    deployment: 'Cloud, API-first',
    pricing: 'Per seat, annual',
    fit: 94,
    stage: 'Shortlisted',
    best: true,
  },
  {
    name: 'Tool A',
    mark: 'A',
    markBg: '#3f4350',
    category: 'Sales CRM',
    useCase: 'SMB contact management',
    deployment: 'Cloud',
    pricing: 'Per seat, monthly',
    fit: 78,
    stage: 'Comparing',
  },
  {
    name: 'Tool B',
    mark: 'B',
    markBg: '#3f4350',
    category: 'CRM and marketing',
    useCase: 'Inbound and lifecycle',
    deployment: 'Cloud',
    pricing: 'Tiered, usage add-ons',
    fit: 71,
    stage: 'Comparing',
  },
  {
    name: 'Tool C',
    mark: 'C',
    markBg: '#3f4350',
    category: 'Open-source CRM',
    useCase: 'Custom dev workflows',
    deployment: 'Self-hosted',
    pricing: 'Open core',
    fit: 63,
    stage: 'Researching',
  },
];

export default function Screen10() {
  const c = copy[10];
  const drawer = useDrawer();

  return (
    <Screen index={10} tone="light" id="alternatives" label="Alternatives.co comparison-led discovery">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s10-body">
        <aside className="s10-side">
          <p className="s10-lead">{c.support}</p>

          <div className="s10-personas" role="list">
            {personas.map((p) => (
              <button
                key={p.label}
                type="button"
                className="s10-row"
                onClick={() =>
                  drawer.open({
                    id: `alt-${p.label}`,
                    kind: 'metric',
                    eyebrow: 'Comparison-led persona',
                    title: p.label,
                    sections: [
                      { heading: 'What this is', body: p.use },
                      { heading: 'Measurement, where applicable', items: p.metrics },
                      {
                        heading: 'What not to assume',
                        body: 'This is B2B software discovery. Comparison visuals and traffic figures need approval before client-facing use.',
                      },
                    ],
                  })
                }
              >
                <span className="s10-row__ico">
                  <Icon name={p.icon} size={17} />
                </span>
                <span className="s10-row__txt">
                  <span className="s10-row__label">{p.label}</span>
                  <span className="s10-row__sub">{p.sub}</span>
                </span>
                <Icon name="arrow" size={14} className="s10-row__more" />
              </button>
            ))}
          </div>

          <div className="s10-measure">
            <EvidenceTag status="pending">Measurement, where available</EvidenceTag>
            <span className="s10-measure__text">
              Visits, clicks, category engagement, comparison-led traffic, and leads where applicable.
            </span>
          </div>
        </aside>

        <Reveal from="right" distance={24} className="s10-mock">
          <div className="s10-mock__bar">
            <i />
            <i />
            <i />
            <span className="s10-mock__url">
              <Icon name="search" size={13} />
              alternatives.co/best-crm-alternatives
            </span>
            <span className="s10-mock__logo">
              <img src={ASSETS.alternativesLogo} alt="Alternatives.co" />
            </span>
          </div>
          <div className="s10-mock__tag">
            <MockTag>Illustrative mockup, not final data</MockTag>
          </div>

          <div className="s10-page">
            <div className="s10-page__top">
              <div>
                <div className="s10-page__crumb">Software discovery / CRM</div>
                <h2 className="s10-page__h">Best CRM alternatives</h2>
              </div>
              <span className="s10-page__count">
                <b>4</b> tools compared by buyer fit
              </span>
            </div>

            <div className="s10-table">
              <div className="s10-thead">
                <span className="s10-th">Tool</span>
                <span className="s10-th">Use case</span>
                <span className="s10-th">Deployment</span>
                <span className="s10-th">Pricing model</span>
                <span className="s10-th">Buyer fit</span>
                <span className="s10-th">Buyer stage</span>
              </div>
              <div className="s10-tbody">
                {tools.map((t) => (
                  <div key={t.name} className={`s10-trow${t.best ? ' s10-trow--best' : ''}`}>
                    <span className="s10-tool">
                      <span className="s10-tool__mark" style={{ background: t.markBg }}>
                        {t.mark}
                      </span>
                      <span className="s10-tool__meta">
                        <span className="s10-tool__name">
                          {t.name}
                          {t.best && (
                            <span className="s10-best">
                              <Icon name="check" size={10} />
                              Best fit
                            </span>
                          )}
                        </span>
                        <span className="s10-tool__cat">{t.category}</span>
                      </span>
                    </span>
                    <span className="s10-cell">{t.useCase}</span>
                    <span className="s10-cell s10-cell--muted">{t.deployment}</span>
                    <span className="s10-cell s10-cell--muted">{t.pricing}</span>
                    <span className="s10-fit">
                      <span className="s10-fit__track">
                        <span
                          className={`s10-fit__bar${t.best ? ' is-best' : ''}`}
                          style={{ width: `${t.fit}%` }}
                        />
                      </span>
                      <span className="s10-fit__pct">{t.fit}</span>
                    </span>
                    <span>
                      <span className="s10-stage">{t.stage}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Screen>
  );
}
