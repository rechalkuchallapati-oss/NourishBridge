import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaFileAlt } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ImpactMonthlyTrendChart from "../../components/dashboard/ImpactMonthlyTrendChart";
import { IMPACT_SUMMARY } from "../../data/donorImpact";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const SUMMARY_ITEMS = [
  {
    value: IMPACT_SUMMARY.mealsContributed.value.toLocaleString(),
    label: "meals contributed",
  },
  {
    value: `${IMPACT_SUMMARY.foodRescuedKg.value} kg`,
    label: "food rescued",
  },
  {
    value: String(IMPACT_SUMMARY.ngosSupported.value),
    label: "NGOs supported",
  },
  {
    value: String(IMPACT_SUMMARY.communitiesReached.value),
    label: "communities reached",
  },
];

function SummaryStatButton({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * index, ease: EASE }}
      whileHover={{ y: -2 }}
      className="flex min-h-[64px] items-center justify-center rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-4 text-center shadow-sm transition-all duration-300 hover:border-[#16A34A]/40 hover:bg-[#F0FDF4] hover:shadow-md sm:min-h-[72px]"
    >
      <p className="text-base font-semibold leading-snug text-[#0F172A] sm:text-lg">
        <span className="font-bold text-[#15803D]">{value}</span>{" "}
        <span className="text-[#64748B]">{label}</span>
      </p>
    </motion.div>
  );
}

export default function ImpactReports() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Impact reporting"
      userName={donorName}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col gap-[0.5cm]"
      >
        <div className="relative flex flex-col gap-[0.5cm] overflow-hidden rounded-none bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white p-[0.5cm]">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#16A34A]/10 blur-3xl"
            aria-hidden="true"
          />
          <Link
            to={DASHBOARD_ROUTES.donorImpact}
            className="relative inline-flex w-fit items-center gap-2 text-sm font-medium text-[#64748B] transition-colors hover:text-[#16A34A]"
          >
            <FaArrowLeft aria-hidden="true" />
            Back to My Impact
          </Link>
          <div className="relative flex items-start gap-[0.5cm] sm:items-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A]">
              <FaFileAlt className="text-2xl" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-[0.5cm]">
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
                Full report
              </p>
              <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                Impact Reports
              </h1>
              <p className="max-w-3xl text-base leading-7 text-[#64748B] sm:text-lg">
                Detailed trends and summaries for sharing with stakeholders. PDF export
                coming after MVP.
              </p>
            </div>
          </div>
        </div>

        <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-[#15803D] sm:text-xl">Latest summary</h2>
          <dl className="mt-[1cm] grid gap-[0.5cm] sm:grid-cols-2">
            {SUMMARY_ITEMS.map((item, index) => (
              <SummaryStatButton
                key={item.label}
                value={item.value}
                label={item.label}
                index={index}
              />
            ))}
          </dl>
          <p className="mt-[0.5cm] text-xs leading-5 text-[#94A3B8] sm:text-sm">
            Estimates in this report follow the same methodology as My Impact and are
            not audited metrics.
          </p>
        </section>

        <ImpactMonthlyTrendChart />
      </motion.div>
    </DashboardLayout>
  );
}
