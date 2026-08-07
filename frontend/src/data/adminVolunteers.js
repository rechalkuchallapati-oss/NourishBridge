import volunteerPrimary from "../assets/dashboard/volunteer/volunteer-account-primary.png";
import volunteerAlt1 from "../assets/dashboard/volunteer/volunteer-account-alt1.png";
import volunteerAlt2 from "../assets/dashboard/volunteer/volunteer-account-alt2.png";
import vegBiryani from "../assets/dashboard/food/veg-biryani.jpg";
import mixedFruits from "../assets/dashboard/food/mixed-seasonal-fruits.jpg";
import packagedMeals from "../assets/dashboard/ngo-food/ngo-packaged-meals.jpg";

export const VOLUNTEER_KPI = [
  { id: "total", label: "Total Volunteers", value: "486", trend: 12, compare: "vs last month", color: "#22C55E" },
  { id: "available", label: "Available", value: "124", trend: 8, compare: "vs last month", color: "#3B82F6" },
  { id: "on_mission", label: "On Mission", value: "67", trend: 15, compare: "vs last month", color: "#8B5CF6" },
  { id: "offline", label: "Offline", value: "218", trend: -5, compare: "vs last month", color: "#94A3B8" },
  { id: "suspended", label: "Suspended", value: "8", trend: -20, compare: "vs last month", color: "#EF4444" },
  { id: "verified", label: "Verified Volunteers", value: "462", trend: 6, compare: "vs last month", color: "#16A34A" },
  { id: "rating", label: "Average Rating", value: "4.7", trend: 3, compare: "vs last month", color: "#F59E0B" },
  { id: "deliveries", label: "Completed Deliveries", value: "12,840", trend: 18, compare: "vs last month", color: "#06B6D4" },
];

export const CITY_OPTIONS = [
  { id: "all", label: "All Cities" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "bangalore", label: "Bangalore" },
  { id: "mumbai", label: "Mumbai" },
  { id: "delhi", label: "Delhi" },
  { id: "chennai", label: "Chennai" },
];

export const VEHICLE_OPTIONS = [
  { id: "all", label: "All Vehicles" },
  { id: "bike", label: "Motorcycle" },
  { id: "car", label: "Car" },
  { id: "van", label: "Van" },
  { id: "truck", label: "Truck" },
  { id: "bicycle", label: "Bicycle" },
];

export const AVAILABILITY_OPTIONS = [
  { id: "all", label: "All Availability" },
  { id: "available", label: "Available" },
  { id: "busy", label: "Busy" },
  { id: "on_mission", label: "On Mission" },
  { id: "offline", label: "Offline" },
  { id: "suspended", label: "Suspended" },
];

export const EXPERIENCE_OPTIONS = [
  { id: "all", label: "All Experience" },
  { id: "new", label: "New (< 10 missions)" },
  { id: "intermediate", label: "Intermediate (10–50)" },
  { id: "experienced", label: "Experienced (50–100)" },
  { id: "expert", label: "Expert (100+)" },
];

export const RATING_OPTIONS = [
  { id: "all", label: "All Ratings" },
  { id: "4.5", label: "4.5+ Stars" },
  { id: "4.0", label: "4.0+ Stars" },
  { id: "3.5", label: "3.5+ Stars" },
];

export const VERIFICATION_OPTIONS = [
  { id: "all", label: "All Verification" },
  { id: "verified", label: "Verified" },
  { id: "pending", label: "Pending" },
  { id: "rejected", label: "Rejected" },
];

export const MISSION_STATUS_OPTIONS = [
  { id: "all", label: "All Mission Status" },
  { id: "active", label: "Active Mission" },
  { id: "idle", label: "No Active Mission" },
  { id: "scheduled", label: "Scheduled" },
];

export const AVAILABILITY_LABELS = {
  available: "Available",
  busy: "Busy",
  on_mission: "On Mission",
  offline: "Offline",
  suspended: "Suspended",
};

export const AVAILABILITY_COLORS = {
  available: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  busy: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  on_mission: "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]",
  offline: "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
  suspended: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
};

export const VERIFICATION_LABELS = {
  verified: "Verified",
  pending: "Pending",
  rejected: "Rejected",
};

export const VERIFICATION_COLORS = {
  verified: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  pending: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  rejected: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
};

export const VEHICLE_LABELS = {
  bike: "Motorcycle",
  car: "Car",
  van: "Van",
  truck: "Truck",
  bicycle: "Bicycle",
};

export const ACHIEVEMENTS = [
  { id: "100_missions", label: "100 Missions Completed", icon: "🏆" },
  { id: "500_meals", label: "500 Meals Delivered", icon: "🍽️" },
  { id: "community_hero", label: "Community Hero", icon: "🦸" },
  { id: "fast_responder", label: "Fast Responder", icon: "⚡" },
  { id: "top_rated", label: "Top Rated Volunteer", icon: "⭐" },
  { id: "perfect_streak", label: "Perfect Delivery Streak", icon: "🔥" },
  { id: "gold", label: "Gold Volunteer", icon: "🥇" },
  { id: "star", label: "Star Performer", icon: "🌟" },
];

export const ADMIN_VOLUNTEERS = [
  {
    id: "VOL-1001",
    name: "Rahul Kumar",
    avatar: volunteerPrimary,
    phone: "+91 98765 43210",
    email: "rahul.kumar@gmail.com",
    address: "12 Jubilee Hills, Hyderabad",
    city: "hyderabad",
    vehicle: "bike",
    vehicleNumber: "TS 09 AB 1234",
    license: "DL-TS-2019-4821",
    govId: "Verified — Aadhaar",
    backgroundCheck: "Cleared",
    availability: "on_mission",
    verification: "verified",
    currentMission: "DON-4821",
    completedMissions: 142,
    rating: 4.9,
    successRate: 98,
    lastActive: "2 min ago",
    joinedDate: "Jan 15, 2024",
    schedule: "Mon–Sat, 8 AM – 8 PM",
    emergencyContact: "Sunita Kumar · +91 98765 00001",
    stats: {
      totalMissions: 148,
      completedDeliveries: 142,
      cancelledMissions: 3,
      lateDeliveries: 2,
      acceptanceRate: 96,
      responseTime: "4 min",
      hoursVolunteered: 842,
      distanceCovered: "4,280 km",
      mealsDelivered: 12400,
      ngosServed: 18,
      donorsAssisted: 156,
      livesImpacted: 6200,
    },
    currentMissionDetails: {
      id: "MIS-8842",
      pickup: "Hotel Grand Palace, Banjara Hills",
      delivery: "Helping Hands Foundation, Secunderabad",
      quantity: "85 kg Veg Biryani",
      eta: "18 min",
      status: "In Transit",
      foodImage: vegBiryani,
    },
    map: { volunteer: { x: 48, y: 48 }, pickup: { x: 20, y: 70 }, destination: { x: 75, y: 25 }, eta: "18 min", distance: "8.4 km" },
    missionHistory: [
      { id: "MIS-8841", status: "completed", pickup: "Paradise Biryani", delivery: "Sunrise Home", duration: "42 min", distance: "5.2 km", rating: 5 },
      { id: "MIS-8840", status: "completed", pickup: "TechCorp India", delivery: "Feeding India", duration: "38 min", distance: "3.8 km", rating: 5 },
      { id: "MIS-8839", status: "completed", pickup: "Spice Garden", delivery: "Akshaya Patra", duration: "55 min", distance: "7.1 km", rating: 4 },
    ],
    achievements: ["100_missions", "500_meals", "community_hero", "fast_responder", "top_rated", "perfect_streak", "gold"],
    feedback: [
      { donor: "Hotel Grand Palace", text: "Always punctual and professional.", rating: 5 },
      { ngo: "Helping Hands", text: "Reliable volunteer — highly recommended.", rating: 5 },
    ],
  },
  {
    id: "VOL-1002",
    name: "Priya Sharma",
    avatar: volunteerAlt1,
    phone: "+91 91234 56789",
    email: "priya.sharma@outlook.com",
    address: "45 Banjara Hills, Hyderabad",
    city: "hyderabad",
    vehicle: "car",
    vehicleNumber: "TS 08 CD 5678",
    license: "DL-TS-2020-3312",
    govId: "Verified — Aadhaar",
    backgroundCheck: "Cleared",
    availability: "on_mission",
    verification: "verified",
    currentMission: "DON-4820",
    completedMissions: 128,
    rating: 4.8,
    successRate: 97,
    lastActive: "5 min ago",
    joinedDate: "Mar 8, 2024",
    schedule: "Mon–Fri, 10 AM – 6 PM",
    emergencyContact: "Rajesh Sharma · +91 91234 00002",
    stats: {
      totalMissions: 132,
      completedDeliveries: 128,
      cancelledMissions: 2,
      lateDeliveries: 1,
      acceptanceRate: 94,
      responseTime: "6 min",
      hoursVolunteered: 720,
      distanceCovered: "3,890 km",
      mealsDelivered: 9800,
      ngosServed: 14,
      donorsAssisted: 128,
      livesImpacted: 4900,
    },
    currentMissionDetails: {
      id: "MIS-8843",
      pickup: "Paradise Biryani, Secunderabad",
      delivery: "Sunrise Home, Begumpet",
      quantity: "32 kg Mixed Fruits",
      eta: "12 min",
      status: "En Route to Pickup",
      foodImage: mixedFruits,
    },
    map: { volunteer: { x: 55, y: 50 }, pickup: { x: 30, y: 60 }, destination: { x: 80, y: 40 }, eta: "12 min", distance: "5.2 km" },
    missionHistory: [
      { id: "MIS-8838", status: "completed", pickup: "Fresh Bake Co.", delivery: "Goonj", duration: "35 min", distance: "4.5 km", rating: 5 },
      { id: "MIS-8837", status: "completed", pickup: "Green Valley", delivery: "Sunrise Home", duration: "48 min", distance: "6.2 km", rating: 4 },
    ],
    achievements: ["100_missions", "500_meals", "top_rated", "gold", "star"],
    feedback: [{ donor: "Paradise Biryani", text: "Excellent handling of fresh produce.", rating: 5 }],
  },
  {
    id: "VOL-1003",
    name: "Amit Patel",
    avatar: volunteerAlt2,
    phone: "+91 99887 76655",
    email: "amit.patel@gmail.com",
    address: "HITEC City, Hyderabad",
    city: "hyderabad",
    vehicle: "van",
    vehicleNumber: "TS 07 EF 9012",
    license: "DL-TS-2018-7721",
    govId: "Verified — Aadhaar",
    backgroundCheck: "Cleared",
    availability: "on_mission",
    verification: "verified",
    currentMission: "DON-4812",
    completedMissions: 115,
    rating: 4.7,
    successRate: 96,
    lastActive: "8 min ago",
    joinedDate: "Jun 22, 2023",
    schedule: "Daily, 7 AM – 9 PM",
    emergencyContact: "Meera Patel · +91 99887 00003",
    stats: {
      totalMissions: 120,
      completedDeliveries: 115,
      cancelledMissions: 4,
      lateDeliveries: 3,
      acceptanceRate: 92,
      responseTime: "8 min",
      hoursVolunteered: 960,
      distanceCovered: "5,120 km",
      mealsDelivered: 11200,
      ngosServed: 16,
      donorsAssisted: 142,
      livesImpacted: 5600,
    },
    currentMissionDetails: {
      id: "MIS-8844",
      pickup: "Dal & Spice Kitchen, Ameerpet",
      delivery: "Akshaya Patra Kitchen",
      quantity: "55 kg Dal Makhani",
      eta: "22 min",
      status: "In Transit",
      foodImage: packagedMeals,
    },
    map: { volunteer: { x: 60, y: 45 }, pickup: { x: 42, y: 62 }, destination: { x: 82, y: 32 }, eta: "22 min", distance: "7.3 km" },
    missionHistory: [
      { id: "MIS-8836", status: "completed", pickup: "TechCorp India", delivery: "Feeding India", duration: "32 min", distance: "3.8 km", rating: 5 },
    ],
    achievements: ["100_missions", "500_meals", "community_hero", "gold"],
    feedback: [],
  },
  {
    id: "VOL-1004",
    name: "Sneha Reddy",
    avatar: volunteerAlt1,
    phone: "+91 87654 32109",
    email: "sneha.reddy@gmail.com",
    address: "Jubilee Hills, Hyderabad",
    city: "hyderabad",
    vehicle: "bike",
    vehicleNumber: "TS 09 GH 3456",
    license: "DL-TS-2021-5521",
    govId: "Verified — Aadhaar",
    backgroundCheck: "Cleared",
    availability: "available",
    verification: "verified",
    currentMission: null,
    completedMissions: 98,
    rating: 4.9,
    successRate: 99,
    lastActive: "15 min ago",
    joinedDate: "Sep 5, 2024",
    schedule: "Weekends + Evenings",
    emergencyContact: "Venkat Reddy · +91 87654 00004",
    stats: {
      totalMissions: 99,
      completedDeliveries: 98,
      cancelledMissions: 0,
      lateDeliveries: 0,
      acceptanceRate: 98,
      responseTime: "3 min",
      hoursVolunteered: 480,
      distanceCovered: "2,140 km",
      mealsDelivered: 7800,
      ngosServed: 10,
      donorsAssisted: 89,
      livesImpacted: 3900,
    },
    currentMissionDetails: null,
    map: null,
    missionHistory: [
      { id: "MIS-8835", status: "completed", pickup: "Anita Desai", delivery: "Akshaya Patra", duration: "28 min", distance: "11.2 km", rating: 5 },
    ],
    achievements: ["500_meals", "fast_responder", "top_rated", "perfect_streak", "star"],
    feedback: [{ donor: "Anita Desai", text: "Wonderful volunteer!", rating: 5 }],
  },
  {
    id: "VOL-1005",
    name: "Vikram Singh",
    avatar: volunteerPrimary,
    phone: "+91 93456 78901",
    email: "vikram.singh@yahoo.com",
    address: "Gachibowli, Hyderabad",
    city: "hyderabad",
    vehicle: "truck",
    vehicleNumber: "TS 10 IJ 7890",
    license: "DL-TS-2017-9912",
    govId: "Verified — Aadhaar",
    backgroundCheck: "Cleared",
    availability: "busy",
    verification: "verified",
    currentMission: null,
    completedMissions: 86,
    rating: 4.6,
    successRate: 94,
    lastActive: "1 hr ago",
    joinedDate: "Feb 18, 2023",
    schedule: "Mon–Sat, 6 AM – 10 PM",
    emergencyContact: "Harpreet Singh · +91 93456 00005",
    stats: {
      totalMissions: 92,
      completedDeliveries: 86,
      cancelledMissions: 5,
      lateDeliveries: 4,
      acceptanceRate: 88,
      responseTime: "12 min",
      hoursVolunteered: 680,
      distanceCovered: "6,420 km",
      mealsDelivered: 14200,
      ngosServed: 12,
      donorsAssisted: 98,
      livesImpacted: 7100,
    },
    currentMissionDetails: null,
    map: null,
    missionHistory: [],
    achievements: ["100_missions", "500_meals", "community_hero"],
    feedback: [],
  },
  {
    id: "VOL-1006",
    name: "Kavya Menon",
    avatar: volunteerAlt2,
    phone: "+91 94567 89012",
    email: "kavya.menon@gmail.com",
    address: "Madhapur, Hyderabad",
    city: "hyderabad",
    vehicle: "bicycle",
    vehicleNumber: "—",
    license: "—",
    govId: "Verified — Aadhaar",
    backgroundCheck: "Cleared",
    availability: "available",
    verification: "verified",
    currentMission: null,
    completedMissions: 45,
    rating: 4.5,
    successRate: 93,
    lastActive: "30 min ago",
    joinedDate: "Nov 12, 2025",
    schedule: "Evenings only",
    emergencyContact: "Ravi Menon · +91 94567 00006",
    stats: {
      totalMissions: 48,
      completedDeliveries: 45,
      cancelledMissions: 2,
      lateDeliveries: 1,
      acceptanceRate: 90,
      responseTime: "10 min",
      hoursVolunteered: 220,
      distanceCovered: "890 km",
      mealsDelivered: 3200,
      ngosServed: 6,
      donorsAssisted: 42,
      livesImpacted: 1600,
    },
    currentMissionDetails: null,
    map: null,
    missionHistory: [],
    achievements: ["fast_responder"],
    feedback: [],
  },
  {
    id: "VOL-1007",
    name: "Arjun Nair",
    avatar: volunteerAlt1,
    phone: "+91 95678 90123",
    email: "arjun.nair@outlook.com",
    address: "Kondapur, Hyderabad",
    city: "hyderabad",
    vehicle: "car",
    vehicleNumber: "TS 11 KL 2345",
    license: "DL-TS-2022-1123",
    govId: "Pending Review",
    backgroundCheck: "In Progress",
    availability: "offline",
    verification: "pending",
    currentMission: null,
    completedMissions: 12,
    rating: 4.2,
    successRate: 85,
    lastActive: "3 days ago",
    joinedDate: "Jul 1, 2026",
    schedule: "Weekends",
    emergencyContact: "Lakshmi Nair · +91 95678 00007",
    stats: {
      totalMissions: 14,
      completedDeliveries: 12,
      cancelledMissions: 1,
      lateDeliveries: 2,
      acceptanceRate: 78,
      responseTime: "18 min",
      hoursVolunteered: 48,
      distanceCovered: "320 km",
      mealsDelivered: 480,
      ngosServed: 3,
      donorsAssisted: 12,
      livesImpacted: 240,
    },
    currentMissionDetails: null,
    map: null,
    missionHistory: [],
    achievements: [],
    feedback: [],
  },
  {
    id: "VOL-1008",
    name: "Deepak Verma",
    avatar: volunteerPrimary,
    phone: "+91 96789 01234",
    email: "deepak.verma@gmail.com",
    address: "Secunderabad, Hyderabad",
    city: "hyderabad",
    vehicle: "bike",
    vehicleNumber: "TS 12 MN 6789",
    license: "Expired — Renewal Pending",
    govId: "Verified — Aadhaar",
    backgroundCheck: "Cleared",
    availability: "suspended",
    verification: "verified",
    currentMission: null,
    completedMissions: 62,
    rating: 3.8,
    successRate: 82,
    lastActive: "2 weeks ago",
    joinedDate: "Apr 3, 2024",
    schedule: "—",
    emergencyContact: "Pooja Verma · +91 96789 00008",
    stats: {
      totalMissions: 72,
      completedDeliveries: 62,
      cancelledMissions: 8,
      lateDeliveries: 6,
      acceptanceRate: 75,
      responseTime: "15 min",
      hoursVolunteered: 380,
      distanceCovered: "1,980 km",
      mealsDelivered: 4200,
      ngosServed: 8,
      donorsAssisted: 58,
      livesImpacted: 2100,
    },
    currentMissionDetails: null,
    map: null,
    missionHistory: [{ id: "MIS-8800", status: "cancelled", pickup: "Spice Garden", delivery: "Goonj", duration: "—", distance: "—", rating: 2 }],
    achievements: ["500_meals"],
    feedback: [{ ngo: "Goonj", text: "Multiple late deliveries reported.", rating: 2 }],
  },
];

export const MONTHLY_VOLUNTEER_GROWTH = [
  { month: "Mar", count: 320 },
  { month: "Apr", count: 358 },
  { month: "May", count: 392 },
  { month: "Jun", count: 428 },
  { month: "Jul", count: 456 },
  { month: "Aug", count: 486 },
];

export const MISSION_COMPLETION_RATE = [
  { month: "Mar", rate: 91 },
  { month: "Apr", rate: 92 },
  { month: "May", rate: 93 },
  { month: "Jun", rate: 94 },
  { month: "Jul", rate: 95 },
  { month: "Aug", rate: 96 },
];

export const TOP_RATED_VOLUNTEERS = [
  { name: "Sneha R.", rating: 4.9, deliveries: 98 },
  { name: "Rahul K.", rating: 4.9, deliveries: 142 },
  { name: "Priya S.", rating: 4.8, deliveries: 128 },
  { name: "Amit P.", rating: 4.7, deliveries: 115 },
  { name: "Kavya M.", rating: 4.5, deliveries: 45 },
];

export const VEHICLE_DISTRIBUTION = [
  { name: "Motorcycle", value: 42, color: "#22C55E" },
  { name: "Car", value: 28, color: "#3B82F6" },
  { name: "Van", value: 18, color: "#8B5CF6" },
  { name: "Truck", value: 8, color: "#F59E0B" },
  { name: "Bicycle", value: 4, color: "#06B6D4" },
];

export const VOLUNTEER_AVAILABILITY_CHART = [
  { status: "Available", count: 124 },
  { status: "On Mission", count: 67 },
  { status: "Busy", count: 45 },
  { status: "Offline", count: 218 },
  { status: "Suspended", count: 8 },
];

export const AVG_DELIVERY_TIME = [
  { month: "Mar", minutes: 48 },
  { month: "Apr", minutes: 45 },
  { month: "May", minutes: 42 },
  { month: "Jun", minutes: 40 },
  { month: "Jul", minutes: 38 },
  { month: "Aug", minutes: 36 },
];

export const PERFORMANCE_RANKING = [
  { rank: 1, name: "Rahul Kumar", score: 98, deliveries: 142 },
  { rank: 2, name: "Sneha Reddy", score: 97, deliveries: 98 },
  { rank: 3, name: "Priya Sharma", score: 96, deliveries: 128 },
  { rank: 4, name: "Amit Patel", score: 94, deliveries: 115 },
  { rank: 5, name: "Vikram Singh", score: 91, deliveries: 86 },
];

export const VOLUNTEER_ALERTS = [
  { id: "verify", emoji: "🔵", title: "Pending Verification", description: "6 volunteers awaiting document verification.", action: "Review", color: "border-[#BFDBFE] bg-[#EFF6FF]" },
  { id: "expired", emoji: "🟠", title: "Expired Documents", description: "3 driving licenses need renewal.", action: "Notify", color: "border-[#FDE68A] bg-[#FFFBEB]" },
  { id: "bg_check", emoji: "🟡", title: "Background Check Pending", description: "4 volunteers in background review.", action: "Review", color: "border-[#FEF3C7] bg-[#FFFBEB]" },
  { id: "upcoming", emoji: "🟢", title: "Upcoming Missions", description: "28 missions scheduled for tomorrow.", action: "View Schedule", color: "border-[#BBF7D0] bg-[#F0FDF4]" },
  { id: "low_activity", emoji: "⚪", title: "Low Activity Volunteers", description: "15 volunteers inactive for 30+ days.", action: "Engage", color: "border-[#E2E8F0] bg-[#F8FAFC]" },
  { id: "suspended", emoji: "🔴", title: "Suspended Volunteers", description: "8 volunteers currently suspended.", action: "Review Cases", color: "border-[#FECACA] bg-[#FEF2F2]" },
];

export function filterVolunteers(volunteers, filters) {
  return volunteers.filter((v) => {
    if (filters.city !== "all" && v.city !== filters.city) return false;
    if (filters.vehicle !== "all" && v.vehicle !== filters.vehicle) return false;
    if (filters.availability !== "all" && v.availability !== filters.availability) return false;
    if (filters.verification !== "all" && v.verification !== filters.verification) return false;
    if (filters.rating !== "all" && v.rating < Number(filters.rating)) return false;
    if (filters.experience !== "all") {
      const m = v.completedMissions;
      if (filters.experience === "new" && m >= 10) return false;
      if (filters.experience === "intermediate" && (m < 10 || m >= 50)) return false;
      if (filters.experience === "experienced" && (m < 50 || m >= 100)) return false;
      if (filters.experience === "expert" && m < 100) return false;
    }
    if (filters.missionStatus !== "all") {
      if (filters.missionStatus === "active" && !v.currentMission) return false;
      if (filters.missionStatus === "idle" && v.currentMission) return false;
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const hay = [v.id, v.name, v.phone, v.email, v.city].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortVolunteers(volunteers, key, dir) {
  const sorted = [...volunteers];
  const mult = dir === "asc" ? 1 : -1;
  sorted.sort((a, b) => {
    let av = a[key];
    let bv = b[key];
    if (["completedMissions", "rating", "successRate"].includes(key)) {
      av = Number(av);
      bv = Number(bv);
    } else {
      av = String(av ?? "").toLowerCase();
      bv = String(bv ?? "").toLowerCase();
    }
    if (av < bv) return -1 * mult;
    if (av > bv) return 1 * mult;
    return 0;
  });
  return sorted;
}
