import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaUtensils,
  FaBuilding,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const stats = [
  {
    icon: FaUtensils,
    value: 25000,
    suffix: "+",
    label: "Meals Delivered",
    format: (n) => n.toLocaleString(),
  },
  {
    icon: FaBuilding,
    value: 350,
    suffix: "+",
    label: "Verified NGOs",
    format: (n) => n.toLocaleString(),
  },
  {
    icon: FaUsers,
    value: 1200,
    suffix: "+",
    label: "Volunteers",
    format: (n) => n.toLocaleString(),
  },
  {
    icon: FaCheckCircle,
    value: 98,
    suffix: "%",
    label: "Successful Deliveries",
    format: (n) => String(n),
  },
];

function useCountUp(target, isActive, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isActive, target, duration]);

  return count;
}

function StatRow({ stat, index, isActive, compact }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, isActive, 1600 + index * 150);

  return (
    <motion.div
      className="flex items-center gap-2.5 sm:gap-3"
      initial={{ opacity: 0, y: 12 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F8EF] shadow-[0_0_16px_rgba(22,163,74,0.12)] ring-1 ring-[#16A34A]/10 sm:h-9 sm:w-9">
        <Icon className="text-xs text-[#16A34A] sm:text-sm" />
      </div>
      <div className="min-w-0">
        <p
          className={[
            "font-bold tabular-nums tracking-tight text-[#0F172A]",
            compact ? "text-base sm:text-lg" : "text-xl sm:text-2xl",
          ].join(" ")}
        >
          {stat.format(count)}
          {stat.suffix}
        </p>
        <p className="text-[10px] font-medium leading-tight text-[#64748B] sm:text-xs">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function RealImpactPanel({ compact = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[#22C55E]/10 blur-2xl"
        aria-hidden="true"
      />

      <motion.div
        className={[
          "relative flex w-full flex-col justify-center overflow-hidden rounded-xl border border-white/70 bg-white/50 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:rounded-2xl",
          compact ? "p-3 sm:p-5 md:p-6" : "p-6 sm:p-8",
        ].join(" ")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -4 : 0,
          boxShadow: isHovered
            ? "0 20px 48px rgba(22,163,74,0.1)"
            : "0 12px 40px rgba(15,23,42,0.06)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0FDF4]/70 via-white/30 to-[#ECFDF3]/50"
          aria-hidden="true"
        />

        <div className="relative flex flex-col justify-center py-1">
          <h3
            className={[
              "text-center font-bold leading-snug tracking-tight text-[#0F172A]",
              compact ? "text-xs sm:text-sm lg:text-base" : "text-xl sm:text-2xl",
            ].join(" ")}
          >
            Real Impact.{" "}
            <span className="text-[#16A34A]">Real Change.</span>
          </h3>

          <div
            className={[
              "mt-3 sm:mt-4",
              compact
                ? "flex flex-col gap-4 sm:gap-5 lg:gap-6"
                : "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8",
            ].join(" ")}
          >
            {stats.map((stat, index) => (
              <StatRow
                key={stat.label}
                stat={stat}
                index={index}
                isActive={isInView}
                compact={compact}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
