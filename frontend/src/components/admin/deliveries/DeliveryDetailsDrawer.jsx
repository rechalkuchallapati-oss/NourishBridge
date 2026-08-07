import { X, QrCode, Clock, Download, Phone, Route, FileText, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminAvatar from "../AdminAvatar";
import DeliveryWorkflowTimeline from "./DeliveryWorkflowTimeline";
import { DeliveryTrackingMap } from "./DeliveryCharts";
import { ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN } from "../adminStyles";
import { STATUS_COLORS, STATUS_LABELS } from "../../../data/adminDeliveries";

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

export default function DeliveryDetailsDrawer({ delivery, isOpen, onClose, onAction }) {
  return (
    <AnimatePresence>
      {isOpen && delivery ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col border-l border-[#E5E7EB] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Delivery Details</h3>
                <p className="text-xs font-semibold text-[#16A34A]">{delivery.id} · {delivery.donationId}</p>
              </div>
              <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC]"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <img src={delivery.foodImage} alt={delivery.foodItem} className="h-40 w-full rounded-[14px] object-cover" />
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-lg font-bold text-[#0F172A]">{delivery.foodItem}</p>
                  <p className="text-sm text-[#64748B]">{delivery.quantity} · {delivery.meals} meals</p>
                </div>
                <span className={`inline-flex shrink-0 border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[delivery.status]}`}>{STATUS_LABELS[delivery.status]}</span>
              </div>

              <SectionTitle>Donor Details</SectionTitle>
              <div className="flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                <AdminAvatar name={delivery.donor} role="donor" size="md" />
                <p className="text-sm font-semibold text-[#0F172A]">{delivery.donor}</p>
              </div>

              <SectionTitle>NGO Details</SectionTitle>
              <div className="flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                <AdminAvatar id={delivery.ngoId} name={delivery.ngo} role="ngo" type="ngo" size="md" />
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{delivery.ngo}</p>
                  <p className="text-xs text-[#64748B]">{delivery.destination}</p>
                </div>
              </div>

              {delivery.volunteer !== "—" ? (
                <>
                  <SectionTitle>Volunteer Details</SectionTitle>
                  <div className="flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                    {delivery.volunteerAvatar ? <img src={delivery.volunteerAvatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : null}
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">{delivery.volunteer}</p>
                      <p className="text-xs text-[#64748B]">{delivery.vehicle}</p>
                    </div>
                  </div>
                </>
              ) : null}

              <SectionTitle>Delivery Info</SectionTitle>
              <DetailRow label="Pickup Location" value={delivery.pickupLocation} />
              <DetailRow label="Destination" value={delivery.destination} />
              <DetailRow label="Pickup Time" value={delivery.pickupTime} />
              <DetailRow label="Estimated Arrival" value={delivery.estimatedArrival} />
              <DetailRow label="Actual Delivery" value={delivery.actualDelivery} />
              <DetailRow label="Distance" value={delivery.distance} />
              <DetailRow label="Temperature Compliance" value={delivery.temperatureCompliance} />

              <SectionTitle>Route Map</SectionTitle>
              <DeliveryTrackingMap tracking={delivery.tracking} />

              {delivery.pickupPhotos?.length ? (
                <>
                  <SectionTitle>Proof of Pickup</SectionTitle>
                  <div className="flex gap-2">{delivery.pickupPhotos.map((img, i) => <img key={i} src={img} alt="" className="h-16 w-16 rounded-lg border object-cover" />)}</div>
                </>
              ) : null}

              {delivery.deliveryPhotos?.length ? (
                <>
                  <SectionTitle>Proof of Delivery</SectionTitle>
                  <div className="flex gap-2">{delivery.deliveryPhotos.map((img, i) => <img key={i} src={img} alt="" className="h-16 w-16 rounded-lg border object-cover" />)}</div>
                </>
              ) : null}

              {delivery.signature ? (
                <>
                  <SectionTitle>Digital Signature</SectionTitle>
                  <p className="rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] p-3 text-xs font-semibold text-[#15803D]">{delivery.signature}</p>
                </>
              ) : null}

              <SectionTitle>QR Verification</SectionTitle>
              <div className="flex items-center gap-3 rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-3">
                <QrCode size={32} className="text-[#64748B]" />
                <p className="font-mono text-xs text-[#64748B]">{delivery.qrCode}</p>
              </div>

              {delivery.notes ? (
                <>
                  <SectionTitle>Delivery Notes</SectionTitle>
                  <p className="rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] p-3 text-xs text-[#64748B]">{delivery.notes}</p>
                </>
              ) : null}

              <SectionTitle>Workflow Timeline</SectionTitle>
              <DeliveryWorkflowTimeline status={delivery.status} />

              {delivery.timeline?.length ? (
                <>
                  <SectionTitle>Activity Timeline</SectionTitle>
                  <ul className="space-y-2">
                    {delivery.timeline.map((item, i) => (
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
                  { id: "track", label: "Track Live", icon: Route, primary: true },
                  { id: "route", label: "View Route", icon: Route },
                  { id: "reassign", label: "Reassign", icon: UserPlus },
                  { id: "contact_donor", label: "Contact Donor", icon: Phone },
                  { id: "contact_ngo", label: "Contact NGO", icon: Phone },
                  { id: "report", label: "Generate Report", icon: FileText },
                  { id: "pod", label: "Download POD", icon: Download },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button key={action.id} type="button" onClick={() => onAction(action.id, delivery)}
                      className={action.primary ? `${ADMIN_PRIMARY_BTN} justify-center text-xs` : `${ADMIN_SECONDARY_BTN} justify-center text-xs`}>
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
