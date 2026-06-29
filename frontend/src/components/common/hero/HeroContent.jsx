import { Link } from "react-router-dom";
import { FaLeaf, FaBoxOpen, FaUsers } from "react-icons/fa";
import { GiFruitBowl, GiHeartInside } from "react-icons/gi";
import Button from "../Button";

const impactStats = [
  {
    icon: GiFruitBowl,
    label: "Meals Shared",
    value: "25K+",
    sub: "Lives Nourished",
  },
  {
    icon: GiHeartInside,
    label: "Food Saved",
    value: "120+",
    sub: "Tons of Food",
  },
];

export default function HeroContent() {
  return (
    <div className="w-full max-w-[620px] pl-2 sm:pl-4 lg:pl-10 xl:pl-16">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800 transition hover:border-green-300 hover:bg-green-100">
        <FaLeaf className="text-green-600" />
        Smart Food Redistribution Platform
      </div>

      {/* Brand title */}
      <h1 className="mt-7 text-5xl font-black leading-none tracking-tight text-green-700 sm:text-6xl lg:text-[4.25rem]">
        NourishBridge
      </h1>

      {/* Tagline */}
      <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-800 sm:text-4xl lg:text-[2.65rem]">
        Reducing Food Waste.
        <br />
        <span className="text-slate-900">Nourishing Lives.</span>
      </h2>

      {/* Description */}
      <p className="mt-6 max-w-[540px] text-[17px] leading-8 text-slate-600">
        NourishBridge is an intelligent food redistribution platform that
        connects restaurants, caterers, NGOs and volunteers to rescue surplus
        food and deliver it safely to people in need while reducing food waste
        and creating a sustainable future.
      </p>

      {/* Quote */}
      <blockquote className="mt-6 max-w-md border-l-4 border-green-400 pl-4 text-[15px] italic leading-7 text-slate-500">
        &ldquo;No act of kindness, no matter how small, is ever wasted.&rdquo;
        <footer className="mt-1 not-italic text-sm font-medium text-slate-400">
          — Aesop
        </footer>
      </blockquote>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link to="/donor" className="group">
          <Button className="w-full !h-[52px] !min-w-0 !rounded-xl !px-8 sm:w-auto group-hover:!-translate-y-1">
            <FaBoxOpen className="text-lg" />
            Donate Food
          </Button>
        </Link>
        <Link to="/volunteer" className="group">
          <Button
            variant="outline"
            className="w-full !h-[52px] !min-w-0 !rounded-xl !px-8 sm:w-auto group-hover:!-translate-y-1"
          >
            <FaUsers className="text-lg" />
            Become a Volunteer
          </Button>
        </Link>
      </div>

      {/* Impact stats — replaces "Trusted by" */}
      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-10">
        {impactStats.map(({ icon: Icon, label, value, sub }) => (
          <div
            key={label}
            className="group flex cursor-default items-center gap-4 rounded-2xl border border-transparent p-2 transition duration-300 hover:border-green-100 hover:bg-green-50/60 hover:shadow-sm"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-700 transition duration-300 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white">
              <Icon />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="text-2xl font-extrabold text-green-700">{value}</p>
              <p className="text-sm font-semibold text-slate-700">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
