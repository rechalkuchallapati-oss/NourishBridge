export const DELIVERY_PIPELINE_STEPS = [
  { id: "accepted", label: "Donation Accepted" },
  { id: "volunteer_assigned", label: "Volunteer Assigned" },
  { id: "collected", label: "Food Collected" },
  { id: "in_transit", label: "In Transit" },
  { id: "arrived", label: "Arrived at NGO" },
  { id: "verified", label: "Verified" },
];

export const ACTIVE_DELIVERIES = [
  {
    id: "DEL-001",
    donationId: "DN-2401",
    foodName: "Vegetable Biryani & Raita",
    foodCategory: "Prepared Meals",
    donorName: "Spice Garden Restaurant",
    quantity: "25 kg · ~45 servings",
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
    foodName: "Fresh Vegetables & Rice",
    foodCategory: "Fresh Produce & Grains",
    donorName: "Indiranagar Fresh Mart",
    quantity: "28 kg · ~70 servings",
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
    foodName: "Dal Makhani & Naan",
    foodCategory: "Prepared Meals",
    donorName: "Rajesh Kumar",
    quantity: "15 kg · ~35 servings",
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
