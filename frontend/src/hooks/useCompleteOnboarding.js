import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { getDashboardRouteForRole } from "../utils/authStorage.js";
import { getApiErrorMessage } from "../utils/apiErrors.js";

/**
 * Shared onboarding completion — registers via backend and redirects to role dashboard.
 */
export function useCompleteOnboarding() {
  const navigate = useNavigate();
  const { registerFromOnboarding } = useAuth();

  return async (onboardingFields) => {
    try {
      const sessionUser = await registerFromOnboarding(onboardingFields);
      toast.success("Account created successfully! Welcome to NourishBridge.");
      navigate(getDashboardRouteForRole(sessionUser.role), { replace: true });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("[onboarding] registration failed", error);
      }
      const message = getApiErrorMessage(error, "Registration failed. Please try again.");
      toast.error(message);
      throw new Error(message);
    }
  };
}

export default useCompleteOnboarding;
