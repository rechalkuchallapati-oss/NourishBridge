import { Link, useNavigate } from "react-router-dom";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";
import {
  MISSION_STATE_ACTIONS,
  MISSION_STATE_LABELS,
  MISSION_STATES,
} from "../../data/volunteerMission";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import DonationProofThumbnail from "../common/DonationProofThumbnail";
import { volunteerInteractive, VOLUNTEER_BTN } from "./volunteerDashboardStyles";
import {
  volunteerInteractive,
  VOLUNTEER_BTN,
} from "./volunteerDashboardStyles";

export default function CurrentMissionPanel({
  mission,
  onAdvance,
  onComplete,
  compact = false,
}) {
  const navigate = useNavigate();

  if (!mission) {
    return (
      <section className="rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
          Current Mission
        </p>
        <p className="mt-2 text-sm font-medium text-[#64748B]">No active mission</p>
        <p className="mt-1 text-xs text-[#94A3B8]">
          Accept a pickup request to begin your mission workflow.
        </p>
      </section>
    );
  }

  const action = MISSION_STATE_ACTIONS[mission.status];
  const statusLabel =
    MISSION_STATE_LABELS[mission.status]?.toUpperCase() ?? mission.status;

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

  return (
    <section className="rounded-none border border-[#16A34A]/30 bg-gradient-to-br from-[#F0FDF4] to-white p-4 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
        Current Mission
      </p>

      <div className="mt-3 space-y-3 text-xs">
        <div>
          <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">Pickup</p>
          <p className="font-bold text-[#0F172A]">{mission.donorName}</p>
          <p className="text-[#64748B]">{mission.pickupAddress}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">Food</p>
          <p className="font-bold text-[#0F172A]">{mission.foodName}</p>
          <p className="text-[#64748B]">
            {mission.quantity} · ~{mission.estimatedMeals} meals
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">Destination</p>
          <p className="font-bold text-[#0F172A]">{mission.ngoName}</p>
          <p className="text-[#64748B]">{mission.ngoAddress}</p>
        </div>

        <div className="rounded-none border border-[#BBF7D0] bg-white p-2.5">
          <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">Status</p>
          <p className="mt-0.5 text-sm font-bold text-[#15803D]">{statusLabel}</p>
          {mission.eta ? (
            <p className="mt-1 text-xs text-[#64748B]">ETA: {mission.eta}</p>
          ) : null}
        </div>
      </div>

      {action ? (
        <div className={`mt-4 flex flex-col gap-2 ${compact ? "" : "sm:flex-row"}`}>
          <Link
            to={DASHBOARD_ROUTES.volunteerRoute}
            className={[
              VOLUNTEER_BTN,
              "flex-1 border border-[#E5E7EB] bg-white text-[#64748B]",
              volunteerInteractive.buttonOutline,
            ].join(" ")}
          >
            <FaLocationArrow aria-hidden="true" />
            Open Navigation
          </Link>
          <button
            type="button"
            onClick={handlePrimaryAction}
            className={[VOLUNTEER_BTN, "flex-1 bg-[#16A34A] text-white", volunteerInteractive.button].join(" ")}
          >
            {action.label}
          </button>
        </div>
      ) : null}
    </section>
  );
}

export function AvailablePickupCard({ pickup, onAccept, disabled }) {
  return (
    <li className="rounded-none border border-[#E5E7EB] bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        <div className="h-[132px] w-[108px] shrink-0 overflow-hidden border border-[#E5E7EB] bg-[#F8FAFC]">
          <DonationProofThumbnail record={pickup} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-[#0F172A]">{pickup.foodName}</h3>
          <p className="text-xs text-[#64748B]">
            {pickup.quantity} · Approximately {pickup.estimatedMeals} meals
          </p>

          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">Pickup</p>
              <p className="text-xs font-semibold text-[#0F172A]">{pickup.donorName}</p>
              <p className="flex items-start gap-1 text-[10px] text-[#64748B]">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" />
                {pickup.pickupAddress} · {pickup.pickupDistanceKm} km away
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">Deliver to</p>
              <p className="text-xs font-semibold text-[#0F172A]">{pickup.ngoName}</p>
              <p className="text-[10px] text-[#64748B]">{pickup.ngoAddress}</p>
            </div>
          </div>

          <p className="mt-2 text-[10px] text-[#64748B]">
            Pickup before: <strong className="text-[#0F172A]">{pickup.pickupDeadline}</strong>
            {" · "}
            Journey: <strong className="text-[#0F172A]">{pickup.journeyDistanceKm} km</strong>
          </p>

          <div className="mt-2 flex flex-wrap gap-[0.5cm]">
            <Link
              to={DASHBOARD_ROUTES.volunteerRoute}
              className={[
                VOLUNTEER_BTN,
                "border border-[#E5E7EB] bg-white text-[#64748B]",
                volunteerInteractive.buttonOutline,
              ].join(" ")}
            >
              View Route
            </Link>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onAccept(pickup)}
              className={[
                VOLUNTEER_BTN,
                "bg-[#16A34A] text-white disabled:cursor-not-allowed disabled:opacity-50",
                volunteerInteractive.button,
              ].join(" ")}
            >
              Accept Mission
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
