import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaChartBar,
  FaCheckCircle,
  FaClipboardList,
  FaCog,
  FaHome,
  FaInbox,
  FaLifeRing,
  FaListAlt,
  FaBoxes,
  FaTruck,
  FaUser,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import SidebarAccountSection from "./SidebarAccountSection";
import { DASHBOARD_ROUTES, matchNgoRoute } from "../../constants/routes";

const NAV_SECTIONS = [
  {
    title: null,
    items: [{ label: "Overview", to: DASHBOARD_ROUTES.ngo, icon: FaHome, emphasized: true }],
  },
  {
    title: "Operations",
    items: [
      { label: "Food Requests", to: DASHBOARD_ROUTES.ngoFoodRequests, icon: FaClipboardList },
      { label: "Incoming Donations", to: DASHBOARD_ROUTES.ngoIncoming, icon: FaInbox },
      { label: "Browse Donations", to: DASHBOARD_ROUTES.ngoBrowse, icon: FaInbox },
      { label: "Accepted Donations", to: DASHBOARD_ROUTES.ngoAccepted, icon: FaCheckCircle },
      { label: "Active Deliveries", to: DASHBOARD_ROUTES.ngoDeliveries, icon: FaTruck },
      { label: "Receive Food", to: DASHBOARD_ROUTES.ngoReceive, icon: FaInbox },
      { label: "Distribution Queue", to: DASHBOARD_ROUTES.ngoDistributionQueue, icon: FaListAlt },
      { label: "Inventory", to: DASHBOARD_ROUTES.ngoInventory, icon: FaBoxes },
      { label: "Beneficiaries", to: DASHBOARD_ROUTES.ngoBeneficiaries, icon: FaUsers },
      { label: "Volunteers", to: DASHBOARD_ROUTES.ngoVolunteers, icon: FaUserFriends },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Impact", to: DASHBOARD_ROUTES.ngoImpact, icon: FaChartBar },
      { label: "Reports", to: DASHBOARD_ROUTES.ngoReports, icon: FaChartBar },
    ],
  },
];

const ACCOUNT_ITEMS = [
  { label: "Profile", to: DASHBOARD_ROUTES.ngoProfile, icon: FaUser },
  { label: "Notifications", to: DASHBOARD_ROUTES.ngoNotifications, icon: FaBell },
  { label: "Settings", to: DASHBOARD_ROUTES.ngoSettings, icon: FaCog },
  { label: "Help & Support", to: DASHBOARD_ROUTES.ngoHelp, icon: FaLifeRing },
];

function NavLink({ item, isActive }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      className={[
        "flex items-center gap-3 rounded-[10px] px-4 py-2.5 transition-colors duration-200",
        item.emphasized ? "text-base font-semibold" : "text-sm font-medium",
        isActive
          ? "bg-[#F0FDF4] text-[#15803D]"
          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
      ].join(" ")}
    >
      <Icon className={item.emphasized ? "shrink-0 text-lg" : "shrink-0 text-base"} aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export default function NGOSidebar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-6 flex h-[calc(100vh-88px)] max-h-[calc(100vh-88px)] w-full flex-col rounded-[16px] border border-[#E5E7EB] bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title ?? "overview"} className="flex flex-col gap-2">
            {section.title ? (
              <p className="px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F172A]">
                {section.title}
              </p>
            ) : null}
            {section.items.map((item) => (
              <NavLink key={item.label} item={item} isActive={matchNgoRoute(pathname, item.to)} />
            ))}
          </div>
        ))}

        <SidebarAccountSection
          items={ACCOUNT_ITEMS}
          pathname={pathname}
          matchRoute={matchNgoRoute}
        />

        <Link
          to={DASHBOARD_ROUTES.ngoIncoming}
          className="mt-2 flex w-full shrink-0 items-center justify-center gap-2.5 rounded-[12px] bg-[#16A34A] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(22,163,74,0.28)] transition-colors duration-300 hover:bg-[#15803D] sm:text-base"
        >
          <FaInbox className="text-lg" aria-hidden="true" />
          Review Donations
        </Link>
      </div>
    </nav>
  );
}
