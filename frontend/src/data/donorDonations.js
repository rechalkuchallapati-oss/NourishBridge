import { getStatusLabel } from "../constants/donationStatus";
import { DONATION_FOOD_IMAGES } from "./donationFoodAssets";

function withFoodImage(donation) {
  return {
    ...donation,
    image: DONATION_FOOD_IMAGES[donation.id],
  };
}

export const ACTIVE_DONATIONS = [
  {
    id: "DN-2401",
    food: "Vegetable Biryani & Raita",
    foodType: "Prepared Meals",
    quantity: "45 servings",
    estimatedMeals: 45,
    pickupAddress: "12 MG Road, Bengaluru — Spice Garden Restaurant",
    pickupTime: "Today, 6:30 PM",
    matchedNgo: "Akshaya Patra Foundation",
    ngo: "Akshaya Patra Foundation",
    volunteer: "Rahul Mehta",
    status: "in_transit",
    postedAt: "Jul 4, 2026 · 2:15 PM",
    date: "2026-07-04",
    dateLabel: "Jul 4, 2026",
    isActive: true,
  },
  {
    id: "DN-2398",
    food: "Fresh Vegetables & Rice",
    foodType: "Fresh Produce",
    quantity: "28 kg",
    estimatedMeals: 70,
    pickupAddress: "88 Indiranagar 100 Ft Road, Bengaluru",
    pickupTime: "Today, 8:00 PM",
    matchedNgo: "Robin Hood Army",
    ngo: "Robin Hood Army",
    volunteer: "Priya Sharma",
    status: "volunteer_assigned",
    postedAt: "Jul 4, 2026 · 11:40 AM",
    date: "2026-07-04",
    dateLabel: "Jul 4, 2026",
    isActive: true,
  },
  {
    id: "DN-2395",
    food: "Assorted Sandwiches & Pastries",
    foodType: "Baked Goods",
    quantity: "60 units",
    estimatedMeals: 60,
    pickupAddress: "5 Church Street, Bengaluru — Daily Bread Café",
    pickupTime: "Tomorrow, 9:00 AM",
    matchedNgo: "Awaiting match",
    ngo: "Awaiting match",
    volunteer: "Not assigned yet",
    status: "posted",
    postedAt: "Jul 4, 2026 · 9:05 AM",
    date: "2026-07-04",
    dateLabel: "Jul 4, 2026",
    isActive: true,
  },
];

export const HISTORICAL_DONATIONS = [
  {
    id: "DN-2388",
    food: "Dal Makhani & Naan",
    quantity: "80 servings",
    ngo: "Goonj Foundation",
    status: "ngo_confirmed",
    date: "2026-07-02",
    dateLabel: "Jul 2, 2026",
    isActive: false,
  },
  {
    id: "DN-2375",
    food: "Fruit Boxes & Juice",
    quantity: "35 kg",
    ngo: "Feeding India",
    status: "ngo_confirmed",
    date: "2026-06-28",
    dateLabel: "Jun 28, 2026",
    isActive: false,
  },
  {
    id: "DN-2362",
    food: "Idli & Sambar Trays",
    quantity: "120 servings",
    ngo: "Akshaya Patra Foundation",
    status: "ngo_confirmed",
    date: "2026-06-20",
    dateLabel: "Jun 20, 2026",
    isActive: false,
  },
  {
    id: "DN-2350",
    food: "Paneer Tikka & Roti",
    quantity: "55 servings",
    ngo: "Robin Hood Army",
    status: "ngo_confirmed",
    date: "2026-06-12",
    dateLabel: "Jun 12, 2026",
    isActive: false,
  },
  {
    id: "DN-2338",
    food: "Mixed Rice & Curry",
    quantity: "40 kg",
    ngo: "Rise Against Hunger",
    status: "delivered",
    date: "2026-06-05",
    dateLabel: "Jun 5, 2026",
    isActive: false,
  },
];
export const ALL_DONATIONS = [...ACTIVE_DONATIONS, ...HISTORICAL_DONATIONS].map(
  (donation) => ({
    ...withFoodImage(donation),
    statusLabel: getStatusLabel(donation.status),
  })
);

export function filterDonations(donations, { dateFilter, statusFilter }) {
  const now = new Date("2026-07-04");

  return donations.filter((donation) => {
    if (statusFilter === "active" && !donation.isActive) return false;
    if (statusFilter !== "all" && statusFilter !== "active") {
      if (donation.status !== statusFilter) return false;
    }

    if (dateFilter === "all") return true;

    const donationDate = new Date(donation.date);
    const days = Number(dateFilter);
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);

    return donationDate >= cutoff;
  });
}
