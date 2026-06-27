import { Link } from "react-router-dom";
import Button from "../common/Button";
import Logo from "../common/Logo";
const Navbar = () => {
  return (
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">
        {/* Left Section */}
        <Link to="/" className="flex items-center gap-3">
            {/* Logo */}

            <Logo />
           
            <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-green-700">Nourish</span>
            <span className="text-slate-900">Bridge</span>
            </h1>

            <p className="text-sm text-slate-500">
              Share Food | Share Hope | Save Lives
            </p>
            </div>
        </Link>

        {/* Center Section */}
          <div className="hidden lg:flex items-center gap-10 font-medium text-gray-700">
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/donate">Donate</Link>

          <Link to="/ngo">NGOs</Link>

          <Link to="/volunteer">Volunteer</Link>

          <Link to="/contact">Contact</Link>

        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">

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