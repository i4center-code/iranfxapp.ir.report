type IconProps = { className?: string };

/* ---------- brand ---------- */
export function LogoMark({ className = "h-9 w-9" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 3.5 41 12v15c0 9.5-7 15.6-17 17.5C14 42.6 7 36.5 7 27V12L24 3.5Z"
        fill="#1c896c"
        fillOpacity="0.18"
        stroke="#3ecf9a"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M15 28v-6" stroke="#3ecf9a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 33V15" stroke="#e6b45a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M33 28v-9" stroke="#3ecf9a" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="12.6" y="20" width="4.8" height="6" rx="1.2" fill="#3ecf9a" />
      <rect x="21.6" y="19" width="4.8" height="8" rx="1.2" fill="#e6b45a" />
      <rect x="30.6" y="17" width="4.8" height="7" rx="1.2" fill="#3ecf9a" />
    </svg>
  );
}

/* ---------- UI icons (hand-drawn strokes) ---------- */
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconDownload = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12 3.5v10.5m0 0 4-4m-4 4-4-4" />
    <path d="M4.5 15.5v2.6a2.4 2.4 0 0 0 2.4 2.4h10.2a2.4 2.4 0 0 0 2.4-2.4v-2.6" />
  </svg>
);

export const IconCheck = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.2} aria-hidden>
    <path d="m5 12.8 4.2 4.2L19 7" />
  </svg>
);

export const IconArrowLeft = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2} aria-hidden>
    <path d="M19 12H5m0 0 5.5-5.5M5 12l5.5 5.5" />
  </svg>
);

export const IconChevronRight = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.2} aria-hidden>
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </svg>
);

export const IconChevronLeft = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.2} aria-hidden>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </svg>
);

export const IconUp = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.4} aria-hidden>
    <path d="m5 15 7-7 7 7" />
  </svg>
);

export const IconDown = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.4} aria-hidden>
    <path d="m5 9 7 7 7-7" />
  </svg>
);

export const IconPlay = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M9 6.8v10.4c0 .9 1 1.5 1.8 1L19 13c.8-.5.8-1.6 0-2.1L10.8 5.8c-.8-.5-1.8.1-1.8 1Z" fill="currentColor" />
  </svg>
);

export const IconClock = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.5V12l3 2.2" />
  </svg>
);

export const IconBook = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M4.5 5.8A2.3 2.3 0 0 1 6.8 3.5H19.5v14.7H6.9a2.4 2.4 0 0 0-2.4 2.3V5.8Z" />
    <path d="M4.5 18.2a2.3 2.3 0 0 1 2.3-2.3h12.7" />
  </svg>
);

export const IconStar = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8L12 3.6Z"
      fill="currentColor"
    />
  </svg>
);

export const IconBolt = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M13 3 5.5 13.5H11L10 21l7.5-10.5H13L13 3Z" />
  </svg>
);

export const IconWallet = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <rect x="3.5" y="6" width="17" height="13" rx="2.5" />
    <path d="M3.5 9.5h17M16 14.5h1.8" />
  </svg>
);

export const IconGauge = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M4.5 16.5a8.2 8.2 0 1 1 15 0" />
    <path d="m12 14.5 3.8-4.6" />
    <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconHeadset = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M4.5 13.5v-2a7.5 7.5 0 0 1 15 0v2" />
    <rect x="3.5" y="13" width="4" height="6" rx="1.6" />
    <rect x="16.5" y="13" width="4" height="6" rx="1.6" />
    <path d="M18.5 19v.6a2.4 2.4 0 0 1-2.4 2.4H13" />
  </svg>
);

export const IconShield = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12 3.2 19 6.5v5.4c0 4.6-3.2 7.5-7 9.1-3.8-1.6-7-4.5-7-9.1V6.5L12 3.2Z" />
    <path d="m8.8 11.8 2.2 2.2 4.2-4.5" />
  </svg>
);

export const IconSignal = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.2} aria-hidden>
    <path d="M5 19v-4M10.5 19v-8M16 19V7M21.5 19V3.5" />
  </svg>
);

export const IconUsers = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
    <path d="M15.5 5.7a3.2 3.2 0 1 1 1 6.2M17.4 14.7c1.9.6 2.9 2.2 3.2 4.4" />
  </svg>
);

export const IconTelegram = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="m20.5 4.5-17 7.2 5 1.8 1.8 5.6 3-3.8 4.7 3.4 2.5-14.2Z" />
    <path d="m8.5 13.5 8-6.6-6 7.6" />
  </svg>
);

export const IconInstagram = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconMail = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 8 7.5 5.4L19.5 8" />
  </svg>
);

export const IconAndroid = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M5 16.5a7 7 0 0 1 14 0v1H5v-1Z" />
    <path d="m6.5 6.5 1.6 2.4M17.5 6.5l-1.6 2.4" />
    <circle cx="9.2" cy="13.4" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14.8" cy="13.4" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconWindows = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M4 5.6 10.8 4.6v6.6H4V5.6ZM12 4.4 20 3.2v8H12V4.4ZM4 12.8h6.8v6.6L4 18.4v-5.6ZM12 12.8h8v8l-8-1.2v-6.8Z" fill="currentColor" />
  </svg>
);

export const IconApple = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12.6 7.2c1.3-1.6 3.4-1.5 3.4-1.5s.3 1.9-1 3.4c-1.4 1.6-3.2 1.3-3.2 1.3s-.4-1.7.8-3.2Z" />
    <path d="M9 20.5c-1.8 0-3.5-2.3-3.5-5.4 0-2.6 1.6-4.4 3.5-4.4 1.2 0 2 .6 3 .6s1.9-.7 3.2-.6c1.9.1 3.3 1.2 3.3 1.2s-2.2 1.3-2.2 3.4c0 2.4 2.5 3.2 2.5 3.2s-1.5 2-3.2 2c-1 0-1.6-.6-2.9-.6s-2 .6-2.8.6c-.4 0-.7 0-.9 0Z" />
  </svg>
);

/* ---------- platform marks ---------- */
export const GoldBars = ({ className = "h-10 w-10" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
    <path d="M14 17h12l3 8H11l3-8Z" fill="#e6b45a" fillOpacity="0.9" />
    <path d="M27 17h12l3 8H24l3-8Z" fill="#e6b45a" fillOpacity="0.65" />
    <path d="M20 28h12l3 8H17l3-8Z" fill="#e6b45a" />
    <path d="M14 17h12l3 8H11l3-8Zm13 0h12l3 8H24l3-8Zm-7 11h12l3 8H17l3-8Z" stroke="#8a6420" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M18 20.5h5M31 20.5h5M24.5 31.5h5" stroke="#8a6420" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const CoinMark = ({ className = "h-10 w-10" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
    <circle cx="24" cy="24" r="16.5" fill="#ef9656" fillOpacity="0.18" stroke="#ef9656" strokeWidth="2.4" />
    <circle cx="24" cy="24" r="11.5" stroke="#ef9656" strokeWidth="1.4" strokeDasharray="3.5 4" />
    <path d="M20.5 17.5h5.2a3.2 3.2 0 1 1 0 6.4h-5.2m0-6.4V30m0-12.5-2 .01M20.5 24h5.8a3.3 3.3 0 1 1 0 6.5h-5.8m0-6.5V30.5m0 0-2 .01M22 15v2.5M22 30.5V33" stroke="#ef9656" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DeltaMark = ({ className = "h-10 w-10" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
    <path d="M24 8.5 40.5 37h-33L24 8.5Z" fill="#5cb8de" fillOpacity="0.16" stroke="#5cb8de" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M17.5 30.5 23 24l4 3.5 5-7.5" stroke="#5cb8de" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30.5 20h2v2" stroke="#5cb8de" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- robot avatars ---------- */
export const RobotOrobat = ({ className = "h-16 w-16" }: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
    <path d="M32 8v6" stroke="#3ecf9a" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="32" cy="6.5" r="3.2" fill="#3ecf9a" />
    <rect x="13" y="15" width="38" height="30" rx="10" fill="#1c896c" fillOpacity="0.22" stroke="#3ecf9a" strokeWidth="2.6" />
    <rect x="6" y="24" width="5" height="12" rx="2.5" fill="#3ecf9a" fillOpacity="0.55" />
    <rect x="53" y="24" width="5" height="12" rx="2.5" fill="#3ecf9a" fillOpacity="0.55" />
    <circle cx="24" cy="29" r="4.4" fill="#3ecf9a" />
    <circle cx="40" cy="29" r="4.4" fill="#3ecf9a" />
    <circle cx="25.4" cy="27.6" r="1.4" fill="#0b0c19" />
    <circle cx="41.4" cy="27.6" r="1.4" fill="#0b0c19" />
    <path d="M25 37.5h14" stroke="#3ecf9a" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="2.5 4" />
    <path d="M24 45h16v8a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4v-8Z" fill="#1c896c" fillOpacity="0.3" stroke="#3ecf9a" strokeWidth="2.2" />
  </svg>
);

export const RobotMicrobot = ({ className = "h-16 w-16" }: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
    <path d="M20 14v-5M32 14V7M44 14V9M20 50v5M32 50v7M44 50v5M14 22H8M14 32H6M14 42H8M50 22h6M50 32h8M50 42h6" stroke="#e6b45a" strokeWidth="2.2" strokeLinecap="round" />
    <rect x="14" y="14" width="36" height="36" rx="8" fill="#e6b45a" fillOpacity="0.14" stroke="#e6b45a" strokeWidth="2.6" />
    <rect x="22" y="24" width="20" height="8" rx="4" fill="#e6b45a" />
    <circle cx="38" cy="28" r="1.6" fill="#0b0c19" />
    <path d="M24 40h16M24 44.5h10" stroke="#e6b45a" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const RobotYuz = ({ className = "h-16 w-16" }: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
    <path d="M15 22 10 8l12 8h20l12-8-5 14" stroke="#5cb8de" strokeWidth="2.6" strokeLinejoin="round" fill="#5cb8de" fillOpacity="0.14" />
    <path d="M15 22h34v16c0 10-7.6 16-17 16s-17-6-17-16V22Z" fill="#5cb8de" fillOpacity="0.14" stroke="#5cb8de" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M20 30.5 27 27l1.5 5.5L20 30.5Zm24 0L37 27l-1.5 5.5L44 30.5Z" fill="#5cb8de" />
    <path d="M28 44c1.4 1.6 6.6 1.6 8 0" stroke="#5cb8de" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="21" cy="40" r="1.5" fill="#5cb8de" />
    <circle cx="43" cy="40" r="1.5" fill="#5cb8de" />
    <circle cx="25" cy="20.5" r="1.5" fill="#5cb8de" />
    <circle cx="39" cy="20.5" r="1.5" fill="#5cb8de" />
    <path d="M32 54v4" stroke="#5cb8de" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/* ---------- trust point icon lookup ---------- */
export function TrustIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "wallet":
      return <IconWallet className={className} />;
    case "gauge":
      return <IconGauge className={className} />;
    case "headset":
      return <IconHeadset className={className} />;
    default:
      return <IconShield className={className} />;
  }
}

/* ---------- shop / cart icons ---------- */
export const IconCart = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M4.5 6.5h2l1.6 9.2a1.8 1.8 0 0 0 1.8 1.5h7.6a1.8 1.8 0 0 0 1.8-1.5L20.5 10H7" />
    <circle cx="10.2" cy="20.2" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="17" cy="20.2" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const IconClose = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.2} aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconTrash = ({ className = "h-4.5 w-4.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M5 7h14M10 7V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V7m-8 0 .8 11.2a2 2 0 0 0 2 1.8h6.4a2 2 0 0 0 2-1.8L18 7" />
    <path d="M10.2 11v5M13.8 11v5" />
  </svg>
);

export const IconUser = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="12" cy="8.2" r="3.6" />
    <path d="M5 20c.8-3.8 3.4-6 7-6s6.2 2.2 7 6" />
  </svg>
);
