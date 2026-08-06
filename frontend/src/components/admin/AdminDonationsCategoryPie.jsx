import { DONATIONS_BY_CATEGORY } from "../../data/adminDashboard";

function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angleRad), y: cy + radius * Math.sin(angleRad) };
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

export default function AdminDonationsCategoryPie() {
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 6;
  let cursor = 0;

  const slices = DONATIONS_BY_CATEGORY.map((segment) => {
    const sweep = (segment.share / 100) * 360;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;
    return { ...segment, path: describeArc(cx, cy, radius, startAngle, endAngle) };
  });

  return (
    <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
        role="img"
        aria-label="Donations by category pie chart"
      >
        {slices.map((slice) => (
          <path key={slice.id} d={slice.path} fill={slice.color} stroke="#fff" strokeWidth="2" />
        ))}
        <circle cx={cx} cy={cy} r={radius * 0.42} fill="#fff" />
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
          186
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="#64748B">
          active
        </text>
      </svg>
      <ul className="grid flex-1 gap-1.5 text-xs">
        {DONATIONS_BY_CATEGORY.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="flex-1 font-medium text-[#0F172A]">{item.label}</span>
            <span className="font-bold text-[#16A34A]">{item.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
