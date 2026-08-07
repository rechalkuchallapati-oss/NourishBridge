import { CARD_BASE, CARD_PAD } from "../../styles/designTokens";

export default function Card({ children, className = "", as: Component = "article", ...props }) {
  return (
    <Component className={[CARD_BASE, CARD_PAD, "nb-card nb-animate-slide-up", className].join(" ")} {...props}>
      {children}
    </Component>
  );
}
