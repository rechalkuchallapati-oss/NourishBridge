import {
  FaLeaf,
  FaHandsHelping,
  FaShieldAlt,
  FaBrain,
  FaGlobeAmericas,
} from "react-icons/fa";

const features = [
  {
    icon: FaLeaf,
    title: "Reduce Food Waste",
    desc: "Prevent edible food from going to waste.",
  },
  {
    icon: FaHandsHelping,
    title: "Help Communities",
    desc: "Ensure food reaches the people who need it.",
  },
  {
    icon: FaShieldAlt,
    title: "Verified & Safe",
    desc: "All NGOs and donors are verified for your trust.",
  },
  {
    icon: FaBrain,
    title: "Smart & Efficient",
    desc: "AI-powered matching for faster redistribution.",
  },
  {
    icon: FaGlobeAmericas,
    title: "Better Tomorrow",
    desc: "Together, we build a hunger-free and sustainable world.",
  },
];

export default function HeroStats() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white px-4 py-8 shadow-[0_8px_40px_rgba(15,23,42,0.06)] sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {features.map(({ icon: Icon, title, desc }, index) => (
          <div
            key={title}
            className={`group flex flex-col items-center text-center transition duration-300 hover:-translate-y-1 ${
              index < features.length - 1
                ? "lg:border-r lg:border-slate-100 lg:pr-4"
                : ""
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-xl text-green-700 transition duration-300 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white group-hover:shadow-lg">
              <Icon />
            </div>
            <h3 className="mt-4 text-[15px] font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
