import { getDonationFoodImage } from "../../data/donationFoodAssets";
import {
  DISTRIBUTION_STATUS_COLORS,
  DISTRIBUTION_STATUS_LABELS,
} from "../../data/ngoDistributionQueue";
import EventTypeBadge from "../common/EventTypeBadge";
import DistributionStatusTimeline from "./DistributionStatusTimeline";
import NGODetailsDrawer from "./NGODetailsDrawer";

function DetailBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#0F172A]">{value}</p>
    </div>
  );
}

export default function DistributionBatchDrawer({ batch, onClose, onSubmitProof }) {
  if (!batch) return null;

  const foodImage = getDonationFoodImage(batch);
  const showProofForm = ["serving", "completed"].includes(batch.status);

  return (
    <NGODetailsDrawer
      open={Boolean(batch)}
      title={`Batch ${batch.id}`}
      onClose={onClose}
      footer={
        showProofForm ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitProof(batch.id, {
                beneficiaryCount: e.target.beneficiaryCount.value,
                notes: e.target.notes.value,
                completionTime: e.target.completionTime.value,
              });
            }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[#7C3AED]">
              Distribution Proof
            </p>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#64748B]">Upload Distribution Photos</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="rounded-none border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#64748B]">Beneficiary Count</span>
              <input
                name="beneficiaryCount"
                type="number"
                min={1}
                defaultValue={batch.beneficiaryCount ?? ""}
                required
                placeholder="e.g. 120"
                className="rounded-none border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#64748B]">Notes</span>
              <textarea
                name="notes"
                rows={2}
                defaultValue={batch.proofNotes ?? ""}
                placeholder="Distribution notes..."
                className="rounded-none border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#64748B]">Completion Time</span>
              <input
                name="completionTime"
                type="text"
                defaultValue={batch.completionTime ?? ""}
                placeholder="e.g. Today, 5:30 PM"
                className="rounded-none border border-[#E5E7EB] bg-white px-3 py-2 text-sm"
              />
            </label>
            <button
              type="submit"
              className="rounded-none bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6D28D9]"
            >
              Save Proof
            </button>
          </form>
        ) : null
      }
    >
      <div className="flex flex-col gap-[0.5cm]">
        {foodImage ? (
          <img src={foodImage} alt={batch.food} className="h-40 w-full object-cover" />
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <EventTypeBadge eventType={batch.eventType} />
          <span
            className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${DISTRIBUTION_STATUS_COLORS[batch.status]}`}
          >
            {DISTRIBUTION_STATUS_LABELS[batch.status]}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailBlock label="Food" value={batch.food} />
          <DetailBlock label="Meals" value={`${batch.meals} meals`} />
          <DetailBlock label="Destination" value={batch.destination} />
          <DetailBlock label="Distribution Time" value={batch.distributionTime} />
          <DetailBlock label="Prepared Time" value={batch.preparedTime} />
          <DetailBlock label="Distribution Deadline" value={batch.distributionDeadline} />
          <DetailBlock label="Remaining Quantity" value={batch.remainingQuantity} />
          <DetailBlock label="Volunteer" value={batch.volunteer} />
        </div>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#7C3AED]">
            Distribution Status
          </p>
          <div className="mt-3 rounded-none border border-[#E5E7EB] p-[0.5cm]">
            <DistributionStatusTimeline
              currentStatus={batch.status}
              timeline={batch.timeline}
            />
          </div>
        </section>
      </div>
    </NGODetailsDrawer>
  );
}
