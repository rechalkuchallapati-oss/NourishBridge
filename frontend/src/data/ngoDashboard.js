export const NGO_OVERVIEW_METRICS = [
  {
    id: "incoming",
    label: "Incoming Donations",
    value: "8",
    caption: "Need your action",
    accent: "amber",
  },
  {
    id: "active_deliveries",
    label: "Active Deliveries",
    value: "3",
    caption: "In progress",
    accent: "blue",
  },
  {
    id: "food_received",
    label: "Food Received",
    value: "1,580 kg",
    caption: "This month",
    accent: "green",
  },
  {
    id: "meals_distributed",
    label: "Meals Distributed",
    value: "3,850",
    caption: "Estimated meals served",
    accent: "purple",
  },
  {
    id: "people_supported",
    label: "People Supported",
    value: "2,140",
    caption: "Beneficiaries reached",
    accent: "slate",
  },
  {
    id: "food_saved",
    label: "Food Saved",
    value: "980 kg",
    caption: "Rescued from waste",
    accent: "green",
  },
];

export const NGO_RECENT_ACTIVITY = [
  {
    id: "ACT-001",
    type: "donation_accepted",
    title: "Donation accepted",
    description: "Wedding Feast · 9 items (DN-2401) from Mehta Family Events",
    time: "12 minutes ago",
    status: "success",
  },
  {
    id: "ACT-002",
    type: "delivery_completed",
    title: "Delivery completed",
    description: "Corporate Lunch · 4 items (DN-2375) received at Indiranagar centre",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: "ACT-003",
    type: "volunteer_assigned",
    title: "Volunteer assigned",
    description: "Rahul Mehta assigned to wedding feast pickup DN-2401",
    time: "2 hours ago",
    status: "info",
  },
  {
    id: "ACT-004",
    type: "new_donation",
    title: "New donation request",
    description: "Restaurant Surplus · 7 items (DN-2395) from Spice Route awaiting review",
    time: "3 hours ago",
    status: "pending",
  },
  {
    id: "ACT-005",
    type: "distribution",
    title: "Meals distributed",
    description: "~165 meals from Christmas Feast served at Richmond Town shelter",
    time: "Yesterday, 7:45 PM",
    status: "success",
  },
];

export const NGO_UPCOMING_DELIVERIES = [
  {
    id: "DEL-001",
    donationId: "DN-2401",
    eventType: "wedding",
    food: "Wedding Feast · 9 items",
    donor: "Mehta Family Events",
    quantity: "9 item types · ~320 servings",
    volunteer: "Rahul Mehta",
    eta: "Today, 6:45 PM",
    status: "in_transit",
    statusLabel: "In transit",
  },
  {
    id: "DEL-002",
    donationId: "DN-2398",
    eventType: "individual",
    food: "Homemade Pasta & Garlic Bread",
    donor: "Priya Deshmukh",
    quantity: "2 item types · ~24 servings",
    volunteer: "Priya Sharma",
    eta: "Today, 8:15 PM",
    status: "scheduled",
    statusLabel: "Scheduled",
  },
  {
    id: "DEL-003",
    donationId: "DN-2388",
    eventType: "ramzan",
    food: "Ramzan Iftar · 6 items",
    donor: "Masjid-e-Noor Welfare Committee",
    quantity: "6 item types · ~280 servings",
    volunteer: "Awaiting assignment",
    eta: "Tomorrow, 9:30 AM",
    status: "pending",
    statusLabel: "Pending pickup",
  },
];

import { enrichDonationRecord } from "./shared/donationItems";

const RAW_OVERVIEW_INCOMING = [
  {
    id: "NGO-INC-001",
    eventType: "wedding",
    foodKey: "NGO-INC-001",
    foodName: "Wedding Feast · 8 items",
    event: "Sharma–Reddy Wedding Reception",
    eventLocation: "Leela Palace, Begumpet, Hyderabad",
    quantity: "8 item types",
    items: [
      { name: "Lucknowi Mutton Biryani", quantity: "42 kg", cuisine: "Indian" },
      { name: "Veg Dum Biryani", quantity: "28 kg", cuisine: "Indian" },
      { name: "Chicken 65 & Gobi Manchurian", quantity: "16 kg", cuisine: "Indo-Chinese" },
      { name: "Jalebi & Rabri", quantity: "110 portions", cuisine: "Desserts" },
    ],
    pickup: "Today, 7:00 PM",
    estimatedMeals: 285,
    timeRemaining: "3h 20m",
    donor: "Sharma Family Events",
    verifiedDonor: true,
  },
  {
    id: "NGO-INC-002",
    eventType: "corporate",
    foodKey: "NGO-INC-002",
    foodName: "Corporate Lunch · 6 items",
    event: "TechNova Annual Corporate Lunch",
    eventLocation: "HITEC City Convention Centre, Hyderabad",
    quantity: "6 item types",
    items: [
      { name: "Grilled Chicken Wraps", quantity: "55 packs", cuisine: "Continental" },
      { name: "Veg Sushi Rolls", quantity: "40 pieces", cuisine: "Japanese" },
      { name: "Caprese Panini", quantity: "38 sandwiches", cuisine: "Italian" },
      { name: "Brownie Bites & Cookies", quantity: "72 pieces", cuisine: "Desserts" },
    ],
    pickup: "Today, 5:30 PM",
    estimatedMeals: 148,
    timeRemaining: "1h 45m",
    donor: "TechNova Pvt Ltd",
    verifiedDonor: true,
  },
  {
    id: "NGO-INC-003",
    eventType: "festival",
    foodKey: "NGO-INC-003",
    foodName: "Bathukamma Festival · 5 items",
    event: "Bathukamma Community Festival",
    eventLocation: "Public Gardens, Nampally, Hyderabad",
    quantity: "5 item types",
    items: [
      { name: "Pulihora & Curd Rice", quantity: "22 kg", cuisine: "South Indian" },
      { name: "Bobbatlu & Ariselu", quantity: "75 pieces", cuisine: "Sweets" },
      { name: "Panakam & Majjiga", quantity: "40 bottles", cuisine: "Beverages" },
    ],
    pickup: "Today, 4:15 PM",
    estimatedMeals: 168,
    timeRemaining: "45m",
    donor: "Telangana Cultural Association",
    verifiedDonor: false,
  },
];

export const OVERVIEW_INCOMING_DONATIONS = RAW_OVERVIEW_INCOMING.map(enrichDonationRecord);

export const OVERVIEW_ACTIVE_DELIVERIES = [
  {
    id: "NGO-DEL-001",
    eventType: "wedding",
    foodKey: "NGO-DEL-001",
    foodName: "Wedding Feast · 8 items",
    items: [
      { name: "Lucknowi Mutton Biryani", quantity: "42 kg", cuisine: "Indian" },
      { name: "Paneer Malai Tikka", quantity: "12 kg", cuisine: "Indian" },
    ],
    status: "In Transit",
    statusKey: "in_transit",
    eta: "Today, 6:45 PM",
    donor: "Sharma Family Events",
    volunteer: "Rahul Mehta",
  },
  {
    id: "NGO-DEL-002",
    eventType: "corporate",
    foodKey: "NGO-DEL-002",
    foodName: "Corporate Lunch · 6 items",
    items: [
      { name: "Thai Basil Fried Rice", quantity: "14 kg", cuisine: "Thai" },
      { name: "Caprese Panini", quantity: "38 sandwiches", cuisine: "Italian" },
    ],
    status: "Food Collected",
    statusKey: "collected",
    eta: "Today, 8:15 PM",
    donor: "TechNova Pvt Ltd",
    volunteer: "Priya Sharma",
  },
  {
    id: "NGO-DEL-003",
    eventType: "ramzan",
    foodKey: "NGO-DEL-003",
    foodName: "Ramzan Iftar · 7 items",
    items: [
      { name: "Mutton Haleem", quantity: "30 kg", cuisine: "Indian" },
      { name: "Baklava & Kunafa", quantity: "80 portions", cuisine: "Desserts" },
    ],
    status: "Volunteer Assigned",
    statusKey: "volunteer_assigned",
    eta: "Tomorrow, 10:00 AM",
    donor: "Banjara Hills Welfare Trust",
    volunteer: "Vikram Singh",
  },
].map(enrichDonationRecord);

export const OVERVIEW_INVENTORY_SUMMARY = [
  {
    id: "NGO-INV-COOKED",
    eventType: "wedding",
    foodKey: "NGO-INV-COOKED",
    category: "Wedding Feast",
    label: "Wedding Feast · 8 items",
    items: [
      { name: "Lucknowi Mutton Biryani", quantity: "42 kg", cuisine: "Indian" },
      { name: "Veg Dum Biryani", quantity: "28 kg", cuisine: "Indian" },
    ],
    quantity: "8 item types in stock",
    itemCount: 8,
    status: "urgent",
    statusLabel: "Urgent",
  },
  {
    id: "NGO-INV-PACKAGED",
    eventType: "corporate",
    foodKey: "NGO-INV-PACKAGED",
    category: "Corporate Catering",
    label: "Corporate Lunch · 6 items",
    items: [
      { name: "Grilled Chicken Wraps", quantity: "55 packs", cuisine: "Continental" },
      { name: "Veg Sushi Rolls", quantity: "40 pieces", cuisine: "Japanese" },
    ],
    quantity: "6 item types",
    itemCount: 6,
    status: "good",
    statusLabel: "Good",
  },
  {
    id: "NGO-INV-FRUITS",
    eventType: "party",
    foodKey: "NGO-INV-FRUITS",
    category: "Birthday Party",
    label: "Birthday Party · 4 items",
    items: [
      { name: "Cheese Burst Pizza (large)", quantity: "18 boxes", cuisine: "Italian" },
      { name: "Rainbow Cupcakes", quantity: "60 pieces", cuisine: "Desserts" },
    ],
    quantity: "4 item types",
    itemCount: 4,
    status: "urgent",
    statusLabel: "Urgent",
  },
  {
    id: "NGO-INV-DRY",
    eventType: "restaurant",
    foodKey: "NGO-INV-DRY",
    category: "Restaurant Surplus",
    label: "Dragon Wok Surplus · 5 items",
    items: [
      { name: "Kung Pao Chicken", quantity: "9 kg", cuisine: "Chinese" },
      { name: "Dim Sum Platter", quantity: "48 pieces", cuisine: "Chinese" },
    ],
    quantity: "5 item types",
    itemCount: 5,
    status: "good",
    statusLabel: "Good",
  },
].map(enrichDonationRecord);

export const OVERVIEW_IMPACT_THIS_MONTH = {
  mealsDistributed: "1,465",
  peopleSupported: "912",
  foodSavedKg: "635",
  successfulDeliveries: 31,
};

export const INVENTORY_STATUS_POPUP = {
  urgent: "bg-red-100 text-red-700 border-red-200",
  good: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
};

export const DELIVERY_STATUS_COLORS = {
  in_transit: "bg-[#FFEDD5] text-[#C2410C]",
  scheduled: "bg-[#DBEAFE] text-[#1D4ED8]",
  pending: "bg-[#F1F5F9] text-[#475569]",
};
