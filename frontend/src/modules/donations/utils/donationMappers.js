/**
 * Maps UI food category labels to backend enum slugs.
 */
export const UI_CATEGORY_TO_API = {
  "Prepared Meals": "cooked_meals",
  "Cooked Rice & Curry": "cooked_meals",
  "Baked Goods": "bakery",
  "Fresh Produce": "vegetables",
  "Packaged Food": "packaged",
  "Beverages": "beverages",
  "Snacks & Dry Rations": "dry_goods",
  "Other": "other",
};

export const API_CATEGORY_TO_UI = Object.fromEntries(
  Object.entries(UI_CATEGORY_TO_API).map(([label, slug]) => [slug, label]),
);

export function categoryToApi(label) {
  return UI_CATEGORY_TO_API[label] || label?.toLowerCase().replace(/\s+/g, "_") || "other";
}

export function categoryToUi(slug) {
  return API_CATEGORY_TO_UI[slug] || slug;
}

export function parseQuantityString(value) {
  if (typeof value === "number") return { quantity: value, quantityUnit: "kg" };
  const match = String(value).match(/([\d.]+)\s*(\w+)?/);
  if (!match) return { quantity: 1, quantityUnit: "kg" };
  const quantity = parseFloat(match[1]);
  let unit = (match[2] || "kg").toLowerCase();
  const unitMap = { kg: "kg", g: "grams", grams: "grams", l: "liters", liters: "liters", meals: "meals", pieces: "pieces", boxes: "boxes", trays: "trays" };
  return { quantity: quantity || 1, quantityUnit: unitMap[unit] || "kg" };
}

export function parseDateTimeParts(dateStr, timeStr) {
  if (!dateStr) return null;
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length < 3) return null;

  const [day, month, year] = parts;
  let hours = 0;
  let minutes = 0;

  if (timeStr) {
    const timeParts = timeStr.trim().split(/\s+/);
    if (timeParts.length >= 2) {
      hours = parseInt(timeParts[0], 10) || 0;
      minutes = parseInt(timeParts[1], 10) || 0;
    }
  }

  const iso = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function buildAddressFromText(text, fallbackCity = "Hyderabad") {
  return {
    line1: text?.trim() || "Address pending",
    city: fallbackCity,
    state: "Telangana",
    pincode: "500001",
    country: "India",
  };
}

export function isoToDateTimeParts(iso) {
  if (!iso) return { date: "", time: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "", time: "" };

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return {
    date: `${day} ${month} ${year}`,
    time: `${hours} ${minutes}`,
  };
}

export default {
  categoryToApi,
  categoryToUi,
  parseQuantityString,
  parseDateTimeParts,
  buildAddressFromText,
};
