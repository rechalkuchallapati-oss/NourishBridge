import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo.png";

export const BRAND_TAGLINE = "Share Food • Share Hope";

const SIZE_STYLES = {
  default: {
    img: "h-[54px] w-[54px]",
    text: "text-[22px] font-extrabold leading-none tracking-tight",
    tagline: "mt-2 text-center text-[11px] font-medium leading-none tracking-wide text-[#64748B]",
    gap: "gap-4",
  },
  compact: {
    img: "h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11",
    text: "text-lg font-extrabold leading-none tracking-tight sm:text-xl",
    tagline: "mt-1 text-[10px] font-medium leading-none tracking-wide text-[#64748B] sm:text-[11px]",
    gap: "gap-2.5 sm:gap-3",
  },
  mobile: {
    img: "h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12",
    text: "truncate text-lg font-extrabold tracking-tight",
    tagline: null,
    gap: "gap-3",
  },
};

export default function BrandLogo({
  to,
  size = "default",
  showTagline = true,
  className = "",
  onClick,
}) {
  const styles = SIZE_STYLES[size] ?? SIZE_STYLES.default;

  const content = (
    <>
      <img src={logo} alt="NourishBridge" className={`${styles.img} shrink-0 object-contain`} />
      <div className="flex min-w-0 flex-col">
        <span className={`whitespace-nowrap ${styles.text}`}>
          <span className="text-[#15803D]">Nourish</span>
          <span className="text-[#16A34A]">Bridge</span>
        </span>
        {showTagline && styles.tagline ? (
          <p
            className={[
              "whitespace-nowrap",
              styles.tagline,
              size === "compact" ? "hidden md:block" : "",
            ].join(" ")}
          >
            {BRAND_TAGLINE}
          </p>
        ) : null}
      </div>
    </>
  );

  const rootClass = [
    "group flex min-w-0 items-center transition-transform duration-300 hover:scale-[1.02]",
    styles.gap,
    className,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={rootClass}>
        {content}
      </Link>
    );
  }

  return (
    <div className={rootClass}>
      {content}
    </div>
  );
}
