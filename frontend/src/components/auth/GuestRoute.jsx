import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getDashboardRouteForRole } from "../../utils/authStorage.js";

/**
 * Redirect authenticated users away from login/register pages.
 */
export default function GuestRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-[#DCFCE7] border-t-[#16A34A]"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (isAuthenticated && user?.role) {
    return <Navigate to={getDashboardRouteForRole(user.role)} replace />;
  }

  return children;
}
