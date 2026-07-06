import {
  FaLeaf,
  FaTruck,
  FaUtensils,
  FaUsers,
} from "react-icons/fa";
import { OVERVIEW_IMPACT_THIS_MONTH } from "../../data/ngoDashboard";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { NGOSectionHeader, NGO_SECTION_CLASS } from "./NGOSectionLink";

const IMPACT_ITEMS = [
  {
    id: "meals",
    label: "Meals Distributed",
    value: OVERVIEW_IMPACT_THIS_MONTH.mealsDistributed,
    icon: FaUtensils,
    card: "border-[#DCFCE7] bg-gradient-to-br from-[#F0FDF4] to-white",
    iconBox: "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
  },
  {
    id: "people",
    label: "People Supported",
    value: OVERVIEW_IMPACT_THIS_MONTH.peopleSupported,
    icon: FaUsers,
    card: "border-[#DBEAFE] bg-gradient-to-br from-[#EFF6FF] to-white",
    iconBox: "border-[#BFDBFE] bg-[#DBEAFE] text-[#2563EB]",
  },
  {
    id: "food_saved",
    label: "Food Saved",
    value: `${OVERVIEW_IMPACT_THIS_MONTH.foodSavedKg} kg`,
    icon: FaLeaf,
    card: "border-[#EDE9FE] bg-gradient-to-br from-[#F5F3FF] to-white",
    iconBox: "border-[#DDD6FE] bg-[#EDE9FE] text-[#7C3AED]",
  },
  {
    id: "deliveries",
    label: "Successful Deliveries",
    value: OVERVIEW_IMPACT_THIS_MONTH.successfulDeliveries,
    icon: FaTruck,
    card: "border-[#FEF3C7] bg-gradient-to-br from-[#FFFBEB] to-white",
    iconBox: "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
  },
];

export default function NGOOverviewImpactMonth() {
  return (
    <section className={NGO_SECTION_CLASS}>
      <NGOSectionHeader
        title="Impact This Month"
        actionTo={DASHBOARD_ROUTES.ngoImpact}
        actionLabel="View detailed report"
      />

      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {IMPACT_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={[
                "rounded-none border p-2.5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]",
                "transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
                item.card,
              ].join(" ")}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-none border ${item.iconBox}`}
              >
                <Icon className="text-xs" aria-hidden="true" />
              </span>
              <p className="mt-2 text-xl font-bold text-[#0F172A] sm:text-2xl">{item.value}</p>
              <p className="mt-0.5 text-[10px] font-semibold text-[#64748B] sm:text-xs">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
