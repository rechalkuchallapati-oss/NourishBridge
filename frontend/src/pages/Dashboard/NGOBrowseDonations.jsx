import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaCheckCircle, FaInbox, FaSearch } from "react-icons/fa";
import DeclineDonationModal from "../../components/ngo/DeclineDonationModal";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import {
  INCOMING_CATEGORY_OPTIONS,
  DONATION_TABLE_STATUS_LABELS,
  DONATION_STATUS_COLORS,
} from "../../data/ngoIncomingDonations";
import {
  acceptDonation,
  rejectDonation,
  fetchAvailableDonations,
  buildDonationQueryParams,
} from "../../modules/ngo/services/ngoService";
import { getApiErrorMessage } from "../../utils/apiErrors";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];
const FILTER_CLASS =
  "w-full rounded-[10px] border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm font-medium text-[#0F172A]";

export default function NGOBrowseDonations() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [filters, setFilters] = useState({ search: "", category: "all", priority: "all" });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const items = await fetchAvailableDonations(buildDonationQueryParams(filters));
        if (!cancelled) setDonations(items);
      } catch (error) {
        if (!cancelled) toast.error(getApiErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filters.search, filters.category, filters.priority]);

  const filtered = useMemo(() => donations, [donations]);

  const handleAccept = async (donation) => {
    try {
      await acceptDonation(donation.mongoId || donation.id);
      setDonations((prev) => prev.filter((d) => (d.mongoId || d.id) !== (donation.mongoId || donation.id)));
      toast.success(`${donation.foodName || donation.food} accepted`);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const handleDeclineConfirm = async (_id, payload) => {
    if (!declineTarget) return;
    try {
      await rejectDonation(declineTarget.mongoId || declineTarget.id, payload.reason);
      setDonations((prev) => prev.filter((d) => (d.mongoId || d.id) !== (declineTarget.mongoId || declineTarget.id)));
      toast.success("Donation declined");
      setDeclineTarget(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <NGOLayout organizationName={orgName}>
      <Toaster position="top-center" />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-[16px] border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-6"
      >
        <NGOPageHeader
          icon={FaInbox}
          title="Browse Available Donations"
          description="Verified donations awaiting NGO acceptance. Search and filter to find suitable matches."
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1 sm:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Search</span>
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                placeholder="Food name or ID"
                className={`${FILTER_CLASS} pl-9`}
              />
            </div>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Category</span>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className={FILTER_CLASS}
            >
              {INCOMING_CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">Priority</span>
            <select
              value={filters.priority}
              onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
              className={FILTER_CLASS}
            >
              <option value="all">All priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
        </div>

        <div className="mt-4 overflow-x-auto rounded-[12px] border border-[#E5E7EB]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs font-semibold uppercase text-[#64748B]">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Food</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Meals</th>
                <th className="px-4 py-3">Pickup</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#64748B]">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#64748B]">No available donations found.</td></tr>
              ) : (
                filtered.map((donation) => (
                  <tr key={donation.mongoId || donation.id} className="border-t border-[#F1F5F9]">
                    <td className="px-4 py-3 font-semibold text-[#2563EB]">{donation.id}</td>
                    <td className="px-4 py-3">{donation.foodName || donation.food}</td>
                    <td className="px-4 py-3">{donation.quantity}</td>
                    <td className="px-4 py-3">{donation.estimatedMeals || donation.estimatedServings}</td>
                    <td className="px-4 py-3">{donation.pickupLocation || donation.pickupAddress}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${DONATION_STATUS_COLORS.pending_ngo_acceptance}`}>
                        {DONATION_TABLE_STATUS_LABELS.pending_ngo_acceptance}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleAccept(donation)}
                          className="inline-flex items-center gap-1 rounded-[8px] bg-[#16A34A] px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          <FaCheckCircle /> Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeclineTarget(donation)}
                          className="rounded-[8px] border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"
                        >
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.section>

      {declineTarget ? (
        <DeclineDonationModal
          donation={{
            id: declineTarget.id,
            foodName: declineTarget.foodName || declineTarget.food,
            donorName: declineTarget.donorName || "Donor",
          }}
          onClose={() => setDeclineTarget(null)}
          onConfirm={handleDeclineConfirm}
        />
      ) : null}
    </NGOLayout>
  );
}
