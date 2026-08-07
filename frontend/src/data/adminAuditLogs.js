export const AUDIT_STAT_CARDS = [
  {
    id: "total",
    label: "Total Activities",
    count: "2,842",
    caption: "All logged events across the platform",
    trend: 12,
    icon: "activity",
    accent: "green",
  },
  {
    id: "user",
    label: "User Activities",
    count: "1,186",
    caption: "Actions by donors, NGOs, volunteers, admins",
    trend: 8,
    icon: "user",
    accent: "blue",
  },
  {
    id: "system",
    label: "System Activities",
    count: "964",
    caption: "Automated jobs, syncs, and background tasks",
    trend: -3,
    icon: "system",
    accent: "purple",
  },
  {
    id: "security",
    label: "Security Events",
    count: "42",
    caption: "Login attempts, policy changes, alerts",
    trend: -18,
    icon: "security",
    accent: "red",
  },
];

export const AUDIT_ACTIONS = [
  "all",
  "completed",
  "updated",
  "submitted",
  "verified",
  "denied",
  "created",
  "login",
  "deleted",
  "exported",
];

export const AUDIT_ACTION_LABELS = {
  all: "All Actions",
  completed: "Completed",
  updated: "Updated",
  submitted: "Submitted",
  verified: "Verified",
  denied: "Denied",
  created: "Created",
  login: "Login",
  deleted: "Deleted",
  exported: "Exported",
};

export const AUDIT_USER_TYPES = ["all", "volunteer", "ngo", "donor", "admin", "system", "super_admin"];

export const AUDIT_USER_TYPE_LABELS = {
  all: "All Users",
  volunteer: "Volunteer",
  ngo: "NGO Admin",
  donor: "Donor",
  admin: "Admin",
  system: "System",
  super_admin: "Super Admin",
};

export const AUDIT_MODULES = [
  "all",
  "donation",
  "profile",
  "food_requests",
  "ngo",
  "user",
  "security",
  "mission",
  "inventory",
  "reports",
];

export const AUDIT_MODULE_LABELS = {
  all: "All Modules",
  donation: "Donation",
  profile: "Profile",
  food_requests: "Food Requests",
  ngo: "NGO",
  user: "User",
  security: "Security",
  mission: "Mission",
  inventory: "Inventory",
  reports: "Reports",
};

export const AUDIT_ACTION_COLORS = {
  completed: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  updated: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  submitted: "border-[#EDE9FE] bg-[#F5F3FF] text-[#7C3AED]",
  verified: "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  denied: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  created: "border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]",
  login: "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]",
  deleted: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  exported: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
};

export const ADMIN_AUDIT_LOGS = [
  {
    id: "LOG-8821",
    dateLabel: "May 29, 2024",
    timeLabel: "10:24:34 AM",
    userName: "Rahul Kumar",
    userType: "volunteer",
    action: "completed",
    module: "mission",
    details: "Mission MIS-2048 · Pickup & delivery confirmed",
    ip: "10.0.0.42",
    extra: "Route: Gachibowli → Helping Hands · Duration: 48 min",
  },
  {
    id: "LOG-8820",
    dateLabel: "May 29, 2024",
    timeLabel: "9:15:02 AM",
    userName: "Platform Admin",
    userType: "super_admin",
    action: "verified",
    module: "ngo",
    details: "NGO-3012 · Feeding India Hub verification approved",
    ip: "192.168.1.1",
    extra: "Documents: FSSAI, Registration Certificate",
  },
  {
    id: "LOG-8819",
    dateLabel: "May 28, 2024",
    timeLabel: "6:42:18 PM",
    userName: "System",
    userType: "system",
    action: "login",
    module: "security",
    details: "Successful login to admin panel",
    ip: "—",
    extra: "Session ID: sess_a8f2 · MFA: enabled",
  },
  {
    id: "LOG-8818",
    dateLabel: "May 28, 2024",
    timeLabel: "4:10:55 PM",
    userName: "Priya Sharma",
    userType: "donor",
    action: "submitted",
    module: "donation",
    details: "DON-2048 · Veg Biryani 35 kg donation submitted",
    ip: "10.0.0.88",
    extra: "Donor type: Hotel · Pickup: Today 2–4 PM",
  },
  {
    id: "LOG-8817",
    dateLabel: "May 28, 2024",
    timeLabel: "2:33:11 PM",
    userName: "Helping Hands",
    userType: "ngo",
    action: "updated",
    module: "food_requests",
    details: "REQ-2048 · Urgent meal request priority raised",
    ip: "10.0.0.15",
    extra: "200 meals needed · Priority: Critical",
  },
  {
    id: "LOG-8816",
    dateLabel: "May 27, 2024",
    timeLabel: "11:08:44 AM",
    userName: "Arjun Reddy",
    userType: "volunteer",
    action: "created",
    module: "profile",
    details: "USR-2042 · Volunteer profile created",
    ip: "10.0.0.55",
    extra: "City: Hyderabad · Documents pending",
  },
  {
    id: "LOG-8815",
    dateLabel: "May 27, 2024",
    timeLabel: "9:52:30 AM",
    userName: "System",
    userType: "system",
    action: "exported",
    module: "reports",
    details: "RPT-W32 · Weekly impact report generated",
    ip: "—",
    extra: "Format: PDF · Size: 2.4 MB",
  },
  {
    id: "LOG-8814",
    dateLabel: "May 26, 2024",
    timeLabel: "5:18:07 PM",
    userName: "Platform Admin",
    userType: "admin",
    action: "denied",
    module: "user",
    details: "USR-1099 · Suspicious account registration denied",
    ip: "192.168.1.1",
    extra: "Reason: Invalid documents · Flagged by security",
  },
  {
    id: "LOG-8813",
    dateLabel: "May 26, 2024",
    timeLabel: "1:45:22 PM",
    userName: "Sunrise Home",
    userType: "ngo",
    action: "updated",
    module: "inventory",
    details: "INV-2043 · Stock level updated after distribution",
    ip: "10.0.0.22",
    extra: "Veg Biryani: 120 kg → 86 kg",
  },
  {
    id: "LOG-8812",
    dateLabel: "May 25, 2024",
    timeLabel: "8:30:00 AM",
    userName: "System",
    userType: "system",
    action: "completed",
    module: "security",
    details: "SYS-MNT-042 · Scheduled maintenance completed",
    ip: "—",
    extra: "Database optimization · Cache refresh",
  },
];

export function filterAuditLogs(logs, { search, action, userType, module, dateFrom, dateTo }) {
  let result = [...logs];
  if (action && action !== "all") result = result.filter((l) => l.action === action);
  if (userType && userType !== "all") result = result.filter((l) => l.userType === userType);
  if (module && module !== "all") result = result.filter((l) => l.module === module);
  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (l) =>
        l.userName.toLowerCase().includes(q) ||
        l.details.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q),
    );
  }
  return result;
}
