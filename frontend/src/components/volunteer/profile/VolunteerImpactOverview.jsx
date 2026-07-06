import { motion } from "framer-motion";
import { PROFILE_IMPACT_OVERVIEW } from "../../../data/volunteerProfileData";
import { volunteerInteractive } from "../volunteerDashboardStyles";

const ACCENT_STYLES = {
  green: "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  amber: "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
  purple: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
};

export default function VolunteerImpactOverview() {
  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Impact Overview</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">
        Your cumulative contribution across all completed rescue missions.
      </p>

      <div className="mt-[0.5cm] grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {PROFILE_IMPACT_OVERVIEW.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={[
              "rounded-none border p-4",
              ACCENT_STYLES[item.accent] ?? ACCENT_STYLES.green,
              volunteerInteractive.card,
            ].join(" ")}
          >
            <p className="text-[10px] font-bold uppercase tracking-wide opacity-80">{item.label}</p>
            <p className="mt-2 text-2xl font-extrabold">{item.displayValue}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
