export const FOOD_CATEGORY_OPTIONS = [
  { id: "all", label: "All Categories" },
  { id: "cooked_meals", label: "Cooked Meals" },
  { id: "dry_rations", label: "Dry Rations" },
  { id: "fresh_produce", label: "Fresh Produce" },
  { id: "beverages", label: "Beverages" },
  { id: "snacks", label: "Snacks & Packaged" },
];

export const PRIORITY_OPTIONS = [
  { id: "all", label: "All Priorities" },
  { id: "emergency", label: "Emergency" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

export const STATUS_FILTER_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "open", label: "Open" },
  { id: "matched", label: "Matched" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "on_the_way", label: "On the Way" },
  { id: "received", label: "Received" },
  { id: "completed", label: "Completed" },
  { id: "expired", label: "Expired" },
];

export const DATE_FILTER_OPTIONS = [
  { id: "all", label: "All Dates" },
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "this_week", label: "This Week" },
];

export const LOCATION_OPTIONS = [
  { id: "all", label: "All Locations" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "secunderabad", label: "Secunderabad" },
  { id: "gachibowli", label: "Gachibowli" },
  { id: "old_city", label: "Old City" },
];

export const REQUEST_STATUS_LABELS = {
  open: "Open",
  matched: "Matched",
  volunteer_assigned: "Volunteer Assigned",
  on_the_way: "On the Way",
  received: "Received",
  completed: "Completed",
  expired: "Expired",
};

export const REQUEST_STATUS_COLORS = {
  open: "bg-[#F1F5F9] text-[#475569]",
  matched: "bg-[#DBEAFE] text-[#1D4ED8]",
  volunteer_assigned: "bg-[#E0E7FF] text-[#4338CA]",
  on_the_way: "bg-[#FFEDD5] text-[#C2410C]",
  received: "bg-[#FEF3C7] text-[#B45309]",
  completed: "bg-[#DCFCE7] text-[#15803D]",
  expired: "bg-[#F1F5F9] text-[#94A3B8]",
};

export const PRIORITY_LABELS = {
  emergency: "Emergency",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const PRIORITY_COLORS = {
  emergency: "bg-red-100 text-red-800 ring-1 ring-red-200",
  high: "bg-orange-100 text-orange-800 ring-1 ring-orange-200",
  medium: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
  low: "bg-[#F1F5F9] text-[#64748B] ring-1 ring-[#E2E8F0]",
};

export const FOOD_REQUESTS = [
  {
    id: "REQ-2048",
    foodNeeded: "Cooked Meals",
    quantity: "200 Meals",
    priority: "high",
    neededBy: "Today 5 PM",
    location: "Hyderabad",
    locationKey: "hyderabad",
    status: "open",
    category: "cooked_meals",
    dateKey: "today",
    notes: "Community kitchen needs hot meals for evening distribution at shelter.",
    createdAt: "Today, 10:30 AM",
  },
  {
    id: "REQ-2041",
    foodNeeded: "Dry Rations",
    quantity: "50 Kits",
    priority: "medium",
    neededBy: "Tomorrow 11 AM",
    location: "Secunderabad",
    locationKey: "secunderabad",
    status: "matched",
    category: "dry_rations",
    dateKey: "tomorrow",
    notes: "Rice, dal, oil, and spices for 50 families.",
    createdAt: "Yesterday, 4:15 PM",
  },
  {
    id: "REQ-2035",
    foodNeeded: "Fresh Produce",
    quantity: "80 kg",
    priority: "emergency",
    neededBy: "Today 2 PM",
    location: "Old City",
    locationKey: "old_city",
    status: "volunteer_assigned",
    category: "fresh_produce",
    dateKey: "today",
    notes: "Vegetables and fruits for children's nutrition program.",
    createdAt: "Today, 8:00 AM",
  },
  {
    id: "REQ-2029",
    foodNeeded: "Cooked Meals",
    quantity: "120 Meals",
    priority: "high",
    neededBy: "Today 7 PM",
    location: "Gachibowli",
    locationKey: "gachibowli",
    status: "on_the_way",
    category: "cooked_meals",
    dateKey: "today",
    notes: "Volunteer en route with donor pickup from wedding surplus.",
    createdAt: "Yesterday, 6:45 PM",
  },
  {
    id: "REQ-2018",
    foodNeeded: "Snacks & Packaged",
    quantity: "300 Packs",
    priority: "low",
    neededBy: "This Week",
    location: "Hyderabad",
    locationKey: "hyderabad",
    status: "received",
    category: "snacks",
    dateKey: "this_week",
    notes: "Biscuits and fruit cups for school outreach.",
    createdAt: "3 days ago",
  },
  {
    id: "REQ-2007",
    foodNeeded: "Beverages",
    quantity: "150 Litres",
    priority: "medium",
    neededBy: "Yesterday 4 PM",
    location: "Secunderabad",
    locationKey: "secunderabad",
    status: "completed",
    category: "beverages",
    dateKey: "today",
    notes: "Buttermilk and juice distributed to 150 beneficiaries.",
    createdAt: "5 days ago",
  },
  {
    id: "REQ-1992",
    foodNeeded: "Cooked Meals",
    quantity: "75 Meals",
    priority: "high",
    neededBy: "Yesterday 1 PM",
    location: "Old City",
    locationKey: "old_city",
    status: "expired",
    category: "cooked_meals",
    dateKey: "today",
    notes: "Request expired — no donor match found before deadline.",
    createdAt: "6 days ago",
  },
  {
    id: "REQ-1988",
    foodNeeded: "Dry Rations",
    quantity: "30 Kits",
    priority: "medium",
    neededBy: "Tomorrow 3 PM",
    location: "Gachibowli",
    locationKey: "gachibowli",
    status: "open",
    category: "dry_rations",
    dateKey: "tomorrow",
    notes: "Monthly ration support for elderly care home.",
    createdAt: "Today, 9:20 AM",
  },
];

const ACTIVE_STATUSES = ["open", "matched", "volunteer_assigned", "on_the_way", "received"];
const APPROVED_STATUSES = ["matched", "volunteer_assigned", "on_the_way"];
const FULFILLED_STATUSES = ["received", "completed"];

export function computeFoodRequestStats(requests) {
  return {
    active: requests.filter((r) => ACTIVE_STATUSES.includes(r.status)).length,
    pending: requests.filter((r) => r.status === "open").length,
    approved: requests.filter((r) => APPROVED_STATUSES.includes(r.status)).length,
    fulfilled: requests.filter((r) => FULFILLED_STATUSES.includes(r.status)).length,
    expired: requests.filter((r) => r.status === "expired").length,
  };
}

export function filterFoodRequests(requests, filters) {
  return requests.filter((request) => {
    if (filters.category !== "all" && request.category !== filters.category) return false;
    if (filters.priority !== "all" && request.priority !== filters.priority) return false;
    if (filters.status !== "all" && request.status !== filters.status) return false;
    if (filters.date !== "all" && request.dateKey !== filters.date) return false;
    if (filters.location !== "all" && request.locationKey !== filters.location) return false;
    return true;
  });
}
