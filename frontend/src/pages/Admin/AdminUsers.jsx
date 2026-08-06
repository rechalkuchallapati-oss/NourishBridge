import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowDown,
  FaArrowUp,
  FaBuilding,
  FaCalendarPlus,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaExclamationTriangle,
  FaFilter,
  FaHandHoldingHeart,
  FaLeaf,
  FaPlus,
  FaRoute,
  FaSearch,
  FaStar,
  FaTicketAlt,
  FaTruck,
  FaUserCheck,
  FaUserFriends,
  FaUsers,
  FaUserSlash,
} from "react-icons/fa";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminStatCardTrend from "../../components/admin/AdminStatCardTrend";
import UserActionsMenu from "../../components/admin/UserActionsMenu";
import {
  ADMIN_FILTER_INPUT,
  ADMIN_PAGE_BG,
  ADMIN_PRIMARY_BTN,
  ADMIN_SECONDARY_BTN,
  ADMIN_TEXT_LINK,
} from "../../components/admin/adminStyles";
import {
  ADMIN_USER_STATS,
  ADMIN_USER_STAT_TRENDS,
  ADMIN_USERS,
  ROLE_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  USER_STATUS_COLORS,
  USER_STATUS_LABELS,
  USER_VERIFICATION_COLORS,
  USER_VERIFICATION_LABELS,
  filterAdminUsers,
} from "../../data/adminUsers";

const EASE = [0.22, 1, 0.36, 1];
const PAGE_SIZE = 5;

const STAT_CONFIG = [
  { key: "totalUsers", label: "Total Users", accent: "green", icon: FaUsers },
  { key: "verifiedUsers", label: "Verified Users", accent: "green", icon: FaUserCheck },
  { key: "pendingVerifications", label: "Pending Verifications", accent: "amber", icon: FaClock },
  { key: "activeUsers", label: "Active Users", accent: "blue", icon: FaCheckCircle },
  { key: "suspendedUsers", label: "Suspended Users", accent: "slate", icon: FaUserSlash },
  { key: "newThisMonth", label: "New This Month", accent: "purple", icon: FaCalendarPlus },
];

function StatusBadge({ status, labels, colors }) {
  return (
    <span className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState(ADMIN_USERS);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ role: "all", status: "all", search: "" });

  const filtered = useMemo(() => filterAdminUsers(users, filters), [users, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const handleAction = (actionId, user) => {
    setOpenMenuId(null);
    switch (actionId) {
      case "view":
        toast(`Viewing ${user.name} (${user.id})`);
        break;
      case "verify":
        setUsers((prev) =>
          prev.map((item) =>
            item.id === user.id ? { ...item, verification: "verified", status: "active" } : item,
          ),
        );
        toast.success(`${user.name} verified`);
        break;
      case "activate":
        setUsers((prev) =>
          prev.map((item) => (item.id === user.id ? { ...item, status: "active" } : item)),
        );
        toast.success(`${user.name} activated`);
        break;
      case "suspend":
        setUsers((prev) =>
          prev.map((item) => (item.id === user.id ? { ...item, status: "suspended" } : item)),
        );
        toast(`${user.name} suspended`, { icon: "⛔" });
        break;
      case "email":
        window.location.href = `mailto:${user.email}`;
        break;
      case "reset":
        toast(`Password reset sent to ${user.email}`);
        break;
      case "delete":
        setUsers((prev) => prev.filter((item) => item.id !== user.id));
        toast.error(`${user.name} removed`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={ADMIN_PAGE_BG}
      >
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <AdminPageHeader
            title="Users"
            description="Manage all platform users — donors, NGOs, volunteers, and admins."
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {STAT_CONFIG.map((stat) => {
              const trendData = ADMIN_USER_STAT_TRENDS[stat.key];
              return (
                <AdminStatCardTrend
                  key={stat.key}
                  label={stat.label}
                  value={ADMIN_USER_STATS[stat.key]}
                  icon={stat.icon}
                  accent={stat.accent}
                  trend={trendData.trend}
                  trendLabel={trendData.trendLabel}
                />
              );
            })}
          </div>

          <AdminInteractivePanel>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">All Users</h2>
              <div className="flex flex-wrap items-end gap-2">
                <label className="relative min-w-[200px] flex-1">
                  <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" aria-hidden="true" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                    placeholder="Search name, email, ID..."
                    className={`${ADMIN_FILTER_INPUT} pl-9`}
                  />
                </label>
                <label className="min-w-[130px]">
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaFilter aria-hidden="true" /> Role
                  </span>
                  <select
                    value={filters.role}
                    onChange={(e) => setFilters((p) => ({ ...p, role: e.target.value }))}
                    className={ADMIN_FILTER_INPUT}
                  >
                    {ROLE_FILTER_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </label>
                <label className="min-w-[130px]">
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaFilter aria-hidden="true" /> Status
                  </span>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
                    className={ADMIN_FILTER_INPUT}
                  >
                    {STATUS_FILTER_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </label>
                <button type="button" onClick={() => toast.success("Users exported")} className={ADMIN_SECONDARY_BTN}>
                  <FaDownload aria-hidden="true" /> Export
                </button>
                <button type="button" onClick={() => toast("Add user flow coming soon", { icon: "➕" })} className={ADMIN_PRIMARY_BTN}>
                  <FaPlus aria-hidden="true" /> Add User
                </button>
              </div>
            </div>
          </AdminInteractivePanel>

          <AdminInteractivePanel className="!p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                  <tr>
                    <th className="px-4 py-3">User ID</th>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Verification</th>
                    <th className="px-4 py-3">Joined Date</th>
                    <th className="px-4 py-3">Last Login</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((user) => (
                    <tr key={user.id} className="border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F0FDF4]">
                      <td className="px-4 py-3 font-semibold text-[#15803D]">{user.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-[#F0FDF4] text-xs font-bold text-[#16A34A]">
                            {user.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                          </span>
                          <span className="font-medium text-[#0F172A]">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#64748B]">{user.roleLabel}</td>
                      <td className="px-4 py-3 text-[#64748B]">{user.email}</td>
                      <td className="px-4 py-3 text-[#64748B]">{user.phone}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={user.status} labels={USER_STATUS_LABELS} colors={USER_STATUS_COLORS} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={user.verification} labels={USER_VERIFICATION_LABELS} colors={USER_VERIFICATION_COLORS} />
                      </td>
                      <td className="px-4 py-3 text-[#64748B]">{user.joinedDate}</td>
                      <td className="px-4 py-3 text-[#64748B]">{user.lastLogin}</td>
                      <td className="px-4 py-3 text-right">
                        <UserActionsMenu
                          user={user}
                          isOpen={openMenuId === user.id}
                          onToggle={() => setOpenMenuId((c) => (c === user.id ? null : user.id))}
                          onClose={() => setOpenMenuId(null)}
                          onAction={handleAction}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[#64748B]">No users match these filters.</p>
              ) : null}
            </div>
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </AdminInteractivePanel>
        </div>
      </motion.section>
    </>
  );
}
