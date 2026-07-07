import { motion } from "framer-motion";
import { IMPACT_HERO_STATS } from "../../../data/volunteerImpactPageData";
import { volunteerInteractive } from "../volunteerDashboardStyles";

const ACCENT_STYLES = {
  green: "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  amber: "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
  purple: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
};

export default function VolunteerImpactHeroStats() {
  return (
    <div className="mt-[0.5cm] grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {IMPACT_HERO_STATS.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          className={[
            "rounded-none border p-4",
            ACCENT_STYLES[stat.accent] ?? ACCENT_STYLES.green,
            volunteerInteractive.card,
          ].join(" ")}
        >
          <p className="text-[10px] font-bold uppercase tracking-wide opacity-80">{stat.label}</p>
          <p className="mt-2 text-2xl font-extrabold">{stat.displayValue}</p>
          <p className="mt-1 text-[10px] leading-relaxed opacity-90">{stat.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
