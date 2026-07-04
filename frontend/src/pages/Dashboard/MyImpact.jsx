import { motion } from "framer-motion";
import {
  FaChartBar,
  FaCloud,
  FaHandsHelping,
  FaInfoCircle,
  FaLeaf,
  FaMapMarkedAlt,
  FaRecycle,
  FaUtensils,
} from "react-icons/fa";
import ImpactOverviewPanel from "../../components/dashboard/ImpactOverviewPanel";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  IMPACT_METHODOLOGY_NOTE,
  IMPACT_SUMMARY,
} from "../../data/donorImpact";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const ACCENTS = {
  green: "border-[#DCFCE7] bg-[#F0FDF4] text-[#16A34A]",
  blue: "border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB]",
  amber: "border-[#FEF3C7] bg-[#FFFBEB] text-[#D97706]",
  slate: "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]",
};

function ImpactMetricCard({
  icon: Icon,
  value,
  label,
  hint,
  accent = "green",
  estimate = false,
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex min-h-[180px] flex-col items-center justify-center rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] text-center shadow-sm transition-shadow duration-300 hover:shadow-md sm:min-h-[200px]"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-none border sm:h-14 sm:w-14 ${ACCENTS[accent] ?? ACCENTS.green}`}
      >
        <Icon className="text-xl sm:text-2xl" aria-hidden="true" />
      </span>
      <p className="mt-[0.3cm] text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
        {value}
      </p>
      <p className="mt-[0.3cm] text-sm font-semibold text-[#64748B] sm:text-base">{label}</p>
      {hint ? (
        <p className="mt-[0.3cm] max-w-xs text-xs leading-5 text-[#94A3B8] sm:text-sm">{hint}</p>
      ) : null}
      {estimate ? (
        <span className="mt-[0.3cm] rounded-none bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#B45309]">
          Estimate
        </span>
      ) : null}
    </motion.div>
  );
}

export default function MyImpact() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);
  const summary = IMPACT_SUMMARY;

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Your community impact"
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
          <div className="relative flex items-start gap-[0.5cm] sm:items-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A]">
              <FaChartBar className="text-2xl" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-[0.5cm]">
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
                Your impact
              </p>
              <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                My Impact
              </h1>
              <p className="max-w-3xl text-base leading-7 text-[#64748B] sm:text-lg">
                See how your donations help reduce waste and support communities.
                Figures marked as estimates use simplified assumptions.
              </p>
            </div>
          </div>
        </div>

        <ImpactOverviewPanel />

        <div className="grid gap-[0.5cm] sm:grid-cols-2 xl:grid-cols-3">
          <ImpactMetricCard
            icon={FaUtensils}
            value={summary.mealsContributed.value.toLocaleString()}
            label={summary.mealsContributed.label}
            hint={summary.mealsContributed.note}
            accent="green"
          />
          <ImpactMetricCard
            icon={FaLeaf}
            value={`${summary.foodRescuedKg.value} kg`}
            label={summary.foodRescuedKg.label}
            hint={summary.foodRescuedKg.note}
            accent="green"
          />
          <ImpactMetricCard
            icon={FaHandsHelping}
            value={summary.ngosSupported.value}
            label={summary.ngosSupported.label}
            hint={summary.ngosSupported.note}
            accent="blue"
          />
        </div>

        <div className="grid gap-[0.5cm] sm:grid-cols-2 lg:grid-cols-3">
          <ImpactMetricCard
            icon={FaRecycle}
            value={summary.wasteReduction.value}
            label={`${summary.wasteReduction.label} (${summary.wasteReduction.unit})`}
            hint={summary.wasteReduction.note}
            accent="amber"
            estimate
          />
          <ImpactMetricCard
            icon={FaMapMarkedAlt}
            value={summary.communitiesReached.value}
            label={summary.communitiesReached.label}
            hint={summary.communitiesReached.note}
            accent="slate"
          />
          <ImpactMetricCard
            icon={FaCloud}
            value={summary.emissionsAvoided.value}
            label={`${summary.emissionsAvoided.label} (${summary.emissionsAvoided.unit})`}
            hint={summary.emissionsAvoided.note}
            accent="green"
            estimate
          />
        </div>

        <section className="relative py-[0.5cm]">
          <div
            className="pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-none bg-gradient-to-r from-[#F0FDF4]/80 via-[#ECFDF5]/60 to-[#F0FDF4]/80 blur-sm"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#16A34A]/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-6 top-0 h-20 w-20 rounded-full bg-[#BBF7D0]/40 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex items-start justify-between gap-[0.5cm]">
            <div className="flex min-w-0 flex-1 flex-col gap-[0.5cm]">
              <h2 className="text-right text-base font-bold text-[#15803D] sm:text-lg">
                Methodology note:
              </h2>
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">
                {IMPACT_METHODOLOGY_NOTE}
              </p>
            </div>
            <FaInfoCircle
              className="mt-1 shrink-0 text-3xl text-[#16A34A] sm:text-4xl"
              aria-hidden="true"
            />
          </div>
        </section>
      </motion.div>
    </DashboardLayout>
  );
}
