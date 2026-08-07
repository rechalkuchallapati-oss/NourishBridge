import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBell,
  FaDownload,
  FaFilter,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaTicketAlt,
  FaTimes,
} from "react-icons/fa";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import AdminTableShell, { AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import AdminAvatar from "../../components/admin/AdminAvatar";
import TicketActionsMenu from "../../components/admin/TicketActionsMenu";
import TicketAnalyticsPanel from "../../components/admin/TicketAnalyticsPanel";
import {
  ADMIN_FILTER_INPUT,
  ADMIN_PAGE_BG,
  ADMIN_PAGE_INNER,
  ADMIN_PRIMARY_BTN,
  ADMIN_SECONDARY_BTN,
  ADMIN_TABLE_HEAD,
  ADMIN_TD,
  ADMIN_TH,
  ADMIN_TH_SORT,
  ADMIN_TR,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "../../components/admin/adminStyles";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { ADMIN_PROFILE } from "../../data/adminDashboard";
import {
  ADMIN_TICKETS,
  CATEGORY_FILTER_OPTIONS,
  DATE_RANGE_FILTER_OPTIONS,
  PRIORITY_FILTER_OPTIONS,
  TICKET_CATEGORY_LABELS,
  TICKET_PRIORITY_COLORS,
  TICKET_PRIORITY_LABELS,
  TICKET_STATUS_COLORS,
  TICKET_STATUS_LABELS,
  TICKET_TAB_COLORS,
  TICKET_USER_TYPE_LABELS,
  USER_TYPE_FILTER_OPTIONS,
  filterAdminTickets,
  getTicketTabCounts,
  sortAdminTickets,
} from "../../data/adminSupportTickets";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 9;

const STATUS_TABS = [
  { id: "all", label: "All Tickets" },
  { id: "open", label: "Open" },
  { id: "in_progress", label: "In Progress" },
  { id: "resolved", label: "Resolved" },
  { id: "closed", label: "Closed" },
];

const SORTABLE_COLUMNS = [
  { key: "id", label: "Ticket ID" },
  { key: "subject", label: "Subject" },
  { key: "user", label: "User" },
  { key: "userRole", label: "User Role" },
  { key: "category", label: "Category" },
  { key: "priority", label: "Priority" },
  { key: "status", label: "Status" },
  { key: "lastUpdated", label: "Last Updated" },
];

function Badge({ status, labels, colors }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

function SortIcon({ column, sortKey, sortDir }) {
  if (sortKey !== column) return <FaSort className="text-[#CBD5E1]" aria-hidden="true" />;
  return sortDir === "asc" ? (
    <FaSortUp className="text-[#16A34A]" aria-hidden="true" />
  ) : (
    <FaSortDown className="text-[#16A34A]" aria-hidden="true" />
  );
}

function UserAvatar({ name, id, role }) {
  return <AdminAvatar id={id} name={name} role={role} size="md" />;
}

export default function AdminSupportTickets() {
  const [tickets, setTickets] = useState(ADMIN_TICKETS);
  const [activeTab, setActiveTab] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [headerSearch, setHeaderSearch] = useState("");
  const [sortKey, setSortKey] = useState("lastUpdated");
  const [sortDir, setSortDir] = useState("desc");
  const [filters, setFilters] = useState({
    search: "",
    priority: "all",
    category: "all",
    userType: "all",
    dateRange: "all",
  });

  const tabCounts = useMemo(() => getTicketTabCounts(tickets), [tickets]);

  const combinedSearch = filters.search || headerSearch;

  const filtered = useMemo(
    () =>
      sortAdminTickets(
        filterAdminTickets(tickets, {
          tab: activeTab,
          search: combinedSearch,
          priority: filters.priority,
          category: filters.category,
          userType: filters.userType,
          dateRange: filters.dateRange,
        }),
        sortKey,
        sortDir,
      ),
    [tickets, activeTab, combinedSearch, filters, sortKey, sortDir],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  useEffect(() => setCurrentPage(1), [activeTab, filters, headerSearch, sortKey, sortDir, pageSize]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const activeFilterChips = useMemo(() => {
    const chips = [];
    if (filters.priority !== "all") {
      chips.push({ key: "priority", label: `Priority: ${TICKET_PRIORITY_LABELS[filters.priority]}` });
    }
    if (filters.category !== "all") {
      chips.push({ key: "category", label: `Category: ${TICKET_CATEGORY_LABELS[filters.category]}` });
    }
    if (filters.userType !== "all") {
      chips.push({ key: "userType", label: `User: ${TICKET_USER_TYPE_LABELS[filters.userType]}` });
    }
    if (filters.dateRange !== "all") {
      const dateLabel = DATE_RANGE_FILTER_OPTIONS.find((o) => o.id === filters.dateRange)?.label;
      chips.push({ key: "dateRange", label: `Date: ${dateLabel}` });
    }
    if (combinedSearch.trim()) {
      chips.push({ key: "search", label: `Search: "${combinedSearch.trim()}"` });
    }
    return chips;
  }, [filters, combinedSearch]);

  const clearFilters = () => {
    setFilters({ search: "", priority: "all", category: "all", userType: "all", dateRange: "all" });
    setHeaderSearch("");
    setActiveTab("all");
  };

  const removeChip = (key) => {
    if (key === "search") {
      setFilters((p) => ({ ...p, search: "" }));
      setHeaderSearch("");
      return;
    }
    setFilters((p) => ({ ...p, [key]: "all" }));
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleTicketAction = (actionId, ticket) => {
    setOpenMenuId(null);
    switch (actionId) {
      case "view":
        toast(`Opening ${ticket.id}: ${ticket.subject}`);
        break;
      case "assign":
        setTickets((prev) =>
          prev.map((t) =>
            t.id === ticket.id ? { ...t, assignedTo: "Support Team A", status: "in_progress" } : t,
          ),
        );
        toast.success(`${ticket.id} assigned to Support Team A`);
        break;
      case "progress":
        setTickets((prev) =>
          prev.map((t) => (t.id === ticket.id ? { ...t, status: "in_progress" } : t)),
        );
        toast.success(`${ticket.id} marked in progress`);
        break;
      case "resolve":
        setTickets((prev) =>
          prev.map((t) => (t.id === ticket.id ? { ...t, status: "resolved" } : t)),
        );
        toast.success(`${ticket.id} resolved`);
        break;
      case "close":
        setTickets((prev) =>
          prev.map((t) => (t.id === ticket.id ? { ...t, status: "closed" } : t)),
        );
        toast(`${ticket.id} closed`);
        break;
      case "reply":
        toast(`Reply composer opened for ${ticket.user}`);
        break;
      default:
        break;
    }
  };

  const handlePanelAction = (action) => {
    switch (action) {
      case "create":
        toast("Create ticket form coming soon", { icon: "🎫" });
        break;
      case "help":
        toast("Opening help center…", { icon: "📚" });
        break;
      case "assign":
        toast("Select a ticket from the table to assign", { icon: "👤" });
        break;
      case "contact":
        window.location.href = "mailto:support@nourishbridge.org";
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
          {/* Main Header */}
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]">
                <FaTicketAlt className="text-2xl" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#16A34A]">Admin Console</p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                  Support Tickets
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                  Manage, monitor and resolve support requests from donors, NGOs, volunteers and
                  administrators efficiently.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 xl:justify-end">
              <AdminSearchInput
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                onClear={() => setHeaderSearch("")}
                placeholder="Search for tickets..."
                className="xl:max-w-[240px]"
              />
              <button
                type="button"
                onClick={() => toast("Advanced filters below")}
                className={ADMIN_SECONDARY_BTN}
              >
                <FaFilter aria-hidden="true" /> Filter
              </button>
              <button
                type="button"
                onClick={() => toast.success("Tickets exported")}
                className={ADMIN_SECONDARY_BTN}
              >
                <FaDownload aria-hidden="true" /> Export
              </button>
              <Link
                to={DASHBOARD_ROUTES.adminNotifications}
                className="relative inline-flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#64748B] transition-all duration-200 hover:border-[#BBF7D0] hover:bg-[#F0FDF4] hover:text-[#16A34A]"
                aria-label="Notifications"
              >
                <FaBell aria-hidden="true" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-bold text-white">
                  4
                </span>
              </Link>
              <Link
                to={DASHBOARD_ROUTES.adminProfile}
                className="flex h-[42px] items-center gap-2 rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] px-3 transition-all duration-200 hover:border-[#16A34A] hover:shadow-sm"
                aria-label="Admin profile"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16A34A] text-xs font-bold text-white">
                  PA
                </span>
                <span className="hidden text-sm font-semibold text-[#15803D] sm:inline">
                  {ADMIN_PROFILE.name.split(" ")[0]}
                </span>
              </Link>
            </div>
          </div>

          {/* Status Tabs */}
          <AdminInteractivePanel className="!p-0">
            <div className="flex flex-wrap gap-0 border-b border-[#E5E7EB]">
              {STATUS_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const count = tabCounts[tab.id] ?? 0;
                const badgeColor = TICKET_TAB_COLORS[tab.id] ?? TICKET_TAB_COLORS.all;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "border-[#16A34A] bg-[#F0FDF4] text-[#15803D]"
                        : "border-transparent text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
                    ].join(" ")}
                  >
                    {tab.label}
                    <span
                      className={[
                        "inline-flex min-w-[22px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                        badgeColor,
                      ].join(" ")}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </AdminInteractivePanel>

          {/* Filters Row */}
          <AdminInteractivePanel>
            <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
              <AdminSearchInput
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                placeholder="Search for tickets by ID, subject, or user..."
              />
              <label className="min-w-[140px]">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Priority
                </span>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters((p) => ({ ...p, priority: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  {PRIORITY_FILTER_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </label>
              <label className="min-w-[160px]">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Category
                </span>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  {CATEGORY_FILTER_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </label>
              <label className="min-w-[140px]">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  User Type
                </span>
                <select
                  value={filters.userType}
                  onChange={(e) => setFilters((p) => ({ ...p, userType: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  {USER_TYPE_FILTER_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </label>
              <label className="min-w-[140px]">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Date Range
                </span>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters((p) => ({ ...p, dateRange: e.target.value }))}
                  className={ADMIN_FILTER_INPUT}
                >
                  {DATE_RANGE_FILTER_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={clearFilters} className={ADMIN_SECONDARY_BTN}>
                <FaTimes aria-hidden="true" /> Clear Filters
              </button>
            </div>

            {activeFilterChips.length > 0 ? (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#E5E7EB] pt-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Active filters:
                </span>
                {activeFilterChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => removeChip(chip.key)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D] transition-all duration-200 hover:border-[#16A34A] hover:bg-[#DCFCE7]"
                  >
                    {chip.label}
                    <FaTimes className="text-[10px]" aria-hidden="true" />
                  </button>
                ))}
              </div>
            ) : null}
          </AdminInteractivePanel>

          {/* Main Content: Table + Analytics */}
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
            <AdminInteractivePanel className="!p-0">
              <AdminTableShell
                isEmpty={filtered.length === 0}
                emptyMessage="No tickets match these filters."
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
                    {SORTABLE_COLUMNS.map((col) => (
                      <th key={col.key} className={ADMIN_TH}>
                        <button
                          type="button"
                          onClick={() => handleSort(col.key)}
                          className={ADMIN_TH_SORT}
                        >
                          {col.label}
                          <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />
                        </button>
                      </th>
                    ))}
                    <th className={ADMIN_TH}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((ticket) => (
                    <tr key={ticket.id} className={ADMIN_TR}>
                      <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{ticket.id}</td>
                      <td className={ADMIN_TD}>
                        <p className="font-semibold text-[#0F172A]">{ticket.subject}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-[#94A3B8]">
                          {ticket.description}
                        </p>
                      </td>
                      <td className={ADMIN_TD}>
                        <div className="flex items-center justify-center gap-2">
                          <UserAvatar name={ticket.user} id={ticket.id} role={ticket.userRole} />
                          <span className="font-medium text-[#0F172A]">{ticket.user}</span>
                        </div>
                      </td>
                      <td className={ADMIN_TD}>
                        <span className="inline-flex rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 text-xs font-semibold text-[#475569]">
                          {TICKET_USER_TYPE_LABELS[ticket.userRole]}
                        </span>
                      </td>
                      <td className={ADMIN_TD}>{TICKET_CATEGORY_LABELS[ticket.category]}</td>
                      <td className={ADMIN_TD}>
                        <Badge
                          status={ticket.priority}
                          labels={TICKET_PRIORITY_LABELS}
                          colors={TICKET_PRIORITY_COLORS}
                        />
                      </td>
                      <td className={ADMIN_TD}>
                        <Badge
                          status={ticket.status}
                          labels={TICKET_STATUS_LABELS}
                          colors={TICKET_STATUS_COLORS}
                        />
                      </td>
                      <td className={ADMIN_TD}>{ticket.lastUpdated}</td>
                      <td className={ADMIN_TD}>
                        <div className="flex justify-center">
                          <TicketActionsMenu
                            ticket={ticket}
                            isOpen={openMenuId === ticket.id}
                            onToggle={() =>
                              setOpenMenuId((c) => (c === ticket.id ? null : ticket.id))
                            }
                            onClose={() => setOpenMenuId(null)}
                            onAction={handleTicketAction}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  <AdminTableSpacerRows count={Math.max(0, pageSize - paginated.length)} colSpan={COL_SPAN} />
                </tbody>
              </AdminTableShell>
            </AdminInteractivePanel>

            <TicketAnalyticsPanel onAction={handlePanelAction} />
          </div>
        </div>
      </motion.section>
    </>
  );
}
