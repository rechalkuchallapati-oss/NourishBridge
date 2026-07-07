import { motion } from "framer-motion";
import logo from "../../assets/logos/logo.png";
import {
  VOLUNTEER_BODY,
  VOLUNTEER_CONTENT_STACK,
  VOLUNTEER_H1,
  VOLUNTEER_H2,
  VOLUNTEER_INSET,
  VOLUNTEER_INSET_LINE_GAP,
} from "./volunteerDashboardStyles";

const THEME_STYLES = {
  green: {
    border: "border-[#BBF7D0]/70",
    bg: "bg-gradient-to-r from-[#F0FDF4] via-[#DCFCE7]/90 to-[#F0FDF4]",
    shimmer: "via-white/50",
    glow: "bg-[#BBF7D0]/30",
    iconBox: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
  },
  emerald: {
    border: "border-[#6EE7B7]/60",
    bg: "bg-gradient-to-r from-[#ECFDF5] via-[#A7F3D0]/40 to-[#ECFDF5]",
    shimmer: "via-[#D1FAE5]/60",
    glow: "bg-[#6EE7B7]/25",
    iconBox: "border-[#6EE7B7] bg-[#ECFDF5] text-[#059669]",
  },
  blue: {
    border: "border-[#BFDBFE]/70",
    bg: "bg-gradient-to-r from-[#EFF6FF] via-[#DBEAFE]/90 to-[#EFF6FF]",
    shimmer: "via-white/50",
    glow: "bg-[#93C5FD]/30",
    iconBox: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
  },
  amber: {
    border: "border-[#FDE68A]/70",
    bg: "bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7]/80 to-[#FFFBEB]",
    shimmer: "via-white/50",
    glow: "bg-[#FCD34D]/25",
    iconBox: "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  },
};

export function VolunteerSectionTitle({
  title,
  subtitle,
  animated = true,
  theme = "green",
  heading = "h2",
  icon: Icon,
  compact = false,
  className = "",
}) {
  const palette = THEME_STYLES[theme] ?? THEME_STYLES.green;
  const HeadingTag = heading === "h1" ? "h1" : "h2";
  const headingClass = heading === "h1" ? VOLUNTEER_H1 : compact ? "text-base font-bold text-[#0F172A] sm:text-lg" : VOLUNTEER_H2;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-none",
        compact ? "px-[0.4cm] py-[0.3cm]" : "px-[0.5cm] py-[0.4cm]",
        palette.border,
        palette.bg,
        className,
      ].join(" ")}
    >
      {animated ? (
        <motion.div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent ${palette.shimmer} to-transparent`}
          animate={{ x: ["-120%", "220%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full blur-xl ${palette.glow}`}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex items-start gap-[0.5cm]">
        {Icon ? (
          <span
            className={[
              "inline-flex shrink-0 items-center justify-center rounded-none border shadow-sm",
              compact ? "h-9 w-9" : "h-11 w-11 sm:h-12 sm:w-12",
              palette.iconBox,
            ].join(" ")}
          >
            <Icon className={compact ? "text-sm" : "text-lg"} aria-hidden="true" />
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <HeadingTag className={headingClass}>{title}</HeadingTag>
          {subtitle ? (
            <p className={`${VOLUNTEER_INSET_LINE_GAP} ${VOLUNTEER_BODY}`}>{subtitle}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function VolunteerSubsection({
  title,
  subtitle,
  icon,
  theme = "green",
  children,
  className = "",
}) {
  return (
    <section className={["flex flex-col gap-[0.5cm]", className].join(" ")}>
      <VolunteerSectionTitle
        title={title}
        subtitle={subtitle}
        icon={icon}
        theme={theme}
        compact
      />
      {children}
    </section>
  );
}

export default function VolunteerSectionShell({
  children,
  className = "",
  accent = "green",
}) {
  const blobClass =
    accent === "blue"
      ? "bg-[#BFDBFE]"
      : accent === "amber"
        ? "bg-[#FDE68A]"
        : "bg-[#BBF7D0]";
  const blobSecondary =
    accent === "blue" ? "bg-[#DBEAFE]" : accent === "amber" ? "bg-[#FEF3C7]" : "bg-[#DCFCE7]";

  return (
    <section
      className={[
        "relative overflow-hidden rounded-none border border-[#E5E7EB] bg-white shadow-[0_8px_32px_rgba(22,163,74,0.08)]",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.2, 0.1], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl ${blobClass}`}
        />
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.16, 0.08], y: [0, -8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className={`absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl ${blobSecondary}`}
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-[#F0FDF4]/40 via-transparent to-[#ECFDF5]/30"
        />
      </div>

      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[0.5cm] top-[0.5cm] z-[1] h-14 w-14 object-contain opacity-[0.07] sm:h-16 sm:w-16"
      />

      <div className="relative m-[0.5cm] border border-[#E5E7EB]/80 bg-gradient-to-br from-white/95 via-[#FAFFFA]/92 to-white/95">
        <div className={`${VOLUNTEER_INSET} ${VOLUNTEER_CONTENT_STACK}`}>{children}</div>
      </div>
    </section>
  );
}
