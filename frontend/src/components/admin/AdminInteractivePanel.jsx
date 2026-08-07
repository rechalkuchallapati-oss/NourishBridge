import { ADMIN_INTERACTIVE_CARD } from "./adminStyles";

export default function AdminInteractivePanel({
  children,
  className = "",
  as: Component = "div",
  onClick,
  ...props
}) {
  return (
    <Component
      onClick={onClick}
      className={[ADMIN_INTERACTIVE_CARD, "p-6 sm:p-7", className].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
