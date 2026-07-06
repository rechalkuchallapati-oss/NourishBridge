import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { MISSION_STATES } from "../../data/volunteerMission";
import { DASHBOARD_ROUTES } from "../../constants/routes";

export default function VolunteerDeliveryVerification() {
  const navigate = useNavigate();
  const { activeMission, setMissionStatus } = useVolunteerMissionContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!activeMission) {
      toast.error("No active mission.");
      return;
    }
    setMissionStatus(MISSION_STATES.HANDOVER_CONFIRMED);
    toast.success("Handover confirmed with NGO.");
    navigate(DASHBOARD_ROUTES.volunteerActive);
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">Delivery Verification</h1>
        <p className="mt-1 text-xs text-[#64748B]">NGO handover confirmation and proof.</p>

        {activeMission ? (
          <form onSubmit={handleSubmit} className="mt-4 grid max-w-lg gap-3 text-xs">
            <p className="font-semibold text-[#0F172A]">
              Delivering to {activeMission.ngoName}
            </p>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">NGO representative name</span>
              <input required className="rounded-none border border-[#E5E7EB] px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Handover quantity</span>
              <input defaultValue={activeMission.quantity} required className="rounded-none border border-[#E5E7EB] px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Food condition at handover</span>
              <select required className="rounded-none border border-[#E5E7EB] px-3 py-2">
                <option>Good</option>
                <option>Acceptable</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Proof photo (optional)</span>
              <input type="file" accept="image/*" className="text-[10px]" />
            </label>
            <button
              type="submit"
              className="w-fit rounded-none bg-[#16A34A] px-4 py-2 font-semibold text-white hover:bg-[#15803D]"
            >
              Confirm handover
            </button>
          </form>
        ) : (
          <p className="mt-4 text-xs text-[#64748B]">No active delivery in progress.</p>
        )}
      </section>
    </>
  );
}
