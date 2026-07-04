import { motion } from "framer-motion";
import { FaArrowRight, FaHistory, FaLeaf } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MyDonationsTable from "../../components/dashboard/MyDonationsTable";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

function FloatingLeaf({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaLeaf />
    </motion.div>
  );
}

function DriftingArrow({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ x: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaArrowRight />
    </motion.div>
  );
}

function HistoryBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_20%,#ECFDF3_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_75%,#F0FDF4_0%,transparent_50%)]" />
      <div className="absolute -left-16 top-[8%] h-40 w-40 rounded-full bg-[#BBF7D0]/35 blur-3xl" />
      <div className="absolute -right-12 top-[15%] h-44 w-44 rounded-full bg-[#16A34A]/10 blur-3xl" />
      <div className="absolute bottom-[10%] left-[30%] h-32 w-32 rounded-full bg-[#22C55E]/10 blur-2xl" />

      <FloatingLeaf
        className="absolute left-[6%] top-[18%] text-2xl text-[#16A34A]/20"
        delay={0}
      />
      <FloatingLeaf
        className="absolute left-[4%] bottom-[22%] rotate-[-20deg] text-xl text-[#22C55E]/18"
        delay={1.4}
      />
      <FloatingLeaf
        className="absolute right-[8%] top-[28%] rotate-[25deg] text-2xl text-[#16A34A]/18"
        delay={2.2}
      />
      <FloatingLeaf
        className="absolute right-[5%] bottom-[15%] rotate-[140deg] text-lg text-[#15803D]/15"
        delay={3.1}
      />

      <DriftingArrow
        className="absolute left-[14%] top-[52%] text-sm text-[#16A34A]/30"
        delay={0.5}
      />
      <DriftingArrow
        className="absolute right-[16%] top-[42%] -rotate-12 text-sm text-[#22C55E]/25"
        delay={1.8}
      />
      <DriftingArrow
        className="absolute left-[38%] bottom-[18%] rotate-45 text-xs text-[#15803D]/25"
        delay={2.6}
      />
    </div>
  );
}

export default function DonationHistory() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Completed donation records"
      userName={donorName}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative flex flex-col gap-[0.5cm] overflow-hidden bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white"
      >
        <HistoryBackground />

        <motion.header
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative flex items-start gap-[0.5cm] sm:items-center"
        >
          <motion.span
            className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A] transition-colors duration-300 hover:bg-[#16A34A]/25"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06, rotate: -3 }}
          >
            <FaHistory
              className="text-2xl transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          </motion.span>
          <div className="flex flex-col gap-[0.5cm]">
            <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
              Completed records
            </p>
            <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
              Donation History
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
              Browse completed donations and NGO-confirmed deliveries.
            </p>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          className="relative"
        >
          <MyDonationsTable view="history" />
        </motion.div>
      </motion.section>
    </DashboardLayout>
  );
}
