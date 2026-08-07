import { Cell, Pie, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import {
  AVG_DELIVERY_TIME,
  MISSION_COMPLETION_RATE,
  MONTHLY_VOLUNTEER_GROWTH,
  PERFORMANCE_RANKING,
  TOP_RATED_VOLUNTEERS,
  VEHICLE_DISTRIBUTION,
  VOLUNTEER_AVAILABILITY_CHART,
} from "../../../data/adminVolunteers";

export function VolunteerGrowthChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MONTHLY_VOLUNTEER_GROWTH} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          <Line type="monotone" dataKey="count" stroke="#22C55E" strokeWidth={2} dot={{ fill: "#22C55E", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MissionCompletionChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={MISSION_COMPLETION_RATE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v}%`, "Completion Rate"]} />
          <Bar dataKey="rate" fill="#16A34A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopRatedChart() {
  return (
    <ul className="space-y-2">
      {TOP_RATED_VOLUNTEERS.map((v, i) => (
        <li key={v.name} className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-xs font-bold text-[#D97706]">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#0F172A]">{v.name}</p>
            <p className="text-[10px] text-[#64748B]">{v.deliveries} deliveries</p>
          </div>
          <span className="text-xs font-bold text-[#F59E0B]">★ {v.rating}</span>
        </li>
      ))}
    </ul>
  );
}

export function VehicleDistributionChart() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <div className="h-[130px] w-[130px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={VEHICLE_DISTRIBUTION} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" paddingAngle={2}>
              {VEHICLE_DISTRIBUTION.map((e) => (
                <Cell key={e.name} fill={e.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid flex-1 gap-1 text-xs">
        {VEHICLE_DISTRIBUTION.map((item) => (
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

export function AvailabilityChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={VOLUNTEER_AVAILABILITY_CHART} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="status" tick={{ fontSize: 9, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AvgDeliveryTimeChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={AVG_DELIVERY_TIME} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} unit=" min" />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v} min`, "Avg Delivery Time"]} />
          <Line type="monotone" dataKey="minutes" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PerformanceRankingChart() {
  return (
    <ul className="space-y-2">
      {PERFORMANCE_RANKING.map((v) => (
        <li key={v.rank} className="flex items-center gap-3">
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${v.rank <= 3 ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#F8FAFC] text-[#64748B]"}`}>
            #{v.rank}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#0F172A]">{v.name}</p>
            <p className="text-[10px] text-[#64748B]">{v.deliveries} deliveries</p>
          </div>
          <span className="text-xs font-bold text-[#16A34A]">{v.score}</span>
        </li>
      ))}
    </ul>
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

export function VolunteerLiveMap({ map }) {
  if (!map) {
    return (
      <div className="flex h-[140px] items-center justify-center rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-xs text-[#64748B]">
        No active mission
      </div>
    );
  }

  const { volunteer, pickup, destination, distance, eta } = map;
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#F0FDF4]/30">
      <svg viewBox="0 0 100 90" className="h-[140px] w-full">
        <rect width="100" height="90" fill="#F8FAFC" />
        <line x1={pickup.x} y1={pickup.y} x2={volunteer.x} y2={volunteer.y} stroke="#CBD5E1" strokeWidth={1} strokeDasharray="3 2" />
        <line x1={volunteer.x} y1={volunteer.y} x2={destination.x} y2={destination.y} stroke="#16A34A" strokeWidth={2} />
        <MapMarker x={pickup.x} y={pickup.y} color="#F59E0B" label="Pickup" />
        <MapMarker x={destination.x} y={destination.y} color="#3B82F6" label="NGO" />
        <MapMarker x={volunteer.x} y={volunteer.y} color="#16A34A" label="Live" />
      </svg>
      <div className="flex justify-between border-t border-[#E5E7EB] bg-white px-3 py-2 text-xs">
        <span className="text-[#64748B]">Distance: <strong className="text-[#0F172A]">{distance}</strong></span>
        <span className="text-[#64748B]">ETA: <strong className="text-[#16A34A]">{eta}</strong></span>
      </div>
    </div>
  );
}
