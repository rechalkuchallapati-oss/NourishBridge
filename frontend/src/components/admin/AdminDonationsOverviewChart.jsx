import { DONATIONS_OVERVIEW_TREND } from "../../data/adminDashboard";

export default function AdminDonationsOverviewChart({ data = DONATIONS_OVERVIEW_TREND }) {
  const trend = data?.length ? data : DONATIONS_OVERVIEW_TREND;
  const maxVal = Math.max(...trend.map((p) => p.donations), 1);
  const chartHeight = 160;
  const chartWidth = 320;
  const paddingBottom = 24;

  const points = trend.map((point, index) => {
    const x = (index / Math.max(trend.length - 1, 1)) * (chartWidth - 32) + 16;
    const y = chartHeight - paddingBottom - (point.donations / maxVal) * (chartHeight - 36);
    return { x, y, ...point };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      className="mt-3"
      style={{ height: chartHeight }}
      role="img"
      aria-label="Donations overview line chart"
    >
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-full w-full">
        {[0, 50, 100].map((pct) => {
          const y = chartHeight - paddingBottom - (pct / 100) * (chartHeight - 36);
          return (
            <line key={pct} x1="16" y1={y} x2={chartWidth - 16} y2={y} stroke="#F1F5F9" strokeWidth="1" />
          );
        })}
        <defs>
            <linearGradient id="adminDonationsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.02" />
            </linearGradient>
        </defs>
        <polygon
          fill="url(#adminDonationsFill)"
          points={`${points[0].x},${chartHeight - paddingBottom} ${polyline} ${points[points.length - 1].x},${chartHeight - paddingBottom}`}
        />
        <polyline
          fill="none"
          stroke="#16A34A"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={polyline}
        />
        {points.map((point) => (
          <g key={point.date}>
              <circle cx={point.x} cy={point.y} r="4" fill="#16A34A" stroke="#fff" strokeWidth="2" />
            <text x={point.x} y={chartHeight - 6} textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748B">
              {point.date}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
