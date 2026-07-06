import { getStatusLabel } from "../constants/donationStatus";
import { getDonationFoodImage } from "./donationFoodAssets";
import { enrichDonationRecord } from "./shared/donationItems";

function withFoodImage(donation) {
  return {
    ...donation,
    image: getDonationFoodImage(donation),
  };
}

/** Donor dashboard — this account is an individual home donor (small packs, 5–10 kg). */
const RAW_DONOR_DONATIONS = [
  {
    id: "DN-2401",
    eventType: "individual",
    eventName: "Sunday lunch surplus",
    packagingScale: "individual",
    packagingLabel: "5 home tiffin casseroles · ~8 kg total",
    thumbnailKey: "individual_biryani",
    food: "Homemade Veg Biryani & Raita",
    quantity: "~8 kg · 2 items",
    items: [
      { name: "Veg Dum Biryani (homemade)", quantity: "6.5 kg · 4 tiffins", cuisine: "Indian" },
      { name: "Onion–mint Raita", quantity: "1.5 kg · 1 sealed box", cuisine: "Indian" },
    ],
    ngo: "Annapurna Seva Trust",
    dateLabel: "Today, 6:30 PM",
    status: "in_transit",
    statusLabel: "In Transit",
    date: "2026-07-04",
    estimatedMeals: 18,
    pickupAddress: "14 5th Cross, Koramangala 4th Block, Bengaluru",
    pickupTime: "Today, 6:30 PM",
    matchedNgo: "Annapurna Seva Trust",
    volunteer: "Rahul Mehta",
    postedAt: "Jul 4, 2026 · 2:15 PM",
    isActive: true,
  },
  {
    id: "DN-2398",
    eventType: "individual",
    eventName: "Weeknight dinner extras",
    packagingScale: "individual",
    packagingLabel: "Foil packets & roti pouches · ~9 kg total",
    thumbnailKey: "individual_curry_roti",
    food: "Paneer Curry, Rice & Roti",
    quantity: "~9 kg · 3 items",
    items: [
      { name: "Paneer Butter Masala", quantity: "4 kg · 2 containers", cuisine: "Indian" },
      { name: "Tawa Roti", quantity: "28 pieces · zip pouches", cuisine: "Indian" },
      { name: "Steamed Basmati Rice", quantity: "2.5 kg · 1 box", cuisine: "Indian" },
    ],
    ngo: "Hope Kitchen Foundation",
    dateLabel: "Tomorrow, 11:00 AM",
    status: "volunteer_assigned",
    statusLabel: "Volunteer Assigned",
    date: "2026-07-05",
    estimatedMeals: 16,
    pickupAddress: "22 HSR Layout Sector 2, Bengaluru",
    pickupTime: "Tomorrow, 11:00 AM",
    matchedNgo: "Hope Kitchen Foundation",
    volunteer: "Priya Sharma",
    postedAt: "Jul 3, 2026 · 4:40 PM",
    isActive: true,
  },
  {
    id: "DN-2395",
    eventType: "individual",
    eventName: "Festival-week cooking surplus",
    packagingScale: "individual",
    packagingLabel: "6 stainless tiffin carriers · ~8 kg total",
    thumbnailKey: "individual_rice_sambar",
    food: "Lemon Rice & Tomato Dal",
    quantity: "~8 kg · 2 items",
    items: [
      { name: "Lemon Rice (chitranna)", quantity: "5 kg · 4 tiffins", cuisine: "South Indian" },
      { name: "Tomato Dal (thove)", quantity: "3 kg · 2 containers", cuisine: "South Indian" },
    ],
    ngo: "Annapurna Seva Trust",
    dateLabel: "Today, 8:00 PM",
    status: "ngo_matched",
    statusLabel: "NGO Matched",
    date: "2026-07-04",
    estimatedMeals: 14,
    pickupAddress: "9 Indiranagar 100 Feet Road, Bengaluru",
    pickupTime: "Today, 8:00 PM",
    matchedNgo: "Annapurna Seva Trust",
    volunteer: "Awaiting assignment",
    postedAt: "Jul 4, 2026 · 9:20 AM",
    isActive: true,
  },
  {
    id: "DN-2388",
    eventType: "restaurant",
    eventName: "Listed for Biryani Mahal (restaurant partner)",
    packagingScale: "bulk",
    packagingLabel: "Commercial hot boxes & hotel pans · 180+ kg",
    thumbnailKey: "restaurant_biryani_bulk",
    food: "Restaurant Biryani Spread · 14 items",
    quantity: "14 item types · bulk",
    items: [
      { name: "Chicken Dum Biryani", quantity: "28 kg · hot box", cuisine: "Indian" },
      { name: "Mutton Biryani", quantity: "22 kg · hot box", cuisine: "Indian" },
      { name: "Fish Biryani", quantity: "14 kg · pan", cuisine: "Indian" },
      { name: "Prawns Biryani", quantity: "12 kg · pan", cuisine: "Indian" },
      { name: "Veg Pulao", quantity: "16 kg · hot box", cuisine: "Indian" },
      { name: "Vegetable Rice", quantity: "10 kg · pan", cuisine: "Indian" },
      { name: "Paneer Kurma", quantity: "9 kg", cuisine: "Indian" },
      { name: "Mixed Veg Curry", quantity: "7 kg", cuisine: "Indian" },
      { name: "Butter Naan", quantity: "200 pieces", cuisine: "Indian" },
      { name: "Vanilla Ice Cream", quantity: "6 × 2 L tubs", cuisine: "Desserts" },
      { name: "Kulfi Sticks", quantity: "80 pieces", cuisine: "Desserts" },
      { name: "Fresh Lime Soda", quantity: "60 bottles", cuisine: "Beverages" },
      { name: "Rose Milk", quantity: "40 bottles", cuisine: "Beverages" },
      { name: "Soft Drinks (assorted)", quantity: "48 cans", cuisine: "Beverages" },
    ],
    ngo: "Hope Kitchen Foundation",
    dateLabel: "Mar 15, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2026-03-15",
    isActive: false,
  },
  {
    id: "DN-2382",
    eventType: "festival",
    eventName: "Diwali home sweets surplus",
    packagingScale: "individual",
    packagingLabel: "Sweet boxes & foil trays · ~6 kg",
    thumbnailKey: "diwali_sweets",
    food: "Diwali Sweets · 3 items",
    quantity: "~6 kg · 3 items",
    items: [
      { name: "Kaju Katli", quantity: "2 kg · 2 gift boxes", cuisine: "Sweets" },
      { name: "Shankarpoli", quantity: "2 kg · 1 tray", cuisine: "Sweets" },
      { name: "Karans (spicy)", quantity: "2 kg · 1 pouch", cuisine: "Sweets" },
    ],
    ngo: "Annapurna Seva Trust",
    dateLabel: "Nov 2, 2025",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2025-11-02",
    isActive: false,
  },
  {
    id: "DN-2375",
    eventType: "individual",
    eventName: "Morning tiffin extra batch",
    packagingScale: "individual",
    packagingLabel: "Idli steamer boxes · ~7 kg",
    thumbnailKey: "individual_rice_sambar",
    food: "Idli, Sambar & Chutney",
    quantity: "~7 kg · 3 items",
    items: [
      { name: "Soft Idli", quantity: "48 pieces · 2 boxes", cuisine: "South Indian" },
      { name: "Sambar", quantity: "4 kg · 1 container", cuisine: "South Indian" },
      { name: "Coconut Chutney", quantity: "1 kg · 2 jars", cuisine: "South Indian" },
    ],
    ngo: "Hope Kitchen Foundation",
    dateLabel: "Feb 14, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2026-02-14",
    isActive: false,
  },
  {
    id: "DN-2368",
    eventType: "party",
    eventName: "Family birthday — leftover snacks",
    packagingScale: "individual",
    packagingLabel: "Party boxes & cake carton · ~5 kg",
    thumbnailKey: "individual_snacks",
    food: "Birthday Snacks · 2 items",
    quantity: "~5 kg · 2 items",
    items: [
      { name: "Veg Puff & Patty", quantity: "35 pieces · box", cuisine: "Bakery" },
      { name: "Chocolate Truffle Cake", quantity: "10 slices · carton", cuisine: "Desserts" },
    ],
    ngo: "Annapurna Seva Trust",
    dateLabel: "Jan 30, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2026-01-30",
    isActive: false,
  },
  {
    id: "DN-2360",
    eventType: "individual",
    eventName: "Batch-cooked for guests",
    packagingScale: "individual",
    packagingLabel: "4 large tiffins · ~10 kg",
    thumbnailKey: "individual_curry_roti",
    food: "Rajma Chawal & Salad",
    quantity: "~10 kg · 2 items",
    items: [
      { name: "Rajma Masala", quantity: "5 kg · 2 tiffins", cuisine: "North Indian" },
      { name: "Jeera Rice", quantity: "5 kg · 2 tiffins", cuisine: "North Indian" },
    ],
    ngo: "Hope Kitchen Foundation",
    dateLabel: "Jan 18, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    date: "2026-01-18",
    isActive: false,
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
