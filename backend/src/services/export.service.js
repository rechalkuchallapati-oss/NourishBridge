import Donation from "../models/Donation.model.js";
import Delivery from "../models/Delivery.model.js";
import Volunteer from "../models/Volunteer.model.js";
import NGO from "../models/NGO.model.js";
import FoodRequest from "../models/FoodRequest.model.js";
import Inventory from "../models/Inventory.model.js";
import { getPlatformAnalytics } from "./analytics.service.js";

function escapeCsv(value) {
  const str = value == null ? "" : String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function toCsv(headers, rows) {
  const lines = [headers.map(escapeCsv).join(",")];
  rows.forEach((row) => lines.push(headers.map((h) => escapeCsv(row[h])).join(",")));
  return lines.join("\n");
}

export async function exportDonationsCsv() {
  const donations = await Donation.find()
    .select("donationCode foodType category quantity quantityUnit estimatedMeals status createdAt")
    .sort({ createdAt: -1 })
    .limit(5000)
    .lean();

  const headers = ["donationCode", "foodType", "category", "quantity", "quantityUnit", "estimatedMeals", "status", "createdAt"];
  const rows = donations.map((d) => ({
    donationCode: d.donationCode,
    foodType: d.foodType,
    category: d.category,
    quantity: d.quantity,
    quantityUnit: d.quantityUnit,
    estimatedMeals: d.estimatedMeals,
    status: d.status,
    createdAt: d.createdAt?.toISOString?.() || d.createdAt,
  }));
  return toCsv(headers, rows);
}

export async function exportDeliveriesCsv() {
  const deliveries = await Delivery.find()
    .populate("ngoId", "ngoName")
    .sort({ createdAt: -1 })
    .limit(5000)
    .lean();

  const headers = ["deliveryCode", "status", "ngoName", "pickedUpAt", "deliveredAt", "completedAt"];
  const rows = deliveries.map((d) => ({
    deliveryCode: d.deliveryCode,
    status: d.status,
    ngoName: d.ngoId?.ngoName || "",
    pickedUpAt: d.pickedUpAt?.toISOString?.() || "",
    deliveredAt: d.deliveredAt?.toISOString?.() || "",
    completedAt: d.completedAt?.toISOString?.() || "",
  }));
  return toCsv(headers, rows);
}

export async function exportVolunteersCsv() {
  const volunteers = await Volunteer.find()
    .populate("userId", "fullName email")
    .sort({ createdAt: -1 })
    .lean();

  const headers = ["fullName", "email", "vehicleType", "rating", "completedMissions", "isAvailable"];
  const rows = volunteers.map((v) => ({
    fullName: v.userId?.fullName,
    email: v.userId?.email,
    vehicleType: v.vehicleType,
    rating: v.rating,
    completedMissions: v.completedMissions,
    isAvailable: v.isAvailable,
  }));
  return toCsv(headers, rows);
}

export async function exportNgosCsv() {
  const ngos = await NGO.find().populate("userId", "fullName email").lean();
  const headers = ["ngoName", "email", "verificationStatus", "mealsServed", "city"];
  const rows = ngos.map((n) => ({
    ngoName: n.ngoName,
    email: n.userId?.email,
    verificationStatus: n.verificationStatus,
    mealsServed: n.mealsServed,
    city: n.address?.city || "",
  }));
  return toCsv(headers, rows);
}

export async function exportInventoryCsv() {
  const items = await Inventory.find().populate("ngoId", "ngoName").lean();
  const headers = ["batchCode", "itemName", "category", "quantity", "distributedQuantity", "status", "ngoName", "expiryDate"];
  const rows = items.map((i) => ({
    batchCode: i.batchCode,
    itemName: i.itemName,
    category: i.category,
    quantity: i.quantity,
    distributedQuantity: i.distributedQuantity,
    status: i.status,
    ngoName: i.ngoId?.ngoName,
    expiryDate: i.expiryDate?.toISOString?.() || "",
  }));
  return toCsv(headers, rows);
}

export async function exportFoodRequestsCsv() {
  const requests = await FoodRequest.find().populate("ngoId", "ngoName").lean();
  const headers = ["requestCode", "foodItem", "status", "priority", "quantityNeeded", "ngoName", "neededBy"];
  const rows = requests.map((r) => ({
    requestCode: r.requestCode,
    foodItem: r.foodItem || r.title,
    status: r.status,
    priority: r.priority,
    quantityNeeded: r.quantityNeeded,
    ngoName: r.ngoId?.ngoName,
    neededBy: r.neededBy?.toISOString?.() || "",
  }));
  return toCsv(headers, rows);
}

export async function exportImpactPdfText() {
  const analytics = await getPlatformAnalytics();
  const lines = [
    "NourishBridge Impact Report",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Total Donations: ${analytics.totalDonations}`,
    `Completed Donations: ${analytics.completedDonations}`,
    `Food Rescued (kg): ${analytics.foodRescuedKg}`,
    `Meals Generated: ${analytics.mealsGenerated}`,
    `NGOs Served: ${analytics.ngosServed}`,
    `Active Volunteers: ${analytics.activeVolunteers}`,
    `Completed Deliveries: ${analytics.completedDeliveries}`,
    `Fulfilled Food Requests: ${analytics.fulfilledFoodRequests}`,
    `Beneficiaries Served: ${analytics.beneficiariesServed}`,
    `On-time Delivery Rate: ${analytics.onTimeDeliveryRate}%`,
    `Average Delivery Time (min): ${analytics.averageDeliveryTimeMinutes}`,
  ];
  return lines.join("\n");
}

const EXPORTERS = {
  donations: exportDonationsCsv,
  deliveries: exportDeliveriesCsv,
  volunteers: exportVolunteersCsv,
  ngos: exportNgosCsv,
  inventory: exportInventoryCsv,
  "food-requests": exportFoodRequestsCsv,
  impact: exportImpactPdfText,
};

export async function generateExport(reportType, format = "csv") {
  const exporter = EXPORTERS[reportType];
  if (!exporter) throw new Error(`Unknown report type: ${reportType}`);

  const content = await exporter();
  const isImpact = reportType === "impact";

  if (format === "pdf" || (isImpact && format !== "csv")) {
    return {
      content,
      contentType: "text/plain",
      filename: `nourishbridge-${reportType}-report.txt`,
    };
  }

  const ext = format === "xlsx" ? "csv" : "csv";
  return {
    content,
    contentType: "text/csv",
    filename: `nourishbridge-${reportType}.${ext}`,
  };
}

export default { generateExport, EXPORTERS };
