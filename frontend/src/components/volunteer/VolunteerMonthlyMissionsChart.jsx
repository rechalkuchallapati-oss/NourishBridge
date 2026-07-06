import { MONTHLY_MISSIONS_TREND } from "../../data/volunteerMission";

export default function VolunteerMonthlyMissionsChart() {
  const maxMissions = Math.max(...MONTHLY_MISSIONS_TREND.map((item) => item.missions));

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Monthly Missions</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">Missions completed over the last 6 months.</p>

      <div className="mt-4 flex h-40 items-end justify-between gap-2 sm:h-44 sm:gap-3">
        {MONTHLY_MISSIONS_TREND.map((item) => {
          const height = `${Math.max((item.missions / maxMissions) * 100, 10)}%`;
          return (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-[#64748B]">{item.missions}</span>
              <div className="flex h-full w-full items-end justify-center">
                <div
                  className="w-full max-w-9 rounded-t-md bg-gradient-to-t from-[#15803D] to-[#4ADE80] transition-all hover:from-[#16A34A] hover:to-[#86EFAC]"
                  style={{ height }}
                  title={`${item.missions} missions`}
                />
              </div>
              <span className="text-[10px] font-semibold text-[#94A3B8]">{item.month}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
