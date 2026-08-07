import { useEffect, useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { BTN_ICON } from "../../styles/designTokens";

/**
 * Shared enterprise actions dropdown — icon trigger + animated menu.
 */
export default function ActionsDropdown({
  label,
  isOpen,
  onToggle,
  onClose,
  actions,
  onAction,
  item,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [isOpen, onClose]);

  const visible = actions.filter((a) => !a.showWhen || a.showWhen(item));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={label}
        title="Actions"
        className={[
          BTN_ICON,
          "h-10 w-10",
          isOpen ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]" : "",
        ].join(" ")}
      >
        <FaEllipsisV aria-hidden="true" />
      </button>
      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 min-w-[200px] overflow-hidden rounded-[12px] border border-[#E8ECF0] bg-white py-1 shadow-[0_12px_40px_rgba(15,23,42,0.12)] nb-animate-scale-in"
        >
          {visible.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                role="menuitem"
                title={action.label}
                onClick={() => onAction(action.id, item)}
                className={[
                  "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200",
                  action.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-[#0F172A] hover:bg-[#F0FDF4] hover:text-[#16A34A]",
                ].join(" ")}
              >
                {Icon ? <Icon className="shrink-0 text-sm" aria-hidden="true" /> : null}
                {action.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
