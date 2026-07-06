import { getStatusLabel } from "../constants/donationStatus";
import { DONATION_FOOD_IMAGES } from "./donationFoodAssets";
import { enrichDonationRecord } from "./shared/donationItems";

function withFoodImage(donation) {
  return {
    ...donation,
    image: DONATION_FOOD_IMAGES[donation.id],
  };
}

const RAW_DONOR_DONATIONS = [
  {
    id: "DN-2401",
    eventType: "wedding",
    eventName: "Mehta–Kapoor Wedding Reception",
    food: "Wedding Feast · 9 items",
    quantity: "9 item types",
    items: [
      { name: "Hyderabadi Dum Biryani", quantity: "38 kg", cuisine: "Indian" },
      { name: "Paneer Tikka & Seekh Kebabs", quantity: "22 kg", cuisine: "Indian" },
      { name: "Dal Makhani & Butter Naan", quantity: "18 kg", cuisine: "Indian" },
      { name: "Gulab Jamun & Ras Malai", quantity: "140 portions", cuisine: "Desserts" },
      { name: "Rasmalai Trifle Cups", quantity: "85 cups", cuisine: "Desserts" },
      { name: "Veg Spring Rolls", quantity: "60 pieces", cuisine: "Chinese" },
      { name: "Margherita & Farmhouse Pizza", quantity: "24 boxes", cuisine: "Italian" },
      { name: "Caesar & Greek Salads", quantity: "35 bowls", cuisine: "Continental" },
      { name: "Fresh Fruit Platters", quantity: "28 trays", cuisine: "Fresh" },
    ],
    ngo: "Annapurna Seva Trust",
    dateLabel: "Today, 6:30 PM",
    status: "in_transit",
    statusLabel: "In Transit",
    date: "2026-07-04",
    estimatedMeals: 320,
    pickupAddress: "Leela Palace Banquet, Old Airport Road, Bengaluru",
    pickupTime: "Today, 6:30 PM",
    matchedNgo: "Annapurna Seva Trust",
    volunteer: "Rahul Mehta",
    postedAt: "Jul 4, 2026 · 2:15 PM",
    isActive: true,
    imageKey: "wedding-feast",
  },
  {
    id: "DN-2398",
    eventType: "individual",
    eventName: "Home-cooked surplus",
    food: "Homemade Pasta & Garlic Bread",
    quantity: "2 item types",
    items: [
      { name: "Penne Arrabiata (homemade)", quantity: "6 kg", cuisine: "Italian" },
      { name: "Garlic Bread Loaves", quantity: "8 loaves", cuisine: "Italian" },
    ],
    ngo: "Hope Kitchen Foundation",
    dateLabel: "Tomorrow, 11:00 AM",
    status: "volunteer_assigned",
    statusLabel: "Volunteer Assigned",
    date: "2026-07-05",
    estimatedMeals: 24,
    pickupAddress: "45 100 Feet Road, Indiranagar, Bengaluru",
    pickupTime: "Tomorrow, 11:00 AM",
    matchedNgo: "Hope Kitchen Foundation",
    volunteer: "Priya Sharma",
    postedAt: "Jul 3, 2026 · 4:40 PM",
    isActive: true,
    imageKey: "pasta-garlic",
  },
  {
    id: "DN-2395",
    eventType: "restaurant",
    eventName: "Spice Route Restaurant — closing surplus",
    food: "Restaurant Surplus · 7 items",
    quantity: "7 item types",
    items: [
      { name: "Chicken Manchurian", quantity: "12 kg", cuisine: "Indo-Chinese" },
      { name: "Veg Hakka Noodles", quantity: "10 kg", cuisine: "Chinese" },
      { name: "Schezwan Fried Rice", quantity: "14 kg", cuisine: "Chinese" },
      { name: "Paneer Butter Masala", quantity: "8 kg", cuisine: "Indian" },
      { name: "Tandoori Roti Stack", quantity: "120 pieces", cuisine: "Indian" },
      { name: "Chocolate Lava Cake", quantity: "36 slices", cuisine: "Desserts" },
      { name: "Cold Coffee & Lassi", quantity: "45 bottles", cuisine: "Beverages" },
    ],
    ngo: "Annapurna Seva Trust",
    dateLabel: "Today, 8:00 PM",
    status: "ngo_matched",
    statusLabel: "NGO Matched",
    date: "2026-07-04",
    estimatedMeals: 185,
    pickupAddress: "78 Church Street, Bengaluru — Spice Route Restaurant",
    pickupTime: "Today, 8:00 PM",
    matchedNgo: "Annapurna Seva Trust",
    volunteer: "Awaiting assignment",
    postedAt: "Jul 4, 2026 · 9:20 AM",
    isActive: true,
    imageKey: "restaurant-surplus",
  },
  {
    id: "DN-2388",
    eventType: "ramzan",
    eventName: "Community Iftar at Masjid-e-Noor",
    food: "Ramzan Iftar · 6 items",
    quantity: "6 item types",
    items: [
      { name: "Chicken Haleem", quantity: "25 kg", cuisine: "Indian" },
      { name: "Dates & Fruit Chaat", quantity: "80 boxes", cuisine: "Fresh" },
      { name: "Sheer Khurma", quantity: "60 bowls", cuisine: "Desserts" },
      { name: "Samosas & Pakoras", quantity: "200 pieces", cuisine: "Indian" },
      { name: "Roomali Roti & Kebabs", quantity: "15 kg", cuisine: "Indian" },
      { name: "Rose Sharbat", quantity: "50 bottles", cuisine: "Beverages" },
    ],
    ngo: "Hope Kitchen Foundation",
    dateLabel: "Mar 28, 2026",
    status: "ngo_confirmed",
    statusLabel: "NGO Confirmed",
    date: "2026-03-28",
    isActive: false,
    imageKey: "ramzan-iftar",
  },
  {
    id: "DN-2382",
    eventType: "christmas",
    eventName: "St. Mary's Christmas Community Dinner",
    food: "Christmas Feast · 5 items",
    quantity: "5 item types",
    items: [
      { name: "Roast Turkey Slices", quantity: "18 kg", cuisine: "Continental" },
      { name: "Mashed Potatoes & Gravy", quantity: "12 kg", cuisine: "Continental" },
      { name: "Plum Cake & Ginger Cookies", quantity: "90 pieces", cuisine: "Desserts" },
      { name: "Hot Chocolate & Eggnog", quantity: "40 cups", cuisine: "Beverages" },
      { name: "Veg Shepherd's Pie", quantity: "10 trays", cuisine: "Continental" },
    ],
    ngo: "Annapurna Seva Trust",
    dateLabel: "Dec 25, 2025",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2025-12-25",
    isActive: false,
    imageKey: "christmas-feast",
  },
  {
    id: "DN-2375",
    eventType: "corporate",
    eventName: "FinEdge Annual Town Hall Lunch",
    food: "Corporate Lunch · 4 items",
    quantity: "4 item types",
    items: [
      { name: "Club Sandwiches (assorted)", quantity: "85 packs", cuisine: "Continental" },
      { name: "Quinoa Buddha Bowls", quantity: "60 bowls", cuisine: "Healthy" },
      { name: "Blueberry Muffins", quantity: "48 pieces", cuisine: "Bakery" },
      { name: "Iced Tea & Lemonade", quantity: "70 bottles", cuisine: "Beverages" },
    ],
    ngo: "Hope Kitchen Foundation",
    dateLabel: "Feb 14, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2026-02-14",
    isActive: false,
    imageKey: "corporate-lunch",
  },
  {
    id: "DN-2368",
    eventType: "individual",
    eventName: "Birthday party leftovers",
    food: "Black Forest Cake & Samosas",
    quantity: "2 item types",
    items: [
      { name: "Black Forest Cake (whole)", quantity: "1 cake · 12 slices", cuisine: "Desserts" },
      { name: "Mini Samosas", quantity: "40 pieces", cuisine: "Indian" },
    ],
    ngo: "Annapurna Seva Trust",
    dateLabel: "Jan 30, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2026-01-30",
    isActive: false,
    imageKey: "birthday-surplus",
  },
  {
    id: "DN-2360",
    eventType: "hotel",
    eventName: "Grand Horizon Hotel — banquet wrap-up",
    food: "Banquet Surplus · 8 items",
    quantity: "8 item types",
    items: [
      { name: "Lamb Rogan Josh", quantity: "14 kg", cuisine: "Indian" },
      { name: "Malabar Fish Curry", quantity: "10 kg", cuisine: "South Indian" },
      { name: "Appam & Stew", quantity: "80 sets", cuisine: "South Indian" },
      { name: "Sushi Platter (veg)", quantity: "45 pieces", cuisine: "Japanese" },
      { name: "Thai Green Curry & Rice", quantity: "12 kg", cuisine: "Thai" },
      { name: "Tiramisu Cups", quantity: "55 cups", cuisine: "Italian" },
      { name: "Bruschetta Trays", quantity: "40 portions", cuisine: "Italian" },
      { name: "Assorted Pastries", quantity: "72 pieces", cuisine: "Bakery" },
    ],
    ngo: "Hope Kitchen Foundation",
    dateLabel: "Jan 18, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2026-01-18",
    isActive: false,
    imageKey: "hotel-banquet",
  },
];

export const DONOR_DONATIONS = RAW_DONOR_DONATIONS.map(enrichDonationRecord);

export const ACTIVE_DONATIONS = DONOR_DONATIONS.filter((d) => d.isActive).map(withFoodImage);

export const ALL_DONATIONS = DONOR_DONATIONS.map((donation) =>
  withFoodImage({
    ...donation,
    statusLabel: donation.statusLabel ?? getStatusLabel(donation.status),
  }),
);

export const ACTIVE_DONOR_DONATIONS = ACTIVE_DONATIONS;
export const HISTORY_DONOR_DONATIONS = DONOR_DONATIONS.filter((d) => !d.isActive);

export function getDonorDonationById(id) {
  return DONOR_DONATIONS.find((d) => d.id === id) ?? null;
}

export function filterDonations(donations, { dateFilter, statusFilter }) {
  const now = new Date("2026-07-04");

  return donations.filter((donation) => {
    if (statusFilter === "active" && !donation.isActive) return false;
    if (statusFilter !== "all" && statusFilter !== "active") {
      if (donation.status !== statusFilter) return false;
    }

    if (dateFilter === "all") return true;
    if (!donation.date) return true;

    const donationDate = new Date(donation.date);
    const days = Number(dateFilter);
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);

    return donationDate >= cutoff;
  });
}
