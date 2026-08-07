import { BADGE_BLUE, BADGE_GRAY, BADGE_GREEN, BADGE_ORANGE, BADGE_RED } from "../../styles/designTokens";

const VARIANTS = {
  green: BADGE_GREEN,
  blue: BADGE_BLUE,
  orange: BADGE_ORANGE,
  red: BADGE_RED,
  gray: BADGE_GRAY,
};

export default function Badge({ variant = "gray", children, className = "", icon: Icon }) {
  return (
    <span className={[VARIANTS[variant] ?? BADGE_GRAY, className].join(" ")}>
      {Icon ? <Icon size={12} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
