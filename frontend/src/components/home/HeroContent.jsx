import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaLeaf, FaUsers } from "react-icons/fa";
import Button from "../common/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroButtonClass =
  "box-border !h-14 !min-h-14 !rounded-xl !px-8 !text-[15px] !font-semibold transition hover:!-translate-y-0.5";

export default function HeroContent() {
  return (
    <motion.div
      className="flex w-full flex-col justify-center pl-4 sm:pl-6 lg:h-[510px] lg:max-h-[520px] lg:justify-center lg:pl-10 xl:pl-14"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#E5E7EB]/80 bg-[#E8F8EF] px-5 py-2.5 text-sm font-semibold text-[#16A34A] shadow-[0_2px_12px_rgba(22,163,74,0.08)] lg:px-6 lg:py-3 lg:text-base"
      >
        <FaLeaf className="text-base" />
        Smart Food Redistribution Platform
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mt-5 text-[2.5rem] font-black leading-[1.05] tracking-[-0.02em] sm:mt-6 sm:text-[2.75rem] lg:mt-5 lg:text-[4rem] xl:text-[4.25rem]"
      >
        <span className="text-[#16A34A]">Nourish</span>
        <span className="text-[#0F172A]">Bridge</span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-4 text-2xl font-bold leading-[1.25] tracking-[-0.01em] text-[#0F172A] sm:mt-5 sm:text-[1.75rem] lg:mt-4 lg:text-[2.25rem] xl:text-[2.375rem]"
      >
        Reducing Food Waste.
        <br />
        Nourishing Lives.
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="mt-4 max-w-[480px] text-base leading-7 text-[#64748B] lg:mt-4 lg:max-w-[560px] lg:text-lg lg:leading-8 xl:max-w-[600px]"
      >
        Rescue surplus food with verified NGOs and dedicated volunteers.
        Connect restaurants and donors to communities in need — creating
        measurable social impact with every meal.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-stretch lg:mt-5"
      >
        <Link to="/donor" className="w-full sm:w-auto">
          <Button
            variant="primary"
            icon={FaHeart}
            className={`w-full min-w-0 shadow-[0_4px_16px_rgba(22,163,74,0.28)] sm:w-auto ${heroButtonClass}`}
          >
            Donate Food
          </Button>
        </Link>
        <Link to="/volunteer" className="w-full sm:w-auto">
          <Button
            variant="outline"
            icon={FaUsers}
            className={`w-full min-w-0 sm:w-auto ${heroButtonClass}`}
          >
            Become Volunteer
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
