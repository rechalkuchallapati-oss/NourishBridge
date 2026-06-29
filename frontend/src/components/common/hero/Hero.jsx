import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft background wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-green-50/40 to-transparent" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-green-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* Hero grid — left content has extra inset */}
        <div className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20 xl:gap-16">
          <HeroContent />
          <HeroImage />
        </div>

        {/* Bottom feature bar */}
        <div id="how-it-works" className="pb-16 lg:pb-20">
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
