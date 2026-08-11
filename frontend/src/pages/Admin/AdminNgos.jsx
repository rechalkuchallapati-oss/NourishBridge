import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBan,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaFilter,
  FaMapMarkerAlt,
  FaPlus,
  FaStar,
  FaTimesCircle,
  FaUserCheck,
} from "react-icons/fa";
import AdminChartCard from "../../components/admin/AdminChartCard";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminNgoDetailsDrawer from "../../components/admin/AdminNgoDetailsDrawer";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminStatCardTrend from "../../components/admin/AdminStatCardTrend";
import AdminTableShell, { AdminTableRow, AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import AdminAvatar from "../../components/admin/AdminAvatar";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import NgoActionsMenu from "../../components/admin/NgoActionsMenu";
import {
  CapacityUtilizationChart,
  MealsServedTrendChart,
  NgoCityChart,
  NgoGrowthChart,
  NgoPlatformSummaryCards,
  NgoVerificationChart,
  TopNgosByMealsPanel,
} from "../../components/admin/ngos/NgoCharts";
import {
  ADMIN_ALERTS_GRID,
  ADMIN_ANALYTICS_GRID,
  ADMIN_FILTER_INPUT,
  ADMIN_PAGE_BG,
  ADMIN_PAGE_INNER,
  ADMIN_PRIMARY_BTN,
  ADMIN_SECONDARY_BTN,
  ADMIN_SECTION_TITLE,
  ADMIN_TABLE_HEAD,
  ADMIN_TD,
  ADMIN_TH,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "../../components/admin/adminStyles";
import {
  ADMIN_NGO_STATS,
  ADMIN_NGO_STAT_TRENDS,
  ADMIN_NGOS,
  CITY_FILTER_OPTIONS,
  NGO_ALERTS,
  NGO_PLATFORM_SUMMARY,
  NGO_STATUS_COLORS,
  NGO_STATUS_FILTER_OPTIONS,
  NGO_STATUS_LABELS,
  NGO_VERIFICATION_COLORS,
  NGO_VERIFICATION_LABELS,
  VERIFICATION_FILTER_OPTIONS,
  filterAdminNgos,
} from "../../data/adminNgos";
import { fetchAdminNgos } from "../../modules/admin/services/adminService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 9;

const STAT_CONFIG = [
  { key: "totalNgos", label: "Total NGOs", accent: "green", icon: FaBuilding },
  { key: "verifiedNgos", label: "Verified NGOs", accent: "green", icon: FaUserCheck },
  { key: "pendingVerification", label: "Pending Verification", accent: "amber", icon: FaClock },
  { key: "suspendedNgos", label: "Suspended NGOs", accent: "slate", icon: FaBan },
  { key: "activeNgos", label: "Active NGOs", accent: "blue", icon: FaCheckCircle },
];

function StatusBadge({ status, labels, colors }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${colors[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function AdminNgos() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [filters, setFilters] = useState({ search: "", verification: "all", city: "all", status: "all" });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const result = await fetchAdminNgos({ limit: 100 });
        if (!cancelled) setNgos(result.ngos);
      } catch (error) {
        if (!cancelled) toast.error(getApiErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => filterAdminNgos(ngos, filters), [ngos, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  useEffect(() => setCurrentPage(1), [filters, pageSize]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!filters.search.trim()) return;
    if (filtered.length === 1) setSelectedNgo(filtered[0]);
  }, [filters.search, filtered]);

  const openNgo = (ngo) => {
    setOpenMenuId(null);
    setSelectedNgo(ngo);
  };

  const verifyNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) =>
        item.id === ngo.id ? { ...item, verification: "verified", status: "active" } : item,
      ),
    );
    setSelectedNgo((c) => (c?.id === ngo.id ? { ...c, verification: "verified", status: "active" } : c));
    toast.success(`${ngo.name} verified`);
  };

  const rejectNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) =>
        item.id === ngo.id ? { ...item, verification: "rejected", status: "rejected" } : item,
      ),
    );
    setSelectedNgo(null);
    toast.error(`${ngo.name} rejected`);
  };

  const suspendNgo = (ngo) => {
    setNgos((prev) =>
      prev.map((item) => (item.id === ngo.id ? { ...item, status: "suspended" } : item)),
    );
    setSelectedNgo((c) => (c?.id === ngo.id ? { ...c, status: "suspended" } : c));
    toast(`${ngo.name} suspended`, { icon: "⛔" });
  };

  const handleAction = (actionId, ngo) => {
    setOpenMenuId(null);
    switch (actionId) {
      case "view": openNgo(ngo); break;
      case "verify": verifyNgo(ngo); break;
      case "reject": rejectNgo(ngo); break;
      case "activate":
        setNgos((prev) => prev.map((item) => (item.id === ngo.id ? { ...item, status: "active" } : item)));
        toast.success(`${ngo.name} activated`);
        break;
      case "suspend": suspendNgo(ngo); break;
      case "email": window.location.href = `mailto:${ngo.email}`; break;
      case "delete":
        setNgos((prev) => prev.filter((item) => item.id !== ngo.id));
        setSelectedNgo(null);
        toast.error(`${ngo.name} removed`);
        break;
      default: break;
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
          <AdminPageHeader title="NGOs" description="Review, verify, and manage registered NGOs on NourishBridge." />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {STAT_CONFIG.map((stat) => {
              const trendData = ADMIN_NGO_STAT_TRENDS[stat.key];
              return (
                <AdminStatCardTrend
                  key={stat.key}
                  label={stat.label}
                  value={ADMIN_NGO_STATS[stat.key]}
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
              <h2 className="text-xl font-bold text-[#0F172A]">All NGOs</h2>
              <div className="flex flex-wrap items-end gap-2">
                <AdminSearchInput
                  value={filters.search}
                  onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                  onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                  onKeyDown={(e) => e.key === "Enter" && filtered[0] && openNgo(filtered[0])}
                  placeholder="Search for NGOs..."
                />
                <label className="min-w-[130px]">
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaUserCheck aria-hidden="true" /> Verification
                  </span>
                  <select value={filters.verification} onChange={(e) => setFilters((p) => ({ ...p, verification: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {VERIFICATION_FILTER_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
                <label className="min-w-[120px]">
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaMapMarkerAlt aria-hidden="true" /> City
                  </span>
                  <select value={filters.city} onChange={(e) => setFilters((p) => ({ ...p, city: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {CITY_FILTER_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
                <label className="min-w-[120px]">
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    <FaFilter aria-hidden="true" /> Status
                  </span>
                  <select value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {NGO_STATUS_FILTER_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </label>
                <button type="button" onClick={() => toast.success("NGO list exported")} className={ADMIN_SECONDARY_BTN}>
                  <FaDownload aria-hidden="true" /> Export
                </button>
                <button type="button" onClick={() => toast("Add NGO flow coming soon", { icon: "➕" })} className={ADMIN_PRIMARY_BTN}>
                  <FaPlus aria-hidden="true" /> Add NGO
                </button>
              </div>
            </div>
          </AdminInteractivePanel>

          <AdminInteractivePanel className="!p-0">
            <AdminTableShell
              isLoading={loading}
              isEmpty={filtered.length === 0}
              emptyMessage="No NGOs match these filters."
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
                  <th className={ADMIN_TH}>NGO ID</th>
                  <th className={ADMIN_TH}>NGO Name</th>
                  <th className={ADMIN_TH}>Contact Person</th>
                  <th className={ADMIN_TH}>City</th>
                  <th className={ADMIN_TH}>Verification</th>
                  <th className={ADMIN_TH}>Capacity</th>
                  <th className={ADMIN_TH}>Status</th>
                  <th className={ADMIN_TH}>Joined Date</th>
                  <th className={ADMIN_TH}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((ngo) => (
                  <AdminTableRow
                    key={ngo.id}
                    onClick={() => openNgo(ngo)}
                    selected={selectedNgo?.id === ngo.id}
                  >
                    <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{ngo.id}</td>
                    <td className={ADMIN_TD}>
                      <div className="flex items-center justify-center gap-2">
                        <AdminAvatar id={ngo.id} name={ngo.name} role="ngo" type="ngo" size="md" />
                        <div>
                          <p className="font-medium text-[#0F172A]">{ngo.name}</p>
                          {ngo.rating ? (
                            <p className="flex items-center gap-1 text-xs text-amber-600">
                              <FaStar aria-hidden="true" /> {ngo.rating}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className={ADMIN_TD}>{ngo.contactPerson}</td>
                    <td className={ADMIN_TD}>{ngo.city}</td>
                    <td className={ADMIN_TD}>
                      <StatusBadge status={ngo.verification} labels={NGO_VERIFICATION_LABELS} colors={NGO_VERIFICATION_COLORS} />
                    </td>
                    <td className={ADMIN_TD}>{ngo.capacity}</td>
                    <td className={ADMIN_TD}>
                      <StatusBadge status={ngo.status} labels={NGO_STATUS_LABELS} colors={NGO_STATUS_COLORS} />
                    </td>
                    <td className={ADMIN_TD}>{ngo.joinedDate}</td>
                    <td className={ADMIN_TD} onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <NgoActionsMenu
                          ngo={ngo}
                          isOpen={openMenuId === ngo.id}
                          onToggle={() => setOpenMenuId((c) => (c === ngo.id ? null : ngo.id))}
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

          <div>
            <h2 className="mb-4 text-lg font-bold tracking-tight text-[#0F172A]">Platform Overview</h2>
            <NgoPlatformSummaryCards items={NGO_PLATFORM_SUMMARY} />
          </div>

          <div className={ADMIN_ANALYTICS_GRID}>
            <AdminChartCard title="Monthly NGO Registrations">
              <NgoGrowthChart />
            </AdminChartCard>
            <AdminChartCard title="NGOs by City">
              <NgoCityChart />
            </AdminChartCard>
            <AdminChartCard title="Verification Status">
              <NgoVerificationChart />
            </AdminChartCard>
            <AdminChartCard title="Meals Served Trend">
              <MealsServedTrendChart />
            </AdminChartCard>
            <AdminChartCard title="Top NGOs by Meals Served">
              <TopNgosByMealsPanel />
            </AdminChartCard>
            <AdminChartCard title="Storage Capacity Utilization">
              <CapacityUtilizationChart />
            </AdminChartCard>
          </div>

          <div>
            <h2 className={`${ADMIN_SECTION_TITLE} mb-4`}>NGO Alerts</h2>
            <div className={ADMIN_ALERTS_GRID}>
              {NGO_ALERTS.map((alert) => (
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

      <AdminNgoDetailsDrawer
        ngo={selectedNgo}
        onClose={() => setSelectedNgo(null)}
        onVerify={verifyNgo}
        onReject={rejectNgo}
        onSuspend={suspendNgo}
        onEdit={(ngo) => toast(`Edit ${ngo.name}`, { icon: "✏️" })}
      />
    </>
  );
}
