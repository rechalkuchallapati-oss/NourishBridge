import { Link } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { DASHBOARD_IMPACT_HIGHLIGHTS } from "../../data/volunteerImpactMetrics";
import { volunteerInteractive } from "./volunteerDashboardStyles";
import VolunteerImpactMetricsGrid from "./VolunteerImpactMetricsGrid";

export default function VolunteerDashboardImpactPanel() {
  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A] sm:text-base">My Impact</h2>
          <p className="mt-0.5 text-[11px] text-[#64748B]">
            Your top performance scores at a glance.
          </p>
        </div>
        <Link
          to={DASHBOARD_ROUTES.volunteerImpact}
          className={["text-xs font-semibold text-[#16A34A]", volunteerInteractive.link].join(" ")}
        >
          View all
        </Link>
      </div>

      <div className="mt-4">
        <VolunteerImpactMetricsGrid metrics={DASHBOARD_IMPACT_HIGHLIGHTS} compact />
      </div>
    </section>
  );
}
