import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  Filter,
  Package,
  Plus,
  Snowflake,
  Thermometer,
  TrendingUp,
  Warehouse,
  X,
} from "lucide-react";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import AdminChartCard from "../../components/admin/AdminChartCard";
import AdminTableShell, { AdminTableRow, AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import InventoryActionsMenu from "../../components/admin/inventory/InventoryActionsMenu";
import InventoryBatchDetails from "../../components/admin/inventory/InventoryBatchDetails";
import {
  CategoryDonut,
  ExpiryTimelineChart,
  IncomingOutgoingChart,
  StorageGauge,
} from "../../components/admin/inventory/InventoryCharts";
import {
  ADMIN_FILTER_INPUT,
  ADMIN_PAGE_BG,
  ADMIN_PAGE_INNER,
  ADMIN_PRIMARY_BTN,
  ADMIN_SECONDARY_BTN,
  ADMIN_KPI_CARD,
  ADMIN_ANALYTICS_GRID,
  ADMIN_ALERTS_GRID,
  ADMIN_SECTION_TITLE,
  ADMIN_TABLE_HEAD,
  ADMIN_TD,
  ADMIN_TH,
  ADMIN_TH_SORT,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "../../components/admin/adminStyles";
import {
  ADMIN_INVENTORY_BATCHES,
  AVAILABILITY_OPTIONS,
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  EXPIRY_OPTIONS,
  INVENTORY_ALERTS,
  INVENTORY_KPI,
  STATUS_COLORS,
  STATUS_LABELS,
  STORAGE_LABELS,
  STORAGE_OPTIONS,
  filterInventoryBatches,
  sortInventoryBatches,
} from "../../data/adminInventory";
import { fetchAdminInventory } from "../../modules/admin/services/adminService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 10;

const KPI_ICONS = {
  stock: Package,
  batches: Warehouse,
  near_expiry: Thermometer,
  expired: X,
  utilization: TrendingUp,
  activity: Snowflake,
};

function KpiCard({ item }) {
  const Icon = KPI_ICONS[item.id] ?? Package;
  const isUp = item.trend > 0;
  return (
    <article className={[ADMIN_KPI_CARD, "min-w-[160px] flex-1"].join(" ")}>
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: item.color }}>
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${isUp ? "text-[#16A34A]" : "text-red-600"}`}>
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(item.trend)}%
        </span>
      </div>
      <p className="mt-3 text-2xl font-extrabold text-[#0F172A]">{item.value}</p>
      <p className="mt-1 text-xs font-semibold text-[#334155]">{item.label}</p>
      <p className="mt-0.5 text-[10px] text-[#94A3B8]">{item.compare}</p>
    </article>
  );
}

export default function AdminInventory() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("desc");
  const [dateRange, setDateRange] = useState("last_30");
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    storage: "all",
    availability: "all",
    expiry: "all",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const result = await fetchAdminInventory();
        if (!cancelled) {
          setBatches(result.items);
          if (result.items.length) setSelected(result.items[0]);
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
    () => sortInventoryBatches(filterInventoryBatches(batches, filters), sortKey, sortDir),
    [batches, filters, sortKey, sortDir],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.category !== "all") chips.push({ key: "category", label: CATEGORY_OPTIONS.find((o) => o.id === filters.category)?.label });
    if (filters.storage !== "all") chips.push({ key: "storage", label: STORAGE_OPTIONS.find((o) => o.id === filters.storage)?.label });
    if (filters.availability !== "all") chips.push({ key: "availability", label: AVAILABILITY_OPTIONS.find((o) => o.id === filters.availability)?.label });
    if (filters.expiry !== "all") chips.push({ key: "expiry", label: EXPIRY_OPTIONS.find((o) => o.id === filters.expiry)?.label });
    if (filters.search.trim()) chips.push({ key: "search", label: `Search: "${filters.search.trim()}"` });
    return chips;
  }, [filters]);

  useEffect(() => setCurrentPage(1), [filters, pageSize]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const clearFilters = () => {
    setFilters({ search: "", category: "all", storage: "all", availability: "all", expiry: "all", dateFrom: "", dateTo: "" });
  };

  const handleAction = (actionId, batch) => {
    setOpenMenuId(null);
    if (actionId === "view") setSelected(batch);
    else toast.success(`${actionId} — ${batch.id}`);
  };

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
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
          {/* Header */}
          <div className="flex flex-col gap-4 pt-[1cm] xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">Inventory Monitor</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                Monitor food inventory, storage conditions, batch lifecycle, expiry tracking, and warehouse
                operations in real time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative min-w-[150px]">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={`${ADMIN_FILTER_INPUT} h-[42px] pl-9`}>
                  <option value="last_7">Last 7 days</option>
                  <option value="last_30">Last 30 days</option>
                  <option value="last_90">Last 90 days</option>
                </select>
              </label>
              <button type="button" onClick={() => toast("Filters applied")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}>
                <Filter size={16} /> Filter
              </button>
              <button type="button" onClick={() => toast.success("Inventory exported")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}>
                <Download size={16} /> Export Inventory
              </button>
              <button type="button" onClick={() => toast("Add inventory form")} className={`${ADMIN_PRIMARY_BTN} h-[42px]`}>
                <Plus size={16} /> Add Inventory
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {INVENTORY_KPI.map((item) => (
              <KpiCard key={item.id} item={item} />
            ))}
          </div>

          {/* Filters */}
          <AdminInteractivePanel className="!p-5">
            <div className="flex flex-wrap items-end gap-3">
              <AdminSearchInput
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                placeholder="Search for inventory..."
              />
              {[
                { key: "category", options: CATEGORY_OPTIONS },
                { key: "storage", options: STORAGE_OPTIONS },
                { key: "availability", options: AVAILABILITY_OPTIONS },
                { key: "expiry", options: EXPIRY_OPTIONS },
              ].map(({ key, options }) => (
                <label key={key} className="min-w-[140px]">
                  <select
                    value={filters[key]}
                    onChange={(e) => setFilters((p) => ({ ...p, [key]: e.target.value }))}
                    className={ADMIN_FILTER_INPUT}
                  >
                    {options.map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </label>
              ))}
              <label className="min-w-[130px]">
                <span className="mb-1 block text-[10px] font-semibold uppercase text-[#94A3B8]">From</span>
                <input type="date" value={filters.dateFrom} onChange={(e) => setFilters((p) => ({ ...p, dateFrom: e.target.value }))} className={ADMIN_FILTER_INPUT} />
              </label>
              <label className="min-w-[130px]">
                <span className="mb-1 block text-[10px] font-semibold uppercase text-[#94A3B8]">To</span>
                <input type="date" value={filters.dateTo} onChange={(e) => setFilters((p) => ({ ...p, dateTo: e.target.value }))} className={ADMIN_FILTER_INPUT} />
              </label>
              <button type="button" onClick={clearFilters} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}>
                <X size={14} /> Clear Filters
              </button>
            </div>
            {activeChips.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-[#E5E7EB] pt-3">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => {
                      if (chip.key === "search") setFilters((p) => ({ ...p, search: "" }));
                      else setFilters((p) => ({ ...p, [chip.key]: "all" }));
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D] hover:bg-[#DCFCE7]"
                  >
                    {chip.label} <X size={10} />
                  </button>
                ))}
              </div>
            ) : null}
          </AdminInteractivePanel>

          {/* Table + Details */}
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <AdminInteractivePanel className="!p-0">
              <AdminTableShell
                isLoading={loading}
                isEmpty={filtered.length === 0}
                emptyMessage="No inventory batches match these filters."
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
                    {[
                      ["id", "Batch ID"],
                      ["foodItem", "Food Item"],
                      ["category", "Category"],
                      ["quantity", "Quantity"],
                      ["meals", "Est. Meals"],
                      ["storage", "Storage"],
                      ["receivedDate", "Received"],
                      ["expiryDate", "Expiry"],
                      ["status", "Status"],
                    ].map(([key, label]) => (
                      <th key={key} className={ADMIN_TH}>
                        <button type="button" onClick={() => toggleSort(key)} className={ADMIN_TH_SORT}>
                          {label}
                        </button>
                      </th>
                    ))}
                    <th className={ADMIN_TH}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((batch) => (
                    <AdminTableRow
                      key={batch.id}
                      onClick={() => setSelected(batch)}
                      selected={selected?.id === batch.id}
                    >
                      <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{batch.id}</td>
                      <td className={ADMIN_TD}>
                        <div className="flex items-center gap-3">
                          <img src={batch.image} alt="" className="h-10 w-10 shrink-0 rounded-lg border border-[#E5E7EB] object-cover" />
                          <span className="font-medium text-[#0F172A]">{batch.foodItem}</span>
                        </div>
                      </td>
                      <td className={ADMIN_TD}>{CATEGORY_LABELS[batch.category]}</td>
                      <td className={`${ADMIN_TD} font-medium text-[#0F172A]`}>{batch.quantity}</td>
                      <td className={ADMIN_TD}>{batch.meals}</td>
                      <td className={ADMIN_TD}>{STORAGE_LABELS[batch.storage]}</td>
                      <td className={ADMIN_TD}>{batch.receivedDate}</td>
                      <td className={ADMIN_TD}>{batch.expiryDate}</td>
                      <td className={ADMIN_TD}>
                        <span className={`inline-flex border px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[batch.status]}`}>
                          {STATUS_LABELS[batch.status]}
                        </span>
                      </td>
                      <td className={ADMIN_TD} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center">
                          <InventoryActionsMenu
                            batch={batch}
                            isOpen={openMenuId === batch.id}
                            onToggle={() => setOpenMenuId((c) => (c === batch.id ? null : batch.id))}
                            onClose={() => setOpenMenuId(null)}
                            onAction={handleAction}
                          />
                        </div>
                      </td>
                    </AdminTableRow>
                  ))}
                  <AdminTableSpacerRows count={Math.max(0, pageSize - paginated.length)} colSpan={COL_SPAN} />
                </tbody>
              </AdminTableShell>
            </AdminInteractivePanel>

            <InventoryBatchDetails batch={selected} onAction={handleAction} />
          </div>

          {/* Analytics grid */}
          <div className={ADMIN_ANALYTICS_GRID}>
            <AdminChartCard title="Food Category Distribution"><CategoryDonut /></AdminChartCard>
            <AdminChartCard title="Storage Utilization"><StorageGauge /></AdminChartCard>
            <AdminChartCard title="Incoming vs Outgoing"><IncomingOutgoingChart /></AdminChartCard>
            <AdminChartCard title="Expiry Timeline"><ExpiryTimelineChart /></AdminChartCard>
          </div>

          <div>
            <h2 className={`${ADMIN_SECTION_TITLE} mb-4`}>Alerts & Notifications</h2>
            <div className={ADMIN_ALERTS_GRID}>
              {INVENTORY_ALERTS.map((alert) => (
                <article key={alert.id} className={`rounded-[16px] border p-4 ${alert.color} transition-transform hover:-translate-y-0.5`}>
                  <p className="text-xl">{alert.emoji}</p>
                  <p className="mt-2 text-sm font-bold text-[#0F172A]">{alert.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#64748B]">{alert.description}</p>
                  <button type="button" onClick={() => toast(alert.action)} className="mt-2 text-xs font-semibold text-[#16A34A] hover:underline">
                    {alert.action} →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
