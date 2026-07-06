import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { EXTRA_PICKUP_REQUESTS } from "../../data/volunteerMission";
import { getVolunteerFoodImage } from "../../data/volunteerAssets";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import VolunteerPickupRequestCard from "./VolunteerPickupRequestCard";
import {
  volunteerInteractive,
  VOLUNTEER_SECTION_PAD,
  VOLUNTEER_STACK_GAP,
} from "./volunteerDashboardStyles";

const DASHBOARD_PICKUP_LIMIT = 3;

export default function VolunteerPickupsSection({
  availablePickups,
  onAccept,
  disabled,
}) {
  const [showAll, setShowAll] = useState(false);

  const dashboardPickups = availablePickups.slice(0, DASHBOARD_PICKUP_LIMIT);
  const extraPickups = showAll
    ? [...availablePickups.slice(DASHBOARD_PICKUP_LIMIT), ...EXTRA_PICKUP_REQUESTS]
    : [];

  const hasMore =
    availablePickups.length > DASHBOARD_PICKUP_LIMIT || EXTRA_PICKUP_REQUESTS.length > 0;

  return (
    <section
      className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}
    >
      <div className="flex items-center justify-between gap-[0.5cm]">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A] sm:text-base">
            Available Pickup Requests
          </h2>
          <p className="mt-[0.2cm] text-[11px] text-[#64748B]">
            Thumbnail, food details, pickup window, and delivery route at a glance.
          </p>
        </div>
        {hasMore ? (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className={[
              "inline-flex items-center gap-1 text-xs font-semibold text-[#16A34A]",
              volunteerInteractive.link,
            ].join(" ")}
          >
            {showAll ? "Show less" : "View all"}
            <FaChevronDown
              className={["text-[10px] transition-transform", showAll ? "rotate-180" : ""].join(" ")}
            />
          </button>
        ) : (
          <Link
            to={DASHBOARD_ROUTES.volunteerPickups}
            className={["text-xs font-semibold text-[#16A34A]", volunteerInteractive.link].join(" ")}
          >
            View all
          </Link>
        )}
      </div>

      {dashboardPickups.length === 0 ? (
        <p className="mt-[0.5cm] rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-[0.5cm] text-center text-xs text-[#64748B]">
          No pickup requests right now. Check back soon or view your schedule below.
        </p>
      ) : (
        <ul className={`mt-[0.5cm] ${VOLUNTEER_STACK_GAP}`}>
          {dashboardPickups.map((pickup, index) => (
            <VolunteerPickupRequestCard
              key={pickup.id}
              pickup={pickup}
              foodImage={getVolunteerFoodImage(pickup)}
              onAccept={onAccept}
              disabled={disabled}
              index={index}
            />
          ))}
        </ul>
      )}

      <AnimatePresence>
        {showAll && extraPickups.length > 0 ? (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-[0.5cm] overflow-hidden border-t border-[#F1F5F9] pt-[0.5cm] ${VOLUNTEER_STACK_GAP}`}
          >
            {extraPickups.map((pickup, index) => (
              <VolunteerPickupRequestCard
                key={pickup.id}
                pickup={pickup}
                foodImage={getVolunteerFoodImage(pickup)}
                onAccept={onAccept}
                disabled={disabled}
                index={index + DASHBOARD_PICKUP_LIMIT}
              />
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      {showAll && extraPickups.length === 0 && availablePickups.length <= DASHBOARD_PICKUP_LIMIT ? (
        <p className="mt-[0.5cm] text-center text-[11px] text-[#64748B]">
          No additional pickup requests at the moment.
        </p>
      ) : null}
    </section>
  );
}
