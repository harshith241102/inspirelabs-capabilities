import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { SupportChip } from '../components/SupportChip';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const channels: { label: string; icon: IconName }[] = [
  { label: 'Social', icon: 'community' },
  { label: 'Email', icon: 'mail' },
  { label: 'Newsletter', icon: 'doc' },
  { label: 'App push', icon: 'bell' },
  { label: 'Web push', icon: 'bell' },
  { label: 'YouTube', icon: 'play' },
  { label: 'Instagram', icon: 'creator' },
  { label: 'Media house', icon: 'megaphone' },
  { label: 'Telegram', icon: 'send' },
];

export default function Screen18() {
  const c = copy[18];
  const drawer = useDrawer();

  return (
    <Screen index={18} tone="light" id="channel-amplification" label="Channel amplification">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Reveal>
          <span className="mini-cap">One creative set, selected channels · chosen by objective, fit, assets, and tracking</span>
        </Reveal>
        <div className="channel-grid">
          {channels.map((ch, i) => (
            <Reveal i={i} step={0.04} key={ch.label}>
              <button
                type="button"
                className="channel-tile"
                style={{ width: '100%' }}
                onClick={() =>
                  drawer.open({
                    id: `channel-${ch.label}`,
                    kind: 'surface',
                    eyebrow: 'Channel',
                    title: ch.label,
                    sections: [
                      { heading: 'Asset requirements', body: 'Creative variants sized and formatted for the channel.' },
                      { heading: 'Measurement', items: ['Reach', 'Impressions', 'Clicks', 'CTR', 'CPC', 'Channel-wise performance'] },
                      { heading: 'Limitations', body: 'Channel availability and platform logos depend on permissions. Unavailable channels are removed rather than implied.' },
                    ],
                  })
                }
              >
                <span className="channel-tile__ico">
                  <Icon name={ch.icon} size={17} />
                </span>
                <span className="channel-tile__label">{ch.label}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-stack">
          <div className="cta-row">
            <AdvanceCta label={c.cta} to={19} />
          </div>
          {c.aiChip && <SupportChip context={c.aiChip} />}
        </div>
      </footer>
    </Screen>
  );
}
