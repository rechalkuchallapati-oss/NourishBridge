import { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import foodDonor from "../../assets/how-it-works/food-donor.jpg";
import pickupRequest from "../../assets/how-it-works/pickup-request.jpg";
import volunteerPickup from "../../assets/how-it-works/volunteer-pickup.jpg";
import ngoReceives from "../../assets/how-it-works/ngo-receives.jpg";
import foodReaches from "../../assets/how-it-works/food-reaches.jpg";

const steps = [
  {
    step: "01",
    title: "Food Donor",
    image: foodDonor,
    imageAlt: "Restaurant or hotel listing surplus food on NourishBridge",
    bullets: [
      "Restaurants, hotels, caterers and event organizers often have perfectly good surplus food after every service — food that would otherwise end up in landfills.",
      "Through NourishBridge, donors register available meals by entering food quantity, type, freshness level, pickup location and preferred pickup time.",
      "Every listing is logged on the platform so nothing goes to waste silently, and donors receive confirmation that their contribution will reach people in need.",
      "By joining as a food donor, businesses become active partners in building a hunger-free community while reducing their environmental footprint.",
    ],
  },
  {
    step: "02",
    title: "Pickup Request",
    image: pickupRequest,
    imageAlt: "NourishBridge verifying a pickup request and matching volunteers",
    bullets: [
      "Once a donor submits surplus food, NourishBridge immediately creates a verified pickup request and runs it through quality and eligibility checks.",
      "Our intelligent matching engine analyses location, food type, quantity and urgency, then identifies the nearest verified volunteers and NGO partners.",
      "Both the donor and assigned volunteer receive real-time notifications so everyone stays informed from the moment the request is placed.",
      "This automated coordination eliminates delays and manual searching — ensuring fresh food moves quickly before it loses quality or safety.",
    ],
  },
  {
    step: "03",
    title: "Volunteer Pickup",
    image: volunteerPickup,
    imageAlt: "Volunteer safely collecting food from a donor location",
    bullets: [
      "A verified volunteer receives the pickup alert, reviews the donation details and accepts the request when ready to collect.",
      "Using optimized navigation routes, the volunteer travels to the donor location efficiently — saving time when every minute matters for freshness.",
      "At pickup, volunteers follow NourishBridge food safety guidelines to inspect packaging, temperature and hygiene before accepting the donation.",
      "The volunteer then securely carries the food to the matched NGO, with live status updates keeping all parties informed throughout the journey.",
    ],
  },
  {
    step: "04",
    title: "NGO Receives",
    image: ngoReceives,
    imageAlt: "NGO team verifying and receiving donated food",
    bullets: [
      "When the volunteer arrives, the receiving NGO verifies the delivery against the original donation record on the NourishBridge platform.",
      "Trained NGO staff inspect food quality, check freshness and confirm packaging integrity before accepting it for distribution.",
      "Once verified, the NGO logs the confirmed delivery — creating a complete digital trail from donor to beneficiary that supports accountability.",
      "The food is then sorted, stored or prepared for immediate distribution based on the needs of the communities the NGO serves each day.",
    ],
  },
  {
    step: "05",
    title: "Food Reaches Community",
    image: foodReaches,
    imageAlt: "Fresh meals being served to people in need",
    bullets: [
      "Fresh, rescued meals are distributed to orphanages, shelters, old-age homes and families facing food insecurity across the city.",
      "What began as surplus food in a restaurant kitchen becomes a warm, nourishing meal on someone's plate — often within hours of being listed.",
      "NourishBridge tracks the full journey so organizations can measure impact: meals shared, food saved from waste and communities served.",
      "Each delivery reduces hunger, cuts down food waste and strengthens the bond between donors, volunteers, NGOs and the people they support.",
    ],
  },
];

function StepBlock({ step, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      className={[
        "group relative mx-auto w-full max-w-5xl rounded-xl border p-4 transition-all duration-300 sm:p-5 md:p-6",
        isHovered
          ? "border-[#16A34A]/40 bg-gradient-to-br from-[#F0FDF4] via-white to-[#F8FFF8] shadow-[0_12px_40px_rgba(22,163,74,0.1)]"
          : "border-[#E5E7EB]/80 bg-white/80 shadow-[0_4px_20px_rgba(15,23,42,0.04)]",
      ].join(" ")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ y: isHovered ? -4 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[#16A34A]/20"
          aria-hidden="true"
        />
      )}

      <div
        className={[
          "flex flex-col gap-6 lg:items-center lg:gap-8",
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row",
        ].join(" ")}
      >
        <div className="w-full lg:w-[42%]">
          <motion.div
            className={[
              "flex items-center justify-center overflow-hidden rounded-lg border p-3 transition-all duration-300 sm:p-4",
              isHovered
                ? "border-[#16A34A]/25 bg-[#ECFDF3]/40"
                : "border-[#E5E7EB] bg-[#F8FAFC]",
            ].join(" ")}
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={step.image}
              alt={step.imageAlt}
              className="h-auto max-h-[180px] w-full max-w-full object-contain object-scale-down sm:max-h-[200px] lg:max-h-[210px]"
              draggable={false}
            />
          </motion.div>
        </div>

        <div className="w-full lg:w-[58%] lg:px-2 xl:px-3">
          <motion.span
            className={[
              "inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 sm:text-xs",
              isHovered
                ? "bg-[#16A34A] text-white"
                : "bg-[#E8F8EF] text-[#16A34A]",
            ].join(" ")}
          >
            Step {step.step}
          </motion.span>

          <h3
            className={[
              "mt-3 text-xl font-bold transition-colors duration-300 sm:text-[1.35rem] md:text-2xl",
              isHovered ? "text-[#16A34A]" : "text-[#0F172A]",
            ].join(" ")}
          >
            {step.title}
          </h3>

          <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
            {step.bullets.map((point) => (
              <li
                key={point.slice(0, 48)}
                className={[
                  "flex gap-2.5 text-sm leading-6 transition-colors duration-300 sm:text-[15px] sm:leading-7",
                  isHovered ? "text-[#475569]" : "text-gray-600",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300",
                    isHovered ? "bg-[#16A34A]" : "bg-[#22C55E]/70",
                  ].join(" ")}
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

function JourneyQuote() {
  return (
    <div className="flex w-full justify-center">
      <motion.div
        className="relative mt-16 w-full max-w-3xl md:mt-20 lg:mt-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0FDF4] via-[#ECFDF3] to-[#F8FFF8]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,rgba(22,163,74,0.12)_0%,transparent_60%)]" />

      <motion.div
        className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#16A34A]/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-10 top-1/4 h-32 w-32 rounded-full bg-[#22C55E]/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #16A34A 0.5px, transparent 0.5px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 text-center sm:px-10 sm:py-14 md:py-16">
        <motion.div
          className="mx-auto flex w-full items-center justify-center gap-2.5 whitespace-nowrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/10 text-[#16A34A]"
            aria-hidden="true"
          >
            <FaLeaf className="text-sm" />
          </motion.span>
          <p className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em] text-[#16A34A] sm:tracking-[0.22em]">
            The Journey Continues
          </p>
        </motion.div>

        <motion.blockquote
          className="mx-auto mt-5 w-full max-w-xl border-0 p-0 text-center text-xl font-semibold leading-snug tracking-tight text-[#0F172A] sm:text-2xl md:text-[1.75rem] md:leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Every meal creates a difference.
        </motion.blockquote>

        <motion.div
          className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#16A34A] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />

        <motion.p
          className="mx-auto mt-5 w-full max-w-lg text-center text-sm leading-7 text-[#64748B] sm:text-[15px] sm:leading-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          From one donation to thousands of lives touched —
          <br />
          the NourishBridge journey never stops.
        </motion.p>
      </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative flex flex-col items-center overflow-hidden py-10 sm:py-12 lg:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f8fff8] via-[#F8FAFC] to-white"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #16A34A 0.6px, transparent 0.6px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-[10%] h-72 w-72 rounded-full bg-[#DCFCE7]/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-[15%] h-64 w-64 rounded-full bg-[#ECFDF3]/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
          <span className="inline-flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#16A34A] shadow-sm">
            How It Works
          </span>

          <h2 className="mx-auto mt-8 max-w-3xl text-center text-3xl font-bold leading-tight tracking-tight text-[#0F172A] md:text-4xl lg:text-5xl">
            How <span className="text-[#16A34A]">NourishBridge</span> Works
          </h2>

          <p className="mx-auto mt-8 max-w-[700px] text-center text-base leading-relaxed text-gray-600 md:text-[17px] md:leading-8">
            NourishBridge is a smart food redistribution platform that connects
            surplus food from donors with verified volunteers and NGOs — so every
            meal reaches people who need it. Follow the five steps below to see
            how surplus food becomes hope on someone&apos;s plate.
          </p>
        </div>

        <div className="mt-12 flex w-full max-w-5xl flex-col gap-10 md:mt-14 md:gap-12 lg:mx-auto lg:mt-16 lg:gap-14">
          {steps.map((step, index) => (
            <StepBlock key={step.step} step={step} index={index} />
          ))}
        </div>

        <JourneyQuote />
      </div>
    </section>
  );
}
