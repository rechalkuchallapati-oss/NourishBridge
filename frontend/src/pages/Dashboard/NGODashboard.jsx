import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaLeaf,
  FaTruck,
  FaUtensils,
  FaUsers,
  FaInbox,
} from "react-icons/fa";
import NGOContentHeader from "../../components/ngo/NGOContentHeader";
import NGOOverviewActiveDeliveries from "../../components/ngo/NGOOverviewActiveDeliveries";
import NGOOverviewImpactMonth from "../../components/ngo/NGOOverviewImpactMonth";
import NGOOverviewIncomingPanel from "../../components/ngo/NGOOverviewIncomingPanel";
import NGOOverviewInventorySummary from "../../components/ngo/NGOOverviewInventorySummary";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import { fetchNgoDashboard } from "../../modules/ngo/services/ngoService";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";
import { Toaster } from "react-hot-toast";

const METRIC_ICONS = {
  incoming: FaInbox,
  active_deliveries: FaTruck,
  food_received: FaBoxOpen,
  meals_distributed: FaUtensils,
  people_supported: FaUsers,
  food_saved: FaLeaf,
};

export default function NGODashboard() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const dashboard = await fetchNgoDashboard();
        if (mounted) setMetrics(dashboard.metrics);
      } catch {
        if (mounted) setMetrics([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <NGOLayout organizationName={orgName}>
      <Toaster position="top-center" />

      <div className="overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <NGOContentHeader organizationName={orgName} unreadNotifications={5} />

        <div className="grid gap-2 p-3 sm:grid-cols-2 sm:p-4 xl:grid-cols-3 [&_*]:text-sm">
          {loading ? (
            <p className="col-span-full px-2 py-4 text-sm text-[#64748B]">Loading dashboard metrics…</p>
          ) : (
            metrics.map((metric) => (
              <NGOStatCard
                key={metric.id}
                label={metric.label}
                value={metric.value}
                caption={metric.caption}
                icon={METRIC_ICONS[metric.id]}
                accent={metric.accent}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        <NGOOverviewIncomingPanel />
        <NGOOverviewActiveDeliveries />
        <NGOOverviewInventorySummary />
        <NGOOverviewImpactMonth />
      </div>
    </NGOLayout>
  );
}
