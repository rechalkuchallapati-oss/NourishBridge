import { motion } from "framer-motion";

import { FaTruck } from "react-icons/fa";

import ActiveDonationTracking from "../../components/dashboard/ActiveDonationTracking";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { ACTIVE_DONATIONS } from "../../data/donorDonations";

import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";



const EASE = [0.22, 1, 0.36, 1];



export default function ActiveDonations() {

  const user = getSessionUser();

  const donorName = getDonorDisplayName(user);



  return (

    <DashboardLayout

      emoji="🍱"

      title="Donor Dashboard"

      subtitle="Live active donation tracking"

      userName={donorName}

    >

      <motion.section

        initial={{ opacity: 0, y: 16 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5, ease: EASE }}

        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"

      >

        <div className="relative pl-[0.5cm] pt-[0.5cm] pr-[0.5cm] pb-[0.5cm] sm:pr-[0.75cm] sm:pb-[0.75cm]">

          <motion.header

            initial={{ opacity: 0, x: -12 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.5, ease: EASE }}

            className="mb-[0.5cm] flex items-start gap-[0.5cm] pl-[0.25cm] sm:items-center"

          >

            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-none bg-gradient-to-br from-[#16A34A] to-[#15803D] text-white shadow-[0_8px_24px_rgba(22,163,74,0.35)]">

              <FaTruck className="text-2xl" aria-hidden="true" />

            </span>

            <div>

              <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">

                Active Donations

              </h1>

              <p className="mt-[0.5cm] max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">

                Track live pickup and delivery progress for donations currently in motion.

              </p>

            </div>

          </motion.header>



          <ActiveDonationTracking donations={ACTIVE_DONATIONS} showSectionHeader={false} />

        </div>

      </motion.section>

    </DashboardLayout>

  );

}

