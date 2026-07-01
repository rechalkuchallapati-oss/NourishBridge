import Hero from "../../components/home/Hero";
import TrustedPartners from "../../components/home/TrustedPartners";
import HowItWorks from "../../components/home/HowItWorks";
import Features from "../../components/home/Features";
import Impact from "../../components/home/Impact";
import NGOSection from "../../components/home/NGOSection";

export default function Home() {
  return (
    <>
      <Hero />

      <TrustedPartners />
      
      <HowItWorks />

      <Features />

      <Impact />
      
      <NGOSection />
    </>
  );
}