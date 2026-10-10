import type { ReactNode } from "react";

// One icon family for the whole app: 28px box, 2px round strokes, colour from currentColor.
// Resting = brand dark grey (var(--muted)), selected = brand black (var(--ink)); the owner sets `color`.
type P = { size?: number; filled?: boolean; fill?: string; className?: string };
const Svg = ({ size = 28, w = 28, h = 28, className, children }: { size?: number; w?: number; h?: number; className?: string; children: ReactNode }) => (
  <svg aria-hidden="true" className={`ic ${className ?? ""}`} fill="none" height={size * (h / w)} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox={`0 0 ${w} ${h}`} width={size}>
    {children}
  </svg>
);

export const HeartIcon = ({ size, filled, fill = "#ff5a5f", className }: P) => (
  <Svg className={className} h={25} size={size}>
    <path d="M7.5 1C3.9 1 1 3.9 1 7.4c0 2.8 1.1 9.6 12.3 16.4.2.1.5.2.7.2s.5-.1.7-.2C25.9 17 27 10.2 27 7.4 27 3.9 24.1 1 20.5 1 16.9 1 14 4.9 14 4.9S11.1 1 7.5 1Z" fill={filled ? fill : "none"} />
  </Svg>
);
export const BellIcon = ({ size, filled, fill = "#fec12d", className }: P) => (
  <Svg className={className} h={26} size={size}>
    <path d="M14 2C10.1 2 7 5.1 7 9v5.3l-2.4 4.4a1 1 0 0 0 .9 1.5h17a1 1 0 0 0 .9-1.5L21 14.3V9c0-3.9-3.1-7-7-7Z" fill={filled ? fill : "none"} />
    <path d="M11 23a3.2 3.2 0 0 0 6 0" />
  </Svg>
);
export const UserIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><circle cx="14" cy="9" r="5" /><path d="M4 25v-1c0-3.9 4.5-6.5 10-6.5s10 2.6 10 6.5v1Z" /></Svg>
);
export const HistoryIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M4.5 14a9.5 9.5 0 1 0 3-6.9" /><path d="M4 4v5h5" /><path d="M14 8.5V14l3.8 2.4" /></Svg>
);
export const OrdersIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M6 3h16v22H6Z" /><path d="M10 9h8M10 14h8M10 19h5" /></Svg>
);
export const ChartIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M5 24V14M12 24V5M19 24V17M26 24H3" /></Svg>
);
export const PayoutIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><rect height="14" rx="2.5" width="24" x="2" y="7" /><circle cx="14" cy="14" r="3.5" /><path d="M6 11v6M22 11v6" /></Svg>
);
export const StoreIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="m4 10 2-6h16l2 6c0 1.7-1.3 3-3 3s-3-1.3-3-3c0 1.7-1.3 3-3 3s-3-1.3-3-3c0 1.7-1.3 3-3 3s-3-1.3-3-3Z" /><path d="M6 13v11h16V13M11 24v-6h6v6" /></Svg>
);
export const BagIcon = ({ size, className }: P) => (
  <Svg className={className} h={26} size={size}><path d="M4.2 8.5h19.6l1.6 13.4a2 2 0 0 1-2 2.3H4.6a2 2 0 0 1-2-2.3L4.2 8.5Z" /><path d="M9.5 12V6.5a4.5 4.5 0 0 1 9 0V12" /></Svg>
);
export const AddressIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M14 26s9-7.2 9-14a9 9 0 0 0-18 0c0 6.8 9 14 9 14Z" /><circle cx="14" cy="12" r="3.2" /></Svg>
);
export const BankIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M3 11 14 4l11 7ZM6 11v10M11 11v10M17 11v10M22 11v10M3 24h22" /></Svg>
);
export const ChatIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M14 3C7.9 3 3 7.4 3 12.8c0 3 1.5 5.7 4 7.5L6 25l5-2.5c1 .3 2 .4 3 .4 6.1 0 11-4.4 11-9.9S20.1 3 14 3Z" /><circle cx="9" cy="13" fill="currentColor" r="1.2" stroke="none" /><circle cx="14" cy="13" fill="currentColor" r="1.2" stroke="none" /><circle cx="19" cy="13" fill="currentColor" r="1.2" stroke="none" /></Svg>
);
export const ReturnIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M5 12h14a5 5 0 0 1 0 10h-6" /><path d="m10 6-6 6 6 6" /></Svg>
);
export const SupportIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M5 17v-4a9 9 0 0 1 18 0v4" /><rect height="8" rx="2" width="5" x="3" y="16" /><rect height="8" rx="2" width="5" x="20" y="16" /><path d="M23 24c0 2-3 3-7 3" /></Svg>
);
export const GearIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><circle cx="14" cy="14" r="4" /><path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.2 6.2l2.1 2.1M19.7 19.7l2.1 2.1M6.2 21.8l2.1-2.1M19.7 8.3l2.1-2.1" /></Svg>
);
export const SunIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><circle cx="14" cy="14" r="5" /><path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.2 6.2l2.1 2.1M19.7 19.7l2.1 2.1M6.2 21.8l2.1-2.1M19.7 8.3l2.1-2.1" /></Svg>
);
export const MoonIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M22.5 17.5A10 10 0 0 1 10.5 5.5 10 10 0 1 0 22.5 17.5Z" /></Svg>
);
export const PenIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="m4 24 1.2-5.2L19.5 4.5a2.1 2.1 0 0 1 3 0l1 1a2.1 2.1 0 0 1 0 3L9.2 22.8Z" /><path d="m17 7 4 4" /></Svg>
);
export const ArrowLeftIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M25 14H4M12 6 4 14l8 8" /></Svg>
);

// The "verified" seal (payment confirmed, payout verified): brand blue with a white tick.
export function VerifiedSeal({ size = 96 }: { size?: number }) {
  const pts = Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2; const r = i % 2 ? 40 : 47; return `${(50 + r * Math.sin(a)).toFixed(1)},${(50 - r * Math.cos(a)).toFixed(1)}`; }).join(" ");
  return (
    <svg aria-hidden="true" className="seal" height={size} viewBox="0 0 100 100" width={size}>
      <polygon fill="#0057e7" points={pts} stroke="#0057e7" strokeLinejoin="round" strokeWidth="6" />
      <path d="m30 51 14 14 27-29" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
    </svg>
  );
}

export const CheckIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="m5 15 6.5 6.5L23 7" strokeWidth="3" /></Svg>
);

export const MailIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><rect height="18" rx="3" width="24" x="2" y="5" /><path d="m3 8 11 8 11-8" /></Svg>
);
export const PhoneIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M7 3h4l2 6-3 2a14 14 0 0 0 7 7l2-3 6 2v4a3 3 0 0 1-3 3C12 24 4 16 4 6a3 3 0 0 1 3-3Z" /></Svg>
);

export const ShareIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><circle cx="21" cy="6" r="3" /><circle cx="7" cy="14" r="3" /><circle cx="21" cy="22" r="3" /><path d="m9.7 12.6 8.6-5M9.7 15.4l8.6 5" /></Svg>
);
export const CartIcon = ({ size, className }: P) => (
  <Svg className={className} size={size}><path d="M2 4h4l3 14h13l3-10H7" /><circle cx="11" cy="23" r="1.6" /><circle cx="20" cy="23" r="1.6" /></Svg>
);
