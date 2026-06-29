import {
  FaTruck,
  FaLeaf,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaTruck />,title: "Quick Food Pickup",
    desc: "Schedule pickups in seconds and connect with nearby volunteers for immediate food rescue.",
  },
  {
    icon: <FaLeaf />,
    title: "Reduce Food Waste",
    desc: "Prevent edible food from ending up in landfills and create a more sustainable future.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Verified NGO Network",
    desc: "Collaborate only with trusted NGOs to ensure transparent and secure food distribution.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Live Tracking",
    desc: "Track every donation from pickup to delivery with real-time updates and transparency.",
  },
  {
    icon: <FaUsers />,
    title: "Volunteer Community",
    desc: "Build a strong volunteer network to collect and deliver food where it matters most.",
  },
  {
    icon: <FaChartLine />,
    title: "Impact Dashboard",
    desc: "Visualize meals served, food saved, NGO performance and community impact in one place.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-5 py-2 font-semibold">
            ✨ Why Choose NourishBridge
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900 leading-tight">
            One Platform.
            <br />
            <span className="text-green-600">
              Infinite Social Impact.
            </span>
          </h2>

          <p className="mt-6 text-xl text-slate-600 leading-9">
            NourishBridge empowers restaurants, caterers, NGOs and volunteers
            through a smart ecosystem that rescues surplus food and delivers it
            safely to communities in need.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">

          {features.map((feature, index) => (

            <div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-3 transition duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 text-3xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition">

                {feature.icon}

              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">

                {feature.title}

              </h3>

              <p className="mt-4 text-slate-600 leading-8">

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}