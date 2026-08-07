import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowDown,
  ArrowUp,
  Building2,
  Download,
  Filter,
  HandHeart,
  Medal,
  Plus,
  RefreshCw,
  Repeat,
  Users,
  X,
} from "lucide-react";
import AdminInteractivePanel from "../../components/admin/AdminInteractivePanel";
import AdminChartCard from "../../components/admin/AdminChartCard";
import AdminSearchInput from "../../components/admin/AdminSearchInput";
import AdminTableShell, { AdminTableRow, AdminTableSpacerRows } from "../../components/admin/AdminTableShell";
import DonorActionsMenu from "../../components/admin/donors/DonorActionsMenu";
import DonorDetailsDrawer from "../../components/admin/donors/DonorDetailsDrawer";
import {
  DonorGrowthChart,
  DonorTierLegend,
  DonorTypeChart,
  FrequentDonorsAwards,
  MealsContributedChart,
  TopDonorsBarChart,
  WeeklyDonationsChart,
} from "../../components/admin/donors/DonorCharts";
import {
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
  ADMIN_TD_NUM,
  ADMIN_TH,
  ADMIN_TH_SORT,
  ADMIN_FILTER_INPUT,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "../../components/admin/adminStyles";
import {
  ADMIN_DONORS,
  CITY_OPTIONS,
  DONOR_ALERTS,
  DONOR_KPI,
  DONOR_TYPE_LABELS,
  DONOR_TYPE_OPTIONS,
  STATUS_COLORS,
  STATUS_LABELS,
  STATUS_OPTIONS,
  TIER_OPTIONS,
  filterDonors,
  getDonorTier,
  sortDonors,
} from "../../data/adminDonors";

const EASE = [0.22, 1, 0.36, 1];
const COL_SPAN = 12;
const KPI_ICONS = {
  total: Users,
  active: HandHeart,
  recurring: Repeat,
  new: Plus,
  meals: HandHeart,
  verified: Medal,
  avg: Building2,
  retention: Users,
};

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

function TierBadge({ donations }) {
  const tier = getDonorTier(donations);
  return (
    <span className={`inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${tier.color}`}>
      <span>{tier.emoji}</span>
      {tier.label}
    </span>
  );
}

export default function AdminDonors() {
  const [donors] = useState(ADMIN_DONORS);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [sortKey, setSortKey] = useState("donations");
  const [sortDir, setSortDir] = useState("desc");
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    city: "all",
    status: "all",
    tier: "all",
    recurring: "all",
  });

  const filtered = useMemo(
    () => sortDonors(filterDonors(donors, filters), sortKey, sortDir),
    [donors, filters, sortKey, sortDir],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  useEffect(() => setCurrentPage(1), [filters, pageSize]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const openDrawer = (donor) => {
    setSelected(donor);
    setDrawerOpen(true);
  };

  const handleAction = (actionId, donor) => {
    setOpenMenuId(null);
    if (actionId === "view") openDrawer(donor);
    else toast.success(`${actionId.replace(/_/g, " ")} — ${donor.name}`);
  };

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const clearFilters = () =>
    setFilters({ search: "", type: "all", city: "all", status: "all", tier: "all", recurring: "all" });

  return (
    <>
      <Toaster position="top-center" />
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className={ADMIN_PAGE_BG}>
        <div className={ADMIN_PAGE_INNER}>
          <div className="flex flex-col gap-4 pt-[1cm] xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">Donors Management</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                Overview of food donors — restaurants, hotels, corporates, and individuals. Track contributions, award tiers, and engagement.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => toast("Filter panel")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}>
                <Filter size={16} /> Filter
              </button>
              <button type="button" onClick={() => toast.success("Exported")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}>
                <Download size={16} /> Export
              </button>
              <button type="button" onClick={() => toast("Add donor form")} className={`${ADMIN_PRIMARY_BTN} h-[42px]`}>
                <Plus size={16} /> Add Donor
              </button>
              <button type="button" onClick={() => toast.success("Refreshed")} className={`${ADMIN_SECONDARY_BTN} h-[42px] px-3`}>
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {DONOR_KPI.map((item) => (
              <KpiCard key={item.id} item={item} />
            ))}
          </div>

          <AdminInteractivePanel className="!p-5">
            <div className="flex flex-wrap items-end gap-3">
              <AdminSearchInput
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                onClear={() => setFilters((p) => ({ ...p, search: "" }))}
                placeholder="Search for donors..."
              />
              {[
                { key: "type", options: DONOR_TYPE_OPTIONS },
                { key: "city", options: CITY_OPTIONS },
                { key: "status", options: STATUS_OPTIONS },
                { key: "tier", options: TIER_OPTIONS },
                {
                  key: "recurring",
                  options: [
                    { id: "all", label: "All Recurring" },
                    { id: "yes", label: "Recurring" },
                    { id: "no", label: "One-time" },
                  ],
                },
              ].map(({ key, options }) => (
                <label key={key} className="min-w-[140px]">
                  <select value={filters[key]} onChange={(e) => setFilters((p) => ({ ...p, [key]: e.target.value }))} className={ADMIN_FILTER_INPUT}>
                    {options.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
              <button type="button" onClick={clearFilters} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}>
                <X size={14} /> Clear Filters
              </button>
            </div>
          </AdminInteractivePanel>

          <AdminInteractivePanel className="!p-0">
            <AdminTableShell
              isEmpty={filtered.length === 0}
              emptyMessage="No donors match these filters."
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={pageSize}
              pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              minRows={8}
            >
              <thead className={ADMIN_TABLE_HEAD}>
                <tr>
                  {[
                    ["id", "Donor ID"],
                    ["name", "Donor"],
                    ["type", "Type"],
                    ["city", "City"],
                    ["donations", "Donations"],
                    ["mealsContributed", "Meals"],
                    ["tier", "Award Tier"],
                    ["recurring", "Recurring"],
                    ["status", "Status"],
                    ["lastDonation", "Last Donation"],
                    ["joined", "Joined"],
                  ].map(([key, label]) => (
                    <th key={key} className={ADMIN_TH}>
                      <button type="button" onClick={() => toggleSort(key === "tier" ? "donations" : key)} className={ADMIN_TH_SORT}>
                        {label}
                      </button>
                    </th>
                  ))}
                  <th className={ADMIN_TH}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((donor) => (
                  <AdminTableRow key={donor.id} onClick={() => openDrawer(donor)}>
                    <td className={`${ADMIN_TD} font-semibold text-[#15803D]`}>{donor.id}</td>
                    <td className={ADMIN_TD}>
                      <div className="flex items-center justify-center gap-2">
                        <img src={donor.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full border border-[#E5E7EB] object-cover" />
                        <span className="font-medium text-[#0F172A]">{donor.name}</span>
                      </div>
                    </td>
                    <td className={`${ADMIN_TD} text-xs`}>{DONOR_TYPE_LABELS[donor.type]}</td>
                    <td className={`${ADMIN_TD} text-xs capitalize`}>{donor.city}</td>
                    <td className={ADMIN_TD_NUM}>{donor.donations}</td>
                    <td className={ADMIN_TD_NUM}>{donor.mealsContributed.toLocaleString()}</td>
                    <td className={ADMIN_TD}>
                      <TierBadge donations={donor.donations} />
                    </td>
                    <td className={ADMIN_TD}>{donor.recurring ? "Yes" : "No"}</td>
                    <td className={ADMIN_TD}>
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${STATUS_COLORS[donor.status]}`}>
                        {STATUS_LABELS[donor.status]}
                      </span>
                    </td>
                    <td className={`${ADMIN_TD} text-xs`}>{donor.lastDonation}</td>
                    <td className={`${ADMIN_TD} text-xs`}>{donor.joined}</td>
                    <td className={ADMIN_TD} onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <DonorActionsMenu
                          donor={donor}
                          isOpen={openMenuId === donor.id}
                          onToggle={() => setOpenMenuId((c) => (c === donor.id ? null : donor.id))}
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

          <div className="grid gap-6 lg:grid-cols-2">
            <AdminChartCard title="Most Frequent Donors — Awards" subtitle="Gold, Silver, Bronze & Platinum tiers">
              <FrequentDonorsAwards />
            </AdminChartCard>
            <AdminChartCard title="Award Tier Guide" subtitle="Donation milestones for donor recognition">
              <DonorTierLegend />
            </AdminChartCard>
          </div>

          <div className={ADMIN_ANALYTICS_GRID}>
            <AdminChartCard title="Monthly Donor Growth">
              <DonorGrowthChart />
            </AdminChartCard>
            <AdminChartCard title="Donor Type Distribution">
              <DonorTypeChart />
            </AdminChartCard>
            <AdminChartCard title="Weekly Donations">
              <WeeklyDonationsChart />
            </AdminChartCard>
            <AdminChartCard title="Meals Contributed">
              <MealsContributedChart />
            </AdminChartCard>
            <AdminChartCard title="Top Donors by Volume" className="lg:col-span-2 xl:col-span-2">
              <TopDonorsBarChart />
            </AdminChartCard>
          </div>

          <div>
            <h2 className={`${ADMIN_SECTION_TITLE} mb-4`}>Donor Alerts</h2>
            <div className={ADMIN_ALERTS_GRID}>
              {DONOR_ALERTS.map((alert) => (
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

      <DonorDetailsDrawer donor={selected} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onAction={handleAction} />
    </>
  );
}
