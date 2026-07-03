import { motion } from "framer-motion";
import { FaArrowRight, FaLeaf } from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";
import heroImage from "../../assets/images/hero-food.jpg";

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

function FloatingButterfly({ className, delay = 0, duration = 8 }) {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, 12, -8, 0],
        y: [0, -14, -6, 0],
        rotate: [0, 8, -6, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <GiButterfly className="text-[#16A34A]" />
    </motion.div>
  );
}

function FloatingArrow({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ x: [0, 6, 0], opacity: [0.45, 0.9, 0.45] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaArrowRight />
    </motion.div>
  );
}

export default function HeroImage() {
  return (
    <motion.div
      className="relative flex h-full min-h-[200px] items-center justify-center sm:min-h-[270px] md:min-h-[340px] lg:min-h-[430px] lg:max-h-[440px] lg:justify-start"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-4 top-4 h-40 w-48 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute -left-2 bottom-10 h-32 w-40 rounded-full bg-[radial-gradient(circle,rgba(232,248,239,0.7)_0%,transparent_70%)] blur-2xl" />

        <FloatingLeaf
          className="absolute left-0 top-[18%] rotate-[-28deg] text-xl text-[#16A34A]/35 sm:text-2xl"
          delay={0}
        />
        <FloatingLeaf
          className="absolute right-0 top-[12%] rotate-[20deg] text-lg text-[#22C55E]/30 sm:text-xl"
          delay={1.2}
        />
        <FloatingLeaf
          className="absolute bottom-[8%] left-[8%] rotate-[12deg] text-base text-[#16A34A]/25"
          delay={2.4}
        />

        <FloatingButterfly
          className="absolute -left-1 top-[8%] text-lg opacity-70 sm:text-xl"
          delay={0.5}
          duration={9}
        />
        <FloatingButterfly
          className="absolute right-[2%] top-[28%] text-base opacity-60 sm:text-lg"
          delay={2}
          duration={10}
        />
        <FloatingButterfly
          className="absolute bottom-[14%] right-[10%] text-sm opacity-55 sm:text-base"
          delay={3.2}
          duration={8.5}
        />

        <FloatingArrow
          className="absolute left-[-6px] top-[42%] text-sm text-[#16A34A]/70 sm:text-base"
          delay={0.3}
        />
        <FloatingArrow
          className="absolute right-0 top-[52%] rotate-[160deg] text-xs text-[#22C55E]/65 sm:text-sm"
          delay={1.1}
        />
        <FloatingArrow
          className="absolute bottom-[22%] left-[14%] -rotate-45 text-xs text-[#16A34A]/55"
          delay={1.8}
        />

        <svg
          className="absolute left-1/2 top-1/2 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 text-[#16A34A]/15 sm:block"
          viewBox="0 0 360 360"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M 40 280 Q 180 40 320 280"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 7"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <circle
            cx="180"
            cy="180"
            r="148"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2 6"
            opacity="0.45"
          />
        </svg>
      </div>

      <motion.div
        className="group relative z-10 mx-auto w-full max-w-[300px] sm:max-w-[350px] lg:mx-0 lg:max-w-[460px] xl:max-w-[500px]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-[0_20px_52px_rgba(15,23,42,0.1)]">
          <img
            src={heroImage}
            alt="NourishBridge volunteers distributing rescued food to communities in need"
            className="h-[200px] w-full object-cover object-center transition duration-700 group-hover:scale-[1.02] sm:h-[270px] md:h-[340px] lg:h-[430px] lg:max-h-[440px]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
