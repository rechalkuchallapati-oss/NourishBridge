import {
  DISTRIBUTION_PIPELINE_STEPS,
  getDistributionStepIndex,
} from "../../data/ngoDistributionQueue";

export default function DistributionStatusTimeline({ currentStatus, timeline = [] }) {
  const currentIndex = getDistributionStepIndex(
    currentStatus === "scheduled" ? "ready" : currentStatus,
  );

  return (
    <ol className="flex flex-col gap-[0.5cm]">
      {DISTRIBUTION_PIPELINE_STEPS.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === DISTRIBUTION_PIPELINE_STEPS.length - 1;
        const event = timeline.find((item) => item.step === step.id);

        return (
          <li key={step.id} className="relative flex gap-[0.5cm]">
            {!isLast ? (
              <span
                className={[
                  "absolute left-[15px] top-8 h-[calc(100%+0.5cm)] w-0.5",
                  isComplete ? "bg-[#7C3AED]" : "bg-[#E2E8F0]",
                ].join(" ")}
                aria-hidden="true"
              />
            ) : null}

            <span
              className={[
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-none border-2 text-xs font-bold",
                isComplete
                  ? "border-[#7C3AED] bg-[#7C3AED] text-white"
                  : isCurrent
                    ? "border-[#7C3AED] bg-white text-[#7C3AED] shadow-[0_0_0_4px_rgba(124,58,237,0.12)]"
                    : "border-[#E2E8F0] bg-white text-[#94A3B8]",
              ].join(" ")}
            >
              {isComplete ? "✓" : index + 1}
            </span>

            <div className="min-w-0 flex-1 pt-0.5">
              <p
                className={[
                  "text-sm font-semibold",
                  isCurrent
                    ? "text-[#7C3AED]"
                    : isComplete
                      ? "text-[#0F172A]"
                      : "text-[#94A3B8]",
                ].join(" ")}
              >
                {step.label}
              </p>
              {event?.time ? (
                <p className="mt-[0.3cm] text-xs text-[#64748B]">{event.time}</p>
              ) : isCurrent ? (
                <p className="mt-[0.3cm] text-xs text-[#64748B]">In progress</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
