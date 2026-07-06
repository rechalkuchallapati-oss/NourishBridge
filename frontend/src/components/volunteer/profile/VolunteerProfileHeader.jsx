import { useCallback, useEffect, useState } from "react";
import { FaCheck, FaShieldAlt, FaStar } from "react-icons/fa";
import { VOLUNTEER_IDENTITY, getVolunteerAvatar } from "../../../data/volunteerAssets";
import { getVolunteerLevel } from "../../../data/volunteerProfileData";
import { getVolunteerDisplayName, getVolunteerProfile } from "../../../utils/authStorage";

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={[
            "text-[11px]",
            rating >= index + 1 ? "text-[#F59E0B]" : "text-[#E2E8F0]",
          ].join(" ")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function VolunteerProfileHeader() {
  const [profile, setProfile] = useState(() => getVolunteerProfile());
  const displayName = getVolunteerDisplayName();
  const level = getVolunteerLevel();
  const avatarSrc = getVolunteerAvatar(profile);

  const refreshProfile = useCallback(() => {
    setProfile(getVolunteerProfile());
  }, []);

  useEffect(() => {
    window.addEventListener("nb-volunteer-profile-updated", refreshProfile);
    return () => window.removeEventListener("nb-volunteer-profile-updated", refreshProfile);
  }, [refreshProfile]);

  return (
    <section className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F0FDF4] via-white to-[#EFF6FF] shadow-sm">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#BBF7D0]/30 blur-2xl" aria-hidden="true" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#BFDBFE]/40 blur-2xl" aria-hidden="true" />

      <div className="relative flex flex-col gap-[0.5cm] p-[0.5cm] sm:flex-row sm:items-center sm:p-6">
        <div className="flex shrink-0 flex-col items-center sm:items-start">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#BBF7D0] bg-[#F0FDF4] shadow-[0_8px_24px_rgba(22,163,74,0.15)] sm:h-28 sm:w-28">
              <img src={avatarSrc} alt={displayName} className="h-full w-full object-cover" />
            </div>
            {VOLUNTEER_IDENTITY.verified ? (
              <span
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#16A34A] text-white shadow-sm"
                title="Verified volunteer"
              >
                <FaCheck className="text-[10px]" aria-hidden="true" />
              </span>
            ) : null}
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
            Volunteer Profile
          </p>
          <h1 className="mt-1 text-xl font-bold text-[#0F172A] sm:text-2xl">{displayName}</h1>
          <p className="mt-1 text-xs text-[#64748B]">
            ID: {profile.volunteerId ?? VOLUNTEER_IDENTITY.volunteerId} · {profile.city ?? "Hyderabad"}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {VOLUNTEER_IDENTITY.verified ? (
              <span className="inline-flex items-center gap-1 rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-2.5 py-1 text-[10px] font-semibold text-[#16A34A]">
                <FaShieldAlt className="text-[9px]" aria-hidden="true" />
                Verified Volunteer
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 rounded-none border border-[#DDD6FE] bg-[#F5F3FF] px-2.5 py-1 text-[10px] font-semibold text-[#7C3AED]">
              Level {level.level} · {level.title}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <StarRating rating={VOLUNTEER_IDENTITY.rating} />
            <span className="text-sm font-bold text-[#0F172A]">
              {VOLUNTEER_IDENTITY.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-[#64748B]">
              ({VOLUNTEER_IDENTITY.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 sm:items-end">
          <div className="rounded-none border border-[#DDD6FE] bg-white px-4 py-3 text-center shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
              Trust Score
            </p>
            <p className="mt-0.5 text-2xl font-extrabold text-[#7C3AED]">94</p>
            <p className="text-[10px] text-[#64748B]">out of 100</p>
          </div>
          {level.nextLevel ? (
            <div className="w-full min-w-[140px] sm:w-40">
              <div className="flex justify-between text-[10px] text-[#64748B]">
                <span>Level {level.level}</span>
                <span>{level.missionsToNext} to L{level.nextLevel}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
                <div
                  className="h-full rounded-full bg-[#16A34A] transition-all"
                  style={{ width: `${level.progressToNext}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
