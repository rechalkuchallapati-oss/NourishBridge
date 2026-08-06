import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaCalendarPlus,
  FaCheckCircle,
  FaClock,
  FaUserCheck,
  FaUsers,
  FaUserSlash,
} from "react-icons/fa";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import UserActionsMenu from "../../components/admin/UserActionsMenu";
import { AdminStatCard } from "../../components/dashboard/AdminLayout";
import {
  ADMIN_USER_STATS,
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

const STAT_CONFIG = [
  { key: "totalUsers", label: "Total Users", accent: "indigo", icon: FaUsers },
  { key: "verifiedUsers", label: "Verified Users", accent: "green", icon: FaUserCheck },
  { key: "pendingVerifications", label: "Pending Verifications", accent: "amber", icon: FaClock },
  { key: "activeUsers", label: "Active Users", accent: "blue", icon: FaCheckCircle },
  { key: "suspendedUsers", label: "Suspended Users", accent: "slate", icon: FaUserSlash },
  { key: "newThisMonth", label: "New This Month", accent: "purple", icon: FaCalendarPlus },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#4338CA]/30 focus:border-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20";

function StatusBadge({ status, labels, colors }) {
  return (
    <span
      className={`inline-flex rounded-none border px-2.5 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState(ADMIN_USERS);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    search: "",
  });

  const filtered = useMemo(() => filterAdminUsers(users, filters), [users, filters]);

  const handleAction = (actionId, user) => {
    setOpenMenuId(null);

    switch (actionId) {
      case "view":
        toast(`Viewing ${user.name} (${user.id})`);
        break;
      case "verify":
        setUsers((prev) =>
          prev.map((item) =>
            item.id === user.id
              ? { ...item, verification: "verified", status: "active" }
              : item,
          ),
        );
        toast.success(`${user.name} verified`);
        break;
      case "activate":
        setUsers((prev) =>
          prev.map((item) =>
            item.id === user.id ? { ...item, status: "active" } : item,
          ),
        );
        toast.success(`${user.name} activated`);
        break;
      case "suspend":
        setUsers((prev) =>
          prev.map((item) =>
            item.id === user.id ? { ...item, status: "suspended" } : item,
          ),
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
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF]/60 via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <AdminPageHeader
            title="Users"
            description="Manage all platform users — donors, NGOs, volunteers, and admins."
          />

          <div className="flex gap-2 overflow-x-auto pb-1">
            {STAT_CONFIG.map((stat) => (
              <div key={stat.key} className="min-w-[150px] flex-1 shrink-0">
                <AdminStatCard
                  label={stat.label}
                  value={ADMIN_USER_STATS[stat.key]}
                  icon={stat.icon}
                  accent={stat.accent}
                />
              </div>
            ))}
          </div>

          <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
            <div className="flex flex-wrap gap-3">
              <label className="flex min-w-[140px] flex-1 flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Search
                </span>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  placeholder="Name, email, ID..."
                  className={FILTER_SELECT_CLASS}
                />
              </label>
              <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Role
                </span>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters((prev) => ({ ...prev, role: e.target.value }))}
                  className={FILTER_SELECT_CLASS}
                >
                  {ROLE_FILTER_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex min-w-[130px] flex-1 flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Status
                </span>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                  className={FILTER_SELECT_CLASS}
                >
                  {STATUS_FILTER_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
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
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]"
                  >
                    <td className="px-4 py-3 font-semibold text-[#4338CA]">{user.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-[#EEF2FF] text-xs font-bold text-[#4338CA]">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        <span className="font-medium text-[#0F172A]">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{user.roleLabel}</td>
                    <td className="px-4 py-3 text-[#64748B]">{user.email}</td>
                    <td className="px-4 py-3 text-[#64748B]">{user.phone}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={user.status}
                        labels={USER_STATUS_LABELS}
                        colors={USER_STATUS_COLORS}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={user.verification}
                        labels={USER_VERIFICATION_LABELS}
                        colors={USER_VERIFICATION_COLORS}
                      />
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{user.joinedDate}</td>
                    <td className="px-4 py-3 text-[#64748B]">{user.lastLogin}</td>
                    <td className="px-4 py-3 text-right">
                      <UserActionsMenu
                        user={user}
                        isOpen={openMenuId === user.id}
                        onToggle={() =>
                          setOpenMenuId((current) => (current === user.id ? null : user.id))
                        }
                        onClose={() => setOpenMenuId(null)}
                        onAction={handleAction}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-[#64748B]">
                No users match these filters.
              </p>
            ) : null}
          </div>
        </div>
      </motion.section>
    </>
  );
}
