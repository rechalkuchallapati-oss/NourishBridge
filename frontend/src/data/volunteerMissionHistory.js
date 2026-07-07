import { enrichDonationRecord } from "./shared/donationItems";
import { resolveItemThumbnail } from "./donationThumbnails";
import { resolveThumbnailKeyFromName } from "./foodItemThumbnails";

function computeTotalLoad(mission) {
  const items = mission.items ?? [];
  if (items.length === 0) return mission.quantity ?? "—";
  return items.map((item) => item.quantity).join(" · ");
}

function enrichMissionItems(mission) {
  const items = (mission.items ?? []).map((item) => {
    const thumbnailKey = item.thumbnailKey ?? resolveThumbnailKeyFromName(item.name);
    const enrichedItem = { ...item, thumbnailKey };
    return {
      ...enrichedItem,
      imageSrc: resolveItemThumbnail(enrichedItem),
    };
  });
  return { ...mission, items };
}

function formatDonorShort(name) {
  if (!name) return "—";
  return name
    .replace(/\s*[—–-]\s*.+$/, "")
    .replace(/\([^)]*\)/g, "")
    .trim();
}

/** One table row per mission — groups all food items from the same pickup. */
export function mapMissionsToTableRows(missions) {
  return missions.map((mission) => {
    const enriched = enrichMissionItems(mission);
    return {
      missionId: enriched.id,
      foodName: enriched.foodName,
      eventType: enriched.eventType,
      donor: formatDonorShort(enriched.donor ?? enriched.donorName),
      ngo: enriched.ngo ?? enriched.ngoName,
      meals: enriched.meals ?? enriched.estimatedMeals ?? 0,
      totalLoad: enriched.totalLoad ?? computeTotalLoad(enriched),
      pickupAt: enriched.pickupAt,
      deliveredAt: enriched.deliveredAt,
      deliveryStatus: enriched.deliveryStatus ?? "delivered",
      items: enriched.items,
    };
  });
}

export function getMissionTableRows(missions) {
  return mapMissionsToTableRows(missions);
}

const RAW_COMPLETED = [
  {
    id: "MIS-055",
    eventType: "hotel",
    thumbnailKey: "butter_chicken_naan",
    packagingScale: "bulk",
    foodName: "Novotel Banquet Surplus",
    donor: "Novotel HICC Banquets",
    ngo: "Akshaya Patra Hyderabad",
    meals: 142,
    pickupAt: "Jul 6, 2026 · 11:20 AM",
    deliveredAt: "Jul 6, 2026 · 12:45 PM",
    dateSort: "2026-07-06",
    deliveryStatus: "delivered",
    items: [
      { name: "Butter Chicken & Naan", quantity: "18 kg · chafer", cuisine: "Indian" },
      { name: "Dal Makhani & Jeera Rice", quantity: "14 kg · hot box", cuisine: "Indian" },
    ],
  },
  {
    id: "MIS-054",
    eventType: "individual",
    thumbnailKey: "tomato_bath",
    packagingScale: "individual",
    foodName: "Home Tiffin — Tomato Bath",
    donor: "Ananya Reddy",
    ngo: "Robin Hood Army — Hyderabad",
    meals: 10,
    pickupAt: "Jul 5, 2026 · 8:40 AM",
    deliveredAt: "Jul 5, 2026 · 10:05 AM",
    dateSort: "2026-07-05",
    deliveryStatus: "delivered",
    items: [
      { name: "Tomato Bath (semiya)", quantity: "4 kg · 2 boxes", cuisine: "South Indian" },
      { name: "Curd Rice with pickle", quantity: "3 kg · 1 tiffin", cuisine: "South Indian" },
    ],
  },
  {
    id: "MIS-053",
    eventType: "restaurant",
    thumbnailKey: "chinese_noodles",
    packagingScale: "bulk",
    foodName: "Dragon Wok Closing Stock",
    donor: "Dragon Wok",
    ngo: "Goonj Relief Centre",
    meals: 96,
    pickupAt: "Jul 4, 2026 · 9:30 PM",
    deliveredAt: "Jul 4, 2026 · 10:55 PM",
    dateSort: "2026-07-04",
    deliveryStatus: "delivered",
    items: [
      { name: "Schezwan Fried Rice", quantity: "16 kg · wok pan", cuisine: "Chinese" },
      { name: "Veg Manchurian Gravy", quantity: "11 kg · chafer", cuisine: "Indo-Chinese" },
      { name: "Spring Rolls (veg)", quantity: "48 pieces", cuisine: "Chinese" },
    ],
  },
  {
    id: "MIS-052",
    eventType: "individual",
    thumbnailKey: "idli_sambar",
    packagingScale: "individual",
    foodName: "Sunday Idli Tiffin",
    donor: "Lakshmi Prasad",
    ngo: "Feeding India Hub",
    meals: 8,
    pickupAt: "Jul 4, 2026 · 7:15 AM",
    deliveredAt: "Jul 4, 2026 · 8:30 AM",
    dateSort: "2026-07-04",
    deliveryStatus: "delivered",
    items: [
      { name: "Idli & Sambar", quantity: "60 idlis · 3 boxes", cuisine: "South Indian" },
      { name: "Coconut Chutney", quantity: "2 kg · 1 container", cuisine: "South Indian" },
    ],
  },
  {
    id: "MIS-051",
    eventType: "ramzan",
    thumbnailKey: "ramzan_iftar",
    packagingScale: "bulk",
    foodName: "Ramzan Iftar Community Pack",
    donor: "Charminar Iftar Committee",
    ngo: "Robin Hood Army — Hyderabad",
    meals: 245,
    pickupAt: "Jul 3, 2026 · 5:45 PM",
    deliveredAt: "Jul 3, 2026 · 7:10 PM",
    dateSort: "2026-07-03",
    deliveryStatus: "delivered",
    items: [
      { name: "Mutton Haleem", quantity: "28 kg · deg", cuisine: "Indian" },
      { name: "Sheer Khurma", quantity: "55 bowls", cuisine: "Desserts" },
      { name: "Dates & Fruit Chaat", quantity: "40 portions", cuisine: "Indian" },
    ],
  },
  {
    id: "MIS-050",
    eventType: "restaurant",
    thumbnailKey: "paradise_biryani",
    packagingScale: "bulk",
    foodName: "Paradise Food Court Donation",
    donor: "Paradise Food Court",
    ngo: "Rise Against Hunger — Hyderabad",
    meals: 280,
    pickupAt: "Jul 2, 2026 · 10:00 PM",
    deliveredAt: "Jul 2, 2026 · 11:25 PM",
    dateSort: "2026-07-02",
    deliveryStatus: "delivered",
    items: [
      { name: "Paradise Special Biryani", quantity: "35 kg · hot box", cuisine: "Indian", thumbnailKey: "paradise_biryani" },
      { name: "Qubani Ka Meetha", quantity: "60 portions", cuisine: "Desserts", thumbnailKey: "qubani_meetha" },
    ],
  },
  {
    id: "MIS-049",
    eventType: "catering",
    thumbnailKey: "veg_pulao",
    packagingScale: "bulk",
    foodName: "GreenLeaf Catering Pack",
    donor: "GreenLeaf Catering",
    ngo: "Feeding India Hub",
    meals: 165,
    pickupAt: "Jul 1, 2026 · 10:30 PM",
    deliveredAt: "Jul 1, 2026 · 11:50 PM",
    dateSort: "2026-07-01",
    deliveryStatus: "delivered",
    items: [
      { name: "Veg Pulao", quantity: "22 kg · hot box", cuisine: "Indian", thumbnailKey: "veg_pulao" },
      { name: "Paneer Curry & Roti", quantity: "16 kg · chafer", cuisine: "Indian", thumbnailKey: "paneer_curry" },
    ],
  },
  {
    id: "MIS-048",
    eventType: "party",
    thumbnailKey: "pizza_italian",
    packagingScale: "individual",
    foodName: "CloudServe Farewell Party",
    donor: "CloudServe Technologies",
    ngo: "Feeding India Hub",
    meals: 88,
    pickupAt: "Jun 30, 2026 · 7:45 PM",
    deliveredAt: "Jun 30, 2026 · 9:00 PM",
    dateSort: "2026-06-30",
    deliveryStatus: "delivered",
    items: [
      { name: "Veg & Chicken Pizza (large)", quantity: "16 boxes", cuisine: "Italian" },
      { name: "Brownie & Donut Assortment", quantity: "64 pieces", cuisine: "Desserts" },
    ],
  },
  {
    id: "MIS-047",
    eventType: "individual",
    thumbnailKey: "fish_curry",
    packagingScale: "individual",
    foodName: "Andhra Fish Pulusu Pack",
    donor: "Suresh Kommuri",
    ngo: "Goonj Relief Centre",
    meals: 14,
    pickupAt: "Jun 28, 2026 · 12:40 PM",
    deliveredAt: "Jun 28, 2026 · 2:05 PM",
    dateSort: "2026-06-28",
    deliveryStatus: "delivered",
    items: [
      { name: "Andhra Fish Pulusu", quantity: "4.5 kg · 3 containers", cuisine: "South Indian" },
      { name: "Steamed Rice", quantity: "3.5 kg · 2 tiffins", cuisine: "South Indian" },
    ],
  },
  {
    id: "MIS-046",
    eventType: "festival",
    thumbnailKey: "ganesh_prasad",
    packagingScale: "bulk",
    foodName: "Ganesh Chaturthi Prasad",
    donor: "Secunderabad Ganesh Mandal",
    ngo: "Rise Against Hunger — Hyderabad",
    meals: 185,
    pickupAt: "Jun 26, 2026 · 5:30 PM",
    deliveredAt: "Jun 26, 2026 · 6:55 PM",
    dateSort: "2026-06-26",
    deliveryStatus: "delivered",
    items: [
      { name: "Ukadiche Modak", quantity: "120 pieces", cuisine: "Sweets" },
      { name: "Puliyodarai (tamarind rice)", quantity: "18 kg · vat", cuisine: "South Indian" },
      { name: "Coconut Laddu", quantity: "70 pieces", cuisine: "Sweets" },
    ],
  },
  {
    id: "MIS-045",
    eventType: "wedding",
    thumbnailKey: "wedding_buffet",
    packagingScale: "bulk",
    foodName: "Iyer–Thomas Wedding Reception",
    donor: "Iyer–Thomas Family",
    ngo: "No Food Waste Hyderabad",
    meals: 310,
    pickupAt: "Jun 24, 2026 · 9:15 PM",
    deliveredAt: "Jun 24, 2026 · 10:40 PM",
    dateSort: "2026-06-24",
    deliveryStatus: "delivered",
    items: [
      { name: "Chettinad Mutton Pepper Fry", quantity: "24 kg · chafer", cuisine: "South Indian" },
      { name: "Appam & Ishtu", quantity: "90 sets", cuisine: "South Indian" },
      { name: "Payasam (ada pradhaman)", quantity: "80 bowls", cuisine: "Desserts" },
    ],
  },
  {
    id: "MIS-044",
    eventType: "individual",
    thumbnailKey: "fruit_boxes",
    packagingScale: "individual",
    foodName: "Office Fruit Box Surplus",
    donor: "MedTech Solutions",
    ngo: "Akshaya Patra Hyderabad",
    meals: 22,
    pickupAt: "Jun 22, 2026 · 4:10 PM",
    deliveredAt: "Jun 22, 2026 · 5:20 PM",
    dateSort: "2026-06-22",
    deliveryStatus: "delivered",
    items: [
      { name: "Mixed Seasonal Fruits", quantity: "12 kg · 6 boxes", cuisine: "Fresh Produce" },
      { name: "Fresh Orange Juice", quantity: "24 bottles", cuisine: "Beverages" },
    ],
  },
  {
    id: "MIS-043",
    eventType: "hotel",
    thumbnailKey: "butter_chicken_naan",
    packagingScale: "bulk",
    foodName: "Taj Krishna Banquet Handover",
    donor: "Taj Krishna",
    ngo: "Robin Hood Army — Hyderabad",
    meals: 168,
    pickupAt: "Jun 20, 2026 · 11:00 PM",
    deliveredAt: "Jun 21, 2026 · 12:15 AM",
    dateSort: "2026-06-20",
    deliveryStatus: "delivered",
    items: [
      { name: "Butter Chicken & Garlic Naan", quantity: "22 kg · chafer", cuisine: "Indian" },
      { name: "Paneer Lababdar & Roti", quantity: "15 kg · hot box", cuisine: "Indian" },
    ],
  },
  {
    id: "MIS-042",
    eventType: "restaurant",
    thumbnailKey: "individual_snacks",
    packagingScale: "bulk",
    foodName: "Café Niloufer Evening Surplus",
    donor: "Café Niloufer",
    ngo: "Goonj Relief Centre",
    meals: 54,
    pickupAt: "Jun 18, 2026 · 8:00 PM",
    deliveredAt: "Jun 18, 2026 · 9:10 PM",
    dateSort: "2026-06-18",
    deliveryStatus: "delivered",
    items: [
      { name: "Osmania Biscuits & Tea Samosa", quantity: "180 pieces", cuisine: "Indian" },
      { name: "Khova Naan & Irani Chai", quantity: "65 sets", cuisine: "Indian" },
    ],
  },
  {
    id: "MIS-041",
    eventType: "corporate",
    thumbnailKey: "corporate_lunch",
    packagingScale: "bulk",
    foodName: "Phoenix Tech Park Lunch",
    donor: "Phoenix Tech Park Canteen",
    ngo: "Feeding India Hub",
    meals: 132,
    pickupAt: "Jun 15, 2026 · 1:30 PM",
    deliveredAt: "Jun 15, 2026 · 2:50 PM",
    dateSort: "2026-06-15",
    deliveryStatus: "delivered",
    items: [
      { name: "Sambar Rice & Mixed Poriyal", quantity: "20 kg · hot box", cuisine: "South Indian", thumbnailKey: "sambar_rice" },
      { name: "Chicken 65 & Fried Rice", quantity: "14 kg", cuisine: "Indo-Chinese", thumbnailKey: "chinese_noodles" },
    ],
  },
];

const RAW_UPCOMING = [
  {
    id: "MIS-056",
    eventType: "catering",
    thumbnailKey: "veg_pulao",
    packagingScale: "bulk",
    foodName: "Community Kitchen Pack",
    donor: "Sri Sai Catering",
    ngo: "Helping Hands Foundation",
    meals: 185,
    pickupAt: "Jul 7, 2026 · 11:00 AM",
    deliveredAt: null,
    dateSort: "2026-07-07",
    deliveryStatus: "to_be_picked",
    items: [
      { name: "Veg Pulao", quantity: "24 kg · hot box", cuisine: "Indian", thumbnailKey: "veg_pulao" },
      { name: "Paneer Curry", quantity: "18 kg · chafer", cuisine: "Indian", thumbnailKey: "paneer_curry" },
    ],
  },
  {
    id: "MIS-057",
    eventType: "individual",
    thumbnailKey: "idli_sambar",
    packagingScale: "individual",
    foodName: "Morning Tiffin Donation",
    donor: "Lakshmi Prasad",
    ngo: "Akshaya Patra Hyderabad",
    meals: 45,
    pickupAt: "Jul 7, 2026 · 7:30 AM",
    deliveredAt: null,
    dateSort: "2026-07-07",
    deliveryStatus: "to_be_picked",
    items: [
      { name: "Idli & Sambar", quantity: "80 idlis · 4 boxes", cuisine: "South Indian", thumbnailKey: "idli_sambar" },
      { name: "Coconut Chutney", quantity: "3 kg · 2 containers", cuisine: "South Indian", thumbnailKey: "coconut_chutney" },
    ],
  },
  {
    id: "MIS-058",
    eventType: "restaurant",
    thumbnailKey: "bread_and_sandwiches",
    packagingScale: "bulk",
    foodName: "Bread and Sandwiches",
    donor: "Daily Bread Bakery",
    ngo: "Goonj Relief Centre",
    meals: 62,
    pickupAt: "Jul 8, 2026 · 4:00 PM",
    deliveredAt: null,
    dateSort: "2026-07-08",
    deliveryStatus: "to_be_picked",
    items: [
      { name: "Bread and Sandwiches", quantity: "40 loaves · 55 sandwich packs", cuisine: "Bakery", thumbnailKey: "bread_and_sandwiches" },
    ],
  },
  {
    id: "MIS-059",
    eventType: "restaurant",
    thumbnailKey: "rice_and_curry",
    packagingScale: "bulk",
    foodName: "Rice and Curry",
    donor: "Annapurna Mess",
    ngo: "Robin Hood Army — Hyderabad",
    meals: 120,
    pickupAt: "Jul 8, 2026 · 8:30 PM",
    deliveredAt: null,
    dateSort: "2026-07-08",
    deliveryStatus: "to_be_delivered",
    items: [
      { name: "Rice and Curry", quantity: "20 kg rice · 14 kg curry", cuisine: "South Indian", thumbnailKey: "rice_and_curry" },
    ],
  },
  {
    id: "MIS-060",
    eventType: "festival",
    thumbnailKey: "festival_spread",
    packagingScale: "bulk",
    foodName: "Bathukamma Festival Pack",
    donor: "Telangana Cultural Association",
    ngo: "No Food Waste Hyderabad",
    meals: 210,
    pickupAt: "Jul 9, 2026 · 3:30 PM",
    deliveredAt: null,
    dateSort: "2026-07-09",
    deliveryStatus: "to_be_picked",
    items: [
      { name: "Pulihora & Curd Rice", quantity: "22 kg", cuisine: "South Indian", thumbnailKey: "pulihora_curd_rice" },
      { name: "Bobbatlu & Ariselu", quantity: "75 pieces", cuisine: "Sweets", thumbnailKey: "bobbatlu_ariselu" },
    ],
  },
];

export const COMPLETED_MISSIONS_HISTORY = RAW_COMPLETED.map(enrichDonationRecord);

export const UPCOMING_MISSIONS_EXTENDED = RAW_UPCOMING.map(enrichDonationRecord);

export const ALL_MISSIONS_TABLE = [...UPCOMING_MISSIONS_EXTENDED, ...COMPLETED_MISSIONS_HISTORY];

export const DELIVERY_STATUS_LABELS = {
  delivered: "Delivered",
  to_be_picked: "To be picked",
  to_be_delivered: "To be delivered",
};

export const DELIVERY_STATUS_STYLES = {
  delivered: "bg-[#DCFCE7] text-[#15803D]",
  to_be_picked: "bg-[#FEF3C7] text-[#B45309]",
  to_be_delivered: "bg-[#DBEAFE] text-[#1D4ED8]",
};
