import { Cell, Pie, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import {
  AVG_RESPONSE_TIME,
  FULFILLMENT_RATE,
  MONTHLY_REQUEST_TREND,
  REQUESTS_BY_CATEGORY,
  REQUESTS_BY_CITY,
  URGENCY_DISTRIBUTION,
} from "../../../data/adminFoodRequests";

export function RequestsByCategoryChart() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <div className="h-[140px] w-[140px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={REQUESTS_BY_CATEGORY} cx="50%" cy="50%" innerRadius={40} outerRadius={62} dataKey="value" paddingAngle={2}>
              {REQUESTS_BY_CATEGORY.map((e) => <Cell key={e.name} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid flex-1 gap-1 text-xs">
        {REQUESTS_BY_CATEGORY.map((item) => (
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

export function RequestsByCityChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={REQUESTS_BY_CITY} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "#64748B" }} />
          <YAxis type="category" dataKey="city" tick={{ fontSize: 10, fill: "#64748B" }} width={72} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          <Bar dataKey="count" fill="#22C55E" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyRequestTrendChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MONTHLY_REQUEST_TREND} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
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

export function UrgencyDistributionChart() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <div className="h-[130px] w-[130px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={URGENCY_DISTRIBUTION} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={2}>
              {URGENCY_DISTRIBUTION.map((e) => <Cell key={e.name} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid flex-1 gap-1 text-xs">
        {URGENCY_DISTRIBUTION.map((item) => (
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

export function FulfillmentRateChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={FULFILLMENT_RATE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v}%`, "Fulfillment Rate"]} />
          <Bar dataKey="rate" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AvgResponseTimeChart() {
  return (
    <div className="h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={AVG_RESPONSE_TIME} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} unit=" hr" />
          <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v} hrs`, "Avg Response"]} />
          <Line type="monotone" dataKey="hours" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: "#8B5CF6", r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function MapMarker({ x, y, color, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill={color} stroke="white" strokeWidth={2} />
      <text x={x} y={y - 11} textAnchor="middle" fontSize="7" fill="#64748B" fontWeight="600">{label}</text>
    </g>
  );
}

export function RequestRouteMap({ map }) {
  if (!map) {
    return <div className="flex h-[140px] items-center justify-center rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-xs text-[#64748B]">Map unavailable</div>;
  }
  const { ngo, donors, volunteer, eta, distance } = map;
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#F0FDF4]/30">
      <svg viewBox="0 0 100 90" className="h-[140px] w-full">
        <rect width="100" height="90" fill="#F8FAFC" />
        {donors?.map((d, i) => (
          <g key={i}>
            <line x1={d.x} y1={d.y} x2={ngo.x} y2={ngo.y} stroke="#CBD5E1" strokeWidth={0.8} strokeDasharray="3 2" />
            <MapMarker x={d.x} y={d.y} color="#F59E0B" label={d.label?.slice(0, 8) ?? "Donor"} />
          </g>
        ))}
        {volunteer ? <line x1={volunteer.x} y1={volunteer.y} x2={ngo.x} y2={ngo.y} stroke="#16A34A" strokeWidth={1.5} /> : null}
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
