import NGOHero from "../../components/ngo/NGOHero";
import NGOTrustHighlights from "../../components/ngo/NGOTrustHighlights";
import NGOPartnerCards from "../../components/ngo/NGOPartnerCards";
import NGOClosingBanner from "../../components/ngo/NGOClosingBanner";

export default function NGO() {
  return (
    <main className="relative overflow-x-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#F8FFF8] to-[#F0FDF4]/40"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-[1.25cm] sm:gap-[1.5cm]">
        <NGOHero />
        <NGOTrustHighlights />
        <NGOPartnerCards />
        <NGOClosingBanner />
      </div>
    </main>
  );
}
