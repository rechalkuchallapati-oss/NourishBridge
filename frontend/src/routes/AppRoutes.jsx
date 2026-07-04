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
    </Routes>
  );
};

export default AppRoutes;