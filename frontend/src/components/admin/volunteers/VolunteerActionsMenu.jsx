import { FaBan, FaEye, FaFileAlt, FaRoute, FaStar, FaTruck, FaUserCheck } from "react-icons/fa";

import ActionsDropdown from "../../ui/ActionsDropdown";



const ACTIONS = [

  { id: "view", label: "View Profile", icon: FaEye },

  { id: "assign", label: "Assign Mission", icon: FaTruck },

  { id: "route", label: "View Route", icon: FaRoute },

  { id: "contact", label: "Contact Volunteer", icon: FaStar },

  { id: "verify", label: "Approve Verification", icon: FaUserCheck },

  { id: "report", label: "Performance Report", icon: FaFileAlt },

  { id: "suspend", label: "Suspend Volunteer", icon: FaBan, danger: true },

];



export default function VolunteerActionsMenu({ volunteer, isOpen, onToggle, onClose, onAction }) {

  return (

    <ActionsDropdown

      label={`Actions for ${volunteer.name}`}

      isOpen={isOpen}

      onToggle={onToggle}

      onClose={onClose}

      actions={ACTIONS}

      onAction={onAction}

      item={volunteer}

    />

  );

}

