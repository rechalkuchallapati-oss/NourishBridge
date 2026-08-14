import { Link, useLocation } from "react-router-dom";

function isHashLinkActive(location, to) {
  const [path = "/", hash = ""] = to.split("#");
  if (hash) {
    return location.pathname === path && location.hash === `#${hash}`;
  }
  if (path === "/") {
    return location.pathname === "/" && !location.hash;
  }
  return location.pathname === path || location.pathname.startsWith(`${path}/`);
}

export function NavbarLink({ to, end, children, onClick, className }) {
  const location = useLocation();
  const isActive = end ? location.pathname === to : isHashLinkActive(location, to);

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={[
        "relative block whitespace-nowrap py-2 text-[17px] font-medium transition-colors duration-300 xl:text-[18px]",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full after:bg-[#16A34A] after:transition-all after:duration-300",
        isActive
          ? "text-[#16A34A] after:w-full"
          : "text-[#0F172A]/70 after:w-0 hover:text-[#16A34A] hover:after:w-full",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function NavbarMobileLink({ to, end, children, onClick }) {
  const location = useLocation();
  const isActive = end ? location.pathname === to : isHashLinkActive(location, to);

  return (
    <Link
      to={to}
      end={end}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={[
        "block rounded-xl px-4 py-3 text-[17px] font-medium transition-all duration-300",
        isActive
          ? "bg-[#E8F8EF] text-[#16A34A]"
          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#16A34A]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default NavbarLink;
