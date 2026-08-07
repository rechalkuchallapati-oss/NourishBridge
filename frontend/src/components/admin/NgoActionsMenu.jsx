import {

  FaBan,

  FaCheckCircle,

  FaEnvelope,

  FaEye,

  FaTimesCircle,

  FaTrashAlt,

  FaUserCheck,

} from "react-icons/fa";

import ActionsDropdown from "../ui/ActionsDropdown";



const MENU_ACTIONS = [

  { id: "view", label: "View Details", icon: FaEye },

  {

    id: "verify",

    label: "Verify NGO",

    icon: FaUserCheck,

    showWhen: (ngo) => ngo.verification === "pending",

  },

  {

    id: "reject",

    label: "Reject NGO",

    icon: FaTimesCircle,

    showWhen: (ngo) => ngo.verification === "pending",

  },

  {

    id: "activate",

    label: "Activate NGO",

    icon: FaCheckCircle,

    showWhen: (ngo) => ngo.status === "suspended",

  },

  {

    id: "suspend",

    label: "Suspend NGO",

    icon: FaBan,

    showWhen: (ngo) => ngo.status === "active" || ngo.status === "pending",

  },

  { id: "email", label: "Send Email", icon: FaEnvelope },

  { id: "delete", label: "Delete NGO", icon: FaTrashAlt, danger: true },

];



export default function NgoActionsMenu({ ngo, isOpen, onToggle, onClose, onAction }) {

  return (

    <ActionsDropdown

      label={`Actions for ${ngo.name}`}

      isOpen={isOpen}

      onToggle={onToggle}

      onClose={onClose}

      actions={MENU_ACTIONS}

      onAction={onAction}

      item={ngo}

    />

  );

}

