export const DISTRIBUTION_PIPELINE_STEPS = [
  { id: "ready", label: "Ready" },
  { id: "packing", label: "Packing" },
  { id: "out_for_distribution", label: "Out For Distribution" },
  { id: "serving", label: "Serving" },
  { id: "completed", label: "Completed" },
];

export function getDistributionStepIndex(status) {
  const index = DISTRIBUTION_PIPELINE_STEPS.findIndex((step) => step.id === status);
  return index >= 0 ? index : 0;
}

export const DISTRIBUTION_STATUS_LABELS = {
  ready: "Ready",
  packing: "Packing",
  out_for_distribution: "Out For Distribution",
  serving: "Serving",
  scheduled: "Scheduled",
  completed: "Completed",
};

export const DISTRIBUTION_STATUS_COLORS = {
  ready: "bg-[#DBEAFE] text-[#1D4ED8]",
  packing: "bg-[#FEF3C7] text-[#B45309]",
  out_for_distribution: "bg-[#FFEDD5] text-[#C2410C]",
  serving: "bg-[#E0E7FF] text-[#4338CA]",
  scheduled: "bg-[#F1F5F9] text-[#475569]",
  completed: "bg-[#DCFCE7] text-[#15803D]",
};

export const DISTRIBUTION_OVERVIEW_STATS = {
  mealsDistributed: 1240,
  remainingInventory: 380,
  familiesServed: 186,
  communitiesCovered: 8,
  distributionEvents: 12,
  todaysBeneficiaries: 375,
};

export const BENEFICIARY_LOCATIONS = [
  { id: "hope_shelter", name: "Hope Shelter", people: 120 },
  { id: "children_home", name: "Children Home", people: 60 },
  { id: "old_age_home", name: "Old Age Home", people: 45 },
  { id: "community_kitchen", name: "Community Kitchen", people: 150 },
];

export const DISTRIBUTION_MAP_STOPS = [
  { id: "ngo", label: "NGO", type: "origin" },
  { id: "hope_shelter", label: "Hope Shelter", type: "stop" },
  { id: "old_age_home", label: "Old Age Home", type: "stop" },
  { id: "community_kitchen", label: "Community Kitchen", type: "stop" },
  { id: "families", label: "Families", type: "destination" },
];

export const DISTRIBUTION_SUMMARY = {
  mealsPlanned: 620,
  mealsDistributed: 440,
  mealsRemaining: 180,
  foodWasted: 12,
  peopleServed: 375,
};

export const DISTRIBUTION_QUEUE = [
  {
    id: "BAT-2045",
    food: "Veg Biryani",
    meals: 180,
    destination: "Hope Shelter",
    destinationKey: "hope_shelter",
    distributionTime: "4 PM",
    volunteer: "Rahul",
    volunteerPhone: "+91 91234 56789",
    vehicle: "Van · KA 02 GH 3456",
    status: "scheduled",
    eventType: "restaurant",
    thumbnailKey: "veg_biryani",
    preparedTime: "Today, 2:30 PM",
    distributionDeadline: "Today, 6:00 PM",
    remainingQuantity: "180 meals",
    departureTime: "3:45 PM",
    arrivalTime: "—",
    timeline: [{ step: "ready", time: "Today, 2:45 PM" }],
  },
  {
    id: "BAT-2042",
    food: "Sambar Rice & Curd Rice",
    meals: 95,
    destination: "Children Home",
    destinationKey: "children_home",
    distributionTime: "3 PM",
    volunteer: "Priya Sharma",
    volunteerPhone: "+91 97654 32109",
    vehicle: "Car · KA 03 CD 5678",
    status: "packing",
    eventType: "individual",
    thumbnailKey: "individual_rice_sambar",
    preparedTime: "Today, 12:00 PM",
    distributionDeadline: "Today, 4:00 PM",
    remainingQuantity: "95 meals",
    departureTime: "2:30 PM",
    arrivalTime: "—",
    timeline: [
      { step: "ready", time: "Today, 12:30 PM" },
      { step: "packing", time: "Today, 2:00 PM" },
    ],
  },
  {
    id: "BAT-2038",
    food: "Paneer Butter Masala & Naan",
    meals: 120,
    destination: "Old Age Home",
    destinationKey: "old_age_home",
    distributionTime: "2 PM",
    volunteer: "Ankit Desai",
    volunteerPhone: "+91 98765 44332",
    vehicle: "Scooter · KA 05 EF 9012",
    status: "out_for_distribution",
    eventType: "hotel",
    thumbnailKey: "hotel_banquet",
    preparedTime: "Today, 11:00 AM",
    distributionDeadline: "Today, 3:30 PM",
    remainingQuantity: "120 meals",
    departureTime: "1:30 PM",
    arrivalTime: "—",
    timeline: [
      { step: "ready", time: "Today, 11:15 AM" },
      { step: "packing", time: "Today, 12:00 PM" },
      { step: "out_for_distribution", time: "Today, 1:35 PM" },
    ],
  },
  {
    id: "BAT-2035",
    food: "Pongal Festival Spread",
    meals: 210,
    destination: "Community Kitchen",
    destinationKey: "community_kitchen",
    distributionTime: "1 PM",
    volunteer: "Meera Joshi",
    volunteerPhone: "+91 91234 66789",
    vehicle: "Van · KA 06 KL 1122",
    status: "serving",
    eventType: "festival",
    thumbnailKey: "pongal_feast",
    preparedTime: "Today, 10:00 AM",
    distributionDeadline: "Today, 2:00 PM",
    remainingQuantity: "45 meals",
    departureTime: "12:15 PM",
    arrivalTime: "12:45 PM",
    timeline: [
      { step: "ready", time: "Today, 10:30 AM" },
      { step: "packing", time: "Today, 11:00 AM" },
      { step: "out_for_distribution", time: "Today, 12:20 PM" },
      { step: "serving", time: "Today, 12:50 PM" },
    ],
  },
  {
    id: "BAT-2030",
    food: "Wedding Banquet Surplus",
    meals: 340,
    destination: "Hope Shelter",
    destinationKey: "hope_shelter",
    distributionTime: "Yesterday, 8 PM",
    volunteer: "Ravi Kumar",
    volunteerPhone: "+91 91234 55678",
    vehicle: "Van · KA 02 GH 3456",
    status: "completed",
    eventType: "wedding",
    thumbnailKey: "wedding_buffet",
    preparedTime: "Yesterday, 6:00 PM",
    distributionDeadline: "Yesterday, 10:00 PM",
    remainingQuantity: "0 meals",
    departureTime: "Yesterday, 7:30 PM",
    arrivalTime: "Yesterday, 8:05 PM",
    completionTime: "Yesterday, 9:15 PM",
    beneficiaryCount: 118,
    proofNotes: "Full distribution completed. 118 beneficiaries served at Hope Shelter.",
    hasProofPhoto: true,
    timeline: [
      { step: "ready", time: "Yesterday, 6:30 PM" },
      { step: "packing", time: "Yesterday, 7:00 PM" },
      { step: "out_for_distribution", time: "Yesterday, 7:35 PM" },
      { step: "serving", time: "Yesterday, 8:10 PM" },
      { step: "completed", time: "Yesterday, 9:15 PM" },
    ],
  },
];

export const FOOD_BATCHES = DISTRIBUTION_QUEUE.map((batch) => ({
  batchNo: batch.id,
  foodType: batch.food,
  preparedTime: batch.preparedTime,
  distributionDeadline: batch.distributionDeadline,
  remainingQuantity: batch.remainingQuantity,
}));

export const VOLUNTEER_ASSIGNMENTS = DISTRIBUTION_QUEUE.filter(
  (b) => b.status !== "completed",
).map((batch) => ({
  id: batch.id,
  volunteer: batch.volunteer,
  vehicle: batch.vehicle,
  destination: batch.destination,
  departureTime: batch.departureTime,
  arrivalTime: batch.arrivalTime,
  status: DISTRIBUTION_STATUS_LABELS[batch.status] ?? batch.status,
}));

export function filterDistributionQueue(batches, filters) {
  return batches.filter((batch) => {
    if (filters.status !== "all" && batch.status !== filters.status) return false;
    if (filters.destination !== "all" && batch.destinationKey !== filters.destination) return false;
    return true;
  });
}

export function getDistributionBatchById(id) {
  return DISTRIBUTION_QUEUE.find((b) => b.id === id) ?? null;
}

export const DISTRIBUTION_DESTINATION_OPTIONS = [
  { id: "all", label: "All Destinations" },
  ...BENEFICIARY_LOCATIONS.map((loc) => ({ id: loc.id, label: loc.name })),
];

export const DISTRIBUTION_STATUS_OPTIONS = [
  { id: "all", label: "All Statuses" },
  ...DISTRIBUTION_PIPELINE_STEPS.map((step) => ({ id: step.id, label: step.label })),
  { id: "scheduled", label: "Scheduled" },
];
