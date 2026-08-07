import vegBiryani from "../assets/dashboard/food/veg-biryani.jpg";
import mixedFruits from "../assets/dashboard/food/mixed-seasonal-fruits.jpg";
import idliSambar from "../assets/dashboard/food/idli-sambar.jpg";
import dalMakhani from "../assets/dashboard/food/dal-makhani-naan.jpg";
import packagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";
import freshFruits from "../assets/dashboard/ngo-food/ngo-fresh-fruits.jpg";
import dryGoods from "../assets/dashboard/ngo-food/ngo-dry-goods.jpg";
import ngoHelpingHands from "../assets/dashboard/ngo-food/ngo-logo-helping-hands.png";
import feedingIndia from "../assets/partners/feeding-india.png";
import goonj from "../assets/partners/goonj.png";
import akshayaPatra from "../assets/partners/akshaya-patra.png";

export const REQUEST_KPI = [
  { id: "total", label: "Total Food Requests", value: "1,284", trend: 16, compare: "vs last month", color: "#22C55E" },
  { id: "pending", label: "Pending Review", value: "38", trend: -12, compare: "vs last month", color: "#F59E0B" },
  { id: "approved", label: "Approved Requests", value: "92", trend: 9, compare: "vs last month", color: "#3B82F6" },
  { id: "assigned", label: "Assigned Requests", value: "64", trend: 14, compare: "vs last month", color: "#8B5CF6" },
  { id: "fulfilled", label: "Fulfilled Requests", value: "1,042", trend: 18, compare: "vs last month", color: "#16A34A" },
  { id: "rejected", label: "Rejected Requests", value: "48", trend: -8, compare: "vs last month", color: "#EF4444" },
];

export const STATUS_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "pending_review", label: "Pending Review" },
  { id: "approved", label: "Approved" },
  { id: "matching", label: "Matching Donation" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "pickup_scheduled", label: "Pickup Scheduled" },
  { id: "delivery_scheduled", label: "Delivery Scheduled" },
  { id: "fulfilled", label: "Fulfilled" },
  { id: "cancelled", label: "Cancelled" },
  { id: "rejected", label: "Rejected" },
];

export const NGO_OPTIONS = [
  { id: "all", label: "All NGOs" },
  { id: "helping_hands", label: "Helping Hands Foundation" },
  { id: "feeding_india", label: "Feeding India" },
  { id: "akshaya", label: "Akshaya Patra" },
  { id: "goonj", label: "Goonj" },
  { id: "sunrise", label: "Sunrise Home" },
];

export const CATEGORY_OPTIONS = [
  { id: "all", label: "All Categories" },
  { id: "cooked_meals", label: "Cooked Meals" },
  { id: "fruits", label: "Fruits" },
  { id: "vegetables", label: "Vegetables" },
  { id: "dairy", label: "Dairy" },
  { id: "dry_goods", label: "Dry Goods" },
  { id: "bakery", label: "Bakery" },
];

export const CITY_OPTIONS = [
  { id: "all", label: "All Cities" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "bangalore", label: "Bangalore" },
  { id: "mumbai", label: "Mumbai" },
  { id: "delhi", label: "Delhi" },
];

export const URGENCY_OPTIONS = [
  { id: "all", label: "All Urgency" },
  { id: "critical", label: "Critical" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

export const QUANTITY_OPTIONS = [
  { id: "all", label: "All Quantities" },
  { id: "small", label: "Small (< 50 meals)" },
  { id: "medium", label: "Medium (50–200)" },
  { id: "large", label: "Large (200+)" },
];

export const CATEGORY_LABELS = {
  cooked_meals: "Cooked Meals",
  fruits: "Fruits",
  vegetables: "Vegetables",
  dairy: "Dairy",
  dry_goods: "Dry Goods",
  bakery: "Bakery",
};

export const STATUS_LABELS = {
  pending_review: "Pending Review",
  approved: "Approved",
  matching: "Matching Donation",
  volunteer_assigned: "Volunteer Assigned",
  pickup_scheduled: "Pickup Scheduled",
  delivery_scheduled: "Delivery Scheduled",
  fulfilled: "Fulfilled",
  cancelled: "Cancelled",
  rejected: "Rejected",
};

export const STATUS_COLORS = {
  pending_review: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  approved: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  matching: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
  volunteer_assigned: "border-[#A5F3FC] bg-[#ECFEFF] text-[#0891B2]",
  pickup_scheduled: "border-[#99F6E4] bg-[#F0FDFA] text-[#0D9488]",
  delivery_scheduled: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  fulfilled: "border-[#86EFAC] bg-[#DCFCE7] text-[#166534]",
  cancelled: "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
  rejected: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
};

export const PRIORITY_LABELS = { critical: "Critical", high: "High", medium: "Medium", low: "Low" };

export const PRIORITY_COLORS = {
  critical: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  high: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  medium: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  low: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
};

export const WORKFLOW_STEPS = [
  { id: "created", label: "NGO Creates Request" },
  { id: "review", label: "Admin Reviews Request" },
  { id: "priority", label: "Priority Assessment" },
  { id: "matching", label: "Matching Available Donations" },
  { id: "donation_assigned", label: "Donation Assigned" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "pickup_scheduled", label: "Pickup Scheduled" },
  { id: "collected", label: "Food Collected" },
  { id: "delivered", label: "Delivered to NGO" },
  { id: "fulfilled", label: "Request Fulfilled" },
];

const STATUS_TO_STEP = {
  pending_review: "created",
  approved: "review",
  matching: "matching",
  volunteer_assigned: "volunteer_assigned",
  pickup_scheduled: "pickup_scheduled",
  delivery_scheduled: "collected",
  fulfilled: "fulfilled",
  cancelled: "review",
  rejected: "review",
};

export function getRequestWorkflowIndex(status) {
  const stepId = STATUS_TO_STEP[status] ?? "created";
  return WORKFLOW_STEPS.findIndex((s) => s.id === stepId);
}

const NGO_MAP = {
  helping_hands: { name: "Helping Hands Foundation", logo: ngoHelpingHands, id: "NGO-2045" },
  feeding_india: { name: "Feeding India", logo: feedingIndia, id: "NGO-3012" },
  akshaya: { name: "Akshaya Patra", logo: akshayaPatra, id: "NGO-2042" },
  goonj: { name: "Goonj", logo: goonj, id: "NGO-1080" },
  sunrise: { name: "Sunrise Home", logo: ngoHelpingHands, id: "NGO-1088" },
};

export const ADMIN_FOOD_REQUESTS = [
  {
    id: "REQ-7821",
    ngoKey: "helping_hands",
    ngo: "Helping Hands Foundation",
    ngoLogo: ngoHelpingHands,
    ngoId: "NGO-2045",
    contactPerson: "Meera Srinivas",
    phone: "+91 98765 11101",
    email: "requests@helpinghands.org",
    address: "Secunderabad, Hyderabad",
    category: "cooked_meals",
    foodNeeded: "Cooked Rice & Curry",
    quantity: "150 kg",
    meals: 600,
    beneficiaries: 600,
    priority: "critical",
    city: "hyderabad",
    requestedDate: "Aug 6, 2026",
    requiredBy: "Aug 6, 2026 · 8 PM",
    assignedDonation: "DON-4821",
    assignedVolunteer: "Rahul Kumar",
    status: "volunteer_assigned",
    specialInstructions: "Need hot meals for evening shelter program. 600 children expected.",
    deliveryWindow: "Aug 6, 6 PM – 8 PM",
    storageRequirements: "Hot holding — serve within 2 hours",
    approvalNotes: "Approved — critical shelter need verified.",
    documents: ["shelter_program.pdf", "beneficiary_list.xlsx"],
    map: { ngo: { x: 75, y: 25 }, donors: [{ x: 20, y: 70, label: "Grand Palace" }, { x: 35, y: 55, label: "TechCorp" }], volunteer: { x: 48, y: 48 }, eta: "45 min", distance: "8.4 km" },
    matchingDonations: [
      { id: "DON-4821", donor: "Hotel Grand Palace", food: "Veg Biryani", quantity: "85 kg", score: 94, eta: "18 min", image: vegBiryani },
      { id: "DON-4819", donor: "TechCorp India", food: "Corporate Lunch", quantity: "120 meals", score: 88, eta: "25 min", image: packagedMeals },
      { id: "DON-4813", donor: "Green Valley", food: "Sandwiches", quantity: "200 units", score: 72, eta: "35 min", image: mixedFruits },
    ],
    timeline: [
      { time: "Aug 6, 10:00 AM", event: "Request submitted by Helping Hands" },
      { time: "Aug 6, 10:30 AM", event: "Admin reviewed — marked critical" },
      { time: "Aug 6, 11:00 AM", event: "Donation DON-4821 matched" },
      { time: "Aug 6, 11:15 AM", event: "Volunteer Rahul Kumar assigned" },
    ],
  },
  {
    id: "REQ-7820",
    ngoKey: "feeding_india",
    ngo: "Feeding India",
    ngoLogo: feedingIndia,
    ngoId: "NGO-3012",
    contactPerson: "Arun Mehta",
    phone: "+91 91234 22202",
    email: "ops@feedingindia.org",
    address: "Madhapur, Hyderabad",
    category: "fruits",
    foodNeeded: "Fresh Seasonal Fruits",
    quantity: "50 kg",
    meals: 200,
    beneficiaries: 200,
    priority: "high",
    city: "hyderabad",
    requestedDate: "Aug 6, 2026",
    requiredBy: "Aug 7, 2026 · 12 PM",
    assignedDonation: "DON-4820",
    assignedVolunteer: "Priya Sharma",
    status: "pickup_scheduled",
    specialInstructions: "For children's nutrition program.",
    deliveryWindow: "Aug 6, 2 PM – 4 PM",
    storageRequirements: "Cold storage 2–8°C",
    approvalNotes: "Approved for nutrition program.",
    documents: ["nutrition_program.pdf"],
    map: { ngo: { x: 70, y: 35 }, donors: [{ x: 30, y: 60 }], volunteer: { x: 55, y: 50 }, eta: "12 min", distance: "5.2 km" },
    matchingDonations: [
      { id: "DON-4820", donor: "Paradise Biryani", food: "Mixed Fruits", quantity: "32 kg", score: 91, eta: "12 min", image: mixedFruits },
      { id: "DON-4817", donor: "Fresh Bake Co.", food: "Fruit Boxes", quantity: "20 kg", score: 65, eta: "28 min", image: freshFruits },
    ],
    timeline: [
      { time: "Aug 6, 9:00 AM", event: "Request submitted" },
      { time: "Aug 6, 9:45 AM", event: "Approved and matched" },
      { time: "Aug 6, 12:10 PM", event: "Pickup scheduled" },
    ],
  },
  {
    id: "REQ-7819",
    ngoKey: "akshaya",
    ngo: "Akshaya Patra",
    ngoLogo: akshayaPatra,
    ngoId: "NGO-2042",
    contactPerson: "Lakshmi Rao",
    phone: "+91 99887 33303",
    email: "kitchen@akshayapatra.org",
    address: "Kukatpally, Hyderabad",
    category: "cooked_meals",
    foodNeeded: "Midday Meal — Rice & Dal",
    quantity: "200 kg",
    meals: 800,
    beneficiaries: 800,
    priority: "high",
    city: "hyderabad",
    requestedDate: "Aug 5, 2026",
    requiredBy: "Aug 6, 2026 · 12 PM",
    assignedDonation: "DON-4818",
    assignedVolunteer: "Sneha Reddy",
    status: "fulfilled",
    specialInstructions: "School midday meal program.",
    deliveryWindow: "Aug 5, 10 AM – 12 PM",
    storageRequirements: "Hot holding",
    approvalNotes: "Fulfilled successfully.",
    documents: [],
    map: { ngo: { x: 85, y: 30 }, donors: [{ x: 40, y: 65 }], volunteer: { x: 85, y: 30 }, eta: "Completed", distance: "11.2 km" },
    matchingDonations: [],
    timeline: [
      { time: "Aug 5, 6:00 AM", event: "Request submitted" },
      { time: "Aug 5, 6:30 AM", event: "Matched and delivered" },
      { time: "Aug 5, 8:00 AM", event: "Request fulfilled" },
    ],
  },
  {
    id: "REQ-7818",
    ngoKey: "goonj",
    ngo: "Goonj",
    ngoLogo: goonj,
    ngoId: "NGO-1080",
    contactPerson: "Rajesh Kumar",
    phone: "+91 87654 44404",
    email: "food@goonj.org",
    address: "Kondapur, Hyderabad",
    category: "dry_goods",
    foodNeeded: "Rice, Dal & Cooking Essentials",
    quantity: "100 kg",
    meals: 400,
    beneficiaries: 400,
    priority: "medium",
    city: "hyderabad",
    requestedDate: "Aug 6, 2026",
    requiredBy: "Aug 8, 2026",
    assignedDonation: "—",
    assignedVolunteer: "—",
    status: "matching",
    specialInstructions: "For rural outreach camp next week.",
    deliveryWindow: "Aug 7 – Aug 8",
    storageRequirements: "Ambient, dry storage",
    approvalNotes: "Approved — searching for matching donations.",
    documents: ["outreach_plan.pdf"],
    map: { ngo: { x: 65, y: 45 }, donors: [{ x: 35, y: 50 }], volunteer: null, eta: "—", distance: "—" },
    matchingDonations: [
      { id: "DON-4817", donor: "Fresh Bake Co.", food: "Dry Goods Bundle", quantity: "60 kg", score: 78, eta: "2 days", image: dryGoods },
    ],
    timeline: [
      { time: "Aug 6, 8:00 AM", event: "Request submitted" },
      { time: "Aug 6, 9:00 AM", event: "Approved — matching in progress" },
    ],
  },
  {
    id: "REQ-7817",
    ngoKey: "sunrise",
    ngo: "Sunrise Home",
    ngoLogo: ngoHelpingHands,
    ngoId: "NGO-1088",
    contactPerson: "Priya Nair",
    phone: "+91 94567 55505",
    email: "care@sunrisehome.org",
    address: "Begumpet, Hyderabad",
    category: "dairy",
    foodNeeded: "Milk & Curd",
    quantity: "30 L",
    meals: 60,
    beneficiaries: 60,
    priority: "medium",
    city: "hyderabad",
    requestedDate: "Aug 6, 2026",
    requiredBy: "Aug 6, 2026 · 6 PM",
    assignedDonation: "—",
    assignedVolunteer: "—",
    status: "pending_review",
    specialInstructions: "For elderly residents.",
    deliveryWindow: "Aug 6, 4 PM – 6 PM",
    storageRequirements: "Refrigerated 2–4°C",
    approvalNotes: "",
    documents: [],
    map: { ngo: { x: 80, y: 40 }, donors: [], volunteer: null, eta: "—", distance: "—" },
    matchingDonations: [],
    timeline: [{ time: "Aug 6, 2:00 PM", event: "Request submitted — awaiting review" }],
  },
  {
    id: "REQ-7816",
    ngoKey: "helping_hands",
    ngo: "Helping Hands Foundation",
    ngoLogo: ngoHelpingHands,
    ngoId: "NGO-2045",
    contactPerson: "Meera Srinivas",
    phone: "+91 98765 11101",
    email: "requests@helpinghands.org",
    address: "Secunderabad, Hyderabad",
    category: "cooked_meals",
    foodNeeded: "Breakfast — Idli & Sambar",
    quantity: "80 kg",
    meals: 320,
    beneficiaries: 320,
    priority: "low",
    city: "hyderabad",
    requestedDate: "Aug 4, 2026",
    requiredBy: "Aug 5, 2026 · 9 AM",
    assignedDonation: "DON-4818",
    assignedVolunteer: "Sneha Reddy",
    status: "fulfilled",
    specialInstructions: "Morning shelter breakfast.",
    deliveryWindow: "Aug 5, 7 AM – 9 AM",
    storageRequirements: "Hot",
    approvalNotes: "Completed on time.",
    documents: [],
    map: { ngo: { x: 75, y: 25 }, donors: [{ x: 40, y: 65 }], volunteer: { x: 75, y: 25 }, eta: "Completed", distance: "11.2 km" },
    matchingDonations: [],
    timeline: [
      { time: "Aug 4, 4:00 PM", event: "Request submitted" },
      { time: "Aug 5, 8:00 AM", event: "Fulfilled" },
    ],
  },
  {
    id: "REQ-7815",
    ngoKey: "feeding_india",
    ngo: "Feeding India",
    ngoLogo: feedingIndia,
    ngoId: "NGO-3012",
    contactPerson: "Arun Mehta",
    phone: "+91 91234 22202",
    email: "ops@feedingindia.org",
    address: "Madhapur, Hyderabad",
    category: "bakery",
    foodNeeded: "Bread & Baked Goods",
    quantity: "40 kg",
    meals: 120,
    beneficiaries: 120,
    priority: "low",
    city: "hyderabad",
    requestedDate: "Aug 3, 2026",
    requiredBy: "Aug 4, 2026",
    assignedDonation: "—",
    assignedVolunteer: "—",
    status: "rejected",
    specialInstructions: "Duplicate request — already fulfilled via REQ-7810.",
    deliveryWindow: "—",
    storageRequirements: "Ambient",
    approvalNotes: "Rejected — duplicate of existing fulfilled request.",
    documents: [],
    map: null,
    matchingDonations: [],
    timeline: [
      { time: "Aug 3, 10:00 AM", event: "Request submitted" },
      { time: "Aug 3, 11:00 AM", event: "Rejected — duplicate request" },
    ],
  },
  {
    id: "REQ-7814",
    ngoKey: "akshaya",
    ngo: "Akshaya Patra",
    ngoLogo: akshayaPatra,
    ngoId: "NGO-2042",
    contactPerson: "Lakshmi Rao",
    phone: "+91 99887 33303",
    email: "kitchen@akshayapatra.org",
    address: "Kukatpally, Hyderabad",
    category: "cooked_meals",
    foodNeeded: "Dal Makhani & Naan",
    quantity: "55 kg",
    meals: 220,
    beneficiaries: 220,
    priority: "high",
    city: "hyderabad",
    requestedDate: "Aug 6, 2026",
    requiredBy: "Aug 6, 2026 · 10 PM",
    assignedDonation: "DON-4812",
    assignedVolunteer: "Amit Patel",
    status: "delivery_scheduled",
    specialInstructions: "Evening community kitchen.",
    deliveryWindow: "Aug 6, 8 PM – 10 PM",
    storageRequirements: "Hot holding",
    approvalNotes: "Approved and scheduled.",
    documents: [],
    map: { ngo: { x: 82, y: 32 }, donors: [{ x: 42, y: 62 }], volunteer: { x: 60, y: 45 }, eta: "22 min", distance: "7.3 km" },
    matchingDonations: [
      { id: "DON-4812", donor: "Dal & Spice Kitchen", food: "Dal Makhani", quantity: "55 kg", score: 96, eta: "22 min", image: dalMakhani },
    ],
    timeline: [
      { time: "Aug 6, 4:00 PM", event: "Request submitted" },
      { time: "Aug 6, 4:30 PM", event: "Approved and assigned" },
      { time: "Aug 6, 6:05 PM", event: "Food collected — delivery scheduled" },
    ],
  },
];

export const REQUESTS_BY_CATEGORY = [
  { name: "Cooked Meals", value: 42, color: "#22C55E" },
  { name: "Fruits", value: 18, color: "#F59E0B" },
  { name: "Dry Goods", value: 15, color: "#84CC16" },
  { name: "Dairy", value: 10, color: "#3B82F6" },
  { name: "Bakery", value: 8, color: "#A855F7" },
  { name: "Others", value: 7, color: "#94A3B8" },
];

export const REQUESTS_BY_CITY = [
  { city: "Hyderabad", count: 520 },
  { city: "Bangalore", count: 312 },
  { city: "Mumbai", count: 248 },
  { city: "Delhi", count: 124 },
  { city: "Chennai", count: 80 },
];

export const MONTHLY_REQUEST_TREND = [
  { month: "Mar", count: 820 },
  { month: "Apr", count: 912 },
  { month: "May", count: 1048 },
  { month: "Jun", count: 1120 },
  { month: "Jul", count: 1180 },
  { month: "Aug", count: 1284 },
];

export const URGENCY_DISTRIBUTION = [
  { name: "Critical", value: 12, color: "#EF4444" },
  { name: "High", value: 28, color: "#F59E0B" },
  { name: "Medium", value: 38, color: "#3B82F6" },
  { name: "Low", value: 22, color: "#94A3B8" },
];

export const FULFILLMENT_RATE = [
  { month: "Mar", rate: 78 },
  { month: "Apr", rate: 80 },
  { month: "May", rate: 82 },
  { month: "Jun", rate: 84 },
  { month: "Jul", rate: 86 },
  { month: "Aug", rate: 88 },
];

export const AVG_RESPONSE_TIME = [
  { month: "Mar", hours: 4.2 },
  { month: "Apr", hours: 3.8 },
  { month: "May", hours: 3.2 },
  { month: "Jun", hours: 2.8 },
  { month: "Jul", hours: 2.4 },
  { month: "Aug", hours: 2.1 },
];

export const REQUEST_ALERTS = [
  { id: "critical", emoji: "🔴", title: "Critical Requests", description: "5 requests marked critical need immediate action.", action: "Review Now", color: "border-[#FECACA] bg-[#FEF2F2]" },
  { id: "waiting", emoji: "🟠", title: "Waiting Over 24 Hours", description: "12 requests pending review for over 24 hours.", action: "Process Queue", color: "border-[#FDE68A] bg-[#FFFBEB]" },
  { id: "unmatched", emoji: "🟡", title: "Unmatched Requests", description: "8 approved requests without donation match.", action: "Match Now", color: "border-[#FEF3C7] bg-[#FFFBEB]" },
  { id: "delay", emoji: "🔵", title: "Delivery Delays", description: "3 scheduled deliveries running behind.", action: "Track", color: "border-[#BFDBFE] bg-[#EFF6FF]" },
  { id: "fulfilled", emoji: "🟢", title: "Recently Fulfilled", description: "42 requests fulfilled in the last 24 hours.", action: "View Report", color: "border-[#BBF7D0] bg-[#F0FDF4]" },
];

export function filterFoodRequests(requests, filters) {
  return requests.filter((r) => {
    if (filters.status !== "all" && r.status !== filters.status) return false;
    if (filters.category !== "all" && r.category !== filters.category) return false;
    if (filters.city !== "all" && r.city !== filters.city) return false;
    if (filters.urgency !== "all" && r.priority !== filters.urgency) return false;
    if (filters.ngo !== "all") {
      const ngo = NGO_MAP[filters.ngo];
      if (ngo && r.ngo !== ngo.name) return false;
    }
    if (filters.quantity !== "all") {
      const m = r.meals;
      if (filters.quantity === "small" && m >= 50) return false;
      if (filters.quantity === "medium" && (m < 50 || m >= 200)) return false;
      if (filters.quantity === "large" && m < 200) return false;
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const hay = [r.id, r.ngo, r.contactPerson, r.foodNeeded, r.assignedDonation, r.assignedVolunteer].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortFoodRequests(requests, key, dir) {
  const sorted = [...requests];
  const mult = dir === "asc" ? 1 : -1;
  sorted.sort((a, b) => {
    let av = a[key];
    let bv = b[key];
    if (["meals", "beneficiaries"].includes(key)) {
      av = Number(av);
      bv = Number(bv);
    } else {
      av = String(av ?? "").toLowerCase();
      bv = String(bv ?? "").toLowerCase();
    }
    if (av < bv) return -1 * mult;
    if (av > bv) return 1 * mult;
    return 0;
  });
  return sorted;
}
