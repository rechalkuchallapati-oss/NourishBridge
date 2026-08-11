import { useMemo, useState, useEffect } from "react";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import DeclineDonationModal from "./DeclineDonationModal";
import { getNgoFoodImage } from "../../data/ngoFoodAssets";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import DonationItemsList from "../common/DonationItemsList";
import EventTypeBadge from "../common/EventTypeBadge";
import { NGOSectionHeader, NGO_SECTION_CLASS, NGO_SECTION_TEXT } from "./NGOSectionLink";
import {
  acceptDonation,
  fetchIncomingDonations,
  rejectDonation,
} from "../../modules/ngo/services/ngoService";
import { getApiErrorMessage } from "../../utils/apiErrors";

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-0.5 text-[10px] font-medium text-[#0F172A] sm:text-xs">{value}</p>
    </div>
  );
}

function IncomingDonationRow({ donation, onAccept, onDecline }) {
  const foodImage = getNgoFoodImage(donation);

  if (donation.status === "accepted") {
    return (
      <li className="rounded-[16px] border border-[#DCFCE7] bg-[#F0FDF4] p-2.5">
        <p className="text-xs font-semibold text-[#15803D]">{donation.foodName} — Accepted</p>
        <p className="mt-0.5 text-[10px] text-[#64748B]">Volunteer coordination started.</p>
      </li>
    );
  }

  if (donation.status === "declined") {
    return (
      <li className="rounded-[16px] border border-red-100 bg-red-50 p-2.5">
        <p className="text-xs font-semibold text-red-700">{donation.foodName} — Declined</p>
        <p className="mt-0.5 text-[10px] text-red-600">{donation.declineReason}</p>
      </li>
    );
  }

  return (
    <li className="rounded-[16px] border border-[#E5E7EB] bg-white p-2.5 transition-shadow duration-300 hover:shadow-sm">
      <div className="flex gap-2.5">
        {foodImage ? (
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[10px] bg-[#F8FAFC] sm:h-[72px] sm:w-[72px]">
            <img src={foodImage} alt={donation.foodName} className="h-full w-full object-cover" />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-[#94A3B8]">
            {donation.id}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xs font-bold text-[#0F172A] sm:text-sm">{donation.foodName}</h3>
            <EventTypeBadge eventType={donation.eventType} />
          </div>
          <p className={`mt-0.5 ${NGO_SECTION_TEXT}`}>{donation.event}</p>
          <DonationItemsList record={donation} className="mt-1" maxItems={3} />
          <p className="mt-0.5 flex items-start gap-1 text-[10px] text-[#64748B]">
            <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
            {donation.eventLocation}
          </p>

          <div className="mt-2 grid grid-cols-3 gap-x-2 gap-y-1.5 sm:grid-cols-6">
            <DetailItem label="Quantity" value={donation.quantity} />
            <DetailItem label="Pickup" value={donation.pickup} />
            <DetailItem label="Est. Meals" value={`~${donation.estimatedMeals}`} />
            <DetailItem label="Time Left" value={donation.timeRemaining} />
            <DetailItem label="Donor" value={donation.donor} />
            <DetailItem
              label="Verified"
              value={donation.verifiedDonor ? "Yes" : "Pending"}
            />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#F1F5F9] pt-2">
            {donation.verifiedDonor ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#16A34A]">
                <FaCheckCircle aria-hidden="true" />
                Verified donor
              </span>
            ) : (
              <span className="text-[10px] text-[#94A3B8]">Pending verification</span>
            )}
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => onAccept(donation)}
                className="rounded-[10px] border-2 border-[#16A34A] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#15803D] hover:bg-[#F0FDF4] sm:text-xs"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => onDecline(donation)}
                className="rounded-[10px] border-2 border-red-400 bg-white px-2.5 py-1 text-[10px] font-semibold text-red-600 hover:bg-red-50 sm:text-xs"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function NGOOverviewIncomingPanel() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [declineTarget, setDeclineTarget] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const items = await fetchIncomingDonations();
        if (!mounted) return;
        setDonations(
          items.slice(0, 5).map((item) => ({
            ...item,
            status: item.status === "pending_ngo_acceptance" ? "pending" : item.status,
            eventLocation: item.pickupLocation || item.pickupAddress,
            pickup: item.pickupTime || "TBD",
            estimatedMeals: item.estimatedServings || item.estimatedMeals,
            donor: item.donorName || "Donor",
            verifiedDonor: item.status !== "pending_review",
          })),
        );
      } catch (error) {
        if (mounted) toast.error(getApiErrorMessage(error));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const pendingCount = useMemo(
    () => donations.filter((item) => item.status === "pending").length,
    [donations],
  );

  const handleAccept = async (donation) => {
    try {
      await acceptDonation(donation.mongoId || donation.id);
      setDonations((prev) =>
        prev.map((item) =>
          item.id === donation.id ? { ...item, status: "accepted" } : item,
        ),
      );
      toast.success("Donation accepted.");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const handleDeclineConfirm = async (rowId, payload) => {
    const target = declineTarget || donations.find((d) => d.id === rowId);
    if (!target) return;

    try {
      await rejectDonation(target.mongoId || target.id, payload.reason || payload.notes);
      setDonations((prev) =>
        prev.map((item) =>
          item.id === target.id
            ? { ...item, status: "declined", declineReason: payload.reason }
            : item,
        ),
      );
      toast.success("Donation declined.");
      setDeclineTarget(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };
  return (
    <section className={NGO_SECTION_CLASS}>
      <NGOSectionHeader
        title="Incoming Donations"
        badge={pendingCount}
        actionTo={DASHBOARD_ROUTES.ngoIncoming}
        actionLabel="View all"
      />

      <ul className="mt-3 flex flex-col gap-2">
        {loading ? (
          <li className="text-sm text-[#64748B]">Loading incoming donations…</li>
        ) : donations.length === 0 ? (
          <li className="text-sm text-[#64748B]">No incoming donations right now.</li>
        ) : (
          donations.map((donation) => (
            <IncomingDonationRow
              key={donation.id}
              donation={donation}
              onAccept={handleAccept}
              onDecline={setDeclineTarget}
            />
          ))
        )}
      </ul>

      {declineTarget ? (
        <DeclineDonationModal
          donation={{
            id: declineTarget.id,
            foodName: declineTarget.foodName,
            donorName: declineTarget.donor,
          }}
          onClose={() => setDeclineTarget(null)}
          onConfirm={(_id, payload) => handleDeclineConfirm(declineTarget.id, payload)}
        />
      ) : null}
    </section>
  );
}
