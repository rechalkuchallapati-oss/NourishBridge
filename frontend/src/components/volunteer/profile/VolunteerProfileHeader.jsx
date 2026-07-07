import { useCallback, useEffect, useState } from "react";
import { FaCheck, FaShieldAlt, FaStar, FaUser } from "react-icons/fa";
import { VOLUNTEER_IDENTITY, getVolunteerAvatar } from "../../../data/volunteerAssets";
import { getVolunteerLevel } from "../../../data/volunteerProfileData";
import { useVolunteerMissionContext } from "../../../context/VolunteerMissionContext";
import { getVolunteerDisplayName, getVolunteerProfile } from "../../../utils/authStorage";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import { VOLUNTEER_CONTENT_STACK, VOLUNTEER_INSET_LINE_GAP } from "../volunteerDashboardStyles";

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={[
            "text-sm",
            rating >= index + 1 ? "text-[#F59E0B]" : "text-[#E2E8F0]",
          ].join(" ")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function VolunteerProfileHeader() {
  const { profileImpact } = useVolunteerMissionContext();
  const [profile, setProfile] = useState(() => getVolunteerProfile());
  const displayName = getVolunteerDisplayName();
  const level = getVolunteerLevel(profileImpact.missionsCompleted);
  const avatarSrc = getVolunteerAvatar(profile);

  const refreshProfile = useCallback(() => {
    setProfile(getVolunteerProfile());
  }, []);

  useEffect(() => {
    window.addEventListener("nb-volunteer-profile-updated", refreshProfile);
    return () => window.removeEventListener("nb-volunteer-profile-updated", refreshProfile);
  }, [refreshProfile]);

  return (
    <VolunteerSectionShell>
      <VolunteerSectionTitle
        heading="h1"
        title={displayName}
        subtitle={`ID: ${profile.volunteerId ?? VOLUNTEER_IDENTITY.volunteerId} · ${profile.city ?? "Hyderabad"}`}
        theme="emerald"
        icon={FaUser}
      />

      <div className={`flex flex-col sm:flex-row sm:items-center ${VOLUNTEER_CONTENT_STACK}`}>
        <div className="flex shrink-0 flex-col items-center sm:items-start">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#BBF7D0] bg-[#F0FDF4] shadow-[0_8px_24px_rgba(22,163,74,0.15)] sm:h-32 sm:w-32">
              <img src={avatarSrc} alt={displayName} className="h-full w-full object-cover" />
            </div>
            {VOLUNTEER_IDENTITY.verified ? (
              <span
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#16A34A] text-white shadow-sm"
                title="Verified volunteer"
              >
                <FaCheck className="text-xs" aria-hidden="true" />
              </span>
            ) : null}
          </div>
        </div>

        <div className={`min-w-0 flex-1 text-center sm:text-left ${VOLUNTEER_CONTENT_STACK}`}>
          <div className="flex flex-wrap items-center justify-center gap-[0.5cm] sm:justify-start">
            {VOLUNTEER_IDENTITY.verified ? (
              <span className="inline-flex items-center gap-1.5 rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1.5 text-xs font-semibold text-[#16A34A]">
                <FaShieldAlt aria-hidden="true" />
                Verified Volunteer
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5 rounded-none border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-1.5 text-xs font-semibold text-[#7C3AED]">
              Level {level.level} · {level.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-[0.5cm] sm:justify-start">
            <StarRating rating={profileImpact.rating} />
            <span className="text-base font-bold text-[#0F172A]">
              {profileImpact.rating.toFixed(1)}
            </span>
            <span className="text-sm text-[#64748B]">
              ({profileImpact.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className={`flex shrink-0 flex-col items-center ${VOLUNTEER_CONTENT_STACK} sm:items-end`}>
          <div className="rounded-none border border-[#DDD6FE] bg-white px-5 py-4 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[#64748B]">Trust Score</p>
            <p className={`${VOLUNTEER_INSET_LINE_GAP} text-3xl font-extrabold text-[#7C3AED]`}>
              {profileImpact.trustScore}
            </p>
            <p className="text-xs text-[#64748B]">out of 100</p>
          </div>
          {level.nextLevel ? (
            <div className="w-full min-w-[160px] sm:w-44">
              <div className="flex justify-between text-xs text-[#64748B]">
                <span>Level {level.level}</span>
                <span>{level.missionsToNext} to L{level.nextLevel}</span>
              </div>
              <div className={`${VOLUNTEER_INSET_LINE_GAP} h-2 overflow-hidden rounded-full bg-[#E2E8F0]`}>
                <div
                  className="h-full rounded-full bg-[#16A34A] transition-all"
                  style={{ width: `${level.progressToNext}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </VolunteerSectionShell>
  );
}
