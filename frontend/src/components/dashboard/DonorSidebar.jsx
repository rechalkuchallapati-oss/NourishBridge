import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaChartBar,
  FaClipboardList,
  FaCog,
  FaFileAlt,
  FaHistory,
  FaHome,
  FaLifeRing,
  FaPlus,
  FaSatelliteDish,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import { DASHBOARD_ROUTES, matchDonorRoute } from "../../constants/routes";

const NAV_SECTIONS = [
  {
    title: null,
    items: [
      { label: "Dashboard", to: DASHBOARD_ROUTES.donor, icon: FaHome, emphasized: true },
    ],
  },
  {
    title: "Donations",
    items: [
      { label: "Create Donation", to: DASHBOARD_ROUTES.donorCreate, icon: FaPlus },
      { label: "My Donations", to: DASHBOARD_ROUTES.donorDonations, icon: FaClipboardList },
      { label: "Active Donations", to: DASHBOARD_ROUTES.donorActive, icon: FaSatelliteDish },
      { label: "Scheduled Pickups", to: DASHBOARD_ROUTES.donorPickups, icon: FaTruck },
      { label: "Donation History", to: DASHBOARD_ROUTES.donorHistory, icon: FaHistory },
    ],
  },
  {
    title: "Impact",
    items: [
      { label: "My Impact", to: DASHBOARD_ROUTES.donorImpact, icon: FaChartBar },
      { label: "Impact Reports", to: DASHBOARD_ROUTES.donorImpactReports, icon: FaFileAlt },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Notifications", to: DASHBOARD_ROUTES.donorNotifications, icon: FaBell },
      { label: "Profile", to: DASHBOARD_ROUTES.donorProfile, icon: FaUser },
      { label: "Settings", to: DASHBOARD_ROUTES.donorSettings, icon: FaCog },
      { label: "Help & Support", to: DASHBOARD_ROUTES.donorHelp, icon: FaLifeRing },
    ],
  },
];

function NavLink({ item, isActive }) {
  const Icon = item.icon;
  const emphasized = item.emphasized;

  return (
    <Link
      to={item.to}
      className={[
        "flex items-center gap-3 rounded-none px-4 py-2.5 transition-colors",
        emphasized ? "text-base font-semibold" : "text-sm font-medium",
        isActive
          ? "bg-[#F0FDF4] text-[#16A34A]"
          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
      ].join(" ")}
    >
      <Icon
        className={emphasized ? "shrink-0 text-lg" : "shrink-0 text-base"}
        aria-hidden="true"
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export default function DonorSidebar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-8 flex h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] w-full flex-col overflow-y-auto rounded-none border border-[#E5E7EB] bg-white px-5 py-7 shadow-sm">
      <div className="flex flex-col gap-[0.5cm]">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title ?? "dashboard"} className="flex flex-col gap-[0.5cm]">
            {section.title ? (
              <p className="px-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#0F172A]">
                {section.title}
              </p>
            ) : null}
            {section.items.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                isActive={matchDonorRoute(pathname, item.to)}
              />
            ))}
          </div>
        ))}

        <Link
          to={DASHBOARD_ROUTES.donorCreate}
          className="flex w-full shrink-0 items-center justify-center gap-2.5 rounded-none bg-[#16A34A] px-5 py-4 text-base font-semibold text-white shadow-[0_4px_14px_rgba(22,163,74,0.28)] transition-all hover:bg-[#15803D]"
        >
          <FaPlus className="text-lg" aria-hidden="true" />
          Create Donation
        </Link>
      </div>
    </nav>
  );
}
