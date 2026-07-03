import Container from "../common/Container";
import NGOTrustBar from "./NGOTrustBar";
import NGOCards from "./NGOCards";
export default function NGOSection() {
  return (
    <section className="flex flex-col items-center bg-[#F8FAFC] py-20">

      <Container className="flex w-full flex-col items-center">

        {/* NGO Hero */}
        <div className="mx-auto w-full max-w-3xl px-4 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-600">
            OUR NGO PARTNERS
          </p>

          <h2 className="text-5xl font-extrabold text-slate-900">
            Stronger Together.{" "}
            <span className="text-green-600">Greater Impact.</span>
          </h2>
        </div>

        {/* Trust Bar */}
        <NGOTrustBar />

        {/* NGO Cards */}
        <NGOCards />

      </Container>

    </section>
  );
}