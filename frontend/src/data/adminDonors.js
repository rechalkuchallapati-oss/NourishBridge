import hotelImg from "../assets/dashboard/ngo-food/ngo-corporate-lunch.jpg";
import restaurantImg from "../assets/dashboard/food/veg-biryani.jpg";
import cafeImg from "../assets/dashboard/food/sandwiches-pastries.jpg";
import corporateImg from "../assets/dashboard/food/assorted-bread-loaves.jpg";
import cateringImg from "../assets/dashboard/food/butter-chicken-naan.jpg";
import individualImg from "../assets/dashboard/food/mixed-seasonal-fruits.jpg";

export const DONOR_KPI = [
  { id: "total", label: "Registered Donors", value: "420", trend: 14, compare: "vs last month", color: "#22C55E" },
  { id: "active", label: "Active This Month", value: "128", trend: 9, compare: "vs last month", color: "#3B82F6" },
  { id: "recurring", label: "Recurring Donors", value: "64", trend: 18, compare: "vs last month", color: "#8B5CF6" },
  { id: "new", label: "New This Week", value: "18", trend: 22, compare: "vs last week", color: "#F59E0B" },
  { id: "meals", label: "Meals Contributed", value: "84,200", trend: 16, compare: "vs last month", color: "#16A34A" },
  { id: "verified", label: "Verified Donors", value: "392", trend: 5, compare: "vs last month", color: "#06B6D4" },
  { id: "avg", label: "Avg. Donations / Donor", value: "6.8", trend: 4, compare: "vs last month", color: "#EC4899" },
  { id: "retention", label: "Retention Rate", value: "78%", trend: 7, compare: "vs last quarter", color: "#6366F1" },
];

export const DONOR_TYPE_OPTIONS = [
  { id: "all", label: "All Types" },
  { id: "hotel", label: "Hotel" },
  { id: "restaurant", label: "Restaurant" },
  { id: "cafe", label: "Café" },
  { id: "corporate", label: "Corporate" },
  { id: "catering", label: "Catering" },
  { id: "individual", label: "Individual" },
  { id: "event", label: "Event Organizer" },
];

export const CITY_OPTIONS = [
  { id: "all", label: "All Cities" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "bangalore", label: "Bangalore" },
  { id: "mumbai", label: "Mumbai" },
  { id: "delhi", label: "Delhi" },
  { id: "chennai", label: "Chennai" },
];

export const STATUS_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
  { id: "pending", label: "Pending Verification" },
  { id: "suspended", label: "Suspended" },
];

export const TIER_OPTIONS = [
  { id: "all", label: "All Tiers" },
  { id: "platinum", label: "Platinum" },
  { id: "gold", label: "Gold" },
  { id: "silver", label: "Silver" },
  { id: "bronze", label: "Bronze" },
  { id: "member", label: "Member" },
];

export const DONOR_TYPE_LABELS = {
  hotel: "Hotel",
  restaurant: "Restaurant",
  cafe: "Café",
  corporate: "Corporate",
  catering: "Catering",
  individual: "Individual",
  event: "Event Organizer",
};

export const STATUS_LABELS = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  suspended: "Suspended",
};

export const STATUS_COLORS = {
  active: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  inactive: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
  pending: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  suspended: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
};

export const DONOR_TIERS = {
  platinum: {
    id: "platinum",
    label: "Platinum",
    emoji: "💎",
    medal: "Platinum Elite",
    color: "border-[#C4B5FD] bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] text-[#6D28D9]",
    ring: "ring-[#A78BFA]/40",
    minDonations: 50,
  },
  gold: {
    id: "gold",
    label: "Gold",
    emoji: "🥇",
    medal: "Gold Partner",
    color: "border-[#FDE68A] bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] text-[#B45309]",
    ring: "ring-[#F59E0B]/35",
    minDonations: 35,
  },
  silver: {
    id: "silver",
    label: "Silver",
    emoji: "🥈",
    medal: "Silver Supporter",
    color: "border-[#CBD5E1] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] text-[#475569]",
    ring: "ring-[#94A3B8]/35",
    minDonations: 20,
  },
  bronze: {
    id: "bronze",
    label: "Bronze",
    emoji: "🥉",
    medal: "Bronze Contributor",
    color: "border-[#FED7AA] bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] text-[#C2410C]",
    ring: "ring-[#FB923C]/35",
    minDonations: 10,
  },
  member: {
    id: "member",
    label: "Member",
    emoji: "⭐",
    medal: "Community Member",
    color: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
    ring: "ring-[#E2E8F0]",
    minDonations: 0,
  },
};

export function getDonorTier(donationCount) {
  if (donationCount >= 50) return DONOR_TIERS.platinum;
  if (donationCount >= 35) return DONOR_TIERS.gold;
  if (donationCount >= 20) return DONOR_TIERS.silver;
  if (donationCount >= 10) return DONOR_TIERS.bronze;
  return DONOR_TIERS.member;
}

export const MONTHLY_DONOR_GROWTH = [
  { month: "Jan", donors: 312, newDonors: 18 },
  { month: "Feb", donors: 328, newDonors: 16 },
  { month: "Mar", donors: 345, newDonors: 17 },
  { month: "Apr", donors: 362, newDonors: 17 },
  { month: "May", donors: 378, newDonors: 16 },
  { month: "Jun", donors: 395, newDonors: 17 },
  { month: "Jul", donors: 420, newDonors: 25 },
];

export const DONOR_TYPE_CHART = [
  { name: "Restaurant", value: 32, color: "#22C55E" },
  { name: "Hotel", value: 24, color: "#3B82F6" },
  { name: "Corporate", value: 18, color: "#8B5CF6" },
  { name: "Café", value: 12, color: "#F59E0B" },
  { name: "Catering", value: 8, color: "#EC4899" },
  { name: "Individual", value: 6, color: "#06B6D4" },
];

export const WEEKLY_DONATIONS = [
  { day: "Mon", count: 28 },
  { day: "Tue", count: 34 },
  { day: "Wed", count: 42 },
  { day: "Thu", count: 38 },
  { day: "Fri", count: 52 },
  { day: "Sat", count: 48 },
  { day: "Sun", count: 36 },
];

export const MEALS_BY_MONTH = [
  { month: "Jan", meals: 9800 },
  { month: "Feb", meals: 10400 },
  { month: "Mar", meals: 11200 },
  { month: "Apr", meals: 11800 },
  { month: "May", meals: 12500 },
  { month: "Jun", meals: 13200 },
  { month: "Jul", meals: 14800 },
];

export const DONOR_ALERTS = [
  { id: "a1", emoji: "🏆", title: "Gold tier milestone", description: "Paradise Biryani reached 36 donations — eligible for Gold Partner badge.", action: "Review award", color: "border-[#FDE68A] bg-[#FFFBEB]" },
  { id: "a2", emoji: "📋", title: "Pending verifications", description: "14 new donor registrations await document verification.", action: "Open queue", color: "border-[#BFDBFE] bg-[#EFF6FF]" },
  { id: "a3", emoji: "🔁", title: "Recurring donors up", description: "Recurring donor count rose 18% this month across Hyderabad.", action: "View report", color: "border-[#BBF7D0] bg-[#F0FDF4]" },
  { id: "a4", emoji: "⚠️", title: "Inactive donor alert", description: "22 verified donors have not donated in the last 60 days.", action: "Send reminder", color: "border-[#FECACA] bg-[#FEF2F2]" },
  { id: "a5", emoji: "💎", title: "Platinum elite", description: "Hotel Grand Palace maintained Platinum status for 6 consecutive months.", action: "View profile", color: "border-[#DDD6FE] bg-[#F5F3FF]" },
];

export const ADMIN_DONORS = [
  {
    id: "DNR-501",
    name: "Hotel Grand Palace",
    type: "hotel",
    city: "hyderabad",
    email: "donations@grandpalace.com",
    phone: "+91 98765 43210",
    donations: 58,
    mealsContributed: 3840,
    recurring: true,
    status: "active",
    verified: true,
    lastDonation: "Today",
    joined: "Jan 2024",
    rating: 4.9,
    avatar: hotelImg,
    contactPerson: "Rajesh Mehta",
    avgQuantity: "68 kg",
    preferredPickup: "Evening",
  },
  {
    id: "DNR-388",
    name: "Paradise Biryani",
    type: "restaurant",
    city: "hyderabad",
    email: "csr@paradisebiryani.com",
    phone: "+91 98765 11122",
    donations: 42,
    mealsContributed: 2840,
    recurring: true,
    status: "active",
    verified: true,
    lastDonation: "Yesterday",
    joined: "Mar 2024",
    rating: 4.8,
    avatar: restaurantImg,
    contactPerson: "Anita Rao",
    avgQuantity: "45 kg",
    preferredPickup: "Afternoon",
  },
  {
    id: "DNR-220",
    name: "Daily Bread Café",
    type: "cafe",
    city: "bangalore",
    email: "hello@dailybread.in",
    phone: "+91 98765 33344",
    donations: 36,
    mealsContributed: 2180,
    recurring: true,
    status: "active",
    verified: true,
    lastDonation: "2 days ago",
    joined: "Apr 2024",
    rating: 4.7,
    avatar: cafeImg,
    contactPerson: "David Fernandes",
    avgQuantity: "22 kg",
    preferredPickup: "Morning",
  },
  {
    id: "DNR-412",
    name: "TechCorp India",
    type: "corporate",
    city: "hyderabad",
    email: "impact@techcorp.in",
    phone: "+91 98765 55566",
    donations: 28,
    mealsContributed: 1920,
    recurring: true,
    status: "active",
    verified: true,
    lastDonation: "3 days ago",
    joined: "Jun 2024",
    rating: 4.9,
    avatar: corporateImg,
    contactPerson: "Sneha Iyer",
    avgQuantity: "120 meals",
    preferredPickup: "Weekdays",
  },
  {
    id: "DNR-315",
    name: "Spice Route Catering",
    type: "catering",
    city: "mumbai",
    email: "rescue@spiceroute.com",
    phone: "+91 98765 77788",
    donations: 24,
    mealsContributed: 1680,
    recurring: false,
    status: "active",
    verified: true,
    lastDonation: "4 days ago",
    joined: "Aug 2024",
    rating: 4.6,
    avatar: cateringImg,
    contactPerson: "Imran Khan",
    avgQuantity: "80 kg",
    preferredPickup: "Post-event",
  },
  {
    id: "DNR-178",
    name: "Priya Sharma",
    type: "individual",
    city: "delhi",
    email: "priya.sharma@email.com",
    phone: "+91 98765 99900",
    donations: 18,
    mealsContributed: 420,
    recurring: false,
    status: "active",
    verified: true,
    lastDonation: "1 week ago",
    joined: "Oct 2024",
    rating: 4.8,
    avatar: individualImg,
    contactPerson: "Priya Sharma",
    avgQuantity: "12 kg",
    preferredPickup: "Flexible",
  },
  {
    id: "DNR-602",
    name: "Akshaya Banquet Hall",
    type: "event",
    city: "chennai",
    email: "events@akshayabanquet.com",
    phone: "+91 98765 12121",
    donations: 15,
    mealsContributed: 980,
    recurring: false,
    status: "active",
    verified: true,
    lastDonation: "1 week ago",
    joined: "Nov 2024",
    rating: 4.5,
    avatar: hotelImg,
    contactPerson: "Karthik Venkat",
    avgQuantity: "150 meals",
    preferredPickup: "Late night",
  },
  {
    id: "DNR-144",
    name: "Green Leaf Restaurant",
    type: "restaurant",
    city: "bangalore",
    email: "kitchen@greenleaf.in",
    phone: "+91 98765 34343",
    donations: 12,
    mealsContributed: 760,
    recurring: false,
    status: "active",
    verified: true,
    lastDonation: "2 weeks ago",
    joined: "Dec 2024",
    rating: 4.4,
    avatar: restaurantImg,
    contactPerson: "Meera Nair",
    avgQuantity: "30 kg",
    preferredPickup: "Evening",
  },
  {
    id: "DNR-089",
    name: "Sunrise Bakery",
    type: "cafe",
    city: "hyderabad",
    email: "team@sunrisebakery.in",
    phone: "+91 98765 56565",
    donations: 8,
    mealsContributed: 320,
    recurring: false,
    status: "inactive",
    verified: true,
    lastDonation: "45 days ago",
    joined: "Feb 2025",
    rating: 4.2,
    avatar: cafeImg,
    contactPerson: "Ali Hassan",
    avgQuantity: "15 kg",
    preferredPickup: "Morning",
  },
  {
    id: "DNR-033",
    name: "Metro Foods Pvt Ltd",
    type: "corporate",
    city: "mumbai",
    email: "donate@metrofoods.com",
    phone: "+91 98765 78787",
    donations: 6,
    mealsContributed: 480,
    recurring: false,
    status: "pending",
    verified: false,
    lastDonation: "—",
    joined: "Jul 2025",
    rating: 0,
    avatar: corporateImg,
    contactPerson: "Vikram Shah",
    avgQuantity: "—",
    preferredPickup: "—",
  },
  {
    id: "DNR-701",
    name: "Royal Feast Hotel",
    type: "hotel",
    city: "delhi",
    email: "csr@royalfeast.com",
    phone: "+91 98765 90909",
    donations: 52,
    mealsContributed: 3420,
    recurring: true,
    status: "active",
    verified: true,
    lastDonation: "Today",
    joined: "Feb 2024",
    rating: 4.9,
    avatar: hotelImg,
    contactPerson: "Neha Kapoor",
    avgQuantity: "72 kg",
    preferredPickup: "Evening",
  },
  {
    id: "DNR-455",
    name: "Fresh Harvest Market",
    type: "individual",
    city: "chennai",
    email: "freshharvest@email.com",
    phone: "+91 98765 23232",
    donations: 22,
    mealsContributed: 640,
    recurring: true,
    status: "active",
    verified: true,
    lastDonation: "5 days ago",
    joined: "May 2024",
    rating: 4.7,
    avatar: individualImg,
    contactPerson: "Lakshmi Prasad",
    avgQuantity: "18 kg",
    preferredPickup: "Morning",
  },
];

export function getTopFrequentDonors(donors = ADMIN_DONORS, limit = 5) {
  return [...donors]
    .sort((a, b) => b.donations - a.donations)
    .slice(0, limit)
    .map((donor, index) => ({
      ...donor,
      rank: index + 1,
      tier: getDonorTier(donor.donations),
    }));
}

export function filterDonors(donors, filters) {
  const q = filters.search?.trim().toLowerCase();
  return donors.filter((d) => {
    if (filters.type !== "all" && d.type !== filters.type) return false;
    if (filters.city !== "all" && d.city !== filters.city) return false;
    if (filters.status !== "all" && d.status !== filters.status) return false;
    if (filters.tier !== "all") {
      const tier = getDonorTier(d.donations).id;
      if (tier !== filters.tier) return false;
    }
    if (filters.recurring === "yes" && !d.recurring) return false;
    if (filters.recurring === "no" && d.recurring) return false;
    if (q) {
      const hay = [d.id, d.name, d.email, d.contactPerson, d.city].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortDonors(donors, key, dir) {
  const sorted = [...donors].sort((a, b) => {
    let av = a[key];
    let bv = b[key];
    if (typeof av === "string") av = av.toLowerCase();
    if (typeof bv === "string") bv = bv.toLowerCase();
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  });
  return dir === "desc" ? sorted.reverse() : sorted;
}
