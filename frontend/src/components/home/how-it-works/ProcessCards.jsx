import { motion } from "framer-motion";
import { timelineSteps } from "./constants";

function ProcessCard({ step, index, onHover }) {
  const Icon = step.icon;

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(0)}
      className="mb-24"
    >
      <div
        className={`grid items-center gap-14 lg:grid-cols-2 ${
          !isEven ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* IMAGE */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
        >
          <img
            src={step.image}
            alt={step.imageAlt}
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* CONTENT */}

        <div>

          <div className="mb-5 inline-flex items-center rounded-md bg-green-100 px-4 py-2">
            <span className="text-sm font-bold tracking-[0.18em] text-green-700">
              STEP {step.step}
            </span>
          </div>

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg">
              <Icon size={22} />
            </div>

            <h3 className="text-3xl font-bold text-slate-900">
              {step.title}
            </h3>

          </div>

          <p className="text-lg leading-8 text-slate-600">
            {step.description}
          </p>

        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessCards({ onHover }) {
  return (
    <div className="mx-auto mt-24 max-w-7xl">
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