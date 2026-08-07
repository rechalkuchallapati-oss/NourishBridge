import { motion } from "framer-motion";
import { CHART_CARD } from "../../styles/designTokens";

const EASE = [0.22, 1, 0.36, 1];

export default function AdminChartCard({ title, children, className = "", delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE, delay }}
      className={[CHART_CARD, "nb-chart-card nb-print-safe", className].join(" ")}
    >
      {title ? <h3 className="text-sm font-bold text-[#0F172A]">{title}</h3> : null}
      <div className={title ? "mt-6" : ""}>{children}</div>
    </motion.article>
  );
}
