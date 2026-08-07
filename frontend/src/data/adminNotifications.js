export const NOTIFICATION_STATUS = {
  unread: "Unread",
  read: "Read",
};

export const NOTIFICATION_PERIOD_LABELS = {
  today: "Today",
  yesterday: "Yesterday",
  week_ago: "A Week Ago",
  older: "Earlier",
};

export const NOTIFICATION_TYPE_COLORS = {
  donation: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  user: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  ngo: "border-[#EDE9FE] bg-[#F5F3FF] text-[#7C3AED]",
  pickup: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  inventory: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  report: "border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]",
  system: "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]",
  alert: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
};

export const ADMIN_NOTIFICATIONS = [
  {
    id: "NTF-1088",
    type: "donation",
    typeLabel: "Donation Received",
    title: "New donation from Hotel Grand Palace",
    message: "Veg Biryani · 35 kg submitted and awaiting NGO match.",
    status: "unread",
    period: "today",
    time: "10:42 AM",
    fullDate: "Aug 6, 2026 · 10:42 AM",
    actor: "Hotel Grand Palace",
    reference: "DON-2048",
    extra: "Pickup window: Today 2–4 PM · Gachibowli",
  },
  {
    id: "NTF-1087",
    type: "user",
    typeLabel: "User Registered",
    title: "New volunteer registration",
    message: "Arjun Reddy completed signup and uploaded verification documents.",
    status: "unread",
    period: "today",
    time: "9:18 AM",
    fullDate: "Aug 6, 2026 · 9:18 AM",
    actor: "Arjun Reddy",
    reference: "USR-2042",
    extra: "Pending ID verification · Hyderabad",
  },
  {
    id: "NTF-1086",
    type: "ngo",
    typeLabel: "NGO Verification Complete",
    title: "Feeding India Hub verified",
    message: "All registration documents approved. NGO is now active on the platform.",
    status: "unread",
    period: "today",
    time: "8:05 AM",
    fullDate: "Aug 6, 2026 · 8:05 AM",
    actor: "Platform Admin",
    reference: "NGO-3012",
    extra: "Verified by Super Admin · Capacity: 500 meals/day",
  },
  {
    id: "NTF-1085",
    type: "pickup",
    typeLabel: "Pickup Scheduled",
    title: "Volunteer assigned to pickup",
    message: "Rahul Kumar scheduled for DON-2045 pickup at Paradise Biryani.",
    status: "read",
    period: "today",
    time: "7:30 AM",
    fullDate: "Aug 6, 2026 · 7:30 AM",
    actor: "System",
    reference: "PKP-8821",
    extra: "ETA 11:15 AM · Route: Madhapur → NGO Hub",
  },
  {
    id: "NTF-1084",
    type: "inventory",
    typeLabel: "Low Inventory Alert",
    title: "Fresh fruits stock below threshold",
    message: "Sunrise Home inventory for fresh fruits dropped below 20 kg.",
    status: "unread",
    period: "yesterday",
    time: "6:14 PM",
    fullDate: "Aug 5, 2026 · 6:14 PM",
    actor: "Inventory Monitor",
    reference: "INV-2043",
    extra: "Current: 14 kg · Threshold: 20 kg · Expires tomorrow",
  },
  {
    id: "NTF-1083",
    type: "report",
    typeLabel: "Weekly Impact Report",
    title: "Platform impact report ready",
    message: "Weekly summary: 12,400 meals distributed across 48 NGOs.",
    status: "read",
    period: "yesterday",
    time: "9:00 AM",
    fullDate: "Aug 5, 2026 · 9:00 AM",
    actor: "Reports Engine",
    reference: "RPT-W32",
    extra: "Download PDF · +18% vs last week",
  },
  {
    id: "NTF-1082",
    type: "system",
    typeLabel: "System Maintenance",
    title: "Scheduled maintenance completed",
    message: "Database optimization and cache refresh finished successfully.",
    status: "read",
    period: "yesterday",
    time: "2:00 AM",
    fullDate: "Aug 5, 2026 · 2:00 AM",
    actor: "System",
    reference: "SYS-MNT-042",
    extra: "Duration: 45 min · No downtime reported",
  },
  {
    id: "NTF-1081",
    type: "alert",
    typeLabel: "System Alert",
    title: "Delivery delay detected",
    message: "DEL-8819 exceeded ETA by 25 minutes. NGO notified.",
    status: "read",
    period: "week_ago",
    time: "4:22 PM",
    fullDate: "Jul 30, 2026 · 4:22 PM",
    actor: "Logistics Monitor",
    reference: "DEL-8819",
    extra: "Volunteer: Priya Sharma · Resolved at 5:10 PM",
  },
  {
    id: "NTF-1080",
    type: "donation",
    typeLabel: "Donation Received",
    title: "Corporate lunch donation logged",
    message: "TechCorp Hyderabad donated 120 packaged meals.",
    status: "read",
    period: "week_ago",
    time: "12:10 PM",
    fullDate: "Jul 30, 2026 · 12:10 PM",
    actor: "TechCorp Hyderabad",
    reference: "DON-2034",
    extra: "Matched with Helping Hands Foundation",
  },
  {
    id: "NTF-1079",
    type: "ngo",
    typeLabel: "NGO Verification Complete",
    title: "Hope Shelter documents approved",
    message: "Registration certificate and FSSAI license verified.",
    status: "read",
    period: "week_ago",
    time: "10:05 AM",
    fullDate: "Jul 30, 2026 · 10:05 AM",
    actor: "Platform Admin",
    reference: "NGO-1088",
    extra: "Rating: 4.7 · Active since Mar 2025",
  },
  {
    id: "NTF-1078",
    type: "user",
    typeLabel: "User Registered",
    title: "New donor account created",
    message: "Daily Bread Café registered as a recurring food donor.",
    status: "read",
    period: "older",
    time: "3:45 PM",
    fullDate: "Jul 22, 2026 · 3:45 PM",
    actor: "Daily Bread Café",
    reference: "DNR-388",
    extra: "Donor type: Café · City: Secunderabad",
  },
  {
    id: "NTF-1077",
    type: "pickup",
    typeLabel: "Pickup Scheduled",
    title: "Pickup confirmed for tomorrow",
    message: "Volunteer mission PKP-8802 assigned for morning route.",
    status: "read",
    period: "older",
    time: "11:20 AM",
    fullDate: "Jul 22, 2026 · 11:20 AM",
    actor: "System",
    reference: "PKP-8802",
    extra: "Window: Jul 23 · 8–10 AM",
  },
];

export function filterNotifications(items, { search, status, type, period }) {
  let result = [...items];
  if (status && status !== "all") result = result.filter((n) => n.status === status);
  if (type && type !== "all") result = result.filter((n) => n.type === type);
  if (period && period !== "all") result = result.filter((n) => n.period === period);
  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        n.reference.toLowerCase().includes(q),
    );
  }
  return result;
}

export function getUnreadCount(items) {
  return items.filter((n) => n.status === "unread").length;
}
