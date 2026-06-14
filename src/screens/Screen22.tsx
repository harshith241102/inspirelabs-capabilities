import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Ladder } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const rungs = [
  { label: 'Page view', caption: 'Interest', metric: 'Page views', meaning: 'Passive interest. The shopper looked, but has not signalled intent yet.' },
  { label: 'Offer view', caption: 'Considering', metric: 'Offer views', meaning: 'The shopper is considering a specific offer.' },
  { label: 'Coupon reveal', caption: 'Intent', metric: 'Coupon reveals', meaning: 'Revealing a coupon is a stronger purchase-intent signal.' },
  { label: 'Outbound click', caption: 'Action', metric: 'Outbound clicks', meaning: 'Clicking out toward the brand is an action signal.' },
  { label: 'Engagement depth', caption: 'Stronger', metric: 'Engagement depth', meaning: 'Deeper engagement suggests stronger interest.' },
  { label: 'Repeat behaviour', caption: 'Sustained', metric: 'Repeat behaviour', meaning: 'Repeat behaviour suggests sustained intent.' },
  { label: 'Signal freshness', caption: 'Recency', metric: 'Signal freshness', meaning: 'How recent the signal is affects how useful it is.' },
];

export default function Screen22() {
  const c = copy[22];
  const drawer = useDrawer();

  return (
    <Screen index={22} tone="light" id="signal-depth" label="Intent signal depth">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <Ladder
          rungs={rungs.map((r) => ({ label: r.label, caption: r.caption }))}
          onRung={(i) =>
            drawer.open({
              id: `rung-${i}`,
              kind: 'metric',
              eyebrow: `Signal ${i + 1} of ${rungs.length}`,
              title: rungs[i].label,
              sections: [
                { heading: 'What this is', body: rungs[i].meaning },
                { heading: 'How it informs audience quality', body: 'Stronger and fresher signals point to higher-quality audiences for retargeting.' },
                { heading: 'Metric field', body: rungs[i].metric },
                { heading: 'What not to assume', body: 'This is not a score unless scoring logic is validated.' },
              ],
            })
          }
        />
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={23} />
        </div>
      </footer>
    </Screen>
  );
}
