import { VOLUNTEER_IMPACT } from "./volunteerMission";

/** Top-level hero stats for the My Impact page. */
export const IMPACT_HERO_STATS = [
  {
    id: "food_rescued",
    label: "Food Rescued",
    displayValue: `${VOLUNTEER_IMPACT.foodRescuedKg} kg`,
    description: "Surplus food diverted from waste",
    accent: "green",
  },
  {
    id: "meals_delivered",
    label: "Meals Delivered",
    displayValue: VOLUNTEER_IMPACT.mealsDelivered.toLocaleString(),
    description: "Nutritious meals handed to NGOs",
    accent: "blue",
  },
  {
    id: "people_reached",
    label: "People Reached",
    displayValue: VOLUNTEER_IMPACT.peopleSupported.toLocaleString(),
    description: "Beneficiaries served through your missions",
    accent: "amber",
  },
  {
    id: "volunteer_hours",
    label: "Volunteer Hours",
    displayValue: "156",
    description: "Time spent on pickup & delivery",
    accent: "purple",
  },
];

/** Cumulative impact trend — line chart data. */
export const IMPACT_OVER_TIME = [
  { month: "Feb", meals: 180, foodKg: 42, people: 68 },
  { month: "Mar", meals: 320, foodKg: 78, people: 118 },
  { month: "Apr", meals: 480, foodKg: 115, people: 178 },
  { month: "May", meals: 720, foodKg: 172, people: 268 },
  { month: "Jun", meals: 980, foodKg: 238, people: 362 },
  { month: "Jul", meals: 1725, foodKg: 418, people: 638 },
];

/** NGO / community breakdown. */
export const COMMUNITIES_SUPPORTED = [
  { id: "akshaya", name: "Akshaya Patra Hyderabad", meals: 412, missions: 11, share: 24 },
  { id: "helping", name: "Helping Hands Foundation", meals: 385, missions: 10, share: 22 },
  { id: "robin", name: "Robin Hood Army — Hyderabad", meals: 318, missions: 9, share: 18 },
  { id: "goonj", name: "Goonj Relief Centre", meals: 245, missions: 7, share: 14 },
  { id: "nfw", name: "No Food Waste Hyderabad", meals: 198, missions: 6, share: 12 },
  { id: "others", name: "Other partner NGOs", meals: 167, missions: 4, share: 10 },
];

/** Geographic areas impacted (Hyderabad). */
export const AREAS_IMPACTED = [
  { id: "madhapur", label: "Madhapur / HITEC City", missions: 14, meals: 520, active: true },
  { id: "gachibowli", label: "Gachibowli / Kondapur", missions: 12, meals: 445, active: true },
  { id: "banjara", label: "Banjara & Jubilee Hills", missions: 9, meals: 310, active: true },
  { id: "secunderabad", label: "Secunderabad", missions: 7, meals: 248, active: true },
  { id: "kukatpally", label: "Kukatpally", missions: 5, meals: 122, active: false },
  { id: "uppal", label: "Uppal / LB Nagar", missions: 4, meals: 80, active: false },
];

/** Food rescue breakdown by category. */
export const FOOD_RESCUE_BREAKDOWN = [
  { id: "south_indian", label: "South Indian", kg: 142, share: 34, color: "#16A34A" },
  { id: "north_indian", label: "North Indian", kg: 98, share: 23, color: "#2563EB" },
  { id: "bakery", label: "Bakery & Snacks", kg: 62, share: 15, color: "#F59E0B" },
  { id: "continental", label: "Continental / Party", kg: 48, share: 12, color: "#7C3AED" },
  { id: "sweets", label: "Sweets & Desserts", kg: 38, share: 9, color: "#DB2777" },
  { id: "beverages", label: "Beverages & Fruits", kg: 30, share: 7, color: "#0891B2" },
];

/** Impact journey timeline milestones. */
export const IMPACT_JOURNEY = [
  {
    id: "join",
    date: "Jan 12, 2026",
    title: "Joined NourishBridge",
    description: "Completed volunteer onboarding and verification.",
    status: "completed",
  },
  {
    id: "first",
    date: "Jan 18, 2026",
    title: "First Rescue Mission",
    description: "Delivered home tiffin surplus to Robin Hood Army.",
    status: "completed",
  },
  {
    id: "starter",
    date: "Apr 4, 2026",
    title: "25 Missions — Food Rescue Starter",
    description: "Unlocked starter badge for consistent community service.",
    status: "completed",
  },
  {
    id: "meals_1000",
    date: "Jun 22, 2026",
    title: "1,000 Meals Milestone",
    description: "Crossed 1,000 meals delivered across Hyderabad NGOs.",
    status: "completed",
  },
  {
    id: "hero",
    date: "In progress",
    title: "50 Missions — Community Hero",
    description: `${VOLUNTEER_IMPACT.missionsCompleted}/50 missions — 3 more to unlock.`,
    status: "current",
  },
  {
    id: "champion",
    date: "Upcoming",
    title: "100 Missions — Impact Champion",
    description: "Complete 100 rescue missions for champion recognition.",
    status: "upcoming",
  },
];
