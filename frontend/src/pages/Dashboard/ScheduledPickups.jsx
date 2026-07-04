import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaSyncAlt,
  FaUser,
} from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  PICKUP_STATUS_COLORS,
  RESCHEDULING_RULES,
  SCHEDULED_PICKUPS,
} from "../../data/donorPickups";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const BOX_INSET = "pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm]";

function InfoBlock({ icon: Icon, label, children }) {
  return (
    <div className={`flex flex-col gap-[0.5cm] rounded-none border border-[#E5E7EB] bg-[#F8FAFC] ${BOX_INSET}`}>
      <div className="flex items-center gap-[0.5cm]">
        <Icon className="shrink-0 text-lg text-[#16A34A]" aria-hidden="true" />
        <p className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8] sm:text-base">
          {label}
        </p>
      </div>
      <div className="flex flex-col gap-[0.5cm] pl-[0.25cm]">{children}</div>
    </div>
  );
}

function PickupCard({ pickup, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.06 * index, ease: EASE }}
      whileHover={{ y: -2 }}
      className="overflow-hidden rounded-none border border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)]"
    >
      <div
        className={`flex flex-col gap-[0.5cm] border-b border-[#E5E7EB] bg-[#F8FAFC] sm:flex-row sm:items-center sm:justify-between ${BOX_INSET}`}
      >
        <div className="flex flex-col gap-[0.5cm] pl-[0.25cm]">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8] sm:text-base">
            {pickup.id} · {pickup.donationId}
          </p>
          <h3 className="text-xl font-bold leading-tight text-[#0F172A] sm:text-2xl">
            {pickup.food}
          </h3>
        </div>
        <span
          className={`inline-flex min-h-[48px] min-w-[140px] shrink-0 items-center justify-center self-start rounded-none px-6 py-3 text-center text-sm font-semibold sm:self-center sm:text-base ${PICKUP_STATUS_COLORS[pickup.status] ?? PICKUP_STATUS_COLORS.scheduled}`}
        >
          {pickup.statusLabel}
        </span>
      </div>

      <div className={`grid gap-[0.5cm] lg:grid-cols-2 ${BOX_INSET}`}>
        <div className="flex flex-col gap-[0.5cm]">
          <InfoBlock icon={FaCalendarAlt} label="Pickup date & time">
            <p className="text-base font-semibold leading-7 text-[#0F172A] sm:text-lg">
              {pickup.pickupDate} at {pickup.pickupTime}
            </p>
            <p className="text-sm leading-6 text-[#64748B] sm:text-base">
              Window: {pickup.pickupWindow}
            </p>
          </InfoBlock>

          <InfoBlock icon={FaMapMarkerAlt} label="Pickup address">
            <p className="text-sm leading-7 text-[#0F172A] sm:text-base">
              {pickup.pickupAddress}
            </p>
          </InfoBlock>

          <InfoBlock icon={FaUser} label="Volunteer assignment">
            <p className="text-base font-semibold text-[#0F172A] sm:text-lg">
              {pickup.volunteer}
            </p>
            <p className="text-sm leading-6 text-[#64748B] sm:text-base">
              NGO: {pickup.ngo}
            </p>
            {pickup.volunteerPhone ? (
              <a
                href={`tel:${pickup.volunteerPhone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-[0.5cm] text-sm font-semibold text-[#16A34A] transition-colors hover:text-[#15803D] hover:underline sm:text-base"
              >
                <FaPhone aria-hidden="true" />
                {pickup.volunteerPhone}
              </a>
            ) : (
              <p className="text-sm leading-6 text-[#94A3B8] sm:text-base">
                Contact details available once a volunteer is assigned.
              </p>
            )}
          </InfoBlock>
        </div>

        <div className={`flex flex-col gap-[0.5cm] rounded-none border border-[#E5E7EB] bg-white ${BOX_INSET}`}>
          <div className="flex items-center gap-[0.5cm] pl-[0.25cm]">
            <FaClipboardList className="shrink-0 text-lg text-[#16A34A]" aria-hidden="true" />
            <p className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8] sm:text-base">
              Contact workflow
            </p>
          </div>
          <ol className="flex flex-col gap-[0.5cm] pl-[0.25cm]">
            {pickup.contactWorkflow.map((item, stepIndex) => (
              <li key={item.step} className="flex items-center gap-[0.5cm]">
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-none text-xs font-bold",
                    item.done
                      ? "bg-[#16A34A] text-white"
                      : "border-2 border-[#E2E8F0] bg-white text-[#94A3B8]",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {item.done ? "✓" : stepIndex + 1}
                </span>
                <span
                  className={
                    item.done
                      ? "text-base font-semibold text-[#0F172A] sm:text-lg"
                      : "text-sm text-[#64748B] sm:text-base"
                  }
                >
                  {item.step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.article>
  );
}

export default function ScheduledPickups() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Upcoming scheduled pickups"
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
        <div
          className="pointer-events-none absolute left-[10%] top-[40%] h-28 w-28 rounded-full bg-[#BBF7D0]/40 blur-2xl"
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
            <FaCalendarAlt
              className="text-2xl transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          </motion.span>
          <div className="flex flex-col gap-[0.5cm]">
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
                Pickup schedule
              </p>
              <h1 className="bg-gradient-to-r from-[#15803D] via-[#16A34A] to-[#22C55E] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                Scheduled Pickups
              </h1>
              <p className="max-w-3xl text-base leading-7 text-[#64748B] sm:text-lg">
                Track upcoming collections, volunteer contact steps, and pickup status
                in one place.
              </p>
          </div>
        </motion.header>

        <div className="relative flex flex-col gap-[0.5cm]">
            {SCHEDULED_PICKUPS.map((pickup, index) => (
              <PickupCard key={pickup.id} pickup={pickup} index={index} />
            ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="relative flex flex-col gap-[0.5cm] bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] py-[0.5cm]"
        >
          <div className="flex items-start gap-[0.5cm]">
            <motion.span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaSyncAlt className="text-xl" aria-hidden="true" />
            </motion.span>
              <div className="flex min-w-0 flex-1 flex-col gap-[0.5cm]">
                <div className="flex flex-col gap-[0.5cm]">
                  <div className="flex items-center gap-[0.5cm]">
                    <FaClock className="shrink-0 text-[#16A34A]" aria-hidden="true" />
                    <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">
                      Rescheduling rules
                    </h2>
                  </div>
                  <p className="text-sm leading-6 text-[#15803D] sm:text-base">
                    Please follow these guidelines when changing a pickup time.
                  </p>
                </div>
                <ul className="flex flex-col gap-[0.5cm]">
                  {RESCHEDULING_RULES.map((rule, ruleIndex) => (
                    <motion.li
                      key={rule}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.2 + ruleIndex * 0.05, ease: EASE }}
                      className="flex items-start gap-[0.5cm] text-sm leading-7 text-[#166534] sm:text-base"
                    >
                      <span
                        className="mt-[0.15cm] flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-[#DCFCE7] text-xs font-bold text-[#15803D]"
                        aria-hidden="true"
                      >
                        {ruleIndex + 1}
                      </span>
                      {rule}
                    </motion.li>
                  ))}
                </ul>
            </div>
          </div>
        </motion.section>
      </motion.section>
    </DashboardLayout>
  );
}
