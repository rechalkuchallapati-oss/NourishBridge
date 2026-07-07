import { FOOD_RESCUE_BREAKDOWN } from "../../../data/volunteerImpactPageData";

export default function VolunteerFoodRescueBreakdownChart() {
  const totalKg = FOOD_RESCUE_BREAKDOWN.reduce((sum, item) => sum + item.kg, 0);
  let cumulative = 0;

  const segments = FOOD_RESCUE_BREAKDOWN.map((item) => {
    const start = cumulative;
    cumulative += item.share;
    return { ...item, start, end: cumulative };
  });

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Food Rescue Breakdown</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">
        Categories of food rescued by weight ({totalKg} kg total).
      </p>

      <div className="mt-[0.5cm] flex flex-col gap-[0.5cm] lg:flex-row lg:items-center">
        <div className="flex shrink-0 justify-center">
          <svg viewBox="0 0 120 120" className="h-36 w-36" role="img" aria-label="Food rescue breakdown chart">
            {segments.map((segment) => {
              const startAngle = (segment.start / 100) * 360 - 90;
              const endAngle = (segment.end / 100) * 360 - 90;
              const largeArc = segment.share > 50 ? 1 : 0;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const x1 = 60 + 50 * Math.cos(startRad);
              const y1 = 60 + 50 * Math.sin(startRad);
              const x2 = 60 + 50 * Math.cos(endRad);
              const y2 = 60 + 50 * Math.sin(endRad);
              const d = `M 60 60 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;

              return <path key={segment.id} d={d} fill={segment.color} stroke="#fff" strokeWidth="1" />;
            })}
            <circle cx="60" cy="60" r="28" fill="#fff" />
            <text x="60" y="56" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
              {totalKg} kg
            </text>
            <text x="60" y="70" textAnchor="middle" fontSize="8" fill="#64748B">
              rescued
            </text>
          </svg>
        </div>

        <ul className="grid flex-1 gap-2 sm:grid-cols-2">
          {FOOD_RESCUE_BREAKDOWN.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-2 rounded-none border border-[#F1F5F9] bg-[#FAFAFA] px-3 py-2"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-[#0F172A]">{item.label}</p>
                <p className="text-[10px] text-[#64748B]">
                  {item.kg} kg · {item.share}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
