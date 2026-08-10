/**
 * Central enum definitions — single source of truth for schema enums.
 * Import here instead of duplicating string literals across models.
 */

export const USER_ROLES = Object.freeze({
  DONOR: "donor",
  VOLUNTEER: "volunteer",
  NGO: "ngo",
  ADMIN: "admin",
});

export const USER_STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  SUSPENDED: "suspended",
});

export const VERIFICATION_STATUS = Object.freeze({
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
});

export const DONOR_TYPES = Object.freeze({
  RESTAURANT: "restaurant",
  HOTEL: "hotel",
  CAFE: "cafe",
  CORPORATE: "corporate",
  INDIVIDUAL: "individual",
  CATERING: "catering",
  EVENT: "event",
});

export const DONOR_TIERS = Object.freeze({
  MEMBER: "member",
  BRONZE: "bronze",
  SILVER: "silver",
  GOLD: "gold",
  PLATINUM: "platinum",
});

export const VEHICLE_TYPES = Object.freeze({
  BICYCLE: "bicycle",
  BIKE: "bike",
  CAR: "car",
  VAN: "van",
  TRUCK: "truck",
});

export const VOLUNTEER_AVAILABILITY = Object.freeze({
  AVAILABLE: "available",
  BUSY: "busy",
  ON_MISSION: "on_mission",
  OFFLINE: "offline",
  SUSPENDED: "suspended",
});

export const NGO_STATUS = Object.freeze({
  ACTIVE: "active",
  PENDING: "pending",
  SUSPENDED: "suspended",
  REJECTED: "rejected",
  INACTIVE: "inactive",
});

export const FOOD_CATEGORIES = Object.freeze({
  COOKED_MEALS: "cooked_meals",
  FRUITS: "fruits",
  VEGETABLES: "vegetables",
  DAIRY: "dairy",
  DRY_GOODS: "dry_goods",
  BAKERY: "bakery",
  RAW_FOOD: "raw_food",
  PACKAGED: "packaged",
  BEVERAGES: "beverages",
  OTHER: "other",
});

export const QUANTITY_UNITS = Object.freeze({
  KG: "kg",
  GRAMS: "grams",
  LITERS: "liters",
  PIECES: "pieces",
  MEALS: "meals",
  BOXES: "boxes",
  TRAYS: "trays",
});

export const DONATION_STATUS = Object.freeze({
  PENDING: "pending",
  VERIFIED: "verified",
  NGO_ACCEPTED: "ngo_accepted",
  VOLUNTEER_ASSIGNED: "volunteer_assigned",
  PICKUP_SCHEDULED: "pickup_scheduled",
  PICKED_UP: "picked_up",
  IN_TRANSIT: "in_transit",
  DELIVERED: "delivered",
  COMPLETED: "completed",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
  EXPIRED: "expired",
});

export const FOOD_FRESHNESS = Object.freeze({
  FRESH: "fresh",
  GOOD: "good",
  CONSUME_SOON: "consume_soon",
  UNKNOWN: "unknown",
});

export const DONATION_PRIORITY = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
});

export const FOOD_REQUEST_STATUS = Object.freeze({
  REQUESTED: "requested",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  DONATION_MATCHED: "donation_matched",
  VOLUNTEER_ASSIGNED: "volunteer_assigned",
  DELIVERY_SCHEDULED: "delivery_scheduled",
  FULFILLED: "fulfilled",
  CANCELLED: "cancelled",
  EXPIRED: "expired",
});

export const INVENTORY_STATUS = Object.freeze({
  AVAILABLE: "available",
  LOW_STOCK: "low_stock",
  EXPIRING: "expiring",
  EXPIRED: "expired",
  DISTRIBUTED: "distributed",
  RESERVED: "reserved",
});

export const STORAGE_TYPES = Object.freeze({
  COLD: "cold",
  DRY: "dry",
  AMBIENT: "ambient",
});

export const DELIVERY_STATUS = Object.freeze({
  PENDING: "pending",
  ASSIGNED: "assigned",
  PICKUP_SCHEDULED: "pickup_scheduled",
  EN_ROUTE_PICKUP: "en_route_pickup",
  AT_PICKUP: "at_pickup",
  PICKUP_VERIFIED: "pickup_verified",
  PICKED_UP: "picked_up",
  IN_TRANSIT: "in_transit",
  AT_DROPOFF: "at_dropoff",
  DELIVERY_VERIFIED: "delivery_verified",
  DELIVERED: "delivered",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
});

export const NOTIFICATION_TYPES = Object.freeze({
  DONATION: "donation",
  DELIVERY: "delivery",
  FOOD_REQUEST: "food_request",
  INVENTORY: "inventory",
  VERIFICATION: "verification",
  SYSTEM: "system",
  ALERT: "alert",
  REPORT: "report",
});

export const NOTIFICATION_PRIORITY = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
});

export const REPORT_TYPES = Object.freeze({
  PLATFORM_IMPACT: "platform_impact",
  DONATION_SUMMARY: "donation_summary",
  VOLUNTEER_PERFORMANCE: "volunteer_performance",
  NGO_ANALYTICS: "ngo_analytics",
  INVENTORY: "inventory",
  AUDIT: "audit",
  CUSTOM: "custom",
});

export const REPORT_FORMATS = Object.freeze({
  PDF: "pdf",
  CSV: "csv",
  EXCEL: "excel",
  JSON: "json",
});

export const REPORT_STATUS = Object.freeze({
  PENDING: "pending",
  GENERATING: "generating",
  READY: "ready",
  FAILED: "failed",
  EXPIRED: "expired",
});

export const AUDIT_ACTIONS = Object.freeze({
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  VERIFY: "verify",
  REJECT: "reject",
  SUSPEND: "suspend",
  ACTIVATE: "activate",
  ASSIGN: "assign",
  STATUS_CHANGE: "status_change",
  LOGIN: "login",
  LOGOUT: "logout",
  EXPORT: "export",
  VIEW: "view",
});

export const AUDIT_MODULES = Object.freeze({
  USERS: "users",
  DONORS: "donors",
  VOLUNTEERS: "volunteers",
  NGOS: "ngos",
  DONATIONS: "donations",
  FOOD_REQUESTS: "food_requests",
  INVENTORY: "inventory",
  DELIVERIES: "deliveries",
  NOTIFICATIONS: "notifications",
  REPORTS: "reports",
  SYSTEM: "system",
  AUTH: "auth",
});

export const AUDIT_SEVERITY = Object.freeze({
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
  CRITICAL: "critical",
});

export const ADMIN_LEVELS = Object.freeze({
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MODERATOR: "moderator",
});

export const ADMIN_PERMISSIONS = Object.freeze({
  USERS: "users",
  DONORS: "donors",
  NGOS: "ngos",
  VOLUNTEERS: "volunteers",
  DONATIONS: "donations",
  REPORTS: "reports",
  SYSTEM: "system",
  VERIFICATION: "verification",
});

export const NGO_AVAILABILITY_STATUS = Object.freeze({
  AVAILABLE: "available",
  LIMITED: "limited",
  UNAVAILABLE: "unavailable",
});

/** Helper — returns enum values as array for Mongoose `enum` option */
export const enumValues = (obj) => Object.values(obj);
