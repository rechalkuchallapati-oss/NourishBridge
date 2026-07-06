import { Link } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { DASHBOARD_IMPACT_HIGHLIGHTS } from "../../data/volunteerImpactMetrics";
import VolunteerImpactMetricsGrid from "./VolunteerImpactMetricsGrid";
import VolunteerPerformanceChart from "./VolunteerPerformanceChart";
import { volunteerInteractive, VOLUNTEER_SECTION_PAD, VOLUNTEER_STACK_GAP } from "./volunteerDashboardStyles";

export default function VolunteerDashboardImpactPanel() {
  return (
    <section className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}>
      <div className="flex items-center justify-between gap-[0.5cm]">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A] sm:text-base">My Impact</h2>
          <p className="mt-[0.2cm] text-[11px] text-[#64748B]">
            Top scores and weekly delivery trend.
          </p>
        </div>
        <Link
          to={DASHBOARD_ROUTES.volunteerImpact}
          className={["text-xs font-semibold text-[#16A34A]", volunteerInteractive.link].join(" ")}
        >
          View all
        </Link>
      </div>

      <div className={`mt-[0.5cm] ${VOLUNTEER_STACK_GAP}`}>
        <VolunteerImpactMetricsGrid metrics={DASHBOARD_IMPACT_HIGHLIGHTS} compact />
        <VolunteerPerformanceChart compact />
      </div>
    </section>
  );
}
