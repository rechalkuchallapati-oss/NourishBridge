/** Shared interactive styles for volunteer dashboard controls. */
/** 0.5cm between lines/items inside a container */
export const VOLUNTEER_LINE_GAP = "mt-[0.5cm]";
export const VOLUNTEER_INSET_LINE_GAP = "mt-[0.5cm]";
export const VOLUNTEER_CONTENT_STACK = "flex flex-col gap-[0.5cm]";
export const VOLUNTEER_GRID_GAP = "gap-[0.5cm]";
/** Spacing between major overview sections only — not inside containers */
export const VOLUNTEER_PAGE_SECTION_GAP = "flex flex-col gap-[1cm]";
/** @deprecated use VOLUNTEER_CONTENT_STACK inside containers, VOLUNTEER_PAGE_SECTION_GAP between sections */
export const VOLUNTEER_STACK_GAP = VOLUNTEER_CONTENT_STACK;
export const VOLUNTEER_SECTION_PAD = "p-[0.5cm]";
export const VOLUNTEER_INSET = "px-[0.5cm] pt-[0.5cm] pb-[0.5cm]";
export const VOLUNTEER_EYEBROW =
  "text-xs font-bold uppercase tracking-[0.14em] text-[#16A34A]";
export const VOLUNTEER_H1 = "text-2xl font-bold leading-snug text-[#0F172A] sm:text-3xl lg:text-4xl";
export const VOLUNTEER_H2 = "text-lg font-bold leading-snug text-[#0F172A] sm:text-xl";
export const VOLUNTEER_BODY = "text-base leading-relaxed text-[#64748B]";
export const VOLUNTEER_LABEL =
  "text-xs font-bold uppercase tracking-wide text-[#94A3B8]";
export const VOLUNTEER_BTN =
  "inline-flex items-center justify-center gap-3 rounded-none px-8 py-5 text-lg font-semibold leading-snug whitespace-normal text-center min-h-[64px] sm:min-h-[68px]";
export const VOLUNTEER_BTN_COMPACT =
  "inline-flex items-center justify-center gap-2 rounded-none px-5 py-3 text-sm font-semibold leading-snug whitespace-normal text-center min-h-[48px]";

export const volunteerInteractive = {
  card:
    "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(22,163,74,0.12)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2",
  button:
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#15803D] hover:shadow-[0_10px_24px_rgba(22,163,74,0.32)] hover:ring-2 hover:ring-[#16A34A]/35 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2",
  buttonOutline:
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#16A34A] hover:bg-[#F0FDF4] hover:text-[#15803D] hover:shadow-[0_8px_20px_rgba(22,163,74,0.12)] hover:ring-2 hover:ring-[#16A34A]/25 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2",
  link:
    "transition-all duration-200 hover:text-[#15803D] hover:underline active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] rounded-sm",
  tagPulse: "animate-pulse",
};

export const SCHEDULE_TAG_STYLES = {
  in_progress: "border-[#F59E0B] bg-[#FFFBEB] text-[#B45309] shadow-[0_0_0_1px_rgba(245,158,11,0.35)]",
  upcoming: "border-[#16A34A] bg-[#F0FDF4] text-[#15803D] shadow-[0_0_0_1px_rgba(22,163,74,0.25)]",
  looking_forward: "border-[#15803D] bg-[#ECFDF5] text-[#166534] shadow-[0_0_0_1px_rgba(21,128,61,0.2)]",
};

export const SCHEDULE_STATUS_BUTTON = {
  in_progress:
    "border-0 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white shadow-[0_2px_10px_rgba(245,158,11,0.28)] hover:from-[#EA580C] hover:to-[#F59E0B]",
  upcoming:
    "border-0 bg-gradient-to-r from-[#16A34A] to-[#4ADE80] text-white shadow-[0_2px_10px_rgba(22,163,74,0.24)] hover:from-[#15803D] hover:to-[#22C55E]",
  looking_forward:
    "border-0 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white shadow-[0_2px_10px_rgba(124,58,237,0.24)] hover:from-[#6D28D9] hover:to-[#8B5CF6]",
};
