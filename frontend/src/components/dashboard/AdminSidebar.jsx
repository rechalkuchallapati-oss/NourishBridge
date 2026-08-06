import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaBoxes,
  FaChartBar,
  FaClipboardList,
  FaCog,
  FaHistory,
  FaHome,
  FaSignOutAlt,
  FaTruck,
  FaUsers,
  FaHandHoldingHeart,
  FaBuilding,
  FaUserFriends,
} from "react-icons/fa";
import { DASHBOARD_ROUTES, matchAdminRoute } from "../../constants/routes";
import { logoutDonor } from "../../utils/authStorage";

const NAV_ITEMS = [
  { label: "Dashboard", to: DASHBOARD_ROUTES.admin, icon: FaHome, emphasized: true },
  { label: "Users", to: DASHBOARD_ROUTES.adminUsers, icon: FaUsers },
  { label: "Donations", to: DASHBOARD_ROUTES.adminDonations, icon: FaHandHoldingHeart },
  { label: "NGOs", to: DASHBOARD_ROUTES.adminNgos, icon: FaBuilding },
  { label: "Volunteers", to: DASHBOARD_ROUTES.adminVolunteers, icon: FaUserFriends },
  { label: "Donors", to: DASHBOARD_ROUTES.adminDonors, icon: FaUsers },
  { label: "Food Requests", to: DASHBOARD_ROUTES.adminFoodRequests, icon: FaClipboardList },
  { label: "Deliveries", to: DASHBOARD_ROUTES.adminDeliveries, icon: FaTruck },
  { label: "Inventory Monitor", to: DASHBOARD_ROUTES.adminInventory, icon: FaBoxes },
  { label: "Reports & Analytics", to: DASHBOARD_ROUTES.adminReports, icon: FaChartBar },
  { label: "Notifications", to: DASHBOARD_ROUTES.adminNotifications, icon: FaBell },
  { label: "System Settings", to: DASHBOARD_ROUTES.adminSystemSettings, icon: FaCog },
  { label: "Audit Logs", to: DASHBOARD_ROUTES.adminAuditLogs, icon: FaHistory },
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

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-6 flex h-[calc(100vh-88px)] max-h-[calc(100vh-88px)] w-full flex-col rounded-none border border-[#E5E7EB] bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
      <div className="mb-3 border-b border-[#E5E7EB] pb-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#16A34A]">Admin Console</p>
        <p className="mt-1 text-sm font-semibold text-[#0F172A]">NourishBridge</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            isActive={matchAdminRoute(pathname, item.to)}
          />
        ))}
      </div>

      <Link
        to="/login"
        onClick={logoutDonor}
        className="mt-3 flex shrink-0 items-center gap-3 rounded-none border border-[#FEE2E2] bg-[#FEF2F2] px-4 py-2.5 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
      >
        <FaSignOutAlt aria-hidden="true" />
        Logout
      </Link>
    </nav>
  );
}
