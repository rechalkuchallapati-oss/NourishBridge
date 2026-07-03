import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import Container from "../common/Container";
import NGOHeroBackground from "./NGOHeroBackground";
import { EASE, fadeUp } from "./NGOShared";
import volunteerImage from "../../assets/how-it-works/volunteer-pickup.jpg";

function HeartDivider() {
  return (
    <motion.div
      className="mt-8 flex items-center justify-center gap-3 sm:mt-10"
      variants={fadeUp}
      custom={0.32}
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#16A34A]/30 sm:w-14" />
      <FaHeart className="text-sm text-[#16A34A]/70" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#16A34A]/30 sm:w-14" />
    </motion.div>
  );
}

export default function NGOHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <NGOHeroBackground />

      <Container className="relative z-10 py-14 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:max-w-none"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <motion.div
              className="group relative overflow-hidden rounded-[28px] border border-white/90 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)] ring-1 ring-[#E5E7EB]/60 transition-shadow duration-500 hover:shadow-[0_28px_72px_rgba(22,163,74,0.12)]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[500px]">
                <img
                  src={volunteerImage}
                  alt="Volunteers holding a NourishBridge donation box during a food pickup"
                  width={600}
                  height={500}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/10 via-transparent to-transparent opacity-60" />
            </motion.div>
          </motion.div>

          <motion.div
            className="mx-auto flex w-full max-w-lg flex-col items-center text-center lg:max-w-xl lg:px-4 xl:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB]/80 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#16A34A] shadow-[0_2px_12px_rgba(22,163,74,0.08)] backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-xs"
            >
              <span aria-hidden="true">🍃</span>
              Our NGO Partners
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={0.08}
              className="mt-6 max-w-lg text-[2rem] font-bold leading-[1.12] tracking-tight text-[#0F172A] sm:mt-8 sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem]"
            >
              Stronger Together.
              <br />
              <span className="text-[#16A34A]">Greater Impact.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.16}
              className="mt-6 max-w-md text-sm leading-7 text-[#64748B] sm:mt-8 sm:max-w-lg sm:text-base sm:leading-8 md:text-[17px] md:leading-8"
            >
              We collaborate with verified NGOs working on the ground to ensure
              every meal reaches the right people with dignity and care.
            </motion.p>

            <HeartDivider />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
