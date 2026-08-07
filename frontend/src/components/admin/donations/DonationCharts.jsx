import { Cell, Pie, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import {
  DAILY_DONATIONS,
  DONATION_CATEGORY_CHART,
  IMPACT_STATS,
  MONTHLY_DONATIONS,
  TOP_DONORS,
  TOP_NGOS,
  VOLUNTEER_PERFORMANCE,
} from "../../../data/adminDonations";

export function CategoryDonutChart() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <div className="h-[140px] w-[140px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={DONATION_CATEGORY_CHART} cx="50%" cy="50%" innerRadius={40} outerRadius={62} dataKey="value" paddingAngle={2}>
              {DONATION_CATEGORY_CHART.map((e) => (
                <Cell key={e.name} fill={e.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid flex-1 gap-1 text-xs">
        {DONATION_CATEGORY_CHART.map((item) => (
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

export function DailyDonationsChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DAILY_DONATIONS} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          <Bar dataKey="count" fill="#22C55E" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyDonationsChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MONTHLY_DONATIONS} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          <Line type="monotone" dataKey="count" stroke="#16A34A" strokeWidth={2} dot={{ fill: "#16A34A", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopDonorsChart() {
  return (
    <ul className="space-y-2">
      {TOP_DONORS.map((d, i) => (
        <li key={d.name} className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0FDF4] text-xs font-bold text-[#16A34A]">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#0F172A]">{d.name}</p>
            <p className="text-[10px] text-[#64748B]">{d.meals.toLocaleString()} meals</p>
          </div>
          <span className="text-xs font-bold text-[#16A34A]">{d.count}</span>
        </li>
      ))}
    </ul>
  );
}

export function TopNgosChart() {
  return (
    <ul className="space-y-2">
      {TOP_NGOS.map((n, i) => (
        <li key={n.name} className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-xs font-bold text-[#2563EB]">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#0F172A]">{n.name}</p>
            <p className="text-[10px] text-[#64748B]">{n.meals.toLocaleString()} meals</p>
          </div>
          <span className="text-xs font-bold text-[#2563EB]">{n.count}</span>
        </li>
      ))}
    </ul>
  );
}

export function VolunteerPerformanceChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={VOLUNTEER_PERFORMANCE} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "#64748B" }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} width={52} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          <Bar dataKey="deliveries" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ImpactStatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-[12px] border border-[#BBF7D0] bg-[#F0FDF4] p-4 text-center">
        <p className="text-2xl font-extrabold text-[#16A34A]">{IMPACT_STATS.wastePrevented}</p>
        <p className="mt-1 text-xs font-semibold text-[#64748B]">Food Waste Prevented</p>
      </div>
      <div className="rounded-[12px] border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-center">
        <p className="text-2xl font-extrabold text-[#2563EB]">{IMPACT_STATS.mealsGenerated}</p>
        <p className="mt-1 text-xs font-semibold text-[#64748B]">Meals Generated</p>
      </div>
    </div>
  );
}

function MapMarker({ x, y, color, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r={8} fill={color} stroke="white" strokeWidth={2} />
      <text x={x} y={y - 12} textAnchor="middle" fontSize="8" fill="#64748B" fontWeight="600">{label}</text>
    </g>
  );
}

export function DonationRouteMap({ map }) {
  if (!map || map.distance === "—") {
    return (
      <div className="flex h-[140px] items-center justify-center rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-xs text-[#64748B]">
        Map unavailable
      </div>
    );
  }

  const { pickup, ngo, volunteer, distance, eta } = map;
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#F0FDF4]/30">
      <svg viewBox="0 0 100 90" className="h-[140px] w-full">
        <rect width="100" height="90" fill="#F8FAFC" />
        <path d="M10,80 Q30,60 50,50 T90,20" fill="none" stroke="#E2E8F0" strokeWidth={0.5} />
        {volunteer ? (
          <line x1={pickup.x} y1={pickup.y} x2={volunteer.x} y2={volunteer.y} stroke="#16A34A" strokeWidth={1.5} strokeDasharray="3 2" />
        ) : null}
        {volunteer ? (
          <line x1={volunteer.x} y1={volunteer.y} x2={ngo.x} y2={ngo.y} stroke="#16A34A" strokeWidth={1.5} />
        ) : (
          <line x1={pickup.x} y1={pickup.y} x2={ngo.x} y2={ngo.y} stroke="#CBD5E1" strokeWidth={1} strokeDasharray="4 2" />
        )}
        <MapMarker x={pickup.x} y={pickup.y} color="#F59E0B" label="Donor" />
        <MapMarker x={ngo.x} y={ngo.y} color="#3B82F6" label="NGO" />
        {volunteer ? <MapMarker x={volunteer.x} y={volunteer.y} color="#16A34A" label="Volunteer" /> : null}
      </svg>
      <div className="flex justify-between border-t border-[#E5E7EB] bg-white px-3 py-2 text-xs">
        <span className="text-[#64748B]">Distance: <strong className="text-[#0F172A]">{distance}</strong></span>
        <span className="text-[#64748B]">ETA: <strong className="text-[#16A34A]">{eta}</strong></span>
      </div>
    </div>
  );
}
