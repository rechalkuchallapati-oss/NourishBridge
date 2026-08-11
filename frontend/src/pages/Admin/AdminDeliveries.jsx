import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { ArrowDown, ArrowUp, Calendar, CheckCircle, Clock, Download, Filter, MapPin, RefreshCw, Truck, X, XCircle } from "lucide-react";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminChartCard from "../../components/admin/AdminChartCard";
import AdminTableShell, { AdminTableRow, AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import AdminAvatar from "../../components/admin/AdminAvatar";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import DeliveryActionsMenu from "../../components/admin/deliveries/DeliveryActionsMenu";
import DeliveryDetailsDrawer from "../../components/admin/deliveries/DeliveryDetailsDrawer";
import DeliveryLiveTrackingPanel from "../../components/admin/deliveries/DeliveryLiveTrackingPanel";
import {
  AvgDeliveryTimeChart,
  DeliveryPerformanceChart,
  DistanceCoveredChart,
  OnTimeRateChart,
  StatusDistributionChart,
  VolunteerEfficiencyChart,
} from "../../components/admin/deliveries/DeliveryCharts";
import { ADMIN_FILTER_INPUT, ADMIN_PAGE_BG, ADMIN_PAGE_INNER, ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN, ADMIN_KPI_CARD, ADMIN_ANALYTICS_GRID, ADMIN_ALERTS_GRID, ADMIN_SECTION_TITLE, ADMIN_TABLE_HEAD, ADMIN_TD, ADMIN_TH, ADMIN_TH_SORT, DEFAULT_PAGE_SIZE_OPTIONS } from "../../components/admin/adminStyles";
import {
  ADMIN_DELIVERIES,
  CITY_OPTIONS,
  DELIVERY_ALERTS,
  DELIVERY_KPI,
  DONOR_OPTIONS,
  NGO_OPTIONS,
  STATUS_COLORS,
  STATUS_LABELS,
  STATUS_OPTIONS,
  VOLUNTEER_OPTIONS,
  PRIORITY_OPTIONS,
  filterDeliveries,
  sortDeliveries,
} from "../../data/adminDeliveries";
import { fetchAdminDeliveries } from "../../modules/admin/services/adminService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 14;
const KPI_ICONS = { total: Truck, pickup_pending: Clock, in_transit: Truck, delivered: CheckCircle, delayed: XCircle, cancelled: X };

function KpiCard({ item }) {
  const Icon = KPI_ICONS[item.id] ?? Truck;
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

export default function AdminDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("desc");
  const [dateRange, setDateRange] = useState("last_30");
  const [filters, setFilters] = useState({ search: "", status: "all", volunteer: "all", ngo: "all", donor: "all", city: "all", priority: "all", pickupFrom: "", deliveryFrom: "" });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const result = await fetchAdminDeliveries();
        if (!cancelled) {
          setDeliveries(result.deliveries);
          if (result.deliveries.length) setSelected(result.deliveries[0]);
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

  const filtered = useMemo(() => sortDeliveries(filterDeliveries(deliveries, filters), sortKey, sortDir), [deliveries, filters, sortKey, sortDir]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize), [filtered, currentPage, pageSize]);

  useEffect(() => setCurrentPage(1), [filters, pageSize]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  const openDrawer = (d) => { setSelected(d); setDrawerOpen(true); };
  const handleAction = (actionId, d) => { setOpenMenuId(null); if (actionId === "view") openDrawer(d); else toast.success(`${actionId.replace(/_/g, " ")} — ${d.id}`); };
  const toggleSort = (key) => { if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc")); else { setSortKey(key); setSortDir("asc"); } };
  const clearFilters = () => setFilters({ search: "", status: "all", volunteer: "all", ngo: "all", donor: "all", city: "all", priority: "all", pickupFrom: "", deliveryFrom: "" });

  return (
    <>
      <Toaster position="top-center" />
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className={ADMIN_PAGE_BG}>
        <div className={ADMIN_PAGE_INNER}>
          <div className="flex flex-col gap-4 pt-[1cm] xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">Deliveries</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">Track, monitor, and manage every food pickup and delivery in real time across the NourishBridge network.</p>
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
              <button type="button" onClick={() => toast("Live tracking map")} className={`${ADMIN_PRIMARY_BTN} h-[42px]`}><MapPin size={16} /> Live Tracking</button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">{DELIVERY_KPI.map((item) => <KpiCard key={item.id} item={item} />)}</div>

          <AdminInteractivePanel className="!p-5">
            <div className="flex flex-wrap items-end gap-3">
              <AdminSearchInput
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                placeholder="Search for deliveries..."
              />
              {[{ key: "status", options: STATUS_OPTIONS }, { key: "volunteer", options: VOLUNTEER_OPTIONS }, { key: "ngo", options: NGO_OPTIONS }, { key: "donor", options: DONOR_OPTIONS }, { key: "city", options: CITY_OPTIONS }, { key: "priority", options: PRIORITY_OPTIONS }].map(({ key, options }) => (
                <label key={key} className="min-w-[130px]">
                  <select value={filters[key]} onChange={(e) => setFilters((p) => ({ ...p, [key]: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
              ))}
              <label className="min-w-[120px]"><span className="mb-1 block text-[10px] font-semibold uppercase text-[#94A3B8]">Pickup</span><input type="date" value={filters.pickupFrom} onChange={(e) => setFilters((p) => ({ ...p, pickupFrom: e.target.value }))} className={ADMIN_FILTER_INPUT} /></label>
              <label className="min-w-[120px]"><span className="mb-1 block text-[10px] font-semibold uppercase text-[#94A3B8]">Delivery</span><input type="date" value={filters.deliveryFrom} onChange={(e) => setFilters((p) => ({ ...p, deliveryFrom: e.target.value }))} className={ADMIN_FILTER_INPUT} /></label>
              <button type="button" onClick={clearFilters} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><X size={14} /> Clear Filters</button>
            </div>
          </AdminInteractivePanel>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <AdminInteractivePanel className="!p-0">
              <AdminTableShell
                isLoading={loading}
                isEmpty={filtered.length === 0}
                emptyMessage="No deliveries match these filters."
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
                    {[["id", "Delivery ID"], ["donationId", "Donation"], ["donor", "Donor"], ["ngo", "NGO"], ["volunteer", "Volunteer"], ["vehicle", "Vehicle"], ["pickupLocation", "Pickup"], ["destination", "Destination"], ["pickupTime", "Pickup Time"], ["estimatedArrival", "ETA"], ["actualDelivery", "Delivered"], ["distance", "Distance"], ["status", "Status"]].map(([key, label]) => (
                      <th key={key} className={ADMIN_TH}><button type="button" onClick={() => toggleSort(key)} className={ADMIN_TH_SORT}>{label}</button></th>
                    ))}
                    <th className={ADMIN_TH}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((d) => (
                    <AdminTableRow key={d.id} onClick={() => { setSelected(d); openDrawer(d); }} selected={selected?.id === d.id}>
                      <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{d.id}</td>
                      <td className={`${ADMIN_TD} text-xs`}>{d.donationId}</td>
                      <td className={ADMIN_TD}><div className="flex items-center justify-center gap-2"><AdminAvatar name={d.donor} role="donor" size="sm" /><span className="max-w-[90px] truncate text-xs">{d.donor}</span></div></td>
                      <td className={`${ADMIN_TD} text-xs`}>{d.ngo}</td>
                      <td className={`${ADMIN_TD} text-xs`}>{d.volunteer}</td>
                      <td className={`${ADMIN_TD} max-w-[80px] truncate text-[10px]`}>{d.vehicle}</td>
                      <td className={`${ADMIN_TD} max-w-[90px] truncate text-xs`}>{d.pickupLocation}</td>
                      <td className={`${ADMIN_TD} max-w-[90px] truncate text-xs`}>{d.destination}</td>
                      <td className={`${ADMIN_TD} text-xs`}>{d.pickupTime}</td>
                      <td className={`${ADMIN_TD} text-xs`}>{d.estimatedArrival}</td>
                      <td className={`${ADMIN_TD} text-xs`}>{d.actualDelivery}</td>
                      <td className={`${ADMIN_TD} text-xs`}>{d.distance}</td>
                      <td className={ADMIN_TD}><span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[d.status]}`}>{STATUS_LABELS[d.status]}</span></td>
                      <td className={ADMIN_TD} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center">
                          <DeliveryActionsMenu delivery={d} isOpen={openMenuId === d.id} onToggle={() => setOpenMenuId((c) => (c === d.id ? null : d.id))} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                        </div>
                      </td>
                    </AdminTableRow>
                  ))}
                  <AdminTableSpacerRows count={Math.max(0, pageSize - paginated.length)} colSpan={COL_SPAN} />
                </tbody>
              </AdminTableShell>
            </AdminInteractivePanel>

            <DeliveryLiveTrackingPanel delivery={selected} onAction={handleAction} />
          </div>

          <div className={ADMIN_ANALYTICS_GRID}>
            <AdminChartCard title="Delivery Performance Trend"><DeliveryPerformanceChart /></AdminChartCard>
            <AdminChartCard title="Average Delivery Time"><AvgDeliveryTimeChart /></AdminChartCard>
            <AdminChartCard title="On-Time Delivery Rate"><OnTimeRateChart /></AdminChartCard>
            <AdminChartCard title="Status Distribution"><StatusDistributionChart /></AdminChartCard>
            <AdminChartCard title="Distance Covered"><DistanceCoveredChart /></AdminChartCard>
            <AdminChartCard title="Volunteer Efficiency"><VolunteerEfficiencyChart /></AdminChartCard>
          </div>

          <div>
            <h2 className={`${ADMIN_SECTION_TITLE} mb-4`}>Operational Alerts</h2>
            <div className={ADMIN_ALERTS_GRID}>
              {DELIVERY_ALERTS.map((alert) => (
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
      <DeliveryDetailsDrawer delivery={selected} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onAction={handleAction} />
    </>
  );
}
