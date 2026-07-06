import { motion } from "framer-motion";
import { PROFILE_PERFORMANCE_METRICS } from "../../../data/volunteerProfileData";
import { volunteerInteractive } from "../volunteerDashboardStyles";

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
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Performance Metrics</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">
        Reliability indicators used for mission matching and NGO trust.
      </p>

      <div className="mt-[0.5cm] grid gap-2 sm:grid-cols-2">
        {PROFILE_PERFORMANCE_METRICS.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={[
              "rounded-none border p-4",
              ACCENT_STYLES[metric.accent] ?? ACCENT_STYLES.green,
              volunteerInteractive.card,
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold text-[#0F172A]">{metric.label}</p>
              <span
                className={[
                  "text-xl font-extrabold",
                  VALUE_COLORS[metric.accent] ?? VALUE_COLORS.green,
                ].join(" ")}
              >
                {metric.displayValue}
              </span>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-[#64748B]">{metric.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
