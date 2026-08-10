import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getDashboardRouteForRole } from "../../utils/authStorage.js";
import AuthLoadingScreen from "./AuthLoadingScreen.jsx";

/**
 * Redirect authenticated users away from login/register pages.
 */
export default function GuestRoute({ children }) {
  const { isAuthenticated, isInitializing, user } = useAuth();

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated && user?.role) {
    return <Navigate to={getDashboardRouteForRole(user.role)} replace />;
  }

  return children;
}
