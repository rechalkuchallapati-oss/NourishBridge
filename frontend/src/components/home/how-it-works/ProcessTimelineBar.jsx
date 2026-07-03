import { motion } from "framer-motion";
import { timelineSteps } from "./constants";

function DottedConnector({ active }) {
  return (
    <div className="relative mx-1 hidden min-w-[24px] flex-1 sm:mx-2 sm:block lg:mx-3">
      <div className="h-px w-full border-t-2 border-dotted border-[#CBD5E1]" />
      <motion.div
        className="absolute inset-x-0 top-0 h-px border-t-2 border-dotted border-[#16A34A]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}

function TimelineStep({ step, index, active, isLast }) {
  const Icon = step.icon;

  return (
    <div className="flex flex-1 items-center">
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className={[
            "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 sm:h-12 sm:w-12",
            active
              ? "border-[#16A34A] bg-[#E8F8EF] text-[#16A34A] shadow-[0_4px_16px_rgba(22,163,74,0.2)]"
              : "border-[#E5E7EB] bg-white text-[#94A3B8]",
          ].join(" ")}
          animate={{ scale: active ? 1.08 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="text-base sm:text-lg" />
        </motion.div>
        <p
          className={[
            "hidden max-w-[72px] text-center text-[10px] font-semibold leading-tight sm:block sm:max-w-[88px] sm:text-[11px]",
            active ? "text-[#0F172A]" : "text-[#94A3B8]",
          ].join(" ")}
        >
          {step.timelineLabel}
        </p>
        <p className="text-[10px] font-bold tracking-wider text-[#64748B] sm:hidden">
          {index + 1}
        </p>
      </div>
      {!isLast && (
        <DottedConnector
          active={activeIndex !== null && activeIndex > index}
        />
      )}
    </div>
  );
}

export default function ProcessTimelineBar({ activeIndex }) {
  return (
    <div className="mt-16 md:mt-20">
      <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-w-[520px] max-w-4xl items-center px-2 sm:min-w-0 sm:px-0">
          {timelineSteps.map((step, index) => (
            <TimelineStep
              key={step.step}
              step={step}
              index={index}
              active={activeIndex === index}
              isLast={index === timelineSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
