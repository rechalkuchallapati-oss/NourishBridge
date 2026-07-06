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
    donationId: "IN-2841",
    eventType: "restaurant",
    eventName: "Biryani Mahal — kitchen closing surplus",
    packagingScale: "bulk",
    thumbnailKey: "restaurant_biryani_bulk",
    foodName: "Biryani Mahal Spread · 14 items",
    foodCategory: "Multi-Biryani Surplus",
    donorName: "Biryani Mahal",
    listedQuantity: "14 item types · bulk hot boxes",
    items: [
      { name: "Chicken Dum Biryani", quantity: "30 kg · hot box", cuisine: "Indian" },
      { name: "Mutton Biryani", quantity: "24 kg · hot box", cuisine: "Indian" },
      { name: "Prawns Biryani", quantity: "14 kg · pan", cuisine: "Indian" },
      { name: "Vanilla Ice Cream Tubs", quantity: "8 × 2 L", cuisine: "Desserts" },
    ],
    volunteer: "Suresh Nair",
    arrivedAt: "Today, 6:10 PM",
    status: RECEIVING_STATES.INSPECTION_PENDING,
    requiresTemperatureCheck: true,
  },
  {
    id: "RCV-002",
    donationId: "IN-2829",
    eventType: "hotel",
    eventName: "ITC Gardenia — banquet wrap-up",
    packagingScale: "bulk",
    thumbnailKey: "hotel_banquet",
    foodName: "Hotel Banquet · 9 items",
    foodCategory: "Multi-Cuisine Banquet",
    donorName: "ITC Gardenia Bengaluru",
    listedQuantity: "9 item types · chafer sets",
    items: [
      { name: "Lamb Rogan Josh", quantity: "16 kg · chafer", cuisine: "Indian" },
      { name: "Chettinad Chicken", quantity: "14 kg · chafer", cuisine: "South Indian" },
      { name: "Tiramisu & Éclairs", quantity: "65 portions", cuisine: "Desserts" },
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
    donationId: "IN-2835",
    eventType: "individual",
    foodName: "Sambar Rice & Curd Rice",
    items: [
      { name: "Sambar Rice", quantity: "5 kg · 4 tiffins", cuisine: "South Indian" },
      { name: "Curd Rice", quantity: "4 kg · 2 tiffins", cuisine: "South Indian" },
    ],
    result: "accepted_for_distribution",
    receivedAt: "Yesterday, 7:20 PM",
    quantityReceived: "6 tiffins (full)",
    quantityListed: "6 tiffins",
    notes: "All tiffins sealed; curd rice at safe cold temp",
  },
  {
    id: "LOG-002",
    donationId: "IN-2810",
    eventType: "restaurant",
    foodName: "Seafood Buffet · 4 items",
    items: [
      { name: "Grilled Prawns", quantity: "8 kg", cuisine: "Continental" },
      { name: "Fish Tikka", quantity: "6 kg", cuisine: "Indian" },
    ],
    result: "rejected_with_reason",
    receivedAt: "Yesterday, 2:10 PM",
    quantityReceived: "0 kg",
    quantityListed: "4 item types",
    notes: "Seafood out of safe temperature range on arrival",
  },
];

export const RECENT_RECEIVING_LOG = RAW_LOG.map(enrichDonationRecord);
