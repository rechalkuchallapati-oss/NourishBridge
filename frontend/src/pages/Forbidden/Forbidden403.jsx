import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaLock, FaShieldAlt } from "react-icons/fa";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { getDashboardRouteForRole } from "../../utils/authStorage";
import { ROLE_LABELS } from "../../constants/rbac";

/**
 * 403 Forbidden — shown when an authenticated user accesses a route outside their role.
 */
export default function Forbidden403() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const requiredRoles = location.state?.requiredRoles || [];
  const attemptedPath = location.state?.from || location.pathname;

  const userRoleLabel = user?.role ? ROLE_LABELS[user.role] || user.role : "Guest";
  const requiredLabel = requiredRoles.length
    ? requiredRoles.map((r) => ROLE_LABELS[r] || r).join(" or ")
    : "a different role";

  return (
    <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-b from-[#FFF7F7] via-white to-[#F8FAFC] py-16 sm:py-20">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="mx-auto w-full max-w-lg rounded-2xl border border-[#FECACA] bg-white px-8 py-12 shadow-[0_8px_40px_rgba(15,23,42,0.08)] sm:px-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]">
            <FaShieldAlt className="text-2xl" aria-hidden="true" />
          </span>

          <p className="mt-6 text-5xl font-bold tracking-tight text-[#DC2626]">403</p>
          <h1 className="mt-2 text-2xl font-bold text-[#0F172A] sm:text-3xl">Access Denied</h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#64748B]">
            {isAuthenticated ? (
              <>
                You are signed in as <strong className="text-[#0F172A]">{userRoleLabel}</strong>,
                but this page requires <strong className="text-[#0F172A]">{requiredLabel}</strong> access.
              </>
            ) : (
              <>You don&apos;t have permission to view this page.</>
            )}
          </p>

          {attemptedPath && attemptedPath !== "/403" && (
            <p className="mt-3 text-sm text-[#94A3B8]">
              Attempted path: <code className="rounded bg-[#F1F5F9] px-2 py-0.5">{attemptedPath}</code>
            </p>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {isAuthenticated && user?.role && (
              <Button
                type="button"
                icon={FaHome}
                onClick={() => navigate(getDashboardRouteForRole(user.role), { replace: true })}
                className="min-w-[200px]"
              >
                Go to My Dashboard
              </Button>
            )}
            <Link
              to="/"
              className="inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-xl border-2 border-[#E5E7EB] px-6 text-[15px] font-semibold text-[#64748B] transition-colors hover:border-[#16A34A]/40 hover:text-[#16A34A]"
            >
              <FaLock className="text-sm" aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
