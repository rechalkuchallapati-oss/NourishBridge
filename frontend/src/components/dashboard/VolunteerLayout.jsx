import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import Container from "../common/Container";
import BrandLogo from "../common/BrandLogo";
import VolunteerSidebar from "./VolunteerSidebar";
import VolunteerAccountMenu from "../volunteer/VolunteerAccountMenu";
import { VOLUNTEER_UNREAD_NOTIFICATION_COUNT } from "../../data/volunteerNotifications";
import { VOLUNTEER_STACK_GAP } from "../volunteer/volunteerDashboardStyles";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { logoutDonor } from "../../utils/authStorage";

const CARD_TINTS = {
  green: {
    card: "border-[#DCFCE7] bg-gradient-to-br from-[#F0FDF4] to-white",
    icon: "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
  },
  blue: {
    card: "border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white",
    icon: "border-[#BFDBFE] bg-[#DBEAFE] text-[#2563EB]",
  },
  purple: {
    card: "border-[#EDE9FE] bg-gradient-to-br from-[#F5F3FF] to-white",
    icon: "border-[#DDD6FE] bg-[#EDE9FE] text-[#7C3AED]",
  },
  amber: {
    card: "border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-white",
    icon: "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
  },
  slate: {
    card: "border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-white",
    icon: "border-[#E2E8F0] bg-[#F1F5F9] text-[#475569]",
  },
};

export function VolunteerStatCard({ label, value, caption, icon: Icon, accent = "green" }) {
  const tint = CARD_TINTS[accent] ?? CARD_TINTS.green;

  return (
    <article
      className={[
        "rounded-none border p-3 shadow-[0_4px_20px_rgba(15,23,42,0.04)]",
        "transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]",
        tint.card,
      ].join(" ")}
    >
      {Icon ? (
        <span
          className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-none border ${tint.icon}`}
        >
          <Icon className="text-base" aria-hidden="true" />
        </span>
      ) : null}
      <p className="text-2xl font-bold text-[#0F172A] sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-semibold text-[#334155]">{label}</p>
      {caption ? <p className="mt-0.5 text-[10px] text-[#64748B]">{caption}</p> : null}
    </article>
  );
}

function formatTodayDate() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function VolunteerLayout({ children, unreadNotifications = VOLUNTEER_UNREAD_NOTIFICATION_COUNT }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FFF8] via-[#F8FAFC] to-white">
      <Toaster position="top-center" />
      <header className="border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between gap-3 sm:h-[72px]">
          <BrandLogo
            to={DASHBOARD_ROUTES.volunteer}
            size="compact"
            showTagline
            className="shrink-0"
          />

          <div className="flex items-center gap-2 sm:gap-3">
            <time className="hidden text-xs font-medium text-[#64748B] md:block">
              {formatTodayDate()}
            </time>
            <Link
              to={DASHBOARD_ROUTES.volunteerNotifications}
              className="relative flex h-9 w-9 items-center justify-center rounded-none border border-[#E5E7EB] bg-[#F8FAFC] text-[#64748B] hover:text-[#16A34A]"
              aria-label="Notifications"
            >
              <FaBell className="text-sm" />
              {unreadNotifications > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#16A34A] px-1 text-[9px] font-bold text-white">
                  {unreadNotifications}
                </span>
              ) : null}
            </Link>
            <VolunteerAccountMenu />
            <Link
              to="/login"
              onClick={logoutDonor}
              className="hidden h-9 items-center gap-1.5 rounded-none border border-[#E5E7EB] px-2.5 text-xs text-[#64748B] hover:bg-red-50 hover:text-red-600 sm:flex"
            >
              <FaSignOutAlt />
              Logout
            </Link>
          </div>
        </Container>
      </header>

      <Container className="py-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block">
            <VolunteerSidebar />
          </aside>
          <main className={`flex flex-col ${VOLUNTEER_STACK_GAP}`}>{children}</main>
        </div>
      </Container>
    </div>
  );
}
