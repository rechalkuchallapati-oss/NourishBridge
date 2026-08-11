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
import AdminStatCardTrend from "../../components/admin/AdminStatCardTrend";
import AdminTableShell, { AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import AdminAvatar from "../../components/admin/AdminAvatar";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import UserActionsMenu from "../../components/admin/UserActionsMenu";
import {
  ADMIN_FILTER_INPUT,
  ADMIN_PAGE_BG,
  ADMIN_PAGE_INNER,
  ADMIN_PRIMARY_BTN,
  ADMIN_SECONDARY_BTN,
  ADMIN_TABLE_HEAD,
  ADMIN_TD,
  ADMIN_TH,
  ADMIN_TR,
  DEFAULT_PAGE_SIZE_OPTIONS,
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
import { fetchAdminUsers } from "../../modules/admin/services/adminService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 10;

const STAT_CONFIG = [
  { key: "totalUsers", label: "Total Users", accent: "green", icon: FaUsers },
  { key: "verifiedUsers", label: "Verified Users", accent: "green", icon: FaUserCheck },
  { key: "pendingVerifications", label: "Pending Verifications", accent: "amber", icon: FaClock },
  { key: "activeUsers", label: "Active Users", accent: "blue", icon: FaCheckCircle },
  { key: "newThisMonth", label: "New This Month", accent: "purple", icon: FaCalendarPlus },
];

function StatusBadge({ status, labels, colors }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [filters, setFilters] = useState({ role: "all", status: "all", search: "" });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const result = await fetchAdminUsers({ limit: 100, search: filters.search || undefined });
        if (!cancelled) setUsers(result.users);
      } catch (error) {
        if (!cancelled) toast.error(getApiErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [filters.search]);

  const filtered = useMemo(() => filterAdminUsers(users, filters), [users, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, pageSize]);

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
        <div className={ADMIN_PAGE_INNER}>
          <AdminPageHeader
            title="Users"
            description="Manage all platform users — donors, NGOs, volunteers, and admins."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                <AdminSearchInput
                  value={filters.search}
                  onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                  onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                  placeholder="Search for users..."
                />
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
            <AdminTableShell
              isLoading={loading}
              isEmpty={filtered.length === 0}
              emptyMessage="No users match these filters."
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={pageSize}
              pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            >
              <thead className={ADMIN_TABLE_HEAD}>
                <tr>
                  <th className={ADMIN_TH}>User ID</th>
                  <th className={ADMIN_TH}>User</th>
                  <th className={ADMIN_TH}>Role</th>
                  <th className={ADMIN_TH}>Email</th>
                  <th className={ADMIN_TH}>Phone</th>
                  <th className={ADMIN_TH}>Status</th>
                  <th className={ADMIN_TH}>Verification</th>
                  <th className={ADMIN_TH}>Joined Date</th>
                  <th className={ADMIN_TH}>Last Login</th>
                  <th className={ADMIN_TH}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((user) => (
                  <tr key={user.id} className={ADMIN_TR}>
                    <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{user.id}</td>
                    <td className={ADMIN_TD}>
                      <div className="flex items-center justify-center gap-2">
                        <AdminAvatar id={user.id} name={user.name} role={user.role} size="md" />
                        <span className="font-medium text-[#0F172A]">{user.name}</span>
                      </div>
                    </td>
                    <td className={ADMIN_TD}>{user.roleLabel}</td>
                    <td className={ADMIN_TD}>{user.email}</td>
                    <td className={ADMIN_TD}>{user.phone}</td>
                    <td className={ADMIN_TD}>
                      <StatusBadge status={user.status} labels={USER_STATUS_LABELS} colors={USER_STATUS_COLORS} />
                    </td>
                    <td className={ADMIN_TD}>
                      <StatusBadge status={user.verification} labels={USER_VERIFICATION_LABELS} colors={USER_VERIFICATION_COLORS} />
                    </td>
                    <td className={ADMIN_TD}>{user.joinedDate}</td>
                    <td className={ADMIN_TD}>{user.lastLogin}</td>
                    <td className={ADMIN_TD}>
                      <div className="flex justify-center">
                        <UserActionsMenu
                          user={user}
                          isOpen={openMenuId === user.id}
                          onToggle={() => setOpenMenuId((c) => (c === user.id ? null : user.id))}
                          onClose={() => setOpenMenuId(null)}
                          onAction={handleAction}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                <AdminTableSpacerRows count={Math.max(0, pageSize - paginated.length)} colSpan={COL_SPAN} />
              </tbody>
            </AdminTableShell>
          </AdminInteractivePanel>
        </div>
      </motion.section>
    </>
  );
}
