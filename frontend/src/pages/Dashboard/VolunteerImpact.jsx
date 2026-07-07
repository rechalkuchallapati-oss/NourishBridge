import VolunteerCommunitiesAreasPanel from "../../components/volunteer/impact/VolunteerCommunitiesAreasPanel";
import VolunteerFoodRescueBreakdownChart from "../../components/volunteer/impact/VolunteerFoodRescueBreakdownChart";
import VolunteerImpactHeroStats from "../../components/volunteer/impact/VolunteerImpactHeroStats";
import VolunteerImpactJourneyTimeline from "../../components/volunteer/impact/VolunteerImpactJourneyTimeline";
import VolunteerImpactOverTimeChart from "../../components/volunteer/impact/VolunteerImpactOverTimeChart";
import { VOLUNTEER_SECTION_PAD, VOLUNTEER_STACK_GAP } from "../../components/volunteer/volunteerDashboardStyles";

export default function VolunteerImpact() {
  return (
    <div className={VOLUNTEER_STACK_GAP}>
      <section className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
          My Impact
        </p>
        <h1 className="mt-[0.3cm] text-lg font-bold text-[#0F172A] sm:text-xl">My Impact</h1>
        <p className="mt-[0.3cm] text-xs text-[#64748B] sm:text-sm">
          Your contribution is creating measurable change.
        </p>
        <VolunteerImpactHeroStats />
      </section>

      <VolunteerImpactOverTimeChart />

      <VolunteerCommunitiesAreasPanel />

      <VolunteerFoodRescueBreakdownChart />

      <VolunteerImpactJourneyTimeline />
    </div>
  );
}
