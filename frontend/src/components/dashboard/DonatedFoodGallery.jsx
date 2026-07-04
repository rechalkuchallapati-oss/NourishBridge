import { Link } from "react-router-dom";
import { getDonationImage, getDonationImageAlt } from "../../data/donationFoodImages";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import {
  dashboardBoxClass,
  dashboardSectionClass,
} from "./dashboardFormStyles";

export default function DonatedFoodGallery({ donations, title = "Your donated food" }) {
  const items = donations.filter((donation) => donation.food);

  if (!items.length) return null;

  return (
    <section className={dashboardSectionClass}>
      <div className="flex flex-col gap-[0.5cm]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#16A34A]">
            Live gallery
          </p>
          <h2 className="text-xl font-bold text-[#0F172A] sm:text-2xl">{title}</h2>
          <p className="text-sm text-[#64748B]">
            Recent photos from donations you have listed on NourishBridge.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[0.5cm] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {items.map((donation) => {
            const foodImage = getDonationImage(donation);

            return (
            <Link
              key={donation.id}
              to={
                donation.isActive
                  ? DASHBOARD_ROUTES.donorActive
                  : DASHBOARD_ROUTES.donorHistory
              }
              className={`${dashboardBoxClass} group overflow-hidden transition-colors hover:border-[#16A34A]/40`}
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F8FAFC]">
                {foodImage ? (
                  <img
                    src={foodImage}
                    alt={getDonationImageAlt(donation)}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="px-3 text-center text-xs text-[#94A3B8]">No photo</span>
                )}
              </div>
              <div className="flex flex-col gap-[0.5cm] border-t border-[#E5E7EB] p-3">
                <p className="line-clamp-2 text-sm font-semibold leading-5 text-[#0F172A]">
                  {donation.food}
                </p>
                <p className="text-xs text-[#64748B]">{donation.id}</p>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
