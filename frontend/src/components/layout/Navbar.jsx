import { Link } from "react-router-dom";
import Button from "../common/Button";

const Navbar = () => {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-500"
        >
          NourishBridge
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">

          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/donate">Donate</Link>

          <Link to="/ngo">NGOs</Link>

          <Link to="/volunteer">Volunteer</Link>

          <Link to="/contact">Contact</Link>

        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-3">

          <Button variant="outline">
            Login
          </Button>

          <Button>
            Donate Now
          </Button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;