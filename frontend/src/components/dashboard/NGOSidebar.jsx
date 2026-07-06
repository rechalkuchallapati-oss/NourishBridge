import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaBoxes,
  FaChartBar,
  FaClipboardCheck,
  FaCog,
  FaHome,
  FaInbox,
  FaTruck,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import NGOIdentityPanel from "../ngo/NGOIdentityPanel";
import { DASHBOARD_ROUTES, matchNgoRoute } from "../../constants/routes";

const NAV_ITEMS = [
  { label: "Overview", to: DASHBOARD_ROUTES.ngo, icon: FaHome, emphasized: true },
  { label: "Incoming Donations", to: DASHBOARD_ROUTES.ngoIncoming, icon: FaInbox },
  { label: "Active Deliveries", to: DASHBOARD_ROUTES.ngoDeliveries, icon: FaTruck },
  { label: "Receive Food", to: DASHBOARD_ROUTES.ngoReceive, icon: FaClipboardCheck },
  { label: "Inventory", to: DASHBOARD_ROUTES.ngoInventory, icon: FaBoxes },
  { label: "Distribution Records", to: DASHBOARD_ROUTES.ngoDistribution, icon: FaUsers },
  { label: "Impact Analytics", to: DASHBOARD_ROUTES.ngoImpact, icon: FaChartBar },
  { label: "Notifications", to: DASHBOARD_ROUTES.ngoNotifications, icon: FaBell },
  { label: "Profile & Capacity", to: DASHBOARD_ROUTES.ngoProfile, icon: FaUser },
  { label: "Settings", to: DASHBOARD_ROUTES.ngoSettings, icon: FaCog },
];

function NavLink({ item, isActive }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      className={[
        "flex items-center gap-3 rounded-none px-4 py-2.5 transition-colors duration-200",
        item.emphasized ? "text-base font-semibold" : "text-sm font-medium",
        isActive
          ? "bg-[#F0FDF4] text-[#15803D]"
          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
      ].join(" ")}
    >
      <Icon
        className={item.emphasized ? "shrink-0 text-lg" : "shrink-0 text-base"}
        aria-hidden="true"
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export default function NGOSidebar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-6 flex h-[calc(100vh-88px)] max-h-[calc(100vh-88px)] w-full flex-col rounded-none border border-[#E5E7EB] bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
      <div className="flex min-h-0 flex-1 flex-col gap-[0.5cm] overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            isActive={matchNgoRoute(pathname, item.to)}
          />
        ))}

        <Link
          to={DASHBOARD_ROUTES.ngoIncoming}
          className="mt-[0.3cm] flex w-full shrink-0 items-center justify-center gap-2.5 rounded-none bg-[#16A34A] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(22,163,74,0.28)] transition-colors duration-300 hover:bg-[#15803D] sm:text-base"
        >
          <FaInbox className="text-lg" aria-hidden="true" />
          Review Donations
        </Link>
      </div>

      <NGOIdentityPanel />
    </nav>
  );
}
