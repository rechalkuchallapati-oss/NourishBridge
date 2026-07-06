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
    eventType: "restaurant",
    packagingScale: "bulk",
    thumbnailKey: "restaurant_biryani_bulk",
    food: "Biryani Mahal · 14 items",
    items: [
      { name: "Chicken Dum Biryani", quantity: "30 kg · hot box", cuisine: "Indian" },
      { name: "Mutton Biryani", quantity: "24 kg · hot box", cuisine: "Indian" },
      { name: "Fish Biryani (Seer)", quantity: "16 kg · pan", cuisine: "Indian" },
    ],
    quantity: "Bulk hot boxes · 14 item types",
    received: "Today, 6:30 PM",
    consumeBy: "Today, 11:30 PM",
    status: "urgent",
    category: "Restaurant Biryani Surplus",
    servingsEstimate: 380,
  },
  {
    id: "INV-002",
    eventType: "individual",
    packagingScale: "individual",
    thumbnailKey: "individual_rice_sambar",
    food: "Sambar Rice & Curd Rice",
    items: [
      { name: "Sambar Rice", quantity: "5 kg · 4 tiffins", cuisine: "South Indian" },
      { name: "Curd Rice", quantity: "4 kg · 2 tiffins", cuisine: "South Indian" },
    ],
    quantity: "6 home tiffins · ~9 kg",
    received: "Today, 4:00 PM",
    consumeBy: "Tomorrow, 2:00 PM",
    status: "available",
    category: "Home-Cooked Meals",
    servingsEstimate: 22,
  },
  {
    id: "INV-003",
    eventType: "festival",
    packagingScale: "bulk",
    thumbnailKey: "pongal_feast",
    food: "Pongal Festival · 7 items",
    items: [
      { name: "Ven Pongal (ghee)", quantity: "28 kg · vat", cuisine: "South Indian" },
      { name: "Sakkarai Pongal", quantity: "22 kg · trays", cuisine: "Sweets" },
      { name: "Murukku & Adhirasam", quantity: "80 pieces", cuisine: "Sweets" },
    ],
    quantity: "Community vats & sweet trays",
    received: "Yesterday",
    consumeBy: "Today, 5:00 PM",
    status: "urgent",
    category: "Festival Specials",
    servingsEstimate: 210,
  },
  {
    id: "INV-004",
    eventType: "wedding",
    packagingScale: "bulk",
    thumbnailKey: "wedding_buffet",
    food: "Verma–Bose Wedding · 11 items",
    items: [
      { name: "Lucknowi Mutton Korma", quantity: "26 kg · chafer", cuisine: "Indian" },
      { name: "Rasmalai & Jalebi", quantity: "130 portions", cuisine: "Desserts" },
    ],
    quantity: "Chafing dishes · partial stock",
    received: "Today, 3:00 PM",
    consumeBy: "Today, 11:45 PM",
    status: "urgent",
    category: "Wedding Banquet",
    servingsEstimate: 340,
  },
  {
    id: "INV-005",
    eventType: "christmas",
    packagingScale: "bulk",
    thumbnailKey: "christmas_feast",
    food: "Christmas Dinner · 6 items",
    items: [
      { name: "Roast Chicken & Gravy", quantity: "20 kg · trays", cuisine: "Continental" },
      { name: "Plum Cake & Stollen", quantity: "95 slices", cuisine: "Desserts" },
    ],
    quantity: "Parish kitchen trays",
    received: "Yesterday",
    consumeBy: "Yesterday, 10:00 PM",
    status: "expired",
    category: "Christmas Dinner",
    servingsEstimate: 175,
  },
  {
    id: "INV-006",
    eventType: "hotel",
    packagingScale: "bulk",
    thumbnailKey: "hotel_banquet",
    food: "ITC Gardenia Banquet · 9 items",
    items: [
      { name: "Lamb Rogan Josh", quantity: "16 kg · chafer", cuisine: "Indian" },
      { name: "Tiramisu & Éclairs", quantity: "65 portions", cuisine: "Desserts" },
    ],
    quantity: "Banquet roll-ins",
    received: "2 days ago",
    consumeBy: "Distributed",
    status: "distributed",
    category: "Hotel Banquet",
    servingsEstimate: 265,
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
