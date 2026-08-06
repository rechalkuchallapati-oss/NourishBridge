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
      className={[ADMIN_INTERACTIVE_CARD, "p-5 sm:p-6", className].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
