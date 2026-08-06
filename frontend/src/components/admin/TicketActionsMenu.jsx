import { useEffect, useRef } from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaEye,
  FaPlayCircle,
  FaReply,
  FaTimesCircle,
  FaUserPlus,
} from "react-icons/fa";

const MENU_ACTIONS = [
  { id: "view", label: "View Ticket", icon: FaEye },
  { id: "assign", label: "Assign Ticket", icon: FaUserPlus },
  { id: "progress", label: "Mark In Progress", icon: FaPlayCircle, showWhen: (t) => t.status === "open" },
  { id: "resolve", label: "Mark Resolved", icon: FaCheckCircle, showWhen: (t) => t.status !== "resolved" && t.status !== "closed" },
  { id: "close", label: "Close Ticket", icon: FaTimesCircle, showWhen: (t) => t.status !== "closed" },
  { id: "reply", label: "Reply to User", icon: FaReply },
];

export default function TicketActionsMenu({ ticket, isOpen, onToggle, onClose, onAction }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) onClose();
    }

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const visibleActions = MENU_ACTIONS.filter((a) => !a.showWhen || a.showWhen(ticket));

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Actions for ${ticket.id}`}
        className={[
          "inline-flex h-8 w-8 items-center justify-center rounded-none border transition-all duration-200",
          isOpen
            ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]"
            : "border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#BBF7D0] hover:bg-[#F8FAFC]",
        ].join(" ")}
      >
        <FaEllipsisV aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 min-w-[190px] rounded-none border border-[#E5E7EB] bg-white py-1 shadow-lg"
        >
          {visibleActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                role="menuitem"
                onClick={() => onAction(action.id, ticket)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
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
