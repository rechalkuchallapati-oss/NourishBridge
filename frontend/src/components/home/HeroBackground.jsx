import { motion } from "framer-motion";
import { FaArrowRight, FaLeaf } from "react-icons/fa";
import { GiButterfly } from "react-icons/gi";

function FloatingLeaf({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaLeaf />
    </motion.div>
  );
}

function FloatingButterfly({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, 18, -10, 0],
        y: [0, -12, 4, 0],
        rotate: [0, 10, -8, 0],
      }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <GiButterfly />
    </motion.div>
  );
}

function DriftingArrow({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ x: [0, 8, 0], opacity: [0.25, 0.55, 0.25] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaArrowRight />
    </motion.div>
  );
}

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-white" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F8FFF8] via-white to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_20%_40%,#ECFDF3_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_30%,#E8F8EE_0%,transparent_50%)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_100%,#FFFFFF_0%,transparent_65%)]" />

      <div className="absolute -left-32 top-[5%] h-[480px] w-[480px] rounded-full bg-[#ECFDF3]/50 blur-3xl" />
      <div className="absolute left-[15%] top-[30%] h-64 w-64 rounded-full bg-[#E8F8EE]/40 blur-3xl" />
      <div className="absolute -right-24 top-[10%] h-[400px] w-[400px] rounded-full bg-[#F8FFF8]/80 blur-3xl" />
      <div className="absolute bottom-[5%] right-[20%] h-56 w-56 rounded-full bg-[#ECFDF3]/35 blur-3xl" />

      <FloatingLeaf
        className="absolute left-[10%] top-[20%] text-2xl text-[#16A34A]/[0.15]"
        delay={0}
      />
      <FloatingLeaf
        className="absolute left-[6%] bottom-[28%] rotate-[-25deg] text-xl text-[#22C55E]/[0.12]"
        delay={1.5}
      />
      <FloatingLeaf
        className="absolute right-[14%] top-[35%] rotate-[30deg] text-2xl text-[#16A34A]/[0.14]"
        delay={2.5}
      />
      <FloatingLeaf
        className="absolute right-[8%] bottom-[18%] rotate-[150deg] text-lg text-[#22C55E]/[0.1]"
        delay={3.5}
      />

      <FloatingButterfly
        className="absolute left-[18%] top-[12%] text-lg text-[#16A34A]/30 sm:text-xl"
        delay={0.8}
      />
      <FloatingButterfly
        className="absolute left-[28%] bottom-[22%] text-base text-[#22C55E]/25 sm:text-lg"
        delay={2.2}
      />
      <FloatingButterfly
        className="absolute right-[22%] top-[18%] text-base text-[#16A34A]/28"
        delay={3.6}
      />

      <DriftingArrow
        className="absolute left-[12%] top-[48%] text-sm text-[#16A34A]/35"
        delay={0.4}
      />
      <DriftingArrow
        className="absolute left-[22%] bottom-[38%] rotate-45 text-xs text-[#22C55E]/30"
        delay={1.6}
      />
      <DriftingArrow
        className="absolute right-[18%] top-[55%] -rotate-12 text-sm text-[#16A34A]/30"
        delay={2.8}
      />
    </div>
  );
}
