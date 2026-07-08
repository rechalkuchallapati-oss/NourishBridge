import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowDown,
  FaArrowUp,
  FaDownload,
  FaFileAlt,
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaLeaf,
  FaLightbulb,
  FaPrint,
  FaTruck,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import ReportCategoryPieChart from "../../components/ngo/ReportCategoryPieChart";
import ReportDistributionBarChart from "../../components/ngo/ReportDistributionBarChart";
import ReportFoodRescueTrendChart from "../../components/ngo/ReportFoodRescueTrendChart";
import ReportVolunteerLeaderboard from "../../components/ngo/ReportVolunteerLeaderboard";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import {
  ANALYTICS_PERIODS,
  AUTO_INSIGHTS,
  DATE_RANGE_OPTIONS,
  DISTRIBUTION_TYPE_OPTIONS,
  DONOR_FILTER_OPTIONS,
  FOOD_CATEGORY_FILTER_OPTIONS,
  INSIGHT_HIGHLIGHTS,
  LOCATION_FILTER_OPTIONS,
  MONTHLY_IMPACT,
  NGO_FILTER_OPTIONS,
  RECENT_REPORTS,
  REPORT_OVERVIEW_STATS,
  VOLUNTEER_FILTER_OPTIONS,
  filterRecentReports,
} from "../../data/ngoReports";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  {
    key: "mealsDistributed",
    label: "Meals Distributed",
    caption: "Total meals served",
    accent: "green",
    icon: FaUtensils,
  },
  {
    key: "foodRescued",
    label: "Food Rescued",
    caption: "Weight saved from waste",
    accent: "blue",
    icon: FaLeaf,
  },
  {
    key: "communitiesServed",
    label: "Communities Served",
    caption: "Active service areas",
    accent: "slate",
    icon: FaUsers,
  },
  {
    key: "volunteersActive",
    label: "Volunteers Active",
    caption: "Active this period",
    accent: "purple",
    icon: FaUsers,
  },
  {
    key: "successfulDeliveries",
    label: "Successful Deliveries",
    caption: "Completed without issues",
    accent: "blue",
    icon: FaTruck,
  },
  {
    key: "foodWastePrevented",
    label: "Food Waste Prevented",
    caption: "Estimated diversion",
    accent: "green",
    icon: FaLeaf,
  },
];

const FILTER_SELECT_CLASS =
  "w-full rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#2563EB]/30 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20";

const EXPORT_ACTIONS = [
  { id: "pdf", label: "Download PDF", icon: FaFilePdf, accent: "text-red-600 border-red-100 bg-red-50 hover:bg-red-100" },
  { id: "excel", label: "Export Excel", icon: FaFileExcel, accent: "text-green-700 border-green-100 bg-green-50 hover:bg-green-100" },
  { id: "csv", label: "CSV", icon: FaFileCsv, accent: "text-blue-700 border-blue-100 bg-blue-50 hover:bg-blue-100" },
  { id: "print", label: "Print Report", icon: FaPrint, accent: "text-slate-700 border-slate-200 bg-slate-50 hover:bg-slate-100" },
];

function SidePanel({ period, onExport, monthlyImpact }) {
  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Export Reports</h2>
        <div className="mt-[0.5cm] flex flex-col gap-2">
          {EXPORT_ACTIONS.map(({ id, label, icon: Icon, accent }) => (
            <button
              key={id}
              type="button"
              onClick={() => onExport(id)}
              className={`flex items-center justify-center gap-2 rounded-none border px-4 py-2.5 text-sm font-semibold transition-colors ${accent}`}
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-none border border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#2563EB]">Monthly Impact</h2>
        <dl className="mt-[0.5cm] grid grid-cols-2 gap-3">
          <div>
            <dt className="text-xs text-[#64748B]">Meals Served</dt>
            <dd className="text-lg font-bold text-[#0F172A]">{monthlyImpact.mealsServed}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#64748B]">Food Rescued</dt>
            <dd className="text-lg font-bold text-[#0F172A]">{monthlyImpact.foodRescued}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#64748B]">Communities Reached</dt>
            <dd className="text-lg font-bold text-[#0F172A]">{monthlyImpact.communitiesReached}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#64748B]">Beneficiaries</dt>
            <dd className="text-lg font-bold text-[#0F172A]">{monthlyImpact.beneficiaries}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-[#64748B]">
          Snapshot for{" "}
          {period === "monthly" ? "July 2026" : ANALYTICS_PERIODS.find((p) => p.id === period)?.label}.
        </p>
      </div>
    </aside>
  );
}

export default function NGOReports() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const [period, setPeriod] = useState("monthly");
  const [filters, setFilters] = useState({
    dateRange: "this_month",
    volunteer: "all",
    ngo: "current",
    donor: "all",
    foodCategory: "all",
    location: "all",
    distributionType: "all",
  });

  const filteredReports = useMemo(
    () =>
      filterRecentReports(RECENT_REPORTS, {
        period: period === "today" || period === "weekly" ? period : "all",
      }),
    [period],
  );

  const handleExport = (format) => {
    const labels = { pdf: "PDF", excel: "Excel", csv: "CSV", print: "Print" };
    if (format === "print") {
      window.print();
      toast.success("Opening print dialog…");
      return;
    }
    toast.success(`${labels[format]} export started for ${ANALYTICS_PERIODS.find((p) => p.id === period)?.label ?? "report"}`);
  };

  const handleDownloadReport = (report) => {
    toast.success(`Downloading ${report.name} (${report.type})`);
  };

  return (
    <NGOLayout organizationName={orgName}>
      <Toaster position="top-center" />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaFileAlt}
            title="Reports"
            description="Analytics and reporting center — analyze performance, track impact, and generate downloadable summaries."
          />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Dashboard Statistics
            </p>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {STAT_CONFIG.map((stat) => (
                <NGOStatCard
                  key={stat.key}
                  label={stat.label}
                  value={REPORT_OVERVIEW_STATS[stat.key]}
                  caption={stat.caption}
                  icon={stat.icon}
                  accent={stat.accent}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Analytics Cards
            </p>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {ANALYTICS_PERIODS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setPeriod(card.id)}
                  className={[
                    "rounded-none border p-4 text-left transition-all",
                    period === card.id
                      ? "border-[#2563EB] bg-[#EFF6FF] shadow-sm"
                      : "border-[#E5E7EB] bg-white hover:border-[#2563EB]/30",
                  ].join(" ")}
                >
                  <p className="text-sm font-bold text-[#0F172A]">{card.label}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-[#94A3B8]">Meals</dt>
                      <dd className="font-bold text-[#2563EB]">{card.meals.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-[#94A3B8]">Rescued</dt>
                      <dd className="font-bold text-[#16A34A]">{card.rescuedKg} kg</dd>
                    </div>
                    <div>
                      <dt className="text-[#94A3B8]">Deliveries</dt>
                      <dd className="font-bold text-[#0F172A]">{card.deliveries}</dd>
                    </div>
                    <div>
                      <dt className="text-[#94A3B8]">Volunteers</dt>
                      <dd className="font-bold text-[#0F172A]">{card.volunteers}</dd>
                    </div>
                  </dl>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="flex min-w-0 flex-col gap-[0.5cm]">
              <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
                <p className="mb-[0.5cm] text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Report Filters
                </p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    { key: "dateRange", label: "Date Range", options: DATE_RANGE_OPTIONS },
                    { key: "volunteer", label: "Volunteer", options: VOLUNTEER_FILTER_OPTIONS },
                    { key: "ngo", label: "NGO", options: NGO_FILTER_OPTIONS },
                    { key: "donor", label: "Donor", options: DONOR_FILTER_OPTIONS },
                    { key: "foodCategory", label: "Food Category", options: FOOD_CATEGORY_FILTER_OPTIONS },
                    { key: "location", label: "Location", options: LOCATION_FILTER_OPTIONS },
                    { key: "distributionType", label: "Distribution Type", options: DISTRIBUTION_TYPE_OPTIONS },
                  ].map(({ key, label, options }) => (
                    <label key={key} className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                        {label}
                      </span>
                      <select
                        value={filters[key]}
                        onChange={(e) =>
                          setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        className={FILTER_SELECT_CLASS}
                      >
                        {options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Charts
                </p>
                <div className="grid gap-[0.5cm] lg:grid-cols-2">
                  <ReportFoodRescueTrendChart />
                  <ReportCategoryPieChart />
                  <ReportDistributionBarChart />
                  <ReportVolunteerLeaderboard />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Recent Reports
                </p>
                <div className="overflow-x-auto rounded-none border border-[#E5E7EB] bg-white shadow-sm">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      <tr>
                        <th className="px-4 py-3">Report Name</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report) => (
                        <tr
                          key={report.id}
                          className="border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]"
                        >
                          <td className="px-4 py-3 font-semibold text-[#0F172A]">{report.name}</td>
                          <td className="px-4 py-3 text-[#64748B]">{report.date}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-2 py-0.5 text-xs font-semibold text-[#64748B]">
                              {report.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => handleDownloadReport(report)}
                              className="inline-flex items-center gap-1.5 rounded-none border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#2563EB] transition-colors hover:border-[#2563EB]/30 hover:bg-[#EFF6FF]"
                            >
                              <FaDownload aria-hidden="true" />
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
                <div className="flex items-center gap-2">
                  <FaLightbulb className="text-lg text-amber-500" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-[#0F172A]">Insights</h2>
                </div>
                <p className="mt-1 text-sm text-[#64748B]">
                  Automatically generated insights from your latest data.
                </p>

                <ul className="mt-[0.5cm] flex flex-col gap-2">
                  {AUTO_INSIGHTS.map((insight) => (
                    <li
                      key={insight.id}
                      className="flex items-start gap-2 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5 text-sm"
                    >
                      {insight.direction === "up" ? (
                        <FaArrowUp className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
                      ) : (
                        <FaArrowDown className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                      )}
                      <span className="font-medium text-[#0F172A]">{insight.text}</span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-[0.5cm] grid gap-3 sm:grid-cols-3">
                  <div className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      Highest demand area
                    </dt>
                    <dd className="mt-1 text-base font-bold text-[#2563EB]">
                      {INSIGHT_HIGHLIGHTS.highestDemandArea}
                    </dd>
                  </div>
                  <div className="rounded-none border border-[#DCFCE7] bg-[#F0FDF4] p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      Most donated food
                    </dt>
                    <dd className="mt-1 text-base font-bold text-[#16A34A]">
                      {INSIGHT_HIGHLIGHTS.mostDonatedFood}
                    </dd>
                  </div>
                  <div className="rounded-none border border-[#EDE9FE] bg-[#F5F3FF] p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                      Best performing volunteer
                    </dt>
                    <dd className="mt-1 text-base font-bold text-[#6D28D9]">
                      {INSIGHT_HIGHLIGHTS.bestPerformingVolunteer}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>

            <SidePanel period={period} onExport={handleExport} monthlyImpact={MONTHLY_IMPACT} />
          </div>

          <NGOWorkflowStrip
            title="Reporting Workflow"
            steps={[
              "Collect Data",
              "Apply Filters",
              "Review Analytics",
              "Generate Insights",
              "Export Report",
              "Share with Stakeholders",
            ]}
          />
        </div>
      </motion.section>
    </NGOLayout>
  );
}
