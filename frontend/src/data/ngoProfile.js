export const DEFAULT_NGO_PROFILE = {
  organizationName: "Helping Hands Foundation",
  registrationId: "NGO1298",
  serviceAreas: ["Hyderabad", "Secunderabad", "Gachibowli", "Madhapur"],
  foodTypesAccepted: [
    "Prepared Meals",
    "Fresh Produce",
    "Bakery & Snacks",
    "Grains & Rice",
    "Fruits & Beverages",
  ],
  maxDailyCapacityKg: 500,
  maxDailyMeals: 800,
  storageFacilities: ["Dry storage (200 kg)", "Cold room (80 kg)", "Hot holding (40 servings)"],
  hasRefrigerator: true,
  refrigeratorCapacityKg: 80,
  operatingHours: "6:00 AM – 10:00 PM",
  emergencyContact: "+91 99887 76655",
  emergencyContactName: "Anita Desai",
  preferredPickupRadiusKm: 8,
  availabilityStatus: "available",
  address: "42 Community Lane, Hyderabad, Telangana 500032",
  email: "operations@akshayapatra.demo",
  phone: "+91 80 4123 4567",
};

export const AVAILABILITY_OPTIONS = [
  { id: "available", label: "Available — accepting donations" },
  { id: "limited", label: "Limited capacity" },
  { id: "unavailable", label: "Temporarily unavailable" },
];

export const FOOD_TYPE_OPTIONS = [
  "Prepared Meals",
  "Fresh Produce",
  "Bakery & Snacks",
  "Grains & Rice",
  "Fruits & Beverages",
  "Dairy",
  "Frozen Food",
];
