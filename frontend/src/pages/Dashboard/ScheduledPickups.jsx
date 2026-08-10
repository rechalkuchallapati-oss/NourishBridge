import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaClock,
  FaMapMarkerAlt,
  FaSyncAlt,
} from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import {
  fetchMyDonations,
  getScheduledPickups,
} from "../../modules/donations/services/donationService";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];
const BOX_INSET = "pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm]";

const STATUS_COLORS = {
  ngo_accepted: "bg-[#DBEAFE] text-[#1D4ED8]",
  volunteer_assigned: "bg-[#E0E7FF] text-[#4338CA]",
  pickup_scheduled: "bg-[#EDE9FE] text-[#6D28D9]",
  picked_up: "bg-[#FEF3C7] text-[#B45309]",
};

function PickupCard({ pickup, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.06 * index, ease: EASE }}
      className="overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-sm"
    >
      <div className={`flex flex-col gap-[0.5cm] border-b border-[#E5E7EB] bg-[#F8FAFC] sm:flex-row sm:items-center sm:justify-between ${BOX_INSET}`}>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">
            {pickup.id}
          </p>
          <h3 className="text-xl font-bold text-[#0F172A]">{pickup.food}</h3>
          <p className="text-sm text-[#64748B]">{pickup.quantity}</p>
        </div>
        <span
          className={`inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 text-sm font-semibold ${STATUS_COLORS[pickup.status] ?? "bg-[#F1F5F9] text-[#475569]"}`}
        >
          {pickup.statusLabel}
        </span>
      </div>

      <div className={`grid gap-[0.5cm] lg:grid-cols-2 ${BOX_INSET}`}>
        <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">
            <FaCalendarAlt className="text-[#16A34A]" aria-hidden="true" />
            Pickup window
          </div>
          <p className="mt-2 text-base font-semibold text-[#0F172A]">{pickup.pickupTime || "TBD"}</p>
        </div>
        <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">
            <FaMapMarkerAlt className="text-[#16A34A]" aria-hidden="true" />
            Pickup address
          </div>
          <p className="mt-2 text-sm text-[#0F172A]">{pickup.pickupAddress}</p>
        </div>
      </div>

      <div className={`border-t border-[#E5E7EB] ${BOX_INSET}`}>
        <Link
          to={`${DASHBOARD_ROUTES.donorDonations}/${pickup.mongoId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A] hover:underline"
        >
          View donation details
        </Link>
      </div>
    </motion.article>
  );
}

export default function ScheduledPickups() {
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const result = await fetchMyDonations({ active: "true" });
        if (!mounted) return;
        setPickups(getScheduledPickups(result.donations));
      } catch (err) {
        if (mounted) setError(getApiErrorMessage(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const sortedPickups = useMemo(
    () =>
      [...pickups].sort(
        (a, b) =>
          new Date(a.pickupScheduledAt || a.createdAt) -
          new Date(b.pickupScheduledAt || b.createdAt),
      ),
    [pickups],
  );

  return (
    <DashboardLayout
      emoji="🍱"
      title="Donor Dashboard"
      subtitle="Scheduled pickups"
      userName={donorName}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col gap-[0.5cm]"
      >
        <div className="flex items-start gap-[0.5cm] rounded-[16px] bg-gradient-to-br from-[#F0FDF4] to-white p-[0.5cm]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A]">
            <FaClipboardList className="text-2xl" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-[#0F172A]">Scheduled Pickups</h1>
            <p className="text-sm text-[#64748B] sm:text-base">
              Donations with NGO acceptance or pickup scheduling in progress.
            </p>
          </div>
        </div>

        {error ? (
          <p className="rounded-[12px] border border-[#FECACA] bg-[#FEF2F2] p-4 text-sm text-[#B91C1C]">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="text-sm text-[#64748B]">Loading scheduled pickups…</p>
        ) : sortedPickups.length === 0 ? (
          <div className="rounded-[16px] border border-[#E5E7EB] bg-white p-8 text-center">
            <FaClock className="mx-auto text-3xl text-[#94A3B8]" aria-hidden="true" />
            <p className="mt-3 text-sm text-[#64748B]">No scheduled pickups yet.</p>
            <Link
              to={DASHBOARD_ROUTES.donorCreate}
              className="mt-4 inline-flex text-sm font-semibold text-[#16A34A] hover:underline"
            >
              Create a donation
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-[0.5cm]">
            <p className="flex items-center gap-2 text-sm text-[#64748B]">
              <FaSyncAlt aria-hidden="true" />
              {sortedPickups.length} pickup{sortedPickups.length === 1 ? "" : "s"} scheduled
            </p>
            {sortedPickups.map((pickup, index) => (
              <PickupCard key={pickup.mongoId || pickup.id} pickup={pickup} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
