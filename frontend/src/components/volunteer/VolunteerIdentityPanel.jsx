import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaStar } from "react-icons/fa";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { VOLUNTEER_IDENTITY, getVolunteerAvatar } from "../../data/volunteerAssets";
import { getVolunteerDisplayName, getVolunteerProfile } from "../../utils/authStorage";

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = rating >= index + 1;
        const half = !filled && rating >= index + 0.5;

        return (
          <FaStar
            key={index}
            className={[
              "text-[10px]",
              filled || half ? "text-[#F59E0B]" : "text-[#E2E8F0]",
            ].join(" ")}
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}

export default function VolunteerIdentityPanel() {
  const [profile, setProfile] = useState(() => getVolunteerProfile());
  const displayName = getVolunteerDisplayName();
  const volunteerId = profile.volunteerId ?? VOLUNTEER_IDENTITY.volunteerId;
  const rating = VOLUNTEER_IDENTITY.rating;
  const reviewCount = VOLUNTEER_IDENTITY.reviewCount;
  const avatarSrc = getVolunteerAvatar(profile);

  const refreshProfile = useCallback(() => {
    setProfile(getVolunteerProfile());
  }, []);

  useEffect(() => {
    window.addEventListener("nb-volunteer-profile-updated", refreshProfile);
    return () => window.removeEventListener("nb-volunteer-profile-updated", refreshProfile);
  }, [refreshProfile]);

  return (
    <div className="mt-auto shrink-0 border-t border-[#E5E7EB] pt-4">
      <div className="flex flex-col items-center px-2 pb-1 text-center">
        <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#BBF7D0] bg-[#F0FDF4] shadow-[0_4px_16px_rgba(22,163,74,0.12)]">
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <p className="mt-3 text-[10px] font-semibold tracking-wide text-[#64748B]">
          Volunteer ID: <span className="text-[#0F172A]">{volunteerId}</span>
        </p>

        {VOLUNTEER_IDENTITY.verified ? (
          <span className="mt-2 inline-flex items-center gap-1 rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-2.5 py-1 text-[10px] font-semibold text-[#16A34A]">
            <FaCheck className="text-[9px]" aria-hidden="true" />
            Verified
          </span>
        ) : null}

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
          <StarRating rating={rating} />
          <span className="text-xs font-bold text-[#0F172A]">{rating.toFixed(1)}</span>
          <span className="text-[10px] font-medium text-[#64748B]">
            ({reviewCount} reviews)
          </span>
        </div>

        <Link
          to={DASHBOARD_ROUTES.volunteerProfile}
          className="mt-3 flex w-full items-center justify-center rounded-none border-2 border-[#16A34A] bg-white px-3 py-2.5 text-xs font-semibold text-[#15803D] transition-colors duration-300 hover:bg-[#F0FDF4]"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
