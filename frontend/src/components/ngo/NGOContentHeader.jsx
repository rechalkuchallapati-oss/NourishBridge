import { Link } from "react-router-dom";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

function formatTodayDate() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function getAdminInitials(orgName) {
  const words = orgName.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return orgName.slice(0, 2).toUpperCase();
}

export default function NGOContentHeader({
  organizationName,
  unreadNotifications = 5,
  subtitle = "Here's what's happening with your donations today.",
}) {
  const user = getSessionUser();
  const orgName = organizationName || getNgoDisplayName(user);
  const displayLabel = orgName.includes("Foundation") || orgName.includes("Patra")
    ? orgName
    : `${orgName.split(" ")[0]} team`;

  return (
    <header className="flex flex-col gap-4 border-b border-[#E5E7EB] bg-white px-[0.5cm] py-[0.5cm] sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl lg:text-[1.75rem]">
          Welcome back, {displayLabel}!
        </h1>
        <p className="mt-[0.3cm] text-sm leading-6 text-[#64748B] sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3 sm:gap-4">
        <time
          dateTime={new Date().toISOString().split("T")[0]}
          className="hidden text-sm font-medium text-[#64748B] md:block"
        >
          {formatTodayDate()}
        </time>

        <Link
          to={DASHBOARD_ROUTES.ngoNotifications}
          className="relative flex h-10 w-10 items-center justify-center rounded-none border border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B] transition-colors duration-300 hover:border-[#16A34A]/30 hover:text-[#16A34A]"
          aria-label={`Notifications${unreadNotifications > 0 ? `, ${unreadNotifications} unread` : ""}`}
        >
          <FaBell aria-hidden="true" />
          {unreadNotifications > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#16A34A] px-1 text-[10px] font-bold text-white">
              {unreadNotifications}
            </span>
          ) : null}
        </Link>

        <button
          type="button"
          className="flex items-center gap-2 rounded-none border border-[#E5E7EB] bg-white py-1.5 pl-1.5 pr-2.5 transition-colors duration-300 hover:border-[#16A34A]/30 hover:bg-[#F8FAFC]"
          aria-label="NGO Admin menu"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#16A34A] to-[#15803D] text-sm font-bold text-white">
            {getAdminInitials(orgName)}
          </span>
          <span className="hidden text-sm font-semibold text-[#0F172A] sm:inline">
            NGO Admin
          </span>
          <FaChevronDown className="text-xs text-[#94A3B8]" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
