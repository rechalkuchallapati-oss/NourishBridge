import { FOOD_CATEGORY_PIE } from "../../data/ngoReports";

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

export default function ReportCategoryPieChart() {
  const totalKg = FOOD_CATEGORY_PIE.reduce((sum, item) => sum + item.kg, 0);
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 6;
  let cursor = 0;

  const slices = FOOD_CATEGORY_PIE.map((segment) => {
    const sweep = (segment.share / 100) * 360;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;

    return {
      ...segment,
      path: describeArc(cx, cy, radius, startAngle, endAngle),
    };
  });

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Food Category Distribution</h2>
      <p className="mt-[0.3cm] text-sm text-[#64748B]">Share of rescued food by category — pie chart.</p>

      <div className="mt-[0.5cm] flex flex-col items-center gap-[0.5cm] sm:flex-row sm:items-start">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="shrink-0"
          role="img"
          aria-label="Food category distribution pie chart"
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
          <circle cx={cx} cy={cy} r={radius * 0.42} fill="#ffffff" />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">
            {totalKg.toLocaleString()}
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#64748B">
            kg total
          </text>
        </svg>

        <ul className="grid flex-1 gap-2 sm:grid-cols-1">
          {FOOD_CATEGORY_PIE.map((item) => (
            <li key={item.id} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="flex-1 font-semibold text-[#0F172A]">{item.label}</span>
              <span className="text-[#64748B]">
                {item.share}% · {item.kg} kg
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
