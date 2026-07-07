/** Verified NGO partners — Hyderabad service area (demo coordinates). */
export const VERIFIED_NGOS = [
  {
    id: "ngo-helping-hands",
    name: "Helping Hands Foundation",
    address: "Plot 12, Kondapur Main Road, Hyderabad",
    lat: 17.4847,
    lng: 78.3894,
  },
  {
    id: "ngo-akshaya-patra",
    name: "Akshaya Patra Hyderabad",
    address: "Feeding Centre, Uppal Road, Hyderabad",
    lat: 17.401,
    lng: 78.559,
  },
  {
    id: "ngo-robin-hood",
    name: "Robin Hood Army — Hyderabad",
    address: "Community Kitchen, Banjara Hills, Hyderabad",
    lat: 17.4156,
    lng: 78.4347,
  },
  {
    id: "ngo-goonj",
    name: "Goonj Relief Centre",
    address: "Relief Hub, Miyapur, Hyderabad",
    lat: 17.4967,
    lng: 78.3575,
  },
  {
    id: "ngo-no-food-waste",
    name: "No Food Waste Hyderabad",
    address: "Distribution Point, Begumpet, Hyderabad",
    lat: 17.4448,
    lng: 78.466,
  },
];

/** Approximate pickup coordinates for nearest-NGO matching. */
const PICKUP_LOCATIONS = {
  "PKP-001": { lat: 17.385, lng: 78.4867 },
  "PKP-002": { lat: 17.4487, lng: 78.3908 },
  "PKP-003": { lat: 17.4947, lng: 78.3996 },
  "PKP-004": { lat: 17.5045, lng: 78.4983 },
  "PKP-005": { lat: 17.4169, lng: 78.3428 },
};

const DEFAULT_PICKUP_LOCATION = { lat: 17.4484, lng: 78.3908 };

/** Load bias (km) — used only when breaking ties between equally loaded NGOs. */
const LOAD_BIAS_KM = 2;

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/** Haversine distance in km between two lat/lng points. */
export function distanceKm(a, b) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function pickNgoForPickup(pickupLocation, loadByNgoId) {
  const minLoad = Math.min(...Object.values(loadByNgoId));

  const candidates = VERIFIED_NGOS.filter((ngo) => loadByNgoId[ngo.id] === minLoad)
    .map((ngo) => ({
      ngo,
      distanceKm: distanceKm(pickupLocation, ngo),
      score: distanceKm(pickupLocation, ngo) + loadByNgoId[ngo.id] * LOAD_BIAS_KM,
    }))
    .sort((a, b) => a.score - b.score);

  return candidates[0];
}

/**
 * Assign nearest verified NGO to each pickup while balancing load across partners.
 */
export function assignNgosToPickups(pickups) {
  const loadByNgoId = Object.fromEntries(VERIFIED_NGOS.map((ngo) => [ngo.id, 0]));

  return pickups.map((pickup) => {
    const pickupLocation = PICKUP_LOCATIONS[pickup.id] ?? DEFAULT_PICKUP_LOCATION;

    const chosen = pickNgoForPickup(pickupLocation, loadByNgoId);
    loadByNgoId[chosen.ngo.id] += 1;

    return {
      ...pickup,
      ngoId: chosen.ngo.id,
      ngoName: chosen.ngo.name,
      ngoAddress: chosen.ngo.address,
      ngoDistanceKm: Number(chosen.distanceKm.toFixed(1)),
      journeyDistanceKm: Number(chosen.distanceKm.toFixed(1)),
    };
  });
}

export function formatNgoDeliveryLine(pickup) {
  if (!pickup?.ngoName) return "—";
  const shortAddress = pickup.ngoAddress?.split(",")[0] ?? pickup.ngoAddress;
  return `${pickup.ngoName} · ${shortAddress}`;
}

export function getNgoById(ngoId) {
  return VERIFIED_NGOS.find((ngo) => ngo.id === ngoId) ?? null;
}
