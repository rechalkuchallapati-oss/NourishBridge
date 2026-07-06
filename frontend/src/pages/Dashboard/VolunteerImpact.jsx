import { FaLeaf, FaTruck, FaUsers, FaUtensils } from "react-icons/fa";
import VolunteerLayout, { VolunteerStatCard } from "../../components/dashboard/VolunteerLayout";
import { VOLUNTEER_IMPACT } from "../../data/volunteerMission";

export default function VolunteerImpact() {
  return (
    <VolunteerLayout>
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold text-[#0F172A]">My Impact</h1>
        <p className="mt-1 text-xs text-[#64748B]">Your contribution to reducing food waste.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <VolunteerStatCard label="Meals Delivered" value={VOLUNTEER_IMPACT.mealsDelivered} icon={FaUtensils} accent="green" />
          <VolunteerStatCard label="Food Rescued" value={`${VOLUNTEER_IMPACT.foodRescuedKg} kg`} icon={FaLeaf} accent="blue" />
          <VolunteerStatCard label="People Supported" value={VOLUNTEER_IMPACT.peopleSupported} icon={FaUsers} accent="purple" />
          <VolunteerStatCard label="Missions Completed" value={VOLUNTEER_IMPACT.missionsCompleted} icon={FaTruck} accent="amber" />
        </div>
      </section>
    </VolunteerLayout>
  );
}
