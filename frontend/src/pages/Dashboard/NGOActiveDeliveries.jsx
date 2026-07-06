import { motion } from "framer-motion";
import { FaPhone, FaTruck, FaMapMarkerAlt, FaHeadset } from "react-icons/fa";
import DeliveryStatusTimeline from "../../components/ngo/DeliveryStatusTimeline";
import NGOPageHeader from "../../components/ngo/NGOPageHeader";
import NGOLayout from "../../components/dashboard/NGOLayout";
import { getDonationFoodImage } from "../../data/donationFoodAssets";
import {
  ACTIVE_DELIVERIES,
  DELIVERY_PIPELINE_STEPS,
  DELIVERY_STATUS_BADGE,
} from "../../data/ngoActiveDeliveries";
import { getNgoDisplayName, getSessionUser } from "../../utils/authStorage";

const EASE = [0.22, 1, 0.36, 1];

function ActiveDeliveryCard({ delivery }) {
  const foodImage = getDonationFoodImage({ id: delivery.donationId });
  const statusLabel =
    DELIVERY_PIPELINE_STEPS.find((step) => step.id === delivery.currentStatus)?.label ??
    delivery.currentStatus;

  return (
    <article className="overflow-hidden rounded-none border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex flex-col xl:flex-row">
        {foodImage ? (
          <div className="h-44 w-full shrink-0 overflow-hidden bg-[#F8FAFC] xl:h-auto xl:w-52">
            <img src={foodImage} alt={delivery.foodName} className="h-full w-full object-cover" />
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-[0.5cm] p-[0.5cm] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-[0.5cm]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                {delivery.id} · {delivery.donationId}
              </p>
              <h3 className="text-xl font-bold text-[#0F172A]">{delivery.foodName}</h3>
              <p className="text-sm text-[#64748B]">
                {delivery.donorName} · {delivery.quantity}
              </p>
            </div>
            <span
              className={`inline-flex rounded-none px-3 py-1.5 text-xs font-semibold ${DELIVERY_STATUS_BADGE[delivery.currentStatus] ?? DELIVERY_STATUS_BADGE.accepted}`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="grid gap-[0.5cm] lg:grid-cols-2">
            <div className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                Volunteer
              </p>
              <p className="mt-[0.3cm] font-semibold text-[#0F172A]">{delivery.volunteer.name}</p>
              <p className="text-sm text-[#64748B]">{delivery.volunteer.vehicle}</p>
              <a
                href={`tel:${delivery.volunteer.phone.replace(/\s/g, "")}`}
                className="mt-[0.3cm] inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]"
              >
                <FaPhone aria-hidden="true" />
                {delivery.volunteer.phone}
              </a>
            </div>

            <div className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                ETA & Location
              </p>
              <p className="mt-[0.3cm] font-semibold text-[#0F172A]">{delivery.eta}</p>
              <p className="mt-[0.3cm] flex items-start gap-2 text-sm text-[#64748B]">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#2563EB]" aria-hidden="true" />
                {delivery.lastLocationUpdate}
              </p>
              {delivery.simulatedLocation ? (
                <p className="mt-[0.3cm] text-xs text-[#94A3B8]">
                  Simulated GPS: {delivery.simulatedLocation.label}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-[0.5cm] lg:grid-cols-[1fr_auto]">
            <div className="rounded-none border border-[#E5E7EB] p-[0.5cm]">
              <p className="mb-[0.5cm] text-sm font-semibold text-[#0F172A]">Status progression</p>
              <DeliveryStatusTimeline
                currentStatus={delivery.currentStatus}
                timeline={delivery.timeline}
              />
            </div>

            <div className="flex flex-col gap-[0.5cm] rounded-none border border-[#E5E7EB] bg-[#EFF6FF] p-[0.5cm]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
                Escalation
              </p>
              <p className="text-sm font-semibold text-[#0F172A]">
                {delivery.escalation.coordinator}
              </p>
              <a
                href={`tel:${delivery.escalation.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]"
              >
                <FaHeadset aria-hidden="true" />
                {delivery.escalation.phone}
              </a>
              <button
                type="button"
                className="mt-auto rounded-none border border-[#2563EB] bg-white px-4 py-2 text-sm font-semibold text-[#2563EB] hover:bg-[#DBEAFE]"
              >
                Contact coordinator
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function NGOActiveDeliveries() {
  const user = getSessionUser();
  const orgName = getNgoDisplayName(user);

  return (
    <NGOLayout organizationName={orgName} unreadNotifications={5}>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-col gap-[0.5cm] p-[0.5cm] sm:p-6">
          <NGOPageHeader
            icon={FaTruck}
            title="Active Deliveries"
            description="Track accepted food in the logistics pipeline. Location updates are simulated for this demo — real GPS can be integrated later."
            actions={
              <span className="text-sm font-semibold text-[#64748B]">
                {ACTIVE_DELIVERIES.length} in pipeline
              </span>
            }
          />

          <div className="flex flex-col gap-[0.5cm]">
            {ACTIVE_DELIVERIES.map((delivery, index) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index, ease: EASE }}
              >
                <ActiveDeliveryCard delivery={delivery} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </NGOLayout>
  );
}
