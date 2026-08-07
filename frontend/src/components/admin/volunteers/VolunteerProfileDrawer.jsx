import { X, Phone, Navigation, MessageCircle, Download, Truck, Ban, UserCheck, FileText, Route, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VolunteerLiveMap } from "./VolunteerCharts";
import { ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN } from "../adminStyles";
import {
  ACHIEVEMENTS,
  AVAILABILITY_COLORS,
  AVAILABILITY_LABELS,
  VERIFICATION_COLORS,
  VERIFICATION_LABELS,
  VEHICLE_LABELS,
} from "../../../data/adminVolunteers";

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

function StatBox({ label, value }) {
  return (
    <div className="rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] p-2.5 text-center">
      <p className="text-sm font-extrabold text-[#0F172A]">{value}</p>
      <p className="text-[10px] text-[#64748B]">{label}</p>
    </div>
  );
}

export default function VolunteerProfileDrawer({ volunteer, isOpen, onClose, onAction }) {
  return (
    <AnimatePresence>
      {isOpen && volunteer ? (
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
                <h3 className="text-lg font-bold text-[#0F172A]">Volunteer Profile</h3>
                <p className="text-xs font-semibold text-[#16A34A]">{volunteer.id}</p>
              </div>
              <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#64748B] hover:bg-[#F8FAFC]">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex items-center gap-4">
                <img src={volunteer.avatar} alt={volunteer.name} className="h-20 w-20 rounded-full border-2 border-[#BBF7D0] object-cover" />
                <div>
                  <p className="text-xl font-bold text-[#0F172A]">{volunteer.name}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${AVAILABILITY_COLORS[volunteer.availability]}`}>
                      {AVAILABILITY_LABELS[volunteer.availability]}
                    </span>
                    <span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${VERIFICATION_COLORS[volunteer.verification]}`}>
                      {VERIFICATION_LABELS[volunteer.verification]}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-sm text-[#F59E0B]"><Star size={14} fill="currentColor" /> {volunteer.rating} · {volunteer.successRate}% success</p>
                </div>
              </div>

              <SectionTitle>Contact</SectionTitle>
              <DetailRow label="Phone" value={volunteer.phone} />
              <DetailRow label="Email" value={volunteer.email} />
              <DetailRow label="Address" value={volunteer.address} />
              <DetailRow label="City" value={volunteer.city} />
              <DetailRow label="Emergency Contact" value={volunteer.emergencyContact} />
              <DetailRow label="Joined" value={volunteer.joinedDate} />
              <DetailRow label="Schedule" value={volunteer.schedule} />

              <SectionTitle>Vehicle Information</SectionTitle>
              <DetailRow label="Vehicle Type" value={VEHICLE_LABELS[volunteer.vehicle]} />
              <DetailRow label="Vehicle Number" value={volunteer.vehicleNumber} />
              <DetailRow label="Driving License" value={volunteer.license} />
              <DetailRow label="Government ID" value={volunteer.govId} />
              <DetailRow label="Background Check" value={volunteer.backgroundCheck} />

              <SectionTitle>Performance Statistics</SectionTitle>
              <div className="grid grid-cols-3 gap-2">
                <StatBox label="Total Missions" value={volunteer.stats.totalMissions} />
                <StatBox label="Completed" value={volunteer.stats.completedDeliveries} />
                <StatBox label="Cancelled" value={volunteer.stats.cancelledMissions} />
                <StatBox label="Late Deliveries" value={volunteer.stats.lateDeliveries} />
                <StatBox label="Acceptance Rate" value={`${volunteer.stats.acceptanceRate}%`} />
                <StatBox label="Response Time" value={volunteer.stats.responseTime} />
                <StatBox label="Hours" value={volunteer.stats.hoursVolunteered} />
                <StatBox label="Distance" value={volunteer.stats.distanceCovered} />
                <StatBox label="Meals Delivered" value={volunteer.stats.mealsDelivered.toLocaleString()} />
                <StatBox label="NGOs Served" value={volunteer.stats.ngosServed} />
                <StatBox label="Donors Assisted" value={volunteer.stats.donorsAssisted} />
                <StatBox label="Lives Impacted" value={volunteer.stats.livesImpacted.toLocaleString()} />
              </div>

              {volunteer.currentMissionDetails ? (
                <>
                  <SectionTitle>Current Mission</SectionTitle>
                  <div className="rounded-[12px] border border-[#BBF7D0] bg-[#F0FDF4] p-3">
                    <div className="flex gap-3">
                      <img src={volunteer.currentMissionDetails.foodImage} alt="" className="h-14 w-14 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-bold text-[#0F172A]">{volunteer.currentMissionDetails.id}</p>
                        <p className="text-xs text-[#64748B]">{volunteer.currentMissionDetails.quantity}</p>
                        <p className="mt-1 text-xs font-semibold text-[#16A34A]">{volunteer.currentMissionDetails.status} · ETA {volunteer.currentMissionDetails.eta}</p>
                      </div>
                    </div>
                    <DetailRow label="Pickup" value={volunteer.currentMissionDetails.pickup} />
                    <DetailRow label="Delivery" value={volunteer.currentMissionDetails.delivery} />
                  </div>
                  <SectionTitle>Live Operations Map</SectionTitle>
                  <VolunteerLiveMap map={volunteer.map} />
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => onAction("route", volunteer)} className={`${ADMIN_PRIMARY_BTN} flex-1 justify-center text-xs`}><Navigation size={14} /> Navigate</button>
                    <button type="button" onClick={() => onAction("call", volunteer)} className={`${ADMIN_SECONDARY_BTN} flex-1 justify-center text-xs`}><Phone size={14} /> Call</button>
                    <button type="button" onClick={() => onAction("message", volunteer)} className={`${ADMIN_SECONDARY_BTN} flex-1 justify-center text-xs`}><MessageCircle size={14} /> Message</button>
                  </div>
                </>
              ) : null}

              {volunteer.missionHistory?.length ? (
                <>
                  <SectionTitle>Mission History</SectionTitle>
                  <ul className="space-y-2">
                    {volunteer.missionHistory.map((m) => (
                      <li key={m.id} className="rounded-[10px] border border-[#E5E7EB] p-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0F172A]">{m.id}</span>
                          <span className={`capitalize ${m.status === "completed" ? "text-[#16A34A]" : "text-red-600"}`}>{m.status}</span>
                        </div>
                        <p className="mt-1 text-[#64748B]">{m.pickup} → {m.delivery}</p>
                        <p className="mt-0.5 text-[#94A3B8]">{m.duration} · {m.distance} · ★ {m.rating}</p>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {volunteer.achievements?.length ? (
                <>
                  <SectionTitle>Achievements</SectionTitle>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.achievements.map((aId) => {
                      const ach = ACHIEVEMENTS.find((a) => a.id === aId);
                      return ach ? (
                        <span key={aId} className="inline-flex items-center gap-1 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D]">
                          {ach.icon} {ach.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </>
              ) : null}

              {volunteer.feedback?.length ? (
                <>
                  <SectionTitle>Community Feedback</SectionTitle>
                  {volunteer.feedback.map((fb, i) => (
                    <div key={i} className="mb-2 rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] p-3 text-xs">
                      <p className="font-semibold text-[#0F172A]">{fb.donor || fb.ngo}</p>
                      <p className="mt-1 text-[#64748B]">"{fb.text}"</p>
                      <p className="mt-1 text-[#F59E0B]">★ {fb.rating}</p>
                    </div>
                  ))}
                </>
              ) : null}
            </div>

            <div className="border-t border-[#E5E7EB] p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "assign", label: "Assign Mission", icon: Truck, primary: true },
                  { id: "route", label: "View Route", icon: Route },
                  { id: "contact", label: "Contact", icon: Phone },
                  { id: "verify", label: "Approve Verification", icon: UserCheck },
                  { id: "report", label: "Performance Report", icon: FileText },
                  { id: "download", label: "Download Profile", icon: Download },
                  { id: "suspend", label: "Suspend", icon: Ban, danger: true },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => onAction(action.id, volunteer)}
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
