import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import NGO from "../pages/NGO/NGO";
import Contact from "../pages/Contact/Contact";

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
    </Routes>
  );
};

export default AppRoutes;