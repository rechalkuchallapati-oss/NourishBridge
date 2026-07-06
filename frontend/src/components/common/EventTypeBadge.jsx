import { EVENT_TYPES } from "../../data/shared/donationItems";

const EVENT_BADGE_STYLES = {
  wedding: "bg-[#FDF2F8] text-[#BE185D] border-[#FBCFE8]",
  restaurant: "bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]",
  corporate: "bg-[#EFF6FF] text-[#1D4ED8] border-[#DBEAFE]",
  party: "bg-[#F5F3FF] text-[#6D28D9] border-[#EDE9FE]",
  festival: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
  ramzan: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
  christmas: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
  individual: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
  hotel: "bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]",
  catering: "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]",
};

export default function EventTypeBadge({ eventType, className = "" }) {
  if (!eventType || !EVENT_TYPES[eventType]) return null;
  const style = EVENT_BADGE_STYLES[eventType] ?? EVENT_BADGE_STYLES.individual;

  return (
    <span
      className={`inline-flex rounded-none border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style} ${className}`}
    >
      {EVENT_TYPES[eventType]}
    </span>
  );
}
