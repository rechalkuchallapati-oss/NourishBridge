import { FaCheckCircle, FaStar, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import {
  volunteerInteractive,
  VOLUNTEER_BTN,
  VOLUNTEER_CONTENT_STACK,
} from "./volunteerDashboardStyles";

export default function MissionSuccessModal({ mission, onClose }) {
  if (!mission) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-success-title"
    >
      <div className="w-full max-w-lg rounded-none border border-[#BBF7D0] bg-white p-[0.5cm] shadow-[0_24px_48px_rgba(22,163,74,0.2)]">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FDF4] text-[#16A34A]">
            <FaCheckCircle className="text-4xl" aria-hidden="true" />
          </span>
          <h2 id="mission-success-title" className="mt-[0.5cm] text-2xl font-bold text-[#0F172A]">
            Delivered Successfully!
          </h2>
          <p className="mt-[0.5cm] text-sm leading-relaxed text-[#64748B]">
            Food handover to <strong>{mission.ngoName}</strong> is complete. This mission has been
            added to My Missions and your profile impact has been updated.
          </p>
        </div>

        <ul className={`mt-[0.5cm] ${VOLUNTEER_CONTENT_STACK}`}>
          <li className="flex items-center gap-3 rounded-none border border-[#DCFCE7] bg-[#F0FDF4] px-4 py-3 text-sm text-[#15803D]">
            <FaTrophy aria-hidden="true" />
            ~{mission.estimatedMeals ?? 0} meals delivered
          </li>
          <li className="flex items-center gap-3 rounded-none border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-3 text-sm text-[#B45309]">
            <FaStar aria-hidden="true" />
            New 5★ NGO review added to your profile
          </li>
        </ul>

        <div className={`mt-[0.5cm] flex flex-col ${VOLUNTEER_CONTENT_STACK} sm:flex-row`}>
          <Link
            to={DASHBOARD_ROUTES.volunteerMissions}
            onClick={onClose}
            className={[
              VOLUNTEER_BTN,
              "flex-1 bg-[#16A34A] text-white",
              volunteerInteractive.button,
            ].join(" ")}
          >
            View My Missions
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={[
              VOLUNTEER_BTN,
              "flex-1 border border-[#E5E7EB] bg-white text-[#475569]",
              volunteerInteractive.buttonOutline,
            ].join(" ")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
