import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChartBar } from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout, { NGOStatCard } from "../../components/dashboard/NGOLayout";
import { fetchNgoImpactStats } from "../../modules/ngo/services/ngoService";
import { getApiErrorMessage } from "../../utils/apiErrors";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

export default function NGOImpactAnalytics() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchNgoImpactStats();
        if (!cancelled) setStats(data);
      } catch (err) {
        if (!cancelled) setError(getApiErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <NGOLayout organizationName={orgName}>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-[16px] border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-6"
      >
        <NGOPageHeader
          icon={FaChartBar}
          title="Impact Analytics"
          description="Real-time impact metrics from donations, inventory, and beneficiary capacity."
        />

        {loading ? (
          <p className="mt-4 text-sm text-[#64748B]">Loading impact statistics…</p>
        ) : error ? (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        ) : (
          <>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {(stats?.metrics || []).map((metric) => (
                <NGOStatCard
                  key={metric.id}
                  label={metric.label}
                  value={metric.value}
                  caption={metric.caption}
                  accent={metric.accent}
                />
              ))}
            </div>

            {stats?.donations ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Incoming queue" value={stats.donations.incoming} />
                <Stat label="Accepted (active)" value={stats.donations.accepted} />
                <Stat label="Completed" value={stats.donations.completed} />
                <Stat label="Rejected" value={stats.donations.rejected} />
              </div>
            ) : null}
          </>
        )}
      </motion.section>
    </NGOLayout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
      <p className="text-xs font-semibold uppercase text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#0F172A]">{value ?? 0}</p>
    </div>
  );
}
