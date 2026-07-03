import { motion } from "framer-motion";
import { FaArrowRight, FaHandHoldingHeart, FaUserFriends } from "react-icons/fa";
import Container from "../common/Container";

const EASE = [0.22, 1, 0.36, 1];

function CircleIcon({ children, className = "" }) {
  return (
    <motion.div
      className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#E8F8EF] text-[#16A34A] shadow-[0_4px_20px_rgba(22,163,74,0.1)] transition-transform duration-300 sm:h-20 sm:w-20 ${className}`}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function NGOClosingBanner() {
  return (
    <section className="pb-10 pt-2 sm:pb-12 sm:pt-4 lg:pb-14">
      <Container>
        <motion.div
          className="group mx-auto w-full max-w-[1350px] rounded-[28px] border border-[#E5F5E8] p-10 shadow-[0_8px_40px_rgba(22,163,74,0.08)] transition-shadow duration-500 hover:shadow-[0_14px_48px_rgba(22,163,74,0.12)]"
          style={{
            background:
              "linear-gradient(135deg, #F8FFF8 0%, rgba(255,255,255,0.95) 50%, #F8FFF8 100%)",
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-0">
            {/* Left column — ~55% */}
            <motion.div
              className="flex items-center gap-5 lg:w-[55%] lg:pr-10 xl:gap-6 xl:pr-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
            >
              <CircleIcon>
                <FaHandHoldingHeart className="text-3xl sm:text-[2rem]" />
              </CircleIcon>

              <h2 className="text-left text-[28px] font-bold leading-tight tracking-tight text-[#0F172A] sm:text-[34px] lg:text-[40px] lg:leading-[1.2]">
                Together, we can build a world where{" "}
                <span className="text-[#16A34A]">
                  no good food goes to waste and no one sleeps hungry.
                </span>
              </h2>
            </motion.div>

            {/* Center column — ~25% */}
            <motion.div
              className="flex items-center gap-5 border-[#E5F5E8] lg:w-[25%] lg:border-l lg:px-8 xl:px-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            >
              <CircleIcon>
                <FaUserFriends className="text-3xl sm:text-[2rem]" />
              </CircleIcon>

              <div className="text-left">
                <h3 className="text-base font-bold text-[#0F172A] sm:text-lg">
                  Want to partner with us?
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-[15px] sm:leading-7">
                  Join our mission to create a hunger-free tomorrow.
                </p>
              </div>
            </motion.div>

            {/* Right column — ~20% */}
            <motion.div
              className="flex items-center justify-center lg:w-[20%] lg:pl-6 xl:pl-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            >
              <button
                type="button"
                className="group/btn inline-flex h-14 w-full max-w-[240px] items-center justify-center gap-2 rounded-[14px] border-2 border-[#16A34A] bg-white px-6 text-[15px] font-semibold text-[#16A34A] transition-all duration-300 hover:bg-[#16A34A] hover:text-white lg:w-full lg:max-w-none"
              >
                Partner With Us
                <FaArrowRight className="text-sm transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
