import { enrichDonationRecord } from "./shared/donationItems";

export const INVENTORY_FILTERS = [
  { id: "all", label: "All" },
  { id: "urgent", label: "Urgent" },
  { id: "available", label: "Available" },
  { id: "distributed", label: "Distributed" },
  { id: "expired", label: "Expired / Disposed" },
];

const RAW_INVENTORY = [
  {
    id: "INV-001",
    eventType: "wedding",
    food: "Wedding Feast · 9 items",
    items: [
      { name: "Hyderabadi Dum Biryani", quantity: "38 kg", cuisine: "Indian" },
      { name: "Paneer Tikka & Seekh Kebabs", quantity: "22 kg", cuisine: "Indian" },
      { name: "Gulab Jamun & Ras Malai", quantity: "140 portions", cuisine: "Desserts" },
      { name: "Margherita & Farmhouse Pizza", quantity: "24 boxes", cuisine: "Italian" },
    ],
    quantity: "9 item types in stock",
    received: "Today, 6:30 PM",
    consumeBy: "Today, 10:00 PM",
    status: "urgent",
    category: "Multi-Cuisine Feast",
    servingsEstimate: 320,
  },
  {
    id: "INV-002",
    eventType: "corporate",
    food: "Corporate Lunch · 4 items",
    items: [
      { name: "Club Sandwiches (assorted)", quantity: "85 packs", cuisine: "Continental" },
      { name: "Quinoa Buddha Bowls", quantity: "60 bowls", cuisine: "Healthy" },
      { name: "Blueberry Muffins", quantity: "48 pieces", cuisine: "Bakery" },
      { name: "Iced Tea & Lemonade", quantity: "70 bottles", cuisine: "Beverages" },
    ],
    quantity: "4 item types",
    received: "Today, 4:00 PM",
    consumeBy: "Tomorrow",
    status: "available",
    category: "Corporate Catering",
    servingsEstimate: 145,
  },
  {
    id: "INV-003",
    eventType: "restaurant",
    food: "Thai & Sushi Surplus · 3 items",
    items: [
      { name: "Pad Thai Noodles", quantity: "14 kg", cuisine: "Thai" },
      { name: "Veg California Rolls", quantity: "52 pieces", cuisine: "Japanese" },
      { name: "Mango Sticky Rice", quantity: "40 portions", cuisine: "Desserts" },
    ],
    quantity: "3 item types",
    received: "Yesterday",
    consumeBy: "Long shelf life (packaged)",
    status: "available",
    category: "Restaurant Surplus",
    servingsEstimate: 96,
  },
  {
    id: "INV-004",
    eventType: "ramzan",
    food: "Ramzan Iftar · 6 items",
    items: [
      { name: "Chicken Haleem", quantity: "25 kg", cuisine: "Indian" },
      { name: "Sheer Khurma", quantity: "60 bowls", cuisine: "Desserts" },
      { name: "Samosas & Pakoras", quantity: "200 pieces", cuisine: "Indian" },
    ],
    quantity: "6 item types (partial stock)",
    received: "Today, 3:00 PM",
    consumeBy: "Today, 9:00 PM",
    status: "urgent",
    category: "Festival Meals",
    servingsEstimate: 280,
  },
  {
    id: "INV-005",
    eventType: "hotel",
    food: "Banquet Pastries · 2 items",
    items: [
      { name: "Tiramisu Cups", quantity: "55 cups", cuisine: "Italian" },
      { name: "Assorted Macarons", quantity: "88 pieces", cuisine: "Bakery" },
    ],
    quantity: "2 item types",
    received: "Yesterday",
    consumeBy: "Yesterday, 6:00 PM",
    status: "expired",
    category: "Desserts",
    servingsEstimate: 143,
  },
  {
    id: "INV-006",
    eventType: "festival",
    food: "Bathukamma Festival · 5 items",
    items: [
      { name: "Pulihora & Curd Rice", quantity: "22 kg", cuisine: "South Indian" },
      { name: "Bobbatlu & Ariselu", quantity: "75 pieces", cuisine: "Sweets" },
      { name: "Seasonal Fruit Baskets", quantity: "25 baskets", cuisine: "Fresh" },
    ],
    quantity: "5 item types",
    received: "2 days ago",
    consumeBy: "Distributed",
    status: "distributed",
    category: "Festival Meals",
    servingsEstimate: 168,
  },
];

export const FOOD_INVENTORY = RAW_INVENTORY.map(enrichDonationRecord);

export const INVENTORY_STATUS_COLORS = {
  urgent: "bg-red-100 text-red-700",
  available: "bg-[#DCFCE7] text-[#15803D]",
  distributed: "bg-[#DBEAFE] text-[#1D4ED8]",
  expired: "bg-[#F1F5F9] text-[#64748B]",
};

export const INVENTORY_STATUS_LABELS = {
  urgent: "Urgent",
  available: "Available",
  distributed: "Distributed",
  expired: "Expired / Disposed",
};
