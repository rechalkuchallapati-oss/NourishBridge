import { FloatingLeaf } from "./NGOShared";

export default function NGOHeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FFF9] to-[#F0FDF4]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_30%,#ECFDF3_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_70%,#E8F8EF_0%,transparent_50%)] opacity-80" />

      <div className="absolute -left-20 top-[8%] h-72 w-72 rounded-full bg-[#DCFCE7]/40 blur-3xl" />
      <div className="absolute -right-16 bottom-[10%] h-64 w-64 rounded-full bg-[#ECFDF3]/50 blur-3xl" />

      <FloatingLeaf
        className="absolute left-[8%] top-[18%] text-2xl text-[#16A34A]/[0.14] sm:text-3xl"
        delay={0}
      />
      <FloatingLeaf
        className="absolute left-[4%] bottom-[22%] rotate-[-22deg] text-xl text-[#22C55E]/[0.11]"
        delay={1.8}
      />
      <FloatingLeaf
        className="absolute right-[10%] top-[28%] rotate-[18deg] text-2xl text-[#16A34A]/[0.13]"
        delay={2.6}
      />
      <FloatingLeaf
        className="absolute right-[6%] bottom-[30%] rotate-[140deg] text-lg text-[#22C55E]/[0.1]"
        delay={3.4}
      />

      <svg
        className="absolute left-0 top-[42%] h-32 w-full text-[#16A34A]/[0.08] sm:h-40"
        viewBox="0 0 1200 160"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80 C200 20, 400 140, 600 70 S1000 30, 1200 90"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <path
          d="M0 120 C300 60, 600 160, 900 80 S1200 100, 1200 130"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="3 9"
          opacity="0.6"
        />
      </svg>

      <svg
        className="absolute right-[12%] top-[12%] hidden h-48 w-48 text-[#16A34A]/[0.07] lg:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M 20 160 Q 100 20 180 160"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
        <circle
          cx="100"
          cy="100"
          r="88"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="2 6"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
