import { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { LEADERBOARD_TABS, VOLUNTEER_LEADERBOARD } from "../../data/ngoReports";

const RANK_COLORS = ["#F59E0B", "#94A3B8", "#B45309"];

export default function ReportVolunteerLeaderboard() {
  const [activeTab, setActiveTab] = useState("most_missions");
  const entries = VOLUNTEER_LEADERBOARD[activeTab] ?? [];

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Volunteer Performance</h2>
          <p className="mt-[0.3cm] text-sm text-[#64748B]">Top 10 volunteers — leaderboard.</p>
        </div>
        <FaTrophy className="text-2xl text-amber-500" aria-hidden="true" />
      </div>

      <div className="mt-[0.5cm] flex flex-wrap gap-2">
        {LEADERBOARD_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={[
              "rounded-none px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm",
              activeTab === tab.id
                ? "bg-[#2563EB] text-white"
                : "border border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#2563EB]/30",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="mt-[0.5cm] flex max-h-72 flex-col gap-2 overflow-y-auto">
        {entries.map((entry) => (
          <li
            key={`${activeTab}-${entry.id}`}
            className="flex items-center justify-between gap-3 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-none text-xs font-bold text-white"
                style={{
                  backgroundColor:
                    entry.rank <= 3 ? RANK_COLORS[entry.rank - 1] : "#64748B",
                }}
              >
                {entry.rank}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">{entry.name}</p>
                <p className="text-xs text-[#64748B]">{entry.id}</p>
              </div>
            </div>
            <p className="text-sm font-bold text-[#2563EB]">
              {typeof entry.value === "number" && entry.value >= 100
                ? entry.value.toLocaleString()
                : entry.value}{" "}
              {entry.unit}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
