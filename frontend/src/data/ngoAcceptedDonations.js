export const ACCEPTED_PIPELINE_STEPS = [
  { id: "accepted", label: "Accepted" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "picked_up", label: "Picked Up" },
  { id: "in_transit", label: "In Transit" },
  { id: "received_at_ngo", label: "Received at NGO" },
  { id: "quality_checked", label: "Quality Checked" },
  { id: "ready_for_distribution", label: "Ready for Distribution" },
];

export function getAcceptedStepIndex(status) {
  const index = ACCEPTED_PIPELINE_STEPS.findIndex((step) => step.id === status);
  return index >= 0 ? index : 0;
}

export const ACCEPTED_STATUS_LABELS = {
  accepted: "Accepted",
  volunteer_assigned: "Volunteer Assigned",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  received_at_ngo: "Received",
  quality_checked: "Quality Checked",
  ready_for_distribution: "Ready",
  completed: "Completed",
};

export const ACCEPTED_STATUS_COLORS = {
  accepted: "bg-[#DBEAFE] text-[#1D4ED8]",
  volunteer_assigned: "bg-[#E0E7FF] text-[#4338CA]",
  picked_up: "bg-[#FEF3C7] text-[#B45309]",
  in_transit: "bg-[#FFEDD5] text-[#C2410C]",
  received_at_ngo: "bg-[#DCFCE7] text-[#15803D]",
  quality_checked: "bg-[#F0FDF4] text-[#166534]",
  ready_for_distribution: "bg-[#BBF7D0] text-[#14532D]",
  completed: "bg-[#F1F5F9] text-[#64748B]",
};

export const ACCEPTED_QUICK_FILTERS = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "pending", label: "Pending" },
  { id: "in_transit", label: "In Transit" },
  { id: "ready", label: "Ready" },
  { id: "completed", label: "Completed" },
];

export const ACCEPTED_CATEGORY_OPTIONS = [
  { id: "all", label: "All Categories" },
  { id: "cooked_meals", label: "Cooked Meals" },
  { id: "biryani", label: "Biryani & Rice" },
  { id: "home_cooked", label: "Home-Cooked" },
  { id: "banquet", label: "Banquet & Hotel" },
  { id: "festival", label: "Festival Specials" },
];

export const ACCEPTED_DONATIONS = [
  {
    id: "DON-2034",
    donor: "Paradise Biryani",
    donorPhone: "+91 98765 22100",
    foodItem: "Veg Biryani",
    quantity: "35 kg",
    volunteer: "Rahul",
    volunteerPhone: "+91 91234 56789",
    volunteerVehicle: "Scooter · KA 01 AB 1234",
    eta: "15 min",
    receivedTime: "—",
    status: "in_transit",
    category: "biryani",
    dateKey: "today",
    eventType: "restaurant",
    thumbnailKey: "veg_biryani",
    preparationTime: "Today, 12:30 PM",
    shelfLife: "Today, 6:00 PM",
    temperature: "68°C · Hot holding",
    estimatedMeals: 95,
    specialInstructions: "Keep sealed in hot boxes; do not mix with cold items.",
    pickupLocation: "Paradise Biryani, Secunderabad",
    liveTracking: { label: "Near Rasoolpura Metro", updatedAt: "1 min ago" },
    timeline: [
      { step: "accepted", time: "Today, 11:00 AM" },
      { step: "volunteer_assigned", time: "Today, 11:20 AM" },
      { step: "picked_up", time: "Today, 12:45 PM" },
      { step: "in_transit", time: "Live" },
    ],
  },
  {
    id: "DON-2028",
    donor: "Hotel Grand Palace",
    donorPhone: "+91 99887 76655",
    foodItem: "Paneer Butter Masala",
    quantity: "18 kg",
    volunteer: "Priya Sharma",
    volunteerPhone: "+91 97654 32109",
    volunteerVehicle: "Car · KA 03 CD 5678",
    eta: "—",
    receivedTime: "Today, 1:10 PM",
    status: "quality_checked",
    category: "cooked_meals",
    dateKey: "today",
    eventType: "hotel",
    thumbnailKey: "hotel_banquet",
    preparationTime: "Today, 11:00 AM",
    shelfLife: "Today, 4:00 PM",
    temperature: "4°C · Cold chain verified",
    estimatedMeals: 52,
    specialInstructions: "Refrigerate immediately upon receipt.",
    pickupLocation: "Hotel Grand Palace, Banjara Hills",
    liveTracking: null,
    timeline: [
      { step: "accepted", time: "Today, 9:30 AM" },
      { step: "volunteer_assigned", time: "Today, 9:45 AM" },
      { step: "picked_up", time: "Today, 10:30 AM" },
      { step: "in_transit", time: "Today, 10:50 AM" },
      { step: "received_at_ngo", time: "Today, 11:15 AM" },
      { step: "quality_checked", time: "Today, 1:10 PM" },
    ],
  },
  {
    id: "DON-2021",
    donor: "Biryani Mahal",
    donorPhone: "+91 94444 55667",
    foodItem: "Chicken Dum Biryani",
    quantity: "30 kg",
    volunteer: "—",
    volunteerPhone: null,
    volunteerVehicle: null,
    eta: "—",
    receivedTime: "—",
    status: "accepted",
    category: "biryani",
    dateKey: "today",
    eventType: "restaurant",
    thumbnailKey: "restaurant_biryani_bulk",
    preparationTime: "Today, 2:00 PM",
    shelfLife: "Today, 7:00 PM",
    temperature: "Hot holding required",
    estimatedMeals: 82,
    specialInstructions: "Assign volunteer before 1:30 PM pickup window.",
    pickupLocation: "Biryani Mahal, Commercial Street",
    liveTracking: null,
    timeline: [{ step: "accepted", time: "Today, 10:15 AM" }],
  },
  {
    id: "DON-2019",
    donor: "Mrs. Lakshmi Narayan",
    donorPhone: "+91 91234 98765",
    foodItem: "Sambar Rice & Curd Rice",
    quantity: "9 kg",
    volunteer: "Ankit Desai",
    volunteerPhone: "+91 98765 44332",
    volunteerVehicle: "Bike · KA 05 EF 9012",
    eta: "—",
    receivedTime: "—",
    status: "volunteer_assigned",
    category: "home_cooked",
    dateKey: "today",
    eventType: "individual",
    thumbnailKey: "individual_rice_sambar",
    preparationTime: "Today, 11:00 AM",
    shelfLife: "Today, 2:00 PM",
    temperature: "Reheat above 74°C",
    estimatedMeals: 22,
    specialInstructions: "Separate curd rice from hot sambar rice.",
    pickupLocation: "Jayanagar 9th Block",
    liveTracking: null,
    timeline: [
      { step: "accepted", time: "Today, 8:00 AM" },
      { step: "volunteer_assigned", time: "Today, 8:30 AM" },
    ],
  },
  {
    id: "DON-2015",
    donor: "Verma Family Events",
    donorPhone: "+91 99000 11223",
    foodItem: "Wedding Banquet Surplus",
    quantity: "150 kg",
    volunteer: "Ravi Kumar",
    volunteerPhone: "+91 91234 55678",
    volunteerVehicle: "Van · KA 02 GH 3456",
    eta: "32 min",
    receivedTime: "—",
    status: "picked_up",
    category: "banquet",
    dateKey: "today",
    eventType: "wedding",
    thumbnailKey: "wedding_buffet",
    preparationTime: "Today, 10:00 PM",
    shelfLife: "Today, 11:45 PM",
    temperature: "Mixed hot/cold — segregate on arrival",
    estimatedMeals: 340,
    specialInstructions: "Large bulk delivery — prepare unloading bay.",
    pickupLocation: "Taj West End Lawn, Bengaluru",
    liveTracking: { label: "Leaving pickup venue", updatedAt: "4 mins ago" },
    timeline: [
      { step: "accepted", time: "Today, 7:20 PM" },
      { step: "volunteer_assigned", time: "Today, 7:35 PM" },
      { step: "picked_up", time: "Today, 9:15 PM" },
    ],
  },
  {
    id: "DON-2010",
    donor: "Tamil Sangam Cultural Trust",
    donorPhone: "+91 98888 77665",
    foodItem: "Pongal Festival Spread",
    quantity: "90 kg",
    volunteer: "Meera Joshi",
    volunteerPhone: "+91 91234 66789",
    volunteerVehicle: "Car · KA 04 IJ 7890",
    eta: "—",
    receivedTime: "Today, 12:30 PM",
    status: "received_at_ngo",
    category: "festival",
    dateKey: "today",
    eventType: "festival",
    thumbnailKey: "pongal_feast",
    preparationTime: "Today, 1:00 PM",
    shelfLife: "Today, 5:00 PM",
    temperature: "62°C · Hot vats",
    estimatedMeals: 210,
    specialInstructions: "Queue for quality inspection in Bay 2.",
    pickupLocation: "Kanteerava Stadium Grounds",
    liveTracking: null,
    timeline: [
      { step: "accepted", time: "Today, 10:30 AM" },
      { step: "volunteer_assigned", time: "Today, 10:45 AM" },
      { step: "picked_up", time: "Today, 11:30 AM" },
      { step: "in_transit", time: "Today, 11:55 AM" },
      { step: "received_at_ngo", time: "Today, 12:30 PM" },
    ],
  },
  {
    id: "DON-2005",
    donor: "ITC Gardenia Bengaluru",
    donorPhone: "+91 80222 33445",
    foodItem: "Hotel Banquet Roll-ins",
    quantity: "120 kg",
    volunteer: "Sneha Reddy",
    volunteerPhone: "+91 98765 88990",
    volunteerVehicle: "Van · KA 06 KL 1122",
    eta: "—",
    receivedTime: "Today, 11:00 AM",
    status: "ready_for_distribution",
    category: "banquet",
    dateKey: "today",
    eventType: "hotel",
    thumbnailKey: "hotel_banquet",
    preparationTime: "Today, 9:00 PM",
    shelfLife: "Today, 11:00 PM",
    temperature: "Verified · Segregated storage",
    estimatedMeals: 265,
    specialInstructions: "Approved for evening shelter distribution.",
    pickupLocation: "ITC Gardenia, Residency Road",
    liveTracking: null,
    timeline: [
      { step: "accepted", time: "Today, 6:50 AM" },
      { step: "volunteer_assigned", time: "Today, 7:10 AM" },
      { step: "picked_up", time: "Today, 8:30 AM" },
      { step: "in_transit", time: "Today, 8:55 AM" },
      { step: "received_at_ngo", time: "Today, 9:40 AM" },
      { step: "quality_checked", time: "Today, 10:20 AM" },
      { step: "ready_for_distribution", time: "Today, 11:00 AM" },
    ],
  },
  {
    id: "DON-1998",
    donor: "St. Joseph's Parish Council",
    donorPhone: "+91 97777 88990",
    foodItem: "Christmas Dinner Trays",
    quantity: "80 kg",
    volunteer: "Rahul Mehta",
    volunteerPhone: "+91 98765 43210",
    volunteerVehicle: "Car · KA 03 CD 5678",
    eta: "—",
    receivedTime: "Yesterday, 8:45 PM",
    status: "completed",
    category: "cooked_meals",
    dateKey: "today",
    eventType: "christmas",
    thumbnailKey: "christmas_feast",
    preparationTime: "Yesterday, 7:30 PM",
    shelfLife: "Yesterday, 10:00 PM",
    temperature: "Archived",
    estimatedMeals: 175,
    specialInstructions: "Fully distributed to beneficiaries.",
    pickupLocation: "St. Joseph's Church Hall",
    liveTracking: null,
    timeline: [
      { step: "accepted", time: "Yesterday, 5:40 AM" },
      { step: "volunteer_assigned", time: "Yesterday, 6:00 AM" },
      { step: "picked_up", time: "Yesterday, 7:45 PM" },
      { step: "in_transit", time: "Yesterday, 8:10 PM" },
      { step: "received_at_ngo", time: "Yesterday, 8:45 PM" },
      { step: "quality_checked", time: "Yesterday, 9:00 PM" },
      { step: "ready_for_distribution", time: "Yesterday, 9:15 PM" },
    ],
  },
];

const AWAITING_PICKUP = ["accepted", "volunteer_assigned"];
const IN_TRANSIT = ["picked_up", "in_transit"];
const RECEIVED = ["received_at_ngo", "quality_checked"];
const READY = ["ready_for_distribution"];

export function computeAcceptedDonationStats(donations) {
  const todayDonations = donations.filter((d) => d.dateKey === "today" && d.status !== "completed");
  return {
    acceptedToday: todayDonations.length + donations.filter((d) => d.status === "completed" && d.dateKey === "today").length,
    awaitingPickup: donations.filter((d) => AWAITING_PICKUP.includes(d.status)).length,
    inTransit: donations.filter((d) => IN_TRANSIT.includes(d.status)).length,
    received: donations.filter((d) => RECEIVED.includes(d.status)).length,
    readyForDistribution: donations.filter((d) => READY.includes(d.status)).length,
  };
}

/** Dashboard headline stats matching operations scale. */
export const ACCEPTED_OVERVIEW_STATS = {
  acceptedToday: 34,
  awaitingPickup: 8,
  inTransit: 12,
  received: 10,
  readyForDistribution: 4,
};

export function filterAcceptedDonations(donations, filters) {
  return donations.filter((donation) => {
    if (filters.quick === "today" && donation.dateKey !== "today") return false;
    if (filters.quick === "pending" && !AWAITING_PICKUP.includes(donation.status)) return false;
    if (filters.quick === "in_transit" && !IN_TRANSIT.includes(donation.status)) return false;
    if (filters.quick === "ready" && !READY.includes(donation.status)) return false;
    if (filters.quick === "completed" && donation.status !== "completed") return false;
    if (filters.category !== "all" && donation.category !== filters.category) return false;
    return true;
  });
}

export function getAcceptedDonationById(id) {
  return ACCEPTED_DONATIONS.find((d) => d.id === id) ?? null;
}
