export const REPORTS_KPI = [
  {
    id: "donations",
    label: "Total Donations",
    value: "8,420",
    trend: 18,
    compare: "vs last month",
    color: "#22C55E",
  },
  {
    id: "food_saved",
    label: "Total Food Saved",
    value: "420 T",
    trend: 14,
    compare: "vs last month",
    color: "#3B82F6",
  },
  {
    id: "meals",
    label: "Meals Delivered",
    value: "1.2M",
    trend: 22,
    compare: "vs last month",
    color: "#8B5CF6",
  },
  {
    id: "ngos",
    label: "NGOs Benefited",
    value: "62",
    trend: 11,
    compare: "vs last month",
    color: "#F59E0B",
  },
  {
    id: "volunteers",
    label: "Active Volunteers",
    value: "148",
    trend: 9,
    compare: "vs last month",
    color: "#06B6D4",
  },
  {
    id: "lives",
    label: "Lives Impacted",
    value: "54,820",
    trend: 16,
    compare: "vs last month",
    color: "#EC4899",
  },
];

export const DONATIONS_MEALS_TREND = [
  { date: "Aug 1", donations: 42, meals: 820 },
  { date: "Aug 2", donations: 58, meals: 940 },
  { date: "Aug 3", donations: 51, meals: 880 },
  { date: "Aug 4", donations: 67, meals: 1120 },
  { date: "Aug 5", donations: 74, meals: 1280 },
  { date: "Aug 6", donations: 89, meals: 1540 },
  { date: "Aug 7", donations: 62, meals: 1050 },
  { date: "Aug 8", donations: 78, meals: 1320 },
];

export const FOOD_SAVED_TREND = [
  { date: "Aug 1", tons: 12.4 },
  { date: "Aug 2", tons: 14.1 },
  { date: "Aug 3", tons: 13.2 },
  { date: "Aug 4", tons: 16.8 },
  { date: "Aug 5", tons: 18.2 },
  { date: "Aug 6", tons: 21.5 },
  { date: "Aug 7", tons: 15.9 },
  { date: "Aug 8", tons: 19.3 },
];

export const IMPACT_DONUT = {
  total: 54820,
  segments: [
    { name: "Children", value: 38, color: "#22C55E" },
    { name: "Women", value: 28, color: "#3B82F6" },
    { name: "Men", value: 18, color: "#8B5CF6" },
    { name: "Senior Citizens", value: 10, color: "#F59E0B" },
    { name: "Others", value: 6, color: "#94A3B8" },
  ],
};

export const TOP_NGOS = [
  { name: "Helping Hands Foundation", meals: "54,820", donations: 420 },
  { name: "Sunrise Home", meals: "28,400", donations: 286 },
  { name: "Feeding India Hub", meals: "22,180", donations: 198 },
  { name: "Hope Shelter", meals: "18,640", donations: 164 },
];

export const VOLUNTEER_KPIS = [
  { label: "Total Missions", value: "1,842" },
  { label: "Completed Missions", value: "1,756" },
  { label: "Success Rate", value: "95.4%" },
  { label: "Average Rating", value: "4.8" },
];

export const DOWNLOAD_REPORTS = [
  { id: "impact", title: "Impact Report", format: "PDF", size: "2.4 MB" },
  { id: "donation", title: "Donation Report", format: "Excel", size: "1.8 MB" },
  { id: "ngo", title: "NGO Report", format: "PDF", size: "3.1 MB" },
  { id: "volunteer", title: "Volunteer Report", format: "Excel", size: "1.2 MB" },
];

export const DONATIONS_BY_CATEGORY = [
  { name: "Cooked Meals", value: 32, color: "#22C55E" },
  { name: "Fruits & Vegetables", value: 22, color: "#3B82F6" },
  { name: "Dry Rations", value: 18, color: "#8B5CF6" },
  { name: "Bakery Items", value: 14, color: "#F59E0B" },
  { name: "Dairy Products", value: 9, color: "#06B6D4" },
  { name: "Others", value: 5, color: "#94A3B8" },
];

export const GEO_CITIES = [
  { city: "Hyderabad", share: 32, lat: 78, lng: 42 },
  { city: "Bengaluru", share: 24, lat: 55, lng: 68 },
  { city: "Delhi", share: 18, lat: 28, lng: 52 },
  { city: "Mumbai", share: 16, lat: 38, lng: 28 },
  { city: "Chennai", share: 10, lat: 72, lng: 78 },
];

export const DONOR_TYPES = [
  { name: "Restaurants", value: 34, color: "#22C55E" },
  { name: "Hotels", value: 26, color: "#3B82F6" },
  { name: "Individuals", value: 18, color: "#8B5CF6" },
  { name: "Caterers", value: 12, color: "#F59E0B" },
  { name: "Corporate", value: 10, color: "#06B6D4" },
];

export const MONTHLY_COMPARISON = [
  { metric: "Total Donations", current: "842", previous: "712", growth: 18 },
  { metric: "Food Saved", current: "420 T", previous: "368 T", growth: 14 },
  { metric: "Meals Delivered", current: "1.2M", previous: "984K", growth: 22 },
  { metric: "NGOs Benefited", current: "62", previous: "56", growth: 11 },
  { metric: "Volunteers Active", current: "148", previous: "136", growth: 9 },
  { metric: "Lives Impacted", current: "54,820", previous: "47,260", growth: 16 },
];

export const DONATION_STATUS = [
  { name: "Completed", value: 58, color: "#22C55E" },
  { name: "In Transit", value: 18, color: "#3B82F6" },
  { name: "Pending", value: 12, color: "#F59E0B" },
  { name: "Cancelled", value: 7, color: "#94A3B8" },
  { name: "Rejected", value: 5, color: "#EF4444" },
];

export const STATUS_SUMMARY = [
  { label: "Average Response Time", value: "2h 45m" },
  { label: "Food Waste Prevented", value: "420 T" },
  { label: "CO₂ Emissions Prevented", value: "1,240 T" },
];

export const ALERTS_INSIGHTS = [
  {
    id: "expiry",
    emoji: "🟠",
    title: "Food batches nearing expiry",
    description: "18 inventory items expire within 24 hours.",
    action: "Review inventory",
    color: "border-[#FDE68A] bg-[#FFFBEB]",
  },
  {
    id: "delay",
    emoji: "🔴",
    title: "Delayed deliveries",
    description: "3 active deliveries exceeded ETA thresholds.",
    action: "View deliveries",
    color: "border-[#FECACA] bg-[#FEF2F2]",
  },
  {
    id: "region",
    emoji: "🔵",
    title: "Highest donating region",
    description: "Hyderabad contributed 32% of donations this month.",
    action: "View map",
    color: "border-[#BFDBFE] bg-[#EFF6FF]",
  },
  {
    id: "weekend",
    emoji: "🟢",
    title: "Weekend impact report",
    description: "Weekend donations up 24% vs weekday average.",
    action: "Open report",
    color: "border-[#BBF7D0] bg-[#F0FDF4]",
  },
];

export const NOTIFICATION_SUMMARY = [
  { name: "Missions", value: 28, color: "#22C55E" },
  { name: "Pickups", value: 22, color: "#3B82F6" },
  { name: "Donations", value: 24, color: "#8B5CF6" },
  { name: "Impact", value: 14, color: "#F59E0B" },
  { name: "System", value: 12, color: "#94A3B8" },
];

export const RECENT_ACTIVITIES = [
  { id: 1, text: "Donation DON-2048 matched with Helping Hands", time: "2 hrs ago" },
  { id: 2, text: "Volunteer Rahul completed pickup mission", time: "4 hrs ago" },
  { id: 3, text: "NGO Feeding India Hub verified", time: "Yesterday" },
  { id: 4, text: "Weekly impact report generated", time: "Yesterday" },
  { id: 5, text: "Low inventory alert for Sunrise Home", time: "2 days ago" },
];
