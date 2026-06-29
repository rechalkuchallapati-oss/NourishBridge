import { Link } from "react-router-dom";
import Button from "../common/Button";
import logo from "../../assets/logos/logo.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">

      <div className="max-w-[1600px] mx-auto h-24 px-10 flex items-center">

        {/* ================= LEFT SECTION ================= */}

        <div className="flex items-center flex-shrink-0">

          <Link to="/" className="flex items-center gap-4">

            <img
              src={logo}
              alt="NourishBridge Logo"
              className="w-16 h-16 object-contain"
            />

            <div className="leading-tight">

              <h1 className="text-[36px] font-extrabold">
                <span className="text-green-700">Nourish</span>
                <span className="text-slate-900">Bridge</span>
              </h1>

              <p className="text-[17px] text-slate-500">
                Share Food | Share Hope | Save Lives
              </p>

            </div>

          </Link>

        </div>



        {/* ================= CENTER SECTION ================= */}

        <div className="flex-1 flex justify-center ml-32">

          <div className="flex items-center gap-8 text-[18px] font-medium">

            <Link
              to="/"
              className="text-green-600 font-semibold hover:text-green-700"
            >
              Home
            </Link>

            <Link
             to="/"
               className="text-green-600 font-semibold hover:text-green-700"
            >
              About
            </Link>

            <Link 
             to="/"              
             className="text-green-600 font-semibold hover:text-green-700"
            >
              Donate
            </Link>

            <Link
             to="/"
             className="text-green-600 font-semibold hover:text-green-700"
            >
              NGOs
            </Link>

            <Link 
            to="/"
            className="text-green-600 font-semibold hover:text-green-700"
            >
              Volunteer
            </Link>
            
            <Link
            to="/"
            className="text-green-600 font-semibold hover:text-green-700"
            >
              Contact
            </Link>

          </div>

        </div>



        {/* ================= RIGHT SECTION ================= */}

        <div className="flex items-center gap-8 flex-shrink-0">

          <Button
            variant="secondary"
            className="!min-w-[120px] !h-12 !px-7 !rounded-xl"
          >
            👤 Login
          </Button>

          <Button
            variant="outline"
            className="!min-w-[180px] !h-12 !px-8 !rounded-xl"
          >
            🤝 Become Volunteer
          </Button>

          <Button
            variant="primary"
            className="!min-w-[170px] !h-12 !px-8 !rounded-xl"
          >
            🍱 Donate Food
          </Button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;