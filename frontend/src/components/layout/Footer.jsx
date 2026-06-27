import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-green-500">
              NourishBridge
            </h2>

            <p className="mt-4 text-sm leading-7">
              Connecting food donors, NGOs and volunteers to reduce food waste
              and feed communities in need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Resources
            </h3>

            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>FAQs</li>
              <li>Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <p>Email: support@nourishbridge.com</p>
            <p className="mt-2">Phone: +91 98765 43210</p>
            <p className="mt-2">Hyderabad, India</p>
          </div>

        </div>

        <hr className="my-8 border-slate-700" />

        <div className="text-center text-sm text-gray-500">
          © 2026 NourishBridge. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;