import { motion } from "framer-motion";
import { timelineSteps } from "./constants";

function TimelineConnector({ active }) {
  return (
    <div className="relative hidden flex-1 md:block">
      {/* Base Line */}
      <div className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 rounded-full bg-slate-200" />

      {/* Animated Green Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "left center" }}
        className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 rounded-full bg-green-500"
      />
    </div>
  );
}

function TimelineStep({
  step,
  index,
  active,
  activeIndex,
  isLast,
}) {
  const Icon = step.icon;

  return (
    <div className="flex flex-1 items-center">

      <div className="flex flex-col items-center">

        {/* Step Number */}

        <p
          className={`mb-3 text-xs font-bold tracking-[0.25em]
          ${
            active
              ? "text-green-600"
              : "text-slate-400"
          }`}
        >
          {step.step}
        </p>

        {/* Icon */}

        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          animate={{
            scale: active ? 1.08 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-300

          ${
            active
              ? "border-green-600 bg-green-600 text-white shadow-xl"
              : "border-slate-200 bg-white text-slate-500"
          }`}
        >
          <Icon className="text-xl" />
        </motion.div>

        {/* Label */}

        <p
          className={`mt-4 max-w-[110px] text-center text-sm font-semibold leading-5 transition-colors duration-300

          ${
            active
              ? "text-slate-900"
              : "text-slate-500"
          }`}
        >
          {step.timelineLabel}
        </p>

      </div>

      {!isLast && (
        <TimelineConnector
          active={
            activeIndex !== null &&
            activeIndex > index
          }
        />
      )}
    </div>
  );
}

export default function ProcessTimelineBar({
  activeIndex,
}) {
  return (
    <section className="mt-20 mb-24">

      <div className="mx-auto max-w-6xl">

        <div className="flex items-start justify-between gap-3">

          {timelineSteps.map((step, index) => (
            <TimelineStep
              key={step.step}
              step={step}
              index={index}
              active={activeIndex === index}
              activeIndex={activeIndex}
              isLast={
                index === timelineSteps.length - 1
              }
            />
          ))}

        </div>

      </div>

    </section>
  );
}