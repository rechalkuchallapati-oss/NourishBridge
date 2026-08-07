import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  DONOR_TYPE_CHART,
  DONOR_TIERS,
  MEALS_BY_MONTH,
  MONTHLY_DONOR_GROWTH,
  WEEKLY_DONATIONS,
  getTopFrequentDonors,
  getDonorTier,
} from "../../../data/adminDonors";

const tooltipStyle = { borderRadius: 12, fontSize: 12, border: "1px solid #E5E7EB" };

export function DonorGrowthChart() {
  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MONTHLY_DONOR_GROWTH} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="donors" stroke="#16A34A" strokeWidth={2.5} dot={{ fill: "#16A34A", r: 4 }} name="Total Donors" />
          <Line type="monotone" dataKey="newDonors" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", r: 3 }} name="New Donors" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DonorTypeChart() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="h-[150px] w-[150px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={DONOR_TYPE_CHART} cx="50%" cy="50%" innerRadius={42} outerRadius={64} dataKey="value" paddingAngle={2}>
              {DONOR_TYPE_CHART.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid flex-1 gap-2 text-xs">
        {DONOR_TYPE_CHART.map((item) => (
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

export function WeeklyDonationsChart() {
  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={WEEKLY_DONATIONS} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" fill="#22C55E" radius={[6, 6, 0, 0]} name="Donations" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MealsContributedChart() {
  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={MEALS_BY_MONTH} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v.toLocaleString(), "Meals"]} />
          <Bar dataKey="meals" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Meals" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FrequentDonorsAwards() {
  const top = getTopFrequentDonors(undefined, 5);
  return (
    <ul className="space-y-3">
      {top.map((donor) => {
        const tier = getDonorTier(donor.donations);
        return (
          <li
            key={donor.id}
            className={`flex items-center justify-center gap-3 rounded-[14px] border p-3 ring-2 ${tier.color} ${tier.ring}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-lg shadow-sm">
              {tier.emoji}
            </span>
            <img src={donor.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full border-2 border-white object-cover shadow-sm" />
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="truncate text-sm font-bold text-[#0F172A]">{donor.name}</p>
              <p className="text-[11px] font-semibold text-[#64748B]">{tier.medal}</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-sm font-extrabold text-[#0F172A]">{donor.donations}</p>
              <p className="text-[10px] text-[#64748B]">donations</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function DonorTierLegend() {
  const tiers = ["platinum", "gold", "silver", "bronze", "member"];
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
      {tiers.map((id) => {
        const tier = DONOR_TIERS[id];
        return (
          <div key={id} className={`flex items-center justify-center gap-2 rounded-[12px] border px-3 py-2 text-xs font-semibold ${tier.color}`}>
            <span>{tier.emoji}</span>
            <span>{tier.label}</span>
            <span className="text-[#64748B]">· {tier.minDonations}+ donations</span>
          </div>
        );
      })}
    </div>
  );
}

export function TopDonorsBarChart() {
  const data = getTopFrequentDonors(undefined, 6).map((d) => ({
    name: d.name.split(" ")[0],
    donations: d.donations,
    fill: getDonorTier(d.donations).id === "platinum" ? "#8B5CF6" : getDonorTier(d.donations).id === "gold" ? "#F59E0B" : "#22C55E",
  }));
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "#64748B" }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} width={56} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="donations" radius={[0, 6, 6, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
