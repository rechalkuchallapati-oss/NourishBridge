import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE },
  }),
};

export const fadeUpViewport = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.65, ease: EASE },
};

export function FloatingLeaf({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <FaLeaf />
    </motion.div>
  );
}

export function NGOSectionBackdrop({ leaves = true, dots = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,#ECFDF3_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_80%,#E8F8EF_0%,transparent_50%)] opacity-70" />

      {dots && (
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #16A34A 0.5px, transparent 0.5px)",
            backgroundSize: "22px 22px",
          }}
        />
      )}

      {leaves && (
        <>
          <FloatingLeaf
            className="absolute left-[5%] top-[12%] text-xl text-[#16A34A]/[0.12] sm:text-2xl"
            delay={0}
          />
          <FloatingLeaf
            className="absolute right-[6%] top-[20%] rotate-[20deg] text-lg text-[#22C55E]/[0.1] sm:text-xl"
            delay={2}
          />
          <FloatingLeaf
            className="absolute bottom-[15%] left-[10%] rotate-[-18deg] text-base text-[#16A34A]/[0.08]"
            delay={3.5}
          />
        </>
      )}
    </div>
  );
}

export function SectionDivider() {
  return (
    <span
      className="h-px w-12 bg-gradient-to-r from-transparent via-[#16A34A]/40 to-transparent sm:w-16"
      aria-hidden="true"
    />
  );
}
