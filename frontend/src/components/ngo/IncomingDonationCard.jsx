import {
  FaAllergies,
  FaClock,
  FaMapMarkerAlt,
  FaRoute,
  FaSnowflake,
  FaUser,
  FaUtensils,
  FaWeight,
} from "react-icons/fa";
import { getDonationFoodImage } from "../../data/donationFoodAssets";
import { getPackagingLabel } from "../../data/donationThumbnails";
import { URGENCY_COLORS } from "../../data/ngoIncomingDonations";
import DonationItemsList from "../common/DonationItemsList";
import EventTypeBadge from "../common/EventTypeBadge";

function DetailChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm]">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
        <Icon className="shrink-0 text-[#2563EB]" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-[0.3cm] text-sm font-semibold leading-6 text-[#0F172A] sm:text-base">
        {value}
      </p>
    </div>
  );
}

export default function IncomingDonationCard({ donation, onAccept, onDecline, onViewDetails }) {
  const foodImage = getDonationFoodImage(donation);
  const packagingLabel = getPackagingLabel(donation);

  return (
    <article className="overflow-hidden rounded-none border border-[#E5E7EB] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col lg:flex-row">
        {foodImage ? (
          <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#F8FAFC] lg:h-auto lg:w-56 xl:w-64">
            <img
              src={foodImage}
              alt={donation.foodName}
              className="h-full w-full object-cover"
            />
            <span
              className={`absolute left-3 top-3 rounded-none px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${URGENCY_COLORS[donation.urgency] ?? URGENCY_COLORS.medium}`}
            >
              {donation.urgency}
            </span>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-[0.5cm] p-[0.5cm] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
            <div className="flex min-w-0 flex-col gap-[0.3cm]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                {donation.id} · {donation.donorType}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold text-[#0F172A] sm:text-2xl">{donation.donorName}</h3>
                <EventTypeBadge eventType={donation.eventType} />
              </div>
              {donation.eventName ? (
                <p className="text-sm font-medium text-[#64748B]">{donation.eventName}</p>
              ) : null}
              <p className="text-base font-semibold text-[#2563EB]">{donation.foodName}</p>
              <DonationItemsList record={donation} className="mt-1" />
              {packagingLabel ? (
                <p className="mt-1 text-[11px] font-medium text-[#64748B]">{packagingLabel}</p>
              ) : null}
              <p className="text-sm text-[#64748B]">{donation.foodCategory}</p>
            </div>
            {!foodImage ? (
              <span
                className={`inline-flex shrink-0 rounded-none px-3 py-1.5 text-xs font-bold uppercase ${URGENCY_COLORS[donation.urgency] ?? URGENCY_COLORS.medium}`}
              >
                {donation.urgency}
              </span>
            ) : null}
          </div>

          <div className="grid gap-[0.5cm] sm:grid-cols-2 xl:grid-cols-3">
            <DetailChip icon={FaWeight} label="Quantity" value={donation.quantity} />
            <DetailChip
              icon={FaUtensils}
              label="Est. Servings"
              value={`~${donation.estimatedServings}`}
            />
            <DetailChip icon={FaClock} label="Prepared" value={donation.preparationTime} />
            <DetailChip
              icon={FaClock}
              label="Consume By"
              value={donation.safeConsumptionDeadline}
            />
            <DetailChip icon={FaMapMarkerAlt} label="Pickup" value={donation.pickupLocation} />
            <DetailChip
              icon={FaRoute}
              label="Distance"
              value={`${donation.distanceKm} km from NGO`}
            />
            <DetailChip
              icon={FaAllergies}
              label="Allergens"
              value={donation.allergens.join(", ")}
            />
            <DetailChip
              icon={FaSnowflake}
              label="Storage"
              value={donation.storageRequirements}
            />
            <DetailChip icon={FaUser} label="Volunteer" value={donation.volunteerStatus} />
          </div>

          <div className="flex flex-wrap gap-[0.5cm] border-t border-[#E5E7EB] pt-[0.5cm]">
            <button
              type="button"
              onClick={() => onAccept(donation)}
              className="flex-1 rounded-none bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] sm:flex-none sm:min-w-[140px]"
            >
              Accept Donation
            </button>
            <button
              type="button"
              onClick={() => onDecline(donation)}
              className="flex-1 rounded-none border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 sm:flex-none sm:min-w-[120px]"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => onViewDetails(donation)}
              className="flex-1 rounded-none border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-semibold text-[#64748B] transition-colors hover:border-[#2563EB]/30 hover:text-[#2563EB] sm:flex-none sm:min-w-[120px]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
