export const RECEIVING_STATES = {
  ARRIVED: "arrived",
  INSPECTION_PENDING: "inspection_pending",
  ACCEPTED: "accepted_for_distribution",
  INSPECTION_FAILED: "inspection_failed",
  REJECTED: "rejected_with_reason",
};

export const PENDING_RECEIVING = [
  {
    id: "RCV-001",
    donationId: "DN-2350",
    foodName: "Paneer Tikka & Roti",
    foodCategory: "Prepared Meals",
    donorName: "North Spice Kitchen",
    listedQuantity: "18 kg",
    volunteer: "Suresh Nair",
    arrivedAt: "Today, 6:10 PM",
    status: RECEIVING_STATES.INSPECTION_PENDING,
    requiresTemperatureCheck: true,
  },
  {
    id: "RCV-002",
    donationId: "DN-2338",
    foodName: "Mixed Rice & Curry",
    foodCategory: "Prepared Meals",
    donorName: "Community Hall Caterers",
    listedQuantity: "30 kg",
    volunteer: "Meera Joshi",
    arrivedAt: "Today, 5:45 PM",
    status: RECEIVING_STATES.ARRIVED,
    requiresTemperatureCheck: true,
  },
];

export const PACKAGING_OPTIONS = ["Excellent", "Good", "Damaged", "Compromised"];
export const SPOILAGE_OPTIONS = ["None visible", "Minor concern", "Visible spoilage"];
export const TEMPERATURE_OPTIONS = ["Above 60°C (hot)", "Below 5°C (cold)", "Room temp — acceptable", "Out of safe range"];

export const RECENT_RECEIVING_LOG = [
  {
    id: "LOG-001",
    donationId: "DN-2320",
    foodName: "Vegetable Biryani",
    result: "accepted_for_distribution",
    receivedAt: "Yesterday, 7:20 PM",
    quantityReceived: "22 kg",
    quantityListed: "25 kg",
    notes: "Minor packaging dent; food quality acceptable",
  },
  {
    id: "LOG-002",
    donationId: "DN-2315",
    foodName: "Seafood Platter",
    result: "rejected_with_reason",
    receivedAt: "Yesterday, 2:10 PM",
    quantityReceived: "0 kg",
    quantityListed: "8 kg",
    notes: "Temperature out of safe range; visible spoilage detected",
  },
];
