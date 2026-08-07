import { Cell, Pie, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CATEGORY_DISTRIBUTION, EXPIRY_TIMELINE, INCOMING_OUTGOING, STORAGE_GAUGE } from "../../../data/adminInventory";

export function CategoryDonut() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <div className="h-[160px] w-[160px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={CATEGORY_DISTRIBUTION} cx="50%" cy="50%" innerRadius={45} outerRadius={68} dataKey="value" paddingAngle={2}>
              {CATEGORY_DISTRIBUTION.map((e) => (
                <Cell key={e.name} fill={e.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid flex-1 gap-1 text-xs">
        {CATEGORY_DISTRIBUTION.map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="flex-1 text-[#334155]">{item.name}</span>
            <span className="font-bold text-[#0F172A]">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StorageGauge() {
  const { usedPercent, totalCapacity, availableCapacity } = STORAGE_GAUGE;
  const r = 70;
  const cx = 90;
  const cy = 90;
  const startAngle = 180;
  const endAngle = 0;
  const usedAngle = startAngle - (usedPercent / 100) * 180;

  const polar = (angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
  };

  const describeArc = (start, end) => {
    const s = polar(start, r);
    const e = polar(end, r);
    const large = Math.abs(end - start) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={180} height={100} viewBox="0 0 180 100" className="overflow-visible">
        <path d={describeArc(180, 0)} fill="none" stroke="#E2E8F0" strokeWidth={12} strokeLinecap="round" />
        <path d={describeArc(180, usedAngle)} fill="none" stroke="#22C55E" strokeWidth={12} strokeLinecap="round" />
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="22" fontWeight="800" fill="#0F172A">
          {usedPercent}%
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#64748B">
          Storage Used
        </text>
      </svg>
      <div className="mt-2 grid w-full grid-cols-2 gap-2 text-center text-xs">
        <div className="rounded-[10px] bg-[#F8FAFC] p-2">
          <p className="font-bold text-[#0F172A]">{totalCapacity}</p>
          <p className="text-[#64748B]">Total Capacity</p>
        </div>
        <div className="rounded-[10px] bg-[#F0FDF4] p-2">
          <p className="font-bold text-[#16A34A]">{availableCapacity}</p>
          <p className="text-[#64748B]">Available</p>
        </div>
      </div>
    </div>
  );
}

export function IncomingOutgoingChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={INCOMING_OUTGOING} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748B" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
        <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="incoming" name="Incoming" fill="#22C55E" radius={[4, 4, 0, 0]} />
        <Bar dataKey="outgoing" name="Outgoing" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ExpiryTimelineChart() {
  const max = Math.max(...EXPIRY_TIMELINE.map((e) => e.value));
  return (
    <ul className="space-y-3">
      {EXPIRY_TIMELINE.map((item) => (
        <li key={item.label}>
          <div className="mb-1 flex justify-between text-xs">
            <span className="font-medium text-[#334155]">{item.label}</span>
            <span className="font-bold text-[#0F172A]">{item.value} batches</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[#F1F5F9]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
