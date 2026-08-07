import { Phone, MessageCircle, Navigation, Battery, Gauge } from "lucide-react";
import { DeliveryTrackingMap } from "./DeliveryCharts";
import { ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN } from "../adminStyles";
import { STATUS_COLORS, STATUS_LABELS } from "../../../data/adminDeliveries";

export default function DeliveryLiveTrackingPanel({ delivery, onAction }) {
  if (!delivery) {
    return (
      <aside className="sticky top-6 rounded-[18px] border border-[#E8ECF0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
        <h3 className="text-base font-bold text-[#0F172A]">Live Tracking</h3>
        <p className="mt-4 text-sm text-[#64748B]">Select a delivery to view live tracking.</p>
      </aside>
    );
  }

  const tracking = delivery.tracking;

  return (
    <aside className="sticky top-6 rounded-[18px] border border-[#E8ECF0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_8px_28px_rgba(34,197,94,0.1)]">
      <div className="border-b border-[#E5E7EB] p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Live Tracking</h3>
            <p className="text-xs font-semibold text-[#16A34A]">{delivery.id}</p>
          </div>
          <span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[delivery.status]}`}>{STATUS_LABELS[delivery.status]}</span>
        </div>
      </div>

      <div className="p-5">
        <DeliveryTrackingMap tracking={tracking} />

        {tracking ? (
          <>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-[#64748B]">Route Progress</span>
                <span className="font-bold text-[#16A34A]">{tracking.routeProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
                <div className="h-full rounded-full bg-[#16A34A] transition-all" style={{ width: `${tracking.routeProgress}%` }} />
              </div>
            </div>

            {delivery.volunteerAvatar ? (
              <div className="mt-4 flex items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-3">
                <img src={delivery.volunteerAvatar} alt={delivery.volunteer} className="h-10 w-10 rounded-full border border-[#E5E7EB] object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0F172A]">{delivery.volunteer}</p>
                  <p className="truncate text-[10px] text-[#64748B]">{delivery.vehicle}</p>
                </div>
              </div>
            ) : null}

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {tracking.speed !== "—" ? (
                <div className="flex items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white p-2.5">
                  <Gauge size={14} className="text-[#64748B]" />
                  <div><p className="font-bold text-[#0F172A]">{tracking.speed}</p><p className="text-[10px] text-[#64748B]">Live Speed</p></div>
                </div>
              ) : null}
              {tracking.battery !== "—" ? (
                <div className="flex items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white p-2.5">
                  <Battery size={14} className="text-[#64748B]" />
                  <div><p className="font-bold text-[#0F172A]">{tracking.battery}</p><p className="text-[10px] text-[#64748B]">Battery</p></div>
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button type="button" onClick={() => onAction("track", delivery)} className={`${ADMIN_PRIMARY_BTN} w-full justify-center text-xs`}><Navigation size={14} /> Track Live Delivery</button>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => onAction("call", delivery)} className={`${ADMIN_SECONDARY_BTN} justify-center text-xs`}><Phone size={14} /> Call</button>
                <button type="button" onClick={() => onAction("message", delivery)} className={`${ADMIN_SECONDARY_BTN} justify-center text-xs`}><MessageCircle size={14} /> Message</button>
              </div>
            </div>
          </>
        ) : (
          <p className="mt-4 text-xs text-[#64748B]">Live tracking not available for this delivery.</p>
        )}
      </div>
    </aside>
  );
}
