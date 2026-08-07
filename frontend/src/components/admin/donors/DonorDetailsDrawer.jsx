import { AnimatePresence, motion } from "framer-motion";
import { Download, Mail, Medal, Phone, X } from "lucide-react";
import {
  DONOR_TYPE_LABELS,
  STATUS_COLORS,
  STATUS_LABELS,
  getDonorTier,
} from "../../../data/adminDonors";
import { ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN } from "../adminStyles";

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#F1F5F9] py-2.5 last:border-0">
      <span className="text-xs font-medium text-[#64748B]">{label}</span>
      <span className="max-w-[60%] text-right text-xs font-semibold text-[#0F172A]">{value}</span>
    </div>
  );
}

export default function DonorDetailsDrawer({ donor, isOpen, onClose, onAction }) {
  if (!donor) return null;
  const tier = getDonorTier(donor.donations);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col border-l border-[#E5E7EB] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Donor Profile</h3>
                <p className="text-xs font-semibold text-[#16A34A]">{donor.id}</p>
              </div>
              <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC]">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className={`mb-4 rounded-[16px] border p-4 text-center ring-2 ${tier.color} ${tier.ring}`}>
                <span className="text-3xl">{tier.emoji}</span>
                <p className="mt-2 text-sm font-bold text-[#0F172A]">{tier.medal}</p>
                <p className="text-xs text-[#64748B]">{tier.label} tier · {donor.donations} donations</p>
              </div>

              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <img src={donor.avatar} alt={donor.name} className="h-20 w-20 rounded-full border-2 border-[#BBF7D0] object-cover" />
                <div>
                  <p className="text-xl font-bold text-[#0F172A]">{donor.name}</p>
                  <p className="text-sm text-[#64748B]">{DONOR_TYPE_LABELS[donor.type]}</p>
                  <span className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[donor.status]}`}>
                    {STATUS_LABELS[donor.status]}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3 text-center">
                  <p className="text-lg font-extrabold text-[#0F172A]">{donor.donations}</p>
                  <p className="text-[10px] text-[#64748B]">Donations</p>
                </div>
                <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3 text-center">
                  <p className="text-lg font-extrabold text-[#0F172A]">{donor.mealsContributed.toLocaleString()}</p>
                  <p className="text-[10px] text-[#64748B]">Meals</p>
                </div>
                <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3 text-center">
                  <p className="text-lg font-extrabold text-[#0F172A]">{donor.rating || "—"}</p>
                  <p className="text-[10px] text-[#64748B]">Rating</p>
                </div>
              </div>

              <h4 className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">Contact</h4>
              <DetailRow label="Contact Person" value={donor.contactPerson} />
              <DetailRow label="Email" value={donor.email} />
              <DetailRow label="Phone" value={donor.phone} />
              <DetailRow label="City" value={donor.city} />

              <h4 className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">Donation Activity</h4>
              <DetailRow label="Last Donation" value={donor.lastDonation} />
              <DetailRow label="Avg. Quantity" value={donor.avgQuantity} />
              <DetailRow label="Preferred Pickup" value={donor.preferredPickup} />
              <DetailRow label="Recurring" value={donor.recurring ? "Yes" : "No"} />
              <DetailRow label="Joined" value={donor.joined} />
              <DetailRow label="Verified" value={donor.verified ? "Verified" : "Pending"} />
            </div>

            <div className="flex flex-wrap gap-2 border-t border-[#E5E7EB] p-4">
              <button type="button" onClick={() => onAction?.("contact", donor)} className={`${ADMIN_PRIMARY_BTN} flex-1`}>
                <Mail size={16} /> Contact
              </button>
              <button type="button" onClick={() => onAction?.("award", donor)} className={`${ADMIN_SECONDARY_BTN} flex-1`}>
                <Medal size={16} /> Award
              </button>
              <button type="button" onClick={() => onAction?.("report", donor)} className={`${ADMIN_SECONDARY_BTN} px-3`}>
                <Download size={16} />
              </button>
              <button type="button" onClick={() => onAction?.("verify", donor)} className={`${ADMIN_SECONDARY_BTN} px-3`}>
                <Phone size={16} />
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
