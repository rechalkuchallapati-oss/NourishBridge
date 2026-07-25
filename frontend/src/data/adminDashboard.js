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

export const ADMIN_RECENT_ACTIVITY = [
  { id: 1, event: "New NGO registered", entity: "Helping Hands Foundation", time: "5 mins ago", type: "ngo" },
  { id: 2, event: "Donation completed", entity: "DON-2034", time: "12 mins ago", type: "donation" },
  { id: 3, event: "Volunteer verified", entity: "Rahul Kumar", time: "28 mins ago", type: "volunteer" },
  { id: 4, event: "Food request matched", entity: "REQ-2048", time: "45 mins ago", type: "request" },
  { id: 5, event: "Inventory expiry alert", entity: "INV-2043", time: "1 hour ago", type: "inventory" },
];

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
