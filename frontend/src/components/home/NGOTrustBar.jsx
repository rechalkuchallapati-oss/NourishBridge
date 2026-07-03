import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUsers,
  FaHandsHelping,
  FaHandshake,
} from "react-icons/fa";

const trustItems = [
  {
    icon: FaShieldAlt,
    title: "Verified & Trusted",
    description:
      "All NGO partners are carefully verified before joining the NourishBridge network.",
  },
  {
    icon: FaUsers,
    title: "Community Focused",
    description:
      "Working directly with communities to ensure every rescued meal reaches people in need.",
  },
  {
    icon: FaHandsHelping,
    title: "Hunger Relief",
    description:
      "Dedicated to reducing hunger through efficient food rescue and redistribution.",
  },
  {
    icon: FaHandshake,
    title: "Transparent & Accountable",
    description:
      "Every donation is tracked from donor to NGO with complete transparency.",
  },
];

export default function NGOTrustBar() {
  return (
    <section className="mt-16 pb-[0.5cm]">
      <div className="mx-auto max-w-7xl rounded-3xl border border-green-100 bg-white shadow-[0_10px_35px_rgba(22,163,74,0.08)]">

        <div className="grid grid-cols-1 divide-y divide-green-100 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">

          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group flex flex-col items-center px-8 py-10 text-center transition-all duration-300"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">

                  <Icon className="text-2xl" />

                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600">
                  {item.description}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}