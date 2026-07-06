import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import NGO from "../pages/NGO/NGO";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import DonorOnboarding from "../pages/Onboarding/DonorOnboarding";
import NGOOnboarding from "../pages/Onboarding/NGOOnboarding";
import VolunteerOnboarding from "../pages/Onboarding/VolunteerOnboarding";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import DonorDashboard from "../pages/Dashboard/DonorDashboard";
import CreateDonation from "../pages/Dashboard/CreateDonation";
import MyDonations from "../pages/Dashboard/MyDonations";
import ScheduledPickups from "../pages/Dashboard/ScheduledPickups";
import MyImpact from "../pages/Dashboard/MyImpact";
import ActiveDonations from "../pages/Dashboard/ActiveDonations";
import DonationHistory from "../pages/Dashboard/DonationHistory";
import ImpactReports from "../pages/Dashboard/ImpactReports";
import NGODashboard from "../pages/Dashboard/NGODashboard";
import NGOIncomingDonations from "../pages/Dashboard/NGOIncomingDonations";
import NGOActiveDeliveries from "../pages/Dashboard/NGOActiveDeliveries";
import NGOReceiveFood from "../pages/Dashboard/NGOReceiveFood";
import NGOInventory from "../pages/Dashboard/NGOInventory";
import NGODistributionRecords from "../pages/Dashboard/NGODistributionRecords";
import NGOImpactAnalytics from "../pages/Dashboard/NGOImpactAnalytics";
import NGONotifications from "../pages/Dashboard/NGONotifications";
import NGOProfileCapacity from "../pages/Dashboard/NGOProfileCapacity";
import NGOSettings from "../pages/Dashboard/NGOSettings";
import VolunteerDashboard from "../pages/Dashboard/VolunteerDashboard";
import VolunteerAvailablePickups from "../pages/Dashboard/VolunteerAvailablePickups";
import VolunteerActiveMission from "../pages/Dashboard/VolunteerActiveMission";
import VolunteerMyMissions from "../pages/Dashboard/VolunteerMyMissions";
import VolunteerRouteNavigation from "../pages/Dashboard/VolunteerRouteNavigation";
import VolunteerPickupVerification from "../pages/Dashboard/VolunteerPickupVerification";
import VolunteerDeliveryVerification from "../pages/Dashboard/VolunteerDeliveryVerification";
import VolunteerNotifications from "../pages/Dashboard/VolunteerNotifications";
import VolunteerImpact from "../pages/Dashboard/VolunteerImpact";
import VolunteerProfile from "../pages/Dashboard/VolunteerProfile";
import Notifications from "../pages/Dashboard/Notifications";
import Profile from "../pages/Dashboard/Profile";
import Settings from "../pages/Dashboard/Settings";
import HelpSupport from "../pages/Dashboard/HelpSupport";

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
        path="/onboarding/donor"
        element={
          <Layout>
            <DonorOnboarding />
          </Layout>
        }
      />
      <Route
        path="/onboarding/ngo"
        element={
          <Layout>
            <NGOOnboarding />
          </Layout>
        }
      />
      <Route
        path="/onboarding/volunteer"
        element={
          <Layout>
            <VolunteerOnboarding />
          </Layout>
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
      <Route path="/dashboard/donor" element={<DonorDashboard />} />
      <Route path="/dashboard/donor/create" element={<CreateDonation />} />
      <Route path="/dashboard/donor/donations" element={<MyDonations />} />
      <Route path="/dashboard/donor/pickups" element={<ScheduledPickups />} />
      <Route path="/dashboard/donor/active" element={<ActiveDonations />} />
      <Route path="/dashboard/donor/history" element={<DonationHistory />} />
      <Route path="/dashboard/donor/impact" element={<MyImpact />} />
      <Route path="/dashboard/donor/impact/reports" element={<ImpactReports />} />
      <Route path="/dashboard/donor/notifications" element={<Notifications />} />
      <Route path="/dashboard/donor/profile" element={<Profile />} />
      <Route path="/dashboard/donor/settings" element={<Settings />} />
      <Route path="/dashboard/donor/help" element={<HelpSupport />} />
      <Route path="/dashboard/ngo" element={<NGODashboard />} />
      <Route path="/dashboard/ngo/incoming" element={<NGOIncomingDonations />} />
      <Route path="/dashboard/ngo/deliveries" element={<NGOActiveDeliveries />} />
      <Route path="/dashboard/ngo/receive" element={<NGOReceiveFood />} />
      <Route path="/dashboard/ngo/inventory" element={<NGOInventory />} />
      <Route path="/dashboard/ngo/distribution" element={<NGODistributionRecords />} />
      <Route path="/dashboard/ngo/impact" element={<NGOImpactAnalytics />} />
      <Route path="/dashboard/ngo/notifications" element={<NGONotifications />} />
      <Route path="/dashboard/ngo/profile" element={<NGOProfileCapacity />} />
      <Route path="/dashboard/ngo/settings" element={<NGOSettings />} />
      <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
      <Route path="/dashboard/volunteer/pickups" element={<VolunteerAvailablePickups />} />
      <Route path="/dashboard/volunteer/active" element={<VolunteerActiveMission />} />
      <Route path="/dashboard/volunteer/missions" element={<VolunteerMyMissions />} />
      <Route path="/dashboard/volunteer/route" element={<VolunteerRouteNavigation />} />
      <Route path="/dashboard/volunteer/pickup-verify" element={<VolunteerPickupVerification />} />
      <Route path="/dashboard/volunteer/delivery-verify" element={<VolunteerDeliveryVerification />} />
      <Route path="/dashboard/volunteer/notifications" element={<VolunteerNotifications />} />
      <Route path="/dashboard/volunteer/impact" element={<VolunteerImpact />} />
      <Route path="/dashboard/volunteer/profile" element={<VolunteerProfile />} />
    </Routes>
  );
};

export default AppRoutes;