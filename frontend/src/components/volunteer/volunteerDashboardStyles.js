/** Shared interactive styles for volunteer dashboard controls. */
export const VOLUNTEER_STACK_GAP = "flex flex-col gap-[0.5cm]";
export const VOLUNTEER_GRID_GAP = "gap-[0.5cm]";
export const VOLUNTEER_SECTION_PAD = "p-[0.5cm]";

export const volunteerInteractive = {
  card:
    "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2",
  button:
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(22,163,74,0.22)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2",
  buttonOutline:
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#16A34A] hover:bg-[#F0FDF4] hover:text-[#15803D] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2",
  link:
    "transition-all duration-200 hover:text-[#15803D] hover:underline active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] rounded-sm",
  tagPulse: "animate-pulse",
};

export const SCHEDULE_TAG_STYLES = {
  in_progress: "border-[#F59E0B] bg-[#FFFBEB] text-[#B45309] shadow-[0_0_0_1px_rgba(245,158,11,0.35)]",
  upcoming: "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8] shadow-[0_0_0_1px_rgba(37,99,235,0.25)]",
  looking_forward: "border-[#7C3AED] bg-[#F5F3FF] text-[#6D28D9] shadow-[0_0_0_1px_rgba(124,58,237,0.25)]",
};
