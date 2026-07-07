import { Link } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { DASHBOARD_IMPACT_HIGHLIGHTS } from "../../data/volunteerImpactMetrics";
import VolunteerImpactMetricsGrid from "./VolunteerImpactMetricsGrid";
import VolunteerPerformanceChart from "./VolunteerPerformanceChart";
import VolunteerSectionShell, { VolunteerSectionTitle } from "./VolunteerSectionShell";
import {
  volunteerInteractive,
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_INSET_LINE_GAP,
} from "./volunteerDashboardStyles";

export default function VolunteerDashboardImpactPanel() {
  return (
    <VolunteerSectionShell>
      <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
        <div className="min-w-0 flex-1 pr-[1.5cm]">
          <VolunteerSectionTitle
            title="My Impact"
            subtitle="Top scores and weekly delivery trend."
            theme="emerald"
          />
        </div>
        <Link
          to={DASHBOARD_ROUTES.volunteerImpact}
          className={[
            "shrink-0 text-xs font-semibold text-[#16A34A]",
            volunteerInteractive.link,
          ].join(" ")}
        >
          View all
        </Link>
      </div>

      <div className={VOLUNTEER_CONTENT_STACK}>
        <VolunteerImpactMetricsGrid metrics={DASHBOARD_IMPACT_HIGHLIGHTS} compact />
        <VolunteerPerformanceChart compact />
      </div>
    </VolunteerSectionShell>
  );
}
