import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import Container from "../common/Container";
import logo from "../../assets/logos/logo.png";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/#impact", label: "Impact" },
  { to: "/ngo", label: "NGOs" },
  { to: "/#testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

const navLinkClass = ({ isActive }) =>
  [
    "relative whitespace-nowrap py-2 text-[17px] font-medium transition-colors duration-300 xl:text-[18px]",
    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#16A34A] after:transition-all after:duration-300 after:ease-out",
    "hover:text-[#16A34A] hover:after:w-full",
    isActive ? "text-[#16A34A] after:w-full" : "text-[#0F172A]/70",
  ].join(" ");

const actionButtonClass =
  "box-border !h-[52px] !min-h-[52px] !shrink-0 !rounded-xl !px-7 !text-[15px] !font-semibold !leading-none hover:!-translate-y-0.5 hover:!scale-[1.02] active:!scale-[0.98]";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ease-out",
        scrolled
          ? "border-[#E5E7EB] bg-white/90 shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
          : "border-[#E5E7EB]/50 bg-white/90 shadow-none",
      ].join(" ")}
    >
      <Container>
        <nav className="hidden h-[90px] items-center lg:grid lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)_auto] lg:gap-x-16 xl:gap-x-20">
          <Link
            to="/"
            className="group flex max-w-[360px] items-center gap-4 transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={logo}
              alt="NourishBridge"
              className="h-[54px] w-[54px] shrink-0 object-contain"
            />
            <div className="flex w-fit flex-col">
              <span className="whitespace-nowrap text-[22px] font-extrabold leading-none tracking-tight">
                <span className="text-[#16A34A]">Nourish</span>
                <span className="text-[#0F172A]">Bridge</span>
              </span>
              <p className="mt-2 whitespace-nowrap text-center text-[11px] font-medium leading-none tracking-wide text-[#64748B]">
                Share Food • Share Hope • Save Lives
              </p>
            </div>
          </Link>

          <ul className="flex items-center justify-center gap-9 xl:gap-11">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink to={link.to} end={link.end} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-3">
            <Link to="/login" className="inline-flex items-center">
              <Button variant="outline" className={`min-w-0 ${actionButtonClass}`}>
                Login
              </Button>
            </Link>
            <Link to="/donor" className="inline-flex items-center">
              <Button
                variant="primary"
                icon={FaHeart}
                className={`min-w-0 ${actionButtonClass}`}
              >
                Donate Food
              </Button>
            </Link>
          </div>
        </nav>

        <nav className="flex h-[90px] items-center justify-between lg:hidden">
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex min-w-0 items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={logo}
              alt="NourishBridge"
              className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
            />
            <span className="truncate text-lg font-extrabold tracking-tight">
              <span className="text-[#16A34A]">Nourish</span>
              <span className="text-[#0F172A]">Bridge</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#0F172A] transition-all duration-300 hover:scale-105 hover:bg-[#E8F8EF] hover:text-[#16A34A]"
          >
            {menuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiOutlineMenuAlt3 className="h-6 w-6" />
            )}
          </button>
        </nav>
      </Container>

      <div
        role="presentation"
        onClick={closeMenu}
        className={[
          "fixed inset-0 z-40 bg-[#0F172A]/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-[340px] flex-col border-l border-[#E5E7EB] bg-white/95 shadow-[-8px_0_40px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-[90px] items-center justify-between border-b border-[#E5E7EB] px-5 md:px-8">
          <span className="text-lg font-extrabold">
            <span className="text-[#16A34A]">Nourish</span>
            <span className="text-[#0F172A]">Bridge</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#0F172A] transition hover:bg-[#E8F8EF] hover:text-[#16A34A]"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6 md:px-8">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-4 py-3 text-[17px] font-medium transition-all duration-300",
                      isActive
                        ? "bg-[#E8F8EF] text-[#16A34A]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#16A34A]",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 border-t border-[#E5E7EB] pt-6">
            <Link to="/login" onClick={closeMenu}>
              <Button variant="outline" className={`w-full min-w-0 ${actionButtonClass}`}>
                Login
              </Button>
            </Link>
            <Link to="/donor" onClick={closeMenu}>
              <Button
                variant="primary"
                icon={FaHeart}
                className={`w-full min-w-0 ${actionButtonClass}`}
              >
                Donate Food
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}
