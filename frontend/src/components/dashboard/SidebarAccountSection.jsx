import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";

function AccountNavLink({ item, isActive }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      className={[
        "flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-sm font-medium transition-colors duration-200",
        isActive
          ? "bg-[#F0FDF4] text-[#16A34A]"
          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
      ].join(" ")}
    >
      <Icon className="shrink-0 text-base" aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

/**
 * Shared Account section for role dashboards.
 */
export default function SidebarAccountSection({ items, pathname, matchRoute }) {
  const { logout } = useAuth();

  return (
    <div className="mt-2 flex flex-col gap-2 border-t border-[#E5E7EB] pt-4">
      <p className="px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#0F172A]">
        Account
      </p>
      {items.map((item) => (
        <AccountNavLink
          key={item.label}
          item={item}
          isActive={matchRoute(pathname, item.to)}
        />
      ))}
      <button
        type="button"
        onClick={() => logout()}
        className="flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-sm font-medium text-[#64748B] transition-colors hover:bg-[#FEF2F2] hover:text-[#DC2626]"
      >
        <FaSignOutAlt className="shrink-0 text-base" aria-hidden="true" />
        Logout
      </button>
    </div>
  );
}
