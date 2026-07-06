import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SERVICE_AREAS } from "../../../data/volunteerProfileData";

export default function VolunteerServiceAreaMap({ serviceRadiusKm = 10, city = "Hyderabad" }) {
  const [selectedId, setSelectedId] = useState(
    () => SERVICE_AREAS.find((area) => area.active)?.id ?? SERVICE_AREAS[0].id,
  );
  const selected = SERVICE_AREAS.find((area) => area.id === selectedId);

  return (
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A]">Service Areas</h2>
          <p className="mt-1 text-[10px] text-[#64748B]">
            Tap a zone to view coverage. Active areas within your {serviceRadiusKm} km radius.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-none border border-[#BBF7D0] bg-[#F0FDF4] px-2.5 py-1 text-[10px] font-semibold text-[#16A34A]">
          <FaMapMarkerAlt className="text-[9px]" aria-hidden="true" />
          {city}
        </span>
      </div>

      <div className="relative mt-[0.5cm] overflow-hidden rounded-none border border-[#E5E7EB] bg-[#F8FAFC]">
        <svg viewBox="0 0 100 100" className="h-52 w-full sm:h-56" role="img" aria-label="Service area map">
          <rect width="100" height="100" fill="#EFF6FF" />
          <circle cx="50" cy="50" r={serviceRadiusKm * 2.2} fill="#BBF7D0" fillOpacity="0.25" stroke="#16A34A" strokeWidth="0.4" strokeDasharray="1.5 1" />
          <path d="M10 50 Q 30 20, 50 35 T 90 45" fill="none" stroke="#CBD5E1" strokeWidth="0.6" />
          <path d="M15 70 Q 45 85, 75 65" fill="none" stroke="#CBD5E1" strokeWidth="0.5" />

          {SERVICE_AREAS.map((area) => {
            const isSelected = area.id === selectedId;
            const isActive = area.active;

            return (
              <g key={area.id}>
                <circle
                  cx={area.x}
                  cy={area.y}
                  r={isSelected ? 4.5 : 3.5}
                  fill={isActive ? (isSelected ? "#16A34A" : "#2563EB") : "#94A3B8"}
                  fillOpacity={isActive ? 1 : 0.5}
                  stroke="#fff"
                  strokeWidth="0.8"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedId(area.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${area.label}${isActive ? ", active" : ", inactive"}`}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(area.id);
                    }
                  }}
                />
                {isSelected ? (
                  <text
                    x={area.x}
                    y={area.y - 6}
                    textAnchor="middle"
                    fontSize="3.2"
                    fontWeight="600"
                    fill="#0F172A"
                  >
                    {area.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          <circle cx="50" cy="50" r="2" fill="#16A34A" stroke="#fff" strokeWidth="0.6" />
          <text x="50" y="58" textAnchor="middle" fontSize="2.8" fill="#64748B">
            You
          </text>
        </svg>

        <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-white/95 px-3 py-2 text-[10px] backdrop-blur-sm">
          <span className="font-semibold text-[#0F172A]">{selected?.label ?? "—"}</span>
          <span className={selected?.active ? "text-[#16A34A]" : "text-[#64748B]"}>
            {selected?.active ? "Active coverage" : "Outside current radius"}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {SERVICE_AREAS.filter((area) => area.active).map((area) => (
          <button
            key={area.id}
            type="button"
            onClick={() => setSelectedId(area.id)}
            className={[
              "rounded-none border px-2 py-1 text-[10px] font-semibold transition-colors",
              area.id === selectedId
                ? "border-[#16A34A] bg-[#F0FDF4] text-[#15803D]"
                : "border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#BBF7D0]",
            ].join(" ")}
          >
            {area.label}
          </button>
        ))}
      </div>
    </section>
  );
}
