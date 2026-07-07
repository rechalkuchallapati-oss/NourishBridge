import { AREAS_IMPACTED, COMMUNITIES_SUPPORTED } from "../../../data/volunteerImpactPageData";

export default function VolunteerCommunitiesAreasPanel() {
  return (
    <div className="grid gap-[0.5cm] lg:grid-cols-2">
      <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold text-[#0F172A]">Communities Supported</h2>
        <p className="mt-1 text-[10px] text-[#64748B]">Breakdown by receiving NGO partner.</p>

        <ul className="mt-[0.5cm] space-y-2.5">
          {COMMUNITIES_SUPPORTED.map((community) => (
            <li key={community.id}>
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="min-w-0 truncate font-semibold text-[#0F172A]">{community.name}</span>
                <span className="shrink-0 font-bold text-[#15803D]">{community.meals} meals</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E2E8F0]">
                  <div
                    className="h-full rounded-full bg-[#16A34A] transition-all"
                    style={{ width: `${community.share}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[10px] font-semibold text-[#64748B]">
                  {community.share}%
                </span>
              </div>
              <p className="mt-0.5 text-[10px] text-[#94A3B8]">{community.missions} missions</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
        <h2 className="text-sm font-bold text-[#0F172A]">Areas Impacted</h2>
        <p className="mt-1 text-[10px] text-[#64748B]">Geography of your rescue missions across Hyderabad.</p>

        <div className="relative mt-[0.5cm] overflow-hidden rounded-none border border-[#E5E7EB] bg-[#F8FAFC]">
          <svg viewBox="0 0 100 80" className="h-40 w-full" aria-hidden="true">
            <rect width="100" height="80" fill="#EFF6FF" />
            <circle cx="50" cy="40" r="28" fill="#BBF7D0" fillOpacity="0.3" stroke="#16A34A" strokeWidth="0.4" strokeDasharray="1 1" />
            {AREAS_IMPACTED.map((area, index) => {
              const angle = (index / AREAS_IMPACTED.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 50 + Math.cos(angle) * 22;
              const cy = 40 + Math.sin(angle) * 18;
              return (
                <circle
                  key={area.id}
                  cx={cx}
                  cy={cy}
                  r={area.active ? 3.5 : 2.5}
                  fill={area.active ? "#16A34A" : "#94A3B8"}
                  fillOpacity={area.active ? 1 : 0.6}
                  stroke="#fff"
                  strokeWidth="0.6"
                />
              );
            })}
            <circle cx="50" cy="40" r="2" fill="#2563EB" stroke="#fff" strokeWidth="0.5" />
          </svg>
        </div>

        <ul className="mt-[0.5cm] space-y-2">
          {AREAS_IMPACTED.map((area) => (
            <li
              key={area.id}
              className="flex items-center justify-between gap-2 rounded-none border border-[#F1F5F9] bg-[#FAFAFA] px-2.5 py-2 text-[11px]"
            >
              <span className="font-semibold text-[#0F172A]">{area.label}</span>
              <span className="text-[10px] text-[#64748B]">
                {area.missions} missions · {area.meals} meals
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
