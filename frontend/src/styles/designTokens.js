/**
 * NourishBridge design tokens — 8px spacing system, enterprise SaaS UI.
 * Import in *Styles.js files and shared components; do not duplicate literals.
 */

export const NB = {
  /* Brand */
  green: "#16A34A",
  greenDark: "#15803D",
  greenLight: "#22C55E",
  greenMuted: "#F0FDF4",
  greenBorder: "#BBF7D0",

  /* Neutrals */
  slate900: "#0F172A",
  slate700: "#334155",
  slate500: "#64748B",
  slate400: "#94A3B8",
  slate200: "#E5E7EB",
  slate100: "#F1F5F9",
  slate50: "#F8FAFC",
  pageBg: "#F8FAFC",

  /* Semantic */
  blue: "#2563EB",
  orange: "#D97706",
  red: "#DC2626",
  purple: "#7C3AED",

  /* Radius */
  radiusSm: "rounded-[8px]",
  radiusMd: "rounded-[12px]",
  radiusLg: "rounded-[16px]",
  radiusXl: "rounded-[18px]",
  radiusPill: "rounded-full",

  /* Shadow */
  shadowSm: "shadow-[0_2px_8px_rgba(15,23,42,0.04)]",
  shadowMd: "shadow-[0_4px_20px_rgba(15,23,42,0.06)]",
  shadowLg: "shadow-[0_12px_32px_rgba(22,163,74,0.12)]",
  shadowHover: "hover:shadow-[0_12px_32px_rgba(22,163,74,0.12)]",

  /* Motion */
  transition: "transition-all duration-300 ease-in-out",
  transitionFast: "transition-all duration-200 ease-in-out",
  hoverLift: "hover:-translate-y-1",
  hoverLiftSm: "hover:-translate-y-0.5",

  /* Spacing (8px grid) */
  gapSection: "gap-10",
  gapCard: "gap-6",
  gapInner: "gap-4",
  padPage: "p-6 sm:p-8 lg:p-10",
  padCard: "p-6 sm:p-7",
  padCell: "px-5 py-4",
};

/* ─── Cards ─── */
export const CARD_BASE = [
  NB.radiusLg,
  "border border-[#E8ECF0] bg-white",
  NB.shadowMd,
  NB.transition,
  NB.hoverLiftSm,
  "hover:border-[#BBF7D0]",
  NB.shadowHover,
].join(" ");

export const CARD_PAD = NB.padCard;

export const KPI_CARD = [CARD_BASE, "p-5"].join(" ");

export const CHART_CARD = [CARD_BASE, NB.radiusXl, "p-6"].join(" ");

/* ─── Buttons ─── */
export const BTN_BASE =
  "inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const BTN_PRIMARY = [
  BTN_BASE,
  NB.radiusMd,
  "bg-gradient-to-b from-[#22C55E] to-[#16A34A] text-white",
  NB.shadowSm,
  NB.transitionFast,
  NB.hoverLiftSm,
  "hover:from-[#16A34A] hover:to-[#15803D] hover:shadow-md active:scale-[0.98]",
].join(" ");

export const BTN_SECONDARY = [
  BTN_BASE,
  NB.radiusMd,
  "border border-[#E5E7EB] bg-white text-[#15803D]",
  NB.transitionFast,
  NB.hoverLiftSm,
  "hover:border-[#BBF7D0] hover:bg-[#F0FDF4] active:scale-[0.98]",
].join(" ");

export const BTN_DANGER = [
  BTN_BASE,
  NB.radiusMd,
  "border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  NB.transitionFast,
  "hover:bg-red-100 active:scale-[0.98]",
].join(" ");

export const BTN_SUCCESS = [
  BTN_BASE,
  NB.radiusMd,
  "border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  NB.transitionFast,
  "hover:bg-[#DCFCE7] active:scale-[0.98]",
].join(" ");

export const BTN_WARNING = [
  BTN_BASE,
  NB.radiusMd,
  "border border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  NB.transitionFast,
  "hover:bg-[#FEF3C7] active:scale-[0.98]",
].join(" ");

export const BTN_ICON = [
  "inline-flex h-10 w-10 items-center justify-center",
  NB.radiusMd,
  "border border-[#E5E7EB] bg-white text-[#64748B]",
  NB.transitionFast,
  "hover:border-[#BBF7D0] hover:bg-[#F0FDF4] hover:text-[#16A34A] active:scale-95",
].join(" ");

/* ─── Forms ─── */
export const INPUT_BASE = [
  "w-full h-11",
  NB.radiusMd,
  "border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#0F172A]",
  NB.transitionFast,
  "placeholder:text-[#94A3B8]",
  "hover:border-[#16A34A]/30",
  "focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20",
].join(" ");

export const LABEL_BASE = "block text-sm font-semibold text-[#0F172A] mb-2";

export const FIELD_STACK = "flex flex-col gap-2";

/* ─── Tables ─── */
export const TABLE_WRAP = "nb-table-wrap overflow-x-auto rounded-[16px] border border-[#E8ECF0] bg-white w-full";

export const TABLE_BASE = "nb-table w-full min-w-[1200px] border-collapse text-sm";

export const TABLE_HEAD =
  "nb-table-head border-b-2 border-[#E5E7EB] bg-[#F8FAFC] text-xs font-bold uppercase tracking-wide text-[#64748B]";

export const TABLE_TH =
  "px-6 py-5 text-center align-middle whitespace-nowrap min-w-[130px]";

export const TABLE_TD =
  "px-6 py-5 text-center align-middle text-[#334155] min-w-[130px]";

export const TABLE_TD_LEFT =
  "px-6 py-5 text-center align-middle text-[#334155] min-w-[160px]";

export const TABLE_TD_NUM =
  "px-6 py-5 text-center align-middle text-[#334155] font-medium tabular-nums min-w-[110px]";

export const TABLE_TR =
  "nb-table-row border-b border-[#E8ECF0] transition-all duration-200 last:border-0 hover:bg-[#F0FDF4]";

export const TABLE_TR_CLICK = "cursor-pointer hover:shadow-[inset_4px_0_0_#16A34A]";

/* ─── Badges ─── */
export const BADGE_BASE = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold";

export const BADGE_GREEN = `${BADGE_BASE} border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]`;
export const BADGE_BLUE = `${BADGE_BASE} border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]`;
export const BADGE_ORANGE = `${BADGE_BASE} border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]`;
export const BADGE_RED = `${BADGE_BASE} border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]`;
export const BADGE_GRAY = `${BADGE_BASE} border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]`;

/* ─── Layout ─── */
export const PAGE_INNER = `flex flex-col ${NB.gapSection} ${NB.padPage}`;

export const PAGE_BG =
  "relative overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-gradient-to-br from-[#F0FDF4]/80 via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]";

export const ANALYTICS_GRID = "grid gap-8 lg:grid-cols-2 xl:grid-cols-3";

export const ALERTS_GRID = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

export const SECTION_TITLE = "text-lg font-bold tracking-tight text-[#0F172A]";

export const DEFAULT_PAGE_SIZE_OPTIONS = [5, 8, 10];

export const TABLE_MIN_ROWS = 5;

/* Legacy aliases for adminStyles consumers */
export const ADMIN_PAGE_BG = PAGE_BG;
export const ADMIN_PAGE_INNER = PAGE_INNER;
export const ADMIN_INTERACTIVE_CARD = CARD_BASE;
export const ADMIN_FILTER_INPUT = INPUT_BASE;
export const ADMIN_PRIMARY_BTN = BTN_PRIMARY;
export const ADMIN_SECONDARY_BTN = BTN_SECONDARY;
export const ADMIN_TEXT_LINK = "text-sm font-semibold text-[#16A34A] transition-all duration-200 hover:text-[#15803D] hover:underline";
export const ADMIN_TABLE_WRAP = TABLE_WRAP;
export const ADMIN_TABLE = TABLE_BASE;
export const ADMIN_TABLE_HEAD = TABLE_HEAD;
export const ADMIN_TH = TABLE_TH;
export const ADMIN_TH_SORT =
  "inline-flex w-full items-center justify-center gap-1 rounded-[8px] px-2 py-1 transition-colors duration-200 hover:bg-[#F0FDF4] hover:text-[#16A34A]";
export const ADMIN_TD = TABLE_TD;
export const ADMIN_TD_LEFT = TABLE_TD_LEFT;
export const ADMIN_TD_NUM = TABLE_TD_NUM;
export const ADMIN_TR = TABLE_TR;
export const ADMIN_TR_SELECTED = "bg-[#F0FDF4] shadow-[inset_4px_0_0_#16A34A]";
export const ADMIN_TR_CLICKABLE = TABLE_TR_CLICK;
export const ADMIN_CHART_CARD = CHART_CARD;
export const ADMIN_KPI_CARD = KPI_CARD;
export const ADMIN_ANALYTICS_GRID = ANALYTICS_GRID;
export const ADMIN_ALERTS_GRID = ALERTS_GRID;
export const ADMIN_SECTION_TITLE = SECTION_TITLE;
export const ADMIN_TABLE_MIN_ROWS = TABLE_MIN_ROWS;
