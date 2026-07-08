import { BENEFICIARY_DISTRIBUTION } from "../../data/ngoImpactAnalytics";

export default function ImpactBeneficiaryBarChart() {
  const maxMeals = Math.max(...BENEFICIARY_DISTRIBUTION.map((item) => item.meals));

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Beneficiary Distribution</h2>
      <p className="mt-[0.3cm] text-sm text-[#64748B]">Meals served by beneficiary type — bar chart.</p>

      <div className="mt-[0.5cm] flex h-48 items-end justify-between gap-2 sm:h-52 sm:gap-3">
        {BENEFICIARY_DISTRIBUTION.map((item) => {
          const height = `${Math.max((item.meals / maxMeals) * 100, 12)}%`;
          return (
            <div key={item.id} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[10px] font-semibold text-[#64748B] sm:text-xs">
                {item.meals.toLocaleString()}
              </span>
              <div className="flex h-full w-full items-end justify-center">
                <div
                  className="w-full max-w-12 rounded-t-md bg-gradient-to-t from-[#2563EB] to-[#60A5FA] transition-all hover:from-[#1D4ED8] hover:to-[#93C5FD]"
                  style={{ height }}
                  title={`${item.label}: ${item.meals} meals`}
                />
              </div>
              <span className="text-center text-[10px] font-semibold leading-tight text-[#94A3B8] sm:text-xs">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
