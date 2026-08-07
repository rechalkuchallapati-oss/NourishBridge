import { BTN_DANGER, BTN_PRIMARY, BTN_SECONDARY, BTN_SUCCESS, BTN_WARNING } from "../../styles/designTokens";

const VARIANTS = {
  primary: BTN_PRIMARY,
  secondary: BTN_SECONDARY,
  danger: BTN_DANGER,
  success: BTN_SUCCESS,
  warning: BTN_WARNING,
};

export default function Button({
  variant = "primary",
  type = "button",
  className = "",
  children,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[VARIANTS[variant] ?? BTN_PRIMARY, className].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
