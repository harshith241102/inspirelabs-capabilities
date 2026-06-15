import { Screen } from '../primitives/Screen';
import { DeckHeader } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import './s04.css';

/* Pre-brand decision-journey stages. These all happen BEFORE the customer
   reaches a brand-owned surface, so they sit left of the tracking boundary. */
const stages: { label: string; caption: string; icon: IconName }[] = [
  { label: 'Search', caption: 'Looking for options', icon: 'search' },
  { label: 'Offers', caption: 'Comparing deals', icon: 'tag' },
  { label: 'Creators', caption: 'Recommendations', icon: 'creator' },
  { label: 'Communities', caption: 'Peer signals', icon: 'community' },
  { label: 'Partners', caption: 'Partner surfaces', icon: 'partners' },
];

export default function Screen04() {
  const c = copy[4];
  const drawer = useDrawer();

  const openStage = (label: string) =>
    drawer.open({
      id: `journey-${label}`,
      kind: 'info',
      eyebrow: 'Pre-brand moment',
      title: label,
      sections: [
        {
          heading: 'What this is',
          body: 'A moment in the customer decision before they reach a brand-owned surface.',
        },
        { heading: 'Why it matters', body: c.drawer ?? '' },
      ],
    });

  return (
    <Screen index={4} tone="light" id="why-system" label="Why brands need a growth system">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s04-body">
        <div className="s04-map" role="group" aria-label="Pre-brand customer decision journey">
          {/* Zone labels above the two halves of the journey */}
          <div className="s04-zonebar">
            <span className="s04-zone s04-zone--pre">
              <Icon name="compass" size={15} />
              The decision forms across surfaces you do not own
            </span>
            <span className="s04-zone s04-zone--post">
              <Icon name="eye" size={14} />
              Brand-owned tracking begins here
            </span>
          </div>

          {/* The journey track: continuous line under the nodes */}
          <div className="s04-track">
            <span className="s04-line" aria-hidden="true" />

            <div className="s04-stages">
              {stages.map((s, i) => (
                <Reveal key={s.label} i={i} from="up" distance={16} className="s04-stagewrap">
                  <button
                    type="button"
                    className="s04-stage"
                    onClick={() => openStage(s.label)}
                    aria-label={`${s.label}. ${s.caption}. Open detail`}
                  >
                    <span className="s04-stage__node">
                      <Icon name={s.icon} size={26} />
                      <span className="s04-stage__pin">{i + 1}</span>
                    </span>
                    <span className="s04-stage__label">{s.label}</span>
                    <span className="s04-stage__cap">{s.caption}</span>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* The single orange focal: the tracking boundary the customer
                crosses late, after the decision is already forming. */}
            <Reveal i={5} from="none" className="s04-boundary">
              <span className="s04-boundary__line" aria-hidden="true" />
              <span className="s04-boundary__flag">
                <Icon name="eye" size={16} />
                Tracking boundary
              </span>
            </Reveal>

            {/* The brand-arrival endpoint, right of the boundary */}
            <Reveal i={6} from="up" distance={16} className="s04-endwrap">
              <div className="s04-end">
                <span className="s04-end__node">
                  <Icon name="store" size={30} />
                </span>
                <span className="s04-end__label">Brand visit</span>
                <span className="s04-end__cap">Where your funnel usually begins</span>
              </div>
            </Reveal>
          </div>

          {/* Takeaway pinned to the map, not a separate card rhythm */}
          <Reveal i={7} from="up" distance={12} className="s04-take">
            <span className="s04-take__bar" aria-hidden="true" />
            <p className="s04-take__text">{c.support}</p>
          </Reveal>
        </div>
      </div>

      <footer className="s04-foot">
        <span className="s04-foot__note mono">
          This sets up the signal blind spot AudienceSeed closes later
        </span>
      </footer>
    </Screen>
  );
}
