import { useEffect, useState } from "react";
import { X, QrCode, MapPin, Clock, Download, Check, UserPlus, Truck, Route, Image, FileText, Ban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminAvatar from "../AdminAvatar";
import DonationWorkflowTimeline from "./DonationWorkflowTimeline";
import { DonationRouteMap } from "./DonationCharts";
import { ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN } from "../adminStyles";
import { CATEGORY_LABELS, DONOR_TYPE_LABELS, STATUS_COLORS, STATUS_LABELS } from "../../../data/adminDonations";
import { fetchNgoMatches, fetchVolunteerMatches } from "../../../modules/matching/services/matchingService";

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#F1F5F9] py-2 last:border-0">
      <span className="text-xs font-medium text-[#64748B]">{label}</span>
      <span className="max-w-[60%] text-right text-xs font-semibold text-[#0F172A]">{value}</span>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h4 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">{children}</h4>;
}

export default function DonationDetailsDrawer({ donation, isOpen, onClose, onAction }) {
  const [ngoMatches, setNgoMatches] = useState([]);
  const [volunteerMatches, setVolunteerMatches] = useState([]);

  useEffect(() => {
    const donationId = donation?.mongoId;
    if (!isOpen || !donationId) {
      setNgoMatches([]);
      setVolunteerMatches([]);
      return;
    }
    let cancelled = false;
    Promise.all([
      fetchNgoMatches(donationId).catch(() => []),
      fetchVolunteerMatches(donationId).catch(() => []),
    ]).then(([ngos, volunteers]) => {
      if (!cancelled) {
        setNgoMatches(ngos.slice(0, 3));
        setVolunteerMatches(volunteers.slice(0, 3));
      }
    });
    return () => { cancelled = true; };
  }, [donation?.mongoId, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && donation ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col border-l border-[#E5E7EB] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Donation Details</h3>
                <p className="text-xs font-semibold text-[#16A34A]">{donation.id}</p>
              </div>
              <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC]">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <img src={donation.image} alt={donation.foodItem} className="h-44 w-full rounded-[14px] object-cover" />

              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-lg font-bold text-[#0F172A]">{donation.foodItem}</p>
                  <p className="text-sm text-[#64748B]">{CATEGORY_LABELS[donation.category]}</p>
                </div>
                <span className={`inline-flex shrink-0 border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[donation.status]}`}>
                  {STATUS_LABELS[donation.status]}
                </span>
              </div>

              <SectionTitle>Donation Information</SectionTitle>
              <DetailRow label="Quantity" value={donation.quantity} />
              <DetailRow label="Estimated Meals" value={donation.meals.toLocaleString()} />
              <DetailRow label="Packaging Type" value={donation.packaging} />
              <DetailRow label="Temperature" value={donation.temperature} />
              <DetailRow label="Shelf Life" value={donation.shelfLife} />
              <DetailRow label="Expiry Date" value={donation.expiryTime} />

              <SectionTitle>Donor Information</SectionTitle>
              <div className="flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                <AdminAvatar name={donation.donorName} role="donor" size="md" />
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{donation.donorName}</p>
                  <p className="text-xs text-[#64748B]">{DONOR_TYPE_LABELS[donation.donorType]}</p>
                  <p className="text-xs text-[#64748B]">{donation.donorPhone}</p>
                </div>
              </div>

              <SectionTitle>NGO Information</SectionTitle>
              <div className="flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                <AdminAvatar id={donation.ngoId} name={donation.ngo} role="ngo" type="ngo" size="md" />
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{donation.ngo}</p>
                  <p className="flex items-center gap-1 text-xs text-[#64748B]"><MapPin size={10} /> {donation.deliveryAddress}</p>
                </div>
              </div>

              {donation.volunteer !== "—" ? (
                <>
                  <SectionTitle>Volunteer Information</SectionTitle>
                  <div className="flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                    <AdminAvatar id={donation.volunteerId} name={donation.volunteer} role="volunteer" size="md" />
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">{donation.volunteer}</p>
                      <p className="text-xs text-[#64748B]">{donation.volunteerId}</p>
                    </div>
                  </div>
                </>
              ) : null}

              <SectionTitle>Addresses</SectionTitle>
              <DetailRow label="Pickup" value={donation.pickupAddress} />
              <DetailRow label="Delivery" value={donation.deliveryAddress} />
              <DetailRow label="Pickup Time" value={donation.pickupTime} />

              <SectionTitle>Route Map</SectionTitle>
              <DonationRouteMap map={donation.map} />

              <SectionTitle>QR / Batch Code</SectionTitle>
              <div className="flex items-center gap-3 rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-3">
                <QrCode size={32} className="text-[#64748B]" />
                <p className="font-mono text-xs text-[#64748B]">{donation.qrCode}</p>
              </div>

              {donation.proofImages?.length ? (
                <>
                  <SectionTitle>Proof Images</SectionTitle>
                  <div className="flex gap-2">
                    {donation.proofImages.map((img, i) => (
                      <img key={i} src={img} alt="" className="h-16 w-16 rounded-lg border border-[#E5E7EB] object-cover" />
                    ))}
                  </div>
                </>
              ) : null}

              <SectionTitle>Workflow Timeline</SectionTitle>
              <DonationWorkflowTimeline status={donation.status} />

              {donation.timeline?.length ? (
                <>
                  <SectionTitle>Activity Timeline</SectionTitle>
                  <ul className="space-y-2">
                    {donation.timeline.map((item, i) => (
                      <li key={i} className="flex gap-2 text-xs">
                        <Clock size={12} className="mt-0.5 shrink-0 text-[#94A3B8]" />
                        <div>
                          <p className="font-semibold text-[#64748B]">{item.time}</p>
                          <p className="text-[#0F172A]">{item.event}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {donation.notes ? (
                <>
                  <SectionTitle>Notes</SectionTitle>
                  <p className="rounded-[10px] border border-[#E5E7EB] bg-[#FFFBEB] p-3 text-xs text-[#92400E]">{donation.notes}</p>
                </>
              ) : null}

              {(ngoMatches.length > 0 || volunteerMatches.length > 0) ? (
                <>
                  <SectionTitle>Smart Matching</SectionTitle>
                  {ngoMatches.length > 0 ? (
                    <ul className="mb-3 space-y-2">
                      {ngoMatches.map((m) => (
                        <li key={m.id} className="rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] p-3 text-xs">
                          <p className="font-bold text-[#15803D]">{m.matchLabel} — {m.name || m.ngoName}</p>
                          {m.reasons?.length ? (
                            <ul className="mt-1 list-disc pl-4 text-[#64748B]">
                              {m.reasons.slice(0, 3).map((r) => <li key={r}>{r}</li>)}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {volunteerMatches.length > 0 ? (
                    <ul className="space-y-2">
                      {volunteerMatches.map((m) => (
                        <li key={m.id} className="rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] p-3 text-xs">
                          <p className="font-bold text-[#2563EB]">{m.matchLabel} — Volunteer</p>
                          {m.reasons?.length ? (
                            <ul className="mt-1 list-disc pl-4 text-[#64748B]">
                              {m.reasons.slice(0, 3).map((r) => <li key={r}>{r}</li>)}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : null}
            </div>

            <div className="border-t border-[#E5E7EB] p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "approve", label: "Approve", icon: Check, primary: true },
                  { id: "assign_ngo", label: "Assign NGO", icon: UserPlus },
                  { id: "assign_volunteer", label: "Assign Volunteer", icon: Truck },
                  { id: "route", label: "View Route", icon: Route },
                  { id: "images", label: "View Images", icon: Image },
                  { id: "report", label: "Generate Report", icon: FileText },
                  { id: "receipt", label: "Download Receipt", icon: Download },
                  { id: "cancel", label: "Cancel", icon: Ban, danger: true },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => onAction(action.id, donation)}
                      className={
                        action.primary
                          ? `${ADMIN_PRIMARY_BTN} justify-center text-xs`
                          : action.danger
                            ? "inline-flex h-[38px] items-center justify-center gap-1.5 border border-[#FECACA] bg-[#FEF2F2] text-xs font-semibold text-red-600 hover:bg-red-100"
                            : `${ADMIN_SECONDARY_BTN} justify-center text-xs`
                      }
                    >
                      <Icon size={14} /> {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
