export const ADMIN_USER_STATS = {
  totalUsers: "2,840",
  verifiedUsers: "2,612",
  pendingVerifications: "216",
  activeUsers: "2,704",
  suspendedUsers: "12",
  newThisMonth: "186",
};

export const ADMIN_USER_STAT_TRENDS = {
  totalUsers: { trend: 16, trendLabel: "this month" },
  verifiedUsers: { trend: 12, trendLabel: "this month" },
  pendingVerifications: { trend: -8, trendLabel: "this week" },
  activeUsers: { trend: 9, trendLabel: "this month" },
  suspendedUsers: { trend: -3, trendLabel: "this month" },
  newThisMonth: { trend: 22, trendLabel: "vs last month" },
};

export const ADMIN_USERS = [
  {
    id: "USR-1001",
    name: "John David",
    role: "ngo",
    roleLabel: "NGO Admin",
    email: "john@helpinghands.org",
    phone: "+91 98765 43210",
    status: "active",
    verification: "verified",
    joinedDate: "Mar 12, 2025",
    lastLogin: "Today, 9:42 AM",
  },
  {
    id: "USR-1002",
    name: "Rahul Kumar",
    role: "volunteer",
    roleLabel: "Volunteer",
    email: "rahul.k@email.com",
    phone: "+91 91234 56789",
    status: "active",
    verification: "verified",
    joinedDate: "Jan 8, 2025",
    lastLogin: "Today, 11:15 AM",
  },
  {
    id: "USR-1003",
    name: "Priya Sharma",
    role: "donor",
    roleLabel: "Donor",
    email: "priya@hotel.com",
    phone: "+91 99887 76655",
    status: "active",
    verification: "verified",
    joinedDate: "Feb 20, 2025",
    lastLogin: "Yesterday, 6:30 PM",
  },
  {
    id: "USR-1004",
    name: "Arjun Reddy",
    role: "volunteer",
    roleLabel: "Volunteer",
    email: "arjun.r@email.com",
    phone: "+91 90123 45678",
    status: "pending",
    verification: "pending",
    joinedDate: "Jul 2, 2026",
    lastLogin: "Jul 5, 2026",
  },
  {
    id: "USR-1005",
    name: "Sneha Patel",
    role: "donor",
    roleLabel: "Donor",
    email: "sneha@restaurant.com",
    phone: "+91 97654 32109",
    status: "active",
    verification: "verified",
    joinedDate: "Apr 3, 2025",
    lastLogin: "Today, 8:10 AM",
  },
  {
    id: "USR-1006",
    name: "Meera Nair",
    role: "ngo",
    roleLabel: "NGO Admin",
    email: "meera@sunrisehome.org",
    phone: "+91 93456 78901",
    status: "active",
    verification: "verified",
    joinedDate: "Nov 18, 2024",
    lastLogin: "Jul 4, 2026",
  },
  {
    id: "USR-1007",
    name: "Vikram Singh",
    role: "volunteer",
    roleLabel: "Volunteer",
    email: "vikram.s@email.com",
    phone: "+91 94567 89012",
    status: "suspended",
    verification: "verified",
    joinedDate: "May 14, 2025",
    lastLogin: "Jun 20, 2026",
  },
  {
    id: "USR-1008",
    name: "Platform Admin",
    role: "admin",
    roleLabel: "Admin",
    email: "admin@nourishbridge.org",
    phone: "+91 90000 00001",
    status: "active",
    verification: "verified",
    joinedDate: "Jan 1, 2024",
    lastLogin: "Today, 9:15 AM",
  },
];

export const USER_STATUS_LABELS = {
  active: "Active",
  pending: "Pending",
  suspended: "Suspended",
  inactive: "Inactive",
};

export const USER_STATUS_COLORS = {
  active: "bg-green-50 text-green-700 border-green-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  suspended: "bg-red-50 text-red-700 border-red-100",
  inactive: "bg-slate-50 text-slate-600 border-slate-200",
};

export const USER_VERIFICATION_LABELS = {
  verified: "Verified",
  pending: "Pending",
  rejected: "Rejected",
};

export const USER_VERIFICATION_COLORS = {
  verified: "bg-green-50 text-green-700 border-green-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
};

export const ROLE_FILTER_OPTIONS = [
  { id: "all", label: "All Roles" },
  { id: "donor", label: "Donor" },
  { id: "ngo", label: "NGO" },
  { id: "volunteer", label: "Volunteer" },
  { id: "admin", label: "Admin" },
];

export const STATUS_FILTER_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "suspended", label: "Suspended" },
];

export function filterAdminUsers(users, filters) {
  return users.filter((user) => {
    if (filters.role !== "all" && user.role !== filters.role) return false;
    if (filters.status !== "all" && user.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = [user.id, user.name, user.email, user.phone, user.roleLabel]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
