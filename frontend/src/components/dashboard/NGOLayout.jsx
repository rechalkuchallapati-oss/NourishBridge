import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Container from "../common/Container";
import BrandLogo from "../common/BrandLogo";
import NGOSidebar from "./NGOSidebar";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getNgoDisplayName, logoutDonor } from "../../utils/authStorage";

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

/** Legacy alias: purpose maps to caption */
export function NGOStatCard({
  label,
  value,
  purpose,
  caption,
  icon: Icon,
  accent = "green",
}) {
  const tint = CARD_TINTS[accent] ?? CARD_TINTS.green;
  const contextCaption = caption ?? purpose;

  return (
    <article
      className={[
        "rounded-none border p-[0.5cm] shadow-[0_4px_20px_rgba(15,23,42,0.04)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]",
        tint.card,
      ].join(" ")}
    >
      {Icon ? (
        <span
          className={[
            "mb-[0.5cm] inline-flex h-11 w-11 items-center justify-center rounded-none border sm:h-12 sm:w-12",
            tint.icon,
          ].join(" ")}
        >
          <Icon className="text-lg sm:text-xl" aria-hidden="true" />
        </span>
      ) : null}

      <p className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">{value}</p>
      <p className="mt-[0.3cm] text-xs font-semibold text-[#334155] sm:text-sm">{label}</p>
      {contextCaption ? (
        <p className="mt-[0.3cm] text-[10px] leading-5 text-[#64748B] sm:text-xs">{contextCaption}</p>
      ) : null}
    </article>
  );
}

export default function NGOLayout({ organizationName, children }) {
  const handleLogout = () => {
    logoutDonor();
  };

  const displayName = organizationName || getNgoDisplayName();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FFF8] via-[#F8FAFC] to-white">
      <header className="border-b border-[#E5E7EB] bg-white/95 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <BrandLogo
            to={DASHBOARD_ROUTES.ngo}
            size="compact"
            showTagline
            className="shrink-0"
          />

          <p className="hidden max-w-[200px] truncate text-sm font-medium text-[#64748B] sm:block lg:max-w-xs">
            {displayName}
          </p>

          <Link
            to="/login"
            onClick={handleLogout}
            className="flex h-9 items-center gap-2 rounded-none border border-[#E5E7EB] px-3 text-sm font-medium text-[#64748B] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:h-10"
          >
            <FaSignOutAlt aria-hidden="true" />
            <span className="hidden sm:inline">Logout</span>
          </Link>
        </Container>
      </header>

      <Container className="py-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[272px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block">
            <NGOSidebar />
          </aside>

          <main className="flex min-w-0 flex-col gap-[0.5cm]">{children}</main>
        </div>
      </Container>
    </div>
  );
}
