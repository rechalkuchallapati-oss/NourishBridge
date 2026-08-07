import { X, Phone, Check, Ban, Truck, Route, FileText, UserPlus, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FoodRequestWorkflowTimeline from "./FoodRequestWorkflowTimeline";
import { RequestRouteMap } from "./FoodRequestCharts";
import { ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN } from "../adminStyles";
import { CATEGORY_LABELS, PRIORITY_COLORS, PRIORITY_LABELS, STATUS_COLORS, STATUS_LABELS } from "../../../data/adminFoodRequests";

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

export default function FoodRequestDetailsDrawer({ request, isOpen, onClose, onAction }) {
  return (
    <AnimatePresence>
      {isOpen && request ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col border-l border-[#E5E7EB] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Request Details</h3>
                <p className="text-xs font-semibold text-[#16A34A]">{request.id}</p>
              </div>
              <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC]"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex items-center gap-4 rounded-[14px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <img src={request.ngoLogo} alt={request.ngo} className="h-14 w-14 rounded-lg border border-[#E5E7EB] object-cover" />
                <div>
                  <p className="text-base font-bold text-[#0F172A]">{request.ngo}</p>
                  <p className="text-xs text-[#64748B]">{request.contactPerson}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${PRIORITY_COLORS[request.priority]}`}>{PRIORITY_LABELS[request.priority]}</span>
                    <span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[request.status]}`}>{STATUS_LABELS[request.status]}</span>
                  </div>
                </div>
              </div>

              <SectionTitle>Contact</SectionTitle>
              <DetailRow label="Phone" value={request.phone} />
              <DetailRow label="Email" value={request.email} />
              <DetailRow label="Address" value={request.address} />

              <SectionTitle>Food Request</SectionTitle>
              <DetailRow label="Category" value={CATEGORY_LABELS[request.category]} />
              <DetailRow label="Food Needed" value={request.foodNeeded} />
              <DetailRow label="Quantity" value={request.quantity} />
              <DetailRow label="Estimated Meals" value={request.meals.toLocaleString()} />
              <DetailRow label="Beneficiaries" value={request.beneficiaries.toLocaleString()} />
              <DetailRow label="Required By" value={request.requiredBy} />
              <DetailRow label="Delivery Window" value={request.deliveryWindow} />
              <DetailRow label="Storage Requirements" value={request.storageRequirements} />

              {request.specialInstructions ? (
                <>
                  <SectionTitle>Special Instructions</SectionTitle>
                  <p className="rounded-[10px] border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#92400E]">{request.specialInstructions}</p>
                </>
              ) : null}

              {request.matchingDonations?.length ? (
                <>
                  <SectionTitle>Smart Donation Matching</SectionTitle>
                  <ul className="space-y-2">
                    {request.matchingDonations.map((match) => (
                      <li key={match.id} className="flex gap-3 rounded-[12px] border border-[#E5E7EB] p-3">
                        <img src={match.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#0F172A]">{match.donor}</p>
                          <p className="text-[10px] text-[#64748B]">{match.food} · {match.quantity}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="rounded-full bg-[#F0FDF4] px-2 py-0.5 text-[10px] font-bold text-[#16A34A]">{match.score}% match</span>
                            <span className="text-[10px] text-[#64748B]">ETA {match.eta}</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => onAction("assign_donation", { ...request, matchId: match.id })} className={`${ADMIN_PRIMARY_BTN} shrink-0 self-center px-3 text-[10px]`}>Accept</button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              <SectionTitle>Assignments</SectionTitle>
              <DetailRow label="Assigned Donation" value={request.assignedDonation} />
              <DetailRow label="Assigned Volunteer" value={request.assignedVolunteer} />

              <SectionTitle>Route Map</SectionTitle>
              <RequestRouteMap map={request.map} />

              {request.documents?.length ? (
                <>
                  <SectionTitle>Supporting Documents</SectionTitle>
                  <ul className="space-y-1">
                    {request.documents.map((doc) => (
                      <li key={doc} className="text-xs font-medium text-[#16A34A] hover:underline">{doc}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {request.approvalNotes ? (
                <>
                  <SectionTitle>Approval Notes</SectionTitle>
                  <p className="rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] p-3 text-xs text-[#15803D]">{request.approvalNotes}</p>
                </>
              ) : null}

              <SectionTitle>Workflow Timeline</SectionTitle>
              <FoodRequestWorkflowTimeline status={request.status} />

              {request.timeline?.length ? (
                <>
                  <SectionTitle>Activity Timeline</SectionTitle>
                  <ul className="space-y-2">
                    {request.timeline.map((item, i) => (
                      <li key={i} className="flex gap-2 text-xs">
                        <Clock size={12} className="mt-0.5 shrink-0 text-[#94A3B8]" />
                        <div><p className="font-semibold text-[#64748B]">{item.time}</p><p className="text-[#0F172A]">{item.event}</p></div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <div className="border-t border-[#E5E7EB] p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "approve", label: "Approve", icon: Check, primary: true },
                  { id: "reject", label: "Reject", icon: Ban, danger: true },
                  { id: "assign_donation", label: "Assign Donation", icon: UserPlus },
                  { id: "assign_volunteer", label: "Assign Volunteer", icon: Truck },
                  { id: "route", label: "View Route", icon: Route },
                  { id: "report", label: "Generate Report", icon: FileText },
                  { id: "contact", label: "Contact NGO", icon: Phone },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button key={action.id} type="button" onClick={() => onAction(action.id, request)}
                      className={action.primary ? `${ADMIN_PRIMARY_BTN} justify-center text-xs` : action.danger ? "inline-flex h-[38px] items-center justify-center gap-1.5 border border-[#FECACA] bg-[#FEF2F2] text-xs font-semibold text-red-600 hover:bg-red-100" : `${ADMIN_SECONDARY_BTN} justify-center text-xs`}>
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
