import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";
import { PROFILE_PERFORMANCE_METRICS } from "../../../data/volunteerProfileData";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import { volunteerInteractive, VOLUNTEER_CONTENT_STACK, VOLUNTEER_INSET_LINE_GAP } from "../volunteerDashboardStyles";

const ACCENT_STYLES = {
  green: "border-[#BBF7D0] bg-[#F0FDF4]",
  blue: "border-[#BFDBFE] bg-[#EFF6FF]",
  amber: "border-[#FDE68A] bg-[#FFFBEB]",
  purple: "border-[#DDD6FE] bg-[#F5F3FF]",
};

const VALUE_COLORS = {
  green: "text-[#15803D]",
  blue: "text-[#2563EB]",
  amber: "text-[#B45309]",
  purple: "text-[#7C3AED]",
};

export default function VolunteerPerformanceMetrics() {
  return (
    <VolunteerSectionShell>
      <VolunteerSectionTitle
        title="Performance Metrics"
        subtitle="Reliability indicators used for mission matching and NGO trust."
        theme="emerald"
        icon={FaChartLine}
        compact
      />

      <div className={`grid ${VOLUNTEER_CONTENT_STACK} sm:grid-cols-2`}>
        {PROFILE_PERFORMANCE_METRICS.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={[
              "rounded-none border p-[0.5cm]",
              ACCENT_STYLES[metric.accent] ?? ACCENT_STYLES.green,
              volunteerInteractive.card,
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-[0.5cm]">
              <p className="text-sm font-bold text-[#0F172A]">{metric.label}</p>
              <span
                className={[
                  "text-2xl font-extrabold tabular-nums",
                  VALUE_COLORS[metric.accent] ?? VALUE_COLORS.green,
                ].join(" ")}
              >
                {metric.displayValue}
              </span>
            </div>
            <p className={`${VOLUNTEER_INSET_LINE_GAP} text-sm leading-relaxed text-[#64748B]`}>
              {metric.description}
            </p>
          </motion.div>
        ))}
      </div>
    </VolunteerSectionShell>
  );
}
