import Container from "../common/Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStatsBar from "./HeroStatsBar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white mb-20 lg:mb-24 lg:flex lg:h-[calc(100vh-90px)] lg:max-h-[calc(100vh-90px)] lg:flex-col">
      <HeroBackground />

      <Container className="relative z-10 flex flex-1 flex-col justify-between py-8 md:py-10 lg:min-h-0 lg:py-5">
        <div className="grid min-h-0 flex-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-6 xl:gap-8">
          <HeroContent />
          <HeroImage />
        </div>

        <div id="impact" className="mt-6 shrink-0 md:mt-8 lg:mt-4">
          <HeroStatsBar />
        </div>
      </Container>
    </section>
  );
}
