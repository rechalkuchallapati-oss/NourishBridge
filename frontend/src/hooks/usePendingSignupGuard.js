import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPendingSignup } from "../modules/auth/utils/pendingSignup.js";

/**
 * Redirects to account creation when onboarding is opened without a pending signup.
 */
export function usePendingSignupGuard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const pending = getPendingSignup();

    if (!pending?.email || !pending?.password || !pending?.role) {
      navigate("/login", {
        replace: true,
        state: {
          tab: "create",
          message: "Create your account first, then complete your profile setup.",
        },
      });
      return;
    }

    setReady(true);
  }, [navigate]);

  return ready;
}

export default usePendingSignupGuard;
