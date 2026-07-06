import { FaClock, FaLeaf, FaTruck, FaUsers, FaUtensils } from "react-icons/fa";
import { VolunteerStatCard } from "../../components/dashboard/VolunteerLayout";
import ImpactMilestones from "../../components/volunteer/ImpactMilestones";
import VolunteerMonthlyMissionsChart from "../../components/volunteer/VolunteerMonthlyMissionsChart";
import { VOLUNTEER_IMPACT } from "../../data/volunteerMission";

export default function VolunteerImpact() {
  return (
    <>
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
          Your Impact
        </p>
        <h1 className="mt-1 text-lg font-bold text-[#0F172A]">My Impact</h1>
        <p className="mt-1 text-xs text-[#64748B]">
          Motivational milestones and real rescue data from your volunteer journey.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <VolunteerStatCard
            label="Missions Completed"
            value={VOLUNTEER_IMPACT.missionsCompleted}
            icon={FaTruck}
            accent="green"
          />
          <VolunteerStatCard
            label="Meals Delivered"
            value={VOLUNTEER_IMPACT.mealsDelivered.toLocaleString("en-IN")}
            icon={FaUtensils}
            accent="blue"
          />
          <VolunteerStatCard
            label="Food Rescued"
            value={`${VOLUNTEER_IMPACT.foodRescuedKg} kg`}
            icon={FaLeaf}
            accent="amber"
          />
          <VolunteerStatCard
            label="People Supported"
            value={VOLUNTEER_IMPACT.peopleSupported.toLocaleString("en-IN")}
            icon={FaUsers}
            accent="purple"
          />
          <VolunteerStatCard
            label="On-Time Delivery Rate"
            value={`${VOLUNTEER_IMPACT.onTimeDeliveryRate}%`}
            icon={FaClock}
            accent="slate"
            caption="Reliability score — separate from mission priority"
          />
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <VolunteerMonthlyMissionsChart />
        <ImpactMilestones />
      </div>
    </>
  );
}
