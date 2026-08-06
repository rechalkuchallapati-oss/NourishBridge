import { TICKET_SUMMARY, TICKET_SUMMARY_SEGMENTS } from "../../data/adminSupportTickets";

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

export default function TicketStatusDonut() {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 8;
  const total = TICKET_SUMMARY.total;
  let cursor = 0;

  const slices = TICKET_SUMMARY_SEGMENTS.map((segment) => {
    const sweep = (segment.value / total) * 360;
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
        className="shrink-0 drop-shadow-sm"
        role="img"
        aria-label="Ticket status distribution donut chart"
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
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="800" fill="#0F172A">
          {total}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748B">
          Total Tickets
        </text>
      </svg>

      <ul className="grid w-full gap-2 text-xs">
        {TICKET_SUMMARY_SEGMENTS.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="flex-1 font-medium text-[#334155]">{item.label}</span>
            <span className="font-bold text-[#0F172A]">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
