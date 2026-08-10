/** Earth radius in km */
const R = 6371;

export function toRad(deg) {
  return (deg * Math.PI) / 180;
}

export function extractCoords(geoPoint) {
  if (!geoPoint?.coordinates || geoPoint.coordinates.length !== 2) return null;
  const [lng, lat] = geoPoint.coordinates;
  return { lat, lng };
}

export function buildGeoPoint(lat, lng) {
  if (lat == null || lng == null) return null;
  return { type: "Point", coordinates: [Number(lng), Number(lat)] };
}

/** Haversine distance in km */
export function distanceKm(a, b) {
  if (!a?.lat || !b?.lat) return null;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 100) / 100;
}

/** Estimate ETA minutes assuming average urban speed (km/h) */
export function estimateEtaMinutes(distanceKmValue, avgSpeedKmh = 25) {
  if (distanceKmValue == null || distanceKmValue <= 0) return null;
  return Math.max(1, Math.round((distanceKmValue / avgSpeedKmh) * 60));
}

export function routeSummary(from, to, avgSpeedKmh = 25) {
  const dist = distanceKm(from, to);
  return {
    distanceKm: dist,
    etaMinutes: estimateEtaMinutes(dist, avgSpeedKmh),
  };
}

export default { extractCoords, buildGeoPoint, distanceKm, estimateEtaMinutes, routeSummary };
