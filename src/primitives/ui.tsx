import type { ReactNode } from 'react';
import { useApp } from '../state/store';
import { Icon, type IconName } from './icons';
import { Reveal } from './Reveal';

/* ---------------- Header chrome ---------------- */

export function DeckHeader({
  eyebrow,
  title,
  sub,
  titleWide,
  align = 'left',
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  titleWide?: boolean;
  align?: 'left' | 'center';
}) {
  return (
    <header className="s-header" style={align === 'center' ? { textAlign: 'center' } : undefined}>
      <Reveal from="up" distance={12}>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal i={1}>
        <h1
          className={`s-title${titleWide ? ' s-title--wide' : ''}`}
          style={align === 'center' ? { marginInline: 'auto' } : undefined}
        >
          {title}
        </h1>
      </Reveal>
      {sub && (
        <Reveal i={2}>
          <p className="s-sub" style={align === 'center' ? { marginInline: 'auto' } : undefined}>
            {sub}
          </p>
        </Reveal>
      )}
      <Reveal i={3}>
        <div className="s-rule" style={align === 'center' ? { marginInline: 'auto' } : undefined} />
      </Reveal>
    </header>
  );
}

/* ---------------- CTAs ---------------- */

export function AdvanceCta({
  label,
  to,
  onClick,
}: {
  label: string;
  to?: number;
  onClick?: () => void;
}) {
  const { next, goTo } = useApp();
  return (
    <button
      type="button"
      className="btn btn--primary"
      onClick={() => {
        onClick?.();
        if (typeof to === 'number') goTo(to);
        else next();
      }}
    >
      {label}
      <Icon name="arrow" size={18} className="btn__arrow" />
    </button>
  );
}

export function GhostBtn({
  label,
  to,
  onClick,
  icon,
}: {
  label: string;
  to?: number;
  onClick?: () => void;
  icon?: IconName;
}) {
  const { goTo, prev } = useApp();
  return (
    <button
      type="button"
      className="btn btn--ghost"
      onClick={() => {
        onClick?.();
        if (typeof to === 'number') goTo(to);
        else prev();
      }}
    >
      {icon && <Icon name={icon} size={17} />}
      {label}
    </button>
  );
}

/* ---------------- Net / takeaway box ---------------- */

export function NetBox({ children }: { children: ReactNode }) {
  return (
    <div className="s-net">
      <p className="s-net__text">{children}</p>
    </div>
  );
}

/* ---------------- Evidence status tag ---------------- */

export type EvidenceStatus = 'approved' | 'pending' | 'potential' | 'unavailable';
const evidenceLabel: Record<EvidenceStatus, string> = {
  approved: 'Approved',
  pending: 'Pending validation',
  potential: 'Potential, not guaranteed',
  unavailable: 'Proof pending',
};

export function EvidenceTag({
  status,
  children,
}: {
  status: EvidenceStatus;
  children?: ReactNode;
}) {
  return <span className={`ev ev--${status}`}>{children ?? evidenceLabel[status]}</span>;
}

/* ---------------- Chips ---------------- */

export function Chip({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return <span className={`chip${accent ? ' chip--accent' : ''}`}>{children}</span>;
}

/* ---------------- Icon tile ---------------- */

export function IcoTile({ name, accent }: { name: IconName; accent?: boolean }) {
  return (
    <span className={`icotile${accent ? ' icotile--accent' : ''}`}>
      <Icon name={name} size={21} />
    </span>
  );
}

/* ---------------- Callout ---------------- */

export function Callout({
  n,
  title,
  body,
  accent,
}: {
  n: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`callout${accent ? ' callout--accent' : ''}`}>
      <span className="callout__n">{n}</span>
      <div>
        <div className="callout__t">{title}</div>
        {body && <div className="callout__b">{body}</div>}
      </div>
    </div>
  );
}

/* ---------------- Metric field (NO invented numbers) ---------------- */

export function MetricField({
  label,
  status = 'pending',
}: {
  label: string;
  status?: EvidenceStatus;
}) {
  const valueText: Record<EvidenceStatus, string> = {
    approved: 'Available',
    pending: 'Pending validation',
    potential: 'Potential',
    unavailable: 'Proof pending',
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: '12px 14px',
        background: '#fff',
        border: '1px solid var(--card-bd)',
        borderRadius: 10,
        boxShadow: 'var(--float-sm)',
      }}
    >
      <span
        className="mono"
        style={{ fontSize: 10.5, color: 'var(--grey)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
      >
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 15, color: 'var(--muted-text)' }}>
        {valueText[status]}
      </span>
    </div>
  );
}

/* ---------------- Mock / placeholder label ---------------- */

export function MockTag({
  children = 'Illustrative mockup',
  tone = 'light',
}: {
  children?: ReactNode;
  tone?: 'light' | 'dark';
}) {
  return (
    <span
      className="mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 9.5,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '5px 9px',
        borderRadius: 6,
        color: tone === 'dark' ? '#fff' : 'var(--orange-text)',
        background: tone === 'dark' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.92)',
        border: '1px solid',
        borderColor: tone === 'dark' ? 'rgba(255,255,255,0.25)' : 'var(--orange)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {children}
    </span>
  );
}

/* ---------------- Screenshot frame ---------------- */

export function Shot({
  src,
  alt,
  url,
  children,
  style,
  objectPosition,
}: {
  src?: string;
  alt: string;
  url?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  objectPosition?: string;
}) {
  return (
    <div className="shot" style={style}>
      <div className="shot__bar">
        <i />
        <i />
        <i />
        {url && <span className="shot__url">{url}</span>}
      </div>
      {src ? (
        <img
          className="shot__img"
          src={src}
          alt={alt}
          loading="lazy"
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : (
        <div className="grow" style={{ position: 'relative' }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ---------------- Phone frame ---------------- */

export function Phone({
  src,
  alt,
  width = 230,
  style,
}: {
  src: string;
  alt: string;
  width?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div className="phone" style={{ width, ...style }}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

/* ---------------- Asset image (with required alt + lazy) ---------------- */

export function AssetImg({
  src,
  alt,
  style,
  className,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return <img src={src} alt={alt} loading="lazy" className={className} style={style} />;
}
