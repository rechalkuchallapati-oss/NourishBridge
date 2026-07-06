import { motion } from "framer-motion";
import {
  MONTHLY_DELIVERY_SUMMARY,
  WEEKLY_DELIVERY_TREND,
} from "../../data/volunteerPerformance";

export default function VolunteerPerformanceChart({ compact = false }) {
  const maxDeliveries = Math.max(...WEEKLY_DELIVERY_TREND.map((d) => d.deliveries));
  const maxScore = 100;
  const chartHeight = compact ? 120 : 160;

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A]">
            {compact ? "Delivery Performance" : "Deliveries & Performance"}
          </h2>
          <p className="mt-[0.3cm] text-[10px] text-[#64748B]">
            Weekly deliveries (bars) and on-time performance score (line).
          </p>
        </div>
        {!compact ? (
          <div className="flex gap-[0.5cm] text-[10px]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#15803D]">
              <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-[#15803D] to-[#4ADE80]" />
              Deliveries
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#2563EB]">
              <span className="h-0.5 w-4 bg-[#2563EB]" />
              Score %
            </span>
          </div>
        ) : null}
      </div>

      <div
        className="relative mt-[0.5cm]"
        style={{ height: chartHeight }}
        role="img"
        aria-label="Weekly deliveries and performance score chart"
      >
        <svg
          viewBox="0 0 400 160"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={160 - y * 1.4}
              x2="400"
              y2={160 - y * 1.4}
              stroke="#F1F5F9"
              strokeWidth="1"
            />
          ))}

          {/* Delivery bars */}
          {WEEKLY_DELIVERY_TREND.map((point, index) => {
            const barWidth = 400 / WEEKLY_DELIVERY_TREND.length - 8;
            const x = index * (400 / WEEKLY_DELIVERY_TREND.length) + 4;
            const barHeight = (point.deliveries / maxDeliveries) * 120;
            return (
              <rect
                key={`bar-${point.week}`}
                x={x}
                y={160 - barHeight - 20}
                width={barWidth}
                height={barHeight}
                rx="2"
                fill="url(#deliveryGradient)"
                opacity="0.9"
              />
            );
          })}

          {/* Performance line */}
          <polyline
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={WEEKLY_DELIVERY_TREND.map((point, index) => {
              const x =
                index * (400 / WEEKLY_DELIVERY_TREND.length) +
                400 / WEEKLY_DELIVERY_TREND.length / 2;
              const y = 160 - (point.performanceScore / maxScore) * 120 - 20;
              return `${x},${y}`;
            }).join(" ")}
          />

          {/* Performance dots */}
          {WEEKLY_DELIVERY_TREND.map((point, index) => {
            const x =
              index * (400 / WEEKLY_DELIVERY_TREND.length) +
              400 / WEEKLY_DELIVERY_TREND.length / 2;
            const y = 160 - (point.performanceScore / maxScore) * 120 - 20;
            return (
              <circle
                key={`dot-${point.week}`}
                cx={x}
                cy={y}
                r="4"
                fill="#2563EB"
                stroke="#fff"
                strokeWidth="1.5"
              />
            );
          })}

          <defs>
            <linearGradient id="deliveryGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mt-[0.5cm] flex justify-between gap-1 text-[9px] font-semibold text-[#94A3B8]">
        {WEEKLY_DELIVERY_TREND.map((point) => (
          <span key={point.week} className="flex-1 text-center">
            {point.week.replace(" ", "\u00a0")}
          </span>
        ))}
      </div>

      {!compact ? (
        <div className="mt-[0.5cm] grid gap-[0.5cm] border-t border-[#F1F5F9] pt-[0.5cm] sm:grid-cols-3">
          <Stat label="Total deliveries" value={MONTHLY_DELIVERY_SUMMARY.totalDeliveries} />
          <Stat
            label="Avg. performance"
            value={`${MONTHLY_DELIVERY_SUMMARY.avgPerformanceScore}%`}
          />
          <Stat
            label="Best week"
            value={`${MONTHLY_DELIVERY_SUMMARY.bestWeekDeliveries} (${MONTHLY_DELIVERY_SUMMARY.bestWeek})`}
          />
        </div>
      ) : null}
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.4cm]"
    >
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#94A3B8]">
        {label}
      </p>
      <p className="mt-[0.2cm] text-sm font-bold text-[#0F172A]">{value}</p>
    </motion.div>
  );
}
