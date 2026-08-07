import { FaExchangeAlt, FaEye, FaPen, FaTrashAlt } from "react-icons/fa";

import ActionsDropdown from "../../ui/ActionsDropdown";



const ACTIONS = [

  { id: "view", label: "View Details", icon: FaEye },

  { id: "edit", label: "Edit Batch", icon: FaPen },

  { id: "transfer", label: "Transfer", icon: FaExchangeAlt },

  { id: "discard", label: "Discard Batch", icon: FaTrashAlt, danger: true },

];



export default function InventoryActionsMenu({ batch, isOpen, onToggle, onClose, onAction }) {

  return (

    <ActionsDropdown

      label={`Actions for ${batch.id}`}

      isOpen={isOpen}

      onToggle={onToggle}

      onClose={onClose}

      actions={ACTIONS}

      onAction={onAction}

      item={batch}

    />

  );

}

