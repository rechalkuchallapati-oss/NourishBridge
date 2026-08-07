import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowDown,
  ArrowUp,
  Download,
  Filter,
  Plus,
  RefreshCw,
  Star,
  Truck,
  UserCheck,
  Users,
  UserX,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import AdminChartCard from "../../components/admin/AdminChartCard";
import AdminTableShell, { AdminTableRow, AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import VolunteerActionsMenu from "../../components/admin/volunteers/VolunteerActionsMenu";
import VolunteerProfileDrawer from "../../components/admin/volunteers/VolunteerProfileDrawer";
import {
  AvailabilityChart,
  AvgDeliveryTimeChart,
  MissionCompletionChart,
  PerformanceRankingChart,
  TopRatedChart,
  VehicleDistributionChart,
  VolunteerGrowthChart,
} from "../../components/admin/volunteers/VolunteerCharts";
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
  ADMIN_VOLUNTEERS,
  AVAILABILITY_COLORS,
  AVAILABILITY_LABELS,
  AVAILABILITY_OPTIONS,
  CITY_OPTIONS,
  EXPERIENCE_OPTIONS,
  MISSION_STATUS_OPTIONS,
  RATING_OPTIONS,
  VEHICLE_LABELS,
  VEHICLE_OPTIONS,
  VERIFICATION_COLORS,
  VERIFICATION_LABELS,
  VERIFICATION_OPTIONS,
  VOLUNTEER_ALERTS,
  VOLUNTEER_KPI,
  filterVolunteers,
  sortVolunteers,
} from "../../data/adminVolunteers";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 13;
const KPI_ICONS = { total: Users, available: Wifi, on_mission: Truck, offline: WifiOff, suspended: UserX, verified: UserCheck, rating: Star, deliveries: Truck };

function KpiCard({ item }) {
  const Icon = KPI_ICONS[item.id] ?? Users;
  const isUp = item.trend > 0;
  return (
    <article className={[ADMIN_KPI_CARD, "min-w-[140px] flex-1"].join(" ")}>
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

export default function AdminVolunteers() {
  const [volunteers] = useState(ADMIN_VOLUNTEERS);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [filters, setFilters] = useState({
    search: "",
    city: "all",
    vehicle: "all",
    availability: "all",
    experience: "all",
    rating: "all",
    verification: "all",
    missionStatus: "all",
  });

  const filtered = useMemo(
    () => sortVolunteers(filterVolunteers(volunteers, filters), sortKey, sortDir),
    [volunteers, filters, sortKey, sortDir],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.city !== "all") chips.push({ key: "city", label: CITY_OPTIONS.find((o) => o.id === filters.city)?.label });
    if (filters.availability !== "all") chips.push({ key: "availability", label: AVAILABILITY_OPTIONS.find((o) => o.id === filters.availability)?.label });
    if (filters.verification !== "all") chips.push({ key: "verification", label: VERIFICATION_OPTIONS.find((o) => o.id === filters.verification)?.label });
    if (filters.search.trim()) chips.push({ key: "search", label: `"${filters.search.trim()}"` });
    return chips;
  }, [filters]);

  useEffect(() => setCurrentPage(1), [filters, pageSize]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  const openDrawer = (volunteer) => {
    setSelected(volunteer);
    setDrawerOpen(true);
  };

  const handleAction = (actionId, volunteer) => {
    setOpenMenuId(null);
    if (actionId === "view") openDrawer(volunteer);
    else toast.success(`${actionId.replace(/_/g, " ")} — ${volunteer.name}`);
  };

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const clearFilters = () => setFilters({ search: "", city: "all", vehicle: "all", availability: "all", experience: "all", rating: "all", verification: "all", missionStatus: "all" });

  return (
    <>
      <Toaster position="top-center" />
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className={ADMIN_PAGE_BG}>
        <div className={ADMIN_PAGE_INNER}>
          <div className="flex flex-col gap-4 pt-[1cm] xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">Volunteer Management</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                Manage volunteer registrations, missions, availability, verification, ratings, and delivery performance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => toast("Filter panel")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><Filter size={16} /> Filter</button>
              <button type="button" onClick={() => toast.success("Exported")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}><Download size={16} /> Export</button>
              <button type="button" onClick={() => toast("Add volunteer form")} className={`${ADMIN_PRIMARY_BTN} h-[42px]`}><Plus size={16} /> Add Volunteer</button>
              <button type="button" onClick={() => toast.success("Refreshed")} className={`${ADMIN_SECONDARY_BTN} h-[42px] px-3`}><RefreshCw size={16} /></button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {VOLUNTEER_KPI.map((item) => <KpiCard key={item.id} item={item} />)}
          </div>

          <AdminInteractivePanel className="!p-5">
            <div className="flex flex-wrap items-end gap-3">
              <AdminSearchInput
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                placeholder="Search for volunteers..."
              />
              {[
                { key: "city", options: CITY_OPTIONS },
                { key: "vehicle", options: VEHICLE_OPTIONS },
                { key: "availability", options: AVAILABILITY_OPTIONS },
                { key: "experience", options: EXPERIENCE_OPTIONS },
                { key: "rating", options: RATING_OPTIONS },
                { key: "verification", options: VERIFICATION_OPTIONS },
                { key: "missionStatus", options: MISSION_STATUS_OPTIONS },
              ].map(({ key, options }) => (
                <label key={key} className="min-w-[130px]">
                  <select value={filters[key]} onChange={(e) => setFilters((p) => ({ ...p, [key]: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
              ))}
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
              isEmpty={filtered.length === 0}
              emptyMessage="No volunteers match these filters."
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
                  {[["id", "ID"], ["name", "Name"], ["phone", "Phone"], ["city", "City"], ["vehicle", "Vehicle"], ["availability", "Availability"], ["currentMission", "Mission"], ["completedMissions", "Completed"], ["rating", "Rating"], ["successRate", "Success"], ["lastActive", "Last Active"], ["verification", "Verification"]].map(([key, label]) => (
                    <th key={key} className={ADMIN_TH}><button type="button" onClick={() => toggleSort(key)} className={ADMIN_TH_SORT}>{label}</button></th>
                  ))}
                  <th className={ADMIN_TH}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((v) => (
                  <AdminTableRow key={v.id} onClick={() => openDrawer(v)}>
                    <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{v.id}</td>
                    <td className={ADMIN_TD}>
                      <div className="flex items-center justify-center gap-2">
                        <img src={v.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full border border-[#E5E7EB] object-cover" />
                        <span className="font-medium text-[#0F172A]">{v.name}</span>
                      </div>
                    </td>
                    <td className={`${ADMIN_TD} text-xs`}>{v.phone}</td>
                    <td className={`${ADMIN_TD} text-xs capitalize`}>{v.city}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{VEHICLE_LABELS[v.vehicle]}</td>
                    <td className={ADMIN_TD}><span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${AVAILABILITY_COLORS[v.availability]}`}>{AVAILABILITY_LABELS[v.availability]}</span></td>
                    <td className={`${ADMIN_TD} text-xs`}>{v.currentMission ?? "—"}</td>
                    <td className={`${ADMIN_TD} font-medium`}>{v.completedMissions}</td>
                    <td className={`${ADMIN_TD} text-[#F59E0B]`}>★ {v.rating}</td>
                    <td className={ADMIN_TD}>{v.successRate}%</td>
                    <td className={`${ADMIN_TD} text-xs`}>{v.lastActive}</td>
                    <td className={ADMIN_TD}><span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${VERIFICATION_COLORS[v.verification]}`}>{VERIFICATION_LABELS[v.verification]}</span></td>
                    <td className={ADMIN_TD} onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <VolunteerActionsMenu volunteer={v} isOpen={openMenuId === v.id} onToggle={() => setOpenMenuId((c) => (c === v.id ? null : v.id))} onClose={() => setOpenMenuId(null)} onAction={handleAction} />
                      </div>
                    </td>
                  </AdminTableRow>
                ))}
                <AdminTableSpacerRows count={Math.max(0, pageSize - paginated.length)} colSpan={COL_SPAN} />
              </tbody>
            </AdminTableShell>
          </AdminInteractivePanel>

          <div className={ADMIN_ANALYTICS_GRID}>
            <AdminChartCard title="Monthly Volunteer Growth"><VolunteerGrowthChart /></AdminChartCard>
            <AdminChartCard title="Mission Completion Rate"><MissionCompletionChart /></AdminChartCard>
            <AdminChartCard title="Top Rated Volunteers"><TopRatedChart /></AdminChartCard>
            <AdminChartCard title="Vehicle Distribution"><VehicleDistributionChart /></AdminChartCard>
            <AdminChartCard title="Volunteer Availability"><AvailabilityChart /></AdminChartCard>
            <AdminChartCard title="Average Delivery Time"><AvgDeliveryTimeChart /></AdminChartCard>
            <AdminChartCard title="Volunteer Performance Ranking" className="lg:col-span-2 xl:col-span-3"><div className="max-w-md"><PerformanceRankingChart /></div></AdminChartCard>
          </div>

          <div>
            <h2 className={`${ADMIN_SECTION_TITLE} mb-4`}>Notifications Panel</h2>
            <div className={ADMIN_ALERTS_GRID}>
              {VOLUNTEER_ALERTS.map((alert) => (
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

      <VolunteerProfileDrawer volunteer={selected} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onAction={handleAction} />
    </>
  );
}
