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
  volunteer: "/dashboard/volunteer",
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
