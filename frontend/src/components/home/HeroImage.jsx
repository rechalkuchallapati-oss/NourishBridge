import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import { GiFruitBowl, GiHeartInside } from "react-icons/gi";
import heroImage from "../../assets/images/hero-food.jpg";

const floatTransition = {
  duration: 5.5,
  repeat: Infinity,
  ease: "easeInOut",
};

const floatingCards = [
  {
    icon: GiFruitBowl,
    label: "Meals Shared",
    value: "25K+",
    position: "absolute bottom-3 left-1 z-20 sm:bottom-4 sm:-left-5",
    delay: 0,
  },
  {
    icon: GiHeartInside,
    label: "Food Saved",
    value: "120+",
    position: "absolute bottom-5 right-2 z-20 sm:-right-1",
    delay: 0.6,
  },
];

function FloatingLeaf({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaLeaf />
    </motion.div>
  );
}

function FloatingCard({ icon: Icon, label, value, position, delay }) {
  return (
    <motion.div
      className={`${position} max-w-[calc(100%-1rem)] rounded-2xl border border-white/80 bg-white/85 px-5 py-4 shadow-[0_16px_48px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:max-w-none sm:px-7 sm:py-6`}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.55, delay: 0.35 + delay },
        scale: { duration: 0.55, delay: 0.35 + delay },
        y: { ...floatTransition, delay },
      }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F8EF] text-lg text-[#16A34A] sm:h-12 sm:w-12 sm:text-xl">
          <Icon />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] sm:text-xs">
            {label}
          </p>
          <p className="text-xl font-extrabold leading-none text-[#16A34A] sm:text-2xl">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroImage() {
  return (
    <motion.div
      className="relative flex h-full min-h-[240px] items-center justify-center sm:min-h-[320px] md:min-h-[400px] lg:min-h-[510px] lg:max-h-[520px] lg:justify-start"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-4 top-4 h-48 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute -left-2 bottom-12 h-40 w-48 rounded-full bg-[radial-gradient(circle,rgba(232,248,239,0.7)_0%,transparent_70%)] blur-2xl" />

        <FloatingLeaf
          className="absolute left-0 top-[22%] rotate-[-28deg] text-2xl text-[#16A34A]/30 sm:text-3xl"
          delay={0}
        />
        <FloatingLeaf
          className="absolute right-0 top-[14%] rotate-[20deg] text-xl text-[#22C55E]/25 sm:text-2xl"
          delay={1.2}
        />

        <svg
          className="absolute left-1/2 top-1/2 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 text-[#16A34A]/12 sm:block"
          viewBox="0 0 360 360"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 40 280 Q 180 40 320 280"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
          <circle
            cx="180"
            cy="180"
            r="168"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2 6"
            opacity="0.5"
          />
        </svg>
      </div>

      <motion.div
        className="group relative z-10 mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:mx-0 lg:max-w-[560px] xl:max-w-[600px]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full overflow-hidden rounded-3xl border-[3px] border-white bg-white shadow-[0_24px_64px_rgba(15,23,42,0.1)]">
          <img
            src={heroImage}
            alt="NourishBridge volunteers distributing rescued food to communities in need"
            className="h-[240px] w-full object-cover object-center transition duration-700 group-hover:scale-[1.02] sm:h-[320px] md:h-[400px] lg:h-[510px] lg:max-h-[520px]"
          />

          {floatingCards.map((card) => (
            <FloatingCard key={card.label} {...card} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
