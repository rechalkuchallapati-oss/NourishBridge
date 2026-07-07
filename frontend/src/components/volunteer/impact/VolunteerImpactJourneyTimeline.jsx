import { motion } from "framer-motion";
import { FaCheck, FaCircle, FaFlag, FaRoad } from "react-icons/fa";
import { IMPACT_JOURNEY } from "../../../data/volunteerImpactPageData";
import VolunteerSectionShell, { VolunteerSectionTitle } from "../VolunteerSectionShell";
import { VOLUNTEER_CONTENT_STACK, VOLUNTEER_INSET_LINE_GAP } from "../volunteerDashboardStyles";

const STATUS_STYLES = {
  completed: {
    dot: "bg-[#16A34A] text-white",
    line: "bg-[#BBF7D0]",
    card: "border-[#BBF7D0] bg-[#F0FDF4]",
    icon: FaCheck,
  },
  current: {
    dot: "bg-[#16A34A] text-white ring-4 ring-[#DCFCE7]",
    line: "bg-[#BBF7D0]",
    card: "border-[#BBF7D0] bg-[#F0FDF4]",
    icon: FaCircle,
  },
  upcoming: {
    dot: "bg-[#E2E8F0] text-[#94A3B8]",
    line: "bg-[#E2E8F0]",
    card: "border-[#E5E7EB] bg-[#F8FAFC]",
    icon: FaFlag,
  },
};

export default function VolunteerImpactJourneyTimeline() {
  return (
    <VolunteerSectionShell>
      <VolunteerSectionTitle
        title="Impact Journey"
        subtitle="Key milestones on your food rescue path — past, present, and next goals."
        theme="purple"
        icon={FaRoad}
        compact
      />

      <ol className={`relative ${VOLUNTEER_CONTENT_STACK} pl-1`}>
        {IMPACT_JOURNEY.map((milestone, index) => {
          const styles = STATUS_STYLES[milestone.status] ?? STATUS_STYLES.upcoming;
          const Icon = styles.icon;
          const isLast = index === IMPACT_JOURNEY.length - 1;

          return (
            <motion.li
              key={milestone.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              className="relative flex gap-[0.5cm]"
            >
              {!isLast ? (
                <span
                  className={["absolute left-[13px] top-7 h-[calc(100%-4px)] w-0.5", styles.line].join(" ")}
                  aria-hidden="true"
                />
              ) : null}

              <span
                className={[
                  "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  styles.dot,
                ].join(" ")}
              >
                <Icon className="text-[10px]" aria-hidden="true" />
              </span>

              <div className={["min-w-0 flex-1 rounded-none border p-[0.5cm]", styles.card].join(" ")}>
                <div className="flex flex-wrap items-center justify-between gap-[0.5cm]">
                  <p className="text-sm font-bold text-[#0F172A]">{milestone.title}</p>
                  <span className="text-xs font-semibold text-[#64748B]">{milestone.date}</span>
                </div>
                <p className={`${VOLUNTEER_INSET_LINE_GAP} text-sm leading-relaxed text-[#64748B]`}>
                  {milestone.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </VolunteerSectionShell>
  );
}
