import { FaChartLine } from "react-icons/fa";
import { IMPACT_OVER_TIME } from "../../../data/volunteerImpactPageData";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import { VOLUNTEER_CONTENT_STACK, VOLUNTEER_INSET_LINE_GAP } from "../volunteerDashboardStyles";

export default function VolunteerImpactOverTimeChart() {
  const maxMeals = Math.max(...IMPACT_OVER_TIME.map((point) => point.meals));
  const chartHeight = 180;
  const chartWidth = 400;
  const paddingBottom = 24;

  const linePoints = IMPACT_OVER_TIME.map((point, index) => {
    const x = (index / (IMPACT_OVER_TIME.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - paddingBottom - (point.meals / maxMeals) * (chartHeight - 40);
    return { x, y, ...point };
  });

  const polyline = linePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <VolunteerSectionShell>
      <VolunteerSectionTitle
        title="Impact Over Time"
        subtitle="Cumulative meals delivered across your volunteer journey."
        theme="green"
        icon={FaChartLine}
        compact
      />

      <div
        className="relative"
        style={{ height: chartHeight }}
        role="img"
        aria-label="Impact over time line chart"
      >
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-full w-full">
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = chartHeight - paddingBottom - (pct / 100) * (chartHeight - 40);
            return (
              <line key={pct} x1="20" y1={y} x2={chartWidth - 20} y2={y} stroke="#F1F5F9" strokeWidth="1" />
            );
          })}

          <defs>
            <linearGradient id="impactLineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <polygon
            fill="url(#impactLineFill)"
            points={`${linePoints[0].x},${chartHeight - paddingBottom} ${polyline} ${linePoints[linePoints.length - 1].x},${chartHeight - paddingBottom}`}
          />

          <polyline
            fill="none"
            stroke="#16A34A"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={polyline}
          />

          {linePoints.map((point) => (
            <g key={point.month}>
              <circle cx={point.x} cy={point.y} r="5" fill="#16A34A" stroke="#fff" strokeWidth="2" />
              <text
                x={point.x}
                y={chartHeight - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#64748B"
              >
                {point.month}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className={`grid ${VOLUNTEER_CONTENT_STACK} border-t border-[#F1F5F9] pt-[0.5cm] sm:grid-cols-3`}>
        <Stat label="Latest month" value={`${IMPACT_OVER_TIME.at(-1).meals.toLocaleString()} meals`} />
        <Stat label="Food rescued (Jul)" value={`${IMPACT_OVER_TIME.at(-1).foodKg} kg`} />
        <Stat label="People reached (Jul)" value={IMPACT_OVER_TIME.at(-1).people.toLocaleString()} />
      </div>
    </VolunteerSectionShell>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm]">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className={`${VOLUNTEER_INSET_LINE_GAP} text-sm font-bold text-[#0F172A]`}>{value}</p>
    </div>
  );
}
