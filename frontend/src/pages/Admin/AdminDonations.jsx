import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Filter,
  HandHeart,
  Plus,
  RefreshCw,
  Truck,
  X,
  XCircle,
} from "lucide-react";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminChartCard from "../../components/admin/AdminChartCard";
import AdminTableShell, { AdminTableRow, AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import DonationActionsMenu from "../../components/admin/donations/DonationActionsMenu";
import DonationDetailsDrawer from "../../components/admin/donations/DonationDetailsDrawer";
import AdminAvatar from "../../components/admin/AdminAvatar";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import {
  CategoryDonutChart,
  DailyDonationsChart,
  ImpactStatsCards,
  MonthlyDonationsChart,
  TopDonorsChart,
  TopNgosChart,
  VolunteerPerformanceChart,
} from "../../components/admin/donations/DonationCharts";
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
  ADMIN_DONATIONS,
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  CITY_OPTIONS,
  DONATION_ALERTS,
  DONATION_KPI,
  DONOR_TYPE_LABELS,
  DONOR_TYPE_OPTIONS,
  DONATION_STATUS_OPTIONS,
  NGO_OPTIONS,
  PRIORITY_COLORS,
  STATUS_COLORS,
  STATUS_LABELS,
  VOLUNTEER_FILTER_OPTIONS,
  filterDonations,
  sortDonations,
} from "../../data/adminDonations";
import { exportAdminReport, fetchAdminDonations } from "../../modules/admin/services/adminService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 15;
const KPI_ICONS = { total: HandHeart, pending: Clock, approved: CheckCircle, assigned: Truck, transit: Truck, delivered: CheckCircle, rejected: XCircle };

function KpiCard({ item }) {
  const Icon = KPI_ICONS[item.id] ?? HandHeart;
  const isUp = item.trend > 0;
  return (
    <article className={[ADMIN_KPI_CARD, "min-w-[150px] flex-1"].join(" ")}>
      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: item.color }}>
          <Icon size={16} />
        </span>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${isUp ? "text-[#16A34A]" : "text-red-600"}`}>
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(item.trend)}%
        </span>
      </div>
      <p className="mt-2 text-xl font-extrabold text-[#0F172A]">{item.value}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-[#334155]">{item.label}</p>
      <p className="text-[10px] text-[#94A3B8]">{item.compare}</p>
    </article>
  );
}

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("desc");
  const [dateRange, setDateRange] = useState("last_30");
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "all",
    donorType: "all",
    city: "all",
    ngo: "all",
    volunteer: "all",
    pickupFrom: "",
    expiryFrom: "",
  });

  const filtered = useMemo(
    () => sortDonations(filterDonations(donations, filters), sortKey, sortDir),
    [donations, filters, sortKey, sortDir],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.status !== "all") chips.push({ key: "status", label: DONATION_STATUS_OPTIONS.find((o) => o.id === filters.status)?.label });
    if (filters.category !== "all") chips.push({ key: "category", label: CATEGORY_OPTIONS.find((o) => o.id === filters.category)?.label });
    if (filters.donorType !== "all") chips.push({ key: "donorType", label: DONOR_TYPE_OPTIONS.find((o) => o.id === filters.donorType)?.label });
    if (filters.city !== "all") chips.push({ key: "city", label: CITY_OPTIONS.find((o) => o.id === filters.city)?.label });
    if (filters.search.trim()) chips.push({ key: "search", label: `"${filters.search.trim()}"` });
    return chips;
  }, [filters]);

  useEffect(() => setCurrentPage(1), [filters, pageSize]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const result = await fetchAdminDonations({ limit: 100, status: filters.status !== "all" ? filters.status : undefined });
        if (!cancelled) setDonations(result.donations);
      } catch (error) {
        if (!cancelled) toast.error(getApiErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [filters.status]);

  const handleExport = async () => {
    try {
      const { blob, filename } = await exportAdminReport("donations", "csv");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Donations exported");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const openDrawer = (donation) => {
    setSelected(donation);
    setDrawerOpen(true);
  };

  const handleAction = (actionId, donation) => {
    setOpenMenuId(null);
    if (actionId === "view") openDrawer(donation);
    else toast.success(`${actionId.replace(/_/g, " ")} — ${donation.id}`);
  };

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const clearFilters = () => setFilters({ search: "", status: "all", category: "all", donorType: "all", city: "all", ngo: "all", volunteer: "all", pickupFrom: "", expiryFrom: "" });

  return (
    <>
      <Toaster position="top-center" />
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className={ADMIN_PAGE_BG}>
        <div className={ADMIN_PAGE_INNER}>
          <div className="flex flex-col gap-4 pt-[1cm] xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">Donations Management</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                Monitor, verify, assign, track, and manage every food donation across the NourishBridge platform.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative min-w-[140px]">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={`${ADMIN_FILTER_INPUT} h-[42px] pl-9`}>
                  <option value="last_7">Last 7 days</option>
                  <option value="last_30">Last 30 days</option>
                  <option value="last_90">Last 90 days</option>
                </select>
              </label>
              <button type="button" onClick={() => toast("Advanced filters")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><Filter size={16} /> Advanced Filters</button>
              <button type="button" onClick={handleExport} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><Download size={16} /> Export</button>
              <button type="button" onClick={() => toast("Add donation form")} className={`${ADMIN_PRIMARY_BTN} h-[42px]`}><Plus size={16} /> Add Donation</button>
              <button type="button" onClick={() => { setLoading(true); fetchAdminDonations({ limit: 100 }).then((r) => setDonations(r.donations)).catch((e) => toast.error(getApiErrorMessage(e))).finally(() => setLoading(false)); }} className={`${ADMIN_SECONDARY_BTN} h-[42px] px-3`}><RefreshCw size={16} /></button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {DONATION_KPI.map((item) => <KpiCard key={item.id} item={item} />)}
          </div>

          <AdminInteractivePanel className="!p-5">
            <div className="flex flex-wrap items-end gap-3">
              <AdminSearchInput
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                placeholder="Search for donations..."
              />
              {[
                { key: "status", options: DONATION_STATUS_OPTIONS },
                { key: "category", options: CATEGORY_OPTIONS },
                { key: "donorType", options: DONOR_TYPE_OPTIONS },
                { key: "city", options: CITY_OPTIONS },
                { key: "ngo", options: NGO_OPTIONS },
                { key: "volunteer", options: VOLUNTEER_FILTER_OPTIONS },
              ].map(({ key, options }) => (
                <label key={key} className="min-w-[130px]">
                  <select value={filters[key]} onChange={(e) => setFilters((p) => ({ ...p, [key]: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
              ))}
              <label className="min-w-[120px]">
                <span className="mb-1 block text-[10px] font-semibold uppercase text-[#94A3B8]">Pickup Date</span>
                <input type="date" value={filters.pickupFrom} onChange={(e) => setFilters((p) => ({ ...p, pickupFrom: e.target.value }))} className={ADMIN_FILTER_INPUT} />
              </label>
              <label className="min-w-[120px]">
                <span className="mb-1 block text-[10px] font-semibold uppercase text-[#94A3B8]">Expiry Date</span>
                <input type="date" value={filters.expiryFrom} onChange={(e) => setFilters((p) => ({ ...p, expiryFrom: e.target.value }))} className={ADMIN_FILTER_INPUT} />
              </label>
              <button type="button" onClick={clearFilters} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><X size={14} /> Clear Filters</button>
            </div>
            {activeChips.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-[#E5E7EB] pt-3">
                {activeChips.map((chip) => (
                  <button key={chip.key} type="button" onClick={() => chip.key === "search" ? setFilters((p) => ({ ...p, search: "" })) : setFilters((p) => ({ ...p, [chip.key]: "all" }))} className="inline-flex items-center gap-1 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D] hover:bg-[#DCFCE7]">
                    {chip.label} <X size={10} />
                  </button>
                ))}
              </div>
            ) : null}
          </AdminInteractivePanel>

          <AdminInteractivePanel className="!p-0">
            <AdminTableShell
              isLoading={loading}
              isEmpty={filtered.length === 0}
              emptyMessage="No donations match these filters."
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
                  {[["id", "Donation ID"], ["donorName", "Donor"], ["donorType", "Type"], ["foodItem", "Food Item"], ["category", "Category"], ["quantity", "Qty"], ["meals", "Meals"], ["pickupAddress", "Pickup"], ["ngo", "NGO"], ["volunteer", "Volunteer"], ["pickupTime", "Pickup Time"], ["expiryTime", "Expiry"], ["status", "Status"], ["priority", "Priority"]].map(([key, label]) => (
                    <th key={key} className={ADMIN_TH}><button type="button" onClick={() => toggleSort(key)} className={ADMIN_TH_SORT}>{label}</button></th>
                  ))}
                  <th className={ADMIN_TH}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((d) => (
                  <AdminTableRow key={d.id} onClick={() => openDrawer(d)}>
                    <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{d.id}</td>
                    <td className={ADMIN_TD}>
                      <div className="flex items-center justify-center gap-2">
                        <AdminAvatar name={d.donorName} role="donor" size="sm" />
                        <span className="font-medium text-[#0F172A]">{d.donorName}</span>
                      </div>
                    </td>
                    <td className={`${ADMIN_TD} text-xs`}>{DONOR_TYPE_LABELS[d.donorType]}</td>
                    <td className={ADMIN_TD}>
                      <div className="flex items-center gap-2">
                        <img src={d.image} alt="" className="h-9 w-9 shrink-0 rounded-lg border border-[#E5E7EB] object-cover" />
                        <span className="max-w-[120px] truncate font-medium text-[#0F172A]">{d.foodItem}</span>
                      </div>
                    </td>
                    <td className={`${ADMIN_TD} text-xs`}>{CATEGORY_LABELS[d.category]}</td>
                    <td className={`${ADMIN_TD} font-medium`}>{d.quantity}</td>
                    <td className={ADMIN_TD}>{d.meals}</td>
                    <td className={`${ADMIN_TD} max-w-[100px] truncate text-xs`}>{d.pickupAddress}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{d.ngo}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{d.volunteer}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{d.pickupTime}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{d.expiryTime}</td>
                    <td className={ADMIN_TD}><span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[d.status]}`}>{STATUS_LABELS[d.status]}</span></td>
                    <td className={ADMIN_TD}><span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold capitalize ${PRIORITY_COLORS[d.priority]}`}>{d.priority}</span></td>
                    <td className={ADMIN_TD} onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <DonationActionsMenu donation={d} isOpen={openMenuId === d.id} onToggle={() => setOpenMenuId((c) => (c === d.id ? null : d.id))} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                      </div>
                    </td>
                  </AdminTableRow>
                ))}
                <AdminTableSpacerRows count={Math.max(0, pageSize - paginated.length)} colSpan={COL_SPAN} />
              </tbody>
            </AdminTableShell>
          </AdminInteractivePanel>

          <div className={ADMIN_ANALYTICS_GRID}>
            <AdminChartCard title="Donation Categories"><CategoryDonutChart /></AdminChartCard>
            <AdminChartCard title="Daily Donations"><DailyDonationsChart /></AdminChartCard>
            <AdminChartCard title="Monthly Donations"><MonthlyDonationsChart /></AdminChartCard>
            <AdminChartCard title="Top Donors"><TopDonorsChart /></AdminChartCard>
            <AdminChartCard title="Top NGOs"><TopNgosChart /></AdminChartCard>
            <AdminChartCard title="Volunteer Performance"><VolunteerPerformanceChart /></AdminChartCard>
            <AdminChartCard title="Impact" className="lg:col-span-2"><ImpactStatsCards /></AdminChartCard>
          </div>

          <div>
            <h2 className={`${ADMIN_SECTION_TITLE} mb-4`}>Alerts Panel</h2>
            <div className={ADMIN_ALERTS_GRID}>
              {DONATION_ALERTS.map((alert) => (
                <article key={alert.id} className={`rounded-[16px] border p-4 ${alert.color} transition-transform hover:-translate-y-0.5`}>
                  <p className="text-xl">{alert.emoji}</p>
                  <p className="mt-2 text-sm font-bold text-[#0F172A]">{alert.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#64748B]">{alert.description}</p>
                  <button type="button" onClick={() => toast(alert.action)} className="mt-2 text-xs font-semibold text-[#16A34A] hover:underline">{alert.action} →</button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <DonationDetailsDrawer donation={selected} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onAction={handleAction} />
    </>
  );
}
