export const IMPACT_TOP_STATS = {
  mealsDistributed: "25,480",
  foodRescued: "8,450 kg",
  beneficiariesServed: "14,320",
  communitiesReached: "62",
  activeVolunteers: "148",
  partnerDonors: "87",
};

export const MONTHLY_MEALS_TREND = [
  { month: "Jan", meals: 1200 },
  { month: "Feb", meals: 1800 },
  { month: "Mar", meals: 2600 },
  { month: "Apr", meals: 3200 },
  { month: "May", meals: 3800 },
  { month: "Jun", meals: 4500 },
  { month: "Jul", meals: 5180 },
];

export const FOOD_RESCUE_DONUT = [
  { id: "cooked", label: "Cooked Meals", share: 48, color: "#16A34A" },
  { id: "vegetables", label: "Vegetables", share: 18, color: "#22C55E" },
  { id: "bakery", label: "Bakery", share: 15, color: "#F59E0B" },
  { id: "packaged", label: "Packaged Food", share: 12, color: "#2563EB" },
  { id: "dry_goods", label: "Dry Goods", share: 7, color: "#8B5CF6" },
];

export const FOOD_CATEGORY_DISTRIBUTION = FOOD_RESCUE_DONUT.map((item) => ({
  category: item.label,
  kg: Math.round((item.share / 100) * 8450),
  share: item.share,
}));

export const BENEFICIARY_DISTRIBUTION = [
  { id: "shelters", label: "Shelters", meals: 8200, share: 32 },
  { id: "old_age", label: "Old Age Homes", meals: 5100, share: 20 },
  { id: "orphanages", label: "Orphanages", meals: 4800, share: 19 },
  { id: "community_kitchens", label: "Community Kitchens", meals: 4200, share: 16 },
  { id: "families", label: "Families", meals: 3180, share: 13 },
];

export const ENVIRONMENTAL_IMPACT = {
  foodWastePrevented: "8.4 Tons",
  co2Reduction: "12.3 Tons",
  waterSaved: "1.5 Million Litres",
};

export const TOP_PERFORMING_DONORS = [
  { name: "Hotel Grand Palace", mealsDonated: 2840, totalDonations: 42 },
  { name: "Paradise Biryani", mealsDonated: 2180, totalDonations: 36 },
  { name: "Daily Bread Café", mealsDonated: 1920, totalDonations: 28 },
  { name: "Green Valley Hotel", mealsDonated: 1640, totalDonations: 24 },
  { name: "Spice Garden Restaurant", mealsDonated: 1480, totalDonations: 22 },
];

export const TOP_VOLUNTEERS = [
  {
    id: "VOL-204",
    name: "Rahul Kumar",
    missions: 245,
    meals: 4200,
    rating: 5,
    avatarKey: "primary",
  },
  {
    id: "VOL-118",
    name: "Priya Sharma",
    missions: 218,
    meals: 3680,
    rating: 5,
    avatarKey: "alt1",
  },
  {
    id: "VOL-092",
    name: "Arjun Reddy",
    missions: 196,
    meals: 3240,
    rating: 4,
    avatarKey: "alt2",
  },
];

export const IMPACT_TIMELINE = [
  { month: "January", meals: 1200 },
  { month: "February", meals: 1800 },
  { month: "March", meals: 2600 },
  { month: "April", meals: 3200 },
  { month: "May", meals: 3800 },
  { month: "June", meals: 4500 },
  { month: "July", meals: 5180 },
];

export const COMMUNITY_COVERAGE = [
  { id: "hyderabad", label: "Hyderabad", x: 42, y: 48, active: true },
  { id: "secunderabad", label: "Secunderabad", x: 58, y: 28, active: true },
  { id: "kukatpally", label: "Kukatpally", x: 28, y: 32, active: true },
  { id: "gachibowli", label: "Gachibowli", x: 22, y: 58, active: true },
  { id: "madhapur", label: "Madhapur", x: 38, y: 62, active: true },
];

export const SUCCESS_STORIES = [
  { id: "food_drive", title: "Food Drive", meals: 480, description: "Corporate lunch surplus redirected to 3 shelters." },
  {
    id: "community_kitchen",
    title: "Community Kitchen",
    meals: 320,
    description: "Weekly hot meals program launched in Kukatpally.",
  },
  {
    id: "flood_relief",
    title: "Flood Relief",
    meals: 1200,
    description: "Emergency distribution during monsoon flooding in Madhapur.",
  },
];

export const NGO_IMPACT_KPIS = [
  { id: "meals", label: "Meals Distributed", value: IMPACT_TOP_STATS.mealsDistributed, accent: "green" },
  { id: "food_saved", label: "Food Rescued", value: IMPACT_TOP_STATS.foodRescued, accent: "green" },
  { id: "people", label: "Beneficiaries Served", value: IMPACT_TOP_STATS.beneficiariesServed, accent: "blue" },
  { id: "communities", label: "Communities Reached", value: IMPACT_TOP_STATS.communitiesReached, accent: "slate" },
  { id: "volunteers", label: "Active Volunteers", value: IMPACT_TOP_STATS.activeVolunteers, accent: "purple" },
  { id: "donors", label: "Partner Donors", value: IMPACT_TOP_STATS.partnerDonors, accent: "amber" },
];

export const TOP_DONOR_ORGANIZATIONS = TOP_PERFORMING_DONORS.map((donor) => ({
  name: donor.name,
  donations: donor.totalDonations,
  kg: Math.round(donor.mealsDonated * 0.35),
}));
