import VolunteerMonthlyMissionsChart from "../../components/volunteer/VolunteerMonthlyMissionsChart";
import VolunteerImpactMetricsGrid from "../../components/volunteer/VolunteerImpactMetricsGrid";
import { VOLUNTEER_IMPACT_METRICS } from "../../data/volunteerImpactMetrics";

export default function VolunteerImpact() {
  return (
    <>
      <section className="rounded-none border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#16A34A]">
          Your Impact
        </p>
        <h1 className="mt-1 text-lg font-bold text-[#0F172A]">My Impact</h1>
        <p className="mt-1 text-xs text-[#64748B]">
          Reliability, trust, and food safety scores from your volunteer journey.
        </p>

        <div className="mt-4">
          <VolunteerImpactMetricsGrid
            metrics={VOLUNTEER_IMPACT_METRICS}
            columns="sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section>

      <div className="mt-4">
        <VolunteerMonthlyMissionsChart />
      </div>
    </>
  );
}
