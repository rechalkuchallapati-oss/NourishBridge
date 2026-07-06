import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import DeclineDonationModal from "./DeclineDonationModal";
import { getDonationFoodImage } from "../../data/donationFoodAssets";
import { OVERVIEW_INCOMING_DONATIONS } from "../../data/ngoDashboard";
import { DASHBOARD_ROUTES } from "../../constants/routes";

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8] sm:text-xs">
        {label}
      </p>
      <p className="mt-0.5 text-xs font-medium text-[#0F172A] sm:text-sm">{value}</p>
    </div>
  );
}

function IncomingDonationRow({ donation, onAccept, onDecline }) {
  const foodImage = getDonationFoodImage({ id: donation.donationId });

  if (donation.status === "accepted") {
    return (
      <li className="rounded-none border border-[#DCFCE7] bg-[#F0FDF4] p-[0.5cm]">
        <p className="text-sm font-semibold text-[#15803D]">
          {donation.foodName} — Accepted
        </p>
        <p className="mt-1 text-xs text-[#64748B]">Volunteer coordination started.</p>
      </li>
    );
  }

  if (donation.status === "declined") {
    return (
      <li className="rounded-none border border-red-100 bg-red-50 p-[0.5cm]">
        <p className="text-sm font-semibold text-red-700">
          {donation.foodName} — Declined
        </p>
        <p className="mt-1 text-xs text-red-600">{donation.declineReason}</p>
      </li>
    );
  }

  return (
    <li className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex flex-col gap-[0.5cm] lg:flex-row">
        {foodImage ? (
          <div className="h-28 w-full shrink-0 overflow-hidden bg-[#F8FAFC] sm:h-32 sm:w-36 lg:h-auto lg:w-32">
            <img
              src={foodImage}
              alt={donation.foodName}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-[0.5cm]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              {donation.id}
            </p>
            <h3 className="text-base font-bold text-[#0F172A] sm:text-lg">
              {donation.foodName}
            </h3>
            <p className="mt-[0.3cm] text-xs text-[#64748B] sm:text-sm">{donation.event}</p>
            <p className="mt-1 flex items-start gap-1 text-xs text-[#64748B] sm:text-sm">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
              {donation.eventLocation}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-3 lg:grid-cols-6">
            <DetailItem label="Quantity" value={donation.quantity} />
            <DetailItem label="Pickup" value={donation.pickup} />
            <DetailItem label="Est. Meals" value={`~${donation.estimatedMeals}`} />
            <DetailItem label="Time Left" value={donation.timeRemaining} />
            <DetailItem label="Donor" value={donation.donor} />
            <DetailItem
              label="Verified"
              value={donation.verifiedDonor ? "Verified donor" : "Unverified"}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-[0.5cm] border-t border-[#F1F5F9] pt-[0.5cm]">
            {donation.verifiedDonor ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                <FaCheckCircle aria-hidden="true" />
                Verified donor
              </span>
            ) : (
              <span className="text-xs text-[#94A3B8]">Pending donor verification</span>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onAccept(donation.id)}
                className="rounded-none border-2 border-[#16A34A] bg-white px-4 py-2 text-xs font-semibold text-[#15803D] transition-colors duration-300 hover:bg-[#F0FDF4] sm:text-sm"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => onDecline(donation)}
                className="rounded-none border-2 border-red-400 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition-colors duration-300 hover:bg-red-50 sm:text-sm"
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
  const [donations, setDonations] = useState(
    OVERVIEW_INCOMING_DONATIONS.map((item) => ({ ...item, status: "pending" })),
  );
  const [declineTarget, setDeclineTarget] = useState(null);

  const pendingCount = useMemo(
    () => donations.filter((item) => item.status === "pending").length,
    [donations],
  );

  const handleAccept = (id) => {
    setDonations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "accepted" } : item)),
    );
    toast.success("Donation accepted.");
  };

  const handleDeclineConfirm = (rowId, payload) => {
    setDonations((prev) =>
      prev.map((item) =>
        item.id === rowId
          ? { ...item, status: "declined", declineReason: payload.reason }
          : item,
      ),
    );
    setDeclineTarget(null);
  };

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-[0.5cm]">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Incoming Donations</h2>
          <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#16A34A] px-2 text-xs font-bold text-white">
            {pendingCount}
          </span>
        </div>
        <Link
          to={DASHBOARD_ROUTES.ngoIncoming}
          className="text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
        >
          View all
        </Link>
      </div>

      <ul className="mt-[0.5cm] flex flex-col gap-[0.5cm]">
        {donations.map((donation) => (
          <IncomingDonationRow
            key={donation.id}
            donation={donation}
            onAccept={handleAccept}
            onDecline={setDeclineTarget}
          />
        ))}
      </ul>

      {declineTarget ? (
        <DeclineDonationModal
          donation={{
            id: declineTarget.donationId,
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
