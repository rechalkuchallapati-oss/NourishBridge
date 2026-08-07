import { Cell, Pie, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import {
  AVG_DELIVERY_TIME,
  DELIVERY_PERFORMANCE_TREND,
  DISTANCE_COVERED,
  ON_TIME_RATE,
  STATUS_DISTRIBUTION,
  VOLUNTEER_EFFICIENCY,
} from "../../../data/adminDeliveries";

export function DeliveryPerformanceChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DELIVERY_PERFORMANCE_TREND} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          <Bar dataKey="deliveries" fill="#22C55E" radius={[4, 4, 0, 0]} />
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
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v} min`, "Avg Time"]} />
          <Line type="monotone" dataKey="minutes" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OnTimeRateChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ON_TIME_RATE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v}%`, "On-Time Rate"]} />
          <Bar dataKey="rate" fill="#16A34A" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StatusDistributionChart() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <div className="h-[130px] w-[130px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={STATUS_DISTRIBUTION} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={2}>
              {STATUS_DISTRIBUTION.map((e) => <Cell key={e.name} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid flex-1 gap-1 text-xs">
        {STATUS_DISTRIBUTION.map((item) => (
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

export function DistanceCoveredChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={DISTANCE_COVERED} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v} km`, "Distance"]} />
          <Line type="monotone" dataKey="km" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: "#8B5CF6", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function VolunteerEfficiencyChart() {
  return (
    <ul className="space-y-2">
      {VOLUNTEER_EFFICIENCY.map((v, i) => (
        <li key={v.name} className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0FDF4] text-xs font-bold text-[#16A34A]">{i + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#0F172A]">{v.name}</p>
            <p className="text-[10px] text-[#64748B]">{v.deliveries} deliveries</p>
          </div>
          <span className="text-xs font-bold text-[#16A34A]">{v.score}%</span>
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

export function DeliveryTrackingMap({ tracking }) {
  if (!tracking) {
    return <div className="flex h-[180px] items-center justify-center rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-xs text-[#64748B]">Tracking unavailable</div>;
  }
  const { volunteer, pickup, destination, distanceRemaining, eta, traffic } = tracking;
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#F0FDF4]/30">
      <svg viewBox="0 0 100 90" className="h-[180px] w-full">
        <rect width="100" height="90" fill="#F8FAFC" />
        <line x1={pickup.x} y1={pickup.y} x2={volunteer.x} y2={volunteer.y} stroke="#CBD5E1" strokeWidth={1} strokeDasharray="3 2" />
        <line x1={volunteer.x} y1={volunteer.y} x2={destination.x} y2={destination.y} stroke="#16A34A" strokeWidth={2} />
        <MapMarker x={pickup.x} y={pickup.y} color="#F59E0B" label="Pickup" />
        <MapMarker x={destination.x} y={destination.y} color="#3B82F6" label="NGO" />
        <MapMarker x={volunteer.x} y={volunteer.y} color="#16A34A" label="Live" />
      </svg>
      <div className="grid grid-cols-3 gap-2 border-t border-[#E5E7EB] bg-white px-3 py-2 text-[10px]">
        <span className="text-[#64748B]">Remaining: <strong className="text-[#0F172A]">{distanceRemaining}</strong></span>
        <span className="text-center text-[#64748B]">ETA: <strong className="text-[#16A34A]">{eta}</strong></span>
        <span className="text-right text-[#64748B]">Traffic: <strong className="text-[#D97706]">{traffic}</strong></span>
      </div>
    </div>
  );
}
