import {
  FaCheckCircle,
  FaEye,
  FaPlayCircle,
  FaReply,
  FaTimesCircle,
  FaUserPlus,
} from "react-icons/fa";
import ActionsDropdown from "../ui/ActionsDropdown";

const MENU_ACTIONS = [
  { id: "view", label: "View Ticket", icon: FaEye },
  { id: "assign", label: "Assign Ticket", icon: FaUserPlus },
  { id: "progress", label: "Mark In Progress", icon: FaPlayCircle, showWhen: (t) => t.status === "open" },
  { id: "resolve", label: "Mark Resolved", icon: FaCheckCircle, showWhen: (t) => t.status !== "resolved" && t.status !== "closed" },
  { id: "close", label: "Close Ticket", icon: FaTimesCircle, showWhen: (t) => t.status !== "closed" },
  { id: "reply", label: "Reply to User", icon: FaReply },
];

export default function TicketActionsMenu({ ticket, isOpen, onToggle, onClose, onAction }) {
  return (
    <ActionsDropdown
      label={`Actions for ${ticket.id}`}
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      actions={MENU_ACTIONS}
      onAction={onAction}
      item={ticket}
    />
  );
}
