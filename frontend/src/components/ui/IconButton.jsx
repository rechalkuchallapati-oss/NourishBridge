import { BTN_ICON } from "../../styles/designTokens";

export default function IconButton({
  label,
  onClick,
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const danger = variant === "danger"
    ? "border-[#FECACA] text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
    : "";

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={[BTN_ICON, danger, className].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
