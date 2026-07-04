import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLifeRing,
  FaPhone,
  FaQuestionCircle,
} from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const BOX_INSET = "pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm]";

const FAQ = [
  {
    q: "How do I reschedule a pickup?",
    a: "Open Scheduled Pickups and follow the rescheduling rules, or contact your assigned volunteer directly.",
  },
  {
    q: "What if my food won't be ready in time?",
    a: "Update the safe consumption deadline on your donation and notify the matched NGO immediately.",
  },
  {
    q: "How are impact numbers calculated?",
    a: "See the methodology note on My Impact — estimates use donor-reported quantities and conservative assumptions.",
  },
  {
    q: "How do I add a new pickup address?",
    a: "Go to My Profile, scroll to Saved pickup addresses, enter the address, and tap Add. It will be available when creating donations.",
  },
  {
    q: "Can I cancel a donation after posting?",
    a: "Yes, before a volunteer is assigned. Open Active Donations, contact support, or message the matched NGO if pickup is already scheduled.",
  },
  {
    q: "How will I know when a volunteer is on the way?",
    a: "You'll receive in-app notifications and can track live status under Active Donation Tracking on your dashboard.",
  },
  {
    q: "What food types can I donate?",
    a: "Prepared meals, fresh produce, baked goods, and packaged surplus food that meets NourishBridge safety guidelines are accepted.",
  },
];

export default function HelpSupport() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Help and support"
      userName={donorName}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative flex flex-col gap-[0.5cm] overflow-hidden bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-white"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#16A34A]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-8 left-1/4 h-36 w-36 rounded-full bg-[#22C55E]/10 blur-2xl"
          aria-hidden="true"
        />

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
            whileHover={{ scale: 1.06 }}
          >
            <FaLifeRing
              className="text-2xl transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          </motion.span>
          <div className="flex flex-col gap-[0.5cm]">
            <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
              We&apos;re here to help
            </p>
            <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
              Help & Support
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
              Quick answers and ways to reach the NourishBridge team.
            </p>
          </div>
        </motion.header>

        <section className={`relative grid gap-[0.5cm] sm:grid-cols-2 ${BOX_INSET}`}>
          <motion.a
            href="mailto:support@nourishbridge.org"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
            whileHover={{ y: -2 }}
            className="flex items-center gap-[0.5cm] rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm transition-all duration-300 hover:border-[#16A34A]/40 hover:shadow-md"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A]">
              <FaEnvelope className="text-xl" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-[0.5cm]">
              <p className="text-base font-bold text-[#15803D] sm:text-lg">Email support</p>
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">
                support@nourishbridge.org
              </p>
            </div>
          </motion.a>
          <motion.a
            href="tel:+911800000000"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            whileHover={{ y: -2 }}
            className="flex items-center gap-[0.5cm] rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm transition-all duration-300 hover:border-[#16A34A]/40 hover:shadow-md"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A]">
              <FaPhone className="text-xl" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-[0.5cm]">
              <p className="text-base font-bold text-[#15803D] sm:text-lg">Donor helpline</p>
              <p className="text-sm leading-7 text-[#64748B] sm:text-base">1800-000-000 (demo)</p>
            </div>
          </motion.a>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          className={`relative rounded-none border border-[#E5E7EB] bg-white shadow-sm ${BOX_INSET}`}
        >
          <div className="flex items-center gap-[0.5cm]">
            <FaQuestionCircle className="text-xl text-[#16A34A]" aria-hidden="true" />
            <h2 className="bg-gradient-to-r from-[#15803D] to-[#16A34A] bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl">
              Common questions
            </h2>
          </div>
          <div className="mt-[0.5cm] flex flex-col gap-[0.5cm]">
            {FAQ.map((item, index) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + index * 0.04, ease: EASE }}
                className="rounded-none border border-[#F1F5F9] bg-[#F8FAFC] p-[0.5cm] transition-colors duration-300 hover:border-[#BBF7D0] hover:bg-[#F0FDF4]"
              >
                <h3 className="text-base font-bold text-[#15803D] sm:text-lg">{item.q}</h3>
                <p className="mt-[0.5cm] text-sm leading-7 text-[#64748B] sm:text-base">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <p className="relative text-sm leading-7 text-[#64748B] sm:text-base">
          More help available on the{" "}
          <Link to="/contact" className="font-semibold text-[#16A34A] hover:underline">
            contact page
          </Link>
          .
        </p>
      </motion.section>
    </DashboardLayout>
  );
}
