import { ImSpinner2 } from "react-icons/im";

const variants = {
  primary: [
    "bg-[#16A34A] text-white",
    "shadow-[0_4px_14px_rgba(22,163,74,0.3)]",
    "hover:bg-[#15803D] hover:shadow-[0_6px_20px_rgba(22,163,74,0.38)]",
    "focus-visible:ring-[#16A34A]/40",
  ].join(" "),

  secondary: [
    "bg-[#0F172A] text-white",
    "shadow-[0_4px_14px_rgba(15,23,42,0.2)]",
    "hover:bg-[#1E293B] hover:shadow-[0_6px_20px_rgba(15,23,42,0.28)]",
    "focus-visible:ring-[#0F172A]/30",
  ].join(" "),

  outline: [
    "border-2 border-[#16A34A] bg-white text-[#16A34A]",
    "hover:bg-[#E8F8EF] hover:shadow-[0_4px_14px_rgba(22,163,74,0.15)]",
    "focus-visible:ring-[#16A34A]/30",
  ].join(" "),

  ghost: [
    "bg-transparent text-[#16A34A]",
    "hover:bg-[#E8F8EF]",
    "focus-visible:ring-[#16A34A]/25",
  ].join(" "),
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  icon: Icon,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseClasses = [
    "inline-flex items-center justify-center gap-2",
    "h-12 px-6 rounded-xl",
    "text-[15px] font-semibold whitespace-nowrap",
    "transition-all duration-300 ease-out",
    "hover:scale-[1.02] active:scale-[0.98]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 disabled:scale-100 disabled:shadow-none",
    variants[variant] ?? variants.primary,
    className,
  ].join(" ");

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={baseClasses}
      {...props}
    >
      {loading ? (
        <ImSpinner2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon className="h-[1.1em] w-[1.1em] shrink-0" aria-hidden="true" />
      ) : null}

      {children}
    </button>
  );
};

export default Button;
