import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronDown, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import { FULL_SCHEDULE, TODAYS_SCHEDULE } from "../../data/volunteerMission";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import VolunteerSectionShell, { VolunteerSectionTitle } from "./VolunteerSectionShell";
import {
  SCHEDULE_STATUS_BUTTON,
  volunteerInteractive,
  VOLUNTEER_BTN,
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_INSET_LINE_GAP,
  VOLUNTEER_LABEL,
} from "./volunteerDashboardStyles";

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
    <VolunteerSectionShell>
      <VolunteerSectionTitle
        title="Today's Schedule"
        subtitle="Finish your in-progress mission to unlock the next pickup slot — missions run one after another today."
        theme="green"
      />

      <div className="pl-[0.5cm] sm:pl-[0.75cm]">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
          Today&apos;s flow · complete in order
        </p>

        <ol className={`${VOLUNTEER_INSET_LINE_GAP} ${VOLUNTEER_CONTENT_STACK} m-0 list-none p-0`}>
          {scheduleItems.map((item, index) => {
            const locked = isScheduleLocked(index, activeMission, completedToday);
            const tag = resolveTag(item, index, activeMission);
            const statusButton =
              SCHEDULE_STATUS_BUTTON[tag.styleKey] ?? SCHEDULE_STATUS_BUTTON.upcoming;
            const isLast = index === scheduleItems.length - 1;

            return (
              <li key={item.id} className="relative flex gap-[0.5cm]">
                <div className="flex w-10 shrink-0 flex-col items-center pt-1 sm:w-12">
                  <span
                    className={[
                      "h-2.5 w-2.5 shrink-0 rounded-full",
                      locked
                        ? "bg-[#CBD5E1]"
                        : tag.styleKey === "in_progress"
                          ? "bg-[#F59E0B]"
                          : tag.styleKey === "upcoming"
                            ? "bg-[#16A34A]"
                            : "bg-[#7C3AED]",
                    ].join(" ")}
                  />

                  {!isLast ? (
                    <motion.div
                      aria-hidden="true"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: index * 0.06 + 0.1, duration: 0.35 }}
                      className={[
                        "mt-[0.5cm] w-px min-h-[0.5cm] flex-1 origin-top",
                        locked
                          ? "bg-[#CBD5E1]"
                          : "bg-gradient-to-b from-[#16A34A] via-[#4ADE80] to-[#86EFAC]",
                      ].join(" ")}
                    />
                  ) : null}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className={[
                    "min-w-0 flex-1 pb-[0.5cm]",
                    locked ? "opacity-70" : "",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap items-center justify-between gap-[0.5cm]">
                    <span className="text-sm font-bold text-[#16A34A]">{item.time}</span>
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide",
                        statusButton,
                        tag.styleKey === "in_progress" ? "animate-pulse" : "",
                      ].join(" ")}
                    >
                      {tag.label}
                    </span>
                  </div>

                  {item.label ? (
                    <p
                      className={`${VOLUNTEER_INSET_LINE_GAP} text-sm font-semibold leading-relaxed text-[#0F172A]`}
                    >
                      {item.label}
                    </p>
                  ) : null}

                  <p className={`${VOLUNTEER_INSET_LINE_GAP} ${VOLUNTEER_LABEL}`}>Pickup</p>
                  <p
                    className={`${VOLUNTEER_INSET_LINE_GAP} flex items-start gap-1.5 text-sm leading-relaxed text-[#64748B]`}
                  >
                    <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
                    {item.pickupLocation}
                  </p>

                  <p className={`${VOLUNTEER_INSET_LINE_GAP} ${VOLUNTEER_LABEL}`}>Deliver to</p>
                  <p
                    className={`${VOLUNTEER_INSET_LINE_GAP} flex items-start gap-1.5 text-sm leading-relaxed text-[#64748B]`}
                  >
                    <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
                    {item.deliverAddress}
                  </p>

                  {locked ? (
                    <p
                      className={`${VOLUNTEER_INSET_LINE_GAP} flex items-center gap-1.5 text-[10px] font-medium text-[#94A3B8]`}
                    >
                      <FaLock aria-hidden="true" />
                      Unlocks after the current mission is completed
                    </p>
                  ) : null}
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex justify-center pl-[0.5cm] sm:pl-[0.75cm]">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={[
            VOLUNTEER_BTN,
            "gap-[0.5cm] border border-[#E5E7EB] bg-[#F8FAFC] text-[#475569]",
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
            className="pl-[0.5cm] text-center text-[10px] text-[#64748B] sm:pl-[0.75cm]"
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
    </VolunteerSectionShell>
  );
}
