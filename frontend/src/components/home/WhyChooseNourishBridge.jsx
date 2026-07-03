import { useState } from "react";
import { motion } from "framer-motion";
import LiveTrackingPhone from "./LiveTrackingPhone";
import RealImpactPanel from "./RealImpactPanel";
import {
  FaLeaf,
  FaRoute,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaRobot,
  FaBell,
  FaRecycle,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const capabilities = [
  {
    icon: FaRoute,
    title: "Live Tracking",
    description:
      "Track every donation from pickup to delivery in real time.",
  },
  {
    icon: FaShieldAlt,
    title: "Verified NGOs & Volunteers",
    description:
      "Every NGO and volunteer is verified for trust and safety.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Smart Matching",
    description:
      "Automatically matches nearby volunteers and NGOs.",
  },
  {
    icon: FaRobot,
    title: "AI Route Planning",
    description:
      "Optimized pickup routes reduce delivery time.",
  },
  {
    icon: FaBell,
    title: "Instant Notifications",
    description:
      "Donors receive live updates at every stage.",
  },
  {
    icon: FaRecycle,
    title: "Zero Food Waste",
    description:
      "Every surplus meal gets redirected before it is wasted.",
  },
];

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

function CapabilityItem({ item, index, isHovered, onHover }) {
  const Icon = item.icon;

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <motion.div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F8EF] ring-1 ring-[#16A34A]/10 shadow-[0_2px_12px_rgba(22,163,74,0.08)] sm:h-10 sm:w-10"
          animate={{
            y: [0, -3, 0],
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{
            y: { duration: 4 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.3 },
          }}
        >
          <Icon className="text-base text-[#16A34A] sm:text-lg" />
        </motion.div>
        <h4
          className={[
            "text-sm font-bold leading-snug tracking-tight transition-colors duration-300 sm:text-base",
            isHovered ? "text-[#16A34A]" : "text-[#0F172A]",
          ].join(" ")}
        >
          {item.title}
        </h4>
      </div>
      <p className="mt-1.5 pl-11 text-xs leading-5 text-[#64748B] sm:mt-2 sm:pl-12 sm:text-sm sm:leading-6">
        {item.description}
      </p>
    </motion.div>
  );
}

function CapabilitiesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex h-full flex-col py-1 md:py-2">
      <div className="mb-6 md:mb-8">
        <h3 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl lg:text-[1.75rem]">
          Platform Capabilities
        </h3>
        <div className="mt-2 h-1 w-10 rounded-full bg-[#16A34A]" />
      </div>

      <div className="grid flex-1 grid-cols-1 content-start gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 md:gap-x-8 md:gap-y-7 lg:gap-y-8">
        {capabilities.map((item, index) => (
          <CapabilityItem
            key={item.title}
            item={item}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
}

function PhoneImpactRow() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-6 hidden lg:block md:mb-8" aria-hidden="true">
        <div className="text-[1.75rem] font-bold leading-tight opacity-0">.</div>
        <div className="mt-2 h-1 w-10 opacity-0" />
      </div>

      <div className="flex flex-1 items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="flex shrink-0 items-center justify-center">
          <div className="block lg:hidden">
            <LiveTrackingPhone size="compact" />
          </div>
          <div className="hidden lg:block">
            <LiveTrackingPhone size="medium" />
          </div>
        </div>
        <div className="flex h-full min-w-0 flex-1 items-center justify-center lg:max-w-[300px] xl:max-w-[320px]">
          <RealImpactPanel compact />
        </div>
      </div>
    </div>
  );
}

function SectionClosing() {
  return (
    <div className="flex w-full justify-center">
      <motion.div
        className="relative flex w-full max-w-2xl flex-col items-center px-4 text-center sm:mt-20 md:mt-24"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-24 w-48 -translate-x-1/2 rounded-full bg-[#DCFCE7]/60 blur-3xl"
          aria-hidden="true"
        />

        <motion.div
          className="mx-auto h-px w-14 bg-gradient-to-r from-transparent via-[#16A34A] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        />

        <h3 className="mt-6 w-full text-center text-xl font-bold tracking-tight text-[#0F172A] sm:mt-8 sm:text-2xl md:text-[1.65rem]">
          Be a Part of{" "}
          <span className="text-[#16A34A]">NourishBridge</span>
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-6 text-[#64748B] sm:mt-4 sm:text-base sm:leading-7">
          Join a growing community of donors, volunteers and NGOs working together
          to reduce food waste and nourish lives across every city we serve.
        </p>

        <motion.div
          className="mx-auto mt-5 flex items-center justify-center gap-2 sm:mt-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
          <span className="h-px w-8 bg-[#16A34A]/30" />
          <FaLeaf className="text-sm text-[#16A34A]/60" />
          <span className="h-px w-8 bg-[#16A34A]/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function WhyChooseNourishBridge() {
  return (
    <section
      id="why-choose-nourishbridge"
      className="relative flex w-full flex-col items-center overflow-hidden py-10 sm:py-12 lg:py-14"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F8FFF8] via-white to-[#F0FDF4]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#ECFDF3_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,#E8F8EE_0%,transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #16A34A 0.5px, transparent 0.5px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-20 top-[10%] h-64 w-64 rounded-full bg-[#DCFCE7]/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-[30%] h-56 w-56 rounded-full bg-[#E8F8EE]/45 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[18%] left-[25%] h-48 w-48 rounded-full bg-[#F0FDF4]/70 blur-3xl"
        aria-hidden="true"
      />

      <FloatingLeaf
        className="absolute left-[6%] top-[14%] text-xl text-[#16A34A]/[0.1] sm:text-2xl"
        delay={0}
      />
      <FloatingLeaf
        className="absolute right-[8%] top-[24%] rotate-[20deg] text-lg text-[#22C55E]/[0.08] sm:text-xl"
        delay={2}
      />
      <FloatingLeaf
        className="absolute bottom-[28%] left-[12%] rotate-[-18deg] text-base text-[#16A34A]/[0.07]"
        delay={4}
      />

      <svg
        className="pointer-events-none absolute left-0 top-[38%] h-28 w-full text-[#16A34A]/[0.07] sm:h-32"
        viewBox="0 0 1200 120"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 60 C300 20, 600 100, 900 50 S1200 80, 1200 60"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
        >
          <span className="inline-flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#16A34A] shadow-sm backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs">
            Why Choose NourishBridge
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-center text-2xl font-bold leading-tight tracking-tight text-[#0F172A] sm:mt-8 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Technology with Compassion.
            <br />
            Impact with Transparency.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-[#64748B] sm:mt-8 sm:text-base md:text-lg md:leading-8">
            NourishBridge is not just a food donation platform — it is a
            technology-driven ecosystem built on trust, real-time visibility and
            measurable social impact.
          </p>
        </motion.div>

        <div className="mt-14 grid w-full grid-cols-1 items-stretch gap-12 lg:mt-16 lg:grid-cols-5 lg:gap-14 xl:gap-16">
          <motion.div
            className="flex lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0.12}
          >
            <CapabilitiesGrid />
          </motion.div>

          <motion.div
            className="flex w-full lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0.2}
          >
            <PhoneImpactRow />
          </motion.div>
        </div>

        <div className="mt-16 w-full lg:mt-20">
          <SectionClosing />
        </div>
      </div>
    </section>
  );
}
