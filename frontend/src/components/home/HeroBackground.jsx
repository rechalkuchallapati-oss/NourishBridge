import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";

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
    </div>
  );
}
