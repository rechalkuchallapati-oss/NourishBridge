import Hero from "../../components/home/Hero";
import TrustedPartners from "../../components/home/TrustedPartners";
import HowItWorks from "../../components/home/HowItWorks";
import WhyChooseNourishBridge from "../../components/home/WhyChooseNourishBridge";
import Impact from "../../components/home/Impact";
import NGOSection from "../../components/home/NGOSection";
import Testimonals from "../../components/home/Testimonals";
import VoicesOfImpact from "../../components/home/VoicesOfImpact";
import ContactSection from "../../components/home/ContactSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-[1.25cm] sm:gap-[1.5cm]">
      <Hero />

      <TrustedPartners />

      <HowItWorks />

      <WhyChooseNourishBridge />

      <Impact />

      <NGOSection />

      <div className="flex flex-col">
        <Testimonals />
        <VoicesOfImpact />
      </div>

      <ContactSection />

    </main>
  );
}