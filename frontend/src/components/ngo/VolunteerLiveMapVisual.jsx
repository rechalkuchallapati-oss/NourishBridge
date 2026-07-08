import { FaMapMarkerAlt } from "react-icons/fa";
import { LIVE_MAP_LEGEND, LIVE_MAP_PINS } from "../../data/ngoVolunteers";

const PIN_COLORS = {
  available: "#16A34A",
  pickup: "#2563EB",
  delivering: "#D97706",
};

export default function VolunteerLiveMapVisual({ selectedPinId }) {
  return (
    <div className="rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F0FDF4] to-white p-[0.5cm]">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#16A34A]">Live Map</p>
      <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-none border border-[#E5E7EB] bg-[#F8FAFC]">
        <div className="absolute inset-0 opacity-30">
          <div className="grid h-full w-full grid-cols-6 grid-rows-5">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="border border-[#E2E8F0]" />
            ))}
          </div>
        </div>
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <line x1="22%" y1="35%" x2="45%" y2="28%" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4" />
          <line x1="45%" y1="28%" x2="68%" y2="42%" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4" />
          <line x1="55%" y1="58%" x2="68%" y2="42%" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4" />
        </svg>
        {LIVE_MAP_PINS.map((pin) => (
          <div
            key={pin.id}
            className={[
              "absolute flex -translate-x-1/2 -translate-y-full flex-col items-center",
              selectedPinId === pin.id ? "z-10" : "",
            ].join(" ")}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span
              className={[
                "whitespace-nowrap rounded-none px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm",
                selectedPinId === pin.id ? "ring-2 ring-[#0F172A]" : "",
              ].join(" ")}
              style={{ backgroundColor: PIN_COLORS[pin.type] ?? "#64748B" }}
            >
              {pin.label}
            </span>
            <FaMapMarkerAlt
              className="text-lg"
              style={{ color: PIN_COLORS[pin.type] ?? "#64748B" }}
              aria-hidden="true"
            />
          </div>
        ))}
        <div className="absolute bottom-2 left-2 rounded-none bg-white/90 px-2 py-1 text-[10px] text-[#64748B]">
          Hyderabad · Live view
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {LIVE_MAP_LEGEND.map((item) => (
          <li key={item.id} className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
