import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useAuthPrompt } from "../context/AuthPromptContext.jsx";
import { getDashboardRouteForRole } from "../utils/authStorage.js";

/**
 * Runs an action when authenticated; otherwise opens the login/create-account modal.
 */
export function useProtectedAction() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { promptLogin } = useAuthPrompt();

  const runProtected = useCallback(
    (action, { message, requiredRole } = {}) => {
      if (!isAuthenticated) {
        promptLogin(message);
        return false;
      }

      if (requiredRole && user?.role !== requiredRole) {
        navigate("/403", {
          replace: false,
          state: { requiredRoles: [requiredRole] },
        });
        return false;
      }

      action?.();
      return true;
    },
    [isAuthenticated, user, promptLogin, navigate],
  );

  const goToDashboard = useCallback(
    (role, message) => {
      runProtected(
        () => navigate(getDashboardRouteForRole(role)),
        { message, requiredRole: role },
      );
    },
    [runProtected, navigate],
  );

  return { runProtected, goToDashboard, isAuthenticated, user };
}

export default useProtectedAction;
