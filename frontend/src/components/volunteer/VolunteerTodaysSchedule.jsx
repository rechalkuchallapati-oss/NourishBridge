import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronDown, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import { FULL_SCHEDULE, TODAYS_SCHEDULE } from "../../data/volunteerMission";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { SCHEDULE_TAG_STYLES, volunteerInteractive } from "./volunteerDashboardStyles";

function isScheduleLocked(index, activeMission, completedToday) {
  if (index === 0) return false;
  if (activeMission) return true;
  return index > completedToday;
}

function resolveTag(item, index, activeMission) {
  if (index === 0 && activeMission) {
    return { label: "In Progress", styleKey: "in_progress" };
  }
  return { label: item.tag, styleKey: item.status };
}

export default function VolunteerTodaysSchedule({ activeMission, completedToday = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const scheduleItems = expanded ? FULL_SCHEDULE : TODAYS_SCHEDULE;

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-bold text-[#0F172A] sm:text-base">Today&apos;s Schedule</h2>
      <p className="mt-0.5 text-[11px] text-[#64748B]">
        Finish your in-progress mission to unlock the next pickup slot.
      </p>

      <ul className="mt-4 space-y-3">
        {scheduleItems.map((item, index) => {
          const locked = isScheduleLocked(index, activeMission, completedToday);
          const tag = resolveTag(item, index, activeMission);
          const tagStyle = SCHEDULE_TAG_STYLES[tag.styleKey] ?? SCHEDULE_TAG_STYLES.upcoming;

          return (
            <motion.li
              key={item.id}
              whileHover={locked ? undefined : { scale: 1.01 }}
              className={[
                "rounded-none border p-3 transition-all duration-300",
                locked
                  ? "border-[#E2E8F0] bg-[#F8FAFC] opacity-70"
                  : "border-[#E5E7EB] bg-white hover:border-[#BBF7D0] hover:shadow-md",
                volunteerInteractive.card,
              ].join(" ")}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="text-sm font-bold text-[#16A34A]">{item.time}</span>
                <span
                  className={[
                    "rounded-none border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                    tagStyle,
                    tag.styleKey === "in_progress" ? "animate-pulse" : "",
                  ].join(" ")}
                >
                  {tag.label}
                </span>
              </div>

              {item.label ? (
                <p className="mt-2 text-xs font-semibold text-[#0F172A]">{item.label}</p>
              ) : null}

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                    Pickup
                  </p>
                  <p className="mt-1 flex items-start gap-1.5 text-xs text-[#64748B]">
                    <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
                    {item.pickupLocation}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                    Deliver to
                  </p>
                  <p className="mt-1 flex items-start gap-1.5 text-xs text-[#64748B]">
                    <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
                    {item.deliverAddress}
                  </p>
                </div>
              </div>

              {locked ? (
                <p className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-[#94A3B8]">
                  <FaLock aria-hidden="true" />
                  Unlocks after the current mission is completed
                </p>
              ) : null}
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={[
            "inline-flex items-center gap-2 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold text-[#475569]",
            volunteerInteractive.buttonOutline,
          ].join(" ")}
        >
          View full schedule
          <FaArrowRight
            className={["text-[10px] transition-transform", expanded ? "rotate-90" : ""].join(" ")}
            aria-hidden="true"
          />
          <FaChevronDown
            className={["text-[10px] transition-transform", expanded ? "rotate-180" : ""].join(" ")}
            aria-hidden="true"
          />
        </button>
      </div>

      <AnimatePresence>
        {expanded ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-center text-[10px] text-[#64748B]"
          >
            Showing all scheduled missions for today.{" "}
            <Link
              to={DASHBOARD_ROUTES.volunteerMissions}
              className={["font-semibold text-[#16A34A]", volunteerInteractive.link].join(" ")}
            >
              Open mission history
            </Link>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
