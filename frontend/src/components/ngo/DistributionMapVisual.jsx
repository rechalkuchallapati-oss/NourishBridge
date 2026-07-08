import { FaArrowDown, FaMapMarkerAlt } from "react-icons/fa";
import { DISTRIBUTION_MAP_STOPS } from "../../data/ngoDistributionQueue";

export default function DistributionMapVisual() {
  return (
    <div className="rounded-none border border-[#E5E7EB] bg-gradient-to-br from-[#F5F3FF] to-white p-[0.5cm]">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#7C3AED]">
        Distribution Map
      </p>
      <div className="mt-3 flex flex-col items-start gap-1">
        {DISTRIBUTION_MAP_STOPS.map((stop, index) => (
          <div key={stop.id} className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span
                className={[
                  "flex h-8 min-w-[8rem] items-center gap-2 rounded-none px-3 py-1.5 text-xs font-semibold",
                  stop.type === "origin"
                    ? "bg-[#7C3AED] text-white"
                    : stop.type === "destination"
                      ? "bg-[#DCFCE7] text-[#15803D] ring-1 ring-[#BBF7D0]"
                      : "bg-white text-[#0F172A] ring-1 ring-[#E5E7EB]",
                ].join(" ")}
              >
                <FaMapMarkerAlt aria-hidden="true" />
                {stop.label}
              </span>
            </div>
            {index < DISTRIBUTION_MAP_STOPS.length - 1 ? (
              <FaArrowDown className="my-1 ml-4 text-[#94A3B8]" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
