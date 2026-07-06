import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import VolunteerLayout from "../../components/dashboard/VolunteerLayout";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { MISSION_STATES } from "../../data/volunteerMission";
import { DASHBOARD_ROUTES } from "../../constants/routes";

export default function VolunteerPickupVerification() {
  const navigate = useNavigate();
  const { activeMission, setMissionStatus } = useVolunteerMissionContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!activeMission) {
      toast.error("No active mission.");
      return;
    }
    setMissionStatus(MISSION_STATES.PICKUP_VERIFIED);
    toast.success("Pickup verified.");
    navigate(DASHBOARD_ROUTES.volunteerActive);
  };

  return (
    <VolunteerLayout>
      <Toaster position="top-center" />
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">Pickup Verification</h1>
        <p className="mt-1 text-xs text-[#64748B]">Confirm collection and food condition at donor.</p>

        {activeMission ? (
          <form onSubmit={handleSubmit} className="mt-4 grid max-w-lg gap-3 text-xs">
            <p className="font-semibold text-[#0F172A]">
              {activeMission.foodName} · {activeMission.donorName}
            </p>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Packaging condition</span>
              <select required className="rounded-none border border-[#E5E7EB] px-3 py-2">
                <option value="">Select...</option>
                <option>Good</option>
                <option>Acceptable</option>
                <option>Damaged</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Temperature check</span>
              <select required className="rounded-none border border-[#E5E7EB] px-3 py-2">
                <option value="">Select...</option>
                <option>Within safe range</option>
                <option>Hot holding OK</option>
                <option>Refrigerated OK</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Quantity matches listing</span>
              <select required className="rounded-none border border-[#E5E7EB] px-3 py-2">
                <option value="">Select...</option>
                <option>Yes</option>
                <option>Minor variance</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Notes</span>
              <textarea rows={2} className="rounded-none border border-[#E5E7EB] px-3 py-2" />
            </label>
            <button
              type="submit"
              className="w-fit rounded-none bg-[#16A34A] px-4 py-2 font-semibold text-white hover:bg-[#15803D]"
            >
              Submit pickup verification
            </button>
          </form>
        ) : (
          <p className="mt-4 text-xs text-[#64748B]">No active mission at donor location.</p>
        )}
      </section>
    </VolunteerLayout>
  );
}
