/** Large live route map with volunteer position along donor → NGO path. */
export default function VolunteerLiveRouteMap({
  pickupLabel = "Pickup",
  ngoLabel = "NGO",
  distanceKm = 7.8,
  progress = 0.5,
  headingToNgo = true,
}) {
  const pathD = "M 40 280 C 120 180, 200 320, 320 200 S 520 120, 660 180";
  const gradientId = "liveRouteGradient";
  const clipId = "liveRouteClip";

  const volunteerX = 40 + (660 - 40) * Math.min(Math.max(progress, 0), 1);
  const volunteerY =
    progress < 0.35
      ? 280 - progress * 280
      : progress < 0.7
        ? 200 + (progress - 0.35) * 80
        : 180 - (progress - 0.7) * 60;

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-none border border-[#E5E7EB] bg-[#EFF6FF] lg:min-h-[360px]">
      <svg viewBox="0 0 700 320" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={volunteerX + 20} height="320" />
          </clipPath>
        </defs>

        <rect width="700" height="320" fill="#EFF6FF" />
        <path d="M0 80 H700 M0 160 H700 M0 240 H700" stroke="#DBEAFE" strokeWidth="1" />
        <path d="M100 0 V320 M250 0 V320 M400 0 V320 M550 0 V320" stroke="#DBEAFE" strokeWidth="1" />

        <path d={pathD} fill="none" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" />
        <path
          d={pathD}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="10 8"
          clipPath={`url(#${clipId})`}
        />

        <circle cx="40" cy="280" r="14" fill="#16A34A" stroke="#fff" strokeWidth="4" />
        <text x="40" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803D">
          Donor
        </text>

        <circle cx="660" cy="180" r="14" fill="#2563EB" stroke="#fff" strokeWidth="4" />
        <text x="660" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563EB">
          NGO
        </text>

        <circle cx={volunteerX} cy={volunteerY} r="10" fill="#F59E0B" stroke="#fff" strokeWidth="3" />
        <circle cx={volunteerX} cy={volunteerY} r="18" fill="#F59E0B" fillOpacity="0.2" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/95 px-4 py-2.5 text-[11px] backdrop-blur-sm">
        <span className="max-w-[30%] truncate font-semibold text-[#15803D]">{pickupLabel}</span>
        <span className="font-medium text-[#64748B]">
          {distanceKm} km total · {headingToNgo ? "→ NGO" : "→ Donor"}
        </span>
        <span className="max-w-[30%] truncate text-right font-semibold text-[#2563EB]">{ngoLabel}</span>
      </div>

      <div className="absolute left-3 top-3 rounded-none border border-[#FDE68A] bg-[#FFFBEB]/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#B45309] backdrop-blur-sm">
        Live position
      </div>
    </div>
  );
}
