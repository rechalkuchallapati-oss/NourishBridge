import { enrichDonationRecord } from "./shared/donationItems";

export const RECEIVING_STATES = {
  ARRIVED: "arrived",
  INSPECTION_PENDING: "inspection_pending",
  ACCEPTED: "accepted_for_distribution",
  INSPECTION_FAILED: "inspection_failed",
  REJECTED: "rejected_with_reason",
};

const RAW_PENDING = [
  {
    id: "RCV-001",
    donationId: "DN-2395",
    eventType: "restaurant",
    eventName: "Spice Route Restaurant — closing surplus",
    foodName: "Restaurant Surplus · 7 items",
    foodCategory: "Indo-Chinese & Indian",
    donorName: "Spice Route Restaurant",
    listedQuantity: "7 item types",
    items: [
      { name: "Chicken Manchurian", quantity: "12 kg", cuisine: "Indo-Chinese" },
      { name: "Veg Hakka Noodles", quantity: "10 kg", cuisine: "Chinese" },
      { name: "Schezwan Fried Rice", quantity: "14 kg", cuisine: "Chinese" },
      { name: "Paneer Butter Masala", quantity: "8 kg", cuisine: "Indian" },
      { name: "Chocolate Lava Cake", quantity: "36 slices", cuisine: "Desserts" },
    ],
    volunteer: "Suresh Nair",
    arrivedAt: "Today, 6:10 PM",
    status: RECEIVING_STATES.INSPECTION_PENDING,
    requiresTemperatureCheck: true,
  },
  {
    id: "RCV-002",
    donationId: "DN-2360",
    eventType: "hotel",
    eventName: "Grand Horizon Hotel — banquet wrap-up",
    foodName: "Banquet Surplus · 8 items",
    foodCategory: "Multi-Cuisine Banquet",
    donorName: "Grand Horizon Hotel",
    listedQuantity: "8 item types",
    items: [
      { name: "Lamb Rogan Josh", quantity: "14 kg", cuisine: "Indian" },
      { name: "Malabar Fish Curry", quantity: "10 kg", cuisine: "South Indian" },
      { name: "Thai Green Curry & Rice", quantity: "12 kg", cuisine: "Thai" },
      { name: "Tiramisu Cups", quantity: "55 cups", cuisine: "Italian" },
    ],
    volunteer: "Meera Joshi",
    arrivedAt: "Today, 5:45 PM",
    status: RECEIVING_STATES.ARRIVED,
    requiresTemperatureCheck: true,
  },
];

export const PENDING_RECEIVING = RAW_PENDING.map(enrichDonationRecord);

export const PACKAGING_OPTIONS = ["Excellent", "Good", "Damaged", "Compromised"];
export const SPOILAGE_OPTIONS = ["None visible", "Minor concern", "Visible spoilage"];
export const TEMPERATURE_OPTIONS = ["Above 60°C (hot)", "Below 5°C (cold)", "Room temp — acceptable", "Out of safe range"];

const RAW_LOG = [
  {
    id: "LOG-001",
    donationId: "DN-2375",
    eventType: "corporate",
    foodName: "Corporate Lunch · 4 items",
    items: [
      { name: "Club Sandwiches (assorted)", quantity: "85 packs", cuisine: "Continental" },
      { name: "Quinoa Buddha Bowls", quantity: "60 bowls", cuisine: "Healthy" },
    ],
    result: "accepted_for_distribution",
    receivedAt: "Yesterday, 7:20 PM",
    quantityReceived: "4 item types (full)",
    quantityListed: "4 item types",
    notes: "All items within safe temperature; minor dent on 2 sandwich packs",
  },
  {
    id: "LOG-002",
    donationId: "DN-2315",
    eventType: "restaurant",
    foodName: "Seafood Buffet · 3 items",
    items: [
      { name: "Grilled Prawns", quantity: "8 kg", cuisine: "Continental" },
      { name: "Fish Tikka", quantity: "6 kg", cuisine: "Indian" },
      { name: "Lemon Butter Scallops", quantity: "4 kg", cuisine: "Continental" },
    ],
    result: "rejected_with_reason",
    receivedAt: "Yesterday, 2:10 PM",
    quantityReceived: "0 kg",
    quantityListed: "3 item types",
    notes: "Temperature out of safe range; visible spoilage on seafood items",
  },
];

export const RECENT_RECEIVING_LOG = RAW_LOG.map(enrichDonationRecord);
