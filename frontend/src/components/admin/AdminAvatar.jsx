import { FaServer } from "react-icons/fa";
import { getAvatarSrc } from "../../data/adminAvatars";

export default function AdminAvatar({
  id,
  name,
  role,
  userType,
  type,
  size = "md",
  className = "",
}) {
  const src = getAvatarSrc({ id, name, role, userType, type });
  const resolvedRole = role || userType || type;

  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const sizeClass = sizes[size] ?? sizes.md;

  if (!src || resolvedRole === "system" || resolvedRole === "System") {
    return (
      <span
        className={[
          "flex shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
          sizeClass,
          className,
        ].join(" ")}
      >
        <FaServer className={size === "sm" ? "text-xs" : "text-sm"} aria-hidden="true" />
      </span>
    );
  }

  const isNgo = resolvedRole === "ngo" || type === "ngo";

  return (
    <img
      src={src}
      alt={name ? `${name} avatar` : "User avatar"}
      className={[
        "shrink-0 object-cover",
        isNgo ? "rounded-lg" : "rounded-full",
        sizeClass,
        "border border-[#E5E7EB]",
        className,
      ].join(" ")}
    />
  );
}
