export const DASHBOARD_ROUTES = {
  donor: "/dashboard/donor",
  donorCreate: "/dashboard/donor/create",
  donorDonations: "/dashboard/donor/donations",
  donorActive: "/dashboard/donor/active",
  donorPickups: "/dashboard/donor/pickups",
  donorHistory: "/dashboard/donor/history",
  donorImpact: "/dashboard/donor/impact",
  donorImpactReports: "/dashboard/donor/impact/reports",
  donorNotifications: "/dashboard/donor/notifications",
  donorProfile: "/dashboard/donor/profile",
  donorSettings: "/dashboard/donor/settings",
  donorHelp: "/dashboard/donor/help",
  ngo: "/dashboard/ngo",
  ngoFoodRequests: "/dashboard/ngo/food-requests",
  ngoIncoming: "/dashboard/ngo/incoming",
  ngoAccepted: "/dashboard/ngo/accepted-donations",
  ngoDistributionQueue: "/dashboard/ngo/distribution-queue",
  ngoDeliveries: "/dashboard/ngo/deliveries",
  ngoReceive: "/dashboard/ngo/receive",
  ngoInventory: "/dashboard/ngo/inventory",
  ngoBeneficiaries: "/dashboard/ngo/beneficiaries",
  ngoDistribution: "/dashboard/ngo/distribution",
  ngoVolunteers: "/dashboard/ngo/volunteers",
  ngoImpact: "/dashboard/ngo/impact",
  ngoReports: "/dashboard/ngo/reports",
  ngoMessages: "/dashboard/ngo/notifications",
  ngoNotifications: "/dashboard/ngo/notifications",
  ngoProfile: "/dashboard/ngo/profile",
  ngoSettings: "/dashboard/ngo/settings",
  volunteer: "/dashboard/volunteer",
  volunteerPickups: "/dashboard/volunteer/pickups",
  volunteerActive: "/dashboard/volunteer/active",
  volunteerMissions: "/dashboard/volunteer/missions",
  volunteerRoute: "/dashboard/volunteer/route",
  volunteerPickupVerify: "/dashboard/volunteer/pickup",
  volunteerPickup: "/dashboard/volunteer/pickup",
  volunteerDeliveryVerify: "/dashboard/volunteer/delivery",
  volunteerDelivery: "/dashboard/volunteer/delivery",
  volunteerNotifications: "/dashboard/volunteer/notifications",
  volunteerImpact: "/dashboard/volunteer/impact",
  volunteerProfile: "/dashboard/volunteer/profile",
  admin: "/dashboard/admin",
};

export const ROLE_DASHBOARD_ROUTES = {
  donor: DASHBOARD_ROUTES.donor,
  ngo: DASHBOARD_ROUTES.ngo,
  volunteer: DASHBOARD_ROUTES.volunteer,
};

export function matchDonorRoute(pathname, route) {
  if (route === DASHBOARD_ROUTES.donor) {
    return pathname === DASHBOARD_ROUTES.donor;
  }
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function matchNgoRoute(pathname, route) {
  if (route === DASHBOARD_ROUTES.ngo) {
    return pathname === DASHBOARD_ROUTES.ngo;
  }
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function matchVolunteerRoute(pathname, route) {
  if (route === DASHBOARD_ROUTES.volunteer) {
    return pathname === DASHBOARD_ROUTES.volunteer;
  }
  return pathname === route || pathname.startsWith(`${route}/`);
}
