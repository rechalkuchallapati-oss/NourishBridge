import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowDown,
  FaArrowUp,
  FaBuilding,
  FaChevronDown,
  FaHandHoldingHeart,
  FaHistory,
  FaServer,
  FaShieldAlt,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminPageToolbar from "../../components/admin/AdminPageToolbar";
import AdminAvatar from "../../components/admin/AdminAvatar";
import AdminTableShell, { AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import AuditLogActionsMenu from "../../components/admin/AuditLogActionsMenu";
import {
  ADMIN_FILTER_INPUT,
  ADMIN_PAGE_BG,
  ADMIN_PAGE_INNER,
  ADMIN_SECONDARY_BTN,
  ADMIN_TABLE_HEAD,
  ADMIN_TD,
  ADMIN_TH,
  ADMIN_TR,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "../../components/admin/adminStyles";
import { fetchAdminAuditLogs } from "../../modules/admin/services/adminService";
import { getApiErrorMessage } from "../../utils/apiErrors";
import {
  ADMIN_AUDIT_LOGS,
  AUDIT_ACTION_COLORS,
  AUDIT_ACTION_LABELS,
  AUDIT_MODULE_LABELS,
  AUDIT_STAT_CARDS,
  AUDIT_USER_TYPE_LABELS,
  filterAuditLogs,
} from "../../data/adminAuditLogs";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 7;

const STAT_ICONS = {
  activity: FaHistory,
  user: FaUsers,
  system: FaServer,
  security: FaShieldAlt,
  donation: FaHandHoldingHeart,
  ngo: FaBuilding,
};

const STAT_TINTS = {
  green: { card: "border-[#DCFCE7] bg-gradient-to-br from-[#F0FDF4] to-white", icon: "bg-[#DCFCE7] text-[#16A34A]" },
  blue: { card: "border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white", icon: "bg-[#DBEAFE] text-[#2563EB]" },
  purple: { card: "border-[#EDE9FE] bg-gradient-to-br from-[#F5F3FF] to-white", icon: "bg-[#EDE9FE] text-[#7C3AED]" },
  red: { card: "border-[#FECACA] bg-gradient-to-br from-[#FEF2F2] to-white", icon: "bg-[#FEE2E2] text-[#DC2626]" },
  amber: { card: "border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-white", icon: "bg-[#FEF3C7] text-[#D97706]" },
  slate: { card: "border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-white", icon: "bg-[#F1F5F9] text-[#475569]" },
};

function UserCell({ log }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <AdminAvatar id={log.id} name={log.userName} userType={log.userType} size="md" />
      <div>
        <p className="font-semibold text-[#0F172A]">{log.userName}</p>
        <p className="text-xs text-[#64748B]">({AUDIT_USER_TYPE_LABELS[log.userType]})</p>
      </div>
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = STAT_ICONS[stat.icon] ?? FaHistory;
  const tint = STAT_TINTS[stat.accent] ?? STAT_TINTS.green;
  const isUp = stat.trend > 0;

  return (
    <article
      className={[
        "flex min-w-[170px] flex-1 flex-col border p-4 transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.1)]",
        tint.card,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center ${tint.icon}`}>
          <Icon className="text-lg" aria-hidden="true" />
        </span>
        <p className="text-2xl font-extrabold tracking-tight text-[#0F172A]">{stat.count}</p>
      </div>
      <p className="mt-3 text-sm font-bold text-[#334155]">{stat.label}</p>
      <p className="mt-2 flex-1 text-xs leading-5 text-[#64748B]">{stat.caption}</p>
      <p
        className={[
          "mt-3 flex items-center gap-1 text-xs font-semibold",
          isUp ? "text-[#16A34A]" : stat.trend < 0 ? "text-red-600" : "text-[#64748B]",
        ].join(" ")}
      >
        {isUp ? <FaArrowUp aria-hidden="true" /> : stat.trend < 0 ? <FaArrowDown aria-hidden="true" /> : null}
        {stat.trend !== 0 ? `${Math.abs(stat.trend)}%` : "0%"} past 7 days
      </p>
    </article>
  );
}

export default function AdminAuditLogs() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [search, setSearch] = useState("");
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: "all",
    userType: "all",
    module: "all",
    dateFrom: "2024-05-01",
    dateTo: "2024-05-31",
  });

  useEffect(() => {
    let cancelled = false;
    fetchAdminAuditLogs({ limit: 200 })
      .then((data) => {
        if (cancelled) return;
        setAuditLogs(
          (data.logs || []).map((log) => ({
            id: log.id,
            timestamp: log.timestamp,
            user: log.actor || "System",
            userType: log.role || "system",
            action: log.action,
            module: log.module,
            description: log.description,
            ip: "—",
          })),
        );
      })
      .catch((err) => toast.error(getApiErrorMessage(err)))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => filterAuditLogs(auditLogs, { search, ...filters }),
    [auditLogs, search, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  useEffect(() => setCurrentPage(1), [search, filters, pageSize]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const clearFilters = () => {
    setFilters({
      action: "all",
      userType: "all",
      module: "all",
      dateFrom: "2024-05-01",
      dateTo: "2024-05-31",
    });
    setSearch("");
  };

  const handleAction = (actionId, log) => {
    setOpenMenuId(null);
    if (actionId === "view") {
      toast(`${log.details}\n\n${log.extra}`, { duration: 5000, icon: "📋" });
    } else if (actionId === "copy_ip") {
      navigator.clipboard?.writeText(log.ip);
      toast.success("IP copied");
    } else if (actionId === "flag") {
      toast("Event flagged for review", { icon: "🚩" });
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
          <AdminPageToolbar
            title="Audit Logs"
            subtitle="Track every platform action for accountability, security, and operational transparency."
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search for audit logs..."
            onFilterClick={() => toast("Use filters below")}
            unreadCount={4}
          />

          <div className="flex gap-4 overflow-x-auto pb-2">
            {AUDIT_STAT_CARDS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>

          <AdminInteractivePanel className="!p-6">
            <div className="flex flex-wrap items-end gap-4">
              <label className="min-w-[150px] flex-1 sm:max-w-[180px]">
                <span className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Actions <FaChevronDown className="text-[10px]" aria-hidden="true" />
                </span>
                <select
                  value={filters.action}
                  onChange={(e) => setFilters((p) => ({ ...p, action: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  {Object.entries(AUDIT_ACTION_LABELS).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="min-w-[150px] flex-1 sm:max-w-[180px]">
                <span className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Users <FaChevronDown className="text-[10px]" aria-hidden="true" />
                </span>
                <select
                  value={filters.userType}
                  onChange={(e) => setFilters((p) => ({ ...p, userType: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  {Object.entries(AUDIT_USER_TYPE_LABELS).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="min-w-[150px] flex-1 sm:max-w-[180px]">
                <span className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Modules <FaChevronDown className="text-[10px]" aria-hidden="true" />
                </span>
                <select
                  value={filters.module}
                  onChange={(e) => setFilters((p) => ({ ...p, module: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  {Object.entries(AUDIT_MODULE_LABELS).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="min-w-[140px]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  From
                </span>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters((p) => ({ ...p, dateFrom: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                />
              </label>
              <label className="min-w-[140px]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  To
                </span>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters((p) => ({ ...p, dateTo: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                />
              </label>
              <button type="button" onClick={clearFilters} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}>
                <FaTimes aria-hidden="true" /> Clear
              </button>
            </div>
          </AdminInteractivePanel>

          <AdminInteractivePanel className="!p-0">
            <AdminTableShell
              isLoading={loading}
              isEmpty={filtered.length === 0}
              emptyMessage="No audit logs match these filters."
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
                  <th className={ADMIN_TH}>Time</th>
                  <th className={ADMIN_TH}>User</th>
                  <th className={ADMIN_TH}>Action</th>
                  <th className={ADMIN_TH}>Module</th>
                  <th className={ADMIN_TH}>Details</th>
                  <th className={ADMIN_TH}>IP Address</th>
                  <th className={ADMIN_TH}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((log) => (
                  <tr key={log.id} className={ADMIN_TR}>
                    <td className={ADMIN_TD}>
                      <p className="font-semibold text-[#0F172A]">{log.dateLabel}</p>
                      <p className="mt-1 text-xs text-[#64748B]">{log.timeLabel}</p>
                    </td>
                    <td className={ADMIN_TD}>
                      <UserCell log={log} />
                    </td>
                    <td className={ADMIN_TD}>
                      <span
                        className={[
                          "inline-flex border px-2.5 py-1 text-xs font-semibold capitalize",
                          AUDIT_ACTION_COLORS[log.action] ?? "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
                        ].join(" ")}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className={`${ADMIN_TD} font-medium capitalize`}>
                      {AUDIT_MODULE_LABELS[log.module]?.replace("_", " ") ?? log.module}
                    </td>
                    <td className={`${ADMIN_TD} max-w-[240px]`}>{log.details}</td>
                    <td className={`${ADMIN_TD} font-mono text-xs`}>{log.ip}</td>
                    <td className={ADMIN_TD}>
                      <div className="flex justify-center">
                        <AuditLogActionsMenu
                          log={log}
                          isOpen={openMenuId === log.id}
                          onToggle={() => setOpenMenuId((c) => (c === log.id ? null : log.id))}
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
