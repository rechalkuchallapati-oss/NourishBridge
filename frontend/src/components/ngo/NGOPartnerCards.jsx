import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUsers, FaArrowRight, FaHeart } from "react-icons/fa";
import Container from "../common/Container";

import feedingIndia from "../../assets/partners/feeding-india.png";
import robinHoodArmy from "../../assets/partners/robinhood-army.png";
import riseAgainstHunger from "../../assets/partners/rise-against-hunger.png";
import akshayaPatra from "../../assets/partners/akshaya-patra.png";
import noFoodWaste from "../../assets/partners/no-food-waste.png";
import goonj from "../../assets/partners/goonj.png";

const EASE = [0.22, 1, 0.36, 1];

const partners = [
  {
    name: "Feeding India",
    logo: feedingIndia,
    locations: "100+",
    peopleServed: "50L+",
  },
  {
    name: "Robin Hood Army",
    logo: robinHoodArmy,
    locations: "80+",
    peopleServed: "35L+",
  },
  {
    name: "Rise Against Hunger",
    logo: riseAgainstHunger,
    locations: "60+",
    peopleServed: "20L+",
  },
  {
    name: "Akshaya Patra",
    logo: akshayaPatra,
    locations: "65+",
    peopleServed: "1.8M+",
  },
  {
    name: "No Food Waste",
    logo: noFoodWaste,
    locations: "45+",
    peopleServed: "15L+",
  },
  {
    name: "Goonj",
    logo: goonj,
    locations: "25+",
    peopleServed: "30L+",
  },
];

function StatRow({ icon: Icon, label, value }) {
  return (
    <div className="flex w-full items-start gap-2">
      <Icon
        className="mt-0.5 shrink-0 text-sm text-[#16A34A]"
        aria-hidden="true"
      />
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
          {label}
        </p>
        <p className="mt-1 text-xs font-bold tabular-nums text-[#0F172A]">
          {value}
        </p>
      </div>
    </div>
  );
}

function PartnerCard({ partner, index }) {
  return (
    <motion.article
      className="group flex w-[168px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-[#16A34A]/25 hover:shadow-[0_16px_48px_rgba(22,163,74,0.14)] sm:w-[180px] lg:w-[192px]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: EASE,
      }}
      whileHover={{ y: -4 }}
    >
      <div className="flex flex-col items-center px-4 py-6 sm:px-5 sm:py-7">
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="mb-[1cm] h-28 w-32 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-32 sm:w-36"
        />

        <div className="flex w-full flex-col items-center gap-[0.5cm]">
          <h3 className="w-full text-center text-sm font-bold leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#16A34A]">
            {partner.name}
          </h3>

          <StatRow
            icon={FaMapMarkerAlt}
            label="Locations"
            value={`${partner.locations} Cities`}
          />

          <StatRow
            icon={FaUsers}
            label="People Served"
            value={partner.peopleServed}
          />

          <span className="inline-flex w-full items-center justify-center gap-1.5 text-[11px] font-semibold text-[#16A34A] transition-all duration-300 group-hover:gap-2">
            Learn More
            <FaArrowRight className="text-[9px] transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function NGOPartnerCards() {
  return (
    <section className="py-10 sm:py-12 lg:py-14">
      <Container>
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <span
            className="h-px w-12 bg-gradient-to-r from-transparent via-[#16A34A]/40 to-transparent sm:w-16"
            aria-hidden="true"
          />
          <FaHeart
            className="mt-5 text-sm text-[#16A34A]/75"
            aria-hidden="true"
          />
          <h2 className="mt-5 text-sm font-bold tracking-tight text-[#0F172A] sm:text-base md:text-lg">
            Our <span className="text-[#16A34A]">Trusted</span> NGO Partners
          </h2>
        </motion.div>

        <div className="mt-8 overflow-x-auto pb-2 sm:mt-10 lg:mt-12">
          <div className="mx-auto flex w-max min-w-full justify-center gap-[0.5cm]">
            {partners.map((partner, index) => (
              <PartnerCard key={partner.name} partner={partner} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
