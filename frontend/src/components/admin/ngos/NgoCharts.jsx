import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  CAPACITY_UTILIZATION,
  MEALS_SERVED_TREND,
  MONTHLY_NGO_GROWTH,
  NGO_CITY_CHART,
  NGO_VERIFICATION_CHART,
  getTopNgosByMeals,
} from "../../../data/adminNgos";

const tooltipStyle = { borderRadius: 12, fontSize: 12, border: "1px solid #E5E7EB" };

export function NgoGrowthChart() {
  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MONTHLY_NGO_GROWTH} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="ngos" stroke="#16A34A" strokeWidth={2.5} dot={{ fill: "#16A34A", r: 4 }} name="Total NGOs" />
          <Line type="monotone" dataKey="newNgos" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", r: 3 }} name="New NGOs" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function NgoCityChart() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="h-[150px] w-[150px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={NGO_CITY_CHART} cx="50%" cy="50%" innerRadius={42} outerRadius={64} dataKey="value" paddingAngle={2}>
              {NGO_CITY_CHART.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid flex-1 gap-2 text-xs">
        {NGO_CITY_CHART.map((item) => (
          <li key={item.name} className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="flex-1 text-[#334155]">{item.name}</span>
            <span className="font-bold text-[#0F172A]">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NgoVerificationChart() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="h-[140px] w-[140px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={NGO_VERIFICATION_CHART} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" paddingAngle={3}>
              {NGO_VERIFICATION_CHART.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-2 text-xs">
        {NGO_VERIFICATION_CHART.map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[#334155]">{item.name}</span>
            <span className="font-bold text-[#0F172A]">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MealsServedTrendChart() {
  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={MEALS_SERVED_TREND} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [Number(v).toLocaleString(), "Meals"]} />
          <Bar dataKey="meals" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Meals Served" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CapacityUtilizationChart() {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={CAPACITY_UTILIZATION} layout="vertical" margin={{ top: 0, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748B" }} unit="%" />
          <YAxis type="category" dataKey="ngo" tick={{ fontSize: 10, fill: "#64748B" }} width={72} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Utilization"]} />
          <Bar dataKey="utilization" fill="#F59E0B" radius={[0, 6, 6, 0]} name="Utilization" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopNgosByMealsPanel() {
  const top = getTopNgosByMeals();
  return (
    <ul className="space-y-3">
      {top.map((ngo, index) => (
        <li key={ngo.id} className="flex items-center justify-center gap-3 rounded-[14px] border border-[#E8ECF0] bg-[#F8FAFC] p-3 transition-colors hover:border-[#BBF7D0] hover:bg-[#F0FDF4]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-xs font-bold text-white">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="truncate text-sm font-bold text-[#0F172A]">{ngo.name}</p>
            <p className="text-[11px] text-[#64748B]">{ngo.city} · ★ {ngo.rating ?? "—"}</p>
          </div>
          <div className="shrink-0 text-center">
            <p className="text-sm font-extrabold text-[#16A34A]">{ngo.mealsServed}</p>
            <p className="text-[10px] text-[#64748B]">meals</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function NgoPlatformSummaryCards({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-[16px] border border-[#E8ECF0] bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-2xl font-extrabold text-[#0F172A]">{item.value}</p>
          <p className="mt-1 text-sm font-semibold text-[#334155]">{item.label}</p>
          <p className="text-xs text-[#94A3B8]">{item.sub}</p>
        </div>
      ))}
    </div>
  );
}
