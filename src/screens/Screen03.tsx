import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, Shot, Chip } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';

const modules: { label: string; icon: IconName; def: string; enables: string; proof: string }[] = [
  {
    label: 'Commerce intent',
    icon: 'store',
    def: 'Reach offer-ready shoppers already moving toward a purchase on the GrabOn surface.',
    enables: 'Visibility and action while a buying decision is forming.',
    proof: 'GrabOn surface examples and available tracking for the chosen placements.',
  },
  {
    label: 'Distribution',
    icon: 'share',
    def: 'Move demand across owned communities, creators, affiliates, partners, and channels.',
    enables: 'Reach beyond one platform with measurable actions.',
    proof: 'Surface availability and tracked-action setup per channel.',
  },
  {
    label: 'AudienceSeed',
    icon: 'signal',
    def: 'Activate shopper intent signals to improve audience quality before media spend scales.',
    enables: 'Better inputs into the retargeting stack the brand already uses.',
    proof: 'Approved signal access and existing brand media workflow consent.',
  },
  {
    label: 'AI Growth Studio',
    icon: 'spark',
    def: 'Human-reviewed AI Lab agents that speed up recurring growth execution.',
    enables: 'Faster briefs, content, and reporting with a review checkpoint.',
    proof: 'Brand inputs and the review owner for each output type.',
  },
  {
    label: 'Growth commitments',
    icon: 'target',
    def: 'Run the partnership with defined goals, tracking, reporting, and review cycles.',
    enables: 'Accountability across the whole system, not one campaign.',
    proof: 'Agreed objective, KPI definition, and reporting cadence.',
  },
];

export default function Screen03() {
  const c = copy[3];
  const drawer = useDrawer();

  return (
    <Screen index={3} tone="light" id="from-grabon" label="From GrabOn to Inspirelabs">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div className="expand">
          <Reveal from="right" className="expand__proof">
            <span className="expand__proof-label">GrabOn</span>
            <Shot src={ASSETS.grabonCategory} alt="GrabOn category surface" url="grabon.com" />
            <span className="expand__proof-sub">The flagship commerce-intent surface and the proof point for the system.</span>
            <Chip accent>Flagship surface</Chip>
          </Reveal>

          <div className="expand__arrow" aria-hidden="true">
            <span>connects into</span>
            <Icon name="arrow" size={26} />
          </div>

          <div className="expand__nodes">
            {modules.map((m, i) => (
              <Reveal i={i} step={0.08} key={m.label}>
                <button
                  type="button"
                  className="surface-list__item"
                  onClick={() =>
                    drawer.open({
                      id: `module-${m.label}`,
                      kind: 'info',
                      eyebrow: 'Growth system module',
                      title: m.label,
                      sections: [
                        { heading: 'What this is', body: m.def },
                        { heading: 'What it enables', body: m.enables },
                        { heading: 'What proof or input is required', body: m.proof },
                        { heading: 'What not to assume', body: c.drawer },
                      ],
                    })
                  }
                >
                  <span className="surface-list__ico">
                    <Icon name={m.icon} size={16} />
                  </span>
                  <span className="surface-list__label">{m.label}</span>
                  <span className="surface-list__more mono" style={{ fontSize: 10 }}>
                    Define
                  </span>
                  <Icon name="arrow" size={14} className="surface-list__more" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <footer className="s-footer-row">
        <div className="s-net">
          <p className="s-net__text">
            <strong>The role of GrabOn gets stronger inside the broader Inspirelabs system.</strong>
          </p>
        </div>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={4} />
        </div>
      </footer>
    </Screen>
  );
}
