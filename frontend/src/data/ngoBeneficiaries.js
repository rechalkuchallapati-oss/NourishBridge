export const BENEFICIARY_OVERVIEW_STATS = {
  registeredBeneficiaries: 48,
  familiesSupported: 186,
  shelters: 12,
  orphanages: 8,
  oldAgeHomes: 6,
  mealsServedToday: 375,
  communitiesCovered: 14,
};

export const BENEFICIARY_TYPE_LABELS = {
  shelter: "Shelter",
  orphanage: "Orphanage",
  old_age_home: "Old Age Home",
  community_kitchen: "Community Kitchen",
  school: "School",
  low_income_families: "Low-income Families",
  disaster_relief: "Disaster Relief Center",
};

export const BENEFICIARY_TYPE_OPTIONS = [
  { id: "all", label: "All Types" },
  ...Object.entries(BENEFICIARY_TYPE_LABELS).map(([id, label]) => ({ id, label })),
];

export const BENEFICIARY_STATUS_LABELS = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  suspended: "Suspended",
};

export const BENEFICIARY_STATUS_COLORS = {
  active: "bg-[#DCFCE7] text-[#15803D]",
  inactive: "bg-[#F1F5F9] text-[#64748B]",
  pending: "bg-[#FEF3C7] text-[#B45309]",
  suspended: "bg-red-100 text-red-700",
};

export const PRIORITY_LABELS = {
  emergency: "Emergency",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const PRIORITY_COLORS = {
  emergency: "bg-red-100 text-red-800 ring-1 ring-red-200",
  high: "bg-orange-100 text-orange-800 ring-1 ring-orange-200",
  medium: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
  low: "bg-[#F1F5F9] text-[#64748B] ring-1 ring-[#E2E8F0]",
};

export const BENEFICIARIES = [
  {
    id: "BEN-201",
    organization: "Hope Shelter",
    type: "shelter",
    location: "Hyderabad",
    locationKey: "hyderabad",
    capacity: 150,
    mealsRequired: 120,
    lastDelivery: "Yesterday",
    status: "active",
    priority: "high",
    contactPerson: "Anita Desai",
    phone: "+91 98765 43210",
    email: "contact@hopeshelter.org",
    address: "12 MG Road, Banjara Hills, Hyderabad 500034",
    mapsUrl: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    registeredSince: "Jan 2024",
    beneficiaryCount: 120,
    dietaryRequirements: "Vegetarian preferred; no shellfish",
    preferredDeliveryTime: "4:00 PM – 6:00 PM",
    foodRequirements: {
      breakfast: 40,
      lunch: 120,
      dinner: 80,
      specialDiet: "Diabetic-friendly options for 15 residents",
      dailyMealsNeeded: 240,
      weeklyRequirement: 1680,
    },
    deliveryHistory: [
      { date: "Yesterday", foodBatch: "BAT-2030", meals: 118, volunteer: "Rahul Mehta", status: "Completed" },
      { date: "3 days ago", foodBatch: "BAT-2018", meals: 95, volunteer: "Priya Sharma", status: "Completed" },
      { date: "5 days ago", foodBatch: "BAT-2005", meals: 110, volunteer: "Ankit Desai", status: "Completed" },
    ],
  },
  {
    id: "BEN-198",
    organization: "Sunrise Children Home",
    type: "orphanage",
    location: "Secunderabad",
    locationKey: "secunderabad",
    capacity: 80,
    mealsRequired: 60,
    lastDelivery: "Today",
    status: "active",
    priority: "emergency",
    contactPerson: "Rev. Thomas Mathew",
    phone: "+91 91234 56789",
    email: "admin@sunrisehome.org",
    address: "45 Station Road, Secunderabad 500003",
    mapsUrl: "https://maps.google.com/?q=Secunderabad",
    registeredSince: "Mar 2023",
    beneficiaryCount: 60,
    dietaryRequirements: "No nuts; kid-friendly portions",
    preferredDeliveryTime: "12:00 PM – 1:00 PM",
    foodRequirements: {
      breakfast: 60,
      lunch: 60,
      dinner: 60,
      specialDiet: "Soft foods for toddlers (12 children)",
      dailyMealsNeeded: 180,
      weeklyRequirement: 1260,
    },
    deliveryHistory: [
      { date: "Today", foodBatch: "BAT-2042", meals: 60, volunteer: "Priya Sharma", status: "In Progress" },
      { date: "Yesterday", foodBatch: "BAT-2035", meals: 58, volunteer: "Meera Joshi", status: "Completed" },
    ],
  },
  {
    id: "BEN-195",
    organization: "Serene Old Age Home",
    type: "old_age_home",
    location: "Hyderabad",
    locationKey: "hyderabad",
    capacity: 60,
    mealsRequired: 45,
    lastDelivery: "2 days ago",
    status: "active",
    priority: "medium",
    contactPerson: "Dr. Lakshmi Reddy",
    phone: "+91 99887 76655",
    email: "care@sereneoldage.org",
    address: "78 Road No. 10, Jubilee Hills, Hyderabad 500033",
    mapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
    registeredSince: "Jun 2022",
    beneficiaryCount: 45,
    dietaryRequirements: "Low sodium; easy-to-chew meals",
    preferredDeliveryTime: "11:30 AM – 12:30 PM",
    foodRequirements: {
      breakfast: 30,
      lunch: 45,
      dinner: 45,
      specialDiet: "Pureed meals for 8 residents",
      dailyMealsNeeded: 120,
      weeklyRequirement: 840,
    },
    deliveryHistory: [
      { date: "2 days ago", foodBatch: "BAT-2028", meals: 45, volunteer: "Ravi Kumar", status: "Completed" },
    ],
  },
  {
    id: "BEN-192",
    organization: "Community Kitchen — Nampally",
    type: "community_kitchen",
    location: "Hyderabad",
    locationKey: "hyderabad",
    capacity: 200,
    mealsRequired: 150,
    lastDelivery: "Today",
    status: "active",
    priority: "high",
    contactPerson: "Mohammed Farooq",
    phone: "+91 97654 32109",
    email: "kitchen@nampallycommunity.org",
    address: "Public Gardens, Nampally, Hyderabad 500001",
    mapsUrl: "https://maps.google.com/?q=Nampally+Hyderabad",
    registeredSince: "Sep 2021",
    beneficiaryCount: 150,
    dietaryRequirements: "Halal preferred; high-volume bulk meals",
    preferredDeliveryTime: "1:00 PM – 3:00 PM",
    foodRequirements: {
      breakfast: 0,
      lunch: 150,
      dinner: 100,
      specialDiet: "None",
      dailyMealsNeeded: 250,
      weeklyRequirement: 1750,
    },
    deliveryHistory: [
      { date: "Today", foodBatch: "BAT-2035", meals: 150, volunteer: "Meera Joshi", status: "Serving" },
      { date: "Yesterday", foodBatch: "BAT-2025", meals: 142, volunteer: "Sneha Reddy", status: "Completed" },
    ],
  },
  {
    id: "BEN-188",
    organization: "Govt. Primary School — Gachibowli",
    type: "school",
    location: "Gachibowli",
    locationKey: "gachibowli",
    capacity: 120,
    mealsRequired: 100,
    lastDelivery: "Yesterday",
    status: "active",
    priority: "medium",
    contactPerson: "Headmaster R. Srinivas",
    phone: "+91 94444 55667",
    email: "gachibowli.ps@education.gov.in",
    address: "Gachibowli Main Road, Hyderabad 500032",
    mapsUrl: "https://maps.google.com/?q=Gachibowli+Hyderabad",
    registeredSince: "Feb 2024",
    beneficiaryCount: 100,
    dietaryRequirements: "Mid-day meal scheme compliance",
    preferredDeliveryTime: "11:00 AM – 12:00 PM",
    foodRequirements: {
      breakfast: 0,
      lunch: 100,
      dinner: 0,
      specialDiet: "Egg-free on Tuesdays",
      dailyMealsNeeded: 100,
      weeklyRequirement: 500,
    },
    deliveryHistory: [
      { date: "Yesterday", foodBatch: "BAT-2020", meals: 98, volunteer: "Ankit Desai", status: "Completed" },
    ],
  },
  {
    id: "BEN-185",
    organization: "Rainbow Low-Income Housing",
    type: "low_income_families",
    location: "Old City",
    locationKey: "old_city",
    capacity: 90,
    mealsRequired: 75,
    lastDelivery: "4 days ago",
    status: "active",
    priority: "low",
    contactPerson: "Community Lead — Sunita Rao",
    phone: "+91 98765 11122",
    email: "rainbow.community@gmail.com",
    address: "Charminar Area, Old City, Hyderabad 500002",
    mapsUrl: "https://maps.google.com/?q=Charminar+Hyderabad",
    registeredSince: "Nov 2023",
    beneficiaryCount: 75,
    dietaryRequirements: "Mixed diet; ration kits accepted",
    preferredDeliveryTime: "5:00 PM – 7:00 PM",
    foodRequirements: {
      breakfast: 0,
      lunch: 0,
      dinner: 75,
      specialDiet: "Dry ration kits weekly",
      dailyMealsNeeded: 75,
      weeklyRequirement: 525,
    },
    deliveryHistory: [
      { date: "4 days ago", foodBatch: "BAT-2010", meals: 72, volunteer: "Rahul Mehta", status: "Completed" },
    ],
  },
  {
    id: "BEN-180",
    organization: "Flood Relief Camp — Kondapur",
    type: "disaster_relief",
    location: "Gachibowli",
    locationKey: "gachibowli",
    capacity: 300,
    mealsRequired: 250,
    lastDelivery: "Today",
    status: "active",
    priority: "emergency",
    contactPerson: "Relief Coordinator — Vikram Singh",
    phone: "+91 91234 99887",
    email: "relief@kondapurcamp.org",
    address: "Kondapur Community Hall, Hyderabad 500084",
    mapsUrl: "https://maps.google.com/?q=Kondapur+Hyderabad",
    registeredSince: "This week",
    beneficiaryCount: 250,
    dietaryRequirements: "Emergency bulk meals; no refrigeration needed",
    preferredDeliveryTime: "Any time",
    foodRequirements: {
      breakfast: 250,
      lunch: 250,
      dinner: 250,
      specialDiet: "Emergency rations",
      dailyMealsNeeded: 750,
      weeklyRequirement: 5250,
    },
    deliveryHistory: [
      { date: "Today", foodBatch: "BAT-2050", meals: 200, volunteer: "Ravi Kumar", status: "En Route" },
    ],
  },
  {
    id: "BEN-175",
    organization: "Grace Orphanage",
    type: "orphanage",
    location: "Secunderabad",
    locationKey: "secunderabad",
    capacity: 50,
    mealsRequired: 40,
    lastDelivery: "1 week ago",
    status: "inactive",
    priority: "low",
    contactPerson: "Sister Mary Joseph",
    phone: "+91 98888 77665",
    email: "grace.orphanage@church.org",
    address: "Trimulgherry, Secunderabad 500015",
    mapsUrl: "https://maps.google.com/?q=Trimulgherry",
    registeredSince: "Aug 2020",
    beneficiaryCount: 40,
    dietaryRequirements: "Vegetarian",
    preferredDeliveryTime: "12:30 PM",
    foodRequirements: {
      breakfast: 40,
      lunch: 40,
      dinner: 40,
      specialDiet: "None",
      dailyMealsNeeded: 120,
      weeklyRequirement: 840,
    },
    deliveryHistory: [
      { date: "1 week ago", foodBatch: "BAT-1990", meals: 38, volunteer: "Priya Sharma", status: "Completed" },
    ],
  },
];

export function filterBeneficiaries(beneficiaries, filters) {
  return beneficiaries.filter((b) => {
    if (filters.type !== "all" && b.type !== filters.type) return false;
    if (filters.status !== "all" && b.status !== filters.status) return false;
    if (filters.priority !== "all" && b.priority !== filters.priority) return false;
    if (filters.location !== "all" && b.locationKey !== filters.location) return false;
    if (
      filters.search &&
      !`${b.id} ${b.organization} ${b.location}`.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
}

export function getBeneficiaryById(id) {
  return BENEFICIARIES.find((b) => b.id === id) ?? null;
}

export const BENEFICIARY_LOCATION_OPTIONS = [
  { id: "all", label: "All Locations" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "secunderabad", label: "Secunderabad" },
  { id: "gachibowli", label: "Gachibowli" },
  { id: "old_city", label: "Old City" },
];

export const BENEFICIARY_STATUS_OPTIONS = [
  { id: "all", label: "All Statuses" },
  ...Object.entries(BENEFICIARY_STATUS_LABELS).map(([id, label]) => ({ id, label })),
];

export const BENEFICIARY_PRIORITY_OPTIONS = [
  { id: "all", label: "All Priorities" },
  ...Object.entries(PRIORITY_LABELS).map(([id, label]) => ({ id, label })),
];
