import vegBiryani from "../assets/dashboard/food/veg-biryani.jpg";
import mixedFruits from "../assets/dashboard/food/mixed-seasonal-fruits.jpg";
import idliSambar from "../assets/dashboard/food/idli-sambar.jpg";
import assortedBread from "../assets/dashboard/food/assorted-bread-loaves.jpg";
import dalMakhani from "../assets/dashboard/food/dal-makhani-naan.jpg";
import paneerCurry from "../assets/dashboard/food/paneer-curry.jpg";
import fruitBoxes from "../assets/dashboard/food/fruit-boxes-juice.jpg";
import packagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";
import dryGoods from "../assets/dashboard/ngo-food/ngo-dry-goods.jpg";
import freshFruits from "../assets/dashboard/ngo-food/ngo-fresh-fruits.jpg";

export const INVENTORY_KPI = [
  { id: "stock", label: "Total Food Stock", value: "12,480 kg", trend: 14, compare: "vs last month", color: "#22C55E" },
  { id: "batches", label: "Available Batches", value: "186", trend: 8, compare: "vs last month", color: "#3B82F6" },
  { id: "near_expiry", label: "Near Expiry Items", value: "24", trend: -12, compare: "vs last month", color: "#F59E0B" },
  { id: "expired", label: "Expired Items", value: "6", trend: -28, compare: "vs last month", color: "#EF4444" },
  { id: "utilization", label: "Storage Utilization", value: "72%", trend: 5, compare: "vs last month", color: "#8B5CF6" },
  { id: "activity", label: "Today's Activity", value: "42 / 38", trend: 11, compare: "in vs out", color: "#06B6D4" },
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

export const STORAGE_OPTIONS = [
  { id: "all", label: "All Storage Types" },
  { id: "cold", label: "Cold Storage" },
  { id: "refrigerated", label: "Refrigerated" },
  { id: "ambient", label: "Ambient Storage" },
  { id: "frozen", label: "Frozen Storage" },
];

export const AVAILABILITY_OPTIONS = [
  { id: "all", label: "All Availability" },
  { id: "available", label: "Available" },
  { id: "reserved", label: "Reserved" },
  { id: "in_transit", label: "In Transit" },
];

export const EXPIRY_OPTIONS = [
  { id: "all", label: "All Expiry Status" },
  { id: "good", label: "Good" },
  { id: "near_expiry", label: "Near Expiry" },
  { id: "expiring_today", label: "Expiring Today" },
  { id: "expired", label: "Expired" },
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

export const STORAGE_LABELS = {
  cold: "Cold Storage",
  refrigerated: "Refrigerated",
  ambient: "Ambient Storage",
  frozen: "Frozen Storage",
};

export const STATUS_LABELS = {
  good: "Good",
  near_expiry: "Near Expiry",
  expiring_today: "Expiring Today",
  expired: "Expired",
};

export const STATUS_COLORS = {
  good: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  near_expiry: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  expiring_today: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  expired: "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
};

export const ADMIN_INVENTORY_BATCHES = [
  {
    id: "INV-2048",
    foodItem: "Veg Biryani",
    image: vegBiryani,
    category: "cooked_meals",
    quantity: "120 kg",
    meals: 480,
    storage: "refrigerated",
    receivedDate: "Aug 6, 2026",
    expiryDate: "Aug 7, 2026 · 6 PM",
    status: "expiring_today",
    availability: "available",
    donor: "Hotel Grand Palace",
    ngo: "Helping Hands Foundation",
    volunteer: "Rahul Kumar",
    temperature: "4°C",
    quality: "Good",
    batchCode: "QR-NB-2048-A",
  },
  {
    id: "INV-2047",
    foodItem: "Mixed Seasonal Fruits",
    image: mixedFruits,
    category: "fruits",
    quantity: "45 kg",
    meals: 180,
    storage: "cold",
    receivedDate: "Aug 5, 2026",
    expiryDate: "Aug 8, 2026",
    status: "near_expiry",
    availability: "available",
    donor: "Paradise Biryani",
    ngo: "Sunrise Home",
    volunteer: "Priya Sharma",
    temperature: "2°C",
    quality: "Good",
    batchCode: "QR-NB-2047-B",
  },
  {
    id: "INV-2046",
    foodItem: "Idli Sambar",
    image: idliSambar,
    category: "cooked_meals",
    quantity: "80 kg",
    meals: 320,
    storage: "refrigerated",
    receivedDate: "Aug 6, 2026",
    expiryDate: "Aug 9, 2026",
    status: "good",
    availability: "reserved",
    donor: "Daily Bread Café",
    ngo: "Feeding India Hub",
    volunteer: "Arjun Reddy",
    temperature: "5°C",
    quality: "Excellent",
    batchCode: "QR-NB-2046-C",
  },
  {
    id: "INV-2045",
    foodItem: "Assorted Bread Loaves",
    image: assortedBread,
    category: "bakery",
    quantity: "35 kg",
    meals: 140,
    storage: "ambient",
    receivedDate: "Aug 4, 2026",
    expiryDate: "Aug 7, 2026",
    status: "near_expiry",
    availability: "available",
    donor: "Daily Bread Café",
    ngo: "Hope Shelter",
    volunteer: "—",
    temperature: "22°C",
    quality: "Good",
    batchCode: "QR-NB-2045-D",
  },
  {
    id: "INV-2044",
    foodItem: "Dal Makhani & Naan",
    image: dalMakhani,
    category: "cooked_meals",
    quantity: "95 kg",
    meals: 380,
    storage: "refrigerated",
    receivedDate: "Aug 3, 2026",
    expiryDate: "Aug 10, 2026",
    status: "good",
    availability: "available",
    donor: "Paradise Biryani",
    ngo: "Helping Hands Foundation",
    volunteer: "Rahul Kumar",
    temperature: "4°C",
    quality: "Good",
    batchCode: "QR-NB-2044-E",
  },
  {
    id: "INV-2043",
    foodItem: "Paneer Curry",
    image: paneerCurry,
    category: "cooked_meals",
    quantity: "60 kg",
    meals: 240,
    storage: "refrigerated",
    receivedDate: "Aug 2, 2026",
    expiryDate: "Aug 5, 2026",
    status: "expired",
    availability: "available",
    donor: "Hotel Grand Palace",
    ngo: "Sunrise Home",
    volunteer: "—",
    temperature: "—",
    quality: "Expired",
    batchCode: "QR-NB-2043-F",
  },
  {
    id: "INV-2042",
    foodItem: "Fresh Fruit Boxes",
    image: fruitBoxes,
    category: "fruits",
    quantity: "28 kg",
    meals: 112,
    storage: "cold",
    receivedDate: "Aug 6, 2026",
    expiryDate: "Aug 11, 2026",
    status: "good",
    availability: "in_transit",
    donor: "TechCorp Hyderabad",
    ngo: "Feeding India Hub",
    volunteer: "Priya Sharma",
    temperature: "3°C",
    quality: "Excellent",
    batchCode: "QR-NB-2042-G",
  },
  {
    id: "INV-2041",
    foodItem: "Packaged Meals",
    image: packagedMeals,
    category: "cooked_meals",
    quantity: "200 units",
    meals: 200,
    storage: "ambient",
    receivedDate: "Aug 1, 2026",
    expiryDate: "Aug 14, 2026",
    status: "good",
    availability: "available",
    donor: "Corporate Lunch Donor",
    ngo: "Hope Shelter",
    volunteer: "Arjun Reddy",
    temperature: "20°C",
    quality: "Good",
    batchCode: "QR-NB-2041-H",
  },
  {
    id: "INV-2040",
    foodItem: "Dry Rations Pack",
    image: dryGoods,
    category: "dry_goods",
    quantity: "150 kg",
    meals: 600,
    storage: "ambient",
    receivedDate: "Jul 28, 2026",
    expiryDate: "Sep 28, 2026",
    status: "good",
    availability: "available",
    donor: "Goonj Partner",
    ngo: "Helping Hands Foundation",
    volunteer: "—",
    temperature: "24°C",
    quality: "Good",
    batchCode: "QR-NB-2040-I",
  },
  {
    id: "INV-2039",
    foodItem: "Fresh Vegetables",
    image: freshFruits,
    category: "vegetables",
    quantity: "55 kg",
    meals: 220,
    storage: "cold",
    receivedDate: "Aug 5, 2026",
    expiryDate: "Aug 8, 2026",
    status: "near_expiry",
    availability: "reserved",
    donor: "Local Market Donor",
    ngo: "Sunrise Home",
    volunteer: "Rahul Kumar",
    temperature: "3°C",
    quality: "Fair",
    batchCode: "QR-NB-2039-J",
  },
];

export const CATEGORY_DISTRIBUTION = [
  { name: "Cooked Meals", value: 38, color: "#22C55E" },
  { name: "Fruits", value: 22, color: "#3B82F6" },
  { name: "Dry Goods", value: 16, color: "#8B5CF6" },
  { name: "Dairy", value: 10, color: "#F59E0B" },
  { name: "Raw Food", value: 9, color: "#06B6D4" },
  { name: "Others", value: 5, color: "#94A3B8" },
];

export const STORAGE_GAUGE = {
  usedPercent: 72,
  totalCapacity: "17,500 kg",
  availableCapacity: "4,900 kg",
};

export const INCOMING_OUTGOING = [
  { label: "Mon", incoming: 420, outgoing: 380 },
  { label: "Tue", incoming: 510, outgoing: 440 },
  { label: "Wed", incoming: 480, outgoing: 460 },
  { label: "Thu", incoming: 620, outgoing: 520 },
  { label: "Fri", incoming: 580, outgoing: 490 },
  { label: "Sat", incoming: 720, outgoing: 680 },
  { label: "Sun", incoming: 540, outgoing: 510 },
];

export const EXPIRY_TIMELINE = [
  { label: "Expiring Today", value: 8, color: "#EF4444" },
  { label: "Within 3 Days", value: 16, color: "#F59E0B" },
  { label: "Within 7 Days", value: 24, color: "#EAB308" },
  { label: "Within 30 Days", value: 42, color: "#22C55E" },
  { label: "More than 30 Days", value: 96, color: "#3B82F6" },
];

export const INVENTORY_ALERTS = [
  {
    id: "expiring",
    emoji: "🔴",
    title: "Expiring Today",
    description: "8 batches require immediate distribution or discard.",
    action: "Review batches",
    color: "border-[#FECACA] bg-[#FEF2F2]",
  },
  {
    id: "near",
    emoji: "🟠",
    title: "Near Expiry",
    description: "16 items expire within 72 hours across 4 NGOs.",
    action: "Prioritize pickup",
    color: "border-[#FDE68A] bg-[#FFFBEB]",
  },
  {
    id: "storage",
    emoji: "🟡",
    title: "High Storage Usage",
    description: "Cold storage at 89% capacity — consider redistribution.",
    action: "View storage",
    color: "border-[#FEF3C7] bg-[#FFFBEB]",
  },
  {
    id: "cold",
    emoji: "🔵",
    title: "Cold Storage Warning",
    description: "Unit B temperature fluctuation detected (6°C peak).",
    action: "Check sensors",
    color: "border-[#BFDBFE] bg-[#EFF6FF]",
  },
  {
    id: "quality",
    emoji: "🟢",
    title: "Quality Inspection Due",
    description: "12 batches scheduled for quality audit this week.",
    action: "Schedule inspection",
    color: "border-[#BBF7D0] bg-[#F0FDF4]",
  },
];

export function filterInventoryBatches(batches, filters) {
  let result = [...batches];
  const { search, category, storage, availability, expiry, dateFrom, dateTo } = filters;

  if (category && category !== "all") result = result.filter((b) => b.category === category);
  if (storage && storage !== "all") result = result.filter((b) => b.storage === storage);
  if (availability && availability !== "all") result = result.filter((b) => b.availability === availability);
  if (expiry && expiry !== "all") result = result.filter((b) => b.status === expiry);

  if (search?.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.foodItem.toLowerCase().includes(q) ||
        b.donor.toLowerCase().includes(q) ||
        b.ngo.toLowerCase().includes(q),
    );
  }

  return result;
}

export function sortInventoryBatches(batches, sortKey, sortDir) {
  const sorted = [...batches];
  const dir = sortDir === "asc" ? 1 : -1;
  sorted.sort((a, b) => {
    if (sortKey === "meals") return (a.meals - b.meals) * dir;
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    return String(av).localeCompare(String(bv)) * dir;
  });
  return sorted;
}
