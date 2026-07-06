import { Link, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaCheck,
  FaHandsHelping,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaUtensils,
} from "react-icons/fa";
import {
  MISSION_FLOW_STEPS,
  MISSION_STATE_ACTIONS,
  MISSION_STATES,
} from "../../data/volunteerMission";
import { getVolunteerFoodImage } from "../../data/volunteerAssets";
import DonationItemsList from "../common/DonationItemsList";
import EventTypeBadge from "../common/EventTypeBadge";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import MissionRouteMap from "./MissionRouteMap";
import { volunteerInteractive, VOLUNTEER_STACK_GAP } from "./volunteerDashboardStyles";

function getStepIndex(status) {
  return MISSION_FLOW_STEPS.findIndex((step) => step.key === status);
}

function MissionProgressTimeline({ currentIndex }) {
  return (
    <ol className="flex flex-col">
      {MISSION_FLOW_STEPS.map((step, index) => {
        const isComplete = currentIndex > index;
        const isCurrent = currentIndex === index;
        const isLast = index === MISSION_FLOW_STEPS.length - 1;
        const connectorComplete = currentIndex > index;

        return (
          <li key={step.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={[
                  "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-colors",
                  isComplete
                    ? "border-[#16A34A] bg-[#16A34A] text-white"
                    : isCurrent
                      ? "border-[#16A34A] bg-white text-[#16A34A] shadow-[0_0_0_3px_rgba(22,163,74,0.15)]"
                      : "border-[#CBD5E1] bg-[#F1F5F9] text-[#64748B]",
                ].join(" ")}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? (
                  <FaCheck className="text-[10px]" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              {!isLast ? (
                <span
                  className={[
                    "my-[0.5cm] w-0.5 min-h-[0.5cm] flex-1",
                    connectorComplete ? "bg-[#16A34A]" : "bg-[#CBD5E1]",
                  ].join(" ")}
                  aria-hidden="true"
                />
              ) : null}
            </div>

            <div className={["min-w-0 flex-1", !isLast ? "pb-[0.5cm]" : ""].join(" ")}>
              <p
                className={[
                  "text-[11px] leading-5",
                  isComplete
                    ? "font-semibold text-[#15803D]"
                    : isCurrent
                      ? "font-bold text-[#0F172A]"
                      : "font-medium text-[#64748B]",
                ].join(" ")}
              >
                {step.label}
              </p>
              {isCurrent ? (
                <p className="mt-[0.2cm] text-[10px] text-[#16A34A]">In progress</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function MissionWorkflowPanel({
  mission,
  onAdvance,
  onComplete,
}) {
  const navigate = useNavigate();

  if (!mission) {
    return (
      <section className="rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-[0.5cm] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
          Current Mission
        </p>
        <p className="mt-[0.5cm] text-sm font-semibold text-[#64748B]">No active mission</p>
        <p className="mt-[0.3cm] text-xs text-[#94A3B8]">
          Accept a pickup request to begin the full rescue workflow.
        </p>
      </section>
    );
  }

  const currentIndex = getStepIndex(mission.status);
  const action = MISSION_STATE_ACTIONS[mission.status];
  const foodImage = getVolunteerFoodImage(mission);
  const showArrivedAtDonor = mission.status === MISSION_STATES.EN_ROUTE_TO_DONOR;

  const handlePrimaryAction = () => {
    if (!action) return;

    if (action.type === "navigate" && action.to) {
      navigate(action.to);
      return;
    }

    if (action.next === MISSION_STATES.COMPLETED) {
      onComplete?.();
      return;
    }

    onAdvance?.(action.next);
  };

  const handleArrivedAtDonor = () => {
    onAdvance?.(MISSION_STATES.ARRIVED_AT_DONOR);
  };

  return (
    <section
      className={[
        "rounded-none border border-[#16A34A]/30 bg-gradient-to-br from-[#F0FDF4] to-white p-[0.5cm] shadow-sm sm:p-5",
        volunteerInteractive.card,
      ].join(" ")}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
        Current Mission
      </p>

      <div className="mt-[0.5cm] grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A]">Mission Progress</h2>
          <div className="mt-[0.5cm]">
            <MissionProgressTimeline currentIndex={currentIndex} />
          </div>
        </div>

        <div className={VOLUNTEER_STACK_GAP}>
          <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-none border border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]">
                <FaBuilding className="text-sm" aria-hidden="true" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Pickup</p>
            </div>
            <p className="mt-[0.5cm] text-sm font-bold text-[#0F172A]">{mission.donorName}</p>
            <p className="mt-[0.3cm] flex items-start gap-1.5 text-xs text-[#64748B]">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
              {mission.pickupAddress}
            </p>
          </div>

          <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm]">
            <div className="flex items-center gap-3">
              <img
                src={foodImage}
                alt={mission.foodName}
                className="h-14 w-14 shrink-0 rounded-none border border-[#E5E7EB] object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Food</p>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-[#0F172A]">{mission.foodName}</p>
                  <EventTypeBadge eventType={mission.eventType} />
                </div>
                {mission.eventName ? (
                  <p className="text-[11px] font-medium text-[#64748B]">{mission.eventName}</p>
                ) : null}
                <DonationItemsList record={mission} className="mt-[0.3cm]" maxItems={5} />
                <p className="mt-[0.3cm] flex items-center gap-1 text-xs text-[#64748B]">
                  <FaUtensils className="text-[#16A34A]" aria-hidden="true" />
                  ~{mission.estimatedMeals} meals
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-none border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]">
                <FaHandsHelping className="text-sm" aria-hidden="true" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                Deliver To
              </p>
            </div>
            <p className="mt-[0.5cm] text-sm font-bold text-[#0F172A]">{mission.ngoName}</p>
            <p className="mt-[0.3cm] flex items-start gap-1.5 text-xs text-[#64748B]">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
              {mission.ngoAddress}
            </p>
          </div>

          <MissionRouteMap
            pickupLabel="Pickup"
            ngoLabel="NGO"
            distanceKm={mission.journeyDistanceKm}
          />

          <div className="flex flex-col gap-[0.5cm] sm:flex-row">
            <Link
              to={DASHBOARD_ROUTES.volunteerRoute}
              className={[
                "inline-flex flex-1 items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-3 py-2.5 text-xs font-semibold text-[#475569]",
                volunteerInteractive.buttonOutline,
              ].join(" ")}
            >
              <FaLocationArrow aria-hidden="true" />
              Open Navigation
            </Link>
            {showArrivedAtDonor ? (
              <button
                type="button"
                onClick={handleArrivedAtDonor}
                className={[
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-none bg-[#16A34A] px-3 py-2.5 text-xs font-semibold text-white",
                  volunteerInteractive.button,
                ].join(" ")}
              >
                <FaMapMarkerAlt aria-hidden="true" />
                I Have Arrived at Donor
              </button>
            ) : action ? (
              <button
                type="button"
                onClick={handlePrimaryAction}
                className={[
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-none bg-[#16A34A] px-3 py-2.5 text-xs font-semibold text-white",
                  volunteerInteractive.button,
                ].join(" ")}
              >
                {action.label}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
