import { motion } from "framer-motion";
import { volunteerInteractive, VOLUNTEER_INSET_LINE_GAP } from "./volunteerDashboardStyles";

const ACCENT_STYLES = {
  green: {
    card: "border-[#BBF7D0] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]/40",
    label: "text-[#166534]",
    value: "text-[#15803D]",
    glow: "shadow-[0_4px_16px_rgba(22,163,74,0.12)]",
  },
  blue: {
    card: "border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]/40",
    label: "text-[#1D4ED8]",
    value: "text-[#2563EB]",
    glow: "shadow-[0_4px_16px_rgba(37,99,235,0.12)]",
  },
  amber: {
    card: "border-[#FDE68A] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/40",
    label: "text-[#B45309]",
    value: "text-[#D97706]",
    glow: "shadow-[0_4px_16px_rgba(217,119,6,0.12)]",
  },
  purple: {
    card: "border-[#DDD6FE] bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]/40",
    label: "text-[#6D28D9]",
    value: "text-[#7C3AED]",
    glow: "shadow-[0_4px_16px_rgba(124,58,237,0.12)]",
  },
  slate: {
    card: "border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]/40",
    label: "text-[#475569]",
    value: "text-[#334155]",
    glow: "shadow-[0_4px_16px_rgba(71,85,105,0.1)]",
  },
};

const METRIC_VALUE_CLASS =
  "text-2xl font-extrabold tabular-nums leading-none tracking-tight min-w-[4.5rem] text-right";

export default function VolunteerImpactMetricsGrid({
  metrics,
  columns = "sm:grid-cols-2",
  compact = false,
}) {
  return (
    <div className={`grid gap-[0.5cm] ${columns}`}>
      {metrics.map((metric, index) => {
        const accent = ACCENT_STYLES[metric.accent] ?? ACCENT_STYLES.green;

        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={[
              "relative overflow-hidden rounded-none border p-[0.5cm]",
              accent.card,
              accent.glow,
              volunteerInteractive.card,
            ].join(" ")}
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-white/30 blur-xl"
              animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            />

            <div className="relative flex items-center justify-between gap-[0.5cm]">
              <p
                className={[
                  "min-w-0 flex-1 font-bold leading-snug",
                  accent.label,
                  compact ? "text-xs" : "text-xs sm:text-sm",
                ].join(" ")}
              >
                {metric.label}
              </p>
              <span className={[METRIC_VALUE_CLASS, accent.value].join(" ")}>
                {metric.displayValue}
              </span>
            </div>

            {!compact ? (
              <p className={`${VOLUNTEER_INSET_LINE_GAP} text-[10px] leading-relaxed ${accent.label} opacity-80`}>
                {metric.description}
              </p>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
