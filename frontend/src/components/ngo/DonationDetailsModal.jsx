import { getDonationFoodImage } from "../../data/donationFoodAssets";
import DonationItemsList from "../common/DonationItemsList";
import EventTypeBadge from "../common/EventTypeBadge";
import NGOModal from "./NGOModal";

export default function DonationDetailsModal({ donation, onClose, onAccept, onDecline }) {
  const foodImage = getDonationFoodImage(donation);

  return (
    <NGOModal title={`Donation ${donation.id}`} onClose={onClose} wide>
      <div className="flex flex-col gap-[0.5cm]">
        {foodImage ? (
          <img
            src={foodImage}
            alt={donation.foodName}
            className="h-48 w-full object-cover sm:h-56"
          />
        ) : null}

        <div className="grid gap-[0.5cm] sm:grid-cols-2">
          <DetailRow label="Donor / Organization" value={donation.donorName} />
          <DetailRow label="Donor Type" value={donation.donorType} />
          {donation.eventName ? (
            <DetailRow label="Event" value={donation.eventName} span />
          ) : null}
          <DetailRow
            label="Event Type"
            value={<EventTypeBadge eventType={donation.eventType} className="text-xs" />}
          />
          <DetailRow label="Food Category" value={donation.foodCategory} />
          <DetailRow label="Donation Summary" value={donation.foodName} />
          <DetailRow
            label="Items Donated"
            value={<DonationItemsList record={donation} />}
            span
          />
          <DetailRow label="Quantity Summary" value={donation.quantity} />
          <DetailRow label="Estimated Servings" value={`~${donation.estimatedServings}`} />
          <DetailRow label="Preparation Time" value={donation.preparationTime} />
          <DetailRow label="Safe Consumption Deadline" value={donation.safeConsumptionDeadline} />
          <DetailRow label="Pickup Location" value={donation.pickupLocation} span />
          <DetailRow label="Distance from NGO" value={`${donation.distanceKm} km`} />
          <DetailRow label="Allergen Information" value={donation.allergens.join(", ")} />
          <DetailRow label="Storage Requirements" value={donation.storageRequirements} span />
          <DetailRow label="Volunteer Status" value={donation.volunteerStatus} />
          <DetailRow label="Submitted" value={donation.submittedAt} />
        </div>

        <div className="flex flex-wrap gap-[0.5cm] border-t border-[#E5E7EB] pt-[0.5cm]">
          <button
            type="button"
            onClick={() => {
              onAccept(donation);
              onClose();
            }}
            className="rounded-none bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1D4ED8]"
          >
            Accept Donation
          </button>
          <button
            type="button"
            onClick={() => {
              onDecline(donation);
              onClose();
            }}
            className="rounded-none border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Decline
          </button>
        </div>
      </div>
    </NGOModal>
  );
}

function DetailRow({ label, value, span = false }) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-[0.3cm] text-sm font-medium leading-6 text-[#0F172A] sm:text-base">
        {value}
      </p>
    </div>
  );
}
