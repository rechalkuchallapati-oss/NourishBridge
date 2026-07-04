export const ROLE_ONBOARDING_ROUTES = {
  donor: "/onboarding/donor",
  ngo: "/onboarding/ngo",
  volunteer: "/onboarding/volunteer",
};

export const USER_ROLES = [
  {
    id: "donor",
    emoji: "🍱",
    title: "Food Donor",
    description: "Donate surplus food",
  },
  {
    id: "ngo",
    emoji: "🤝",
    title: "NGO",
    description: "Receive and distribute food",
  },
  {
    id: "volunteer",
    emoji: "🚚",
    title: "Volunteer",
    description: "Pick up and deliver donations",
  },
];

export const DONOR_TYPES = [
  { id: "restaurant", label: "Restaurant" },
  { id: "hotel", label: "Hotel" },
  { id: "caterer", label: "Caterer" },
  { id: "event_organizer", label: "Event Organizer" },
  { id: "individual", label: "Individual" },
];

export const AVAILABILITY_OPTIONS = [
  "Weekday Mornings",
  "Weekday Afternoons",
  "Weekday Evenings",
  "Weekend Mornings",
  "Weekend Afternoons",
  "Weekend Evenings",
];
