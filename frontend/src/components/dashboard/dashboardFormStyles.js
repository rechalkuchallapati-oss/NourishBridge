import { NB, FIELD_STACK, INPUT_BASE, LABEL_BASE } from "../../styles/designTokens";

export const dashboardGapClass = "gap-4";
export const dashboardStackClass = `flex flex-col ${NB.gapInner}`;
export const dashboardPageStackClass = `flex flex-col ${NB.gapSection}`;

export const dashboardInputClass = INPUT_BASE;
export const dashboardSelectClass = INPUT_BASE;

export const dashboardTextareaClass = [
  "w-full min-h-[120px] resize-none",
  INPUT_BASE.replace("h-11", "py-3"),
].join(" ");

export const dashboardAddressInputClass = dashboardTextareaClass;

export const dashboardAddressBoxClass =
  "flex min-h-[80px] items-start justify-between gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] px-5 py-4";

export const dashboardLabelClass = LABEL_BASE;

export const dashboardFieldClass = FIELD_STACK;

export const dashboardSectionClass =
  "nb-card rounded-[16px] border border-[#E8ECF0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_8px_28px_rgba(34,197,94,0.08)] sm:p-7";

export const dashboardBoxClass =
  "rounded-[16px] border border-[#E8ECF0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)]";

export const dashboardAlertSuccessClass =
  "rounded-[12px] border border-[#DCFCE7] bg-[#F0FDF4] px-4 py-3 text-sm text-[#15803D]";

export const dashboardAlertErrorClass =
  "rounded-[12px] border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600";

export const dashboardButtonClass = "";

export const dashboardBadgeClass =
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold";
