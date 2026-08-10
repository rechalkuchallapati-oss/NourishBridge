import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaEdit,
  FaMapMarkerAlt,
  FaTimesCircle,
  FaUtensils,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DonationHistoryTimeline from "../../components/dashboard/DonationHistoryTimeline";
import {
  dashboardAlertErrorClass,
  dashboardBoxClass,
} from "../../components/dashboard/dashboardFormStyles";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { getDonorDisplayName, getSessionUser } from "../../utils/authStorage";
import {
  cancelDonation,
  fetchDonationById,
  fetchDonationHistory,
} from "../../modules/donations/services/donationService";
import { getApiErrorMessage } from "../../utils/apiErrors";

const EASE = [0.22, 1, 0.36, 1];

function DetailField({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</span>
      <span className="text-sm font-medium text-[#0F172A] sm:text-base">{value || "—"}</span>
    </div>
  );
}

export default function DonationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getSessionUser();
  const donorName = getDonorDisplayName(user);

  const [donation, setDonation] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      setError("");

      try {
        const [donationData, historyData] = await Promise.all([
          fetchDonationById(id),
          fetchDonationHistory(id),
        ]);

        if (!mounted) return;
        setDonation(donationData);
        setHistory(historyData);
      } catch (err) {
        if (mounted) setError(getApiErrorMessage(err, "Unable to load donation."));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this donation? This cannot be undone.")) return;

    setCancelling(true);
    try {
      const updated = await cancelDonation(id);
      setDonation(updated);
      const historyData = await fetchDonationHistory(id);
      setHistory(historyData);
      toast.success("Donation cancelled.");
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout emoji="🍱" title="Donor Dashboard" subtitle="Donation details" userName={donorName}>
        <p className="text-sm text-[#64748B]">Loading donation…</p>
      </DashboardLayout>
    );
  }

  if (error || !donation) {
    return (
      <DashboardLayout emoji="🍱" title="Donor Dashboard" subtitle="Donation details" userName={donorName}>
        <div className={dashboardAlertErrorClass}>{error || "Donation not found."}</div>
        <Link to={DASHBOARD_ROUTES.donorDonations} className="mt-4 inline-flex text-sm text-[#16A34A]">
          ← Back to donations
        </Link>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout emoji="🍱" title="Donor Dashboard" subtitle="Donation details" userName={donorName}>
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col gap-[0.5cm]"
      >
        <Link
          to={DASHBOARD_ROUTES.donorDonations}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#16A34A]"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to My Donations
        </Link>

        <div className={`${dashboardBoxClass} flex flex-col gap-[0.5cm] bg-white p-[0.5cm] sm:p-6`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              {donation.image ? (
                <img
                  src={donation.image}
                  alt={donation.food}
                  className="h-24 w-32 rounded-[12px] border border-[#E5E7EB] object-cover"
                />
              ) : (
                <span className="flex h-24 w-32 items-center justify-center rounded-[12px] bg-[#F0FDF4] text-[#16A34A]">
                  <FaUtensils className="text-3xl" />
                </span>
              )}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">
                  {donation.id}
                </p>
                <h1 className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">{donation.food}</h1>
                <p className="mt-1 text-sm text-[#64748B]">{donation.category}</p>
                <span className="mt-2 inline-flex rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D]">
                  {donation.statusLabel}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {donation.canEdit ? (
                <Link
                  to={`${DASHBOARD_ROUTES.donorDonations}/${id}/edit`}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#16A34A] px-4 py-2 text-sm font-semibold text-[#16A34A] hover:bg-[#F0FDF4]"
                >
                  <FaEdit aria-hidden="true" />
                  Edit
                </Link>
              ) : null}
              {donation.canCancel ? (
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={handleCancel}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#DC2626] px-4 py-2 text-sm font-semibold text-[#DC2626] hover:bg-[#FEF2F2] disabled:opacity-60"
                >
                  <FaTimesCircle aria-hidden="true" />
                  {cancelling ? "Cancelling…" : "Cancel"}
                </button>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DetailField label="Quantity" value={donation.quantity} />
            <DetailField label="Estimated meals" value={donation.estimatedMeals} />
            <DetailField label="Freshness" value={donation.freshness} />
            <DetailField label="NGO" value={donation.ngo} />
            <DetailField label="Volunteer" value={donation.volunteer || "Not assigned"} />
            <DetailField label="Posted" value={donation.postedAt} />
            <DetailField label="Pickup window start" value={donation.pickupTime} />
            <DetailField label="Safe until" value={donation.expiryTime ? new Date(donation.expiryTime).toLocaleString("en-IN") : "—"} />
            <DetailField label="Diet type" value={donation.dietType} />
          </div>

          <div className="flex items-start gap-2 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-[#16A34A]" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Pickup address</p>
              <p className="text-sm text-[#0F172A]">{donation.pickupAddress}</p>
            </div>
          </div>

          {donation.notes ? (
            <DetailField label="Special instructions" value={donation.notes} />
          ) : null}

          {donation.images?.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              {donation.images.map((src) => (
                <img key={src} src={src} alt="" className="h-20 w-28 rounded-md border object-cover" />
              ))}
            </div>
          ) : null}
        </div>

        <div className={`${dashboardBoxClass} bg-white p-[0.5cm] sm:p-6`}>
          <h2 className="mb-4 text-lg font-bold text-[#0F172A]">Status history</h2>
          <DonationHistoryTimeline history={history} />
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
