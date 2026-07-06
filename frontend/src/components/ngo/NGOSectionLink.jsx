import { Link } from "react-router-dom";

/** Green text-only action link for NGO dashboard sections. */
export default function NGOSectionLink({ to, children = "View all" }) {
  return (
    <Link
      to={to}
      className="shrink-0 text-xs font-semibold text-[#16A34A] transition-colors duration-200 hover:text-[#15803D]"
    >
      {children}
    </Link>
  );
}

export function NGOSectionHeader({ title, badge, actionTo, actionLabel = "View all" }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <h2 className="truncate text-sm font-bold text-[#0F172A] sm:text-base">{title}</h2>
        {badge != null ? (
          <span className="inline-flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-[#16A34A] px-1.5 text-[10px] font-bold text-white">
            {badge}
          </span>
        ) : null}
      </div>
      {actionTo ? <NGOSectionLink to={actionTo}>{actionLabel}</NGOSectionLink> : null}
    </div>
  );
}

export const NGO_SECTION_CLASS =
  "rounded-none border border-[#E5E7EB] bg-white p-3 shadow-sm sm:p-4";

export const NGO_SECTION_TEXT = "text-xs text-[#64748B] sm:text-sm";
