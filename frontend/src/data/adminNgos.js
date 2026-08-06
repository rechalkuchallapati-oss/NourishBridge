export const ADMIN_NGO_STATS = {
  totalNgos: "62",
  verifiedNgos: "54",
  pendingVerification: "6",
  suspendedNgos: "2",
  rejectedNgos: "3",
  activeNgos: "58",
};

export const ADMIN_NGO_STAT_TRENDS = {
  totalNgos: { trend: 14, trendLabel: "this month" },
  verifiedNgos: { trend: 10, trendLabel: "this month" },
  pendingVerification: { trend: -5, trendLabel: "this week" },
  suspendedNgos: { trend: -2, trendLabel: "this month" },
  rejectedNgos: { trend: 1, trendLabel: "this month" },
  activeNgos: { trend: 11, trendLabel: "this month" },
};

export const ADMIN_NGOS = [
  {
    id: "NGO-2045",
    name: "Helping Hands Foundation",
    contactPerson: "John David",
    email: "john@helpinghands.org",
    phone: "+91 98765 43210",
    city: "Hyderabad",
    verification: "verified",
    capacity: "1,500 kg",
    coldStorage: "500 kg",
    dryStorage: "1,000 kg",
    utilization: "72%",
    status: "active",
    joinedDate: "Mar 12, 2025",
    rating: 4.9,
    mealsServed: "54,820",
    registrationNumber: "NGO-2045",
    address: "Gachibowli, Hyderabad, Telangana",
    serviceAreas: ["Hyderabad", "Gachibowli", "Madhapur"],
    mission: "Reducing hunger by distributing surplus food to vulnerable communities across Telangana.",
  },
  {
    id: "NGO-1088",
    name: "Sunrise Home",
    contactPerson: "Meera Nair",
    email: "meera@sunrisehome.org",
    phone: "+91 93456 78901",
    city: "Secunderabad",
    verification: "verified",
    capacity: "800 kg",
    coldStorage: "300 kg",
    dryStorage: "500 kg",
    utilization: "65%",
    status: "active",
    joinedDate: "Nov 18, 2024",
    rating: 4.7,
    mealsServed: "28,400",
    registrationNumber: "NGO-1088",
    address: "Secunderabad, Telangana",
    serviceAreas: ["Secunderabad", "Kukatpally"],
    mission: "Providing daily meals and shelter support for underserved families.",
  },
  {
    id: "NGO-3012",
    name: "Feeding India Hub",
    contactPerson: "Arjun Reddy",
    email: "arjun@feedingindia.org",
    phone: "+91 90123 45678",
    city: "Kukatpally",
    verification: "pending",
    capacity: "600 kg",
    coldStorage: "200 kg",
    dryStorage: "400 kg",
    utilization: "—",
    status: "pending",
    joinedDate: "Jul 2, 2026",
    rating: null,
    mealsServed: "—",
    registrationNumber: "NGO-3012",
    address: "Kukatpally, Hyderabad, Telangana",
    serviceAreas: ["Kukatpally"],
    mission: "Connecting surplus food from donors to community kitchens.",
  },
  {
    id: "NGO-2201",
    name: "Hope Shelter Trust",
    contactPerson: "Priya Sharma",
    email: "priya@hopeshelter.org",
    phone: "+91 99887 76655",
    city: "Madhapur",
    verification: "verified",
    capacity: "1,200 kg",
    coldStorage: "400 kg",
    dryStorage: "800 kg",
    utilization: "81%",
    status: "active",
    joinedDate: "Jun 5, 2025",
    rating: 4.8,
    mealsServed: "32,100",
    registrationNumber: "NGO-2201",
    address: "Madhapur, Hyderabad, Telangana",
    serviceAreas: ["Madhapur", "HITEC City"],
    mission: "Emergency food relief and shelter meals for vulnerable populations.",
  },
  {
    id: "NGO-1890",
    name: "Green Valley Outreach",
    contactPerson: "Vikram Singh",
    email: "vikram@greenvalley.org",
    phone: "+91 94567 89012",
    city: "Gachibowli",
    verification: "rejected",
    capacity: "—",
    coldStorage: "—",
    dryStorage: "—",
    utilization: "—",
    status: "rejected",
    joinedDate: "May 14, 2025",
    rating: null,
    mealsServed: "—",
    registrationNumber: "NGO-1890",
    address: "Gachibowli, Hyderabad, Telangana",
    serviceAreas: [],
    mission: "Application rejected — incomplete documentation.",
  },
  {
    id: "NGO-1567",
    name: "Community Kitchen Network",
    contactPerson: "Sneha Patel",
    email: "sneha@communitykitchen.org",
    phone: "+91 97654 32109",
    city: "Hyderabad",
    verification: "verified",
    capacity: "900 kg",
    coldStorage: "350 kg",
    dryStorage: "550 kg",
    utilization: "58%",
    status: "suspended",
    joinedDate: "Apr 3, 2025",
    rating: 4.2,
    mealsServed: "12,800",
    registrationNumber: "NGO-1567",
    address: "Hyderabad, Telangana",
    serviceAreas: ["Hyderabad", "Shamshabad"],
    mission: "Community kitchen operations suspended pending compliance review.",
  },
];

export const NGO_STATUS_LABELS = {
  active: "Active",
  pending: "Pending",
  suspended: "Suspended",
  rejected: "Rejected",
  inactive: "Inactive",
};

export const NGO_STATUS_COLORS = {
  active: "bg-green-50 text-green-700 border-green-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  suspended: "bg-red-50 text-red-700 border-red-100",
  rejected: "bg-slate-50 text-slate-600 border-slate-200",
  inactive: "bg-slate-50 text-slate-600 border-slate-200",
};

export const NGO_VERIFICATION_LABELS = {
  verified: "Verified",
  pending: "Pending",
  rejected: "Rejected",
};

export const NGO_VERIFICATION_COLORS = {
  verified: "bg-green-50 text-green-700 border-green-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
};

export const VERIFICATION_FILTER_OPTIONS = [
  { id: "all", label: "All Verification" },
  { id: "verified", label: "Verified" },
  { id: "pending", label: "Pending" },
  { id: "rejected", label: "Rejected" },
];

export const CITY_FILTER_OPTIONS = [
  { id: "all", label: "All Cities" },
  { id: "Hyderabad", label: "Hyderabad" },
  { id: "Secunderabad", label: "Secunderabad" },
  { id: "Kukatpally", label: "Kukatpally" },
  { id: "Gachibowli", label: "Gachibowli" },
  { id: "Madhapur", label: "Madhapur" },
];

export const NGO_STATUS_FILTER_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "suspended", label: "Suspended" },
  { id: "rejected", label: "Rejected" },
];

export function filterAdminNgos(ngos, filters) {
  return ngos.filter((ngo) => {
    if (filters.verification !== "all" && ngo.verification !== filters.verification) return false;
    if (filters.city !== "all" && ngo.city !== filters.city) return false;
    if (filters.status !== "all" && ngo.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = [
        ngo.id,
        ngo.name,
        ngo.contactPerson,
        ngo.email,
        ngo.city,
        ngo.registrationNumber,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
