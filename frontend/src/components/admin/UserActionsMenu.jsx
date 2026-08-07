import {
  FaBan,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaKey,
  FaTrashAlt,
  FaUserCheck,
} from "react-icons/fa";
import ActionsDropdown from "../ui/ActionsDropdown";

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
  return (
    <ActionsDropdown
      label={`Actions for ${user.name}`}
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      actions={MENU_ACTIONS}
      onAction={onAction}
      item={user}
    />
  );
}
