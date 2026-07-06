export const MISSION_STATES = {
  ASSIGNED: "assigned",
  ACCEPTED: "accepted",
  EN_ROUTE_TO_DONOR: "en_route_to_donor",
  ARRIVED_AT_DONOR: "arrived_at_donor",
  PICKUP_VERIFIED: "pickup_verified",
  FOOD_COLLECTED: "food_collected",
  EN_ROUTE_TO_NGO: "en_route_to_ngo",
  ARRIVED_AT_NGO: "arrived_at_ngo",
  HANDOVER_CONFIRMED: "handover_confirmed",
  COMPLETED: "completed",
};

export const MISSION_STATE_LABELS = {
  [MISSION_STATES.ASSIGNED]: "Assigned",
  [MISSION_STATES.ACCEPTED]: "Accepted",
  [MISSION_STATES.EN_ROUTE_TO_DONOR]: "En Route to Donor",
  [MISSION_STATES.ARRIVED_AT_DONOR]: "Arrived at Donor",
  [MISSION_STATES.PICKUP_VERIFIED]: "Pickup Verified",
  [MISSION_STATES.FOOD_COLLECTED]: "Food Collected",
  [MISSION_STATES.EN_ROUTE_TO_NGO]: "En Route to NGO",
  [MISSION_STATES.ARRIVED_AT_NGO]: "Arrived at NGO",
  [MISSION_STATES.HANDOVER_CONFIRMED]: "Handover Confirmed",
  [MISSION_STATES.COMPLETED]: "Mission Accomplished",
};

export const MISSION_FLOW_STEPS = [
  { key: MISSION_STATES.ASSIGNED, label: "Assigned" },
  { key: MISSION_STATES.ACCEPTED, label: "Accepted" },
  { key: MISSION_STATES.EN_ROUTE_TO_DONOR, label: "En Route to Donor" },
  { key: MISSION_STATES.ARRIVED_AT_DONOR, label: "Arrived at Donor" },
  { key: MISSION_STATES.PICKUP_VERIFIED, label: "Pickup Verified" },
  { key: MISSION_STATES.FOOD_COLLECTED, label: "Food Collected" },
  { key: MISSION_STATES.EN_ROUTE_TO_NGO, label: "En Route to NGO" },
  { key: MISSION_STATES.ARRIVED_AT_NGO, label: "Arrived at NGO" },
  { key: MISSION_STATES.HANDOVER_CONFIRMED, label: "Handover Confirmed" },
  { key: MISSION_STATES.COMPLETED, label: "Mission Accomplished" },
];

/** Primary action for each state — only ONE button shown at a time. */
export const MISSION_STATE_ACTIONS = {
  [MISSION_STATES.ASSIGNED]: {
    label: "Confirm Acceptance",
    next: MISSION_STATES.ACCEPTED,
    type: "advance",
  },
  [MISSION_STATES.ACCEPTED]: {
    label: "Start Route to Donor",
    next: MISSION_STATES.EN_ROUTE_TO_DONOR,
    type: "advance",
  },
  [MISSION_STATES.EN_ROUTE_TO_DONOR]: {
    label: "I've Arrived",
    next: MISSION_STATES.ARRIVED_AT_DONOR,
    type: "advance",
  },
  [MISSION_STATES.ARRIVED_AT_DONOR]: {
    label: "Verify Pickup",
    next: MISSION_STATES.PICKUP_VERIFIED,
    type: "navigate",
    to: "/dashboard/volunteer/pickup-verify",
  },
  [MISSION_STATES.PICKUP_VERIFIED]: {
    label: "Confirm Collection",
    next: MISSION_STATES.FOOD_COLLECTED,
    type: "advance",
  },
  [MISSION_STATES.FOOD_COLLECTED]: {
    label: "Start Route to NGO",
    next: MISSION_STATES.EN_ROUTE_TO_NGO,
    type: "advance",
  },
  [MISSION_STATES.EN_ROUTE_TO_NGO]: {
    label: "Arrived at NGO",
    next: MISSION_STATES.ARRIVED_AT_NGO,
    type: "advance",
  },
  [MISSION_STATES.ARRIVED_AT_NGO]: {
    label: "Confirm Handover",
    next: MISSION_STATES.HANDOVER_CONFIRMED,
    type: "navigate",
    to: "/dashboard/volunteer/delivery-verify",
  },
  [MISSION_STATES.HANDOVER_CONFIRMED]: {
    label: "Complete Mission",
    next: MISSION_STATES.COMPLETED,
    type: "advance",
  },
};

export const VOLUNTEER_OVERVIEW_STATS = {
  availablePickups: 6,
  activeMission: 1,
  completedToday: 2,
  mealsDelivered: 1725,
  impactPoints: 2180,
};

export const VOLUNTEER_IMPACT = {
  missionsCompleted: 47,
  mealsDelivered: 1725,
  foodRescuedKg: 418,
  peopleSupported: 638,
  onTimeDeliveryRate: 97,
};

export const MONTHLY_MISSIONS_TREND = [
  { month: "Feb", missions: 4 },
  { month: "Mar", missions: 6 },
  { month: "Apr", missions: 5 },
  { month: "May", missions: 8 },
  { month: "Jun", missions: 9 },
  { month: "Jul", missions: 15 },
];

export const IMPACT_MILESTONES = [
  {
    id: "starter",
    title: "Food Rescue Starter",
    threshold: 25,
    description: "Completed 25 rescue missions",
  },
  {
    id: "hero",
    title: "Community Hero",
    threshold: 50,
    description: "Completed 50 rescue missions",
  },
  {
    id: "champion",
    title: "Impact Champion",
    threshold: 100,
    description: "Completed 100 rescue missions",
  },
];

export const PICKUP_VERIFICATION_CHECKLIST = [
  { id: "packaging", label: "Packaging properly sealed" },
  { id: "spoilage", label: "No visible spoilage" },
  { id: "quantity", label: "Quantity matches donation listing" },
  { id: "timeWindow", label: "Food collected within safe time window" },
  { id: "storage", label: "Storage instructions received" },
];

export {
  AVAILABLE_PICKUP_REQUESTS,
  EXTRA_PICKUP_REQUESTS,
  TODAYS_SCHEDULE,
  FULL_SCHEDULE,
  RECENT_MISSIONS,
  UPCOMING_MISSIONS,
} from "./volunteerMissionPickups";

export const VOLUNTEER_WORK_QUALITY = [
  {
    id: "on_time",
    label: "On-Time Delivery",
    value: "97%",
    description: "Consistently reaches pickup and NGO handover windows.",
    accent: "green",
  },
  {
    id: "communication",
    label: "Proper Communication",
    value: "94%",
    description: "Clear updates with donors, NGOs, and dispatch.",
    accent: "blue",
  },
  {
    id: "safe_handling",
    label: "Safe Food Handling",
    value: "96%",
    description: "Follows hygiene and temperature safety at every step.",
    accent: "amber",
  },
  {
    id: "coordination",
    label: "Donor Coordination",
    value: "92%",
    description: "Smooth pickup coordination and verification checks.",
    accent: "purple",
  },
];

export const VOLUNTEER_CHAMPION_MILESTONE = {
  title: "Impact Champion",
  current: 80,
  target: 100,
  description: "Complete 100 missions to unlock the champion logo on your profile.",
};

export function getMissionEta(status) {
  const map = {
    [MISSION_STATES.EN_ROUTE_TO_DONOR]: "12 minutes",
    [MISSION_STATES.EN_ROUTE_TO_NGO]: "18 minutes",
    [MISSION_STATES.ARRIVED_AT_DONOR]: "At pickup location",
    [MISSION_STATES.ARRIVED_AT_NGO]: "At NGO centre",
  };
  return map[status] ?? null;
}
