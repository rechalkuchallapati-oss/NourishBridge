import { enrichDonationRecord } from "./shared/donationItems";

export const DELIVERY_PIPELINE_STEPS = [
  { id: "accepted", label: "Donation Accepted" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "collected", label: "Food Collected" },
  { id: "in_transit", label: "In Transit" },
  { id: "arrived", label: "Arrived at NGO" },
  { id: "verified", label: "Verified" },
];

const RAW_DELIVERIES = [
  {
    id: "DEL-001",
    donationId: "DN-2401",
    eventType: "wedding",
    eventName: "Mehta–Kapoor Wedding Reception",
    foodName: "Wedding Feast · 9 items",
    foodCategory: "Multi-Cuisine Feast",
    donorName: "Mehta Family Events",
    quantity: "9 item types · ~320 servings",
    items: [
      { name: "Hyderabadi Dum Biryani", quantity: "38 kg", cuisine: "Indian" },
      { name: "Paneer Tikka & Seekh Kebabs", quantity: "22 kg", cuisine: "Indian" },
      { name: "Dal Makhani & Butter Naan", quantity: "18 kg", cuisine: "Indian" },
      { name: "Gulab Jamun & Ras Malai", quantity: "140 portions", cuisine: "Desserts" },
      { name: "Margherita & Farmhouse Pizza", quantity: "24 boxes", cuisine: "Italian" },
    ],
    volunteer: {
      name: "Rahul Mehta",
      phone: "+91 98765 43210",
      vehicle: "Scooter — KA 01 AB 1234",
    },
    currentStatus: "in_transit",
    eta: "Today, 6:45 PM",
    lastLocationUpdate: "2 min ago — 1.2 km from NGO centre",
    simulatedLocation: { lat: 12.9784, lng: 77.6408, label: "Near Indiranagar Metro" },
    escalation: { coordinator: "Anita Desai", phone: "+91 99887 76655" },
    timeline: [
      { step: "accepted", time: "Today, 3:45 PM" },
      { step: "volunteer_assigned", time: "Today, 4:00 PM" },
      { step: "collected", time: "Today, 5:30 PM" },
      { step: "in_transit", time: "Today, 5:45 PM" },
    ],
  },
  {
    id: "DEL-002",
    donationId: "DN-2398",
    eventType: "individual",
    eventName: "Home-cooked surplus",
    foodName: "Homemade Pasta & Garlic Bread",
    foodCategory: "Prepared Meals",
    donorName: "Priya Deshmukh",
    quantity: "2 item types · ~24 servings",
    items: [
      { name: "Penne Arrabiata (homemade)", quantity: "6 kg", cuisine: "Italian" },
      { name: "Garlic Bread Loaves", quantity: "8 loaves", cuisine: "Italian" },
    ],
    volunteer: {
      name: "Priya Sharma",
      phone: "+91 91234 56789",
      vehicle: "Car — KA 03 CD 5678",
    },
    currentStatus: "collected",
    eta: "Today, 8:15 PM",
    lastLocationUpdate: "8 min ago — at pickup location",
    simulatedLocation: { lat: 12.9716, lng: 77.6412, label: "100 Feet Road pickup" },
    escalation: { coordinator: "Anita Desai", phone: "+91 99887 76655" },
    timeline: [
      { step: "accepted", time: "Today, 2:00 PM" },
      { step: "volunteer_assigned", time: "Today, 2:30 PM" },
      { step: "collected", time: "Today, 7:50 PM" },
    ],
  },
  {
    id: "DEL-003",
    donationId: "DN-2388",
    eventType: "ramzan",
    eventName: "Community Iftar at Masjid-e-Noor",
    foodName: "Ramzan Iftar · 6 items",
    foodCategory: "Festival Meals",
    donorName: "Masjid-e-Noor Welfare Committee",
    quantity: "6 item types · ~280 servings",
    items: [
      { name: "Chicken Haleem", quantity: "25 kg", cuisine: "Indian" },
      { name: "Dates & Fruit Chaat", quantity: "80 boxes", cuisine: "Fresh" },
      { name: "Sheer Khurma", quantity: "60 bowls", cuisine: "Desserts" },
      { name: "Samosas & Pakoras", quantity: "200 pieces", cuisine: "Indian" },
    ],
    volunteer: {
      name: "Vikram Singh",
      phone: "+91 87654 32109",
      vehicle: "Bike — KA 05 EF 9012",
    },
    currentStatus: "volunteer_assigned",
    eta: "Tomorrow, 10:00 AM",
    lastLocationUpdate: "Awaiting pickup",
    simulatedLocation: null,
    escalation: { coordinator: "Anita Desai", phone: "+91 99887 76655" },
    timeline: [
      { step: "accepted", time: "Today, 12:30 PM" },
      { step: "volunteer_assigned", time: "Today, 1:00 PM" },
    ],
  },
];

export const ACTIVE_DELIVERIES = RAW_DELIVERIES.map(enrichDonationRecord);

export function getDeliveryStepIndex(status) {
  return DELIVERY_PIPELINE_STEPS.findIndex((step) => step.id === status);
}

export const DELIVERY_STATUS_BADGE = {
  accepted: "bg-[#DBEAFE] text-[#1D4ED8]",
  volunteer_assigned: "bg-[#E0E7FF] text-[#4338CA]",
  collected: "bg-[#FEF3C7] text-[#B45309]",
  in_transit: "bg-[#FFEDD5] text-[#C2410C]",
  arrived: "bg-[#DCFCE7] text-[#15803D]",
  verified: "bg-[#F0FDF4] text-[#16A34A]",
};
