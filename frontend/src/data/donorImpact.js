export const IMPACT_SUMMARY = {
  mealsContributed: {
    value: 1860,
    label: "Meals contributed",
    note: "Based on reported servings from completed donations.",
  },
  foodRescuedKg: {
    value: 742,
    label: "Food rescued",
    unit: "kg",
    note: "Sum of donor-reported quantities converted where needed.",
  },
  wasteReduction: {
    value: "~620",
    label: "Estimated food-waste reduction",
    unit: "kg diverted*",
    note: "*Estimate using an average 0.84 kg diverted per meal served. Actual impact varies by food type and portion size.",
  },
  ngosSupported: {
    value: 9,
    label: "NGOs supported",
    note: "Unique verified NGOs that received your donations.",
  },
  communitiesReached: {
    value: 14,
    label: "Communities reached",
    note: "Approximate service areas served through partner NGOs.",
  },
  emissionsAvoided: {
    value: "~1.2",
    label: "Estimated emissions avoided",
    unit: "t CO₂e*",
    note: "*Rough estimate only (not measured). Assumes ~2.5 kg CO₂e per kg of food waste avoided. For awareness, not reporting.",
  },
};

export const MONTHLY_DONATION_TRENDS = [
  { month: "Feb", donations: 2, meals: 120 },
  { month: "Mar", donations: 3, meals: 210 },
  { month: "Apr", donations: 4, meals: 340 },
  { month: "May", donations: 5, meals: 420 },
  { month: "Jun", donations: 6, meals: 510 },
  { month: "Jul", donations: 4, meals: 260 },
];

export const IMPACT_METHODOLOGY_NOTE =
  "Impact figures combine completed donation records with conservative conversion assumptions. Estimates are rounded and labeled where methodology is approximate — they are meant to motivate continued giving, not serve as audited environmental reporting.";

/** Beneficiary breakdown for the My Impact overview pie chart (this month). */
export const IMPACT_BENEFICIARY_BREAKDOWN = [
  {
    id: "families",
    label: "Families fed",
    percentage: 60,
    meals: 25,
    color: "#15803D",
    icon: "families",
  },
  {
    id: "children",
    label: "Children fed",
    percentage: 25,
    meals: 10,
    color: "#16A34A",
    icon: "children",
  },
  {
    id: "seniors",
    label: "Senior citizens",
    percentage: 10,
    meals: 4,
    color: "#86EFAC",
    icon: "seniors",
  },
  {
    id: "others",
    label: "Others",
    percentage: 5,
    meals: 2,
    color: "#F0FDF4",
    icon: "others",
  },
];
