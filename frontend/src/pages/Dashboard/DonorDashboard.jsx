import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaHandsHelping,
  FaHistory,
  FaLeaf,
  FaPlus,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import Button from "../../components/common/Button";
import DashboardLayout, { StatCard } from "../../components/dashboard/DashboardLayout";
import ActiveDonationTracking from "../../components/dashboard/ActiveDonationTracking";
import DonatedFoodGallery from "../../components/dashboard/DonatedFoodGallery";
import { dashboardButtonClass } from "../../components/dashboard/dashboardFormStyles";
import { ACTIVE_DONATIONS, ALL_DONATIONS } from "../../data/donorDonations";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

const DASHBOARD_BTN_CLASS = [
  dashboardButtonClass,
  "!h-16 !min-h-[64px] !w-full !px-6 !py-4 !text-base !gap-3 !justify-center sm:!text-lg",
].join(" ");

const overviewStats = {
  totalDonations: 24,
  mealsContributed: 1860,
  foodRescuedKg: 742,
  ngosHelped: 9,
  activeDonations: 3,
  completedDonations: 21,
};

function DashboardNavBox({ to, icon: Icon, title, description, accent = "green", index = 0 }) {
  const accents = {
    green: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A] hover:border-[#16A34A]/50 hover:bg-[#ECFDF5]",
    slate: "border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] hover:border-[#CBD5E1] hover:bg-white",
    primary: "border-[#16A34A] bg-[#16A34A] text-white hover:bg-[#15803D] hover:border-[#15803D]",
  };

  const isPrimary = accent === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 + index * 0.05, ease: EASE }}
      whileHover={{ y: -3 }}
      className="flex-1"
    >
      <Link
        to={to}
        className={[
          "flex h-full min-h-[140px] flex-col items-center justify-center gap-[0.3cm] rounded-none border p-[0.5cm] text-center shadow-sm transition-all duration-300 hover:shadow-md",
          accents[accent] ?? accents.green,
        ].join(" ")}
      >
        <Icon className="text-2xl sm:text-3xl" aria-hidden="true" />
        <span
          className={`text-base font-bold sm:text-lg ${isPrimary ? "text-white" : "text-[#0F172A]"}`}
        >
          {title}
        </span>
        {description ? (
          <span
            className={`text-xs leading-5 sm:text-sm ${isPrimary ? "text-[#ECFDF3]" : "text-[#64748B]"}`}
          >
            {description}
          </span>
        ) : null}
      </Link>
    </motion.div>
  );
}

export default function DonorDashboard() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);

  const addDonationCta = (
    <Link to={DASHBOARD_ROUTES.donorCreate} className="inline-flex w-full sm:w-auto">
      <Button icon={FaPlus} className={DASHBOARD_BTN_CLASS}>
        Add Donation
      </Button>
    </Link>
  );

  return (
    <DashboardLayout actions={addDonationCta} unreadNotifications={3}>
      <div className="flex flex-col gap-[0.5cm]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="overflow-hidden rounded-none border border-[#E5E7EB] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
        >
          <div className="relative bg-gradient-to-r from-[#16A34A] to-[#15803D] px-6 py-8 sm:px-8 sm:py-10">
            <div
              className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-none bg-white/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-[0.5cm] lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-[0.5cm]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#DCFCE7]">
                  Dashboard Overview
                </p>
                <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Welcome back, {donorName}!
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[#ECFDF3] sm:text-lg">
                  Thank you for helping reduce food waste and nourishing communities.
                  Ready to share surplus food with verified NGOs nearby?
                </p>
              </div>
              <div className="hidden shrink-0 lg:block">{addDonationCta}</div>
            </div>
          </div>

          <div className="grid gap-[0.5cm] p-[0.5cm] sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Total Donations"
              value={overviewStats.totalDonations}
              caption="All donations listed"
              icon={FaBoxOpen}
              accent="green"
            />
            <StatCard
              label="Meals Contributed"
              value={overviewStats.mealsContributed.toLocaleString()}
              caption="Estimated meals delivered"
              icon={FaUtensils}
              accent="purple"
            />
            <StatCard
              label="Food Rescued"
              value={`${overviewStats.foodRescuedKg} kg`}
              caption="Kept out of landfills"
              icon={FaLeaf}
              accent="green"
            />
            <StatCard
              label="NGOs Helped"
              value={overviewStats.ngosHelped}
              caption="Verified partners supported"
              icon={FaHandsHelping}
              accent="blue"
            />
            <StatCard
              label="Active Donations"
              value={overviewStats.activeDonations}
              caption="Pickups in progress"
              icon={FaBoxOpen}
              accent="amber"
            />
            <StatCard
              label="Completed Donations"
              value={overviewStats.completedDonations}
              caption="Successfully delivered"
              icon={FaCheckCircle}
              accent="slate"
            />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
        >
          <DonatedFoodGallery donations={ALL_DONATIONS} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
        >
          <ActiveDonationTracking donations={ACTIVE_DONATIONS} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="relative overflow-hidden rounded-none border border-[#BBF7D0] bg-gradient-to-br from-[#F0FDF4] via-[#ECFDF5] to-white p-[0.5cm] shadow-[0_8px_30px_rgba(22,163,74,0.08)]"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#16A34A]/10 blur-2xl"
            aria-hidden="true"
          />
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col gap-[0.5cm]"
          >
            <div className="flex flex-col gap-[0.5cm] text-center sm:text-left">
              <h2 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl">
                Start your next donation
              </h2>
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">
                List surplus food in minutes and we&apos;ll match you with nearby NGOs.
              </p>
            </div>

            <div className="grid gap-[0.5cm] sm:grid-cols-3">
              <DashboardNavBox
                to={DASHBOARD_ROUTES.donorHistory}
                icon={FaHistory}
                title="Donation history"
                description="View completed donations"
                accent="slate"
                index={0}
              />
              <DashboardNavBox
                to={DASHBOARD_ROUTES.donorProfile}
                icon={FaUser}
                title="Profile"
                description="Update your details"
                accent="green"
                index={1}
              />
              <DashboardNavBox
                to={DASHBOARD_ROUTES.donorCreate}
                icon={FaPlus}
                title="Add Donation"
                description="List surplus food now"
                accent="primary"
                index={2}
              />
            </div>
          </motion.div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
