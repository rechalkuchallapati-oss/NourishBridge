import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const CARD_TINTS = {
  green: {
    card: "border-[#DCFCE7] bg-gradient-to-br from-[#F0FDF4] to-white",
    icon: "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
  },
  blue: {
    card: "border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white",
    icon: "border-[#BFDBFE] bg-[#DBEAFE] text-[#2563EB]",
  },
  purple: {
    card: "border-[#EDE9FE] bg-gradient-to-br from-[#F5F3FF] to-white",
    icon: "border-[#DDD6FE] bg-[#EDE9FE] text-[#7C3AED]",
  },
  amber: {
    card: "border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-white",
    icon: "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
  },
  slate: {
    card: "border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-white",
    icon: "border-[#E2E8F0] bg-[#F1F5F9] text-[#475569]",
  },
};

export default function AdminStatCardTrend({
  label,
  value,
  icon: Icon,
  accent = "green",
  trend = 0,
  trendLabel = "this month",
}) {
  const tint = CARD_TINTS[accent] ?? CARD_TINTS.green;
  const isUp = trend > 0;
  const isDown = trend < 0;

  return (
    <article
      className={[
        "rounded-none border p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(22,163,74,0.12)]",
        "active:scale-[0.99] active:shadow-[0_0_0_2px_rgba(22,163,74,0.2)]",
        tint.card,
      ].join(" ")}
    >
      {Icon ? (
        <span
          className={[
            "mb-3 inline-flex h-12 w-12 items-center justify-center rounded-none border",
            tint.icon,
          ].join(" ")}
        >
          <Icon className="text-xl" aria-hidden="true" />
        </span>
      ) : null}
      <p className="text-3xl font-bold tracking-tight text-[#0F172A]">{value}</p>
      <p className="mt-1 text-sm font-semibold text-[#334155]">{label}</p>
      <p
        className={[
          "mt-2 flex items-center gap-1 text-xs font-semibold",
          isUp ? "text-[#16A34A]" : isDown ? "text-red-600" : "text-[#64748B]",
        ].join(" ")}
      >
        {isUp ? <FaArrowUp aria-hidden="true" /> : null}
        {isDown ? <FaArrowDown aria-hidden="true" /> : null}
        {trend !== 0 ? `${Math.abs(trend)}%` : "0%"}
        <span className="font-normal text-[#94A3B8]">{trendLabel}</span>
      </p>
    </article>
  );
}
