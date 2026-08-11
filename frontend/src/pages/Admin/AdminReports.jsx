import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Building2,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  HandHeart,
  Leaf,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";
import AdminChartCard from "../../components/admin/AdminChartCard";
import {
  DonationsMealsLineChart,
  FoodSavedAreaChart,
  ReportsDonutChart,
} from "../../components/admin/reports/ReportsCharts";
import {
  ADMIN_PAGE_BG,
  ADMIN_PAGE_INNER,
  ADMIN_FILTER_INPUT,
  ADMIN_PRIMARY_BTN,
  ADMIN_SECONDARY_BTN,
  ADMIN_KPI_CARD,
  ADMIN_ANALYTICS_GRID,
  ADMIN_CHART_CARD,
  ADMIN_TABLE_HEAD,
  ADMIN_TD,
  ADMIN_TH,
} from "../../components/admin/adminStyles";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import {
  ALERTS_INSIGHTS,
  DONATIONS_BY_CATEGORY,
  DONATIONS_MEALS_TREND,
  DONATION_STATUS,
  DONOR_TYPES,
  DOWNLOAD_REPORTS,
  FOOD_SAVED_TREND,
  GEO_CITIES,
  IMPACT_DONUT,
  MONTHLY_COMPARISON,
  REPORTS_KPI,
  STATUS_SUMMARY,
  TOP_NGOS,
  VOLUNTEER_KPIS,
} from "../../data/adminReports";
import { fetchAdminReports, exportAdminReport } from "../../modules/admin/services/adminService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];

const KPI_ICONS = {
  donations: HandHeart,
  food_saved: Leaf,
  meals: Utensils,
  ngos: Building2,
  volunteers: Users,
  lives: TrendingUp,
};

function KpiCard({ item }) {
  const Icon = KPI_ICONS[item.id] ?? TrendingUp;
  return (
    <article className={[ADMIN_KPI_CARD, "min-w-[160px] flex-1"].join(" ")}>
      <div className="flex items-start justify-between gap-2">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: item.color }}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="flex items-center gap-0.5 text-xs font-semibold text-[#16A34A]">
          <TrendingUp size={12} aria-hidden="true" /> +{item.trend}%
        </span>
      </div>
      <p className="mt-3 text-2xl font-extrabold text-[#0F172A]">{item.value}</p>
      <p className="mt-1 text-xs font-semibold text-[#334155]">{item.label}</p>
      <p className="mt-1 text-[10px] text-[#94A3B8]">{item.compare}</p>
    </article>
  );
}

export default function AdminReports() {
  const [dateRange, setDateRange] = useState("last_30");
  const [exportOpen, setExportOpen] = useState(false);
  const [reports, setReports] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const days = dateRange === "last_7" ? 7 : dateRange === "last_90" ? 90 : 30;
    fetchAdminReports(days)
      .then((data) => {
        if (!cancelled) setReports(data);
      })
      .catch((err) => toast.error(getApiErrorMessage(err)));
    return () => {
      cancelled = true;
    };
  }, [dateRange]);

  const a = reports?.analytics;
  const kpis = a
    ? [
        { id: "donations", label: "Total Donations", value: a.totalDonations, change: `${a.completedDonations} completed` },
        { id: "food_saved", label: "Food Rescued (kg)", value: a.foodRescuedKg, change: "from MongoDB" },
        { id: "meals", label: "Meals Generated", value: a.mealsGenerated, change: `${a.foodRequestsFulfilled} requests fulfilled` },
        { id: "ngos", label: "NGOs Served", value: a.ngosServed, change: `${a.activeVolunteers} active volunteers` },
        { id: "deliveries", label: "Deliveries Completed", value: a.deliveriesCompleted, change: a.onTimeDeliveryRate != null ? `${a.onTimeDeliveryRate}% on-time` : "—" },
        { id: "impact", label: "Lives Impacted", value: a.livesImpacted, change: a.averageDeliveryTimeMinutes != null ? `Avg ${a.averageDeliveryTimeMinutes} min delivery` : "—" },
      ]
    : REPORTS_KPI;

  const handleExport = async (format) => {
    try {
      const type = format === "pdf" ? "impact" : "donations";
      const { blob, filename } = await exportAdminReport(type, format === "pdf" ? "pdf" : "csv");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Report exported");
      setExportOpen(false);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
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
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
                Reports & Analytics
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B] sm:text-base">
                Comprehensive insights into donations, food redistribution, volunteer performance,
                NGO impact, and platform growth.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative min-w-[160px]">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={`${ADMIN_FILTER_INPUT} h-[42px] pl-9`}>
                  <option value="last_7">Last 7 days</option>
                  <option value="last_30">Last 30 days</option>
                  <option value="last_90">Last 90 days</option>
                  <option value="ytd">Year to date</option>
                </select>
              </label>
              <button type="button" onClick={() => toast("Filters applied")} className={`${ADMIN_SECONDARY_BTN} h-[42px]`}>
                <Filter size={16} aria-hidden="true" /> Filter
              </button>
              <div className="relative">
                <button type="button" onClick={() => setExportOpen((o) => !o)} className={`${ADMIN_PRIMARY_BTN} h-[42px]`}>
                  <Download size={16} aria-hidden="true" /> Export Report <ChevronDown size={14} />
                </button>
                {exportOpen ? (
                  <div className="absolute right-0 z-20 mt-1 min-w-[180px] rounded-[12px] border border-[#E5E7EB] bg-white py-1 shadow-lg">
                    {[
                      { label: "PDF Summary", format: "pdf" },
                      { label: "Excel Data", format: "csv" },
                      { label: "CSV Export", format: "csv" },
                    ].map((opt) => (
                      <button key={opt.label} type="button" onClick={() => handleExport(opt.format)} className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC]">
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {kpis.map((item) => (
              <KpiCard key={item.id} item={item} />
            ))}
          </div>

          {/* Main charts + right sidebar */}
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="flex flex-col gap-10">
              <AdminChartCard title="Donations & Meals Trend">
                <p className="-mt-3 mb-5 text-xs text-[#64748B]">Daily donations vs meals delivered</p>
                <DonationsMealsLineChart data={DONATIONS_MEALS_TREND} />
              </AdminChartCard>
              <AdminChartCard title="Food Saved Over Time">
                <p className="-mt-3 mb-5 text-xs text-[#64748B]">Tons of food rescued from waste</p>
                <FoodSavedAreaChart data={FOOD_SAVED_TREND} />
              </AdminChartCard>
            </div>

            <aside className="flex flex-col gap-8">
              <AdminChartCard title="Impact Summary">
                <ReportsDonutChart
                  data={IMPACT_DONUT.segments}
                  centerValue={IMPACT_DONUT.total.toLocaleString()}
                  centerLabel="Total Lives Impacted"
                />
              </AdminChartCard>
              <article className={ADMIN_CHART_CARD}>
                <h3 className="text-base font-bold text-[#0F172A]">Top Performing NGOs</h3>
                <table className="mt-5 w-full text-xs">
                  <thead className={ADMIN_TABLE_HEAD}>
                    <tr>
                      <th className={ADMIN_TH}>NGO</th>
                      <th className={ADMIN_TH}>Meals</th>
                      <th className={ADMIN_TH}>Donations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_NGOS.map((ngo) => (
                      <tr key={ngo.name} className="border-b border-[#F1F5F9] last:border-0">
                        <td className={`${ADMIN_TD} font-medium text-[#0F172A]`}>{ngo.name}</td>
                        <td className={ADMIN_TD}>{ngo.meals}</td>
                        <td className={ADMIN_TD}>{ngo.donations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link to={DASHBOARD_ROUTES.adminNgos} className="mt-3 block text-center text-xs font-semibold text-[#16A34A] hover:underline">
                  View All NGOs →
                </Link>
              </article>
              <AdminChartCard title="Volunteer Performance">
                <div className="grid grid-cols-2 gap-2">
                  {VOLUNTEER_KPIS.map((kpi) => (
                    <div key={kpi.label} className="rounded-[12px] bg-[#F8FAFC] p-3">
                      <p className="text-lg font-bold text-[#0F172A]">{kpi.value}</p>
                      <p className="mt-0.5 text-[10px] font-medium text-[#64748B]">{kpi.label}</p>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => toast("Opening volunteer report…")} className={`${ADMIN_SECONDARY_BTN} mt-3 w-full justify-center text-xs`}>
                  View Volunteer Report
                </button>
              </AdminChartCard>
              <AdminChartCard title="Download Reports">
                <ul className="space-y-2">
                  {DOWNLOAD_REPORTS.map((r) => (
                    <li key={r.id}>
                      <button type="button" onClick={() => toast.success(`Downloading ${r.title}`)} className="flex w-full items-center justify-between rounded-[12px] border border-[#E5E7EB] p-3 text-left transition-colors hover:border-[#BBF7D0] hover:bg-[#F0FDF4]">
                        <span>
                          <span className="block text-sm font-semibold text-[#0F172A]">{r.title}</span>
                          <span className="text-[10px] text-[#64748B]">{r.format} · {r.size}</span>
                        </span>
                        <Download size={16} className="text-[#16A34A]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </AdminChartCard>
            </aside>
          </div>

          <div className={ADMIN_ANALYTICS_GRID}>
            <AdminChartCard title="Donations by Category">
              <ReportsDonutChart data={DONATIONS_BY_CATEGORY} />
            </AdminChartCard>
            <AdminChartCard title="Geographic Distribution">
              <p className="-mt-3 mb-5 text-xs text-[#64748B]">Top contributing cities in India</p>
              <div className="relative h-[160px] rounded-[14px] bg-gradient-to-br from-[#F0FDF4] to-[#EFF6FF]">
                {GEO_CITIES.map((c) => (
                  <span
                    key={c.city}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${c.lng}%`, top: `${c.lat}%`, transform: "translate(-50%,-50%)" }}
                  >
                    <span className="h-3 w-3 rounded-full bg-[#22C55E] ring-2 ring-white" />
                    <span className="mt-1 whitespace-nowrap text-[10px] font-bold text-[#0F172A]">{c.city}</span>
                    <span className="text-[9px] text-[#16A34A]">{c.share}%</span>
                  </span>
                ))}
              </div>
              <ul className="mt-4 space-y-2">
                {GEO_CITIES.map((c) => (
                  <li key={c.city} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#334155]">{c.city}</span>
                    <div className="mx-3 h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
                      <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${c.share}%` }} />
                    </div>
                    <span className="font-bold text-[#0F172A]">{c.share}%</span>
                  </li>
                ))}
              </ul>
            </AdminChartCard>
            <AdminChartCard title="Donations by Donor Type">
              <ReportsDonutChart data={DONOR_TYPES} />
            </AdminChartCard>
          </div>

          <AdminChartCard title="Monthly Comparison">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead className={ADMIN_TABLE_HEAD}>
                  <tr>
                    <th className={ADMIN_TH}>Metric</th>
                    <th className={ADMIN_TH}>Current Month</th>
                    <th className={ADMIN_TH}>Previous Month</th>
                    <th className={ADMIN_TH}>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {MONTHLY_COMPARISON.map((row) => (
                    <tr key={row.metric} className="border-b border-[#F1F5F9] last:border-0">
                      <td className={`${ADMIN_TD} font-semibold text-[#0F172A]`}>{row.metric}</td>
                      <td className={ADMIN_TD}>{row.current}</td>
                      <td className={ADMIN_TD}>{row.previous}</td>
                      <td className={ADMIN_TD}>
                        <span className="inline-flex items-center gap-1 font-semibold text-[#16A34A]">
                          <TrendingUp size={14} aria-hidden="true" /> +{row.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AdminChartCard>

          <div className="grid gap-10 lg:grid-cols-2">
            <AdminChartCard title="Donation Status Breakdown">
              <ReportsDonutChart data={DONATION_STATUS} />
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {STATUS_SUMMARY.map((s) => (
                  <div key={s.label} className="rounded-[12px] bg-[#F8FAFC] p-3 text-center">
                    <p className="text-sm font-bold text-[#0F172A]">{s.value}</p>
                    <p className="mt-0.5 text-[10px] text-[#64748B]">{s.label}</p>
                  </div>
                ))}
              </div>
            </AdminChartCard>
            <AdminChartCard title="Alerts & Insights">
              <ul className="space-y-3">
                {ALERTS_INSIGHTS.map((alert) => (
                  <li key={alert.id} className={`rounded-[14px] border p-4 ${alert.color} transition-transform hover:-translate-y-0.5`}>
                    <p className="text-lg">{alert.emoji}</p>
                    <p className="mt-1 text-sm font-bold text-[#0F172A]">{alert.title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#64748B]">{alert.description}</p>
                    <button type="button" onClick={() => toast(alert.action)} className="mt-2 text-xs font-semibold text-[#16A34A] hover:underline">
                      {alert.action} →
                    </button>
                  </li>
                ))}
              </ul>
            </AdminChartCard>
          </div>
        </div>
      </motion.section>
    </>
  );
}
