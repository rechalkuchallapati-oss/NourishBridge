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
import NGOOverviewIncomingPanel from "../../components/ngo/NGOOverviewIncomingPanel";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import { NGO_OVERVIEW_METRICS } from "../../data/ngoDashboard";
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

  return (
    <NGOLayout organizationName={orgName}>
      <Toaster position="top-center" />
      <div className="overflow-hidden rounded-none border border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <NGOContentHeader organizationName={orgName} unreadNotifications={5} />

        <div className="grid gap-[0.5cm] p-[0.5cm] sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
          {NGO_OVERVIEW_METRICS.map((metric) => (
            <NGOStatCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              caption={metric.caption}
              icon={METRIC_ICONS[metric.id]}
              accent={metric.accent}
            />
          ))}
        </div>
      </div>

      <NGOOverviewIncomingPanel />

      <NGOOverviewActiveDeliveries />
    </NGOLayout>
  );
}
