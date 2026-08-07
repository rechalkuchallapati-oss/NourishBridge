import { FaCheck, FaEye, FaFileAlt, FaRoute, FaTimes, FaTruck, FaUserPlus } from "react-icons/fa";

import ActionsDropdown from "../../ui/ActionsDropdown";



const ACTIONS = [

  { id: "view", label: "View Details", icon: FaEye },

  { id: "approve", label: "Approve Request", icon: FaCheck },

  { id: "reject", label: "Reject Request", icon: FaTimes, danger: true },

  { id: "assign_donation", label: "Assign Donation", icon: FaUserPlus },

  { id: "assign_volunteer", label: "Assign Volunteer", icon: FaTruck },

  { id: "route", label: "View Route", icon: FaRoute },

  { id: "report", label: "Generate Report", icon: FaFileAlt },

];



export default function FoodRequestActionsMenu({ request, isOpen, onToggle, onClose, onAction }) {

  return (

    <ActionsDropdown

      label={`Actions for ${request.id}`}

      isOpen={isOpen}

      onToggle={onToggle}

      onClose={onClose}

      actions={ACTIONS}

      onAction={onAction}

      item={request}

    />

  );

}

