import { MISSION_STATES, MISSION_STATE_LABELS } from "./volunteerMission";
import { enrichDeliveryMission, isDeliveryPhase } from "./volunteerDeliveryDetails";

export const ROUTE_PROGRESS_STEPS = [
  { id: "to_pickup", label: "En route to pickup" },
  { id: "at_pickup", label: "At donor site" },
  { id: "in_transit", label: "In transit to NGO" },
  { id: "approaching", label: "Approaching destination" },
  { id: "at_ngo", label: "At NGO destination" },
];

export const ROUTE_ISSUE_OPTIONS = [
  { id: "delay", label: "Delay" },
  { id: "traffic", label: "Heavy traffic" },
  { id: "vehicle", label: "Vehicle issue" },
  { id: "route_blocked", label: "Route blocked" },
  { id: "ngo_contact", label: "Cannot reach destination" },
];

const PICKUP_PHASE_STATUSES = new Set([
  MISSION_STATES.ASSIGNED,
  MISSION_STATES.ACCEPTED,
  MISSION_STATES.EN_ROUTE_TO_DONOR,
  MISSION_STATES.ARRIVED_AT_DONOR,
  MISSION_STATES.PICKUP_VERIFIED,
]);

function formatMissionDisplayId(mission) {
  if (mission?.displayMissionId) return mission.displayMissionId;
  const raw = mission?.missionId ?? mission?.id ?? "2048";
  const digits = String(raw).replace(/\D/g, "").slice(-4) || "2048";
  return `NB-${digits.padStart(4, "0")}`;
}

function getRouteProgressIndex(status) {
  const map = {
    [MISSION_STATES.ASSIGNED]: 0,
    [MISSION_STATES.ACCEPTED]: 0,
    [MISSION_STATES.EN_ROUTE_TO_DONOR]: 0,
    [MISSION_STATES.ARRIVED_AT_DONOR]: 1,
    [MISSION_STATES.PICKUP_VERIFIED]: 1,
    [MISSION_STATES.FOOD_COLLECTED]: 2,
    [MISSION_STATES.EN_ROUTE_TO_NGO]: 2,
    [MISSION_STATES.ARRIVED_AT_NGO]: 4,
    [MISSION_STATES.HANDOVER_CONFIRMED]: 4,
    [MISSION_STATES.COMPLETED]: 4,
  };
  return map[status] ?? 0;
}

function getVolunteerMapProgress(status) {
  const map = {
    [MISSION_STATES.EN_ROUTE_TO_DONOR]: 0.15,
    [MISSION_STATES.ARRIVED_AT_DONOR]: 0.28,
    [MISSION_STATES.PICKUP_VERIFIED]: 0.32,
    [MISSION_STATES.FOOD_COLLECTED]: 0.38,
    [MISSION_STATES.EN_ROUTE_TO_NGO]: 0.62,
    [MISSION_STATES.ARRIVED_AT_NGO]: 0.92,
    [MISSION_STATES.HANDOVER_CONFIRMED]: 0.96,
    [MISSION_STATES.COMPLETED]: 1,
  };
  return map[status] ?? 0.08;
}

function getStageLabel(status) {
  if (isDeliveryPhase(status)) return "Active Delivery";
  if (PICKUP_PHASE_STATUSES.has(status)) {
    if (status === MISSION_STATES.ARRIVED_AT_DONOR || status === MISSION_STATES.PICKUP_VERIFIED) {
      return "At Donor Site";
    }
    return "En Route to Pickup";
  }
  return MISSION_STATE_LABELS[status] ?? "Active Mission";
}

function getNextDestination(mission, status) {
  const enriched = enrichDeliveryMission(mission);
  const headingToNgo =
    isDeliveryPhase(status) ||
    status === MISSION_STATES.EN_ROUTE_TO_NGO ||
    status === MISSION_STATES.ARRIVED_AT_NGO;

  if (headingToNgo) {
    return {
      type: "ngo",
      name: enriched.ngoName,
      verified: enriched.ngoVerified,
      address: enriched.ngoAddress,
      distanceKm: enriched.deliveryDistanceKm ?? enriched.journeyDistanceKm ?? "5.8",
      eta: enriched.deliveryEta ?? "24 min",
      deadline: enriched.deliveryDeadline?.replace(/^Deliver by\s*/i, "") ?? "5:30 PM",
    };
  }

  return {
    type: "donor",
    name: enriched.donorName,
    verified: true,
    address: enriched.pickupAddress,
    distanceKm: enriched.pickupDistanceKm ?? "2.4",
    eta: enriched.pickupEta ?? "12 min",
    deadline: enriched.collectBeforeDeadline ?? enriched.pickupDeadline ?? "4:30 PM",
  };
}

function getTransportRequirements(mission) {
  const scale = mission?.packagingScale;
  const base = [
    "Keep hot boxes and chafer pans upright — no tipping",
    "Maintain safe temperature until handover",
    "Secure load before moving — check seals at each stop",
  ];
  if (scale === "bulk") {
    return [...base, "Bulk catering load — use flat surface in vehicle", "Allow ventilation for hot boxes"];
  }
  if (scale === "individual") {
    return [...base, "Stack tiffin boxes flat only — max 2 high", "Use insulated bag for any chilled items"];
  }
  return base;
}

function getRouteDelayStatus(status) {
  if (status === MISSION_STATES.EN_ROUTE_TO_NGO) {
    return {
      label: "On track",
      detail: "Light traffic on ORR · GPS updated just now",
      severity: "good",
    };
  }
  if (status === MISSION_STATES.EN_ROUTE_TO_DONOR) {
    return {
      label: "On track",
      detail: "Clear route to donor · ETA unchanged",
      severity: "good",
    };
  }
  if (status === MISSION_STATES.ARRIVED_AT_NGO) {
    return {
      label: "At destination",
      detail: "Confirm delivery to NGO to complete this mission",
      severity: "good",
    };
  }
  return {
    label: "Monitoring",
    detail: "Route status will update once en route",
    severity: "neutral",
  };
}

function getPrimaryRouteAction(status) {
  switch (status) {
    case MISSION_STATES.ASSIGNED:
      return {
        label: "Confirm Acceptance",
        next: MISSION_STATES.ACCEPTED,
        navigateTo: null,
      };
    case MISSION_STATES.ACCEPTED:
      return {
        label: "Start Route to Donor",
        next: MISSION_STATES.EN_ROUTE_TO_DONOR,
        navigateTo: null,
      };
    case MISSION_STATES.EN_ROUTE_TO_DONOR:
      return {
        label: "I've Arrived at Donor",
        next: MISSION_STATES.ARRIVED_AT_DONOR,
        navigateTo: "/dashboard/volunteer/pickup",
      };
    case MISSION_STATES.ARRIVED_AT_DONOR:
    case MISSION_STATES.PICKUP_VERIFIED:
      return {
        label: "Open Pickup Verification",
        next: null,
        navigateTo: "/dashboard/volunteer/pickup",
      };
    case MISSION_STATES.FOOD_COLLECTED:
      return {
        label: "Start Route to NGO",
        next: MISSION_STATES.EN_ROUTE_TO_NGO,
        navigateTo: null,
      };
    case MISSION_STATES.EN_ROUTE_TO_NGO:
      return {
        label: "I've Arrived at NGO",
        next: MISSION_STATES.ARRIVED_AT_NGO,
        navigateTo: null,
      };
    case MISSION_STATES.ARRIVED_AT_NGO:
      return {
        label: "Confirm Delivery to NGO",
        next: MISSION_STATES.HANDOVER_CONFIRMED,
        navigateTo: null,
        completesMission: true,
      };
    default:
      return {
        label: "I've Arrived at NGO",
        next: MISSION_STATES.ARRIVED_AT_NGO,
        navigateTo: null,
      };
  }
}

/** Live route context for the Route & Navigation page. */
export function getRouteContext(mission) {
  if (!mission) return null;

  const status = mission.status ?? MISSION_STATES.ASSIGNED;
  const enriched = enrichDeliveryMission(mission);

  return {
    mission,
    displayMissionId: formatMissionDisplayId(mission),
    stageLabel: getStageLabel(status),
    status,
    statusLabel: MISSION_STATE_LABELS[status] ?? status,
    nextDestination: getNextDestination(mission, status),
    routeProgressIndex: getRouteProgressIndex(status),
    mapProgress: getVolunteerMapProgress(status),
    transportRequirements: getTransportRequirements(mission),
    routeStatus: getRouteDelayStatus(status),
    primaryAction: getPrimaryRouteAction(status),
    pickupLabel: enriched.donorName ?? "Pickup",
    ngoLabel: enriched.ngoName ?? "NGO",
    totalDistanceKm: enriched.journeyDistanceKm ?? "5.8",
  };
}
