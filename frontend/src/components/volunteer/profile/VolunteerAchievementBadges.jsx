import {
  FaCalendarCheck,
  FaClock,
  FaFire,
  FaHeart,
  FaMedal,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import { VOLUNTEER_IMPACT } from "../../../data/volunteerMission";
import { ACHIEVEMENT_BADGES, getBadgeProgress } from "../../../data/volunteerProfileData";

const BADGE_ICONS = {
  medal: FaMedal,
  star: FaStar,
  trophy: FaTrophy,
  clock: FaClock,
  heart: FaHeart,
  calendar: FaCalendarCheck,
  fire: FaFire,
};

const BADGE_STATS = {
  missionsCompleted: VOLUNTEER_IMPACT.missionsCompleted,
  onTimeRate: VOLUNTEER_IMPACT.onTimeDeliveryRate,
  rating: 4.9,
  weekendMissions: 12,
  streak: 12,
};

export default function VolunteerAchievementBadges() {
  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Achievement Badges</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">
        Recognition milestones — unlock conditions shown for each badge.
      </p>

      <ul className="mt-[0.5cm] grid gap-2 sm:grid-cols-2">
        {ACHIEVEMENT_BADGES.map((badge) => {
          const { unlocked, progress } = getBadgeProgress(badge, BADGE_STATS);
          const Icon = BADGE_ICONS[badge.icon] ?? FaMedal;

          return (
            <li
              key={badge.id}
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
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-none border",
                    unlocked
                      ? "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]"
                      : "border-[#E2E8F0] bg-white text-[#94A3B8]",
                  ].join(" ")}
                >
                  <Icon className="text-sm" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold text-[#0F172A]">{badge.title}</p>
                    <span
                      className={[
                        "text-[10px] font-semibold",
                        unlocked ? "text-[#15803D]" : "text-[#64748B]",
                      ].join(" ")}
                    >
                      {unlocked ? "Unlocked" : "Locked"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#64748B]">{badge.description}</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#475569]">
                    Unlock: {badge.condition}
                  </p>
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
