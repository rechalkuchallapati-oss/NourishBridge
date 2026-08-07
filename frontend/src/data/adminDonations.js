import vegBiryani from "../assets/dashboard/food/veg-biryani.jpg";
import mixedFruits from "../assets/dashboard/food/mixed-seasonal-fruits.jpg";
import idliSambar from "../assets/dashboard/food/idli-sambar.jpg";
import assortedBread from "../assets/dashboard/food/assorted-bread-loaves.jpg";
import dalMakhani from "../assets/dashboard/food/dal-makhani-naan.jpg";
import paneerCurry from "../assets/dashboard/food/paneer-curry.jpg";
import fruitBoxes from "../assets/dashboard/food/fruit-boxes-juice.jpg";
import packagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";
import butterChicken from "../assets/dashboard/food/butter-chicken-naan.jpg";
import sandwiches from "../assets/dashboard/food/sandwiches-pastries.jpg";

export const DONATION_KPI = [
  { id: "total", label: "Total Donations", value: "2,847", trend: 18, compare: "vs last month", color: "#22C55E" },
  { id: "pending", label: "Pending Verification", value: "42", trend: -8, compare: "vs last month", color: "#F59E0B" },
  { id: "approved", label: "Approved Donations", value: "156", trend: 12, compare: "vs last month", color: "#3B82F6" },
  { id: "assigned", label: "Assigned to Volunteer", value: "89", trend: 6, compare: "vs last month", color: "#8B5CF6" },
  { id: "transit", label: "In Transit", value: "34", trend: 22, compare: "vs last month", color: "#06B6D4" },
  { id: "delivered", label: "Successfully Delivered", value: "2,412", trend: 15, compare: "vs last month", color: "#16A34A" },
  { id: "rejected", label: "Rejected / Expired", value: "114", trend: -14, compare: "vs last month", color: "#EF4444" },
];

export const DONATION_STATUS_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "pending", label: "Pending" },
  { id: "verified", label: "Verified" },
  { id: "assigned", label: "Assigned" },
  { id: "pickup_scheduled", label: "Pickup Scheduled" },
  { id: "picked_up", label: "Picked Up" },
  { id: "in_transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
  { id: "completed", label: "Completed" },
  { id: "rejected", label: "Rejected" },
  { id: "expired", label: "Expired" },
];

export const DONOR_TYPE_OPTIONS = [
  { id: "all", label: "All Donor Types" },
  { id: "restaurant", label: "Restaurant" },
  { id: "hotel", label: "Hotel" },
  { id: "catering", label: "Catering" },
  { id: "individual", label: "Individual" },
  { id: "corporate", label: "Corporate" },
  { id: "event", label: "Event Organizer" },
];

export const CATEGORY_OPTIONS = [
  { id: "all", label: "All Categories" },
  { id: "cooked_meals", label: "Cooked Meals" },
  { id: "fruits", label: "Fruits" },
  { id: "vegetables", label: "Vegetables" },
  { id: "dairy", label: "Dairy" },
  { id: "dry_goods", label: "Dry Goods" },
  { id: "bakery", label: "Bakery" },
  { id: "raw_food", label: "Raw Food" },
];

export const CITY_OPTIONS = [
  { id: "all", label: "All Cities" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "bangalore", label: "Bangalore" },
  { id: "mumbai", label: "Mumbai" },
  { id: "delhi", label: "Delhi" },
  { id: "chennai", label: "Chennai" },
];

export const NGO_OPTIONS = [
  { id: "all", label: "All NGOs" },
  { id: "helping_hands", label: "Helping Hands Foundation" },
  { id: "feeding_india", label: "Feeding India" },
  { id: "akshaya", label: "Akshaya Patra" },
  { id: "goonj", label: "Goonj" },
  { id: "sunrise", label: "Sunrise Home" },
];

export const VOLUNTEER_FILTER_OPTIONS = [
  { id: "all", label: "All Volunteers" },
  { id: "rahul", label: "Rahul Kumar" },
  { id: "priya", label: "Priya Sharma" },
  { id: "amit", label: "Amit Patel" },
  { id: "sneha", label: "Sneha Reddy" },
  { id: "vikram", label: "Vikram Singh" },
];

export const CATEGORY_LABELS = {
  cooked_meals: "Cooked Meals",
  fruits: "Fruits",
  vegetables: "Vegetables",
  dairy: "Dairy",
  dry_goods: "Dry Goods",
  bakery: "Bakery",
  raw_food: "Raw Food",
};

export const DONOR_TYPE_LABELS = {
  restaurant: "Restaurant",
  hotel: "Hotel",
  catering: "Catering",
  individual: "Individual",
  corporate: "Corporate",
  event: "Event Organizer",
};

export const STATUS_LABELS = {
  pending: "Pending",
  verified: "Verified",
  assigned: "Assigned",
  pickup_scheduled: "Pickup Scheduled",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  delivered: "Delivered",
  completed: "Completed",
  rejected: "Rejected",
  expired: "Expired",
};

export const STATUS_COLORS = {
  pending: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  verified: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  assigned: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
  pickup_scheduled: "border-[#A5F3FC] bg-[#ECFEFF] text-[#0891B2]",
  picked_up: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  in_transit: "border-[#99F6E4] bg-[#F0FDFA] text-[#0D9488]",
  delivered: "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  completed: "border-[#86EFAC] bg-[#DCFCE7] text-[#166534]",
  rejected: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  expired: "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
};

export const PRIORITY_COLORS = {
  high: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  medium: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  low: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
};

export const WORKFLOW_STEPS = [
  { id: "submitted", label: "Submitted" },
  { id: "admin_verification", label: "Admin Verification" },
  { id: "quality_check", label: "Food Quality Check" },
  { id: "ngo_assignment", label: "NGO Assignment" },
  { id: "volunteer_assignment", label: "Volunteer Assignment" },
  { id: "pickup_scheduled", label: "Pickup Scheduled" },
  { id: "picked_up", label: "Food Picked Up" },
  { id: "in_transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
  { id: "completed", label: "Distribution Completed" },
];

const STATUS_TO_STEP = {
  pending: "submitted",
  verified: "admin_verification",
  assigned: "volunteer_assignment",
  pickup_scheduled: "pickup_scheduled",
  picked_up: "picked_up",
  in_transit: "in_transit",
  delivered: "delivered",
  completed: "completed",
  rejected: "admin_verification",
  expired: "submitted",
};

export function getWorkflowStepIndex(status) {
  const stepId = STATUS_TO_STEP[status] ?? "submitted";
  return WORKFLOW_STEPS.findIndex((s) => s.id === stepId);
}

export const ADMIN_DONATIONS = [
  {
    id: "DON-4821",
    donorName: "Hotel Grand Palace",
    donorType: "hotel",
    donorPhone: "+91 98765 43210",
    donorEmail: "donations@grandpalace.com",
    foodItem: "Veg Biryani & Raita",
    image: vegBiryani,
    category: "cooked_meals",
    quantity: "85 kg",
    meals: 340,
    pickupAddress: "12 Banjara Hills, Hyderabad",
    deliveryAddress: "Helping Hands Foundation, Secunderabad",
    ngo: "Helping Hands Foundation",
    ngoId: "NGO-2045",
    volunteer: "Rahul Kumar",
    volunteerId: "VOL-1001",
    pickupTime: "Aug 6, 2026 · 4:30 PM",
    expiryTime: "Aug 6, 2026 · 8:00 PM",
    status: "in_transit",
    priority: "high",
    city: "hyderabad",
    packaging: "Insulated Containers",
    temperature: "Hot — keep above 60°C",
    shelfLife: "4 hours",
    qrCode: "QR-NB-DON-4821",
    notes: "Large wedding surplus. Contact hotel manager on arrival.",
    proofImages: [vegBiryani, packagedMeals],
    map: { distance: "8.4 km", eta: "18 min", pickup: { x: 20, y: 70 }, ngo: { x: 75, y: 25 }, volunteer: { x: 48, y: 48 } },
    timeline: [
      { time: "Aug 6, 2:15 PM", event: "Donation submitted by donor" },
      { time: "Aug 6, 2:28 PM", event: "Admin verified donation details" },
      { time: "Aug 6, 2:45 PM", event: "Quality check passed" },
      { time: "Aug 6, 3:00 PM", event: "Assigned to Helping Hands Foundation" },
      { time: "Aug 6, 3:12 PM", event: "Volunteer Rahul Kumar assigned" },
      { time: "Aug 6, 4:30 PM", event: "Pickup scheduled" },
      { time: "Aug 6, 4:52 PM", event: "Food picked up — en route" },
    ],
  },
  {
    id: "DON-4820",
    donorName: "Paradise Biryani",
    donorType: "restaurant",
    donorPhone: "+91 91234 56789",
    donorEmail: "csr@paradise.com",
    foodItem: "Mixed Seasonal Fruits",
    image: mixedFruits,
    category: "fruits",
    quantity: "32 kg",
    meals: 128,
    pickupAddress: "45 Secunderabad Road, Hyderabad",
    deliveryAddress: "Sunrise Home, Begumpet",
    ngo: "Sunrise Home",
    ngoId: "NGO-1088",
    volunteer: "Priya Sharma",
    volunteerId: "VOL-1002",
    pickupTime: "Aug 6, 2026 · 3:00 PM",
    expiryTime: "Aug 7, 2026 · 12:00 PM",
    status: "pickup_scheduled",
    priority: "medium",
    city: "hyderabad",
    packaging: "Cardboard Crates",
    temperature: "Cold — 2–8°C",
    shelfLife: "24 hours",
    qrCode: "QR-NB-DON-4820",
    notes: "Fresh harvest from supplier. Handle with care.",
    proofImages: [mixedFruits],
    map: { distance: "5.2 km", eta: "12 min", pickup: { x: 30, y: 60 }, ngo: { x: 80, y: 40 }, volunteer: { x: 55, y: 50 } },
    timeline: [
      { time: "Aug 6, 11:00 AM", event: "Donation submitted" },
      { time: "Aug 6, 11:20 AM", event: "Verified by admin" },
      { time: "Aug 6, 11:45 AM", event: "NGO assigned — Sunrise Home" },
      { time: "Aug 6, 12:10 PM", event: "Volunteer Priya Sharma assigned" },
      { time: "Aug 6, 3:00 PM", event: "Pickup scheduled" },
    ],
  },
  {
    id: "DON-4819",
    donorName: "TechCorp India",
    donorType: "corporate",
    donorPhone: "+91 99887 76655",
    donorEmail: "community@techcorp.in",
    foodItem: "Corporate Lunch Trays",
    image: packagedMeals,
    category: "cooked_meals",
    quantity: "120 meals",
    meals: 120,
    pickupAddress: "HITEC City, Phase 2, Hyderabad",
    deliveryAddress: "Feeding India Hub, Madhapur",
    ngo: "Feeding India",
    ngoId: "NGO-3012",
    volunteer: "Amit Patel",
    volunteerId: "VOL-1003",
    pickupTime: "Aug 6, 2026 · 1:00 PM",
    expiryTime: "Aug 6, 2026 · 5:00 PM",
    status: "delivered",
    priority: "high",
    city: "hyderabad",
    packaging: "Sealed Meal Trays",
    temperature: "Hot — serve within 3 hours",
    shelfLife: "3 hours",
    qrCode: "QR-NB-DON-4819",
    notes: "Daily corporate surplus program.",
    proofImages: [packagedMeals, dalMakhani],
    map: { distance: "3.8 km", eta: "Delivered", pickup: { x: 25, y: 55 }, ngo: { x: 70, y: 35 }, volunteer: { x: 70, y: 35 } },
    timeline: [
      { time: "Aug 6, 10:30 AM", event: "Donation submitted" },
      { time: "Aug 6, 10:45 AM", event: "Fast-track verification" },
      { time: "Aug 6, 11:00 AM", event: "Assigned to Feeding India" },
      { time: "Aug 6, 11:15 AM", event: "Volunteer Amit Patel assigned" },
      { time: "Aug 6, 1:00 PM", event: "Pickup completed" },
      { time: "Aug 6, 1:42 PM", event: "Delivered to NGO" },
    ],
  },
  {
    id: "DON-4818",
    donorName: "Anita Desai",
    donorType: "individual",
    donorPhone: "+91 87654 32109",
    donorEmail: "anita.desai@gmail.com",
    foodItem: "Homemade Idli & Sambar",
    image: idliSambar,
    category: "cooked_meals",
    quantity: "40 portions",
    meals: 40,
    pickupAddress: "Jubilee Hills, Road No. 36",
    deliveryAddress: "Akshaya Patra Kitchen, Kukatpally",
    ngo: "Akshaya Patra",
    ngoId: "NGO-2042",
    volunteer: "Sneha Reddy",
    volunteerId: "VOL-1004",
    pickupTime: "Aug 5, 2026 · 7:00 AM",
    expiryTime: "Aug 5, 2026 · 11:00 AM",
    status: "completed",
    priority: "low",
    city: "hyderabad",
    packaging: "Steel Containers",
    temperature: "Hot",
    shelfLife: "4 hours",
    qrCode: "QR-NB-DON-4818",
    notes: "Regular weekly donor.",
    proofImages: [idliSambar],
    map: { distance: "11.2 km", eta: "Completed", pickup: { x: 40, y: 65 }, ngo: { x: 85, y: 30 }, volunteer: { x: 85, y: 30 } },
    timeline: [
      { time: "Aug 5, 6:00 AM", event: "Donation submitted" },
      { time: "Aug 5, 6:15 AM", event: "Verified" },
      { time: "Aug 5, 6:30 AM", event: "Picked up and delivered" },
      { time: "Aug 5, 8:00 AM", event: "Distribution completed" },
    ],
  },
  {
    id: "DON-4817",
    donorName: "Fresh Bake Co.",
    donorType: "restaurant",
    donorPhone: "+91 90123 45678",
    donorEmail: "surplus@freshbake.com",
    foodItem: "Assorted Bread Loaves",
    image: assortedBread,
    category: "bakery",
    quantity: "60 loaves",
    meals: 180,
    pickupAddress: "Kondapur Main Road, Hyderabad",
    deliveryAddress: "Goonj Distribution Center",
    ngo: "Goonj",
    ngoId: "NGO-1080",
    volunteer: "—",
    volunteerId: null,
    pickupTime: "—",
    expiryTime: "Aug 8, 2026",
    status: "verified",
    priority: "medium",
    city: "hyderabad",
    packaging: "Paper Bags",
    temperature: "Ambient",
    shelfLife: "48 hours",
    qrCode: "QR-NB-DON-4817",
    notes: "End-of-day bakery surplus.",
    proofImages: [assortedBread],
    map: { distance: "—", eta: "—", pickup: { x: 35, y: 50 }, ngo: { x: 65, y: 45 }, volunteer: null },
    timeline: [
      { time: "Aug 6, 9:00 PM", event: "Donation submitted" },
      { time: "Aug 6, 9:30 PM", event: "Admin verified" },
      { time: "Aug 6, 9:45 PM", event: "Quality check passed" },
    ],
  },
  {
    id: "DON-4816",
    donorName: "Wedding Events Pvt Ltd",
    donorType: "event",
    donorPhone: "+91 93456 78901",
    donorEmail: "ops@weddingevents.in",
    foodItem: "Paneer Curry & Naan",
    image: paneerCurry,
    category: "cooked_meals",
    quantity: "200 kg",
    meals: 800,
    pickupAddress: "Gachibowli Convention Center",
    deliveryAddress: "Robin Hood Army Hub",
    ngo: "Robin Hood Army",
    ngoId: "NGO-3012",
    volunteer: "Vikram Singh",
    volunteerId: "VOL-1005",
    pickupTime: "Aug 6, 2026 · 11:00 PM",
    expiryTime: "Aug 7, 2026 · 2:00 AM",
    status: "pending",
    priority: "high",
    city: "hyderabad",
    packaging: "Bulk Insulated Vessels",
    temperature: "Hot — urgent pickup",
    shelfLife: "3 hours",
    qrCode: "QR-NB-DON-4816",
    notes: "Large wedding event ending at 10 PM. Urgent!",
    proofImages: [paneerCurry],
    map: { distance: "6.7 km", eta: "Pending", pickup: { x: 50, y: 75 }, ngo: { x: 78, y: 28 }, volunteer: null },
    timeline: [{ time: "Aug 6, 10:45 PM", event: "Donation submitted — awaiting verification" }],
  },
  {
    id: "DON-4815",
    donorName: "Sunrise Dairy Farm",
    donorType: "corporate",
    donorPhone: "+91 94567 89012",
    donorEmail: "donate@sunrisedairy.com",
    foodItem: "Fresh Milk & Curd",
    image: fruitBoxes,
    category: "dairy",
    quantity: "50 L",
    meals: 100,
    pickupAddress: "Shamshabad Industrial Area",
    deliveryAddress: "Helping Hands Foundation",
    ngo: "Helping Hands Foundation",
    ngoId: "NGO-2045",
    volunteer: "—",
    volunteerId: null,
    pickupTime: "—",
    expiryTime: "Aug 6, 2026 · 6:00 PM",
    status: "expired",
    priority: "high",
    city: "hyderabad",
    packaging: "Refrigerated Crates",
    temperature: "Cold — 2–4°C",
    shelfLife: "12 hours",
    qrCode: "QR-NB-DON-4815",
    notes: "Expired before volunteer assignment.",
    proofImages: [fruitBoxes],
    map: { distance: "—", eta: "—", pickup: { x: 15, y: 80 }, ngo: { x: 75, y: 25 }, volunteer: null },
    timeline: [
      { time: "Aug 5, 6:00 AM", event: "Donation submitted" },
      { time: "Aug 5, 8:00 AM", event: "Verification delayed" },
      { time: "Aug 6, 6:00 PM", event: "Marked as expired" },
    ],
  },
  {
    id: "DON-4814",
    donorName: "Spice Garden Restaurant",
    donorType: "restaurant",
    donorPhone: "+91 95678 90123",
    donorEmail: "manager@spicegarden.com",
    foodItem: "Butter Chicken & Naan",
    image: butterChicken,
    category: "cooked_meals",
    quantity: "45 kg",
    meals: 180,
    pickupAddress: "Madhapur, Hyderabad",
    deliveryAddress: "Feeding India Hub",
    ngo: "Feeding India",
    ngoId: "NGO-3012",
    volunteer: "Rahul Kumar",
    volunteerId: "VOL-1001",
    pickupTime: "Aug 5, 2026 · 9:00 PM",
    expiryTime: "Aug 6, 2026 · 1:00 AM",
    status: "rejected",
    priority: "medium",
    city: "hyderabad",
    packaging: "Aluminum Trays",
    temperature: "Hot",
    shelfLife: "4 hours",
    qrCode: "QR-NB-DON-4814",
    notes: "Rejected — food quality below standards.",
    proofImages: [butterChicken],
    map: { distance: "—", eta: "—", pickup: { x: 45, y: 55 }, ngo: { x: 70, y: 35 }, volunteer: null },
    timeline: [
      { time: "Aug 5, 8:30 PM", event: "Donation submitted" },
      { time: "Aug 5, 8:50 PM", event: "Quality check failed — rejected" },
    ],
  },
  {
    id: "DON-4813",
    donorName: "Green Valley Catering",
    donorType: "catering",
    donorPhone: "+91 96789 01234",
    donorEmail: "surplus@greenvalley.com",
    foodItem: "Sandwiches & Pastries",
    image: sandwiches,
    category: "bakery",
    quantity: "200 units",
    meals: 200,
    pickupAddress: "Banjara Hills, Hyderabad",
    deliveryAddress: "Sunrise Home",
    ngo: "Sunrise Home",
    ngoId: "NGO-1088",
    volunteer: "Priya Sharma",
    volunteerId: "VOL-1002",
    pickupTime: "Aug 6, 2026 · 2:00 PM",
    expiryTime: "Aug 6, 2026 · 8:00 PM",
    status: "assigned",
    priority: "low",
    city: "hyderabad",
    packaging: "Boxed Sets",
    temperature: "Ambient",
    shelfLife: "6 hours",
    qrCode: "QR-NB-DON-4813",
    notes: "Conference catering surplus.",
    proofImages: [sandwiches],
    map: { distance: "4.1 km", eta: "25 min", pickup: { x: 38, y: 58 }, ngo: { x: 72, y: 38 }, volunteer: { x: 38, y: 58 } },
    timeline: [
      { time: "Aug 6, 12:00 PM", event: "Donation submitted" },
      { time: "Aug 6, 12:20 PM", event: "Verified" },
      { time: "Aug 6, 12:40 PM", event: "NGO & volunteer assigned" },
    ],
  },
  {
    id: "DON-4812",
    donorName: "Dal & Spice Kitchen",
    donorType: "restaurant",
    donorPhone: "+91 97890 12345",
    donorEmail: "donate@dalspice.com",
    foodItem: "Dal Makhani & Naan",
    image: dalMakhani,
    category: "cooked_meals",
    quantity: "55 kg",
    meals: 220,
    pickupAddress: "Ameerpet, Hyderabad",
    deliveryAddress: "Akshaya Patra Kitchen",
    ngo: "Akshaya Patra",
    ngoId: "NGO-2042",
    volunteer: "Amit Patel",
    volunteerId: "VOL-1003",
    pickupTime: "Aug 6, 2026 · 6:00 PM",
    expiryTime: "Aug 6, 2026 · 10:00 PM",
    status: "picked_up",
    priority: "medium",
    city: "hyderabad",
    packaging: "Insulated Vessels",
    temperature: "Hot",
    shelfLife: "4 hours",
    qrCode: "QR-NB-DON-4812",
    notes: "",
    proofImages: [dalMakhani],
    map: { distance: "7.3 km", eta: "22 min", pickup: { x: 42, y: 62 }, ngo: { x: 82, y: 32 }, volunteer: { x: 60, y: 45 } },
    timeline: [
      { time: "Aug 6, 4:00 PM", event: "Donation submitted" },
      { time: "Aug 6, 4:15 PM", event: "Verified & assigned" },
      { time: "Aug 6, 6:05 PM", event: "Food picked up" },
    ],
  },
];

export const DONATION_CATEGORY_CHART = [
  { name: "Cooked Meals", value: 38, color: "#22C55E" },
  { name: "Fruits", value: 18, color: "#F59E0B" },
  { name: "Vegetables", value: 14, color: "#84CC16" },
  { name: "Bakery", value: 12, color: "#A855F7" },
  { name: "Dairy", value: 8, color: "#3B82F6" },
  { name: "Others", value: 10, color: "#94A3B8" },
];

export const DAILY_DONATIONS = [
  { day: "Mon", count: 42 },
  { day: "Tue", count: 58 },
  { day: "Wed", count: 51 },
  { day: "Thu", count: 67 },
  { day: "Fri", count: 73 },
  { day: "Sat", count: 89 },
  { day: "Sun", count: 45 },
];

export const MONTHLY_DONATIONS = [
  { month: "Mar", count: 820 },
  { month: "Apr", count: 945 },
  { month: "May", count: 1102 },
  { month: "Jun", count: 1248 },
  { month: "Jul", count: 1380 },
  { month: "Aug", count: 2847 },
];

export const TOP_DONORS = [
  { name: "Hotel Grand Palace", count: 186, meals: 12400 },
  { name: "TechCorp India", count: 142, meals: 9800 },
  { name: "Paradise Biryani", count: 128, meals: 8600 },
  { name: "Green Valley Catering", count: 98, meals: 6200 },
  { name: "Fresh Bake Co.", count: 87, meals: 5100 },
];

export const TOP_NGOS = [
  { name: "Helping Hands", count: 412, meals: 28400 },
  { name: "Feeding India", count: 386, meals: 24200 },
  { name: "Akshaya Patra", count: 298, meals: 19800 },
  { name: "Goonj", count: 245, meals: 15600 },
  { name: "Sunrise Home", count: 198, meals: 12400 },
];

export const VOLUNTEER_PERFORMANCE = [
  { name: "Rahul K.", deliveries: 142, rating: 4.9 },
  { name: "Priya S.", deliveries: 128, rating: 4.8 },
  { name: "Amit P.", deliveries: 115, rating: 4.7 },
  { name: "Sneha R.", deliveries: 98, rating: 4.9 },
  { name: "Vikram S.", deliveries: 86, rating: 4.6 },
];

export const IMPACT_STATS = {
  wastePrevented: "18.4 tons",
  mealsGenerated: "842,000",
};

export const DONATION_ALERTS = [
  { id: "expiry", emoji: "🔴", title: "Near Expiry Donations", description: "12 donations expiring within 4 hours.", action: "Review Now", color: "border-[#FECACA] bg-[#FEF2F2]" },
  { id: "delay", emoji: "🟠", title: "Pickup Delays", description: "5 pickups running over scheduled time.", action: "View Delays", color: "border-[#FDE68A] bg-[#FFFBEB]" },
  { id: "unassigned", emoji: "🟡", title: "Unassigned Donations", description: "18 verified donations need volunteer assignment.", action: "Assign Now", color: "border-[#FEF3C7] bg-[#FFFBEB]" },
  { id: "quality", emoji: "🔵", title: "Quality Check Pending", description: "8 donations awaiting food quality inspection.", action: "Inspect", color: "border-[#BFDBFE] bg-[#EFF6FF]" },
  { id: "rejected", emoji: "⚫", title: "Rejected Donations", description: "3 donations rejected today — review reasons.", action: "View Rejected", color: "border-[#E2E8F0] bg-[#F8FAFC]" },
  { id: "vol_delay", emoji: "🟣", title: "Volunteer Delays", description: "2 volunteers reporting traffic delays.", action: "Track Routes", color: "border-[#DDD6FE] bg-[#F5F3FF]" },
];

export function filterDonations(donations, filters) {
  return donations.filter((d) => {
    if (filters.status !== "all" && d.status !== filters.status) return false;
    if (filters.category !== "all" && d.category !== filters.category) return false;
    if (filters.donorType !== "all" && d.donorType !== filters.donorType) return false;
    if (filters.city !== "all" && d.city !== filters.city) return false;
    if (filters.ngo !== "all") {
      const ngoMap = { helping_hands: "Helping Hands Foundation", feeding_india: "Feeding India", akshaya: "Akshaya Patra", goonj: "Goonj", sunrise: "Sunrise Home" };
      if (d.ngo !== ngoMap[filters.ngo]) return false;
    }
    if (filters.volunteer !== "all") {
      const volMap = { rahul: "Rahul Kumar", priya: "Priya Sharma", amit: "Amit Patel", sneha: "Sneha Reddy", vikram: "Vikram Singh" };
      if (d.volunteer !== volMap[filters.volunteer]) return false;
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const hay = [d.id, d.donorName, d.foodItem, d.ngo, d.volunteer].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortDonations(donations, key, dir) {
  const sorted = [...donations];
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
