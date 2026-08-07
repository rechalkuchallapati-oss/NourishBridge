import { useEffect, useRef } from "react";
import { FaEllipsisV, FaEye, FaCheck, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";

const MENU_ACTIONS = [
  { id: "view", label: "View Details", icon: FaEye },
  { id: "mark_read", label: "Mark as Read", icon: FaCheck },
  { id: "open_ref", label: "Open Reference", icon: FaExternalLinkAlt },
  { id: "delete", label: "Remove", icon: FaTrashAlt, danger: true },
];

export default function NotificationActionsMenu({ notification, isOpen, onToggle, onClose, onAction }) {
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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`Actions for ${notification.id}`}
        className={[
          "inline-flex h-9 w-9 items-center justify-center border transition-all duration-200",
          isOpen
            ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]"
            : "border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#BBF7D0] hover:bg-[#F8FAFC]",
        ].join(" ")}
      >
        <FaEllipsisV aria-hidden="true" />
      </button>
      {isOpen ? (
        <div className="absolute right-0 z-20 mt-1 min-w-[200px] border border-[#E5E7EB] bg-white py-1 shadow-lg">
          {MENU_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => onAction(action.id, notification)}
                className={[
                  "flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium transition-colors",
                  action.danger ? "text-red-600 hover:bg-red-50" : "text-[#0F172A] hover:bg-[#F8FAFC]",
                ].join(" ")}
              >
                <Icon className="shrink-0 text-xs" aria-hidden="true" />
                {action.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
