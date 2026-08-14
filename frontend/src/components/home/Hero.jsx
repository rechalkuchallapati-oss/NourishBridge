import Container from "../common/Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroStatsBar from "./HeroStatsBar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <HeroBackground />

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-8 md:py-10 lg:min-h-0 lg:py-6">
        <div className="w-full">
          <div className="grid min-h-0 flex-1 items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <HeroContent />
            <HeroImage />
          </div>

          <div className="mt-8 shrink-0 lg:mt-6">
            <HeroStatsBar />
          </div>
        </div>
      </Container>
    </section>
  );
}
