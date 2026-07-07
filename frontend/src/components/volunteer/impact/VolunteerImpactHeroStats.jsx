import { motion } from "framer-motion";
import { IMPACT_HERO_STATS } from "../../../data/volunteerImpactPageData";
import { volunteerInteractive, VOLUNTEER_CONTENT_STACK } from "../volunteerDashboardStyles";

const ACCENT_STYLES = {
  green: "border-[#BBF7D0] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]/50 text-[#15803D]",
  blue: "border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]/50 text-[#2563EB]",
  amber: "border-[#FDE68A] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/50 text-[#B45309]",
  purple: "border-[#DDD6FE] bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]/50 text-[#7C3AED]",
};

export default function VolunteerImpactHeroStats() {
  return (
    <div className={`grid ${VOLUNTEER_CONTENT_STACK} sm:grid-cols-2 xl:grid-cols-4`}>
      {IMPACT_HERO_STATS.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          whileHover={{ scale: 1.03, y: -3 }}
          className={[
            "rounded-none border p-[0.5cm]",
            ACCENT_STYLES[stat.accent] ?? ACCENT_STYLES.green,
            volunteerInteractive.card,
          ].join(" ")}
        >
          <p className="text-xs font-bold uppercase tracking-wide opacity-80">{stat.label}</p>
          <p className="mt-[0.5cm] text-2xl font-extrabold tabular-nums">{stat.displayValue}</p>
          <p className="mt-[0.5cm] text-xs leading-relaxed opacity-90">{stat.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
