import type { CSSProperties } from 'react';
import { Screen } from '../primitives/Screen';
import { DeckHeader, MockTag, NetBox } from '../primitives/ui';
import { DeckStage } from '../primitives/deck';
import { Reveal } from '../primitives/Reveal';
import { Icon, type IconName } from '../primitives/icons';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import './s32.css';

/* Commitments operating board: seven gates run as one accountable cycle,
   not eight administrative cards. Setup -> running loop -> roadmap.
   One orange focal = the Review gate, where the loop turns. */

interface Gate {
  label: string;
  icon: IconName;
  band: 'Set' | 'Run' | 'Forward';
  short: string;
  what: string;
  owner: string;
}

const gates: Gate[] = [
  { label: 'Objective', icon: 'target', band: 'Set', short: 'What growth this is accountable to', what: 'The growth objective the partnership is accountable to.', owner: 'Brand and Inspirelabs' },
  { label: 'Scope', icon: 'layers', band: 'Set', short: 'The activation scope agreed for the cycle', what: 'The activation scope agreed for the cycle.', owner: 'Inspirelabs' },
  { label: 'KPI', icon: 'chart', band: 'Set', short: 'The KPIs that define success', what: 'The KPIs that define success. Targets are agreed in setup, never assumed here.', owner: 'Brand and Inspirelabs' },
  { label: 'Tracking', icon: 'cursor', band: 'Run', short: 'The tracking setup behind each KPI', what: 'The tracking setup behind each KPI.', owner: 'Inspirelabs with brand access' },
  { label: 'Reporting', icon: 'doc', band: 'Run', short: 'The reporting cadence and format', what: 'The reporting cadence and format.', owner: 'Inspirelabs' },
  { label: 'Review', icon: 'eye', band: 'Run', short: 'The performance review rhythm', what: 'The performance review rhythm where the cycle is checked and tuned.', owner: 'Brand and Inspirelabs' },
  { label: 'Improvement', icon: 'refresh', band: 'Forward', short: 'The improvement cycle between reviews', what: 'The improvement cycle that runs between reviews.', owner: 'Inspirelabs' },
  { label: 'Roadmap', icon: 'compass', band: 'Forward', short: 'The partnership roadmap ahead', what: 'The partnership roadmap ahead.', owner: 'Brand and Inspirelabs' },
];

const bands: { id: Gate['band']; label: string; note: string }[] = [
  { id: 'Set', label: 'Set the terms', note: 'Agreed in setup' },
  { id: 'Run', label: 'Run the cycle', note: 'Live every cycle' },
  { id: 'Forward', label: 'Carry it forward', note: 'Between cycles' },
];

export default function Screen32() {
  const c = copy[32];
  const drawer = useDrawer();

  const openGate = (g: Gate, n: number) =>
    drawer.open({
      id: `commit-${g.label}`,
      kind: 'info',
      eyebrow: `Commitment ${n} of ${gates.length}`,
      title: g.label,
      sections: [
        { heading: 'What this is', body: g.what },
        { heading: 'Owner', body: g.owner },
        { heading: 'Evidence source', body: 'Confirmed during setup. No invented dates, budgets, or KPI targets.' },
      ],
    });

  return (
    <Screen index={32} tone="light" id="commitments" label="Measurable growth commitments">
      <DeckStage
        header={<DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />}
        cta={
          <footer className="s32-foot">
            <NetBox>{c.support}</NetBox>
          </footer>
        }
      >
        <Reveal className="s32-board">
          {/* Board chrome: title bar reads as one operating standard */}
          <div className="s32-board__bar">
            <span className="s32-board__mark">
              <Icon name="cycle" size={18} />
            </span>
            <div className="s32-board__titles">
              <span className="s32-board__title">Partnership operating standard</span>
              <span className="s32-board__sub">Eight commitments, run as one accountable cycle</span>
            </div>
            <span className="s32-board__loop">
              <Icon name="refresh" size={14} />
              Reviewed every cycle
            </span>
            <span className="s32-board__tag">
              <MockTag>Operating standard</MockTag>
            </span>
          </div>

          {/* Band labels */}
          <div className="s32-bands">
            {bands.map((b, bi) => (
              <div className="s32-band" key={b.id} data-band={bi}>
                <span className="s32-band__label">{b.label}</span>
                <span className="s32-band__note">{b.note}</span>
              </div>
            ))}
          </div>

          {/* The gate sequence: one connected lane of commitments */}
          <div className="s32-gates">
            {gates.map((g, i) => {
              const focal = g.label === 'Review';
              return (
                <Reveal key={g.label} i={i} step={0.035} from="up" distance={12} className="s32-gatewrap">
                  <button
                    type="button"
                    className={`s32-gate mk-hover${focal ? ' is-focal' : ''}`}
                    data-band={g.band}
                    onClick={() => openGate(g, i + 1)}
                  >
                    <span className="s32-gate__top">
                      <span className="s32-gate__n">{i + 1}</span>
                      <span className="s32-gate__ico">
                        <Icon name={g.icon} size={17} />
                      </span>
                    </span>
                    <span className="s32-gate__label">{g.label}</span>
                    <span className="s32-gate__short">{g.short}</span>
                    {focal && <span className="s32-gate__pulse" aria-hidden="true" />}
                  </button>
                  {i < gates.length - 1 && (
                    <span className="s32-gate__link" aria-hidden="true">
                      <span className="s32-gate__flow mk-spark" style={{ ['--mk-i']: i, ['--mk-dx']: '16px' } as CSSProperties} />
                    </span>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </DeckStage>
    </Screen>
  );
}
