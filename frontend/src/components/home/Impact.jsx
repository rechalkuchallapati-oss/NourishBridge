import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaLeaf,
  FaUtensils,
  FaBuilding,
  FaUsers,
  FaRecycle,
  FaCloud,
  FaUserFriends,
  FaStore,
  FaHandsHelping,
  FaHeart,
} from "react-icons/fa";
import Container from "../common/Container";

const stats = [
  {
    icon: FaUtensils,
    value: 25000,
    suffix: "+",
    label: "Meals Delivered",
    desc: "Nutritious meals reaching people who need them most.",
    color: "from-[#16A34A] to-[#22C55E]",
  },
  {
    icon: FaBuilding,
    value: 350,
    suffix: "+",
    label: "Partner NGOs",
    desc: "Trusted organizations united against hunger nationwide.",
    color: "from-[#059669] to-[#10B981]",
  },
  {
    icon: FaUsers,
    value: 1200,
    suffix: "+",
    label: "Active Volunteers",
    desc: "Dedicated heroes powering every rescue journey.",
    color: "from-[#16A34A] to-[#4ADE80]",
  },
  {
    icon: FaRecycle,
    value: 45000,
    suffix: "+",
    label: "kg Food Rescued",
    desc: "Surplus food saved and redirected before it is wasted.",
    color: "from-[#15803D] to-[#22C55E]",
  },
  {
    icon: FaCloud,
    value: 120,
    suffix: "+",
    label: "Tons CO₂ Saved",
    desc: "Lower emissions through smarter food redistribution.",
    color: "from-[#0D9488] to-[#34D399]",
  },
];

const stakeholders = [
  {
    icon: FaStore,
    title: "Food Donors",
    desc: "List surplus food safely and instantly using NourishBridge.",
  },
  {
    icon: FaHandsHelping,
    title: "Volunteers",
    desc: "Accept pickup requests and deliver food with care.",
  },
  {
    icon: FaBuilding,
    title: "NGOs",
    desc: "Receive, verify and distribute food to communities.",
  },
  {
    icon: FaHeart,
    title: "Communities",
    desc: "Receive nutritious meals while reducing food waste together.",
  },
];

function useCountUp(target, isActive, duration = 1600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isActive, target, duration]);

  return count;
}

function StatCard({ stat, index, isActive }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, isActive, 1500 + index * 100);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative min-w-[210px] flex-1 shrink-0 snap-center sm:min-w-[230px] lg:min-w-0"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative flex flex-col items-center gap-3.5 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white px-5 py-6 text-center shadow-[0_4px_20px_rgba(15,23,42,0.05)] sm:gap-4 sm:px-6 sm:py-7"
        animate={{
          y: hovered ? -6 : 0,
          borderColor: hovered ? "rgba(22,163,74,0.35)" : "rgba(229,231,235,1)",
          boxShadow: hovered
            ? "0 16px 40px rgba(22,163,74,0.12)"
            : "0 4px 20px rgba(15,23,42,0.05)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.color}`}
        />
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F8EF] ring-1 ring-[#16A34A]/10">
          <Icon className="text-lg text-[#16A34A]" />
        </div>
        <p className="text-2xl font-extrabold tabular-nums leading-none tracking-tight text-[#0F172A] sm:text-[1.85rem]">
          {count.toLocaleString()}
          {stat.suffix}
        </p>
        <p className="text-sm font-semibold leading-snug text-[#16A34A] sm:text-[15px]">
          {stat.label}
        </p>
        <p className="max-w-[180px] text-center text-xs leading-5 text-[#64748B] sm:max-w-[200px] sm:text-[13px] sm:leading-6">
          {stat.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

function ImpactQuote() {
  return (
    <motion.div
      className="relative mx-auto my-[1cm] max-w-5xl px-4 sm:px-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <blockquote className="text-center">
        <p className="mx-auto text-sm font-medium italic leading-relaxed text-[#475569] sm:text-base md:text-[17px] md:leading-8">
          <span className="font-serif text-[#475569]">&ldquo;</span>The impact
          we create today builds a better, kinder and hunger-free tomorrow.
          <span className="font-serif text-[#475569]">&rdquo;</span>
        </p>
      </blockquote>
    </motion.div>
  );
}

function ImpactHighlight() {
  return (
    <motion.div
      className="mx-auto max-w-[1280px]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-[28px] border border-[#DCFCE7] px-6 py-8 shadow-[0_8px_40px_rgba(22,163,74,0.06)] transition-shadow duration-500 hover:shadow-[0_12px_48px_rgba(22,163,74,0.1)] sm:px-10 sm:py-10 lg:px-[50px] lg:py-[40px]"
        style={{
          background:
            "linear-gradient(135deg, #F8FFF9 0%, #F2FCF5 50%, #FFFFFF 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-[1cm] lg:flex-row lg:items-start lg:justify-center lg:gap-[1cm] xl:gap-[1cm]">
          <motion.div
            className="flex w-full flex-col items-center text-center lg:w-[35%] lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#E8F8EF] shadow-[0_4px_24px_rgba(22,163,74,0.08)] ring-1 ring-[#DCFCE7]">
                <FaUserFriends className="text-[2rem] text-[#16A34A]" />
              </div>
              <h3 className="text-left text-2xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-[1.65rem] lg:text-[1.75rem]">
                One Platform.
                <br />
                <span className="text-[#16A34A]">Many Heroes.</span>
              </h3>
            </div>
            <p className="mx-auto mt-[1cm] max-w-sm text-sm leading-7 text-[#64748B] sm:text-[15px] lg:mx-0">
              Empowering restaurants, volunteers, NGOs and communities to
              work together for a hunger-free future.
            </p>
          </motion.div>

          <div className="grid w-full grid-cols-1 gap-[1cm] sm:grid-cols-2 lg:w-[65%] lg:grid-cols-4">
            {stakeholders.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                className="group flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F8EF] ring-1 ring-[#DCFCE7] transition-all duration-300 group-hover:bg-[#DCFCE7] group-hover:shadow-[0_0_20px_rgba(22,163,74,0.15)]">
                  <Icon className="text-lg text-[#16A34A] transition-transform duration-300 group-hover:rotate-6" />
                </div>
                <p className="mt-[1cm] text-sm font-bold text-[#0F172A] transition-colors duration-300 group-hover:text-[#16A34A]">
                  {title}
                </p>
                <p className="mt-[1cm] text-xs leading-5 text-[#64748B] sm:text-[13px] sm:leading-6">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Impact() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section
      id="impact"
      className="relative flex flex-col items-center overflow-hidden bg-gradient-to-b from-white via-[#F8FFF8] to-[#F0FDF4] py-10 sm:py-12 lg:py-14"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,#ECFDF3_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-[20%] h-64 w-64 rounded-full bg-[#DCFCE7]/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-[15%] h-56 w-56 rounded-full bg-[#BBF7D0]/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex w-full flex-col items-center">
        <motion.div
          className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
        >
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#16A34A] shadow-sm">
            <FaLeaf className="text-sm" />
            Our Impact
          </span>
          <h2 className="mx-auto mt-[1cm] text-center text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-[2.75rem]">
            Measuring What{" "}
            <span className="text-[#16A34A]">Truly Matters</span>
          </h2>
          <p className="mx-auto mt-[1cm] max-w-2xl text-center text-sm leading-relaxed text-[#64748B] sm:text-base md:text-lg md:leading-8">
            Every number represents a meal shared, a life nourished and a step
            toward a hunger-free, sustainable future powered by NourishBridge.
          </p>
        </motion.div>

        <div
          ref={statsRef}
          className="mx-auto mt-[1cm] flex max-w-[1200px] justify-center gap-5 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 sm:px-6 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isActive={isStatsInView}
            />
          ))}
        </div>

        <ImpactQuote />
        <ImpactHighlight />
      </Container>
    </section>
  );
}
