import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Container from "../common/Container";
import BrandLogo from "../common/BrandLogo";
import DonorDashboardHeader from "./DonorDashboardHeader";
import DonorSidebar from "./DonorSidebar";
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

export function StatCard({
  label,
  value,
  hint,
  caption,
  icon: Icon,
  accent = "green",
}) {
  const tint = CARD_TINTS[accent] ?? CARD_TINTS.green;
  const contextCaption = caption ?? hint;

  return (
    <article
      className={[
        "rounded-[16px] border p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]",
        "transition-all duration-300 ease-in-out",
        "hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]",
        "nb-card",
        tint.card,
      ].join(" ")}
    >
      {Icon ? (
        <span
          className={[
            "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border sm:h-12 sm:w-12",
            tint.icon,
          ].join(" ")}
        >
          <Icon className="text-lg sm:text-xl" aria-hidden="true" />
        </span>
      ) : null}

      <p className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[#334155] sm:text-base">{label}</p>
      {contextCaption ? (
        <p className="mt-2 text-xs leading-5 text-[#64748B] sm:text-sm">{contextCaption}</p>
      ) : null}
    </article>
  );
}

export default function DashboardLayout({
  children,
  actions,
  unreadNotifications = 3,
}) {
  const handleLogout = () => {
    logoutDonor();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FFF8] via-[#F8FAFC] to-white">
      <header className="border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between gap-3 sm:h-[72px] sm:gap-4">
          <BrandLogo
            to={DASHBOARD_ROUTES.donor}
            size="compact"
            showTagline
            className="shrink-0"
          />

          <DonorDashboardHeader unreadNotifications={unreadNotifications} />

          <Link
            to="/login"
            onClick={handleLogout}
            className="hidden h-10 shrink-0 items-center gap-2 rounded-[10px] border border-[#E5E7EB] px-4 text-sm font-medium text-[#64748B] transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:flex"
          >
            <FaSignOutAlt aria-hidden="true" />
            Logout
          </Link>
        </Container>
      </header>

      <Container className="py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[272px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <DonorSidebar />
          </aside>

          <main className="flex flex-col gap-8">
            {actions ? <div className="lg:hidden">{actions}</div> : null}
            {children}
          </main>
        </div>
      </Container>
    </div>
  );
}
