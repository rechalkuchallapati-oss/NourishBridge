export const REPORT_OVERVIEW_STATS = {
  mealsDistributed: "12,450",
  foodRescued: "4,820 kg",
  communitiesServed: "38",
  volunteersActive: "42",
  successfulDeliveries: "172",
  foodWastePrevented: "3.6 tons",
};

export const ANALYTICS_PERIODS = [
  {
    id: "today",
    label: "Today's Report",
    meals: 186,
    rescuedKg: 72,
    deliveries: 8,
    volunteers: 12,
  },
  {
    id: "weekly",
    label: "Weekly Report",
    meals: 1240,
    rescuedKg: 480,
    deliveries: 54,
    volunteers: 28,
  },
  {
    id: "monthly",
    label: "Monthly Report",
    meals: 5420,
    rescuedKg: 2100,
    deliveries: 172,
    volunteers: 42,
  },
  {
    id: "yearly",
    label: "Yearly Report",
    meals: 12450,
    rescuedKg: 4820,
    deliveries: 892,
    volunteers: 156,
  },
];

export const FOOD_RESCUE_TREND = [
  { month: "Jan", kg: 320 },
  { month: "Feb", kg: 410 },
  { month: "Mar", kg: 520 },
  { month: "Apr", kg: 480 },
  { month: "May", kg: 610 },
  { month: "Jun", kg: 720 },
  { month: "Jul", kg: 860 },
];

export const FOOD_CATEGORY_PIE = [
  { id: "cooked", label: "Cooked Meals", share: 34, kg: 1640, color: "#16A34A" },
  { id: "vegetables", label: "Vegetables", share: 22, kg: 1060, color: "#22C55E" },
  { id: "bakery", label: "Bakery", share: 18, kg: 870, color: "#F59E0B" },
  { id: "packaged", label: "Packaged Food", share: 16, kg: 770, color: "#2563EB" },
  { id: "fruits", label: "Fruits", share: 10, kg: 480, color: "#EC4899" },
];

export const DISTRIBUTION_ANALYTICS = [
  { id: "shelters", label: "Shelters", meals: 4200, share: 34 },
  { id: "orphanages", label: "Orphanages", meals: 2800, share: 22 },
  { id: "old_age", label: "Old Age Homes", meals: 2100, share: 17 },
  { id: "community_kitchens", label: "Community Kitchens", meals: 1950, share: 16 },
  { id: "families", label: "Families", meals: 1400, share: 11 },
];

export const VOLUNTEER_LEADERBOARD = {
  most_missions: [
    { rank: 1, id: "VOL-204", name: "Rahul Kumar", value: 48, unit: "missions" },
    { rank: 2, id: "VOL-118", name: "Priya Sharma", value: 44, unit: "missions" },
    { rank: 3, id: "VOL-092", name: "Arjun Reddy", value: 41, unit: "missions" },
    { rank: 4, id: "VOL-156", name: "Sneha Patel", value: 38, unit: "missions" },
    { rank: 5, id: "VOL-201", name: "Vikram Singh", value: 36, unit: "missions" },
    { rank: 6, id: "VOL-089", name: "Ananya Iyer", value: 34, unit: "missions" },
    { rank: 7, id: "VOL-142", name: "Karthik Rao", value: 32, unit: "missions" },
    { rank: 8, id: "VOL-177", name: "Meera Nair", value: 30, unit: "missions" },
    { rank: 9, id: "VOL-133", name: "Rohan Das", value: 28, unit: "missions" },
    { rank: 10, id: "VOL-165", name: "Divya Menon", value: 26, unit: "missions" },
  ],
  highest_rating: [
    { rank: 1, id: "VOL-204", name: "Rahul Kumar", value: 4.9, unit: "★" },
    { rank: 2, id: "VOL-118", name: "Priya Sharma", value: 4.8, unit: "★" },
    { rank: 3, id: "VOL-092", name: "Arjun Reddy", value: 4.8, unit: "★" },
    { rank: 4, id: "VOL-156", name: "Sneha Patel", value: 4.7, unit: "★" },
    { rank: 5, id: "VOL-201", name: "Vikram Singh", value: 4.7, unit: "★" },
    { rank: 6, id: "VOL-089", name: "Ananya Iyer", value: 4.6, unit: "★" },
    { rank: 7, id: "VOL-142", name: "Karthik Rao", value: 4.6, unit: "★" },
    { rank: 8, id: "VOL-177", name: "Meera Nair", value: 4.5, unit: "★" },
    { rank: 9, id: "VOL-133", name: "Rohan Das", value: 4.5, unit: "★" },
    { rank: 10, id: "VOL-165", name: "Divya Menon", value: 4.4, unit: "★" },
  ],
  fastest_response: [
    { rank: 1, id: "VOL-204", name: "Rahul Kumar", value: 4, unit: "min" },
    { rank: 2, id: "VOL-118", name: "Priya Sharma", value: 5, unit: "min" },
    { rank: 3, id: "VOL-092", name: "Arjun Reddy", value: 6, unit: "min" },
    { rank: 4, id: "VOL-156", name: "Sneha Patel", value: 7, unit: "min" },
    { rank: 5, id: "VOL-201", name: "Vikram Singh", value: 8, unit: "min" },
    { rank: 6, id: "VOL-089", name: "Ananya Iyer", value: 9, unit: "min" },
    { rank: 7, id: "VOL-142", name: "Karthik Rao", value: 10, unit: "min" },
    { rank: 8, id: "VOL-177", name: "Meera Nair", value: 11, unit: "min" },
    { rank: 9, id: "VOL-133", name: "Rohan Das", value: 12, unit: "min" },
    { rank: 10, id: "VOL-165", name: "Divya Menon", value: 13, unit: "min" },
  ],
  most_meals: [
    { rank: 1, id: "VOL-204", name: "Rahul Kumar", value: 1840, unit: "meals" },
    { rank: 2, id: "VOL-118", name: "Priya Sharma", value: 1620, unit: "meals" },
    { rank: 3, id: "VOL-092", name: "Arjun Reddy", value: 1480, unit: "meals" },
    { rank: 4, id: "VOL-156", name: "Sneha Patel", value: 1320, unit: "meals" },
    { rank: 5, id: "VOL-201", name: "Vikram Singh", value: 1180, unit: "meals" },
    { rank: 6, id: "VOL-089", name: "Ananya Iyer", value: 1040, unit: "meals" },
    { rank: 7, id: "VOL-142", name: "Karthik Rao", value: 980, unit: "meals" },
    { rank: 8, id: "VOL-177", name: "Meera Nair", value: 920, unit: "meals" },
    { rank: 9, id: "VOL-133", name: "Rohan Das", value: 860, unit: "meals" },
    { rank: 10, id: "VOL-165", name: "Divya Menon", value: 780, unit: "meals" },
  ],
};

export const LEADERBOARD_TABS = [
  { id: "most_missions", label: "Most Missions" },
  { id: "highest_rating", label: "Highest Rating" },
  { id: "fastest_response", label: "Fastest Response" },
  { id: "most_meals", label: "Most Meals Delivered" },
];

export const MONTHLY_IMPACT = {
  mealsServed: "5,420",
  foodRescued: "2,100 kg",
  communitiesReached: "12",
  beneficiaries: "2,840",
};

export const RECENT_REPORTS = [
  {
    id: "RPT-001",
    name: "Monthly Impact",
    date: "July 2026",
    type: "PDF",
    period: "monthly",
  },
  {
    id: "RPT-002",
    name: "Weekly Operations",
    date: "Jun 30 – Jul 6, 2026",
    type: "Excel",
    period: "weekly",
  },
  {
    id: "RPT-003",
    name: "Volunteer Performance",
    date: "June 2026",
    type: "PDF",
    period: "monthly",
  },
  {
    id: "RPT-004",
    name: "Distribution Summary",
    date: "Q2 2026",
    type: "CSV",
    period: "yearly",
  },
  {
    id: "RPT-005",
    name: "Food Rescue Audit",
    date: "June 2026",
    type: "PDF",
    period: "monthly",
  },
];

export const AUTO_INSIGHTS = [
  {
    id: "meals",
    direction: "up",
    text: "Meals distributed increased by 18% this month.",
  },
  {
    id: "waste",
    direction: "down",
    text: "Food waste reduced by 12%.",
  },
  {
    id: "volunteers",
    direction: "up",
    text: "Volunteer participation increased by 25%.",
  },
];

export const INSIGHT_HIGHLIGHTS = {
  highestDemandArea: "Madhapur",
  mostDonatedFood: "Cooked Meals",
  bestPerformingVolunteer: "Rahul Kumar",
};

export const DATE_RANGE_OPTIONS = [
  { id: "today", label: "Today" },
  { id: "last_7", label: "Last 7 Days" },
  { id: "last_30", label: "Last 30 Days" },
  { id: "this_month", label: "This Month" },
  { id: "last_month", label: "Last Month" },
  { id: "this_year", label: "This Year" },
  { id: "custom", label: "Custom Range" },
];

export const VOLUNTEER_FILTER_OPTIONS = [
  { id: "all", label: "All Volunteers" },
  { id: "VOL-204", label: "Rahul Kumar" },
  { id: "VOL-118", label: "Priya Sharma" },
  { id: "VOL-092", label: "Arjun Reddy" },
];

export const NGO_FILTER_OPTIONS = [
  { id: "current", label: "Current NGO" },
  { id: "all", label: "All Partner NGOs" },
];

export const DONOR_FILTER_OPTIONS = [
  { id: "all", label: "All Donors" },
  { id: "hotel", label: "Hotels & Restaurants" },
  { id: "corporate", label: "Corporate" },
  { id: "individual", label: "Individual Donors" },
];

export const FOOD_CATEGORY_FILTER_OPTIONS = [
  { id: "all", label: "All Categories" },
  { id: "cooked", label: "Cooked Meals" },
  { id: "vegetables", label: "Vegetables" },
  { id: "bakery", label: "Bakery" },
  { id: "packaged", label: "Packaged Food" },
  { id: "fruits", label: "Fruits" },
];

export const LOCATION_FILTER_OPTIONS = [
  { id: "all", label: "All Locations" },
  { id: "madhapur", label: "Madhapur" },
  { id: "gachibowli", label: "Gachibowli" },
  { id: "hitech", label: "HITEC City" },
  { id: "kondapur", label: "Kondapur" },
];

export const DISTRIBUTION_TYPE_OPTIONS = [
  { id: "all", label: "All Types" },
  { id: "shelters", label: "Shelters" },
  { id: "orphanages", label: "Orphanages" },
  { id: "old_age", label: "Old Age Homes" },
  { id: "community_kitchens", label: "Community Kitchens" },
  { id: "families", label: "Families" },
];

export function filterRecentReports(reports, filters) {
  return reports.filter((report) => {
    if (filters.period !== "all" && report.period !== filters.period) return false;
    return true;
  });
}
