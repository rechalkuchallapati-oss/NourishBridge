import { FOOD_RESCUE_TREND } from "../../data/ngoReports";

export default function ReportFoodRescueTrendChart() {
  const maxKg = Math.max(...FOOD_RESCUE_TREND.map((point) => point.kg));
  const chartHeight = 200;
  const chartWidth = 480;
  const paddingBottom = 28;

  const linePoints = FOOD_RESCUE_TREND.map((point, index) => {
    const x = (index / (FOOD_RESCUE_TREND.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - paddingBottom - (point.kg / maxKg) * (chartHeight - 48);
    return { x, y, ...point };
  });

  const polyline = linePoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Food Rescue Trend</h2>
      <p className="mt-[0.3cm] text-sm text-[#64748B]">Monthly food rescued (kg) — line chart.</p>

      <div
        className="relative mt-[0.5cm]"
        style={{ height: chartHeight }}
        role="img"
        aria-label="Food rescue trend line chart"
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
            <linearGradient id="foodRescueLineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <polygon
            fill="url(#foodRescueLineFill)"
            points={`${linePoints[0].x},${chartHeight - paddingBottom} ${polyline} ${linePoints[linePoints.length - 1].x},${chartHeight - paddingBottom}`}
          />

          <polyline
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={polyline}
          />

          {linePoints.map((point) => (
            <g key={point.month}>
              <circle cx={point.x} cy={point.y} r="5" fill="#2563EB" stroke="#fff" strokeWidth="2" />
              <text
                x={point.x}
                y={point.y - 10}
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="#64748B"
              >
                {point.kg}
              </text>
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
