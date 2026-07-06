import { getNgoFoodImage } from "../../data/ngoFoodAssets";
import {
  DELIVERY_STATUS_COLORS,
  OVERVIEW_ACTIVE_DELIVERIES,
} from "../../data/ngoDashboard";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { NGOSectionHeader, NGO_SECTION_CLASS } from "./NGOSectionLink";

const STATUS_BADGE = {
  in_transit: DELIVERY_STATUS_COLORS.in_transit,
  collected: "bg-[#FEF3C7] text-[#B45309]",
  volunteer_assigned: "bg-[#E0E7FF] text-[#4338CA]",
  scheduled: DELIVERY_STATUS_COLORS.scheduled,
  pending: DELIVERY_STATUS_COLORS.pending,
};

export default function NGOOverviewActiveDeliveries() {
  return (
    <section className={NGO_SECTION_CLASS}>
      <NGOSectionHeader
        title="Active Deliveries"
        actionTo={DASHBOARD_ROUTES.ngoDeliveries}
        actionLabel="View all"
      />

      <ul className="mt-3 flex flex-col gap-2">
        {OVERVIEW_ACTIVE_DELIVERIES.map((delivery) => {
          const foodImage = getNgoFoodImage(delivery.foodKey);

          return (
            <li
              key={delivery.id}
              className="flex gap-2.5 rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >
              {foodImage ? (
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-none bg-white">
                  <img
                    src={foodImage}
                    alt={delivery.foodName}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1">
                  <div>
                    <p className="text-[9px] font-semibold uppercase text-[#94A3B8]">
                      {delivery.id}
                    </p>
                    <h3 className="text-xs font-bold text-[#0F172A] sm:text-sm">
                      {delivery.foodName}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex shrink-0 rounded-none px-1.5 py-0.5 text-[9px] font-semibold ${STATUS_BADGE[delivery.statusKey] ?? STATUS_BADGE.pending}`}
                  >
                    {delivery.status}
                  </span>
                </div>

                <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] sm:grid-cols-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase text-[#94A3B8]">ETA</p>
                    <p className="font-medium text-[#0F172A]">{delivery.eta}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold uppercase text-[#94A3B8]">Donor</p>
                    <p className="font-medium text-[#0F172A]">{delivery.donor}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[9px] font-semibold uppercase text-[#94A3B8]">Volunteer</p>
                    <p className="font-medium text-[#0F172A]">{delivery.volunteer}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
