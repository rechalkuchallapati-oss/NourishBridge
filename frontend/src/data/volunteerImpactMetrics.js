/** Volunteer performance metrics — unique to volunteer dashboard. */

export const VOLUNTEER_IMPACT_METRICS = [
  {
    id: "missions_accomplished",
    label: "Missions Accomplished",
    value: "47",
    displayValue: "47",
    unit: "",
    description: "Total rescue missions completed successfully.",
    accent: "green",
    highlight: true,
  },
  {
    id: "on_time_rating",
    label: "On-Time Rating",
    value: 97,
    displayValue: "97%",
    unit: "%",
    description: "Missions completed within the scheduled pickup and delivery window.",
    accent: "blue",
    highlight: true,
  },
  {
    id: "food_security_score",
    label: "Food Security Score",
    value: 96,
    displayValue: "96/100",
    unit: "/100",
    description: "Safe handling, temperature checks, and hygiene compliance.",
    accent: "amber",
    highlight: false,
  },
  {
    id: "trust_score",
    label: "Trust Score",
    value: 94,
    displayValue: "94/100",
    unit: "/100",
    description: "Donor and NGO confidence based on verified handovers.",
    accent: "purple",
    highlight: true,
  },
  {
    id: "ngo_rating",
    label: "NGO Rating",
    value: 4.9,
    displayValue: "4.9 ★",
    unit: "★",
    description: "Average rating from NGOs after food handover.",
    accent: "green",
    highlight: false,
  },
  {
    id: "cancellation_rate",
    label: "Cancellation Rate",
    value: 2,
    displayValue: "2%",
    unit: "%",
    description: "Missions cancelled after acceptance — lower is better.",
    accent: "slate",
    highlight: false,
    invertGood: true,
  },
  {
    id: "on_time_pickup_delivery",
    label: "On-Time Pickup & Delivery",
    value: 95,
    displayValue: "95%",
    unit: "%",
    description: "Arrivals at donor and NGO within agreed time slots.",
    accent: "blue",
    highlight: false,
  },
  {
    id: "response_rate",
    label: "Response Rate",
    value: 92,
    displayValue: "92%",
    unit: "%",
    description: "How quickly you accept and acknowledge new mission requests.",
    accent: "amber",
    highlight: false,
  },
  {
    id: "current_streak",
    label: "Current Streak",
    value: 12,
    displayValue: "12 days",
    unit: "days",
    description: "Consecutive days with at least one completed mission.",
    accent: "purple",
    highlight: true,
  },
];

export const DASHBOARD_IMPACT_HIGHLIGHTS = VOLUNTEER_IMPACT_METRICS.filter(
  (metric) => metric.highlight,
);

export function getVolunteerImpactMetric(id) {
  return VOLUNTEER_IMPACT_METRICS.find((metric) => metric.id === id) ?? null;
}
