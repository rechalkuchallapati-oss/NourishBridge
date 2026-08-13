import Donation from "../../src/models/Donation.model.js";
import Delivery from "../../src/models/Delivery.model.js";
import Inventory from "../../src/models/Inventory.model.js";
import Donor from "../../src/models/Donor.model.js";
import User from "../../src/models/User.model.js";
import { authGet, authPost } from "./auth.js";
import { donationPayload, advanceMissionThroughDelivery } from "./fixtures.js";

/**
 * Create donation via API and return id + API response.
 */
export async function createDonationViaApi(donorToken, overrides = {}) {
  const res = await authPost(donorToken, "/donations", donationPayload(overrides));
  return {
    res,
    donationId: res.body?.data?.donation?.id,
    donation: res.body?.data?.donation,
  };
}

/**
 * Run the canonical happy-path from pending donation through NGO completion.
 */
export async function runDonationToCompletion(accounts, overrides = {}) {
  const { donor, ngo, volunteer, admin } = accounts;

  const { donationId, res: createRes } = await createDonationViaApi(donor.accessToken, overrides);
  if (createRes.status !== 201 || !donationId) {
    throw new Error(`Donation create failed: ${createRes.status}`);
  }

  const verify = await authPost(admin.accessToken, `/admin/donations/${donationId}/verify`);
  if (verify.status !== 200) throw new Error(`Verify failed: ${verify.status}`);

  const accept = await authPost(ngo.accessToken, `/ngo/donations/${donationId}/accept`);
  if (accept.status !== 200) throw new Error(`Accept failed: ${accept.status}`);

  const mission = await authPost(volunteer.accessToken, `/volunteer/missions/${donationId}/accept`);
  if (mission.status !== 200) throw new Error(`Mission accept failed: ${mission.status}`);

  await advanceMissionThroughDelivery(volunteer.accessToken, donationId);

  const complete = await authPost(ngo.accessToken, `/ngo/donations/${donationId}/complete`);
  if (complete.status !== 200) throw new Error(`Complete failed: ${complete.status}`);

  const donation = await Donation.findById(donationId);
  const delivery = await Delivery.findOne({ donationId });
  const inventory = await Inventory.findOne({ sourceDonationId: donationId });

  return { donationId, donation, delivery, inventory, createRes };
}

/**
 * Re-fetch donation via API (simulates page refresh).
 */
export async function refetchDonation(token, donationId, role = "donor") {
  if (role === "donor") {
    return authGet(token, `/donations/${donationId}`);
  }
  if (role === "ngo") {
    return authGet(token, `/ngo/donations/${donationId}`);
  }
  return authGet(token, `/donations/${donationId}`);
}

export async function assertDonorOwnership(donationId, donorUserId) {
  const donor = await Donor.findOne({ userId: donorUserId });
  const donation = await Donation.findById(donationId);
  expect(donor).toBeTruthy();
  expect(donation.donorId.toString()).toBe(donor._id.toString());
  return { donor, donation };
}

export async function getUserIdByEmail(email) {
  const user = await User.findOne({ email: email.toLowerCase() });
  return user?._id;
}
