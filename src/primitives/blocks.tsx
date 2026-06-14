import type { ReactNode } from 'react';
import { Icon, type IconName } from './icons';
import { Reveal } from './Reveal';
import './blocks.css';

/* ---------------- Split scene (text + figure) ---------------- */

export function SplitScene({
  text,
  figure,
  textWidth = 460,
  reverse,
}: {
  text: ReactNode;
  figure: ReactNode;
  textWidth?: number;
  reverse?: boolean;
}) {
  return (
    <div className={`split${reverse ? ' split--rev' : ''}`}>
      <div className="split__text" style={{ flexBasis: textWidth }}>
        {text}
      </div>
      <div className="split__fig">{figure}</div>
    </div>
  );
}

/* ---------------- Card grid ---------------- */

export function CardGrid({
  cols = 3,
  gap = 14,
  children,
  min,
}: {
  cols?: number;
  gap?: number;
  children: ReactNode;
  min?: number;
}) {
  return (
    <div
      className="cardgrid"
      style={{
        gridTemplateColumns: min
          ? `repeat(auto-fit, minmax(${min}px, 1fr))`
          : `repeat(${cols}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Feature card ---------------- */

export function FeatureCard({
  icon,
  title,
  body,
  accent,
  foot,
  i = 0,
}: {
  icon?: IconName;
  title: ReactNode;
  body?: ReactNode;
  accent?: boolean;
  foot?: ReactNode;
  i?: number;
}) {
  return (
    <Reveal i={i} className={`fcard${accent ? ' fcard--accent' : ''}`}>
      {icon && (
        <span className={`fcard__ico${accent ? ' fcard__ico--accent' : ''}`}>
          <Icon name={icon} size={20} />
        </span>
      )}
      <div className="fcard__title">{title}</div>
      {body && <div className="fcard__body">{body}</div>}
      {foot && <div className="fcard__foot">{foot}</div>}
    </Reveal>
  );
}

/* ---------------- Intent / surface lanes ---------------- */

export function Lanes({
  items,
}: {
  items: { icon: IconName; label: string; caption: string; level: number; accent?: boolean }[];
}) {
  return (
    <div className="lanes">
      {items.map((it, i) => (
        <Reveal i={i} key={it.label} className={`lane${it.accent ? ' lane--accent' : ''}`}>
          <span className={`lane__ico${it.accent ? ' lane__ico--accent' : ''}`}>
            <Icon name={it.icon} size={20} />
          </span>
          <div className="lane__main">
            <div className="lane__label">{it.label}</div>
            <div className="lane__caption">{it.caption}</div>
            <div className="lane__track">
              <span className="lane__fill" style={{ width: `${it.level}%` }} />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- Signal ladder ---------------- */

export function Ladder({
  rungs,
  onRung,
}: {
  rungs: { label: string; caption?: string }[];
  onRung?: (i: number) => void;
}) {
  const n = rungs.length;
  return (
    <div className="ladder" role="list">
      {rungs.map((r, i) => {
        const intensity = (i + 1) / n;
        return (
          <Reveal
            i={i}
            step={0.06}
            key={r.label}
            className="ladder__rung"
            style={{ marginLeft: `${(i / (n - 1)) * 34}%`, width: `${100 - (i / (n - 1)) * 34}%` }}
          >
            <button
              type="button"
              className="ladder__btn"
              onClick={() => onRung?.(i)}
              role="listitem"
              style={{
                // crisp opaque step from grey to orange as intent rises
                borderColor: i === n - 1 ? 'var(--orange)' : 'var(--card-bd)',
              }}
            >
              <span
                className="ladder__rank"
                style={{
                  background: `color-mix(in srgb, var(--orange) ${Math.round(intensity * 100)}%, #eef0f3)`,
                  color: intensity > 0.55 ? '#fff' : 'var(--ink)',
                }}
              >
                {i + 1}
              </span>
              <span className="ladder__text">
                <span className="ladder__label">{r.label}</span>
                {r.caption && <span className="ladder__caption">{r.caption}</span>}
              </span>
              {onRung && <Icon name="arrow" size={15} className="ladder__more" />}
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------------- Workflow / flow rail ---------------- */

export type NodeState = 'active' | 'queued' | 'complete' | 'review' | 'endpoint' | 'default';

export function FlowRail({
  nodes,
  onNode,
  vertical,
}: {
  nodes: { icon: IconName; label: string; caption?: string; state?: NodeState }[];
  onNode?: (i: number) => void;
  vertical?: boolean;
}) {
  return (
    <div className={`flow${vertical ? ' flow--v' : ''}`}>
      {nodes.map((nd, i) => (
        <div className="flow__cell" key={nd.label}>
          <Reveal
            i={i}
            step={0.08}
            from={vertical ? 'up' : 'right'}
            className={`flow__node flow__node--${nd.state ?? 'default'}`}
          >
            {onNode ? (
              <button type="button" className="flow__hit" onClick={() => onNode(i)} aria-label={nd.label}>
                <FlowNodeInner {...nd} />
              </button>
            ) : (
              <FlowNodeInner {...nd} />
            )}
          </Reveal>
          {i < nodes.length - 1 && (
            <span className={`flow__link${vertical ? ' flow__link--v' : ''}`} aria-hidden="true">
              <Icon name="arrow" size={16} style={vertical ? { transform: 'rotate(90deg)' } : undefined} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function FlowNodeInner({
  icon,
  label,
  caption,
  state,
}: {
  icon: IconName;
  label: string;
  caption?: string;
  state?: NodeState;
}) {
  return (
    <>
      <span className="flow__ico">
        <Icon name={icon} size={19} />
      </span>
      <span className="flow__label">{label}</span>
      {caption && <span className="flow__caption">{caption}</span>}
      {state && state !== 'default' && state !== 'endpoint' && (
        <span className={`flow__state flow__state--${state}`}>
          {state === 'active' && 'Running'}
          {state === 'queued' && 'Queued'}
          {state === 'complete' && 'Complete'}
          {state === 'review' && 'Human review'}
        </span>
      )}
    </>
  );
}

/* ---------------- Proof / case-study card ---------------- */

export function ProofCard({ children }: { children: ReactNode }) {
  return <div className="proofcard">{children}</div>;
}
