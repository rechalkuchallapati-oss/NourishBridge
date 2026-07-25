import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxes,
  FaBuilding,
  FaClipboardList,
  FaHandHoldingHeart,
  FaTruck,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { AdminStatCard } from "../../components/dashboard/AdminLayout";
import {
  ADMIN_OVERVIEW_STATS,
  ADMIN_PLATFORM_HEALTH,
  ADMIN_QUICK_ACTIONS,
  ADMIN_RECENT_ACTIVITY,
} from "../../data/adminDashboard";
import { DASHBOARD_ROUTES } from "../../constants/routes";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  { key: "totalUsers", label: "Total Users", caption: "All roles", accent: "indigo", icon: FaUsers },
  { key: "activeDonations", label: "Active Donations", caption: "In progress", accent: "green", icon: FaHandHoldingHeart },
  { key: "registeredNgos", label: "Registered NGOs", caption: "On platform", accent: "blue", icon: FaBuilding },
  { key: "activeVolunteers", label: "Active Volunteers", caption: "Today", accent: "purple", icon: FaUserFriends },
  { key: "registeredDonors", label: "Registered Donors", caption: "All time", accent: "green", icon: FaUsers },
  { key: "openFoodRequests", label: "Open Food Requests", caption: "Awaiting match", accent: "amber", icon: FaClipboardList },
  { key: "activeDeliveries", label: "Active Deliveries", caption: "In transit", accent: "blue", icon: FaTruck },
  { key: "inventoryAlerts", label: "Inventory Alerts", caption: "Needs attention", accent: "amber", icon: FaBoxes },
];

const ACTIVITY_ICONS = {
  ngo: FaBuilding,
  donation: FaHandHoldingHeart,
  volunteer: FaUserFriends,
  request: FaClipboardList,
  inventory: FaBoxes,
};

export default function AdminDashboard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF]/60 via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
    >
      <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
        <AdminPageHeader
          title="Dashboard"
          description="Platform overview — users, donations, NGOs, volunteers, and system health at a glance."
        />

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {STAT_CONFIG.map((stat) => (
            <AdminStatCard
              key={stat.key}
              label={stat.label}
              value={ADMIN_OVERVIEW_STATS[stat.key]}
              caption={stat.caption}
              icon={stat.icon}
              accent={stat.accent}
            />
          ))}
        </div>

        <div className="grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
            <h2 className="text-lg font-bold text-[#0F172A]">Recent Activity</h2>
            <p className="mt-1 text-sm text-[#64748B]">Latest platform events across all modules.</p>
            <ul className="mt-[0.5cm] flex flex-col gap-2">
              {ADMIN_RECENT_ACTIVITY.map((item) => {
                const Icon = ACTIVITY_ICONS[item.type] ?? FaUsers;
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-none bg-[#EEF2FF] text-[#4338CA]">
                        <Icon aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">{item.event}</p>
                        <p className="text-xs text-[#64748B]">{item.entity}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-[#94A3B8]">{item.time}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="flex flex-col gap-[0.5cm]">
            <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Platform Health</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {ADMIN_PLATFORM_HEALTH.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2"
                  >
                    <span className="text-xs font-medium text-[#64748B]">{item.label}</span>
                    <span
                      className={[
                        "text-sm font-bold",
                        item.status === "healthy"
                          ? "text-[#16A34A]"
                          : item.status === "warning"
                            ? "text-[#D97706]"
                            : "text-[#4338CA]",
                      ].join(" ")}
                    >
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-none border border-[#E0E7FF] bg-gradient-to-br from-[#EEF2FF] to-white p-[0.5cm] shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#4338CA]">Quick Actions</h2>
              <div className="mt-3 flex flex-col gap-2">
                {ADMIN_QUICK_ACTIONS.map((action) => (
                  <Link
                    key={action.id}
                    to={`${DASHBOARD_ROUTES.admin}/${action.path}`}
                    className="rounded-none border border-[#C7D2FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#4338CA] transition-colors hover:bg-[#EEF2FF]"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  );
}
