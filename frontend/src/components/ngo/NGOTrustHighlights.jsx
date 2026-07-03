import { motion } from "framer-motion";
import {
  HiShieldCheck,
  HiUserGroup,
  HiHeart,
  HiHandRaised,
} from "react-icons/hi2";

const EASE = [0.22, 1, 0.36, 1];

const trustFeatures = [
  {
    icon: HiShieldCheck,
    title: "Verified & Trusted",
    description:
      "Every NGO partner is verified before joining the NourishBridge network.",
  },
  {
    icon: HiUserGroup,
    title: "Community Focused",
    description:
      "Working directly with local communities to maximize food distribution.",
  },
  {
    icon: HiHeart,
    title: "Hunger Relief",
    description:
      "Dedicated to rescuing surplus food and feeding people with dignity.",
  },
  {
    icon: HiHandRaised,
    title: "Transparent & Accountable",
    description:
      "Every donation is tracked from donor to NGO with complete transparency.",
  },
];

function TrustFeatureItem({ feature, index, isLast }) {
  const Icon = feature.icon;

  return (
    <motion.div
      className={`group relative flex min-h-[240px] min-w-[210px] flex-1 flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[260px] sm:min-w-0 sm:px-6 sm:py-14 lg:min-h-[280px] lg:px-7 lg:py-16 ${
        !isLast ? "border-r border-gray-200" : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.12 + index * 0.1, ease: EASE }}
      whileHover={{ y: -4 }}
    >
      <motion.div
        className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#E8F8EF] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(22,163,74,0.25)]"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="h-6 w-6 text-[#16A34A]" aria-hidden="true" />
      </motion.div>

      <h3 className="mt-7 text-base font-bold leading-snug text-slate-900 sm:text-lg">
        {feature.title}
      </h3>
      <p className="mt-5 max-w-[220px] text-sm leading-8 text-slate-600 sm:leading-9">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function NGOTrustHighlights() {
  return (
    <section className="px-6 sm:px-8 lg:px-12">
      <motion.div
        className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <div className="flex overflow-x-auto">
          {trustFeatures.map((feature, index) => (
            <TrustFeatureItem
              key={feature.title}
              feature={feature}
              index={index}
              isLast={index === trustFeatures.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
