import { FaClock, FaMapMarkerAlt, FaTruck, FaUser, FaUtensils } from "react-icons/fa";
import {
  DONATION_TIMELINE_STEPS,
  getStatusLabel,
  getTimelineStepIndex,
} from "../../constants/donationStatus";
import { getDonationImage, getDonationImageAlt } from "../../data/donationFoodImages";
import DonationItemsList from "../common/DonationItemsList";
import EventTypeBadge from "../common/EventTypeBadge";
import {
  dashboardBadgeClass,
  dashboardBoxClass,
} from "./dashboardFormStyles";

const BOX_INSET = "pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm]";

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className={`rounded-none border border-[#E5E7EB] bg-[#F8FAFC] ${BOX_INSET}`}>
      <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[#94A3B8] sm:text-base">
        <Icon className="shrink-0 text-[#16A34A]" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-[0.5cm] text-base font-semibold leading-7 text-[#0F172A] sm:text-lg">
        {value}
      </p>
    </div>
  );
}

function DonationTimeline({ currentStatus }) {
  const currentIndex = getTimelineStepIndex(currentStatus);

  return (
    <div className="relative pl-[0.25cm]">
      <ol className="flex flex-col gap-[0.5cm]">
        {DONATION_TIMELINE_STEPS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === DONATION_TIMELINE_STEPS.length - 1;

          return (
            <li key={step.id} className="relative flex gap-[0.5cm]">
              {!isLast && (
                <span
                  className={[
                    "absolute left-[15px] top-8 h-[calc(100%+0.5cm)] w-0.5",
                    isComplete ? "bg-[#16A34A]" : "bg-[#E2E8F0]",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}

              <span
                className={[
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-none border-2 text-xs font-bold",
                  isComplete
                    ? "border-[#16A34A] bg-[#16A34A] text-white"
                    : isCurrent
                      ? "border-[#16A34A] bg-white text-[#16A34A] shadow-[0_0_0_4px_rgba(22,163,74,0.12)]"
                      : "border-[#E2E8F0] bg-white text-[#94A3B8]",
                ].join(" ")}
                aria-hidden="true"
              >
                {isComplete ? "✓" : index + 1}
              </span>

              <div className="min-w-0 flex-1 pt-0.5 pl-[0.25cm]">
                <p
                  className={[
                    "text-base font-semibold sm:text-lg",
                    isCurrent
                      ? "text-[#16A34A]"
                      : isComplete
                        ? "text-[#0F172A]"
                        : "text-[#94A3B8]",
                  ].join(" ")}
                >
                  {step.label}
                </p>
                {isCurrent ? (
                  <p className="mt-[0.5cm] text-sm leading-6 text-[#64748B] sm:text-base">
                    Current step — updates appear here in real time
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ActiveDonationCard({ donation }) {
  const statusLabel = getStatusLabel(donation.status);
  const foodImage = getDonationImage(donation);

  return (
    <article className={`${dashboardBoxClass} overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.05)]`}>
      <div
        className={
          foodImage
            ? "grid gap-[1cm] lg:grid-cols-[240px_minmax(0,1fr)] lg:items-stretch"
            : undefined
        }
      >
        {foodImage ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-[#F8FAFC] lg:aspect-auto lg:min-h-[240px]">
            <img
              src={foodImage}
              alt={getDonationImageAlt(donation)}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-[0.5cm] top-[0.5cm] rounded-none bg-[#0F172A]/75 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              Live photo
            </span>
          </div>
        ) : null}

        <div
          className={`flex flex-col gap-[0.5cm] border-b border-[#E5E7EB] bg-[#F8FAFC] ${BOX_INSET} sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="min-w-0 pl-[0.25cm]">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8] sm:text-base">
              Donation {donation.id}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="mt-[0.5cm] text-2xl font-bold leading-tight text-[#0F172A] sm:text-3xl">
                {donation.food ?? donation.foodType}
              </h3>
              <EventTypeBadge eventType={donation.eventType} className="mt-[0.5cm]" />
            </div>
            {donation.eventName ? (
              <p className="mt-1 text-sm font-medium text-[#64748B]">{donation.eventName}</p>
            ) : null}
            <p className="mt-[0.5cm] text-base leading-6 text-[#64748B] sm:text-lg">
              Posted {donation.postedAt}
            </p>
          </div>
          <span
            className={`${dashboardBadgeClass} inline-flex min-h-[72px] min-w-[120px] shrink-0 flex-col items-center justify-center self-start gap-[0.3cm] border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 pt-[0.3cm] text-center sm:min-w-[132px] sm:self-center`}
          >
            <FaTruck className="text-lg text-[#16A34A]" aria-hidden="true" />
            <span className="text-xs font-semibold leading-snug text-[#15803D] sm:text-sm">
              {statusLabel}
            </span>
          </span>
        </div>
      </div>

      <div
        className={`grid gap-[0.5cm] lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px] ${BOX_INSET}`}
      >
        <div className="grid gap-[0.5cm] sm:grid-cols-2">
          <div className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] pl-[0.5cm] pr-[0.5cm] pt-[0.5cm] pb-[0.5cm] sm:col-span-2">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[#94A3B8] sm:text-base">
              <FaUtensils className="shrink-0 text-[#16A34A]" aria-hidden="true" />
              Items Donated
            </div>
            <div className="mt-[0.5cm]">
              <DonationItemsList record={donation} />
            </div>
          </div>
          <DetailItem icon={FaUtensils} label="Quantity Summary" value={donation.quantity} />
          <DetailItem
            icon={FaUtensils}
            label="Estimated Meals"
            value={`~${donation.estimatedMeals} meals`}
          />
          <DetailItem icon={FaClock} label="Pickup Time" value={donation.pickupTime} />
          <DetailItem
            icon={FaMapMarkerAlt}
            label="Pickup Address"
            value={donation.pickupAddress}
          />
          <DetailItem icon={FaTruck} label="Matched NGO" value={donation.matchedNgo} />
          <DetailItem
            icon={FaUser}
            label="Assigned Volunteer"
            value={donation.volunteer}
          />
          <DetailItem icon={FaTruck} label="Current Status" value={statusLabel} />
        </div>

        <div className={`rounded-none border border-[#E5E7EB] bg-white ${BOX_INSET}`}>
          <h4 className="mb-[0.5cm] pl-[0.25cm] text-base font-bold uppercase tracking-wide text-[#64748B] sm:text-lg">
            Status Timeline
          </h4>
          <DonationTimeline currentStatus={donation.status} />
        </div>
      </div>
    </article>
  );
}

export default function ActiveDonationTracking({ donations, showSectionHeader = true }) {
  if (!donations.length) {
    return (
      <section
        className={`rounded-none border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-center ${BOX_INSET}`}
      >
        <p className="text-xl font-semibold text-[#0F172A] sm:text-2xl">No active donations</p>
        <p className="mt-[0.5cm] text-base leading-7 text-[#64748B] sm:text-lg">
          Create a donation to start tracking pickup and delivery progress.
        </p>
      </section>
    );
  }

  return (
    <section
      id="active-donations"
      className={`flex flex-col gap-[0.5cm] ${showSectionHeader ? BOX_INSET : ""}`}
    >
      {showSectionHeader ? (
        <div className="pl-[0.25cm]">
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#16A34A] sm:text-lg">
            Live Tracking
          </p>
          <h2 className="mt-[0.5cm] text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Active Donation Tracking
          </h2>
          <p className="mt-[0.5cm] max-w-3xl text-base leading-7 text-[#64748B] sm:text-lg">
            Follow each donation from posting to NGO confirmation with real-time
            status updates.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-[0.5cm]">
        {donations.map((donation) => (
          <ActiveDonationCard key={donation.id} donation={donation} />
        ))}
      </div>
    </section>
  );
}
