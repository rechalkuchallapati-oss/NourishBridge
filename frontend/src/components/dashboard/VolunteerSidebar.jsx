import { Link, useLocation } from "react-router-dom";
import {
  FaBell,
  FaChartBar,
  FaClipboardCheck,
  FaHome,
  FaList,
  FaMapMarkedAlt,
  FaRoute,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import { DASHBOARD_ROUTES, matchVolunteerRoute } from "../../constants/routes";

const NAV_ITEMS = [
  { label: "Overview", to: DASHBOARD_ROUTES.volunteer, icon: FaHome },
  { label: "Available Pickups", to: DASHBOARD_ROUTES.volunteerPickups, icon: FaList },
  { label: "Active Mission", to: DASHBOARD_ROUTES.volunteerActive, icon: FaTruck },
  { label: "My Missions", to: DASHBOARD_ROUTES.volunteerMissions, icon: FaClipboardCheck },
  { label: "Route & Navigation", to: DASHBOARD_ROUTES.volunteerRoute, icon: FaRoute },
  { label: "Pickup Verification", to: DASHBOARD_ROUTES.volunteerPickupVerify, icon: FaMapMarkedAlt },
  { label: "Delivery Verification", to: DASHBOARD_ROUTES.volunteerDeliveryVerify, icon: FaMapMarkedAlt },
  { label: "Notifications", to: DASHBOARD_ROUTES.volunteerNotifications, icon: FaBell },
  { label: "My Impact", to: DASHBOARD_ROUTES.volunteerImpact, icon: FaChartBar },
  { label: "Profile", to: DASHBOARD_ROUTES.volunteerProfile, icon: FaUser },
];

export default function VolunteerSidebar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-6 flex max-h-[calc(100vh-88px)] flex-col overflow-y-auto rounded-none border border-[#E5E7EB] bg-white px-3 py-5 shadow-sm">
      <div className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = matchVolunteerRoute(pathname, item.to);

          return (
            <Link
              key={item.label}
              to={item.to}
              className={[
                "flex items-center gap-2.5 rounded-none px-3 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-[#F0FDF4] text-[#15803D]"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
              ].join(" ")}
            >
              <Icon className="shrink-0 text-sm" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
