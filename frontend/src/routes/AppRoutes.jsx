import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import GuestRoute from "../components/auth/GuestRoute";
import Skeleton from "../components/ui/Skeleton";

import Home from "../pages/Home/Home";
import NGO from "../pages/NGO/NGO";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Register from "../pages/Register/Register";
import DonorOnboarding from "../pages/Onboarding/DonorOnboarding";
import NGOOnboarding from "../pages/Onboarding/NGOOnboarding";
import VolunteerOnboarding from "../pages/Onboarding/VolunteerOnboarding";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import Forbidden403 from "../pages/Forbidden/Forbidden403";
import VolunteerShell from "../components/dashboard/VolunteerShell";
import AdminShell from "../components/dashboard/AdminShell";

const DonorDashboard = lazy(() => import("../pages/Dashboard/DonorDashboard"));
const CreateDonation = lazy(() => import("../pages/Dashboard/CreateDonation"));
const DonationDetail = lazy(() => import("../pages/Dashboard/DonationDetail"));
const MyDonations = lazy(() => import("../pages/Dashboard/MyDonations"));
const ScheduledPickups = lazy(() => import("../pages/Dashboard/ScheduledPickups"));
const MyImpact = lazy(() => import("../pages/Dashboard/MyImpact"));
const ActiveDonations = lazy(() => import("../pages/Dashboard/ActiveDonations"));
const DonationHistory = lazy(() => import("../pages/Dashboard/DonationHistory"));
const ImpactReports = lazy(() => import("../pages/Dashboard/ImpactReports"));
const Notifications = lazy(() => import("../pages/Dashboard/Notifications"));
const Profile = lazy(() => import("../pages/Dashboard/Profile"));
const Settings = lazy(() => import("../pages/Dashboard/Settings"));
const HelpSupport = lazy(() => import("../pages/Dashboard/HelpSupport"));

const NGODashboard = lazy(() => import("../pages/Dashboard/NGODashboard"));
const NGOFoodRequests = lazy(() => import("../pages/Dashboard/NGOFoodRequests"));
const NGOIncomingDonations = lazy(() => import("../pages/Dashboard/NGOIncomingDonations"));
const NGOBrowseDonations = lazy(() => import("../pages/Dashboard/NGOBrowseDonations"));
const NGOAcceptedDonations = lazy(() => import("../pages/Dashboard/NGOAcceptedDonations"));
const NGODistributionQueue = lazy(() => import("../pages/Dashboard/NGODistributionQueue"));
const NGOBeneficiaries = lazy(() => import("../pages/Dashboard/NGOBeneficiaries"));
const NGOVolunteers = lazy(() => import("../pages/Dashboard/NGOVolunteers"));
const NGOActiveDeliveries = lazy(() => import("../pages/Dashboard/NGOActiveDeliveries"));
const NGOReceiveFood = lazy(() => import("../pages/Dashboard/NGOReceiveFood"));
const NGOInventory = lazy(() => import("../pages/Dashboard/NGOInventory"));
const NGODistributionRecords = lazy(() => import("../pages/Dashboard/NGODistributionRecords"));
const NGOImpactAnalytics = lazy(() => import("../pages/Dashboard/NGOImpactAnalytics"));
const NGOReports = lazy(() => import("../pages/Dashboard/NGOReports"));
const NGONotifications = lazy(() => import("../pages/Dashboard/NGONotifications"));
const NGOProfileCapacity = lazy(() => import("../pages/Dashboard/NGOProfileCapacity"));
const NGOSettings = lazy(() => import("../pages/Dashboard/NGOSettings"));

const VolunteerDashboard = lazy(() => import("../pages/Dashboard/VolunteerDashboard"));
const VolunteerAvailablePickups = lazy(() => import("../pages/Dashboard/VolunteerAvailablePickups"));
const VolunteerActiveMission = lazy(() => import("../pages/Dashboard/VolunteerActiveMission"));
const VolunteerMyMissions = lazy(() => import("../pages/Dashboard/VolunteerMyMissions"));
const VolunteerRouteNavigation = lazy(() => import("../pages/Dashboard/VolunteerRouteNavigation"));
const VolunteerPickup = lazy(() => import("../pages/Dashboard/VolunteerPickup"));
const VolunteerDelivery = lazy(() => import("../pages/Dashboard/VolunteerDelivery"));
const VolunteerNotifications = lazy(() => import("../pages/Dashboard/VolunteerNotifications"));
const VolunteerImpact = lazy(() => import("../pages/Dashboard/VolunteerImpact"));
const VolunteerProfile = lazy(() => import("../pages/Dashboard/VolunteerProfile"));

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const AdminUsers = lazy(() => import("../pages/Admin/AdminUsers"));
const AdminNgos = lazy(() => import("../pages/Admin/AdminNgos"));
const AdminProfile = lazy(() => import("../pages/Admin/AdminProfile"));
const AdminDonors = lazy(() => import("../pages/Admin/AdminDonors"));
const AdminSupportTickets = lazy(() => import("../pages/Admin/AdminSupportTickets"));
const AdminSystemSettings = lazy(() => import("../pages/Admin/AdminSystemSettings"));
const AdminNotifications = lazy(() => import("../pages/Admin/AdminNotifications"));
const AdminAuditLogs = lazy(() => import("../pages/Admin/AdminAuditLogs"));
const AdminReports = lazy(() => import("../pages/Admin/AdminReports"));
const AdminInventory = lazy(() => import("../pages/Admin/AdminInventory"));
const AdminDonations = lazy(() => import("../pages/Admin/AdminDonations"));
const AdminVolunteers = lazy(() => import("../pages/Admin/AdminVolunteers"));
const AdminFoodRequests = lazy(() => import("../pages/Admin/AdminFoodRequests"));
const AdminDeliveries = lazy(() => import("../pages/Admin/AdminDeliveries"));

function PageLoader({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-8">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/ngo" element={<Layout><NGO /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/onboarding/donor" element={<GuestRoute><Layout><DonorOnboarding /></Layout></GuestRoute>} />
      <Route path="/onboarding/ngo" element={<GuestRoute><Layout><NGOOnboarding /></Layout></GuestRoute>} />
      <Route path="/onboarding/volunteer" element={<GuestRoute><Layout><VolunteerOnboarding /></Layout></GuestRoute>} />
      <Route path="/verify-otp" element={<Layout><VerifyOTP /></Layout>} />
      <Route path="/403" element={<Layout><Forbidden403 /></Layout>} />

      <Route element={<ProtectedRoute allowedRoles={["donor"]} />}>
        <Route path="/dashboard/donor" element={<PageLoader><DonorDashboard /></PageLoader>} />
        <Route path="/dashboard/donor/create" element={<PageLoader><CreateDonation /></PageLoader>} />
        <Route path="/dashboard/donor/donations" element={<PageLoader><MyDonations /></PageLoader>} />
        <Route path="/dashboard/donor/donations/:id" element={<PageLoader><DonationDetail /></PageLoader>} />
        <Route path="/dashboard/donor/donations/:id/edit" element={<PageLoader><CreateDonation /></PageLoader>} />
        <Route path="/dashboard/donor/pickups" element={<PageLoader><ScheduledPickups /></PageLoader>} />
        <Route path="/dashboard/donor/active" element={<PageLoader><ActiveDonations /></PageLoader>} />
        <Route path="/dashboard/donor/history" element={<PageLoader><DonationHistory /></PageLoader>} />
        <Route path="/dashboard/donor/impact" element={<PageLoader><MyImpact /></PageLoader>} />
        <Route path="/dashboard/donor/impact/reports" element={<PageLoader><ImpactReports /></PageLoader>} />
        <Route path="/dashboard/donor/notifications" element={<PageLoader><Notifications /></PageLoader>} />
        <Route path="/dashboard/donor/profile" element={<PageLoader><Profile /></PageLoader>} />
        <Route path="/dashboard/donor/settings" element={<PageLoader><Settings /></PageLoader>} />
        <Route path="/dashboard/donor/help" element={<PageLoader><HelpSupport /></PageLoader>} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ngo"]} />}>
        <Route path="/dashboard/ngo" element={<PageLoader><NGODashboard /></PageLoader>} />
        <Route path="/dashboard/ngo/food-requests" element={<PageLoader><NGOFoodRequests /></PageLoader>} />
        <Route path="/dashboard/ngo/incoming" element={<PageLoader><NGOIncomingDonations /></PageLoader>} />
        <Route path="/dashboard/ngo/browse" element={<PageLoader><NGOBrowseDonations /></PageLoader>} />
        <Route path="/dashboard/ngo/accepted-donations" element={<PageLoader><NGOAcceptedDonations /></PageLoader>} />
        <Route path="/dashboard/ngo/distribution-queue" element={<PageLoader><NGODistributionQueue /></PageLoader>} />
        <Route path="/dashboard/ngo/deliveries" element={<PageLoader><NGOActiveDeliveries /></PageLoader>} />
        <Route path="/dashboard/ngo/receive" element={<PageLoader><NGOReceiveFood /></PageLoader>} />
        <Route path="/dashboard/ngo/inventory" element={<PageLoader><NGOInventory /></PageLoader>} />
        <Route path="/dashboard/ngo/beneficiaries" element={<PageLoader><NGOBeneficiaries /></PageLoader>} />
        <Route path="/dashboard/ngo/volunteers" element={<PageLoader><NGOVolunteers /></PageLoader>} />
        <Route path="/dashboard/ngo/distribution" element={<PageLoader><NGODistributionRecords /></PageLoader>} />
        <Route path="/dashboard/ngo/impact" element={<PageLoader><NGOImpactAnalytics /></PageLoader>} />
        <Route path="/dashboard/ngo/reports" element={<PageLoader><NGOReports /></PageLoader>} />
        <Route path="/dashboard/ngo/notifications" element={<PageLoader><NGONotifications /></PageLoader>} />
        <Route path="/dashboard/ngo/profile" element={<PageLoader><NGOProfileCapacity /></PageLoader>} />
        <Route path="/dashboard/ngo/settings" element={<PageLoader><NGOSettings /></PageLoader>} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["volunteer"]} />}>
        <Route path="/dashboard/volunteer" element={<VolunteerShell />}>
          <Route index element={<PageLoader><VolunteerDashboard /></PageLoader>} />
          <Route path="pickups" element={<PageLoader><VolunteerAvailablePickups /></PageLoader>} />
          <Route path="active" element={<PageLoader><VolunteerActiveMission /></PageLoader>} />
          <Route path="missions" element={<PageLoader><VolunteerMyMissions /></PageLoader>} />
          <Route path="route" element={<PageLoader><VolunteerRouteNavigation /></PageLoader>} />
          <Route path="pickup-verify" element={<PageLoader><VolunteerPickup /></PageLoader>} />
          <Route path="pickup" element={<PageLoader><VolunteerPickup /></PageLoader>} />
          <Route path="delivery-verify" element={<PageLoader><VolunteerDelivery /></PageLoader>} />
          <Route path="delivery" element={<PageLoader><VolunteerDelivery /></PageLoader>} />
          <Route path="notifications" element={<PageLoader><VolunteerNotifications /></PageLoader>} />
          <Route path="impact" element={<PageLoader><VolunteerImpact /></PageLoader>} />
          <Route path="profile" element={<PageLoader><VolunteerProfile /></PageLoader>} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<AdminShell />}>
          <Route index element={<PageLoader><AdminDashboard /></PageLoader>} />
          <Route path="users" element={<PageLoader><AdminUsers /></PageLoader>} />
          <Route path="ngos" element={<PageLoader><AdminNgos /></PageLoader>} />
          <Route path="donations" element={<PageLoader><AdminDonations /></PageLoader>} />
          <Route path="volunteers" element={<PageLoader><AdminVolunteers /></PageLoader>} />
          <Route path="donors" element={<PageLoader><AdminDonors /></PageLoader>} />
          <Route path="food-requests" element={<PageLoader><AdminFoodRequests /></PageLoader>} />
          <Route path="deliveries" element={<PageLoader><AdminDeliveries /></PageLoader>} />
          <Route path="inventory" element={<PageLoader><AdminInventory /></PageLoader>} />
          <Route path="reports" element={<PageLoader><AdminReports /></PageLoader>} />
          <Route path="notifications" element={<PageLoader><AdminNotifications /></PageLoader>} />
          <Route path="support-tickets" element={<PageLoader><AdminSupportTickets /></PageLoader>} />
          <Route path="system-settings" element={<PageLoader><AdminSystemSettings /></PageLoader>} />
          <Route path="audit-logs" element={<PageLoader><AdminAuditLogs /></PageLoader>} />
          <Route path="profile" element={<PageLoader><AdminProfile /></PageLoader>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
