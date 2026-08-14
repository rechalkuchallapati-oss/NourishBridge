import Container from "../../components/common/Container";
import { PAGE_TITLE, BODY_TEXT, SECTION_STACK } from "../../styles/designTokens";

export default function LegalPage({ title, children }) {
  return (
    <section className="bg-[#F8FAFC] py-12 sm:py-16">
      <Container className={`max-w-3xl ${SECTION_STACK}`}>
        <h1 className={PAGE_TITLE}>{title}</h1>
        <div className={`prose prose-slate max-w-none ${BODY_TEXT}`}>{children}</div>
      </Container>
    </section>
  );
}
