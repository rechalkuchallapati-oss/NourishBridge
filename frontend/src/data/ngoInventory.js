export const INVENTORY_FILTERS = [
  { id: "all", label: "All" },
  { id: "urgent", label: "Urgent" },
  { id: "available", label: "Available" },
  { id: "distributed", label: "Distributed" },
  { id: "expired", label: "Expired / Disposed" },
];

export const FOOD_INVENTORY = [
  {
    id: "INV-001",
    food: "Vegetable Biryani",
    quantity: "25 kg",
    received: "Today, 6:30 PM",
    consumeBy: "Today, 10:00 PM",
    status: "urgent",
    category: "Prepared Meals",
    servingsEstimate: 45,
  },
  {
    id: "INV-002",
    food: "Bread Packets",
    quantity: "40 packs",
    received: "Today, 4:00 PM",
    consumeBy: "Tomorrow",
    status: "available",
    category: "Bakery & Snacks",
    servingsEstimate: 40,
  },
  {
    id: "INV-003",
    food: "Rice",
    quantity: "60 kg",
    received: "Yesterday",
    consumeBy: "Long shelf life",
    status: "available",
    category: "Grains",
    servingsEstimate: 180,
  },
  {
    id: "INV-004",
    food: "Fresh Vegetables",
    quantity: "18 kg",
    received: "Today, 3:00 PM",
    consumeBy: "Tomorrow, 6:00 PM",
    status: "urgent",
    category: "Fresh Produce",
    servingsEstimate: 50,
  },
  {
    id: "INV-005",
    food: "Fruit Boxes",
    quantity: "20 boxes",
    received: "Yesterday",
    consumeBy: "Yesterday, 6:00 PM",
    status: "expired",
    category: "Fruits",
    servingsEstimate: 40,
  },
  {
    id: "INV-006",
    food: "Idli & Sambar",
    quantity: "80 pieces",
    received: "2 days ago",
    consumeBy: "Distributed",
    status: "distributed",
    category: "Prepared Meals",
    servingsEstimate: 80,
  },
];

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
