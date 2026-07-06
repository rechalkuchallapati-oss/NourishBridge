import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";

export default function VolunteerRouteNavigation() {
  const { activeMission } = useVolunteerMissionContext();

  if (!activeMission) {
    return (
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 text-center shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">Route & Navigation</h1>
        <p className="mt-2 text-xs text-[#64748B]">No active mission — accept a pickup to view route.</p>
      </section>
    );
  }

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <h1 className="text-lg font-bold text-[#0F172A]">Route & Navigation</h1>
      <p className="mt-1 text-xs text-[#64748B]">Donor → NGO journey (simulated for demo).</p>

      <div className="mt-4 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="mt-1 text-[#16A34A]" />
            <div className="text-xs">
              <p className="font-bold text-[#0F172A]">{activeMission.donorName}</p>
              <p className="text-[#64748B]">{activeMission.pickupAddress}</p>
            </div>
          </div>
          <div className="hidden text-xs text-[#94A3B8] sm:block">→ {activeMission.journeyDistanceKm} km →</div>
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="mt-1 text-[#2563EB]" />
            <div className="text-xs">
              <p className="font-bold text-[#0F172A]">{activeMission.ngoName}</p>
              <p className="text-[#64748B]">{activeMission.ngoAddress}</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-[#64748B]">
          Simulated GPS — integrate Google Maps / Mapbox API in production.
        </p>
      </div>

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-2 rounded-none bg-[#16A34A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#15803D]"
      >
        <FaLocationArrow aria-hidden="true" />
        Open in Maps (demo)
      </button>
    </section>
  );
}
