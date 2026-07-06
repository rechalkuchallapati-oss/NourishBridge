import { FaMedal, FaStar, FaTrophy } from "react-icons/fa";
import { IMPACT_MILESTONES, VOLUNTEER_IMPACT } from "../../data/volunteerMission";

const MILESTONE_ICONS = {
  starter: FaMedal,
  hero: FaStar,
  champion: FaTrophy,
};

export default function ImpactMilestones() {
  const completed = VOLUNTEER_IMPACT.missionsCompleted;

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Milestones</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">
        Recognition for your rescue journey — not used for mission priority.
      </p>

      <ul className="mt-4 space-y-3">
        {IMPACT_MILESTONES.map((milestone) => {
          const unlocked = completed >= milestone.threshold;
          const progress = Math.min((completed / milestone.threshold) * 100, 100);
          const Icon = MILESTONE_ICONS[milestone.id] ?? FaMedal;

          return (
            <li
              key={milestone.id}
              className={[
                "rounded-none border p-3 transition-colors",
                unlocked
                  ? "border-[#BBF7D0] bg-[#F0FDF4]"
                  : "border-[#E5E7EB] bg-[#F8FAFC]",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <span
                  className={[
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-none border",
                    unlocked
                      ? "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]"
                      : "border-[#E2E8F0] bg-white text-[#94A3B8]",
                  ].join(" ")}
                >
                  <Icon className="text-sm" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold text-[#0F172A]">{milestone.title}</p>
                    <span
                      className={[
                        "text-[10px] font-semibold",
                        unlocked ? "text-[#15803D]" : "text-[#64748B]",
                      ].join(" ")}
                    >
                      {unlocked ? "Unlocked" : `${milestone.threshold} missions`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#64748B]">{milestone.description}</p>
                  {!unlocked ? (
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
                      <div
                        className="h-full rounded-full bg-[#16A34A] transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
