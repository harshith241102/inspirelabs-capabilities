import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './icons';
import { Reveal } from './Reveal';
import { MockTag } from './ui';

/* ============================================================
   DECK ARCHETYPE PRIMITIVES
   Premium 1920x1080 building blocks. All sizing is fixed px,
   authored for the logical canvas. See refactor/DESIGN_LANGUAGE.md.
   ============================================================ */

/* ---------- Safe-zone scaffold: header / fill / cta ---------- */
export function DeckStage({
  header,
  cta,
  children,
  gap = 28,
}: {
  header?: ReactNode;
  cta?: ReactNode;
  children: ReactNode;
  gap?: number;
}) {
  return (
    <div className="dk-stage" style={{ gap }}>
      {header && <div className="dk-stage__head">{header}</div>}
      <div className="dk-stage__fill">{children}</div>
      {cta && <div className="dk-stage__cta">{cta}</div>}
    </div>
  );
}

/* ---------- Product logo chip (on a surface frame) ---------- */
export function ProductLogo({ src, alt, height = 26 }: { src: string; alt: string; height?: number }) {
  return (
    <span className="dk-plogo">
      <img src={src} alt={alt} style={{ height }} />
    </span>
  );
}

/* ---------- Numbered hotspot pin ---------- */
export function HotspotPin({
  n,
  label,
  x,
  y,
  side = 'right',
}: {
  n: number | string;
  label?: ReactNode;
  x: number;
  y: number;
  side?: 'left' | 'right';
}) {
  return (
    <div className={`dk-pin dk-pin--${side}`} style={{ left: `${x}%`, top: `${y}%` }}>
      <span className="dk-pin__dot">{n}</span>
      {label && <span className="dk-pin__label">{label}</span>}
    </div>
  );
}

/* ---------- Annotated screenshot hero (proof-split) ---------- */
export interface Pin {
  n: number | string;
  label?: ReactNode;
  x: number;
  y: number;
  side?: 'left' | 'right';
}
export function AnnotatedShot({
  src,
  alt,
  url,
  logo,
  pins = [],
  objectPosition,
  tag,
  style,
  imgStyle,
}: {
  src: string;
  alt: string;
  url?: string;
  logo?: { src: string; alt: string };
  pins?: Pin[];
  objectPosition?: string;
  tag?: ReactNode;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
}) {
  return (
    <div className="dk-annot" style={style}>
      <div className="dk-annot__frame">
        <div className="dk-annot__bar">
          <i />
          <i />
          <i />
          {url && <span className="dk-annot__url">{url}</span>}
          {logo && (
            <span className="dk-annot__logo">
              <img src={logo.src} alt={logo.alt} />
            </span>
          )}
        </div>
        <div className="dk-annot__view">
          <img src={src} alt={alt} loading="lazy" style={{ objectPosition, ...imgStyle }} />
          {pins.map((p, i) => (
            <HotspotPin key={i} {...p} />
          ))}
          {tag && <div className="dk-annot__tag">{tag}</div>}
        </div>
      </div>
    </div>
  );
}

/* ---------- Operating board: lanes / columns ---------- */
export function DeckBoard({
  children,
  cols,
  gap = 20,
  style,
}: {
  children: ReactNode;
  cols?: number;
  gap?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className="dk-board"
      style={{ gridTemplateColumns: cols ? `repeat(${cols}, 1fr)` : undefined, gap, ...style }}
    >
      {children}
    </div>
  );
}

export function BoardLane({
  title,
  icon,
  accent,
  kicker,
  children,
  footer,
  i = 0,
}: {
  title: ReactNode;
  icon?: IconName;
  accent?: boolean;
  kicker?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  i?: number;
}) {
  return (
    <Reveal i={i} from="up" distance={14} className={`dk-lane${accent ? ' dk-lane--accent' : ''}`}>
      <div className="dk-lane__head">
        {icon && (
          <span className={`dk-lane__ico${accent ? ' is-accent' : ''}`}>
            <Icon name={icon} size={22} />
          </span>
        )}
        <div>
          {kicker && <span className="dk-lane__kicker">{kicker}</span>}
          <div className="dk-lane__title">{title}</div>
        </div>
      </div>
      {children && <div className="dk-lane__body">{children}</div>}
      {footer && <div className="dk-lane__foot">{footer}</div>}
    </Reveal>
  );
}

/* ---------- Thin flow status strip (NOT a hero) ---------- */
export type FlowState = 'active' | 'queued' | 'complete' | 'review' | 'endpoint' | 'neutral';
export function FlowStrip({
  steps,
  style,
}: {
  steps: { label: ReactNode; state?: FlowState; sub?: ReactNode }[];
  style?: CSSProperties;
}) {
  return (
    <div className="dk-flow" style={style}>
      {steps.map((s, i) => (
        <div key={i} className={`dk-flow__step is-${s.state ?? 'neutral'}`}>
          <span className="dk-flow__dot" />
          <div className="dk-flow__txt">
            <span className="dk-flow__label">{s.label}</span>
            {s.sub && <span className="dk-flow__sub">{s.sub}</span>}
          </div>
          {i < steps.length - 1 && <span className="dk-flow__link" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

/* ---------- Labelled decision dashboard mock ---------- */
export function DashboardMock({
  title,
  sub,
  tag = 'Illustrative mockup',
  children,
  accent,
  style,
}: {
  title: ReactNode;
  sub?: ReactNode;
  tag?: ReactNode;
  children: ReactNode;
  accent?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="dk-dash" style={style}>
      <div className="dk-dash__bar">
        <span className="dk-dash__dot" />
        <div className="dk-dash__titles">
          <span className="dk-dash__title">{title}</span>
          {sub && <span className="dk-dash__sub">{sub}</span>}
        </div>
        {accent}
        <span className="dk-dash__tag">
          <MockTag>{tag}</MockTag>
        </span>
      </div>
      <div className="dk-dash__body">{children}</div>
    </div>
  );
}

export function KpiTile({
  label,
  value,
  status,
  accent,
}: {
  label: ReactNode;
  value?: ReactNode;
  status?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`dk-kpi${accent ? ' is-accent' : ''}`}>
      <span className="dk-kpi__label">{label}</span>
      <span className="dk-kpi__value">{value ?? 'Pending'}</span>
      {status && <span className="dk-kpi__status">{status}</span>}
    </div>
  );
}

export function BarChart({
  values,
  accentIndex = -1,
  height = 150,
}: {
  values: number[];
  accentIndex?: number;
  height?: number;
}) {
  const max = Math.max(...values, 1);
  return (
    <div className="dk-bars" style={{ height }}>
      {values.map((v, i) => (
        <span
          key={i}
          className={`dk-bars__bar${i === accentIndex ? ' is-accent' : ''}`}
          style={{ height: `${Math.round((v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

export function ReportRow({
  label,
  note,
  status,
}: {
  label: ReactNode;
  note?: ReactNode;
  status?: ReactNode;
}) {
  return (
    <div className="dk-report">
      <div className="dk-report__main">
        <span className="dk-report__label">{label}</span>
        {note && <span className="dk-report__note">{note}</span>}
      </div>
      {status && <span className="dk-report__status">{status}</span>}
    </div>
  );
}

/* ---------- Phone / shot storyboard row ---------- */
export function Storyboard({
  items,
  style,
}: {
  items: { src: string; alt: string; caption?: ReactNode; tag?: ReactNode; phone?: boolean; width?: number }[];
  style?: CSSProperties;
}) {
  return (
    <div className="dk-story" style={style}>
      {items.map((it, i) => (
        <Reveal key={i} i={i} from="up" distance={16} className="dk-story__item">
          <div className={it.phone ? 'phone dk-story__phone' : 'dk-story__shot'} style={it.width ? { width: it.width } : undefined}>
            <img src={it.src} alt={it.alt} loading="lazy" />
            {it.tag && <div className="dk-story__tag">{it.tag}</div>}
          </div>
          {it.caption && <span className="dk-story__cap">{it.caption}</span>}
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Compliance / guardrail strip ---------- */
export function GuardrailStrip({
  items,
  label = 'Built-in guardrails',
  tone = 'light',
}: {
  items: string[];
  label?: ReactNode;
  tone?: 'light' | 'dark';
}) {
  return (
    <div className={`dk-guard dk-guard--${tone}`}>
      <span className="dk-guard__head">
        <Icon name="shield" size={17} />
        {label}
      </span>
      <div className="dk-guard__items">
        {items.map((it, i) => (
          <span key={i} className="dk-guard__item">
            <Icon name="check" size={13} />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Stat block (proof number, honest) ---------- */
export function StatBlock({
  value,
  label,
  status,
  accent,
}: {
  value: ReactNode;
  label: ReactNode;
  status?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`dk-stat${accent ? ' is-accent' : ''}`}>
      <span className="dk-stat__value">{value}</span>
      <span className="dk-stat__label">{label}</span>
      {status && <span className="dk-stat__status">{status}</span>}
    </div>
  );
}
