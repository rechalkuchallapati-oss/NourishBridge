import { Check, Circle } from "lucide-react";
import { getDeliveryWorkflowIndex, WORKFLOW_STEPS } from "../../../data/adminDeliveries";

export default function DeliveryWorkflowTimeline({ status }) {
  const currentIndex = getDeliveryWorkflowIndex(status);
  return (
    <div className="space-y-0">
      {WORKFLOW_STEPS.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        const pending = index > currentIndex;
        return (
          <div key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className={["flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                done ? "border-[#16A34A] bg-[#16A34A] text-white" : active ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]" : "border-[#E2E8F0] bg-white text-[#CBD5E1]"].join(" ")}>
                {done ? <Check size={12} /> : active ? <Circle size={8} fill="currentColor" /> : <Circle size={8} />}
              </span>
              {index < WORKFLOW_STEPS.length - 1 ? <span className={`my-0.5 h-4 w-0.5 ${done ? "bg-[#16A34A]" : "bg-[#E2E8F0]"}`} /> : null}
            </div>
            <div className={`pb-3 ${pending ? "opacity-50" : ""}`}>
              <p className={`text-xs font-semibold ${active ? "text-[#16A34A]" : done ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>{step.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
