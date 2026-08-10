import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import GuestRoute from "../components/auth/GuestRoute";
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
import DonorDashboard from "../pages/Dashboard/DonorDashboard";
import CreateDonation from "../pages/Dashboard/CreateDonation";
import DonationDetail from "../pages/Dashboard/DonationDetail";
import MyDonations from "../pages/Dashboard/MyDonations";
import ScheduledPickups from "../pages/Dashboard/ScheduledPickups";
import MyImpact from "../pages/Dashboard/MyImpact";
import ActiveDonations from "../pages/Dashboard/ActiveDonations";
import DonationHistory from "../pages/Dashboard/DonationHistory";
import ImpactReports from "../pages/Dashboard/ImpactReports";
import NGODashboard from "../pages/Dashboard/NGODashboard";
import NGOFoodRequests from "../pages/Dashboard/NGOFoodRequests";
import NGOIncomingDonations from "../pages/Dashboard/NGOIncomingDonations";
import NGOAcceptedDonations from "../pages/Dashboard/NGOAcceptedDonations";
import NGODistributionQueue from "../pages/Dashboard/NGODistributionQueue";
import NGOBeneficiaries from "../pages/Dashboard/NGOBeneficiaries";
import NGOVolunteers from "../pages/Dashboard/NGOVolunteers";
import NGOActiveDeliveries from "../pages/Dashboard/NGOActiveDeliveries";
import NGOReceiveFood from "../pages/Dashboard/NGOReceiveFood";
import NGOInventory from "../pages/Dashboard/NGOInventory";
import NGODistributionRecords from "../pages/Dashboard/NGODistributionRecords";
import NGOImpactAnalytics from "../pages/Dashboard/NGOImpactAnalytics";
import NGOReports from "../pages/Dashboard/NGOReports";
import NGONotifications from "../pages/Dashboard/NGONotifications";
import NGOProfileCapacity from "../pages/Dashboard/NGOProfileCapacity";
import NGOSettings from "../pages/Dashboard/NGOSettings";
import VolunteerDashboard from "../pages/Dashboard/VolunteerDashboard";
import VolunteerAvailablePickups from "../pages/Dashboard/VolunteerAvailablePickups";
import VolunteerActiveMission from "../pages/Dashboard/VolunteerActiveMission";
import VolunteerMyMissions from "../pages/Dashboard/VolunteerMyMissions";
import VolunteerRouteNavigation from "../pages/Dashboard/VolunteerRouteNavigation";
import VolunteerPickup from "../pages/Dashboard/VolunteerPickup";
import VolunteerDelivery from "../pages/Dashboard/VolunteerDelivery";
import VolunteerNotifications from "../pages/Dashboard/VolunteerNotifications";
import VolunteerImpact from "../pages/Dashboard/VolunteerImpact";
import VolunteerProfile from "../pages/Dashboard/VolunteerProfile";
import Notifications from "../pages/Dashboard/Notifications";
import Profile from "../pages/Dashboard/Profile";
import Settings from "../pages/Dashboard/Settings";
import HelpSupport from "../pages/Dashboard/HelpSupport";
import VolunteerShell from "../components/dashboard/VolunteerShell";
import AdminShell from "../components/dashboard/AdminShell";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminNgos from "../pages/Admin/AdminNgos";
import AdminProfile from "../pages/Admin/AdminProfile";
import AdminDonors from "../pages/Admin/AdminDonors";
import AdminSupportTickets from "../pages/Admin/AdminSupportTickets";
import AdminSystemSettings from "../pages/Admin/AdminSystemSettings";
import AdminNotifications from "../pages/Admin/AdminNotifications";
import AdminAuditLogs from "../pages/Admin/AdminAuditLogs";
import AdminReports from "../pages/Admin/AdminReports";
import AdminInventory from "../pages/Admin/AdminInventory";
import AdminDonations from "../pages/Admin/AdminDonations";
import AdminVolunteers from "../pages/Admin/AdminVolunteers";
import AdminFoodRequests from "../pages/Admin/AdminFoodRequests";
import AdminDeliveries from "../pages/Admin/AdminDeliveries";
import Forbidden403 from "../pages/Forbidden/Forbidden403";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/ngo"
        element={
          <Layout>
            <NGO />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Layout>
            <ForgotPassword />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/onboarding/donor"
        element={
          <GuestRoute>
            <Layout>
              <DonorOnboarding />
            </Layout>
          </GuestRoute>
        }
      />
      <Route
        path="/onboarding/ngo"
        element={
          <GuestRoute>
            <Layout>
              <NGOOnboarding />
            </Layout>
          </GuestRoute>
        }
      />
      <Route
        path="/onboarding/volunteer"
        element={
          <GuestRoute>
            <Layout>
              <VolunteerOnboarding />
            </Layout>
          </GuestRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <Layout>
            <VerifyOTP />
          </Layout>
        }
      />
      <Route
        path="/403"
        element={
          <Layout>
            <Forbidden403 />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute allowedRoles={["donor"]} />}>
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
        <Route path="/dashboard/donor/create" element={<CreateDonation />} />
        <Route path="/dashboard/donor/donations" element={<MyDonations />} />
        <Route path="/dashboard/donor/donations/:id" element={<DonationDetail />} />
        <Route path="/dashboard/donor/donations/:id/edit" element={<CreateDonation />} />
        <Route path="/dashboard/donor/pickups" element={<ScheduledPickups />} />
        <Route path="/dashboard/donor/active" element={<ActiveDonations />} />
        <Route path="/dashboard/donor/history" element={<DonationHistory />} />
        <Route path="/dashboard/donor/impact" element={<MyImpact />} />
        <Route path="/dashboard/donor/impact/reports" element={<ImpactReports />} />
        <Route path="/dashboard/donor/notifications" element={<Notifications />} />
        <Route path="/dashboard/donor/profile" element={<Profile />} />
        <Route path="/dashboard/donor/settings" element={<Settings />} />
        <Route path="/dashboard/donor/help" element={<HelpSupport />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["ngo"]} />}>
        <Route path="/dashboard/ngo" element={<NGODashboard />} />
        <Route path="/dashboard/ngo/food-requests" element={<NGOFoodRequests />} />
        <Route path="/dashboard/ngo/incoming" element={<NGOIncomingDonations />} />
        <Route path="/dashboard/ngo/accepted-donations" element={<NGOAcceptedDonations />} />
        <Route path="/dashboard/ngo/distribution-queue" element={<NGODistributionQueue />} />
        <Route path="/dashboard/ngo/deliveries" element={<NGOActiveDeliveries />} />
        <Route path="/dashboard/ngo/receive" element={<NGOReceiveFood />} />
        <Route path="/dashboard/ngo/inventory" element={<NGOInventory />} />
        <Route path="/dashboard/ngo/beneficiaries" element={<NGOBeneficiaries />} />
        <Route path="/dashboard/ngo/volunteers" element={<NGOVolunteers />} />
        <Route path="/dashboard/ngo/distribution" element={<NGODistributionRecords />} />
        <Route path="/dashboard/ngo/impact" element={<NGOImpactAnalytics />} />
        <Route path="/dashboard/ngo/reports" element={<NGOReports />} />
        <Route path="/dashboard/ngo/notifications" element={<NGONotifications />} />
        <Route path="/dashboard/ngo/profile" element={<NGOProfileCapacity />} />
        <Route path="/dashboard/ngo/settings" element={<NGOSettings />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["volunteer"]} />}>
        <Route path="/dashboard/volunteer" element={<VolunteerShell />}>
          <Route index element={<VolunteerDashboard />} />
          <Route path="pickups" element={<VolunteerAvailablePickups />} />
          <Route path="active" element={<VolunteerActiveMission />} />
          <Route path="missions" element={<VolunteerMyMissions />} />
          <Route path="route" element={<VolunteerRouteNavigation />} />
          <Route path="pickup-verify" element={<VolunteerPickup />} />
          <Route path="pickup" element={<VolunteerPickup />} />
          <Route path="delivery-verify" element={<VolunteerDelivery />} />
          <Route path="delivery" element={<VolunteerDelivery />} />
          <Route path="notifications" element={<VolunteerNotifications />} />
          <Route path="impact" element={<VolunteerImpact />} />
          <Route path="profile" element={<VolunteerProfile />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard/admin" element={<AdminShell />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="ngos" element={<AdminNgos />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="volunteers" element={<AdminVolunteers />} />
          <Route path="donors" element={<AdminDonors />} />
          <Route path="food-requests" element={<AdminFoodRequests />} />
          <Route path="deliveries" element={<AdminDeliveries />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="support-tickets" element={<AdminSupportTickets />} />
          <Route path="system-settings" element={<AdminSystemSettings />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
