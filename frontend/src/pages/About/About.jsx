import { Link } from "react-router-dom";
import Container from "../../components/common/Container";
import WhyChooseNourishBridge from "../../components/home/WhyChooseNourishBridge";
import { PAGE_TITLE, BODY_TEXT, SECTION_STACK } from "../../styles/designTokens";

export default function About() {
  return (
    <main className="flex flex-col gap-12 sm:gap-16">
      <section className="bg-gradient-to-b from-[#F8FFF8] to-white py-12 sm:py-16">
        <Container className={`max-w-4xl ${SECTION_STACK}`}>
          <h1 className={PAGE_TITLE}>About NourishBridge</h1>
          <p className={BODY_TEXT}>
            NourishBridge is a smart food redistribution platform that connects food donors,
            verified NGOs, and volunteers to rescue surplus meals before they go to waste.
          </p>
          <p className={`${BODY_TEXT} mt-4`}>
            Our mission is to reduce food waste, strengthen community trust, and deliver measurable
            social impact — one pickup at a time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/login"
              state={{ tab: "create" }}
              className="inline-flex h-11 items-center rounded-xl bg-[#16A34A] px-6 text-sm font-semibold text-white transition hover:bg-[#15803D]"
            >
              Join the platform
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#15803D] transition hover:border-[#BBF7D0] hover:bg-[#F0FDF4]"
            >
              Contact us
            </Link>
          </div>
        </Container>
      </section>

      <WhyChooseNourishBridge />
    </main>
  );
}
