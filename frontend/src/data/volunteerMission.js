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
  [MISSION_STATES.COMPLETED]: "Completed",
};

/** Primary action for each state — only ONE button shown at a time. */
export const MISSION_STATE_ACTIONS = {
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
  mealsDelivered: 180,
  impactPoints: 1240,
};

export const VOLUNTEER_IMPACT = {
  missionsCompleted: 48,
  mealsDelivered: 1860,
  foodRescuedKg: 426,
  peopleSupported: 720,
  onTimeDeliveryRate: 96,
};

export const MONTHLY_MISSIONS_TREND = [
  { month: "Feb", missions: 5 },
  { month: "Mar", missions: 7 },
  { month: "Apr", missions: 6 },
  { month: "May", missions: 9 },
  { month: "Jun", missions: 8 },
  { month: "Jul", missions: 13 },
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

export const AVAILABLE_PICKUP_REQUESTS = [
  {
    id: "PKP-001",
    foodKey: "VL-FOOD-001",
    foodName: "Veg Biryani",
    quantity: "25 kg",
    estimatedMeals: 125,
    donorName: "Hotel Grand Stay",
    pickupAddress: "Madhapur, Hyderabad",
    pickupDistanceKm: 2.4,
    ngoName: "Helping Hands Foundation",
    ngoAddress: "Kondapur, Hyderabad",
    pickupDeadline: "4:30 PM",
    journeyDistanceKm: 7.8,
  },
  {
    id: "PKP-002",
    foodKey: "VL-FOOD-002",
    foodName: "Corporate Lunch Trays",
    quantity: "40 trays",
    estimatedMeals: 80,
    donorName: "Tech Conference Center",
    pickupAddress: "HITEC City, Hyderabad",
    pickupDistanceKm: 3.1,
    ngoName: "Helping Hands Foundation",
    ngoAddress: "Kondapur, Hyderabad",
    pickupDeadline: "5:00 PM",
    journeyDistanceKm: 9.2,
  },
  {
    id: "PKP-003",
    foodKey: "VL-FOOD-003",
    foodName: "Fresh Fruit Boxes",
    quantity: "30 boxes",
    estimatedMeals: 60,
    donorName: "Green Valley Banquet",
    pickupAddress: "Jubilee Hills, Hyderabad",
    pickupDistanceKm: 4.5,
    ngoName: "Helping Hands Foundation",
    ngoAddress: "Kondapur, Hyderabad",
    pickupDeadline: "3:45 PM",
    journeyDistanceKm: 11.0,
  },
];

export const TODAYS_SCHEDULE = [
  { id: "SCH-1", time: "2:00 PM", title: "Pickup — Hotel Grand Stay", status: "upcoming" },
  { id: "SCH-2", time: "4:30 PM", title: "Delivery — Helping Hands Foundation", status: "upcoming" },
  { id: "SCH-3", time: "6:00 PM", title: "Pickup — Community Kitchen", status: "scheduled" },
];

export const RECENT_MISSIONS = [
  {
    id: "MIS-041",
    foodName: "Idli & Sambar",
    donor: "South Indian Tiffin House",
    ngo: "Helping Hands Foundation",
    meals: 90,
    completedAt: "Today, 11:30 AM",
    status: "completed",
  },
  {
    id: "MIS-040",
    foodName: "Bread & Sandwiches",
    donor: "Daily Bread Café",
    ngo: "Helping Hands Foundation",
    meals: 45,
    completedAt: "Today, 9:15 AM",
    status: "completed",
  },
  {
    id: "MIS-039",
    foodName: "Rice & Curry",
    donor: "Rajesh Kumar",
    ngo: "Helping Hands Foundation",
    meals: 55,
    completedAt: "Yesterday, 7:50 PM",
    status: "completed",
  },
];

export const UPCOMING_MISSIONS = [
  {
    id: "MIS-042",
    foodName: "Paneer Tikka Meals",
    pickup: "Tomorrow, 12:00 PM",
    ngo: "Helping Hands Foundation",
    status: "assigned",
  },
];

export function getMissionEta(status) {
  const map = {
    [MISSION_STATES.EN_ROUTE_TO_DONOR]: "12 minutes",
    [MISSION_STATES.EN_ROUTE_TO_NGO]: "18 minutes",
    [MISSION_STATES.ARRIVED_AT_DONOR]: "At pickup location",
    [MISSION_STATES.ARRIVED_AT_NGO]: "At NGO centre",
  };
  return map[status] ?? null;
}
