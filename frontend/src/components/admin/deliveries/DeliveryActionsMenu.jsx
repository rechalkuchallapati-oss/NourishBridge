import { FaEye, FaFileAlt, FaMapMarkerAlt, FaPhone, FaRoute, FaTruck, FaUserPlus } from "react-icons/fa";

import ActionsDropdown from "../../ui/ActionsDropdown";



const ACTIONS = [

  { id: "view", label: "View Details", icon: FaEye },

  { id: "track", label: "Track Live", icon: FaMapMarkerAlt },

  { id: "route", label: "View Route", icon: FaRoute },

  { id: "reassign", label: "Reassign Volunteer", icon: FaUserPlus },

  { id: "contact_donor", label: "Contact Donor", icon: FaPhone },

  { id: "contact_ngo", label: "Contact NGO", icon: FaTruck },

  { id: "report", label: "Generate Report", icon: FaFileAlt },

];



export default function DeliveryActionsMenu({ delivery, isOpen, onToggle, onClose, onAction }) {

  return (

    <ActionsDropdown

      label={`Actions for ${delivery.id}`}

      isOpen={isOpen}

      onToggle={onToggle}

      onClose={onClose}

      actions={ACTIONS}

      onAction={onAction}

      item={delivery}

    />

  );

}

