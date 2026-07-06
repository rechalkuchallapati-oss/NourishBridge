import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaChartBar,
  FaClock,
  FaLeaf,
  FaTruck,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import NGOCategoryBarChart from "../../components/ngo/NGOCategoryBarChart";
import NGOMonthlyMealsChart from "../../components/ngo/NGOMonthlyMealsChart";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import {
  NGO_IMPACT_KPIS,
  TOP_DONOR_ORGANIZATIONS,
} from "../../data/ngoImpactAnalytics";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const KPI_ICONS = {
  donations: FaBoxOpen,
  food_saved: FaLeaf,
  meals: FaUtensils,
  people: FaUsers,
  deliveries: FaTruck,
  rejection_rate: FaChartBar,
  avg_delivery: FaClock,
};

export default function NGOImpactAnalytics() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  return (
    <NGOLayout organizationName={orgName} unreadNotifications={5}>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaChartBar}
            title="Impact Analytics"
            description="Your NGO's contribution — donations received, food rescued, meals distributed, and operational performance."
          />

          <div className="grid gap-[0.5cm] sm:grid-cols-2 xl:grid-cols-3">
            {NGO_IMPACT_KPIS.map((kpi, index) => (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.03 * index, ease: EASE }}
              >
                <NGOStatCard
                  label={kpi.label}
                  value={kpi.value}
                  icon={KPI_ICONS[kpi.id]}
                  accent={kpi.accent}
                />
              </motion.div>
            ))}
          </div>

          <div className="grid gap-[0.5cm] lg:grid-cols-2">
            <NGOMonthlyMealsChart />
            <NGOCategoryBarChart />
          </div>

          <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
            <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">
              Top Donor Organizations
            </h2>
            <p className="mt-[0.3cm] text-sm text-[#64748B]">
              Organizations contributing the most food to your NGO.
            </p>
            <ul className="mt-[0.5cm] flex flex-col gap-[0.5cm]">
              {TOP_DONOR_ORGANIZATIONS.map((donor, index) => (
                <li
                  key={donor.name}
                  className="flex items-center justify-between gap-4 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-none bg-[#2563EB] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-[#0F172A]">{donor.name}</span>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-[#2563EB]">{donor.kg} kg</p>
                    <p className="text-[#64748B]">{donor.donations} donations</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </motion.section>
    </NGOLayout>
  );
}
