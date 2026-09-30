import type { ReactElement, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const make = (paths: ReactElement) =>
  function Icon(props: IconProps) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
        {paths}
      </svg>
    );
  };

export const IconDiagram = make(
  <>
    <rect x="3" y="3" width="7" height="6" rx="1.5" />
    <rect x="14" y="15" width="7" height="6" rx="1.5" />
    <rect x="14" y="3" width="7" height="6" rx="1.5" />
    <path d="M10 6h4M17.5 9v6" />
  </>,
);
export const IconSidebar = make(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16" />
  </>,
);
export const IconSearch = make(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
);
export const IconPlus = make(<path d="M12 5v14M5 12h14" />);
export const IconMinus = make(<path d="M5 12h14" />);
export const IconFit = make(<path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4" />);
export const IconCode = make(<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />);
export const IconDownload = make(<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />);
export const IconUpload = make(<path d="M12 20V9m0 0-4 4m4-4 4 4M5 4h14" />);
export const IconSun = make(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>,
);
export const IconMoon = make(<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />);
export const IconX = make(<path d="M6 6l12 12M18 6 6 18" />);
export const IconEye = make(
  <>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </>,
);
export const IconEyeOff = make(<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2" />);
export const IconChevron = make(<path d="m6 9 6 6 6-6" />);
export const IconLayout = make(
  <>
    <rect x="3" y="4" width="6" height="5" rx="1" />
    <rect x="15" y="4" width="6" height="5" rx="1" />
    <rect x="9" y="15" width="6" height="5" rx="1" />
    <path d="M6 9v2.5h12V9M12 11.5V15" />
  </>,
);
export const IconRefresh = make(<path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16m0 4v-4h-4" />);
export const IconFocus = make(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
  </>,
);
export const IconCopy = make(
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </>,
);
export const IconDatabase = make(
  <>
    <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
    <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
  </>,
);
export const IconArrowRight = make(<path d="M5 12h14m-5-5 5 5-5 5" />);
