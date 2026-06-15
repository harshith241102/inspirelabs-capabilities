import { Screen } from '../primitives/Screen';
import { DeckHeader, NetBox, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s12.css';

interface Engine {
  name: string;
  tagline: string;
  src: string;
  url: string;
  logo: string;
  shape: 'desktop' | 'phone';
  roles: string[];
  actions: string[];
}

const engines: Engine[] = [
  {
    name: 'GrabCash',
    tagline: 'Community and share-led',
    src: ASSETS.grabcashDeals,
    url: 'grabcash',
    logo: ASSETS.grabcashLogo,
    shape: 'desktop',
    roles: ['Everyday sharers', 'Deal communities', 'Cashback-led converters'],
    actions: ['Clicks', 'Leads', 'Orders', 'Sales', 'User-wise performance'],
  },
  {
    name: 'GrabShare',
    tagline: 'Creator and storefront-led',
    src: ASSETS.grabshareHome,
    url: 'grabshare',
    logo: ASSETS.grabshareLogo,
    shape: 'phone',
    roles: ['Creators', 'Influencers', 'Recommendation-led buyers'],
    actions: ['Reach', 'Engagement', 'Clicks', 'Orders', 'Creator-wise conversions'],
  },
];

// The single shared measurable-action path both engines feed into.
const path: { icon: IconName; label: string }[] = [
  { icon: 'share', label: 'Offer shared' },
  { icon: 'cursor', label: 'Tracked link' },
  { icon: 'tag', label: 'Click, order, sale' },
  { icon: 'chart', label: 'Measurable performance' },
];

export default function Screen12() {
  const c = copy[12];
  const drawer = useDrawer();

  const openEngine = (e: Engine) =>
    drawer.open({
      id: `owned-${e.name}`,
      kind: 'surface',
      eyebrow: 'Owned distribution',
      title: e.name,
      sections: [
        { heading: 'What this is', body: c.drawer },
        { heading: 'Who moves the offer', items: e.roles },
        { heading: 'Measurable actions, where tracking is available', items: e.actions },
        {
          heading: 'What not to assume',
          body: 'Performance fields are shown without invented numbers until reporting is confirmed.',
        },
      ],
    });

  return (
    <Screen index={12} tone="light" id="owned-distribution" label="Owned distribution overview">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s12-stage">
        {/* Two enlarged owned-distribution product scenes */}
        <div className="s12-engines">
          {engines.map((e, i) => (
            <Reveal
              key={e.name}
              i={i}
              from={i === 0 ? 'right' : 'left'}
              className={`s12-engine s12-engine--${e.shape}`}
            >
              <div className="s12-engine__head">
                <img className="s12-engine__logo" src={e.logo} alt={e.name} />
                <span className="s12-engine__tag">{e.tagline}</span>
              </div>

              <button
                type="button"
                className={`s12-frame s12-frame--${e.shape}`}
                onClick={() => openEngine(e)}
                aria-label={`${e.name}: roles, actions and metrics`}
              >
                <span className="s12-frame__bar">
                  <i />
                  <i />
                  <i />
                  <span className="s12-frame__url">{e.url}</span>
                </span>
                <span className="s12-frame__view">
                  <img src={e.src} alt={`${e.name} owned distribution surface`} loading="lazy" />
                </span>
                <span className="s12-frame__more">
                  Roles, actions and metrics
                  <Icon name="arrow" size={13} />
                </span>
              </button>
            </Reveal>
          ))}

          <div className="s12-merge" aria-hidden="true" />
        </div>

        {/* One shared measurable-action path: the single orange focal */}
        <Reveal i={2} from="up" distance={16} className="s12-pathwrap">
          <span className="s12-path__cap">Both engines feed one measurable action path</span>
          <div className="s12-path">
            {path.map((p, i) => (
              <div key={p.label} className="s12-path__node">
                <span className={`s12-path__ico${i === path.length - 1 ? ' is-end' : ''}`}>
                  <Icon name={p.icon} size={19} />
                </span>
                <span className="s12-path__label">{p.label}</span>
                {i < path.length - 1 && <span className="s12-path__link" aria-hidden="true" />}
              </div>
            ))}
            <EvidenceTag status="pending">Where tracking is available</EvidenceTag>
          </div>
        </Reveal>
      </div>

      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
