import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { ArrowDown, ArrowUp, Calendar, CheckCircle, ClipboardList, Clock, Download, Filter, Plus, RefreshCw, Truck, X, XCircle } from "lucide-react";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminChartCard from "../../components/admin/AdminChartCard";
import AdminTableShell, { AdminTableRow, AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import AdminAvatar from "../../components/admin/AdminAvatar";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import FoodRequestActionsMenu from "../../components/admin/foodRequests/FoodRequestActionsMenu";
import FoodRequestDetailsDrawer from "../../components/admin/foodRequests/FoodRequestDetailsDrawer";
import {
  AvgResponseTimeChart,
  FulfillmentRateChart,
  MonthlyRequestTrendChart,
  RequestsByCategoryChart,
  RequestsByCityChart,
  UrgencyDistributionChart,
} from "../../components/admin/foodRequests/FoodRequestCharts";
import { ADMIN_FILTER_INPUT, ADMIN_PAGE_BG, ADMIN_PAGE_INNER, ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN, ADMIN_KPI_CARD, ADMIN_ANALYTICS_GRID, ADMIN_ALERTS_GRID, ADMIN_SECTION_TITLE, ADMIN_TABLE_HEAD, ADMIN_TD, ADMIN_TH, ADMIN_TH_SORT, DEFAULT_PAGE_SIZE_OPTIONS } from "../../components/admin/adminStyles";
import {
  ADMIN_FOOD_REQUESTS,
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  CITY_OPTIONS,
  NGO_OPTIONS,
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  QUANTITY_OPTIONS,
  REQUEST_ALERTS,
  REQUEST_KPI,
  STATUS_COLORS,
  STATUS_LABELS,
  STATUS_OPTIONS,
  URGENCY_OPTIONS,
  filterFoodRequests,
  sortFoodRequests,
} from "../../data/adminFoodRequests";
import { fetchAdminFoodRequests } from "../../modules/admin/services/adminService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 16;
const KPI_ICONS = { total: ClipboardList, pending: Clock, approved: CheckCircle, assigned: Truck, fulfilled: CheckCircle, rejected: XCircle };

function KpiCard({ item }) {
  const Icon = KPI_ICONS[item.id] ?? ClipboardList;
  const isUp = item.trend > 0;
  return (
    <article className={[ADMIN_KPI_CARD, "min-w-[150px] flex-1"].join(" ")}>
      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: item.color }}><Icon size={16} /></span>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${isUp ? "text-[#16A34A]" : "text-red-600"}`}>{isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(item.trend)}%</span>
      </div>
      <p className="mt-2 text-xl font-extrabold text-[#0F172A]">{item.value}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-[#334155]">{item.label}</p>
      <p className="text-[10px] text-[#94A3B8]">{item.compare}</p>
    </article>
  );
}

export default function AdminFoodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("desc");
  const [dateRange, setDateRange] = useState("last_30");
  const [filters, setFilters] = useState({ search: "", status: "all", ngo: "all", category: "all", city: "all", urgency: "all", quantity: "all", requestedFrom: "", deliveryFrom: "" });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const result = await fetchAdminFoodRequests({ limit: 100, status: filters.status !== "all" ? filters.status : undefined });
        if (!cancelled) setRequests(result.requests);
      } catch (error) {
        if (!cancelled) toast.error(getApiErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [filters.status]);

  const filtered = useMemo(() => sortFoodRequests(filterFoodRequests(requests, filters), sortKey, sortDir), [requests, filters, sortKey, sortDir]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize), [filtered, currentPage, pageSize]);

  useEffect(() => setCurrentPage(1), [filters, pageSize]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  const openDrawer = (req) => { setSelected(req); setDrawerOpen(true); };
  const handleAction = (actionId, req) => { setOpenMenuId(null); if (actionId === "view") openDrawer(req); else toast.success(`${actionId.replace(/_/g, " ")} — ${req.id}`); };
  const toggleSort = (key) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } };
  const clearFilters = () => setFilters({ search: "", status: "all", ngo: "all", category: "all", city: "all", urgency: "all", quantity: "all", requestedFrom: "", deliveryFrom: "" });

  return (
    <>
      <Toaster position="top-center" />
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className={ADMIN_PAGE_BG}>
        <div className={ADMIN_PAGE_INNER}>
          <div className="flex flex-col gap-4 pt-[1cm] xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">Food Requests</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">Manage incoming food requests from NGOs, prioritize urgent needs, assign suitable donations, and monitor fulfillment status.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative min-w-[140px]">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={`${ADMIN_FILTER_INPUT} h-[42px] pl-9`}>
                  <option value="last_7">Last 7 days</option><option value="last_30">Last 30 days</option><option value="last_90">Last 90 days</option>
                </select>
              </label>
              <button type="button" onClick={() => toast("Filters")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><Filter size={16} /> Filter</button>
              <button type="button" onClick={() => toast.success("Exported")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><Download size={16} /> Export</button>
              <button type="button" onClick={() => toast.success("Refreshed")} className={`${ADMIN_SECONDARY_BTN} h-[42px] px-3`}><RefreshCw size={16} /></button>
              <button type="button" onClick={() => toast("Create request")} className={`${ADMIN_PRIMARY_BTN} h-[42px]`}><Plus size={16} /> Create Request</button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">{REQUEST_KPI.map((item) => <KpiCard key={item.id} item={item} />)}</div>

          <AdminInteractivePanel className="!p-5">
            <div className="flex flex-wrap items-end gap-3">
              <AdminSearchInput
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                placeholder="Search for food requests..."
              />
              {[{ key: "status", options: STATUS_OPTIONS }, { key: "ngo", options: NGO_OPTIONS }, { key: "category", options: CATEGORY_OPTIONS }, { key: "city", options: CITY_OPTIONS }, { key: "urgency", options: URGENCY_OPTIONS }, { key: "quantity", options: QUANTITY_OPTIONS }].map(({ key, options }) => (
                <label key={key} className="min-w-[130px]">
                  <select value={filters[key]} onChange={(e) => setFilters((p) => ({ ...p, [key]: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
              ))}
              <label className="min-w-[120px]"><span className="mb-1 block text-[10px] font-semibold uppercase text-[#94A3B8]">Requested</span><input type="date" value={filters.requestedFrom} onChange={(e) => setFilters((p) => ({ ...p, requestedFrom: e.target.value }))} className={ADMIN_FILTER_INPUT} /></label>
              <label className="min-w-[120px]"><span className="mb-1 block text-[10px] font-semibold uppercase text-[#94A3B8]">Delivery</span><input type="date" value={filters.deliveryFrom} onChange={(e) => setFilters((p) => ({ ...p, deliveryFrom: e.target.value }))} className={ADMIN_FILTER_INPUT} /></label>
              <button type="button" onClick={clearFilters} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><X size={14} /> Clear Filters</button>
            </div>
          </AdminInteractivePanel>

          <AdminInteractivePanel className="!p-0">
            <AdminTableShell
              isLoading={loading}
              isEmpty={filtered.length === 0}
              emptyMessage="No food requests match these filters."
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
                  {[["id", "Request ID"], ["ngo", "NGO"], ["contactPerson", "Contact"], ["category", "Category"], ["foodNeeded", "Food Needed"], ["quantity", "Qty"], ["meals", "Meals"], ["beneficiaries", "Beneficiaries"], ["priority", "Priority"], ["city", "City"], ["requestedDate", "Requested"], ["requiredBy", "Required By"], ["assignedDonation", "Donation"], ["assignedVolunteer", "Volunteer"], ["status", "Status"]].map(([key, label]) => (
                    <th key={key} className={ADMIN_TH}><button type="button" onClick={() => toggleSort(key)} className={ADMIN_TH_SORT}>{label}</button></th>
                  ))}
                  <th className={ADMIN_TH}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((r) => (
                  <AdminTableRow key={r.id} onClick={() => openDrawer(r)}>
                    <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{r.id}</td>
                    <td className={ADMIN_TD}><div className="flex items-center justify-center gap-2"><AdminAvatar id={r.ngoId} name={r.ngo} role="ngo" type="ngo" size="sm" /><span className="font-medium">{r.ngo}</span></div></td>
                    <td className={`${ADMIN_TD} text-xs`}>{r.contactPerson}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{CATEGORY_LABELS[r.category]}</td>
                    <td className={`${ADMIN_TD} max-w-[100px] truncate font-medium`}>{r.foodNeeded}</td>
                    <td className={ADMIN_TD}>{r.quantity}</td>
                    <td className={ADMIN_TD}>{r.meals}</td>
                    <td className={ADMIN_TD}>{r.beneficiaries}</td>
                    <td className={ADMIN_TD}><span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${PRIORITY_COLORS[r.priority]}`}>{PRIORITY_LABELS[r.priority]}</span></td>
                    <td className={`${ADMIN_TD} text-xs capitalize`}>{r.city}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{r.requestedDate}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{r.requiredBy}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{r.assignedDonation}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{r.assignedVolunteer}</td>
                    <td className={ADMIN_TD}><span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[r.status]}`}>{STATUS_LABELS[r.status]}</span></td>
                    <td className={ADMIN_TD} onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <FoodRequestActionsMenu request={r} isOpen={openMenuId === r.id} onToggle={() => setOpenMenuId((c) => (c === r.id ? null : r.id))} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                      </div>
                    </td>
                  </AdminTableRow>
                ))}
                <AdminTableSpacerRows count={Math.max(0, pageSize - paginated.length)} colSpan={COL_SPAN} />
              </tbody>
            </AdminTableShell>
          </AdminInteractivePanel>

          <div className={ADMIN_ANALYTICS_GRID}>
            <AdminChartCard title="Food Requests by Category"><RequestsByCategoryChart /></AdminChartCard>
            <AdminChartCard title="Requests by City"><RequestsByCityChart /></AdminChartCard>
            <AdminChartCard title="Monthly Request Trend"><MonthlyRequestTrendChart /></AdminChartCard>
            <AdminChartCard title="Urgency Distribution"><UrgencyDistributionChart /></AdminChartCard>
            <AdminChartCard title="Fulfillment Rate"><FulfillmentRateChart /></AdminChartCard>
            <AdminChartCard title="Average Response Time"><AvgResponseTimeChart /></AdminChartCard>
          </div>

          <div>
            <h2 className={`${ADMIN_SECTION_TITLE} mb-4`}>Alerts Panel</h2>
            <div className={ADMIN_ALERTS_GRID}>
              {REQUEST_ALERTS.map((alert) => (
                <article key={alert.id} className={`rounded-[16px] border p-4 ${alert.color} transition-transform hover:-translate-y-0.5`}>
                  <p className="text-xl">{alert.emoji}</p>
                  <p className="mt-2 text-sm font-bold">{alert.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#64748B]">{alert.description}</p>
                  <button type="button" onClick={() => toast(alert.action)} className="mt-2 text-xs font-semibold text-[#16A34A] hover:underline">{alert.action} →</button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      <FoodRequestDetailsDrawer request={selected} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onAction={handleAction} />
    </>
  );
}
