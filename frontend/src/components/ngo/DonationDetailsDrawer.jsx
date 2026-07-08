import { FaMapMarkerAlt, FaPhone, FaTruck } from "react-icons/fa";
import { getDonationFoodImage } from "../../data/donationFoodAssets";
import {
  DONATION_STATUS_COLORS,
  DONATION_TABLE_STATUS_LABELS,
} from "../../data/ngoIncomingDonations";
import EventTypeBadge from "../common/EventTypeBadge";
import NGODetailsDrawer from "./NGODetailsDrawer";
import DonationStatusTimeline from "./DonationStatusTimeline";

function DetailBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#0F172A]">{value}</p>
    </div>
  );
}

export default function DonationDetailsDrawer({
  donation,
  onClose,
  onAccept,
  onReject,
  canAccept,
  canReject,
}) {
  if (!donation) return null;

  const foodImage = getDonationFoodImage(donation);
  const showActions = canAccept || canReject;

  return (
    <NGODetailsDrawer
      open={Boolean(donation)}
      title={`Donation ${donation.id}`}
      onClose={onClose}
      footer={
        showActions ? (
          <div className="flex flex-col gap-2">
            {donation.donorPhone ? (
              <a
                href={`tel:${donation.donorPhone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-[#EFF6FF]"
              >
                <FaPhone aria-hidden="true" />
                Contact Donor
              </a>
            ) : null}
            <div className="flex gap-2">
              {canAccept ? (
                <button
                  type="button"
                  onClick={() => onAccept(donation)}
                  className="flex-1 rounded-none bg-[#16A34A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#15803D]"
                >
                  Accept Donation
                </button>
              ) : null}
              {canReject ? (
                <button
                  type="button"
                  onClick={() => onReject(donation)}
                  className="flex-1 rounded-none border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Reject Donation
                </button>
              ) : null}
            </div>
          </div>
        ) : null
      }
    >
      <div className="flex flex-col gap-[0.5cm]">
        {foodImage ? (
          <img
            src={foodImage}
            alt={donation.foodItem}
            className="h-44 w-full object-cover"
          />
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <EventTypeBadge eventType={donation.eventType} />
          <span
            className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${DONATION_STATUS_COLORS[donation.status]}`}
          >
            {DONATION_TABLE_STATUS_LABELS[donation.status]}
          </span>
        </div>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
            Donor Information
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <DetailBlock label="Donor" value={donation.donor} />
            <DetailBlock label="Type" value={donation.donorType} />
            <DetailBlock label="Phone" value={donation.donorPhone ?? "—"} />
            <DetailBlock label="Distance" value={`${donation.distanceKm} km`} />
          </div>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
            Food Details
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <DetailBlock label="Food Item" value={donation.foodItem} />
            <DetailBlock label="Quantity" value={donation.quantity} />
            <DetailBlock label="Preparation Time" value={donation.preparationTime} />
            <DetailBlock label="Expiry Window" value={donation.expiryWindow} />
            <DetailBlock label="Est. Servings" value={`~${donation.estimatedServings}`} />
            <DetailBlock label="Allergens" value={donation.allergens.join(", ")} />
          </div>
        </section>

        {donation.volunteer && donation.volunteer !== "—" ? (
          <section className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
              Volunteer Details
            </p>
            <p className="mt-2 font-semibold text-[#0F172A]">{donation.volunteer}</p>
            {donation.volunteerVehicle ? (
              <p className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
                <FaTruck aria-hidden="true" />
                {donation.volunteerVehicle}
              </p>
            ) : null}
            {donation.volunteerPhone ? (
              <a
                href={`tel:${donation.volunteerPhone.replace(/\s/g, "")}`}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]"
              >
                <FaPhone aria-hidden="true" />
                {donation.volunteerPhone}
              </a>
            ) : null}
          </section>
        ) : (
          <section className="rounded-none border border-dashed border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm]">
            <p className="text-sm font-semibold text-[#64748B]">Volunteer Assignment</p>
            <p className="mt-1 text-sm text-[#94A3B8]">
              No volunteer assigned yet. Accept donation to begin coordination.
            </p>
          </section>
        )}

        {donation.liveTracking ? (
          <section className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] p-[0.5cm]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
              Live Tracking
            </p>
            <p className="mt-2 flex items-start gap-2 font-semibold text-[#0F172A]">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
              {donation.liveTracking.label}
            </p>
            <p className="mt-1 text-xs text-[#64748B]">
              ETA {donation.eta} · Updated {donation.liveTracking.updatedAt}
            </p>
          </section>
        ) : null}

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
            Live Status Timeline
          </p>
          <div className="mt-3 rounded-none border border-[#E5E7EB] p-[0.5cm]">
            <DonationStatusTimeline
              currentStatus={donation.status}
              timeline={donation.timeline}
            />
          </div>
        </section>

        <DetailBlock label="Pickup Location" value={donation.pickupLocation} />
      </div>
    </NGODetailsDrawer>
  );
}
