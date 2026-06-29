import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import Button from "../common/Button";
import logo from "../../assets/logos/logo.png";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/ngo", label: "NGOs" },
  { to: "/#impact", label: "Impact" },
  { to: "/contact", label: "Contact" },
];

const navLinkClass = ({ isActive }) =>
  [
    "relative py-1 text-[15px] font-medium transition-colors duration-200",
    "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full",
    isActive ? "text-green-700 after:w-full" : "text-slate-600 hover:text-green-700",
  ].join(" ");

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <nav className="flex h-[76px] items-center justify-between gap-4 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={logo}
              alt="NourishBridge"
              className="h-12 w-12 object-contain transition-transform duration-200 group-hover:rotate-3"
            />
            <div className="leading-tight">
              <span className="text-[22px] font-extrabold tracking-tight">
                <span className="text-green-700">Nourish</span>
                <span className="text-slate-900">Bridge</span>
              </span>
              <p className="mt-0.5 hidden text-[13px] text-slate-500 sm:block">
                Share Food | Share Hope
              </p>
            </div>
          </Link>

          {/* Desktop nav — centered */}
          <ul className="hidden items-center justify-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink to={link.to} end={link.end} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center justify-end gap-3 lg:flex">
            <Link to="/login">
              <Button
                variant="outline"
                className="!h-10 !min-w-0 !rounded-lg !px-5 !text-sm hover:!-translate-y-0.5"
              >
                Login
              </Button>
            </Link>
            <Link to="/donor">
              <Button className="!h-10 !min-w-0 !rounded-lg !px-5 !text-sm hover:!-translate-y-0.5">
                <FaHeart className="text-sm" />
                Donate Food
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-green-50 hover:text-green-700 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <HiX className="h-6 w-6" /> : <HiOutlineMenuAlt3 className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2.5 text-[15px] font-medium transition ${
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full !min-w-0">
                  Login
                </Button>
              </Link>
              <Link to="/donor" onClick={() => setMenuOpen(false)}>
                <Button className="w-full !min-w-0">
                  <FaHeart />
                  Donate Food
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
