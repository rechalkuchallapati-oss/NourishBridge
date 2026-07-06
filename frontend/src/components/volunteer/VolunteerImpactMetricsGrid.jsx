import { motion } from "framer-motion";
import { volunteerInteractive } from "./volunteerDashboardStyles";

const ACCENT_STYLES = {
  green: "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  amber: "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
  purple: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
  slate: "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]",
};

export default function VolunteerImpactMetricsGrid({
  metrics,
  columns = "sm:grid-cols-2",
  compact = false,
}) {
  return (
    <div className={`grid gap-2 ${columns}`}>
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          whileHover={{ scale: 1.02 }}
          className={[
            "rounded-none border p-3",
            ACCENT_STYLES[metric.accent] ?? ACCENT_STYLES.green,
            volunteerInteractive.card,
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-2">
            <p className={`font-bold ${compact ? "text-xs" : "text-xs sm:text-sm"}`}>
              {metric.label}
            </p>
            <span className={`font-extrabold ${compact ? "text-base" : "text-lg"}`}>
              {metric.displayValue}
            </span>
          </div>
          {!compact ? (
            <p className="mt-1 text-[10px] leading-4 opacity-90">{metric.description}</p>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
