import vegBiryani from "../assets/dashboard/food/veg-biryani.jpg";
import mixedFruits from "../assets/dashboard/food/mixed-seasonal-fruits.jpg";
import idliSambar from "../assets/dashboard/food/idli-sambar.jpg";
import dalMakhani from "../assets/dashboard/food/dal-makhani-naan.jpg";
import packagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";
import paneerCurry from "../assets/dashboard/food/paneer-curry.jpg";
import volunteerPrimary from "../assets/dashboard/volunteer/volunteer-account-primary.png";
import volunteerAlt1 from "../assets/dashboard/volunteer/volunteer-account-alt1.png";
import volunteerAlt2 from "../assets/dashboard/volunteer/volunteer-account-alt2.png";
import ngoHelpingHands from "../assets/dashboard/ngo-food/ngo-logo-helping-hands.png";
import feedingIndia from "../assets/partners/feeding-india.png";

export const DELIVERY_KPI = [
  { id: "total", label: "Total Deliveries", value: "8,420", trend: 14, compare: "vs last month", color: "#22C55E" },
  { id: "pickup_pending", label: "Pickup Pending", value: "28", trend: -6, compare: "vs last month", color: "#F59E0B" },
  { id: "in_transit", label: "In Transit", value: "34", trend: 18, compare: "vs last month", color: "#3B82F6" },
  { id: "delivered", label: "Successfully Delivered", value: "8,124", trend: 16, compare: "vs last month", color: "#16A34A" },
  { id: "delayed", label: "Delayed Deliveries", value: "18", trend: -22, compare: "vs last month", color: "#EF4444" },
  { id: "cancelled", label: "Cancelled Deliveries", value: "246", trend: -10, compare: "vs last month", color: "#94A3B8" },
];

export const STATUS_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "pickup_pending", label: "Pickup Pending" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "picked_up", label: "Picked Up" },
  { id: "in_transit", label: "In Transit" },
  { id: "arriving", label: "Arriving" },
  { id: "delivered", label: "Delivered" },
  { id: "delayed", label: "Delayed" },
  { id: "cancelled", label: "Cancelled" },
];

export const VOLUNTEER_OPTIONS = [
  { id: "all", label: "All Volunteers" },
  { id: "rahul", label: "Rahul Kumar" },
  { id: "priya", label: "Priya Sharma" },
  { id: "amit", label: "Amit Patel" },
  { id: "sneha", label: "Sneha Reddy" },
  { id: "vikram", label: "Vikram Singh" },
];

export const NGO_OPTIONS = [
  { id: "all", label: "All NGOs" },
  { id: "helping_hands", label: "Helping Hands Foundation" },
  { id: "feeding_india", label: "Feeding India" },
  { id: "akshaya", label: "Akshaya Patra" },
  { id: "sunrise", label: "Sunrise Home" },
];

export const DONOR_OPTIONS = [
  { id: "all", label: "All Donors" },
  { id: "grand_palace", label: "Hotel Grand Palace" },
  { id: "paradise", label: "Paradise Biryani" },
  { id: "techcorp", label: "TechCorp India" },
  { id: "dal_spice", label: "Dal & Spice Kitchen" },
];

export const CITY_OPTIONS = [
  { id: "all", label: "All Cities" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "bangalore", label: "Bangalore" },
  { id: "mumbai", label: "Mumbai" },
];

export const PRIORITY_OPTIONS = [
  { id: "all", label: "All Priority" },
  { id: "critical", label: "Critical" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

export const STATUS_LABELS = {
  pickup_pending: "Pickup Pending",
  volunteer_assigned: "Volunteer Assigned",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  arriving: "Arriving",
  delivered: "Delivered",
  delayed: "Delayed",
  cancelled: "Cancelled",
};

export const STATUS_COLORS = {
  pickup_pending: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  volunteer_assigned: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
  picked_up: "border-[#A5F3FC] bg-[#ECFEFF] text-[#0891B2]",
  in_transit: "border-[#99F6E4] bg-[#F0FDFA] text-[#0D9488]",
  arriving: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  delivered: "border-[#86EFAC] bg-[#DCFCE7] text-[#166534]",
  delayed: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  cancelled: "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
};

export const PRIORITY_COLORS = {
  critical: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  high: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  medium: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  low: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
};

export const WORKFLOW_STEPS = [
  { id: "approved", label: "Donation Approved" },
  { id: "volunteer", label: "Volunteer Assigned" },
  { id: "pickup_confirmed", label: "Pickup Confirmed" },
  { id: "collected", label: "Food Collected" },
  { id: "route_started", label: "Route Started" },
  { id: "live_tracking", label: "Live Tracking" },
  { id: "arrived", label: "Arrived at NGO" },
  { id: "verified", label: "Delivery Verified" },
  { id: "ngo_confirmed", label: "NGO Confirmation" },
  { id: "completed", label: "Mission Completed" },
];

const STATUS_TO_STEP = {
  pickup_pending: "approved",
  volunteer_assigned: "volunteer",
  picked_up: "collected",
  in_transit: "live_tracking",
  arriving: "arrived",
  delivered: "completed",
  delayed: "live_tracking",
  cancelled: "approved",
};

export function getDeliveryWorkflowIndex(status) {
  const stepId = STATUS_TO_STEP[status] ?? "approved";
  return WORKFLOW_STEPS.findIndex((s) => s.id === stepId);
}

export const ADMIN_DELIVERIES = [
  {
    id: "DEL-9821",
    donationId: "DON-4821",
    donor: "Hotel Grand Palace",
    donorKey: "grand_palace",
    ngo: "Helping Hands Foundation",
    ngoLogo: ngoHelpingHands,
    ngoId: "NGO-2045",
    volunteer: "Rahul Kumar",
    volunteerId: "VOL-1001",
    volunteerAvatar: volunteerPrimary,
    vehicle: "Motorcycle · TS 09 AB 1234",
    pickupLocation: "12 Banjara Hills, Hyderabad",
    destination: "Helping Hands Foundation, Secunderabad",
    pickupTime: "Aug 6, 2026 · 4:52 PM",
    estimatedArrival: "Aug 6, 2026 · 5:10 PM",
    actualDelivery: "—",
    distance: "8.4 km",
    status: "in_transit",
    priority: "critical",
    city: "hyderabad",
    foodItem: "Veg Biryani & Raita",
    foodImage: vegBiryani,
    quantity: "85 kg",
    meals: 340,
    temperatureCompliance: "Compliant — 62°C",
    pickupPhotos: [vegBiryani, packagedMeals],
    deliveryPhotos: [],
    signature: null,
    qrCode: "QR-NB-DEL-9821",
    notes: "Large wedding surplus — handle with care.",
    timeline: [
      { time: "Aug 6, 3:12 PM", event: "Volunteer Rahul Kumar assigned" },
      { time: "Aug 6, 4:30 PM", event: "Pickup confirmed" },
      { time: "Aug 6, 4:52 PM", event: "Food collected — en route" },
    ],
    tracking: {
      volunteer: { x: 48, y: 48 },
      pickup: { x: 20, y: 70 },
      destination: { x: 75, y: 25 },
      distanceRemaining: "3.2 km",
      eta: "18 min",
      progress: 62,
      traffic: "Moderate",
      speed: "32 km/h",
      battery: "78%",
      routeProgress: 62,
    },
  },
  {
    id: "DEL-9820",
    donationId: "DON-4820",
    donor: "Paradise Biryani",
    donorKey: "paradise",
    ngo: "Sunrise Home",
    ngoLogo: ngoHelpingHands,
    ngoId: "NGO-1088",
    volunteer: "Priya Sharma",
    volunteerId: "VOL-1002",
    volunteerAvatar: volunteerAlt1,
    vehicle: "Car · TS 08 CD 5678",
    pickupLocation: "45 Secunderabad Road",
    destination: "Sunrise Home, Begumpet",
    pickupTime: "—",
    estimatedArrival: "Aug 6, 2026 · 3:12 PM",
    actualDelivery: "—",
    distance: "5.2 km",
    status: "volunteer_assigned",
    priority: "high",
    city: "hyderabad",
    foodItem: "Mixed Seasonal Fruits",
    foodImage: mixedFruits,
    quantity: "32 kg",
    meals: 128,
    temperatureCompliance: "Pending pickup",
    pickupPhotos: [],
    deliveryPhotos: [],
    signature: null,
    qrCode: "QR-NB-DEL-9820",
    notes: "",
    timeline: [
      { time: "Aug 6, 12:10 PM", event: "Volunteer Priya Sharma assigned" },
      { time: "Aug 6, 3:00 PM", event: "Pickup scheduled" },
    ],
    tracking: {
      volunteer: { x: 55, y: 50 },
      pickup: { x: 30, y: 60 },
      destination: { x: 80, y: 40 },
      distanceRemaining: "5.2 km",
      eta: "12 min",
      progress: 15,
      traffic: "Light",
      speed: "0 km/h",
      battery: "92%",
      routeProgress: 15,
    },
  },
  {
    id: "DEL-9819",
    donationId: "DON-4819",
    donor: "TechCorp India",
    donorKey: "techcorp",
    ngo: "Feeding India",
    ngoLogo: feedingIndia,
    ngoId: "NGO-3012",
    volunteer: "Amit Patel",
    volunteerId: "VOL-1003",
    volunteerAvatar: volunteerAlt2,
    vehicle: "Van · TS 07 EF 9012",
    pickupLocation: "HITEC City, Phase 2",
    destination: "Feeding India Hub, Madhapur",
    pickupTime: "Aug 6, 2026 · 1:00 PM",
    estimatedArrival: "Aug 6, 2026 · 1:30 PM",
    actualDelivery: "Aug 6, 2026 · 1:42 PM",
    distance: "3.8 km",
    status: "delivered",
    priority: "high",
    city: "hyderabad",
    foodItem: "Corporate Lunch Trays",
    foodImage: packagedMeals,
    quantity: "120 meals",
    meals: 120,
    temperatureCompliance: "Compliant — 58°C at delivery",
    pickupPhotos: [packagedMeals],
    deliveryPhotos: [packagedMeals, dalMakhani],
    signature: "Signed by Arun Mehta",
    qrCode: "QR-NB-DEL-9819",
    notes: "Delivered on time.",
    timeline: [
      { time: "Aug 6, 11:15 AM", event: "Volunteer assigned" },
      { time: "Aug 6, 1:00 PM", event: "Pickup completed" },
      { time: "Aug 6, 1:42 PM", event: "Delivered — NGO confirmed" },
    ],
    tracking: {
      volunteer: { x: 70, y: 35 },
      pickup: { x: 25, y: 55 },
      destination: { x: 70, y: 35 },
      distanceRemaining: "0 km",
      eta: "Delivered",
      progress: 100,
      traffic: "—",
      speed: "—",
      battery: "—",
      routeProgress: 100,
    },
  },
  {
    id: "DEL-9818",
    donationId: "DON-4818",
    donor: "Anita Desai",
    donorKey: "individual",
    ngo: "Akshaya Patra",
    ngoLogo: feedingIndia,
    ngoId: "NGO-2042",
    volunteer: "Sneha Reddy",
    volunteerId: "VOL-1004",
    volunteerAvatar: volunteerAlt1,
    vehicle: "Motorcycle · TS 09 GH 3456",
    pickupLocation: "Jubilee Hills, Road No. 36",
    destination: "Akshaya Patra Kitchen, Kukatpally",
    pickupTime: "Aug 5, 2026 · 7:05 AM",
    estimatedArrival: "Aug 5, 2026 · 7:35 AM",
    actualDelivery: "Aug 5, 2026 · 7:28 AM",
    distance: "11.2 km",
    status: "delivered",
    priority: "low",
    city: "hyderabad",
    foodItem: "Homemade Idli & Sambar",
    foodImage: idliSambar,
    quantity: "40 portions",
    meals: 40,
    temperatureCompliance: "Compliant",
    pickupPhotos: [idliSambar],
    deliveryPhotos: [idliSambar],
    signature: "Signed by Lakshmi Rao",
    qrCode: "QR-NB-DEL-9818",
    notes: "",
    timeline: [
      { time: "Aug 5, 6:30 AM", event: "Pickup and delivery completed" },
    ],
    tracking: { volunteer: { x: 85, y: 30 }, pickup: { x: 40, y: 65 }, destination: { x: 85, y: 30 }, distanceRemaining: "0 km", eta: "Delivered", progress: 100, traffic: "—", speed: "—", battery: "—", routeProgress: 100 },
  },
  {
    id: "DEL-9817",
    donationId: "DON-4812",
    donor: "Dal & Spice Kitchen",
    donorKey: "dal_spice",
    ngo: "Akshaya Patra",
    ngoLogo: feedingIndia,
    ngoId: "NGO-2042",
    volunteer: "Amit Patel",
    volunteerId: "VOL-1003",
    volunteerAvatar: volunteerAlt2,
    vehicle: "Van · TS 07 EF 9012",
    pickupLocation: "Ameerpet, Hyderabad",
    destination: "Akshaya Patra Kitchen",
    pickupTime: "Aug 6, 2026 · 6:05 PM",
    estimatedArrival: "Aug 6, 2026 · 6:27 PM",
    actualDelivery: "—",
    distance: "7.3 km",
    status: "arriving",
    priority: "medium",
    city: "hyderabad",
    foodItem: "Dal Makhani & Naan",
    foodImage: dalMakhani,
    quantity: "55 kg",
    meals: 220,
    temperatureCompliance: "Compliant — 60°C",
    pickupPhotos: [dalMakhani],
    deliveryPhotos: [],
    signature: null,
    qrCode: "QR-NB-DEL-9817",
    notes: "Approaching destination.",
    timeline: [
      { time: "Aug 6, 6:05 PM", event: "Food collected" },
      { time: "Aug 6, 6:20 PM", event: "Arriving at NGO" },
    ],
    tracking: {
      volunteer: { x: 78, y: 30 },
      pickup: { x: 42, y: 62 },
      destination: { x: 82, y: 32 },
      distanceRemaining: "0.8 km",
      eta: "4 min",
      progress: 92,
      traffic: "Heavy",
      speed: "18 km/h",
      battery: "65%",
      routeProgress: 92,
    },
  },
  {
    id: "DEL-9816",
    donationId: "DON-4816",
    donor: "Wedding Events Pvt Ltd",
    donorKey: "event",
    ngo: "Robin Hood Army Hub",
    ngoLogo: ngoHelpingHands,
    ngoId: "NGO-3012",
    volunteer: "—",
    volunteerId: null,
    volunteerAvatar: null,
    vehicle: "—",
    pickupLocation: "Gachibowli Convention Center",
    destination: "Robin Hood Army Hub",
    pickupTime: "—",
    estimatedArrival: "—",
    actualDelivery: "—",
    distance: "6.7 km",
    status: "pickup_pending",
    priority: "critical",
    city: "hyderabad",
    foodItem: "Paneer Curry & Naan",
    foodImage: paneerCurry,
    quantity: "200 kg",
    meals: 800,
    temperatureCompliance: "Pending",
    pickupPhotos: [],
    deliveryPhotos: [],
    signature: null,
    qrCode: "QR-NB-DEL-9816",
    notes: "Urgent — awaiting volunteer assignment.",
    timeline: [{ time: "Aug 6, 10:45 PM", event: "Delivery created — pickup pending" }],
    tracking: null,
  },
  {
    id: "DEL-9815",
    donationId: "DON-4814",
    donor: "Spice Garden Restaurant",
    donorKey: "spice_garden",
    ngo: "Feeding India",
    ngoLogo: feedingIndia,
    ngoId: "NGO-3012",
    volunteer: "Rahul Kumar",
    volunteerId: "VOL-1001",
    volunteerAvatar: volunteerPrimary,
    vehicle: "Motorcycle",
    pickupLocation: "Madhapur",
    destination: "Feeding India Hub",
    pickupTime: "Aug 5, 2026 · 9:15 PM",
    estimatedArrival: "Aug 5, 2026 · 9:45 PM",
    actualDelivery: "—",
    distance: "4.1 km",
    status: "delayed",
    priority: "medium",
    city: "hyderabad",
    foodItem: "Butter Chicken & Naan",
    foodImage: paneerCurry,
    quantity: "45 kg",
    meals: 180,
    temperatureCompliance: "At risk — delayed 45 min",
    pickupPhotos: [],
    deliveryPhotos: [],
    signature: null,
    qrCode: "QR-NB-DEL-9815",
    notes: "Traffic delay on ORR.",
    timeline: [
      { time: "Aug 5, 9:00 PM", event: "Pickup scheduled" },
      { time: "Aug 5, 9:45 PM", event: "Marked delayed — traffic" },
    ],
    tracking: {
      volunteer: { x: 55, y: 48 },
      pickup: { x: 45, y: 55 },
      destination: { x: 70, y: 35 },
      distanceRemaining: "2.1 km",
      eta: "Delayed +25 min",
      progress: 48,
      traffic: "Heavy",
      speed: "12 km/h",
      battery: "45%",
      routeProgress: 48,
    },
  },
  {
    id: "DEL-9814",
    donationId: "DON-4813",
    donor: "Green Valley Catering",
    donorKey: "green_valley",
    ngo: "Sunrise Home",
    ngoLogo: ngoHelpingHands,
    ngoId: "NGO-1088",
    volunteer: "Vikram Singh",
    volunteerId: "VOL-1005",
    volunteerAvatar: volunteerPrimary,
    vehicle: "Truck · TS 10 IJ 7890",
    pickupLocation: "Banjara Hills",
    destination: "Sunrise Home",
    pickupTime: "—",
    estimatedArrival: "—",
    actualDelivery: "—",
    distance: "4.1 km",
    status: "cancelled",
    priority: "low",
    city: "hyderabad",
    foodItem: "Sandwiches & Pastries",
    foodImage: packagedMeals,
    quantity: "200 units",
    meals: 200,
    temperatureCompliance: "N/A",
    pickupPhotos: [],
    deliveryPhotos: [],
    signature: null,
    qrCode: "QR-NB-DEL-9814",
    notes: "Cancelled — donor withdrew donation.",
    timeline: [
      { time: "Aug 6, 12:40 PM", event: "Delivery scheduled" },
      { time: "Aug 6, 1:30 PM", event: "Cancelled by donor" },
    ],
    tracking: null,
  },
];

export const DELIVERY_PERFORMANCE_TREND = [
  { month: "Mar", deliveries: 1120 },
  { month: "Apr", deliveries: 1280 },
  { month: "May", deliveries: 1380 },
  { month: "Jun", deliveries: 1420 },
  { month: "Jul", deliveries: 1480 },
  { month: "Aug", deliveries: 8420 },
];

export const AVG_DELIVERY_TIME = [
  { month: "Mar", minutes: 52 },
  { month: "Apr", minutes: 48 },
  { month: "May", minutes: 44 },
  { month: "Jun", minutes: 40 },
  { month: "Jul", minutes: 38 },
  { month: "Aug", minutes: 36 },
];

export const ON_TIME_RATE = [
  { month: "Mar", rate: 88 },
  { month: "Apr", rate: 90 },
  { month: "May", rate: 91 },
  { month: "Jun", rate: 93 },
  { month: "Jul", rate: 94 },
  { month: "Aug", rate: 95 },
];

export const STATUS_DISTRIBUTION = [
  { name: "Delivered", value: 82, color: "#22C55E" },
  { name: "In Transit", value: 8, color: "#3B82F6" },
  { name: "Pending", value: 5, color: "#F59E0B" },
  { name: "Delayed", value: 3, color: "#EF4444" },
  { name: "Cancelled", value: 2, color: "#94A3B8" },
];

export const DISTANCE_COVERED = [
  { month: "Mar", km: 4200 },
  { month: "Apr", km: 4800 },
  { month: "May", km: 5200 },
  { month: "Jun", km: 5600 },
  { month: "Jul", km: 6100 },
  { month: "Aug", km: 6800 },
];

export const VOLUNTEER_EFFICIENCY = [
  { name: "Rahul K.", score: 96, deliveries: 142 },
  { name: "Priya S.", score: 94, deliveries: 128 },
  { name: "Amit P.", score: 92, deliveries: 115 },
  { name: "Sneha R.", score: 98, deliveries: 98 },
  { name: "Vikram S.", score: 88, deliveries: 86 },
];

export const DELIVERY_ALERTS = [
  { id: "delayed", emoji: "🔴", title: "Delayed Deliveries", description: "18 deliveries currently delayed.", action: "View Delays", color: "border-[#FECACA] bg-[#FEF2F2]" },
  { id: "traffic", emoji: "🟠", title: "Traffic Delays", description: "7 volunteers reporting heavy traffic.", action: "Track Routes", color: "border-[#FDE68A] bg-[#FFFBEB]" },
  { id: "deviation", emoji: "🟡", title: "Route Deviations", description: "2 volunteers off suggested route.", action: "Review", color: "border-[#FEF3C7] bg-[#FFFBEB]" },
  { id: "waiting", emoji: "🔵", title: "Waiting at Pickup", description: "4 volunteers waiting at pickup locations.", action: "Contact", color: "border-[#BFDBFE] bg-[#EFF6FF]" },
  { id: "completed", emoji: "🟢", title: "Completed Deliveries", description: "156 deliveries completed today.", action: "View Report", color: "border-[#BBF7D0] bg-[#F0FDF4]" },
];

export function filterDeliveries(deliveries, filters) {
  return deliveries.filter((d) => {
    if (filters.status !== "all" && d.status !== filters.status) return false;
    if (filters.city !== "all" && d.city !== filters.city) return false;
    if (filters.priority !== "all" && d.priority !== filters.priority) return false;
    if (filters.volunteer !== "all") {
      const volMap = { rahul: "Rahul Kumar", priya: "Priya Sharma", amit: "Amit Patel", sneha: "Sneha Reddy", vikram: "Vikram Singh" };
      if (d.volunteer !== volMap[filters.volunteer]) return false;
    }
    if (filters.ngo !== "all") {
      const ngoMap = { helping_hands: "Helping Hands Foundation", feeding_india: "Feeding India", akshaya: "Akshaya Patra", sunrise: "Sunrise Home" };
      if (d.ngo !== ngoMap[filters.ngo]) return false;
    }
    if (filters.donor !== "all") {
      const donorMap = { grand_palace: "Hotel Grand Palace", paradise: "Paradise Biryani", techcorp: "TechCorp India", dal_spice: "Dal & Spice Kitchen" };
      if (d.donor !== donorMap[filters.donor]) return false;
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const hay = [d.id, d.donationId, d.donor, d.ngo, d.volunteer, d.pickupLocation].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortDeliveries(deliveries, key, dir) {
  const sorted = [...deliveries];
  const mult = dir === "asc" ? 1 : -1;
  sorted.sort((a, b) => {
    let av = a[key];
    let bv = b[key];
    if (key === "meals") {
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
