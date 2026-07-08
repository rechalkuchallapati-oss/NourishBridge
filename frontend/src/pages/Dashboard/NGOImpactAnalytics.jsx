import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBuilding,
  FaChartBar,
  FaDownload,
  FaFileExcel,
  FaFilePdf,
  FaGlobeAmericas,
  FaLeaf,
  FaPrint,
  FaStar,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import ImpactBeneficiaryBarChart from "../../components/ngo/ImpactBeneficiaryBarChart";
import ImpactCommunityMapVisual from "../../components/ngo/ImpactCommunityMapVisual";
import ImpactFoodRescueDonutChart from "../../components/ngo/ImpactFoodRescueDonutChart";
import ImpactMonthlyLineChart from "../../components/ngo/ImpactMonthlyLineChart";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOWorkflowStrip from "../../components/ngo/NGOWorkflowStrip";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import { getVolunteerAvatar } from "../../data/volunteerAssets";
import {
  ENVIRONMENTAL_IMPACT,
  IMPACT_TIMELINE,
  IMPACT_TOP_STATS,
  SUCCESS_STORIES,
  TOP_PERFORMING_DONORS,
  TOP_VOLUNTEERS,
} from "../../data/ngoImpactAnalytics";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const STAT_CONFIG = [
  { key: "mealsDistributed", label: "Meals Distributed", caption: "Total meals served", accent: "green", icon: FaUtensils },
  { key: "foodRescued", label: "Food Rescued", caption: "Weight saved from waste", accent: "green", icon: FaLeaf },
  { key: "beneficiariesServed", label: "Beneficiaries Served", caption: "People reached", accent: "blue", icon: FaUsers },
  { key: "communitiesReached", label: "Communities Reached", caption: "Active service areas", accent: "slate", icon: FaGlobeAmericas },
  { key: "activeVolunteers", label: "Active Volunteers", caption: "On platform", accent: "purple", icon: FaUsers },
  { key: "partnerDonors", label: "Partner Donors", caption: "Contributing organizations", accent: "amber", icon: FaBuilding },
];

const EXPORT_ACTIONS = [
  { id: "pdf", label: "Download PDF", icon: FaFilePdf },
  { id: "excel", label: "Export Excel", icon: FaFileExcel },
  { id: "print", label: "Print Report", icon: FaPrint },
];

function SidePanel({ onExport }) {
  return (
    <aside className="flex flex-col gap-[0.5cm] lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Environmental Impact</h2>
        <dl className="mt-[0.5cm] flex flex-col gap-3">
          <div className="rounded-none border border-[#DCFCE7] bg-[#F0FDF4] p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Food Waste Prevented
            </dt>
            <dd className="mt-1 text-xl font-bold text-[#16A34A]">
              {ENVIRONMENTAL_IMPACT.foodWastePrevented}
            </dd>
          </div>
          <div className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Estimated CO₂ Reduction
            </dt>
            <dd className="mt-1 text-xl font-bold text-[#2563EB]">
              {ENVIRONMENTAL_IMPACT.co2Reduction}
            </dd>
          </div>
          <div className="rounded-none border border-[#E0E7FF] bg-[#EEF2FF] p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Water Saved</dt>
            <dd className="mt-1 text-xl font-bold text-[#4F46E5]">
              {ENVIRONMENTAL_IMPACT.waterSaved}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Download Reports</h2>
        <div className="mt-[0.5cm] flex flex-col gap-2">
          {EXPORT_ACTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onExport(id)}
              className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB]/30 hover:bg-[#EFF6FF]"
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          ))}
          <Link
            to={DASHBOARD_ROUTES.ngoReports}
            className="flex items-center justify-center gap-2 rounded-none border border-[#DBEAFE] bg-[#EFF6FF] px-4 py-2.5 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#DBEAFE]"
          >
            <FaDownload aria-hidden="true" />
            View All Reports
          </Link>
        </div>
      </div>

      <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Recent Success Stories</h2>
        <ul className="mt-[0.5cm] flex flex-col gap-2">
          {SUCCESS_STORIES.map((story) => (
            <li
              key={story.id}
              className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-[#0F172A]">{story.title}</p>
                <span className="text-sm font-bold text-[#16A34A]">{story.meals} Meals</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-[#64748B]">{story.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default function NGOImpactAnalytics() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  const handleExport = (format) => {
    if (format === "print") {
      window.print();
      toast.success("Opening print dialog…");
      return;
    }
    toast.success(`${format === "pdf" ? "PDF" : "Excel"} export started`);
  };

  return (
    <NGOLayout organizationName={orgName}>
      <Toaster position="top-center" />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaChartBar}
            title="Impact"
            description="What impact has our NGO created using NourishBridge? Measurable outcomes across meals, rescue, communities, and volunteers."
          />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Top Statistics
            </p>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {STAT_CONFIG.map((stat) => (
                <NGOStatCard
                  key={stat.key}
                  label={stat.label}
                  value={IMPACT_TOP_STATS[stat.key]}
                  caption={stat.caption}
                  icon={stat.icon}
                  accent={stat.accent}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="flex min-w-0 flex-col gap-[0.5cm]">
              <div className="grid gap-[0.5cm] lg:grid-cols-2">
                <ImpactMonthlyLineChart />
                <ImpactFoodRescueDonutChart />
                <ImpactBeneficiaryBarChart />
                <ImpactCommunityMapVisual />
              </div>

              <div className="grid gap-[0.5cm] lg:grid-cols-2">
                <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
                  <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Top Performing Donors</h2>
                  <p className="mt-[0.3cm] text-sm text-[#64748B]">
                    Organizations contributing the most meals.
                  </p>
                  <div className="mt-[0.5cm] overflow-x-auto">
                    <table className="w-full min-w-[360px] text-left text-sm">
                      <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                        <tr>
                          <th className="px-3 py-2">Donor</th>
                          <th className="px-3 py-2">Meals Donated</th>
                          <th className="px-3 py-2">Total Donations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TOP_PERFORMING_DONORS.map((donor, index) => (
                          <tr
                            key={donor.name}
                            className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F8FAFC]"
                          >
                            <td className="px-3 py-2.5">
                              <div className="flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-none bg-[#2563EB] text-xs font-bold text-white">
                                  {index + 1}
                                </span>
                                <span className="font-semibold text-[#0F172A]">{donor.name}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 font-semibold text-[#16A34A]">
                              {donor.mealsDonated.toLocaleString()}
                            </td>
                            <td className="px-3 py-2.5 text-[#64748B]">{donor.totalDonations}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
                  <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Top Volunteers</h2>
                  <p className="mt-[0.3cm] text-sm text-[#64748B]">Highest impact volunteers on platform.</p>
                  <ul className="mt-[0.5cm] flex flex-col gap-3">
                    {TOP_VOLUNTEERS.map((vol) => (
                      <li
                        key={vol.id}
                        className="flex items-center gap-3 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-3"
                      >
                        <img
                          src={getVolunteerAvatar(vol.avatarKey)}
                          alt=""
                          className="h-12 w-12 rounded-none object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-[#0F172A]">{vol.name}</p>
                          <p className="text-xs text-[#64748B]">
                            {vol.missions} Missions · {vol.meals.toLocaleString()} Meals
                          </p>
                          <div className="mt-1 flex gap-0.5 text-amber-500">
                            {Array.from({ length: vol.rating }).map((_, i) => (
                              <FaStar key={i} className="text-xs" aria-hidden="true" />
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
                <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Impact Timeline</h2>
                <p className="mt-[0.3cm] text-sm text-[#64748B]">Monthly meals distributed over the year.</p>
                <div className="mt-[0.5cm] flex gap-3 overflow-x-auto pb-2">
                  {IMPACT_TIMELINE.map((entry) => (
                    <div
                      key={entry.month}
                      className="flex min-w-[120px] shrink-0 flex-col rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-3"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                        {entry.month}
                      </p>
                      <p className="mt-2 text-xl font-bold text-[#16A34A]">
                        {entry.meals.toLocaleString()}
                      </p>
                      <p className="text-xs text-[#94A3B8]">Meals</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <SidePanel onExport={handleExport} />
          </div>

          <NGOWorkflowStrip
            title="Impact Journey"
            steps={[
              "Receive Donations",
              "Rescue Food",
              "Distribute Meals",
              "Serve Beneficiaries",
              "Measure Outcomes",
              "Report Impact",
            ]}
          />
        </div>
      </motion.section>
    </NGOLayout>
  );
}
