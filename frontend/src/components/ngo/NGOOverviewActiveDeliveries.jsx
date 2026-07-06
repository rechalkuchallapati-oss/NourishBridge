import { Link } from "react-router-dom";
import {
  DELIVERY_STATUS_COLORS,
  OVERVIEW_ACTIVE_DELIVERIES,
} from "../../data/ngoDashboard";
import { DASHBOARD_ROUTES } from "../../constants/routes";

const STATUS_BADGE = {
  in_transit: DELIVERY_STATUS_COLORS.in_transit,
  collected: "bg-[#FEF3C7] text-[#B45309]",
  volunteer_assigned: "bg-[#E0E7FF] text-[#4338CA]",
  scheduled: DELIVERY_STATUS_COLORS.scheduled,
  pending: DELIVERY_STATUS_COLORS.pending,
};

export default function NGOOverviewActiveDeliveries() {
  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-[0.5cm]">
        <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Active Deliveries</h2>
        <Link
          to={DASHBOARD_ROUTES.ngoDeliveries}
          className="text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
        >
          View all
        </Link>
      </div>

      <ul className="mt-[0.5cm] flex flex-col gap-[0.5cm]">
        {OVERVIEW_ACTIVE_DELIVERIES.map((delivery) => (
          <li
            key={delivery.id}
            className="rounded-none border border-[#E5E7EB] bg-[#F8FAFC] p-[0.5cm] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase text-[#94A3B8]">{delivery.id}</p>
                <h3 className="text-base font-bold text-[#0F172A] sm:text-lg">
                  {delivery.foodName}
                </h3>
              </div>
              <span
                className={`inline-flex shrink-0 rounded-none px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[delivery.statusKey] ?? STATUS_BADGE.pending}`}
              >
                {delivery.status}
              </span>
            </div>

            <div className="mt-[0.5cm] grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                  ETA
                </p>
                <p className="font-medium text-[#0F172A]">{delivery.eta}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Donor
                </p>
                <p className="font-medium text-[#0F172A]">{delivery.donor}</p>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                  Volunteer
                </p>
                <p className="font-medium text-[#0F172A]">{delivery.volunteer}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
