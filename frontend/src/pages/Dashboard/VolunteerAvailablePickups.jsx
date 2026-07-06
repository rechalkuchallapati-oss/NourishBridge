import toast, { Toaster } from "react-hot-toast";
import VolunteerPickupRequestCard from "../../components/volunteer/VolunteerPickupRequestCard";
import { useVolunteerMissionContext } from "../../context/VolunteerMissionContext";
import { getVolunteerFoodImage } from "../../data/volunteerAssets";

export default function VolunteerAvailablePickups() {
  const { activeMission, availablePickups, isAvailable, acceptMission } =
    useVolunteerMissionContext();

  return (
    <>
      <Toaster position="top-center" />
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-5">
        <h1 className="text-lg font-bold text-[#0F172A]">Available Pickups</h1>
        <p className="mt-1 text-xs text-[#64748B]">
          All nearby donation requests you can accept for pickup and delivery.
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {availablePickups.map((pickup, index) => (
            <VolunteerPickupRequestCard
              key={pickup.id}
              pickup={pickup}
              foodImage={getVolunteerFoodImage(pickup.foodKey)}
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
    </>
  );
}
