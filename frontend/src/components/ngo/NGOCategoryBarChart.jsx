import { FOOD_CATEGORY_DISTRIBUTION } from "../../data/ngoImpactAnalytics";

export default function NGOCategoryBarChart() {
  const maxKg = Math.max(...FOOD_CATEGORY_DISTRIBUTION.map((item) => item.kg));

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Food Category Distribution</h2>
      <p className="mt-[0.3cm] text-sm text-[#64748B]">Volume received by category (kg).</p>

      <ul className="mt-[0.5cm] flex flex-col gap-[0.5cm]">
        {FOOD_CATEGORY_DISTRIBUTION.map((item) => {
          const width = `${Math.max((item.kg / maxKg) * 100, 8)}%`;
          return (
            <li key={item.category}>
              <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-[#0F172A]">{item.category}</span>
                <span className="shrink-0 text-[#64748B]">
                  {item.kg} kg · {item.share}%
                </span>
              </div>
              <div className="h-3 w-full bg-[#F1F5F9]">
                <div
                  className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] transition-all"
                  style={{ width }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
