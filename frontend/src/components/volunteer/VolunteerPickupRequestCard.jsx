import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLocationArrow, FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import DonationProofThumbnail from "../common/DonationProofThumbnail";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getPackagingLabel } from "../../data/donationThumbnails";
import {
  volunteerInteractive,
  VOLUNTEER_BODY,
  VOLUNTEER_BTN,
  VOLUNTEER_H2,
  VOLUNTEER_LABEL,
  VOLUNTEER_GRID_GAP,
  VOLUNTEER_LINE_GAP,
  VOLUNTEER_SECTION_PAD,
} from "./volunteerDashboardStyles";
import EventTypeBadge from "../common/EventTypeBadge";

export default function VolunteerPickupRequestCard({
  pickup,
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
        <div className="h-[196px] w-[156px] shrink-0 overflow-hidden rounded-none border border-[#E5E7EB] bg-[#F8FAFC]">
          <DonationProofThumbnail record={pickup} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={VOLUNTEER_H2}>{pickup.foodName}</h3>
            <EventTypeBadge eventType={pickup.eventType} />
          </div>
          {pickup.eventName ? (
            <p className={`${VOLUNTEER_LINE_GAP} ${VOLUNTEER_BODY}`}>
              {pickup.eventName}
            </p>
          ) : null}
          {getPackagingLabel(pickup) ? (
            <p className={`${VOLUNTEER_LINE_GAP} text-sm font-medium text-[#94A3B8]`}>
              {getPackagingLabel(pickup)}
            </p>
          ) : null}
          <p className={`${VOLUNTEER_LINE_GAP} text-base font-semibold text-[#64748B]`}>
            ~{pickup.estimatedMeals} meals · {pickup.quantity}
          </p>

          <p className={`${VOLUNTEER_LINE_GAP} ${VOLUNTEER_LABEL}`}>Pick before</p>
          <p className={`${VOLUNTEER_LINE_GAP} text-base font-bold text-[#0F172A]`}>
            {pickup.pickupDeadline}
          </p>
        </div>
      </div>

      <div className={`${VOLUNTEER_LINE_GAP} grid ${VOLUNTEER_GRID_GAP} sm:grid-cols-2`}>
        <div>
          <p className="flex items-start gap-1.5 text-sm text-[#64748B]">
            <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
            <span>
              <span className="block font-semibold text-[#0F172A]">{pickup.donorName}</span>
              {pickup.pickupAddress}
            </span>
          </p>
          <p className={`${VOLUNTEER_LINE_GAP} text-sm font-semibold text-[#15803D]`}>
            {pickup.pickupDistanceKm} km away from you
          </p>
        </div>

        <div>
          <p className={VOLUNTEER_LABEL}>Nearest verified NGO</p>
          <p className={`${VOLUNTEER_LINE_GAP} text-base font-semibold text-[#0F172A]`}>
            {pickup.ngoName}
          </p>
          <p className={`${VOLUNTEER_LINE_GAP} text-base leading-relaxed text-[#64748B]`}>
            {pickup.ngoAddress}
          </p>
          <p className={`${VOLUNTEER_LINE_GAP} text-sm font-semibold text-[#15803D]`}>
            {pickup.ngoDistanceKm ?? pickup.journeyDistanceKm} km from pickup · nearest match
          </p>
        </div>
      </div>

      <div className={`${VOLUNTEER_LINE_GAP} flex flex-wrap ${VOLUNTEER_GRID_GAP}`}>
        <Link
          to={DASHBOARD_ROUTES.volunteerRoute}
          className={[
            VOLUNTEER_BTN,
            "flex-1 border border-[#E5E7EB] bg-white text-[#475569] sm:flex-none sm:min-w-[180px]",
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
            VOLUNTEER_BTN,
            "flex-1 bg-[#16A34A] text-white disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:min-w-[200px]",
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
