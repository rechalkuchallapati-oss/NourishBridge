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
    donationId: "IN-2838",
    eventType: "wedding",
    eventName: "Verma–Bose Wedding Reception",
    packagingScale: "bulk",
    thumbnailKey: "wedding_buffet",
    foodName: "Wedding Banquet · 11 items",
    foodCategory: "North & South Wedding Feast",
    donorName: "Verma Family Events",
    quantity: "11 item types · ~340 servings",
    items: [
      { name: "Lucknowi Mutton Korma", quantity: "26 kg · chafer", cuisine: "Indian" },
      { name: "Malabar Chicken Curry", quantity: "20 kg · chafer", cuisine: "South Indian" },
      { name: "Jeera Pulao", quantity: "22 kg · hot box", cuisine: "Indian" },
      { name: "Rasmalai & Jalebi", quantity: "130 portions", cuisine: "Desserts" },
    ],
    volunteer: {
      name: "Rahul Mehta",
      phone: "+91 98765 43210",
      vehicle: "Scooter — KA 01 AB 1234",
    },
    currentStatus: "in_transit",
    eta: "Today, 6:45 PM",
    lastLocationUpdate: "2 min ago — 1.2 km from NGO centre",
    simulatedLocation: { lat: 12.9784, lng: 77.6408, label: "Near Race Course Road" },
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
    donationId: "IN-2835",
    eventType: "individual",
    eventName: "Extra sambar rice from home",
    packagingScale: "individual",
    thumbnailKey: "individual_rice_sambar",
    foodName: "Sambar Rice & Curd Rice",
    foodCategory: "Home-Cooked Meals",
    donorName: "Mrs. Lakshmi Narayan",
    quantity: "~9 kg · 2 items · 22 servings",
    items: [
      { name: "Sambar Rice (bisibele style)", quantity: "5 kg · 4 tiffins", cuisine: "South Indian" },
      { name: "Curd Rice with tempering", quantity: "4 kg · 2 tiffins", cuisine: "South Indian" },
    ],
    volunteer: {
      name: "Priya Sharma",
      phone: "+91 91234 56789",
      vehicle: "Car — KA 03 CD 5678",
    },
    currentStatus: "collected",
    eta: "Today, 8:15 PM",
    lastLocationUpdate: "8 min ago — at pickup location",
    simulatedLocation: { lat: 12.9716, lng: 77.6412, label: "Jayanagar 9th Block" },
    escalation: { coordinator: "Anita Desai", phone: "+91 99887 76655" },
    timeline: [
      { step: "accepted", time: "Today, 2:00 PM" },
      { step: "volunteer_assigned", time: "Today, 2:30 PM" },
      { step: "collected", time: "Today, 7:50 PM" },
    ],
  },
  {
    id: "DEL-003",
    donationId: "IN-2841",
    eventType: "restaurant",
    eventName: "Biryani Mahal — kitchen closing surplus",
    packagingScale: "bulk",
    thumbnailKey: "restaurant_biryani_bulk",
    foodName: "Biryani Mahal Spread · 14 items",
    foodCategory: "Multi-Biryani Surplus",
    donorName: "Biryani Mahal",
    quantity: "14 item types · ~380 servings",
    items: [
      { name: "Chicken Dum Biryani", quantity: "30 kg · hot box", cuisine: "Indian" },
      { name: "Mutton Biryani", quantity: "24 kg · hot box", cuisine: "Indian" },
      { name: "Fish Biryani (Seer)", quantity: "16 kg · pan", cuisine: "Indian" },
      { name: "Vanilla & Butterscotch Ice Cream", quantity: "8 × 2 L tubs", cuisine: "Desserts" },
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
      { step: "accepted", time: "Today, 8:50 PM" },
      { step: "volunteer_assigned", time: "Today, 9:00 PM" },
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
