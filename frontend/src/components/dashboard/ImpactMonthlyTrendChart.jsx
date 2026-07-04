import { MONTHLY_DONATION_TRENDS } from "../../data/donorImpact";

export default function ImpactMonthlyTrendChart() {
  const maxDonations = Math.max(...MONTHLY_DONATION_TRENDS.map((item) => item.donations));

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">
        Monthly donation trends
      </h2>
      <p className="mt-[0.5cm] text-sm leading-7 text-[#64748B] sm:text-base">
        Donations posted per month (demo data for UI preview).
      </p>

      <div className="mt-[1cm] flex items-end justify-between gap-3 sm:gap-4">
        {MONTHLY_DONATION_TRENDS.map((item) => {
          const height = `${Math.max((item.donations / maxDonations) * 100, 12)}%`;

          return (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-[0.5cm]">
              <span className="text-xs font-semibold text-[#64748B] sm:text-sm">
                {item.donations}
              </span>
              <div className="flex h-40 w-full items-end justify-center sm:h-48">
                <div
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-[#15803D] to-[#4ADE80] transition-all duration-300 hover:from-[#16A34A] hover:to-[#86EFAC]"
                  style={{ height }}
                  title={`${item.donations} donations, ~${item.meals} meals`}
                />
              </div>
              <span className="text-xs font-semibold text-[#94A3B8] sm:text-sm">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-[0.5cm] text-xs leading-5 text-[#94A3B8] sm:text-sm">
        Bar height = donations posted. Values are illustrative until live analytics
        are connected.
      </p>
    </section>
  );
}
