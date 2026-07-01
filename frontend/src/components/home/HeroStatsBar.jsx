import { motion } from "framer-motion";
import {
  FaLeaf,
  FaHandsHelping,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaGlobeAmericas,
} from "react-icons/fa";

const stats = [
  {
    icon: FaLeaf,
    title: "Reduce Food Waste",
    desc: "Prevent edible food from going to waste.",
  },
  {
    icon: FaHandsHelping,
    title: "Help Communities",
    desc: "Ensure food reaches people in need.",
  },
  {
    icon: FaShieldAlt,
    title: "Verified NGOs",
    desc: "All NGOs and donors are verified.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Smart Matching",
    desc: "AI-powered matching for faster redistribution.",
  },
  {
    icon: FaGlobeAmericas,
    title: "Sustainable Future",
    desc: "Building a hunger-free sustainable future.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.05 * index,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HeroStatsBar() {
  return (
    <motion.div
      id="how-it-works"
      className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-6 lg:p-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {stats.map(({ icon: Icon, title, desc }, index) => (
          <motion.div
            key={title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className={`group flex flex-col items-center px-3 py-2 text-center lg:px-2 lg:py-1 ${
              index < stats.length - 1 ? "lg:border-r lg:border-[#E5E7EB]" : ""
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F8EF] text-lg text-[#16A34A] transition duration-300 group-hover:bg-[#16A34A] group-hover:text-white group-hover:shadow-md group-hover:shadow-green-100">
              <Icon />
            </div>
            <h3 className="mt-3 text-[15px] font-bold leading-snug text-[#0F172A] transition group-hover:text-[#16A34A] lg:mt-2">
              {title}
            </h3>
            <p className="mt-1.5 max-w-[180px] text-[13px] leading-5 text-[#64748B] lg:mt-1">
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
