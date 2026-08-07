import { FaCopy, FaEye, FaFlag } from "react-icons/fa";

import ActionsDropdown from "../ui/ActionsDropdown";

const MENU_ACTIONS = [
  { id: "view", label: "More Details", icon: FaEye },
  { id: "copy_ip", label: "Copy IP Address", icon: FaCopy },
  { id: "flag", label: "Flag Event", icon: FaFlag },
];

export default function AuditLogActionsMenu({ log, isOpen, onToggle, onClose, onAction }) {
  return (
    <ActionsDropdown
      label={`More details for ${log.id}`}
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      actions={MENU_ACTIONS}
      onAction={onAction}
      item={log}
    />
  );
}
