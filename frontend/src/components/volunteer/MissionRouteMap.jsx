export default function MissionRouteMap({ pickupLabel, ngoLabel, distanceKm = 7.8 }) {
  return (
    <div className="relative overflow-hidden rounded-none border border-[#E5E7EB] bg-[#F8FAFC]">
      <svg viewBox="0 0 360 180" className="h-44 w-full sm:h-48" aria-hidden="true">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <rect width="360" height="180" fill="#EFF6FF" />
        <path
          d="M0 120 C 60 80, 120 140, 180 100 S 300 60, 360 90"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M0 120 C 60 80, 120 140, 180 100 S 300 60, 360 90"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 6"
        />
        <circle cx="36" cy="120" r="10" fill="#16A34A" stroke="#fff" strokeWidth="3" />
        <circle cx="324" cy="90" r="10" fill="#2563EB" stroke="#fff" strokeWidth="3" />
        <circle cx="180" cy="100" r="6" fill="#F59E0B" stroke="#fff" strokeWidth="2" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/90 px-3 py-2 text-[10px] backdrop-blur-sm">
        <span className="font-semibold text-[#15803D]">{pickupLabel}</span>
        <span className="text-[#64748B]">{distanceKm} km · ~18 min</span>
        <span className="font-semibold text-[#2563EB]">{ngoLabel}</span>
      </div>
    </div>
  );
}
