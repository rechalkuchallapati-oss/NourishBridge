import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { resolveProfileImageUrl } from "../../modules/profile/services/profileService";
import { getRoleDefaultAvatar } from "../../data/profileDefaults";

const SIZE_MAP = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-20 w-20 text-2xl",
  xl: "h-24 w-24 text-3xl sm:h-28 sm:w-28",
};

/**
 * Reusable profile avatar with role-based default image fallback.
 */
export default function ProfileAvatar({
  profileImage,
  role = "donor",
  displayName = "User",
  size = "lg",
  className = "",
  accent = "green",
}) {
  const [broken, setBroken] = useState(false);

  const accentMap = {
    green: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
    blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
    indigo: "border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]",
  };

  const resolved = profileImage ? resolveProfileImageUrl(profileImage) : null;
  const fallback = getRoleDefaultAvatar(role);
  const showDefault = !resolved || broken;

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px]",
        SIZE_MAP[size] ?? SIZE_MAP.lg,
        accentMap[accent] ?? accentMap.green,
        className,
      ].join(" ")}
    >
      {showDefault ? (
        <img
          src={fallback}
          alt={`${displayName} default avatar`}
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <img
          src={resolved}
          alt={displayName}
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      )}
      {broken && !fallback ? (
        <FaUser className="opacity-70" aria-hidden="true" />
      ) : null}
    </div>
  );
}
