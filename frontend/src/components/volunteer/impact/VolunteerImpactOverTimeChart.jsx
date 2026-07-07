import { IMPACT_OVER_TIME } from "../../../data/volunteerImpactPageData";

export default function VolunteerImpactOverTimeChart() {
  const maxMeals = Math.max(...IMPACT_OVER_TIME.map((point) => point.meals));
  const chartHeight = 180;
  const chartWidth = 400;
  const paddingBottom = 24;

  const linePoints = IMPACT_OVER_TIME.map((point, index) => {
    const x =
      (index / (IMPACT_OVER_TIME.length - 1)) * (chartWidth - 40) + 20;
    const y =
      chartHeight - paddingBottom - (point.meals / maxMeals) * (chartHeight - 40);
    return { x, y, ...point };
  });

  const polyline = linePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Impact Over Time</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">
        Cumulative meals delivered across your volunteer journey.
      </p>

      <div
        className="relative mt-[0.5cm]"
        style={{ height: chartHeight }}
        role="img"
        aria-label="Impact over time line chart"
      >
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-full w-full">
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = chartHeight - paddingBottom - (pct / 100) * (chartHeight - 40);
            return (
              <line
                key={pct}
                x1="20"
                y1={y}
                x2={chartWidth - 20}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1"
              />
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

      <div className="mt-2 grid gap-2 border-t border-[#F1F5F9] pt-[0.5cm] sm:grid-cols-3">
        <Stat label="Latest month" value={`${IMPACT_OVER_TIME.at(-1).meals.toLocaleString()} meals`} />
        <Stat label="Food rescued (Jul)" value={`${IMPACT_OVER_TIME.at(-1).foodKg} kg`} />
        <Stat label="People reached (Jul)" value={IMPACT_OVER_TIME.at(-1).people.toLocaleString()} />
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-3">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#0F172A]">{value}</p>
    </div>
  );
}
