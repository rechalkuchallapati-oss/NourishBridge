import { FaMapMarkerAlt } from "react-icons/fa";
import { COMMUNITY_COVERAGE } from "../../data/ngoImpactAnalytics";

export default function ImpactCommunityMapVisual() {
  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm sm:p-5">
      <h2 className="text-lg font-bold text-[#0F172A] sm:text-xl">Community Coverage Map</h2>
      <p className="mt-[0.3cm] text-sm text-[#64748B]">NGO service areas across Hyderabad region.</p>

      <div className="relative mt-[0.5cm] aspect-[16/10] overflow-hidden rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#EFF6FF] to-[#F0FDF4]">
        <div className="absolute inset-0 opacity-25">
          <div className="grid h-full w-full grid-cols-8 grid-rows-6">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-[#E2E8F0]" />
            ))}
          </div>
        </div>

        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="42%" cy="48%" r="28%" fill="none" stroke="#16A34A" strokeWidth="2" strokeDasharray="6" opacity="0.4" />
          <circle cx="42%" cy="48%" r="18%" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4" opacity="0.3" />
        </svg>

        {COMMUNITY_COVERAGE.map((area) => (
          <div
            key={area.id}
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
            style={{ left: `${area.x}%`, top: `${area.y}%` }}
          >
            <span className="whitespace-nowrap rounded-none bg-[#16A34A] px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
              {area.label}
            </span>
            <FaMapMarkerAlt className="text-lg text-[#16A34A]" aria-hidden="true" />
          </div>
        ))}

        <div className="absolute bottom-2 left-2 rounded-none bg-white/90 px-2 py-1 text-[10px] font-medium text-[#64748B]">
          5 active service areas
        </div>
      </div>
    </section>
  );
}
