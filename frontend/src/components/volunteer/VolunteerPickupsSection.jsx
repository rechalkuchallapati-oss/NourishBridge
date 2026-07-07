import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { EXTRA_PICKUP_REQUESTS } from "../../data/volunteerMission";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import VolunteerPickupRequestCard from "./VolunteerPickupRequestCard";
import VolunteerSectionShell, { VolunteerSectionTitle } from "./VolunteerSectionShell";
import {
  volunteerInteractive,
  VOLUNTEER_BTN,
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_INSET_LINE_GAP,
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
    <VolunteerSectionShell>
      <div className="flex items-center justify-between gap-[0.5cm]">
        <div className="min-w-0 flex-1 pr-[1.5cm]">
          <VolunteerSectionTitle
            title="Available Pickup Requests"
            subtitle="Each pickup is matched to the nearest verified NGO — food is shared fairly across all partners."
            theme="green"
          />
        </div>
        {hasMore ? (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className={[
              VOLUNTEER_BTN,
              "shrink-0 border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
              volunteerInteractive.buttonOutline,
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
            className={[
              VOLUNTEER_BTN,
              "shrink-0 border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
              volunteerInteractive.buttonOutline,
            ].join(" ")}
          >
            View all
          </Link>
        )}
      </div>

      {dashboardPickups.length === 0 ? (
        <p className="rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-[0.5cm] text-center text-xs text-[#64748B]">
          No pickup requests right now. Check back soon or view your schedule below.
        </p>
      ) : (
        <ul className={VOLUNTEER_CONTENT_STACK}>
          {dashboardPickups.map((pickup, index) => (
            <VolunteerPickupRequestCard
              key={pickup.id}
              pickup={pickup}
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
            className={`overflow-hidden ${VOLUNTEER_CONTENT_STACK}`}
          >
            {extraPickups.map((pickup, index) => (
              <VolunteerPickupRequestCard
                key={pickup.id}
                pickup={pickup}
                onAccept={onAccept}
                disabled={disabled}
                index={index + DASHBOARD_PICKUP_LIMIT}
              />
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      {showAll && extraPickups.length === 0 && availablePickups.length <= DASHBOARD_PICKUP_LIMIT ? (
        <p className="text-center text-[11px] text-[#64748B]">
          No additional pickup requests at the moment.
        </p>
      ) : null}
    </VolunteerSectionShell>
  );
}
