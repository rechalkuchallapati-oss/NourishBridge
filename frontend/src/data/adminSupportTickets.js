export const TICKET_STATUSES = ["open", "in_progress", "resolved", "closed"];

export const TICKET_STATUS_LABELS = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export const TICKET_STATUS_COLORS = {
  open: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  in_progress: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  resolved: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  closed: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
};

export const TICKET_TAB_COLORS = {
  all: "bg-[#F1F5F9] text-[#475569]",
  open: "bg-[#DBEAFE] text-[#2563EB]",
  in_progress: "bg-[#FEF3C7] text-[#D97706]",
  resolved: "bg-[#DCFCE7] text-[#16A34A]",
  closed: "bg-[#F1F5F9] text-[#64748B]",
};

export const TICKET_PRIORITIES = ["low", "medium", "high", "critical"];

export const TICKET_PRIORITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const TICKET_PRIORITY_COLORS = {
  low: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
  medium: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  high: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  critical: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
};

export const TICKET_CATEGORIES = [
  "donations",
  "pickups",
  "delivery",
  "ngo_registration",
  "volunteers",
  "reports",
  "account",
  "food_requests",
];

export const TICKET_CATEGORY_LABELS = {
  donations: "Donations",
  pickups: "Pickups",
  delivery: "Delivery",
  ngo_registration: "NGO Registration",
  volunteers: "Volunteers",
  reports: "Reports",
  account: "Account",
  food_requests: "Food Requests",
};

export const TICKET_USER_TYPES = ["donor", "ngo", "volunteer", "admin"];

export const TICKET_USER_TYPE_LABELS = {
  donor: "Donor",
  ngo: "NGO",
  volunteer: "Volunteer",
  admin: "Admin",
};

export const PRIORITY_FILTER_OPTIONS = [
  { id: "all", label: "All Priorities" },
  ...TICKET_PRIORITIES.map((id) => ({ id, label: TICKET_PRIORITY_LABELS[id] })),
];

export const CATEGORY_FILTER_OPTIONS = [
  { id: "all", label: "All Categories" },
  ...TICKET_CATEGORIES.map((id) => ({ id, label: TICKET_CATEGORY_LABELS[id] })),
];

export const USER_TYPE_FILTER_OPTIONS = [
  { id: "all", label: "All User Types" },
  ...TICKET_USER_TYPES.map((id) => ({ id, label: TICKET_USER_TYPE_LABELS[id] })),
];

export const DATE_RANGE_FILTER_OPTIONS = [
  { id: "all", label: "All Time" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "quarter", label: "This Quarter" },
];

export const TICKET_SUMMARY = {
  total: 48,
  open: 12,
  in_progress: 9,
  resolved: 18,
  closed: 9,
};

export const TICKET_SUMMARY_SEGMENTS = [
  { id: "open", label: "Open", value: 12, color: "#2563EB" },
  { id: "in_progress", label: "In Progress", value: 9, color: "#D97706" },
  { id: "resolved", label: "Resolved", value: 18, color: "#16A34A" },
  { id: "closed", label: "Closed", value: 9, color: "#94A3B8" },
];

export const AVG_RESPONSE_TIME = {
  display: "2h 45m",
  trend: -18,
  trendLabel: "than last week",
};

export const POPULAR_CATEGORIES = [
  { id: "donations", label: "Donations", share: 28, color: "#16A34A" },
  { id: "pickups", label: "Pickups", share: 22, color: "#2563EB" },
  { id: "ngo_registration", label: "NGO Registration", share: 18, color: "#7C3AED" },
  { id: "volunteers", label: "Volunteers", share: 14, color: "#D97706" },
  { id: "food_requests", label: "Food Requests", share: 12, color: "#0EA5E9" },
  { id: "others", label: "Others", share: 6, color: "#94A3B8" },
];

export const ADMIN_TICKETS = [
  {
    id: "TKT-2048",
    subject: "Donation not appearing in dashboard",
    description: "Submitted a veg biryani donation but it is not visible in my active list.",
    user: "Priya Sharma",
    userRole: "donor",
    category: "donations",
    priority: "high",
    status: "open",
    lastUpdated: "12 mins ago",
    dateGroup: "today",
    assignedTo: "Unassigned",
  },
  {
    id: "TKT-2047",
    subject: "Pickup delayed beyond scheduled window",
    description: "Volunteer has not arrived for pickup scheduled at 11:00 AM.",
    user: "Hotel Grand Palace",
    userRole: "donor",
    category: "pickups",
    priority: "critical",
    status: "in_progress",
    lastUpdated: "28 mins ago",
    dateGroup: "today",
    assignedTo: "Support Team A",
  },
  {
    id: "TKT-2046",
    subject: "NGO registration verification pending",
    description: "Submitted documents 5 days ago but status still shows under review.",
    user: "Feeding India Hub",
    userRole: "ngo",
    category: "ngo_registration",
    priority: "medium",
    status: "open",
    lastUpdated: "1 hour ago",
    dateGroup: "today",
    assignedTo: "Unassigned",
  },
  {
    id: "TKT-2045",
    subject: "Delivery marked complete but not received",
    description: "NGO confirms delivery was never logged on their end.",
    user: "Helping Hands Foundation",
    userRole: "ngo",
    category: "delivery",
    priority: "high",
    status: "in_progress",
    lastUpdated: "2 hours ago",
    dateGroup: "today",
    assignedTo: "Support Team B",
  },
  {
    id: "TKT-2044",
    subject: "Volunteer profile verification issue",
    description: "ID upload keeps failing validation despite correct format.",
    user: "Arjun Reddy",
    userRole: "volunteer",
    category: "volunteers",
    priority: "medium",
    status: "resolved",
    lastUpdated: "3 hours ago",
    dateGroup: "today",
    assignedTo: "Support Team A",
  },
  {
    id: "TKT-2043",
    subject: "Unable to export monthly impact report",
    description: "Export button returns an error when generating PDF report.",
    user: "Sunrise Home",
    userRole: "ngo",
    category: "reports",
    priority: "low",
    status: "resolved",
    lastUpdated: "5 hours ago",
    dateGroup: "today",
    assignedTo: "Support Team C",
  },
  {
    id: "TKT-2042",
    subject: "Account locked after password reset",
    description: "Cannot log in after completing password reset flow.",
    user: "Rahul Kumar",
    userRole: "volunteer",
    category: "account",
    priority: "high",
    status: "open",
    lastUpdated: "Yesterday",
    dateGroup: "week",
    assignedTo: "Unassigned",
  },
  {
    id: "TKT-2041",
    subject: "Food request not matching with donors",
    description: "Urgent request for 200 meals has been open for 6 hours.",
    user: "Hope Shelter",
    userRole: "ngo",
    category: "food_requests",
    priority: "critical",
    status: "in_progress",
    lastUpdated: "Yesterday",
    dateGroup: "week",
    assignedTo: "Support Team B",
  },
  {
    id: "TKT-2040",
    subject: "Duplicate donation entries",
    description: "Same donation appears twice in donation history.",
    user: "Daily Bread Café",
    userRole: "donor",
    category: "donations",
    priority: "medium",
    status: "closed",
    lastUpdated: "2 days ago",
    dateGroup: "week",
    assignedTo: "Support Team A",
  },
  {
    id: "TKT-2039",
    subject: "Route navigation not loading",
    description: "Map fails to load during active volunteer mission.",
    user: "Priya Sharma",
    userRole: "volunteer",
    category: "delivery",
    priority: "high",
    status: "resolved",
    lastUpdated: "3 days ago",
    dateGroup: "week",
    assignedTo: "Support Team C",
  },
  {
    id: "TKT-2038",
    subject: "Notification emails not received",
    description: "Admin alerts and pickup confirmations not arriving in inbox.",
    user: "Platform Admin",
    userRole: "admin",
    category: "account",
    priority: "medium",
    status: "closed",
    lastUpdated: "4 days ago",
    dateGroup: "month",
    assignedTo: "Support Team A",
  },
  {
    id: "TKT-2037",
    subject: "Volunteer assignment not reflecting",
    description: "Assigned volunteer does not appear in NGO volunteer list.",
    user: "Helping Hands Foundation",
    userRole: "ngo",
    category: "volunteers",
    priority: "low",
    status: "resolved",
    lastUpdated: "5 days ago",
    dateGroup: "month",
    assignedTo: "Support Team B",
  },
  {
    id: "TKT-2036",
    subject: "Pickup slot unavailable despite open calendar",
    description: "Calendar shows slots but booking fails with conflict error.",
    user: "Paradise Biryani",
    userRole: "donor",
    category: "pickups",
    priority: "medium",
    status: "open",
    lastUpdated: "6 days ago",
    dateGroup: "month",
    assignedTo: "Unassigned",
  },
  {
    id: "TKT-2035",
    subject: "NGO capacity update not saving",
    description: "Changes to daily meal capacity revert after page refresh.",
    user: "Sunrise Home",
    userRole: "ngo",
    category: "ngo_registration",
    priority: "high",
    status: "in_progress",
    lastUpdated: "1 week ago",
    dateGroup: "month",
    assignedTo: "Support Team C",
  },
  {
    id: "TKT-2034",
    subject: "Report data mismatch with dashboard",
    description: "Monthly report totals differ from dashboard analytics.",
    user: "Platform Admin",
    userRole: "admin",
    category: "reports",
    priority: "low",
    status: "closed",
    lastUpdated: "2 weeks ago",
    dateGroup: "quarter",
    assignedTo: "Support Team A",
  },
];

export function getTicketTabCounts(tickets) {
  return {
    all: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };
}

export function filterAdminTickets(tickets, { tab, search, priority, category, userType, dateRange }) {
  let result = [...tickets];

  if (tab && tab !== "all") {
    result = result.filter((t) => t.status === tab);
  }

  if (priority && priority !== "all") {
    result = result.filter((t) => t.priority === priority);
  }

  if (category && category !== "all") {
    result = result.filter((t) => t.category === category);
  }

  if (userType && userType !== "all") {
    result = result.filter((t) => t.userRole === userType);
  }

  if (dateRange && dateRange !== "all") {
    result = result.filter((t) => t.dateGroup === dateRange);
  }

  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.user.toLowerCase().includes(q),
    );
  }

  return result;
}

export function sortAdminTickets(tickets, sortKey, sortDir) {
  const sorted = [...tickets];
  const dir = sortDir === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    let av = a[sortKey];
    let bv = b[sortKey];

    if (sortKey === "priority") {
      const order = { critical: 4, high: 3, medium: 2, low: 1 };
      av = order[a.priority] ?? 0;
      bv = order[b.priority] ?? 0;
      return (av - bv) * dir;
    }

    if (typeof av === "string") {
      return av.localeCompare(bv) * dir;
    }

    return (av - bv) * dir;
  });

  return sorted;
}
