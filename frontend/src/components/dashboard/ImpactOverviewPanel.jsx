import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChild,
  FaHeart,
  FaUsers,
  FaUserClock,
} from "react-icons/fa";
import Button from "../common/Button";
import { IMPACT_BENEFICIARY_BREAKDOWN } from "../../data/donorImpact";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { dashboardButtonClass } from "./dashboardFormStyles";

const EASE = [0.22, 1, 0.36, 1];

const ICONS = {
  families: FaUsers,
  children: FaChild,
  seniors: FaUserClock,
  others: FaHeart,
};

function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function ImpactPieChart({ segments, size = 220 }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 8;
  let cursor = 0;

  const slices = segments.map((segment) => {
    const sweep = (segment.percentage / 100) * 360;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;

    return {
      ...segment,
      path: describeArc(cx, cy, radius, startAngle, endAngle),
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0 drop-shadow-sm"
      aria-hidden="true"
    >
      {slices.map((slice) => (
        <path
          key={slice.id}
          d={slice.path}
          fill={slice.color}
          stroke="#ffffff"
          strokeWidth="2"
        />
      ))}
      <circle cx={cx} cy={cy} r={radius * 0.38} fill="#ffffff" />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        className="fill-[#15803D] text-[11px] font-bold"
        style={{ fontSize: "11px" }}
      >
        41
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        className="fill-[#64748B]"
        style={{ fontSize: "9px" }}
      >
        meals
      </text>
    </svg>
  );
}

function BreakdownRow({ item }) {
  const Icon = ICONS[item.icon] ?? FaHeart;
  const isLight = item.id === "others";

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-x-[1cm] border-b border-[#F1F5F9] py-2 last:border-none">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor: isLight ? "#ECFDF5" : `${item.color}22`,
          color: isLight ? "#15803D" : item.color,
        }}
      >
        <Icon className="text-base" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold leading-tight text-[#0F172A] sm:text-base">
        {item.label}
      </span>
      <span className="text-sm font-bold text-[#15803D] sm:text-base">{item.percentage}%</span>
      <span className="text-sm font-semibold text-[#64748B] sm:text-base">{item.meals} meals</span>
    </div>
  );
}

export default function ImpactOverviewPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-6"
    >
      <span className="absolute right-[0.5cm] top-[0.5cm] rounded-none bg-[#16A34A] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
        This month
      </span>

      <div className="flex flex-col gap-[0.5cm] pt-6">
        <h2 className="bg-gradient-to-r from-[#15803D] to-[#16A34A] bg-clip-text text-xl font-extrabold text-transparent sm:text-2xl">
          My Impact Overview
        </h2>

        <div className="flex flex-col items-center gap-[0.5cm] lg:flex-row lg:items-center lg:justify-center lg:gap-[0.5cm]">
          <div className="flex shrink-0 justify-center">
            <ImpactPieChart segments={IMPACT_BENEFICIARY_BREAKDOWN} size={220} />
          </div>

          <div className="w-full flex-1 lg:max-w-lg">
            {IMPACT_BENEFICIARY_BREAKDOWN.map((item) => (
              <BreakdownRow key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="flex w-full justify-center pt-[0.5cm]">
          <Link to={DASHBOARD_ROUTES.donorImpactReports} className="inline-flex">
            <Button
              className={[
                dashboardButtonClass,
                "!h-14 !min-h-[56px] !min-w-[240px] !px-10 !py-3 !text-base !justify-center",
              ].join(" ")}
            >
              View full impact report
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export { ImpactPieChart, BreakdownRow };
