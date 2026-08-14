import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Button from "../common/Button";
import { PAGE_TITLE, SECTION_TITLE, BODY_TEXT, SECTION_STACK } from "../../styles/designTokens";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Reusable public landing page for role-specific CTAs (donor, volunteer).
 */
export default function RoleLandingPage({
  badge,
  title,
  highlight,
  description,
  bullets = [],
  image,
  imageAlt,
  primaryCta = { label: "Get Started", to: "/login", state: { tab: "create" } },
  secondaryCta,
  icon: Icon,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FFF8] via-white to-[#F0FDF4] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col gap-6"
          >
            {badge && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-2 text-sm font-semibold text-[#16A34A]">
                {Icon ? <Icon className="text-base" aria-hidden="true" /> : null}
                {badge}
              </span>
            )}

            <div>
              <h1 className={PAGE_TITLE}>
                {title}{" "}
                {highlight ? <span className="text-[#16A34A]">{highlight}</span> : null}
              </h1>
              <p className={`mt-4 max-w-xl ${BODY_TEXT}`}>{description}</p>
            </div>

            {bullets.length > 0 && (
              <ul className="flex flex-col gap-3">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#334155] sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A34A]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to={primaryCta.to} state={primaryCta.state} className="w-full sm:w-auto">
                <Button className="h-12 w-full min-w-[200px] px-8 sm:w-auto">{primaryCta.label}</Button>
              </Link>
              {secondaryCta ? (
                <Link to={secondaryCta.to} state={secondaryCta.state} className="w-full sm:w-auto">
                  <Button variant="outline" className="h-12 w-full min-w-[200px] px-8 sm:w-auto">
                    {secondaryCta.label}
                  </Button>
                </Link>
              ) : null}
            </div>
          </motion.div>

          {image ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              className="overflow-hidden rounded-2xl border border-[#E8ECF0] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
            >
              <img
                src={image}
                alt={imageAlt}
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
                loading="lazy"
              />
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export { SECTION_TITLE };
