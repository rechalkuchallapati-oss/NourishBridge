export const ADMIN_PROFILE = {
  name: "Platform Admin",
  role: "Super Admin",
  email: "admin@nourishbridge.org",
  phone: "+91 90000 00001",
  lastLogin: "Today, 9:15 AM",
  memberSince: "Jan 2024",
  department: "Operations & Monitoring",
};

export const DONATIONS_OVERVIEW_TREND = [
  { date: "Mon", donations: 42 },
  { date: "Tue", donations: 58 },
  { date: "Wed", donations: 51 },
  { date: "Thu", donations: 67 },
  { date: "Fri", donations: 74 },
  { date: "Sat", donations: 89 },
  { date: "Sun", donations: 62 },
];

export const DONATIONS_BY_CATEGORY = [
  { id: "cooked", label: "Cooked Meals", share: 32, color: "#16A34A" },
  { id: "fruits_veg", label: "Fruits & Vegetables", share: 22, color: "#22C55E" },
  { id: "bakery", label: "Bakery Items", share: 16, color: "#F59E0B" },
  { id: "packaged", label: "Packaged Food", share: 14, color: "#2563EB" },
  { id: "dry_goods", label: "Dry Goods", share: 9, color: "#8B5CF6" },
  { id: "others", label: "Others", share: 7, color: "#64748B" },
];

export const REALTIME_ACTIVITY = [
  {
    id: 1,
    type: "accepted",
    icon: "✅",
    message: "Helping Hands Foundation accepted food",
    ref: "DON-2034",
    time: "2 mins ago",
  },
  {
    id: 2,
    type: "pickup",
    icon: "🚚",
    message: "Volunteer Rahul Kumar picked up donation",
    ref: "DON-2034",
    time: "10 mins ago",
  },
  {
    id: 3,
    type: "delivered",
    icon: "📦",
    message: "Food delivered to Sunrise Home",
    ref: "DON-1045",
    time: "18 mins ago",
  },
  {
    id: 4,
    type: "assigned",
    icon: "👤",
    message: "Volunteer assigned to pickup",
    ref: "DON-1988",
    time: "25 mins ago",
  },
  {
    id: 5,
    type: "expired",
    icon: "⚠",
    message: "Batch expired in inventory",
    ref: "INV-2043",
    time: "30 mins ago",
  },
  {
    id: 6,
    type: "distributed",
    icon: "🍱",
    message: "320 meals distributed by Hope Shelter",
    ref: "BAT-2045",
    time: "45 mins ago",
  },
  {
    id: 7,
    type: "accepted",
    icon: "✅",
    message: "Sunrise Home accepted donation",
    ref: "DON-1045",
    time: "52 mins ago",
  },
  {
    id: 8,
    type: "pickup",
    icon: "🚚",
    message: "Volunteer Priya Sharma picked up donation",
    ref: "DON-1988",
    time: "1 hour ago",
  },
];

export const RECENT_DONATIONS = [
  {
    id: "DON-2034",
    donor: "Hotel Grand Palace",
    food: "Veg Biryani 35kg",
    ngo: "Helping Hands",
    status: "In Transit",
    time: "Today, 10:42 AM",
  },
  {
    id: "DON-1045",
    donor: "Paradise Biryani",
    food: "Mixed Rice 28kg",
    ngo: "Sunrise Home",
    status: "Delivered",
    time: "Today, 9:30 AM",
  },
  {
    id: "DON-1988",
    donor: "Daily Bread Café",
    food: "Sandwiches 120 pcs",
    ngo: "Hope Shelter",
    status: "Accepted",
    time: "Today, 8:15 AM",
  },
  {
    id: "DON-1972",
    donor: "Green Valley Hotel",
    food: "Corporate Lunch",
    ngo: "Helping Hands",
    status: "Completed",
    time: "Yesterday",
  },
  {
    id: "DON-1960",
    donor: "Spice Garden",
    food: "Fresh Fruits 18kg",
    ngo: "Sunrise Home",
    status: "Completed",
    time: "Yesterday",
  },
  {
    id: "DON-1955",
    donor: "Daily Bread Café",
    food: "Bakery Items",
    ngo: "Community Kitchen",
    status: "Cancelled",
    time: "Jul 5, 2026",
  },
];

export const TOP_PERFORMING_NGOS = [
  {
    id: "NGO-2045",
    name: "Helping Hands Foundation",
    mealsDelivered: "54,820",
    donations: 186,
    rating: 4.9,
  },
  {
    id: "NGO-1088",
    name: "Sunrise Home",
    mealsDelivered: "28,400",
    donations: 124,
    rating: 4.7,
  },
  {
    id: "NGO-2201",
    name: "Hope Shelter Trust",
    mealsDelivered: "32,100",
    donations: 98,
    rating: 4.8,
  },
  {
    id: "NGO-1567",
    name: "Community Kitchen Network",
    mealsDelivered: "12,800",
    donations: 72,
    rating: 4.5,
  },
  {
    id: "NGO-3012",
    name: "Feeding India Hub",
    mealsDelivered: "8,420",
    donations: 54,
    rating: 4.6,
  },
];

export const PENDING_VERIFICATIONS = {
  ngos: 6,
  volunteers: 9,
  donors: 14,
};

export const FOOTER_MONITORING = [
  {
    id: "deliveries_today",
    label: "Deliveries Today",
    value: "54",
    delta: "+16% from yesterday",
    deltaPositive: true,
    icon: "truck",
    accent: "blue",
  },
  {
    id: "in_transit",
    label: "In Transit",
    value: "28",
    delta: "12 pickups · 16 deliveries",
    deltaPositive: null,
    icon: "route",
    accent: "indigo",
  },
  {
    id: "delayed",
    label: "Delayed",
    value: "3",
    delta: "2 require follow-up",
    deltaPositive: false,
    icon: "clock",
    accent: "amber",
  },
  {
    id: "critical_alerts",
    label: "Critical Alerts",
    value: "4",
    delta: "2 expiry · 2 emergency",
    deltaPositive: false,
    icon: "alert",
    accent: "red",
  },
  {
    id: "open_tickets",
    label: "Open Tickets",
    value: "7",
    delta: "3 assigned to support",
    deltaPositive: null,
    icon: "ticket",
    accent: "slate",
  },
];

export const ADMIN_OVERVIEW_STATS = {
  totalUsers: "2,840",
  activeDonations: "186",
  registeredNgos: "62",
  activeVolunteers: "148",
  registeredDonors: "420",
  openFoodRequests: "34",
  activeDeliveries: "28",
  inventoryAlerts: "7",
};

export const ADMIN_RECENT_ACTIVITY = REALTIME_ACTIVITY.slice(0, 5);

export const ADMIN_PLATFORM_HEALTH = [
  { label: "API Uptime", value: "99.9%", status: "healthy" },
  { label: "Avg. Match Time", value: "4.2 min", status: "healthy" },
  { label: "Failed Deliveries", value: "0.8%", status: "warning" },
  { label: "Pending Verifications", value: "14", status: "attention" },
];

export const ADMIN_QUICK_ACTIONS = [
  { id: "verify_ngo", label: "Review NGO Applications", path: "ngos" },
  { id: "audit_logs", label: "View Audit Logs", path: "audit-logs" },
  { id: "system_settings", label: "System Settings", path: "system-settings" },
  { id: "reports", label: "Platform Reports", path: "reports" },
];
