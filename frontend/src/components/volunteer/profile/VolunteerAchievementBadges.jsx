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
import { useVolunteerMissionContext } from "../../../context/VolunteerMissionContext";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import { VOLUNTEER_CONTENT_STACK, VOLUNTEER_INSET_LINE_GAP } from "../volunteerDashboardStyles";

const BADGE_ICONS = {
  medal: FaMedal,
  star: FaStar,
  trophy: FaTrophy,
  clock: FaClock,
  heart: FaHeart,
  calendar: FaCalendarCheck,
  fire: FaFire,
};

export default function VolunteerAchievementBadges() {
  const { profileImpact } = useVolunteerMissionContext();
  const badgeStats = {
    missionsCompleted: profileImpact.missionsCompleted,
    onTimeRate: VOLUNTEER_IMPACT.onTimeDeliveryRate,
    rating: profileImpact.rating,
    weekendMissions: 12,
    streak: 12,
  };

  return (
    <VolunteerSectionShell>
      <VolunteerSectionTitle
        title="Achievement Badges"
        subtitle="Recognition milestones — unlock conditions shown for each badge."
        theme="amber"
        icon={FaMedal}
        compact
      />

      <ul className={`grid ${VOLUNTEER_CONTENT_STACK} sm:grid-cols-2`}>
        {ACHIEVEMENT_BADGES.map((badge) => {
          const { unlocked, progress } = getBadgeProgress(badge, badgeStats);
          const Icon = BADGE_ICONS[badge.icon] ?? FaMedal;

          return (
            <li
              key={badge.id}
              className={[
                "rounded-none border p-[0.5cm] transition-colors hover:shadow-sm",
                unlocked
                  ? "border-[#BBF7D0] bg-[#F0FDF4]"
                  : "border-[#E5E7EB] bg-[#F8FAFC]",
              ].join(" ")}
            >
              <div className="flex items-start gap-[0.5cm]">
                <span
                  className={[
                    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-none border",
                    unlocked
                      ? "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]"
                      : "border-[#E2E8F0] bg-white text-[#94A3B8]",
                  ].join(" ")}
                >
                  <Icon className="text-base" aria-hidden="true" />
                </span>
                <div className={`min-w-0 flex-1 ${VOLUNTEER_CONTENT_STACK}`}>
                  <div className="flex flex-wrap items-center justify-between gap-[0.5cm]">
                    <p className="text-sm font-bold text-[#0F172A]">{badge.title}</p>
                    <span
                      className={[
                        "text-xs font-semibold",
                        unlocked ? "text-[#15803D]" : "text-[#64748B]",
                      ].join(" ")}
                    >
                      {unlocked ? "Unlocked" : "Locked"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#64748B]">{badge.description}</p>
                  <p className="text-xs font-semibold text-[#475569]">Unlock: {badge.condition}</p>
                  {!unlocked ? (
                    <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
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
    </VolunteerSectionShell>
  );
}
