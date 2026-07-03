import { motion } from "framer-motion";
import {
  FaLeaf,
  FaStar,
  FaHeart,
  FaHandshake,
  FaCommentDots,
} from "react-icons/fa";
import Container from "../common/Container";

const EASE = [0.22, 1, 0.36, 1];

const stats = [
  {
    value: "2000+",
    label: "Happy Reviews",
    icon: FaCommentDots,
    description: "Real voices shared",
  },
  {
    value: "300+",
    label: "NGO Partners",
    icon: FaHandshake,
    description: "Trusted ground networks",
  },
  {
    value: "4.9/5",
    label: "Average Rating",
    icon: FaStar,
    description: "Consistently top rated",
    showStars: true,
  },
  {
    value: "100%",
    label: "Purpose Driven",
    icon: FaHeart,
    description: "Every meal feeds hope today",
  },
];

function FloatingLeaf({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaLeaf />
    </motion.div>
  );
}

function ImpactStat({ stat, index }) {
  const Icon = stat.icon;

  return (
    <motion.div
      className="group flex flex-col items-center px-3 py-5 text-center sm:px-5 sm:py-6 lg:px-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -6 }}
    >
      <motion.div
        className="mb-3 flex h-11 w-11 items-center justify-center text-[#16A34A] transition-colors duration-300 group-hover:text-[#15803D] sm:mb-4 sm:h-12 sm:w-12"
        whileHover={{ scale: 1.12, rotate: 4 }}
        transition={{ duration: 0.3 }}
      >
        {stat.showStars ? (
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-base text-amber-400 sm:text-lg" />
            ))}
          </div>
        ) : (
          <Icon className="text-2xl sm:text-3xl" />
        )}
      </motion.div>

      <motion.p
        className="text-xl font-extrabold tabular-nums text-[#0F172A] transition-colors duration-300 group-hover:text-[#16A34A] sm:text-2xl md:text-3xl"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.25 }}
      >
        {stat.value}
      </motion.p>

      <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-[#0F172A] sm:text-sm">
        {stat.label}
      </p>

      <p className="mt-1.5 text-xs leading-relaxed text-[#64748B] transition-colors duration-300 group-hover:text-[#16A34A]/80 sm:text-sm">
        {stat.description}
      </p>
    </motion.div>
  );
}

export default function VoicesOfImpact() {
  return (
    <section className="relative overflow-hidden bg-[#F8FFF8]/60 pb-16 pt-[0.5cm] sm:pb-20 lg:pb-24">
      <Container className="relative z-10">
        <div className="relative mx-auto max-w-6xl">
          {/* Left leaves */}
          <div className="pointer-events-none absolute bottom-[12%] left-0 top-[12%] flex w-[14%] min-w-[48px] max-w-[88px] flex-col items-center justify-center sm:w-[12%] lg:w-[10%]">
            <FloatingLeaf
              className="text-3xl text-[#16A34A]/22 sm:text-4xl lg:text-5xl"
              delay={0}
            />
            <FloatingLeaf
              className="mt-8 rotate-[-28deg] text-xl text-[#22C55E]/18 sm:mt-10 sm:text-2xl"
              delay={1.5}
            />
            <FloatingLeaf
              className="mt-8 rotate-[12deg] text-lg text-[#16A34A]/14 sm:mt-10 sm:text-xl"
              delay={2.4}
            />
          </div>

          {/* Right leaves */}
          <div className="pointer-events-none absolute bottom-[12%] right-0 top-[12%] flex w-[14%] min-w-[48px] max-w-[88px] flex-col items-center justify-center sm:w-[12%] lg:w-[10%]">
            <FloatingLeaf
              className="rotate-[18deg] text-3xl text-[#16A34A]/22 sm:text-4xl lg:text-5xl"
              delay={0.8}
            />
            <FloatingLeaf
              className="mt-8 rotate-[24deg] text-xl text-[#22C55E]/18 sm:mt-10 sm:text-2xl"
              delay={2}
            />
            <FloatingLeaf
              className="mt-8 rotate-[-14deg] text-lg text-[#16A34A]/14 sm:mt-10 sm:text-xl"
              delay={1.2}
            />
          </div>

          {/* Center content — heading + partitions between leaves */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center px-[16%] text-center sm:px-[14%] lg:px-[12%]">
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <span className="mb-3 h-px w-10 bg-gradient-to-r from-transparent to-[#16A34A]/40 sm:w-14" />
              <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-[#0F172A] sm:text-2xl md:text-3xl">
                Voices of Impact
              </h2>
              <span className="mt-3 h-px w-10 bg-gradient-to-l from-transparent to-[#16A34A]/40 sm:w-14" />
            </motion.div>

            <div className="mt-10 w-full sm:mt-12">
              <div className="grid grid-cols-1 divide-y divide-[#DCFCE7] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <ImpactStat key={stat.label} stat={stat} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
