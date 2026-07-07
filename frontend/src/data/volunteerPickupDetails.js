import { EVENT_TYPES } from "./shared/donationItems";
import { getPackagingLabel } from "./donationThumbnails";

const PICKUP_DEFAULTS_BY_EVENT = {
  restaurant: {
    urgency: "High",
    preparationTime: "Prepared 45 min ago · serve within 2 hrs",
    storageInstructions: "Keep hot boxes sealed · maintain above 60°C until handover",
    allergens: "May contain dairy, gluten, nuts (kitchen cross-contact)",
    contactPerson: "Duty Manager",
  },
  wedding: {
    urgency: "High",
    preparationTime: "Buffet cleared 30 min ago · consume within 90 min",
    storageInstructions: "Transport chafer pans upright · do not reopen sealed trays",
    allergens: "Contains dairy, nuts, shellfish possible in mixed buffet",
    contactPerson: "Event Coordinator",
  },
  individual: {
    urgency: "Medium",
    preparationTime: "Cooked 1 hr ago · home-packed tiffins",
    storageInstructions: "Keep containers level · refrigerate if delay exceeds 30 min",
    allergens: "Homemade — confirm with donor on request",
    contactPerson: "Donor",
  },
  festival: {
    urgency: "Medium",
    preparationTime: "Prasad prepared 2 hrs ago · festival surplus",
    storageInstructions: "Keep sweet boxes covered · separate from savoury trays",
    allergens: "May contain nuts, dairy, gluten",
    contactPerson: "Volunteer Lead",
  },
  party: {
    urgency: "Medium",
    preparationTime: "Party ended 20 min ago · platters boxed",
    storageInstructions: "Keep pizza boxes flat · chilled items in insulated bag",
    allergens: "Contains gluten, dairy, eggs — see item labels",
    contactPerson: "Office Admin",
  },
};

const DONOR_CONTACTS = {
  "Grand Biryani House": { person: "Rajesh Malhotra", phone: "+91 98480 11234" },
  "Iyer–Thomas Family": { person: "Priya Iyer", phone: "+91 98765 44321" },
  "Suresh Kommuri": { person: "Suresh Kommuri", phone: "+91 99887 66554" },
  "Ganesh Mandal Welfare Group": { person: "Venkat Rao", phone: "+91 91234 56789" },
  "CloudServe Technologies": { person: "HR — Meena K.", phone: "+91 90001 23456" },
  "Daily Bread Bakery": { person: "Store Manager", phone: "+91 97000 12345" },
  "Annapurna Mess": { person: "Counter Supervisor", phone: "+91 98888 77665" },
};

function parseDeadlineToday(deadlineLabel) {
  if (!deadlineLabel) return null;
  const match = String(deadlineLabel).match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/** Enrich active mission / pickup with fields needed on the Pickup page. */
export function enrichPickupMission(mission) {
  if (!mission) return null;

  const eventType = mission.eventType ?? "restaurant";
  const defaults = PICKUP_DEFAULTS_BY_EVENT[eventType] ?? PICKUP_DEFAULTS_BY_EVENT.restaurant;
  const contact = DONOR_CONTACTS[mission.donorName] ?? {
    person: defaults.contactPerson,
    phone: "+91 98765 00000",
  };
  const deadline = mission.collectBeforeDeadline ?? mission.pickupDeadline ?? "6:00 PM";
  const scheduled =
    mission.scheduledPickupTime ??
    mission.pickupAt ??
    `Today · ${deadline.replace(/^Pick before\s*/i, "")}`;

  return {
    ...mission,
    missionId: mission.missionId ?? mission.id ?? "MIS-PENDING",
    category: mission.category ?? EVENT_TYPES[eventType] ?? "Food Donation",
    urgency: mission.urgency ?? defaults.urgency,
    contactPerson: mission.contactPerson ?? contact.person,
    contactPhone: mission.contactPhone ?? contact.phone,
    pickupEta: mission.pickupEta ?? mission.eta ?? "12 min",
    scheduledPickupTime: scheduled,
    collectBeforeDeadline: deadline,
    deadlineAt: mission.deadlineAt ?? parseDeadlineToday(deadline)?.toISOString(),
    preparationTime: mission.preparationTime ?? defaults.preparationTime,
    packagingType: mission.packagingType ?? getPackagingLabel(mission) ?? "Standard sealed containers",
    storageInstructions: mission.storageInstructions ?? defaults.storageInstructions,
    allergens: mission.allergens ?? defaults.allergens,
    estimatedMeals: mission.estimatedMeals ?? mission.meals ?? "—",
    quantity: mission.quantity ?? "—",
  };
}

export function getCountdownParts(deadlineAt) {
  if (!deadlineAt) return null;
  const target = new Date(deadlineAt);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { expired: true, hours: 0, minutes: 0, seconds: 0, label: "Window passed" };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { expired: false, hours, minutes, seconds, label: "Time remaining" };
}
