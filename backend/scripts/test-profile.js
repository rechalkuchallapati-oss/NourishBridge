/**
 * Phase 1 profile API tests.
 * Run: node scripts/test-profile.js
 * Requires MongoDB + running server.
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
const API = `http://localhost:${PORT}/api/v1`;
const ts = Date.now();

const passes = [];
const failures = [];

function pass(label) {
  passes.push(label);
  console.log(`✓ ${label}`);
}

function fail(label, detail = "") {
  failures.push({ label, detail });
  console.error(`✗ ${label}${detail ? ` — ${detail}` : ""}`);
}

async function request(method, url, body, token, isFormData = false) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(url, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* empty */
  }

  return { status: res.status, data };
}

async function registerUser(payload) {
  return request("POST", `${API}/auth/register`, payload);
}

async function loginUser(email, password) {
  return request("POST", `${API}/auth/login`, { email, password });
}

const MINIMAL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

async function uploadProfileImage(token) {
  const formData = new FormData();
  formData.append("image", new Blob([MINIMAL_PNG], { type: "image/png" }), "profile-test.png");
  return request("POST", `${API}/profile/image`, formData, token, true);
}

async function testDonorProfile() {
  const donorEmail = `profile.donor.${ts}@example.com`;
  const reg = await registerUser({
    fullName: "Profile Test Donor",
    email: donorEmail,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role: "donor",
    address: {
      line1: "123 Profile St",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
    },
    profile: { donorType: "individual" },
  });

  if (reg.status !== 201) {
    fail("Register donor for profile tests", JSON.stringify(reg.data));
    return null;
  }

  const token = reg.data.data.accessToken;
  pass("Registered test donor");

  const getProfile = await request("GET", `${API}/profile`, null, token);
  if (getProfile.status === 200 && getProfile.data.data?.profile?.common?.email === donorEmail) {
    pass("GET /profile returns authenticated donor profile");
  } else {
    fail("GET /profile (donor)", `status ${getProfile.status}`);
  }

  const patch = await request(
    "PATCH",
    `${API}/profile`,
    {
      common: { fullName: "Updated Donor Name", phone: "9123456789" },
      roleProfile: {
        organizationName: "Green Kitchen",
        contactPerson: "Updated Person",
        pickupLocations: [{ label: "Main", addressLine: "456 Pickup Lane, Hyderabad" }],
      },
    },
    token,
  );

  if (patch.status === 200 && patch.data.data?.profile?.common?.fullName === "Updated Donor Name") {
    pass("PATCH /profile updates common and donor fields");
  } else {
    fail("PATCH /profile (donor)", `status ${patch.status}`);
  }

  const invalidPhone = await request(
    "PATCH",
    `${API}/profile`,
    { common: { phone: "123" } },
    token,
  );
  if (invalidPhone.status === 400) {
    pass("PATCH /profile rejects invalid phone");
  } else {
    fail("Profile validation (invalid phone)", `expected 400, got ${invalidPhone.status}`);
  }

  const impact = await request("GET", `${API}/profile/impact`, null, token);
  if (impact.status === 200 && impact.data.data?.statistics) {
    pass("GET /profile/impact returns donor statistics");
  } else {
    fail("GET /profile/impact (donor)", `status ${impact.status}`);
  }

  const imageUpload = await uploadProfileImage(token);
  if (
    imageUpload.status === 200 &&
    imageUpload.data.data?.profile?.common?.profileImage
  ) {
    pass("POST /profile/image uploads donor profile image");
  } else {
    fail("POST /profile/image (donor)", `status ${imageUpload.status}`);
  }

  return token;
}

async function testNgoProfile() {
  const ngoEmail = `profile.ngo.${ts}@example.com`;
  const reg = await registerUser({
    fullName: "Profile Test NGO",
    email: ngoEmail,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543211",
    role: "ngo",
    address: {
      line1: "NGO Office",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
    },
    profile: {
      ngoName: "Hope Foundation",
      registrationNumber: `REG${ts}`,
    },
  });

  if (reg.status !== 201) {
    fail("Register NGO for profile tests", JSON.stringify(reg.data));
    return;
  }

  const token = reg.data.data.accessToken;
  pass("Registered test NGO");

  const patch = await request(
    "PATCH",
    `${API}/profile`,
    {
      roleProfile: {
        organizationName: "Hope Foundation Updated",
        maxDailyCapacityKg: 500,
        maxDailyMeals: 200,
        foodTypesAccepted: ["cooked", "packaged"],
        availabilityStatus: "available",
        serviceAreas: ["Hyderabad Central"],
      },
    },
    token,
  );

  if (
    patch.status === 200 &&
    patch.data.data?.profile?.roleProfile?.organizationName === "Hope Foundation Updated"
  ) {
    pass("PATCH /profile updates NGO capacity fields");
  } else {
    fail("PATCH /profile (NGO)", `status ${patch.status}`);
  }

  const impact = await request("GET", `${API}/profile/impact`, null, token);
  if (impact.status === 200 && impact.data.data?.role === "ngo") {
    pass("GET /profile/impact returns NGO statistics");
  } else {
    fail("GET /profile/impact (NGO)", `status ${impact.status}`);
  }
}

async function testVolunteerProfile() {
  const volunteerEmail = `profile.volunteer.${ts}@example.com`;
  const reg = await registerUser({
    fullName: "Profile Test Volunteer",
    email: volunteerEmail,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543212",
    role: "volunteer",
    address: {
      line1: "Volunteer Home",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
    },
    profile: { vehicleType: "bike" },
  });

  if (reg.status !== 201) {
    fail("Register volunteer for profile tests", JSON.stringify(reg.data));
    return;
  }

  const token = reg.data.data.accessToken;
  pass("Registered test volunteer");

  const patch = await request(
    "PATCH",
    `${API}/profile`,
    {
      common: { fullName: "Updated Volunteer" },
      roleProfile: {
        vehicleType: "car",
        vehicleDetails: "Honda City",
        serviceRadiusKm: 15,
        isAvailable: true,
        serviceAreas: ["Secunderabad"],
      },
    },
    token,
  );

  if (
    patch.status === 200 &&
    patch.data.data?.profile?.roleProfile?.vehicleDetails === "Honda City"
  ) {
    pass("PATCH /profile updates volunteer fields");
  } else {
    fail("PATCH /profile (volunteer)", `status ${patch.status}`);
  }

  const impact = await request("GET", `${API}/profile/impact`, null, token);
  if (impact.status === 200 && impact.data.data?.role === "volunteer") {
    pass("GET /profile/impact returns volunteer statistics");
  } else {
    fail("GET /profile/impact (volunteer)", `status ${impact.status}`);
  }
}

async function testAdminProfile() {
  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "AdminPass123";

  const login = await loginUser(adminEmail, adminPassword);
  if (login.status !== 200) {
    fail("Login admin for profile tests", `status ${login.status}`);
    return;
  }

  const token = login.data.data.accessToken;
  pass("Logged in as admin");

  const getProfile = await request("GET", `${API}/profile`, null, token);
  if (getProfile.status === 200 && getProfile.data.data?.profile?.common?.role === "admin") {
    pass("GET /profile returns admin profile (auto-provisioned if needed)");
  } else {
    fail("GET /profile (admin)", `status ${getProfile.status}`);
  }

  const patch = await request(
    "PATCH",
    `${API}/profile`,
    {
      common: { phone: "9999888877" },
      roleProfile: { department: "Operations" },
    },
    token,
  );

  if (patch.status === 200 && patch.data.data?.profile?.roleProfile?.department === "Operations") {
    pass("PATCH /profile updates admin department");
  } else {
    fail("PATCH /profile (admin)", `status ${patch.status}`);
  }

  const impact = await request("GET", `${API}/profile/impact`, null, token);
  if (impact.status === 200 && impact.data.data?.statistics?.totalUsers !== undefined) {
    pass("GET /profile/impact returns admin platform statistics");
  } else {
    fail("GET /profile/impact (admin)", `status ${impact.status}`);
  }
}

async function run() {
  console.log(`\n=== Profile API Tests (port ${PORT}) ===\n`);

  await testDonorProfile();
  await testNgoProfile();
  await testVolunteerProfile();
  await testAdminProfile();

  const noToken = await request("GET", `${API}/profile`);
  if (noToken.status === 401) {
    pass("GET /profile without token returns 401");
  } else {
    fail("Unauthorized profile access", `expected 401, got ${noToken.status}`);
  }

  console.log("\n=== SUMMARY ===");
  console.log(`Passed: ${passes.length}`);
  console.log(`Failed: ${failures.length}`);

  if (failures.length) {
    failures.forEach((f, i) => console.log(`  ${i + 1}. ${f.label}: ${f.detail}`));
    process.exit(1);
  }

  console.log("\nAll profile tests passed.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
