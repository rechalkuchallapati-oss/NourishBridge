import { Link } from "react-router-dom";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { PAGE_TITLE, BODY_TEXT } from "../../styles/designTokens";

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] items-center bg-[#F8FAFC] py-16">
      <Container className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#16A34A]">404</p>
        <h1 className={`mt-3 ${PAGE_TITLE}`}>Page not found</h1>
        <p className={`mt-4 ${BODY_TEXT}`}>
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/">
            <Button className="w-full min-w-[180px] sm:w-auto">Back to Home</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="w-full min-w-[180px] sm:w-auto">
              Contact Support
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
