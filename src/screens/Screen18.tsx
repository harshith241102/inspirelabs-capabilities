import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, EvidenceTag } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import { ASSETS } from '../lib/assets';
import './s18.css';

/* The selection logic that decides where one creative set travels.
   No guaranteed omnichannel: channels are chosen, not auto-posted. */
const gates: { label: string; icon: IconName }[] = [
  { label: 'Objective', icon: 'target' },
  { label: 'Category fit', icon: 'grid' },
  { label: 'Asset readiness', icon: 'layers' },
  { label: 'Tracking availability', icon: 'chart' },
];

type ChannelState = 'live' | 'selected' | 'held';

const channels: { label: string; icon: IconName; state: ChannelState; note: string }[] = [
  { label: 'Telegram', icon: 'send', state: 'live', note: 'Live channel post and report' },
  { label: 'Email', icon: 'mail', state: 'selected', note: 'Selected for this campaign' },
  { label: 'App push', icon: 'bell', state: 'selected', note: 'Selected for this campaign' },
  { label: 'Social', icon: 'community', state: 'selected', note: 'Selected for this campaign' },
  { label: 'Newsletter', icon: 'doc', state: 'held', note: 'Not selected, asset pending' },
  { label: 'Web push', icon: 'bell', state: 'held', note: 'Not selected' },
  { label: 'YouTube', icon: 'play', state: 'held', note: 'Not selected, permission gated' },
  { label: 'Media house', icon: 'megaphone', state: 'held', note: 'Not selected' },
];

const stateLabel: Record<ChannelState, string> = {
  live: 'Live',
  selected: 'Selected',
  held: 'Not selected',
};

export default function Screen18() {
  const c = copy[18];
  const drawer = useDrawer();

  const openSelection = () =>
    drawer.open({
      id: 'channel-selection-logic',
      kind: 'surface',
      eyebrow: 'Channel selection',
      title: 'How channels are chosen',
      sections: [
        {
          heading: 'One creative set, selected channels',
          body: 'A single approved creative set is adapted per channel. Channels are chosen for the campaign, not posted everywhere automatically.',
        },
        { heading: 'Selection inputs', items: ['Objective', 'Category fit', 'Asset readiness', 'Tracking availability'] },
        { heading: 'Measurement, where available', items: ['Reach', 'Impressions', 'Clicks', 'CTR', 'CPC', 'Channel-wise performance'] },
        {
          heading: 'What not to assume',
          body: 'Channel availability and platform permissions vary. Unavailable channels are removed rather than implied. There is no guaranteed omnichannel reach or automatic posting.',
        },
      ],
    });

  return (
    <Screen index={18} tone="light" id="channel-amplification" label="Channel amplification">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />

      <div className="s18-board">
        {/* Zone 1 - one creative set (real Telegram ad creative) */}
        <Reveal from="up" distance={16} className="s18-source">
          <span className="s18-zone-kicker mono">One creative set</span>
          <div className="s18-creative">
            <div className="s18-creative__shot">
              <img src={ASSETS.telegramAd} alt="Telegram campaign ad creative, one approved creative set" loading="lazy" />
              <span className="s18-creative__tag">
                <EvidenceTag status="approved">Real Telegram creative</EvidenceTag>
              </span>
            </div>
            <span className="s18-creative__cap">One approved set, adapted per channel</span>
            <ul className="s18-formats">
              {['Post creative', 'Banner', 'Short copy', 'Link card'].map((f) => (
                <li key={f} className="s18-format">
                  <Icon name="layers" size={13} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Zone 2 - selection logic gate */}
        <Reveal i={1} from="up" distance={16} className="s18-gate">
          <span className="s18-zone-kicker mono">Selection logic</span>
          <button type="button" className="s18-gate__panel" onClick={openSelection} aria-label="How channels are chosen">
            <span className="s18-gate__lead">Chosen channels, not auto-posting</span>
            <ul className="s18-gate__list">
              {gates.map((g) => (
                <li key={g.label} className="s18-gate__item">
                  <span className="s18-gate__ico">
                    <Icon name={g.icon} size={16} />
                  </span>
                  {g.label}
                </li>
              ))}
            </ul>
            <span className="s18-gate__more mono">
              How channels are chosen
              <Icon name="arrow" size={14} />
            </span>
          </button>
        </Reveal>

        {/* Zone 3 - selected channels, Telegram proven */}
        <Reveal i={2} from="up" distance={16} className="s18-out">
          <span className="s18-zone-kicker mono">Selected channels</span>
          <div className="s18-channels">
            {channels.map((ch) => (
              <div key={ch.label} className={`s18-chan is-${ch.state}`}>
                <span className="s18-chan__ico">
                  <Icon name={ch.icon} size={17} />
                </span>
                <span className="s18-chan__label">{ch.label}</span>
                <span className={`s18-chan__state is-${ch.state}`}>
                  {ch.state === 'held' && <Icon name="arrow" size={11} className="s18-chan__hold" />}
                  {ch.state !== 'held' && <Icon name="check" size={11} />}
                  {stateLabel[ch.state]}
                </span>
              </div>
            ))}
          </div>

          {/* Telegram proof - real post + real report */}
          <div className="s18-proof">
            <div className="s18-proof__phone phone">
              <img src={ASSETS.telegramPost} alt="Live Telegram channel post carrying the brand offer" loading="lazy" />
            </div>
            <div className="s18-proof__report">
              <div className="s18-proof__reporthead">
                <span className="s18-proof__reporttitle">Telegram channel report</span>
                <EvidenceTag status="pending">Measurement, where available</EvidenceTag>
              </div>
              <div className="s18-proof__reportshot">
                <img src={ASSETS.telegramReport} alt="Telegram channel performance report, real reporting surface" loading="lazy" />
              </div>
              <span className="s18-proof__cap mono">Reach, impressions, clicks, and channel-wise performance</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="s18-foot">
        <AdvanceCta label={c.cta} to={19} />
      </div>
    </Screen>
  );
}
