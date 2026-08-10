/**
 * Route map with OpenStreetMap embed + live distance/ETA from API.
 * Set VITE_GOOGLE_MAPS_API_KEY for Google Maps Directions (optional).
 */
export default function RouteMapPanel({ route, className = "" }) {
  if (!route) {
    return (
      <div className={`rounded-[16px] border border-dashed border-[#E5E7EB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B] ${className}`}>
        Route data unavailable
      </div>
    );
  }

  const pickup = route.pickup?.location || route.donor?.location;
  const ngo = route.ngo?.location;
  const volunteer = route.volunteer?.location;
  const center = pickup || ngo || volunteer;

  const osmEmbed = center
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.05}%2C${center.lat - 0.03}%2C${center.lng + 0.05}%2C${center.lat + 0.03}&layer=mapnik&marker=${center.lat}%2C${center.lng}`
    : null;

  const routes = route.routes || {};
  const totalKm = routes.totalDistanceKm ?? routes.pickupToNgo?.distanceKm;
  const eta = routes.etaMinutes ?? routes.toNgo?.etaMinutes;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-[12px] border border-[#E5E7EB] bg-white px-3 py-2">
          <p className="text-[10px] font-bold uppercase text-[#94A3B8]">Distance</p>
          <p className="text-lg font-bold text-[#0F172A]">{totalKm != null ? `${totalKm} km` : "—"}</p>
        </div>
        <div className="rounded-[12px] border border-[#E5E7EB] bg-white px-3 py-2">
          <p className="text-[10px] font-bold uppercase text-[#94A3B8]">ETA</p>
          <p className="text-lg font-bold text-[#0F172A]">{eta != null ? `${eta} min` : "—"}</p>
        </div>
        <div className="rounded-[12px] border border-[#E5E7EB] bg-white px-3 py-2">
          <p className="text-[10px] font-bold uppercase text-[#94A3B8]">Status</p>
          <p className="text-sm font-semibold capitalize text-[#16A34A]">{route.status?.replace(/_/g, " ") || "Active"}</p>
        </div>
      </div>

      {osmEmbed ? (
        <iframe
          title="Route map"
          src={osmEmbed}
          className="h-56 w-full rounded-[16px] border border-[#E5E7EB]"
          loading="lazy"
        />
      ) : null}

      <ul className="grid gap-2 text-xs text-[#64748B] sm:grid-cols-3">
        <li>
          <span className="font-bold text-[#0F172A]">Pickup</span>
          <br />
          {pickup ? `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}` : "Not set"}
        </li>
        <li>
          <span className="font-bold text-[#0F172A]">Volunteer</span>
          <br />
          {volunteer ? `${volunteer.lat.toFixed(4)}, ${volunteer.lng.toFixed(4)}` : "Not tracked"}
        </li>
        <li>
          <span className="font-bold text-[#0F172A]">NGO</span>
          <br />
          {ngo ? `${ngo.lat.toFixed(4)}, ${ngo.lng.toFixed(4)}` : "Not set"}
        </li>
      </ul>
    </div>
  );
}
