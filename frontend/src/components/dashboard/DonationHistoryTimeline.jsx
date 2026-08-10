import { getStatusLabel } from "../../constants/donationStatus";

const STATUS_COLORS = {
  pending: "border-[#CBD5E1] bg-[#F8FAFC]",
  verified: "border-[#BAE6FD] bg-[#F0F9FF]",
  ngo_accepted: "border-[#BFDBFE] bg-[#EFF6FF]",
  volunteer_assigned: "border-[#C7D2FE] bg-[#EEF2FF]",
  pickup_scheduled: "border-[#DDD6FE] bg-[#F5F3FF]",
  picked_up: "border-[#FDE68A] bg-[#FFFBEB]",
  in_transit: "border-[#FED7AA] bg-[#FFF7ED]",
  delivered: "border-[#BBF7D0] bg-[#F0FDF4]",
  completed: "border-[#86EFAC] bg-[#DCFCE7]",
  rejected: "border-[#FECACA] bg-[#FEF2F2]",
  cancelled: "border-[#E2E8F0] bg-[#F1F5F9]",
  expired: "border-[#FDE68A] bg-[#FFFBEB]",
};

export default function DonationHistoryTimeline({ history = [] }) {
  if (!history.length) {
    return (
      <p className="text-sm text-[#64748B]">No status history recorded yet.</p>
    );
  }

  return (
    <ol className="relative flex flex-col gap-4 border-l-2 border-[#E2E8F0] pl-6">
      {history.map((entry, index) => (
        <li key={entry.id || index} className="relative">
          <span
            className={`absolute -left-[31px] top-1 flex h-4 w-4 rounded-full border-2 border-white ${STATUS_COLORS[entry.toStatus]?.split(" ")[1] ?? "bg-[#CBD5E1]"}`}
            aria-hidden="true"
          />
          <div
            className={`rounded-[12px] border p-4 ${STATUS_COLORS[entry.toStatus] ?? STATUS_COLORS.pending}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-[#0F172A]">
                {entry.fromStatus
                  ? `${getStatusLabel(entry.fromStatus)} → ${getStatusLabel(entry.toStatus)}`
                  : getStatusLabel(entry.toStatus)}
              </p>
              <time className="text-xs text-[#64748B]">{entry.dateLabel}</time>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">
              {entry.actorName} · {entry.actorRole}
            </p>
            {entry.notes ? (
              <p className="mt-2 text-sm text-[#475569]">{entry.notes}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
