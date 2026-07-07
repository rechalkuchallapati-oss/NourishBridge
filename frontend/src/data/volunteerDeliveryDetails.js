import { MISSION_STATES } from "./volunteerMission";
import { enrichPickupMission } from "./volunteerPickupDetails";

export const DELIVERY_PROGRESS_STEPS = [
  { id: "pickup_completed", label: "Pickup completed" },
  { id: "in_transit", label: "In transit" },
  { id: "arrived", label: "Arrived" },
  { id: "handover", label: "Handover" },
  { id: "completed", label: "Completed" },
];

export const DELIVERY_ISSUE_OPTIONS = [
  { id: "delay", label: "Delay" },
  { id: "vehicle", label: "Vehicle issue" },
  { id: "packaging", label: "Packaging damage" },
  { id: "food_concern", label: "Food concern" },
  { id: "ngo_contact", label: "Unable to contact NGO" },
];

const NGO_CONTACTS = {
  "Helping Hands Foundation": { person: "Anita Sharma", phone: "+91 98490 22110", verified: true },
  "Akshaya Patra Hyderabad": { person: "Dispatch Desk", phone: "+91 98765 11002", verified: true },
  "Robin Hood Army — Hyderabad": { person: "Zone Captain — Rahul", phone: "+91 91234 88001", verified: true },
  "Goonj Relief Centre": { person: "Receiving Officer", phone: "+91 99887 33445", verified: true },
  "No Food Waste Hyderabad": { person: "Volunteer Coordinator", phone: "+91 97001 55667", verified: true },
};

const STATUS_TO_PROGRESS_INDEX = {
  [MISSION_STATES.FOOD_COLLECTED]: 1,
  [MISSION_STATES.EN_ROUTE_TO_NGO]: 1,
  [MISSION_STATES.ARRIVED_AT_NGO]: 2,
  [MISSION_STATES.HANDOVER_CONFIRMED]: 3,
  [MISSION_STATES.COMPLETED]: 4,
};

export function getDeliveryProgressIndex(status) {
  if (!status) return -1;
  if (
    status === MISSION_STATES.PICKUP_VERIFIED ||
    status === MISSION_STATES.ARRIVED_AT_DONOR
  ) {
    return 0;
  }
  return STATUS_TO_PROGRESS_INDEX[status] ?? 0;
}

export function isDeliveryPhase(status) {
  const index = getDeliveryProgressIndex(status);
  return index >= 1 || status === MISSION_STATES.FOOD_COLLECTED;
}

function parseDeliveryDeadline(mission) {
  const base = mission.deliveryDeadline ?? mission.pickupDeadline ?? "8:00 PM";
  return base.startsWith("Deliver by") ? base : `Deliver by ${base}`;
}

/** Enrich active mission with delivery-page fields. */
export function enrichDeliveryMission(mission) {
  if (!mission) return null;

  const base = enrichPickupMission(mission);
  const ngoContact = NGO_CONTACTS[base.ngoName] ?? {
    person: "Receiving Coordinator",
    phone: "+91 98765 00000",
    verified: true,
  };

  return {
    ...base,
    collectedQuantity: mission.collectedQuantity ?? base.quantity ?? "—",
    ngoVerified: mission.ngoVerified ?? ngoContact.verified,
    ngoContactPerson: mission.ngoContactPerson ?? ngoContact.person,
    ngoContactPhone: mission.ngoContactPhone ?? ngoContact.phone,
    deliveryDistanceKm:
      mission.deliveryDistanceKm ??
      mission.journeyDistanceKm ??
      mission.pickupDistanceKm ??
      "—",
    deliveryEta: mission.deliveryEta ?? getDeliveryEta(mission.status),
    deliveryDeadline: parseDeliveryDeadline(mission),
    handlingUpright: mission.handlingUpright ?? "Keep hot boxes and chafer pans upright during transit",
    handlingTemperature:
      mission.handlingTemperature ??
      base.storageInstructions ??
      "Maintain safe temperature until NGO handover",
    deliveryStatusLabel: getDeliveryStatusLabel(mission.status),
  };
}

function getDeliveryEta(status) {
  const map = {
    [MISSION_STATES.FOOD_COLLECTED]: "18 min",
    [MISSION_STATES.EN_ROUTE_TO_NGO]: "12 min",
    [MISSION_STATES.ARRIVED_AT_NGO]: "At destination",
    [MISSION_STATES.HANDOVER_CONFIRMED]: "Handover in progress",
    [MISSION_STATES.COMPLETED]: "Delivered",
  };
  return map[status] ?? "15 min";
}

function getDeliveryStatusLabel(status) {
  const index = getDeliveryProgressIndex(status);
  if (index < 0) return "Awaiting pickup";
  if (index >= DELIVERY_PROGRESS_STEPS.length) return "Completed";
  return DELIVERY_PROGRESS_STEPS[Math.min(index, DELIVERY_PROGRESS_STEPS.length - 1)].label;
}
