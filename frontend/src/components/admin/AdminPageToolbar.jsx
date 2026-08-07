import { Link } from "react-router-dom";
import { FaBell, FaFilter } from "react-icons/fa";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { ADMIN_PROFILE } from "../../data/adminDashboard";
import { ADMIN_SECONDARY_BTN } from "./adminStyles";
import AdminSearchInput from "./AdminSearchInput";

export default function AdminPageToolbar({
  title,
  subtitle,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search for...",
  onFilterClick,
  unreadCount = 0,
  showFilter = true,
}) {
  return (
    <div className="flex flex-col gap-5 pt-[1cm] xl:flex-row xl:items-start xl:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-base">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {onSearchChange ? (
          <AdminSearchInput
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange("")}
            placeholder={searchPlaceholder}
            className="min-w-[220px] flex-1 sm:max-w-[280px]"
            inputClassName="h-[46px]"
          />
        ) : null}
        {showFilter && onFilterClick ? (
          <button type="button" onClick={onFilterClick} className={`${ADMIN_SECONDARY_BTN} h-[46px]`}>
            <FaFilter aria-hidden="true" /> Filter
          </button>
        ) : null}
        <Link
          to={DASHBOARD_ROUTES.adminNotifications}
          className={[
            "relative inline-flex h-[46px] w-[46px] items-center justify-center",
            "rounded-[10px] border border-[#E5E7EB] bg-white text-[#64748B]",
            "transition-all duration-200 hover:border-[#BBF7D0] hover:bg-[#F0FDF4] hover:text-[#16A34A]",
          ].join(" ")}
          aria-label="Notifications"
        >
          <FaBell aria-hidden="true" />
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Link>
        <Link
          to={DASHBOARD_ROUTES.adminProfile}
          className="flex h-[46px] items-center gap-2.5 rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] px-3 transition-all duration-200 hover:border-[#16A34A] hover:shadow-sm"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16A34A] text-xs font-bold text-white">
            PA
          </span>
          <span className="hidden text-sm font-semibold text-[#15803D] sm:inline">
            {ADMIN_PROFILE.name.split(" ")[0]}
          </span>
        </Link>
      </div>
    </div>
  );
}
