import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import AuthLoadingScreen from "./AuthLoadingScreen.jsx";

/**
 * Protects routes — requires JWT session and optional role match.
 * Unauthorized role → 403 page (not silent redirect).
 *
 * @param {string[]} [allowedRoles] — e.g. ["admin"], ["ngo"]
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/403"
        replace
        state={{
          from: location.pathname,
          requiredRoles: allowedRoles,
        }}
      />
    );
  }

  return children ?? <Outlet />;
}
