import { useState } from "react";
import { motion } from "framer-motion";
import { timelineSteps } from "./constants";

function ProcessCard({ step, index, onHover }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    onHover(index);
  };

  const handleLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  return (
    <motion.article
      className={[
        "group flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition-all duration-300 md:p-6",
        index < 3 ? "lg:col-span-2 xl:col-span-1" : "",
        index === 3 ? "lg:col-span-2 lg:col-start-2 xl:col-span-1 xl:col-start-auto" : "",
        index === 4 ? "lg:col-span-2 lg:col-start-4 xl:col-span-1 xl:col-start-auto" : "",
      ].join(" ")}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      animate={{
        y: isHovered ? -4 : 0,
        boxShadow: isHovered
          ? "0 16px 40px rgba(15,23,42,0.1)"
          : "0 2px 12px rgba(15,23,42,0.05)",
      }}
    >
      <div className="flex min-h-[160px] items-center justify-center overflow-hidden rounded-xl bg-[#F8FAFC] p-3 sm:min-h-[180px] md:min-h-[200px]">
        <motion.img
          src={step.image}
          alt={step.imageAlt}
          className="max-h-[180px] w-full object-contain object-scale-down sm:max-h-[200px]"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />
      </div>

      <p className="mt-5 text-xs font-bold tracking-[0.18em] text-[#16A34A]">
        STEP {step.step}
      </p>

      <h3 className="mt-2 text-lg font-bold text-[#0F172A] transition-colors duration-300 group-hover:text-[#16A34A] md:text-xl">
        {step.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-[#64748B] md:text-[15px] md:leading-7">
        {step.description}
      </p>
    </motion.article>
  );
}

export default function ProcessCards({ onHover }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5">
      {timelineSteps.map((step, index) => (
        <ProcessCard
          key={step.step}
          step={step}
          index={index}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
