import { useEffect, useRef } from "react";
import {
  FaBan,
  FaCheckCircle,
  FaEllipsisV,
  FaEnvelope,
  FaEye,
  FaKey,
  FaTrashAlt,
  FaUserCheck,
} from "react-icons/fa";

const MENU_ACTIONS = [
  { id: "view", label: "View Details", icon: FaEye },
  { id: "verify", label: "Verify User", icon: FaUserCheck, showWhen: (user) => user.verification === "pending" },
  { id: "activate", label: "Activate User", icon: FaCheckCircle, showWhen: (user) => user.status === "suspended" },
  { id: "suspend", label: "Suspend User", icon: FaBan, showWhen: (user) => user.status !== "suspended" },
  { id: "email", label: "Send Email", icon: FaEnvelope },
  { id: "reset", label: "Reset Password", icon: FaKey },
  { id: "delete", label: "Delete User", icon: FaTrashAlt, danger: true },
];

export default function UserActionsMenu({ user, isOpen, onToggle, onClose, onAction }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
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

  const visibleActions = MENU_ACTIONS.filter(
    (action) => !action.showWhen || action.showWhen(user),
  );

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Actions for ${user.name}`}
        className={[
          "inline-flex h-8 w-8 items-center justify-center rounded-none border transition-colors",
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
          className="absolute right-0 z-20 mt-1 min-w-[180px] rounded-none border border-[#E5E7EB] bg-white py-1 shadow-lg"
        >
          {visibleActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                role="menuitem"
                onClick={() => onAction(action.id, user)}
                className={[
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium transition-colors",
                  action.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-[#0F172A] hover:bg-[#F8FAFC]",
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
