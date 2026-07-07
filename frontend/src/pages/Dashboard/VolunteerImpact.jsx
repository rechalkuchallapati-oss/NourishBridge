import { FaTrophy } from "react-icons/fa";
import VolunteerCommunitiesAreasPanel from "../../components/volunteer/impact/VolunteerCommunitiesAreasPanel";
import VolunteerFoodRescueBreakdownChart from "../../components/volunteer/impact/VolunteerFoodRescueBreakdownChart";
import VolunteerImpactHeroStats from "../../components/volunteer/impact/VolunteerImpactHeroStats";
import VolunteerImpactJourneyTimeline from "../../components/volunteer/impact/VolunteerImpactJourneyTimeline";
import VolunteerImpactOverTimeChart from "../../components/volunteer/impact/VolunteerImpactOverTimeChart";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../../components/volunteer/VolunteerSectionShell";
import { VOLUNTEER_CONTENT_STACK, VOLUNTEER_PAGE_SECTION_GAP } from "../../components/volunteer/volunteerDashboardStyles";

export default function VolunteerImpact() {
  return (
    <div className={VOLUNTEER_PAGE_SECTION_GAP}>
      <VolunteerSectionShell>
        <VolunteerSectionTitle
          heading="h1"
          title="My Impact"
          subtitle="Your contribution is creating measurable change across Hyderabad communities."
          theme="emerald"
          icon={FaTrophy}
        />
        <VolunteerImpactHeroStats />
      </VolunteerSectionShell>

      <VolunteerImpactOverTimeChart />

      <VolunteerCommunitiesAreasPanel />

      <VolunteerFoodRescueBreakdownChart />

      <VolunteerImpactJourneyTimeline />
    </div>
  );
}
