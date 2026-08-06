import { Link } from "react-router-dom";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { ADMIN_PROFILE } from "../../data/adminDashboard";

export default function AdminIdentityPanel() {
  return (
    <div className="mt-auto shrink-0 border-t border-[#E5E7EB] pt-3">
      <div className="flex flex-col items-center gap-2 px-1 pb-1 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#BBF7D0] bg-[#F0FDF4] text-lg font-bold text-[#16A34A]">
          PA
        </span>

        <div className="flex w-full items-center justify-center gap-1.5">
          <p className="truncate text-xs font-bold leading-tight text-[#0F172A]">
            {ADMIN_PROFILE.name}
          </p>
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white"
            title="Verified Admin"
          >
            <FaCheckCircle className="text-[9px]" aria-hidden="true" />
          </span>
        </div>

        <p className="flex items-center gap-1 text-[10px] font-medium text-[#64748B]">
          <FaShieldAlt aria-hidden="true" />
          {ADMIN_PROFILE.role}
        </p>
        <p className="text-[10px] text-[#94A3B8]">{ADMIN_PROFILE.email}</p>

        <Link
          to={DASHBOARD_ROUTES.adminProfile}
          className="mt-1 flex w-full items-center justify-center rounded-none bg-[#16A34A] px-2 py-2 text-[10px] font-semibold text-white transition-colors duration-300 hover:bg-[#15803D] sm:text-xs"
        >
          View Admin Profile
        </Link>
      </div>
    </div>
  );
}
