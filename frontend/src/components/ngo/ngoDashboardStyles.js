import {
  BADGE_BASE,
  BTN_DANGER,
  BTN_PRIMARY,
  BTN_SECONDARY,
  CARD_BASE,
  CHART_CARD,
  INPUT_BASE,
  LABEL_BASE,
  NB,
  PAGE_INNER,
  TABLE_BASE,
  TABLE_HEAD,
  TABLE_TD,
  TABLE_TH,
  TABLE_TR,
  TABLE_WRAP,
} from "../../styles/designTokens";

export const NGO_PAGE_STACK = PAGE_INNER;
export const NGO_GAP = NB.gapSection;
export const NGO_CARD = CARD_BASE;
export const NGO_CHART_CARD = CHART_CARD;
export const NGO_INPUT = INPUT_BASE;
export const NGO_SELECT = INPUT_BASE;
export const NGO_LABEL = LABEL_BASE;
export const NGO_BADGE = BADGE_BASE;
export const NGO_BTN_PRIMARY = BTN_PRIMARY;
export const NGO_BTN_SECONDARY = BTN_SECONDARY;
export const NGO_BTN_DANGER = BTN_DANGER;

export const NGO_SECTION =
  "nb-card rounded-[16px] border border-[#E8ECF0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_8px_28px_rgba(34,197,94,0.08)] sm:p-7";

export const NGO_TABLE_WRAP = TABLE_WRAP;
export const NGO_TABLE = TABLE_BASE;
export const NGO_TABLE_HEAD = TABLE_HEAD;
export const NGO_TH = TABLE_TH;
export const NGO_TD = TABLE_TD;
export const NGO_TR = TABLE_TR;

export const NGO_FILTER_BAR =
  "flex flex-wrap items-center gap-3 rounded-[16px] border border-[#E8ECF0] bg-white p-4 shadow-sm sm:gap-4 sm:p-5";

export const ngoInteractive = {
  card: "transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(22,163,74,0.12)]",
  button:
    "transition-all duration-200 ease-in-out hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2",
};
