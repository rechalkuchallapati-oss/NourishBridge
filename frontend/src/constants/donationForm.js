export const FOOD_CATEGORIES = [
  "Prepared Meals",
  "Cooked Rice & Curry",
  "Baked Goods",
  "Fresh Produce",
  "Packaged Food",
  "Beverages",
  "Snacks & Dry Rations",
  "Other",
];

export const DIET_TYPES = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "non_vegetarian", label: "Non-Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "eggetarian", label: "Eggetarian" },
];

export const PACKAGING_OPTIONS = [
  "Sealed & labeled containers",
  "Foil trays with lids",
  "Insulated boxes",
  "Bulk containers (unpacked)",
  "Mixed packaging",
  "Needs repackaging on pickup",
];

export const ALLERGEN_OPTIONS = [
  "None declared",
  "Contains nuts",
  "Contains dairy",
  "Contains gluten",
  "Contains eggs",
  "Contains soy",
  "Multiple allergens — see notes",
];

export const DATE_FILTER_OPTIONS = [
  { id: "all", label: "All dates" },
  { id: "7", label: "Last 7 days" },
  { id: "30", label: "Last 30 days" },
  { id: "90", label: "Last 90 days" },
];

export const STATUS_FILTER_OPTIONS = [
  { id: "all", label: "All statuses" },
  { id: "active", label: "Active" },
  { id: "posted", label: "Posted" },
  { id: "ngo_matched", label: "NGO Matched" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "picked_up", label: "Picked Up" },
  { id: "in_transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
  { id: "ngo_confirmed", label: "NGO Confirmed" },
];
