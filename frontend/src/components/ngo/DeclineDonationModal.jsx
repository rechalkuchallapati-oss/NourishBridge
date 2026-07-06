import { useState } from "react";
import toast from "react-hot-toast";
import { DECLINE_REASONS } from "../../data/ngoIncomingDonations";
import NGOModal from "./NGOModal";

export default function DeclineDonationModal({ donation, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!reason) {
      toast.error("Please select a decline reason.");
      return;
    }
    const selected = DECLINE_REASONS.find((item) => item.id === reason);
    onConfirm(donation.id, { reason: selected?.label ?? reason, notes });
    toast.success(`Donation ${donation.id} declined.`);
    onClose();
  };

  return (
    <NGOModal title={`Decline ${donation.id}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[0.5cm]">
        <p className="text-sm leading-6 text-[#64748B]">
          Declining <strong className="text-[#0F172A]">{donation.foodName}</strong> from{" "}
          <strong className="text-[#0F172A]">{donation.donorName}</strong>. A reason is
          required for audit and donor communication.
        </p>

        <fieldset className="flex flex-col gap-[0.3cm]">
          <legend className="text-sm font-semibold text-[#0F172A]">Reason for decline</legend>
          {DECLINE_REASONS.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-3 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 transition-colors hover:border-[#2563EB]/30"
            >
              <input
                type="radio"
                name="declineReason"
                value={item.id}
                checked={reason === item.id}
                onChange={() => setReason(item.id)}
                className="accent-[#2563EB]"
              />
              <span className="text-sm font-medium text-[#0F172A]">{item.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="flex flex-col gap-[0.3cm]">
          <label htmlFor="decline-notes" className="text-sm font-semibold text-[#0F172A]">
            Additional notes (optional)
          </label>
          <textarea
            id="decline-notes"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Explain any operational constraints..."
            className="w-full resize-none rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-[0.5cm] pt-2">
          <button
            type="submit"
            className="rounded-none bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            Confirm Decline
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-none border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
        </div>
      </form>
    </NGOModal>
  );
}
