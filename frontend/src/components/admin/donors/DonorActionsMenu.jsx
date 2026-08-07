import { FaBan, FaEye, FaFileAlt, FaMedal, FaStar, FaUserCheck } from "react-icons/fa";
import ActionsDropdown from "../../ui/ActionsDropdown";

const ACTIONS = [
  { id: "view", label: "View Profile", icon: FaEye },
  { id: "award", label: "Manage Award Tier", icon: FaMedal },
  { id: "verify", label: "Verify Donor", icon: FaUserCheck },
  { id: "report", label: "Donation Report", icon: FaFileAlt },
  { id: "contact", label: "Contact Donor", icon: FaStar },
  { id: "suspend", label: "Suspend Donor", icon: FaBan, danger: true },
];

export default function DonorActionsMenu({ donor, isOpen, onToggle, onClose, onAction }) {
  return (
    <ActionsDropdown
      label={`Actions for ${donor.name}`}
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      actions={ACTIONS}
      onAction={onAction}
      item={donor}
    />
  );
}
