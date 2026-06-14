import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { copy } from '../content/copy';

const owned: { label: string; icon: IconName }[] = [
  { label: 'GrabCash', icon: 'community' },
  { label: 'GrabShare', icon: 'creator' },
];
const activation: { label: string; icon: IconName }[] = [
  { label: 'Strategic Partnerships', icon: 'partners' },
  { label: 'Affiliate Marketing Platforms', icon: 'network' },
  { label: 'Channel Amplification', icon: 'megaphone' },
  { label: 'Integrated Campaign Promotions', icon: 'calendar' },
];

function Panel({
  kicker,
  title,
  note,
  items,
  accent,
}: {
  kicker: string;
  title: string;
  note: string;
  items: { label: string; icon: IconName }[];
  accent?: boolean;
}) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <div>
        <span className="mini-cap" style={{ color: accent ? 'var(--orange-text)' : undefined }}>
          {kicker}
        </span>
        <h3 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
          {title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--body)', marginTop: 4 }}>{note}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {items.map((it) => (
          <div key={it.label} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span className={`fcard__ico${accent ? ' fcard__ico--accent' : ''}`} style={{ width: 34, height: 34 }}>
              <Icon name={it.icon} size={17} />
            </span>
            <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 14.5, color: 'var(--ink)' }}>
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Screen11() {
  const c = copy[11];
  return (
    <Screen index={11} tone="light" id="distribute-intro" label="Distribute demand intro">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1.4fr', gap: 18, alignItems: 'stretch', width: '100%' }} className="split-map">
          <Reveal from="right">
            <Panel
              kicker="Owned distribution"
              title="Surfaces Inspirelabs operates"
              note="Community-led, sharing-led, and creator-led surfaces within the Inspirelabs ecosystem."
              items={owned}
              accent
            />
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--orange)' }} aria-hidden="true">
            <Icon name="target" size={22} />
            <span className="mono" style={{ fontSize: 9, color: 'var(--grey)', textAlign: 'center', writingMode: 'vertical-rl', letterSpacing: '0.1em' }}>
              MEASURABLE ACTIONS
            </span>
          </div>
          <Reveal from="left">
            <Panel
              kicker="Activation surfaces"
              title="External ecosystems Inspirelabs activates"
              note="Partner ecosystems, affiliate publishers, channels, and campaign-specific promotions."
              items={activation}
            />
          </Reveal>
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={12} />
        </div>
      </footer>
    </Screen>
  );
}
