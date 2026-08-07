import { motion } from "framer-motion";

/**
 * Consistent chart container — padding, radius, fade-in, print-safe.
 */
export default function ChartCard({
  title,
  subtitle,
  children,
  className = "",
  delay = 0,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className={`nb-chart-card nb-print-safe nb-animate-fade-in ${className}`.trim()}
    >
      {(title || subtitle) && (
        <header className="mb-6 flex flex-col gap-1">
          {title && (
            <h3 className="text-base font-bold tracking-tight text-[#0F172A]">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-[#64748B]">{subtitle}</p>
          )}
        </header>
      )}
      <div className="min-h-[200px] w-full [&_.recharts-wrapper]:mx-auto">{children}</div>
    </motion.section>
  );
}
