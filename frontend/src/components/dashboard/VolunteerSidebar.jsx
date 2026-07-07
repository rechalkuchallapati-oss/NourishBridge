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
import VolunteerIdentityPanel from "../volunteer/VolunteerIdentityPanel";
import { DASHBOARD_ROUTES, matchVolunteerRoute } from "../../constants/routes";

const NAV_SECTIONS = [
  {
    title: null,
    items: [
      { label: "Overview", to: DASHBOARD_ROUTES.volunteer, icon: FaHome, emphasized: true },
    ],
  },
  {
    title: "Missions",
    items: [
      { label: "Available Pickups", to: DASHBOARD_ROUTES.volunteerPickups, icon: FaList },
      { label: "Active Mission", to: DASHBOARD_ROUTES.volunteerActive, icon: FaTruck },
      { label: "My Missions", to: DASHBOARD_ROUTES.volunteerMissions, icon: FaClipboardCheck },
      { label: "Route & Navigation", to: DASHBOARD_ROUTES.volunteerRoute, icon: FaRoute },
    ],
  },
  {
    title: "Verification",
    items: [
      { label: "Pickup", to: DASHBOARD_ROUTES.volunteerPickup, icon: FaMapMarkedAlt },
      { label: "Delivery", to: DASHBOARD_ROUTES.volunteerDelivery, icon: FaTruck },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Notifications", to: DASHBOARD_ROUTES.volunteerNotifications, icon: FaBell },
      { label: "My Impact", to: DASHBOARD_ROUTES.volunteerImpact, icon: FaChartBar },
      { label: "Profile", to: DASHBOARD_ROUTES.volunteerProfile, icon: FaUser },
    ],
  },
];

function NavLink({ item, isActive }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      className={[
        "flex items-center gap-3 rounded-none px-5 py-3 transition-colors duration-200",
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

export default function VolunteerSidebar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-6 flex h-[calc(100vh-88px)] max-h-[calc(100vh-88px)] w-full flex-col rounded-none border border-[#E5E7EB] bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
      <div className="flex min-h-0 flex-1 flex-col gap-[0.5cm] overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title ?? "overview"} className="flex flex-col gap-[0.5cm]">
            {section.title ? (
              <p className="px-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#0F172A]">
                {section.title}
              </p>
            ) : null}
            {section.items.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                isActive={matchVolunteerRoute(pathname, item.to)}
              />
            ))}
          </div>
        ))}
      </div>

      <VolunteerIdentityPanel />
    </nav>
  );
}
