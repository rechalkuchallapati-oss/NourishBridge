import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import User from "../../src/models/User.model.js";
import Donor from "../../src/models/Donor.model.js";
import Volunteer from "../../src/models/Volunteer.model.js";
import NGO from "../../src/models/NGO.model.js";
import Admin from "../../src/models/Admin.model.js";
import Donation from "../../src/models/Donation.model.js";
import Delivery from "../../src/models/Delivery.model.js";
import FoodRequest from "../../src/models/FoodRequest.model.js";
import Inventory from "../../src/models/Inventory.model.js";
import Notification from "../../src/models/Notification.model.js";
import AuditLog from "../../src/models/AuditLog.model.js";
import SupportTicket from "../../src/models/SupportTicket.model.js";
import Beneficiary from "../../src/models/Beneficiary.model.js";
import DistributionRecord from "../../src/models/DistributionRecord.model.js";
import RefreshToken from "../../src/models/RefreshToken.model.js";
import PasswordResetOtp from "../../src/models/PasswordResetOtp.model.js";
import DonationStatusHistory from "../../src/models/DonationStatusHistory.model.js";
import FoodRequestStatusHistory from "../../src/models/FoodRequestStatusHistory.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const metaPath = path.resolve(__dirname, ".test-meta.json");

const uri =
  process.env.MONGODB_URI_TEST ||
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/nourishbridge_test";

function readRunId() {
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    return meta.runId || process.env.NB_TEST_RUN_ID;
  } catch {
    return process.env.NB_TEST_RUN_ID;
  }
}

export default async function globalTeardown() {
  const runId = readRunId();
  if (!runId) return;

  await mongoose.connect(uri);

  const emailPattern = new RegExp(`suite\\..*\\.${runId}@test\\.nourishbridge\\.local`, "i");
  const users = await User.find({ email: emailPattern }).select("_id");
  const userIds = users.map((u) => u._id);

  if (userIds.length) {
    const donors = await Donor.find({ userId: { $in: userIds } }).select("_id");
    const donorIds = donors.map((d) => d._id);
    const donations = await Donation.find({
      $or: [{ donorId: { $in: donorIds } }],
    }).select("_id");
    const donationIds = donations.map((d) => d._id);

    await Promise.all([
      DistributionRecord.deleteMany({}),
      DonationStatusHistory.deleteMany({ donationId: { $in: donationIds } }),
      FoodRequestStatusHistory.deleteMany({}),
      Delivery.deleteMany({}),
      Inventory.deleteMany({}),
      Notification.deleteMany({ userId: { $in: userIds } }),
      AuditLog.deleteMany({ actorId: { $in: userIds } }),
      SupportTicket.deleteMany({ submittedBy: { $in: userIds } }),
      Beneficiary.deleteMany({}),
      FoodRequest.deleteMany({}),
      Donation.deleteMany({ _id: { $in: donationIds } }),
      RefreshToken.deleteMany({ userId: { $in: userIds } }),
      PasswordResetOtp.deleteMany({ email: emailPattern }),
      Donor.deleteMany({ userId: { $in: userIds } }),
      Volunteer.deleteMany({ userId: { $in: userIds } }),
      NGO.deleteMany({ userId: { $in: userIds } }),
      Admin.deleteMany({ userId: { $in: userIds } }),
      User.deleteMany({ _id: { $in: userIds } }),
    ]);
  }

  await mongoose.disconnect();

  try {
    fs.unlinkSync(metaPath);
  } catch {
    /* ignore */
  }
}
