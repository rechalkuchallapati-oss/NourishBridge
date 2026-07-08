import { getDonationFoodImage } from "../../data/donationFoodAssets";
import {
  INVENTORY_STATUS_COLORS,
  INVENTORY_STATUS_LABELS,
} from "../../data/ngoInventory";
import EventTypeBadge from "../common/EventTypeBadge";
import NGODetailsDrawer from "./NGODetailsDrawer";

function DetailBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#0F172A]">{value}</p>
    </div>
  );
}

export default function InventoryBatchDrawer({ batch, onClose }) {
  if (!batch) return null;

  const foodImage = getDonationFoodImage(batch);

  return (
    <NGODetailsDrawer
      open={Boolean(batch)}
      title={`Batch ${batch.id}`}
      onClose={onClose}
    >
      <div className="flex flex-col gap-[0.5cm]">
        {foodImage ? (
          <img src={foodImage} alt={batch.foodItem} className="h-44 w-full object-cover" />
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <EventTypeBadge eventType={batch.eventType} />
          <span
            className={`inline-flex rounded-none px-2.5 py-1 text-xs font-semibold ${INVENTORY_STATUS_COLORS[batch.status]}`}
          >
            {INVENTORY_STATUS_LABELS[batch.status]}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailBlock label="Food Item" value={batch.foodItem} />
          <DetailBlock label="Quantity" value={batch.quantity} />
          <DetailBlock label="Donor" value={batch.donor} />
          <DetailBlock label="Volunteer" value={batch.volunteer} />
          <DetailBlock label="Preparation Time" value={batch.preparationTime} />
          <DetailBlock label="Expiry Time" value={batch.expiryTime} />
          <DetailBlock label="Current Location" value={batch.currentLocation} />
          <DetailBlock label="Assigned Distribution Batch" value={batch.assignedDistributionBatch} />
          <DetailBlock label="Quality Status" value={batch.qualityStatus} />
        </div>

        <section className="rounded-none border border-[#DBEAFE] bg-[#EFF6FF] p-[0.5cm]">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
            Storage Instructions
          </p>
          <p className="mt-1 text-sm text-[#334155]">{batch.storageInstructions}</p>
        </section>

        {batch.history?.length ? (
          <section>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Batch History
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {batch.history.map((entry) => (
                <li
                  key={entry.time + entry.action}
                  className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm"
                >
                  <p className="font-semibold text-[#0F172A]">{entry.action}</p>
                  <p className="text-xs text-[#64748B]">{entry.time}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </NGODetailsDrawer>
  );
}
