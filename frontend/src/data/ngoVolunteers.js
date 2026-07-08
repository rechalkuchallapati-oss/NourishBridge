export const VOLUNTEER_OVERVIEW_STATS = {
  totalVolunteers: 156,
  activeToday: 42,
  onMission: 18,
  available: 20,
  offline: 118,
  topRated: 8,
};

export const VOLUNTEER_STATUS_LABELS = {
  available: "Available",
  on_mission: "On Mission",
  on_break: "On Break",
  offline: "Offline",
  emergency: "Emergency",
};

export const VOLUNTEER_STATUS_ICONS = {
  available: "🟢",
  on_mission: "🔵",
  on_break: "🟡",
  offline: "🔴",
  emergency: "🟣",
};

export const VOLUNTEER_STATUS_COLORS = {
  available: "bg-[#DCFCE7] text-[#15803D]",
  on_mission: "bg-[#DBEAFE] text-[#1D4ED8]",
  on_break: "bg-[#FEF3C7] text-[#B45309]",
  offline: "bg-[#F1F5F9] text-[#64748B]",
  emergency: "bg-[#EDE9FE] text-[#6D28D9]",
};

export const VOLUNTEER_STATUS_OPTIONS = [
  { id: "all", label: "All Statuses" },
  ...Object.entries(VOLUNTEER_STATUS_LABELS).map(([id, label]) => ({ id, label })),
];

export const VEHICLE_TYPE_OPTIONS = [
  { id: "all", label: "All Vehicles" },
  { id: "bike", label: "Bike" },
  { id: "scooter", label: "Scooter" },
  { id: "car", label: "Car" },
  { id: "van", label: "Van" },
];

export const EXPERIENCE_OPTIONS = [
  { id: "all", label: "All Experience" },
  { id: "rookie", label: "Rookie (< 10 missions)" },
  { id: "experienced", label: "Experienced (10–50)" },
  { id: "expert", label: "Expert (50+)" },
];

export const CITY_OPTIONS = [
  { id: "all", label: "All Cities" },
  { id: "gachibowli", label: "Gachibowli" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "secunderabad", label: "Secunderabad" },
  { id: "banjara_hills", label: "Banjara Hills" },
  { id: "old_city", label: "Old City" },
];

export const VOLUNTEER_QUICK_FILTERS = [
  { id: "all", label: "All" },
  { id: "available", label: "Available" },
  { id: "on_mission", label: "On Mission" },
  { id: "nearby", label: "Nearby" },
];

export const LIVE_MAP_LEGEND = [
  { id: "available", label: "Available volunteers", color: "#16A34A" },
  { id: "pickup", label: "On pickup", color: "#2563EB" },
  { id: "delivering", label: "Delivering", color: "#D97706" },
  { id: "route", label: "Volunteer routes", color: "#94A3B8" },
];

export const LIVE_MAP_PINS = [
  { id: "pin-1", label: "Rahul K.", type: "available", x: 22, y: 35 },
  { id: "pin-2", label: "Priya S.", type: "pickup", x: 45, y: 28 },
  { id: "pin-3", label: "Ankit D.", type: "delivering", x: 68, y: 42 },
  { id: "pin-4", label: "Meera J.", type: "delivering", x: 55, y: 58 },
  { id: "pin-5", label: "Ravi K.", type: "available", x: 35, y: 65 },
  { id: "pin-6", label: "Sneha R.", type: "pickup", x: 78, y: 30 },
];

export const VOLUNTEERS = [
  {
    id: "VOL-204",
    name: "Rahul Kumar",
    rating: 4.9,
    status: "available",
    currentMission: "—",
    vehicle: "Bike",
    vehicleKey: "bike",
    location: "Gachibowli",
    locationKey: "gachibowli",
    cityKey: "gachibowli",
    nearby: true,
    experience: "expert",
    phone: "+91 91234 56789",
    email: "rahul.kumar@email.com",
    vehicleDetails: "Bike · KA 05 EF 9012",
    certificates: ["Food Safety Level 1", "Cold Chain Handling"],
    profilePhotoKey: "volunteer_primary",
    availability: "Mon–Sat · 9 AM – 8 PM",
    todaysSchedule: [
      { time: "10:00 AM", task: "Standby — available for pickup" },
      { time: "2:00 PM", task: "Scheduled distribution — Hope Shelter" },
    ],
    performance: {
      missionsCompleted: 128,
      mealsDelivered: 3420,
      foodRescuedKg: 1840,
      onTimeDeliveryPct: 97,
      trustScore: 4.9,
      avgResponseTimeMin: 8,
      distanceCoveredKm: 1240,
      volunteerHours: 486,
    },
    missionHistory: [
      { id: "MIS-882", date: "Yesterday", type: "Distribution", destination: "Hope Shelter", status: "Completed" },
      { id: "MIS-879", date: "2 days ago", type: "Pickup", destination: "Paradise Biryani", status: "Completed" },
    ],
    reviews: [
      { author: "Hope Shelter", rating: 5, text: "Always on time and professional." },
      { author: "NGO Coordinator", rating: 5, text: "Top performer this month." },
    ],
    mapPinId: "pin-1",
    mapPin: { x: 22, y: 35 },
  },
  {
    id: "VOL-198",
    name: "Priya Sharma",
    rating: 4.8,
    status: "on_mission",
    currentMission: "DON-1045 Pickup",
    vehicle: "Car",
    vehicleKey: "car",
    location: "Banjara Hills",
    locationKey: "banjara_hills",
    cityKey: "hyderabad",
    nearby: true,
    experience: "experienced",
    phone: "+91 97654 32109",
    email: "priya.sharma@email.com",
    vehicleDetails: "Car · KA 03 CD 5678",
    certificates: ["Food Safety Level 1", "First Aid"],
    profilePhotoKey: "volunteer_alt1",
    availability: "Mon–Fri · 10 AM – 6 PM",
    todaysSchedule: [
      { time: "11:30 AM", task: "Pickup — Hotel Grand Palace" },
      { time: "1:00 PM", task: "Deliver to NGO centre" },
    ],
    performance: {
      missionsCompleted: 64,
      mealsDelivered: 1680,
      foodRescuedKg: 920,
      onTimeDeliveryPct: 95,
      trustScore: 4.8,
      avgResponseTimeMin: 11,
      distanceCoveredKm: 680,
      volunteerHours: 312,
    },
    missionHistory: [
      { id: "MIS-885", date: "Today", type: "Pickup", destination: "Hotel Grand Palace", status: "In Progress" },
    ],
    reviews: [{ author: "Biryani Mahal", rating: 5, text: "Careful handling of hot food." }],
    mapPinId: "pin-2",
    mapPin: { x: 45, y: 28 },
  },
  {
    id: "VOL-192",
    name: "Ankit Desai",
    rating: 4.7,
    status: "on_mission",
    currentMission: "BAT-2038 Distribution",
    vehicle: "Scooter",
    vehicleKey: "scooter",
    location: "Hyderabad",
    locationKey: "hyderabad",
    cityKey: "hyderabad",
    nearby: false,
    experience: "experienced",
    phone: "+91 98765 44332",
    email: "ankit.desai@email.com",
    vehicleDetails: "Scooter · KA 05 EF 9012",
    certificates: ["Food Safety Level 1"],
    profilePhotoKey: "volunteer_alt2",
    availability: "Tue–Sun · 8 AM – 9 PM",
    todaysSchedule: [{ time: "1:30 PM", task: "Distribution — Old Age Home" }],
    performance: {
      missionsCompleted: 52,
      mealsDelivered: 1240,
      foodRescuedKg: 710,
      onTimeDeliveryPct: 93,
      trustScore: 4.7,
      avgResponseTimeMin: 14,
      distanceCoveredKm: 520,
      volunteerHours: 248,
    },
    missionHistory: [
      { id: "MIS-884", date: "Today", type: "Distribution", destination: "Serene Old Age Home", status: "En Route" },
    ],
    reviews: [],
    mapPinId: "pin-3",
    mapPin: { x: 68, y: 42 },
  },
  {
    id: "VOL-188",
    name: "Meera Joshi",
    rating: 4.9,
    status: "on_mission",
    currentMission: "BAT-2035 Serving",
    vehicle: "Van",
    vehicleKey: "van",
    location: "Nampally",
    locationKey: "hyderabad",
    cityKey: "hyderabad",
    nearby: true,
    experience: "expert",
    phone: "+91 91234 66789",
    email: "meera.joshi@email.com",
    vehicleDetails: "Van · KA 06 KL 1122",
    certificates: ["Food Safety Level 2", "Bulk Transport", "First Aid"],
    profilePhotoKey: "volunteer_primary",
    availability: "Daily · 7 AM – 10 PM",
    todaysSchedule: [{ time: "12:50 PM", task: "Serving — Community Kitchen Nampally" }],
    performance: {
      missionsCompleted: 96,
      mealsDelivered: 2890,
      foodRescuedKg: 1560,
      onTimeDeliveryPct: 98,
      trustScore: 4.9,
      avgResponseTimeMin: 7,
      distanceCoveredKm: 980,
      volunteerHours: 420,
    },
    missionHistory: [
      { id: "MIS-883", date: "Today", type: "Distribution", destination: "Community Kitchen", status: "Serving" },
    ],
    reviews: [{ author: "Community Kitchen", rating: 5, text: "Handles large batches excellently." }],
    mapPinId: "pin-4",
    mapPin: { x: 55, y: 58 },
  },
  {
    id: "VOL-185",
    name: "Ravi Kumar",
    rating: 4.6,
    status: "available",
    currentMission: "—",
    vehicle: "Van",
    vehicleKey: "van",
    location: "Secunderabad",
    locationKey: "secunderabad",
    cityKey: "secunderabad",
    nearby: true,
    experience: "experienced",
    phone: "+91 91234 55678",
    email: "ravi.kumar@email.com",
    vehicleDetails: "Van · KA 02 GH 3456",
    certificates: ["Food Safety Level 1", "Van Operations"],
    profilePhotoKey: "volunteer_alt2",
    availability: "Wed–Sun · 11 AM – 9 PM",
    todaysSchedule: [{ time: "3:45 PM", task: "Standby — large batch capable" }],
    performance: {
      missionsCompleted: 45,
      mealsDelivered: 1120,
      foodRescuedKg: 640,
      onTimeDeliveryPct: 91,
      trustScore: 4.6,
      avgResponseTimeMin: 16,
      distanceCoveredKm: 450,
      volunteerHours: 198,
    },
    missionHistory: [],
    reviews: [],
    mapPinId: "pin-5",
    mapPin: { x: 35, y: 65 },
  },
  {
    id: "VOL-180",
    name: "Sneha Reddy",
    rating: 4.8,
    status: "on_mission",
    currentMission: "DON-1038 Pickup",
    vehicle: "Car",
    vehicleKey: "car",
    location: "Gachibowli",
    locationKey: "gachibowli",
    cityKey: "gachibowli",
    nearby: true,
    experience: "experienced",
    phone: "+91 98765 88990",
    email: "sneha.reddy@email.com",
    vehicleDetails: "Car · KA 06 KL 1122",
    certificates: ["Food Safety Level 1"],
    profilePhotoKey: "volunteer_alt1",
    availability: "Mon–Sat · 9 AM – 7 PM",
    todaysSchedule: [{ time: "9:00 AM", task: "Pickup — Biryani Mahal" }],
    performance: {
      missionsCompleted: 38,
      mealsDelivered: 890,
      foodRescuedKg: 480,
      onTimeDeliveryPct: 94,
      trustScore: 4.8,
      avgResponseTimeMin: 12,
      distanceCoveredKm: 380,
      volunteerHours: 165,
    },
    missionHistory: [],
    reviews: [],
    mapPinId: "pin-6",
    mapPin: { x: 78, y: 30 },
  },
  {
    id: "VOL-175",
    name: "Vikram Singh",
    rating: 4.5,
    status: "on_break",
    currentMission: "—",
    vehicle: "Bike",
    vehicleKey: "bike",
    location: "Old City",
    locationKey: "old_city",
    cityKey: "old_city",
    nearby: false,
    experience: "rookie",
    phone: "+91 98888 77665",
    email: "vikram.singh@email.com",
    vehicleDetails: "Bike · KA 04 IJ 7890",
    certificates: ["Food Safety Level 1"],
    profilePhotoKey: "volunteer_alt2",
    availability: "Sat–Sun · 10 AM – 4 PM",
    todaysSchedule: [{ time: "12:00 PM", task: "On break until 1:30 PM" }],
    performance: {
      missionsCompleted: 8,
      mealsDelivered: 180,
      foodRescuedKg: 95,
      onTimeDeliveryPct: 88,
      trustScore: 4.5,
      avgResponseTimeMin: 22,
      distanceCoveredKm: 85,
      volunteerHours: 42,
    },
    missionHistory: [],
    reviews: [],
    mapPin: null,
  },
  {
    id: "VOL-170",
    name: "Rahul Mehta",
    rating: 4.9,
    status: "emergency",
    currentMission: "Emergency — Flood Relief",
    vehicle: "Van",
    vehicleKey: "van",
    location: "Kondapur",
    locationKey: "gachibowli",
    cityKey: "gachibowli",
    nearby: true,
    experience: "expert",
    phone: "+91 98765 43210",
    email: "rahul.mehta@email.com",
    vehicleDetails: "Van · KA 02 GH 3456",
    certificates: ["Food Safety Level 2", "Emergency Response", "First Aid"],
    profilePhotoKey: "volunteer_primary",
    availability: "Emergency on-call",
    todaysSchedule: [{ time: "Now", task: "Emergency delivery — Flood Relief Camp" }],
    performance: {
      missionsCompleted: 142,
      mealsDelivered: 4100,
      foodRescuedKg: 2100,
      onTimeDeliveryPct: 99,
      trustScore: 4.9,
      avgResponseTimeMin: 5,
      distanceCoveredKm: 1580,
      volunteerHours: 520,
    },
    missionHistory: [
      { id: "MIS-886", date: "Today", type: "Emergency", destination: "Kondapur Relief Camp", status: "Active" },
    ],
    reviews: [{ author: "Relief Coordinator", rating: 5, text: "Reliable in crisis situations." }],
    mapPin: { x: 60, y: 22 },
  },
];

export function filterVolunteers(volunteers, filters) {
  return volunteers.filter((v) => {
    if (filters.quick === "available" && v.status !== "available") return false;
    if (filters.quick === "on_mission" && v.status !== "on_mission") return false;
    if (filters.quick === "nearby" && !v.nearby) return false;
    if (filters.status !== "all" && v.status !== filters.status) return false;
    if (filters.vehicle !== "all" && v.vehicleKey !== filters.vehicle) return false;
    if (filters.city !== "all" && v.cityKey !== filters.city) return false;
    if (filters.experience !== "all" && v.experience !== filters.experience) return false;
    if (filters.minRating !== "all") {
      const min = Number(filters.minRating);
      if (v.rating < min) return false;
    }
    if (
      filters.search &&
      !`${v.id} ${v.name} ${v.location}`.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
}

export function getVolunteerById(id) {
  return VOLUNTEERS.find((v) => v.id === id) ?? null;
}

export const RATING_FILTER_OPTIONS = [
  { id: "all", label: "All Ratings" },
  { id: "4.5", label: "4.5+ stars" },
  { id: "4.7", label: "4.7+ stars" },
  { id: "4.9", label: "4.9+ stars" },
];
