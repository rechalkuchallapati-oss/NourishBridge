export const NOTIFICATION_OVERVIEW_STATS = {
  unread: 12,
  today: 28,
  highPriority: 5,
  completed: 156,
};

export const NOTIFICATION_CATEGORIES = [
  { id: "donation", label: "Donation Alerts", icon: "🍱" },
  { id: "volunteer", label: "Volunteer Updates", icon: "🙋" },
  { id: "delivery", label: "Delivery Updates", icon: "🚚" },
  { id: "expiry", label: "Food Expiry Alerts", icon: "⚠" },
  { id: "inventory", label: "Inventory Alerts", icon: "📦" },
  { id: "emergency", label: "Emergency Requests", icon: "🚨" },
  { id: "system", label: "System Notifications", icon: "🔔" },
  { id: "message", label: "Messages", icon: "💬" },
];

export const PRIORITY_LABELS = {
  critical: { label: "Critical", icon: "🔴", color: "text-red-700 bg-red-50 border-red-100" },
  high: { label: "High", icon: "🟠", color: "text-orange-700 bg-orange-50 border-orange-100" },
  medium: { label: "Medium", icon: "🟡", color: "text-amber-700 bg-amber-50 border-amber-100" },
  info: { label: "Information", icon: "🟢", color: "text-green-700 bg-green-50 border-green-100" },
};

export const QUICK_FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "high_priority", label: "High Priority" },
  { id: "donation", label: "Donation" },
  { id: "volunteer", label: "Volunteer" },
  { id: "inventory", label: "Inventory" },
];

export const REALTIME_FEED = [
  { time: "10:42", event: "Volunteer Accepted Mission" },
  { time: "10:51", event: "Food Picked Up" },
  { time: "11:15", event: "Food Delivered" },
  { time: "11:18", event: "Inventory Updated" },
  { time: "11:25", event: "Meals Distributed" },
];

export const NGO_NOTIFICATIONS = [
  {
    id: "NTF-001",
    icon: "🔔",
    title: "Volunteer Rahul has picked up Donation DON-2034",
    body: "Pickup confirmed at Hotel Grand Palace. En route to NGO hub.",
    time: "2 mins ago",
    timestamp: Date.now() - 2 * 60 * 1000,
    category: "volunteer",
    priority: "high",
    unread: true,
    today: true,
    refId: "DON-2034",
  },
  {
    id: "NTF-002",
    icon: "🍱",
    title: "Hotel Grand Palace donated 35 kg Veg Biryani",
    body: "New incoming donation awaiting review and acceptance.",
    time: "10 mins ago",
    timestamp: Date.now() - 10 * 60 * 1000,
    category: "donation",
    priority: "medium",
    unread: true,
    today: true,
    refId: "DON-1045",
  },
  {
    id: "NTF-003",
    icon: "🚚",
    title: "Volunteer is arriving — ETA 8 minutes",
    body: "Priya Sharma approaching NGO receiving point with DON-2034.",
    time: "15 mins ago",
    timestamp: Date.now() - 15 * 60 * 1000,
    category: "delivery",
    priority: "info",
    unread: true,
    today: true,
    refId: "DON-2034",
  },
  {
    id: "NTF-004",
    icon: "⚠",
    title: "Batch INV-2043 expires in 2 hours",
    body: "Veg Biryani in Cold Storage — prioritize distribution or transfer.",
    time: "22 mins ago",
    timestamp: Date.now() - 22 * 60 * 1000,
    category: "expiry",
    priority: "critical",
    unread: true,
    today: true,
    refId: "INV-2043",
  },
  {
    id: "NTF-005",
    icon: "🏢",
    title: "New NGO partnership request",
    body: "Helping Hands Foundation requested a partnership for shared distribution.",
    time: "45 mins ago",
    timestamp: Date.now() - 45 * 60 * 1000,
    category: "system",
    priority: "medium",
    unread: true,
    today: true,
    refId: null,
  },
  {
    id: "NTF-006",
    icon: "📦",
    title: "Low stock alert — Fresh Fruits",
    body: "Inventory below threshold. Consider creating a food request.",
    time: "1 hour ago",
    timestamp: Date.now() - 60 * 60 * 1000,
    category: "inventory",
    priority: "high",
    unread: false,
    today: true,
    refId: "INV-1088",
  },
  {
    id: "NTF-007",
    icon: "🚨",
    title: "Emergency food request — Hope Shelter",
    body: "Urgent need for 200 meals due to influx of beneficiaries.",
    time: "2 hours ago",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    category: "emergency",
    priority: "critical",
    unread: false,
    today: true,
    refId: "REQ-2048",
  },
  {
    id: "NTF-008",
    icon: "💬",
    title: "Message from Paradise Biryani",
    body: "Donor confirmed recurring weekly donation schedule.",
    time: "Today, 9:30 AM",
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    category: "message",
    priority: "info",
    unread: false,
    today: true,
    refId: null,
  },
  {
    id: "NTF-009",
    icon: "🍱",
    title: "Donation DON-1988 accepted",
    body: "Corporate lunch trays accepted and added to distribution queue.",
    time: "Yesterday",
    timestamp: Date.now() - 26 * 60 * 60 * 1000,
    category: "donation",
    priority: "info",
    unread: false,
    today: false,
    refId: "DON-1988",
  },
  {
    id: "NTF-010",
    icon: "🙋",
    title: "Volunteer Arjun completed 200th mission",
    body: "Milestone achievement — consider featuring in impact report.",
    time: "Yesterday",
    timestamp: Date.now() - 30 * 60 * 60 * 1000,
    category: "volunteer",
    priority: "info",
    unread: false,
    today: false,
    refId: "VOL-092",
  },
];

export function filterNotifications(notifications, filters) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  return notifications.filter((item) => {
    if (filters.quick === "unread" && !item.unread) return false;
    if (filters.quick === "today" && !item.today) return false;
    if (filters.quick === "week" && item.timestamp < weekAgo) return false;
    if (filters.quick === "high_priority" && !["critical", "high"].includes(item.priority)) {
      return false;
    }
    if (["donation", "volunteer", "inventory"].includes(filters.quick) && item.category !== filters.quick) {
      return false;
    }
    if (filters.category !== "all" && item.category !== filters.category) return false;
    if (filters.priority !== "all" && item.priority !== filters.priority) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.body.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
}
