import { QrCode } from "lucide-react";
import { ADMIN_PRIMARY_BTN, ADMIN_SECONDARY_BTN } from "../adminStyles";
import { CATEGORY_LABELS, STATUS_COLORS, STATUS_LABELS, STORAGE_LABELS } from "../../../data/adminInventory";

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#F1F5F9] py-2.5 last:border-0">
      <span className="text-xs font-medium text-[#64748B]">{label}</span>
      <span className="text-right text-xs font-semibold text-[#0F172A]">{value}</span>
    </div>
  );
}

export default function InventoryBatchDetails({ batch, onAction }) {
  if (!batch) {
    return (
      <aside className="sticky top-6 rounded-[18px] border border-[#E8ECF0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
        <h3 className="text-base font-bold text-[#0F172A]">Batch Details</h3>
        <p className="mt-4 text-sm text-[#64748B]">Select a batch from the table to view full details.</p>
      </aside>
    );
  }

  return (
    <aside className="sticky top-6 rounded-[18px] border border-[#E8ECF0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_8px_28px_rgba(34,197,94,0.1)]">
      <div className="overflow-hidden rounded-t-[18px]">
        <img src={batch.image} alt={batch.foodItem} className="h-40 w-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Batch Details</h3>
            <p className="mt-0.5 text-xs font-semibold text-[#16A34A]">{batch.id}</p>
          </div>
          <span className={`inline-flex border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[batch.status]}`}>
            {STATUS_LABELS[batch.status]}
          </span>
        </div>

        <p className="mt-3 text-lg font-bold text-[#0F172A]">{batch.foodItem}</p>

        <div className="mt-4 space-y-0">
          <DetailRow label="Category" value={CATEGORY_LABELS[batch.category]} />
          <DetailRow label="Quantity" value={batch.quantity} />
          <DetailRow label="Estimated Meals" value={batch.meals.toLocaleString()} />
          <DetailRow label="Storage Type" value={STORAGE_LABELS[batch.storage]} />
          <DetailRow label="Received Date" value={batch.receivedDate} />
          <DetailRow label="Expiry Date" value={batch.expiryDate} />
          <DetailRow label="Donor" value={batch.donor} />
          <DetailRow label="Assigned NGO" value={batch.ngo} />
          <DetailRow label="Assigned Volunteer" value={batch.volunteer} />
          <DetailRow label="Storage Temperature" value={batch.temperature} />
          <DetailRow label="Quality Status" value={batch.quality} />
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-[12px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-3">
          <QrCode size={32} className="text-[#64748B]" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold text-[#0F172A]">Batch Code</p>
            <p className="font-mono text-xs text-[#64748B]">{batch.batchCode}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button type="button" onClick={() => onAction("edit", batch)} className={`${ADMIN_PRIMARY_BTN} w-full justify-center`}>
            Edit Batch
          </button>
          <button type="button" onClick={() => onAction("transfer", batch)} className={`${ADMIN_SECONDARY_BTN} w-full justify-center`}>
            Transfer
          </button>
          <button
            type="button"
            onClick={() => onAction("discard", batch)}
            className="inline-flex h-[42px] w-full items-center justify-center gap-2 border border-[#FECACA] bg-[#FEF2F2] text-sm font-semibold text-red-600 transition-all hover:bg-red-100"
          >
            Discard Batch
          </button>
        </div>
      </div>
    </aside>
  );
}
