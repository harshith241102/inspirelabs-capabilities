import type { SVGProps } from 'react';

/* Monochrome stroke icons (currentColor). Brand-neutral: no third-party
   coloured logos, per the asset rules. */

const paths: Record<string, JSX.Element> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  check: <path d="M4 12l5 5L20 6" />,
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5l1.4 2.1L15.5 12l-2.1 1.4L12 15.5l-1.4-2.1L8.5 12l2.1-1.4z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-3.8-3.8" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 12.5V5a1.5 1.5 0 0 1 1.5-1.5h7.5L20 11l-7 7z" />
      <circle cx="8" cy="8" r="1.4" />
    </>
  ),
  coupon: (
    <>
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
      <path d="M14 6v12" strokeDasharray="2 2" />
    </>
  ),
  store: (
    <>
      <path d="M4 9l1-4h14l1 4M4 9h16M4 9v10h16V9" />
      <path d="M9 19v-5h6v5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6M20.5 19a5.5 5.5 0 0 0-3.5-5.1" />
    </>
  ),
  community: (
    <>
      <circle cx="12" cy="7" r="2.5" />
      <circle cx="5.5" cy="15" r="2.2" />
      <circle cx="18.5" cy="15" r="2.2" />
      <path d="M12 9.5v3M10 13l-3 1.2M14 13l3 1.2" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="17" cy="6" r="2.4" />
      <circle cx="17" cy="18" r="2.4" />
      <path d="M8.1 11l6.8-3.8M8.1 13l6.8 3.8" />
    </>
  ),
  creator: (
    <>
      <rect x="4" y="3.5" width="11" height="17" rx="2" />
      <path d="M7.5 7h4M7.5 10h4" />
      <circle cx="18" cy="15" r="3" />
    </>
  ),
  partners: (
    <>
      <path d="M8 12l2.5 2.5a2 2 0 0 0 2.8 0L20 8" />
      <path d="M4 8l3-3 3 3M14 16l3 3" />
      <rect x="3" y="11" width="5" height="7" rx="1" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 15l3-4 3 3 4-6" />
    </>
  ),
  signal: (
    <>
      <path d="M5 20v-5M10 20v-9M15 20v-13M20 20V4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  send: <path d="M21 4L3 11l7 2 2 7z" />,
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  bolt: <path d="M13 3L5 13h5l-1 8 8-11h-5z" />,
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4l9 4V6zM13 7a5 5 0 0 1 0 10" />
      <path d="M6 14v3a2 2 0 0 0 2 2" />
    </>
  ),
  cycle: (
    <>
      <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.5 5.8L4 16" />
      <path d="M4 20v-4h4" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0z" />
      <path d="M14 3v4h4M8 12h8M8 16h6" />
    </>
  ),
  flask: (
    <>
      <path d="M10 3v6l-5 8a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-8V3" />
      <path d="M9 3h6M8 15h8" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  cursor: <path d="M5 3l14 7-6 2-2 6z" />,
  refresh: (
    <>
      <path d="M20 7a8 8 0 1 0 1.5 5" />
      <path d="M20 3v4h-4" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M12 7.2v4M10.5 12.5L6.5 16M13.5 12.5l4 3.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5" />
      <path d="M14 4c4 0 6 2 6 6-1.5 4-5 6.5-8 8l-4-4c1.5-3 4-6.5 6-10z" />
      <circle cx="14.5" cy="9.5" r="1.6" />
    </>
  ),
  play: <path d="M7 4l13 8-13 8z" />,
  flag: (
    <>
      <path d="M6 21V4M6 4h11l-2 3 2 3H6" />
    </>
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof paths;
  size?: number;
}

export function Icon({ name, size = 22, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

export type IconName = keyof typeof paths;
