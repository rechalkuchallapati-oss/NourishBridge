import { MONTHLY_MEALS_TREND } from "../../data/ngoImpactAnalytics";

export default function ImpactMonthlyLineChart() {
  const maxMeals = Math.max(...MONTHLY_MEALS_TREND.map((point) => point.meals));
  const chartHeight = 200;
  const chartWidth = 480;
  const paddingBottom = 28;

  const linePoints = MONTHLY_MEALS_TREND.map((point, index) => {
    const x = (index / (MONTHLY_MEALS_TREND.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - paddingBottom - (point.meals / maxMeals) * (chartHeight - 48);
    return { x, y, ...point };
  });

  const polyline = linePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Monthly Impact Chart</h2>
      <p className="mt-[0.3cm] text-sm text-[#64748B]">Meals distributed — Jan through Jul.</p>

      <div
        className="relative mt-[0.5cm]"
        style={{ height: chartHeight }}
        role="img"
        aria-label="Monthly meals distributed line chart"
      >
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-full w-full">
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = chartHeight - paddingBottom - (pct / 100) * (chartHeight - 48);
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
            <linearGradient id="impactMealsLineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <polygon
            fill="url(#impactMealsLineFill)"
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
                y={chartHeight - 8}
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
    </section>
  );
}
