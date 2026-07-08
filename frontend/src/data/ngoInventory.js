export const INVENTORY_OVERVIEW_STATS = {
  availableFoodStock: 1840,
  foodBatches: 24,
  todaysIncoming: 620,
  todaysOutgoing: 440,
  nearExpiry: 5,
  expiredItems: 2,
  storageUtilization: 72,
};

export const INVENTORY_STATUS_LABELS = {
  available: "Available",
  reserved: "Reserved",
  ready_for_distribution: "Ready for Distribution",
  near_expiry: "Near Expiry",
  distributed: "Distributed",
  expired: "Expired",
};

export const INVENTORY_STATUS_COLORS = {
  available: "bg-[#DCFCE7] text-[#15803D]",
  reserved: "bg-[#DBEAFE] text-[#1D4ED8]",
  ready_for_distribution: "bg-[#BBF7D0] text-[#14532D]",
  near_expiry: "bg-[#FEF3C7] text-[#B45309]",
  distributed: "bg-[#E0E7FF] text-[#4338CA]",
  expired: "bg-[#F1F5F9] text-[#64748B]",
};

export const INVENTORY_STATUS_OPTIONS = [
  { id: "all", label: "All Statuses" },
  ...Object.entries(INVENTORY_STATUS_LABELS).map(([id, label]) => ({ id, label })),
];

export const INVENTORY_CATEGORY_OPTIONS = [
  { id: "all", label: "All Categories" },
  { id: "cooked_food", label: "Cooked Food" },
  { id: "biryani_rice", label: "Biryani & Rice" },
  { id: "home_cooked", label: "Home-Cooked" },
  { id: "banquet", label: "Banquet & Hotel" },
  { id: "festival", label: "Festival Specials" },
  { id: "dry_goods", label: "Dry Goods" },
];

export const INVENTORY_STORAGE_OPTIONS = [
  { id: "all", label: "All Storage Types" },
  { id: "cold_storage", label: "Cold Storage" },
  { id: "hot_holding", label: "Hot Holding" },
  { id: "dry_storage", label: "Dry Storage" },
  { id: "ambient", label: "Ambient" },
];

export const INVENTORY_DATE_OPTIONS = [
  { id: "all", label: "All Dates" },
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "this_week", label: "This Week" },
];

export const INVENTORY_QUICK_FILTERS = [
  { id: "all", label: "All" },
  { id: "available", label: "Available" },
  { id: "near_expiry", label: "Near Expiry" },
];

export const INVENTORY_ANALYTICS = {
  foodCategories: [
    { label: "Cooked Food", value: 42, color: "#16A34A" },
    { label: "Biryani & Rice", value: 28, color: "#2563EB" },
    { label: "Banquet", value: 18, color: "#7C3AED" },
    { label: "Festival", value: 8, color: "#D97706" },
    { label: "Dry Goods", value: 4, color: "#64748B" },
  ],
  stockByQuantity: [
    { label: "Veg Biryani", value: 35 },
    { label: "Wedding Banquet", value: 150 },
    { label: "Pongal Spread", value: 90 },
    { label: "Sambar Rice", value: 9 },
    { label: "Hotel Banquet", value: 120 },
  ],
  expiryTimeline: [
    { label: "< 2 hrs", value: 2, urgent: true },
    { label: "2–5 hrs", value: 3, urgent: true },
    { label: "5–12 hrs", value: 8, urgent: false },
    { label: "12–24 hrs", value: 6, urgent: false },
    { label: "> 24 hrs", value: 5, urgent: false },
  ],
  incomingVsOutgoing: {
    incoming: 620,
    outgoing: 440,
  },
  dailyFlow: [
    { label: "6 AM", incoming: 40, outgoing: 0 },
    { label: "9 AM", incoming: 120, outgoing: 60 },
    { label: "12 PM", incoming: 180, outgoing: 140 },
    { label: "3 PM", incoming: 160, outgoing: 120 },
    { label: "6 PM", incoming: 120, outgoing: 120 },
  ],
};

export const INVENTORY_BATCHES = [
  {
    id: "INV-1045",
    foodItem: "Veg Biryani",
    category: "Cooked Food",
    categoryKey: "cooked_food",
    quantity: "35 kg",
    estimatedMeals: 175,
    receivedDate: "Today",
    expiryTime: "5 Hours Left",
    storage: "Cold Storage",
    storageKey: "cold_storage",
    status: "available",
    dateKey: "today",
    eventType: "restaurant",
    thumbnailKey: "veg_biryani",
    donor: "Paradise Biryani",
    volunteer: "Rahul Kumar",
    preparationTime: "Today, 12:30 PM",
    storageInstructions: "Maintain 4°C in cold storage bay. Do not stack above 3 trays.",
    currentLocation: "Cold Storage · Bay 2",
    assignedDistributionBatch: "—",
    qualityStatus: "Passed",
    history: [
      { action: "Received at NGO", time: "Today, 1:15 PM" },
      { action: "Quality check passed", time: "Today, 1:30 PM" },
      { action: "Stored in cold bay", time: "Today, 1:45 PM" },
    ],
  },
  {
    id: "INV-1042",
    foodItem: "Sambar Rice & Curd Rice",
    category: "Home-Cooked",
    categoryKey: "home_cooked",
    quantity: "9 kg",
    estimatedMeals: 22,
    receivedDate: "Today",
    expiryTime: "8 Hours Left",
    storage: "Cold Storage",
    storageKey: "cold_storage",
    status: "near_expiry",
    dateKey: "today",
    eventType: "individual",
    thumbnailKey: "individual_rice_sambar",
    donor: "Mrs. Lakshmi Narayan",
    volunteer: "Priya Sharma",
    preparationTime: "Today, 11:00 AM",
    storageInstructions: "Keep curd rice chilled; reheat sambar rice above 74°C before serving.",
    currentLocation: "Cold Storage · Bay 1",
    assignedDistributionBatch: "BAT-2042",
    qualityStatus: "Passed",
    history: [
      { action: "Received at NGO", time: "Today, 12:00 PM" },
      { action: "Reserved for distribution", time: "Today, 12:30 PM" },
    ],
  },
  {
    id: "INV-1038",
    foodItem: "Pongal Festival Spread",
    category: "Festival Specials",
    categoryKey: "festival",
    quantity: "90 kg",
    estimatedMeals: 210,
    receivedDate: "Today",
    expiryTime: "3 Hours Left",
    storage: "Hot Holding",
    storageKey: "hot_holding",
    status: "near_expiry",
    dateKey: "today",
    eventType: "festival",
    thumbnailKey: "pongal_feast",
    donor: "Tamil Sangam Cultural Trust",
    volunteer: "Meera Joshi",
    preparationTime: "Today, 10:00 AM",
    storageInstructions: "Hot holding at 63°C minimum. Cover sweet trays.",
    currentLocation: "Hot Holding · Unit A",
    assignedDistributionBatch: "BAT-2035",
    qualityStatus: "Passed",
    history: [
      { action: "Received at NGO", time: "Today, 12:30 PM" },
      { action: "Assigned to BAT-2035", time: "Today, 12:45 PM" },
    ],
  },
  {
    id: "INV-1035",
    foodItem: "Wedding Banquet Surplus",
    category: "Banquet & Hotel",
    categoryKey: "banquet",
    quantity: "150 kg",
    estimatedMeals: 340,
    receivedDate: "Today",
    expiryTime: "6 Hours Left",
    storage: "Hot Holding",
    storageKey: "hot_holding",
    status: "ready_for_distribution",
    dateKey: "today",
    eventType: "wedding",
    thumbnailKey: "wedding_buffet",
    donor: "Verma Family Events",
    volunteer: "Ankit Desai",
    preparationTime: "Today, 10:00 PM",
    storageInstructions: "Segregate hot curries from desserts. Use chafer fuel for mains.",
    currentLocation: "Hot Holding · Unit B",
    assignedDistributionBatch: "BAT-2045",
    qualityStatus: "Passed",
    history: [
      { action: "Received at NGO", time: "Today, 11:00 AM" },
      { action: "Ready for distribution", time: "Today, 11:30 AM" },
    ],
  },
  {
    id: "INV-1030",
    foodItem: "Hotel Banquet Roll-ins",
    category: "Banquet & Hotel",
    categoryKey: "banquet",
    quantity: "120 kg",
    estimatedMeals: 265,
    receivedDate: "Today",
    expiryTime: "10 Hours Left",
    storage: "Cold Storage",
    storageKey: "cold_storage",
    status: "reserved",
    dateKey: "today",
    eventType: "hotel",
    thumbnailKey: "hotel_banquet",
    donor: "ITC Gardenia Bengaluru",
    volunteer: "Sneha Reddy",
    preparationTime: "Today, 9:00 AM",
    storageInstructions: "Salads in cold chain; hot items in separate bay.",
    currentLocation: "Cold Storage · Bay 3",
    assignedDistributionBatch: "—",
    qualityStatus: "Passed",
    history: [
      { action: "Received at NGO", time: "Today, 9:40 AM" },
      { action: "Batch reserved", time: "Today, 10:00 AM" },
    ],
  },
  {
    id: "INV-1025",
    foodItem: "Chicken Dum Biryani",
    category: "Biryani & Rice",
    categoryKey: "biryani_rice",
    quantity: "30 kg",
    estimatedMeals: 82,
    receivedDate: "Yesterday",
    expiryTime: "Expired",
    storage: "Hot Holding",
    storageKey: "hot_holding",
    status: "expired",
    dateKey: "yesterday",
    eventType: "restaurant",
    thumbnailKey: "restaurant_biryani_bulk",
    donor: "Biryani Mahal",
    volunteer: "Ravi Kumar",
    preparationTime: "Yesterday, 9:30 PM",
    storageInstructions: "Disposed per food safety protocol.",
    currentLocation: "Disposal Queue",
    assignedDistributionBatch: "—",
    qualityStatus: "Expired — Disposed",
    history: [
      { action: "Received at NGO", time: "Yesterday, 10:00 PM" },
      { action: "Marked expired", time: "Today, 6:00 AM" },
    ],
  },
  {
    id: "INV-1020",
    foodItem: "Christmas Dinner Trays",
    category: "Cooked Food",
    categoryKey: "cooked_food",
    quantity: "80 kg",
    estimatedMeals: 175,
    receivedDate: "Yesterday",
    expiryTime: "Distributed",
    storage: "Cold Storage",
    storageKey: "cold_storage",
    status: "distributed",
    dateKey: "yesterday",
    eventType: "christmas",
    thumbnailKey: "christmas_feast",
    donor: "St. Joseph's Parish Council",
    volunteer: "Rahul Mehta",
    preparationTime: "Yesterday, 7:30 PM",
    storageInstructions: "Fully distributed to Hope Shelter.",
    currentLocation: "—",
    assignedDistributionBatch: "BAT-2030",
    qualityStatus: "Distributed",
    history: [
      { action: "Received at NGO", time: "Yesterday, 8:45 PM" },
      { action: "Distributed", time: "Yesterday, 9:15 PM" },
    ],
  },
  {
    id: "INV-1015",
    foodItem: "Dry Ration Kits",
    category: "Dry Goods",
    categoryKey: "dry_goods",
    quantity: "50 kits",
    estimatedMeals: 200,
    receivedDate: "This Week",
    expiryTime: "5 Days Left",
    storage: "Dry Storage",
    storageKey: "dry_storage",
    status: "available",
    dateKey: "this_week",
    eventType: "individual",
    thumbnailKey: "corporate_lunch",
    donor: "Community Donors Collective",
    volunteer: "—",
    preparationTime: "Packaged",
    storageInstructions: "Store in dry, pest-free area. FIFO rotation.",
    currentLocation: "Dry Storage · Shelf C",
    assignedDistributionBatch: "—",
    qualityStatus: "Passed",
    history: [{ action: "Received at NGO", time: "3 days ago" }],
  },
];

/** @deprecated Use INVENTORY_BATCHES */
export const FOOD_INVENTORY = INVENTORY_BATCHES;

export function filterInventoryBatches(batches, filters) {
  return batches.filter((batch) => {
    if (filters.quick === "available" && batch.status !== "available") return false;
    if (filters.quick === "near_expiry" && batch.status !== "near_expiry") return false;
    if (filters.status !== "all" && batch.status !== filters.status) return false;
    if (filters.category !== "all" && batch.categoryKey !== filters.category) return false;
    if (filters.storage !== "all" && batch.storageKey !== filters.storage) return false;
    if (filters.date !== "all" && batch.dateKey !== filters.date) return false;
    if (filters.batchId && !batch.id.toLowerCase().includes(filters.batchId.toLowerCase())) {
      return false;
    }
    return true;
  });
}

export function getInventoryBatchById(id) {
  return INVENTORY_BATCHES.find((b) => b.id === id) ?? null;
}

export function computeInventoryStats(batches) {
  const active = batches.filter((b) => !["distributed", "expired"].includes(b.status));
  return {
    availableFoodStock: active.reduce((sum, b) => sum + b.estimatedMeals, 0),
    foodBatches: active.length,
    todaysIncoming: batches.filter((b) => b.dateKey === "today").length,
    todaysOutgoing: batches.filter((b) => b.status === "distributed" && b.dateKey === "today").length,
    nearExpiry: batches.filter((b) => b.status === "near_expiry").length,
    expiredItems: batches.filter((b) => b.status === "expired").length,
    storageUtilization: INVENTORY_OVERVIEW_STATS.storageUtilization,
  };
}
