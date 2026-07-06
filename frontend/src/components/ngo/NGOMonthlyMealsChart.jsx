import { MONTHLY_MEALS_TREND } from "../../data/ngoImpactAnalytics";

export default function NGOMonthlyMealsChart() {
  const maxMeals = Math.max(...MONTHLY_MEALS_TREND.map((item) => item.meals));

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Monthly Meals Distributed</h2>
      <p className="mt-[0.3cm] text-sm text-[#64748B]">Trend over the last 6 months (demo data).</p>

      <div className="mt-[0.5cm] flex h-44 items-end justify-between gap-2 sm:h-52 sm:gap-3">
        {MONTHLY_MEALS_TREND.map((item) => {
          const height = `${Math.max((item.meals / maxMeals) * 100, 10)}%`;
          return (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-semibold text-[#64748B]">{item.meals}</span>
              <div className="flex h-full w-full items-end justify-center">
                <div
                  className="w-full max-w-10 rounded-t-md bg-gradient-to-t from-[#1D4ED8] to-[#60A5FA] transition-all hover:from-[#2563EB] hover:to-[#93C5FD]"
                  style={{ height }}
                  title={`${item.meals} meals`}
                />
              </div>
              <span className="text-xs font-semibold text-[#94A3B8]">{item.month}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
