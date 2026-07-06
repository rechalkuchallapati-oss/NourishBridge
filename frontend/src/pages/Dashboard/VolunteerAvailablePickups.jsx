import toast, { Toaster } from "react-hot-toast";
import VolunteerPickupRequestCard from "../../components/volunteer/VolunteerPickupRequestCard";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { getVolunteerFoodImage } from "../../data/volunteerAssets";
import { VOLUNTEER_SECTION_PAD, VOLUNTEER_STACK_GAP } from "../../components/volunteer/volunteerDashboardStyles";

export default function VolunteerAvailablePickups() {
  const { activeMission, availablePickups, isAvailable, acceptMission } =
    useVolunteerMissionContext();

  return (
    <div className={VOLUNTEER_STACK_GAP}>
      <Toaster position="top-center" />
      <section
        className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}
      >
        <h1 className="text-lg font-bold text-[#0F172A]">Available Pickups</h1>
        <p className="mt-[0.3cm] text-xs text-[#64748B]">
          All nearby donation requests you can accept for pickup and delivery.
        </p>
        <ul className={`mt-[0.5cm] ${VOLUNTEER_STACK_GAP}`}>
          {availablePickups.map((pickup, index) => (
            <VolunteerPickupRequestCard
              key={pickup.id}
              pickup={pickup}
              foodImage={getVolunteerFoodImage(pickup)}
              disabled={!!activeMission || !isAvailable}
              index={index}
              onAccept={(item) => {
                if (acceptMission(item)) toast.success("Mission accepted.");
                else toast.error("Cannot accept — check availability or active mission.");
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
