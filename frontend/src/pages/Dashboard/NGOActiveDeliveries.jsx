import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTruck } from "react-icons/fa";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import { fetchIncomingDeliveries } from "../../modules/ngo/services/ngoService";
import { getApiErrorMessage } from "../../utils/apiErrors";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

export default function NGOActiveDeliveries() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const items = await fetchIncomingDeliveries();
        if (!cancelled) setDeliveries(items);
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
          icon={FaTruck}
          title="Active Deliveries"
          description="Live deliveries in transit to your NGO."
        />

        {loading ? (
          <p className="mt-4 text-sm text-[#64748B]">Loading active deliveries…</p>
        ) : error ? (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        ) : deliveries.length === 0 ? (
          <p className="mt-4 text-sm text-[#64748B]">No active deliveries right now.</p>
        ) : (
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {deliveries.map((delivery) => (
              <article key={delivery.mongoId || delivery.id} className="rounded-[12px] border border-[#E5E7EB] p-4">
                <p className="text-xs font-semibold uppercase text-[#94A3B8]">{delivery.id}</p>
                <h3 className="text-lg font-bold text-[#0F172A]">{delivery.foodName}</h3>
                <p className="text-sm text-[#64748B]">{delivery.donorName} · {delivery.quantity}</p>
                <p className="mt-2 text-sm">Volunteer: {delivery.volunteer.name} ({delivery.volunteer.vehicle})</p>
                <p className="text-sm text-[#2563EB]">ETA: {delivery.eta}</p>
                <p className="text-xs text-[#64748B]">{delivery.lastLocationUpdate}</p>
              </article>
            ))}
          </div>
        )}
      </motion.section>
    </NGOLayout>
  );
}
