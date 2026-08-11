import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBell,
  FaBoxOpen,
  FaBuilding,
  FaChartBar,
  FaExclamationTriangle,
  FaHandHoldingHeart,
  FaServer,
  FaTruck,
  FaUserPlus,
} from "react-icons/fa";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminPageToolbar from "../../components/admin/AdminPageToolbar";
import AdminPagination from "../../components/admin/AdminPagination";
import NotificationActionsMenu from "../../components/admin/NotificationActionsMenu";
import NotificationSidebar from "../../components/admin/NotificationSidebar";
import { ADMIN_FILTER_INPUT, ADMIN_PAGE_BG, ADMIN_PAGE_INNER, DEFAULT_PAGE_SIZE_OPTIONS } from "../../components/admin/adminStyles";
import {
  ADMIN_NOTIFICATIONS,
  NOTIFICATION_PERIOD_LABELS,
  NOTIFICATION_TYPE_COLORS,
  filterNotifications,
  getUnreadCount,
} from "../../data/adminNotifications";
import { fetchAdminNotifications } from "../../modules/admin/services/adminService";
import { apiNotificationToUi } from "../../modules/notifications/notificationHelpers";
import { getApiErrorMessage } from "../../utils/apiErrors";
import useSocket from "../../hooks/useSocket";
import { REALTIME_EVENTS } from "../../modules/socket/socketClient.js";

const EASE = [0.22, 1, 0.36, 1];

const TYPE_ICONS = {
  donation: FaHandHoldingHeart,
  user: FaUserPlus,
  ngo: FaBuilding,
  pickup: FaTruck,
  inventory: FaBoxOpen,
  report: FaChartBar,
  system: FaServer,
  alert: FaExclamationTriangle,
};

const PERIOD_ORDER = ["today", "yesterday", "week_ago", "older"];

export default function AdminNotifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "all", type: "all", period: "all" });

  const reloadNotifications = () => {
    fetchAdminNotifications({ limit: 100 })
      .then((result) => {
        setItems(
          (result.notifications || []).map((n) => ({
            ...apiNotificationToUi(n),
            type: n.type || "system",
            period: "today",
            status: n.isRead ? "read" : "unread",
            reference: n.relatedEntity?.entityId || "—",
            extra: n.message,
            recipient: n.recipient?.fullName || "User",
          })),
        );
      })
      .catch((error) => toast.error(getApiErrorMessage(error)));
  };

  useSocket({
    [REALTIME_EVENTS.NOTIFICATION]: reloadNotifications,
    [REALTIME_EVENTS.ADMIN_UPDATE]: reloadNotifications,
    [REALTIME_EVENTS.CRITICAL_ALERT]: reloadNotifications,
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await fetchAdminNotifications({ limit: 100 });
        if (!cancelled) {
          setItems(
            (result.notifications || []).map((n) => ({
              ...apiNotificationToUi(n),
              type: n.type || "system",
              period: "today",
              status: n.isRead ? "read" : "unread",
              reference: n.relatedEntity?.entityId || "—",
              extra: n.message,
              recipient: n.recipient?.fullName || "User",
            })),
          );
        }
      } catch (error) {
        if (!cancelled) toast.error(getApiErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(
    () => filterNotifications(items, { search, ...filters }),
    [items, search, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const grouped = useMemo(() => {
    const groups = {};
    paginated.forEach((n) => {
      if (!groups[n.period]) groups[n.period] = [];
      groups[n.period].push(n);
    });
    return PERIOD_ORDER.filter((p) => groups[p]?.length).map((p) => ({
      period: p,
      label: NOTIFICATION_PERIOD_LABELS[p],
      items: groups[p],
    }));
  }, [paginated]);

  useEffect(() => setCurrentPage(1), [search, filters, pageSize]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const handleAction = (actionId, notification) => {
    setOpenMenuId(null);
    switch (actionId) {
      case "view":
        toast(`${notification.title}\n\n${notification.extra}`, { duration: 5000, icon: "ℹ️" });
        break;
      case "mark_read":
        setItems((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, status: "read" } : n)),
        );
        toast.success("Marked as read");
        break;
      case "open_ref":
        toast(`Opening ${notification.reference}`);
        break;
      case "delete":
        setItems((prev) => prev.filter((n) => n.id !== notification.id));
        toast.error("Notification removed");
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
          <AdminPageToolbar
            title="Notifications"
            subtitle="Stay updated with important platform activities, alerts, and operational events."
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search for notifications..."
            onFilterClick={() => toast("Use filters below")}
            unreadCount={getUnreadCount(items)}
          />

          <AdminInteractivePanel className="!p-6">
            <div className="flex flex-wrap items-end gap-4">
              <label className="min-w-[140px]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Status
                </span>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </label>
              <label className="min-w-[160px]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Type
                </span>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  <option value="all">All Types</option>
                  <option value="donation">Donation</option>
                  <option value="user">User</option>
                  <option value="ngo">NGO</option>
                  <option value="pickup">Pickup</option>
                  <option value="inventory">Inventory</option>
                  <option value="report">Report</option>
                  <option value="system">System</option>
                  <option value="alert">Alert</option>
                </select>
              </label>
              <label className="min-w-[160px]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Period
                </span>
                <select
                  value={filters.period}
                  onChange={(e) => setFilters((p) => ({ ...p, period: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week_ago">A Week Ago</option>
                </select>
              </label>
            </div>
          </AdminInteractivePanel>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <AdminInteractivePanel className="!p-0">
            <div className="divide-y divide-[#E5E7EB]">
              {grouped.length === 0 ? (
                <p className="px-6 py-16 text-center text-sm text-[#64748B]">No notifications found.</p>
              ) : (
                grouped.map((group) => (
                  <div key={group.period}>
                    <p className="bg-[#F8FAFC] px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#64748B]">
                      {group.label}
                    </p>
                    <ul>
                      {group.items.map((notification) => {
                        const Icon = TYPE_ICONS[notification.type] ?? FaBell;
                        const isUnread = notification.status === "unread";

                        return (
                          <li
                            key={notification.id}
                            className={[
                              "flex items-start gap-5 border-b border-[#E5E7EB] px-6 py-5 transition-all duration-200 last:border-0",
                              "hover:bg-[#F0FDF4] hover:shadow-[inset_4px_0_0_#16A34A]",
                              isUnread ? "bg-[#FAFFFE]" : "bg-white",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "flex h-12 w-12 shrink-0 items-center justify-center",
                                NOTIFICATION_TYPE_COLORS[notification.type],
                              ].join(" ")}
                            >
                              <Icon className="text-lg" aria-hidden="true" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-base font-bold text-[#0F172A]">{notification.title}</p>
                                {isUnread ? (
                                  <span className="rounded-full bg-[#DC2626] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                                    Unread
                                  </span>
                                ) : null}
                                <span className="text-xs font-medium text-[#94A3B8]">{notification.time}</span>
                              </div>
                              <p className="mt-2 text-sm leading-6 text-[#64748B]">{notification.message}</p>
                              <p className="mt-1 text-xs font-semibold text-[#16A34A]">
                                {notification.typeLabel} · {notification.reference}
                              </p>
                            </div>
                            <NotificationActionsMenu
                              notification={notification}
                              isOpen={openMenuId === notification.id}
                              onToggle={() =>
                                setOpenMenuId((c) => (c === notification.id ? null : notification.id))
                              }
                              onClose={() => setOpenMenuId(null)}
                              onAction={handleAction}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={pageSize}
              pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </AdminInteractivePanel>
          <NotificationSidebar />
          </div>
        </div>
      </motion.section>
    </>
  );
}
