import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta } from '../primitives/ui';
import { AnnotatedShot } from '../primitives/deck';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s03.css';

/* The five-module expansion board. GrabOn is the proof object on the left;
   these are the parts of the Inspirelabs system that connect into it. Each row
   is informational; the only click affordance is the small "Define" hotspot. */
const modules: {
  label: string;
  icon: IconName;
  role: string;
  def: string;
  enables: string;
  proof: string;
}[] = [
  {
    label: 'Commerce intent',
    icon: 'store',
    role: 'Reach offer-ready shoppers as a buying decision is forming.',
    def: 'Reach offer-ready shoppers already moving toward a purchase on the GrabOn surface.',
    enables: 'Visibility and action while a buying decision is forming.',
    proof: 'GrabOn surface examples and available tracking for the chosen placements.',
  },
  {
    label: 'Distribution',
    icon: 'share',
    role: 'Move that demand across owned communities, creators, and partners.',
    def: 'Move demand across owned communities, creators, affiliates, partners, and channels.',
    enables: 'Reach beyond one platform with measurable actions.',
    proof: 'Surface availability and tracked-action setup per channel.',
  },
  {
    label: 'AudienceSeed',
    icon: 'signal',
    role: 'Activate shopper intent signals before media spend scales.',
    def: 'Activate shopper intent signals to improve audience quality before media spend scales.',
    enables: 'Better inputs into the retargeting stack the brand already uses.',
    proof: 'Approved signal access and existing brand media workflow consent.',
  },
  {
    label: 'AI Growth Studio',
    icon: 'spark',
    role: 'Human-reviewed AI Lab agents that speed up recurring execution.',
    def: 'Human-reviewed AI Lab agents that speed up recurring growth execution.',
    enables: 'Faster briefs, content, and reporting with a review checkpoint.',
    proof: 'Brand inputs and the review owner for each output type.',
  },
  {
    label: 'Growth commitments',
    icon: 'target',
    role: 'Run the whole partnership against defined goals and review cycles.',
    def: 'Run the partnership with defined goals, tracking, reporting, and review cycles.',
    enables: 'Accountability across the whole system, not one campaign.',
    proof: 'Agreed objective, KPI definition, and reporting cadence.',
  },
];

export default function Screen03() {
  const c = copy[3];
  const drawer = useDrawer();

  const openModule = (m: (typeof modules)[number]) =>
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
    });

  return (
    <Screen index={3} tone="light" id="from-grabon" label="From GrabOn to Inspirelabs">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s03-body">
        {/* Dominant proof object: the live GrabOn commerce surface */}
        <Reveal from="up" distance={18} className="s03-proof">
          <div className="s03-proof__shot">
            <AnnotatedShot
              src={ASSETS.grabonCategory}
              alt="GrabOn category surface, the flagship commerce-intent surface and proof point"
              url="grabon.com"
              logo={{ src: ASSETS.grabonLogo, alt: 'GrabOn' }}
              objectPosition="top center"
              style={{ height: '100%' }}
            />
          </div>
          <p className="s03-proof__cap">
            <strong>GrabOn</strong> &nbsp;the flagship commerce-intent surface and proof point
          </p>
        </Reveal>

        {/* Connector: GrabOn feeds the broader system */}
        <div className="s03-bridge" aria-hidden="true">
          <span className="s03-bridge__line" />
          <span className="s03-bridge__node">
            <Icon name="arrow" size={22} />
          </span>
          <span className="s03-bridge__label">connects into</span>
          <span className="s03-bridge__line" />
        </div>

        {/* The five-module expansion board */}
        <div className="s03-board">
          <div className="s03-board__head">
            <span className="s03-board__title">The Inspirelabs system</span>
            <span className="s03-board__sub">Five connected modules</span>
          </div>
          <div className="s03-modules">
            {modules.map((m, i) => (
              <Reveal
                i={i}
                step={0.07}
                from="right"
                distance={16}
                key={m.label}
                className={`s03-mod${i === 0 ? ' s03-mod--accent' : ''}`}
              >
                <span className="s03-mod__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="s03-mod__ico">
                  <Icon name={m.icon} size={20} />
                </span>
                <span className="s03-mod__text">
                  <span className="s03-mod__label">{m.label}</span>
                  <span className="s03-mod__role">{m.role}</span>
                </span>
                <button
                  type="button"
                  className="s03-mod__def"
                  aria-label={`Define ${m.label}`}
                  onClick={() => openModule(m)}
                >
                  Define
                  <Icon name="arrow" size={13} />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <footer className="s03-foot">
        <div className="s03-net">
          <p className="s03-net__text">
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
