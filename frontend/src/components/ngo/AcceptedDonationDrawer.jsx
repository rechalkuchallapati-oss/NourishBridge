import { FaMapMarkerAlt, FaPhone, FaThermometerHalf, FaTruck } from "react-icons/fa";
import { getDonationFoodImage } from "../../data/donationFoodAssets";
import {
  ACCEPTED_STATUS_COLORS,
  ACCEPTED_STATUS_LABELS,
} from "../../data/ngoAcceptedDonations";
import EventTypeBadge from "../common/EventTypeBadge";
import AcceptedDonationTimeline from "./AcceptedDonationTimeline";
import NGODetailsDrawer from "./NGODetailsDrawer";

function DetailBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#0F172A]">{value}</p>
    </div>
  );
}

export default function AcceptedDonationDrawer({ donation, onClose }) {
  if (!donation) return null;

  const foodImage = getDonationFoodImage(donation);

  return (
    <NGODetailsDrawer
      open={Boolean(donation)}
      title={`Donation ${donation.id}`}
      onClose={onClose}
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
            className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${ACCEPTED_STATUS_COLORS[donation.status]}`}
          >
            {ACCEPTED_STATUS_LABELS[donation.status]}
          </span>
        </div>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">
            Food Details
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <DetailBlock label="Food Item" value={donation.foodItem} />
            <DetailBlock label="Quantity" value={donation.quantity} />
            <DetailBlock label="Preparation Time" value={donation.preparationTime} />
            <DetailBlock label="Shelf Life" value={donation.shelfLife} />
            <DetailBlock label="Temperature" value={donation.temperature} />
            <DetailBlock label="Estimated Meals" value={`~${donation.estimatedMeals}`} />
          </div>
        </section>

        {donation.specialInstructions ? (
          <section className="rounded-none border border-[#FEF3C7] bg-[#FFFBEB] p-[0.5cm]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#B45309]">
              Special Instructions
            </p>
            <p className="mt-1 text-sm text-[#78350F]">{donation.specialInstructions}</p>
          </section>
        ) : null}

        {donation.volunteer && donation.volunteer !== "—" ? (
          <section className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">
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
        ) : null}

        {donation.liveTracking ? (
          <section className="rounded-none border border-[#DCFCE7] bg-[#F0FDF4] p-[0.5cm]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">
              Live Tracking
            </p>
            <p className="mt-2 flex items-start gap-2 font-semibold text-[#0F172A]">
              <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#16A34A]" aria-hidden="true" />
              {donation.liveTracking.label}
            </p>
            <p className="mt-1 text-xs text-[#64748B]">
              ETA {donation.eta} · Updated {donation.liveTracking.updatedAt}
            </p>
          </section>
        ) : null}

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">
            Delivery Timeline
          </p>
          <div className="mt-3 rounded-none border border-[#E5E7EB] p-[0.5cm]">
            <AcceptedDonationTimeline
              currentStatus={donation.status}
              timeline={donation.timeline}
            />
          </div>
        </section>

        <div className="flex items-center gap-2 text-sm text-[#64748B]">
          <FaThermometerHalf aria-hidden="true" />
          Pickup: {donation.pickupLocation}
        </div>
      </div>
    </NGODetailsDrawer>
  );
}
