import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaPlus } from "react-icons/fa";
import Button from "../../components/common/Button";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MyDonationsTable from "../../components/dashboard/MyDonationsTable";
import { dashboardButtonClass } from "../../components/dashboard/dashboardFormStyles";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

export default function MyDonations() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Active and historical donations"
      userName={donorName}
      actions={
        <Link to={DASHBOARD_ROUTES.donorCreate} className="inline-flex">
          <Button
            icon={FaPlus}
            className={`!h-16 !min-h-[64px] !px-10 !py-4 !text-lg ${dashboardButtonClass}`}
          >
            Add Donation
          </Button>
        </Link>
      }
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#16A34A]/8 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-8 left-1/3 h-32 w-32 rounded-full bg-[#BBF7D0]/40 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-[0.5cm] pl-[0.5cm] pt-[0.5cm] pr-[0.5cm] pb-[0.5cm] sm:pr-[0.75cm] sm:pb-[0.75cm]">
          <motion.header
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col gap-[0.5cm] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-[0.5cm] sm:items-center">
              <motion.span
                className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-none bg-gradient-to-br from-[#16A34A] to-[#15803D] text-white shadow-[0_8px_24px_rgba(22,163,74,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(22,163,74,0.45)]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.06, rotate: 2 }}
              >
                <FaBoxOpen
                  className="text-2xl transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </motion.span>
              <div className="flex flex-col gap-[0.5cm]">
                <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                  My Donations
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                  View active and completed donations. Filter by date or status to
                  find what you need quickly.
                </p>
              </div>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          >
            <MyDonationsTable />
          </motion.div>
        </div>
      </motion.section>
    </DashboardLayout>
  );
}
