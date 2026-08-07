import { STORAGE_USAGE } from "../../../data/adminSystemSettings";

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

export default function SettingsStorageDonut() {
  const { usedPercent, usedGb, totalGb, segments } = STORAGE_USAGE;
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 8;
  let cursor = 0;

  const slices = segments.map((segment) => {
    const sweep = (segment.share / 100) * 360;
    const startAngle = cursor;
    const endAngle = cursor + sweep;
    cursor = endAngle;
    return { ...segment, path: describeArc(cx, cy, radius, startAngle, endAngle) };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-sm"
        role="img"
        aria-label={`Storage usage ${usedPercent}%`}
      >
        {slices.map((slice) => (
          <path
            key={slice.id}
            d={slice.path}
            fill={slice.color}
            stroke="#fff"
            strokeWidth="2.5"
            className="transition-opacity duration-300 hover:opacity-80"
          />
        ))}
        <circle cx={cx} cy={cy} r={radius * 0.48} fill="#fff" />
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="18" fontWeight="800" fill="#0F172A">
          {usedPercent}%
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748B">
          Used
        </text>
      </svg>

      <ul className="w-full space-y-2 text-xs">
        {segments.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="flex-1 font-medium text-[#334155]">{item.label}</span>
            <span className="font-bold text-[#0F172A]">{item.share}%</span>
          </li>
        ))}
      </ul>

      <p className="text-sm font-semibold text-[#64748B]">
        Total Storage{" "}
        <span className="text-[#0F172A]">
          {usedGb}GB / {totalGb}GB
        </span>
      </p>
    </div>
  );
}
