import { Link } from "react-router-dom";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getDonorAvatarUrl } from "../../data/donorAssets";
import { getDonorDisplayName, getDonorProfile, getSessionUser } from "../../utils/authStorage";

function formatTodayDate() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function DonorDashboardHeader({ unreadNotifications = 3 }) {
  const user = getSessionUser();
  const profile = getDonorProfile();
  const donorName = profile.fullName?.trim() || getDonorDisplayName(user);
  const avatarSrc = getDonorAvatarUrl(profile);

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-3 sm:gap-4">
      <time
        dateTime={new Date().toISOString().split("T")[0]}
        className="hidden text-sm font-medium text-[#64748B] md:block"
      >
        {formatTodayDate()}
      </time>

      <Link
        to={DASHBOARD_ROUTES.donorNotifications}
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
        className="flex max-w-[220px] items-center gap-2.5 rounded-none border border-[#E5E7EB] bg-white py-1.5 pl-1.5 pr-2.5 transition-colors duration-300 hover:border-[#16A34A]/30 hover:bg-[#F8FAFC] sm:max-w-none"
        aria-label="Donor account menu"
      >
        <img
          src={avatarSrc}
          alt=""
          className="h-9 w-9 shrink-0 rounded-full border-2 border-[#BBF7D0] object-cover object-center"
        />
        <span className="truncate text-sm font-semibold text-[#0F172A]">{donorName}</span>
        <FaChevronDown className="shrink-0 text-xs text-[#94A3B8]" aria-hidden="true" />
      </button>
    </div>
  );
}
