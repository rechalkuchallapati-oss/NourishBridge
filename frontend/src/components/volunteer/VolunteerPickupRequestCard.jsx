import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLocationArrow, FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getPackagingLabel } from "../../data/donationThumbnails";
import { volunteerInteractive, VOLUNTEER_SECTION_PAD } from "./volunteerDashboardStyles";
import DonationItemsList from "../common/DonationItemsList";
import EventTypeBadge from "../common/EventTypeBadge";

export default function VolunteerPickupRequestCard({
  pickup,
  foodImage,
  onAccept,
  disabled,
  index = 0,
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={[
        "rounded-none border border-[#E5E7EB] bg-white shadow-sm",
        VOLUNTEER_SECTION_PAD,
        volunteerInteractive.card,
      ].join(" ")}
    >
      <div className="flex gap-[0.5cm]">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-none border border-[#E5E7EB] bg-[#F8FAFC]">
          <img src={foodImage} alt={pickup.foodName} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A] sm:text-base">{pickup.foodName}</h3>
            <EventTypeBadge eventType={pickup.eventType} />
          </div>
          {pickup.eventName ? (
            <p className="mt-0.5 text-[11px] font-medium text-[#64748B]">{pickup.eventName}</p>
          ) : null}
          <DonationItemsList record={pickup} className="mt-2" maxItems={4} />
          {getPackagingLabel(pickup) ? (
            <p className="mt-1 text-[10px] font-medium text-[#94A3B8]">{getPackagingLabel(pickup)}</p>
          ) : null}
          <p className="mt-1 text-xs font-semibold text-[#64748B]">
            ~{pickup.estimatedMeals} meals · {pickup.quantity}
          </p>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
            Pick before
          </p>
          <p className="text-sm font-bold text-[#0F172A]">{pickup.pickupDeadline}</p>
        </div>
      </div>

      <div className="mt-[0.5cm] grid gap-[0.5cm] border-t border-[#F1F5F9] pt-[0.5cm] sm:grid-cols-2">
        <div>
          <p className="flex items-start gap-1.5 text-xs text-[#64748B]">
            <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-[#0F172A]">{pickup.donorName}</span>
              {pickup.pickupAddress}
            </span>
          </p>
          <p className="mt-2 text-[11px] font-semibold text-[#15803D]">
            {pickup.pickupDistanceKm} km away from you
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Deliver to</p>
          <p className="mt-1 text-xs font-semibold text-[#0F172A]">{pickup.ngoName}</p>
          <p className="mt-0.5 text-[11px] text-[#64748B]">{pickup.ngoAddress}</p>
          <p className="mt-2 text-[11px] font-semibold text-[#2563EB]">
            {pickup.journeyDistanceKm} km from pickup to delivery
          </p>
        </div>
      </div>

      <div className="mt-[0.5cm] flex flex-wrap gap-[0.5cm]">
        <Link
          to={DASHBOARD_ROUTES.volunteerRoute}
          className={[
            "inline-flex flex-1 items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-xs font-semibold text-[#475569] sm:flex-none sm:min-w-[140px]",
            volunteerInteractive.buttonOutline,
          ].join(" ")}
        >
          <FaRoute aria-hidden="true" />
          View Route
        </Link>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onAccept(pickup)}
          className={[
            "inline-flex flex-1 items-center justify-center gap-2 rounded-none bg-[#16A34A] px-3 py-2.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:min-w-[160px]",
            volunteerInteractive.button,
          ].join(" ")}
        >
          <FaLocationArrow aria-hidden="true" />
          Accept Mission
        </button>
      </div>
    </motion.li>
  );
}
