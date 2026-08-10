import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_DENIED_EVENT } from "../../utils/rbacEvents.js";
import { getRequiredRoleForPath } from "../../constants/rbac.js";

/**
 * Listens for API-level 403 events and navigates to the forbidden page.
 */
export default function AccessDeniedListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event) => {
      const pathname = event.detail?.path || window.location.pathname;
      const requiredRoles = event.detail?.requiredRoles || [];
      const inferredRole = getRequiredRoleForPath(pathname);

      navigate("/403", {
        replace: true,
        state: {
          from: pathname,
          requiredRoles: requiredRoles.length
            ? requiredRoles
            : inferredRole
              ? [inferredRole]
              : [],
        },
      });
    };

    window.addEventListener(ACCESS_DENIED_EVENT, handler);
    return () => window.removeEventListener(ACCESS_DENIED_EVENT, handler);
  }, [navigate]);

  return null;
}
