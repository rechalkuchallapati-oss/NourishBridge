import VolunteerPerformanceChart from "../../components/volunteer/VolunteerPerformanceChart";
import VolunteerImpactMetricsGrid from "../../components/volunteer/VolunteerImpactMetricsGrid";
import { VOLUNTEER_SECTION_PAD, VOLUNTEER_STACK_GAP } from "../../components/volunteer/volunteerDashboardStyles";
import { VOLUNTEER_IMPACT_METRICS } from "../../data/volunteerImpactMetrics";

export default function VolunteerImpact() {
  return (
    <div className={VOLUNTEER_STACK_GAP}>
      <section className={`rounded-none border border-[#E5E7EB] bg-white shadow-sm ${VOLUNTEER_SECTION_PAD}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
          Your Impact
        </p>
        <h1 className="mt-[0.3cm] text-lg font-bold text-[#0F172A]">My Impact</h1>
        <p className="mt-[0.3cm] text-xs text-[#64748B]">
          Reliability scores, delivery volume, and performance trends.
        </p>

        <div className="mt-[0.5cm]">
          <VolunteerImpactMetricsGrid
            metrics={VOLUNTEER_IMPACT_METRICS}
            columns="sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section>

      <VolunteerPerformanceChart />
    </div>
  );
}
