import { motion } from "framer-motion";
import { FaArrowRight, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

import akshaya from "../../assets/partners/akshaya-patra.png";
import feeding from "../../assets/partners/feeding-india.png";
import goonj from "../../assets/partners/goonj.png";
import noFoodWaste from "../../assets/partners/no-food-waste.png";
import riseAgainstHunger from "../../assets/partners/rise-against-hunger.png";
import robinhood from "../../assets/partners/robinhood-army.png";

const EASE = [0.22, 1, 0.36, 1];

const ngos = [
  {
    logo: feeding,
    name: "Feeding India",
    cities: "25+",
    people: "5M+",
  },
  {
    logo: robinhood,
    name: "Robin Hood Army",
    cities: "50+",
    people: "10M+",
  },
  {
    logo: riseAgainstHunger,
    name: "Rise Against Hunger",
    cities: "15+",
    people: "3M+",
  },
  {
    logo: akshaya,
    name: "Akshaya Patra",
    cities: "40+",
    people: "20M+",
  },
  {
    logo: noFoodWaste,
    name: "No Food Waste",
    cities: "30+",
    people: "2M+",
  },
  {
    logo: goonj,
    name: "Goonj",
    cities: "20+",
    people: "15M+",
  },
];

function StatRow({ icon: Icon, label, value }) {
  return (
    <div className="flex w-full items-start gap-2">
      <Icon className="mt-0.5 shrink-0 text-sm text-green-600" aria-hidden="true" />
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-xs font-bold tabular-nums text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function NGOCard({ ngo, index }) {
  return (
    <motion.article
      className="group flex w-[168px] shrink-0 flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-md transition-all duration-300 hover:border-green-500 hover:shadow-xl sm:w-[180px] lg:w-[192px]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      whileHover={{ y: -4 }}
    >
      <div className="flex flex-col items-center px-4 py-6 sm:px-5 sm:py-7">
        <img
          src={ngo.logo}
          alt={ngo.name}
          className="mb-[1cm] h-28 w-32 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:w-36"
        />

        <div className="flex w-full flex-col items-center gap-[0.5cm]">
          <h3 className="w-full text-center text-sm font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-green-600">
            {ngo.name}
          </h3>

          <StatRow
            icon={FaMapMarkerAlt}
            label="Locations"
            value={`${ngo.cities} Cities`}
          />

          <StatRow icon={FaUsers} label="People Served" value={ngo.people} />

          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-1.5 text-[11px] font-semibold text-green-600 transition-all duration-300 group-hover:gap-2"
          >
            Learn More
            <FaArrowRight className="text-[9px] transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function NGOCardsHeading() {
  return (
    <motion.div
      className="group flex w-full flex-col items-center py-[1.25cm] text-center sm:py-[1.5cm] md:py-[2cm]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <div className="mb-4 flex w-full items-center justify-center gap-3 sm:gap-4">
        <motion.span
          className="h-px w-8 bg-gradient-to-r from-transparent to-green-500/50 sm:w-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          aria-hidden="true"
        />
        <motion.span
          className="h-2 w-2 rounded-full bg-green-500/80 shadow-[0_0_12px_rgba(22,163,74,0.45)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.span
          className="h-px w-8 bg-gradient-to-l from-transparent to-green-500/50 sm:w-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4">
        <motion.h2
          className="relative mx-auto w-full cursor-default bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-[length:200%_auto] bg-clip-text pb-3 text-center text-lg font-extrabold uppercase tracking-[0.18em] text-transparent transition-all duration-500 group-hover:tracking-[0.22em] sm:text-xl md:text-2xl"
          whileHover={{
            scale: 1.04,
            backgroundPosition: "100% center",
          }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          Our Trusted NGO Partners
          <motion.span
            className="absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-green-500 to-transparent"
            initial={{ width: "0%" }}
            whileInView={{ width: "70%" }}
            whileHover={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-hidden="true"
          />
        </motion.h2>

        <motion.p
          className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          We collaborate with trusted NGOs across India to ensure every rescued
          meal reaches the right people safely, efficiently and with dignity.
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function NGOCards() {
  return (
    <section className="mt-[2cm] flex w-full flex-col items-center">
      <NGOCardsHeading />

      <div className="overflow-x-auto pb-2 pt-[1.25cm] sm:pt-[1.5cm] md:pt-[2cm]">
        <div className="mx-auto flex w-max min-w-full justify-center gap-[0.5cm] px-4">
          {ngos.map((ngo, index) => (
            <NGOCard key={ngo.name} ngo={ngo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
