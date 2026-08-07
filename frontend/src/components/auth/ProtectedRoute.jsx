import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getDashboardRouteForRole } from "../../utils/authStorage.js";

/**
 * Full-page loading indicator while auth state is restored from tokens.
 */
function AuthLoadingScreen() {
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

/**
 * Protects routes — requires JWT session and optional role match.
 *
 * @param {string[]} [allowedRoles] — e.g. ["admin"], ["ngo"]
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardRouteForRole(user.role)} replace />;
  }

  return children ?? <Outlet />;
}
