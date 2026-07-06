import { VOLUNTEER_IMPACT } from "./volunteerMission";

/** Volunteer level tiers based on completed missions. */
export const VOLUNTEER_LEVELS = [
  { level: 1, title: "Rookie Rescuer", minMissions: 0, maxMissions: 9 },
  { level: 2, title: "Community Helper", minMissions: 10, maxMissions: 24 },
  { level: 3, title: "Rescue Specialist", minMissions: 25, maxMissions: 49 },
  { level: 4, title: "Community Hero", minMissions: 50, maxMissions: 99 },
  { level: 5, title: "Impact Champion", minMissions: 100, maxMissions: Infinity },
];

export function getVolunteerLevel(missionsCompleted = VOLUNTEER_IMPACT.missionsCompleted) {
  const tier =
    VOLUNTEER_LEVELS.find(
      (item) =>
        missionsCompleted >= item.minMissions && missionsCompleted <= item.maxMissions,
    ) ?? VOLUNTEER_LEVELS[0];
  const nextTier = VOLUNTEER_LEVELS.find((item) => item.level === tier.level + 1);
  const progressToNext = nextTier
    ? Math.min(
        ((missionsCompleted - tier.minMissions) / (nextTier.minMissions - tier.minMissions)) * 100,
        100,
      )
    : 100;

  return {
    ...tier,
    missionsCompleted,
    nextLevel: nextTier?.level ?? null,
    nextTitle: nextTier?.title ?? null,
    missionsToNext: nextTier ? nextTier.minMissions - missionsCompleted : 0,
    progressToNext,
  };
}

export const PROFILE_IMPACT_OVERVIEW = [
  {
    id: "missions",
    label: "Missions Completed",
    value: VOLUNTEER_IMPACT.missionsCompleted,
    displayValue: String(VOLUNTEER_IMPACT.missionsCompleted),
    accent: "green",
  },
  {
    id: "meals",
    label: "Meals Delivered",
    value: VOLUNTEER_IMPACT.mealsDelivered,
    displayValue: VOLUNTEER_IMPACT.mealsDelivered.toLocaleString(),
    accent: "blue",
  },
  {
    id: "food_rescued",
    label: "Food Rescued",
    value: VOLUNTEER_IMPACT.foodRescuedKg,
    displayValue: `${VOLUNTEER_IMPACT.foodRescuedKg} kg`,
    accent: "amber",
  },
  {
    id: "people_served",
    label: "People Served",
    value: VOLUNTEER_IMPACT.peopleSupported,
    displayValue: VOLUNTEER_IMPACT.peopleSupported.toLocaleString(),
    accent: "purple",
  },
];

export const PROFILE_PERFORMANCE_METRICS = [
  {
    id: "on_time_rate",
    label: "On-Time Rate",
    displayValue: "97%",
    description: "Pickup and delivery within agreed windows.",
    accent: "green",
  },
  {
    id: "success_rate",
    label: "Success Rate",
    displayValue: "98%",
    description: "Missions completed without cancellation or failure.",
    accent: "blue",
  },
  {
    id: "response_rate",
    label: "Response Rate",
    displayValue: "92%",
    description: "Speed of accepting and acknowledging new requests.",
    accent: "amber",
  },
  {
    id: "trust_score",
    label: "Trust Score",
    displayValue: "94/100",
    description: "Donor and NGO confidence from verified handovers.",
    accent: "purple",
  },
];

export const ACHIEVEMENT_BADGES = [
  {
    id: "first_mission",
    title: "First Rescue",
    description: "Completed your very first food rescue mission.",
    condition: "Complete 1 mission",
    threshold: 1,
    metric: "missions",
    icon: "medal",
  },
  {
    id: "starter",
    title: "Food Rescue Starter",
    description: "Completed 25 rescue missions.",
    condition: "Complete 25 missions",
    threshold: 25,
    metric: "missions",
    icon: "medal",
  },
  {
    id: "hero",
    title: "Community Hero",
    description: "Completed 50 rescue missions.",
    condition: "Complete 50 missions",
    threshold: 50,
    metric: "missions",
    icon: "star",
  },
  {
    id: "champion",
    title: "Impact Champion",
    description: "Completed 100 rescue missions.",
    condition: "Complete 100 missions",
    threshold: 100,
    metric: "missions",
    icon: "trophy",
  },
  {
    id: "on_time_pro",
    title: "On-Time Pro",
    description: "Maintained 95%+ on-time delivery rate.",
    condition: "On-time rate ≥ 95%",
    threshold: 95,
    metric: "onTime",
    icon: "clock",
  },
  {
    id: "ngo_favorite",
    title: "NGO Favorite",
    description: "Earned a 4.8+ average rating from NGOs.",
    condition: "NGO rating ≥ 4.8",
    threshold: 4.8,
    metric: "rating",
    icon: "heart",
  },
  {
    id: "weekend_warrior",
    title: "Weekend Warrior",
    description: "Completed 10 missions on weekends.",
    condition: "10 weekend missions",
    threshold: 10,
    metric: "weekendMissions",
    icon: "calendar",
  },
  {
    id: "streak_master",
    title: "Streak Master",
    description: "Maintained a 10-day active mission streak.",
    condition: "10-day streak",
    threshold: 10,
    metric: "streak",
    icon: "fire",
  },
];

export function getBadgeProgress(badge, stats) {
  const {
    missionsCompleted = VOLUNTEER_IMPACT.missionsCompleted,
    onTimeRate = VOLUNTEER_IMPACT.onTimeDeliveryRate,
    rating = 4.9,
    weekendMissions = 12,
    streak = 12,
  } = stats;

  const metricMap = {
    missions: missionsCompleted,
    onTime: onTimeRate,
    rating,
    weekendMissions,
    streak,
  };

  const current = metricMap[badge.metric] ?? 0;
  const unlocked = current >= badge.threshold;
  const progress = Math.min((current / badge.threshold) * 100, 100);

  return { unlocked, progress, current };
}

/** Service zones for the interactive map (Hyderabad). */
export const SERVICE_AREAS = [
  { id: "banjara", label: "Banjara Hills", x: 42, y: 38, active: true },
  { id: "jubilee", label: "Jubilee Hills", x: 38, y: 52, active: true },
  { id: "hitech", label: "HITEC City", x: 55, y: 48, active: true },
  { id: "madhapur", label: "Madhapur", x: 62, y: 58, active: true },
  { id: "gachibowli", label: "Gachibowli", x: 48, y: 68, active: true },
  { id: "kondapur", label: "Kondapur", x: 58, y: 72, active: true },
  { id: "secunderabad", label: "Secunderabad", x: 72, y: 28, active: true },
  { id: "begumpet", label: "Begumpet", x: 58, y: 32, active: false },
  { id: "kukatpally", label: "Kukatpally", x: 28, y: 42, active: false },
  { id: "uppal", label: "Uppal", x: 82, y: 55, active: false },
];

export const VOLUNTEER_REVIEWS = [
  {
    id: "rev-1",
    ngo: "Akshaya Patra Hyderabad",
    rating: 5,
    date: "Jul 6, 2026",
    missionId: "MIS-055",
    text: "Ravi arrived exactly on time with perfectly sealed hot boxes. Handover was smooth and the food reached beneficiaries within the safe window.",
    tags: ["On-time", "Safe handling", "Professional"],
  },
  {
    id: "rev-2",
    ngo: "Robin Hood Army — Hyderabad",
    rating: 5,
    date: "Jul 5, 2026",
    missionId: "MIS-054",
    text: "Excellent communication throughout pickup. Temperature checks were done and packaging was intact. Highly reliable volunteer.",
    tags: ["Communication", "Hygiene", "Reliable"],
  },
  {
    id: "rev-3",
    ngo: "Helping Hands Foundation",
    rating: 5,
    date: "Jul 3, 2026",
    missionId: "MIS-052",
    text: "Handled a multi-item banquet surplus with care. NGO staff appreciated the clear labeling and organized drop-off.",
    tags: ["Multi-item", "Organized", "Trusted"],
  },
  {
    id: "rev-4",
    ngo: "Goonj Relief Centre",
    rating: 4,
    date: "Jun 28, 2026",
    missionId: "MIS-048",
    text: "Good overall experience. Minor delay due to traffic but volunteer kept us updated proactively.",
    tags: ["Proactive updates"],
  },
  {
    id: "rev-5",
    ngo: "No Food Waste Hyderabad",
    rating: 5,
    date: "Jun 22, 2026",
    missionId: "MIS-044",
    text: "One of our most dependable volunteers for weekend morning pickups. Always follows verification checklist.",
    tags: ["Weekend", "Verification", "Dependable"],
  },
];

export const VEHICLE_OPTIONS = [
  "Bike — KA 05 VL 4521",
  "Scooter — TS 09 AB 7823",
  "Car — TS 07 CD 3341",
  "Van — TS 08 EF 9012",
  "Bicycle",
  "On foot (short radius)",
];
