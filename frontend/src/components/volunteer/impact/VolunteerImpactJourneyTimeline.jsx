import { FaCheck, FaCircle, FaFlag } from "react-icons/fa";
import { IMPACT_JOURNEY } from "../../../data/volunteerImpactPageData";

const STATUS_STYLES = {
  completed: {
    dot: "bg-[#16A34A] text-white",
    line: "bg-[#BBF7D0]",
    card: "border-[#BBF7D0] bg-[#F0FDF4]",
    icon: FaCheck,
  },
  current: {
    dot: "bg-[#2563EB] text-white ring-4 ring-[#BFDBFE]",
    line: "bg-[#BFDBFE]",
    card: "border-[#BFDBFE] bg-[#EFF6FF]",
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
    <section className="rounded-none border border-[#E5E7EB] bg-white p-[0.5cm] shadow-sm">
      <h2 className="text-sm font-bold text-[#0F172A]">Impact Journey</h2>
      <p className="mt-1 text-[10px] text-[#64748B]">
        Key milestones on your food rescue path — past, present, and next goals.
      </p>

      <ol className="relative mt-[0.5cm] space-y-0 pl-1">
        {IMPACT_JOURNEY.map((milestone, index) => {
          const styles = STATUS_STYLES[milestone.status] ?? STATUS_STYLES.upcoming;
          const Icon = styles.icon;
          const isLast = index === IMPACT_JOURNEY.length - 1;

          return (
            <li key={milestone.id} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast ? (
                <span
                  className={["absolute left-[13px] top-7 h-[calc(100%-12px)] w-0.5", styles.line].join(" ")}
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

              <div
                className={[
                  "min-w-0 flex-1 rounded-none border p-3",
                  styles.card,
                ].join(" ")}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold text-[#0F172A]">{milestone.title}</p>
                  <span className="text-[10px] font-semibold text-[#64748B]">{milestone.date}</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                  {milestone.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
