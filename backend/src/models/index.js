/**
 * Model registry — import this file once at startup to register all Mongoose models.
 * Barrel export for use in services/controllers when APIs are built.
 */

import User from "./User.model.js";
import Donor from "./Donor.model.js";
import Volunteer from "./Volunteer.model.js";
import NGO from "./NGO.model.js";
import Donation from "./Donation.model.js";
import FoodRequest from "./FoodRequest.model.js";
import Inventory from "./Inventory.model.js";
import Delivery from "./Delivery.model.js";
import Notification from "./Notification.model.js";
import Report from "./Report.model.js";
import AuditLog from "./AuditLog.model.js";
import RefreshToken from "./RefreshToken.model.js";

export {
  User,
  Donor,
  Volunteer,
  NGO,
  Donation,
  FoodRequest,
  Inventory,
  Delivery,
  Notification,
  Report,
  AuditLog,
  RefreshToken,
};

export default {
  User,
  Donor,
  Volunteer,
  NGO,
  Donation,
  FoodRequest,
  Inventory,
  Delivery,
  Notification,
  Report,
  AuditLog,
  RefreshToken,
};
