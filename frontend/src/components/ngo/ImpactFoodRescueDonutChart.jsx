import { FOOD_RESCUE_DONUT } from "../../data/ngoImpactAnalytics";

function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function describeDonutArc(cx, cy, outerR, innerR, startAngle, endAngle) {
  const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
  const startInner = polarToCartesian(cx, cy, innerR, startAngle);
  const endInner = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 1 ${endInner.x} ${endInner.y}`,
    "Z",
  ].join(" ");
}

export default function ImpactFoodRescueDonutChart() {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = outerR * 0.58;
  let cursor = 0;

  const slices = FOOD_RESCUE_DONUT.map((segment) => {
    const sweep = (segment.share / 100) * 360;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;

    return {
      ...segment,
      path: describeDonutArc(cx, cy, outerR, innerR, startAngle, endAngle),
    };
  });

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Food Rescue Breakdown</h2>
      <p className="mt-[0.3cm] text-sm text-[#64748B]">Share of rescued food by category — donut chart.</p>

      <div className="mt-[0.5cm] flex flex-col items-center gap-[0.5cm] sm:flex-row sm:items-start">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="shrink-0"
          role="img"
          aria-label="Food rescue breakdown donut chart"
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
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A">
            8,450
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="#64748B">
            kg rescued
          </text>
        </svg>

        <ul className="grid flex-1 gap-2">
          {FOOD_RESCUE_DONUT.map((item) => (
            <li key={item.id} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="flex-1 font-semibold text-[#0F172A]">{item.label}</span>
              <span className="font-bold text-[#16A34A]">{item.share}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
