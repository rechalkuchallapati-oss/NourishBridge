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
import { volunteerInteractive } from "./volunteerDashboardStyles";

function getStepIndex(status) {
  return MISSION_FLOW_STEPS.findIndex((step) => step.key === status);
}

export default function MissionWorkflowPanel({
  mission,
  onAdvance,
  onComplete,
}) {
  const navigate = useNavigate();

  if (!mission) {
    return (
      <section className="rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
          Current Mission
        </p>
        <p className="mt-2 text-sm font-semibold text-[#64748B]">No active mission</p>
        <p className="mt-1 text-xs text-[#94A3B8]">
          Accept a pickup request to begin the full rescue workflow.
        </p>
      </section>
    );
  }

  const currentIndex = getStepIndex(mission.status);
  const action = MISSION_STATE_ACTIONS[mission.status];
  const foodImage = getVolunteerFoodImage(mission.foodKey);
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
    <section className={[
      "rounded-none border border-[#16A34A]/30 bg-gradient-to-br from-[#F0FDF4] to-white p-4 shadow-sm sm:p-5",
      volunteerInteractive.card,
    ].join(" ")}>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
        Current Mission
      </p>

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A]">Mission Progress</h2>
          <ol className="mt-3 space-y-1.5">
            {MISSION_FLOW_STEPS.map((step, index) => {
              const isComplete = currentIndex > index;
              const isCurrent = currentIndex === index;
              const isUpcoming = currentIndex < index;

              return (
                <li
                  key={step.key}
                  className={[
                    "flex items-center gap-2.5 rounded-none border px-2.5 py-2 text-[11px]",
                    isCurrent
                      ? "border-[#BBF7D0] bg-[#F0FDF4] font-semibold text-[#15803D]"
                      : isComplete
                        ? "border-[#E5E7EB] bg-white text-[#64748B]"
                        : "border-transparent bg-transparent text-[#CBD5E1]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px]",
                      isComplete
                        ? "border-[#16A34A] bg-[#16A34A] text-white"
                        : isCurrent
                          ? "border-[#16A34A] bg-white text-[#16A34A]"
                          : "border-[#E2E8F0] bg-white text-[#CBD5E1]",
                    ].join(" ")}
                  >
                    {isComplete ? <FaCheck aria-hidden="true" /> : index + 1}
                  </span>
                  <span className={isUpcoming ? "line-through opacity-60" : ""}>{step.label}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="space-y-4">
          <div className="rounded-none border border-[#E5E7EB] bg-white p-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-none border border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]">
                <FaBuilding className="text-sm" aria-hidden="true" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Pickup</p>
            </div>
            <p className="mt-2 text-sm font-bold text-[#0F172A]">{mission.donorName}</p>
            <p className="mt-1 flex items-start gap-1.5 text-xs text-[#64748B]">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
              {mission.pickupAddress}
            </p>
          </div>

          <div className="rounded-none border border-[#E5E7EB] bg-white p-3">
            <div className="flex items-center gap-3">
              <img
                src={foodImage}
                alt={mission.foodName}
                className="h-12 w-12 shrink-0 rounded-none border border-[#E5E7EB] object-cover"
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
                <DonationItemsList record={mission} className="mt-1" maxItems={5} />
                <p className="mt-1 flex items-center gap-1 text-xs text-[#64748B]">
                  <FaUtensils className="text-[#16A34A]" aria-hidden="true" />
                  ~{mission.estimatedMeals} meals
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-none border border-[#E5E7EB] bg-white p-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-none border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]">
                <FaHandsHelping className="text-sm" aria-hidden="true" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                Deliver To
              </p>
            </div>
            <p className="mt-2 text-sm font-bold text-[#0F172A]">{mission.ngoName}</p>
            <p className="mt-1 flex items-start gap-1.5 text-xs text-[#64748B]">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
              {mission.ngoAddress}
            </p>
          </div>

          <MissionRouteMap
            pickupLabel="Pickup"
            ngoLabel="NGO"
            distanceKm={mission.journeyDistanceKm}
          />

          <div className="flex flex-col gap-2 sm:flex-row">
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
