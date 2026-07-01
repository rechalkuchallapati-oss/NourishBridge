import Container from "../common/Container";

import feedingIndia from "../../assets/partners/feeding-india.png";
import robinHoodArmy from "../../assets/partners/robinhood-army.png";
import riseAgainstHunger from "../../assets/partners/rise-against-hunger.png";
import akshayaPatra from "../../assets/partners/akshaya-patra.png";
import noFoodWaste from "../../assets/partners/no-food-waste.png";
import goonj from "../../assets/partners/goonj.png";

const partners = [
  { name: "Feeding India", logo: feedingIndia },
  { name: "Robin Hood Army", logo: robinHoodArmy },
  { name: "Rise Against Hunger", logo: riseAgainstHunger },
  { name: "Akshaya Patra", logo: akshayaPatra },
  { name: "No Food Waste", logo: noFoodWaste },
  { name: "Goonj", logo: goonj },
];

export default function TrustedPartners() {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-0">
      <div className="pointer-events-none absolute left-10 top-10 h-56 w-56 rounded-full bg-green-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />

      <Container>
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB]/80 bg-[#E8F8EF] px-5 py-2.5 text-sm font-semibold text-[#16A34A] shadow-[0_2px_12px_rgba(22,163,74,0.08)]">
            Trusted Partners
          </span>

          <h2 className="mt-8 text-[32px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0F172A] md:text-[40px] lg:text-[48px]">
            Working Together With India&apos;s most Trusted NGO and
            <span className="text-[#16A34A]"> Food Relief Organizations</span>
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-center text-lg leading-8 text-slate-600">
            NourishBridge collaborates with trusted NGOs and food rescue
            organizations to ensure every donated meal reaches people in need
            safely, efficiently and transparently.
          </p>
        </div>

        <div className="mt-12 flex items-stretch justify-center gap-6 overflow-x-auto pb-2 md:mt-16 [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-6 lg:gap-8 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex min-h-[120px] min-w-[152px] shrink-0 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white px-6 py-8 shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(22,163,74,0.12)] sm:min-w-[160px] sm:px-8 lg:min-w-0"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-[72px] w-[92px] object-contain object-center sm:h-20 sm:w-[100px] lg:h-[88px] lg:w-[110px]"
              />
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-base leading-7 text-[#64748B] md:mt-16">
          Together with our partners, we are building a hunger-free India.
        </p>
      </Container>
    </section>
  );
}
