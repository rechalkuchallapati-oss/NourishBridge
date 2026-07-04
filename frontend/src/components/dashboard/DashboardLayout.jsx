import { Link } from "react-router-dom";
import { FaBell, FaSignOutAlt, FaUser } from "react-icons/fa";
import Container from "../common/Container";
import DonorSidebar from "./DonorSidebar";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getDonorProfile, logoutDonor } from "../../utils/authStorage";

export function StatCard({ label, value, hint, icon: Icon, accent = "green" }) {
  const accents = {
    green: "border-[#DCFCE7] bg-[#F0FDF4] text-[#16A34A]",
    slate: "border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]",
    amber: "border-[#FEF3C7] bg-[#FFFBEB] text-[#D97706]",
    blue: "border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB]",
  };

  return (
    <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] sm:p-5">
      <div className="flex items-center gap-[0.3cm]">
        {Icon ? (
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-none border sm:h-14 sm:w-14 ${accents[accent] ?? accents.green}`}
          >
            <Icon className="text-xl sm:text-2xl" aria-hidden="true" />
          </span>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[0.3cm]">
          <p className="text-sm font-semibold text-[#64748B] sm:text-base">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            {value}
          </p>
          {hint ? (
            <p className="text-xs leading-5 text-[#94A3B8] sm:text-sm">{hint}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  userName,
  children,
  actions,
  unreadNotifications = 3,
}) {
  const handleLogout = () => {
    logoutDonor();
  };

  const profile = getDonorProfile();
  const headerName = profile.fullName?.trim() || userName || "Donor";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FFF8] via-[#F8FAFC] to-white">
      <header className="border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Link
            to={DASHBOARD_ROUTES.donor}
            className="group flex items-center gap-3 transition-colors duration-300 hover:text-[#15803D]"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
              aria-hidden="true"
            >
              <FaUser className="text-xl sm:text-2xl" />
            </span>
            <span className="max-w-[180px] truncate text-lg font-bold capitalize text-[#15803D] sm:max-w-none sm:text-xl">
              {headerName}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to={DASHBOARD_ROUTES.donorNotifications}
              className="relative flex h-10 w-10 items-center justify-center rounded-none border border-[#E5E7EB] bg-white text-[#64748B] transition-colors hover:border-[#16A34A]/30 hover:text-[#16A34A]"
              aria-label="Notifications"
            >
              <FaBell aria-hidden="true" />
              {unreadNotifications > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-none bg-[#16A34A] px-1 text-[10px] font-bold text-white">
                  {unreadNotifications}
                </span>
              ) : null}
            </Link>
            <Link
              to="/login"
              onClick={handleLogout}
              className="flex h-10 items-center gap-[0.5cm] rounded-none border border-[#E5E7EB] px-3 text-sm font-medium text-[#64748B] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <FaSignOutAlt aria-hidden="true" />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </div>
        </Container>
      </header>

      <Container className="py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[272px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <DonorSidebar />
          </aside>

          <main className="flex flex-col gap-[0.5cm]">
            {actions ? <div className="lg:hidden">{actions}</div> : null}
            {children}
          </main>
        </div>
      </Container>
    </div>
  );
}
