export const EVENT_TYPES = {
  wedding: "Wedding Reception",
  restaurant: "Restaurant Surplus",
  corporate: "Corporate Event",
  party: "Private Party",
  festival: "Festival / Community Gathering",
  ramzan: "Ramzan Iftar Gathering",
  christmas: "Christmas Celebration",
  individual: "Individual Donor",
  hotel: "Hotel Banquet",
  catering: "Catering Service",
};

/** @typedef {{ name: string, quantity: string, cuisine?: string }} DonationItem */

export function getDonationItems(record) {
  if (Array.isArray(record?.items) && record.items.length > 0) {
    return record.items;
  }
  const name = record?.food ?? record?.foodName ?? record?.label ?? "Food donation";
  const quantity = record?.quantity ?? "—";
  return [{ name, quantity }];
}

export function getDonationItemCount(record) {
  return getDonationItems(record).length;
}

export function formatDonationTitle(record) {
  if (record?.food) return record.food;
  if (record?.foodName) return record.foodName;
  const items = getDonationItems(record);
  if (items.length === 1) return items[0].name;
  if (record?.eventName) return `${record.eventName} · ${items.length} items`;
  if (record?.eventType && EVENT_TYPES[record.eventType]) {
    return `${EVENT_TYPES[record.eventType]} · ${items.length} items`;
  }
  return `Multi-item donation · ${items.length} items`;
}

export function formatDonationQuantitySummary(record) {
  if (record?.quantity && !Array.isArray(record?.items)) return record.quantity;
  const items = getDonationItems(record);
  if (items.length === 1) return items[0].quantity;
  return `${items.length} item types (see list)`;
}

export function enrichDonationRecord(record) {
  const items = getDonationItems(record);
  return {
    ...record,
    items,
    food: record.food ?? formatDonationTitle(record),
    foodName: record.foodName ?? formatDonationTitle(record),
    quantity: record.quantity ?? formatDonationQuantitySummary(record),
    itemCount: items.length,
    eventLabel: record.eventLabel ?? (record.eventType ? EVENT_TYPES[record.eventType] : null),
  };
}
